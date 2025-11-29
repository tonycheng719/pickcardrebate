import { NextResponse } from "next/server";
import { adminAuthClient } from "@/lib/supabase/admin-client";
import { logAdminAction } from "@/lib/admin/audit-log";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { userId, ban } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    // Get user info before updating
    const { data: userProfile } = await adminAuthClient
      .from("profiles")
      .select("email, name")
      .eq("id", userId)
      .single();

    const { error } = await adminAuthClient
      .from("profiles")
      .update({ is_banned: ban, updated_at: new Date().toISOString() })
      .eq("id", userId);

    if (error) {
      console.error("Error banning user:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Log admin action
    await logAdminAction({
      adminEmail: 'admin',
      action: ban ? 'ban' : 'unban',
      targetType: 'user',
      targetId: userId,
      targetName: userProfile?.name || userProfile?.email || userId,
    });

    return NextResponse.json({ success: true, banned: ban });
  } catch (error: any) {
    console.error("Ban user error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

