import { i as __toESM } from "./_runtime.mjs";
import { r as require_react } from "./_libs/@hookform/resolvers+[...].mjs";
import { D as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as useQuery } from "./_libs/tanstack__react-query.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { t as Button } from "./_ssr/button-BLZ6ednA.mjs";
import { O as LoaderCircle, k as Inbox } from "./_libs/lucide-react.mjs";
import { n as Panel, t as PageHeader } from "./_ssr/Panel-CSrXbfmH.mjs";
import { n as SourceBadge, t as DemoNotice } from "./_ssr/SourceBadge-Ccjkhr9j.mjs";
import { t as Skeleton } from "./_ssr/skeleton-D9W9wFsj.mjs";
import { t as aiService } from "./_ssr/ai-service-CQPduMIG.mjs";
import { t as PredictionCard } from "./_ssr/PredictionCard-DA6YmQKG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated.predictions-YkUUPbqb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FILTERS = [
	"all",
	"travel",
	"schedule",
	"environment",
	"finance",
	"safety"
];
function PredictionsPage() {
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [dismissed, setDismissed] = (0, import_react.useState)([]);
	const { data, isLoading, isError, refetch } = useQuery({
		queryKey: ["predictions"],
		queryFn: () => aiService.listPredictions()
	});
	const predictions = (data ?? []).filter((p) => !dismissed.includes(p.id) && (filter === "all" || p.category === filter));
	function act(prediction) {
		toast.success("Sent to Action Center", { description: prediction.recommendedAction });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Friction prediction engine",
			title: "Predicted problems",
			description: "Each card is a near-term friction event LIFEOS believes is forming, with the signals and reasoning that produced it.",
			right: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceBadge, { source: "prediction" })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoNotice, { children: "Predictions are generated from rule-based heuristics over simulated signals. They are not validated forecasts." })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-5 flex flex-wrap gap-2",
			children: FILTERS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				size: "sm",
				variant: filter === option ? "default" : "outline",
				onClick: () => setFilter(option),
				className: "capitalize",
				children: option
			}, option))
		}),
		isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 lg:grid-cols-2",
			children: [
				0,
				1,
				2,
				3
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-72 rounded-2xl" }, i))
		}) : isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center py-10 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium",
					children: "Prediction service unavailable"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-muted-foreground",
					children: "LIFEOS could not reach the prediction service."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					size: "sm",
					className: "mt-4",
					onClick: () => void refetch(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-3.5" }), " Retry"]
				})
			]
		}) }) : predictions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col items-center py-12 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, {
					className: "size-8 text-muted-foreground",
					"aria-hidden": true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm font-medium",
					children: "Nothing predicted in this category"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 max-w-sm text-xs text-muted-foreground",
					children: "LIFEOS keeps monitoring your context and will surface a prediction here as soon as risk crosses the alert threshold."
				}),
				filter !== "all" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: "outline",
					className: "mt-4",
					onClick: () => setFilter("all"),
					children: "Show all categories"
				}) : null
			]
		}) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "scene-3d grid gap-4 lg:grid-cols-2",
			children: predictions.map((prediction) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PredictionCard, {
				prediction,
				onAct: act,
				onDismiss: (p) => {
					setDismissed((prev) => [...prev, p.id]);
					toast("Dismissed — recorded as feedback");
				},
				onSnooze: () => toast("Snoozed for 30 minutes")
			}, prediction.id))
		})
	] });
}
//#endregion
export { PredictionsPage as component };
