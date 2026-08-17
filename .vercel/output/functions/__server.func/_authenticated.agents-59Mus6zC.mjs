import { i as __toESM } from "./_runtime.mjs";
import { r as require_react } from "./_libs/@hookform/resolvers+[...].mjs";
import { D as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as useQuery } from "./_libs/tanstack__react-query.mjs";
import { t as Button } from "./_ssr/button-BLZ6ednA.mjs";
import { n as Panel, r as PanelHeader, t as PageHeader } from "./_ssr/Panel-CSrXbfmH.mjs";
import { t as DemoNotice } from "./_ssr/SourceBadge-Ccjkhr9j.mjs";
import { t as Badge } from "./_ssr/badge-D1Dupn2y.mjs";
import { t as AgentConstellation } from "./_ssr/AgentConstellation-DO8iAmMq.mjs";
import { t as Skeleton } from "./_ssr/skeleton-D9W9wFsj.mjs";
import { t as aiService } from "./_ssr/ai-service-CQPduMIG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated.agents-59Mus6zC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AgentsPage() {
	const [active, setActive] = (0, import_react.useState)([
		"travel",
		"schedule",
		"environment"
	]);
	const { data, isLoading } = useQuery({
		queryKey: ["agents"],
		queryFn: () => aiService.listAgents()
	});
	const agents = data ?? [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Multi-agent AI system",
			title: "Specialised agents, one decision",
			description: "Each agent owns a single domain and reports independently. The reasoning engine resolves conflicts and produces the final recommendation."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoNotice, { children: "Agent activity shown here replays a simulated analysis cycle." })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			tilt: false,
			children: [isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "mx-auto aspect-square w-full max-w-2xl rounded-3xl" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AgentConstellation, {
				agents,
				activeIds: active
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-wrap justify-center gap-2",
				children: agents.map((agent) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "sm",
					variant: active.includes(agent.id) ? "default" : "outline",
					onClick: () => setActive((prev) => prev.includes(agent.id) ? prev.filter((id) => id !== agent.id) : [...prev, agent.id]),
					children: agent.name
				}, agent.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "scene-3d mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3",
			children: isLoading ? [
				0,
				1,
				2,
				3,
				4
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-48 rounded-2xl" }, i)) : agents.map((agent) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
					title: agent.name,
					subtitle: agent.role,
					right: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "outline",
						className: active.includes(agent.id) ? "border-primary/45 text-primary" : "border-border text-muted-foreground",
						children: active.includes(agent.id) ? "analysing" : agent.status
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "flex flex-wrap gap-1.5",
					children: agent.analyzes.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "rounded-full border border-border bg-surface-2/50 px-2.5 py-1 text-[11px] text-muted-foreground",
						children: item
					}, item))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-3 font-mono text-[11px] text-muted-foreground",
					children: [
						"last cycle · ",
						agent.latencyMs,
						" ms"
					]
				})
			] }, agent.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
				title: "LIFEOS Reasoning Engine",
				subtitle: "How agent reports become a single recommendation"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "grid gap-3 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					{
						t: "Collect",
						d: "Each agent returns a scored report with its own confidence."
					},
					{
						t: "Weigh",
						d: "Reports are weighted by domain relevance and signal freshness."
					},
					{
						t: "Resolve",
						d: "Conflicting recommendations are ranked by expected benefit."
					},
					{
						t: "Explain",
						d: "The winning decision is published with its signals and reasons."
					}
				].map((stage, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-xl border border-border bg-surface-2/50 p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-mono text-[10px] uppercase tracking-[0.16em] text-primary",
						children: [
							"0",
							i + 1,
							" · ",
							stage.t
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1.5 text-xs leading-relaxed text-muted-foreground",
						children: stage.d
					})]
				}, stage.t))
			})]
		})
	] });
}
//#endregion
export { AgentsPage as component };
