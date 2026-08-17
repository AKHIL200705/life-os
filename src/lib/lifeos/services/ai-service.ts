import { GoogleGenAI } from "@google/genai";
import { supabase } from "@/integrations/supabase/client";
import { DEMO_AGENTS, DEMO_PREDICTIONS, DEMO_SIMULATION } from "../demo-data";
import type { AgentDef, Prediction, SimulationStep } from "../types";
import { calendarService } from "./calendar-service";

/**
 * AI service backed by Google Gemini GenAI SDK with fallback to simulated data.
 */
export interface AiService {
  listPredictions(): Promise<Prediction[]>;
  listAgents(): Promise<AgentDef[]>;
  runSimulation(minutes: number): Promise<SimulationStep[]>;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function getGeminiClient(): GoogleGenAI | null {
  const apiKey =
    (typeof process !== "undefined" ? process.env["GEMINI_API_KEY"] : undefined) ||
    import.meta.env["VITE_GEMINI_API_KEY"];

  if (!apiKey) return null;
  try {
    return new GoogleGenAI({ apiKey });
  } catch (err) {
    console.warn("[LIFEOS AI] Failed to initialize GoogleGenAI client:", err);
    return null;
  }
}

export const realAiService: AiService = {
  async listPredictions(): Promise<Prediction[]> {
    const ai = getGeminiClient();
    if (!ai) {
      await delay(220);
      return DEMO_PREDICTIONS;
    }

    try {
      let eventsSummary = "No upcoming calendar events ingested.";
      try {
        const events = await calendarService.listCalendarEvents();
        if (events.length > 0) {
          eventsSummary = events
            .map((e) => `- ${e.title} at ${e.startsAt} (location: ${e.location || "unspecified"})`)
            .join("\n");
        }
      } catch (e) {
        console.warn("[LIFEOS AI] Could not load calendar events:", e);
      }

      let locationSummary = "User Location: Simulated Urban Center";
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          const { data: twinData } = await supabase
            .from("digital_twin_states")
            .select("context")
            .eq("user_id", session.user.id)
            .order("created_at", { ascending: false })
            .limit(1)
            .maybeSingle();

          if (twinData?.context && typeof twinData.context === "object") {
            const ctx = twinData.context as { location?: { latitude?: number; longitude?: number } };
            if (ctx.location?.latitude && ctx.location?.longitude) {
              locationSummary = `User Live GPS: ${ctx.location.latitude.toFixed(4)}°N, ${ctx.location.longitude.toFixed(4)}°E`;
            }
          }
        }
      } catch (e) {
        console.warn("[LIFEOS AI] Could not load twin location context:", e);
      }

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `You are the LIFEOS Proactive Friction Prediction Engine.
User Context:
- ${locationSummary}
- Live Schedule Events:
${eventsSummary}

Analyze potential upcoming friction events (travel delays, tight transition times, double bookings, weather conflicts).
Generate 4 realistic near-term friction predictions across categories (travel, schedule, environment, finance, safety).
Return a JSON array of predictions matching this structure:
[
  {
    "id": "pred-live-1",
    "problem": "Conflict between back-to-back meetings",
    "category": "schedule",
    "probability": 0.88,
    "severity": "high",
    "confidence": 0.92,
    "minutesUntil": 25,
    "reasons": ["Only 5 minutes transition time between locations"],
    "signals": [
      {"label": "Schedule", "value": "Tight Transition", "tone": "bad"},
      {"label": "Traffic", "value": "+12 min travel required", "tone": "warn"}
    ],
    "recommendedAction": "Reschedule second meeting by 15 minutes",
    "expectedBenefit": "Prevents late arrival and travel stress",
    "situation": "Back-to-back meetings at separate locations",
    "decision": "Shift start time",
    "alternatives": ["Join remotely via Zoom", "Depart 10 mins early"],
    "source": "prediction"
  }
]`,
        config: {
          responseMimeType: "application/json",
        },
      });

      const text = response.text;
      if (text) {
        const parsed = JSON.parse(text) as Prediction[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (error) {
      console.warn("[LIFEOS AI] Gemini generation error, falling back to demo data:", error);
    }

    return DEMO_PREDICTIONS;
  },

  async listAgents(): Promise<AgentDef[]> {
    await delay(140);
    return DEMO_AGENTS;
  },

  async runSimulation(minutes: number): Promise<SimulationStep[]> {
    const ai = getGeminiClient();
    if (!ai) {
      await delay(180);
      return DEMO_SIMULATION.map((step) =>
        step.actor === "Environment" && step.title === "Traffic increases"
          ? { ...step, detail: `${step.detail} (horizon: ${minutes} min)` }
          : step,
      );
    }

    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `Generate a 3-step simulation of how LIFEOS predicts and mitigates friction over a horizon of ${minutes} minutes.
Return a JSON array of steps:
[
  {"actor": "Context Sensor", "title": "Signal Ingestion", "detail": "Monitoring live traffic and calendar events..."},
  {"actor": "Friction Engine", "title": "Conflict Detected", "detail": "High probability of late arrival at 14:30 meeting."},
  {"actor": "Action System", "title": "Mitigation Triggered", "detail": "Notifying user to depart early via alternate route."}
]`,
        config: {
          responseMimeType: "application/json",
        },
      });

      const text = response.text;
      if (text) {
        const parsed = JSON.parse(text) as SimulationStep[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn("[LIFEOS AI] Gemini simulation error:", err);
    }

    return DEMO_SIMULATION;
  },
};

export const aiService: AiService = realAiService;
