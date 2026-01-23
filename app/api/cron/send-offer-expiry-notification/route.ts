import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
  });
}

interface ExpoPushMessage {
  to: string;
  sound?: 'default' | null;
  title?: string;
  body?: string;
  data?: Record<string, any>;
}

async function sendExpoPushNotifications(messages: ExpoPushMessage[]) {
  if (messages.length === 0) return { data: [] };
  
  const response = await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messages),
  });

  return await response.json();
}

// Cron: 檢查即將到期的優惠並發送通知
// 每天運行一次，提醒 3 天內到期的優惠
export async function GET() {
  try {
    const supabase = getServiceClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Server config error' }, { status: 500 });
    }

    // 計算日期範圍：今天到 3 天後
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const threeDaysLater = new Date(today);
    threeDaysLater.setDate(threeDaysLater.getDate() + 3);

    // 查找即將到期的優惠
    const { data: expiringPromos, error: promosError } = await supabase
      .from('promos')
      .select('id, title, slug, end_date')
      .gte('end_date', today.toISOString().split('T')[0])
      .lte('end_date', threeDaysLater.toISOString().split('T')[0])
      .eq('is_deleted', false)
      .order('end_date', { ascending: true })
      .limit(10);

    if (promosError) throw promosError;

    if (!expiringPromos || expiringPromos.length === 0) {
      return NextResponse.json({ 
        success: true, 
        message: 'No offers expiring in the next 3 days',
        checked: true,
      });
    }

    // 獲取所有 push tokens
    const { data: tokens, error: tokensError } = await supabase
      .from('user_push_tokens')
      .select('token');

    if (tokensError) throw tokensError;

    if (!tokens || tokens.length === 0) {
      return NextResponse.json({ 
        success: true, 
        message: 'No push tokens registered',
        expiringOffers: expiringPromos.length,
      });
    }

    // 構建通知消息
    const validTokens = tokens.filter(t => t.token && t.token.startsWith('ExponentPushToken'));
    
    // 合併多個即將到期的優惠成一條通知
    const offerTitles = expiringPromos.slice(0, 3).map(p => p.title).join('、');
    const moreCount = expiringPromos.length > 3 ? `等 ${expiringPromos.length} 個優惠` : '';
    
    const messages: ExpoPushMessage[] = validTokens.map(t => ({
      to: t.token,
      sound: 'default',
      title: '⏰ 優惠即將到期',
      body: `${offerTitles}${moreCount} 即將結束，把握最後機會！`,
      data: { 
        type: 'offer_expiry',
        offerIds: expiringPromos.map(p => p.id),
      },
    }));

    // 分批發送
    const batchSize = 100;
    for (let i = 0; i < messages.length; i += batchSize) {
      const batch = messages.slice(i, i + batchSize);
      await sendExpoPushNotifications(batch);
    }

    // 記錄發送歷史
    await supabase.from('notification_history').insert({
      title: '⏰ 優惠即將到期',
      body: `${offerTitles}${moreCount} 即將結束`,
      data: { type: 'offer_expiry', offerIds: expiringPromos.map(p => p.id) },
      sent_count: messages.length,
      target_type: 'all',
      trigger_type: 'cron_offer_expiry',
      created_at: new Date().toISOString(),
    });

    return NextResponse.json({ 
      success: true, 
      expiringOffers: expiringPromos.length,
      notificationsSent: messages.length,
    });
  } catch (e: any) {
    console.error('Offer expiry notification cron error:', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

