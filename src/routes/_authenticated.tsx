import { Outlet, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import { AppShell } from "@/components/layout/AppShell";
import { CoreOrb } from "@/components/lifeos/CoreOrb";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/_authenticated")({
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  const { session, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !session) {
      void navigate({ to: "/auth" });
    }
  }, [loading, session, navigate]);

  if (loading || !session) {
    return (
      <div className="grid min-h-screen place-items-center px-4">
        <div className="text-center">
          <CoreOrb size={180} label="LIFEOS" status={loading ? "Booting" : "Sign in"} />
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
            {loading ? "Restoring your session…" : "Redirecting to sign in…"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
