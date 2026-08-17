import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Brain, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { PageHeader, Panel, PanelHeader } from "@/components/lifeos/Panel";
import { DemoNotice } from "@/components/lifeos/SourceBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { DEMO_MEMORIES } from "@/lib/lifeos/demo-data";
import type { MemoryItem } from "@/lib/lifeos/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_authenticated/memory")({
  head: () => ({
    meta: [
      { title: "LIFEOS Memory — Learned Patterns" },
      {
        name: "description",
        content:
          "Every pattern LIFEOS has learned about you, in plain language, with its source and confidence. Add your own facts or delete anything you disagree with.",
      },
      { property: "og:title", content: "LIFEOS Memory" },
      {
        property: "og:description",
        content: "Inspectable, editable long-term memory — the opposite of a black box.",
      },
    ],
  }),
  component: MemoryPage,
});

const CATEGORIES = ["all", "travel", "schedule", "finance", "environment", "study"];

function MemoryPage() {
  const { user } = useAuth();
  const [items, setItems] = useState<MemoryItem[]>(DEMO_MEMORIES);
  const [filter, setFilter] = useState("all");
  const [draft, setDraft] = useState("");

  const visible = filter === "all" ? items : items.filter((item) => item.category === filter);

  async function addMemory() {
    const statement = draft.trim();
    if (!statement || !user) return;
    const item: MemoryItem = {
      id: `local-${Date.now()}`,
      statement,
      category: "schedule",
      source: "You told LIFEOS",
      confidence: 1,
      learnedAt: "just now",
    };
    setItems((prev) => [item, ...prev]);
    setDraft("");
    const { error } = await supabase.from("memories").insert({
      user_id: user.id,
      statement,
      category: "schedule",
      source: "user_provided",
      confidence: 1,
    });
    if (error) toast.error("Saved locally only", { description: error.message });
    else toast.success("Added to your memory");
  }

  return (
    <div>
      <PageHeader
        eyebrow="LIFEOS memory"
        title="What LIFEOS has learned"
        description="Long-term memory is written in plain language so you can audit it. Wrong entries can be deleted, and deletion changes future predictions immediately."
        right={
          <Badge variant="outline" className="border-primary/40 text-primary">
            <Brain className="mr-1.5 size-3" /> {items.length} entries
          </Badge>
        }
      />

      <div className="mb-4">
        <DemoNotice>
          Seeded entries are simulated examples. Entries you add are saved to your private memory.
        </DemoNotice>
      </div>

      <Panel tilt={false} className="mb-4">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Teach LIFEOS something — e.g. 'I never schedule anything before 8 AM'"
            onKeyDown={(event) => {
              if (event.key === "Enter") void addMemory();
            }}
          />
          <Button onClick={() => void addMemory()} disabled={!draft.trim()}>
            <Plus className="mr-1.5 size-4" /> Add memory
          </Button>
        </div>
      </Panel>

      <div className="mb-4 flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setFilter(category)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs capitalize transition-colors",
              filter === category
                ? "border-primary bg-primary/12 text-primary"
                : "border-border text-muted-foreground hover:text-foreground",
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="scene-3d grid gap-3 lg:grid-cols-2">
        {visible.map((item) => (
          <Panel key={item.id}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-medium leading-relaxed">{item.statement}</p>
                <p className="mt-2 text-[11px] text-muted-foreground">
                  {item.source} · learned {item.learnedAt}
                </p>
              </div>
              <Button
                size="icon"
                variant="ghost"
                aria-label="Delete memory"
                onClick={() => {
                  setItems((prev) => prev.filter((entry) => entry.id !== item.id));
                  toast("Memory deleted — future predictions updated");
                }}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Badge variant="outline" className="border-border capitalize text-muted-foreground">
                {item.category}
              </Badge>
              <span className="font-mono text-[11px] text-primary">
                confidence {Math.round(item.confidence * 100)}%
              </span>
            </div>
          </Panel>
        ))}
      </div>

      {visible.length === 0 ? (
        <Panel tilt={false} className="text-center text-sm text-muted-foreground">
          No memories in this category yet.
        </Panel>
      ) : null}

      <Panel className="mt-6">
        <PanelHeader
          title="How memory changes predictions"
          subtitle="Memory is a weight on the reasoning engine, not a rule engine"
        />
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { t: "Reinforced", d: "Patterns confirmed by outcomes gain confidence and influence." },
            { t: "Decayed", d: "Unused patterns lose weight so old habits stop distorting today." },
            { t: "Deleted", d: "Removing an entry removes its influence from the next cycle." },
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
