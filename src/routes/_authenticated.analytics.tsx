import { createFileRoute } from "@tanstack/react-router";

import { PageHeader, Panel, PanelHeader } from "@/components/lifeos/Panel";
import { Meter } from "@/components/lifeos/RiskGauge";
import { DemoNotice } from "@/components/lifeos/SourceBadge";
import { StatTile } from "@/components/lifeos/StatTile";
import { DEMO_ANALYTICS } from "@/lib/lifeos/demo-data";

export const Route = createFileRoute("/_authenticated/analytics")({
  head: () => ({
    meta: [
      { title: "Personal Intelligence Analytics — LIFEOS" },
      {
        name: "description",
        content:
          "Problems prevented, minutes and money saved, prediction accuracy trends and where your daily friction actually comes from.",
      },
      { property: "og:title", content: "LIFEOS Analytics" },
      {
        property: "og:description",
        content: "Measured impact: time saved, money saved, accuracy over time.",
      },
    ],
  }),
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const a = DEMO_ANALYTICS;
  const maxSaved = Math.max(...a.weekly.map((w) => w.saved));

  return (
    <div>
      <PageHeader
        eyebrow="Analytics"
        title="Impact you can measure"
        description="Prediction is only valuable if it changes outcomes. These are the aggregate results of acting on LIFEOS recommendations."
      />

      <div className="mb-4">
        <DemoNotice>All analytics figures are simulated for demonstration.</DemoNotice>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          label="Problems prevented"
          value={a.problemsPrevented}
          hint="Acted-on predictions"
        />
        <StatTile
          label="Time saved"
          value={a.minutesSaved}
          unit="min"
          hint="Estimated cumulative"
        />
        <StatTile label="Money saved" value={`₹${a.moneySaved}`} hint="Avoided surge & penalties" />
        <StatTile
          label="Predictions made"
          value={a.predictionsMade}
          hint={`${Math.round(a.accuracy * 100)}% accurate`}
        />
      </div>

      <div className="scene-3d mt-4 grid gap-4 lg:grid-cols-2">
        <Panel>
          <PanelHeader title="Accuracy trend" subtitle="Last six weeks" />
          <div className="flex h-52 items-end gap-3">
            {a.weekly.map((week) => (
              <div key={week.week} className="flex flex-1 flex-col items-center gap-2">
                <span className="font-mono text-[10px] text-primary">{week.accuracy}%</span>
                <div className="flex h-full w-full items-end gap-1">
                  <div
                    className="flex-1 rounded-t bg-primary/70 transition-[height] duration-700"
                    style={{ height: `${week.accuracy}%` }}
                    title={`Accuracy ${week.accuracy}%`}
                  />
                  <div
                    className="flex-1 rounded-t bg-success/60 transition-[height] duration-700"
                    style={{ height: `${(week.saved / maxSaved) * 100}%` }}
                    title={`${week.saved} min saved`}
                  />
                </div>
                <span className="font-mono text-[10px] text-muted-foreground">{week.week}</span>
              </div>
            ))}
          </div>
          <p className="mt-3 text-[11px] text-muted-foreground">
            Cyan = accuracy · green = minutes saved
          </p>
        </Panel>

        <Panel>
          <PanelHeader title="Friction sources" subtitle="Where your problems originate" />
          <div className="space-y-4">
            {a.frictionSources.map((source) => (
              <Meter
                key={source.name}
                label={source.name}
                value={source.value / 100}
                tone={source.value > 35 ? "destructive" : source.value > 20 ? "warning" : "primary"}
              />
            ))}
          </div>
        </Panel>

        <Panel>
          <PanelHeader
            title="Confidence calibration"
            subtitle="How well confidence matches reality"
          />
          <Meter label="Average confidence" value={a.averageConfidence} tone="primary" />
          <div className="mt-4">
            <Meter label="Realised accuracy" value={a.accuracy} tone="success" />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Accuracy slightly above average confidence means LIFEOS is currently conservative — a
            safer failure mode than over-confidence.
          </p>
        </Panel>

        <Panel>
          <PanelHeader title="Predictions per week" subtitle="Volume across the last six weeks" />
          <ul className="space-y-2 text-sm">
            {a.weekly.map((week) => (
              <li
                key={week.week}
                className="flex items-center justify-between rounded-xl border border-border bg-surface-2/50 px-3 py-2"
              >
                <span className="font-mono text-xs text-muted-foreground">{week.week}</span>
                <span>{week.predictions} predictions</span>
                <span className="font-mono text-xs text-success">{week.saved} min saved</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}
