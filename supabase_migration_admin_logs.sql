-- Admin Audit Logs Table
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    admin_email TEXT NOT NULL,
    action TEXT NOT NULL,
    target_type TEXT NOT NULL, -- 'card', 'merchant', 'report'
    target_id TEXT,
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- Policy: Admin can read all logs (assuming admin role or public for now as we are lenient)
CREATE POLICY "Allow read access for all authenticated users" ON public.admin_audit_logs FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Allow insert access for all authenticated users" ON public.admin_audit_logs FOR INSERT WITH CHECK (auth.role() = 'authenticated');

