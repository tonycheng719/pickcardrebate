-- 創建文章評論表 (article_comments)
CREATE TABLE IF NOT EXISTS article_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_name TEXT,
  user_avatar TEXT,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_by TEXT,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 創建索引
CREATE INDEX IF NOT EXISTS idx_article_comments_article_id ON article_comments(article_id);
CREATE INDEX IF NOT EXISTS idx_article_comments_user_id ON article_comments(user_id);
CREATE INDEX IF NOT EXISTS idx_article_comments_created_at ON article_comments(created_at DESC);

-- 啟用 RLS
ALTER TABLE article_comments ENABLE ROW LEVEL SECURITY;

-- RLS 策略：所有人可讀取未刪除的評論
CREATE POLICY "Anyone can read visible article comments" ON article_comments
  FOR SELECT USING (is_deleted = FALSE);

-- RLS 策略：用戶可以創建自己的評論
CREATE POLICY "Users can create own article comments" ON article_comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- RLS 策略：用戶可以軟刪除自己的評論
CREATE POLICY "Users can soft delete own article comments" ON article_comments
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS 策略：Service role 完全訪問
CREATE POLICY "Service role full access to article_comments" ON article_comments
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- ============================================

-- 創建信用卡評論表 (card_comments)
CREATE TABLE IF NOT EXISTS card_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  card_id TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_name TEXT,
  user_avatar TEXT,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_by TEXT,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 創建索引
CREATE INDEX IF NOT EXISTS idx_card_comments_card_id ON card_comments(card_id);
CREATE INDEX IF NOT EXISTS idx_card_comments_user_id ON card_comments(user_id);
CREATE INDEX IF NOT EXISTS idx_card_comments_created_at ON card_comments(created_at DESC);

-- 啟用 RLS
ALTER TABLE card_comments ENABLE ROW LEVEL SECURITY;

-- RLS 策略
CREATE POLICY "Anyone can read visible card comments" ON card_comments
  FOR SELECT USING (is_deleted = FALSE);

CREATE POLICY "Users can create own card comments" ON card_comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can soft delete own card comments" ON card_comments
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Service role full access to card_comments" ON card_comments
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

-- ============================================

-- 創建優惠活動評論表 (promo_comments)
CREATE TABLE IF NOT EXISTS promo_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  promo_id TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  user_name TEXT,
  user_avatar TEXT,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_by TEXT,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 創建索引
CREATE INDEX IF NOT EXISTS idx_promo_comments_promo_id ON promo_comments(promo_id);
CREATE INDEX IF NOT EXISTS idx_promo_comments_user_id ON promo_comments(user_id);
CREATE INDEX IF NOT EXISTS idx_promo_comments_created_at ON promo_comments(created_at DESC);

-- 啟用 RLS
ALTER TABLE promo_comments ENABLE ROW LEVEL SECURITY;

-- RLS 策略
CREATE POLICY "Anyone can read visible promo comments" ON promo_comments
  FOR SELECT USING (is_deleted = FALSE);

CREATE POLICY "Users can create own promo comments" ON promo_comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can soft delete own promo comments" ON promo_comments
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Service role full access to promo_comments" ON promo_comments
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

