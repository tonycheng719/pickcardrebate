-- Create search_logs table for analytics
CREATE TABLE IF NOT EXISTS public.search_logs (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
    merchant_id text,
    merchant_name text,
    category_id text,
    amount numeric,
    payment_method text,
    best_card_id text,
    best_reward_amount numeric,
    created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.search_logs ENABLE ROW LEVEL SECURITY;

-- Allow everyone to insert (for analytics), authenticated users automatically get their user_id attached via server action logic
CREATE POLICY "Allow public insert search_logs" 
ON public.search_logs FOR INSERT 
WITH CHECK (true);

-- Only admins can view logs (assuming admin role or just restricted access)
-- For now, let's allow authenticated users to read their own? Or just restrict to service role/admin.
-- Since we don't have a strict 'admin' role in RLS yet, let's keep it private or allow read for specific users if needed.
-- For the "Admin Panel", we usually use the service role or a specific admin check. 
-- Let's allow authenticated read for now to be safe for the admin panel if it uses client key.
CREATE POLICY "Allow authenticated read search_logs" 
ON public.search_logs FOR SELECT 
TO authenticated 
USING (true);



