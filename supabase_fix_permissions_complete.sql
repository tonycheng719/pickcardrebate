-- 修復 API 和後台權限問題

-- 1. 確保 authenticated 用戶可以插入 merchant_reviews (Report Error)
DROP POLICY IF EXISTS "Allow authenticated insert reviews" ON public.merchant_reviews;
CREATE POLICY "Allow authenticated insert reviews"
ON public.merchant_reviews FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- 2. 確保 authenticated 用戶可以讀取 merchant_reviews (Admin Panel)
-- 這裡假設 admin 也是 authenticated，但我們可能需要更細的權限
-- 暫時允許所有登入用戶讀取自己的，或者特定 admin 讀取所有
-- 簡單起見，允許讀取所有 (如果只有 admin 能進入後台頁面)
DROP POLICY IF EXISTS "Allow authenticated select reviews" ON public.merchant_reviews;
CREATE POLICY "Allow authenticated select reviews"
ON public.merchant_reviews FOR SELECT
TO authenticated
USING (true);

-- 3. 確保 authenticated 用戶可以插入 search_logs (Calculator)
DROP POLICY IF EXISTS "Allow authenticated insert search_logs" ON public.search_logs;
CREATE POLICY "Allow authenticated insert search_logs"
ON public.search_logs FOR INSERT
TO authenticated
WITH CHECK (true);

-- 4. 確保 authenticated 用戶可以讀取 search_logs (Admin Analytics)
DROP POLICY IF EXISTS "Allow authenticated select search_logs" ON public.search_logs;
CREATE POLICY "Allow authenticated select search_logs"
ON public.search_logs FOR SELECT
TO authenticated
USING (true);

-- 5. 修復 admin_audit_logs 權限 (確保表存在)
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    actor_id UUID REFERENCES auth.users(id),
    actor_email TEXT,
    action TEXT NOT NULL,
    target_type TEXT,
    target_id TEXT,
    details JSONB
);

ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow authenticated insert audit logs" ON public.admin_audit_logs;
CREATE POLICY "Allow authenticated insert audit logs"
ON public.admin_audit_logs FOR INSERT
TO authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow authenticated view audit logs" ON public.admin_audit_logs;
CREATE POLICY "Allow authenticated view audit logs"
ON public.admin_audit_logs FOR SELECT
TO authenticated
USING (true);

-- 6. 確保 RPC 函數可執行
GRANT EXECUTE ON FUNCTION public.get_analytics_summary() TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_analytics_summary() TO anon;

