import { D as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/PipelineFlow-DeERmMq8.js
var import_jsx_runtime = require_jsx_runtime();
var STAGES = [
	{
		id: "input",
		label: "Input",
		detail: "User goals & permissions"
	},
	{
		id: "signals",
		label: "Real-world signals",
		detail: "Traffic · weather · calendar · device"
	},
	{
		id: "agents",
		label: "AI agents",
		detail: "5 specialised analysers"
	},
	{
		id: "reasoning",
		label: "Reasoning engine",
		detail: "Signal fusion & scoring"
	},
	{
		id: "prediction",
		label: "Prediction",
		detail: "Probability · severity · confidence"
	},
	{
		id: "action",
		label: "Action",
		detail: "Confirmed, reversible steps"
	},
	{
		id: "outcome",
		label: "Outcome",
		detail: "Measured & learned from"
	}
];
function PipelineFlow({ activeIndex = -1, className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("scene-3d", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "layer-3d grid gap-3 md:grid-cols-7",
			children: STAGES.map((stage, i) => {
				const active = activeIndex >= i;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "relative",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: cn("glass depth-pop h-full rounded-2xl p-3 transition-colors duration-500", active ? "border-primary/45" : "opacity-80"),
						style: {
							transform: `translateZ(${active ? 24 : 0}px)`,
							transition: "transform 600ms cubic-bezier(0.22,1,0.36,1)"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-mono text-[10px] uppercase tracking-[0.16em] text-primary",
								children: ["0", i + 1]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm font-semibold leading-tight",
								children: stage.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px] leading-snug text-muted-foreground",
								children: stage.detail
							})
						]
					}), i < STAGES.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						className: cn("absolute -right-2 top-1/2 hidden h-px w-4 md:block", active ? "bg-primary" : "bg-border")
					}) : null]
				}, stage.id);
			})
		})
	});
}
//#endregion
export { PipelineFlow as t };
