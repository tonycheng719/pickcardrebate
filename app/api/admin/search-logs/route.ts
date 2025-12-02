import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Fetch all search logs (most recent 500)
    const { data: logs, error: logsError } = await adminAuthClient
      .from('search_logs')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(500);

    if (logsError) {
      console.error("Error fetching search logs:", logsError);
      // If table doesn't exist, return empty
      if (logsError.code === '42P01' || logsError.message.includes('does not exist')) {
        return NextResponse.json({ logs: [], stats: null });
      }
      throw logsError;
    }

    // Calculate stats
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const fourteenDaysAgo = new Date(today);
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Get counts from database for accurate stats
    const [
      { count: totalCount },
      { count: todayCount },
      { count: yesterdayCount },
      { count: last7Count },
      { count: last14Count },
      { count: last30Count },
    ] = await Promise.all([
      adminAuthClient.from('search_logs').select('*', { count: 'exact', head: true }),
      adminAuthClient.from('search_logs').select('*', { count: 'exact', head: true }).gte('created_at', today.toISOString()),
      adminAuthClient.from('search_logs').select('*', { count: 'exact', head: true }).gte('created_at', yesterday.toISOString()).lt('created_at', today.toISOString()),
      adminAuthClient.from('search_logs').select('*', { count: 'exact', head: true }).gte('created_at', sevenDaysAgo.toISOString()),
      adminAuthClient.from('search_logs').select('*', { count: 'exact', head: true }).gte('created_at', fourteenDaysAgo.toISOString()),
      adminAuthClient.from('search_logs').select('*', { count: 'exact', head: true }).gte('created_at', thirtyDaysAgo.toISOString()),
    ]);

    const stats = {
      total: totalCount || 0,
      today: todayCount || 0,
      yesterday: yesterdayCount || 0,
      last7days: last7Count || 0,
      last14days: last14Count || 0,
      last30days: last30Count || 0,
    };

    return NextResponse.json({ logs: logs || [], stats });
  } catch (error: any) {
    console.error("API Error fetching search logs:", error);
    return NextResponse.json({ logs: [], stats: null }, { status: 500 });
  }
}

