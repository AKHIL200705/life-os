import { DEMO_AGENTS, DEMO_PREDICTIONS, DEMO_SIMULATION } from "../demo-data";
import type { AgentDef, Prediction, SimulationStep } from "../types";

/**
 * AI service abstraction.
 *
 * Phase 1 (current): a mock implementation backed by clearly-labelled demo data.
 * Phase 2: swap `mockAiService` for an implementation that calls an LLM /
 * ML prediction service through a server function. The interface below is the
 * only contract the UI depends on.
 */
export interface AiService {
  listPredictions(): Promise<Prediction[]>;
  listAgents(): Promise<AgentDef[]>;
  runSimulation(minutes: number): Promise<SimulationStep[]>;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockAiService: AiService = {
  async listPredictions() {
    await delay(220);
    return DEMO_PREDICTIONS;
  },
  async listAgents() {
    await delay(140);
    return DEMO_AGENTS;
  },
  async runSimulation(minutes: number) {
    await delay(180);
    return DEMO_SIMULATION.map((step) =>
      step.actor === "Environment" && step.title === "Traffic increases"
        ? { ...step, detail: `${step.detail} (horizon: ${minutes} min)` }
        : step,
    );
  },
};

export const aiService: AiService = mockAiService;
