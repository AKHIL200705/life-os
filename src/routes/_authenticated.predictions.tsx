import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Inbox, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { PageHeader, Panel } from "@/components/lifeos/Panel";
import { PredictionCard } from "@/components/lifeos/PredictionCard";
import { DemoNotice, SourceBadge } from "@/components/lifeos/SourceBadge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { aiService } from "@/lib/lifeos/services/ai-service";
import type { Prediction } from "@/lib/lifeos/types";

export const Route = createFileRoute("/_authenticated/predictions")({
  head: () => ({
    meta: [
      { title: "Friction Predictions — LIFEOS" },
      {
        name: "description",
        content:
          "Every predicted problem with its probability, severity, time-to-event, reasons, recommended action, expected benefit and confidence score.",
      },
      { property: "og:title", content: "LIFEOS Friction Prediction Engine" },
      {
        property: "og:description",
        content:
          "Probability, severity, reasoning and recommended action for each predicted problem.",
      },
    ],
  }),
  component: PredictionsPage,
});

const FILTERS = ["all", "travel", "schedule", "environment", "finance", "safety"] as const;

function PredictionsPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all");
  const [dismissed, setDismissed] = useState<string[]>([]);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["predictions"],
    queryFn: () => aiService.listPredictions(),
  });

  const predictions = (data ?? []).filter(
    (p) => !dismissed.includes(p.id) && (filter === "all" || p.category === filter),
  );

  function act(prediction: Prediction) {
    toast.success("Sent to Action Center", { description: prediction.recommendedAction });
  }

  return (
    <div>
      <PageHeader
        eyebrow="Friction prediction engine"
        title="Predicted problems"
        description="Each card is a near-term friction event LIFEOS believes is forming, with the signals and reasoning that produced it."
        right={<SourceBadge source="prediction" />}
      />

      <div className="mb-4">
        <DemoNotice>
          Predictions are generated from rule-based heuristics over simulated signals. They are not
          validated forecasts.
        </DemoNotice>
      </div>

      <div className="mb-5 flex flex-wrap gap-2">
        {FILTERS.map((option) => (
          <Button
            key={option}
            size="sm"
            variant={filter === option ? "default" : "outline"}
            onClick={() => setFilter(option)}
            className="capitalize"
          >
            {option}
          </Button>
        ))}
      </div>

      {isLoading ? (
        <div className="grid gap-4 lg:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-72 rounded-2xl" />
          ))}
        </div>
      ) : isError ? (
        <Panel>
          <div className="flex flex-col items-center py-10 text-center">
            <p className="text-sm font-medium">Prediction service unavailable</p>
            <p className="mt-1 text-xs text-muted-foreground">
              LIFEOS could not reach the prediction service.
            </p>
            <Button size="sm" className="mt-4" onClick={() => void refetch()}>
              <Loader2 className="mr-2 size-3.5" /> Retry
            </Button>
          </div>
        </Panel>
      ) : predictions.length === 0 ? (
        <Panel>
          <div className="flex flex-col items-center py-12 text-center">
            <Inbox className="size-8 text-muted-foreground" aria-hidden />
            <p className="mt-3 text-sm font-medium">Nothing predicted in this category</p>
            <p className="mt-1 max-w-sm text-xs text-muted-foreground">
              LIFEOS keeps monitoring your context and will surface a prediction here as soon as
              risk crosses the alert threshold.
            </p>
            {filter !== "all" ? (
              <Button size="sm" variant="outline" className="mt-4" onClick={() => setFilter("all")}>
                Show all categories
              </Button>
            ) : null}
          </div>
        </Panel>
      ) : (
        <div className="scene-3d grid gap-4 lg:grid-cols-2">
          {predictions.map((prediction) => (
            <PredictionCard
              key={prediction.id}
              prediction={prediction}
              onAct={act}
              onDismiss={(p) => {
                setDismissed((prev) => [...prev, p.id]);
                toast("Dismissed — recorded as feedback");
              }}
              onSnooze={() => toast("Snoozed for 30 minutes")}
            />
          ))}
        </div>
      )}
    </div>
  );
}
