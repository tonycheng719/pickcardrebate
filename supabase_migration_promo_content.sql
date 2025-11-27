-- Add content column to promos table
ALTER TABLE public.promos ADD COLUMN IF NOT EXISTS content TEXT;

-- Grant permissions just in case
GRANT ALL ON public.promos TO anon, authenticated, service_role;
