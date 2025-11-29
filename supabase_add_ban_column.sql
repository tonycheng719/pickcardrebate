-- Add is_banned column to profiles table if not exists
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_banned BOOLEAN DEFAULT FALSE;

-- Ensure is_banned_comment column exists
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_banned_comment BOOLEAN DEFAULT FALSE;

-- Verify columns
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'profiles' 
AND column_name IN ('is_banned', 'is_banned_comment', 'last_login', 'created_at');

