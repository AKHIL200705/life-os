import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import {
  BatteryLow,
  CalendarClock,
  CheckCircle2,
  CloudRain,
  Clock,
  MapPin,
  Navigation,
  Signal,
  TrafficCone,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";

import { CoreOrb } from "@/components/lifeos/CoreOrb";
import { PageHeader, Panel, PanelHeader } from "@/components/lifeos/Panel";
import { PredictionCard } from "@/components/lifeos/PredictionCard";
import { RiskGauge } from "@/components/lifeos/RiskGauge";
import { SourceBadge, DemoNotice } from "@/components/lifeos/SourceBadge";
import { StatTile } from "@/components/lifeos/StatTile";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { DEMO_CONTEXT, DEMO_PREDICTIONS, DEMO_SCHEDULE, DEMO_TASKS } from "@/lib/lifeos/demo-data";
import type { Prediction } from "@/lib/lifeos/types";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "LIFEOS Command Center — Today's Risk & Actions" },
      {
        name: "description",
        content:
          "Your live context, current risk level, today's predicted problems and the single best recommended action, all in one command center.",
      },
      { property: "og:title", content: "LIFEOS Command Center" },
      {
        property: "og:description",
        content:
          "Current context, AI status, predicted problems and recommended actions at a glance.",
      },
    ],
  }),
  component: CommandCenter,
});

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function CommandCenter() {
  const { user } = useAuth();
  const [dismissed, setDismissed] = useState<string[]>([]);

  const name =
    (user?.user_metadata?.["display_name"] as string | undefined) ??
    (user?.user_metadata?.["full_name"] as string | undefined) ??
    user?.email?.split("@")[0] ??
    "there";

  const predictions = useMemo(
    () => DEMO_PREDICTIONS.filter((p) => !dismissed.includes(p.id)),
    [dismissed],
  );

  const top = predictions[0];
  const riskLevel = predictions.length ? Math.max(...predictions.map((p) => p.probability)) : 0;

  function handleAct(prediction: Prediction) {
    toast.success("Action queued for confirmation", {
      description: `${prediction.recommendedAction} — confirm it in the Action Center.`,
    });
  }

  function handleDismiss(prediction: Prediction) {
    setDismissed((prev) => [...prev, prediction.id]);
    toast("Prediction dismissed", { description: "LIFEOS will use this as feedback." });
  }

  function handleSnooze(prediction: Prediction) {
    toast("Snoozed for 30 minutes", { description: prediction.problem });
  }

  return (
    <div>
      <PageHeader
        eyebrow="LIFEOS Command Center"
        title={`${greeting()}, ${name}.`}
        description="Here is what LIFEOS believes is forming around you right now, and the one action that changes the outcome."
        right={<SourceBadge source="simulated" />}
      />

      <div className="mb-4">
        <DemoNotice />
      </div>

      {/* Top row */}
      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <Panel glow>
          <PanelHeader
            title="Current situation"
            subtitle={`${DEMO_CONTEXT.time} · ${DEMO_CONTEXT.locationStatus}`}
            icon={<MapPin className="size-4" />}
            right={
              <Badge variant="outline" className="border-success/40 text-success">
                AI status: active
              </Badge>
            }
          />
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            <ContextTile
              icon={<CloudRain className="size-4" />}
              label="Weather"
              value={`${DEMO_CONTEXT.weather} · ${DEMO_CONTEXT.temperatureC}°C`}
            />
            <ContextTile
              icon={<TrafficCone className="size-4" />}
              label="Traffic"
              value={`${DEMO_CONTEXT.trafficLevel} · ${DEMO_CONTEXT.travelTimeMin} min`}
              tone="bad"
            />
            <ContextTile
              icon={<CalendarClock className="size-4" />}
              label="Next event"
              value={`${DEMO_CONTEXT.nextEvent.title} · ${DEMO_CONTEXT.nextEvent.at}`}
            />
            <ContextTile
              icon={<BatteryLow className="size-4" />}
              label="Battery"
              value={`${DEMO_CONTEXT.battery}%`}
              tone="warn"
            />
            <ContextTile
              icon={<Signal className="size-4" />}
              label="Connectivity"
              value={DEMO_CONTEXT.connectivity}
              tone="good"
            />
            <ContextTile
              icon={<Clock className="size-4" />}
              label="Baseline travel"
              value={`${DEMO_CONTEXT.baselineTravelMin} min`}
            />
          </div>
        </Panel>

        <Panel>
          <PanelHeader title="Risk level" subtitle="Highest open prediction" />
          <div className="flex flex-col items-center gap-4">
            <RiskGauge value={riskLevel} caption={top ? top.problem : "No open predictions"} />
            <CoreOrb size={140} label="LIFEOS" status="Reasoning" />
          </div>
        </Panel>
      </div>

      {/* Primary recommendation */}
      {top ? (
        <Panel className="mt-4" glow>
          <PanelHeader
            title="Primary recommendation"
            subtitle="Produced by the reasoning engine from 3 agent reports"
            icon={<Navigation className="size-4" />}
            right={<SourceBadge source="prediction" />}
          />
          <div className="grid gap-5 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <p className="text-lg font-semibold tracking-tight">{top.recommendedAction}</p>
              <p className="mt-1.5 text-sm text-muted-foreground">{top.situation}</p>
              <div className="mt-4 grid gap-2 sm:grid-cols-3">
                <MiniStat label="Predicted arrival" value="8:48 AM" />
                <MiniStat label="Confidence" value={`${Math.round(top.confidence * 100)}%`} />
                <MiniStat label="Time saved" value="17 min" />
              </div>
              <p className="mt-4 text-xs text-muted-foreground">{top.expectedBenefit}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button asChild size="sm">
                  <Link to="/actions">Open Action Center</Link>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <Link to="/predictions">All predictions</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-surface-2/50 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
                Alternatives
              </p>
              <ul className="mt-2 space-y-2 text-xs text-muted-foreground">
                {top.alternatives.map((alt) => (
                  <li key={alt} className="flex gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    {alt}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Panel>
      ) : null}

      {/* Predictions */}
      <section className="mt-8">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">Today's predicted problems</h2>
          <Button asChild variant="ghost" size="sm">
            <Link to="/predictions">View all</Link>
          </Button>
        </div>
        {predictions.length ? (
          <div className="scene-3d grid gap-4 lg:grid-cols-2">
            {predictions.slice(0, 2).map((prediction) => (
              <PredictionCard
                key={prediction.id}
                prediction={prediction}
                onAct={handleAct}
                onDismiss={handleDismiss}
                onSnooze={handleSnooze}
              />
            ))}
          </div>
        ) : (
          <Panel>
            <div className="flex flex-col items-center py-8 text-center">
              <CheckCircle2 className="size-8 text-success" aria-hidden />
              <p className="mt-3 text-sm font-medium">No open predictions</p>
              <p className="mt-1 text-xs text-muted-foreground">
                LIFEOS is monitoring your context and will alert you when friction forms.
              </p>
            </div>
          </Panel>
        )}
      </section>

      {/* Bottom grid */}
      <div className="mt-8 grid gap-4 lg:grid-cols-3">
        <Panel>
          <PanelHeader title="Today's schedule" icon={<CalendarClock className="size-4" />} />
          <ul className="space-y-2.5">
            {DEMO_SCHEDULE.map((item) => (
              <li key={item.title} className="flex items-start gap-3">
                <span className="w-16 shrink-0 font-mono text-[11px] text-primary">
                  {item.time}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm">{item.title}</p>
                  <p className="truncate text-[11px] text-muted-foreground">{item.place}</p>
                </div>
                {item.kind === "suggested" ? (
                  <Badge variant="outline" className="ml-auto border-primary/40 text-primary">
                    AI
                  </Badge>
                ) : null}
              </li>
            ))}
          </ul>
        </Panel>

        <Panel>
          <PanelHeader title="Tasks" subtitle="Ranked by deadline pressure" />
          <ul className="space-y-2.5">
            {DEMO_TASKS.map((task) => (
              <li key={task.id} className="flex items-center gap-3">
                <span
                  className={
                    task.done
                      ? "size-2 rounded-full bg-success"
                      : task.priority === "high"
                        ? "size-2 rounded-full bg-destructive"
                        : "size-2 rounded-full bg-warning"
                  }
                />
                <p className={task.done ? "text-sm text-muted-foreground line-through" : "text-sm"}>
                  {task.title}
                </p>
                <span className="ml-auto font-mono text-[11px] text-muted-foreground">
                  {task.due}
                </span>
              </li>
            ))}
          </ul>
        </Panel>

        <div className="grid gap-3">
          <StatTile
            label="Travel status"
            value="Route B"
            unit="advised"
            hint="11 min faster in rain"
            icon={<Navigation className="size-4" />}
          />
          <StatTile
            label="Environment"
            value="Rain"
            unit="moderate"
            hint="Peaks 8:20–8:40 AM"
            icon={<CloudRain className="size-4" />}
          />
          <StatTile
            label="Spend today"
            value="₹180"
            hint="78% of weekly transport budget used"
            icon={<Wallet className="size-4" />}
          />
        </div>
      </div>

      <Panel className="mt-4">
        <PanelHeader title="Personal insights" subtitle="Derived from your patterns" />
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            "You leave 9 minutes later than optimal on rainy days.",
            "Your best study retention is between 8:00 and 10:00 PM.",
            "Cab spend rises 2.4× in weeks with more than 3 rain days.",
          ].map((insight) => (
            <p
              key={insight}
              className="rounded-xl border border-border bg-surface-2/50 p-3 text-xs leading-relaxed text-muted-foreground"
            >
              {insight}
            </p>
          ))}
        </div>
      </Panel>
    </div>
  );
}

function ContextTile({
  icon,
  label,
  value,
  tone = "neutral",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone?: "neutral" | "good" | "warn" | "bad";
}) {
  const toneClass =
    tone === "bad"
      ? "text-destructive"
      : tone === "warn"
        ? "text-warning"
        : tone === "good"
          ? "text-success"
          : "text-foreground";
  return (
    <div className="rounded-xl border border-border bg-surface-2/50 p-3 transition-transform duration-300 hover:-translate-y-0.5">
      <div className="flex items-center gap-2 text-muted-foreground">
        <span className="text-primary">{icon}</span>
        <p className="font-mono text-[10px] uppercase tracking-[0.16em]">{label}</p>
      </div>
      <p className={`mt-1.5 text-sm font-medium capitalize ${toneClass}`}>{value}</p>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface-2/50 px-3 py-2">
      <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
      <p className="mt-0.5 font-mono text-sm">{value}</p>
    </div>
  );
}
