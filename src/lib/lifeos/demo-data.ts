import type {
  AgentDef,
  ContextSnapshot,
  HistoryItem,
  MapMarker,
  MemoryItem,
  Prediction,
  SimulationStep,
} from "./types";

/**
 * All values below are SIMULATED demo data for the LIFEOS prototype.
 * They are not real sensor readings and are not medically or scientifically validated.
 * Replace this module with real services (see src/lib/lifeos/services) in phase 2.
 */

export const DEMO_CONTEXT: ContextSnapshot = {
  time: "8:05 AM",
  weather: "Rain expected",
  temperatureC: 24,
  locationStatus: "At home · Kukatpally",
  battery: 18,
  connectivity: "5G · stable",
  trafficLevel: "high",
  travelTimeMin: 43,
  baselineTravelMin: 28,
  nextEvent: { title: "Data Structures class", at: "9:00 AM", location: "Block C · Room 204" },
};

export const DEMO_PREDICTIONS: Prediction[] = [
  {
    id: "p-late-arrival",
    problem: "Late arrival to 9:00 AM class",
    category: "travel",
    probability: 0.82,
    severity: "high",
    confidence: 0.81,
    minutesUntil: 55,
    reasons: [
      "Traffic on the usual route is 54% above your weekday average",
      "Rain has started along the first 4 km of the route",
      "Your historical departure time is 8:14 AM",
      "Class attendance is marked at 9:00 AM sharp",
    ],
    signals: [
      { label: "Traffic", value: "High", tone: "bad" },
      { label: "Weather", value: "Rain", tone: "warn" },
      { label: "Historical travel time", value: "28 min", tone: "neutral" },
      { label: "Current travel time", value: "43 min", tone: "bad" },
      { label: "Available time", value: "55 min", tone: "neutral" },
    ],
    situation: "Traffic increasing and rain beginning, with class starting in 55 minutes.",
    decision: "Leave now via Route B instead of your usual route.",
    recommendedAction: "Leave 17 minutes earlier via Route B",
    expectedBenefit: "Reduces late-arrival risk by approximately 62%",
    alternatives: [
      "Take the metro from KPHB (predicted arrival 8:52 AM)",
      "Ask to join the first 10 minutes remotely",
      "Leave at 8:12 AM and accept ~9 min late risk",
    ],
    source: "prediction",
  },
  {
    id: "p-battery",
    problem: "Phone battery depletion before evening commute",
    category: "safety",
    probability: 0.68,
    severity: "medium",
    confidence: 0.74,
    minutesUntil: 420,
    reasons: [
      "Battery at 18% with navigation likely in use for 43 min",
      "No charging session detected since 11:40 PM yesterday",
      "Evening return trip typically needs maps + music",
    ],
    signals: [
      { label: "Battery", value: "18%", tone: "bad" },
      { label: "Projected drain", value: "22%/hr", tone: "warn" },
      { label: "Charging nearby", value: "Library · Block B", tone: "good" },
    ],
    situation: "Low battery with a navigation-heavy day ahead.",
    decision: "Carry a power bank or charge between 11:00 and 12:00 in the library.",
    recommendedAction: "Schedule a charging window at 11:00 AM",
    expectedBenefit: "Avoids losing navigation and payments during the return trip",
    alternatives: ["Enable low-power mode now", "Download offline route for Route B"],
    source: "prediction",
  },
  {
    id: "p-deadline",
    problem: "Assignment deadline collision on Thursday",
    category: "schedule",
    probability: 0.57,
    severity: "medium",
    confidence: 0.69,
    minutesUntil: 3240,
    reasons: [
      "Two submissions due within 3 hours of each other",
      "Your average completion time for this course is 5.5 hours",
      "Only 2 free study blocks remain before the deadline",
    ],
    signals: [
      { label: "Free study time", value: "4h 10m", tone: "warn" },
      { label: "Required time", value: "5h 30m", tone: "bad" },
      { label: "Conflicts", value: "2 events", tone: "warn" },
    ],
    situation: "Available study time is below the estimated work required.",
    decision: "Move 90 minutes of work into Tuesday evening.",
    recommendedAction: "Block 7:00–8:30 PM Tuesday for the DBMS report",
    expectedBenefit: "Restores a 40-minute buffer before submission",
    alternatives: ["Request a 1-day extension", "Split the report across 3 shorter blocks"],
    source: "prediction",
  },
  {
    id: "p-spend",
    problem: "Weekly transport budget overrun",
    category: "finance",
    probability: 0.44,
    severity: "low",
    confidence: 0.66,
    minutesUntil: 2880,
    reasons: [
      "3 ride-hailing trips already this week vs. your usual 1",
      "Rain forecast increases cab likelihood for 2 more days",
      "Weekly transport budget is 78% consumed",
    ],
    signals: [
      { label: "Budget used", value: "78%", tone: "warn" },
      { label: "Projected overrun", value: "₹240", tone: "warn" },
      { label: "Metro alternative", value: "₹35/trip", tone: "good" },
    ],
    situation: "Rain-driven cab usage is trending above your normal transport spend.",
    decision: "Prefer metro + last-mile for the next two rainy mornings.",
    recommendedAction: "Switch to metro for Tue and Wed mornings",
    expectedBenefit: "Keeps the week inside budget with ~₹240 saved",
    alternatives: ["Raise the weekly transport budget", "Carpool with a classmate"],
    source: "prediction",
  },
];

