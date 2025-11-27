import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

export const dynamic = 'force-dynamic'; // 禁用緩存

export async function GET() {
  try {
    const supabase = adminAuthClient;
    const todayStart = new Date(new Date().setHours(0,0,0,0)).toISOString();

    // 並行獲取數據以加快速度
    const [
      { count: usersCount },
      { count: cardsCount },
      { count: reviewsCount }, // Pending reviews
      { count: todaySearchesCount },
      { data: recentReviews },
      { data: topSearches }
    ] = await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('cards').select('*', { count: 'exact', head: true }),
      supabase.from('merchant_reviews').select('*', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('search_logs').select('*', { count: 'exact', head: true }).gte('created_at', todayStart),
      // Get recent 5 reviews
      supabase.from('merchant_reviews')
        .select('user_name, report_type, merchant_name, created_at')
        .order('created_at', { ascending: false })
        .limit(5),
      // Get top 5 searches (last 24h) - Simple aggregation fallback
      supabase.from('search_logs')
        .select('merchant_name')
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
        .limit(200) // Analyze last 200 searches for trends
    ]);

    // Calculate top searches from the sample
    const searchCounts: Record<string, number> = {};
    topSearches?.forEach(log => {
        if (log.merchant_name) {
            searchCounts[log.merchant_name] = (searchCounts[log.merchant_name] || 0) + 1;
        }
    });
    const sortedTopSearches = Object.entries(searchCounts)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([term, count]) => ({ term, count, trend: count > 5 ? 'up' : 'flat' }));

    return NextResponse.json({
      users: usersCount || 0,
      cards: cardsCount || 0,
      reviews: reviewsCount || 0,
      todaySearches: todaySearchesCount || 0,
      recentReviews: recentReviews || [],
      topSearches: sortedTopSearches || []
    });
  } catch (error) {
    console.error("Admin stats API error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}

