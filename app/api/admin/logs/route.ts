import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

export const dynamic = 'force-dynamic';

// GET: Fetch admin audit logs
export async function GET() {
    try {
        const { data, error } = await adminAuthClient
            .from('admin_audit_logs')
            .select('*')
            .order('created_at', { ascending: false })
            .limit(200);

        if (error) {
            // If table doesn't exist, return empty array
            if (error.code === '42P01' || error.message.includes('does not exist')) {
                console.log("admin_audit_logs table does not exist, returning empty array");
                return NextResponse.json([]);
            }
            throw error;
        }

        return NextResponse.json(data || []);
    } catch (error: any) {
        console.error("API Error fetching logs:", error);
        return NextResponse.json([], { status: 200 }); // Return empty array on error
    }
}

// POST: Create a new audit log entry
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { adminEmail, action, targetType, targetId, targetName, details } = body;

        if (!adminEmail || !action || !targetType) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const { error } = await adminAuthClient
            .from('admin_audit_logs')
            .insert({
                admin_email: adminEmail,
                action,
                target_type: targetType,
                target_id: targetId,
                target_name: targetName,
                details,
                created_at: new Date().toISOString()
            });

        if (error) {
            // If table doesn't exist, silently fail
            if (error.code === '42P01' || error.message.includes('does not exist')) {
                console.log("admin_audit_logs table does not exist, skipping log");
                return NextResponse.json({ success: true, skipped: true });
            }
            throw error;
        }

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error("API Error creating log:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}



