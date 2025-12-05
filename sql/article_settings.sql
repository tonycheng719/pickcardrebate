-- 文章設定表 (用於覆蓋靜態資料如封面圖片)
CREATE TABLE IF NOT EXISTS article_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id TEXT NOT NULL UNIQUE,
  cover_image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 創建索引
CREATE INDEX IF NOT EXISTS idx_article_settings_article_id ON article_settings(article_id);

-- 啟用 RLS
ALTER TABLE article_settings ENABLE ROW LEVEL SECURITY;

-- RLS 政策 - 允許 service role 完全存取
CREATE POLICY "Service role full access on article_settings" ON article_settings
  FOR ALL USING (true) WITH CHECK (true);

-- 範例：手動更新特定文章封面
-- INSERT INTO article_settings (article_id, cover_image_url)
-- VALUES ('overseas-fee', 'https://example.com/new-image.jpg')
-- ON CONFLICT (article_id) 
-- DO UPDATE SET cover_image_url = EXCLUDED.cover_image_url, updated_at = NOW();

