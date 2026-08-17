import { supabase } from "@/integrations/supabase/client";

export interface ActionRecord {
  id: string;
  action_type: string;
  title: string;
  description?: string | null;
  status: string;
  created_at: string;
}

export interface MemoryRecord {
  id: string;
  statement: string;
  category: string;
  confidence: number;
  learned_at: string;
}

/**
 * Service managing Action Execution, Feedback Logging, and Memory Extraction.
 */
export const actionService = {
  /**
   * Persists an action decision (confirmed, snoozed, dismissed) to Supabase actions & tasks,
   * and automatically extracts learned user memory.
   */
  async persistAction(action: {
    type: string;
    title: string;
    description: string;
    impact?: string;
  }, status: "confirmed" | "snoozed" | "dismissed"): Promise<boolean> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return false;

      // 1. Insert action record into Supabase actions table
      const { error: actionError } = await supabase.from("actions").insert({
        user_id: session.user.id,
        action_type: action.type,
        title: action.title,
        description: action.description,
        status,
        payload: { impact: action.impact ?? "N/A", source: "user_decision" },
      });

      if (actionError) {
        console.warn("[LIFEOS Action] Error persisting action:", actionError.message);
      }

      if (status === "confirmed") {
        // 2. Insert completed task record into tasks table
        await supabase.from("tasks").insert({
          user_id: session.user.id,
          title: action.title,
          priority: "high",
          completed: true,
        });

        // 3. Extract and store learned preference into memories table
        await supabase.from("memories").insert({
          user_id: session.user.id,
          category: "preference",
          statement: `Confirmed action: "${action.title}" (${action.description})`,
          source: "user_action_confirmation",
          confidence: 0.95,
        });
      }

      return true;
    } catch (err) {
      console.error("[LIFEOS Action] Exception in persistAction:", err);
      return false;
    }
  },

  /**
   * Record prediction feedback into prediction_feedback & memories tables
   */
  async recordPredictionFeedback(
    predictionId: string,
    problemTitle: string,
    wasCorrect: boolean
  ): Promise<boolean> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return false;

      // 1. Insert prediction feedback
      await supabase.from("prediction_feedback").insert({
        user_id: session.user.id,
        prediction_id: predictionId.length === 36 ? predictionId : undefined, // Check if UUID
        was_correct: wasCorrect,
        actual_outcome: wasCorrect ? "Confirmed accurate" : "Dismissed by user",
      } as any);

      // 2. Extract memory fact
      await supabase.from("memories").insert({
        user_id: session.user.id,
        category: "behavior",
        statement: `User validated prediction "${problemTitle}" as ${wasCorrect ? "accurate" : "inaccurate"}`,
        source: "prediction_feedback",
        confidence: 0.88,
      });

      return true;
    } catch (err) {
      console.error("[LIFEOS Action] Exception in recordPredictionFeedback:", err);
      return false;
    }
  },

  /**
   * List recent actions from Supabase actions table
   */
  async listUserActions(): Promise<ActionRecord[]> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return [];

      const { data, error } = await supabase
        .from("actions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);

      if (error || !data) return [];
      return data;
    } catch {
      return [];
    }
  },

  /**
   * List learned memories from Supabase memories table
   */
  async listUserMemories(): Promise<MemoryRecord[]> {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return [];

      const { data, error } = await supabase
        .from("memories")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);

      if (error || !data) return [];
      return data;
    } catch {
      return [];
    }
  },
};
