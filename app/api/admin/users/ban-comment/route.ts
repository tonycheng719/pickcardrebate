import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, action } = body;

    if (!userId || !action) {
        return NextResponse.json({ error: "User ID and action are required" }, { status: 400 });
    }

    const isBanned = action === "ban";

    const { error } = await adminAuthClient
      .from('profiles')
      .update({ is_banned_comment: isBanned })
      .eq('id', userId);

    if (error) {
        console.error("Supabase update error:", error);
        throw error;
    }

    return NextResponse.json({ success: true, isBanned });
  } catch (error: any) {
    console.error("Ban comment error:", error);
    return NextResponse.json({ error: error.message || "Failed to update status" }, { status: 500 });
  }
}

