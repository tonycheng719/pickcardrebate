-- 強制刷新 PostgREST Schema Cache
NOTIFY pgrst, 'reload schema';

-- 再次確認表存在 (以防萬一)
SELECT * FROM public.user_cards LIMIT 1;

