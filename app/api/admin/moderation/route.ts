import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

export async function GET() {
    try {
        const { data, error } = await adminAuthClient
            .from('merchant_reviews')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error: any) {
        console.error("API Error fetching moderation list:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { id, status, admin_notes, action } = body;

        if (action === 'delete') {
            const { error } = await adminAuthClient
                .from('merchant_reviews')
                .delete()
                .eq('id', id);
            if (error) throw error;
        } else {
            const { error } = await adminAuthClient
                .from('merchant_reviews')
                .update({ status, admin_notes })
                .eq('id', id);
            if (error) throw error;
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("API Error updating report:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

