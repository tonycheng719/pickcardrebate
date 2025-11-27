import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // 直接使用 Admin Client 寫入，無視 RLS
    const { error } = await adminAuthClient
      .from('merchant_reviews')
      .insert([
        {
          merchant_id: body.merchantId,
          merchant_name: body.merchantName,
          card_id: body.cardId,
          card_name: body.cardName,
          rating: 0, // Default for reports
          content: body.description,
          user_id: body.userId,
          user_name: body.userEmail?.split('@')[0] || 'Anonymous',
          status: 'pending',
          report_type: body.reportType,
          proposed_info: {
            reward: body.proposedReward,
            condition: body.proposedCondition
          }
        }
      ]);

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Report submission error:", error);
    return NextResponse.json({ error: "Failed to submit report" }, { status: 500 });
  }
}

