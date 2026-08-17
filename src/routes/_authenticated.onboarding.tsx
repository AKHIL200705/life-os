import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { CoreOrb } from "@/components/lifeos/CoreOrb";
import { Panel } from "@/components/lifeos/Panel";
import { SourceBadge } from "@/components/lifeos/SourceBadge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/onboarding")({
  head: () => ({
    meta: [
      { title: "Set up your Digital Twin — LIFEOS Onboarding" },
      {
        name: "description",
        content:
          "Choose your primary goal, grant only the permissions you want, set preferences and generate your initial LIFEOS digital twin.",
      },
      { property: "og:title", content: "LIFEOS Onboarding" },
      {
        property: "og:description",
        content: "Six guided steps to generate your digital twin and first proactive insight.",
      },
    ],
  }),
  component: Onboarding,
});

const GOALS = [
  { id: "productivity", label: "Productivity", detail: "Protect focus time and deadlines" },
  { id: "travel", label: "Travel", detail: "Arrive on time, every time" },
  { id: "study", label: "Study", detail: "Plan revision around real capacity" },
  { id: "work", label: "Work", detail: "Meetings, commutes and conflicts" },
  { id: "organization", label: "Personal organization", detail: "Tasks, money and routine" },
];

const PERMISSIONS = [
  { id: "location_access", label: "Location", detail: "Travel-time and route predictions" },
  { id: "calendar_access", label: "Calendar", detail: "Conflict and deadline predictions" },
  { id: "notifications", label: "Notifications", detail: "Alerts before friction happens" },
  { id: "device_info", label: "Device state", detail: "Battery and connectivity risks" },
  {
    id: "ai_personalization",
    label: "AI personalization",
    detail: "Learn your routines over time",
  },
] as const;

const TRANSPORT = ["metro", "bike", "cab", "bus", "walk"];
const BUDGETS = ["lean", "moderate", "flexible"];
const ENVIRONMENTS = ["quiet", "collaborative", "outdoor"];

const STEPS = ["Welcome", "Goal", "Permissions", "Preferences", "Digital twin", "First insight"];

