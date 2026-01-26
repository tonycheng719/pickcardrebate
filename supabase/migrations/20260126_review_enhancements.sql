-- 評論優化遷移
-- 增加多維度評分、標籤系統、有用投票、官方回覆

-- 0. 確保 card_ratings 表存在
CREATE TABLE IF NOT EXISTS card_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(card_id, user_id)
);

-- 1. 擴充 card_ratings 表格，增加多維度評分（分開執行避免錯誤）
DO $$ 
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'card_ratings' AND column_name = 'rating_rebate') THEN
    ALTER TABLE card_ratings ADD COLUMN rating_rebate INTEGER CHECK (rating_rebate >= 1 AND rating_rebate <= 5);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'card_ratings' AND column_name = 'rating_service') THEN
    ALTER TABLE card_ratings ADD COLUMN rating_service INTEGER CHECK (rating_service >= 1 AND rating_service <= 5);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'card_ratings' AND column_name = 'rating_app') THEN
    ALTER TABLE card_ratings ADD COLUMN rating_app INTEGER CHECK (rating_app >= 1 AND rating_app <= 5);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'card_ratings' AND column_name = 'rating_welcome') THEN
    ALTER TABLE card_ratings ADD COLUMN rating_welcome INTEGER CHECK (rating_welcome >= 1 AND rating_welcome <= 5);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'card_ratings' AND column_name = 'tags') THEN
    ALTER TABLE card_ratings ADD COLUMN tags TEXT[] DEFAULT '{}';
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'card_ratings' AND column_name = 'helpful_count') THEN
    ALTER TABLE card_ratings ADD COLUMN helpful_count INTEGER DEFAULT 0;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'card_ratings' AND column_name = 'is_verified') THEN
    ALTER TABLE card_ratings ADD COLUMN is_verified BOOLEAN DEFAULT FALSE;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'card_ratings' AND column_name = 'status') THEN
    ALTER TABLE card_ratings ADD COLUMN status TEXT DEFAULT 'approved';
  END IF;
END $$;

-- 2. 創建評論投票表
CREATE TABLE IF NOT EXISTS review_votes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rating_id UUID NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  is_helpful BOOLEAN NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 添加外鍵約束（如果不存在）
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'review_votes_rating_id_fkey'
  ) THEN
    ALTER TABLE review_votes ADD CONSTRAINT review_votes_rating_id_fkey 
      FOREIGN KEY (rating_id) REFERENCES card_ratings(id) ON DELETE CASCADE;
  END IF;
END $$;

-- 添加唯一約束（如果不存在）
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'review_votes_rating_id_user_id_key'
  ) THEN
    ALTER TABLE review_votes ADD CONSTRAINT review_votes_rating_id_user_id_key UNIQUE (rating_id, user_id);
  END IF;
END $$;

-- 3. 創建評論回覆表
CREATE TABLE IF NOT EXISTS review_replies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rating_id UUID NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_official BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 添加外鍵約束（如果不存在）
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'review_replies_rating_id_fkey'
  ) THEN
    ALTER TABLE review_replies ADD CONSTRAINT review_replies_rating_id_fkey 
      FOREIGN KEY (rating_id) REFERENCES card_ratings(id) ON DELETE CASCADE;
  END IF;
END $$;

-- 4. 創建預設標籤表
CREATE TABLE IF NOT EXISTS review_tags (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category TEXT, -- 'positive', 'negative', 'neutral'
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE
);

-- 插入預設標籤
INSERT INTO review_tags (id, name, category, sort_order) VALUES
  ('high_rebate', '回贈高', 'positive', 1),
  ('stable_rebate', '回贈穩定', 'positive', 2),
  ('welcome_offer', '迎新豐富', 'positive', 3),
  ('easy_apply', '申請容易', 'positive', 4),
  ('good_app', 'App好用', 'positive', 5),
  ('good_service', '服務好', 'positive', 6),
  ('no_annual_fee', '免年費', 'positive', 7),
  ('low_rebate', '回贈低', 'negative', 10),
  ('complex_rules', '條款複雜', 'negative', 11),
  ('bad_service', '服務差', 'negative', 12),
  ('bad_app', 'App難用', 'negative', 13),
  ('high_annual_fee', '年費貴', 'negative', 14)
ON CONFLICT (id) DO NOTHING;

