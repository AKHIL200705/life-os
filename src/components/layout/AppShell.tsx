import { Link, useRouterState } from "@tanstack/react-router";
import { LogOut, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";

import { Logo } from "@/components/lifeos/Logo";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { MOBILE_NAV, NAV_GROUPS } from "@/components/layout/nav-config";
import { cn } from "@/lib/utils";

export function AppShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user, signOut } = useAuth();

  const displayName =
    (user?.user_metadata?.["display_name"] as string | undefined) ??
    (user?.user_metadata?.["full_name"] as string | undefined) ??
    user?.email?.split("@")[0] ??
    "Guest";

  return (
    <div className="min-h-screen lg:flex">
      {/* Desktop sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar/80 backdrop-blur-xl lg:flex">
        <div className="flex h-16 items-center px-5">
          <Link to="/dashboard" aria-label="LIFEOS command center">
            <Logo />
          </Link>
        </div>
        <nav className="flex-1 space-y-6 overflow-y-auto px-3 pb-6">
          {NAV_GROUPS.map((group) => (
            <div key={group.title}>
              <p className="mb-2 px-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {group.title}
              </p>
              <ul className="space-y-0.5">
                {group.items.map((item) => (
                  <li key={item.to}>
                    <NavLink item={item} active={pathname === item.to} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className="border-t border-sidebar-border p-3">
          <div className="flex items-center gap-3 rounded-xl px-2 py-2">
            <span className="grid size-8 place-items-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
              {displayName.slice(0, 2).toUpperCase()}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium">{displayName}</p>
              <p className="truncate text-[11px] text-muted-foreground">{user?.email}</p>
            </div>
            <Button
              size="icon"
              variant="ghost"
              aria-label="Sign out"
              onClick={() => void signOut()}
            >
              <LogOut className="size-4" />
            </Button>
          </div>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        {/* Mobile top bar */}
        <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-border bg-background/85 px-4 backdrop-blur-xl lg:hidden">
          <Link to="/dashboard" aria-label="LIFEOS command center">
            <Logo />
          </Link>
          <Button
            size="icon"
            variant="ghost"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </header>

        {open ? (
          <div className="border-b border-border bg-surface/95 px-4 py-4 backdrop-blur-xl lg:hidden">
            <div className="grid gap-4 sm:grid-cols-2">
              {NAV_GROUPS.map((group) => (
                <div key={group.title}>
                  <p className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                    {group.title}
                  </p>
                  <ul className="space-y-0.5">
                    {group.items.map((item) => (
                      <li key={item.to} onClick={() => setOpen(false)}>
                        <NavLink item={item} active={pathname === item.to} />
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-4 w-full" onClick={() => void signOut()}>
              <LogOut className="mr-2 size-4" /> Sign out
            </Button>
          </div>
        ) : null}

        <main className="mx-auto w-full max-w-7xl px-4 pb-28 pt-6 sm:px-6 lg:pb-12 lg:pt-8">
          {children}
        </main>
      </div>

      {/* Mobile bottom nav */}
      <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/90 backdrop-blur-xl lg:hidden">
        <ul className="mx-auto flex max-w-md items-stretch justify-between px-2 py-1.5">
          {MOBILE_NAV.map((item) => {
            const active = pathname === item.to;
            const Icon = item.icon;
            return (
              <li key={item.to} className="flex-1">
                <Link
                  to={item.to}
                  className={cn(
                    "flex flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 text-[10px] transition-colors",
                    active ? "text-primary" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon className="size-5" aria-hidden />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

function NavLink({
  item,
  active,
}: {
  item: { to: string; label: string; icon: React.ComponentType<{ className?: string }> };
  active: boolean;
}) {
  const Icon = item.icon;
  return (
    <Link
      to={item.to}
      className={cn(
        "group flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm transition-all duration-300",
        active
          ? "bg-sidebar-accent text-foreground shadow-glow"
          : "text-muted-foreground hover:translate-x-0.5 hover:bg-sidebar-accent/60 hover:text-foreground",
      )}
    >
      <Icon
        className={cn(
          "size-4 transition-colors",
          active ? "text-primary" : "text-muted-foreground group-hover:text-primary",
        )}
      />
      {item.label}
    </Link>
  );
}
