import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/client';

// POST: Create a new transaction record
export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { 
            merchantName, 
            categoryId, 
            amount, 
            paymentMethod, 
            cardId, 
            rewardAmount, 
            rewardCurrency, 
            rewardUnit,
            transactionDate,
            userId 
        } = body;

        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 401 });
        }

        // Use standard client - RLS policy allows users to insert their own data
        const supabase = createClient();

        const { data, error } = await supabase
            .from('user_transactions')
            .insert([{
                user_id: userId,
                merchant_name: merchantName,
                category_id: categoryId,
                amount: parseFloat(amount),
                payment_method: paymentMethod,
                card_id: cardId,
                reward_amount: parseFloat(rewardAmount),
                reward_currency: rewardCurrency,
                reward_unit: rewardUnit,
                transaction_date: transactionDate || new Date().toISOString().split('T')[0]
            }])
            .select();

        if (error) throw error;

        return NextResponse.json({ success: true, data });

    } catch (error: any) {
        console.error("API Error creating transaction:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// GET: Fetch transactions for the current user
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        
        if (!userId) {
            return NextResponse.json({ error: "User ID required" }, { status: 400 });
        }

        const supabase = createClient();
        
        const { data, error } = await supabase
            .from('user_transactions')
            .select('*')
            .eq('user_id', userId)
            .order('transaction_date', { ascending: false })
            .limit(50); // Limit to recent 50 for now

        if (error) throw error;

        return NextResponse.json(data);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}



