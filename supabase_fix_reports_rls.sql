-- 修復 reports 表格的 RLS Policy
-- 嘗試簡化 Policy，避免使用子查詢 (select auth.uid())，改用 auth.uid()

DROP POLICY IF EXISTS "Users can insert own reports" ON public.reports;

CREATE POLICY "Users can insert own reports" 
ON public.reports FOR INSERT 
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 確保 authenticated角色有權限
GRANT INSERT ON public.reports TO authenticated;
GRANT USAGE, SELECT ON SEQUENCE reports_id_seq TO authenticated; -- 如果 id 是 serial，雖然這裡是 uuid default gen_random_uuid()，但預防萬一



