import { i as __toESM } from "./_runtime.mjs";
import { r as require_react } from "./_libs/@hookform/resolvers+[...].mjs";
import { D as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { t as cn } from "./_ssr/utils-C_uf36nf.mjs";
import { t as Button } from "./_ssr/button-BLZ6ednA.mjs";
import { L as CircleX, V as CircleCheck, l as ThumbsUp, u as ThumbsDown } from "./_libs/lucide-react.mjs";
import { n as Panel, r as PanelHeader, t as PageHeader } from "./_ssr/Panel-CSrXbfmH.mjs";
import { t as DemoNotice } from "./_ssr/SourceBadge-Ccjkhr9j.mjs";
import { t as Badge } from "./_ssr/badge-D1Dupn2y.mjs";
import { a as DEMO_HISTORY } from "./_ssr/demo-data-B2rfthtF.mjs";
import { t as Meter } from "./_ssr/RiskGauge-exlmt4KI.mjs";
import { t as StatTile } from "./_ssr/StatTile-BZPPnOoZ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated.history-BCkEggcZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = [
	"all",
	"correct",
	"incorrect"
];
function HistoryPage() {
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [voted, setVoted] = (0, import_react.useState)({});
	const rows = (0, import_react.useMemo)(() => DEMO_HISTORY.filter((item) => filter === "all" ? true : filter === "correct" ? item.correct : !item.correct), [filter]);
	const accuracy = DEMO_HISTORY.filter((item) => item.correct).length / DEMO_HISTORY.length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Prediction history",
			title: "Held accountable, every time",
			description: "A prediction system that never reports its misses cannot be trusted. Each entry records the predicted probability, the real outcome and your feedback."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoNotice, { children: "History entries replay a simulated evaluation log." })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
					label: "Logged predictions",
					value: DEMO_HISTORY.length,
					hint: "Evaluated against outcomes"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
					label: "Accuracy",
					value: `${Math.round(accuracy * 100)}%`,
					hint: "Correct / total"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
					label: "Feedback received",
					value: Object.keys(voted).length,
					hint: "Trains the next cycle"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatTile, {
					label: "Avg lead time",
					value: "47",
					unit: "min",
					hint: "Warning before impact"
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 mt-4 flex flex-wrap gap-2",
			children: FILTERS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setFilter(option),
				className: cn("rounded-full border px-3 py-1.5 text-xs capitalize transition-colors", filter === option ? "border-primary bg-primary/12 text-primary" : "border-border text-muted-foreground hover:text-foreground"),
				children: option
			}, option))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: rows.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
				tilt: false,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-1.5 flex items-center gap-2",
								children: [
									item.correct ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {
										className: "size-4 text-success",
										"aria-hidden": true
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, {
										className: "size-4 text-destructive",
										"aria-hidden": true
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										variant: "outline",
										className: item.correct ? "border-success/45 text-success" : "border-destructive/45 text-destructive",
										children: item.correct ? "correct" : "missed"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[11px] text-muted-foreground",
										children: item.date
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: item.problem
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: ["Outcome: ", item.actualOutcome]
							}),
							item.feedback ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-xs text-primary",
								children: ["Your feedback: ", item.feedback]
							}) : null
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full max-w-[13rem] shrink-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
							label: "Predicted probability",
							value: item.predictedProbability,
							tone: item.correct ? "success" : "destructive"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: voted[item.id] === "up" ? "default" : "outline",
								onClick: () => {
									setVoted((prev) => ({
										...prev,
										[item.id]: "up"
									}));
									toast.success("Marked as useful");
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbsUp, { className: "size-3.5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								variant: voted[item.id] === "down" ? "default" : "outline",
								onClick: () => {
									setVoted((prev) => ({
										...prev,
										[item.id]: "down"
									}));
									toast("Marked as wrong — confidence lowered");
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThumbsDown, { className: "size-3.5" })
							})]
						})]
					})]
				})
			}, item.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
				title: "How feedback improves accuracy",
				subtitle: "Outcomes and votes both feed the learning loop"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					{
						t: "Outcome check",
						d: "Each prediction is scored against what actually happened."
					},
					{
						t: "Calibration",
						d: "Over-confident categories get their probabilities pulled down."
					},
					{
						t: "Personalisation",
						d: "Your votes reweight which friction types matter to you."
					}
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-surface-2/50 p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-mono text-[10px] uppercase tracking-[0.16em] text-primary",
						children: item.t
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-xs leading-relaxed text-muted-foreground",
						children: item.d
					})]
				}, item.t))
			})]
		})
	] });
}
//#endregion
export { HistoryPage as component };
