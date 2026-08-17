import { i as __toESM } from "../_runtime.mjs";
import { t as supabase } from "./client-nQdEDnrG.mjs";
import { n as useForm, r as require_react, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as useAuth } from "./router-BvJIRm2k.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { t as Button } from "./button-BLZ6ednA.mjs";
import { t as CoreOrb } from "./CoreOrb-ClgWgMJd.mjs";
import { t as Logo } from "./Logo-B7D1DxTI.mjs";
import { O as LoaderCircle, tt as ArrowLeft } from "../_libs/lucide-react.mjs";
import { t as Input } from "./input-B8Q2ztVi.mjs";
import { t as Label } from "./label-DBD1bRRP.mjs";
import { n as stringType, t as objectType } from "../_libs/zod.mjs";
import { i as Trigger, n as List, r as Root2, t as Content } from "../_libs/radix-ui__react-tabs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-C69KX9up.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Tabs = Root2;
var TabsList = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(List, {
	ref,
	className: cn("inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground", className),
	...props
}));
TabsList.displayName = List.displayName;
var TabsTrigger = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trigger, {
	ref,
	className: cn("inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow", className),
	...props
}));
TabsTrigger.displayName = Trigger.displayName;
var TabsContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content, {
	ref,
	className: cn("mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2", className),
	...props
}));
TabsContent.displayName = Content.displayName;
var signInSchema = objectType({
	email: stringType().email("Enter a valid email address"),
	password: stringType().min(6, "Password must be at least 6 characters")
});
var signUpSchema = signInSchema.extend({ displayName: stringType().min(2, "Tell us what to call you") });
function AuthPage() {
	const navigate = useNavigate();
	const { session, loading } = useAuth();
	const [busy, setBusy] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!loading && session) navigate({ to: "/dashboard" });
	}, [
		loading,
		session,
		navigate
	]);
	const signInForm = useForm({
		resolver: u(signInSchema),
		defaultValues: {
			email: "",
			password: ""
		}
	});
	const signUpForm = useForm({
		resolver: u(signUpSchema),
		defaultValues: {
			email: "",
			password: "",
			displayName: ""
		}
	});
	async function handleGoogle() {
		setBusy("google");
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: { redirectTo: window.location.origin }
		});
		if (error) {
			setBusy(null);
			toast.error("Google sign-in failed", { description: error.message });
			return;
		}
	}
	async function handleSignIn(values) {
		setBusy("email");
		const { error } = await supabase.auth.signInWithPassword(values);
		setBusy(null);
		if (error) {
			toast.error("Could not sign in", { description: error.message });
			return;
		}
		toast.success("Welcome back to LIFEOS");
		navigate({ to: "/dashboard" });
	}
	async function handleSignUp(values) {
		setBusy("email");
		const { error } = await supabase.auth.signUp({
			email: values.email,
			password: values.password,
			options: {
				emailRedirectTo: window.location.origin,
				data: { display_name: values.displayName }
			}
		});
		setBusy(null);
		if (error) {
			toast.error("Could not create your account", { description: error.message });
			return;
		}
		toast.success("Account created", { description: "Let's build your digital twin." });
		navigate({ to: "/onboarding" });
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid min-h-screen lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative hidden overflow-hidden border-r border-border p-10 lg:flex lg:flex-col lg:justify-between",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid-bg absolute inset-0 opacity-50",
					"aria-hidden": true
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-10 max-w-sm text-2xl font-semibold leading-snug tracking-tight text-gradient",
							children: "Understand. Predict. Reason. Recommend. Act. Learn."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-sm text-sm text-muted-foreground",
							children: "LIFEOS reads your permitted context and surfaces the problems that are about to happen — with the reasoning behind every recommendation."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoreOrb, {
						size: 300,
						status: "Standing by"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "relative text-xs text-muted-foreground",
					children: "Prototype build · demo predictions are simulated and clearly labelled."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "flex items-center justify-center px-4 py-12 sm:px-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "mb-6 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-3.5" }), " Back to overview"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "text-2xl font-semibold tracking-tight",
						children: "Enter LIFEOS"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Your context stays private by default — permissions are opt-in."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						variant: "outline",
						className: "mt-6 w-full",
						onClick: () => void handleGoogle(),
						disabled: busy !== null,
						children: [busy === "google" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-4 animate-spin" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GoogleMark, { className: "mr-2 size-4" }), "Continue with Google"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "my-6 flex items-center gap-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground",
								children: "or email"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
						defaultValue: "signin",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TabsList, {
								className: "grid w-full grid-cols-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "signin",
									children: "Sign in"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsTrigger, {
									value: "signup",
									children: "Create account"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "signin",
								className: "mt-5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									className: "space-y-4",
									onSubmit: signInForm.handleSubmit(handleSignIn),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											id: "signin-email",
											label: "Email",
											type: "email",
											autoComplete: "email",
											registration: signInForm.register("email"),
											error: signInForm.formState.errors.email?.message
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											id: "signin-password",
											label: "Password",
											type: "password",
											autoComplete: "current-password",
											registration: signInForm.register("password"),
											error: signInForm.formState.errors.password?.message
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "submit",
											className: "w-full",
											disabled: busy !== null,
											children: [busy === "email" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-4 animate-spin" }) : null, "Sign in"]
										})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabsContent, {
								value: "signup",
								className: "mt-5",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
									className: "space-y-4",
									onSubmit: signUpForm.handleSubmit(handleSignUp),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											id: "signup-name",
											label: "Name",
											autoComplete: "name",
											registration: signUpForm.register("displayName"),
											error: signUpForm.formState.errors.displayName?.message
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											id: "signup-email",
											label: "Email",
											type: "email",
											autoComplete: "email",
											registration: signUpForm.register("email"),
											error: signUpForm.formState.errors.email?.message
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
											id: "signup-password",
											label: "Password",
											type: "password",
											autoComplete: "new-password",
											registration: signUpForm.register("password"),
											error: signUpForm.formState.errors.password?.message
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "submit",
											className: "w-full",
											disabled: busy !== null,
											children: [busy === "email" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoaderCircle, { className: "mr-2 size-4 animate-spin" }) : null, "Create account"]
										})
									]
								})
							})
						]
					})
				]
			})
		})]
	});
}
function Field({ id, label, error, registration, type = "text", autoComplete }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
				htmlFor: id,
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
				id,
				type,
				autoComplete,
				"aria-invalid": !!error,
				...registration
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "alert",
				className: "text-xs text-destructive",
				children: error
			}) : null
		]
	});
}
function GoogleMark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		className,
		viewBox: "0 0 24 24",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "#EA4335",
			d: "M12 10.2v3.9h5.5c-.2 1.3-1.6 3.9-5.5 3.9-3.3 0-6-2.8-6-6.1S8.7 5.8 12 5.8c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.9 3.1 14.7 2.2 12 2.2 6.6 2.2 2.2 6.6 2.2 12S6.6 21.8 12 21.8c5.7 0 9.4-4 9.4-9.6 0-.7-.1-1.2-.2-1.9H12z"
		})
	});
}
//#endregion
export { AuthPage as component };
