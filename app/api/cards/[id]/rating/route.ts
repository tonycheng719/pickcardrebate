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
  
  // 獲取最近的評論（包含多維度評分和標籤）
  const { data: recentReviews } = await supabase
    .from('card_ratings')
    .select(`
      id,
      rating,
      rating_rebate,
      rating_service,
      rating_app,
      rating_welcome,
      review,
      tags,
      helpful_count,
      is_verified,
      created_at,
      user_id
    `)
    .eq('card_id', cardId)
    .eq('status', 'approved')
    .not('review', 'is', null)
    .order('helpful_count', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(20);

  // 獲取評論回覆
  const reviewIds = recentReviews?.map(r => r.id) || [];
  let replies: any[] = [];
  if (reviewIds.length > 0) {
    const { data: repliesData } = await supabase
      .from('review_replies')
      .select('*')
      .in('rating_id', reviewIds)
      .order('created_at', { ascending: true });
    replies = repliesData || [];
  }

  // 獲取用戶的投票
  let userVotes: Record<string, boolean> = {};
  if (user && reviewIds.length > 0) {
    const { data: votesData } = await supabase
      .from('review_votes')
      .select('rating_id, is_helpful')
      .eq('user_id', user.id)
      .in('rating_id', reviewIds);
    
    votesData?.forEach(v => {
      userVotes[v.rating_id] = v.is_helpful;
    });
  }

  // 獲取可用標籤
  const { data: availableTags } = await supabase
    .from('review_tags')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');

  // 計算熱門標籤
  const tagCounts: Record<string, number> = {};
  recentReviews?.forEach(r => {
    r.tags?.forEach((tag: string) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  const popularTags = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([tag, count]) => ({ tag, count }));
  
  return NextResponse.json({
    stats: stats || {
      card_id: cardId,
      total_ratings: 0,
      average_rating: 0,
      avg_rating_rebate: 0,
      avg_rating_service: 0,
      avg_rating_app: 0,
      avg_rating_welcome: 0,
      five_star: 0,
      four_star: 0,
      three_star: 0,
      two_star: 0,
      one_star: 0
    },
    userRating,
    recentReviews: recentReviews || [],
    replies,
    userVotes,
    availableTags: availableTags || [],
    popularTags,
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
  const { 
    rating, 
    review,
    rating_rebate,
    rating_service,
    rating_app,
    rating_welcome,
    tags
  } = body;
  
  if (!rating || rating < 1 || rating > 5) {
    return NextResponse.json({ error: "Rating must be between 1 and 5" }, { status: 400 });
  }
  
  // Upsert - 創建或更新評分（包含多維度評分和標籤）
  const { data, error } = await supabase
    .from('card_ratings')
    .upsert({
      card_id: cardId,
      user_id: user.id,
      rating,
      rating_rebate: rating_rebate || null,
      rating_service: rating_service || null,
      rating_app: rating_app || null,
      rating_welcome: rating_welcome || null,
      review: review || null,
      tags: tags || [],
      status: 'approved', // 可以改為 'pending' 需要審核
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

