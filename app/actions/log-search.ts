"use server";

import { createClient } from "@supabase/supabase-js";

// Use Anon Client to avoid "role '' does not exist" error due to corrupted cookies
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false }
});

interface LogSearchProps {
  merchantId?: string;
  merchantName?: string;
  categoryId?: string;
  amount?: number;
  paymentMethod?: string;
  bestCardId?: string;
  bestRewardAmount?: number;
  userId?: string; // Pass user ID from client explicitly
}

export async function logSearch(props: LogSearchProps) {
  // We don't use createClient() from lib/supabase/server because it reads cookies and causes role errors
  // Instead we trust the userId passed from client (for logging purposes this is low risk)
  
  const { error } = await supabase.from("search_logs").insert({
    user_id: props.userId || null,
    merchant_id: props.merchantId,
    merchant_name: props.merchantName,
    category_id: props.categoryId,
    amount: props.amount,
    payment_method: props.paymentMethod,
    best_card_id: props.bestCardId,
    best_reward_amount: props.bestRewardAmount,
  });

  if (error) {
    // Suppress "role" errors if they somehow still happen (unlikely with anon client)
    if (error.code !== '22023') {
        console.error("Error logging search:", error);
    }
  }
}
