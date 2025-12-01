-- Check current image URLs for AEON and CNCBI cards

-- 1. Check if these cards exist in the database
SELECT id, name, bank, image_url 
FROM cards 
WHERE id IN ('aeon-wakuwaku', 'cncbi-motion')
ORDER BY id;

-- 2. Check ALL cards with their image URLs (to see pattern)
SELECT id, name, image_url 
FROM cards 
ORDER BY name
LIMIT 50;

-- 3. If you need to manually update the image URLs, use these commands:
-- Replace 'YOUR_UPLOADED_IMAGE_URL' with the actual Supabase storage URL

-- UPDATE cards 
-- SET image_url = 'YOUR_UPLOADED_IMAGE_URL_FOR_AEON'
-- WHERE id = 'aeon-wakuwaku';

-- UPDATE cards 
-- SET image_url = 'YOUR_UPLOADED_IMAGE_URL_FOR_CNCBI'
-- WHERE id = 'cncbi-motion';

