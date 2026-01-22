-- 卡片評分系統
-- 用戶可對信用卡評分 1-5 星

-- 創建卡片評分表
CREATE TABLE IF NOT EXISTS card_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- 每個用戶只能對每張卡評分一次
  UNIQUE(card_id, user_id)
);

-- 創建索引
CREATE INDEX idx_card_ratings_card_id ON card_ratings(card_id);
CREATE INDEX idx_card_ratings_user_id ON card_ratings(user_id);
CREATE INDEX idx_card_ratings_rating ON card_ratings(rating);

-- 啟用 RLS
ALTER TABLE card_ratings ENABLE ROW LEVEL SECURITY;

-- RLS 政策：用戶可以讀取所有評分
CREATE POLICY "Anyone can view card ratings" ON card_ratings
  FOR SELECT USING (true);

-- RLS 政策：登入用戶可以創建自己的評分
CREATE POLICY "Users can create their own ratings" ON card_ratings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS 政策：用戶可以更新自己的評分
CREATE POLICY "Users can update their own ratings" ON card_ratings
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS 政策：用戶可以刪除自己的評分
CREATE POLICY "Users can delete their own ratings" ON card_ratings
  FOR DELETE USING (auth.uid() = user_id);

-- 創建卡片評分統計視圖
CREATE OR REPLACE VIEW card_rating_stats AS
SELECT 
  card_id,
  COUNT(*) as total_ratings,
  ROUND(AVG(rating)::numeric, 2) as average_rating,
  COUNT(CASE WHEN rating = 5 THEN 1 END) as five_star,
  COUNT(CASE WHEN rating = 4 THEN 1 END) as four_star,
  COUNT(CASE WHEN rating = 3 THEN 1 END) as three_star,
  COUNT(CASE WHEN rating = 2 THEN 1 END) as two_star,
  COUNT(CASE WHEN rating = 1 THEN 1 END) as one_star
FROM card_ratings
GROUP BY card_id;

