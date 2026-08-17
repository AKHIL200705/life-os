-- helper
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$
LANGUAGE plpgsql SET search_path = public;

-- profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  primary_goal TEXT,
  onboarding_completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile" ON public.profiles FOR ALL TO authenticated
  USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- preferences
CREATE TABLE public.preferences (
  user_id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  budget_level TEXT NOT NULL DEFAULT 'moderate',
  preferred_transport TEXT NOT NULL DEFAULT 'public_transport',
  preferred_environment TEXT NOT NULL DEFAULT 'quiet',
  typical_wake_time TIME,
  typical_departure_time TIME,
  notifications_enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.preferences TO authenticated;
GRANT ALL ON public.preferences TO service_role;
ALTER TABLE public.preferences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own preferences" ON public.preferences FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER preferences_updated_at BEFORE UPDATE ON public.preferences
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- digital twin
CREATE TABLE public.digital_twin_states (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  behavior JSONB NOT NULL DEFAULT '{}'::jsonb,
  preferences JSONB NOT NULL DEFAULT '{}'::jsonb,
  schedule JSONB NOT NULL DEFAULT '{}'::jsonb,
  context JSONB NOT NULL DEFAULT '{}'::jsonb,
  captured_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX digital_twin_states_user_idx ON public.digital_twin_states (user_id, captured_at DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.digital_twin_states TO authenticated;
GRANT ALL ON public.digital_twin_states TO service_role;
ALTER TABLE public.digital_twin_states ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own twin" ON public.digital_twin_states FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- memories
CREATE TABLE public.memories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  category TEXT NOT NULL DEFAULT 'behavior',
  statement TEXT NOT NULL,
  source TEXT NOT NULL DEFAULT 'demo_data',
  confidence NUMERIC(4,3) NOT NULL DEFAULT 0.7,
  learned_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX memories_user_idx ON public.memories (user_id, learned_at DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.memories TO authenticated;
GRANT ALL ON public.memories TO service_role;
ALTER TABLE public.memories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own memories" ON public.memories FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER memories_updated_at BEFORE UPDATE ON public.memories
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- predictions
CREATE TABLE public.predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  problem TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'travel',
  probability NUMERIC(4,3) NOT NULL DEFAULT 0.5,
  severity TEXT NOT NULL DEFAULT 'medium',
  confidence NUMERIC(4,3) NOT NULL DEFAULT 0.7,
  event_at TIMESTAMPTZ,
  reasons JSONB NOT NULL DEFAULT '[]'::jsonb,
  signals JSONB NOT NULL DEFAULT '[]'::jsonb,
  recommended_action TEXT,
  expected_benefit TEXT,
  data_source TEXT NOT NULL DEFAULT 'simulated',
  status TEXT NOT NULL DEFAULT 'open',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX predictions_user_idx ON public.predictions (user_id, created_at DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.predictions TO authenticated;
GRANT ALL ON public.predictions TO service_role;
ALTER TABLE public.predictions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own predictions" ON public.predictions FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER predictions_updated_at BEFORE UPDATE ON public.predictions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- prediction feedback
CREATE TABLE public.prediction_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  prediction_id UUID NOT NULL REFERENCES public.predictions ON DELETE CASCADE,
  was_correct BOOLEAN,
  actual_outcome TEXT,
  rating SMALLINT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX prediction_feedback_user_idx ON public.prediction_feedback (user_id, created_at DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.prediction_feedback TO authenticated;
GRANT ALL ON public.prediction_feedback TO service_role;
ALTER TABLE public.prediction_feedback ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own feedback" ON public.prediction_feedback FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- actions
CREATE TABLE public.actions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  prediction_id UUID REFERENCES public.predictions ON DELETE SET NULL,
  action_type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  status TEXT NOT NULL DEFAULT 'suggested',
  payload JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX actions_user_idx ON public.actions (user_id, created_at DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.actions TO authenticated;
GRANT ALL ON public.actions TO service_role;
ALTER TABLE public.actions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own actions" ON public.actions FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER actions_updated_at BEFORE UPDATE ON public.actions
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- tasks
CREATE TABLE public.tasks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  title TEXT NOT NULL,
  due_at TIMESTAMPTZ,
  priority TEXT NOT NULL DEFAULT 'medium',
  completed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX tasks_user_idx ON public.tasks (user_id, due_at);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tasks TO authenticated;
GRANT ALL ON public.tasks TO service_role;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own tasks" ON public.tasks FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER tasks_updated_at BEFORE UPDATE ON public.tasks
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- calendar events
CREATE TABLE public.calendar_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  title TEXT NOT NULL,
  location TEXT,
  kind TEXT NOT NULL DEFAULT 'event',
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX calendar_events_user_idx ON public.calendar_events (user_id, starts_at);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.calendar_events TO authenticated;
GRANT ALL ON public.calendar_events TO service_role;
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own events" ON public.calendar_events FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER calendar_events_updated_at BEFORE UPDATE ON public.calendar_events
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- privacy settings
CREATE TABLE public.privacy_settings (
  user_id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  location_access BOOLEAN NOT NULL DEFAULT false,
  calendar_access BOOLEAN NOT NULL DEFAULT false,
  notifications BOOLEAN NOT NULL DEFAULT false,
  device_info BOOLEAN NOT NULL DEFAULT false,
  activity_history BOOLEAN NOT NULL DEFAULT false,
  ai_personalization BOOLEAN NOT NULL DEFAULT false,
  data_sharing BOOLEAN NOT NULL DEFAULT false,
  anonymous_analytics BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.privacy_settings TO authenticated;
GRANT ALL ON public.privacy_settings TO service_role;
ALTER TABLE public.privacy_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own privacy" ON public.privacy_settings FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER privacy_settings_updated_at BEFORE UPDATE ON public.privacy_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- analytics events
CREATE TABLE public.analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  event_name TEXT NOT NULL,
  properties JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
CREATE INDEX analytics_events_user_idx ON public.analytics_events (user_id, created_at DESC);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.analytics_events TO authenticated;
GRANT ALL ON public.analytics_events TO service_role;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own analytics" ON public.analytics_events FOR ALL TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- bootstrap rows on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, display_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.raw_user_meta_data->>'avatar_url'
  )
  ON CONFLICT (id) DO NOTHING;

  INSERT INTO public.preferences (user_id) VALUES (NEW.id) ON CONFLICT (user_id) DO NOTHING;
  INSERT INTO public.privacy_settings (user_id) VALUES (NEW.id) ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();