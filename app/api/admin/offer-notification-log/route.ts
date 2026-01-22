import { NextRequest, NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

// GET: 獲取已發送的通知記錄
export async function GET() {
  try {
    const { data, error } = await adminAuthClient
      .from('offer_notification_log')
      .select('*')
      .order('sent_at', { ascending: false })
      .limit(500);

    if (error) throw error;

    return NextResponse.json(data || []);
  } catch (error: any) {
    console.error('Get notification log error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

