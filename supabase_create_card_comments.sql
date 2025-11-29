-- Create card_comments table for credit card reviews/comments
-- This script is safe to run multiple times

-- Create table if not exists
CREATE TABLE IF NOT EXISTS card_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  card_id TEXT NOT NULL,                    -- References card ID from cards table
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  user_name TEXT,                           -- Cached user name for display
  user_avatar TEXT,                         -- Cached avatar URL
  content TEXT NOT NULL,                    -- Comment content
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),  -- 1-5 star rating
  is_deleted BOOLEAN DEFAULT FALSE,         -- Soft delete flag
  deleted_by TEXT,                          -- Who deleted: 'user' or 'admin'
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for faster queries (IF NOT EXISTS handles duplicates)
CREATE INDEX IF NOT EXISTS idx_card_comments_card_id ON card_comments(card_id);
CREATE INDEX IF NOT EXISTS idx_card_comments_user_id ON card_comments(user_id);
CREATE INDEX IF NOT EXISTS idx_card_comments_created_at ON card_comments(created_at DESC);

-- Enable RLS
ALTER TABLE card_comments ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to avoid conflicts
DROP POLICY IF EXISTS "Anyone can read non-deleted comments" ON card_comments;
DROP POLICY IF EXISTS "Authenticated users can insert own comments" ON card_comments;
DROP POLICY IF EXISTS "Users can update own comments" ON card_comments;
DROP POLICY IF EXISTS "Service role has full access to card_comments" ON card_comments;

-- Recreate policies
-- Allow anyone to read non-deleted comments
CREATE POLICY "Anyone can read non-deleted comments"
ON card_comments FOR SELECT
USING (is_deleted = FALSE);

-- Allow authenticated users to insert their own comments
CREATE POLICY "Authenticated users can insert own comments"
ON card_comments FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Allow users to soft-delete their own comments
CREATE POLICY "Users can update own comments"
ON card_comments FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Service role has full access
CREATE POLICY "Service role has full access to card_comments"
ON card_comments FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Create or replace the rate limit check function
CREATE OR REPLACE FUNCTION check_card_comment_rate_limit(p_user_id UUID, p_card_id TEXT)
RETURNS BOOLEAN AS $$
DECLARE
  last_comment_time TIMESTAMPTZ;
BEGIN
  SELECT created_at INTO last_comment_time
  FROM card_comments
  WHERE user_id = p_user_id 
    AND card_id = p_card_id 
    AND is_deleted = FALSE
  ORDER BY created_at DESC
  LIMIT 1;
  
  -- If no previous comment, allow
  IF last_comment_time IS NULL THEN
    RETURN TRUE;
  END IF;
  
  -- Check if 24 hours have passed
  IF NOW() - last_comment_time > INTERVAL '24 hours' THEN
    RETURN TRUE;
  END IF;
  
  RETURN FALSE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Verify
SELECT 'card_comments table setup completed successfully' as status;
