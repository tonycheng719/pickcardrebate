-- 1. 升級 reports 表以支援「社群驗證」
-- 我們不刪除舊表，而是添加新欄位以保留現有數據

ALTER TABLE public.reports 
ADD COLUMN IF NOT EXISTS report_type TEXT DEFAULT 'error', -- 'error' (報錯), 'verification' (驗證成功/失敗)
ADD COLUMN IF NOT EXISTS actual_rate NUMERIC, -- 用戶聲稱的實際回贈率
ADD COLUMN IF NOT EXISTS evidence_url TEXT, -- 截圖證明連結 (預留)
ADD COLUMN IF NOT EXISTS conditions TEXT[]; -- 用戶標記的條件，如 ['must_register', 'min_spend']

-- 2. 建立 merchant_overrides 表 (用於存儲「特例」和「社群驗證結果」)
-- 這讓我們能針對 "Merchant + Card + Method" 組合設定優先規則

CREATE TABLE IF NOT EXISTS public.merchant_overrides (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    merchant_id TEXT, -- 關聯到 merchants 表的 id (字串)
    merchant_name TEXT, -- 備用，如果找不到 ID
    card_id TEXT NOT NULL, -- 關聯到 cards 表
    payment_method TEXT, -- 'apple_pay', 'mobile', 'physical', 'online' 等
    
    rate NUMERIC NOT NULL, -- 最終回贈率
    conditions TEXT[], -- 場景標籤：['must_register', 'weekend_only', 'promo_period']
    
    source TEXT DEFAULT 'official', -- 'official' (官方/管理員設定), 'community' (社群高信賴度自動生成)
    confidence_score INT DEFAULT 100, -- 信賴度：管理員=100, 社群根據回報數計算
    
    valid_from TIMESTAMPTZ,
    valid_until TIMESTAMPTZ,
    
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    
    -- 建立索引以加快查詢速度
    CONSTRAINT unique_override UNIQUE (merchant_id, card_id, payment_method)
);

-- 3. 設定 RLS (Row Level Security)

-- Merchant Overrides: 公開讀取，管理員寫入 (社群寫入通過 Server Action/RPC)
ALTER TABLE public.merchant_overrides ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Overrides are viewable by everyone" ON public.merchant_overrides;
CREATE POLICY "Overrides are viewable by everyone" ON public.merchant_overrides FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can insert overrides" ON public.merchant_overrides;
-- 暫時允許 authenticated 用戶 insert，之後應限制為 admin 或通過 RPC
CREATE POLICY "Allow authenticated insert overrides" ON public.merchant_overrides FOR INSERT TO authenticated WITH CHECK (true);

-- 4. 授予權限
GRANT ALL ON public.merchant_overrides TO anon;
GRANT ALL ON public.merchant_overrides TO authenticated;
GRANT ALL ON public.merchant_overrides TO service_role;

-- 刷新 Schema Cache
NOTIFY pgrst, 'reload schema';

