import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

function getServiceClient() {
  return createClient(supabaseUrl, supabaseServiceKey);
}

// POST: 按讚/取消按讚
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: commentId } = await params;
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = getServiceClient();

    // 檢查是否已按讚
    const { data: existingLike } = await supabase
      .from('comment_likes')
      .select('id')
      .eq('user_id', userId)
      .eq('comment_id', commentId)
      .single();

    if (existingLike) {
      // 取消按讚
      const { error } = await supabase
        .from('comment_likes')
        .delete()
        .eq('id', existingLike.id);

      if (error) throw error;

      return NextResponse.json({ liked: false });
    } else {
      // 按讚
      const { error } = await supabase
        .from('comment_likes')
        .insert([{ user_id: userId, comment_id: commentId }]);

      if (error) throw error;

      return NextResponse.json({ liked: true });
    }
  } catch (error: any) {
    console.error('Like comment error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

