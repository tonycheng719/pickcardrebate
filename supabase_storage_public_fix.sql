-- Update the 'images' bucket to be public
UPDATE storage.buckets
SET public = true
WHERE id = 'images';

-- Ensure the bucket exists (insert if not, though unlikely if user uploaded)
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO UPDATE
SET public = true;

-- Ensure policies allow public read (for everyone)
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'images');

-- Ensure policies allow upload (INSERT) for anon/authenticated (already done previously but good to reinforce)
DROP POLICY IF EXISTS "Allow Uploads" ON storage.objects;
CREATE POLICY "Allow Uploads"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'images');


