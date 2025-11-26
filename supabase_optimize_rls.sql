-- 優化 RLS 政策以解決效能警告 (auth_rls_initplan) 和重複權限警告 (multiple_permissive_policies)

-- 1. 修正 merchants 表格：移除重複的 SELECT 權限
-- 問題：原本的 "Allow authenticated write merchants" 包含 ALL (SELECT, INSERT, UPDATE, DELETE)，
-- 與 "Allow public read merchants" (SELECT) 重疊，導致 authenticated 用戶讀取時會檢查兩次。
DROP POLICY IF EXISTS "Allow authenticated write merchants" ON public.merchants;

-- 拆分為明確的寫入政策 (不包含 SELECT)
CREATE POLICY "Allow authenticated insert merchants" 
ON public.merchants FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Allow authenticated update merchants" 
ON public.merchants FOR UPDATE 
TO authenticated 
USING (true);

CREATE POLICY "Allow authenticated delete merchants" 
ON public.merchants FOR DELETE 
TO authenticated 
USING (true);


-- 2. 修正 promos 表格：同上
DROP POLICY IF EXISTS "Allow authenticated write promos" ON public.promos;

-- 拆分為明確的寫入政策
CREATE POLICY "Allow authenticated insert promos" 
ON public.promos FOR INSERT 
TO authenticated 
WITH CHECK (true);

CREATE POLICY "Allow authenticated update promos" 
ON public.promos FOR UPDATE 
TO authenticated 
USING (true);

CREATE POLICY "Allow authenticated delete promos" 
ON public.promos FOR DELETE 
TO authenticated 
USING (true);


-- 3. 修正 reports 表格：優化 auth.uid() 效能
-- 問題：原本的 "Users can insert own reports" 使用 auth.uid() 會對每一行重新評估，效能較差。
-- 解法：改用 (select auth.uid())，讓 Postgres 在查詢時只評估一次。
DROP POLICY IF EXISTS "Users can insert own reports" ON public.reports;

CREATE POLICY "Users can insert own reports" 
ON public.reports FOR INSERT 
WITH CHECK ((select auth.uid()) = user_id);


-- 4. 優化 profiles 表格 (預防性優化)
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING ((select auth.uid()) = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
CREATE POLICY "Users can insert own profile" 
ON public.profiles FOR INSERT 
WITH CHECK ((select auth.uid()) = id);

