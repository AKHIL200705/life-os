import { D as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/RiskGauge-exlmt4KI.js
var import_jsx_runtime = require_jsx_runtime();
function toneFor(value) {
	if (value >= .75) return {
		stroke: "var(--destructive)",
		label: "High risk"
	};
	if (value >= .5) return {
		stroke: "var(--warning)",
		label: "Elevated risk"
	};
	if (value >= .25) return {
		stroke: "var(--primary)",
		label: "Moderate risk"
	};
	return {
		stroke: "var(--success)",
		label: "Low risk"
	};
}
function RiskGauge({ value, size = 132, caption, className }) {
	const tone = toneFor(value);
	const radius = size / 2 - 10;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference * (1 - Math.min(Math.max(value, 0), 1));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("flex flex-col items-center", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative",
			style: {
				width: size,
				height: size
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				width: size,
				height: size,
				className: "-rotate-90",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: size / 2,
					cy: size / 2,
					r: radius,
					fill: "none",
					stroke: "var(--border)",
					strokeWidth: 8
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: size / 2,
					cy: size / 2,
					r: radius,
					fill: "none",
					stroke: tone.stroke,
					strokeWidth: 8,
					strokeLinecap: "round",
					strokeDasharray: circumference,
					strokeDashoffset: offset,
					style: { transition: "stroke-dashoffset 900ms cubic-bezier(0.22,1,0.36,1)" }
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-0 grid place-items-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-2xl font-semibold tracking-tight",
						children: [Math.round(value * 100), "%"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground",
						children: tone.label
					})]
				})
			})]
		}), caption ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-xs text-muted-foreground",
			children: caption
		}) : null]
	});
}
function Meter({ value, label, hint, tone = "primary" }) {
	const bar = {
		primary: "bg-primary",
		success: "bg-success",
		warning: "bg-warning",
		destructive: "bg-destructive"
	}[tone];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-1.5 flex items-center justify-between text-xs",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-muted-foreground",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "font-mono text-foreground",
				children: [Math.round(value * 100), "%"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-1.5 overflow-hidden rounded-full bg-muted",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("h-full rounded-full transition-[width] duration-700", bar),
				style: { width: `${Math.min(Math.max(value, 0), 1) * 100}%` }
			})
		}),
		hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-[11px] text-muted-foreground",
			children: hint
		}) : null
	] });
}
//#endregion
export { RiskGauge as n, Meter as t };
