import { NextRequest, NextResponse } from "next/server";
import { adminAuthClient } from "@/lib/supabase/admin-client";
import { HK_CARDS } from "@/lib/data/cards";

export const dynamic = 'force-dynamic';

// PATCH: Toggle card properties (hidden, featured, priority)
export async function PATCH(request: NextRequest) {
    try {
        if (!process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.SERVICE_ROLE_KEY) {
            return NextResponse.json({ error: "Missing Service Role Key" }, { status: 500 });
        }

        const body = await request.json();
        const { cardId, field, value } = body;

        if (!cardId || !field) {
            return NextResponse.json({ error: "Missing cardId or field" }, { status: 400 });
        }

        // Validate field
        const allowedFields = ['hidden', 'featured', 'priority'];
        if (!allowedFields.includes(field)) {
            return NextResponse.json({ error: `Invalid field: ${field}` }, { status: 400 });
        }

        // Check if card exists in DB
        const { data: existingCard } = await adminAuthClient
            .from('cards')
            .select('id')
            .eq('id', cardId)
            .single();

        if (existingCard) {
            // Update existing card
            const { error } = await adminAuthClient
                .from('cards')
                .update({ [field]: value })
                .eq('id', cardId);

            if (error) {
                console.error("Error updating card:", error);
                return NextResponse.json({ error: error.message }, { status: 500 });
            }
        } else {
            // Card doesn't exist in DB, create it with minimal data
            const localCard = HK_CARDS.find(c => c.id === cardId);
            if (!localCard) {
                return NextResponse.json({ error: "Card not found" }, { status: 404 });
            }

            const { error } = await adminAuthClient
                .from('cards')
                .insert({
                    id: cardId,
                    name: localCard.name,
                    bank: localCard.bank,
                    style: localCard.style,
                    tags: localCard.tags,
                    [field]: value
                });

            if (error) {
                console.error("Error inserting card:", error);
                return NextResponse.json({ error: error.message }, { status: 500 });
            }
        }

        return NextResponse.json({ 
            success: true, 
            cardId, 
            field, 
            value,
            message: `${field} updated to ${value}`
        });

    } catch (error: any) {
        console.error("Internal error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

