import { g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Button } from "./button-BLZ6ednA.mjs";
import { t as CoreOrb } from "./CoreOrb-ClgWgMJd.mjs";
import { t as Logo } from "./Logo-B7D1DxTI.mjs";
import { J as Bot, K as Building2, et as ArrowRight, f as Sparkles, j as Gauge, m as ShieldCheck, q as Brain, t as Zap, w as Map } from "../_libs/lucide-react.mjs";
import { n as Panel, r as PanelHeader } from "./Panel-CSrXbfmH.mjs";
import { n as SourceBadge } from "./SourceBadge-Ccjkhr9j.mjs";
import { n as DEMO_ANALYTICS } from "./demo-data-B2rfthtF.mjs";
import { t as StatTile } from "./StatTile-BZPPnOoZ.mjs";
import { t as PipelineFlow } from "./PipelineFlow-DeERmMq8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-BEJq3BX4.js
var import_jsx_runtime = require_jsx_runtime();
var FEATURES = [
	{
		icon: Gauge,
		title: "Command Center",
		body: "One screen for current context, live risk level, today's predicted problems and the single best next action."
	},
	{
		icon: Sparkles,
		title: "Friction Prediction Engine",
		body: "Probability, severity, time-to-event, reasons, expected benefit and confidence for every predicted problem."
	},
	{
		icon: Bot,
		title: "Multi-agent reasoning",
		body: "Travel, Schedule, Environment, Finance and Safety agents feed a central reasoning engine that produces one decision."
	},
	{
		icon: Brain,
		title: "Digital twin & memory",
		body: "A structured model of your behaviour, preferences, schedule and context — inspectable, correctable, deletable."
	},
	{
		icon: Map,
		title: "Environment map",
		body: "Traffic, weather, risk zones, charging points and study spots on a provider-agnostic spatial layer."
	},
	{
		icon: Building2,
		title: "City intelligence",
		body: "Anonymised aggregate signals surface congestion hotspots and predicted problem zones — never individual people."
	}
];
function Landing() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid-bg pointer-events-none absolute inset-0 opacity-40",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex items-center gap-1.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						size: "sm",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/technology",
							children: "Technology"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/auth",
							children: "Enter LIFEOS"
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "relative mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "grid items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "animate-rise",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/8 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-primary",
									children: "Proactive life intelligence"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
									className: "text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-gradient",
											children: "Predict everyday problems"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
										"before they happen."
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-5 max-w-xl text-base leading-relaxed text-muted-foreground",
									children: "Today's assistants wait to be asked. LIFEOS reads your permitted context — schedule, routine, traffic, weather, device state — detects the friction forming ahead of you, explains the reasoning, and recommends the action that prevents it."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-8 flex flex-wrap items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "lg",
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/auth",
											children: ["Launch the command center", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1.5 size-4" })]
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										size: "lg",
										variant: "outline",
										asChild: true,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/technology",
											children: "How it works"
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-6 max-w-lg text-xs leading-relaxed text-muted-foreground",
									children: "Prototype build. Predictions shown in the product are generated from simulated demo signals and are clearly labelled — they are not validated forecasts or medical, financial or safety advice."
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoreOrb, {
								size: 330,
								status: "Monitoring"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
								className: "mt-6",
								glow: true,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
										title: "Live example",
										subtitle: "Student · 8:05 AM",
										icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-4" }),
										right: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceBadge, { source: "prediction" })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-semibold text-destructive",
											children: "82% risk"
										}), " of arriving late to your 9:00 AM class."]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 text-xs text-muted-foreground",
										children: "Traffic is 54% above your weekday average and rain has started. Travel time moved from 28 to 43 minutes."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-3 rounded-xl border border-primary/25 bg-primary/8 p-3 text-sm",
										children: "Leave now via Route B — expected arrival 8:48 AM."
									})
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "py-10",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mb-2 text-xl font-semibold tracking-tight sm:text-2xl",
								children: "One loop, end to end"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-6 max-w-2xl text-sm text-muted-foreground",
								children: "Understand → Predict → Reason → Recommend → Act → Learn. Every stage is visible in the product, so a recommendation is never a black box."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PipelineFlow, { activeIndex: 6 })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "scene-3d py-14",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mb-6 text-xl font-semibold tracking-tight sm:text-2xl",
							children: "Built as an operating system, not a chatbot"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
							children: FEATURES.map((feature) => {
								const Icon = feature.icon;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "glass tilt-3d rounded-2xl p-5",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "grid size-10 place-items-center rounded-xl border border-border bg-surface-2/70 text-primary",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
												className: "size-5",
												"aria-hidden": true
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "mt-4 text-sm font-semibold tracking-tight",
											children: feature.title
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1.5 text-xs leading-relaxed text-muted-foreground",
											children: feature.body
										})
									]
								}, feature.title);
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "py-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex flex-wrap items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "text-xl font-semibold tracking-tight sm:text-2xl",
								children: "Prototype results"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceBadge, { source: "simulated" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
									label: "Problems prevented",
									value: DEMO_ANALYTICS.problemsPrevented,
									hint: "6-week simulation"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
									label: "Time saved",
									value: DEMO_ANALYTICS.minutesSaved,
									unit: "min",
									hint: "Across 214 predictions"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
									label: "Prediction accuracy",
									value: `${Math.round(DEMO_ANALYTICS.accuracy * 100)}%`,
									hint: "Self-reported outcomes"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
									label: "Avg. confidence",
									value: `${Math.round(DEMO_ANALYTICS.averageConfidence * 100)}%`,
									hint: "Calibration target: 80%"
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
						className: "py-10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
							className: "flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start gap-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-11 shrink-0 place-items-center rounded-xl border border-success/30 bg-success/10 text-success",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
										className: "size-5",
										"aria-hidden": true
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
									className: "text-base font-semibold tracking-tight",
									children: "Privacy-first by default"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 max-w-xl text-sm text-muted-foreground",
									children: "Every permission starts off. You can see exactly what LIFEOS has learned, correct it, and delete it. City intelligence uses simulated, anonymised aggregates only — never another person's location or identity."
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: "outline",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/auth",
									children: "Review privacy controls"
								})
							})]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "relative border-t border-border py-8",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "LIFEOS research prototype · simulated data clearly labelled throughout."
					})]
				})
			})
		]
	});
}
//#endregion
export { Landing as component };
