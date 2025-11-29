-- Create admin_audit_logs table for tracking admin actions
CREATE TABLE IF NOT EXISTS admin_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id UUID REFERENCES profiles(id),
  admin_email TEXT NOT NULL,
  action TEXT NOT NULL,           -- 'create', 'update', 'delete', 'ban', 'unban', etc.
  target_type TEXT NOT NULL,      -- 'card', 'promo', 'merchant', 'user', 'setting', etc.
  target_id TEXT,                 -- ID of the affected record
  target_name TEXT,               -- Human-readable name for display
  details JSONB,                  -- Additional details (before/after values, etc.)
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_admin_logs_created_at ON admin_audit_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_admin_logs_admin_id ON admin_audit_logs(admin_id);
CREATE INDEX IF NOT EXISTS idx_admin_logs_target_type ON admin_audit_logs(target_type);

-- Enable RLS
ALTER TABLE admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- Allow service role full access
CREATE POLICY "Service role has full access to admin_audit_logs"
ON admin_audit_logs FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Insert a sample log entry
INSERT INTO admin_audit_logs (admin_email, action, target_type, target_id, details)
VALUES ('system', 'init', 'system', NULL, '{"message": "Admin audit logs table created"}'::jsonb);

-- Verify
SELECT * FROM admin_audit_logs ORDER BY created_at DESC LIMIT 5;

