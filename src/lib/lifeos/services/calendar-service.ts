import { supabase } from "@/integrations/supabase/client";

export interface CalendarEventDef {
  id?: string;
  title: string;
  location?: string | null;
  startsAt: string;
  endsAt?: string | null;
  kind?: string;
}

/**
 * Service to sync Google Calendar events with Supabase calendar_events table.
 */
export const calendarService = {
  /**
   * Fetches primary events from Google Calendar API using provider_token from session
   */
  async syncGoogleCalendar(): Promise<{ count: number; events: CalendarEventDef[] }> {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      throw new Error("No active authenticated session found.");
    }

    const providerToken = session.provider_token;
    if (!providerToken) {
      console.warn("[LIFEOS Calendar] No provider token found in current session.");
      return { count: 0, events: [] };
    }

    try {
      // 1. Fetch upcoming events from Google Calendar API
      const timeMin = new Date().toISOString();
      const res = await fetch(
        `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${encodeURIComponent(timeMin)}&maxResults=20&orderBy=startTime&singleEvents=true`,
        {
          headers: {
            Authorization: `Bearer ${providerToken}`,
          },
        }
      );

      if (!res.ok) {
        console.warn("[LIFEOS Calendar] Google Calendar API request failed:", res.statusText);
        return { count: 0, events: [] };
      }

      const body = (await res.json()) as { items?: Array<{ summary?: string; location?: string; start?: { dateTime?: string; date?: string }; end?: { dateTime?: string; date?: string } }> };
      const items = body.items ?? [];

      const syncedEvents: CalendarEventDef[] = [];

      for (const item of items) {
        if (!item.summary) continue;
        const startsAt = item.start?.dateTime || item.start?.date || new Date().toISOString();
        const endsAt = item.end?.dateTime || item.end?.date || null;

        const eventData = {
          user_id: session.user.id,
          title: item.summary,
          location: item.location || null,
          kind: "event",
          starts_at: startsAt,
          ends_at: endsAt,
        };

        // Insert into Supabase calendar_events table
        const { data, error } = await supabase
          .from("calendar_events")
          .insert(eventData)
          .select()
          .maybeSingle();

        if (!error && data) {
          syncedEvents.push({
            id: data.id,
            title: data.title,
            location: data.location,
            startsAt: data.starts_at,
            endsAt: data.ends_at,
            kind: data.kind,
          });
        }
      }

      // 2. Log integration record into user_integrations
      await supabase
        .from("user_integrations")
        .upsert(
          {
            user_id: session.user.id,
            provider: "google_calendar",
            status: "connected",
            account_email: session.user.email ?? null,
            access_token: providerToken,
            metadata: { last_synced_at: new Date().toISOString(), synced_count: syncedEvents.length },
          },
          { onConflict: "user_id,provider" }
        );

      return { count: syncedEvents.length, events: syncedEvents };
    } catch (err) {
      console.error("[LIFEOS Calendar] Calendar sync error:", err);
      return { count: 0, events: [] };
    }
  },

  /**
   * List saved calendar events for current user from Supabase
   */
  async listCalendarEvents(): Promise<CalendarEventDef[]> {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return [];

    const { data, error } = await supabase
      .from("calendar_events")
      .select("*")
      .order("starts_at", { ascending: true });

    if (error || !data) return [];

    return data.map((item) => ({
      id: item.id,
      title: item.title,
      location: item.location,
      startsAt: item.starts_at,
      endsAt: item.ends_at,
      kind: item.kind,
    }));
  },
};
