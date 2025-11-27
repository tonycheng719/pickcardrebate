-- 強制開放讀取權限，解決前端 Timeout 問題
-- 請在 Supabase SQL Editor 中執行

-- 1. 確保 RLS 已啟用 (這通常是默認的，但確認一下)
ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.merchants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promos ENABLE ROW LEVEL SECURITY;

-- 2. 刪除舊的讀取策略 (避免衝突)
DROP POLICY IF EXISTS "Allow public read cards" ON public.cards;
DROP POLICY IF EXISTS "Allow anon read cards" ON public.cards;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.cards;

DROP POLICY IF EXISTS "Allow public read merchants" ON public.merchants;
DROP POLICY IF EXISTS "Allow anon read merchants" ON public.merchants;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.merchants;

DROP POLICY IF EXISTS "Allow public read promos" ON public.promos;
DROP POLICY IF EXISTS "Allow anon read promos" ON public.promos;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.promos;

-- 3. 建立新的、最寬鬆的讀取策略 (允許任何人讀取)
CREATE POLICY "Enable read access for all users" ON public.cards
FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON public.merchants
FOR SELECT USING (true);

CREATE POLICY "Enable read access for all users" ON public.promos
FOR SELECT USING (true);

-- 4. 確保 Service Role (後端) 和 Anon (前端) 都有權限
GRANT SELECT ON public.cards TO anon, authenticated, service_role;
GRANT SELECT ON public.merchants TO anon, authenticated, service_role;
GRANT SELECT ON public.promos TO anon, authenticated, service_role;

-- 5. 驗證：您可以在 SQL Editor 運行這行測試，應該要能立即返回數據
-- SELECT count(*) FROM public.cards;

