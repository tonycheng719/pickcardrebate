-- 將所有文章設為不置頂
-- 執行日期：2026-01-22
-- 原因：用戶要求停用置頂功能，改用 sortOrder 控制排序

UPDATE public.promos
SET is_pinned = false
WHERE is_pinned = true;

-- 確認更新結果
-- SELECT id, title, is_pinned FROM public.promos WHERE is_pinned = true;

