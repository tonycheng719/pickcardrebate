-- 新增置頂到期日期欄位
-- 執行日期：2026-01-22
-- 功能：允許設定文章置頂的到期日，過期後自動取消置頂

-- 1. 在 article_settings 表新增 pinned_until 欄位
ALTER TABLE public.article_settings 
ADD COLUMN IF NOT EXISTS pinned_until DATE;

-- 2. 在 promos 表新增 pinned_until 欄位（如果有的話）
ALTER TABLE public.promos 
ADD COLUMN IF NOT EXISTS pinned_until DATE;

-- 確認結果
-- SELECT column_name, data_type FROM information_schema.columns 
-- WHERE table_name = 'article_settings' AND column_name = 'pinned_until';

