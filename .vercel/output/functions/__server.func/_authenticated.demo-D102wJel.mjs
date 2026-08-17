import { i as __toESM } from "./_runtime.mjs";
import { r as require_react } from "./_libs/@hookform/resolvers+[...].mjs";
import { D as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as cn } from "./_ssr/utils-C_uf36nf.mjs";
import { t as Button } from "./_ssr/button-BLZ6ednA.mjs";
import { t as CoreOrb } from "./_ssr/CoreOrb-ClgWgMJd.mjs";
import { b as Play, v as RotateCcw, x as Pause } from "./_libs/lucide-react.mjs";
import { n as Panel, r as PanelHeader, t as PageHeader } from "./_ssr/Panel-CSrXbfmH.mjs";
import { t as DemoNotice } from "./_ssr/SourceBadge-Ccjkhr9j.mjs";
import { u as DEMO_SIMULATION } from "./_ssr/demo-data-B2rfthtF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated.demo-D102wJel.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DemoPage() {
	const [step, setStep] = (0, import_react.useState)(0);
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const timer = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!playing) return;
		timer.current = setInterval(() => {
			setStep((prev) => {
				if (prev >= DEMO_SIMULATION.length) {
					setPlaying(false);
					return prev;
				}
				return prev + 1;
			});
		}, 1400);
		return () => {
			if (timer.current) clearInterval(timer.current);
		};
	}, [playing]);
	const done = step >= DEMO_SIMULATION.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Investor demo",
			title: "One full reasoning cycle",
			description: "Press play to run a scripted scenario end to end — from a change in the environment to a confirmed action in your hands."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoNotice, { children: "This is a scripted simulation, not live data." })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-[1fr_1.3fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				glow: true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoreOrb, {
						size: 220,
						label: "LIFEOS",
						status: done ? "Action ready" : playing ? "Reasoning" : "Standby"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex justify-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							onClick: () => setPlaying((p) => !p),
							disabled: done,
							children: [playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "mr-1.5 size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "mr-1.5 size-4" }), playing ? "Pause" : "Play"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							onClick: () => {
								setPlaying(false);
								setStep(0);
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "mr-1.5 size-4" }), " Reset"]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-4 text-center font-mono text-[11px] text-muted-foreground",
						children: [
							"step ",
							Math.min(step, DEMO_SIMULATION.length),
							" / ",
							DEMO_SIMULATION.length
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
				tilt: false,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
						title: "Reasoning timeline",
						subtitle: "Each entry names the actor responsible"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
						className: "relative space-y-3 pl-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-1.5 top-1 h-[calc(100%-0.5rem)] w-px bg-border" }), DEMO_SIMULATION.map((entry, i) => {
							const active = i < step;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: cn("relative rounded-xl border p-3 transition-all duration-500", active ? "border-primary/35 bg-primary/8 opacity-100" : "border-border bg-surface-2/40 opacity-45"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("absolute -left-[1.05rem] top-4 size-2 rounded-full", active ? "bg-primary" : "bg-border") }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-mono text-[10px] uppercase tracking-[0.16em] text-primary",
										children: entry.actor
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-sm font-medium",
										children: entry.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-0.5 text-xs text-muted-foreground",
										children: entry.detail
									})
								]
							}, entry.title);
						})]
					}),
					done ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 rounded-2xl border border-success/35 bg-success/8 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm font-medium",
							children: "Outcome: problem avoided"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "Late arrival prevented with 47 minutes of lead time and one tap from the user."
						})]
					}) : null
				]
			})]
		})
	] });
}
//#endregion
export { DemoPage as component };
