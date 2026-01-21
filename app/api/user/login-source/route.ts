import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// POST: 記錄登入來源
export async function POST(request: NextRequest) {
  try {
    const { userId, source, isSignup } = await request.json();

    if (!userId || !source) {
      return NextResponse.json({ error: 'Missing userId or source' }, { status: 400 });
    }

    // 驗證來源值
    const validSources = ['web', 'ios', 'android'];
    if (!validSources.includes(source)) {
      return NextResponse.json({ error: 'Invalid source' }, { status: 400 });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // 更新登入來源
    const updateData: any = {
      last_login_source: source,
      last_login_at: new Date().toISOString(),
    };

    // 如果是新註冊，也記錄註冊來源
    if (isSignup) {
      updateData.signup_source = source;
    }

    const { error } = await supabase
      .from('profiles')
      .update(updateData)
      .eq('id', userId);

    if (error) {
      console.error('Update login source error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Login source API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

