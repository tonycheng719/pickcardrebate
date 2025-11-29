-- Add SEO and FAQ fields to promos table
ALTER TABLE promos ADD COLUMN IF NOT EXISTS seo_title TEXT;
ALTER TABLE promos ADD COLUMN IF NOT EXISTS seo_description TEXT;
ALTER TABLE promos ADD COLUMN IF NOT EXISTS faqs JSONB DEFAULT '[]'::jsonb;

-- Verify columns
SELECT column_name, data_type 
FROM information_schema.columns 
WHERE table_name = 'promos' 
ORDER BY ordinal_position;

