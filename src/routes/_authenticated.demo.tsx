import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Pause, Play, RotateCcw } from "lucide-react";

import { CoreOrb } from "@/components/lifeos/CoreOrb";
import { PageHeader, Panel, PanelHeader } from "@/components/lifeos/Panel";
import { DemoNotice } from "@/components/lifeos/SourceBadge";
import { Button } from "@/components/ui/button";
import { DEMO_SIMULATION } from "@/lib/lifeos/demo-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/demo")({
  head: () => ({
    meta: [
      { title: "Investor Demo — LIFEOS Live Simulation" },
      {
        name: "description",
        content:
          "Watch a full LIFEOS reasoning cycle: context shifts, agents analyse, risk crosses threshold, and a one-tap action is delivered.",
      },
      { property: "og:title", content: "LIFEOS Investor Demo" },
      {
        property: "og:description",
        content: "A scripted end-to-end run of the prediction and action loop.",
      },
    ],
  }),
  component: DemoPage,
});

function DemoPage() {
  const [step, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!playing) return;
    timer.current = setInterval(() => {
      setStep((prev) => {
        if (prev >= DEMO_SIMULATION.length) {
          setPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1400);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [playing]);

  const done = step >= DEMO_SIMULATION.length;

  return (
    <div>
      <PageHeader
        eyebrow="Investor demo"
        title="One full reasoning cycle"
        description="Press play to run a scripted scenario end to end — from a change in the environment to a confirmed action in your hands."
      />

      <div className="mb-4">
        <DemoNotice>This is a scripted simulation, not live data.</DemoNotice>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_1.3fr]">
        <Panel glow>
          <CoreOrb
            size={220}
            label="LIFEOS"
            status={done ? "Action ready" : playing ? "Reasoning" : "Standby"}
          />
          <div className="mt-5 flex justify-center gap-2">
            <Button onClick={() => setPlaying((p) => !p)} disabled={done}>
              {playing ? <Pause className="mr-1.5 size-4" /> : <Play className="mr-1.5 size-4" />}
              {playing ? "Pause" : "Play"}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setPlaying(false);
                setStep(0);
              }}
            >
              <RotateCcw className="mr-1.5 size-4" /> Reset
            </Button>
          </div>
          <p className="mt-4 text-center font-mono text-[11px] text-muted-foreground">
            step {Math.min(step, DEMO_SIMULATION.length)} / {DEMO_SIMULATION.length}
          </p>
        </Panel>

        <Panel tilt={false}>
          <PanelHeader
            title="Reasoning timeline"
            subtitle="Each entry names the actor responsible"
          />
          <ol className="relative space-y-3 pl-5">
            <span className="absolute left-1.5 top-1 h-[calc(100%-0.5rem)] w-px bg-border" />
            {DEMO_SIMULATION.map((entry, i) => {
              const active = i < step;
              return (
                <li
                  key={entry.title}
                  className={cn(
                    "relative rounded-xl border p-3 transition-all duration-500",
                    active
                      ? "border-primary/35 bg-primary/8 opacity-100"
                      : "border-border bg-surface-2/40 opacity-45",
                  )}
                >
                  <span
                    className={cn(
                      "absolute -left-[1.05rem] top-4 size-2 rounded-full",
                      active ? "bg-primary" : "bg-border",
                    )}
                  />
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
                    {entry.actor}
                  </p>
                  <p className="mt-1 text-sm font-medium">{entry.title}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{entry.detail}</p>
                </li>
              );
            })}
          </ol>

          {done ? (
            <div className="mt-4 rounded-2xl border border-success/35 bg-success/8 p-4">
              <p className="text-sm font-medium">Outcome: problem avoided</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Late arrival prevented with 47 minutes of lead time and one tap from the user.
              </p>
            </div>
          ) : null}
        </Panel>
      </div>
    </div>
  );
}
