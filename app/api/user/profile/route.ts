import { NextResponse } from "next/server";
import { adminAuthClient } from "@/lib/supabase/admin-client";

export const dynamic = 'force-dynamic';

// POST: Update user profile using Service Role (bypasses RLS)
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, updates } = body;

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    if (!updates || Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No updates provided" }, { status: 400 });
    }

    console.log(`[Profile API] Updating profile for user ${userId}:`, updates);

    const { error } = await adminAuthClient
      .from("profiles")
      .update(updates)
      .eq("id", userId);

    if (error) {
      console.error("[Profile API] Update error:", error);
      throw error;
    }

    console.log(`[Profile API] Profile updated successfully for user ${userId}`);
    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error("[Profile API] Error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// GET: Fetch user profile using Service Role (bypasses RLS)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    const { data, error } = await adminAuthClient
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) {
      console.error("[Profile API] Fetch error:", error);
      throw error;
    }

    return NextResponse.json({ profile: data });
  } catch (e: any) {
    console.error("[Profile API] Error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

