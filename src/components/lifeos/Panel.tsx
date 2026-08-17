import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface PanelProps {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  glow?: boolean;
}

export function Panel({ children, className, tilt = true, glow = false }: PanelProps) {
  return (
    <div
      className={cn(
        "glass relative overflow-hidden rounded-2xl p-5",
        tilt && "tilt-3d-soft",
        glow && "shadow-glow",
        className,
      )}
    >
      <div className="hairline pointer-events-none absolute inset-x-6 top-0 h-px" />
      {children}
    </div>
  );
}

interface PanelHeaderProps {
  title: string;
  subtitle?: string;
  icon?: ReactNode;
  right?: ReactNode;
  className?: string;
}

export function PanelHeader({ title, subtitle, icon, right, className }: PanelHeaderProps) {
  return (
    <div className={cn("mb-4 flex items-start justify-between gap-3", className)}>
      <div className="flex items-start gap-3">
        {icon ? (
          <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-xl border border-border bg-surface-2/70 text-primary">
            {icon}
          </span>
        ) : null}
        <div>
          <h3 className="text-sm font-semibold tracking-tight text-foreground">{title}</h3>
          {subtitle ? <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p> : null}
        </div>
      </div>
      {right}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  right,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  right?: ReactNode;
}) {
  return (
    <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
      <div>
        {eyebrow ? (
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.22em] text-primary">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
          {title}
        </h1>
        {description ? (
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {right}
    </header>
  );
}
