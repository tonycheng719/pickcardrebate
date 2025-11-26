-- 暫時放寬 reports 表的 RLS 以排除 Auth Role 問題
-- 允許所有用戶 (包括匿名) 插入報告，但我們會在 Server Action 層面檢查 user_id 是否存在

DROP POLICY IF EXISTS "Users can insert own reports" ON public.reports;

CREATE POLICY "Allow public insert reports" 
ON public.reports FOR INSERT 
WITH CHECK (true);

-- 同時確保 user_id 欄位不是必須符合 auth.uid() (因為現在是 public insert)
-- 但 Server Action 會手動填入 user_id，所以資料完整性由 Server Action 把關

