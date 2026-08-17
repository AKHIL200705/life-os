import { cn } from "@/lib/utils";

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="scene-3d relative grid size-8 place-items-center">
        <span
          className="absolute inset-0 rounded-[10px] border border-primary/50"
          style={{
            transform: "rotateX(52deg) rotateZ(45deg)",
            boxShadow: "0 0 18px -4px var(--primary)",
          }}
        />
        <span
          className="absolute inset-1.5 rounded-[7px] border border-success/50"
          style={{ transform: "rotateX(52deg) rotateZ(45deg)" }}
        />
        <span className="size-1.5 rounded-full bg-primary" />
      </span>
      {!compact ? (
        <span className="text-sm font-semibold tracking-[0.16em]">
          LIFE<span className="text-primary">OS</span>
        </span>
      ) : null}
    </span>
  );
}
