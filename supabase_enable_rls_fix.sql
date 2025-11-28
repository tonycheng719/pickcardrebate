-- Enable RLS on all tables where policies exist but RLS is disabled
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.merchant_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.merchant_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.merchants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_logs ENABLE ROW LEVEL SECURITY;

-- Ensure policies are correct for anonymous/public access where needed
-- (These policies might already exist, but re-stating or ensuring they cover what we need is safe)
-- For public read access on reference tables:
CREATE POLICY "Enable read access for all users" ON public.cards FOR SELECT TO public USING (true);
CREATE POLICY "Enable read access for all users" ON public.merchants FOR SELECT TO public USING (true);
CREATE POLICY "Enable read access for all users" ON public.promos FOR SELECT TO public USING (true);
CREATE POLICY "Allow public read tags" ON public.merchant_tags FOR SELECT TO public USING (true);

-- For search logs (need public insert):
CREATE POLICY "Allow public insert search_logs" ON public.search_logs FOR INSERT TO public WITH CHECK (true);

-- For system settings (new table):
-- Ensure it has RLS enabled (included in previous script but good to double check)
ALTER TABLE IF EXISTS public.system_settings ENABLE ROW LEVEL SECURITY;

