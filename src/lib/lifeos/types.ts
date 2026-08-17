export type Severity = "low" | "medium" | "high" | "critical";
export type DataSource = "real" | "simulated" | "prediction";

export interface Signal {
  label: string;
  value: string;
  tone?: "neutral" | "good" | "warn" | "bad";
}

export interface Prediction {
  id: string;
  problem: string;
  category: "travel" | "schedule" | "environment" | "finance" | "safety" | "study";
  probability: number;
  severity: Severity;
  confidence: number;
  minutesUntil: number;
  reasons: string[];
  signals: Signal[];
  recommendedAction: string;
  expectedBenefit: string;
  situation: string;
  decision: string;
  alternatives: string[];
  source: DataSource;
}

export interface AgentDef {
  id: string;
  name: string;
  role: string;
  analyzes: string[];
  status: "idle" | "analyzing" | "complete";
  latencyMs: number;
  accent: "cyan" | "emerald" | "amber" | "violet" | "rose";
}

export interface ContextSnapshot {
  time: string;
  weather: string;
  temperatureC: number;
  locationStatus: string;
  battery: number;
  connectivity: string;
  trafficLevel: "low" | "moderate" | "high" | "severe";
  travelTimeMin: number;
  baselineTravelMin: number;
  nextEvent: { title: string; at: string; location: string };
}

export interface MemoryItem {
  id: string;
  statement: string;
  category: string;
  source: string;
  confidence: number;
  learnedAt: string;
}

export interface HistoryItem {
  id: string;
  problem: string;
  predictedProbability: number;
  actualOutcome: string;
  correct: boolean;
  date: string;
  feedback?: string;
}

export interface MapMarker {
  id: string;
  label: string;
  kind: "user" | "traffic" | "weather" | "risk" | "charging" | "study" | "place";
  x: number;
  y: number;
  detail: string;
}

export interface SimulationStep {
  title: string;
  detail: string;
  actor: string;
}
