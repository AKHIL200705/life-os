import { i as __toESM } from "./_runtime.mjs";
import { t as supabase } from "./_ssr/client-B-lcrLUp.mjs";
import { r as require_react } from "./_libs/@hookform/resolvers+[...].mjs";
import { D as require_jsx_runtime, a as Overlay2, c as Title2, i as Description2, n as Cancel, o as Portal2, r as Content2, s as Root2, t as Action } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { n as useAuth } from "./_ssr/router-8w0n-NVQ.mjs";
import { t as cn } from "./_ssr/utils-C_uf36nf.mjs";
import { n as buttonVariants, t as Button } from "./_ssr/button-BLZ6ednA.mjs";
import { I as Clock3, S as Navigation, W as CalendarPlus, Y as BookmarkPlus, Z as BellRing, _ as Route, n as X } from "./_libs/lucide-react.mjs";
import { n as Panel, r as PanelHeader, t as PageHeader } from "./_ssr/Panel-CSrXbfmH.mjs";
import { n as SourceBadge, t as DemoNotice } from "./_ssr/SourceBadge-Ccjkhr9j.mjs";
import { t as Badge } from "./_ssr/badge-D1Dupn2y.mjs";
import { c as DEMO_PREDICTIONS } from "./_ssr/demo-data-B2rfthtF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated.actions-C5gxls0i.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AlertDialog = Root2;
var AlertDialogPortal = Portal2;
var AlertDialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
	className: cn("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
AlertDialogOverlay.displayName = Overlay2.displayName;
var AlertDialogContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props
})] }));
AlertDialogContent.displayName = Content2.displayName;
var AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
	ref,
	className: cn("text-lg font-semibold", className),
	...props
}));
AlertDialogTitle.displayName = Title2.displayName;
var AlertDialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
AlertDialogDescription.displayName = Description2.displayName;
var AlertDialogAction = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
	ref,
	className: cn(buttonVariants(), className),
	...props
}));
AlertDialogAction.displayName = Action.displayName;
var AlertDialogCancel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
	ref,
	className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
	...props
}));
AlertDialogCancel.displayName = Cancel.displayName;
var ACTIONS = [
	{
		id: "a1",
		type: "change_route",
		title: "Switch to Route B",
		description: "Avoids the flood-prone underpass and saves an estimated 11 minutes in rain.",
		icon: Route,
		impact: "Late-arrival risk 82% → 31%",
		external: true
	},
	{
		id: "a2",
		type: "start_navigation",
		title: "Start navigation now",
		description: "Opens turn-by-turn guidance for Route B with a departure at 8:12 AM.",
		icon: Navigation,
		impact: "Predicted arrival 8:48 AM",
		external: true
	},
	{
		id: "a3",
		type: "create_reminder",
		title: "Remind me to charge at 11:00 AM",
		description: "Library charging point in Block B currently has 4 free sockets.",
		icon: BellRing,
		impact: "Prevents evening navigation loss",
		external: false
	},
	{
		id: "a4",
		type: "add_calendar_event",
		title: "Block 7:00–8:30 PM Tuesday for the DBMS report",
		description: "Restores a 40-minute buffer before Thursday's deadline.",
		icon: CalendarPlus,
		impact: "Deadline collision risk 57% → 22%",
		external: true
	},
	{
		id: "a5",
		type: "save_recommendation",
		title: "Save 'metro on rainy mornings' rule",
		description: "LIFEOS will prefer metro routing when rain is forecast before 9:00 AM.",
		icon: BookmarkPlus,
		impact: "Projected saving ₹240/week",
		external: false
	}
];
function ActionsPage() {
	const { user } = useAuth();
	const [pending, setPending] = (0, import_react.useState)(null);
	const [statuses, setStatuses] = (0, import_react.useState)({});
	async function persist(action, status) {
		if (!user) return;
		const { error } = await supabase.from("actions").insert({
			user_id: user.id,
			action_type: action.type,
			title: action.title,
			description: action.description,
			status,
			payload: {
				impact: action.impact,
				source: "demo_scenario"
			}
		});
		if (error) toast.error("Could not record the action", { description: error.message });
	}
	async function confirm(action) {
		setStatuses((prev) => ({
			...prev,
			[action.id]: "confirmed"
		}));
		setPending(null);
		await persist(action, "confirmed");
		toast.success("Action confirmed", { description: action.external ? "Recorded in your action log. External integrations are mocked in this prototype." : "Recorded in your action log." });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Action center",
			title: "Actions awaiting your decision",
			description: "LIFEOS never acts silently. Every recommendation needs explicit confirmation, and external integrations are mocked until real APIs are connected.",
			right: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceBadge, { source: "prediction" })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DemoNotice, { children: "Confirming an action records it in your private action log. Navigation, calendar and reminder integrations are mock services in this prototype." })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "scene-3d grid gap-4 lg:grid-cols-2",
			children: ACTIONS.map((action) => {
				const Icon = action.icon;
				const status = statuses[action.id];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
						title: action.title,
						subtitle: action.description,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }),
						right: status ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							variant: "outline",
							className: status === "confirmed" ? "border-success/45 text-success" : status === "snoozed" ? "border-warning/45 text-warning" : "border-border text-muted-foreground",
							children: status
						}) : null
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "rounded-xl border border-primary/25 bg-primary/8 px-3 py-2 text-xs",
						children: action.impact
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								onClick: () => setPending(action),
								disabled: status === "confirmed",
								children: action.external ? "Confirm & run" : "Confirm"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "outline",
								onClick: () => {
									setStatuses((prev) => ({
										...prev,
										[action.id]: "snoozed"
									}));
									persist(action, "snoozed");
									toast("Snoozed for 30 minutes");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { className: "mr-1.5 size-3.5" }), " Snooze"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "ghost",
								onClick: () => {
									setStatuses((prev) => ({
										...prev,
										[action.id]: "dismissed"
									}));
									persist(action, "dismissed");
									toast("Dismissed — recorded as feedback");
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "mr-1.5 size-3.5" }), " Dismiss"]
							})
						]
					})
				] }, action.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			className: "mt-6",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
				title: "Linked predictions",
				subtitle: "Actions above trace back to these open predictions"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "space-y-2",
				children: DEMO_PREDICTIONS.slice(0, 3).map((prediction) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-wrap items-center gap-2 rounded-xl border border-border bg-surface-2/50 px-3 py-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-[11px] text-destructive",
							children: [Math.round(prediction.probability * 100), "%"]
						}),
						prediction.problem,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ml-auto text-xs text-muted-foreground",
							children: prediction.recommendedAction
						})
					]
				}, prediction.id))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
			open: pending !== null,
			onOpenChange: (open) => !open && setPending(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, { children: "Confirm this action?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogDescription, { children: [
				pending?.title,
				".",
				" ",
				pending?.external ? "This would normally reach an external service — in this prototype it is recorded in your private action log only." : "This will be recorded in your private action log."
			] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, { children: "Cancel" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
				onClick: () => pending && void confirm(pending),
				children: "Confirm"
			})] })] })
		})
	] });
}
//#endregion
export { ActionsPage as component };
