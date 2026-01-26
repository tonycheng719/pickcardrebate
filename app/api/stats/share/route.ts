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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { type, platform, cardIds, merchant } = body;

    const supabase = getServiceClient();
    if (!supabase) {
      // Fail silently if no database
      return NextResponse.json({ success: true });
    }

    // Log to app_events table
    await supabase.from('app_events').insert({
      event_name: 'share',
      event_params: {
        share_type: type,
        platform,
        card_ids: cardIds,
        merchant,
      },
      platform: 'web',
      created_at: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error('Share tracking error:', e);
    return NextResponse.json({ success: true }); // Fail silently
  }
}

