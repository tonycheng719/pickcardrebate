-- Multi-language support for cards and promos
-- Supports: zh-HK (Traditional Chinese, default), zh-CN (Simplified Chinese), en (English)

-- =============================================
-- 1. Cards table multi-language columns
-- =============================================
ALTER TABLE public.cards ADD COLUMN IF NOT EXISTS name_en TEXT;
ALTER TABLE public.cards ADD COLUMN IF NOT EXISTS name_zh_cn TEXT;
ALTER TABLE public.cards ADD COLUMN IF NOT EXISTS bank_en TEXT;
ALTER TABLE public.cards ADD COLUMN IF NOT EXISTS bank_zh_cn TEXT;
ALTER TABLE public.cards ADD COLUMN IF NOT EXISTS welcome_offer_text_en TEXT;
ALTER TABLE public.cards ADD COLUMN IF NOT EXISTS welcome_offer_text_zh_cn TEXT;
ALTER TABLE public.cards ADD COLUMN IF NOT EXISTS selling_points_en TEXT[];
ALTER TABLE public.cards ADD COLUMN IF NOT EXISTS selling_points_zh_cn TEXT[];
ALTER TABLE public.cards ADD COLUMN IF NOT EXISTS fee_waiver_condition_en TEXT;
ALTER TABLE public.cards ADD COLUMN IF NOT EXISTS fee_waiver_condition_zh_cn TEXT;
ALTER TABLE public.cards ADD COLUMN IF NOT EXISTS reward_timeline_en TEXT;
ALTER TABLE public.cards ADD COLUMN IF NOT EXISTS reward_timeline_zh_cn TEXT;
ALTER TABLE public.cards ADD COLUMN IF NOT EXISTS note_en TEXT;
ALTER TABLE public.cards ADD COLUMN IF NOT EXISTS note_zh_cn TEXT;
ALTER TABLE public.cards ADD COLUMN IF NOT EXISTS tags_en TEXT[];
ALTER TABLE public.cards ADD COLUMN IF NOT EXISTS tags_zh_cn TEXT[];

-- =============================================
-- 2. Promos/Articles table multi-language columns
-- =============================================
ALTER TABLE public.promos ADD COLUMN IF NOT EXISTS title_en TEXT;
ALTER TABLE public.promos ADD COLUMN IF NOT EXISTS title_zh_cn TEXT;
ALTER TABLE public.promos ADD COLUMN IF NOT EXISTS description_en TEXT;
ALTER TABLE public.promos ADD COLUMN IF NOT EXISTS description_zh_cn TEXT;
ALTER TABLE public.promos ADD COLUMN IF NOT EXISTS content_en TEXT;
ALTER TABLE public.promos ADD COLUMN IF NOT EXISTS content_zh_cn TEXT;
ALTER TABLE public.promos ADD COLUMN IF NOT EXISTS merchant_en TEXT;
ALTER TABLE public.promos ADD COLUMN IF NOT EXISTS merchant_zh_cn TEXT;
ALTER TABLE public.promos ADD COLUMN IF NOT EXISTS tags_en TEXT[];
ALTER TABLE public.promos ADD COLUMN IF NOT EXISTS tags_zh_cn TEXT[];
ALTER TABLE public.promos ADD COLUMN IF NOT EXISTS seo_title_en TEXT;
ALTER TABLE public.promos ADD COLUMN IF NOT EXISTS seo_title_zh_cn TEXT;
ALTER TABLE public.promos ADD COLUMN IF NOT EXISTS seo_description_en TEXT;
ALTER TABLE public.promos ADD COLUMN IF NOT EXISTS seo_description_zh_cn TEXT;
ALTER TABLE public.promos ADD COLUMN IF NOT EXISTS faqs_en JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.promos ADD COLUMN IF NOT EXISTS faqs_zh_cn JSONB DEFAULT '[]'::jsonb;

-- =============================================
-- 3. Merchants table multi-language columns
-- =============================================
-- NOTE: Merchants table may not exist in all deployments
-- Uncomment the following lines if you have a merchants table:
-- ALTER TABLE public.merchants ADD COLUMN IF NOT EXISTS name_en TEXT;
-- ALTER TABLE public.merchants ADD COLUMN IF NOT EXISTS name_zh_cn TEXT;
-- ALTER TABLE public.merchants ADD COLUMN IF NOT EXISTS aliases_en TEXT[];
-- ALTER TABLE public.merchants ADD COLUMN IF NOT EXISTS aliases_zh_cn TEXT[];

-- =============================================
-- 4. Categories table multi-language columns
-- =============================================
-- NOTE: Categories table may not exist in all deployments
-- Uncomment the following lines if you have a categories table:
-- ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS name_en TEXT;
-- ALTER TABLE public.categories ADD COLUMN IF NOT EXISTS name_zh_cn TEXT;

-- =============================================
-- 5. Add language_completed tracking
-- =============================================
-- Track which languages have been completed for each item
ALTER TABLE public.cards ADD COLUMN IF NOT EXISTS languages_completed TEXT[] DEFAULT ARRAY['zh-HK']::TEXT[];
ALTER TABLE public.promos ADD COLUMN IF NOT EXISTS languages_completed TEXT[] DEFAULT ARRAY['zh-HK']::TEXT[];

-- =============================================
-- 6. Indexes for performance
-- =============================================
CREATE INDEX IF NOT EXISTS idx_cards_languages_completed ON public.cards USING GIN (languages_completed);
CREATE INDEX IF NOT EXISTS idx_promos_languages_completed ON public.promos USING GIN (languages_completed);

-- =============================================
-- 7. Grant permissions
-- =============================================
GRANT ALL ON public.cards TO anon, authenticated, service_role;
GRANT ALL ON public.promos TO anon, authenticated, service_role;
-- Uncomment if merchants/categories tables exist:
-- GRANT ALL ON public.merchants TO anon, authenticated, service_role;
-- GRANT ALL ON public.categories TO anon, authenticated, service_role;

-- Show columns for verification
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'cards' 
AND column_name LIKE '%_en' OR column_name LIKE '%_zh_cn' OR column_name = 'languages_completed'
ORDER BY column_name;

