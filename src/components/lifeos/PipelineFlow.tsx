import { cn } from "@/lib/utils";

const STAGES = [
  { id: "input", label: "Input", detail: "User goals & permissions" },
  { id: "signals", label: "Real-world signals", detail: "Traffic · weather · calendar · device" },
  { id: "agents", label: "AI agents", detail: "5 specialised analysers" },
  { id: "reasoning", label: "Reasoning engine", detail: "Signal fusion & scoring" },
  { id: "prediction", label: "Prediction", detail: "Probability · severity · confidence" },
  { id: "action", label: "Action", detail: "Confirmed, reversible steps" },
  { id: "outcome", label: "Outcome", detail: "Measured & learned from" },
];

export function PipelineFlow({
  activeIndex = -1,
  className,
}: {
  activeIndex?: number;
  className?: string;
}) {
  return (
    <div className={cn("scene-3d", className)}>
      <ol className="layer-3d grid gap-3 md:grid-cols-7">
        {STAGES.map((stage, i) => {
          const active = activeIndex >= i;
          return (
            <li key={stage.id} className="relative">
              <div
                className={cn(
                  "glass depth-pop h-full rounded-2xl p-3 transition-colors duration-500",
                  active ? "border-primary/45" : "opacity-80",
                )}
                style={{
                  transform: `translateZ(${active ? 24 : 0}px)`,
                  transition: "transform 600ms cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
                  0{i + 1}
                </p>
                <p className="mt-1 text-sm font-semibold leading-tight">{stage.label}</p>
                <p className="mt-1 text-[11px] leading-snug text-muted-foreground">
                  {stage.detail}
                </p>
              </div>
              {i < STAGES.length - 1 ? (
                <span
                  aria-hidden
                  className={cn(
                    "absolute -right-2 top-1/2 hidden h-px w-4 md:block",
                    active ? "bg-primary" : "bg-border",
                  )}
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
