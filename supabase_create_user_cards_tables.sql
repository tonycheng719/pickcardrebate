-- Create user_cards table
CREATE TABLE IF NOT EXISTS public.user_cards (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    card_id TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (user_id, card_id)
);

-- Create user_card_settings table
CREATE TABLE IF NOT EXISTS public.user_card_settings (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    card_id TEXT NOT NULL,
    settings JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    PRIMARY KEY (user_id, card_id)
);

-- Enable RLS
ALTER TABLE public.user_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_card_settings ENABLE ROW LEVEL SECURITY;

-- Policies for user_cards
-- Allow users to read their own cards
CREATE POLICY "Users can view their own cards" 
ON public.user_cards FOR SELECT 
USING (auth.uid() = user_id);

-- Allow users to insert their own cards
CREATE POLICY "Users can insert their own cards" 
ON public.user_cards FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Allow users to delete their own cards
CREATE POLICY "Users can delete their own cards" 
ON public.user_cards FOR DELETE 
USING (auth.uid() = user_id);

-- Service Role Full Access (Just in case, though we bypass RLS in API with service key)
-- (Service role bypasses RLS by default in Supabase client if configured, but good to be explicit if using other clients)

-- Policies for user_card_settings
-- Allow users to read their own settings
CREATE POLICY "Users can view their own card settings" 
ON public.user_card_settings FOR SELECT 
USING (auth.uid() = user_id);

-- Allow users to insert/update their own settings
CREATE POLICY "Users can upsert their own card settings" 
ON public.user_card_settings FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own card settings" 
ON public.user_card_settings FOR UPDATE 
USING (auth.uid() = user_id);

-- Grant access to authenticated users
GRANT ALL ON public.user_cards TO authenticated;
GRANT ALL ON public.user_card_settings TO authenticated;
GRANT ALL ON public.user_cards TO service_role;
GRANT ALL ON public.user_card_settings TO service_role;

