-- 修復 merchant_reviews 表結構：添加缺失的 rating 欄位
-- 錯誤訊息顯示: "Could not find the 'rating' column of 'merchant_reviews' in the schema cache"

-- 1. 添加 rating 欄位 (如果是評論系統，這通常是必須的)
ALTER TABLE public.merchant_reviews ADD COLUMN IF NOT EXISTS rating INTEGER DEFAULT 0;

-- 2. 再次確認其他欄位 (以防萬一)
ALTER TABLE public.merchant_reviews ADD COLUMN IF NOT EXISTS category_id TEXT;
ALTER TABLE public.merchant_reviews ADD COLUMN IF NOT EXISTS amount NUMERIC;
ALTER TABLE public.merchant_reviews ADD COLUMN IF NOT EXISTS card_name TEXT;
ALTER TABLE public.merchant_reviews ADD COLUMN IF NOT EXISTS user_name TEXT;
ALTER TABLE public.merchant_reviews ADD COLUMN IF NOT EXISTS report_type TEXT;
ALTER TABLE public.merchant_reviews ADD COLUMN IF NOT EXISTS conditions JSONB;
ALTER TABLE public.merchant_reviews ADD COLUMN IF NOT EXISTS proposed_info JSONB;
ALTER TABLE public.merchant_reviews ADD COLUMN IF NOT EXISTS comment TEXT;

-- 3. 強制刷新 Supabase/PostgREST 的 Schema Cache
-- 這是解決 "in the schema cache" 錯誤的關鍵
NOTIFY pgrst, 'reload schema';

-- 4. 再次確保權限
GRANT ALL ON public.merchant_reviews TO anon, authenticated, service_role;

