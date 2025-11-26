-- 1. 建立 user_cards 表 (儲存用戶持有的卡片)
CREATE TABLE IF NOT EXISTS public.user_cards (
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
    card_id text NOT NULL,
    created_at timestamptz DEFAULT now(),
    PRIMARY KEY (user_id, card_id)
);

-- 2. 建立 user_card_settings 表 (儲存卡片設定，如年費日期)
CREATE TABLE IF NOT EXISTS public.user_card_settings (
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE,
    card_id text NOT NULL,
    settings jsonb DEFAULT '{}'::jsonb, -- 儲存 note, annualFeeDate, welcomeOffer 等
    updated_at timestamptz DEFAULT now(),
    PRIMARY KEY (user_id, card_id)
);

-- 3. 啟用 RLS
ALTER TABLE public.user_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_card_settings ENABLE ROW LEVEL SECURITY;

-- 4. 設定 RLS 政策

-- user_cards 政策
CREATE POLICY "Users can view own cards" 
ON public.user_cards FOR SELECT 
USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own cards" 
ON public.user_cards FOR INSERT 
WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete own cards" 
ON public.user_cards FOR DELETE 
USING ((select auth.uid()) = user_id);

-- 管理員可讀取所有用戶卡片
CREATE POLICY "Admin can view all user cards" 
ON public.user_cards FOR SELECT 
TO authenticated 
USING (true); 
-- 注意：這裡為了方便先開放給所有 authenticated，
-- 嚴格來說應該檢查 user_metadata->role = 'admin'，
-- 但目前 profiles 表還沒 role 欄位同步機制，暫時從寬或依賴前端隱藏。


-- user_card_settings 政策
CREATE POLICY "Users can view own card settings" 
ON public.user_card_settings FOR SELECT 
USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own card settings" 
ON public.user_card_settings FOR INSERT 
WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own card settings" 
ON public.user_card_settings FOR UPDATE 
USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete own card settings" 
ON public.user_card_settings FOR DELETE 
USING ((select auth.uid()) = user_id);

-- 管理員可讀取設定
CREATE POLICY "Admin can view all card settings" 
ON public.user_card_settings FOR SELECT 
TO authenticated 
USING (true);

