import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// 投票給評論
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const body = await request.json();
  const { ratingId, isHelpful } = body;
  
  if (!ratingId) {
    return NextResponse.json({ error: "ratingId is required" }, { status: 400 });
  }
  
  if (typeof isHelpful !== 'boolean') {
    return NextResponse.json({ error: "isHelpful must be a boolean" }, { status: 400 });
  }
  
  // Upsert vote
  const { data, error } = await supabase
    .from('review_votes')
    .upsert({
      rating_id: ratingId,
      user_id: user.id,
      is_helpful: isHelpful,
    }, {
      onConflict: 'rating_id,user_id'
    })
    .select()
    .single();
  
  if (error) {
    console.error('Vote error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ success: true, vote: data });
}

// 刪除投票
export async function DELETE(request: NextRequest) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const { searchParams } = new URL(request.url);
  const ratingId = searchParams.get('ratingId');
  
  if (!ratingId) {
    return NextResponse.json({ error: "ratingId is required" }, { status: 400 });
  }
  
  const { error } = await supabase
    .from('review_votes')
    .delete()
    .eq('rating_id', ratingId)
    .eq('user_id', user.id);
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ success: true });
}

