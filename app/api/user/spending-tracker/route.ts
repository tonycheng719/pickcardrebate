import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// 獲取用戶的消費追蹤
export async function GET(request: NextRequest) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const { searchParams } = new URL(request.url);
  const cardId = searchParams.get('cardId');
  
  let query = supabase
    .from('spending_trackers')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });
  
  if (cardId) {
    query = query.eq('card_id', cardId);
  }
  
  const { data, error } = await query;
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  // 計算接近上限的追蹤項目
  const nearLimit = data?.filter(tracker => {
    const percentage = (tracker.current_amount / tracker.cap_amount) * 100;
    return percentage >= tracker.remind_at_percentage;
  }) || [];
  
  return NextResponse.json({
    trackers: data || [],
    nearLimit
  });
}

// 創建或更新消費追蹤
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const body = await request.json();
  const {
    cardId,
    ruleDescription,
    capAmount,
    capType = 'spending',
    capPeriod = 'monthly',
    currentAmount = 0,
    remindAtPercentage = 80
  } = body;
  
  if (!cardId || !ruleDescription || !capAmount) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  
  // 計算當前週期的開始日期
  const now = new Date();
  let periodStart: Date;
  
  switch (capPeriod) {
    case 'monthly':
      periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case 'quarterly':
      const quarter = Math.floor(now.getMonth() / 3);
      periodStart = new Date(now.getFullYear(), quarter * 3, 1);
      break;
    case 'yearly':
      periodStart = new Date(now.getFullYear(), 0, 1);
      break;
    default:
      periodStart = new Date(now.getFullYear(), now.getMonth(), 1);
  }
  
  const { data, error } = await supabase
    .from('spending_trackers')
    .upsert({
      user_id: user.id,
      card_id: cardId,
      rule_description: ruleDescription,
      cap_amount: capAmount,
      cap_type: capType,
      cap_period: capPeriod,
      current_amount: currentAmount,
      period_start: periodStart.toISOString().split('T')[0],
      remind_at_percentage: remindAtPercentage,
      updated_at: new Date().toISOString()
    }, {
      onConflict: 'user_id,card_id,rule_description,period_start'
    })
    .select()
    .single();
  
  if (error) {
    console.error('Spending tracker error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ success: true, tracker: data });
}

// 更新消費金額
export async function PATCH(request: NextRequest) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const body = await request.json();
  const { id, addAmount, setAmount } = body;
  
  if (!id) {
    return NextResponse.json({ error: "Missing tracker id" }, { status: 400 });
  }
  
  // 獲取當前追蹤器
  const { data: tracker, error: fetchError } = await supabase
    .from('spending_trackers')
    .select('*')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();
  
  if (fetchError || !tracker) {
    return NextResponse.json({ error: "Tracker not found" }, { status: 404 });
  }
  
  // 計算新金額
  let newAmount: number;
  if (setAmount !== undefined) {
    newAmount = setAmount;
  } else if (addAmount !== undefined) {
    newAmount = tracker.current_amount + addAmount;
  } else {
    return NextResponse.json({ error: "Must provide addAmount or setAmount" }, { status: 400 });
  }
  
  const { data, error } = await supabase
    .from('spending_trackers')
    .update({
      current_amount: newAmount,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  // 檢查是否需要提醒
  const percentage = (newAmount / tracker.cap_amount) * 100;
  const shouldRemind = percentage >= tracker.remind_at_percentage;
  
  return NextResponse.json({
    success: true,
    tracker: data,
    shouldRemind,
    percentage: Math.round(percentage)
  });
}

// 刪除追蹤器
export async function DELETE(request: NextRequest) {
  const supabase = await createClient();
  
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  
  if (!id) {
    return NextResponse.json({ error: "Missing tracker id" }, { status: 400 });
  }
  
  const { error } = await supabase
    .from('spending_trackers')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);
  
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ success: true });
}

