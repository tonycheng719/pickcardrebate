-- 修復 merchant_reviews 表結構，確保所有欄位都存在
-- 這是為了解決「回報提交失敗」的問題

-- 1. 添加可能缺失的欄位
ALTER TABLE public.merchant_reviews ADD COLUMN IF NOT EXISTS category_id TEXT;
ALTER TABLE public.merchant_reviews ADD COLUMN IF NOT EXISTS amount NUMERIC;
ALTER TABLE public.merchant_reviews ADD COLUMN IF NOT EXISTS card_name TEXT;
ALTER TABLE public.merchant_reviews ADD COLUMN IF NOT EXISTS user_name TEXT;
ALTER TABLE public.merchant_reviews ADD COLUMN IF NOT EXISTS report_type TEXT;
ALTER TABLE public.merchant_reviews ADD COLUMN IF NOT EXISTS conditions JSONB; -- 或者是 TEXT[]，但在 API 中我們傳入的是 array，Supabase 轉 JSONB 比較安全
ALTER TABLE public.merchant_reviews ADD COLUMN IF NOT EXISTS proposed_info JSONB;
ALTER TABLE public.merchant_reviews ADD COLUMN IF NOT EXISTS comment TEXT;

-- 2. 如果舊表使用的是 'content' 而不是 'comment'，我們做一個遷移或者兼容
-- 檢查是否有 content 欄位，如果有，將其數據複製到 comment (如果 comment 為空)
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'merchant_reviews' AND column_name = 'content') THEN
        UPDATE public.merchant_reviews SET comment = content WHERE comment IS NULL;
    END IF;
END $$;

-- 3. 再次確保權限 (以防萬一)
GRANT ALL ON public.merchant_reviews TO anon, authenticated, service_role;



