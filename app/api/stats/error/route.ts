import { NextRequest, NextResponse } from "next/server";
import { createServiceRoleClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, stack, context, url, userAgent, timestamp } = body;

    // 記錄到資料庫（如果需要）
    const supabase = await createServiceRoleClient();
    
    // 可以創建一個 error_logs 表來儲存錯誤
    // 這裡先記錄到 console
    console.error('[Frontend Error]', {
      message,
      url,
      timestamp,
      userAgent: userAgent?.substring(0, 200),
      context,
    });

    // 如果有 Sentry DSN，也可以在這裡轉發到 Sentry
    // 或者發送到 Slack/Discord 通知

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error logging error:', error);
    return NextResponse.json({ error: 'Failed to log error' }, { status: 500 });
  }
}

