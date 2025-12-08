-- 管理員操作日誌表
CREATE TABLE IF NOT EXISTS admin_audit_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_email TEXT NOT NULL,
  action TEXT NOT NULL,
  target_type TEXT NOT NULL,
  target_id TEXT,
  target_name TEXT,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 創建索引
CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_admin_email ON admin_audit_logs(admin_email);
CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_action ON admin_audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_created_at ON admin_audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_audit_logs_target_type ON admin_audit_logs(target_type);

-- 啟用 RLS
ALTER TABLE admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- RLS 政策（允許 service role 完全存取）
CREATE POLICY "Service role full access on admin_audit_logs" ON admin_audit_logs
  FOR ALL USING (true) WITH CHECK (true);

