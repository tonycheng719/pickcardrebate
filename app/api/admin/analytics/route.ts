import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

// 添加快取：每 5 分鐘更新一次
export const revalidate = 300;

export async function GET() {
    try {
        // Try RPC first (最有效率的方式)
        let { data: rpcData, error: rpcError } = await adminAuthClient.rpc("get_analytics_summary");

        if (!rpcError && rpcData && rpcData.length > 0) {
            return NextResponse.json(rpcData[0]);
        }

        console.warn("RPC failed or returned no data, falling back to raw queries", rpcError);

        // Fallback: Raw queries (優化版 - 限制查詢範圍)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        // 並行執行查詢以提高效率
        const [
            { count: totalSearches },
            { data: recentAmounts },
            { data: allLogs }
        ] = await Promise.all([
            // 1. Total Searches (只計數，不獲取數據)
            adminAuthClient
                .from("search_logs")
                .select("*", { count: "exact", head: true }),
            
            // 2. 最近 1000 條記錄計算平均值（而非全部）
            adminAuthClient
                .from("search_logs")
                .select("amount")
                .order("created_at", { ascending: false })
                .limit(1000),
            
            // 3. 最近 30 天的記錄（限制 5000 條）
            adminAuthClient
                .from("search_logs")
                .select("merchant_name, category_id, payment_method")
                .gte("created_at", thirtyDaysAgo.toISOString())
                .order("created_at", { ascending: false })
                .limit(5000)
        ]);

        // 計算平均金額（基於樣本）
        const totalAmount = recentAmounts?.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0) || 0;
        const avgAmount = recentAmounts?.length ? totalAmount / recentAmounts.length : 0;

        const merchantCounts: Record<string, number> = {};
        const categoryCounts: Record<string, number> = {};
        const paymentCounts: Record<string, number> = {};

        allLogs?.forEach(log => {
            if (log.merchant_name) merchantCounts[log.merchant_name] = (merchantCounts[log.merchant_name] || 0) + 1;
            if (log.category_id) categoryCounts[log.category_id] = (categoryCounts[log.category_id] || 0) + 1;
            if (log.payment_method) paymentCounts[log.payment_method] = (paymentCounts[log.payment_method] || 0) + 1;
        });

        // Top 20 merchants for admin view
        const topMerchants = Object.entries(merchantCounts)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 20)
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



