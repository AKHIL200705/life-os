import { D as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { K as Building2, a as Users, c as TrafficCone, o as TriangleAlert } from "./_libs/lucide-react.mjs";
import { n as Panel, r as PanelHeader, t as PageHeader } from "./_ssr/Panel-CSrXbfmH.mjs";
import { t as DemoNotice } from "./_ssr/SourceBadge-Ccjkhr9j.mjs";
import { t as Badge } from "./_ssr/badge-D1Dupn2y.mjs";
import { r as DEMO_CITY } from "./_ssr/demo-data-B2rfthtF.mjs";
import { t as Meter } from "./_ssr/RiskGauge-exlmt4KI.mjs";
import { t as StatTile } from "./_ssr/StatTile-BZPPnOoZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated.city-9tEprEnG.js
var import_jsx_runtime = require_jsx_runtime();
function CityPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "City intelligence",
			title: "Aggregate signals, no personal data",
			description: "Individual behaviour never leaves your device model. This layer works only on anonymised aggregates — and it is what lets LIFEOS predict problems before they reach you.",
			right: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				variant: "outline",
				className: "border-success/40 text-success",
				children: "anonymised aggregate"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoNotice, { children: "All city figures on this page are simulated aggregates for demonstration." })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
					label: "Active hotspots",
					value: DEMO_CITY.hotspots.length,
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrafficCone, { className: "size-4" }),
					hint: "Above 7-day baseline"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
					label: "Crowd zones tracked",
					value: DEMO_CITY.crowd.length,
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "size-4" }),
					hint: "Density estimates only"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
					label: "Anomalies detected",
					value: DEMO_CITY.anomalies.length,
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-4" }),
					hint: "Environmental signals"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
					label: "Infrastructure reports",
					value: DEMO_CITY.infrastructure.reduce((sum, i) => sum + i.count, 0),
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { className: "size-4" }),
					hint: "Aggregated citizen reports"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "scene-3d mt-4 grid gap-4 lg:grid-cols-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
					title: "Congestion hotspots",
					subtitle: "Relative to the 7-day mean"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "space-y-4",
					children: DEMO_CITY.hotspots.map((hotspot) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
						label: hotspot.name,
						value: hotspot.level / 100,
						hint: hotspot.note,
						tone: hotspot.level > 80 ? "destructive" : hotspot.level > 60 ? "warning" : "primary"
					}, hotspot.name))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
					title: "Crowd density",
					subtitle: "Estimated occupancy by zone"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-3 sm:grid-cols-2",
					children: DEMO_CITY.crowd.map((zone) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-surface-2/50 p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm",
								children: zone.zone
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xl font-semibold",
								children: [zone.density, "%"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-2 h-1.5 overflow-hidden rounded-full bg-muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full rounded-full bg-primary transition-[width] duration-700",
									style: { width: `${zone.density}%` }
								})
							})
						]
					}, zone.zone))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
					title: "Environmental anomalies",
					subtitle: "Deviation from local norms"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: DEMO_CITY.anomalies.map((anomaly) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-xl border border-warning/25 bg-warning/8 p-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: anomaly.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-0.5 text-xs text-muted-foreground",
							children: anomaly.detail
						})]
					}, anomaly.label))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
					title: "Predicted problem zones",
					subtitle: "Forward-looking, not observed"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2",
					children: DEMO_CITY.predictedZones.map((zone) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between rounded-xl border border-border bg-surface-2/50 px-3 py-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: zone.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								variant: "outline",
								className: zone.risk === "High" ? "border-destructive/45 text-destructive" : "border-warning/45 text-warning",
								children: zone.risk
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block font-mono text-[11px] text-muted-foreground",
								children: zone.window
							})]
						})]
					}, zone.name))
				})] })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
				title: "Infrastructure issues",
				subtitle: "Aggregated citizen reports"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: DEMO_CITY.infrastructure.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-surface-2/50 p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-2xl font-semibold",
							children: item.count
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm",
							children: item.label
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted-foreground",
							children: item.area
						})
					]
				}, item.label))
			})]
		})
	] });
}
//#endregion
export { CityPage as component };
