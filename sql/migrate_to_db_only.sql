-- ============================================================
-- 遷移腳本：將所有文章統一存放到 promos 表
-- ============================================================

-- 1. 添加新欄位
ALTER TABLE public.promos ADD COLUMN IF NOT EXISTS content_type TEXT DEFAULT 'promo';
ALTER TABLE public.promos ADD COLUMN IF NOT EXISTS is_new BOOLEAN DEFAULT false;
ALTER TABLE public.promos ADD COLUMN IF NOT EXISTS view_count INTEGER DEFAULT 0;

-- 2. 更新現有數據的 content_type 為 'promo'
UPDATE public.promos SET content_type = 'promo' WHERE content_type IS NULL;

-- 3. 創建索引以優化查詢
CREATE INDEX IF NOT EXISTS idx_promos_content_type ON public.promos(content_type);
CREATE INDEX IF NOT EXISTS idx_promos_expiry_date ON public.promos(expiry_date);
CREATE INDEX IF NOT EXISTS idx_promos_is_pinned ON public.promos(is_pinned);
CREATE INDEX IF NOT EXISTS idx_promos_updated_at ON public.promos(updated_at);

-- 4. 確保 RLS 政策允許讀取
DROP POLICY IF EXISTS "Promos are viewable by everyone." ON public.promos;
CREATE POLICY "Promos are viewable by everyone." ON public.promos FOR SELECT USING (true);

-- 5. 確保 service_role 有完整權限（用於 API 寫入）
GRANT ALL ON public.promos TO service_role;
GRANT ALL ON public.promos TO anon;
GRANT ALL ON public.promos TO authenticated;

-- 6. 驗證欄位
SELECT column_name, data_type, column_default
FROM information_schema.columns 
WHERE table_name = 'promos' 
ORDER BY ordinal_position;

