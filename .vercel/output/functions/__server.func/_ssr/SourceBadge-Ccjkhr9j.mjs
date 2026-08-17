import { D as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { N as Database, f as Sparkles, r as Waves } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/SourceBadge-Ccjkhr9j.js
var import_jsx_runtime = require_jsx_runtime();
var MAP = {
	real: {
		label: "REAL DATA",
		className: "border-success/40 text-success bg-success/10",
		icon: Database
	},
	simulated: {
		label: "SIMULATED DATA",
		className: "border-warning/40 text-warning bg-warning/10",
		icon: Waves
	},
	prediction: {
		label: "AI PREDICTION",
		className: "border-primary/40 text-primary bg-primary/10",
		icon: Sparkles
	}
};
function SourceBadge({ source, className }) {
	const config = MAP[source];
	const Icon = config.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.14em]", config.className, className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
			className: "size-3",
			"aria-hidden": true
		}), config.label]
	});
}
function DemoNotice({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "rounded-xl border border-warning/25 bg-warning/8 px-3 py-2 text-xs text-muted-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-[10px] uppercase tracking-[0.16em] text-warning",
				children: "Demo data ·"
			}),
			" ",
			children ?? "Values are simulated for demonstration and are not real sensor readings or validated forecasts."
		]
	});
}
//#endregion
export { SourceBadge as n, DemoNotice as t };
