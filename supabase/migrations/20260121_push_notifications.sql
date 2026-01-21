-- Push Notifications Tables

-- 用戶 Push Token 表
CREATE TABLE IF NOT EXISTS user_push_tokens (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  token TEXT NOT NULL,
  platform TEXT DEFAULT 'unknown',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- 推送通知歷史表
CREATE TABLE IF NOT EXISTS push_notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  data JSONB,
  target_type TEXT DEFAULT 'all',
  target_users UUID[],
  sent_count INTEGER DEFAULT 0,
  result JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 索引
CREATE INDEX IF NOT EXISTS idx_push_tokens_user ON user_push_tokens(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_created ON push_notifications(created_at DESC);

-- RLS 政策
ALTER TABLE user_push_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE push_notifications ENABLE ROW LEVEL SECURITY;

-- 用戶只能查看自己的 token
CREATE POLICY "Users can view own push token" ON user_push_tokens
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own push token" ON user_push_tokens
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own push token" ON user_push_tokens
  FOR UPDATE USING (auth.uid() = user_id);

-- Service role 可以完全訪問
CREATE POLICY "Service role full access to push_tokens" ON user_push_tokens
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Service role full access to notifications" ON push_notifications
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

