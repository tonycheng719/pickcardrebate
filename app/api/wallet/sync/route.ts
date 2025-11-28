import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

// Safely get env vars with robust fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Try all possible service role key names
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SERVICE_ROLE_KEY;

export async function POST(request: Request) {
  if (!supabaseUrl || !serviceRoleKey) {
      console.error("CRITICAL: Missing Supabase Config in Wallet Sync API");
      return NextResponse.json({ error: "Internal Server Configuration Error: Missing Keys" }, { status: 500 });
  }

  // Always use a fresh client with the service role key for admin-level access
  const supabase = createClient(supabaseUrl, serviceRoleKey, { 
      auth: { 
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false
      } 
  });

  try {
    const body = await request.json();
    const { userId, action, cardId, settings, cardIds } = body;

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

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
    else if (action === "batch_add" && cardIds && Array.isArray(cardIds)) {
        if (cardIds.length > 0) {
            const payload = cardIds.map((id: string) => ({ user_id: userId, card_id: id }));
            const { error } = await supabase.from("user_cards").upsert(
                payload,
                { onConflict: "user_id,card_id" }
            );
            if (error) throw error;
        }
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error("Wallet Sync Error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
