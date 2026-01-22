-- 添加 username 欄位到 profiles 表
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS username TEXT;

-- 創建唯一索引（不區分大小寫）
CREATE UNIQUE INDEX IF NOT EXISTS idx_profiles_username_lower 
ON profiles (LOWER(username));

-- 保留字列表（用於驗證）
-- admin, support, system, moderator, staff, help, info, contact, official

-- 更新現有用戶：使用 email 前綴作為臨時用戶名
-- UPDATE profiles 
-- SET username = LOWER(SPLIT_PART(email, '@', 1) || '_' || SUBSTR(id::text, 1, 4))
-- WHERE username IS NULL;

