import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

export const dynamic = 'force-dynamic';

// POST: Record a page view
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { pageType, pageId, pageName } = body;

    if (!pageType || !pageId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 策略：先嘗試插入新記錄，如果唯一約束衝突則更新
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

    if (insertError) {
      // 唯一約束衝突 = 記錄已存在，需要更新 view_count
      if (insertError.code === '23505') {
        // 先獲取當前 view_count，再 +1 更新
        const { data: existing } = await adminAuthClient
          .from('page_views')
          .select('id, view_count')
          .eq('page_type', pageType)
          .eq('page_id', pageId)
          .single();

        if (existing) {
          await adminAuthClient
            .from('page_views')
            .update({ 
              view_count: existing.view_count + 1,
              last_viewed_at: new Date().toISOString()
            })
            .eq('id', existing.id);
        }
      }
      // 表不存在，靜默失敗
      else if (insertError.code === '42P01') {
        console.log('page_views table does not exist yet');
      }
      else {
        throw insertError;
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error recording page view:', error);
    return NextResponse.json({ success: true }); // Silent fail for analytics
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

