import { cn } from "@/lib/utils";

function toneFor(value: number) {
  if (value >= 0.75) return { stroke: "var(--destructive)", label: "High risk" };
  if (value >= 0.5) return { stroke: "var(--warning)", label: "Elevated risk" };
  if (value >= 0.25) return { stroke: "var(--primary)", label: "Moderate risk" };
  return { stroke: "var(--success)", label: "Low risk" };
}

export function RiskGauge({
  value,
  size = 132,
  caption,
  className,
}: {
  value: number;
  size?: number;
  caption?: string;
  className?: string;
}) {
  const tone = toneFor(value);
  const radius = size / 2 - 10;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.min(Math.max(value, 0), 1));

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="var(--border)"
            strokeWidth={8}
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={tone.stroke}
            strokeWidth={8}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 900ms cubic-bezier(0.22,1,0.36,1)" }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <div className="text-center">
            <p className="text-2xl font-semibold tracking-tight">{Math.round(value * 100)}%</p>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              {tone.label}
            </p>
          </div>
        </div>
      </div>
      {caption ? <p className="mt-2 text-xs text-muted-foreground">{caption}</p> : null}
    </div>
  );
}

export function Meter({
  value,
  label,
  hint,
  tone = "primary",
}: {
  value: number;
  label: string;
  hint?: string;
  tone?: "primary" | "success" | "warning" | "destructive";
}) {
  const bar = {
    primary: "bg-primary",
    success: "bg-success",
    warning: "bg-warning",
    destructive: "bg-destructive",
  }[tone];

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono text-foreground">{Math.round(value * 100)}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className={cn("h-full rounded-full transition-[width] duration-700", bar)}
          style={{ width: `${Math.min(Math.max(value, 0), 1) * 100}%` }}
        />
      </div>
      {hint ? <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p> : null}
    </div>
  );
}
