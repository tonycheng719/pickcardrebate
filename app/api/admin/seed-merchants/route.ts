import { NextResponse } from 'next/server';
import { POPULAR_MERCHANTS } from '@/lib/data/merchants';
import { adminAuthClient } from '@/lib/supabase/admin-client';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        console.log("[Seed Merchants] Starting merchant data sync...");
        
        // Map merchants to DB format
        const merchantsForDB = POPULAR_MERCHANTS.map(m => ({
            id: m.id,
            name: m.name,
            category_ids: m.categoryIds,
            logo: m.logo,
            accent_color: m.accentColor,
            is_general: m.isGeneral || false,
            aliases: m.aliases || [],
            updated_at: new Date().toISOString()
        }));

        // Upsert all merchants
        const { error } = await adminAuthClient
            .from('merchants')
            .upsert(merchantsForDB, { onConflict: 'id' });

        if (error) {
            console.error("[Seed Merchants] Error:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        console.log(`[Seed Merchants] Successfully synced ${merchantsForDB.length} merchants`);
        return NextResponse.json({ 
            success: true, 
            count: merchantsForDB.length,
            message: `成功同步 ${merchantsForDB.length} 個商戶資料`
        });
    } catch (error: any) {
        console.error("[Seed Merchants] Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

