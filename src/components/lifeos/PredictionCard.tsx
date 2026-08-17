import { useState } from "react";
import { AlertTriangle, ChevronRight, Clock, HelpCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Meter } from "@/components/lifeos/RiskGauge";
import { SourceBadge } from "@/components/lifeos/SourceBadge";
import { cn } from "@/lib/utils";
import type { Prediction } from "@/lib/lifeos/types";

const SEVERITY_STYLES: Record<Prediction["severity"], string> = {
  low: "border-success/40 text-success",
  medium: "border-warning/40 text-warning",
  high: "border-destructive/45 text-destructive",
  critical: "border-destructive text-destructive",
};

function formatCountdown(minutes: number) {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ${minutes % 60}m`;
  return `${Math.floor(hours / 24)}d ${hours % 24}h`;
}

export function PredictionCard({
  prediction,
  onAct,
  onDismiss,
  onSnooze,
  compact = false,
}: {
  prediction: Prediction;
  onAct?: (prediction: Prediction) => void;
  onDismiss?: (prediction: Prediction) => void;
  onSnooze?: (prediction: Prediction) => void;
  compact?: boolean;
}) {
  const [whyOpen, setWhyOpen] = useState(false);

  return (
    <article className="glass tilt-3d-soft relative flex h-full flex-col rounded-2xl p-5">
      <div className="hairline pointer-events-none absolute inset-x-6 top-0 h-px" />

      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline" className={cn("uppercase", SEVERITY_STYLES[prediction.severity])}>
          {prediction.severity}
        </Badge>
        <SourceBadge source={prediction.source} />
        <span className="ml-auto inline-flex items-center gap-1 font-mono text-[11px] text-muted-foreground">
          <Clock className="size-3" aria-hidden />
          {formatCountdown(prediction.minutesUntil)}
        </span>
      </div>

      <h3 className="mt-3 text-base font-semibold leading-snug tracking-tight">
        {prediction.problem}
      </h3>

      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <Meter
          label="Probability"
          value={prediction.probability}
          tone={prediction.probability >= 0.7 ? "destructive" : "warning"}
        />
        <Meter label="Confidence" value={prediction.confidence} tone="primary" />
      </div>

      {!compact ? (
        <ul className="mt-4 space-y-1.5">
          {prediction.reasons.slice(0, 3).map((reason) => (
            <li key={reason} className="flex gap-2 text-xs text-muted-foreground">
              <ChevronRight className="mt-0.5 size-3 shrink-0 text-primary" aria-hidden />
              <span>{reason}</span>
            </li>
          ))}
        </ul>
      ) : null}

      <div className="mt-4 rounded-xl border border-primary/25 bg-primary/8 p-3">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-primary">
          Recommended action
        </p>
        <p className="mt-1 text-sm font-medium">{prediction.recommendedAction}</p>
        <p className="mt-1 text-xs text-muted-foreground">{prediction.expectedBenefit}</p>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <Button size="sm" onClick={() => onAct?.(prediction)} disabled={!onAct}>
          Review action
        </Button>
        <Button size="sm" variant="outline" onClick={() => setWhyOpen(true)}>
          <HelpCircle className="mr-1 size-3.5" aria-hidden />
          Why?
        </Button>
        {onSnooze ? (
          <Button size="sm" variant="ghost" onClick={() => onSnooze(prediction)}>
            Snooze
          </Button>
        ) : null}
        {onDismiss ? (
          <Button size="sm" variant="ghost" onClick={() => onDismiss(prediction)}>
            Dismiss
          </Button>
        ) : null}
      </div>

      <Dialog open={whyOpen} onOpenChange={setWhyOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="size-4 text-warning" aria-hidden />
              Why LIFEOS raised this
            </DialogTitle>
            <DialogDescription>{prediction.problem}</DialogDescription>
          </DialogHeader>

          <div className="space-y-5 text-sm">
            <Section title="Situation">
              <p className="text-muted-foreground">{prediction.situation}</p>
            </Section>

            <Section title="Signals">
              <ul className="grid gap-2 sm:grid-cols-2">
                {prediction.signals.map((signal) => (
                  <li
                    key={signal.label}
                    className="rounded-xl border border-border bg-surface-2/50 px-3 py-2"
                  >
                    <p className="text-[11px] text-muted-foreground">{signal.label}</p>
                    <p
                      className={cn(
                        "font-mono text-sm",
                        signal.tone === "bad" && "text-destructive",
                        signal.tone === "warn" && "text-warning",
                        signal.tone === "good" && "text-success",
                      )}
                    >
                      {signal.value}
                    </p>
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Reasoning">
              <ul className="space-y-1.5 text-muted-foreground">
                {prediction.reasons.map((reason) => (
                  <li key={reason} className="flex gap-2">
                    <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                    {reason}
                  </li>
                ))}
              </ul>
            </Section>

            <Section title="Decision">
              <p>{prediction.decision}</p>
            </Section>

            <Section title="Alternatives">
              <ul className="space-y-1.5 text-muted-foreground">
                {prediction.alternatives.map((alt) => (
                  <li key={alt} className="flex gap-2">
                    <ChevronRight className="mt-0.5 size-3.5 shrink-0 text-primary" aria-hidden />
                    {alt}
                  </li>
                ))}
              </ul>
            </Section>

            <div className="flex items-center justify-between rounded-xl border border-border bg-surface-2/50 px-3 py-2">
              <span className="text-xs text-muted-foreground">Confidence</span>
              <span className="font-mono text-sm text-primary">
                {Math.round(prediction.confidence * 100)}%
              </span>
            </div>

            <p className="text-[11px] leading-relaxed text-muted-foreground">
              This explanation summarises the signals and rules behind the recommendation. It is a
              simulated prototype output — not a medical, financial or safety-certified assessment.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-primary">{title}</p>
      {children}
    </section>
  );
}
