-- 創建文章評論表 (article_comments)
CREATE TABLE IF NOT EXISTS article_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id TEXT NOT NULL,
  user_id UUID NOT NULL,
  user_name TEXT,
  user_avatar TEXT,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_by TEXT,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_article_comments_article_id ON article_comments(article_id);
CREATE INDEX IF NOT EXISTS idx_article_comments_user_id ON article_comments(user_id);

ALTER TABLE article_comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "article_comments_select" ON article_comments;
CREATE POLICY "article_comments_select" ON article_comments FOR SELECT USING (true);

DROP POLICY IF EXISTS "article_comments_insert" ON article_comments;
CREATE POLICY "article_comments_insert" ON article_comments FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "article_comments_update" ON article_comments;
CREATE POLICY "article_comments_update" ON article_comments FOR UPDATE USING (true);

DROP POLICY IF EXISTS "article_comments_delete" ON article_comments;
CREATE POLICY "article_comments_delete" ON article_comments FOR DELETE USING (true);

-- 創建信用卡評論表 (card_comments)
CREATE TABLE IF NOT EXISTS card_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  card_id TEXT NOT NULL,
  user_id UUID NOT NULL,
  user_name TEXT,
  user_avatar TEXT,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_by TEXT,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_card_comments_card_id ON card_comments(card_id);
CREATE INDEX IF NOT EXISTS idx_card_comments_user_id ON card_comments(user_id);

ALTER TABLE card_comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "card_comments_select" ON card_comments;
CREATE POLICY "card_comments_select" ON card_comments FOR SELECT USING (true);

DROP POLICY IF EXISTS "card_comments_insert" ON card_comments;
CREATE POLICY "card_comments_insert" ON card_comments FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "card_comments_update" ON card_comments;
CREATE POLICY "card_comments_update" ON card_comments FOR UPDATE USING (true);

DROP POLICY IF EXISTS "card_comments_delete" ON card_comments;
CREATE POLICY "card_comments_delete" ON card_comments FOR DELETE USING (true);

-- 創建優惠活動評論表 (promo_comments)
CREATE TABLE IF NOT EXISTS promo_comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  promo_id TEXT NOT NULL,
  user_id UUID NOT NULL,
  user_name TEXT,
  user_avatar TEXT,
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  is_deleted BOOLEAN DEFAULT FALSE,
  deleted_by TEXT,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_promo_comments_promo_id ON promo_comments(promo_id);
CREATE INDEX IF NOT EXISTS idx_promo_comments_user_id ON promo_comments(user_id);

ALTER TABLE promo_comments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "promo_comments_select" ON promo_comments;
CREATE POLICY "promo_comments_select" ON promo_comments FOR SELECT USING (true);

DROP POLICY IF EXISTS "promo_comments_insert" ON promo_comments;
CREATE POLICY "promo_comments_insert" ON promo_comments FOR INSERT WITH CHECK (true);

DROP POLICY IF EXISTS "promo_comments_update" ON promo_comments;
CREATE POLICY "promo_comments_update" ON promo_comments FOR UPDATE USING (true);

DROP POLICY IF EXISTS "promo_comments_delete" ON promo_comments;
CREATE POLICY "promo_comments_delete" ON promo_comments FOR DELETE USING (true);
