-- Add created_at and last_login columns to profiles table
-- Run this in Supabase SQL Editor

-- Add created_at column (if not exists)
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ DEFAULT NOW();

-- Add last_login column (if not exists)
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS last_login TIMESTAMPTZ;

-- Remove last_ip column (optional - you can keep it for historical data)
-- ALTER TABLE public.profiles DROP COLUMN IF EXISTS last_ip;

-- Update existing records: set created_at to the earliest known timestamp if null
UPDATE public.profiles 
SET created_at = COALESCE(updated_at, NOW()) 
WHERE created_at IS NULL;

-- Notify PostgREST to reload schema
NOTIFY pgrst, 'reload schema';

