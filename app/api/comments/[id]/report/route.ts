import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

function getServiceClient() {
  return createClient(supabaseUrl, supabaseServiceKey);
}

// POST: 舉報留言
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: commentId } = await params;
    const body = await request.json();
    const { userId, reason } = body;

    if (!userId || !reason) {
      return NextResponse.json({ error: 'Missing userId or reason' }, { status: 400 });
    }

    const supabase = getServiceClient();

    // 檢查是否已舉報過
    const { data: existingReport } = await supabase
      .from('comment_reports')
      .select('id')
      .eq('user_id', userId)
      .eq('comment_id', commentId)
      .single();

    if (existingReport) {
      return NextResponse.json({ error: '您已舉報過此留言' }, { status: 400 });
    }

    const { error } = await supabase
      .from('comment_reports')
      .insert([{
        user_id: userId,
        comment_id: commentId,
        reason,
      }]);

    if (error) throw error;

    return NextResponse.json({ success: true, message: '舉報已提交，我們會盡快審核' });
  } catch (error: any) {
    console.error('Report comment error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

