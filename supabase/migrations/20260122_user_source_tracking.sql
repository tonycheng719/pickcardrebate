-- 用戶來源追蹤
-- 添加註冊來源和最後登入來源欄位

-- 添加欄位到 profiles 表
ALTER TABLE profiles 
ADD COLUMN IF NOT EXISTS signup_source TEXT DEFAULT 'web',
ADD COLUMN IF NOT EXISTS last_login_source TEXT,
ADD COLUMN IF NOT EXISTS last_login_at TIMESTAMPTZ;

-- 添加註釋
COMMENT ON COLUMN profiles.signup_source IS '註冊來源: web, ios, android';
COMMENT ON COLUMN profiles.last_login_source IS '最後登入來源: web, ios, android';
COMMENT ON COLUMN profiles.last_login_at IS '最後登入時間';

-- 創建函數：記錄登入來源
CREATE OR REPLACE FUNCTION update_login_source(
  p_user_id UUID,
  p_source TEXT
) RETURNS VOID AS $$
BEGIN
  UPDATE profiles 
  SET 
    last_login_source = p_source,
    last_login_at = NOW()
  WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 創建 API 端點用的 RPC
-- 允許用戶更新自己的登入來源
CREATE OR REPLACE FUNCTION record_login(source TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE profiles 
  SET 
    last_login_source = source,
    last_login_at = NOW()
  WHERE id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

