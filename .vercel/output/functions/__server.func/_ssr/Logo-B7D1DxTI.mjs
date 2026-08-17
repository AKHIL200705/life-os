import { D as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Logo-B7D1DxTI.js
var import_jsx_runtime = require_jsx_runtime();
function Logo({ className, compact = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-2.5", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "scene-3d relative grid size-8 place-items-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute inset-0 rounded-[10px] border border-primary/50",
					style: {
						transform: "rotateX(52deg) rotateZ(45deg)",
						boxShadow: "0 0 18px -4px var(--primary)"
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "absolute inset-1.5 rounded-[7px] border border-success/50",
					style: { transform: "rotateX(52deg) rotateZ(45deg)" }
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-primary" })
			]
		}), !compact ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "text-sm font-semibold tracking-[0.16em]",
			children: ["LIFE", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-primary",
				children: "OS"
			})]
		}) : null]
	});
}
//#endregion
export { Logo as t };
