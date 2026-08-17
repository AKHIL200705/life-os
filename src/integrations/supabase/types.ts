export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15";
  };
  public: {
    Tables: {
      actions: {
        Row: {
          action_type: string;
          created_at: string;
          description: string | null;
          id: string;
          payload: Json;
          prediction_id: string | null;
          status: string;
          title: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          action_type: string;
          created_at?: string;
          description?: string | null;
          id?: string;
          payload?: Json;
          prediction_id?: string | null;
          status?: string;
          title: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          action_type?: string;
          created_at?: string;
          description?: string | null;
          id?: string;
          payload?: Json;
          prediction_id?: string | null;
          status?: string;
          title?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "actions_prediction_id_fkey";
            columns: ["prediction_id"];
            isOneToOne: false;
            referencedRelation: "predictions";
            referencedColumns: ["id"];
          },
        ];
      };
      analytics_events: {
        Row: {
          created_at: string;
          event_name: string;
          id: string;
          properties: Json;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          event_name: string;
          id?: string;
          properties?: Json;
          user_id: string;
        };
        Update: {
          created_at?: string;
          event_name?: string;
          id?: string;
          properties?: Json;
          user_id?: string;
        };
        Relationships: [];
      };
      calendar_events: {
        Row: {
          created_at: string;
          ends_at: string | null;
          id: string;
          kind: string;
          location: string | null;
          starts_at: string;
          title: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          ends_at?: string | null;
          id?: string;
          kind?: string;
          location?: string | null;
          starts_at: string;
          title: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          ends_at?: string | null;
          id?: string;
          kind?: string;
          location?: string | null;
          starts_at?: string;
          title?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      digital_twin_states: {
        Row: {
          behavior: Json;
          captured_at: string;
          context: Json;
          created_at: string;
          id: string;
          preferences: Json;
          schedule: Json;
          user_id: string;
        };
        Insert: {
          behavior?: Json;
          captured_at?: string;
          context?: Json;
          created_at?: string;
          id?: string;
          preferences?: Json;
          schedule?: Json;
          user_id: string;
        };
        Update: {
          behavior?: Json;
          captured_at?: string;
          context?: Json;
          created_at?: string;
          id?: string;
          preferences?: Json;
          schedule?: Json;
          user_id?: string;
        };
        Relationships: [];
      };
      memories: {
        Row: {
          category: string;
          confidence: number;
          created_at: string;
          id: string;
          learned_at: string;
          source: string;
          statement: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          category?: string;
          confidence?: number;
          created_at?: string;
          id?: string;
          learned_at?: string;
          source?: string;
          statement: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          category?: string;
          confidence?: number;
          created_at?: string;
          id?: string;
          learned_at?: string;
          source?: string;
          statement?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      prediction_feedback: {
        Row: {
          actual_outcome: string | null;
          created_at: string;
          id: string;
          prediction_id: string;
          rating: number | null;
          user_id: string;
          was_correct: boolean | null;
        };
        Insert: {
          actual_outcome?: string | null;
          created_at?: string;
          id?: string;
          prediction_id: string;
          rating?: number | null;
          user_id: string;
          was_correct?: boolean | null;
        };
        Update: {
          actual_outcome?: string | null;
          created_at?: string;
          id?: string;
          prediction_id?: string;
          rating?: number | null;
          user_id?: string;
          was_correct?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: "prediction_feedback_prediction_id_fkey";
            columns: ["prediction_id"];
            isOneToOne: false;
            referencedRelation: "predictions";
            referencedColumns: ["id"];
          },
        ];
      };
      predictions: {
        Row: {
          category: string;
          confidence: number;
          created_at: string;
          data_source: string;
          event_at: string | null;
          expected_benefit: string | null;
          id: string;
          probability: number;
          problem: string;
          reasons: Json;
          recommended_action: string | null;
          severity: string;
          signals: Json;
          status: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          category?: string;
          confidence?: number;
          created_at?: string;
          data_source?: string;
          event_at?: string | null;
          expected_benefit?: string | null;
          id?: string;
          probability?: number;
          problem: string;
          reasons?: Json;
          recommended_action?: string | null;
          severity?: string;
          signals?: Json;
          status?: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          category?: string;
          confidence?: number;
          created_at?: string;
          data_source?: string;
          event_at?: string | null;
          expected_benefit?: string | null;
          id?: string;
          probability?: number;
          problem?: string;
          reasons?: Json;
          recommended_action?: string | null;
          severity?: string;
          signals?: Json;
          status?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      preferences: {
        Row: {
          budget_level: string;
          created_at: string;
          notifications_enabled: boolean;
          preferred_environment: string;
          preferred_transport: string;
          typical_departure_time: string | null;
          typical_wake_time: string | null;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          budget_level?: string;
          created_at?: string;
          notifications_enabled?: boolean;
          preferred_environment?: string;
          preferred_transport?: string;
          typical_departure_time?: string | null;
          typical_wake_time?: string | null;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          budget_level?: string;
          created_at?: string;
          notifications_enabled?: boolean;
          preferred_environment?: string;
          preferred_transport?: string;
          typical_departure_time?: string | null;
          typical_wake_time?: string | null;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      privacy_settings: {
        Row: {
          activity_history: boolean;
          ai_personalization: boolean;
          anonymous_analytics: boolean;
          calendar_access: boolean;
          created_at: string;
          data_sharing: boolean;
          device_info: boolean;
          location_access: boolean;
          notifications: boolean;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          activity_history?: boolean;
          ai_personalization?: boolean;
          anonymous_analytics?: boolean;
          calendar_access?: boolean;
          created_at?: string;
          data_sharing?: boolean;
          device_info?: boolean;
          location_access?: boolean;
          notifications?: boolean;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          activity_history?: boolean;
          ai_personalization?: boolean;
          anonymous_analytics?: boolean;
          calendar_access?: boolean;
          created_at?: string;
          data_sharing?: boolean;
          device_info?: boolean;
          location_access?: boolean;
          notifications?: boolean;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          display_name: string | null;
          id: string;
          onboarding_completed: boolean;
          primary_goal: string | null;
          updated_at: string;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          display_name?: string | null;
          id: string;
          onboarding_completed?: boolean;
          primary_goal?: string | null;
          updated_at?: string;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          display_name?: string | null;
          id?: string;
          onboarding_completed?: boolean;
          primary_goal?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      tasks: {
        Row: {
          completed: boolean;
          created_at: string;
          due_at: string | null;
          id: string;
          priority: string;
          title: string;
          updated_at: string;
          user_id: string;
        };
        Insert: {
          completed?: boolean;
          created_at?: string;
          due_at?: string | null;
          id?: string;
          priority?: string;
          title: string;
          updated_at?: string;
          user_id: string;
        };
        Update: {
          completed?: boolean;
          created_at?: string;
          due_at?: string | null;
          id?: string;
          priority?: string;
          title?: string;
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] & DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    keyof DefaultSchema["Tables"] | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    keyof DefaultSchema["Enums"] | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    keyof DefaultSchema["CompositeTypes"] | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
