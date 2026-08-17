import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

import { AgentConstellation } from "@/components/lifeos/AgentConstellation";
import { Logo } from "@/components/lifeos/Logo";
import { Panel, PageHeader, PanelHeader } from "@/components/lifeos/Panel";
import { PipelineFlow } from "@/components/lifeos/PipelineFlow";
import { Button } from "@/components/ui/button";
import { DEMO_AGENTS } from "@/lib/lifeos/demo-data";

export const Route = createFileRoute("/technology")({
  head: () => ({
    meta: [
      { title: "About the Technology — LIFEOS Architecture & Research" },
      {
        name: "description",
        content:
          "How LIFEOS works: context-aware computing, multi-agent AI, predictive analytics, digital twins and privacy-preserving intelligence, with a full system architecture overview.",
      },
      { property: "og:title", content: "LIFEOS Technology & Research" },
      {
        property: "og:description",
        content:
          "Context-aware computing, multi-agent reasoning, digital twins and privacy-preserving prediction — the research foundation behind LIFEOS.",
      },
    ],
  }),
  component: TechnologyPage,
});

const RESEARCH = [
  {
    area: "Context-aware computing",
    body: "Fusing schedule, location, device and environment signals into a single machine-readable situation model.",
  },
  {
    area: "Multi-agent AI",
    body: "Specialised analysers each own one domain; a reasoning layer arbitrates between their conclusions.",
  },
  {
    area: "Predictive analytics",
    body: "Probability, severity and confidence estimation for near-term friction events, scored against real outcomes.",
  },
  {
    area: "Digital twins",
    body: "A persistent behavioural model of one person: routines, preferences, commitments and current state.",
  },
  {
    area: "Human–AI interaction",
    body: "Recommendations that always expose their signals and reasoning, with confirmation before consequential actions.",
  },
  {
    area: "Privacy-preserving intelligence",
    body: "Opt-in permissions, local relevance, aggregate-only city signals, and user-controlled memory deletion.",
  },
  {
    area: "Real-time event processing",
    body: "Streaming context changes re-evaluate open predictions instead of running a fixed daily batch.",
  },
];

const ARCHITECTURE = `┌──────────────────────────────────────────────────────────────┐
│  CLIENT  React + TypeScript + Tailwind (command center UI)    │
└───────────────┬──────────────────────────────────────────────┘
                │ typed server functions
┌───────────────▼──────────────────────────────────────────────┐
│  APPLICATION LAYER                                           │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐  │
│  │ AI service   │  │ Map service  │  │ Signal ingestion   │  │
│  │ abstraction  │  │ abstraction  │  │ (traffic/weather)  │  │
│  └──────┬───────┘  └──────┬───────┘  └─────────┬──────────┘  │
│         └─────────────────┴────────────────────┘             │
│                    ┌──────▼──────┐                           │
│                    │  AGENTS     │ travel · schedule ·       │
│                    │  LAYER      │ environment · finance ·   │
│                    └──────┬──────┘ safety                    │
│                    ┌──────▼──────┐                           │
│                    │ REASONING   │ fusion · scoring ·        │
│                    │ ENGINE      │ explanation               │
│                    └──────┬──────┘                           │
└───────────────────────────┼──────────────────────────────────┘
                ┌───────────▼────────────┐
                │  DATA LAYER (Postgres) │ row-level security
                │  twin · predictions ·  │ per-user isolation
                │  memories · actions    │
                └────────────────────────┘`;

function TechnologyPage() {
  return (
    <div className="relative min-h-screen">
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-30" aria-hidden />
      <header className="relative mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo />
        <Button variant="ghost" size="sm" asChild>
          <Link to="/">
            <ArrowLeft className="mr-1.5 size-4" /> Overview
          </Link>
        </Button>
      </header>

      <main className="relative mx-auto w-full max-w-6xl px-4 pb-20 pt-6 sm:px-6">
        <PageHeader
          eyebrow="About the technology"
          title="A proactive architecture for everyday friction"
          description="LIFEOS is a research prototype exploring whether an assistant can detect and prevent
            everyday problems instead of waiting to be asked."
        />

        <div className="grid gap-4 lg:grid-cols-2">
          <Panel>
            <PanelHeader title="The problem" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              Existing digital assistants are mostly reactive: they respond to explicit commands.
              The user has to already know that a problem exists, and to know which question to ask.
              Most everyday friction — leaving too late, colliding deadlines, a dead battery, an
              avoidable expense — is predictable from context well before it becomes a problem.
            </p>
          </Panel>
          <Panel>
            <PanelHeader title="The LIFEOS approach" />
            <p className="text-sm leading-relaxed text-muted-foreground">
              LIFEOS combines a persistent digital twin, historical behaviour patterns, live
              external signals and specialised agents. A reasoning layer merges agent conclusions
              into a single ranked prediction with an explicit probability, severity, confidence and
              a recommended action the user can accept, alter or reject.
            </p>
          </Panel>
        </div>

        <section className="mt-10">
          <h2 className="mb-4 text-lg font-semibold tracking-tight">Processing pipeline</h2>
          <PipelineFlow activeIndex={6} />
        </section>

        <section className="mt-12">
          <h2 className="mb-4 text-lg font-semibold tracking-tight">Agent topology</h2>
          <Panel tilt={false}>
            <AgentConstellation
              agents={DEMO_AGENTS}
              activeIds={["travel", "schedule", "environment"]}
            />
          </Panel>
        </section>

        <section className="mt-12">
          <h2 className="mb-4 text-lg font-semibold tracking-tight">System architecture</h2>
          <Panel tilt={false}>
            <pre className="overflow-x-auto font-mono text-[10px] leading-relaxed text-muted-foreground sm:text-xs">
              {ARCHITECTURE}
            </pre>
          </Panel>
        </section>

        <section className="mt-12">
          <h2 className="mb-4 text-lg font-semibold tracking-tight">Research areas</h2>
          <div className="scene-3d grid gap-3 sm:grid-cols-2">
            {RESEARCH.map((item) => (
              <div key={item.area} className="glass tilt-3d-soft rounded-2xl p-4">
                <h3 className="text-sm font-semibold tracking-tight">{item.area}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <Panel>
            <PanelHeader title="Current limitations" subtitle="Stated explicitly for evaluation" />
            <ul className="space-y-2 text-sm text-muted-foreground">
              {[
                "External sensors and third-party APIs are not connected; signals are simulated.",
                "Predictions come from rule-based heuristics over demo data, not a trained model.",
                "Accuracy figures describe the simulation, not validated field performance.",
                "No medical, financial or safety claims are made or implied.",
              ].map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-warning" />
                  {item}
                </li>
              ))}
            </ul>
          </Panel>
        </section>
      </main>
    </div>
  );
}
