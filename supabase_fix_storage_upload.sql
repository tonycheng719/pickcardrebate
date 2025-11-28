-- 修改 Storage 權限，允許未登入 (Anon) 用戶上傳圖片
-- 這對於使用硬編碼 Admin 登入的系統是必要的

-- 1. 刪除舊的嚴格策略
DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
DROP POLICY IF EXISTS "Allow Public Upload" ON storage.objects;

-- 2. 建立新的寬鬆策略 (允許 Anon 和 Authenticated 上傳)
CREATE POLICY "Allow Public Upload"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK ( bucket_id = 'images' );

-- 3. 確保公開讀取權限存在
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'images' );

-- 4. 賦予 Anon 角色對 Storage 的使用權限 (以防萬一)
GRANT ALL ON SCHEMA storage TO anon, authenticated, service_role;
GRANT ALL ON TABLE storage.objects TO anon, authenticated, service_role;
GRANT ALL ON TABLE storage.buckets TO anon, authenticated, service_role;



