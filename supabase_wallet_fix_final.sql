-- 1. 建立 user_cards 表 (如果不存在)
CREATE TABLE IF NOT EXISTS public.user_cards (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    card_id TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, card_id)
);

-- 2. 建立 user_card_settings 表 (如果不存在)
CREATE TABLE IF NOT EXISTS public.user_card_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) NOT NULL,
    card_id TEXT NOT NULL,
    settings JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMPTZ DEFAULT now(),
    UNIQUE(user_id, card_id)
);

-- 3. 啟用 RLS
ALTER TABLE public.user_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_card_settings ENABLE ROW LEVEL SECURITY;

-- 4. 清除舊的 Policies 以免衝突
DROP POLICY IF EXISTS "Users can view own cards" ON public.user_cards;
DROP POLICY IF EXISTS "Users can insert own cards" ON public.user_cards;
DROP POLICY IF EXISTS "Users can update own cards" ON public.user_cards;
DROP POLICY IF EXISTS "Users can delete own cards" ON public.user_cards;
DROP POLICY IF EXISTS "Allow public read user_cards" ON public.user_cards;
DROP POLICY IF EXISTS "Allow public write user_cards" ON public.user_cards;
DROP POLICY IF EXISTS "Allow public update user_cards" ON public.user_cards;
DROP POLICY IF EXISTS "Allow public delete user_cards" ON public.user_cards;

DROP POLICY IF EXISTS "Allow public read user_card_settings" ON public.user_card_settings;
DROP POLICY IF EXISTS "Allow public write user_card_settings" ON public.user_card_settings;
DROP POLICY IF EXISTS "Allow public update user_card_settings" ON public.user_card_settings;
DROP POLICY IF EXISTS "Allow public delete user_card_settings" ON public.user_card_settings;

-- 5. 建立最寬鬆的 RLS 政策 (配合 API Route 寫入)
-- 允許所有人讀取 (為了讓 Admin 後台能看)
CREATE POLICY "Allow public read user_cards" ON public.user_cards FOR SELECT USING (true);
CREATE POLICY "Allow public read user_card_settings" ON public.user_card_settings FOR SELECT USING (true);

-- 允許所有人寫入 (由 API Route 控制安全性)
CREATE POLICY "Allow public write user_cards" ON public.user_cards FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update user_cards" ON public.user_cards FOR UPDATE USING (true);
CREATE POLICY "Allow public delete user_cards" ON public.user_cards FOR DELETE USING (true);

CREATE POLICY "Allow public write user_card_settings" ON public.user_card_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update user_card_settings" ON public.user_card_settings FOR UPDATE USING (true);
CREATE POLICY "Allow public delete user_card_settings" ON public.user_card_settings FOR DELETE USING (true);

-- 6. 關鍵：授予 anon 角色所有必要權限
-- 這是解決 PGRST205 的核心
GRANT USAGE ON SCHEMA public TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_cards TO anon;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_card_settings TO anon;

-- 7. 刷新 Schema Cache
NOTIFY pgrst, 'reload schema';



