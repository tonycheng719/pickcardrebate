import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

function getServiceClient() {
  return createClient(supabaseUrl, supabaseServiceKey);
}

// GET: 獲取所有優惠提醒
export async function GET() {
  try {
    const supabase = getServiceClient();
    
    const { data, error } = await supabase
      .from('offer_reminders')
      .select('*')
      .order('expiry_date', { ascending: true });

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Get offer reminders error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST: 創建新優惠提醒
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cardId, cardName, offerType, offerDescription, expiryDate, reminderDays } = body;

    if (!cardId || !cardName || !offerType || !expiryDate) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = getServiceClient();

    const { data, error } = await supabase
      .from('offer_reminders')
      .insert([{
        card_id: cardId,
        card_name: cardName,
        offer_type: offerType,
        offer_description: offerDescription,
        expiry_date: expiryDate,
        reminder_days: reminderDays || [7, 3, 1],
      }])
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(data);
  } catch (error: any) {
    console.error('Create offer reminder error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE: 刪除優惠提醒
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    const supabase = getServiceClient();

    const { error } = await supabase
      .from('offer_reminders')
      .delete()
      .eq('id', id);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Delete offer reminder error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

