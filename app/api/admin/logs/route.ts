import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

export async function GET() {
    try {
        const { data, error } = await adminAuthClient
            .from('admin_audit_logs')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(100); // Limit to last 100 logs for performance

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error: any) {
        console.error("API Error fetching logs:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}



