import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { HoloMap } from "@/components/lifeos/HoloMap";
import { PageHeader, Panel, PanelHeader } from "@/components/lifeos/Panel";
import { DemoNotice } from "@/components/lifeos/SourceBadge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { mapService } from "@/lib/lifeos/services/map-service";
import type { MapMarker } from "@/lib/lifeos/types";

export const Route = createFileRoute("/_authenticated/map")({
  head: () => ({
    meta: [
      { title: "Environment Map — LIFEOS" },
      {
        name: "description",
        content:
          "A holographic environment plane showing traffic, weather cells, risk zones, charging points and quiet study spots around you.",
      },
      { property: "og:title", content: "LIFEOS Environment Map" },
      {
        property: "og:description",
        content: "Simulated spatial intelligence layered over a normalised map grid.",
      },
    ],
  }),
  component: MapPage,
});

const LAYERS: { id: MapMarker["kind"]; label: string }[] = [
  { id: "traffic", label: "Traffic" },
  { id: "weather", label: "Weather" },
  { id: "risk", label: "Risk zones" },
  { id: "charging", label: "Charging" },
  { id: "study", label: "Study spots" },
  { id: "place", label: "Useful places" },
];

function MapPage() {
  const [enabled, setEnabled] = useState<MapMarker["kind"][]>([
    "traffic",
    "weather",
    "risk",
    "charging",
    "study",
    "place",
  ]);

  const { data, isLoading } = useQuery({
    queryKey: ["map-markers"],
    queryFn: () => mapService.listMarkers(),
  });

  const markers = (data ?? []).filter((m) => m.kind === "user" || enabled.includes(m.kind));

  return (
    <div>
      <PageHeader
        eyebrow="Environment map"
        title="What is happening around you"
        description="Spatial signals are what turn a calendar into a prediction. Toggle layers to see which signals drive the current risk picture."
      />

      <div className="mb-4">
        <DemoNotice>
          Marker positions are simulated on a normalised grid. The map service is abstracted, so a
          live provider can be connected without changing this screen.
        </DemoNotice>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {LAYERS.map((layer) => (
          <Button
            key={layer.id}
            size="sm"
            variant={enabled.includes(layer.id) ? "default" : "outline"}
            onClick={() =>
              setEnabled((prev) =>
                prev.includes(layer.id)
                  ? prev.filter((id) => id !== layer.id)
                  : [...prev, layer.id],
              )
            }
          >
            {layer.label}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <Skeleton className="h-[420px] rounded-3xl" />
      ) : (
        <HoloMap markers={markers} height={460} />
      )}

      <div className="scene-3d mt-6 grid gap-4 md:grid-cols-3">
        <Panel>
          <PanelHeader title="Route comparison" subtitle="Under current rain and congestion" />
          <ul className="space-y-2 text-sm">
            {[
              { name: "Route A · main road", time: "43 min", note: "Flood-prone underpass" },
              { name: "Route B · metro + walk", time: "32 min", note: "Recommended" },
              { name: "Route C · ring road", time: "39 min", note: "Longer but steady" },
            ].map((route) => (
              <li
                key={route.name}
                className="flex items-center justify-between rounded-xl border border-border bg-surface-2/50 px-3 py-2"
              >
                <span>{route.name}</span>
                <span className="text-right">
                  <span className="block font-mono text-xs text-primary">{route.time}</span>
                  <span className="text-[11px] text-muted-foreground">{route.note}</span>
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel>
          <PanelHeader title="Nearby resources" subtitle="Ranked by your preferences" />
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Library charging point · 4 of 6 sockets free</li>
            <li>Quiet study zone · 32 dB · 18 seats</li>
            <li>Campus canteen · low crowd until 12:30 PM</li>
            <li>Covered metro entrance · 240 m from Route B</li>
          </ul>
        </Panel>

        <Panel>
          <PanelHeader title="Risk zones" subtitle="Predicted, not observed" />
          <ul className="space-y-2 text-sm">
            <li className="rounded-xl border border-destructive/30 bg-destructive/8 px-3 py-2">
              Flood-prone underpass · avoid 8:20–8:40 AM
            </li>
            <li className="rounded-xl border border-warning/30 bg-warning/8 px-3 py-2">
              JNTU junction · congestion 54% above average
            </li>
            <li className="rounded-xl border border-border bg-surface-2/50 px-3 py-2">
              KPHB metro exit · high pedestrian density
            </li>
          </ul>
        </Panel>
      </div>
    </div>
  );
}
