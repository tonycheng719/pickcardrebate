-- Explicitly enable RLS for cards table first
ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;

-- Drop existing potentially conflicting policies
DROP POLICY IF EXISTS "Service Role Full Access Cards" ON public.cards;
DROP POLICY IF EXISTS "Enable read access for all users" ON public.cards;
DROP POLICY IF EXISTS "Allow authenticated insert cards" ON public.cards;
DROP POLICY IF EXISTS "Allow authenticated update cards" ON public.cards;
DROP POLICY IF EXISTS "Allow authenticated delete cards" ON public.cards;

-- Create a policy that allows Service Role to do EVERYTHING (Bypass RLS)
CREATE POLICY "Service Role Full Access Cards"
ON public.cards
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Create a policy for public read access
CREATE POLICY "Enable read access for all users"
ON public.cards
FOR SELECT
TO public
USING (true);

-- (Optional) If you want authenticated users (admins via frontend client) to update, add this.
-- But since we are using API routes with Service Role, this is strictly not needed for the fix, 
-- but good for direct client access if we revert to that.
-- CREATE POLICY "Allow authenticated update cards" ON public.cards FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
-- CREATE POLICY "Allow authenticated insert cards" ON public.cards FOR INSERT TO authenticated WITH CHECK (true);
-- CREATE POLICY "Allow authenticated delete cards" ON public.cards FOR DELETE TO authenticated USING (true);

