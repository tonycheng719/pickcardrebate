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

// POST: 註冊/更新 Push Token
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, token, platform } = body;

    if (!userId || !token) {
      return NextResponse.json({ error: 'userId and token required' }, { status: 400 });
    }

    const supabase = getServiceClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Server config error' }, { status: 500 });
    }

    // Upsert token (一個用戶一個 token)
    const { error } = await supabase
      .from('user_push_tokens')
      .upsert({
        user_id: userId,
        token,
        platform: platform || 'unknown',
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'user_id'
      });

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error('Push token registration error:', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// DELETE: 移除 Push Token
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId required' }, { status: 400 });
    }

    const supabase = getServiceClient();
    if (!supabase) {
      return NextResponse.json({ error: 'Server config error' }, { status: 500 });
    }

    const { error } = await supabase
      .from('user_push_tokens')
      .delete()
      .eq('user_id', userId);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}


