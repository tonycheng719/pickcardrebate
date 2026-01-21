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
    const { error } = await supabase.from('app_events').insert({
      event_name: event,
      event_params: params,
      user_id: userId || null,
      platform: platform || 'unknown',
      created_at: timestamp || new Date().toISOString(),
    });

    if (error) {
      console.error('App event logging error:', error);
      // 不返回錯誤，避免影響 App 體驗
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error('App event API error:', e);
    return NextResponse.json({ success: true }); // 靜默失敗
  }
}

