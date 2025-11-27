-- Analytics Summary RPC
CREATE OR REPLACE FUNCTION get_analytics_summary()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  total_searches_val bigint;
  avg_amount_val numeric;
  top_merchants_val json;
  category_stats_val json;
  payment_stats_val json;
BEGIN
  -- 1. Total Searches
  SELECT count(*) INTO total_searches_val FROM search_logs;

  -- 2. Average Amount
  SELECT COALESCE(AVG(amount), 0) INTO avg_amount_val FROM search_logs;

  -- 3. Top Merchants (Top 5)
  WITH top_m AS (
    SELECT merchant_name, COUNT(*) as c
    FROM search_logs
    WHERE merchant_name IS NOT NULL
    GROUP BY merchant_name
    ORDER BY c DESC
    LIMIT 5
  )
  SELECT json_agg(json_build_object('merchant_name', merchant_name, 'count', c))
  INTO top_merchants_val
  FROM top_m;

  -- 4. Category Stats
  WITH cat_s AS (
    SELECT category_id, COUNT(*) as c
    FROM search_logs
    WHERE category_id IS NOT NULL
    GROUP BY category_id
    ORDER BY c DESC
  )
  SELECT json_agg(json_build_object('category_id', category_id, 'count', c))
  INTO category_stats_val
  FROM cat_s;

  -- 5. Payment Stats
  WITH pay_s AS (
    SELECT payment_method, COUNT(*) as c
    FROM search_logs
    WHERE payment_method IS NOT NULL
    GROUP BY payment_method
    ORDER BY c DESC
  )
  SELECT json_agg(json_build_object('payment_method', payment_method, 'count', c))
  INTO payment_stats_val
  FROM pay_s;

  RETURN json_build_object(
    'total_searches', total_searches_val,
    'avg_amount', ROUND(avg_amount_val, 1),
    'top_merchants', COALESCE(top_merchants_val, '[]'::json),
    'category_stats', COALESCE(category_stats_val, '[]'::json),
    'payment_stats', COALESCE(payment_stats_val, '[]'::json)
  );
END;
$$;

-- Grant execute permission to anon and authenticated for now (or limit to specific role later)
GRANT EXECUTE ON FUNCTION get_analytics_summary TO anon;
GRANT EXECUTE ON FUNCTION get_analytics_summary TO authenticated;
GRANT EXECUTE ON FUNCTION get_analytics_summary TO service_role;

