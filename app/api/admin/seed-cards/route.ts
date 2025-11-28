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
        
        const payload = HK_CARDS.map(mapCardToDB);
        
        const { data, error } = await adminAuthClient
            .from('cards')
            .upsert(payload, { onConflict: 'id' })
            .select();

        if (error) {
            console.error('Seed error:', error);
            return NextResponse.json({ error: error.message }, { status: 500 });
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

