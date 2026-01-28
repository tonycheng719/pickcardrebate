import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

// Safely get env vars with robust fallbacks
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// Try all possible service role key names
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SERVICE_ROLE_KEY;

function getServiceClient() {
  if (!supabaseUrl || !serviceRoleKey) {
    console.error("CRITICAL: Missing Supabase Config in Wallet Sync API");
    return null;
  }
  return createClient(supabaseUrl, serviceRoleKey, { 
    auth: { 
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false
    } 
  });
}

// GET: Fetch user wallet data using Service Role (bypasses RLS)
export async function GET(request: Request) {
  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json({ error: "Internal Server Configuration Error" }, { status: 500 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    // Fetch cards
    const { data: cardsData, error: cardsError } = await supabase
      .from("user_cards")
      .select("card_id, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: true });

    if (cardsError) {
      console.error("Error fetching user cards (Service Role):", cardsError);
      throw cardsError;
    }
    
    // Log all card IDs for debugging
    console.log(`[Wallet API GET] Raw cards from DB for user ${userId}:`, cardsData?.map(c => c.card_id));

    // Fetch settings
    const { data: settingsData, error: settingsError } = await supabase
      .from("user_card_settings")
      .select("card_id, settings")
      .eq("user_id", userId);

    if (settingsError) {
      console.error("Error fetching user card settings (Service Role):", settingsError);
      throw settingsError;
    }

    const myCardIds = cardsData ? cardsData.map((c: any) => c.card_id) : [];
    const cardSettings: Record<string, any> = {};
    if (settingsData) {
      settingsData.forEach((s: any) => {
        cardSettings[s.card_id] = s.settings;
      });
    }

    console.log(`[Wallet API GET] User ${userId}: ${myCardIds.length} cards found`);

    return NextResponse.json({ myCardIds, cardSettings });
  } catch (e: any) {
    console.error("Wallet Fetch Error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json({ error: "Internal Server Configuration Error" }, { status: 500 });
  }

  try {
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      console.error("JSON parse error in wallet sync POST:", parseError);
      return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 });
    }
    const { userId, action, cardId, settings, cardIds } = body || {};

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