function Onboarding() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [goal, setGoal] = useState("study");
  const [permissions, setPermissions] = useState<Record<string, boolean>>({
    location_access: true,
    calendar_access: true,
    notifications: true,
    device_info: false,
    ai_personalization: true,
  });
  const [transport, setTransport] = useState("metro");
  const [budget, setBudget] = useState("lean");
  const [environment, setEnvironment] = useState("quiet");
  const [saving, setSaving] = useState(false);
  const [generated, setGenerated] = useState(false);

  async function generateTwin() {
    if (!user) return;
    setSaving(true);
    const results = await Promise.all([
      supabase
        .from("profiles")
        .upsert({ id: user.id, primary_goal: goal, onboarding_completed: true }),
      supabase.from("preferences").upsert({
        user_id: user.id,
        budget_level: budget,
        preferred_transport: transport,
        preferred_environment: environment,
      }),
      supabase.from("privacy_settings").upsert({
        user_id: user.id,
        location_access: !!permissions["location_access"],
        calendar_access: !!permissions["calendar_access"],
        notifications: !!permissions["notifications"],
        device_info: !!permissions["device_info"],
        ai_personalization: !!permissions["ai_personalization"],
      }),
      supabase.from("digital_twin_states").insert({
        user_id: user.id,
        behavior: { typical_departure: "08:05", typical_wake: "07:10" },
        preferences: { transport, budget, environment },
        schedule: { primary_goal: goal },
        context: { source: "onboarding" },
      }),
    ]);
    setSaving(false);

    const failed = results.find((r) => r.error);
    if (failed?.error) {
      toast.error("Could not save your setup", { description: failed.error.message });
      return;
    }
    setGenerated(true);
    setStep(5);
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex items-center gap-2">
        {STEPS.map((label, i) => (
          <div key={label} className="flex flex-1 items-center gap-2">
            <span
              className={cn(
                "grid size-6 shrink-0 place-items-center rounded-full border font-mono text-[10px] transition-colors",
                i < step
                  ? "border-success/50 bg-success/15 text-success"
                  : i === step
                    ? "border-primary bg-primary/15 text-primary"
                    : "border-border text-muted-foreground",
              )}
            >
              {i < step ? <Check className="size-3" /> : i + 1}
            </span>
            {i < STEPS.length - 1 ? (
              <span className={cn("h-px flex-1", i < step ? "bg-success/50" : "bg-border")} />
            ) : null}
          </div>
        ))}
      </div>

      <Panel tilt={false} glow className="p-6 sm:p-8">
        {step === 0 ? (
          <div className="text-center">
            <CoreOrb size={220} status="Initialising" />
            <h1 className="mt-6 text-2xl font-semibold tracking-tight">Welcome to LIFEOS</h1>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
              LIFEOS builds a private model of your day, then watches for the problems forming ahead
              of you. Six short steps and your digital twin is live.
            </p>
          </div>
        ) : null}

        {step === 1 ? (
          <Step title="Choose your primary goal" hint="This ranks which agents get priority.">
            <div className="grid gap-2 sm:grid-cols-2">
              {GOALS.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => setGoal(option.id)}
                  className={cn(
                    "rounded-xl border p-3 text-left transition-all duration-300 hover:-translate-y-0.5",
                    goal === option.id
                      ? "border-primary bg-primary/10"
                      : "border-border bg-surface-2/40",
                  )}
                >
                  <p className="text-sm font-medium">{option.label}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{option.detail}</p>
                </button>
              ))}
            </div>
          </Step>
        ) : null}

        {step === 2 ? (
          <Step
            title="Choose optional permissions"
            hint="Everything is off unless you switch it on. You can change these any time in the Privacy Center."
          >
            <div className="space-y-2">
              {PERMISSIONS.map((permission) => (
                <div
                  key={permission.id}
                  className="flex items-center justify-between rounded-xl border border-border bg-surface-2/40 p-3"
                >
                  <div>
                    <Label htmlFor={permission.id} className="text-sm">
                      {permission.label}
                    </Label>
                    <p className="mt-0.5 text-xs text-muted-foreground">{permission.detail}</p>
                  </div>
                  <Switch
                    id={permission.id}
                    checked={!!permissions[permission.id]}
                    onCheckedChange={(checked) =>
                      setPermissions((prev) => ({ ...prev, [permission.id]: checked }))
                    }
                  />
                </div>
              ))}
            </div>
          </Step>
        ) : null}

        {step === 3 ? (
          <Step
            title="Set your preferences"
            hint="Used to score recommendations you will actually take."
          >
            <div className="space-y-5">
              <ChoiceRow
                label="Preferred transport"
                options={TRANSPORT}
                value={transport}
                onChange={setTransport}
              />
              <ChoiceRow
                label="Budget style"
                options={BUDGETS}
                value={budget}
                onChange={setBudget}
              />
              <ChoiceRow
                label="Work environment"
                options={ENVIRONMENTS}
                value={environment}
                onChange={setEnvironment}
              />
            </div>
          </Step>
        ) : null}

        {step === 4 ? (
          <Step
            title="Generate your digital twin"
            hint="LIFEOS creates your initial behaviour model from these answers."
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <Summary label="Primary goal" value={goal} />
              <Summary label="Transport" value={transport} />
              <Summary label="Budget" value={budget} />
              <Summary label="Environment" value={environment} />
              <Summary
                label="Permissions granted"
                value={`${Object.values(permissions).filter(Boolean).length} of ${PERMISSIONS.length}`}
              />
              <Summary label="Baseline pattern" value="Departure 8:05 AM" />
            </div>
          </Step>
        ) : null}

        {step === 5 && generated ? (
          <Step
            title="Your first insight"
            hint="Generated from your new twin plus simulated context."
          >
            <div className="rounded-2xl border border-primary/30 bg-primary/8 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Sparkles className="size-4 text-primary" aria-hidden />
                <SourceBadge source="prediction" />
              </div>
              <p className="text-sm font-medium">
                Based on a 8:05 AM departure and today's rain, your 9:00 AM commitment carries an
                82% late-arrival risk.
              </p>
              <p className="mt-2 text-xs text-muted-foreground">
                Recommended action: leave 17 minutes earlier via Route B — reduces the risk by about
                62%.
              </p>
            </div>
          </Step>
        ) : null}

        <div className="mt-8 flex items-center justify-between gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0 || saving}
          >
            <ArrowLeft className="mr-1.5 size-4" /> Back
          </Button>

          {step < 4 ? (
            <Button size="sm" onClick={() => setStep((s) => s + 1)}>
              Continue <ArrowRight className="ml-1.5 size-4" />
            </Button>
          ) : step === 4 ? (
            <Button size="sm" onClick={() => void generateTwin()} disabled={saving}>
              {saving ? <Loader2 className="mr-2 size-4 animate-spin" /> : null}
              Generate digital twin
            </Button>
          ) : (
            <Button size="sm" onClick={() => void navigate({ to: "/dashboard" })}>
              Enter command center <ArrowRight className="ml-1.5 size-4" />
            </Button>
          )}
        </div>
      </Panel>
    </div>
  );
}

function Step({
  title,
  hint,
  children,
}: {
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
      <p className="mb-5 mt-1 text-sm text-muted-foreground">{hint}</p>
      {children}
    </div>
  );
}

function ChoiceRow({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: string[];
  value: string;
  onChange: (next: string) => void;
}) {
  return (
    <div>
      <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs capitalize transition-colors",
              value === option
                ? "border-primary bg-primary/12 text-primary"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface-2/40 p-3">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-sm capitalize">{value}</p>
    </div>
  );
}
