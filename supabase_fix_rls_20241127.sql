-- Fix RLS policies for profiles table to ensure users can update their onboarding data

-- 1. Drop existing policies to avoid conflicts/duplicates
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;

-- 2. Re-create policies with full permissions for the owner
-- Allow Select (View)
CREATE POLICY "Public profiles are viewable by everyone" 
ON public.profiles FOR SELECT 
USING (true);

-- Allow Update (Edit)
CREATE POLICY "Users can update own profile" 
ON public.profiles FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- Allow Insert (Create) - mostly handled by trigger but good to have
CREATE POLICY "Users can insert their own profile" 
ON public.profiles FOR INSERT 
WITH CHECK (auth.uid() = id);

-- 3. Grant explicit permissions to authenticated role
GRANT SELECT, UPDATE, INSERT ON TABLE public.profiles TO authenticated;

-- 4. Ensure columns exist (idempotent)
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS gender text,
ADD COLUMN IF NOT EXISTS district text,
ADD COLUMN IF NOT EXISTS last_ip text;



