import { i as __toESM } from "./_runtime.mjs";
import { t as supabase } from "./_ssr/client-nQdEDnrG.mjs";
import { r as require_react } from "./_libs/@hookform/resolvers+[...].mjs";
import { D as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { n as useAuth } from "./_ssr/router-BvJIRm2k.mjs";
import { t as cn } from "./_ssr/utils-C_uf36nf.mjs";
import { t as Button } from "./_ssr/button-BLZ6ednA.mjs";
import { q as Brain, s as Trash2, y as Plus } from "./_libs/lucide-react.mjs";
import { n as Panel, r as PanelHeader, t as PageHeader } from "./_ssr/Panel-CSrXbfmH.mjs";
import { t as DemoNotice } from "./_ssr/SourceBadge-Ccjkhr9j.mjs";
import { t as Badge } from "./_ssr/badge-D1Dupn2y.mjs";
import { s as DEMO_MEMORIES } from "./_ssr/demo-data-B2rfthtF.mjs";
import { t as Input } from "./_ssr/input-B8Q2ztVi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated.memory-Dzdl20xG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CATEGORIES = [
	"all",
	"travel",
	"schedule",
	"finance",
	"environment",
	"study"
];
function MemoryPage() {
	const { user } = useAuth();
	const [items, setItems] = (0, import_react.useState)(DEMO_MEMORIES);
	const [filter, setFilter] = (0, import_react.useState)("all");
	const [draft, setDraft] = (0, import_react.useState)("");
	const visible = filter === "all" ? items : items.filter((item) => item.category === filter);
	async function addMemory() {
		const statement = draft.trim();
		if (!statement || !user) return;
		const item = {
			id: `local-${Date.now()}`,
			statement,
			category: "schedule",
			source: "You told LIFEOS",
			confidence: 1,
			learnedAt: "just now"
		};
		setItems((prev) => [item, ...prev]);
		setDraft("");
		const { error } = await supabase.from("memories").insert({
			user_id: user.id,
			statement,
			category: "schedule",
			source: "user_provided",
			confidence: 1
		});
		if (error) toast.error("Saved locally only", { description: error.message });
		else toast.success("Added to your memory");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "LIFEOS memory",
			title: "What LIFEOS has learned",
			description: "Long-term memory is written in plain language so you can audit it. Wrong entries can be deleted, and deletion changes future predictions immediately.",
			right: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
				variant: "outline",
				className: "border-primary/40 text-primary",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brain, { className: "mr-1.5 size-3" }),
					" ",
					items.length,
					" entries"
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoNotice, { children: "Seeded entries are simulated examples. Entries you add are saved to your private memory." })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			tilt: false,
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-3 sm:flex-row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: draft,
					onChange: (event) => setDraft(event.target.value),
					placeholder: "Teach LIFEOS something — e.g. 'I never schedule anything before 8 AM'",
					onKeyDown: (event) => {
						if (event.key === "Enter") addMemory();
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					onClick: () => void addMemory(),
					disabled: !draft.trim(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "mr-1.5 size-4" }), " Add memory"]
				})]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4 flex flex-wrap gap-2",
			children: CATEGORIES.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => setFilter(category),
				className: cn("rounded-full border px-3 py-1.5 text-xs capitalize transition-colors", filter === category ? "border-primary bg-primary/12 text-primary" : "border-border text-muted-foreground hover:text-foreground"),
				children: category
			}, category))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "scene-3d grid gap-3 lg:grid-cols-2",
			children: visible.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm font-medium leading-relaxed",
					children: item.statement
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-2 text-[11px] text-muted-foreground",
					children: [
						item.source,
						" · learned ",
						item.learnedAt
					]
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					size: "icon",
					variant: "ghost",
					"aria-label": "Delete memory",
					onClick: () => {
						setItems((prev) => prev.filter((entry) => entry.id !== item.id));
						toast("Memory deleted — future predictions updated");
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-4" })
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
					variant: "outline",
					className: "border-border capitalize text-muted-foreground",
					children: item.category
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "font-mono text-[11px] text-primary",
					children: [
						"confidence ",
						Math.round(item.confidence * 100),
						"%"
					]
				})]
			})] }, item.id))
		}),
		visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
			tilt: false,
			className: "text-center text-sm text-muted-foreground",
			children: "No memories in this category yet."
		}) : null,
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
				title: "How memory changes predictions",
				subtitle: "Memory is a weight on the reasoning engine, not a rule engine"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "grid gap-3 sm:grid-cols-3",
				children: [
					{
						t: "Reinforced",
						d: "Patterns confirmed by outcomes gain confidence and influence."
					},
					{
						t: "Decayed",
						d: "Unused patterns lose weight so old habits stop distorting today."
					},
					{
						t: "Deleted",
						d: "Removing an entry removes its influence from the next cycle."
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
export { MemoryPage as component };
