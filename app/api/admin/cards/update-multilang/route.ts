import { NextRequest, NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cardId, data } = body;

    if (!cardId) {
      return NextResponse.json({ error: 'Missing card ID' }, { status: 400 });
    }

    // Use admin client to bypass RLS
    const supabase = adminAuthClient;

    // Check if card exists
    const { data: existing } = await supabase
      .from('cards')
      .select('id')
      .eq('id', cardId)
      .single();

    if (existing) {
      // Update existing record
      const { error } = await supabase
        .from('cards')
        .update({
          ...data,
          updated_at: new Date().toISOString(),
        })
        .eq('id', cardId);

      if (error) {
        console.error('[Update Card Multi-lang] Update error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    } else {
      // Insert new record
      const { error } = await supabase
        .from('cards')
        .insert({
          id: cardId,
          ...data,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

      if (error) {
        console.error('[Update Card Multi-lang] Insert error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('[Update Card Multi-lang] Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

