import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    console.log("Submitting report payload:", body);

    // Map frontend fields to DB columns explicitly
    const { error } = await adminAuthClient
      .from('merchant_reviews')
      .insert([
        {
          merchant_id: body.merchantId,
          merchant_name: body.merchantName,
          category_id: body.categoryId,
          amount: body.amount,
          payment_method: body.paymentMethod,
          card_id: body.cardId,
          card_name: body.cardName,
          rating: 0,
          comment: body.description, // DB column is 'comment', frontend sends 'description'
          user_id: body.userId,
          user_name: body.userEmail?.split('@')[0] || 'Anonymous',
          status: 'pending',
          report_type: body.reportType,
          conditions: body.conditions,
          actual_rate: body.proposedReward ? parseFloat(body.proposedReward) : null,
          // proposed_info is optional/extra JSONB
          proposed_info: {
            reward: body.proposedReward,
            condition: body.proposedCondition
          }
        }
      ]);

    if (error) {
        console.error("Supabase insert error:", error);
        throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Report submission error:", error);
    return NextResponse.json({ error: error.message || "Failed to submit report" }, { status: 500 });
  }
}

