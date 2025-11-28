-- 1. 徹底修復 reports 表權限 (解決回報無反應問題)
-- 確保 reports 表存在
CREATE TABLE IF NOT EXISTS public.reports (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id), -- 這裡保留參考，但外鍵已移除約束 (或保持約束但確保 auth.users 可見)
    merchant_name TEXT,
    category_id TEXT,
    amount TEXT,
    payment_method TEXT,
    card_id TEXT,
    card_name TEXT,
    description TEXT,
    proposed_reward TEXT,
    status TEXT DEFAULT 'pending', -- pending, approved, rejected
    created_at TIMESTAMPTZ DEFAULT now()
);

-- 移除可能導致問題的外鍵約束 (如果還沒移除)
ALTER TABLE public.reports DROP CONSTRAINT IF EXISTS reports_user_id_fkey;

-- 啟用 RLS
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- 清除舊 Policy
DROP POLICY IF EXISTS "Allow public insert reports" ON public.reports;
DROP POLICY IF EXISTS "Allow public all reports" ON public.reports;
DROP POLICY IF EXISTS "Users can insert own reports" ON public.reports;

-- 建立最寬鬆 Policy (允許所有操作，依賴後端過濾)
CREATE POLICY "Allow public all reports" ON public.reports FOR ALL USING (true) WITH CHECK (true);

-- 授予 anon 角色所有權限
GRANT USAGE ON SCHEMA public TO anon;
GRANT ALL ON public.reports TO anon;


-- 2. 建立數據分析函數 (RPC) - 用於後台 Dashboard
-- 這能讓我們一次獲取所有統計數據，無需在前端進行大量計算
CREATE OR REPLACE FUNCTION get_analytics_summary()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER -- 使用定義者權限運行，繞過 RLS (因為聚合數據不涉及隱私)
AS $$
DECLARE
    total_searches INT;
    avg_amount NUMERIC;
    top_merchants JSONB;
    category_stats JSONB;
    payment_stats JSONB;
BEGIN
    -- 總搜尋次數
    SELECT COUNT(*) INTO total_searches FROM search_logs;
    
    -- 平均金額 (只計算有金額的)
    SELECT COALESCE(AVG(amount), 0) INTO avg_amount FROM search_logs WHERE amount > 0;

    -- 熱門商戶 Top 5
    SELECT jsonb_agg(t) INTO top_merchants FROM (
        SELECT merchant_name, COUNT(*) as count 
        FROM search_logs 
        WHERE merchant_name IS NOT NULL AND merchant_name != ''
        GROUP BY merchant_name 
        ORDER BY count DESC 
        LIMIT 5
    ) t;

    -- 類別分佈
    SELECT jsonb_agg(t) INTO category_stats FROM (
        SELECT category_id, COUNT(*) as count 
        FROM search_logs 
        WHERE category_id IS NOT NULL 
        GROUP BY category_id 
        ORDER BY count DESC
    ) t;

    -- 支付方式分佈
    SELECT jsonb_agg(t) INTO payment_stats FROM (
        SELECT payment_method, COUNT(*) as count 
        FROM search_logs 
        WHERE payment_method IS NOT NULL 
        GROUP BY payment_method 
        ORDER BY count DESC
    ) t;

    RETURN jsonb_build_object(
        'total_searches', total_searches,
        'avg_amount', ROUND(avg_amount, 0),
        'top_merchants', COALESCE(top_merchants, '[]'::jsonb),
        'category_stats', COALESCE(category_stats, '[]'::jsonb),
        'payment_stats', COALESCE(payment_stats, '[]'::jsonb)
    );
END;
$$;

-- 授予 anon 執行此函數的權限
GRANT EXECUTE ON FUNCTION get_analytics_summary() TO anon;
GRANT EXECUTE ON FUNCTION get_analytics_summary() TO authenticated;
GRANT EXECUTE ON FUNCTION get_analytics_summary() TO service_role;



