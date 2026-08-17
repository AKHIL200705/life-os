import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-B-lcrLUp.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { c as HeadContent, d as createRouter, f as Outlet, g as Link, h as createRootRouteWithContext, m as createFileRoute, p as lazyRouteComponent, s as Scripts, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { n as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-8w0n-NVQ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var styles_default = "/assets/styles-DBA1e2Z3.css";
var AuthContext = (0, import_react.createContext)({
	session: null,
	user: null,
	loading: true,
	signOut: async () => {}
});
function AuthProvider({ children }) {
	const [session, setSession] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
			setSession(nextSession);
			setLoading(false);
		});
		supabase.auth.getSession().then(({ data: { session: current } }) => {
			setSession(current);
			setLoading(false);
		});
		return () => data.subscription.unsubscribe();
	}, []);
	const value = (0, import_react.useMemo)(() => ({
		session,
		user: session?.user ?? null,
		loading,
		signOut: async () => {
			await supabase.auth.signOut();
		}
	}), [session, loading]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthContext.Provider, {
		value,
		children
	});
}
function useAuth() {
	return (0, import_react.useContext)(AuthContext);
}
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$18 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{
				name: "author",
				content: "LIFEOS"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			},
			{
				name: "theme-color",
				content: "#141821"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		className: "dark",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$18.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {})] })
	});
}
var $$splitComponentImporter$17 = () => import("./routes-BEJq3BX4.mjs");
var Route$17 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "LIFEOS — Predict Everyday Friction Before It Happens" },
		{
			name: "description",
			content: "LIFEOS is a proactive life intelligence platform: it reads your permitted context, predicts problems like late arrivals or deadline clashes, explains why, and recommends the best action."
		},
		{
			property: "og:title",
			content: "LIFEOS — Real-World Friction Prediction Platform"
		},
		{
			property: "og:description",
			content: "Understand → Predict → Reason → Recommend → Act → Learn. A futuristic AI operating system for everyday life."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("../_authenticated-BwTNHYCb.mjs");
var Route$16 = createFileRoute("/_authenticated")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./auth-ebKI-dbt.mjs");
var Route$15 = createFileRoute("/auth")({
	head: () => ({ meta: [
		{ title: "Sign in to LIFEOS — Proactive Life Intelligence" },
		{
			name: "description",
			content: "Sign in or create your LIFEOS account to access the friction prediction command center, digital twin and action engine."
		},
		{
			property: "og:title",
			content: "Sign in to LIFEOS"
		},
		{
			property: "og:description",
			content: "Access your LIFEOS command center — predict everyday friction before it happens."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./technology-UQniD-kc.mjs");
var Route$14 = createFileRoute("/technology")({
	head: () => ({ meta: [
		{ title: "About the Technology — LIFEOS Architecture & Research" },
		{
			name: "description",
			content: "How LIFEOS works: context-aware computing, multi-agent AI, predictive analytics, digital twins and privacy-preserving intelligence, with a full system architecture overview."
		},
		{
			property: "og:title",
			content: "LIFEOS Technology & Research"
		},
		{
			property: "og:description",
			content: "Context-aware computing, multi-agent reasoning, digital twins and privacy-preserving prediction — the research foundation behind LIFEOS."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("../_authenticated.actions-C5gxls0i.mjs");
var Route$13 = createFileRoute("/_authenticated/actions")({
	head: () => ({ meta: [
		{ title: "Action Center — LIFEOS" },
		{
			name: "description",
			content: "Confirm, snooze or dismiss the actions LIFEOS recommends: change route, start navigation, create a reminder, add a calendar event or save a recommendation."
		},
		{
			property: "og:title",
			content: "LIFEOS Action Center"
		},
		{
			property: "og:description",
			content: "Every recommended action requires your confirmation before anything happens."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("../_authenticated.agents-59Mus6zC.mjs");
var Route$12 = createFileRoute("/_authenticated/agents")({
	head: () => ({ meta: [
		{ title: "Multi-Agent AI System — LIFEOS" },
		{
			name: "description",
			content: "Travel, Schedule, Environment, Finance and Safety agents feed the LIFEOS reasoning engine, which fuses their reports into one recommendation."
		},
		{
			property: "og:title",
			content: "LIFEOS Multi-Agent Architecture"
		},
		{
			property: "og:description",
			content: "Five specialised agents connected to a central reasoning engine."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("../_authenticated.analytics-jYdJC2P_.mjs");
var Route$11 = createFileRoute("/_authenticated/analytics")({
	head: () => ({ meta: [
		{ title: "Personal Intelligence Analytics — LIFEOS" },
		{
			name: "description",
			content: "Problems prevented, minutes and money saved, prediction accuracy trends and where your daily friction actually comes from."
		},
		{
			property: "og:title",
			content: "LIFEOS Analytics"
		},
		{
			property: "og:description",
			content: "Measured impact: time saved, money saved, accuracy over time."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("../_authenticated.city-9tEprEnG.mjs");
var Route$10 = createFileRoute("/_authenticated/city")({
	head: () => ({ meta: [
		{ title: "City Intelligence — LIFEOS" },
		{
			name: "description",
			content: "Aggregated, anonymised city signals: congestion hotspots, crowd density, environmental anomalies, infrastructure issues and predicted problem zones."
		},
		{
			property: "og:title",
			content: "LIFEOS City Intelligence"
		},
		{
			property: "og:description",
			content: "Anonymised aggregate signals that make individual predictions sharper."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("../_authenticated.dashboard-D7pYf6j6.mjs");
var Route$9 = createFileRoute("/_authenticated/dashboard")({
	head: () => ({ meta: [
		{ title: "LIFEOS Command Center — Today's Risk & Actions" },
		{
			name: "description",
			content: "Your live context, current risk level, today's predicted problems and the single best recommended action, all in one command center."
		},
		{
			property: "og:title",
			content: "LIFEOS Command Center"
		},
		{
			property: "og:description",
			content: "Current context, AI status, predicted problems and recommended actions at a glance."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("../_authenticated.demo-D102wJel.mjs");
var Route$8 = createFileRoute("/_authenticated/demo")({
	head: () => ({ meta: [
		{ title: "Investor Demo — LIFEOS Live Simulation" },
		{
			name: "description",
			content: "Watch a full LIFEOS reasoning cycle: context shifts, agents analyse, risk crosses threshold, and a one-tap action is delivered."
		},
		{
			property: "og:title",
			content: "LIFEOS Investor Demo"
		},
		{
			property: "og:description",
			content: "A scripted end-to-end run of the prediction and action loop."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("../_authenticated.history-BCkEggcZ.mjs");
var Route$7 = createFileRoute("/_authenticated/history")({
	head: () => ({ meta: [
		{ title: "Prediction History & Accuracy — LIFEOS" },
		{
			name: "description",
			content: "Every past prediction with what actually happened, whether it was right, and the feedback that trains the next cycle."
		},
		{
			property: "og:title",
			content: "LIFEOS Prediction History"
		},
		{
			property: "og:description",
			content: "Accuracy tracking and outcome logs — predictions held accountable."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("../_authenticated.map-DrdD-faB.mjs");
var Route$6 = createFileRoute("/_authenticated/map")({
	head: () => ({ meta: [
		{ title: "Environment Map — LIFEOS" },
		{
			name: "description",
			content: "A holographic environment plane showing traffic, weather cells, risk zones, charging points and quiet study spots around you."
		},
		{
			property: "og:title",
			content: "LIFEOS Environment Map"
		},
		{
			property: "og:description",
			content: "Simulated spatial intelligence layered over a normalised map grid."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("../_authenticated.memory-gtJUKMs1.mjs");
var Route$5 = createFileRoute("/_authenticated/memory")({
	head: () => ({ meta: [
		{ title: "LIFEOS Memory — Learned Patterns" },
		{
			name: "description",
			content: "Every pattern LIFEOS has learned about you, in plain language, with its source and confidence. Add your own facts or delete anything you disagree with."
		},
		{
			property: "og:title",
			content: "LIFEOS Memory"
		},
		{
			property: "og:description",
			content: "Inspectable, editable long-term memory — the opposite of a black box."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("../_authenticated.onboarding-SbGFoAQX.mjs");
var Route$4 = createFileRoute("/_authenticated/onboarding")({
	head: () => ({ meta: [
		{ title: "Set up your Digital Twin — LIFEOS Onboarding" },
		{
			name: "description",
			content: "Choose your primary goal, grant only the permissions you want, set preferences and generate your initial LIFEOS digital twin."
		},
		{
			property: "og:title",
			content: "LIFEOS Onboarding"
		},
		{
			property: "og:description",
			content: "Six guided steps to generate your digital twin and first proactive insight."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("../_authenticated.predictions-YkUUPbqb.mjs");
var Route$3 = createFileRoute("/_authenticated/predictions")({
	head: () => ({ meta: [
		{ title: "Friction Predictions — LIFEOS" },
		{
			name: "description",
			content: "Every predicted problem with its probability, severity, time-to-event, reasons, recommended action, expected benefit and confidence score."
		},
		{
			property: "og:title",
			content: "LIFEOS Friction Prediction Engine"
		},
		{
			property: "og:description",
			content: "Probability, severity, reasoning and recommended action for each predicted problem."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("../_authenticated.privacy-DDQl-ZF9.mjs");
var Route$2 = createFileRoute("/_authenticated/privacy")({
	head: () => ({ meta: [
		{ title: "Privacy Center — LIFEOS" },
		{
			name: "description",
			content: "Granular permission toggles, plain-language explanations of what each signal is used for, plus data export and deletion."
		},
		{
			property: "og:title",
			content: "LIFEOS Privacy Center"
		},
		{
			property: "og:description",
			content: "Every signal is opt-in, explained, and revocable at any time."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("../_authenticated.settings-C54bKJKr.mjs");
var Route$1 = createFileRoute("/_authenticated/settings")({
	head: () => ({ meta: [
		{ title: "Settings & Profile — LIFEOS" },
		{
			name: "description",
			content: "Your LIFEOS account, preference summary and session controls."
		},
		{
			property: "og:title",
			content: "LIFEOS Settings"
		},
		{
			property: "og:description",
			content: "Account details and session controls."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("../_authenticated.twin-DlmZ35CO.mjs");
var Route = createFileRoute("/_authenticated/twin")({
	head: () => ({ meta: [
		{ title: "My Digital Twin — LIFEOS" },
		{
			name: "description",
			content: "A structured, inspectable model of your behaviour, preferences, schedule and current context — with a timeline and interactive context graph."
		},
		{
			property: "og:title",
			content: "My LIFEOS Digital Twin"
		},
		{
			property: "og:description",
			content: "Behaviour, preferences, schedule and live context in one editable profile."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$17.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$18
});
var AuthenticatedRoute = Route$16.update({
	id: "/_authenticated",
	getParentRoute: () => Route$18
});
var AuthRoute = Route$15.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$18
});
var TechnologyRoute = Route$14.update({
	id: "/technology",
	path: "/technology",
	getParentRoute: () => Route$18
});
var AuthenticatedRouteChildren = {
	AuthenticatedActionsRoute: Route$13.update({
		id: "/actions",
		path: "/actions",
		getParentRoute: () => AuthenticatedRoute
	}),
	AuthenticatedAgentsRoute: Route$12.update({
		id: "/agents",
		path: "/agents",
		getParentRoute: () => AuthenticatedRoute
	}),
	AuthenticatedAnalyticsRoute: Route$11.update({
		id: "/analytics",
		path: "/analytics",
		getParentRoute: () => AuthenticatedRoute
	}),
	AuthenticatedCityRoute: Route$10.update({
		id: "/city",
		path: "/city",
		getParentRoute: () => AuthenticatedRoute
	}),
	AuthenticatedDashboardRoute: Route$9.update({
		id: "/dashboard",
		path: "/dashboard",
		getParentRoute: () => AuthenticatedRoute
	}),
	AuthenticatedDemoRoute: Route$8.update({
		id: "/demo",
		path: "/demo",
		getParentRoute: () => AuthenticatedRoute
	}),
	AuthenticatedHistoryRoute: Route$7.update({
		id: "/history",
		path: "/history",
		getParentRoute: () => AuthenticatedRoute
	}),
	AuthenticatedMapRoute: Route$6.update({
		id: "/map",
		path: "/map",
		getParentRoute: () => AuthenticatedRoute
	}),
	AuthenticatedMemoryRoute: Route$5.update({
		id: "/memory",
		path: "/memory",
		getParentRoute: () => AuthenticatedRoute
	}),
	AuthenticatedOnboardingRoute: Route$4.update({
		id: "/onboarding",
		path: "/onboarding",
		getParentRoute: () => AuthenticatedRoute
	}),
	AuthenticatedPredictionsRoute: Route$3.update({
		id: "/predictions",
		path: "/predictions",
		getParentRoute: () => AuthenticatedRoute
	}),
	AuthenticatedPrivacyRoute: Route$2.update({
		id: "/privacy",
		path: "/privacy",
		getParentRoute: () => AuthenticatedRoute
	}),
	AuthenticatedSettingsRoute: Route$1.update({
		id: "/settings",
		path: "/settings",
		getParentRoute: () => AuthenticatedRoute
	}),
	AuthenticatedTwinRoute: Route.update({
		id: "/twin",
		path: "/twin",
		getParentRoute: () => AuthenticatedRoute
	})
};
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRoute: AuthenticatedRoute._addFileChildren(AuthenticatedRouteChildren),
	AuthRoute,
	TechnologyRoute
};
var routeTree = Route$18._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { useAuth as n, router_exports as t };
