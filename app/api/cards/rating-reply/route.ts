import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// 創建回覆
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const body = await request.json();
  const { ratingId, content, isOfficial } = body;
  
  if (!ratingId || !content) {
    return NextResponse.json({ error: "ratingId and content are required" }, { status: 400 });
  }
  
  // Check if user is admin for official replies
  let canBeOfficial = false;
  if (isOfficial) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('is_admin')
      .eq('id', user.id)
      .single();
    canBeOfficial = profile?.is_admin === true;
  }
  
  const { data, error } = await supabase
    .from('review_replies')
    .insert({
      rating_id: ratingId,
      user_id: user.id,
      content,
      is_official: canBeOfficial && isOfficial,
    })
    .select()
    .single();
  
  if (error) {
    console.error('Reply error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ success: true, reply: data });
}

// 更新回覆
export async function PUT(request: NextRequest) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const body = await request.json();
  const { replyId, content } = body;
  
  if (!replyId || !content) {
    return NextResponse.json({ error: "replyId and content are required" }, { status: 400 });
  }
  
  const { data, error } = await supabase
    .from('review_replies')
    .update({
      content,
      updated_at: new Date().toISOString(),
    })
    .eq('id', replyId)
    .eq('user_id', user.id)
    .select()
    .single();
  
  if (error) {
    console.error('Reply update error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ success: true, reply: data });
}

// 刪除回覆
export async function DELETE(request: NextRequest) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const { searchParams } = new URL(request.url);
  const replyId = searchParams.get('replyId');
  
  if (!replyId) {
    return NextResponse.json({ error: "replyId is required" }, { status: 400 });
  }
  
  // Check if user is admin or owner
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single();
  
  let query = supabase
    .from('review_replies')
    .delete()
    .eq('id', replyId);
  
  // If not admin, only allow deleting own replies
  if (!profile?.is_admin) {
    query = query.eq('user_id', user.id);
  }
  
  const { error } = await query;
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ success: true });
}

