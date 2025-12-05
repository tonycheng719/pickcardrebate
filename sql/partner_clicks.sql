-- ========================================
-- Partner Clicks Tracking Tables
-- ========================================

-- 1. 合作夥伴點擊統計表（彙總）
CREATE TABLE IF NOT EXISTS partner_clicks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  card_id TEXT NOT NULL UNIQUE,
  card_name TEXT,
  click_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_clicked_at TIMESTAMPTZ DEFAULT NOW()
);

-- 創建索引
CREATE INDEX IF NOT EXISTS idx_partner_clicks_card_id ON partner_clicks(card_id);
CREATE INDEX IF NOT EXISTS idx_partner_clicks_count ON partner_clicks(click_count DESC);

-- 2. 合作夥伴點擊詳細記錄表（每次點擊的詳細資料）
CREATE TABLE IF NOT EXISTS partner_click_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  card_id TEXT NOT NULL,
  card_name TEXT,
  user_id UUID,
  clicked_at TIMESTAMPTZ DEFAULT NOW(),
  user_agent TEXT,
  referrer TEXT
);

-- 創建索引
CREATE INDEX IF NOT EXISTS idx_partner_click_logs_card_id ON partner_click_logs(card_id);
CREATE INDEX IF NOT EXISTS idx_partner_click_logs_clicked_at ON partner_click_logs(clicked_at DESC);
CREATE INDEX IF NOT EXISTS idx_partner_click_logs_user_id ON partner_click_logs(user_id);

-- 3. 啟用 RLS
ALTER TABLE partner_clicks ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_click_logs ENABLE ROW LEVEL SECURITY;

-- 4. RLS 政策：允許 service role 完全訪問
CREATE POLICY "Service role full access on partner_clicks" ON partner_clicks
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Service role full access on partner_click_logs" ON partner_click_logs
  FOR ALL USING (true) WITH CHECK (true);

-- ========================================
-- 完成！
-- ========================================