export const DEMO_AGENTS: AgentDef[] = [
  {
    id: "travel",
    name: "Travel Agent",
    role: "Route and travel-time analysis",
    analyzes: ["Traffic", "Routes", "Travel time", "Weather impact", "Transport mode"],
    status: "complete",
    latencyMs: 312,
    accent: "cyan",
  },
  {
    id: "schedule",
    name: "Schedule Agent",
    role: "Commitment and conflict analysis",
    analyzes: ["Deadlines", "Meetings", "Classes", "Conflicts"],
    status: "complete",
    latencyMs: 188,
    accent: "violet",
  },
  {
    id: "environment",
    name: "Environment Agent",
    role: "Conditions and comfort analysis",
    analyzes: ["Weather", "Crowd density", "Noise", "Air quality"],
    status: "complete",
    latencyMs: 241,
    accent: "emerald",
  },
  {
    id: "finance",
    name: "Finance Agent",
    role: "Spending and budget analysis",
    analyzes: ["Daily spending", "Budget", "Predicted expenses"],
    status: "idle",
    latencyMs: 156,
    accent: "amber",
  },
  {
    id: "safety",
    name: "Safety Agent",
    role: "Risk and anomaly analysis",
    analyzes: ["Unusual conditions", "Route risk", "Emergency signals"],
    status: "idle",
    latencyMs: 203,
    accent: "rose",
  },
];

export const DEMO_MEMORIES: MemoryItem[] = [
  {
    id: "m1",
    statement: "You usually leave for college at 8:05 AM.",
    category: "Behavior",
    source: "Observed departures (14 days)",
    confidence: 0.86,
    learnedAt: "2026-07-28",
  },
  {
    id: "m2",
    statement: "You prefer lower-cost transportation when it saves under 10 minutes.",
    category: "Preference",
    source: "Recommendation choices",
    confidence: 0.72,
    learnedAt: "2026-08-02",
  },
  {
    id: "m3",
    statement: "You usually study in quiet environments after 8:00 PM.",
    category: "Behavior",
    source: "Study session labels",
    confidence: 0.79,
    learnedAt: "2026-08-05",
  },
  {
    id: "m4",
    statement: "Rain increases your travel time by roughly 35%.",
    category: "Pattern",
    source: "Travel history + weather",
    confidence: 0.68,
    learnedAt: "2026-08-11",
  },
  {
    id: "m5",
    statement: "You dismiss finance alerts under ₹150 impact.",
    category: "Feedback",
    source: "Your dismissals",
    confidence: 0.61,
    learnedAt: "2026-08-14",
  },
];

