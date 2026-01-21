import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

function getServiceClient() {
  return createClient(supabaseUrl, supabaseServiceKey);
}

// 發送 Expo Push 通知
async function sendExpoPushNotifications(tokens: string[], title: string, body: string, data?: any) {
  const messages = tokens.map(token => ({
    to: token,
    sound: 'default',
    title,
    body,
    data,
  }));

  try {
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messages),
    });
    return await response.json();
  } catch (error) {
    console.error('Expo push error:', error);
    return null;
  }
}

// GET: 檢查並發送到期提醒 (可由 Vercel Cron 調用)
export async function GET(request: NextRequest) {
  // 驗證 cron secret (可選)
  const authHeader = request.headers.get('authorization');
  const cronSecret = process.env.CRON_SECRET;
  
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const supabase = getServiceClient();
    const today = new Date();
    const results: any[] = [];

    // 獲取所有活躍的優惠提醒
    const { data: reminders, error: reminderError } = await supabase
      .from('offer_reminders')
      .select('*')
      .eq('is_active', true)
      .gte('expiry_date', today.toISOString().split('T')[0]);

    if (reminderError) throw reminderError;

    for (const reminder of reminders || []) {
      const expiryDate = new Date(reminder.expiry_date);
      const daysUntilExpiry = Math.ceil((expiryDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

      // 檢查是否需要發送提醒
      const reminderDays = reminder.reminder_days || [7, 3, 1];
      
      if (!reminderDays.includes(daysUntilExpiry)) {
        continue;
      }

      // 獲取擁有此卡的用戶
      const { data: userCards, error: cardError } = await supabase
        .from('user_cards')
        .select('user_id')
        .eq('card_id', reminder.card_id);

      if (cardError || !userCards?.length) continue;

      const userIds = userCards.map(uc => uc.user_id);

      // 獲取這些用戶的 push tokens
      const { data: pushTokens, error: tokenError } = await supabase
        .from('user_push_tokens')
        .select('token, user_id')
        .in('user_id', userIds);

      if (tokenError || !pushTokens?.length) continue;

      // 構建通知內容
      const title = `⏰ ${reminder.card_name} 優惠即將到期`;
      const body = daysUntilExpiry === 1 
        ? `${reminder.offer_description || '優惠'} 明天到期！`
        : `${reminder.offer_description || '優惠'} 還有 ${daysUntilExpiry} 天到期`;

      // 發送通知
      const tokens = pushTokens.map(pt => pt.token);
      const pushResult = await sendExpoPushNotifications(tokens, title, body, {
        type: 'offer_reminder',
        cardId: reminder.card_id,
        reminderId: reminder.id,
      });

      // 記錄發送結果
      const { error: notifyError } = await supabase
        .from('push_notifications')
        .insert([{
          title,
          message: body,
          target_type: 'card_owners',
          target_users: userIds,
          sent_count: tokens.length,
          data: { cardId: reminder.card_id, daysUntilExpiry },
          result: pushResult,
        }]);

      results.push({
        reminderId: reminder.id,
        cardName: reminder.card_name,
        daysUntilExpiry,
        sentTo: tokens.length,
        success: !notifyError,
      });
    }

    return NextResponse.json({ 
      success: true, 
      processed: results.length,
      results 
    });
  } catch (error: any) {
    console.error('Send offer reminders error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

