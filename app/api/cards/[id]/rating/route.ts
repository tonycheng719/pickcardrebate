import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// 獲取卡片評分統計和用戶評分
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: cardId } = await params;
  const supabase = await createClient();
  
  // 獲取當前用戶
  const { data: { user } } = await supabase.auth.getUser();
  
  // 獲取評分統計
  const { data: stats } = await supabase
    .from('card_rating_stats')
    .select('*')
    .eq('card_id', cardId)
    .single();
  
  // 獲取用戶自己的評分（如果已登入）
  let userRating = null;
  if (user) {
    const { data } = await supabase
      .from('card_ratings')
      .select('*')
      .eq('card_id', cardId)
      .eq('user_id', user.id)
      .single();
    userRating = data;
  }
  
  // 獲取最近的評論
  const { data: recentReviews } = await supabase
    .from('card_ratings')
    .select(`
      id,
      rating,
      review,
      created_at,
      user_id
    `)
    .eq('card_id', cardId)
    .not('review', 'is', null)
    .order('created_at', { ascending: false })
    .limit(10);
  
  return NextResponse.json({
    stats: stats || {
      card_id: cardId,
      total_ratings: 0,
      average_rating: 0,
      five_star: 0,
      four_star: 0,
      three_star: 0,
      two_star: 0,
      one_star: 0
    },
    userRating,
    recentReviews: recentReviews || []
  });
}

// 提交或更新評分
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: cardId } = await params;
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const body = await request.json();
  const { rating, review } = body;
  
  if (!rating || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
  }
  
  // Upsert - 創建或更新評分
  const { data, error } = await supabase
    .from('card_ratings')
    .upsert({
      card_id: cardId,
      user_id: user.id,
      rating,
      review: review || null,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'card_id,user_id'
    })
    .select()
    .single();
  
  if (error) {
    console.error('Rating error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ success: true, rating: data });
}

// 刪除評分
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: cardId } = await params;
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const { error } = await supabase
    .from('card_ratings')
    .delete()
    .eq('card_id', cardId)
    .eq('user_id', user.id);
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ success: true });
}

