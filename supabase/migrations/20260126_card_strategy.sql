-- 多卡策略規劃功能
-- 用戶可以儲存消費習慣並獲得最佳卡組合推薦

-- 1. 用戶消費習慣檔案
CREATE TABLE IF NOT EXISTS user_spending_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT DEFAULT '我的消費習慣',
  
  -- 月消費金額
  supermarket_monthly INTEGER DEFAULT 0,    -- 超市
  dining_monthly INTEGER DEFAULT 0,         -- 餐飲
  online_monthly INTEGER DEFAULT 0,         -- 網購
  transport_monthly INTEGER DEFAULT 0,      -- 交通
  overseas_monthly INTEGER DEFAULT 0,       -- 海外/旅遊
  entertainment_monthly INTEGER DEFAULT 0,  -- 娛樂
  utilities_monthly INTEGER DEFAULT 0,      -- 水電煤
  other_monthly INTEGER DEFAULT 0,          -- 其他
  
  -- 偏好設定
  prefer_miles BOOLEAN DEFAULT FALSE,
  no_annual_fee_only BOOLEAN DEFAULT FALSE,
  max_cards INTEGER DEFAULT 3,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  UNIQUE(user_id)  -- 每用戶只有一個檔案
);

-- 2. 用戶儲存的卡組合策略
CREATE TABLE IF NOT EXISTS card_strategies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  profile_id UUID REFERENCES user_spending_profiles(id) ON DELETE CASCADE,
  
  strategy_name TEXT NOT NULL,
  card_ids TEXT[] NOT NULL,
  
  -- 類別分配: {"supermarket": "hsbc-red", "dining": "sc-smart", ...}
  category_allocations JSONB NOT NULL,
  
  -- 預計回贈
  estimated_monthly_reward DECIMAL(10,2),
  estimated_yearly_reward DECIMAL(10,2),
  
  -- 與單卡策略比較
  single_card_reward DECIMAL(10,2),
  improvement_percentage DECIMAL(5,2),
  
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. 索引
CREATE INDEX IF NOT EXISTS idx_spending_profiles_user ON user_spending_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_card_strategies_user ON card_strategies(user_id);
CREATE INDEX IF NOT EXISTS idx_card_strategies_profile ON card_strategies(profile_id);

-- 4. RLS 政策
ALTER TABLE user_spending_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE card_strategies ENABLE ROW LEVEL SECURITY;

-- user_spending_profiles RLS
CREATE POLICY "Users can view own profiles" ON user_spending_profiles 
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own profiles" ON user_spending_profiles 
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profiles" ON user_spending_profiles 
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own profiles" ON user_spending_profiles 
  FOR DELETE USING (auth.uid() = user_id);

-- card_strategies RLS
CREATE POLICY "Users can view own strategies" ON card_strategies 
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own strategies" ON card_strategies 
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own strategies" ON card_strategies 
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own strategies" ON card_strategies 
  FOR DELETE USING (auth.uid() = user_id);

-- 5. 更新 updated_at 觸發器
CREATE OR REPLACE FUNCTION update_spending_profile_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS spending_profile_updated_at ON user_spending_profiles;
CREATE TRIGGER spending_profile_updated_at
  BEFORE UPDATE ON user_spending_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_spending_profile_updated_at();

