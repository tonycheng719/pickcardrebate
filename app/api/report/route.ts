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
        merchant_name, 
        category_id, 
        amount, 
        payment_method, 
        card_id, 
        card_name,
        description, 
        proposed_reward,
        user_id,
        report_type, // New field
        conditions   // New field
    } = body;

    // Basic validation
    if (!description && report_type !== 'verification') {
      return NextResponse.json({ error: "請填寫描述" }, { status: 400 });
    }

    // Insert report with new fields
    const { error } = await supabase.from("reports").insert({
      user_id: user_id || null,
      merchant_name,
      category_id,
      amount,
      payment_method,
      card_id,
      card_name, // Ensure card_name is saved
      description,
      proposed_reward,
      report_type: report_type || 'error',
      conditions: conditions || [],
      status: 'pending'
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
