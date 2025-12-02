-- Update get_trending_merchants to return 6 items instead of 5
-- Run this in Supabase SQL Editor

CREATE OR REPLACE FUNCTION get_trending_merchants()
RETURNS TABLE (merchant_name text, search_count bigint, merchant_id text) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    sl.merchant_name, 
    COUNT(*) as search_count,
    sl.merchant_id
  FROM search_logs sl
  WHERE sl.created_at > NOW() - INTERVAL '30 days'
  GROUP BY sl.merchant_name, sl.merchant_id
  ORDER BY search_count DESC
  LIMIT 6;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION get_trending_merchants() TO anon;
GRANT EXECUTE ON FUNCTION get_trending_merchants() TO authenticated;
GRANT EXECUTE ON FUNCTION get_trending_merchants() TO service_role;

-- Notify to reload schema
NOTIFY pgrst, 'reload schema';

