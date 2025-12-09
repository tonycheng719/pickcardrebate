import { NextResponse } from 'next/server';
import { POPULAR_MERCHANTS } from '@/lib/data/merchants';
import { adminAuthClient } from '@/lib/supabase/admin-client';

export const dynamic = 'force-dynamic';

// Map merchant to DB schema
function mapMerchantToDB(merchant: any): any {
    return {
        id: merchant.id,
        name: merchant.name,
        category_ids: merchant.categoryIds,
        aliases: merchant.aliases,
        logo: merchant.logo,
        accent_color: merchant.accentColor,
        is_general: merchant.isGeneral || false,
        is_online_only: merchant.isOnlineOnly || false,
    };
}

export async function GET(request: Request) {
    try {
        // Check for Service Role Key
        if (!process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.SERVICE_ROLE_KEY) {
            return NextResponse.json({ 
                error: "Missing Service Role Key",
                hint: "Please set SUPABASE_SERVICE_ROLE_KEY in environment variables"
            }, { status: 500 });
        }

        const { searchParams } = new URL(request.url);
        const mode = searchParams.get('mode') || 'upsert'; // 'upsert' or 'replace'

        console.log(`Seeding ${POPULAR_MERCHANTS.length} merchants (mode: ${mode})...`);

        // Get existing merchants from DB to preserve uploaded logos
        const { data: existingMerchants } = await adminAuthClient
            .from('merchants')
            .select('id, logo');

        const existingLogosMap = new Map<string, string>();
        if (existingMerchants) {
            existingMerchants.forEach((m: any) => {
                // Preserve logo if it's a Supabase storage URL (user uploaded)
                if (m.logo && (m.logo.includes('storage') || m.logo.includes('supabase'))) {
                    existingLogosMap.set(m.id, m.logo);
                }
            });
        }

        console.log(`Found ${existingLogosMap.size} merchants with uploaded logos to preserve`);

        // If replace mode, delete all merchants first (except those with uploaded logos)
        if (mode === 'replace') {
            const idsToKeep = Array.from(existingLogosMap.keys());
            if (idsToKeep.length > 0) {
                // Delete merchants that are NOT in idsToKeep
                const { error: deleteError } = await adminAuthClient
                    .from('merchants')
                    .delete()
                    .not('id', 'in', `(${idsToKeep.map(id => `'${id}'`).join(',')})`);
                
                if (deleteError) {
                    console.error('Error deleting merchants:', deleteError);
                }
            } else {
                // Delete all merchants
                const { error: deleteError } = await adminAuthClient
                    .from('merchants')
                    .delete()
                    .neq('id', '___placeholder___'); // Delete all
                
                if (deleteError) {
                    console.error('Error deleting merchants:', deleteError);
                }
            }
        }

        // Prepare payload
        const payload = POPULAR_MERCHANTS.map(merchant => {
            const dbPayload = mapMerchantToDB(merchant);
            
            // Preserve existing Supabase Storage URL if present
            if (existingLogosMap.has(merchant.id)) {
                console.log(`Preserving uploaded logo for ${merchant.id}`);
                dbPayload.logo = existingLogosMap.get(merchant.id);
            }
            
            return dbPayload;
        });

        // Upsert all merchants
        const { data, error } = await adminAuthClient
            .from('merchants')
            .upsert(payload, { onConflict: 'id' })
            .select();

        if (error) {
            console.error('Seed error:', error);
            return NextResponse.json({ 
                error: error.message,
                hint: "Check if the merchants table exists and has the correct schema"
            }, { status: 500 });
        }

        console.log(`Successfully seeded ${data?.length} merchants`);

        // Find any orphaned records in DB that are not in local data
        const localIds = new Set(POPULAR_MERCHANTS.map(m => m.id));
        const { data: allDbMerchants } = await adminAuthClient
            .from('merchants')
            .select('id, name');
        
        const orphanedMerchants = allDbMerchants?.filter((m: any) => !localIds.has(m.id)) || [];

        return NextResponse.json({ 
            success: true,
            message: `Successfully seeded ${data?.length} merchants`,
            count: data?.length,
            preservedLogos: existingLogosMap.size,
            orphanedMerchants: orphanedMerchants.length > 0 ? {
                count: orphanedMerchants.length,
                message: "These merchants exist in DB but not in local data. Consider deleting them.",
                merchants: orphanedMerchants
            } : null
        });

    } catch (error: any) {
        console.error('Seed exception:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// POST: Delete orphaned merchants (those in DB but not in local data)
export async function POST(request: Request) {
    try {
        if (!process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.SERVICE_ROLE_KEY) {
            return NextResponse.json({ error: "Missing Service Role Key" }, { status: 500 });
        }

        const { action, ids } = await request.json();

        if (action === 'delete-orphans') {
            // Get all merchants from DB
            const { data: allDbMerchants } = await adminAuthClient
                .from('merchants')
                .select('id, name');

            // Find orphaned (not in local data)
            const localIds = new Set(POPULAR_MERCHANTS.map(m => m.id));
            const orphanedIds = allDbMerchants
                ?.filter((m: any) => !localIds.has(m.id))
                .map((m: any) => m.id) || [];

            if (orphanedIds.length === 0) {
                return NextResponse.json({ message: "No orphaned merchants to delete" });
            }

            // Delete orphaned merchants
            const { error } = await adminAuthClient
                .from('merchants')
                .delete()
                .in('id', orphanedIds);

            if (error) {
                return NextResponse.json({ error: error.message }, { status: 500 });
            }

            return NextResponse.json({ 
                success: true,
                message: `Deleted ${orphanedIds.length} orphaned merchants`,
                deletedIds: orphanedIds
            });
        }

        if (action === 'delete-specific' && ids && Array.isArray(ids)) {
            const { error } = await adminAuthClient
                .from('merchants')
                .delete()
                .in('id', ids);

            if (error) {
                return NextResponse.json({ error: error.message }, { status: 500 });
            }

            return NextResponse.json({ 
                success: true,
                message: `Deleted ${ids.length} merchants`,
                deletedIds: ids
            });
        }

        return NextResponse.json({ error: "Invalid action" }, { status: 400 });

    } catch (error: any) {
        console.error('Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
