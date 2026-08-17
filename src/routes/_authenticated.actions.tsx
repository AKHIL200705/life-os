import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  BellRing,
  BookmarkPlus,
  CalendarPlus,
  Clock3,
  Navigation,
  Route as RouteIcon,
  X,
} from "lucide-react";
import { toast } from "sonner";

import { PageHeader, Panel, PanelHeader } from "@/components/lifeos/Panel";
import { DemoNotice, SourceBadge } from "@/components/lifeos/SourceBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { DEMO_PREDICTIONS } from "@/lib/lifeos/demo-data";

export const Route = createFileRoute("/_authenticated/actions")({
  head: () => ({
    meta: [
      { title: "Action Center — LIFEOS" },
      {
        name: "description",
        content:
          "Confirm, snooze or dismiss the actions LIFEOS recommends: change route, start navigation, create a reminder, add a calendar event or save a recommendation.",
      },
      { property: "og:title", content: "LIFEOS Action Center" },
      {
        property: "og:description",
        content: "Every recommended action requires your confirmation before anything happens.",
      },
    ],
  }),
  component: ActionsPage,
});

interface ActionDef {
  id: string;
  type: string;
  title: string;
  description: string;
  icon: typeof Navigation;
  impact: string;
  external: boolean;
}

const ACTIONS: ActionDef[] = [
  {
    id: "a1",
    type: "change_route",
    title: "Switch to Route B",
    description: "Avoids the flood-prone underpass and saves an estimated 11 minutes in rain.",
    icon: RouteIcon,
    impact: "Late-arrival risk 82% → 31%",
    external: true,
  },
  {
    id: "a2",
    type: "start_navigation",
    title: "Start navigation now",
    description: "Opens turn-by-turn guidance for Route B with a departure at 8:12 AM.",
    icon: Navigation,
    impact: "Predicted arrival 8:48 AM",
    external: true,
  },
  {
    id: "a3",
    type: "create_reminder",
    title: "Remind me to charge at 11:00 AM",
    description: "Library charging point in Block B currently has 4 free sockets.",
    icon: BellRing,
    impact: "Prevents evening navigation loss",
    external: false,
  },
  {
    id: "a4",
    type: "add_calendar_event",
    title: "Block 7:00–8:30 PM Tuesday for the DBMS report",
    description: "Restores a 40-minute buffer before Thursday's deadline.",
    icon: CalendarPlus,
    impact: "Deadline collision risk 57% → 22%",
    external: true,
  },
  {
    id: "a5",
    type: "save_recommendation",
    title: "Save 'metro on rainy mornings' rule",
    description: "LIFEOS will prefer metro routing when rain is forecast before 9:00 AM.",
    icon: BookmarkPlus,
    impact: "Projected saving ₹240/week",
    external: false,
  },
];

function ActionsPage() {
  const { user } = useAuth();
  const [pending, setPending] = useState<ActionDef | null>(null);
  const [statuses, setStatuses] = useState<Record<string, "confirmed" | "snoozed" | "dismissed">>(
    {},
  );

  async function persist(action: ActionDef, status: string) {
    if (!user) return;
    const { error } = await supabase.from("actions").insert({
      user_id: user.id,
      action_type: action.type,
      title: action.title,
      description: action.description,
      status,
      payload: { impact: action.impact, source: "demo_scenario" },
    });
    if (error) toast.error("Could not record the action", { description: error.message });
  }

  async function confirm(action: ActionDef) {
    setStatuses((prev) => ({ ...prev, [action.id]: "confirmed" }));
    setPending(null);
    await persist(action, "confirmed");
    toast.success("Action confirmed", {
      description: action.external
        ? "Recorded in your action log. External integrations are mocked in this prototype."
        : "Recorded in your action log.",
    });
  }

  return (
    <div>
      <PageHeader
        eyebrow="Action center"
        title="Actions awaiting your decision"
        description="LIFEOS never acts silently. Every recommendation needs explicit confirmation, and external integrations are mocked until real APIs are connected."
        right={<SourceBadge source="prediction" />}
      />

      <div className="mb-4">
        <DemoNotice>
          Confirming an action records it in your private action log. Navigation, calendar and
          reminder integrations are mock services in this prototype.
        </DemoNotice>
      </div>

      <div className="scene-3d grid gap-4 lg:grid-cols-2">
        {ACTIONS.map((action) => {
          const Icon = action.icon;
          const status = statuses[action.id];
          return (
            <Panel key={action.id}>
              <PanelHeader
                title={action.title}
                subtitle={action.description}
                icon={<Icon className="size-4" />}
                right={
                  status ? (
                    <Badge
                      variant="outline"
                      className={
                        status === "confirmed"
                          ? "border-success/45 text-success"
                          : status === "snoozed"
                            ? "border-warning/45 text-warning"
                            : "border-border text-muted-foreground"
                      }
                    >
                      {status}
                    </Badge>
                  ) : null
                }
              />
              <p className="rounded-xl border border-primary/25 bg-primary/8 px-3 py-2 text-xs">
                {action.impact}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Button
                  size="sm"
                  onClick={() => setPending(action)}
                  disabled={status === "confirmed"}
                >
                  {action.external ? "Confirm & run" : "Confirm"}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setStatuses((prev) => ({ ...prev, [action.id]: "snoozed" }));
                    void persist(action, "snoozed");
                    toast("Snoozed for 30 minutes");
                  }}
                >
                  <Clock3 className="mr-1.5 size-3.5" /> Snooze
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => {
                    setStatuses((prev) => ({ ...prev, [action.id]: "dismissed" }));
                    void persist(action, "dismissed");
                    toast("Dismissed — recorded as feedback");
                  }}
                >
                  <X className="mr-1.5 size-3.5" /> Dismiss
                </Button>
              </div>
            </Panel>
          );
        })}
      </div>

      <Panel className="mt-6">
        <PanelHeader
          title="Linked predictions"
          subtitle="Actions above trace back to these open predictions"
        />
        <ul className="space-y-2">
          {DEMO_PREDICTIONS.slice(0, 3).map((prediction) => (
            <li
              key={prediction.id}
              className="flex flex-wrap items-center gap-2 rounded-xl border border-border bg-surface-2/50 px-3 py-2 text-sm"
            >
              <span className="font-mono text-[11px] text-destructive">
                {Math.round(prediction.probability * 100)}%
              </span>
              {prediction.problem}
              <span className="ml-auto text-xs text-muted-foreground">
                {prediction.recommendedAction}
              </span>
            </li>
          ))}
        </ul>
      </Panel>

      <AlertDialog open={pending !== null} onOpenChange={(open) => !open && setPending(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm this action?</AlertDialogTitle>
            <AlertDialogDescription>
              {pending?.title}.{" "}
              {pending?.external
                ? "This would normally reach an external service — in this prototype it is recorded in your private action log only."
                : "This will be recorded in your private action log."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => pending && void confirm(pending)}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
