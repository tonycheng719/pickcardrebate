-- 系統更新日誌表
CREATE TABLE IF NOT EXISTS system_changelogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  version TEXT NOT NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('feature', 'fix', 'improvement', 'maintenance')),
  content TEXT NOT NULL,
  release_date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID
);

-- 創建索引
CREATE INDEX IF NOT EXISTS idx_system_changelogs_version ON system_changelogs(version);
CREATE INDEX IF NOT EXISTS idx_system_changelogs_release_date ON system_changelogs(release_date DESC);
CREATE INDEX IF NOT EXISTS idx_system_changelogs_type ON system_changelogs(type);

-- 啟用 RLS
ALTER TABLE system_changelogs ENABLE ROW LEVEL SECURITY;

-- RLS 政策（允許 service role 完全存取，公開讀取）
CREATE POLICY "Service role full access on system_changelogs" ON system_changelogs
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Public read access on system_changelogs" ON system_changelogs
  FOR SELECT USING (true);

