import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';
import { logAdminAction } from "@/lib/admin/audit-log";

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { userId, ban } = body;

    if (!userId || typeof ban !== 'boolean') {
        return NextResponse.json({ error: "User ID and ban status are required" }, { status: 400 });
    }

    console.log("[ban-comment] Updating user:", userId, "ban:", ban);

    // Get user info before updating
    const { data: userProfile } = await adminAuthClient
      .from("profiles")
      .select("email, name")
      .eq("id", userId)
      .single();

    const { error } = await adminAuthClient
      .from('profiles')
      .update({ is_banned_comment: ban, updated_at: new Date().toISOString() })
      .eq('id', userId);

    if (error) {
        console.error("Supabase update error:", error);
        throw error;
    }

    // Log admin action
    await logAdminAction({
      adminEmail: 'admin',
      action: ban ? 'ban_comment' : 'unban_comment',
      targetType: 'user',
      targetId: userId,
      targetName: userProfile?.name || userProfile?.email || userId,
    });

    console.log("[ban-comment] Success for user:", userId);
    return NextResponse.json({ success: true, isBannedComment: ban });
  } catch (error: any) {
    console.error("Ban comment error:", error);
    return NextResponse.json({ error: error.message || "Failed to update status" }, { status: 500 });
  }
}