-- 5. 索引（使用 DO 塊確保安全）
DO $$
BEGIN
  -- review_votes 索引
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_review_votes_rating') THEN
    CREATE INDEX idx_review_votes_rating ON review_votes(rating_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_review_votes_user') THEN
    CREATE INDEX idx_review_votes_user ON review_votes(user_id);
  END IF;
  -- review_replies 索引
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_review_replies_rating') THEN
    CREATE INDEX idx_review_replies_rating ON review_replies(rating_id);
  END IF;
  -- card_ratings 索引
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_card_ratings_status') THEN
    CREATE INDEX idx_card_ratings_status ON card_ratings(status);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_indexes WHERE indexname = 'idx_card_ratings_helpful') THEN
    CREATE INDEX idx_card_ratings_helpful ON card_ratings(helpful_count DESC);
  END IF;
END $$;

-- 6. RLS 政策
ALTER TABLE review_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_replies ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_tags ENABLE ROW LEVEL SECURITY;

-- review_votes RLS (使用 IF NOT EXISTS 邏輯)
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Anyone can view votes count' AND tablename = 'review_votes') THEN
    CREATE POLICY "Anyone can view votes count" ON review_votes FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can vote' AND tablename = 'review_votes') THEN
    CREATE POLICY "Users can vote" ON review_votes FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can change their vote' AND tablename = 'review_votes') THEN
    CREATE POLICY "Users can change their vote" ON review_votes FOR UPDATE USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can remove their vote' AND tablename = 'review_votes') THEN
    CREATE POLICY "Users can remove their vote" ON review_votes FOR DELETE USING (auth.uid() = user_id);
  END IF;
END $$;

-- review_replies RLS
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Anyone can view replies' AND tablename = 'review_replies') THEN
    CREATE POLICY "Anyone can view replies" ON review_replies FOR SELECT USING (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can create replies' AND tablename = 'review_replies') THEN
    CREATE POLICY "Users can create replies" ON review_replies FOR INSERT WITH CHECK (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can update own replies' AND tablename = 'review_replies') THEN
    CREATE POLICY "Users can update own replies" ON review_replies FOR UPDATE USING (auth.uid() = user_id);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Users can delete own replies' AND tablename = 'review_replies') THEN
    CREATE POLICY "Users can delete own replies" ON review_replies FOR DELETE USING (auth.uid() = user_id);
  END IF;
END $$;

-- review_tags RLS
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Anyone can view tags' AND tablename = 'review_tags') THEN
    CREATE POLICY "Anyone can view tags" ON review_tags FOR SELECT USING (true);
  END IF;
END $$;

-- 7. 更新 helpful_count 的觸發器
CREATE OR REPLACE FUNCTION update_review_helpful_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE card_ratings 
    SET helpful_count = helpful_count + (CASE WHEN NEW.is_helpful THEN 1 ELSE 0 END)
    WHERE id = NEW.rating_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE card_ratings 
    SET helpful_count = helpful_count - (CASE WHEN OLD.is_helpful THEN 1 ELSE 0 END)
    WHERE id = OLD.rating_id;
  ELSIF TG_OP = 'UPDATE' THEN
    IF OLD.is_helpful <> NEW.is_helpful THEN
      UPDATE card_ratings 
      SET helpful_count = helpful_count + (CASE WHEN NEW.is_helpful THEN 1 ELSE -1 END)
      WHERE id = NEW.rating_id;
    END IF;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS review_vote_helpful_count ON review_votes;
CREATE TRIGGER review_vote_helpful_count
  AFTER INSERT OR UPDATE OR DELETE ON review_votes
  FOR EACH ROW
  EXECUTE FUNCTION update_review_helpful_count();

-- 8. 更新卡片評分統計視圖，加入多維度評分
DROP VIEW IF EXISTS card_rating_stats;
CREATE VIEW card_rating_stats AS
SELECT 
  card_id,
  COUNT(*) as total_ratings,
  ROUND(AVG(rating)::numeric, 2) as average_rating,
  ROUND(AVG(rating_rebate)::numeric, 2) as avg_rating_rebate,
  ROUND(AVG(rating_service)::numeric, 2) as avg_rating_service,
  ROUND(AVG(rating_app)::numeric, 2) as avg_rating_app,
  ROUND(AVG(rating_welcome)::numeric, 2) as avg_rating_welcome,
  COUNT(CASE WHEN rating = 5 THEN 1 END) as five_star,
  COUNT(CASE WHEN rating = 4 THEN 1 END) as four_star,
  COUNT(CASE WHEN rating = 3 THEN 1 END) as three_star,
  COUNT(CASE WHEN rating = 2 THEN 1 END) as two_star,
  COUNT(CASE WHEN rating = 1 THEN 1 END) as one_star
FROM card_ratings
WHERE status = 'approved'
GROUP BY card_id;

