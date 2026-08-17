import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Building2, TrafficCone, Users } from "lucide-react";

import { PageHeader, Panel, PanelHeader } from "@/components/lifeos/Panel";
import { Meter } from "@/components/lifeos/RiskGauge";
import { DemoNotice } from "@/components/lifeos/SourceBadge";
import { StatTile } from "@/components/lifeos/StatTile";
import { Badge } from "@/components/ui/badge";
import { DEMO_CITY } from "@/lib/lifeos/demo-data";

export const Route = createFileRoute("/_authenticated/city")({
  head: () => ({
    meta: [
      { title: "City Intelligence — LIFEOS" },
      {
        name: "description",
        content:
          "Aggregated, anonymised city signals: congestion hotspots, crowd density, environmental anomalies, infrastructure issues and predicted problem zones.",
      },
      { property: "og:title", content: "LIFEOS City Intelligence" },
      {
        property: "og:description",
        content: "Anonymised aggregate signals that make individual predictions sharper.",
      },
    ],
  }),
  component: CityPage,
});

function CityPage() {
  return (
    <div>
      <PageHeader
        eyebrow="City intelligence"
        title="Aggregate signals, no personal data"
        description="Individual behaviour never leaves your device model. This layer works only on anonymised aggregates — and it is what lets LIFEOS predict problems before they reach you."
        right={
          <Badge variant="outline" className="border-success/40 text-success">
            anonymised aggregate
          </Badge>
        }
      />

      <div className="mb-4">
        <DemoNotice>
          All city figures on this page are simulated aggregates for demonstration.
        </DemoNotice>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          label="Active hotspots"
          value={DEMO_CITY.hotspots.length}
          icon={<TrafficCone className="size-4" />}
          hint="Above 7-day baseline"
        />
        <StatTile
          label="Crowd zones tracked"
          value={DEMO_CITY.crowd.length}
          icon={<Users className="size-4" />}
          hint="Density estimates only"
        />
        <StatTile
          label="Anomalies detected"
          value={DEMO_CITY.anomalies.length}
          icon={<AlertTriangle className="size-4" />}
          hint="Environmental signals"
        />
        <StatTile
          label="Infrastructure reports"
          value={DEMO_CITY.infrastructure.reduce((sum, i) => sum + i.count, 0)}
          icon={<Building2 className="size-4" />}
          hint="Aggregated citizen reports"
        />
      </div>

      <div className="scene-3d mt-4 grid gap-4 lg:grid-cols-2">
        <Panel>
          <PanelHeader title="Congestion hotspots" subtitle="Relative to the 7-day mean" />
          <div className="space-y-4">
            {DEMO_CITY.hotspots.map((hotspot) => (
              <Meter
                key={hotspot.name}
                label={hotspot.name}
                value={hotspot.level / 100}
                hint={hotspot.note}
                tone={
                  hotspot.level > 80 ? "destructive" : hotspot.level > 60 ? "warning" : "primary"
                }
              />
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelHeader title="Crowd density" subtitle="Estimated occupancy by zone" />
          <div className="grid gap-3 sm:grid-cols-2">
            {DEMO_CITY.crowd.map((zone) => (
              <div key={zone.zone} className="rounded-xl border border-border bg-surface-2/50 p-3">
                <p className="text-sm">{zone.zone}</p>
                <p className="mt-1 text-xl font-semibold">{zone.density}%</p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-[width] duration-700"
                    style={{ width: `${zone.density}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelHeader title="Environmental anomalies" subtitle="Deviation from local norms" />
          <ul className="space-y-2">
            {DEMO_CITY.anomalies.map((anomaly) => (
              <li
                key={anomaly.label}
                className="rounded-xl border border-warning/25 bg-warning/8 p-3"
              >
                <p className="text-sm font-medium">{anomaly.label}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{anomaly.detail}</p>
              </li>
            ))}
          </ul>
        </Panel>

        <Panel>
          <PanelHeader title="Predicted problem zones" subtitle="Forward-looking, not observed" />
          <ul className="space-y-2">
            {DEMO_CITY.predictedZones.map((zone) => (
              <li
                key={zone.name}
                className="flex items-center justify-between rounded-xl border border-border bg-surface-2/50 px-3 py-2 text-sm"
              >
                <span>{zone.name}</span>
                <span className="text-right">
                  <Badge
                    variant="outline"
                    className={
                      zone.risk === "High"
                        ? "border-destructive/45 text-destructive"
                        : "border-warning/45 text-warning"
                    }
                  >
                    {zone.risk}
                  </Badge>
                  <span className="mt-1 block font-mono text-[11px] text-muted-foreground">
                    {zone.window}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>

      <Panel className="mt-4">
        <PanelHeader title="Infrastructure issues" subtitle="Aggregated citizen reports" />
        <div className="grid gap-3 sm:grid-cols-3">
          {DEMO_CITY.infrastructure.map((item) => (
            <div key={item.label} className="rounded-xl border border-border bg-surface-2/50 p-3">
              <p className="text-2xl font-semibold">{item.count}</p>
              <p className="text-sm">{item.label}</p>
              <p className="text-[11px] text-muted-foreground">{item.area}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
