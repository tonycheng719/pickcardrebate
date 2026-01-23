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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { event, params, userId, platform, timestamp } = body;

    if (!event) {
      return NextResponse.json({ error: 'event is required' }, { status: 400 });
    }

    const supabase = getServiceClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Server config error' }, { status: 500 });
    }

    // 記錄到 app_events 表
    // 注意：user_id 需要是有效的 UUID 且存在於 auth.users
    // 如果 userId 無效或不存在，改為 null
    let validUserId: string | null = null;
    if (userId && typeof userId === 'string' && userId.length === 36) {
      // 簡單的 UUID 格式檢查
      const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      if (uuidRegex.test(userId)) {
        validUserId = userId;
      }
    }

    const { error } = await supabase.from('app_events').insert({
      event_name: event,
      event_params: params,
      user_id: validUserId,
      platform: platform || 'unknown',
      created_at: timestamp || new Date().toISOString(),
    });

    if (error) {
      console.error('App event logging error:', JSON.stringify(error));
      // 如果是 foreign key 錯誤，嘗試不帶 user_id 重新插入
      if (error.code === '23503') {
        await supabase.from('app_events').insert({
          event_name: event,
          event_params: params,
          user_id: null,
          platform: platform || 'unknown',
          created_at: timestamp || new Date().toISOString(),
        });
      }
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error('App event API error:', e);
    return NextResponse.json({ success: true }); // 靜默失敗
  }
}

