import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, Calendar, LogOut, RefreshCw } from "lucide-react";
import { toast } from "sonner";

import { PageHeader, Panel, PanelHeader } from "@/components/lifeos/Panel";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { calendarService } from "@/lib/lifeos/services/calendar-service";
import { notificationService } from "@/lib/lifeos/services/notification-service";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({
    meta: [
      { title: "Settings & Profile — LIFEOS" },
      {
        name: "description",
        content: "Your LIFEOS account, preference summary and session controls.",
      },
      { property: "og:title", content: "LIFEOS Settings" },
      { property: "og:description", content: "Account details and session controls." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [syncing, setSyncing] = useState(false);

  async function handleSyncCalendar() {
    setSyncing(true);
    try {
      const res = await calendarService.syncGoogleCalendar();
      if (res.count > 0) {
        toast.success("Google Calendar Synced", {
          description: `Ingested ${res.count} upcoming event(s) into your friction prediction engine.`,
        });
      } else {
        toast.info("Calendar Synced", {
          description: "No new upcoming events found or re-authenticated session needed.",
        });
      }
    } catch (err) {
      toast.error("Sync Failed", {
        description: err instanceof Error ? err.message : "Could not reach Google Calendar.",
      });
    } finally {
      setSyncing(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <PageHeader eyebrow="Settings" title="Account & Integrations" description="Manage your identity, connected data streams, and session." />

      <Panel>
        <PanelHeader title="Connected Data Streams & Notifications" subtitle="Feed live schedule context and receive proactive risk alerts" />
        <div className="space-y-3">
          <div className="rounded-xl border border-border bg-surface-2/50 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Calendar className="size-5" />
                </div>
                <div>
                  <p className="font-medium">Google Calendar</p>
                  <p className="text-xs text-muted-foreground">
                    Sync schedule events to detect travel friction & double bookings
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                disabled={syncing}
                onClick={() => void handleSyncCalendar()}
              >
                <RefreshCw className={`mr-1.5 size-3.5 ${syncing ? "animate-spin" : ""}`} />
                {syncing ? "Syncing..." : "Sync Google Calendar"}
              </Button>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-surface-2/50 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400">
                  <Bell className="size-5" />
                </div>
                <div>
                  <p className="font-medium">Web Push Notifications</p>
                  <p className="text-xs text-muted-foreground">
                    Receive system push alerts when Gemini predicts risk exceeding 85%
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={async () => {
                  const perm = await notificationService.requestPermission();
                  if (perm === "granted") {
                    await notificationService.sendAlert("LIFEOS Notifications Enabled", "You will now receive high-severity friction push alerts.");
                    toast.success("Web Push Notifications Active!");
                  } else {
                    toast.error("Permission Denied", { description: "Enable notifications in browser settings." });
                  }
                }}
              >
                <Bell className="mr-1.5 size-3.5 text-amber-400" />
                Enable Push Alerts
              </Button>
            </div>
          </div>
        </div>
      </Panel>

      <Panel>
        <PanelHeader title="Signed in as" subtitle={user?.email ?? "unknown"} />
        <dl className="grid gap-2 text-sm">
          <div className="flex justify-between rounded-xl border border-border bg-surface-2/50 px-3 py-2">
            <dt className="text-muted-foreground">Email</dt>
            <dd>{user?.email ?? "—"}</dd>
          </div>
          <div className="flex justify-between rounded-xl border border-border bg-surface-2/50 px-3 py-2">
            <dt className="text-muted-foreground">Sign-in method</dt>
            <dd className="capitalize">{user?.app_metadata?.provider ?? "email"}</dd>
          </div>
        </dl>
        <Button
          className="mt-4"
          variant="outline"
          onClick={async () => {
            await supabase.auth.signOut();
            toast.success("Signed out");
            void navigate({ to: "/" });
          }}
        >
          <LogOut className="mr-1.5 size-4" /> Sign out
        </Button>
      </Panel>
    </div>
  );
}
