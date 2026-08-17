import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Activity, BatteryLow, CalendarClock, CloudRain, Loader2, Lock, MapPin, Sparkles, Wallet } from "lucide-react";
import { toast } from "sonner";

import { CoreOrb } from "@/components/lifeos/CoreOrb";
import { PageHeader, Panel, PanelHeader } from "@/components/lifeos/Panel";
import { Meter } from "@/components/lifeos/RiskGauge";
import { DemoNotice } from "@/components/lifeos/SourceBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { DEMO_CONTEXT, DEMO_SCHEDULE } from "@/lib/lifeos/demo-data";
import { aiService } from "@/lib/lifeos/services/ai-service";
import type { SimulationStep } from "@/lib/lifeos/types";

export const Route = createFileRoute("/_authenticated/twin")({
  head: () => ({
    meta: [
      { title: "My Digital Twin — LIFEOS" },
      {
        name: "description",
        content:
          "A structured, inspectable model of your behaviour, preferences, schedule and current context — with a timeline and interactive context graph.",
      },
      { property: "og:title", content: "My LIFEOS Digital Twin" },
      {
        property: "og:description",
        content: "Behaviour, preferences, schedule and live context in one editable profile.",
      },
    ],
  }),
  component: TwinPage,
});

const BEHAVIOR = [
  { label: "Typical wake time", value: "7:10 AM", confidence: 0.84 },
  { label: "Typical departure", value: "8:05 AM", confidence: 0.86 },
  { label: "Peak study window", value: "8:00–10:00 PM", confidence: 0.78 },
  { label: "Travel pattern", value: "Metro + 1.2 km walk", confidence: 0.72 },
];

const CONTEXT_NODES = [
  { id: "you", label: "You", icon: MapPin, ring: 0 },
  { id: "schedule", label: "Schedule", icon: CalendarClock, ring: 1 },
  { id: "travel", label: "Travel", icon: Activity, ring: 1 },
  { id: "weather", label: "Weather", icon: CloudRain, ring: 1 },
  { id: "device", label: "Device", icon: BatteryLow, ring: 2 },
  { id: "money", label: "Spending", icon: Wallet, ring: 2 },
];

