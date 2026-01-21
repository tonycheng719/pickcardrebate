-- App Events Table for Analytics

CREATE TABLE IF NOT EXISTS app_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_name TEXT NOT NULL,
  event_params JSONB,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  platform TEXT DEFAULT 'unknown',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_app_events_name ON app_events(event_name);
CREATE INDEX IF NOT EXISTS idx_app_events_created ON app_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_app_events_user ON app_events(user_id);
CREATE INDEX IF NOT EXISTS idx_app_events_platform ON app_events(platform);

-- RLS
ALTER TABLE app_events ENABLE ROW LEVEL SECURITY;

-- Service role 可以完全訪問
CREATE POLICY "Service role full access to app_events" ON app_events
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

