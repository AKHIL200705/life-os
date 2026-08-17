import { D as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as Panel, r as PanelHeader, t as PageHeader } from "./_ssr/Panel-CSrXbfmH.mjs";
import { t as DemoNotice } from "./_ssr/SourceBadge-Ccjkhr9j.mjs";
import { n as DEMO_ANALYTICS } from "./_ssr/demo-data-B2rfthtF.mjs";
import { t as Meter } from "./_ssr/RiskGauge-exlmt4KI.mjs";
import { t as StatTile } from "./_ssr/StatTile-BZPPnOoZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated.analytics-jYdJC2P_.js
var import_jsx_runtime = require_jsx_runtime();
function AnalyticsPage() {
	const a = DEMO_ANALYTICS;
	const maxSaved = Math.max(...a.weekly.map((w) => w.saved));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Analytics",
			title: "Impact you can measure",
			description: "Prediction is only valuable if it changes outcomes. These are the aggregate results of acting on LIFEOS recommendations."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoNotice, { children: "All analytics figures are simulated for demonstration." })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
					label: "Problems prevented",
					value: a.problemsPrevented,
					hint: "Acted-on predictions"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
					label: "Time saved",
					value: a.minutesSaved,
					unit: "min",
					hint: "Estimated cumulative"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
					label: "Money saved",
					value: `₹${a.moneySaved}`,
					hint: "Avoided surge & penalties"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
					label: "Predictions made",
					value: a.predictionsMade,
					hint: `${Math.round(a.accuracy * 100)}% accurate`
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "scene-3d mt-4 grid gap-4 lg:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
						title: "Accuracy trend",
						subtitle: "Last six weeks"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-52 items-end gap-3",
						children: a.weekly.map((week) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-1 flex-col items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "font-mono text-[10px] text-primary",
									children: [week.accuracy, "%"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex h-full w-full items-end gap-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex-1 rounded-t bg-primary/70 transition-[height] duration-700",
										style: { height: `${week.accuracy}%` },
										title: `Accuracy ${week.accuracy}%`
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "flex-1 rounded-t bg-success/60 transition-[height] duration-700",
										style: { height: `${week.saved / maxSaved * 100}%` },
										title: `${week.saved} min saved`
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-[10px] text-muted-foreground",
									children: week.week
								})
							]
						}, week.week))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-[11px] text-muted-foreground",
						children: "Cyan = accuracy · green = minutes saved"
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
					title: "Friction sources",
					subtitle: "Where your problems originate"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					children: a.frictionSources.map((source) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
						label: source.name,
						value: source.value / 100,
						tone: source.value > 35 ? "destructive" : source.value > 20 ? "warning" : "primary"
					}, source.name))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
						title: "Confidence calibration",
						subtitle: "How well confidence matches reality"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
						label: "Average confidence",
						value: a.averageConfidence,
						tone: "primary"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
							label: "Realised accuracy",
							value: a.accuracy,
							tone: "success"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-xs text-muted-foreground",
						children: "Accuracy slightly above average confidence means LIFEOS is currently conservative — a safer failure mode than over-confidence."
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
					title: "Predictions per week",
					subtitle: "Volume across the last six weeks"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2 text-sm",
					children: a.weekly.map((week) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between rounded-xl border border-border bg-surface-2/50 px-3 py-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-muted-foreground",
								children: week.week
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [week.predictions, " predictions"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-xs text-success",
								children: [week.saved, " min saved"]
							})
						]
					}, week.week))
				})] })
			]
		})
	] });
}
//#endregion
export { AnalyticsPage as component };
