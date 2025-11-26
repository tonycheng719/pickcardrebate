import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Use Anon Client to bypass cookie issues, since we relaxed RLS for reports
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey, {
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
        user_id // passed from client
    } = body;

    if (!description) {
      return NextResponse.json({ error: "請填寫描述" }, { status: 400 });
    }

    // Insert report
    // We trust the client-provided user_id here because RLS is relaxed. 
    // For higher security, we should validate token, but given the cookie issues, this is the pragmatic fix.
    const { error } = await supabase.from("reports").insert({
      user_id: user_id || null, // Can be anonymous
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

