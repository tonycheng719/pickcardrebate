-- 1. Ensure the function exists and has correct permissions
CREATE OR REPLACE FUNCTION get_trending_merchants()
RETURNS TABLE (merchant_name text, search_count bigint, merchant_id text) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    sl.merchant_name, 
    COUNT(*) as search_count,
    -- Use a subquery or aggregation to get a valid ID. 
    -- Casting MAX(id) to text if id is UUID, or just MAX(merchant_id) if it exists.
    -- Assuming merchant_id is stored in search_logs based on previous context.
    MAX(sl.merchant_id::text) as merchant_id
  FROM search_logs sl
  WHERE sl.created_at > (now() - INTERVAL '7 days')
  GROUP BY sl.merchant_name
  ORDER BY search_count DESC
  LIMIT 5;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION get_trending_merchants() TO anon;
GRANT EXECUTE ON FUNCTION get_trending_merchants() TO authenticated;
GRANT EXECUTE ON FUNCTION get_trending_merchants() TO service_role;

-- 2. Insert some dummy data to ensure the leaderboard is not empty
-- Only inserts if table is empty to avoid pollution
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM search_logs LIMIT 1) THEN
        INSERT INTO search_logs (user_id, merchant_name, merchant_id, category_id, amount, payment_method, created_at)
        VALUES 
        (NULL, 'HKTVMall', 'hktvmall_id', 'online', 500, 'visa', now()),
        (NULL, 'HKTVMall', 'hktvmall_id', 'online', 1200, 'master', now()),
        (NULL, 'HKTVMall', 'hktvmall_id', 'online', 300, 'apple_pay', now()),
        (NULL, 'Foodpanda', 'foodpanda_id', 'dining', 200, 'visa', now()),
        (NULL, 'Foodpanda', 'foodpanda_id', 'dining', 150, 'apple_pay', now()),
        (NULL, '7-Eleven', '711_id', 'supermarket', 50, 'octopus', now()),
        (NULL, 'Apple Store', 'apple_id', 'electronics', 8000, 'master', now()),
        (NULL, 'KMB', 'kmb_id', 'transport', 400, 'wowa', now());
    END IF;
END $$;

NOTIFY pgrst, 'reload schema';

