-- Notification History Table
-- 記錄所有發送過的推送通知

CREATE TABLE IF NOT EXISTS notification_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  body TEXT NOT NULL,
  data JSONB,
  sent_count INTEGER DEFAULT 0,
  target_type TEXT DEFAULT 'all', -- 'all' or 'specific'
  trigger_type TEXT, -- 'manual', 'cron_new_article', 'cron_offer_expiry'
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_notification_history_created ON notification_history(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notification_history_type ON notification_history(trigger_type);

-- RLS
ALTER TABLE notification_history ENABLE ROW LEVEL SECURITY;

-- Service role 可以完全訪問
CREATE POLICY "Service role full access to notification_history" ON notification_history
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

