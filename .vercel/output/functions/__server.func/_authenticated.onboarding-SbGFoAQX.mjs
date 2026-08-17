import { i as __toESM } from "./_runtime.mjs";
import { t as supabase } from "./_ssr/client-B-lcrLUp.mjs";
import { r as require_react } from "./_libs/@hookform/resolvers+[...].mjs";
import { _ as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { D as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { n as useAuth } from "./_ssr/router-8w0n-NVQ.mjs";
import { t as cn } from "./_ssr/utils-C_uf36nf.mjs";
import { t as Button } from "./_ssr/button-BLZ6ednA.mjs";
import { t as CoreOrb } from "./_ssr/CoreOrb-ClgWgMJd.mjs";
import { O as LoaderCircle, U as Check, et as ArrowRight, f as Sparkles, tt as ArrowLeft } from "./_libs/lucide-react.mjs";
import { n as Panel } from "./_ssr/Panel-CSrXbfmH.mjs";
import { n as SourceBadge } from "./_ssr/SourceBadge-Ccjkhr9j.mjs";
import { t as Label } from "./_ssr/label-DBD1bRRP.mjs";
import { t as Switch } from "./_ssr/switch-Cn1w-cIH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated.onboarding-SbGFoAQX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var GOALS = [
	{
		id: "productivity",
		label: "Productivity",
		detail: "Protect focus time and deadlines"
	},
	{
		id: "travel",
		label: "Travel",
		detail: "Arrive on time, every time"
	},
	{
		id: "study",
		label: "Study",
		detail: "Plan revision around real capacity"
	},
	{
		id: "work",
		label: "Work",
		detail: "Meetings, commutes and conflicts"
	},
	{
		id: "organization",
		label: "Personal organization",
		detail: "Tasks, money and routine"
	}
];
var PERMISSIONS = [
	{
		id: "location_access",
		label: "Location",
		detail: "Travel-time and route predictions"
	},
	{
		id: "calendar_access",
		label: "Calendar",
		detail: "Conflict and deadline predictions"
	},
	{
		id: "notifications",
		label: "Notifications",
		detail: "Alerts before friction happens"
	},
	{
		id: "device_info",
		label: "Device state",
		detail: "Battery and connectivity risks"
	},
	{
		id: "ai_personalization",
		label: "AI personalization",
		detail: "Learn your routines over time"
	}
];
var TRANSPORT = [
	"metro",
	"bike",
	"cab",
	"bus",
	"walk"
];
var BUDGETS = [
	"lean",
	"moderate",
	"flexible"
];
var ENVIRONMENTS = [
	"quiet",
	"collaborative",
	"outdoor"
];
var STEPS = [
	"Welcome",
	"Goal",
	"Permissions",
	"Preferences",
	"Digital twin",
	"First insight"
];
function Onboarding() {
	const navigate = useNavigate();
	const { user } = useAuth();
	const [step, setStep] = (0, import_react.useState)(0);
	const [goal, setGoal] = (0, import_react.useState)("study");
	const [permissions, setPermissions] = (0, import_react.useState)({
		location_access: true,
		calendar_access: true,
		notifications: true,
		device_info: false,
		ai_personalization: true
	});
	const [transport, setTransport] = (0, import_react.useState)("metro");
	const [budget, setBudget] = (0, import_react.useState)("lean");
	const [environment, setEnvironment] = (0, import_react.useState)("quiet");
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [generated, setGenerated] = (0, import_react.useState)(false);
	async function generateTwin() {
		if (!user) return;
		setSaving(true);
		const results = await Promise.all([
			supabase.from("profiles").upsert({
				id: user.id,
				primary_goal: goal,
				onboarding_completed: true
			}),
			supabase.from("preferences").upsert({
				user_id: user.id,
				budget_level: budget,
				preferred_transport: transport,
				preferred_environment: environment
			}),
			supabase.from("privacy_settings").upsert({
				user_id: user.id,
				location_access: !!permissions["location_access"],
				calendar_access: !!permissions["calendar_access"],
				notifications: !!permissions["notifications"],
				device_info: !!permissions["device_info"],
				ai_personalization: !!permissions["ai_personalization"]
			}),
			supabase.from("digital_twin_states").insert({
				user_id: user.id,
				behavior: {
					typical_departure: "08:05",
					typical_wake: "07:10"
				},
				preferences: {
					transport,
					budget,
					environment
				},
				schedule: { primary_goal: goal },
				context: { source: "onboarding" }
			})
		]);
		setSaving(false);
		const failed = results.find((r) => r.error);
		if (failed?.error) {
			toast.error("Could not save your setup", { description: failed.error.message });
			return;
		}
		setGenerated(true);
		setStep(5);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-6 flex items-center gap-2",
			children: STEPS.map((label, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("grid size-6 shrink-0 place-items-center rounded-full border font-mono text-[10px] transition-colors", i < step ? "border-success/50 bg-success/15 text-success" : i === step ? "border-primary bg-primary/15 text-primary" : "border-border text-muted-foreground"),
					children: i < step ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3" }) : i + 1
				}), i < STEPS.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("h-px flex-1", i < step ? "bg-success/50" : "bg-border") }) : null]
			}, label))
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
			tilt: false,
			glow: true,
			className: "p-6 sm:p-8",
			children: [
				step === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoreOrb, {
							size: 220,
							status: "Initialising"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-6 text-2xl font-semibold tracking-tight",
							children: "Welcome to LIFEOS"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mx-auto mt-2 max-w-md text-sm text-muted-foreground",
							children: "LIFEOS builds a private model of your day, then watches for the problems forming ahead of you. Six short steps and your digital twin is live."
						})
					]
				}) : null,
				step === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
					title: "Choose your primary goal",
					hint: "This ranks which agents get priority.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-2 sm:grid-cols-2",
						children: GOALS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setGoal(option.id),
							className: cn("rounded-xl border p-3 text-left transition-all duration-300 hover:-translate-y-0.5", goal === option.id ? "border-primary bg-primary/10" : "border-border bg-surface-2/40"),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: option.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-xs text-muted-foreground",
								children: option.detail
							})]
						}, option.id))
					})
				}) : null,
				step === 2 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
					title: "Choose optional permissions",
					hint: "Everything is off unless you switch it on. You can change these any time in the Privacy Center.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-2",
						children: PERMISSIONS.map((permission) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between rounded-xl border border-border bg-surface-2/40 p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
								htmlFor: permission.id,
								className: "text-sm",
								children: permission.label
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-0.5 text-xs text-muted-foreground",
								children: permission.detail
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
								id: permission.id,
								checked: !!permissions[permission.id],
								onCheckedChange: (checked) => setPermissions((prev) => ({
									...prev,
									[permission.id]: checked
								}))
							})]
						}, permission.id))
					})
				}) : null,
				step === 3 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
					title: "Set your preferences",
					hint: "Used to score recommendations you will actually take.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "space-y-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceRow, {
								label: "Preferred transport",
								options: TRANSPORT,
								value: transport,
								onChange: setTransport
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceRow, {
								label: "Budget style",
								options: BUDGETS,
								value: budget,
								onChange: setBudget
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChoiceRow, {
								label: "Work environment",
								options: ENVIRONMENTS,
								value: environment,
								onChange: setEnvironment
							})
						]
					})
				}) : null,
				step === 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
					title: "Generate your digital twin",
					hint: "LIFEOS creates your initial behaviour model from these answers.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid gap-3 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
								label: "Primary goal",
								value: goal
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
								label: "Transport",
								value: transport
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
								label: "Budget",
								value: budget
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
								label: "Environment",
								value: environment
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
								label: "Permissions granted",
								value: `${Object.values(permissions).filter(Boolean).length} of ${PERMISSIONS.length}`
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, {
								label: "Baseline pattern",
								value: "Departure 8:05 AM"
							})
						]
					})
				}) : null,
				step === 5 && generated ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Step, {
					title: "Your first insight",
					hint: "Generated from your new twin plus simulated context.",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-2xl border border-primary/30 bg-primary/8 p-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-2 flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {
									className: "size-4 text-primary",
									"aria-hidden": true
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SourceBadge, { source: "prediction" })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: "Based on a 8:05 AM departure and today's rain, your 9:00 AM commitment carries an 82% late-arrival risk."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-muted-foreground",
								children: "Recommended action: leave 17 minutes earlier via Route B — reduces the risk by about 62%."
							})
						]
					})
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "ghost",
						size: "sm",
						onClick: () => setStep((s) => Math.max(0, s - 1)),
						disabled: step === 0 || saving,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "mr-1.5 size-4" }), " Back"]
					}), step < 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: () => setStep((s) => s + 1),
						children: ["Continue ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1.5 size-4" })]
					}) : step === 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: () => void generateTwin(),
						disabled: saving,
						children: [saving ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-4 animate-spin" }) : null, "Generate digital twin"]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						size: "sm",
						onClick: () => void navigate({ to: "/dashboard" }),
						children: ["Enter command center ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "ml-1.5 size-4" })]
					})]
				})
			]
		})]
	});
}
function Step({ title, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "text-xl font-semibold tracking-tight",
			children: title
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mb-5 mt-1 text-sm text-muted-foreground",
			children: hint
		}),
		children
	] });
}
function ChoiceRow({ label, options, value, onChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground",
		children: label
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-2",
		children: options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			onClick: () => onChange(option),
			className: cn("rounded-full border px-3 py-1.5 text-xs capitalize transition-colors", value === option ? "border-primary bg-primary/12 text-primary" : "border-border text-muted-foreground hover:text-foreground"),
			children: option
		}, option))
	})] });
}
function Summary({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-surface-2/40 p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm capitalize",
			children: value
		})]
	});
}
//#endregion
export { Onboarding as component };
