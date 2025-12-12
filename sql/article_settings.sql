-- 文章設定表 (用於覆蓋靜態資料如封面圖片、分類、標籤)
CREATE TABLE IF NOT EXISTS article_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id TEXT NOT NULL UNIQUE,
  cover_image_url TEXT,
  content_type TEXT CHECK (content_type IN ('guide', 'promo')),
  custom_tags TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 創建索引
CREATE INDEX IF NOT EXISTS idx_article_settings_article_id ON article_settings(article_id);
CREATE INDEX IF NOT EXISTS idx_article_settings_content_type ON article_settings(content_type);

-- 啟用 RLS
ALTER TABLE article_settings ENABLE ROW LEVEL SECURITY;

-- RLS 政策 - 允許 service role 完全存取
CREATE POLICY "Service role full access on article_settings" ON article_settings
  FOR ALL USING (true) WITH CHECK (true);

-- =====================================================
-- 如果表已存在，執行以下來新增欄位：
-- =====================================================
-- ALTER TABLE article_settings ADD COLUMN IF NOT EXISTS content_type TEXT CHECK (content_type IN ('guide', 'promo'));
-- ALTER TABLE article_settings ADD COLUMN IF NOT EXISTS custom_tags TEXT[];
-- CREATE INDEX IF NOT EXISTS idx_article_settings_content_type ON article_settings(content_type);

-- 範例：更新文章分類和標籤
-- INSERT INTO article_settings (article_id, content_type, custom_tags)
-- VALUES ('bea-jcb-contactless-2025', 'promo', ARRAY['Apple Pay', '15%回贈', '限時優惠'])
-- ON CONFLICT (article_id) 
-- DO UPDATE SET 
--   content_type = EXCLUDED.content_type, 
--   custom_tags = EXCLUDED.custom_tags,
--   updated_at = NOW();

