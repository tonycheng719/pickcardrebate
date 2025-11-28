-- Create reports table for user feedback on calculation errors
CREATE TABLE IF NOT EXISTS public.reports (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
    merchant_name text,
    category_id text,
    amount text,
    payment_method text,
    card_id text,
    description text NOT NULL,
    proposed_reward text,
    status text DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'ignored')),
    created_at timestamptz DEFAULT now()
);

-- RLS Policies
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;

-- Users can create reports
CREATE POLICY "Users can insert own reports" 
ON public.reports FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Admins (or everyone for now if no admin role logic in RLS) can read. 
-- Usually we want only admins to read. 
-- Assuming public insert, private select for now or just allow auth users to see their own?
-- Let's just allow insert for authenticated users.



