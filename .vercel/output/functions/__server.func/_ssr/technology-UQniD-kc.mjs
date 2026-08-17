import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BLZ6ednA.mjs";
import { t as Logo } from "./Logo-B7D1DxTI.mjs";
import { tt as ArrowLeft } from "../_libs/lucide-react.mjs";
import { n as Panel, r as PanelHeader, t as PageHeader } from "./Panel-CSrXbfmH.mjs";
import { t as DEMO_AGENTS } from "./demo-data-B2rfthtF.mjs";
import { t as AgentConstellation } from "./AgentConstellation-DO8iAmMq.mjs";
import { t as PipelineFlow } from "./PipelineFlow-DeERmMq8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/technology-UQniD-kc.js
var import_jsx_runtime = require_jsx_runtime();
var RESEARCH = [
	{
		area: "Context-aware computing",
		body: "Fusing schedule, location, device and environment signals into a single machine-readable situation model."
	},
	{
		area: "Multi-agent AI",
		body: "Specialised analysers each own one domain; a reasoning layer arbitrates between their conclusions."
	},
	{
		area: "Predictive analytics",
		body: "Probability, severity and confidence estimation for near-term friction events, scored against real outcomes."
	},
	{
		area: "Digital twins",
		body: "A persistent behavioural model of one person: routines, preferences, commitments and current state."
	},
	{
		area: "Human–AI interaction",
		body: "Recommendations that always expose their signals and reasoning, with confirmation before consequential actions."
	},
	{
		area: "Privacy-preserving intelligence",
		body: "Opt-in permissions, local relevance, aggregate-only city signals, and user-controlled memory deletion."
	},
	{
		area: "Real-time event processing",
		body: "Streaming context changes re-evaluate open predictions instead of running a fixed daily batch."
	}
];
var ARCHITECTURE = `┌──────────────────────────────────────────────────────────────┐
│  CLIENT  React + TypeScript + Tailwind (command center UI)    │
└───────────────┬──────────────────────────────────────────────┘
                │ typed server functions
┌───────────────▼──────────────────────────────────────────────┐
│  APPLICATION LAYER                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐  │
│  │ AI service   │  │ Map service  │  │ Signal ingestion   │  │
│  │ abstraction  │  │ abstraction  │  │ (traffic/weather)  │  │
│  └──────┬───────┘  └──────┬───────┘  └─────────┬──────────┘  │
│         └─────────────────┴────────────────────┘             │
│                    ┌──────▼──────┐                           │
│                    │  AGENTS     │ travel · schedule ·       │
│                    │  LAYER      │ environment · finance ·   │
│                    └──────┬──────┘ safety                    │
│                    ┌──────▼──────┐                           │
│                    │ REASONING   │ fusion · scoring ·        │
│                    │ ENGINE      │ explanation               │
│                    └──────┬──────┘                           │
└───────────────────────────┼──────────────────────────────────┘
                ┌───────────▼────────────┐
                │  DATA LAYER (Postgres) │ row-level security
                │  twin · predictions ·  │ per-user isolation
                │  memories · actions    │
                └────────────────────────┘`;
function TechnologyPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid-bg pointer-events-none absolute inset-0 opacity-30",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "ghost",
					size: "sm",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "mr-1.5 size-4" }), " Overview"]
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "relative mx-auto w-full max-w-6xl px-4 pb-20 pt-6 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
						eyebrow: "About the technology",
						title: "A proactive architecture for everyday friction",
						description: "LIFEOS is a research prototype exploring whether an assistant can detect and prevent\n            everyday problems instead of waiting to be asked."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-4 lg:grid-cols-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, { title: "The problem" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted-foreground",
							children: "Existing digital assistants are mostly reactive: they respond to explicit commands. The user has to already know that a problem exists, and to know which question to ask. Most everyday friction — leaving too late, colliding deadlines, a dead battery, an avoidable expense — is predictable from context well before it becomes a problem."
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, { title: "The LIFEOS approach" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm leading-relaxed text-muted-foreground",
							children: "LIFEOS combines a persistent digital twin, historical behaviour patterns, live external signals and specialised agents. A reasoning layer merges agent conclusions into a single ranked prediction with an explicit probability, severity, confidence and a recommended action the user can accept, alter or reject."
						})] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-10",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-4 text-lg font-semibold tracking-tight",
							children: "Processing pipeline"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PipelineFlow, { activeIndex: 6 })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-4 text-lg font-semibold tracking-tight",
							children: "Agent topology"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
							tilt: false,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentConstellation, {
								agents: DEMO_AGENTS,
								activeIds: [
									"travel",
									"schedule",
									"environment"
								]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-4 text-lg font-semibold tracking-tight",
							children: "System architecture"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
							tilt: false,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("pre", {
								className: "overflow-x-auto font-mono text-[10px] leading-relaxed text-muted-foreground sm:text-xs",
								children: ARCHITECTURE
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "mt-12",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-4 text-lg font-semibold tracking-tight",
							children: "Research areas"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "scene-3d grid gap-3 sm:grid-cols-2",
							children: RESEARCH.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "glass tilt-3d-soft rounded-2xl p-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "text-sm font-semibold tracking-tight",
									children: item.area
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1.5 text-xs leading-relaxed text-muted-foreground",
									children: item.body
								})]
							}, item.area))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "mt-12",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
							title: "Current limitations",
							subtitle: "Stated explicitly for evaluation"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-2 text-sm text-muted-foreground",
							children: [
								"External sensors and third-party APIs are not connected; signals are simulated.",
								"Predictions come from rule-based heuristics over demo data, not a trained model.",
								"Accuracy figures describe the simulation, not validated field performance.",
								"No medical, financial or safety claims are made or implied."
							].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-warning" }), item]
							}, item))
						})] })
					})
				]
			})
		]
	});
}
//#endregion
export { TechnologyPage as component };
