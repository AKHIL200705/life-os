import { GoogleGenAI } from "@google/genai";
import { supabase } from "@/integrations/supabase/client";
import { calendarService } from "./calendar-service";

export interface ChatMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: string;
}

function getGeminiClient(): GoogleGenAI | null {
  const apiKey =
    import.meta.env["VITE_GEMINI_API_KEY"] ||
    import.meta.env["GEMINI_API_KEY"] ||
    (typeof process !== "undefined" ? process.env["GEMINI_API_KEY"] : undefined);

  if (!apiKey || apiKey.startsWith("YOUR_")) return null;
  return new GoogleGenAI({ apiKey });
}

export const aiChatService = {
  /**
   * Sends a user prompt to Google Gemini 2.5 Flash with full context injection
   * (calendar schedule, GPS location, preferences, and learned memories).
   */
  async askTwin(userMessage: string, history: ChatMessage[] = []): Promise<string> {
    const ai = getGeminiClient();
    if (!ai) {
      return "Gemini API key is not configured in Vercel environment variables. Please add VITE_GEMINI_API_KEY.";
    }

    try {
      // 1. Gather context: Calendar events
      let eventsSummary = "No upcoming calendar events.";
      try {
        const events = await calendarService.listCalendarEvents();
        if (events.length > 0) {
          eventsSummary = events
            .map((e) => `- ${e.title} at ${e.startsAt} (${e.location || "unspecified"})`)
            .join("\n");
        }
      } catch (e) {
        console.warn("[LIFEOS Chat] Could not fetch calendar events:", e);
      }

      // 2. Gather context: User preferences & location & memories
      let twinContext = "Default User Context";
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const [twinRes, memoriesRes] = await Promise.all([
            supabase
              .from("digital_twin_states")
              .select("context")
              .eq("user_id", session.user.id)
              .order("created_at", { ascending: false })
              .limit(1)
              .maybeSingle(),
            supabase
              .from("memories")
              .select("statement")
              .eq("user_id", session.user.id)
              .limit(5),
          ]);

          const locCtx = (twinRes.data?.context as any)?.location;
          const locStr = locCtx
            ? `Lat ${locCtx.latitude.toFixed(4)}°, Lng ${locCtx.longitude.toFixed(4)}°`
            : "City Center";

          const memStr = (memoriesRes.data ?? []).map((m) => `- ${m.statement}`).join("\n");

          twinContext = `Location: ${locStr}\nLearned Memories:\n${memStr || "None yet"}`;
        }
      } catch (e) {
        console.warn("[LIFEOS Chat] Could not fetch twin context:", e);
      }

      // 3. Format history for Gemini API
      const formattedHistory = history
        .slice(-6)
        .map((m) => `${m.sender === "user" ? "User" : "LIFEOS Twin"}: ${m.text}`)
        .join("\n");

      const prompt = `You are the LIFEOS Conversational Digital Twin — an empathetic, concise, and ultra-intelligent personal assistant pair programmer.
Your goal is to answer the user's question directly, accurately, and proactively.

Current Real-Time User Context:
${twinContext}

Upcoming Schedule:
${eventsSummary}

Recent Conversation:
${formattedHistory}

User Query: "${userMessage}"

Provide a concise, helpful, and action-oriented response (2-4 sentences max). Suggest specific actions if relevant.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      return response.text ? response.text.trim() : "I analyzed your context, but received no response text.";
    } catch (err) {
      console.error("[LIFEOS Chat] Error calling Gemini API:", err);
      return "I encountered a connection error while analyzing your Digital Twin context. Please check your network or API key.";
    }
  },
};
