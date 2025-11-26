import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Use Service Role if available, otherwise Anon Key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, serviceRoleKey || anonKey, {
  auth: { persistSession: false }
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, action, cardId, settings, cardIds } = body;

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    console.log(`Wallet sync: ${action} for user ${userId}`);

    if (action === "add") {
        const { error } = await supabase.from("user_cards").upsert(
            { user_id: userId, card_id: cardId },
            { onConflict: "user_id,card_id" }
        );
        if (error) throw error;
    } 
    else if (action === "remove") {
        const { error } = await supabase.from("user_cards")
            .delete()
            .eq("user_id", userId)
            .eq("card_id", cardId);
        if (error) throw error;
    }
    else if (action === "settings") {
        const { error } = await supabase.from("user_card_settings").upsert(
            { user_id: userId, card_id: cardId, settings },
            { onConflict: "user_id,card_id" }
        );
        if (error) throw error;
    }
    else if (action === "batch_add" && cardIds) {
        const payload = cardIds.map((id: string) => ({ user_id: userId, card_id: id }));
        const { error } = await supabase.from("user_cards").upsert(
            payload,
            { onConflict: "user_id,card_id" }
        );
        if (error) throw error;
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error("Wallet Sync Error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

