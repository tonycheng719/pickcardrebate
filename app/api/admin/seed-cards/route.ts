     1|import { NextResponse } from 'next/server';
     2|import { HK_CARDS } from '@/lib/data/cards';
     3|import { adminAuthClient } from '@/lib/supabase/admin-client';
     4|import { CreditCard } from '@/lib/types';
     5|
     6|// Helper function to map card data to DB schema
     7|function mapCardToDB(card: CreditCard): any {
     8|    return {
     9|        id: card.id,
    10|        name: card.name,
    11|        bank: card.bank,
    12|        image_url: card.imageUrl,
    13|        style: card.style,
    14|        tags: card.tags,
    15|        foreign_currency_fee: card.foreignCurrencyFee,
    16|        reward_timeline: card.rewardTimeline,
    17|        welcome_offer_text: card.welcomeOfferText,
    18|        welcome_offer_reward: card.welcomeOfferReward,
    19|        welcome_offer_deadline: card.welcomeOfferDeadline,
    20|        apply_url: card.applyUrl,
    21|        selling_points: card.sellingPoints,
    22|        fee_waiver_condition: card.feeWaiverCondition,
    23|        waiver_method: card.waiverMethod,
    24|        rules: card.rules,
    25|        reward_config: card.rewardConfig
    26|    };
    27|}
    28|
    29|export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
    30|    try {
    31|        console.log(`Seeding ${HK_CARDS.length} cards...`);
    32|
    33|        // Debug Info
    34|        const keyCheck = process.env.SUPABASE_SERVICE_ROLE_KEY 
    35|            ? `Present (Starts with ${process.env.SUPABASE_SERVICE_ROLE_KEY.substring(0, 5)}...)`
    36|            : "Missing";
    37|            
    38|        console.log("Checking SUPABASE_SERVICE_ROLE_KEY:", keyCheck);
    39|        
    40|        // Fetch existing cards to check for custom images
    41|        const { data: existingCards } = await adminAuthClient
    42|            .from('cards')
    43|            .select('id, image_url');
    44|            
    45|        const existingImagesMap = new Map();
    46|        if (existingCards) {
    47|            existingCards.forEach((c: any) => {
    48|                // More robust check: if it contains "storage" OR "supabase", treat as custom upload
    49|                if (c.image_url && (c.image_url.includes("storage") || c.image_url.includes("supabase"))) {
    50|                    existingImagesMap.set(c.id, c.image_url);
    51|                }
    52|            });
    53|        }
    54|
    55|        const payload = HK_CARDS.map(card => {
    56|            const dbPayload = mapCardToDB(card);
    57|            // Preserve existing Supabase Storage URL if present
    58|            if (existingImagesMap.has(card.id)) {
    59|                console.log(`Preserving custom image for ${card.id}: ${existingImagesMap.get(card.id)}`);
    60|                dbPayload.image_url = existingImagesMap.get(card.id);
    61|            }
    62|            return dbPayload;
    63|        });
    64|        
    65|        const { data, error } = await adminAuthClient
    66|            .from('cards')
    67|            .upsert(payload, { onConflict: 'id' })
    68|            .select();
    69|
    70|        if (error) {
    71|            console.error('Seed error:', error);
    72|            return NextResponse.json({ 
    73|                error: error.message,
    74|                debug: {
    75|                    envVarStatus: keyCheck,
    76|                    hint: "If envVarStatus is Missing or using a placeholder, please set SUPABASE_SERVICE_ROLE_KEY in Zeabur settings."
    77|                }
    78|            }, { status: 500 });
    79|        }
    80|
    81|        return NextResponse.json({ 
    82|            message: 'Successfully seeded cards', 
    83|            count: data?.length,
    84|            cards: data 
    85|        });
    86|    } catch (error: any) {
    87|        console.error('Seed exception:', error);
    88|        return NextResponse.json({ error: error.message }, { status: 500 });
    89|    }
    90|}
    91|