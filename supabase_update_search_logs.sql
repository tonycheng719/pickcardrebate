-- 更新 search_logs 表以支援更多欄位
-- 執行此腳本前請先備份資料

-- 檢查並添加缺失的欄位
DO $$
BEGIN
  -- amount 欄位
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'search_logs' AND column_name = 'amount') THEN
    ALTER TABLE public.search_logs ADD COLUMN amount numeric;
  END IF;

  -- is_online 欄位 (門市 = false, 網上 = true)
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'search_logs' AND column_name = 'is_online') THEN
    ALTER TABLE public.search_logs ADD COLUMN is_online boolean DEFAULT false;
  END IF;

  -- best_card_id 欄位
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'search_logs' AND column_name = 'best_card_id') THEN
    ALTER TABLE public.search_logs ADD COLUMN best_card_id text;
  END IF;

  -- best_reward_amount 欄位
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'search_logs' AND column_name = 'best_reward_amount') THEN
    ALTER TABLE public.search_logs ADD COLUMN best_reward_amount numeric;
  END IF;

  -- user_id 欄位
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'search_logs' AND column_name = 'user_id') THEN
    ALTER TABLE public.search_logs ADD COLUMN user_id uuid;
  END IF;
END $$;

-- 創建索引以加速查詢
CREATE INDEX IF NOT EXISTS idx_search_logs_created_at ON public.search_logs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_search_logs_merchant_name ON public.search_logs(merchant_name);
CREATE INDEX IF NOT EXISTS idx_search_logs_best_card_id ON public.search_logs(best_card_id);
CREATE INDEX IF NOT EXISTS idx_search_logs_user_id ON public.search_logs(user_id);

-- 確認表結構
SELECT column_name, data_type, is_nullable 
FROM information_schema.columns 
WHERE table_name = 'search_logs'
ORDER BY ordinal_position;

