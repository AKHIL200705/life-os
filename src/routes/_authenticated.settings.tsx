import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

import { PageHeader, Panel, PanelHeader } from "@/components/lifeos/Panel";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/settings")({
  head: () => ({
    meta: [
      { title: "Settings & Profile — LIFEOS" },
      {
        name: "description",
        content: "Your LIFEOS account, preference summary and session controls.",
      },
      { property: "og:title", content: "LIFEOS Settings" },
      { property: "og:description", content: "Account details and session controls." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader eyebrow="Settings" title="Account" description="Your identity and session." />

      <Panel>
        <PanelHeader title="Signed in as" subtitle={user?.email ?? "unknown"} />
        <dl className="grid gap-2 text-sm">
          <div className="flex justify-between rounded-xl border border-border bg-surface-2/50 px-3 py-2">
            <dt className="text-muted-foreground">Email</dt>
            <dd>{user?.email ?? "—"}</dd>
          </div>
          <div className="flex justify-between rounded-xl border border-border bg-surface-2/50 px-3 py-2">
            <dt className="text-muted-foreground">Sign-in method</dt>
            <dd className="capitalize">{user?.app_metadata?.provider ?? "email"}</dd>
          </div>
        </dl>
        <Button
          className="mt-4"
          variant="outline"
          onClick={async () => {
            await supabase.auth.signOut();
            toast.success("Signed out");
            void navigate({ to: "/" });
          }}
        >
          <LogOut className="mr-1.5 size-4" /> Sign out
        </Button>
      </Panel>
    </div>
  );
}
