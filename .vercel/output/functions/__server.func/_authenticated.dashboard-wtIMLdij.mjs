import { i as __toESM } from "./_runtime.mjs";
import { r as require_react } from "./_libs/@hookform/resolvers+[...].mjs";
import { g as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { D as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { n as useAuth } from "./_ssr/router-BvJIRm2k.mjs";
import { t as Button } from "./_ssr/button-BLZ6ednA.mjs";
import { t as CoreOrb } from "./_ssr/CoreOrb-ClgWgMJd.mjs";
import { F as Clock, G as CalendarClock, P as CloudRain, Q as BatteryLow, S as Navigation, T as MapPin, V as CircleCheck, c as TrafficCone, i as Wallet, p as Signal } from "./_libs/lucide-react.mjs";
import { n as Panel, r as PanelHeader, t as PageHeader } from "./_ssr/Panel-CSrXbfmH.mjs";
import { n as SourceBadge, t as DemoNotice } from "./_ssr/SourceBadge-Ccjkhr9j.mjs";
import { t as Badge } from "./_ssr/badge-D1Dupn2y.mjs";
import { c as DEMO_PREDICTIONS, d as DEMO_TASKS, i as DEMO_CONTEXT, l as DEMO_SCHEDULE } from "./_ssr/demo-data-B2rfthtF.mjs";
import { n as RiskGauge } from "./_ssr/RiskGauge-exlmt4KI.mjs";
import { t as StatTile } from "./_ssr/StatTile-BZPPnOoZ.mjs";
import { t as PredictionCard } from "./_ssr/PredictionCard-DA6YmQKG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated.dashboard-wtIMLdij.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function greeting() {
	const hour = (/* @__PURE__ */ new Date()).getHours();
	if (hour < 12) return "Good morning";
	if (hour < 17) return "Good afternoon";
	return "Good evening";
}
function CommandCenter() {
	const { user } = useAuth();
	const [dismissed, setDismissed] = (0, import_react.useState)([]);
	const name = user?.user_metadata?.["display_name"] ?? user?.user_metadata?.["full_name"] ?? user?.email?.split("@")[0] ?? "there";
	const predictions = (0, import_react.useMemo)(() => DEMO_PREDICTIONS.filter((p) => !dismissed.includes(p.id)), [dismissed]);
	const top = predictions[0];
	const riskLevel = predictions.length ? Math.max(...predictions.map((p) => p.probability)) : 0;
	function handleAct(prediction) {
		toast.success("Action queued for confirmation", { description: `${prediction.recommendedAction} — confirm it in the Action Center.` });
	}
	function handleDismiss(prediction) {
		setDismissed((prev) => [...prev, prediction.id]);
		toast("Prediction dismissed", { description: "LIFEOS will use this as feedback." });
	}
	function handleSnooze(prediction) {
		toast("Snoozed for 30 minutes", { description: prediction.problem });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "LIFEOS Command Center",
			title: `${greeting()}, ${name}.`,
			description: "Here is what LIFEOS believes is forming around you right now, and the one action that changes the outcome.",
			right: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceBadge, { source: "simulated" })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoNotice, {})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-[1.6fr_1fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				glow: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
					title: "Current situation",
					subtitle: `${DEMO_CONTEXT.time} · ${DEMO_CONTEXT.locationStatus}`,
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "size-4" }),
					right: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						className: "border-success/40 text-success",
						children: "AI status: active"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3 sm:grid-cols-2 xl:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextTile, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudRain, { className: "size-4" }),
							label: "Weather",
							value: `${DEMO_CONTEXT.weather} · ${DEMO_CONTEXT.temperatureC}°C`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextTile, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrafficCone, { className: "size-4" }),
							label: "Traffic",
							value: `${DEMO_CONTEXT.trafficLevel} · ${DEMO_CONTEXT.travelTimeMin} min`,
							tone: "bad"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextTile, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "size-4" }),
							label: "Next event",
							value: `${DEMO_CONTEXT.nextEvent.title} · ${DEMO_CONTEXT.nextEvent.at}`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextTile, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BatteryLow, { className: "size-4" }),
							label: "Battery",
							value: `${DEMO_CONTEXT.battery}%`,
							tone: "warn"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextTile, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Signal, { className: "size-4" }),
							label: "Connectivity",
							value: DEMO_CONTEXT.connectivity,
							tone: "good"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContextTile, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "size-4" }),
							label: "Baseline travel",
							value: `${DEMO_CONTEXT.baselineTravelMin} min`
						})
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
				title: "Risk level",
				subtitle: "Highest open prediction"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RiskGauge, {
					value: riskLevel,
					caption: top ? top.problem : "No open predictions"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoreOrb, {
					size: 140,
					label: "LIFEOS",
					status: "Reasoning"
				})]
			})] })]
		}),
		top ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-4",
			glow: true,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
				title: "Primary recommendation",
				subtitle: "Produced by the reasoning engine from 3 agent reports",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation, { className: "size-4" }),
				right: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceBadge, { source: "prediction" })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-5 lg:grid-cols-[1.3fr_1fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-lg font-semibold tracking-tight",
						children: top.recommendedAction
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-sm text-muted-foreground",
						children: top.situation
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-2 sm:grid-cols-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
								label: "Predicted arrival",
								value: "8:48 AM"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
								label: "Confidence",
								value: `${Math.round(top.confidence * 100)}%`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
								label: "Time saved",
								value: "17 min"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-xs text-muted-foreground",
						children: top.expectedBenefit
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/actions",
								children: "Open Action Center"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/predictions",
								children: "All predictions"
							})
						})]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-surface-2/50 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] uppercase tracking-[0.16em] text-primary",
						children: "Alternatives"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-2 space-y-2 text-xs text-muted-foreground",
						children: top.alternatives.map((alt) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" }), alt]
						}, alt))
					})]
				})]
			})]
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-8",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-3 flex items-center justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-lg font-semibold tracking-tight",
					children: "Today's predicted problems"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "ghost",
					size: "sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/predictions",
						children: "View all"
					})
				})]
			}), predictions.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "scene-3d grid gap-4 lg:grid-cols-2",
				children: predictions.slice(0, 2).map((prediction) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PredictionCard, {
					prediction,
					onAct: handleAct,
					onDismiss: handleDismiss,
					onSnooze: handleSnooze
				}, prediction.id))
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col items-center py-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
						className: "size-8 text-success",
						"aria-hidden": true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm font-medium",
						children: "No open predictions"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "LIFEOS is monitoring your context and will alert you when friction forms."
					})
				]
			}) })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-8 grid gap-4 lg:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
					title: "Today's schedule",
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, { className: "size-4" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2.5",
					children: DEMO_SCHEDULE.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-start gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "w-16 shrink-0 font-mono text-[11px] text-primary",
								children: item.time
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm",
									children: item.title
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-[11px] text-muted-foreground",
									children: item.place
								})]
							}),
							item.kind === "suggested" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								className: "ml-auto border-primary/40 text-primary",
								children: "AI"
							}) : null
						]
					}, item.title))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
					title: "Tasks",
					subtitle: "Ranked by deadline pressure"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2.5",
					children: DEMO_TASKS.map((task) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: task.done ? "size-2 rounded-full bg-success" : task.priority === "high" ? "size-2 rounded-full bg-destructive" : "size-2 rounded-full bg-warning" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: task.done ? "text-sm text-muted-foreground line-through" : "text-sm",
								children: task.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ml-auto font-mono text-[11px] text-muted-foreground",
								children: task.due
							})
						]
					}, task.id))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
							label: "Travel status",
							value: "Route B",
							unit: "advised",
							hint: "11 min faster in rain",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navigation, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
							label: "Environment",
							value: "Rain",
							unit: "moderate",
							hint: "Peaks 8:20–8:40 AM",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudRain, { className: "size-4" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
							label: "Spend today",
							value: "₹180",
							hint: "78% of weekly transport budget used",
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, { className: "size-4" })
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
				title: "Personal insights",
				subtitle: "Derived from your patterns"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					"You leave 9 minutes later than optimal on rainy days.",
					"Your best study retention is between 8:00 and 10:00 PM.",
					"Cab spend rises 2.4× in weeks with more than 3 rain days."
				].map((insight) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-xl border border-border bg-surface-2/50 p-3 text-xs leading-relaxed text-muted-foreground",
					children: insight
				}, insight))
			})]
		})
	] });
}
function ContextTile({ icon, label, value, tone = "neutral" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-surface-2/50 p-3 transition-transform duration-300 hover:-translate-y-0.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-center gap-2 text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-primary",
				children: icon
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-mono text-[10px] uppercase tracking-[0.16em]",
				children: label
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: `mt-1.5 text-sm font-medium capitalize ${tone === "bad" ? "text-destructive" : tone === "warn" ? "text-warning" : tone === "good" ? "text-success" : "text-foreground"}`,
			children: value
		})]
	});
}
function MiniStat({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-surface-2/50 px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[10px] uppercase tracking-[0.14em] text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-0.5 font-mono text-sm",
			children: value
		})]
	});
}
//#endregion
export { CommandCenter as component };
