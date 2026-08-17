import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Download, Loader2, ShieldCheck, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { PageHeader, Panel, PanelHeader } from "@/components/lifeos/Panel";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Center — LIFEOS" },
      {
        name: "description",
        content:
          "Granular permission toggles, plain-language explanations of what each signal is used for, plus data export and deletion.",
      },
      { property: "og:title", content: "LIFEOS Privacy Center" },
      {
        property: "og:description",
        content: "Every signal is opt-in, explained, and revocable at any time.",
      },
    ],
  }),
  component: PrivacyPage,
});

const TOGGLES = [
  {
    id: "location_access",
    label: "Location",
    detail: "Enables travel-time, route and risk-zone predictions.",
  },
  {
    id: "calendar_access",
    label: "Calendar",
    detail: "Enables conflict, deadline and preparation predictions.",
  },
  {
    id: "notifications",
    label: "Notifications",
    detail: "Delivers warnings before friction reaches you.",
  },
  { id: "device_info", label: "Device state", detail: "Battery and connectivity risk detection." },
  {
    id: "ai_personalization",
    label: "AI personalization",
    detail: "Lets LIFEOS learn your routines over time.",
  },
] as const;

type ToggleId = (typeof TOGGLES)[number]["id"];

function PrivacyPage() {
  const { user } = useAuth();
  const [state, setState] = useState<Record<ToggleId, boolean>>({
    location_access: false,
    calendar_access: false,
    notifications: false,
    device_info: false,
    ai_personalization: false,
  });
  const [saving, setSaving] = useState(false);

  const { data } = useQuery({
    queryKey: ["privacy", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("privacy_settings")
        .select("location_access, calendar_access, notifications, device_info, ai_personalization")
        .eq("user_id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  useEffect(() => {
    if (data) setState(data as Record<ToggleId, boolean>);
  }, [data]);

  async function update(id: ToggleId, value: boolean) {
    if (!user) return;
    setState((prev) => ({ ...prev, [id]: value }));
    setSaving(true);
    const { error } = await supabase
      .from("privacy_settings")
      .upsert({ user_id: user.id, ...state, [id]: value });
    setSaving(false);
    if (error) toast.error("Could not save", { description: error.message });
  }

  async function exportData() {
    if (!user) return;
    const [predictions, memories, actions] = await Promise.all([
      supabase.from("predictions").select("*"),
      supabase.from("memories").select("*"),
      supabase.from("actions").select("*"),
    ]);
    const payload = {
      exported_at: new Date().toISOString(),
      predictions: predictions.data ?? [],
      memories: memories.data ?? [],
      actions: actions.data ?? [],
      privacy_settings: state,
    };
    const url = URL.createObjectURL(
      new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" }),
    );
    const link = document.createElement("a");
    link.href = url;
    link.download = "lifeos-data-export.json";
    link.click();
    URL.revokeObjectURL(url);
    toast.success("Export downloaded");
  }

  async function deleteData() {
    if (!user) return;
    const results = await Promise.all([
      supabase.from("memories").delete().eq("user_id", user.id),
      supabase.from("predictions").delete().eq("user_id", user.id),
      supabase.from("actions").delete().eq("user_id", user.id),
      supabase.from("digital_twin_states").delete().eq("user_id", user.id),
    ]);
    const failed = results.find((r) => r.error);
    if (failed?.error) toast.error("Deletion failed", { description: failed.error.message });
    else toast.success("Your learned data has been deleted");
  }

  return (
    <div>
      <PageHeader
        eyebrow="Privacy center"
        title="You decide what LIFEOS can see"
        description="Nothing is collected without an explicit switch. Each toggle explains exactly which predictions it enables, and turning it off removes those predictions."
        right={
          <Badge variant="outline" className="border-success/40 text-success">
            <ShieldCheck className="mr-1.5 size-3" /> user-controlled
          </Badge>
        }
      />

      <div className="grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Panel>
          <PanelHeader
            title="Permissions"
            subtitle="Change any time — takes effect on the next reasoning cycle"
            right={saving ? <Loader2 className="size-4 animate-spin text-primary" /> : null}
          />
          <div className="space-y-2">
            {TOGGLES.map((toggle) => (
              <div
                key={toggle.id}
                className="flex items-start justify-between gap-4 rounded-xl border border-border bg-surface-2/50 p-3"
              >
                <div>
                  <Label htmlFor={toggle.id} className="text-sm">
                    {toggle.label}
                  </Label>
                  <p className="mt-0.5 text-xs text-muted-foreground">{toggle.detail}</p>
                </div>
                <Switch
                  id={toggle.id}
                  checked={state[toggle.id]}
                  onCheckedChange={(checked) => void update(toggle.id, checked)}
                />
              </div>
            ))}
          </div>
        </Panel>

        <div className="grid gap-4">
          <Panel>
            <PanelHeader title="Your data" subtitle="Export or delete at any time" />
            <div className="flex flex-col gap-2">
              <Button variant="outline" onClick={() => void exportData()}>
                <Download className="mr-1.5 size-4" /> Export my data (JSON)
              </Button>
              <Button variant="destructive" onClick={() => void deleteData()}>
                <Trash2 className="mr-1.5 size-4" /> Delete learned data
              </Button>
            </div>
            <p className="mt-3 text-[11px] text-muted-foreground">
              Deletion removes memories, predictions, actions and twin states. Your account and
              preferences remain.
            </p>
          </Panel>

          <Panel>
            <PanelHeader title="Our commitments" subtitle="Design rules, not marketing" />
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>· Personal data is never shared with other users.</li>
              <li>· City intelligence uses anonymised aggregates only.</li>
              <li>· No action runs without your explicit confirmation.</li>
              <li>· Every prediction can be traced to its signals.</li>
            </ul>
          </Panel>
        </div>
      </div>
    </div>
  );
}
