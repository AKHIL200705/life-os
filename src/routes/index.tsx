import { Link, createFileRoute } from "@tanstack/react-router";
import {
  ArrowRight,
  Bot,
  Brain,
  Building2,
  Gauge,
  Map as MapIcon,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

import { CoreOrb } from "@/components/lifeos/CoreOrb";
import { Logo } from "@/components/lifeos/Logo";
import { Panel, PanelHeader } from "@/components/lifeos/Panel";
import { PipelineFlow } from "@/components/lifeos/PipelineFlow";
import { SourceBadge } from "@/components/lifeos/SourceBadge";
import { StatTile } from "@/components/lifeos/StatTile";
import { Button } from "@/components/ui/button";
import { DEMO_ANALYTICS } from "@/lib/lifeos/demo-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LIFEOS — Predict Everyday Friction Before It Happens" },
      {
        name: "description",
        content:
          "LIFEOS is a proactive life intelligence platform: it reads your permitted context, predicts problems like late arrivals or deadline clashes, explains why, and recommends the best action.",
      },
      { property: "og:title", content: "LIFEOS — Real-World Friction Prediction Platform" },
      {
        property: "og:description",
        content:
          "Understand → Predict → Reason → Recommend → Act → Learn. A futuristic AI operating system for everyday life.",
      },
    ],
  }),
  component: Landing,
});

const FEATURES = [
  {
    icon: Gauge,
    title: "Command Center",
    body: "One screen for current context, live risk level, today's predicted problems and the single best next action.",
  },
  {
    icon: Sparkles,
    title: "Friction Prediction Engine",
    body: "Probability, severity, time-to-event, reasons, expected benefit and confidence for every predicted problem.",
  },
  {
    icon: Bot,
    title: "Multi-agent reasoning",
    body: "Travel, Schedule, Environment, Finance and Safety agents feed a central reasoning engine that produces one decision.",
  },
  {
    icon: Brain,
    title: "Digital twin & memory",
    body: "A structured model of your behaviour, preferences, schedule and context — inspectable, correctable, deletable.",
  },
  {
    icon: MapIcon,
    title: "Environment map",
    body: "Traffic, weather, risk zones, charging points and study spots on a provider-agnostic spatial layer.",
  },
  {
    icon: Building2,
    title: "City intelligence",
    body: "Anonymised aggregate signals surface congestion hotspots and predicted problem zones — never individual people.",
  },
];

function Landing() {
  return (
    <div className="relative overflow-hidden">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" aria-hidden />

      <header className="relative mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <nav className="flex items-center gap-1.5">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/technology">Technology</Link>
          </Button>
          <Button size="sm" asChild>
            <Link to="/auth">Enter LIFEOS</Link>
          </Button>
        </nav>
      </header>

      <main className="relative mx-auto w-full max-w-7xl px-4 pb-24 sm:px-6">
        {/* Hero */}
        <section className="grid items-center gap-10 py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-20">
          <div className="animate-rise">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/8 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
              Proactive life intelligence
            </p>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              <span className="text-gradient">Predict everyday problems</span>
              <br />
              before they happen.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
              Today's assistants wait to be asked. LIFEOS reads your permitted context — schedule,
              routine, traffic, weather, device state — detects the friction forming ahead of you,
              explains the reasoning, and recommends the action that prevents it.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button size="lg" asChild>
                <Link to="/auth">
                  Launch the command center
                  <ArrowRight className="ml-1.5 size-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/technology">How it works</Link>
              </Button>
            </div>

            <p className="mt-6 max-w-lg text-xs leading-relaxed text-muted-foreground">
              Prototype build. Predictions shown in the product are generated from simulated demo
              signals and are clearly labelled — they are not validated forecasts or medical,
              financial or safety advice.
            </p>
          </div>

          <div className="relative">
            <CoreOrb size={330} status="Monitoring" />
            <Panel className="mt-6" glow>
              <PanelHeader
                title="Live example"
                subtitle="Student · 8:05 AM"
                icon={<Zap className="size-4" />}
                right={<SourceBadge source="prediction" />}
              />
              <p className="text-sm">
                <span className="font-semibold text-destructive">82% risk</span> of arriving late to
                your 9:00 AM class.
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Traffic is 54% above your weekday average and rain has started. Travel time moved
                from 28 to 43 minutes.
              </p>
              <div className="mt-3 rounded-xl border border-primary/25 bg-primary/8 p-3 text-sm">
                Leave now via Route B — expected arrival 8:48 AM.
              </div>
            </Panel>
          </div>
        </section>

        {/* Pipeline */}
        <section className="py-10">
          <h2 className="mb-2 text-xl font-semibold tracking-tight sm:text-2xl">
            One loop, end to end
          </h2>
          <p className="mb-6 max-w-2xl text-sm text-muted-foreground">
            Understand → Predict → Reason → Recommend → Act → Learn. Every stage is visible in the
            product, so a recommendation is never a black box.
          </p>
          <PipelineFlow activeIndex={6} />
        </section>

        {/* Features */}
        <section className="scene-3d py-14">
          <h2 className="mb-6 text-xl font-semibold tracking-tight sm:text-2xl">
            Built as an operating system, not a chatbot
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="glass tilt-3d rounded-2xl p-5">
                  <span className="grid size-10 place-items-center rounded-xl border border-border bg-surface-2/70 text-primary">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-4 text-sm font-semibold tracking-tight">{feature.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    {feature.body}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Metrics */}
        <section className="py-8">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">Prototype results</h2>
            <SourceBadge source="simulated" />
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <StatTile
              label="Problems prevented"
              value={DEMO_ANALYTICS.problemsPrevented}
              hint="6-week simulation"
            />
            <StatTile
              label="Time saved"
              value={DEMO_ANALYTICS.minutesSaved}
              unit="min"
              hint="Across 214 predictions"
            />
            <StatTile
              label="Prediction accuracy"
              value={`${Math.round(DEMO_ANALYTICS.accuracy * 100)}%`}
              hint="Self-reported outcomes"
            />
            <StatTile
              label="Avg. confidence"
              value={`${Math.round(DEMO_ANALYTICS.averageConfidence * 100)}%`}
              hint="Calibration target: 80%"
            />
          </div>
        </section>

        {/* Privacy */}
        <section className="py-10">
          <Panel className="flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl border border-success/30 bg-success/10 text-success">
                <ShieldCheck className="size-5" aria-hidden />
              </span>
              <div>
                <h2 className="text-base font-semibold tracking-tight">Privacy-first by default</h2>
                <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                  Every permission starts off. You can see exactly what LIFEOS has learned, correct
                  it, and delete it. City intelligence uses simulated, anonymised aggregates only —
                  never another person's location or identity.
                </p>
              </div>
            </div>
            <Button variant="outline" asChild>
              <Link to="/auth">Review privacy controls</Link>
            </Button>
          </Panel>
        </section>
      </main>

      <footer className="relative border-t border-border py-8">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-4 sm:px-6">
          <Logo />
          <p className="text-xs text-muted-foreground">
            LIFEOS research prototype · simulated data clearly labelled throughout.
          </p>
        </div>
      </footer>
    </div>
  );
}
