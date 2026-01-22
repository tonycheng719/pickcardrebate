import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// 獲取計算歷史
export async function GET(request: NextRequest) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get('limit') || '50');
  const offset = parseInt(searchParams.get('offset') || '0');
  
  const { data, error, count } = await supabase
    .from('calculation_history')
    .select('*', { count: 'exact' })
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1);
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  // 計算統計
  const { data: stats } = await supabase
    .from('calculation_history')
    .select('card_id, card_name, merchant_id, merchant_name, reward_amount')
    .eq('user_id', user.id);
  
  // 計算常用卡片和商戶
  const cardCounts: Record<string, { name: string; count: number }> = {};
  const merchantCounts: Record<string, { name: string; count: number }> = {};
  let totalReward = 0;
  
  stats?.forEach(record => {
    // 統計卡片
    if (!cardCounts[record.card_id]) {
      cardCounts[record.card_id] = { name: record.card_name, count: 0 };
    }
    cardCounts[record.card_id].count++;
    
    // 統計商戶
    if (!merchantCounts[record.merchant_id]) {
      merchantCounts[record.merchant_id] = { name: record.merchant_name, count: 0 };
    }
    merchantCounts[record.merchant_id].count++;
    
    totalReward += record.reward_amount || 0;
  });
  
  // 找出最常用的
  const favoriteCard = Object.entries(cardCounts)
    .sort((a, b) => b[1].count - a[1].count)[0];
  const favoriteMerchant = Object.entries(merchantCounts)
    .sort((a, b) => b[1].count - a[1].count)[0];
  
  return NextResponse.json({
    history: data || [],
    total: count || 0,
    stats: {
      totalCalculations: stats?.length || 0,
      totalReward,
      favoriteCard: favoriteCard ? { id: favoriteCard[0], ...favoriteCard[1] } : null,
      favoriteMerchant: favoriteMerchant ? { id: favoriteMerchant[0], ...favoriteMerchant[1] } : null
    }
  });
}

// 添加計算記錄
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const body = await request.json();
  const {
    merchantId,
    merchantName,
    merchantCategory,
    amount,
    cardId,
    cardName,
    percentage,
    rewardAmount,
    paymentMethod,
    rewardPreference
  } = body;
  
  if (!merchantId || !cardId || !amount) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  
  const { data, error } = await supabase
    .from('calculation_history')
    .insert({
      user_id: user.id,
      merchant_id: merchantId,
      merchant_name: merchantName,
      merchant_category: merchantCategory,
      amount,
      card_id: cardId,
      card_name: cardName,
      percentage,
      reward_amount: rewardAmount,
      payment_method: paymentMethod,
      reward_preference: rewardPreference || 'cash'
    })
    .select()
    .single();
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ success: true, record: data });
}

// 刪除記錄
export async function DELETE(request: NextRequest) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  const clearAll = searchParams.get('clearAll');
  
  if (clearAll === 'true') {
    // 清除所有記錄
    const { error } = await supabase
      .from('calculation_history')
      .delete()
      .eq('user_id', user.id);
    
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    
    return NextResponse.json({ success: true, message: 'All records cleared' });
  }
  
  if (!id) {
    return NextResponse.json({ error: "Missing record id" }, { status: 400 });
  }
  
  const { error } = await supabase
    .from('calculation_history')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ success: true });
}

