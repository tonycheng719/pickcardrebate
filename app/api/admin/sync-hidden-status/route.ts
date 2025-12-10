import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';
import { HK_CARDS } from '@/lib/data/cards';

export const dynamic = 'force-dynamic';

// GET: 預覽哪些卡的 hidden 狀態需要同步
// POST: 執行同步
export async function GET() {
    try {
        if (!process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.SERVICE_ROLE_KEY) {
            return NextResponse.json({ error: "Missing Service Role Key" }, { status: 500 });
        }

        // Get all cards from DB
        const { data: dbCards, error } = await adminAuthClient
            .from('cards')
            .select('id, name, hidden');

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // Create a map of DB cards
        const dbCardMap = new Map(dbCards?.map((c: any) => [c.id, c]) || []);

        // Find cards that need hidden status sync
        const needsSync: any[] = [];
        const alreadySynced: any[] = [];

        HK_CARDS.forEach((card) => {
            const dbCard = dbCardMap.get(card.id) as any;
            const localHidden = card.hidden || false;
            const dbHidden = dbCard?.hidden ?? null;
            
            if (localHidden && dbHidden !== true) {
                // Local says hidden but DB doesn't
                needsSync.push({ 
                    id: card.id, 
                    name: card.name, 
                    localHidden,
                    dbHidden,
                    action: 'set hidden=true'
                });
            } else if (!localHidden && dbHidden === true) {
                // Local says visible but DB says hidden (admin override - keep DB value)
                alreadySynced.push({ 
                    id: card.id, 
                    name: card.name, 
                    localHidden,
                    dbHidden,
                    note: 'Admin override: DB hidden takes priority'
                });
            } else if (localHidden === true && dbHidden === true) {
                alreadySynced.push({ 
                    id: card.id, 
                    name: card.name, 
                    localHidden,
                    dbHidden
                });
            }
        });

        return NextResponse.json({
            message: `找到 ${needsSync.length} 張卡需要同步 hidden 狀態`,
            summary: {
                needsSync: needsSync.length,
                alreadySynced: alreadySynced.length,
            },
            needsSync,
            alreadySynced,
            instruction: "執行 POST 請求來同步 hidden 狀態"
        });

    } catch (error: any) {
        console.error('Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST() {
    try {
        if (!process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.SERVICE_ROLE_KEY) {
            return NextResponse.json({ error: "Missing Service Role Key" }, { status: 500 });
        }

        // Get all cards from DB
        const { data: dbCards, error: fetchError } = await adminAuthClient
            .from('cards')
            .select('id, hidden');

        if (fetchError) {
            return NextResponse.json({ error: fetchError.message }, { status: 500 });
        }

        const dbCardMap = new Map(dbCards?.map((c: any) => [c.id, c]) || []);
        
        const results: any[] = [];
        let successCount = 0;
        let skipCount = 0;
        let errorCount = 0;

        for (const card of HK_CARDS) {
            const localHidden = card.hidden || false;
            const dbCard = dbCardMap.get(card.id) as any;
            const dbHidden = dbCard?.hidden ?? null;
            
            // Only sync if local says hidden and DB doesn't
            if (localHidden && dbHidden !== true) {
                const { error: updateError } = await adminAuthClient
                    .from('cards')
                    .update({ hidden: true })
                    .eq('id', card.id);

                if (updateError) {
                    results.push({ id: card.id, name: card.name, success: false, error: updateError.message });
                    errorCount++;
                } else {
                    results.push({ id: card.id, name: card.name, success: true, hidden: true });
                    successCount++;
                }
            } else {
                skipCount++;
            }
        }

        return NextResponse.json({
            message: `同步完成！成功: ${successCount}, 跳過: ${skipCount}, 失敗: ${errorCount}`,
            successCount,
            skipCount,
            errorCount,
            results: results.filter(r => r.success),
            errors: results.filter(r => !r.success),
        });

    } catch (error: any) {
        console.error('Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

