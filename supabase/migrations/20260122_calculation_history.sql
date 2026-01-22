-- 計算歷史記錄（Web 版雲端同步）
-- 保存用戶的回贈計算記錄

CREATE TABLE IF NOT EXISTS calculation_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  -- 計算詳情
  merchant_id TEXT NOT NULL,
  merchant_name TEXT NOT NULL,
  merchant_category TEXT,
  amount DECIMAL(10, 2) NOT NULL,
  
  -- 結果
  card_id TEXT NOT NULL,
  card_name TEXT NOT NULL,
  percentage DECIMAL(5, 2) NOT NULL,
  reward_amount DECIMAL(10, 2) NOT NULL,
  payment_method TEXT,
  reward_preference TEXT DEFAULT 'cash', -- 'cash' 或 'miles'
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 創建索引
CREATE INDEX idx_calculation_history_user_id ON calculation_history(user_id);
CREATE INDEX idx_calculation_history_created_at ON calculation_history(created_at DESC);
CREATE INDEX idx_calculation_history_card_id ON calculation_history(card_id);
CREATE INDEX idx_calculation_history_merchant_id ON calculation_history(merchant_id);

-- 啟用 RLS
ALTER TABLE calculation_history ENABLE ROW LEVEL SECURITY;

-- RLS 政策：用戶只能查看自己的記錄
CREATE POLICY "Users can view their own calculation history" ON calculation_history
  FOR SELECT USING (auth.uid() = user_id);

-- RLS 政策：用戶可以創建自己的記錄
CREATE POLICY "Users can create their own calculation history" ON calculation_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS 政策：用戶可以刪除自己的記錄
CREATE POLICY "Users can delete their own calculation history" ON calculation_history
  FOR DELETE USING (auth.uid() = user_id);

