import { NextRequest, NextResponse } from "next/server";
import { adminAuthClient } from "@/lib/supabase/admin-client";

export async function POST(request: NextRequest) {
  try {
    const merchant = await request.json();
    
    if (!merchant.id) {
      return NextResponse.json({ error: "Missing merchant ID" }, { status: 400 });
    }

    const { error } = await adminAuthClient
      .from('merchants')
      .upsert(merchant);

    if (error) {
      console.error("Error saving merchant:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Internal error saving merchant:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: "Missing merchant ID" }, { status: 400 });
    }

    const { error } = await adminAuthClient
      .from('merchants')
      .delete()
      .eq('id', id);

    if (error) {
      console.error("Error deleting merchant:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Internal error deleting merchant:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

