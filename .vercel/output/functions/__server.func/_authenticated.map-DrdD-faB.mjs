import { i as __toESM } from "./_runtime.mjs";
import { r as require_react } from "./_libs/@hookform/resolvers+[...].mjs";
import { D as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as useQuery } from "./_libs/tanstack__react-query.mjs";
import { t as cn } from "./_ssr/utils-C_uf36nf.mjs";
import { t as Button } from "./_ssr/button-BLZ6ednA.mjs";
import { $ as BatteryCharging, P as CloudRain, T as MapPin, X as BookOpen, c as TrafficCone, d as Store, h as ShieldAlert } from "./_libs/lucide-react.mjs";
import { n as Panel, r as PanelHeader, t as PageHeader } from "./_ssr/Panel-CSrXbfmH.mjs";
import { t as DemoNotice } from "./_ssr/SourceBadge-Ccjkhr9j.mjs";
import { o as DEMO_MARKERS } from "./_ssr/demo-data-B2rfthtF.mjs";
import { t as Skeleton } from "./_ssr/skeleton-D9W9wFsj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated.map-DrdD-faB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var KIND = {
	user: {
		icon: MapPin,
		color: "var(--primary)",
		label: "You"
	},
	traffic: {
		icon: TrafficCone,
		color: "var(--warning)",
		label: "Traffic"
	},
	weather: {
		icon: CloudRain,
		color: "var(--info)",
		label: "Weather"
	},
	risk: {
		icon: ShieldAlert,
		color: "var(--destructive)",
		label: "Risk zone"
	},
	charging: {
		icon: BatteryCharging,
		color: "var(--success)",
		label: "Charging"
	},
	study: {
		icon: BookOpen,
		color: "var(--chart-4)",
		label: "Study spot"
	},
	place: {
		icon: Store,
		color: "var(--muted-foreground)",
		label: "Useful place"
	}
};
/**
* Simulated 3D environment plane. Uses a normalised 0-100 coordinate space so a
* real map provider can replace it behind the same marker contract.
*/
function HoloMap({ markers, className, height = 420 }) {
	const [selected, setSelected] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("scene-3d relative", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "glass relative overflow-hidden rounded-3xl",
			style: { height },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "layer-3d absolute inset-0",
					style: { transform: "rotateX(46deg) scale(1.22) translateY(6%)" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "grid-bg absolute inset-[-30%] opacity-70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-[-30%]",
						style: { background: "radial-gradient(40% 40% at 50% 45%, oklch(0.79 0.145 202 / 0.16), transparent 70%)" }
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					"aria-hidden": true,
					className: "pointer-events-none absolute inset-x-0 h-24",
					style: {
						background: "linear-gradient(to bottom, transparent, oklch(0.79 0.145 202 / 0.14), transparent)",
						animation: "scan 7s ease-in-out infinite"
					}
				}),
				markers.map((marker) => {
					const config = KIND[marker.kind];
					const Icon = config.icon;
					const isActive = selected?.id === marker.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setSelected(isActive ? null : marker),
						className: "group absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none",
						style: {
							left: `${marker.x}%`,
							top: `${marker.y}%`
						},
						"aria-label": `${config.label}: ${marker.label}`,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("grid size-9 place-items-center rounded-xl border bg-surface-2/80 backdrop-blur transition-all duration-300 group-hover:-translate-y-1.5", isActive && "-translate-y-1.5"),
								style: {
									borderColor: config.color,
									boxShadow: `0 8px 24px -10px ${config.color}`
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "size-4",
									style: { color: config.color },
									"aria-hidden": true
								})
							}),
							marker.kind === "user" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "absolute left-1/2 top-1/2 -z-10 size-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/50",
								style: { animation: "pulse-ring 2.4s ease-out infinite" }
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block whitespace-nowrap text-[10px] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100",
								children: marker.label
							})
						]
					}, marker.id);
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute left-4 top-4 flex flex-wrap gap-1.5",
					children: Object.entries(KIND).map(([key, config]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1 rounded-full border border-border bg-surface/70 px-2 py-0.5 text-[10px] text-muted-foreground backdrop-blur",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "size-1.5 rounded-full",
							style: { background: config.color }
						}), config.label]
					}, key))
				}),
				selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "absolute inset-x-4 bottom-4 rounded-2xl border border-primary/30 bg-surface/85 p-3 backdrop-blur sm:max-w-xs",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-semibold",
						children: selected.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-0.5 text-xs text-muted-foreground",
						children: selected.detail
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "absolute inset-x-4 bottom-4 text-[11px] text-muted-foreground",
					children: "Select a marker for detail. Positions are simulated on a normalised grid — connect a map provider to render live geography."
				})
			]
		})
	});
}
var mapService = {
	providerName: "LIFEOS Simulated Grid",
	async listMarkers() {
		await new Promise((r) => setTimeout(r, 160));
		return DEMO_MARKERS;
	}
};
var LAYERS = [
	{
		id: "traffic",
		label: "Traffic"
	},
	{
		id: "weather",
		label: "Weather"
	},
	{
		id: "risk",
		label: "Risk zones"
	},
	{
		id: "charging",
		label: "Charging"
	},
	{
		id: "study",
		label: "Study spots"
	},
	{
		id: "place",
		label: "Useful places"
	}
];
function MapPage() {
	const [enabled, setEnabled] = (0, import_react.useState)([
		"traffic",
		"weather",
		"risk",
		"charging",
		"study",
		"place"
	]);
	const { data, isLoading } = useQuery({
		queryKey: ["map-markers"],
		queryFn: () => mapService.listMarkers()
	});
	const markers = (data ?? []).filter((m) => m.kind === "user" || enabled.includes(m.kind));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Environment map",
			title: "What is happening around you",
			description: "Spatial signals are what turn a calendar into a prediction. Toggle layers to see which signals drive the current risk picture."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoNotice, { children: "Marker positions are simulated on a normalised grid. The map service is abstracted, so a live provider can be connected without changing this screen." })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex flex-wrap gap-2",
			children: LAYERS.map((layer) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: enabled.includes(layer.id) ? "default" : "outline",
				onClick: () => setEnabled((prev) => prev.includes(layer.id) ? prev.filter((id) => id !== layer.id) : [...prev, layer.id]),
				children: layer.label
			}, layer.id))
		}),
		isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-[420px] rounded-3xl" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HoloMap, {
			markers,
			height: 460
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "scene-3d mt-6 grid gap-4 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
					title: "Route comparison",
					subtitle: "Under current rain and congestion"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "space-y-2 text-sm",
					children: [
						{
							name: "Route A · main road",
							time: "43 min",
							note: "Flood-prone underpass"
						},
						{
							name: "Route B · metro + walk",
							time: "32 min",
							note: "Recommended"
						},
						{
							name: "Route C · ring road",
							time: "39 min",
							note: "Longer but steady"
						}
					].map((route) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center justify-between rounded-xl border border-border bg-surface-2/50 px-3 py-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: route.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block font-mono text-xs text-primary",
								children: route.time
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-[11px] text-muted-foreground",
								children: route.note
							})]
						})]
					}, route.name))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
					title: "Nearby resources",
					subtitle: "Ranked by your preferences"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-2 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Library charging point · 4 of 6 sockets free" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Quiet study zone · 32 dB · 18 seats" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Campus canteen · low crowd until 12:30 PM" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Covered metro entrance · 240 m from Route B" })
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
					title: "Risk zones",
					subtitle: "Predicted, not observed"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "space-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "rounded-xl border border-destructive/30 bg-destructive/8 px-3 py-2",
							children: "Flood-prone underpass · avoid 8:20–8:40 AM"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "rounded-xl border border-warning/30 bg-warning/8 px-3 py-2",
							children: "JNTU junction · congestion 54% above average"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "rounded-xl border border-border bg-surface-2/50 px-3 py-2",
							children: "KPHB metro exit · high pedestrian density"
						})
					]
				})] })
			]
		})
	] });
}
//#endregion
export { MapPage as component };
