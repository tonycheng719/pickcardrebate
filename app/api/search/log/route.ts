import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { merchantId, merchantName, categoryId, amount, paymentMethod, bestCardId, bestRewardAmount, userId } = body;

    const supabase = await createClient();

    // Use service role if needed? No, anonymous insert should be allowed if RLS permits.
    // But for safety and reliability, we often use service role for logs if user is anon.
    // Let's stick to standard client first. If RLS fails, we will see.
    // Actually, supabase_migration_search_logs.sql should have granted INSERT to anon.
    
    const { error } = await supabase.from("search_logs").insert({
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
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Invalid request:", error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

