-- 為 promos 表添加 sort_order 欄位
ALTER TABLE promos ADD COLUMN IF NOT EXISTS sort_order INTEGER DEFAULT 0;

-- 索引
CREATE INDEX IF NOT EXISTS idx_promos_sort_order ON promos(sort_order DESC);

