import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

export const dynamic = 'force-dynamic';

// POST: Record a partner offer click
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { cardId, cardName, userId, customerType, source } = body;

    if (!cardId) {
      return NextResponse.json({ error: 'Missing cardId' }, { status: 400 });
    }

    // Check if record exists
    const { data: existing } = await adminAuthClient
      .from('partner_clicks')
      .select('id, click_count')
      .eq('card_id', cardId)
      .single();

    if (existing) {
      // Increment click count
      const { error } = await adminAuthClient
        .from('partner_clicks')
        .update({ 
          click_count: existing.click_count + 1,
          last_clicked_at: new Date().toISOString()
        })
        .eq('id', existing.id);

      if (error) throw error;
    } else {
      // Create new record
      const { error } = await adminAuthClient
        .from('partner_clicks')
        .insert({
          card_id: cardId,
          card_name: cardName || cardId,
          click_count: 1,
          created_at: new Date().toISOString(),
          last_clicked_at: new Date().toISOString()
        });

      if (error) {
        if (error.code === '42P01') {
          console.log('partner_clicks table does not exist yet');
          return NextResponse.json({ success: true, message: 'Table not created yet' });
        }
        throw error;
      }
    }

    // Also log individual click for detailed analytics (silent fail)
    try {
      await adminAuthClient
        .from('partner_click_logs')
        .insert({
          card_id: cardId,
          card_name: cardName,
          user_id: userId || null,
          customer_type: customerType || 'new',
          source: source || 'web', // 'web' or 'app'
          clicked_at: new Date().toISOString(),
          user_agent: request.headers.get('user-agent') || null,
        });
    } catch {
      // Silent fail for detailed logs
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Error recording partner click:', error);
    return NextResponse.json({ success: true }); // Silent fail
  }
}

// GET: Get partner click stats (for admin)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cardId = searchParams.get('cardId');
    const detailed = searchParams.get('detailed') === 'true';

    if (detailed && cardId) {
      // Get detailed click logs for a specific card
      const { data, error } = await adminAuthClient
        .from('partner_click_logs')
        .select('*')
        .eq('card_id', cardId)
        .order('clicked_at', { ascending: false })
        .limit(100);

      if (error && error.code !== '42P01') throw error;

      return NextResponse.json({ logs: data || [] });
    }

    // Get summary stats
    let query = adminAuthClient
      .from('partner_clicks')
      .select('*')
      .order('click_count', { ascending: false });

    if (cardId) {
      query = query.eq('card_id', cardId);
    }

    const { data, error } = await query;

    if (error) {
      if (error.code === '42P01') {
        return NextResponse.json({ stats: [], totalClicks: 0 });
      }
      throw error;
    }

    const totalClicks = (data || []).reduce((sum, item) => sum + (item.click_count || 0), 0);

    return NextResponse.json({ 
      stats: data || [],
      totalClicks
    });
  } catch (error: any) {
    console.error('Error fetching partner click stats:', error);
    return NextResponse.json({ stats: [], error: error.message }, { status: 500 });
  }
}

