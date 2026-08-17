import { i as __toESM } from "./_runtime.mjs";
import { t as supabase } from "./_ssr/client-B-lcrLUp.mjs";
import { r as require_react } from "./_libs/@hookform/resolvers+[...].mjs";
import { D as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as useQuery } from "./_libs/tanstack__react-query.mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { n as useAuth } from "./_ssr/router-8w0n-NVQ.mjs";
import { t as Button } from "./_ssr/button-BLZ6ednA.mjs";
import { M as Download, O as LoaderCircle, m as ShieldCheck, s as Trash2 } from "./_libs/lucide-react.mjs";
import { n as Panel, r as PanelHeader, t as PageHeader } from "./_ssr/Panel-CSrXbfmH.mjs";
import { t as Badge } from "./_ssr/badge-D1Dupn2y.mjs";
import { t as Label } from "./_ssr/label-DBD1bRRP.mjs";
import { t as Switch } from "./_ssr/switch-Cn1w-cIH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated.privacy-DDQl-ZF9.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TOGGLES = [
	{
		id: "location_access",
		label: "Location",
		detail: "Enables travel-time, route and risk-zone predictions."
	},
	{
		id: "calendar_access",
		label: "Calendar",
		detail: "Enables conflict, deadline and preparation predictions."
	},
	{
		id: "notifications",
		label: "Notifications",
		detail: "Delivers warnings before friction reaches you."
	},
	{
		id: "device_info",
		label: "Device state",
		detail: "Battery and connectivity risk detection."
	},
	{
		id: "ai_personalization",
		label: "AI personalization",
		detail: "Lets LIFEOS learn your routines over time."
	}
];
function PrivacyPage() {
	const { user } = useAuth();
	const [state, setState] = (0, import_react.useState)({
		location_access: false,
		calendar_access: false,
		notifications: false,
		device_info: false,
		ai_personalization: false
	});
	const [saving, setSaving] = (0, import_react.useState)(false);
	const { data } = useQuery({
		queryKey: ["privacy", user?.id],
		enabled: !!user,
		queryFn: async () => {
			const { data, error } = await supabase.from("privacy_settings").select("location_access, calendar_access, notifications, device_info, ai_personalization").eq("user_id", user.id).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
	(0, import_react.useEffect)(() => {
		if (data) setState(data);
	}, [data]);
	async function update(id, value) {
		if (!user) return;
		setState((prev) => ({
			...prev,
			[id]: value
		}));
		setSaving(true);
		const { error } = await supabase.from("privacy_settings").upsert({
			user_id: user.id,
			...state,
			[id]: value
		});
		setSaving(false);
		if (error) toast.error("Could not save", { description: error.message });
	}
	async function exportData() {
		if (!user) return;
		const [predictions, memories, actions] = await Promise.all([
			supabase.from("predictions").select("*"),
			supabase.from("memories").select("*"),
			supabase.from("actions").select("*")
		]);
		const payload = {
			exported_at: (/* @__PURE__ */ new Date()).toISOString(),
			predictions: predictions.data ?? [],
			memories: memories.data ?? [],
			actions: actions.data ?? [],
			privacy_settings: state
		};
		const url = URL.createObjectURL(new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }));
		const link = document.createElement("a");
		link.href = url;
		link.download = "lifeos-data-export.json";
		link.click();
		URL.revokeObjectURL(url);
		toast.success("Export downloaded");
	}
	async function deleteData() {
		if (!user) return;
		const failed = (await Promise.all([
			supabase.from("memories").delete().eq("user_id", user.id),
			supabase.from("predictions").delete().eq("user_id", user.id),
			supabase.from("actions").delete().eq("user_id", user.id),
			supabase.from("digital_twin_states").delete().eq("user_id", user.id)
		])).find((r) => r.error);
		if (failed?.error) toast.error("Deletion failed", { description: failed.error.message });
		else toast.success("Your learned data has been deleted");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		eyebrow: "Privacy center",
		title: "You decide what LIFEOS can see",
		description: "Nothing is collected without an explicit switch. Each toggle explains exactly which predictions it enables, and turning it off removes those predictions.",
		right: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
			variant: "outline",
			className: "border-success/40 text-success",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mr-1.5 size-3" }), " user-controlled"]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid gap-4 lg:grid-cols-[1.4fr_1fr]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
			title: "Permissions",
			subtitle: "Change any time — takes effect on the next reasoning cycle",
			right: saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "size-4 animate-spin text-primary" }) : null
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-2",
			children: TOGGLES.map((toggle) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between gap-4 rounded-xl border border-border bg-surface-2/50 p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
					htmlFor: toggle.id,
					className: "text-sm",
					children: toggle.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-0.5 text-xs text-muted-foreground",
					children: toggle.detail
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
					id: toggle.id,
					checked: state[toggle.id],
					onCheckedChange: (checked) => void update(toggle.id, checked)
				})]
			}, toggle.id))
		})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
					title: "Your data",
					subtitle: "Export or delete at any time"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						onClick: () => void exportData(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { className: "mr-1.5 size-4" }), " Export my data (JSON)"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "destructive",
						onClick: () => void deleteData(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "mr-1.5 size-4" }), " Delete learned data"]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-[11px] text-muted-foreground",
					children: "Deletion removes memories, predictions, actions and twin states. Your account and preferences remain."
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
				title: "Our commitments",
				subtitle: "Design rules, not marketing"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
				className: "space-y-2 text-xs text-muted-foreground",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "· Personal data is never shared with other users." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "· City intelligence uses anonymised aggregates only." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "· No action runs without your explicit confirmation." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "· Every prediction can be traced to its signals." })
				]
			})] })]
		})]
	})] });
}
//#endregion
export { PrivacyPage as component };
