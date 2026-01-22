import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message, stack, context, url, userAgent, timestamp } = body;

    // 記錄到 console（可以之後擴展到資料庫或 Sentry）
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
