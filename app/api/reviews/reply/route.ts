import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { reviewId, userId, content, isAdminReply } = body;

    if (!reviewId || !content) {
        return NextResponse.json({ error: "Review ID and content are required" }, { status: 400 });
    }

    // Check if user is banned from commenting (only if not admin reply)
    if (!isAdminReply && userId) {
        const { data: userProfile, error: profileError } = await adminAuthClient
            .from('profiles')
            .select('is_banned_comment')
            .eq('id', userId)
            .single();
        
        if (profileError) {
            console.error("Error checking user ban status:", profileError);
            // Proceed cautiously or fail? Let's fail safe.
            return NextResponse.json({ error: "Failed to verify user status" }, { status: 500 });
        }

        if (userProfile?.is_banned_comment) {
            return NextResponse.json({ error: "User is banned from commenting" }, { status: 403 });
        }
    }

    const { error } = await adminAuthClient
      .from('merchant_review_replies')
      .insert([
        {
          review_id: reviewId,
          user_id: userId || null, // Admin reply might not have user_id or use system ID
          content: content,
          is_admin_reply: isAdminReply || false,
          status: 'active'
        }
      ]);

    if (error) {
        console.error("Supabase insert error:", error);
        throw error;
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Reply submission error:", error);
    return NextResponse.json({ error: error.message || "Failed to submit reply" }, { status: 500 });
  }
}

