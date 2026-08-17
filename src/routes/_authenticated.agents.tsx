import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

import { AgentConstellation } from "@/components/lifeos/AgentConstellation";
import { PageHeader, Panel, PanelHeader } from "@/components/lifeos/Panel";
import { DemoNotice } from "@/components/lifeos/SourceBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { aiService } from "@/lib/lifeos/services/ai-service";

export const Route = createFileRoute("/_authenticated/agents")({
  head: () => ({
    meta: [
      { title: "Multi-Agent AI System — LIFEOS" },
      {
        name: "description",
        content:
          "Travel, Schedule, Environment, Finance and Safety agents feed the LIFEOS reasoning engine, which fuses their reports into one recommendation.",
      },
      { property: "og:title", content: "LIFEOS Multi-Agent Architecture" },
      {
        property: "og:description",
        content: "Five specialised agents connected to a central reasoning engine.",
      },
    ],
  }),
  component: AgentsPage,
});

function AgentsPage() {
  const [active, setActive] = useState<string[]>(["travel", "schedule", "environment"]);
  const { data, isLoading } = useQuery({
    queryKey: ["agents"],
    queryFn: () => aiService.listAgents(),
  });
  const agents = data ?? [];

  return (
    <div>
      <PageHeader
        eyebrow="Multi-agent AI system"
        title="Specialised agents, one decision"
        description="Each agent owns a single domain and reports independently. The reasoning engine resolves conflicts and produces the final recommendation."
      />

      <div className="mb-4">
        <DemoNotice>Agent activity shown here replays a simulated analysis cycle.</DemoNotice>
      </div>

      <Panel tilt={false}>
        {isLoading ? (
          <Skeleton className="mx-auto aspect-square w-full max-w-2xl rounded-3xl" />
        ) : (
          <AgentConstellation agents={agents} activeIds={active} />
        )}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {agents.map((agent) => (
            <Button
              key={agent.id}
              size="sm"
              variant={active.includes(agent.id) ? "default" : "outline"}
              onClick={() =>
                setActive((prev) =>
                  prev.includes(agent.id)
                    ? prev.filter((id) => id !== agent.id)
                    : [...prev, agent.id],
                )
              }
            >
              {agent.name}
            </Button>
          ))}
        </div>
      </Panel>

      <div className="scene-3d mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {isLoading
          ? [0, 1, 2, 3, 4].map((i) => <Skeleton key={i} className="h-48 rounded-2xl" />)
          : agents.map((agent) => (
              <Panel key={agent.id}>
                <PanelHeader
                  title={agent.name}
                  subtitle={agent.role}
                  right={
                    <Badge
                      variant="outline"
                      className={
                        active.includes(agent.id)
                          ? "border-primary/45 text-primary"
                          : "border-border text-muted-foreground"
                      }
                    >
                      {active.includes(agent.id) ? "analysing" : agent.status}
                    </Badge>
                  }
                />
                <ul className="flex flex-wrap gap-1.5">
                  {agent.analyzes.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border bg-surface-2/50 px-2.5 py-1 text-[11px] text-muted-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 font-mono text-[11px] text-muted-foreground">
                  last cycle · {agent.latencyMs} ms
                </p>
              </Panel>
            ))}
      </div>

      <Panel className="mt-6">
        <PanelHeader
          title="LIFEOS Reasoning Engine"
          subtitle="How agent reports become a single recommendation"
        />
        <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { t: "Collect", d: "Each agent returns a scored report with its own confidence." },
            { t: "Weigh", d: "Reports are weighted by domain relevance and signal freshness." },
            { t: "Resolve", d: "Conflicting recommendations are ranked by expected benefit." },
            { t: "Explain", d: "The winning decision is published with its signals and reasons." },
          ].map((stage, i) => (
            <li key={stage.t} className="rounded-xl border border-border bg-surface-2/50 p-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
                0{i + 1} · {stage.t}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{stage.d}</p>
            </li>
          ))}
        </ol>
      </Panel>
    </div>
  );
}
