import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

const supabase = supabaseUrl 
    ? createClient(supabaseUrl, serviceRoleKey || anonKey, { auth: { persistSession: false } })
    : null;

export async function POST(request: Request) {
  if (!supabase) {
      console.error("Supabase client not initialized");
      return NextResponse.json({ error: "Internal Server Configuration Error" }, { status: 500 });
  }

  try {
    const body = await request.json();
    const { 
        merchant_id,
        merchant_name, 
        category_id, 
        amount, 
        payment_method, 
        card_id, 
        card_name,
        description, 
        proposed_reward,
        user_id,
        report_type,
        conditions
    } = body;

    // Basic validation
    if (!description && report_type !== 'verification') {
      return NextResponse.json({ error: "請填寫描述" }, { status: 400 });
    }

    // Construct comment with extra context if needed
    let finalComment = description || "";
    if (amount) finalComment += `\n(Transaction Amount: $${amount})`;
    if (category_id) finalComment += `\n(Category: ${category_id})`;
    if (card_name) finalComment += `\n(Card Name: ${card_name})`;

    // Insert into merchant_reviews
    const { error } = await supabase.from("merchant_reviews").insert({
      user_id: user_id || null,
      merchant_id: merchant_id || null,
      merchant_name: merchant_name || "Unknown Merchant",
      card_id: card_id || "unknown",
      payment_method,
      actual_rate: proposed_reward ? parseFloat(proposed_reward) : null,
      comment: finalComment,
      status: 'pending',
      report_type: report_type || 'error',
      conditions: conditions || [],
    });

    if (error) {
        console.error("API Report Insert Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error("API Report Error:", e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
