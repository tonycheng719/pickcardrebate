-- 消費提醒系統
-- 提醒用戶回贈上限將滿

CREATE TABLE IF NOT EXISTS spending_trackers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- 追蹤哪張卡的哪個規則
  card_id TEXT NOT NULL,
  rule_description TEXT NOT NULL, -- 用於識別具體的回贈規則
  
  -- 上限設定
  cap_amount DECIMAL(10, 2) NOT NULL, -- 回贈/消費上限
  cap_type TEXT NOT NULL DEFAULT 'spending', -- 'spending' 或 'reward'
  cap_period TEXT NOT NULL DEFAULT 'monthly', -- 'monthly', 'yearly', 'quarterly'
  
  -- 當前追蹤
  current_amount DECIMAL(10, 2) NOT NULL DEFAULT 0,
  period_start DATE NOT NULL,
  
  -- 提醒設定
  remind_at_percentage INTEGER DEFAULT 80, -- 達到上限的百分比時提醒
  last_reminded_at TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- 每個用戶對每張卡的每個規則只能有一個追蹤
  UNIQUE(user_id, card_id, rule_description, period_start)
);

-- 創建索引
CREATE INDEX idx_spending_trackers_user_id ON spending_trackers(user_id);
CREATE INDEX idx_spending_trackers_card_id ON spending_trackers(card_id);
CREATE INDEX idx_spending_trackers_period ON spending_trackers(period_start);

-- 啟用 RLS
ALTER TABLE spending_trackers ENABLE ROW LEVEL SECURITY;

-- RLS 政策
CREATE POLICY "Users can view their own spending trackers" ON spending_trackers
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own spending trackers" ON spending_trackers
  FOR ALL USING (auth.uid() = user_id);

