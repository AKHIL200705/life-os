import { t as supabase } from "./_ssr/client-B-lcrLUp.mjs";
import { D as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as useQuery } from "./_libs/tanstack__react-query.mjs";
import { n as useAuth } from "./_ssr/router-8w0n-NVQ.mjs";
import { t as CoreOrb } from "./_ssr/CoreOrb-ClgWgMJd.mjs";
import { D as Lock, G as CalendarClock, P as CloudRain, Q as BatteryLow, T as MapPin, i as Wallet, nt as Activity } from "./_libs/lucide-react.mjs";
import { n as Panel, r as PanelHeader, t as PageHeader } from "./_ssr/Panel-CSrXbfmH.mjs";
import { t as DemoNotice } from "./_ssr/SourceBadge-Ccjkhr9j.mjs";
import { t as Badge } from "./_ssr/badge-D1Dupn2y.mjs";
import { i as DEMO_CONTEXT, l as DEMO_SCHEDULE } from "./_ssr/demo-data-B2rfthtF.mjs";
import { t as Skeleton } from "./_ssr/skeleton-D9W9wFsj.mjs";
import { t as Meter } from "./_ssr/RiskGauge-exlmt4KI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated.twin-DlmZ35CO.js
var import_jsx_runtime = require_jsx_runtime();
var BEHAVIOR = [
	{
		label: "Typical wake time",
		value: "7:10 AM",
		confidence: .84
	},
	{
		label: "Typical departure",
		value: "8:05 AM",
		confidence: .86
	},
	{
		label: "Peak study window",
		value: "8:00–10:00 PM",
		confidence: .78
	},
	{
		label: "Travel pattern",
		value: "Metro + 1.2 km walk",
		confidence: .72
	}
];
var CONTEXT_NODES = [
	{
		id: "you",
		label: "You",
		icon: MapPin,
		ring: 0
	},
	{
		id: "schedule",
		label: "Schedule",
		icon: CalendarClock,
		ring: 1
	},
	{
		id: "travel",
		label: "Travel",
		icon: Activity,
		ring: 1
	},
	{
		id: "weather",
		label: "Weather",
		icon: CloudRain,
		ring: 1
	},
	{
		id: "device",
		label: "Device",
		icon: BatteryLow,
		ring: 2
	},
	{
		id: "money",
		label: "Spending",
		icon: Wallet,
		ring: 2
	}
];
function TwinPage() {
	const { user } = useAuth();
	const { data: prefs, isLoading } = useQuery({
		queryKey: ["preferences", user?.id],
		enabled: !!user,
		queryFn: async () => {
			const { data, error } = await supabase.from("preferences").select("budget_level, preferred_transport, preferred_environment").eq("user_id", user.id).maybeSingle();
			if (error) throw error;
			return data;
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "My digital twin",
			title: "Your structured state",
			description: "This is everything LIFEOS models about you. Nothing here is shared, and sensitive fields stay hidden until you grant explicit permission.",
			right: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
				variant: "outline",
				className: "border-success/40 text-success",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "mr-1.5 size-3" }), " Private to you"]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoNotice, { children: "Behaviour patterns below are simulated baselines; your saved preferences are real." })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-4 lg:grid-cols-[1fr_1.2fr]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
					title: "Twin core",
					subtitle: "Model freshness and coverage"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoreOrb, {
					size: 200,
					label: "DIGITAL TWIN",
					status: "Synced"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 space-y-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
							label: "Behaviour coverage",
							value: .78,
							tone: "primary"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
							label: "Schedule coverage",
							value: .64,
							tone: "warning"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
							label: "Context freshness",
							value: .91,
							tone: "success"
						})
					]
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
					title: "Behaviour",
					subtitle: "Learned from observed patterns"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "grid gap-2 sm:grid-cols-2",
					children: BEHAVIOR.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "rounded-xl border border-border bg-surface-2/50 p-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground",
								children: item.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-sm font-medium",
								children: item.value
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-[11px] text-primary",
								children: [
									"confidence ",
									Math.round(item.confidence * 100),
									"%"
								]
							})
						]
					}, item.label))
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
					title: "Preferences",
					subtitle: "Saved during onboarding — editable in Settings"
				}), isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-2 sm:grid-cols-3",
					children: [
						0,
						1,
						2
					].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Skeleton, { className: "h-16 rounded-xl" }, i))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-2 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Budget",
							value: prefs?.budget_level ?? "not set"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Transport",
							value: prefs?.preferred_transport ?? "not set"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Environment",
							value: prefs?.preferred_environment ?? "not set"
						})
					]
				})] })]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-4 grid gap-4 lg:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
				title: "Context graph",
				subtitle: "Signals currently feeding your twin"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "scene-3d relative grid h-72 place-items-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "layer-3d relative size-full",
					style: { transform: "rotateX(14deg)" },
					children: CONTEXT_NODES.map((node, i) => {
						const Icon = node.icon;
						if (node.ring === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "glass absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full",
							style: { boxShadow: "0 0 40px -12px var(--primary)" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "size-5 text-primary",
								"aria-hidden": true
							})
						}, node.id);
						const total = CONTEXT_NODES.length - 1;
						const angle = (i - 1) / total * Math.PI * 2;
						const radius = node.ring === 1 ? 32 : 43;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass absolute w-24 -translate-x-1/2 -translate-y-1/2 rounded-xl p-2 text-center transition-transform duration-500 hover:scale-105",
							style: {
								left: `${50 + Math.cos(angle) * radius}%`,
								top: `${50 + Math.sin(angle) * radius}%`,
								transform: `translate(-50%, -50%) translateZ(${node.ring === 1 ? 24 : 10}px)`
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
								className: "mx-auto size-4 text-primary",
								"aria-hidden": true
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-[11px]",
								children: node.label
							})]
						}, node.id);
					})
				})
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
				title: "Today's timeline",
				subtitle: `Context at ${DEMO_CONTEXT.time}`
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
				className: "relative space-y-4 pl-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute left-1.5 top-1 h-[calc(100%-0.5rem)] w-px bg-border" }), DEMO_SCHEDULE.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute -left-[0.85rem] top-1.5 size-2 rounded-full bg-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-mono text-[11px] text-primary",
							children: item.time
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm",
							children: item.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted-foreground",
							children: item.place
						})
					]
				}, item.title))]
			})] })]
		})
	] });
}
function Field({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-surface-2/50 p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm capitalize",
			children: value.replace("_", " ")
		})]
	});
}
//#endregion
export { TwinPage as component };
