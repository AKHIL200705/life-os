import { i as __toESM } from "./_runtime.mjs";
import { r as require_react } from "./_libs/@hookform/resolvers+[...].mjs";
import { _ as useNavigate, f as Outlet, g as Link, l as useRouterState } from "./_libs/@tanstack/react-router+[...].mjs";
import { D as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as useAuth } from "./_ssr/router-BvJIRm2k.mjs";
import { t as cn } from "./_ssr/utils-C_uf36nf.mjs";
import { t as Button } from "./_ssr/button-BLZ6ednA.mjs";
import { t as CoreOrb } from "./_ssr/CoreOrb-ClgWgMJd.mjs";
import { t as Logo } from "./_ssr/Logo-B7D1DxTI.mjs";
import { A as History, B as CirclePlay, C as Menu, E as LogOut, J as Bot, K as Building2, R as CircleUserRound, f as Sparkles, g as Settings, j as Gauge, m as ShieldCheck, n as X, nt as Activity, q as Brain, t as Zap, w as Map } from "./_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated-BRSeHDVL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var NAV_GROUPS = [
	{
		title: "Intelligence",
		items: [
			{
				to: "/dashboard",
				label: "Command Center",
				icon: Gauge
			},
			{
				to: "/predictions",
				label: "Predictions",
				icon: Sparkles
			},
			{
				to: "/agents",
				label: "AI Agents",
				icon: Bot
			},
			{
				to: "/actions",
				label: "Action Center",
				icon: Zap
			}
		]
	},
	{
		title: "Context",
		items: [
			{
				to: "/twin",
				label: "Digital Twin",
				icon: CircleUserRound
			},
			{
				to: "/map",
				label: "Environment Map",
				icon: Map
			},
			{
				to: "/city",
				label: "City Intelligence",
				icon: Building2
			},
			{
				to: "/memory",
				label: "LIFEOS Memory",
				icon: Brain
			}
		]
	},
	{
		title: "Evidence",
		items: [
			{
				to: "/history",
				label: "Prediction History",
				icon: History
			},
			{
				to: "/analytics",
				label: "Analytics",
				icon: Activity
			},
			{
				to: "/demo",
				label: "Investor Demo",
				icon: CirclePlay
			}
		]
	},
	{
		title: "Control",
		items: [{
			to: "/privacy",
			label: "Privacy Center",
			icon: ShieldCheck
		}, {
			to: "/settings",
			label: "Settings",
			icon: Settings
		}]
	}
];
var MOBILE_NAV = [
	{
		to: "/dashboard",
		label: "Home",
		icon: Gauge
	},
	{
		to: "/predictions",
		label: "Predict",
		icon: Sparkles
	},
	{
		to: "/map",
		label: "Map",
		icon: Map
	},
	{
		to: "/actions",
		label: "Actions",
		icon: Zap
	},
	{
		to: "/settings",
		label: "Profile",
		icon: CircleUserRound
	}
];
function AppShell({ children }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { user, signOut } = useAuth();
	const displayName = user?.user_metadata?.["display_name"] ?? user?.user_metadata?.["full_name"] ?? user?.email?.split("@")[0] ?? "Guest";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen lg:flex",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar/80 backdrop-blur-xl lg:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-16 items-center px-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/dashboard",
							"aria-label": "LIFEOS command center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex-1 space-y-6 overflow-y-auto px-3 pb-6",
						children: NAV_GROUPS.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mb-2 px-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
							children: group.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-0.5",
							children: group.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
								item,
								active: pathname === item.to
							}) }, item.to))
						})] }, group.title))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "border-t border-sidebar-border p-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3 rounded-xl px-2 py-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "grid size-8 place-items-center rounded-full bg-primary/15 text-xs font-semibold text-primary",
									children: displayName.slice(0, 2).toUpperCase()
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-xs font-medium",
										children: displayName
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate text-[11px] text-muted-foreground",
										children: user?.email
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									size: "icon",
									variant: "ghost",
									"aria-label": "Sign out",
									onClick: () => void signOut(),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" })
								})
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0 flex-1",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
						className: "sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-background/85 px-4 backdrop-blur-xl lg:hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/dashboard",
							"aria-label": "LIFEOS command center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							size: "icon",
							variant: "ghost",
							"aria-label": open ? "Close menu" : "Open menu",
							onClick: () => setOpen((v) => !v),
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
						})]
					}),
					open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-b border-border bg-surface/95 px-4 py-4 backdrop-blur-xl lg:hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: NAV_GROUPS.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground",
								children: group.title
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-0.5",
								children: group.items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
									onClick: () => setOpen(false),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
										item,
										active: pathname === item.to
									})
								}, item.to))
							})] }, group.title))
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline",
							className: "mt-4 w-full",
							onClick: () => void signOut(),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "mr-2 size-4" }), " Sign out"]
						})]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
						className: "mx-auto w-full max-w-7xl px-4 pb-28 pt-6 sm:px-6 lg:pb-12 lg:pt-8",
						children
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 backdrop-blur-xl lg:hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mx-auto flex max-w-md items-stretch justify-between px-2 py-1.5",
					children: MOBILE_NAV.map((item) => {
						const active = pathname === item.to;
						const Icon = item.icon;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
							className: "flex-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("flex flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 text-[10px] transition-colors", active ? "text-primary" : "text-muted-foreground hover:text-foreground"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
									className: "size-5",
									"aria-hidden": true
								}), item.label]
							})
						}, item.to);
					})
				})
			})
		]
	});
}
function NavLink({ item, active }) {
	const Icon = item.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: item.to,
		className: cn("group flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm transition-all duration-300", active ? "bg-sidebar-accent text-foreground shadow-glow" : "text-muted-foreground hover:translate-x-0.5 hover:bg-sidebar-accent/60 hover:text-foreground"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: cn("size-4 transition-colors", active ? "text-primary" : "text-muted-foreground group-hover:text-primary") }), item.label]
	});
}
function AuthenticatedLayout() {
	const { session, loading } = useAuth();
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (!loading && !session) navigate({ to: "/auth" });
	}, [
		loading,
		session,
		navigate
	]);
	if (loading || !session) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid min-h-screen place-items-center px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "text-center",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoreOrb, {
				size: 180,
				label: "LIFEOS",
				status: loading ? "Booting" : "Sign in"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground",
				children: loading ? "Restoring your session…" : "Redirecting to sign in…"
			})]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
}
//#endregion
export { AuthenticatedLayout as component };
