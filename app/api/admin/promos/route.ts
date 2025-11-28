import { NextRequest, NextResponse } from "next/server";
import { adminAuthClient } from "@/lib/supabase/admin-client";

export async function POST(request: NextRequest) {
  try {
    const promo = await request.json();
    
    if (!promo.id) {
      return NextResponse.json({ error: "Missing promo ID" }, { status: 400 });
    }

    const { error } = await adminAuthClient
      .from('promos')
      .upsert(promo);

    if (error) {
      console.error("Error saving promo:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Internal error saving promo:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: "Missing promo ID" }, { status: 400 });
    }

    const { error } = await adminAuthClient
      .from('promos')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error deleting promo:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Internal error deleting promo:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

