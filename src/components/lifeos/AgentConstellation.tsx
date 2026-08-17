import { cn } from "@/lib/utils";
import type { AgentDef } from "@/lib/lifeos/types";

const ACCENT: Record<AgentDef["accent"], string> = {
  cyan: "var(--primary)",
  emerald: "var(--success)",
  amber: "var(--warning)",
  violet: "var(--chart-4)",
  rose: "var(--destructive)",
};

/**
 * 3D agent constellation: agents positioned around a central reasoning engine with
 * animated signal flow along SVG connectors.
 */
export function AgentConstellation({
  agents,
  activeIds = [],
  className,
}: {
  agents: AgentDef[];
  activeIds?: string[];
  className?: string;
}) {
  const radius = 38;

  return (
    <div className={cn("scene-3d relative mx-auto w-full max-w-2xl", className)}>
      <div className="layer-3d relative aspect-square" style={{ transform: "rotateX(16deg)" }}>
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden>
          {agents.map((agent, i) => {
            const angle = (i / agents.length) * Math.PI * 2 - Math.PI / 2;
            const x = 50 + Math.cos(angle) * radius;
            const y = 50 + Math.sin(angle) * radius;
            const active = activeIds.includes(agent.id);
            return (
              <line
                key={agent.id}
                x1={x}
                y1={y}
                x2={50}
                y2={50}
                stroke={active ? ACCENT[agent.accent] : "var(--border)"}
                strokeWidth={active ? 0.7 : 0.4}
                strokeDasharray="3 5"
                style={
                  active
                    ? { animation: "flow 1.4s linear infinite", opacity: 0.95 }
                    : { opacity: 0.5 }
                }
              />
            );
          })}
          <circle
            cx={50}
            cy={50}
            r={13}
            fill="none"
            stroke="var(--primary)"
            strokeWidth={0.4}
            opacity={0.5}
          />
        </svg>

        <div className="absolute left-1/2 top-1/2 w-40 -translate-x-1/2 -translate-y-1/2 text-center">
          <div
            className="glass mx-auto grid size-28 place-items-center rounded-full"
            style={{ boxShadow: "0 0 60px -14px oklch(0.79 0.145 202 / 0.7)" }}
          >
            <div>
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-primary">
                LIFEOS
              </p>
              <p className="text-xs font-semibold leading-tight">Reasoning Engine</p>
            </div>
          </div>
        </div>

        {agents.map((agent, i) => {
          const angle = (i / agents.length) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + Math.cos(angle) * radius;
          const y = 50 + Math.sin(angle) * radius;
          const active = activeIds.includes(agent.id);
          return (
            <div
              key={agent.id}
              className="absolute w-28 -translate-x-1/2 -translate-y-1/2 sm:w-32"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <div
                className={cn(
                  "glass rounded-xl px-2.5 py-2 text-center transition-all duration-500",
                  active && "scale-[1.06]",
                )}
                style={{
                  borderColor: active ? ACCENT[agent.accent] : undefined,
                  transform: active ? "translateZ(30px)" : "translateZ(0)",
                  boxShadow: active ? `0 0 34px -10px ${ACCENT[agent.accent]}` : undefined,
                }}
              >
                <span
                  className="mx-auto mb-1 block size-2 rounded-full"
                  style={{ background: ACCENT[agent.accent] }}
                />
                <p className="text-[11px] font-semibold leading-tight sm:text-xs">{agent.name}</p>
                <p className="mt-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                  {active ? "analysing" : agent.status}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
