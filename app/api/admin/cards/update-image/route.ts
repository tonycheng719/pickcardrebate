import { NextRequest, NextResponse } from "next/server";
import { adminAuthClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const { cardId, imageUrl, cardData } = await request.json();

    if (!cardId) {
      return NextResponse.json({ error: "Missing cardId" }, { status: 400 });
    }

    const supabase = adminAuthClient;

    // Check if card exists
    const { data: existing, error: checkError } = await supabase
      .from("cards")
      .select("id")
      .eq("id", cardId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 = no rows returned, which is fine
      console.error("Check error:", checkError);
    }

    if (existing) {
      // Update existing card
      const { error: updateError } = await supabase
        .from("cards")
        .update({
          image_url: imageUrl,
          updated_at: new Date().toISOString()
        })
        .eq("id", cardId);

      if (updateError) {
        console.error("Update error:", updateError);
        return NextResponse.json({ error: updateError.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, action: "updated" });
    } else {
      // Insert new card
      const { error: insertError } = await supabase
        .from("cards")
        .insert({
          id: cardId,
          name: cardData.name,
          bank: cardData.bank,
          image_url: imageUrl,
          tags: cardData.tags,
          selling_points: cardData.sellingPoints,
          welcome_offer_text: cardData.welcomeOfferText,
          fee_waiver_condition: cardData.feeWaiverCondition,
          apply_url: cardData.applyUrl,
          foreign_currency_fee: cardData.foreignCurrencyFee
        });

      if (insertError) {
        console.error("Insert error:", insertError);
        return NextResponse.json({ error: insertError.message }, { status: 500 });
      }

      return NextResponse.json({ success: true, action: "inserted" });
    }
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

