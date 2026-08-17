import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { CheckCircle2, ThumbsDown, ThumbsUp, XCircle } from "lucide-react";
import { toast } from "sonner";

import { PageHeader, Panel, PanelHeader } from "@/components/lifeos/Panel";
import { Meter } from "@/components/lifeos/RiskGauge";
import { DemoNotice } from "@/components/lifeos/SourceBadge";
import { StatTile } from "@/components/lifeos/StatTile";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DEMO_HISTORY } from "@/lib/lifeos/demo-data";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/history")({
  head: () => ({
    meta: [
      { title: "Prediction History & Accuracy — LIFEOS" },
      {
        name: "description",
        content:
          "Every past prediction with what actually happened, whether it was right, and the feedback that trains the next cycle.",
      },
      { property: "og:title", content: "LIFEOS Prediction History" },
      {
        property: "og:description",
        content: "Accuracy tracking and outcome logs — predictions held accountable.",
      },
    ],
  }),
  component: HistoryPage,
});

const FILTERS = ["all", "correct", "incorrect"] as const;

function HistoryPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");
  const [voted, setVoted] = useState<Record<string, "up" | "down">>({});

  const rows = useMemo(
    () =>
      DEMO_HISTORY.filter((item) =>
        filter === "all" ? true : filter === "correct" ? item.correct : !item.correct,
      ),
    [filter],
  );

  const accuracy = DEMO_HISTORY.filter((item) => item.correct).length / DEMO_HISTORY.length;

  return (
    <div>
      <PageHeader
        eyebrow="Prediction history"
        title="Held accountable, every time"
        description="A prediction system that never reports its misses cannot be trusted. Each entry records the predicted probability, the real outcome and your feedback."
      />

      <div className="mb-4">
        <DemoNotice>History entries replay a simulated evaluation log.</DemoNotice>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatTile
          label="Logged predictions"
          value={DEMO_HISTORY.length}
          hint="Evaluated against outcomes"
        />
        <StatTile
          label="Accuracy"
          value={`${Math.round(accuracy * 100)}%`}
          hint="Correct / total"
        />
        <StatTile
          label="Feedback received"
          value={Object.keys(voted).length}
          hint="Trains the next cycle"
        />
        <StatTile label="Avg lead time" value="47" unit="min" hint="Warning before impact" />
      </div>

      <div className="mb-4 mt-4 flex flex-wrap gap-2">
        {FILTERS.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => setFilter(option)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs capitalize transition-colors",
              filter === option
                ? "border-primary bg-primary/12 text-primary"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {rows.map((item) => (
          <Panel key={item.id} tilt={false}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="mb-1.5 flex items-center gap-2">
                  {item.correct ? (
                    <CheckCircle2 className="size-4 text-success" aria-hidden />
                  ) : (
                    <XCircle className="size-4 text-destructive" aria-hidden />
                  )}
                  <Badge
                    variant="outline"
                    className={
                      item.correct
                        ? "border-success/45 text-success"
                        : "border-destructive/45 text-destructive"
                    }
                  >
                    {item.correct ? "correct" : "missed"}
                  </Badge>
                  <span className="font-mono text-[11px] text-muted-foreground">{item.date}</span>
                </div>
                <p className="text-sm font-medium">{item.problem}</p>
                <p className="mt-1 text-xs text-muted-foreground">Outcome: {item.actualOutcome}</p>
                {item.feedback ? (
                  <p className="mt-1 text-xs text-primary">Your feedback: {item.feedback}</p>
                ) : null}
              </div>

              <div className="w-full max-w-[13rem] shrink-0">
                <Meter
                  label="Predicted probability"
                  value={item.predictedProbability}
                  tone={item.correct ? "success" : "destructive"}
                />
                <div className="mt-3 flex gap-2">
                  <Button
                    size="sm"
                    variant={voted[item.id] === "up" ? "default" : "outline"}
                    onClick={() => {
                      setVoted((prev) => ({ ...prev, [item.id]: "up" }));
                      toast.success("Marked as useful");
                    }}
                  >
                    <ThumbsUp className="size-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    variant={voted[item.id] === "down" ? "default" : "outline"}
                    onClick={() => {
                      setVoted((prev) => ({ ...prev, [item.id]: "down" }));
                      toast("Marked as wrong — confidence lowered");
                    }}
                  >
                    <ThumbsDown className="size-3.5" />
                  </Button>
                </div>
              </div>
            </div>
          </Panel>
        ))}
      </div>

      <Panel className="mt-6">
        <PanelHeader
          title="How feedback improves accuracy"
          subtitle="Outcomes and votes both feed the learning loop"
        />
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { t: "Outcome check", d: "Each prediction is scored against what actually happened." },
            {
              t: "Calibration",
              d: "Over-confident categories get their probabilities pulled down.",
            },
            { t: "Personalisation", d: "Your votes reweight which friction types matter to you." },
          ].map((item) => (
            <div key={item.t} className="rounded-xl border border-border bg-surface-2/50 p-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
                {item.t}
              </p>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{item.d}</p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
