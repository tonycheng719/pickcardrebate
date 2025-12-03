import { NextRequest, NextResponse } from "next/server";
import { adminAuthClient } from "@/lib/supabase/admin-client";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { cardId, partnerOffer } = body;

    if (!cardId) {
      return NextResponse.json(
        { error: "缺少卡片 ID" },
        { status: 400 }
      );
    }

    const supabase = adminAuthClient;

    // Check if card exists in database
    const { data: existingCard } = await supabase
      .from("cards")
      .select("id")
      .eq("id", cardId)
      .single();

    if (existingCard) {
      // Update existing card
      const { error: updateError } = await supabase
        .from("cards")
        .update({
          partner_offer: partnerOffer,
          updated_at: new Date().toISOString(),
        })
        .eq("id", cardId);

      if (updateError) {
        console.error("Update error:", updateError);
        return NextResponse.json(
          { error: "更新失敗: " + updateError.message },
          { status: 500 }
        );
      }
    } else {
      // Insert new card record with partner offer
      const { error: insertError } = await supabase
        .from("cards")
        .insert({
          id: cardId,
          partner_offer: partnerOffer,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

      if (insertError) {
        console.error("Insert error:", insertError);
        return NextResponse.json(
          { error: "新增失敗: " + insertError.message },
          { status: 500 }
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "伺服器錯誤: " + error.message },
      { status: 500 }
    );
  }
}

