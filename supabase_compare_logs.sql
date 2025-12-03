-- Create compare_logs table to track card comparison behavior
CREATE TABLE IF NOT EXISTS compare_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    card_ids TEXT[] NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_compare_logs_created_at ON compare_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_compare_logs_user_id ON compare_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_compare_logs_card_ids ON compare_logs USING GIN(card_ids);

-- Enable RLS
ALTER TABLE compare_logs ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anyone (anonymous users can log comparisons)
CREATE POLICY "Allow insert for all" ON compare_logs
    FOR INSERT
    WITH CHECK (true);

-- Only allow select for authenticated users (admin)
CREATE POLICY "Allow select for authenticated" ON compare_logs
    FOR SELECT
    USING (auth.role() = 'authenticated');

-- Comment
COMMENT ON TABLE compare_logs IS 'Tracks card comparison behavior from the /cards/compare page';
COMMENT ON COLUMN compare_logs.card_ids IS 'Array of card IDs that were compared (2-3 cards)';
COMMENT ON COLUMN compare_logs.user_id IS 'User ID if logged in, NULL for anonymous visitors';

