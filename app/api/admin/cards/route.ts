import { NextRequest, NextResponse } from "next/server";
import { adminAuthClient } from "@/lib/supabase/admin-client";

export async function POST(request: NextRequest) {
  try {
    const card = await request.json();
    
    if (!card.id) {
      return NextResponse.json({ error: "Missing card ID" }, { status: 400 });
    }

    // Use upsert to handle both create and update
    const { error } = await adminAuthClient
      .from('cards')
      .upsert(card);

    if (error) {
      console.error("Error saving card:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Internal error saving card:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: "Missing card ID" }, { status: 400 });
    }

    const { error } = await adminAuthClient
      .from('cards')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error deleting card:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Internal error deleting card:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

