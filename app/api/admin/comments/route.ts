import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

function getServiceClient() {
  return createClient(supabaseUrl, supabaseServiceKey);
}

// GET: 獲取所有留言（後台用）
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const contentType = searchParams.get('contentType'); // 'card', 'article', or null for all
    const status = searchParams.get('status'); // 'visible', 'hidden', 'all'
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');

    const supabase = getServiceClient();
    const offset = (page - 1) * limit;

    let query = supabase
      .from('comments')
      .select(`
        *,
        user:profiles!comments_user_id_fkey(id, name, email, avatar_url)
      `, { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);

    if (contentType) {
      query = query.eq('content_type', contentType);
    }

    if (status === 'visible') {
      query = query.eq('is_hidden', false);
    } else if (status === 'hidden') {
      query = query.eq('is_hidden', true);
    }

    const { data: comments, count, error } = await query;

    if (error) throw error;

    // 獲取舉報數據
    const commentIds = comments?.map(c => c.id) || [];
    const { data: reports } = await supabase
      .from('comment_reports')
      .select('comment_id, reason, status')
      .in('comment_id', commentIds);

    // 合併舉報信息
    const commentsWithReports = comments?.map(comment => ({
      ...comment,
      reports: reports?.filter(r => r.comment_id === comment.id) || [],
      reportCount: reports?.filter(r => r.comment_id === comment.id).length || 0,
    }));

    return NextResponse.json({
      comments: commentsWithReports,
      total: count,
      page,
      limit,
    });
  } catch (error: any) {
    console.error('Admin get comments error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PATCH: 更新留言（隱藏/置頂）
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, is_hidden, is_pinned } = body;

    if (!id) {
      return NextResponse.json({ error: 'Missing comment id' }, { status: 400 });
    }

    const supabase = getServiceClient();

    const updateData: any = {};
    if (typeof is_hidden === 'boolean') updateData.is_hidden = is_hidden;
    if (typeof is_pinned === 'boolean') updateData.is_pinned = is_pinned;

    const { data, error } = await supabase
      .from('comments')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Admin update comment error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: 刪除留言
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing comment id' }, { status: 400 });
    }

    const supabase = getServiceClient();

    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Admin delete comment error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
