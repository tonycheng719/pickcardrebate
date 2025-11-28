-- Fix function_search_path_mutable warning by setting explicit search_path

-- Fix get_analytics_summary
ALTER FUNCTION public.get_analytics_summary() SET search_path = public;

-- Fix get_trending_merchants
ALTER FUNCTION public.get_trending_merchants() SET search_path = public;

