-- Add missing columns to promos table for admin editing functionality
-- Run this in Supabase SQL Editor

-- Add content column for Markdown content
ALTER TABLE public.promos 
ADD COLUMN IF NOT EXISTS content TEXT;

-- Add related_card_ids for linking to credit cards
ALTER TABLE public.promos 
ADD COLUMN IF NOT EXISTS related_card_ids TEXT[];

-- Add updated_at timestamp
ALTER TABLE public.promos 
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now());

-- Add is_pinned for pinning promos to top
ALTER TABLE public.promos 
ADD COLUMN IF NOT EXISTS is_pinned BOOLEAN DEFAULT false;

-- Refresh the schema cache (PostgREST will automatically pick up changes)
NOTIFY pgrst, 'reload schema';

-- Verify columns were added
SELECT column_name, data_type, is_nullable, column_default
FROM information_schema.columns 
WHERE table_name = 'promos' 
ORDER BY ordinal_position;

