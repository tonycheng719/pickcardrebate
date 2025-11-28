-- 補上 SELECT 權限，這是 PostgREST 看到表的前提
GRANT SELECT ON public.user_cards TO anon;
GRANT SELECT ON public.user_card_settings TO anon;

-- 再次刷新 Schema Cache
NOTIFY pgrst, 'reload schema';



