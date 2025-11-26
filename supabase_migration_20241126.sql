-- Add new columns to profiles table for user onboarding and analytics
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS gender text CHECK (gender IN ('male', 'female', 'other')),
ADD COLUMN IF NOT EXISTS district text,
ADD COLUMN IF NOT EXISTS last_ip text;

-- Comment on columns
COMMENT ON COLUMN public.profiles.gender IS 'User gender (male, female, other)';
COMMENT ON COLUMN public.profiles.district IS 'User residential district in Hong Kong';
COMMENT ON COLUMN public.profiles.last_ip IS 'Last known IP address of the user';

-- Ensure RLS allows users to update their own profile (existing policy should cover this, but verifying)
-- Policy: "Users can update own profile." 
-- defined as: create policy "Users can update own profile." on profiles for update using ( auth.uid() = id );

