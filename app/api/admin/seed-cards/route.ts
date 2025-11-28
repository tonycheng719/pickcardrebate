import { NextResponse } from 'next/server';
import { HK_CARDS } from '@/lib/data/cards';
import { adminAuthClient } from '@/lib/supabase/admin-client';
import { CreditCard } from '@/lib/types';

// Helper function to map card data to DB schema
function mapCardToDB(card: CreditCard): any {
    return {
        id: card.id,
        name: card.name,
        bank: card.bank,
        image_url: card.imageUrl,
        style: card.style,
        tags: card.tags,
        foreign_currency_fee: card.foreignCurrencyFee,
        reward_timeline: card.rewardTimeline,
        welcome_offer_text: card.welcomeOfferText,
        welcome_offer_reward: card.welcomeOfferReward,
        welcome_offer_deadline: card.welcomeOfferDeadline,
        apply_url: card.applyUrl,
        selling_points: card.sellingPoints,
        fee_waiver_condition: card.feeWaiverCondition,
        waiver_method: card.waiverMethod,
        rules: card.rules,
        reward_config: card.rewardConfig
    };
}

export async function GET(request: Request) {
    try {
        console.log(`Seeding ${HK_CARDS.length} cards...`);

        // Debug Info
        const keyCheck = process.env.SUPABASE_SERVICE_ROLE_KEY 
            ? `Present (Starts with ${process.env.SUPABASE_SERVICE_ROLE_KEY.substring(0, 5)}...)`
            : "Missing";
            
        console.log("Checking SUPABASE_SERVICE_ROLE_KEY:", keyCheck);
        
        // Fetch existing cards to check for custom images
        const { data: existingCards } = await adminAuthClient
            .from('cards')
            .select('id, image_url');
            
        const existingImagesMap = new Map();
        if (existingCards) {
            existingCards.forEach((c: any) => {
                if (c.image_url && c.image_url.includes("supabase")) {
                    existingImagesMap.set(c.id, c.image_url);
                }
            });
        }

        const payload = HK_CARDS.map(card => {
            const dbPayload = mapCardToDB(card);
            // Preserve existing Supabase Storage URL if present
            if (existingImagesMap.has(card.id)) {
                console.log(`Preserving custom image for ${card.id}: ${existingImagesMap.get(card.id)}`);
                dbPayload.image_url = existingImagesMap.get(card.id);
            }
            return dbPayload;
        });
        
        const { data, error } = await adminAuthClient
            .from('cards')
            .upsert(payload, { onConflict: 'id' })
            .select();

        if (error) {
            console.error('Seed error:', error);
            return NextResponse.json({ 
                error: error.message,
                debug: {
                    envVarStatus: keyCheck,
                    hint: "If envVarStatus is Missing or using a placeholder, please set SUPABASE_SERVICE_ROLE_KEY in Zeabur settings."
                }
            }, { status: 500 });
        }

        return NextResponse.json({ 
            message: 'Successfully seeded cards', 
            count: data?.length,
            cards: data 
        });
    } catch (error: any) {
        console.error('Seed exception:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
