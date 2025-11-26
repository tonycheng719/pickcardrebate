"use server";

import { createClient } from "@/lib/supabase/server";

export type SubmitReportState = {
  success?: boolean;
  error?: string;
};

export async function submitReport(prevState: SubmitReportState, formData: FormData): Promise<SubmitReportState> {
  const supabase = await createClient();
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    return { error: "請先登入會員" };
  }

  const merchant_name = formData.get("merchant_name") as string;
  const category_id = formData.get("category_id") as string;
  const amount = formData.get("amount") as string;
  const payment_method = formData.get("payment_method") as string;
  const card_id = formData.get("card_id") as string;
  const description = formData.get("description") as string;
  const proposed_reward = formData.get("proposed_reward") as string;

  if (!description) {
    return { error: "請填寫描述" };
  }

  try {
    const { error } = await supabase.from("reports").insert({
      user_id: user.id,
      merchant_name,
      category_id,
      amount,
      payment_method,
      card_id,
      description,
      proposed_reward,
    });

    if (error) throw error;

    return { success: true };
  } catch (error: any) {
    console.error("Report submission error:", error);
    return { error: error.message || "提交失敗，請稍後再試" };
  }
}

