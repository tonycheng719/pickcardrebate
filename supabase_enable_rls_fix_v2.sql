-- Enable RLS on all tables where policies exist but RLS is disabled
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.merchant_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.merchant_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.merchants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.promos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_logs ENABLE ROW LEVEL SECURITY;

-- Helper function to drop policy if exists (to avoid 42710 error)
DO $$
BEGIN
    -- Cards
    IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'cards' AND policyname = 'Enable read access for all users') THEN
        DROP POLICY "Enable read access for all users" ON public.cards;
    END IF;
    
    -- Merchants
    IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'merchants' AND policyname = 'Enable read access for all users') THEN
        DROP POLICY "Enable read access for all users" ON public.merchants;
    END IF;
    
    -- Promos
    IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'promos' AND policyname = 'Enable read access for all users') THEN
        DROP POLICY "Enable read access for all users" ON public.promos;
    END IF;
    
    -- Merchant Tags
    IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'merchant_tags' AND policyname = 'Allow public read tags') THEN
        DROP POLICY "Allow public read tags" ON public.merchant_tags;
    END IF;

    -- Search Logs
    IF EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'search_logs' AND policyname = 'Allow public insert search_logs') THEN
        DROP POLICY "Allow public insert search_logs" ON public.search_logs;
    END IF;
END $$;

-- Re-create policies to ensure they are correct
CREATE POLICY "Enable read access for all users" ON public.cards FOR SELECT TO public USING (true);
CREATE POLICY "Enable read access for all users" ON public.merchants FOR SELECT TO public USING (true);
CREATE POLICY "Enable read access for all users" ON public.promos FOR SELECT TO public USING (true);
CREATE POLICY "Allow public read tags" ON public.merchant_tags FOR SELECT TO public USING (true);
CREATE POLICY "Allow public insert search_logs" ON public.search_logs FOR INSERT TO public WITH CHECK (true);

-- Ensure system settings RLS is enabled
ALTER TABLE IF EXISTS public.system_settings ENABLE ROW LEVEL SECURITY;

