import { Database, Sparkles, Waves } from "lucide-react";

import { cn } from "@/lib/utils";
import type { DataSource } from "@/lib/lifeos/types";

const MAP: Record<DataSource, { label: string; className: string; icon: typeof Database }> = {
  real: {
    label: "REAL DATA",
    className: "border-success/40 text-success bg-success/10",
    icon: Database,
  },
  simulated: {
    label: "SIMULATED DATA",
    className: "border-warning/40 text-warning bg-warning/10",
    icon: Waves,
  },
  prediction: {
    label: "AI PREDICTION",
    className: "border-primary/40 text-primary bg-primary/10",
    icon: Sparkles,
  },
};

export function SourceBadge({ source, className }: { source: DataSource; className?: string }) {
  const config = MAP[source];
  const Icon = config.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.14em]",
        config.className,
        className,
      )}
    >
      <Icon className="size-3" aria-hidden />
      {config.label}
    </span>
  );
}

export function DemoNotice({ children }: { children?: React.ReactNode }) {
  return (
    <p className="rounded-xl border border-warning/25 bg-warning/8 px-3 py-2 text-xs text-muted-foreground">
      <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-warning">
        Demo data ·
      </span>{" "}
      {children ??
        "Values are simulated for demonstration and are not real sensor readings or validated forecasts."}
    </p>
  );
}
