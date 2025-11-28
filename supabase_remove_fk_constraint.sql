-- 移除 reports 表的 user_id 外鍵約束
-- 這可以避免因為 profiles 表的 RLS 導致的外鍵檢查失敗
-- 錯誤 42501 (RLS violation) 有時是因為參照表的讀取權限不足

ALTER TABLE public.reports 
DROP CONSTRAINT IF EXISTS reports_user_id_fkey;

-- 再次確認 RLS 政策是開放的
DROP POLICY IF EXISTS "Allow public insert reports" ON public.reports;
DROP POLICY IF EXISTS "Users can insert own reports" ON public.reports;

CREATE POLICY "Allow public insert reports" 
ON public.reports FOR INSERT 
WITH CHECK (true);

-- 確保 anon 角色有權限 (重複執行以防萬一)
GRANT INSERT ON public.reports TO anon;
GRANT SELECT ON public.reports TO anon; -- 有些回傳機制可能需要 SELECT



