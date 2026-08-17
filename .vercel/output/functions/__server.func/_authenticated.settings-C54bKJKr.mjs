import { t as supabase } from "./_ssr/client-B-lcrLUp.mjs";
import { _ as useNavigate } from "./_libs/@tanstack/react-router+[...].mjs";
import { D as require_jsx_runtime } from "./_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "./_libs/sonner.mjs";
import { n as useAuth } from "./_ssr/router-8w0n-NVQ.mjs";
import { t as Button } from "./_ssr/button-BLZ6ednA.mjs";
import { E as LogOut } from "./_libs/lucide-react.mjs";
import { n as Panel, r as PanelHeader, t as PageHeader } from "./_ssr/Panel-CSrXbfmH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_authenticated.settings-C54bKJKr.js
var import_jsx_runtime = require_jsx_runtime();
function SettingsPage() {
	const { user } = useAuth();
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-2xl",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			eyebrow: "Settings",
			title: "Account",
			description: "Your identity and session."
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PanelHeader, {
				title: "Signed in as",
				subtitle: user?.email ?? "unknown"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "grid gap-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between rounded-xl border border-border bg-surface-2/50 px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted-foreground",
						children: "Email"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: user?.email ?? "—" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex justify-between rounded-xl border border-border bg-surface-2/50 px-3 py-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-muted-foreground",
						children: "Sign-in method"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
						className: "capitalize",
						children: user?.app_metadata?.provider ?? "email"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				className: "mt-4",
				variant: "outline",
				onClick: async () => {
					await supabase.auth.signOut();
					toast.success("Signed out");
					navigate({ to: "/" });
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "mr-1.5 size-4" }), " Sign out"]
			})
		] })]
	});
}
//#endregion
export { SettingsPage as component };
