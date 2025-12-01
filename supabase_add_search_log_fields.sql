-- Add is_online column to search_logs table

-- Add the new column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'search_logs' AND column_name = 'is_online') THEN
        ALTER TABLE search_logs ADD COLUMN is_online BOOLEAN DEFAULT FALSE;
        RAISE NOTICE 'Added is_online column to search_logs';
    ELSE
        RAISE NOTICE 'is_online column already exists in search_logs';
    END IF;
END $$;

-- Verify the table structure
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns
WHERE table_name = 'search_logs'
ORDER BY ordinal_position;

