import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Safely get env vars or fallback to empty string to prevent build crash
// The runtime check will happen inside the handler or connection attempt
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Only create client if URL is present, otherwise create a dummy or let it fail at runtime usage
// But for build time, top-level execution shouldn't crash.
const supabase = supabaseUrl 
    ? createClient(supabaseUrl, serviceRoleKey || anonKey, { auth: { persistSession: false } })
    : null;

export async function POST(request: Request) {
  if (!supabase) {
      console.error("Supabase client not initialized (missing env vars)");
      return NextResponse.json({ error: "Internal Server Configuration Error" }, { status: 500 });
  }

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

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error("API Report Error:", e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
