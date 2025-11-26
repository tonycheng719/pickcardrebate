import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Try to use Service Role Key if available, otherwise fallback to Anon Key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, serviceRoleKey || anonKey, {
  auth: { persistSession: false }
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { 
        merchant_name, 
        category_id, 
        amount, 
        payment_method, 
        card_id, 
        description, 
        proposed_reward,
        user_id
    } = body;

    if (!description) {
      return NextResponse.json({ error: "請填寫描述" }, { status: 400 });
    }

    console.log(`Submitting report for user: ${user_id}, using service role: ${!!serviceRoleKey}`);

    // Insert report
    const { error } = await supabase.from("reports").insert({
      user_id: user_id || null,
      merchant_name,
      category_id,
      amount,
      payment_method,
      card_id,
      description,
      proposed_reward,
    });

    if (error) {
        console.error("API Report Insert Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("Report submitted successfully via API");
    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error("API Report Error:", e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