export const DEMO_HISTORY: HistoryItem[] = [
  {
    id: "h1",
    problem: "Late arrival to 9:00 AM class",
    predictedProbability: 0.78,
    actualOutcome: "Arrived 9 minutes late",
    correct: true,
    date: "2026-08-14",
    feedback: "Useful — left too late anyway",
  },
  {
    id: "h2",
    problem: "Deadline collision (DBMS + OS)",
    predictedProbability: 0.61,
    actualOutcome: "Both submitted on time",
    correct: false,
    date: "2026-08-12",
    feedback: "Overestimated the workload",
  },
  {
    id: "h3",
    problem: "Battery depletion before commute",
    predictedProbability: 0.7,
    actualOutcome: "Phone died at 6:40 PM",
    correct: true,
    date: "2026-08-11",
  },
  {
    id: "h4",
    problem: "Rain exposure on walk to Block C",
    predictedProbability: 0.55,
    actualOutcome: "Rain stopped before arrival",
    correct: false,
    date: "2026-08-09",
    feedback: "Weather source was 20 min stale",
  },
  {
    id: "h5",
    problem: "Transport budget overrun",
    predictedProbability: 0.49,
    actualOutcome: "Overspent by ₹190",
    correct: true,
    date: "2026-08-07",
  },
  {
    id: "h6",
    problem: "Crowded library at 5:00 PM",
    predictedProbability: 0.83,
    actualOutcome: "No seats available",
    correct: true,
    date: "2026-08-05",
  },
];

export const DEMO_MARKERS: MapMarker[] = [
  { id: "u", label: "You", kind: "user", x: 22, y: 68, detail: "At home · location sharing off" },
  {
    id: "t1",
    label: "JNTU junction",
    kind: "traffic",
    x: 44,
    y: 52,
    detail: "Congestion 54% above average",
  },
  {
    id: "t2",
    label: "Kukatpally Y",
    kind: "traffic",
    x: 33,
    y: 60,
    detail: "Slow-moving, 6 min delay",
  },
  {
    id: "w1",
    label: "Rain cell",
    kind: "weather",
    x: 58,
    y: 34,
    detail: "Moderate rain moving north-east",
  },
  {
    id: "r1",
    label: "Flood-prone underpass",
    kind: "risk",
    x: 51,
    y: 62,
    detail: "Avoid during heavy rain",
  },
  {
    id: "c1",
    label: "Library charging point",
    kind: "charging",
    x: 72,
    y: 44,
    detail: "4 of 6 sockets free",
  },
  {
    id: "s1",
    label: "Quiet study zone",
    kind: "study",
    x: 78,
    y: 58,
    detail: "Noise 32 dB · 18 seats free",
  },
  {
    id: "pl",
    label: "Campus canteen",
    kind: "place",
    x: 68,
    y: 70,
    detail: "Low crowd until 12:30 PM",
  },
];

export const DEMO_SIMULATION: SimulationStep[] = [
  {
    actor: "Environment",
    title: "Traffic increases",
    detail: "Route A congestion rises from moderate to high.",
  },
  {
    actor: "Environment",
    title: "Rain begins",
    detail: "Light rain detected across the first 4 km.",
  },
  {
    actor: "Travel Agent",
    title: "Travel time increases",
    detail: "Estimate moves 28 min → 43 min.",
  },
  {
    actor: "LIFEOS",
    title: "Late-arrival risk detected",
    detail: "Probability crosses the 70% alert threshold.",
  },
  {
    actor: "Travel Agent",
    title: "Routes analysed",
    detail: "Route B is 11 min faster under current rain.",
  },
  {
    actor: "Environment Agent",
    title: "Weather assessed",
    detail: "Rain intensity peaks between 8:20 and 8:40 AM.",
  },
  {
    actor: "Schedule Agent",
    title: "Commitment checked",
    detail: "Class at 9:00 AM, attendance-critical.",
  },
  {
    actor: "Reasoning Engine",
    title: "Recommendation produced",
    detail: "Leave now via Route B — arrival ≈ 8:48 AM.",
  },
  { actor: "You", title: "Action delivered", detail: "One-tap: start navigation on Route B." },
];

