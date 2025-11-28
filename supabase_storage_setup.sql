-- 創建 Storage Bucket 並設置公開訪問權限
-- 請在 Supabase SQL Editor 中執行

-- 1. 創建一個名為 'images' 的公開 bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- 2. 設置 RLS 策略以允許公開讀取 (雖然後面可能已經是 public，但加個策略保險)
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'images' );

-- 3. 允許已登入用戶 (authenticated) 上傳圖片
CREATE POLICY "Authenticated Upload"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'images' );

-- 4. 允許已登入用戶更新/刪除圖片 (可選，方便管理)
CREATE POLICY "Authenticated Update"
ON storage.objects FOR UPDATE
TO authenticated
USING ( bucket_id = 'images' );

CREATE POLICY "Authenticated Delete"
ON storage.objects FOR DELETE
TO authenticated
USING ( bucket_id = 'images' );



