import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { cardIds, userId } = await request.json();

    if (!cardIds || !Array.isArray(cardIds) || cardIds.length < 2) {
      return NextResponse.json({ error: "Invalid cardIds" }, { status: 400 });
    }

    const supabase = await createClient();

    // Log the comparison
    const { error } = await supabase.from("compare_logs").insert({
      card_ids: cardIds,
      user_id: userId || null,
      created_at: new Date().toISOString(),
    });

    if (error) {
      // If table doesn't exist, return success anyway (graceful degradation)
      if (error.code === '42P01') {
        console.warn("compare_logs table doesn't exist yet");
        return NextResponse.json({ success: true, warning: "Table not created" });
      }
      console.error("Error logging comparison:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