export const DEMO_ANALYTICS = {
  problemsPrevented: 37,
  minutesSaved: 486,
  moneySaved: 2140,
  predictionsMade: 214,
  accuracy: 0.79,
  averageConfidence: 0.73,
  frictionSources: [
    { name: "Travel", value: 42 },
    { name: "Schedule", value: 26 },
    { name: "Environment", value: 15 },
    { name: "Finance", value: 11 },
    { name: "Safety", value: 6 },
  ],
  weekly: [
    { week: "W1", predictions: 24, accuracy: 68, saved: 42 },
    { week: "W2", predictions: 31, accuracy: 71, saved: 55 },
    { week: "W3", predictions: 38, accuracy: 74, saved: 61 },
    { week: "W4", predictions: 35, accuracy: 76, saved: 72 },
    { week: "W5", predictions: 41, accuracy: 78, saved: 88 },
    { week: "W6", predictions: 45, accuracy: 79, saved: 96 },
  ],
};

export const DEMO_CITY = {
  hotspots: [
    { name: "JNTU junction", level: 88, note: "Congestion hotspot · 07:40–09:20" },
    { name: "Miyapur corridor", level: 74, note: "Slow-moving traffic after rain" },
    { name: "KPHB metro exit", level: 66, note: "High pedestrian density" },
    { name: "Balanagar flyover", level: 51, note: "Recovering from earlier incident" },
  ],
  crowd: [
    { zone: "Campus library", density: 82 },
    { zone: "Food street", density: 64 },
    { zone: "Metro platform 2", density: 71 },
    { zone: "Bus bay", density: 38 },
  ],
  anomalies: [
    { label: "Air quality dip", detail: "PM2.5 up 22% vs. 7-day mean in the industrial belt" },
    { label: "Waterlogging signal", detail: "3 aggregated reports near the underpass" },
    { label: "Noise spike", detail: "Sustained 78 dB near the construction zone" },
  ],
  infrastructure: [
    { label: "Streetlight outage", count: 12, area: "Sector 4" },
    { label: "Pothole reports", count: 27, area: "Ring road" },
    { label: "Signal fault", count: 3, area: "Central junction" },
  ],
  predictedZones: [
    { name: "Underpass corridor", risk: "High", window: "17:30–19:00" },
    { name: "Market approach", risk: "Medium", window: "18:00–20:00" },
    { name: "Stadium road", risk: "Medium", window: "19:30–21:00" },
  ],
};

export const DEMO_TASKS = [
  { id: "t1", title: "Submit DBMS report", due: "Thu 11:59 PM", priority: "high", done: false },
  { id: "t2", title: "Prepare OS lab record", due: "Tue 6:00 PM", priority: "medium", done: false },
  { id: "t3", title: "Pay hostel mess bill", due: "Fri", priority: "medium", done: true },
  { id: "t4", title: "Return library book", due: "Today", priority: "low", done: false },
];

export const DEMO_SCHEDULE = [
  { time: "9:00 AM", title: "Data Structures class", place: "Block C · 204", kind: "class" },
  { time: "11:00 AM", title: "Charging window", place: "Library · Block B", kind: "suggested" },
  { time: "1:30 PM", title: "Project standup", place: "Innovation lab", kind: "meeting" },
  { time: "4:00 PM", title: "OS lab", place: "Block D · Lab 2", kind: "class" },
  { time: "8:00 PM", title: "Study block — DBMS", place: "Quiet zone", kind: "study" },
];
