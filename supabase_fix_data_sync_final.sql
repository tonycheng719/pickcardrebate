-- 1. Ensure RLS is enabled
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_card_settings ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies to ensure a clean slate (avoid conflicts)
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;

DROP POLICY IF EXISTS "Users can view own cards" ON public.user_cards;
DROP POLICY IF EXISTS "Users can insert own cards" ON public.user_cards;
DROP POLICY IF EXISTS "Users can delete own cards" ON public.user_cards;

DROP POLICY IF EXISTS "Users can view own settings" ON public.user_card_settings;
DROP POLICY IF EXISTS "Users can insert own settings" ON public.user_card_settings;
DROP POLICY IF EXISTS "Users can update own settings" ON public.user_card_settings;

-- 3. Create robust policies for PROFILES
-- Allow users to view their own profile
CREATE POLICY "Users can view own profile" 
ON public.profiles FOR SELECT 
TO authenticated 
USING (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
TO authenticated 
USING (auth.uid() = id);

-- Allow users to insert their own profile (triggered by auth usually, but good fallback)
CREATE POLICY "Users can insert own profile" 
ON public.profiles FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = id);

-- 4. Create robust policies for USER_CARDS
-- Allow users to view their own cards
CREATE POLICY "Users can view own cards" 
ON public.user_cards FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

-- Allow users to insert their own cards (if client-side logic used, though we use API now)
CREATE POLICY "Users can insert own cards" 
ON public.user_cards FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own cards
CREATE POLICY "Users can delete own cards" 
ON public.user_cards FOR DELETE 
TO authenticated 
USING (auth.uid() = user_id);

-- 5. Create robust policies for USER_CARD_SETTINGS
-- Allow users to view their own settings
CREATE POLICY "Users can view own settings" 
ON public.user_card_settings FOR SELECT 
TO authenticated 
USING (auth.uid() = user_id);

-- Allow users to insert/update their own settings
CREATE POLICY "Users can insert own settings" 
ON public.user_card_settings FOR INSERT 
TO authenticated 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own settings" 
ON public.user_card_settings FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id);

-- 6. Grant permissions to roles
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON public.profiles TO service_role;
GRANT SELECT, UPDATE, INSERT ON public.profiles TO authenticated;

GRANT ALL ON public.user_cards TO service_role;
GRANT SELECT, INSERT, DELETE ON public.user_cards TO authenticated;

GRANT ALL ON public.user_card_settings TO service_role;
GRANT SELECT, INSERT, UPDATE ON public.user_card_settings TO authenticated;

-- 7. Verify Profile Columns (Idempotent)
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS gender text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS district text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS birth_year integer;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS birth_month integer;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_ip text;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS reward_preference text DEFAULT 'cash';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS notifications jsonb DEFAULT '{"promos": true, "bills": true, "community": true}'::jsonb;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS followed_promo_ids text[] DEFAULT '{}';

-- Notify
NOTIFY pgrst, 'reload schema';

