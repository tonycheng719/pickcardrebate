"use server";

import { createClient } from "@/lib/supabase/server";

type LogSearchParams = {
  merchantId?: string;
  merchantName?: string;
  categoryId?: string;
  amount?: number;
  paymentMethod?: string;
  bestCardId?: string;
  bestRewardAmount?: number;
};

export async function logSearch(params: LogSearchParams) {
  try {
    const supabase = await createClient();
    
    // Get current user if logged in
    const { data: { user } } = await supabase.auth.getUser();

    const { error } = await supabase.from("search_logs").insert({
      user_id: user?.id || null,
      merchant_id: params.merchantId,
      merchant_name: params.merchantName,
      category_id: params.categoryId,
      amount: params.amount,
      payment_method: params.paymentMethod,
      best_card_id: params.bestCardId,
      best_reward_amount: params.bestRewardAmount,
    });

    if (error) {
      console.error("Failed to log search:", error);
    }
  } catch (e) {
    console.error("Error logging search:", e);
  }
}

