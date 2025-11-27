import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

export const dynamic = 'force-dynamic'; // 禁用緩存

export async function GET() {
  try {
    const supabase = adminAuthClient;

    // 並行獲取數據以加快速度
    const [
      { count: usersCount },
      { count: cardsCount },
      { count: reviewsCount }, // 假設 merchant_reviews 表
      { count: todaySearchesCount }
    ] = await Promise.all([
      supabase.from('profiles').select('*', { count: 'exact', head: true }),
      supabase.from('cards').select('*', { count: 'exact', head: true }),
      supabase.from('merchant_reviews').select('*', { count: 'exact', head: true }),
      supabase.from('search_logs').select('*', { count: 'exact', head: true })
        .gte('created_at', new Date(new Date().setHours(0,0,0,0)).toISOString())
    ]);

    return NextResponse.json({
      users: usersCount || 0,
      cards: cardsCount || 0,
      reviews: reviewsCount || 0,
      todaySearches: todaySearchesCount || 0
    });
  } catch (error) {
    console.error("Admin stats API error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}

