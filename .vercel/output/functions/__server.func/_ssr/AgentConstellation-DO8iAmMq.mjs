import { D as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AgentConstellation-DO8iAmMq.js
var import_jsx_runtime = require_jsx_runtime();
var ACCENT = {
	cyan: "var(--primary)",
	emerald: "var(--success)",
	amber: "var(--warning)",
	violet: "var(--chart-4)",
	rose: "var(--destructive)"
};
/**
* 3D agent constellation: agents positioned around a central reasoning engine with
* animated signal flow along SVG connectors.
*/
function AgentConstellation({ agents, activeIds = [], className }) {
	const radius = 38;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("scene-3d relative mx-auto w-full max-w-2xl", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "layer-3d relative aspect-square",
			style: { transform: "rotateX(16deg)" },
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					viewBox: "0 0 100 100",
					className: "absolute inset-0 size-full",
					"aria-hidden": true,
					children: [agents.map((agent, i) => {
						const angle = i / agents.length * Math.PI * 2 - Math.PI / 2;
						const x = 50 + Math.cos(angle) * radius;
						const y = 50 + Math.sin(angle) * radius;
						const active = activeIds.includes(agent.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: x,
							y1: y,
							x2: 50,
							y2: 50,
							stroke: active ? ACCENT[agent.accent] : "var(--border)",
							strokeWidth: active ? .7 : .4,
							strokeDasharray: "3 5",
							style: active ? {
								animation: "flow 1.4s linear infinite",
								opacity: .95
							} : { opacity: .5 }
						}, agent.id);
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: 50,
						cy: 50,
						r: 13,
						fill: "none",
						stroke: "var(--primary)",
						strokeWidth: .4,
						opacity: .5
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "absolute left-1/2 top-1/2 w-40 -translate-x-1/2 -translate-y-1/2 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "glass mx-auto grid size-28 place-items-center rounded-full",
						style: { boxShadow: "0 0 60px -14px oklch(0.79 0.145 202 / 0.7)" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[9px] uppercase tracking-[0.18em] text-primary",
							children: "LIFEOS"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-semibold leading-tight",
							children: "Reasoning Engine"
						})] })
					})
				}),
				agents.map((agent, i) => {
					const angle = i / agents.length * Math.PI * 2 - Math.PI / 2;
					const x = 50 + Math.cos(angle) * radius;
					const y = 50 + Math.sin(angle) * radius;
					const active = activeIds.includes(agent.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute w-28 -translate-x-1/2 -translate-y-1/2 sm:w-32",
						style: {
							left: `${x}%`,
							top: `${y}%`
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: cn("glass rounded-xl px-2.5 py-2 text-center transition-all duration-500", active && "scale-[1.06]"),
							style: {
								borderColor: active ? ACCENT[agent.accent] : void 0,
								transform: active ? "translateZ(30px)" : "translateZ(0)",
								boxShadow: active ? `0 0 34px -10px ${ACCENT[agent.accent]}` : void 0
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mx-auto mb-1 block size-2 rounded-full",
									style: { background: ACCENT[agent.accent] }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] font-semibold leading-tight sm:text-xs",
									children: agent.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground",
									children: active ? "analysing" : agent.status
								})
							]
						})
					}, agent.id);
				})
			]
		})
	});
}
//#endregion
export { AgentConstellation as t };
