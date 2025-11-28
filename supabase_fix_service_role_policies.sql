-- Allow Service Role to have full access (bypass RLS) for Admin APIs
-- This is critical for the new backend API routes to work

-- Cards
DROP POLICY IF EXISTS "Service Role Full Access Cards" ON public.cards;
CREATE POLICY "Service Role Full Access Cards" ON public.cards FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Merchants
DROP POLICY IF EXISTS "Service Role Full Access Merchants" ON public.merchants;
CREATE POLICY "Service Role Full Access Merchants" ON public.merchants FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Promos
DROP POLICY IF EXISTS "Service Role Full Access Promos" ON public.promos;
CREATE POLICY "Service Role Full Access Promos" ON public.promos FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Reviews (just in case)
DROP POLICY IF EXISTS "Service Role Full Access Reviews" ON public.merchant_reviews;
CREATE POLICY "Service Role Full Access Reviews" ON public.merchant_reviews FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Logs
DROP POLICY IF EXISTS "Service Role Full Access Logs" ON public.admin_audit_logs;
CREATE POLICY "Service Role Full Access Logs" ON public.admin_audit_logs FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Ensure explicit public read policies still exist (from previous scripts) but this adds explicit Service Role override

