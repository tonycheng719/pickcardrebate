-- Function to get trending merchants based on search logs from the last 7 days
CREATE OR REPLACE FUNCTION get_trending_merchants()
RETURNS TABLE (merchant_name text, search_count bigint, merchant_id text) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    sl.merchant_name, 
    COUNT(*) as search_count,
    MAX(sl.merchant_id) as merchant_id -- Use MAX to pick one ID if duplicates exist, or group by ID
  FROM search_logs sl
  WHERE sl.created_at > (now() - INTERVAL '7 days')
  GROUP BY sl.merchant_name
  ORDER BY search_count DESC
  LIMIT 5;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permission to anon and authenticated
GRANT EXECUTE ON FUNCTION get_trending_merchants() TO anon;
GRANT EXECUTE ON FUNCTION get_trending_merchants() TO authenticated;

-- Notify to reload schema
NOTIFY pgrst, 'reload schema';

