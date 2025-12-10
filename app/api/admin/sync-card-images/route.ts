import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';
import { HK_CARDS } from '@/lib/data/cards';

export const dynamic = 'force-dynamic';

// GET: 預覽哪些卡需要同步圖片
// POST: 執行同步
export async function GET() {
    try {
        if (!process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.SERVICE_ROLE_KEY) {
            return NextResponse.json({ error: "Missing Service Role Key" }, { status: 500 });
        }

        // Get all cards from DB
        const { data: dbCards, error } = await adminAuthClient
            .from('cards')
            .select('id, name, image_url');

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // Create a map of DB cards
        const dbCardMap = new Map(dbCards?.map((c: any) => [c.id, c]) || []);

        // Find cards that need image sync
        const needsSync: any[] = [];
        const alreadyHasDbImage: any[] = [];
        const noImageAnywhere: any[] = [];

        HK_CARDS.forEach((card) => {
            const dbCard = dbCardMap.get(card.id) as any;
            
            // If card has static image but DB doesn't have it (or has empty string)
            if (card.imageUrl && card.imageUrl.startsWith('http')) {
                if (!dbCard) {
                    needsSync.push({ 
                        id: card.id, 
                        name: card.name, 
                        staticImageUrl: card.imageUrl,
                        reason: 'Card not in DB'
                    });
                } else if (!dbCard.image_url || dbCard.image_url === '') {
                    needsSync.push({ 
                        id: card.id, 
                        name: card.name, 
                        staticImageUrl: card.imageUrl,
                        dbImageUrl: dbCard.image_url,
                        reason: 'DB image is empty'
                    });
                } else {
                    alreadyHasDbImage.push({ 
                        id: card.id, 
                        name: card.name, 
                        dbImageUrl: dbCard.image_url 
                    });
                }
            } else {
                // Card doesn't have static image
                if (dbCard?.image_url && dbCard.image_url.startsWith('http')) {
                    alreadyHasDbImage.push({ 
                        id: card.id, 
                        name: card.name, 
                        dbImageUrl: dbCard.image_url 
                    });
                } else {
                    noImageAnywhere.push({ id: card.id, name: card.name });
                }
            }
        });

        return NextResponse.json({
            message: `找到 ${needsSync.length} 張卡需要同步圖片`,
            summary: {
                needsSync: needsSync.length,
                alreadyHasDbImage: alreadyHasDbImage.length,
                noImageAnywhere: noImageAnywhere.length,
            },
            needsSync,
            alreadyHasDbImage: alreadyHasDbImage.slice(0, 10), // Show first 10
            noImageAnywhere,
            instruction: "執行 POST 請求來同步圖片"
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
            .select('id, image_url');

        if (fetchError) {
            return NextResponse.json({ error: fetchError.message }, { status: 500 });
        }

        const dbCardMap = new Map(dbCards?.map((c: any) => [c.id, c]) || []);
        
        const results: any[] = [];
        let successCount = 0;
        let skipCount = 0;
        let errorCount = 0;

        for (const card of HK_CARDS) {
            if (!card.imageUrl || !card.imageUrl.startsWith('http')) {
                continue; // Skip cards without static image
            }

            const dbCard = dbCardMap.get(card.id) as any;
            
            // Only update if DB image is missing or empty
            if (!dbCard || !dbCard.image_url || dbCard.image_url === '') {
                const { error: updateError } = await adminAuthClient
                    .from('cards')
                    .upsert({
                        id: card.id,
                        name: card.name,
                        bank: card.bank,
                        image_url: card.imageUrl,
                        style: card.style,
                        tags: card.tags,
                    }, {
                        onConflict: 'id'
                    });

                if (updateError) {
                    results.push({ id: card.id, name: card.name, success: false, error: updateError.message });
                    errorCount++;
                } else {
                    results.push({ id: card.id, name: card.name, success: true, imageUrl: card.imageUrl });
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
            results: results.filter(r => r.success).slice(0, 20), // Show first 20 successes
            errors: results.filter(r => !r.success),
        });

    } catch (error: any) {
        console.error('Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

