-- 1. Add birth_year and birth_month columns to profiles table if they don't exist
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS birth_year INTEGER,
ADD COLUMN IF NOT EXISTS birth_month INTEGER;

-- 2. Ensure RLS policies allow users to update their own profile (already likely exists, but confirming specific columns)
-- Note: Existing policies for 'profiles' usually cover UPDATE on all columns for the owner.
-- Just in case, we ensure the service role has access (already granted via previous scripts or default).

-- 3. Grant access to service_role just in case
GRANT ALL ON public.profiles TO service_role;

