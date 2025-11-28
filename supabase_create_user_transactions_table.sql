-- 1. 建立 user_transactions 表格 (如果不存在)
CREATE TABLE IF NOT EXISTS public.user_transactions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    card_id TEXT NOT NULL,
    merchant_name TEXT NOT NULL,
    amount NUMERIC NOT NULL,
    payment_method TEXT,
    transaction_date DATE DEFAULT CURRENT_DATE,
    reward_amount NUMERIC DEFAULT 0,
    reward_currency TEXT DEFAULT 'HKD',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. 啟用 RLS 安全性
ALTER TABLE public.user_transactions ENABLE ROW LEVEL SECURITY;

-- 3. 清除舊有的 Policies (避免衝突)
DROP POLICY IF EXISTS "Users can view their own transactions" ON public.user_transactions;
DROP POLICY IF EXISTS "Users can insert their own transactions" ON public.user_transactions;
DROP POLICY IF EXISTS "Users can delete their own transactions" ON public.user_transactions;
DROP POLICY IF EXISTS "Service Role can do everything on user_transactions" ON public.user_transactions;

-- 4. 設定存取權限 (讓使用者能讀寫自己的交易資料)
CREATE POLICY "Users can view their own transactions" 
ON public.user_transactions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own transactions" 
ON public.user_transactions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own transactions" 
ON public.user_transactions 
FOR DELETE 
USING (auth.uid() = user_id);

-- 5. 授權給 Service Role (API/Admin 用)
CREATE POLICY "Service Role can do everything on user_transactions" 
ON public.user_transactions 
FOR ALL 
USING (auth.role() = 'service_role');

-- 6. 確保 authenticated user 有權限 (雖然 RLS 控制了行級別，但角色需要表級別權限)
GRANT ALL ON public.user_transactions TO authenticated;
GRANT ALL ON public.user_transactions TO service_role;

