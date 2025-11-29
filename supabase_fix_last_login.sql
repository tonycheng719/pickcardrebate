-- Fix last_login column in profiles table

-- 1. Check if last_login column exists, if not add it
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'profiles' AND column_name = 'last_login') THEN
        ALTER TABLE profiles ADD COLUMN last_login TIMESTAMPTZ;
        RAISE NOTICE 'Added last_login column';
    ELSE
        RAISE NOTICE 'last_login column already exists';
    END IF;
END $$;

-- 2. Check current values
SELECT id, email, name, created_at, last_login, updated_at 
FROM profiles 
ORDER BY updated_at DESC 
LIMIT 10;

-- 3. Manually update last_login for a specific user (for testing)
-- Replace the UUID with your actual user ID
UPDATE profiles 
SET last_login = NOW(), updated_at = NOW()
WHERE id = 'c2039171-5638-47c9-9899-1b809c7adfa7';

-- 4. Verify the update
SELECT id, email, last_login, updated_at 
FROM profiles 
WHERE id = 'c2039171-5638-47c9-9899-1b809c7adfa7';

