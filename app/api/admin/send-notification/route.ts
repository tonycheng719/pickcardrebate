import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

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
  badge?: number;
}

// 發送 Expo Push Notification
async function sendExpoPushNotifications(messages: ExpoPushMessage[]) {
  const response = await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(messages),
  });

  const data = await response.json();
  return data;
}

// POST: 發送推送通知
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, body: messageBody, data, targetUserIds, targetAll } = body;

    if (!title || !messageBody) {
      return NextResponse.json({ error: 'title and body required' }, { status: 400 });
    }

    const supabase = getServiceClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Server config error' }, { status: 500 });
    }

    // 獲取目標用戶的 push tokens
    let query = supabase.from('user_push_tokens').select('token, user_id');
    
    if (!targetAll && targetUserIds?.length > 0) {
      query = query.in('user_id', targetUserIds);
    }

    const { data: tokens, error } = await query;

    if (error) throw error;

    if (!tokens || tokens.length === 0) {
      return NextResponse.json({ 
        success: true, 
        sent: 0, 
        message: 'No push tokens found' 
      });
    }

    // 構建推送消息
    const messages: ExpoPushMessage[] = tokens
      .filter(t => t.token && t.token.startsWith('ExponentPushToken'))
      .map(t => ({
        to: t.token,
        sound: 'default',
        title,
        body: messageBody,
        data: data || {},
      }));

    if (messages.length === 0) {
      return NextResponse.json({ 
        success: true, 
        sent: 0, 
        message: 'No valid Expo push tokens found' 
      });
    }

    // 分批發送（Expo 限制每次最多 100 條）
    const batchSize = 100;
    const results = [];
    
    for (let i = 0; i < messages.length; i += batchSize) {
      const batch = messages.slice(i, i + batchSize);
      const result = await sendExpoPushNotifications(batch);
      results.push(result);
    }

    // 記錄發送歷史
    await supabase.from('notification_history').insert({
      title,
      body: messageBody,
      data: data || null,
      sent_count: messages.length,
      target_type: targetAll ? 'all' : 'specific',
      created_at: new Date().toISOString(),
    });

    return NextResponse.json({ 
      success: true, 
      sent: messages.length,
      results,
    });
  } catch (e: any) {
    console.error('Send notification error:', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

