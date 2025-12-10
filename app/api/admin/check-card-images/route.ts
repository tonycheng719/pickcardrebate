import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';
import { HK_CARDS } from '@/lib/data/cards';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        if (!process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.SERVICE_ROLE_KEY) {
            return NextResponse.json({ error: "Missing Service Role Key" }, { status: 500 });
        }

        // Get all cards from DB
        const { data: dbCards, error } = await adminAuthClient
            .from('cards')
            .select('id, name, image_url')
            .order('name');

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // Create a map of DB cards
        const dbCardMap = new Map(dbCards?.map((c: any) => [c.id, c]) || []);

        // Categorize cards
        const withDbImage: any[] = [];
        const withStaticImage: any[] = [];
        const withoutImage: any[] = [];
        const notInDb: any[] = [];

        HK_CARDS.forEach((card) => {
            const dbCard = dbCardMap.get(card.id) as any;
            
            if (!dbCard) {
                notInDb.push({ id: card.id, name: card.name, staticImageUrl: card.imageUrl || null });
            } else if (dbCard.image_url && dbCard.image_url.startsWith('http')) {
                withDbImage.push({ 
                    id: card.id, 
                    name: card.name, 
                    dbImageUrl: dbCard.image_url,
                    staticImageUrl: card.imageUrl || null
                });
            } else if (card.imageUrl && card.imageUrl.startsWith('http')) {
                withStaticImage.push({ 
                    id: card.id, 
                    name: card.name, 
                    staticImageUrl: card.imageUrl,
                    dbImageUrl: dbCard.image_url || null
                });
            } else {
                withoutImage.push({ 
                    id: card.id, 
                    name: card.name, 
                    dbImageUrl: dbCard.image_url || null,
                    staticImageUrl: card.imageUrl || null
                });
            }
        });

        return NextResponse.json({
            total: HK_CARDS.length,
            dbTotal: dbCards?.length || 0,
            summary: {
                withDbImage: withDbImage.length,
                withStaticImage: withStaticImage.length,
                withoutImage: withoutImage.length,
                notInDb: notInDb.length,
            },
            details: {
                withDbImage: withDbImage.slice(0, 30),
                withStaticImage: withStaticImage.slice(0, 30),
                withoutImage,
                notInDb,
            }
        });

    } catch (error: any) {
        console.error('Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

