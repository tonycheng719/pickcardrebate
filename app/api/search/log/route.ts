import { adminAuthClient } from "@/lib/supabase/admin-client";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { merchantId, merchantName, categoryId, amount, paymentMethod, bestCardId, bestRewardAmount, userId } = body;

    // Use admin client (Service Role) to bypass RLS for logging
    // This ensures search logs are always recorded regardless of user auth state
    const { error } = await adminAuthClient.from("search_logs").insert({
      merchant_id: merchantId,
      merchant_name: merchantName,
      category_id: categoryId,
      amount,
      payment_method: paymentMethod,
      best_card_id: bestCardId,
      best_reward_amount: bestRewardAmount,
      user_id: userId || null, // Optional
    });

    if (error) {
      console.error("Error logging search:", error);
      // Don't return error to client - search logging is non-critical
      // Just log and continue
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Invalid search log request:", error);
    // Still return success - logging failure shouldn't break the user experience
    return NextResponse.json({ success: true });
  }
}

