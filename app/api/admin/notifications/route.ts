import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Expo Push API
const EXPO_PUSH_URL = 'https://exp.host/--/api/v2/push/send';

function getServiceClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
  });
}

// GET: 獲取通知歷史
export async function GET() {
  try {
    const supabase = getServiceClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Server config error' }, { status: 500 });
    }

    const { data, error } = await supabase
      .from('push_notifications')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;
    return NextResponse.json(data || []);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// POST: 發送推送通知
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, message, data, targetType, targetUsers } = body;

    if (!title || !message) {
      return NextResponse.json({ error: 'Title and message required' }, { status: 400 });
    }

    const supabase = getServiceClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Server config error' }, { status: 500 });
    }

    // 獲取目標用戶的 push tokens
    let query = supabase.from('user_push_tokens').select('token, user_id');
    
    if (targetType === 'specific' && targetUsers?.length > 0) {
      query = query.in('user_id', targetUsers);
    }

    const { data: tokens, error: tokensError } = await query;
    if (tokensError) throw tokensError;

    if (!tokens || tokens.length === 0) {
      return NextResponse.json({ error: 'No push tokens found' }, { status: 404 });
    }

    // 構建 Expo 推送消息
    const messages = tokens.map(t => ({
      to: t.token,
      sound: 'default',
      title,
      body: message,
      data: data || {},
    }));

    // 發送到 Expo Push API
    const response = await fetch(EXPO_PUSH_URL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(messages),
    });

    const result = await response.json();

    // 記錄通知歷史
    await supabase.from('push_notifications').insert({
      title,
      message,
      data,
      target_type: targetType || 'all',
      target_users: targetUsers || null,
      sent_count: tokens.length,
      result: result,
    });

    return NextResponse.json({ 
      success: true, 
      sentCount: tokens.length,
      result 
    });
  } catch (e: any) {
    console.error('Push notification error:', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}


