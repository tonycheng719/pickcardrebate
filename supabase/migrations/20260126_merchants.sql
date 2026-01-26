-- 商戶統一資料表
-- 用於 Web 和 Mobile 共用

CREATE TABLE IF NOT EXISTS merchants (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT,
  category_ids TEXT[] NOT NULL DEFAULT '{}',
  aliases TEXT[] DEFAULT '{}',
  logo TEXT,
  accent_color TEXT DEFAULT '#6b7280',
  is_online_only BOOLEAN DEFAULT FALSE,
  is_general BOOLEAN DEFAULT FALSE,
  is_foreign_currency BOOLEAN DEFAULT FALSE,
  currency TEXT,
  excluded_card_networks TEXT[] DEFAULT '{}',
  sort_order INTEGER DEFAULT 0,
  is_popular BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 商戶分類表
CREATE TABLE IF NOT EXISTS merchant_categories (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  name_en TEXT,
  icon TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_merchants_category ON merchants USING GIN (category_ids);
CREATE INDEX IF NOT EXISTS idx_merchants_popular ON merchants (is_popular) WHERE is_popular = TRUE;
CREATE INDEX IF NOT EXISTS idx_merchants_active ON merchants (is_active) WHERE is_active = TRUE;

-- 更新 updated_at 觸發器
CREATE OR REPLACE FUNCTION update_merchants_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS merchants_updated_at ON merchants;
CREATE TRIGGER merchants_updated_at
  BEFORE UPDATE ON merchants
  FOR EACH ROW
  EXECUTE FUNCTION update_merchants_updated_at();

-- 插入預設分類
INSERT INTO merchant_categories (id, name, name_en, icon, sort_order) VALUES
  ('dining', '餐飲', 'Dining', '🍽️', 1),
  ('supermarket', '超市', 'Supermarket', '🛒', 2),
  ('online', '網購', 'Online Shopping', '💻', 3),
  ('travel', '旅遊/外幣', 'Travel', '✈️', 4),
  ('entertainment', '娛樂', 'Entertainment', '🎬', 5),
  ('electronics', '電器/數碼', 'Electronics', '📺', 6),
  ('department_store', '百貨公司', 'Department Store', '🏬', 7),
  ('personal_care', '個人護理', 'Personal Care', '💊', 8),
  ('sports_apparel', '運動服飾', 'Sports Apparel', '👟', 9),
  ('gym', '健身', 'Gym', '🏋️', 10),
  ('transport', '交通', 'Transport', '🚇', 11),
  ('petrol', '油站', 'Petrol', '⛽', 12),
  ('convenience', '便利店', 'Convenience Store', '🏪', 13),
  ('telecom', '電訊', 'Telecom', '📱', 14),
  ('utilities', '水電煤', 'Utilities', '💡', 15),
  ('government', '政府', 'Government', '🏛️', 16),
  ('tax', '交稅', 'Tax', '📋', 17),
  ('insurance', '保險', 'Insurance', '🛡️', 18),
  ('ewallet', '電子錢包', 'E-Wallet', '📱', 19),
  ('home', '家居', 'Home', '🏠', 20),
  ('parking', '停車場', 'Parking', '🅿️', 21),
  ('tunnel_fee', '隧道費', 'Tunnel Fee', '🚗', 22),
  ('ev_charging', '電動車充電', 'EV Charging', '🔌', 23),
  ('other', '其他', 'Other', '🏪', 99)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  name_en = EXCLUDED.name_en,
  icon = EXCLUDED.icon,
  sort_order = EXCLUDED.sort_order;

-- RLS 政策
ALTER TABLE merchants ENABLE ROW LEVEL SECURITY;
ALTER TABLE merchant_categories ENABLE ROW LEVEL SECURITY;

-- 允許所有人讀取
CREATE POLICY "Allow public read merchants" ON merchants FOR SELECT USING (true);
CREATE POLICY "Allow public read merchant_categories" ON merchant_categories FOR SELECT USING (true);

-- 只允許 service role 寫入
CREATE POLICY "Allow service write merchants" ON merchants FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Allow service write merchant_categories" ON merchant_categories FOR ALL USING (auth.role() = 'service_role');

