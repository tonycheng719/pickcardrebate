import { NextRequest, NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

// DELETE: 刪除留言
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = adminAuthClient;

    // 檢查留言是否屬於該用戶
    const { data: comment } = await supabase
      .from('comments')
      .select('user_id')
      .eq('id', id)
      .single();

    if (!comment) {
      return NextResponse.json({ error: '留言不存在' }, { status: 404 });
    }

    if (comment.user_id !== userId) {
      return NextResponse.json({ error: '無權刪除此留言' }, { status: 403 });
    }

    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete comment error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// PATCH: 更新留言（後台用）
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { is_hidden, is_pinned } = body;

    const supabase = adminAuthClient;

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
    console.error('Update comment error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

