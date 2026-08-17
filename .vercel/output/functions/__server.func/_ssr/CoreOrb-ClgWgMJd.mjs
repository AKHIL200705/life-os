import { D as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/CoreOrb-ClgWgMJd.js
var import_jsx_runtime = require_jsx_runtime();
/**
* 3D reasoning core: CSS-3D nested rings orbiting a glowing sphere.
* Pure transforms, so it stays smooth on mobile and respects reduced motion.
*/
function CoreOrb({ size = 260, label = "REASONING CORE", status = "Active", className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("scene-3d relative mx-auto grid place-items-center", className),
		style: {
			width: size,
			height: size
		},
		"aria-label": `${label} — ${status}`,
		role: "img",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "layer-3d absolute inset-0 animate-float",
				children: [
					0,
					1,
					2
				].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "orbit-y absolute inset-0",
					style: {
						animationDuration: `${16 + i * 9}s`,
						animationDirection: i % 2 ? "reverse" : "normal"
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute inset-0 rounded-full border",
						style: {
							transform: `rotateX(${64 + i * 12}deg) rotateZ(${i * 34}deg) scale(${1 - i * .14})`,
							borderColor: i === 0 ? "oklch(0.79 0.145 202 / 0.55)" : i === 1 ? "oklch(0.74 0.15 162 / 0.4)" : "oklch(0.68 0.16 290 / 0.4)",
							boxShadow: "0 0 26px -6px oklch(0.79 0.145 202 / 0.5)"
						}
					})
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute rounded-full border border-primary/30",
				style: {
					width: size * .42,
					height: size * .42,
					animation: "pulse-ring 2.8s ease-out infinite"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "absolute rounded-full border border-primary/20",
				style: {
					width: size * .42,
					height: size * .42,
					animation: "pulse-ring 2.8s ease-out 1.4s infinite"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative grid place-items-center rounded-full text-center",
				style: {
					width: size * .44,
					height: size * .44,
					background: "radial-gradient(circle at 32% 28%, oklch(0.92 0.09 200 / 0.95), oklch(0.55 0.13 220 / 0.85) 45%, oklch(0.25 0.05 260 / 0.95) 100%)",
					boxShadow: "0 0 60px -10px oklch(0.79 0.145 202 / 0.75), inset 0 -12px 30px oklch(0.2 0.04 260 / 0.7)"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[9px] uppercase tracking-[0.2em] text-primary-foreground/80",
						children: label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm font-semibold text-primary-foreground",
						children: status
					})]
				})
			})
		]
	});
}
//#endregion
export { CoreOrb as t };
