import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

export async function GET() {
    try {
        const { data, error } = await adminAuthClient
            .from('system_changelogs')
            .select('*')
            .order('release_date', { ascending: false })
            .order('created_at', { ascending: false });

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error: any) {
        console.error("API Error fetching changelogs:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { version, title, content, type, date } = body;

        // Simple validation
        if (!version || !title) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const { error } = await adminAuthClient
            .from('system_changelogs')
            .insert([{
                version,
                title,
                content,
                type,
                release_date: date || new Date().toISOString().split('T')[0]
            }]);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("API Error creating changelog:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

        const { error } = await adminAuthClient
            .from('system_changelogs')
            .delete()
            .eq('id', id);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("API Error deleting changelog:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

