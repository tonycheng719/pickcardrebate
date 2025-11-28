-- 1. 修復提交回報 (API Route 使用 Anon Client)
-- 必須明確賦予 anon 角色 INSERT 權限
GRANT INSERT ON public.reports TO anon;

-- 2. 修復搜尋日誌 (我們也將改用 Anon Client 寫入)
GRANT INSERT ON public.search_logs TO anon;

-- 3. 確保 user_cards 也能被寫入 (以防萬一前端 Auth 掉線變 anon)
-- 但我們不希望 anon 隨便寫入別人的錢包。
-- 錢包同步還是應該依賴 Authenticated User。
-- 如果後台看不到，可能是前端同步請求失敗。我們稍後在前端加強日誌。

-- 4. 再次確認 reports RLS 是寬鬆的
DROP POLICY IF EXISTS "Allow public insert reports" ON public.reports;
CREATE POLICY "Allow public insert reports" ON public.reports FOR INSERT WITH CHECK (true);

-- 5. 放寬 search_logs RLS
DROP POLICY IF EXISTS "Allow public insert search_logs" ON public.search_logs;
CREATE POLICY "Allow public insert search_logs" ON public.search_logs FOR INSERT WITH CHECK (true);



