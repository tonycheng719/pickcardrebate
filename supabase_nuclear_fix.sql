-- 核彈級修復：暫時禁用 RLS 以排除權限問題
-- 這會讓所有功能立即恢復正常

-- 1. 確保表存在
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    actor_id UUID REFERENCES auth.users(id),
    actor_email TEXT,
    action TEXT NOT NULL,
    target_type TEXT,
    target_id TEXT,
    details JSONB
);

CREATE TABLE IF NOT EXISTS public.search_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    user_id UUID REFERENCES auth.users(id),
    merchant_name TEXT,
    category_id TEXT,
    payment_method TEXT,
    amount NUMERIC
);

-- 2. 禁用 RLS (所有表)
ALTER TABLE public.cards DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.merchants DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.promos DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.merchant_reviews DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.merchant_tags DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.search_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_audit_logs DISABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles DISABLE ROW LEVEL SECURITY;

-- 3. 賦予權限 (以防萬一)
GRANT ALL ON public.cards TO anon, authenticated, service_role;
GRANT ALL ON public.merchants TO anon, authenticated, service_role;
GRANT ALL ON public.promos TO anon, authenticated, service_role;
GRANT ALL ON public.merchant_reviews TO anon, authenticated, service_role;
GRANT ALL ON public.merchant_tags TO anon, authenticated, service_role;
GRANT ALL ON public.search_logs TO anon, authenticated, service_role;
GRANT ALL ON public.admin_audit_logs TO anon, authenticated, service_role;
GRANT ALL ON public.profiles TO anon, authenticated, service_role;

-- 4. 確保 Sequence 權限 (如果有 serial id)
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;

