import { useState } from "react";
import {
  BatteryCharging,
  BookOpen,
  CloudRain,
  MapPin,
  ShieldAlert,
  Store,
  TrafficCone,
} from "lucide-react";

import { cn } from "@/lib/utils";
import type { MapMarker } from "@/lib/lifeos/types";

const KIND: Record<MapMarker["kind"], { icon: typeof MapPin; color: string; label: string }> = {
  user: { icon: MapPin, color: "var(--primary)", label: "You" },
  traffic: { icon: TrafficCone, color: "var(--warning)", label: "Traffic" },
  weather: { icon: CloudRain, color: "var(--info)", label: "Weather" },
  risk: { icon: ShieldAlert, color: "var(--destructive)", label: "Risk zone" },
  charging: { icon: BatteryCharging, color: "var(--success)", label: "Charging" },
  study: { icon: BookOpen, color: "var(--chart-4)", label: "Study spot" },
  place: { icon: Store, color: "var(--muted-foreground)", label: "Useful place" },
};

/**
 * Simulated 3D environment plane. Uses a normalised 0-100 coordinate space so a
 * real map provider can replace it behind the same marker contract.
 */
export function HoloMap({
  markers,
  className,
  height = 420,
}: {
  markers: MapMarker[];
  className?: string;
  height?: number;
}) {
  const [selected, setSelected] = useState<MapMarker | null>(null);

  return (
    <div className={cn("scene-3d relative", className)}>
      <div className="glass relative overflow-hidden rounded-3xl" style={{ height }}>
        <div
          className="layer-3d absolute inset-0"
          style={{ transform: "rotateX(46deg) scale(1.22) translateY(6%)" }}
        >
          <div className="grid-bg absolute inset-[-30%] opacity-70" />
          <div
            className="absolute inset-[-30%]"
            style={{
              background:
                "radial-gradient(40% 40% at 50% 45%, oklch(0.79 0.145 202 / 0.16), transparent 70%)",
            }}
          />
        </div>

        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 h-24"
          style={{
            background:
              "linear-gradient(to bottom, transparent, oklch(0.79 0.145 202 / 0.14), transparent)",
            animation: "scan 7s ease-in-out infinite",
          }}
        />

        {markers.map((marker) => {
          const config = KIND[marker.kind];
          const Icon = config.icon;
          const isActive = selected?.id === marker.id;
          return (
            <button
              key={marker.id}
              type="button"
              onClick={() => setSelected(isActive ? null : marker)}
              className="group absolute -translate-x-1/2 -translate-y-1/2 focus:outline-none"
              style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
              aria-label={`${config.label}: ${marker.label}`}
            >
              <span
                className={cn(
                  "grid size-9 place-items-center rounded-xl border bg-surface-2/80 backdrop-blur transition-all duration-300 group-hover:-translate-y-1.5",
                  isActive && "-translate-y-1.5",
                )}
                style={{
                  borderColor: config.color,
                  boxShadow: `0 8px 24px -10px ${config.color}`,
                }}
              >
                <Icon className="size-4" style={{ color: config.color }} aria-hidden />
              </span>
              {marker.kind === "user" ? (
                <span
                  className="absolute left-1/2 top-1/2 -z-10 size-9 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/50"
                  style={{ animation: "pulse-ring 2.4s ease-out infinite" }}
                />
              ) : null}
              <span className="mt-1 block whitespace-nowrap text-[10px] text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                {marker.label}
              </span>
            </button>
          );
        })}

        <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
          {Object.entries(KIND).map(([key, config]) => (
            <span
              key={key}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-surface/70 px-2 py-0.5 text-[10px] text-muted-foreground backdrop-blur"
            >
              <span className="size-1.5 rounded-full" style={{ background: config.color }} />
              {config.label}
            </span>
          ))}
        </div>

        {selected ? (
          <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-primary/30 bg-surface/85 p-3 backdrop-blur sm:max-w-xs">
            <p className="text-sm font-semibold">{selected.label}</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{selected.detail}</p>
          </div>
        ) : (
          <p className="absolute inset-x-4 bottom-4 text-[11px] text-muted-foreground">
            Select a marker for detail. Positions are simulated on a normalised grid — connect a map
            provider to render live geography.
          </p>
        )}
      </div>
    </div>
  );
}
