import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

export const dynamic = 'force-dynamic';

// POST: Record a page view（優化版：使用 RPC 增量更新）
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pageType, pageId, pageName } = body;

    if (!pageType || !pageId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 嘗試使用 RPC 進行原子增量操作（最高效）
    const { error: rpcError } = await adminAuthClient.rpc('increment_page_view', {
      p_page_type: pageType,
      p_page_id: pageId,
      p_page_name: pageName || pageId
    });

    // 如果 RPC 不存在，使用 fallback 策略
    if (rpcError && rpcError.code === '42883') {
      // RPC 不存在，使用傳統方式
      const { error: insertError } = await adminAuthClient
        .from('page_views')
        .insert({
          page_type: pageType,
          page_id: pageId,
          page_name: pageName || pageId,
          view_count: 1,
          created_at: new Date().toISOString(),
          last_viewed_at: new Date().toISOString()
        });

      if (insertError && insertError.code === '23505') {
        // 衝突：使用 SQL 直接增量（比先查詢再更新更高效）
        await adminAuthClient.rpc('raw_sql', {
          query: `UPDATE page_views SET view_count = view_count + 1, last_viewed_at = NOW() WHERE page_type = $1 AND page_id = $2`,
          params: [pageType, pageId]
        }).catch(() => {
          // 如果 raw_sql 也不存在，使用原始方式
          adminAuthClient
            .from('page_views')
            .update({ last_viewed_at: new Date().toISOString() })
            .eq('page_type', pageType)
            .eq('page_id', pageId);
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    // 靜默失敗 - analytics 不應該影響用戶體驗
    return NextResponse.json({ success: true });
  }
}

// GET: Get page view stats (for admin)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const pageType = searchParams.get('pageType'); // 'card', 'article', or null for all
    const sortBy = searchParams.get('sortBy') || 'view_count'; // 'view_count' or 'last_viewed_at'
    const limit = parseInt(searchParams.get('limit') || '100');

    let query = adminAuthClient
      .from('page_views')
      .select('*')
      .order(sortBy, { ascending: false })
      .limit(limit);

    if (pageType) {
      query = query.eq('page_type', pageType);
    }

    const { data, error } = await query;

    if (error) {
      // If table doesn't exist, return empty array
      if (error.code === '42P01') {
        return NextResponse.json({ stats: [], totalViews: 0 });
      }
      throw error;
    }

    const totalViews = (data || []).reduce((sum, item) => sum + (item.view_count || 0), 0);

    return NextResponse.json({ 
      stats: data || [],
      totalViews
    });
  } catch (error: any) {
    console.error('Error fetching page view stats:', error);
    return NextResponse.json({ stats: [], error: error.message }, { status: 500 });
  }
}

