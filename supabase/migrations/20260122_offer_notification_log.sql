-- 優惠到期通知記錄表（避免重複發送）
CREATE TABLE IF NOT EXISTS offer_notification_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  source TEXT NOT NULL, -- 'card_promo', 'partner_offer', 'discover_article'
  source_id TEXT NOT NULL, -- 卡片 ID 或文章 slug
  expiry_date DATE NOT NULL,
  reminder_type TEXT NOT NULL, -- '7d', '3d', '1d'
  sent_at TIMESTAMPTZ DEFAULT NOW(),
  recipients_count INTEGER DEFAULT 0,
  UNIQUE(source, source_id, expiry_date, reminder_type)
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_notification_log_source ON offer_notification_log(source, source_id);
CREATE INDEX IF NOT EXISTS idx_notification_log_date ON offer_notification_log(expiry_date);

-- RLS
ALTER TABLE offer_notification_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Service role full access to notification_log" ON offer_notification_log
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

