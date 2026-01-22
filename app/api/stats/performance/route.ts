import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, duration, metadata, url, timestamp } = body;

    // 記錄性能數據
    console.log('[Performance]', {
      name,
      duration: `${duration}ms`,
      url,
      timestamp,
      metadata,
    });

    // 可以儲存到資料庫進行後續分析
    // 或者發送到 Prometheus/Grafana

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to log performance' }, { status: 500 });
  }
}

