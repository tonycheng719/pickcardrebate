-- 修正：先刪除可能已存在的細項政策，避免 "already exists" 錯誤

-- 1. 處理 merchants 表格
-- 先刪除舊的大範圍政策 (如果還在)
DROP POLICY IF EXISTS "Allow authenticated write merchants" ON public.merchants;

-- 先刪除可能已建立的新政策，避免衝突
DROP POLICY IF EXISTS "Allow authenticated insert merchants" ON public.merchants;
DROP POLICY IF EXISTS "Allow authenticated update merchants" ON public.merchants;
DROP POLICY IF EXISTS "Allow authenticated delete merchants" ON public.merchants;

-- 重新建立
CREATE POLICY "Allow authenticated insert merchants" ON public.merchants FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update merchants" ON public.merchants FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete merchants" ON public.merchants FOR DELETE TO authenticated USING (true);


-- 2. 處理 promos 表格
-- 先刪除舊的大範圍政策
DROP POLICY IF EXISTS "Allow authenticated write promos" ON public.promos;

-- 先刪除可能已建立的新政策
DROP POLICY IF EXISTS "Allow authenticated insert promos" ON public.promos;
DROP POLICY IF EXISTS "Allow authenticated update promos" ON public.promos;
DROP POLICY IF EXISTS "Allow authenticated delete promos" ON public.promos;

-- 重新建立
CREATE POLICY "Allow authenticated insert promos" ON public.promos FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Allow authenticated update promos" ON public.promos FOR UPDATE TO authenticated USING (true);
CREATE POLICY "Allow authenticated delete promos" ON public.promos FOR DELETE TO authenticated USING (true);

