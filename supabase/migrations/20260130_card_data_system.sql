-- ============================================================================
-- Card Data System Migration
-- 將 cards.ts, card-terms.ts, promos.ts 的數據遷移到資料庫
-- ============================================================================

-- ============================================================================
-- 1. 信用卡主表 (db_cards)
-- ============================================================================
CREATE TABLE IF NOT EXISTS db_cards (
  id TEXT PRIMARY KEY,                          -- e.g., "hsbc-visa-signature"
  name TEXT NOT NULL,                           -- e.g., "HSBC Visa Signature"
  bank TEXT NOT NULL,                           -- e.g., "HSBC"
  image_url TEXT,                               -- Card image URL
  card_type TEXT DEFAULT 'credit',              -- credit, debit, prepaid
  network TEXT,                                 -- visa, mastercard, unionpay, amex, jcb
  annual_fee INTEGER DEFAULT 0,                 -- Annual fee in HKD
  fee_waiver_condition TEXT,                    -- e.g., "簽滿 $12 萬免年費"
  min_income INTEGER,                           -- Minimum income requirement
  apply_url TEXT,                               -- Official apply URL
  partner_apply_url TEXT,                       -- Partner (e.g., MoneyHero) apply URL
  style JSONB DEFAULT '{}',                     -- { bgColor, textColor, etc. }
  reward_config JSONB DEFAULT '{}',             -- { method, ratio, currency }
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for common queries
CREATE INDEX IF NOT EXISTS idx_db_cards_bank ON db_cards(bank);
CREATE INDEX IF NOT EXISTS idx_db_cards_is_active ON db_cards(is_active);

-- ============================================================================
-- 2. 計算規則表 (db_card_rules)
-- ============================================================================
CREATE TABLE IF NOT EXISTS db_card_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id TEXT NOT NULL REFERENCES db_cards(id) ON DELETE CASCADE,
  description TEXT NOT NULL,                    -- e.g., "最紅自主 賞世界 3.6%"
  match_type TEXT NOT NULL DEFAULT 'base',      -- base, category, merchant, payment
  categories TEXT[] DEFAULT '{}',               -- e.g., ["overseas", "dining"]
  merchants TEXT[] DEFAULT '{}',                -- e.g., ["wellcome", "parknshop"]
  payment_methods TEXT[] DEFAULT '{}',          -- e.g., ["apple_pay", "google_pay"]
  percentage DECIMAL(5,2) NOT NULL,             -- Reward percentage, e.g., 3.6
  cap INTEGER,                                  -- Cap amount
  cap_type TEXT DEFAULT 'reward',               -- reward, spending
  cap_period TEXT DEFAULT 'monthly',            -- monthly, quarterly, annual, transaction
  min_spend INTEGER,                            -- Minimum spend to activate
  min_spend_period TEXT,                        -- monthly, quarterly, etc.
  exclude_categories TEXT[] DEFAULT '{}',       -- Categories to exclude
  valid_from DATE,                              -- Rule valid from date
  valid_until DATE,                             -- Rule valid until date
  priority INTEGER DEFAULT 0,                   -- Higher = checked first
  requires_registration BOOLEAN DEFAULT false,  -- Needs to register for this reward
  registration_url TEXT,                        -- URL to register
  notes TEXT,                                   -- Additional notes
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_db_card_rules_card_id ON db_card_rules(card_id);
CREATE INDEX IF NOT EXISTS idx_db_card_rules_is_active ON db_card_rules(is_active);
CREATE INDEX IF NOT EXISTS idx_db_card_rules_valid_until ON db_card_rules(valid_until);

-- ============================================================================
-- 3. 卡片備註/提醒表 (db_card_notes)
-- ============================================================================
CREATE TABLE IF NOT EXISTS db_card_notes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id TEXT NOT NULL REFERENCES db_cards(id) ON DELETE CASCADE,
  content TEXT NOT NULL,                        -- Note content (can include markdown links)
  note_type TEXT DEFAULT 'promo',               -- promo, warning, info
  valid_from DATE,
  valid_until DATE,
  priority INTEGER DEFAULT 0,                   -- Higher = shown first
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_db_card_notes_card_id ON db_card_notes(card_id);
CREATE INDEX IF NOT EXISTS idx_db_card_notes_valid_until ON db_card_notes(valid_until);

-- ============================================================================
-- 4. 優惠文章表 (db_promos)
-- ============================================================================
CREATE TABLE IF NOT EXISTS db_promos (
  id TEXT PRIMARY KEY,                          -- e.g., "ae-ok-convenience-store-2026"
  slug TEXT UNIQUE,                             -- URL slug (if different from id)
  title TEXT NOT NULL,
  merchant TEXT,
  description TEXT,
  content TEXT,                                 -- Markdown content
  image_url TEXT,
  expiry_date DATE,
  is_pinned BOOLEAN DEFAULT false,
  pinned_until DATE,
  sort_order INTEGER DEFAULT 0,
  tags TEXT[] DEFAULT '{}',
  url TEXT,                                     -- External URL if any
  seo_title TEXT,
  seo_description TEXT,
  view_count INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  is_guide BOOLEAN DEFAULT false,               -- Is this a guide (rendered from component)?
  guide_component TEXT,                         -- Component name if is_guide=true
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_db_promos_expiry_date ON db_promos(expiry_date);
CREATE INDEX IF NOT EXISTS idx_db_promos_is_active ON db_promos(is_active);
CREATE INDEX IF NOT EXISTS idx_db_promos_is_pinned ON db_promos(is_pinned);

-- ============================================================================
-- 5. 優惠 FAQ 表 (db_promo_faqs)
-- ============================================================================
CREATE TABLE IF NOT EXISTS db_promo_faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  promo_id TEXT NOT NULL REFERENCES db_promos(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_db_promo_faqs_promo_id ON db_promo_faqs(promo_id);

-- ============================================================================
-- 6. 優惠-卡片關聯表 (db_promo_cards)
-- ============================================================================
CREATE TABLE IF NOT EXISTS db_promo_cards (
  promo_id TEXT NOT NULL REFERENCES db_promos(id) ON DELETE CASCADE,
  card_id TEXT NOT NULL REFERENCES db_cards(id) ON DELETE CASCADE,
  PRIMARY KEY (promo_id, card_id)
);

CREATE INDEX IF NOT EXISTS idx_db_promo_cards_card_id ON db_promo_cards(card_id);

-- ============================================================================
-- 7. 數據更新日誌表 (db_data_audit_log)
-- ============================================================================
CREATE TABLE IF NOT EXISTS db_data_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name TEXT NOT NULL,
  record_id TEXT NOT NULL,
  action TEXT NOT NULL,                         -- create, update, delete
  old_data JSONB,
  new_data JSONB,
  changed_by UUID REFERENCES auth.users(id),
  changed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_db_data_audit_log_table ON db_data_audit_log(table_name);
CREATE INDEX IF NOT EXISTS idx_db_data_audit_log_record ON db_data_audit_log(record_id);

-- ============================================================================
-- 8. RLS Policies
-- ============================================================================

-- Enable RLS
ALTER TABLE db_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE db_card_rules ENABLE ROW LEVEL SECURITY;
ALTER TABLE db_card_notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE db_promos ENABLE ROW LEVEL SECURITY;
ALTER TABLE db_promo_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE db_promo_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE db_data_audit_log ENABLE ROW LEVEL SECURITY;

-- Public read access for all card/promo data
CREATE POLICY "Public read access for db_cards" ON db_cards FOR SELECT USING (true);
CREATE POLICY "Public read access for db_card_rules" ON db_card_rules FOR SELECT USING (true);
CREATE POLICY "Public read access for db_card_notes" ON db_card_notes FOR SELECT USING (true);
CREATE POLICY "Public read access for db_promos" ON db_promos FOR SELECT USING (true);
CREATE POLICY "Public read access for db_promo_faqs" ON db_promo_faqs FOR SELECT USING (true);
CREATE POLICY "Public read access for db_promo_cards" ON db_promo_cards FOR SELECT USING (true);

-- Admin write access (using service role or admin users)
-- For now, allow authenticated users to write (can be restricted later)
CREATE POLICY "Admin write access for db_cards" ON db_cards FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write access for db_card_rules" ON db_card_rules FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write access for db_card_notes" ON db_card_notes FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write access for db_promos" ON db_promos FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write access for db_promo_faqs" ON db_promo_faqs FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write access for db_promo_cards" ON db_promo_cards FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin write access for db_data_audit_log" ON db_data_audit_log FOR ALL USING (auth.role() = 'authenticated');

-- ============================================================================
-- 9. Trigger for updated_at
-- ============================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_db_cards_updated_at BEFORE UPDATE ON db_cards
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_db_card_rules_updated_at BEFORE UPDATE ON db_card_rules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_db_card_notes_updated_at BEFORE UPDATE ON db_card_notes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_db_promos_updated_at BEFORE UPDATE ON db_promos
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- 10. Helper Views
-- ============================================================================

-- View: Active cards with rule count
CREATE OR REPLACE VIEW v_cards_summary AS
SELECT 
  c.*,
  COUNT(r.id) FILTER (WHERE r.is_active = true) as active_rule_count,
  COUNT(n.id) FILTER (WHERE n.is_active = true AND (n.valid_until IS NULL OR n.valid_until >= CURRENT_DATE)) as active_note_count
FROM db_cards c
LEFT JOIN db_card_rules r ON c.id = r.card_id
LEFT JOIN db_card_notes n ON c.id = n.card_id
WHERE c.is_active = true
GROUP BY c.id;

-- View: Expiring rules (within 7 days)
CREATE OR REPLACE VIEW v_expiring_rules AS
SELECT 
  r.*,
  c.name as card_name,
  c.bank as card_bank,
  r.valid_until - CURRENT_DATE as days_until_expiry
FROM db_card_rules r
JOIN db_cards c ON r.card_id = c.id
WHERE r.is_active = true
  AND r.valid_until IS NOT NULL
  AND r.valid_until BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '7 days'
ORDER BY r.valid_until;

-- View: Expired rules (past 7 days, for cleanup)
CREATE OR REPLACE VIEW v_expired_rules AS
SELECT 
  r.*,
  c.name as card_name,
  c.bank as card_bank,
  CURRENT_DATE - r.valid_until as days_expired
FROM db_card_rules r
JOIN db_cards c ON r.card_id = c.id
WHERE r.valid_until IS NOT NULL
  AND r.valid_until < CURRENT_DATE - INTERVAL '7 days'
ORDER BY r.valid_until DESC;

-- View: Active promos
CREATE OR REPLACE VIEW v_active_promos AS
SELECT 
  p.*,
  ARRAY_AGG(DISTINCT pc.card_id) FILTER (WHERE pc.card_id IS NOT NULL) as related_card_ids
FROM db_promos p
LEFT JOIN db_promo_cards pc ON p.id = pc.promo_id
WHERE p.is_active = true
  AND (p.expiry_date IS NULL OR p.expiry_date >= CURRENT_DATE)
GROUP BY p.id
ORDER BY 
  CASE WHEN p.is_pinned AND (p.pinned_until IS NULL OR p.pinned_until >= CURRENT_DATE) THEN 0 ELSE 1 END,
  p.sort_order DESC,
  p.updated_at DESC;

-- View: Expiring promos
CREATE OR REPLACE VIEW v_expiring_promos AS
SELECT 
  p.*,
  p.expiry_date - CURRENT_DATE as days_until_expiry
FROM db_promos p
WHERE p.is_active = true
  AND p.expiry_date IS NOT NULL
  AND p.expiry_date BETWEEN CURRENT_DATE AND CURRENT_DATE + INTERVAL '7 days'
ORDER BY p.expiry_date;

COMMENT ON TABLE db_cards IS '信用卡主表 - 儲存所有信用卡基本資料';
COMMENT ON TABLE db_card_rules IS '計算規則表 - 儲存回贈計算規則';
COMMENT ON TABLE db_card_notes IS '卡片備註表 - 儲存卡片的臨時優惠提醒';
COMMENT ON TABLE db_promos IS '優惠文章表 - 儲存優惠文章內容';
COMMENT ON TABLE db_promo_faqs IS 'FAQ 表 - 儲存文章的常見問題';
COMMENT ON TABLE db_promo_cards IS '優惠-卡片關聯表 - 記錄哪些卡片適用於哪個優惠';
COMMENT ON TABLE db_data_audit_log IS '數據審計日誌 - 追蹤所有數據變更';

