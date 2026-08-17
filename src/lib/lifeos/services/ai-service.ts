import { GoogleGenAI } from "@google/genai";
import { DEMO_AGENTS, DEMO_PREDICTIONS, DEMO_SIMULATION } from "../demo-data";
import type { AgentDef, Prediction, SimulationStep } from "../types";

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
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: `You are the LIFEOS Proactive Friction Prediction Engine.
Generate 4 realistic near-term friction predictions across categories (travel, schedule, environment, finance, safety).
Return a JSON array of predictions matching this structure:
[
  {
    "id": "pred-live-1",
    "problem": "Traffic Congestion on Express Route",
    "category": "travel",
    "probability": 0.88,
    "severity": "high",
    "confidence": 0.92,
    "minutesUntil": 25,
    "reasons": ["Unusual roadwork reported", "Heavy rainfall approaching"],
    "signals": [
      {"label": "Traffic", "value": "+24 min delay", "tone": "bad"},
      {"label": "Weather", "value": "Heavy Rain", "tone": "warn"}
    ],
    "recommendedAction": "Depart 15 mins early via Ring Road",
    "expectedBenefit": "Saves 20 mins travel time",
    "situation": "Normal route is heavily bottlenecked",
    "decision": "Reroute via bypass",
    "alternatives": ["Take Metro Express", "Reschedule departure"],
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
