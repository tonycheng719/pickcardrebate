import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        if (!process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.SERVICE_ROLE_KEY) {
            return NextResponse.json({ error: "Missing Service Role Key" }, { status: 500 });
        }

        // Get all merchants from DB
        const { data: merchants, error } = await adminAuthClient
            .from('merchants')
            .select('id, name, logo')
            .order('name');

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // Categorize by logo type
        const withUploadedLogo: any[] = [];
        const withClearbitLogo: any[] = [];
        const withEmojiOrText: any[] = [];
        const withoutLogo: any[] = [];

        merchants?.forEach((m: any) => {
            if (!m.logo) {
                withoutLogo.push({ id: m.id, name: m.name });
            } else if (m.logo.includes('supabase') || m.logo.includes('storage')) {
                withUploadedLogo.push({ id: m.id, name: m.name, logo: m.logo });
            } else if (m.logo.includes('clearbit') || m.logo.includes('logo.')) {
                withClearbitLogo.push({ id: m.id, name: m.name, logo: m.logo });
            } else {
                withEmojiOrText.push({ id: m.id, name: m.name, logo: m.logo });
            }
        });

        return NextResponse.json({
            total: merchants?.length || 0,
            summary: {
                withUploadedLogo: withUploadedLogo.length,
                withClearbitLogo: withClearbitLogo.length,
                withEmojiOrText: withEmojiOrText.length,
                withoutLogo: withoutLogo.length,
            },
            details: {
                withUploadedLogo,
                withClearbitLogo,
                withEmojiOrText: withEmojiOrText.slice(0, 20), // Show first 20
                withoutLogo,
            }
        });

    } catch (error: any) {
        console.error('Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

