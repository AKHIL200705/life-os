-- Create user_integrations table for storing connected services (Google Calendar, Spotify, Uber, etc.)
CREATE TABLE public.user_integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  provider TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'connected',
  account_email TEXT,
  access_token TEXT,
  refresh_token TEXT,
  expires_at TIMESTAMPTZ,
  scopes TEXT[] NOT NULL DEFAULT '{}',
  metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT user_integrations_user_provider_unique UNIQUE (user_id, provider)
);

-- Indexes
CREATE INDEX user_integrations_user_idx ON public.user_integrations (user_id);
CREATE INDEX user_integrations_provider_idx ON public.user_integrations (user_id, provider);

-- Permissions
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_integrations TO authenticated;
GRANT ALL ON public.user_integrations TO service_role;

-- Row Level Security (RLS)
ALTER TABLE public.user_integrations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own integrations" ON public.user_integrations 
  FOR ALL TO authenticated
  USING (auth.uid() = user_id) 
  WITH CHECK (auth.uid() = user_id);

-- Updated_at trigger
CREATE TRIGGER user_integrations_updated_at 
  BEFORE UPDATE ON public.user_integrations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
