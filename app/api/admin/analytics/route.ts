import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

export async function GET() {
    try {
        // Try RPC first
        let { data: rpcData, error: rpcError } = await adminAuthClient.rpc("get_analytics_summary");

        if (!rpcError && rpcData && rpcData.length > 0) {
            return NextResponse.json(rpcData[0]);
        }

        console.warn("RPC failed or returned no data, falling back to raw queries", rpcError);

        // Fallback: Raw queries (Slower but reliable if RPC missing)
        // 1. Total Searches
        const { count: totalSearches } = await adminAuthClient
            .from("search_logs")
            .select("*", { count: "exact", head: true });

        // 2. Avg Amount (Simple avg)
        const { data: amountData } = await adminAuthClient
            .from("search_logs")
            .select("amount");
        
        const totalAmount = amountData?.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0) || 0;
        const avgAmount = amountData?.length ? totalAmount / amountData.length : 0;

        // 3. Top Merchants (Simple aggregation)
        // Note: Supabase JS client doesn't support complex group by well without RPC, 
        // so we do simple JS aggregation for fallback (not efficient for large data but works for now)
        const { data: allLogs } = await adminAuthClient
            .from("search_logs")
            .select("merchant_name, category_id, payment_method")
            .limit(500); // Sample last 500 for stats

        const merchantCounts: Record<string, number> = {};
        const categoryCounts: Record<string, number> = {};
        const paymentCounts: Record<string, number> = {};

        allLogs?.forEach(log => {
            if (log.merchant_name) merchantCounts[log.merchant_name] = (merchantCounts[log.merchant_name] || 0) + 1;
            if (log.category_id) categoryCounts[log.category_id] = (categoryCounts[log.category_id] || 0) + 1;
            if (log.payment_method) paymentCounts[log.payment_method] = (paymentCounts[log.payment_method] || 0) + 1;
        });

        const topMerchants = Object.entries(merchantCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([name, count]) => ({ merchant_name: name, count }));

        const categoryStats = Object.entries(categoryCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 6)
            .map(([id, count]) => ({ category_id: id, count }));

        const paymentStats = Object.entries(paymentCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 5)
            .map(([method, count]) => ({ payment_method: method, count }));

        return NextResponse.json({
            total_searches: totalSearches || 0,
            avg_amount: avgAmount,
            top_merchants: topMerchants,
            category_stats: categoryStats,
            payment_stats: paymentStats
        });

    } catch (error: any) {
        console.error("API Error fetching analytics:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

