import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const supabase = adminAuthClient;

    const { data, error } = await supabase
      .from('system_changelogs')
      .select('*')
      .order('release_date', { ascending: false })
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Supabase fetch changelog error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Changelog API error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch changelogs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const supabase = adminAuthClient;

    const { error } = await supabase
      .from('system_changelogs')
      .insert([{
        version: body.version,
        title: body.title,
        type: body.type,
        content: body.content,
        release_date: body.releaseDate || new Date().toISOString().split('T')[0],
        // created_by: body.userId // Optional if we want to track who posted
      }]);

    if (error) {
      console.error("Supabase insert changelog error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Changelog POST API error:", error);
    return NextResponse.json({ error: error.message || "Failed to create changelog" }, { status: 500 });
  }
}
