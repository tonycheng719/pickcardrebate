import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Helper to get a Service Role client
function getServiceRoleClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SERVICE_ROLE_KEY;

    if (!supabaseUrl || !serviceRoleKey) {
        console.error("Transaction API: Missing Supabase Config (URL or Service Role Key)");
        return null;
    }

    return createClient(supabaseUrl, serviceRoleKey, {
        auth: {
            persistSession: false,
            autoRefreshToken: false,
            detectSessionInUrl: false
        }
    });
}

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

        const supabase = getServiceRoleClient();
        if (!supabase) {
            return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
        }

        // Using service_role client bypasses RLS, allowing insertion
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
export const dynamic = 'force-dynamic';
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const userId = searchParams.get('userId');
        
        if (!userId) {
            return NextResponse.json({ error: "User ID required" }, { status: 400 });
        }

        // Use service role for reading too, to be consistent and robust
        const supabase = getServiceRoleClient();
        if (!supabase) {
            // Fallback to anon client if service key missing? No, better fail safe.
            return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
        }
        
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
