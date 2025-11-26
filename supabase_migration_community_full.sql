-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Merchant Reviews Table
-- Records user feedback on specific merchant + card combinations
-- Updated to include report_type and conditions
CREATE TABLE IF NOT EXISTS public.merchant_reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    merchant_id TEXT, -- Made nullable in case of new merchant discovery
    merchant_name TEXT NOT NULL, -- Store name is mandatory
    card_id TEXT NOT NULL,
    payment_method TEXT,
    actual_rate NUMERIC, -- The rebate rate user claims to have received
    comment TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'verified', 'rejected')),
    upvotes INT DEFAULT 0,
    downvotes INT DEFAULT 0,
    evidence_url TEXT, -- Optional screenshot URL
    report_type TEXT, -- 'error', 'verification', 'discovery'
    conditions TEXT[], -- Array of tags like 'min_spend', 'promo_period'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE public.merchant_reviews ENABLE ROW LEVEL SECURITY;

-- Policies for merchant_reviews
-- Everyone can read verified reviews
CREATE POLICY "Allow public read verified reviews" ON public.merchant_reviews
    FOR SELECT USING (status = 'verified' OR auth.uid() = user_id);

-- Authenticated users can insert reviews
CREATE POLICY "Allow authenticated insert reviews" ON public.merchant_reviews
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Users can update their own reviews (e.g. edit comment)
CREATE POLICY "Allow users update own reviews" ON public.merchant_reviews
    FOR UPDATE USING (auth.uid() = user_id);

-- 2. Merchant Tags Table
-- Crowdsourced tags for merchants (e.g., #online, #dining)
CREATE TABLE IF NOT EXISTS public.merchant_tags (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    merchant_id TEXT NOT NULL,
    tag_name TEXT NOT NULL,
    count INT DEFAULT 1, -- How many users confirmed this tag
    last_updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE public.merchant_tags ENABLE ROW LEVEL SECURITY;

-- Policies for merchant_tags
-- Everyone can read tags
CREATE POLICY "Allow public read tags" ON public.merchant_tags
    FOR SELECT USING (true);

-- Authenticated users can suggest tags (simplified: direct insert for now, usually needs aggregation logic)
CREATE POLICY "Allow authenticated insert tags" ON public.merchant_tags
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- 3. User Reputation Table
-- Gamification to encourage quality contributions
CREATE TABLE IF NOT EXISTS public.user_reputation (
    user_id UUID REFERENCES auth.users(id) PRIMARY KEY,
    points INT DEFAULT 0,
    level INT DEFAULT 1,
    badges TEXT[] DEFAULT '{}', -- Array of badge identifiers
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

-- Enable RLS
ALTER TABLE public.user_reputation ENABLE ROW LEVEL SECURITY;

-- Policies for user_reputation
-- Everyone can read reputation (e.g. to show "Expert" badge next to review)
CREATE POLICY "Allow public read reputation" ON public.user_reputation
    FOR SELECT USING (true);

-- Only system (service_role) can update reputation points
-- No direct update policy for users

-- 4. Review Votes Table (Optional but recommended for preventing double voting)
CREATE TABLE IF NOT EXISTS public.review_votes (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    review_id UUID REFERENCES public.merchant_reviews(id) ON DELETE CASCADE,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    vote_type INT CHECK (vote_type IN (1, -1)), -- 1 for up, -1 for down
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()),
    UNIQUE(review_id, user_id) -- One vote per review per user
);

ALTER TABLE public.review_votes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated vote" ON public.review_votes
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow users change vote" ON public.review_votes
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Allow public read votes" ON public.review_votes
    FOR SELECT USING (true);

-- Grant permissions to anon/authenticated for basic operations
GRANT SELECT, INSERT ON public.merchant_reviews TO authenticated;
GRANT SELECT ON public.merchant_reviews TO anon;

GRANT SELECT, INSERT ON public.merchant_tags TO authenticated;
GRANT SELECT ON public.merchant_tags TO anon;

GRANT SELECT ON public.user_reputation TO anon;
GRANT SELECT ON public.user_reputation TO authenticated;

GRANT SELECT, INSERT, UPDATE ON public.review_votes TO authenticated;
GRANT SELECT ON public.review_votes TO anon;

-- Notify PostgREST to reload schema
NOTIFY pgrst, 'reload schema';
