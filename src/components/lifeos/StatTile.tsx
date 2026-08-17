import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

export function StatTile({
  label,
  value,
  unit,
  hint,
  icon,
  className,
}: {
  label: string;
  value: string | number;
  unit?: string;
  hint?: string;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("glass tilt-3d-soft group relative rounded-2xl p-4", className)}>
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </p>
        {icon ? (
          <span className="text-primary/80 transition-colors group-hover:text-primary">{icon}</span>
        ) : null}
      </div>
      <p className="mt-2 text-2xl font-semibold tracking-tight">
        {value}
        {unit ? (
          <span className="ml-1 text-sm font-normal text-muted-foreground">{unit}</span>
        ) : null}
      </p>
      {hint ? <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p> : null}
    </div>
  );
}
