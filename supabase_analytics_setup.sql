-- 建立用戶交易記錄表
CREATE TABLE IF NOT EXISTS public.user_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    
    merchant_name TEXT NOT NULL,
    category_id TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    transaction_date DATE DEFAULT CURRENT_DATE,
    
    payment_method TEXT NOT NULL,
    card_id TEXT NOT NULL, -- 記錄用戶實際使用的卡片 ID
    
    reward_amount NUMERIC DEFAULT 0, -- 記錄計算出的回贈金額
    reward_currency TEXT DEFAULT 'cash', -- 'cash' | 'miles'
    reward_unit TEXT, -- e.g. 'RC', 'DBS$' 
    
    memo TEXT, -- 用戶備註
    
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 啟用 RLS
ALTER TABLE public.user_transactions ENABLE ROW LEVEL SECURITY;

-- 策略：用戶只能查看和新增自己的交易
CREATE POLICY "Users can view own transactions" ON public.user_transactions
    FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own transactions" ON public.user_transactions
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own transactions" ON public.user_transactions
    FOR UPDATE TO authenticated USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own transactions" ON public.user_transactions
    FOR DELETE TO authenticated USING (auth.uid() = user_id);

-- 策略：管理員 (Service Role / Admin API) 可以查看所有交易
GRANT ALL ON public.user_transactions TO service_role;
-- 為了配合我們的 API Route 模式，賦予 anon/authenticated 基本操作權限 (由 API 層控制邏輯)
GRANT ALL ON public.user_transactions TO anon, authenticated;