function TwinPage() {
  const { user } = useAuth();
  const [simHorizon, setSimHorizon] = useState<number>(30);
  const [simulating, setSimulating] = useState<boolean>(false);
  const [simulationSteps, setSimulationSteps] = useState<SimulationStep[] | null>(null);

  const { data: prefs, isLoading } = useQuery({
    queryKey: ["preferences", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("preferences")
        .select("budget_level, preferred_transport, preferred_environment")
        .eq("user_id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  async function handleRunSimulation() {
    setSimulating(true);
    try {
      const steps = await aiService.runSimulation(simHorizon);
      setSimulationSteps(steps);
      toast.success("AI Simulation Generated", {
        description: `Google Gemini predicted ${steps.length} context transitions for a ${simHorizon}-minute horizon.`,
      });
    } catch {
      toast.error("Simulation Failed", { description: "Could not generate AI context simulation." });
    } finally {
      setSimulating(false);
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="My digital twin"
        title="Your structured state"
        description="This is everything LIFEOS models about you. Nothing here is shared, and sensitive fields stay hidden until you grant explicit permission."
        right={
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={simulating}
              onClick={() => void handleRunSimulation()}
            >
              {simulating ? (
                <Loader2 className="mr-1.5 size-3.5 animate-spin" />
              ) : (
                <Sparkles className="mr-1.5 size-3.5 text-primary" />
              )}
              {simulating ? "Simulating..." : `Simulate ${simHorizon}m Horizon`}
            </Button>
            <Badge variant="outline" className="border-success/40 text-success">
              <Lock className="mr-1.5 size-3" /> Private to you
            </Badge>
          </div>
        }
      />

      <div className="mb-4">
        <DemoNotice>
          Behaviour patterns below are simulated baselines; your saved preferences and Gemini context predictions are live.
        </DemoNotice>
      </div>

      {simulationSteps ? (
        <Panel className="border-primary/40 bg-primary/5">
          <PanelHeader
            title={`Gemini AI Context Forecast (${simHorizon}-Minute Horizon)`}
            subtitle="Simulated context progression computed by Google Gemini 2.5 Flash"
          />
          <div className="grid gap-3 sm:grid-cols-3">
            {simulationSteps.map((step, idx) => (
              <div key={idx} className="rounded-xl border border-primary/20 bg-surface/80 p-3">
                <Badge variant="outline" className="mb-2 text-[10px] text-primary">
                  {step.actor}
                </Badge>
                <p className="text-sm font-semibold">{step.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{step.detail}</p>
              </div>
            ))}
          </div>
        </Panel>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-[1fr_1.2fr]">
        <Panel>
          <PanelHeader title="Twin core" subtitle="Model freshness and coverage" />
          <CoreOrb size={200} label="DIGITAL TWIN" status="Synced" />
          <div className="mt-5 space-y-3">
            <Meter label="Behaviour coverage" value={0.78} tone="primary" />
            <Meter label="Schedule coverage" value={0.64} tone="warning" />
            <Meter label="Context freshness" value={0.91} tone="success" />
          </div>
        </Panel>

        <div className="grid gap-4">
          <Panel>
            <PanelHeader title="Behaviour" subtitle="Learned from observed patterns" />
            <ul className="grid gap-2 sm:grid-cols-2">
              {BEHAVIOR.map((item) => (
                <li
                  key={item.label}
                  className="rounded-xl border border-border bg-surface-2/50 p-3"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm font-medium">{item.value}</p>
                  <p className="mt-1 text-[11px] text-primary">
                    confidence {Math.round(item.confidence * 100)}%
                  </p>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel>
            <PanelHeader
              title="Preferences"
              subtitle="Saved during onboarding — editable in Settings"
            />
            {isLoading ? (
              <div className="grid gap-2 sm:grid-cols-3">
                {[0, 1, 2].map((i) => (
                  <Skeleton key={i} className="h-16 rounded-xl" />
                ))}
              </div>
            ) : (
              <div className="grid gap-2 sm:grid-cols-3">
                <Field label="Budget" value={prefs?.budget_level ?? "not set"} />
                <Field label="Transport" value={prefs?.preferred_transport ?? "not set"} />
                <Field label="Environment" value={prefs?.preferred_environment ?? "not set"} />
              </div>
            )}
          </Panel>
        </div>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Panel>
          <PanelHeader title="Context graph" subtitle="Signals currently feeding your twin" />
          <div className="scene-3d relative grid h-72 place-items-center">
            <div className="layer-3d relative size-full" style={{ transform: "rotateX(14deg)" }}>
              {CONTEXT_NODES.map((node, i) => {
                const Icon = node.icon;
                if (node.ring === 0) {
                  return (
                    <div
                      key={node.id}
                      className="glass absolute left-1/2 top-1/2 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full"
                      style={{ boxShadow: "0 0 40px -12px var(--primary)" }}
                    >
                      <Icon className="size-5 text-primary" aria-hidden />
                    </div>
                  );
                }
                const total = CONTEXT_NODES.length - 1;
                const angle = ((i - 1) / total) * Math.PI * 2;
                const radius = node.ring === 1 ? 32 : 43;
                return (
                  <div
                    key={node.id}
                    className="glass absolute w-24 -translate-x-1/2 -translate-y-1/2 rounded-xl p-2 text-center transition-transform duration-500 hover:scale-105"
                    style={{
                      left: `${50 + Math.cos(angle) * radius}%`,
                      top: `${50 + Math.sin(angle) * radius}%`,
                      transform: `translate(-50%, -50%) translateZ(${node.ring === 1 ? 24 : 10}px)`,
                    }}
                  >
                    <Icon className="mx-auto size-4 text-primary" aria-hidden />
                    <p className="mt-1 text-[11px]">{node.label}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </Panel>

        <Panel>
          <PanelHeader title="Today's timeline" subtitle={`Context at ${DEMO_CONTEXT.time}`} />
          <ol className="relative space-y-4 pl-5">
            <span className="absolute left-1.5 top-1 h-[calc(100%-0.5rem)] w-px bg-border" />
            {DEMO_SCHEDULE.map((item) => (
              <li key={item.title} className="relative">
                <span className="absolute -left-[0.85rem] top-1.5 size-2 rounded-full bg-primary" />
                <p className="font-mono text-[11px] text-primary">{item.time}</p>
                <p className="text-sm">{item.title}</p>
                <p className="text-[11px] text-muted-foreground">{item.place}</p>
              </li>
            ))}
          </ol>
        </Panel>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface-2/50 p-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm capitalize">{value.replace("_", " ")}</p>
    </div>
  );
}
