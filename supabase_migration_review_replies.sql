-- Create table for review replies
CREATE TABLE IF NOT EXISTS public.merchant_review_replies (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    review_id uuid REFERENCES public.merchant_reviews(id) ON DELETE CASCADE,
    user_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
    content text NOT NULL,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    is_admin_reply boolean DEFAULT false,
    status text DEFAULT 'active' -- active, hidden, deleted
);

-- Enable RLS for replies
ALTER TABLE public.merchant_review_replies ENABLE ROW LEVEL SECURITY;

-- Policies for replies
-- Everyone can view active replies
CREATE POLICY "Everyone can view active replies" 
ON public.merchant_review_replies FOR SELECT 
USING (status = 'active');

-- Authenticated users can insert replies
CREATE POLICY "Authenticated users can insert replies" 
ON public.merchant_review_replies FOR INSERT 
TO authenticated 
WITH CHECK (true);

-- Users can update/delete their own replies
CREATE POLICY "Users can update own replies" 
ON public.merchant_review_replies FOR UPDATE 
TO authenticated 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own replies" 
ON public.merchant_review_replies FOR DELETE 
TO authenticated 
USING (auth.uid() = user_id);

-- Add is_banned_comment flag to profiles if not exists
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS is_banned_comment boolean DEFAULT false;

-- Grant permissions
GRANT ALL ON public.merchant_review_replies TO service_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.merchant_review_replies TO authenticated;
GRANT SELECT ON public.merchant_review_replies TO anon;

-- Notify to reload schema
NOTIFY pgrst, 'reload schema';

