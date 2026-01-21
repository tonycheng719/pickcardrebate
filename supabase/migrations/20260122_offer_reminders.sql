-- 優惠到期提醒表
CREATE TABLE IF NOT EXISTS offer_reminders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  card_id TEXT NOT NULL,
  card_name TEXT NOT NULL,
  offer_type TEXT NOT NULL, -- 'welcome_offer', 'promotion', 'annual_fee'
  offer_description TEXT,
  expiry_date DATE NOT NULL,
  reminder_days INTEGER[] DEFAULT '{7, 3, 1}', -- 提前幾天提醒
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 用戶優惠提醒訂閱
CREATE TABLE IF NOT EXISTS user_offer_subscriptions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  card_id TEXT NOT NULL,
  offer_reminder_id UUID REFERENCES offer_reminders(id) ON DELETE CASCADE,
  is_notified_7d BOOLEAN DEFAULT false,
  is_notified_3d BOOLEAN DEFAULT false,
  is_notified_1d BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, card_id, offer_reminder_id)
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_offer_reminders_expiry ON offer_reminders(expiry_date);
CREATE INDEX IF NOT EXISTS idx_offer_reminders_active ON offer_reminders(is_active);
CREATE INDEX IF NOT EXISTS idx_user_offer_subs_user ON user_offer_subscriptions(user_id);
CREATE INDEX IF NOT EXISTS idx_user_offer_subs_card ON user_offer_subscriptions(card_id);

-- RLS
ALTER TABLE offer_reminders ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_offer_subscriptions ENABLE ROW LEVEL SECURITY;

-- 所有人可讀取優惠提醒
CREATE POLICY "Anyone can read offer reminders" ON offer_reminders
  FOR SELECT USING (true);

-- Service role 可完全訪問
CREATE POLICY "Service role full access to offer_reminders" ON offer_reminders
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- 用戶只能管理自己的訂閱
CREATE POLICY "Users can manage own subscriptions" ON user_offer_subscriptions
  FOR ALL USING (auth.uid() = user_id);

CREATE POLICY "Service role full access to subscriptions" ON user_offer_subscriptions
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

