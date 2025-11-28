-- 1. 確保 user_cards 和 user_card_settings 表格存在
CREATE TABLE IF NOT EXISTS public.user_cards (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    card_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (user_id, card_id)
);

CREATE TABLE IF NOT EXISTS public.user_card_settings (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    card_id TEXT NOT NULL,
    settings JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (user_id, card_id)
);

-- 2. 啟用 RLS
ALTER TABLE public.user_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_card_settings ENABLE ROW LEVEL SECURITY;

-- 3. 清除所有舊 Policy 以避免衝突 (重置狀態)
DROP POLICY IF EXISTS "Users can view their own cards" ON public.user_cards;
DROP POLICY IF EXISTS "Users can insert their own cards" ON public.user_cards;
DROP POLICY IF EXISTS "Users can delete their own cards" ON public.user_cards;
DROP POLICY IF EXISTS "Service Role can do everything on user_cards" ON public.user_cards;

DROP POLICY IF EXISTS "Users can view their own card settings" ON public.user_card_settings;
DROP POLICY IF EXISTS "Users can upsert their own card settings" ON public.user_card_settings;
DROP POLICY IF EXISTS "Users can update their own card settings" ON public.user_card_settings;
DROP POLICY IF EXISTS "Service Role can do everything on user_card_settings" ON public.user_card_settings;

-- 4. 重新建立使用者權限 (允許使用者自己讀寫)
CREATE POLICY "Users can view their own cards" ON public.user_cards FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own cards" ON public.user_cards FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own cards" ON public.user_cards FOR DELETE USING (auth.uid() = user_id);

CREATE POLICY "Users can view their own card settings" ON public.user_card_settings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can upsert their own card settings" ON public.user_card_settings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own card settings" ON public.user_card_settings FOR UPDATE USING (auth.uid() = user_id);

-- 5. 重新建立 Service Role 權限 (給 API Route 使用)
CREATE POLICY "Service Role can do everything on user_cards" ON public.user_cards FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service Role can do everything on user_card_settings" ON public.user_card_settings FOR ALL USING (auth.role() = 'service_role');

-- 6. 確保權限 Grants
GRANT ALL ON public.user_cards TO service_role;
GRANT ALL ON public.user_cards TO authenticated;
GRANT ALL ON public.user_card_settings TO service_role;
GRANT ALL ON public.user_card_settings TO authenticated;

-- 7. 再次確認 user_transactions (確保萬無一失)
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
ALTER TABLE public.user_transactions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Service Role can do everything on user_transactions" ON public.user_transactions;
CREATE POLICY "Service Role can do everything on user_transactions" ON public.user_transactions FOR ALL USING (auth.role() = 'service_role');
GRANT ALL ON public.user_transactions TO service_role;

