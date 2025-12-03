import { NextRequest, NextResponse } from "next/server";
import { adminAuthClient } from "@/lib/supabase/admin-client";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    // Get all comparison logs
    const { data: logs, error } = await adminAuthClient
      .from("compare_logs")
      .select("*")
      .gte("created_at", startDate.toISOString())
      .order("created_at", { ascending: false });

    if (error) {
      // If table doesn't exist, return empty data
      if (error.code === '42P01') {
        return NextResponse.json({
          totalComparisons: 0,
          uniqueUsers: 0,
          topCardPairs: [],
          topCards: [],
          dailyStats: [],
          recentLogs: []
        });
      }
      console.error("Error fetching compare stats:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Calculate statistics
    const totalComparisons = logs?.length || 0;
    const uniqueUsers = new Set(logs?.filter(l => l.user_id).map(l => l.user_id)).size;
    
    // Count card appearances
    const cardCounts: Record<string, number> = {};
    const pairCounts: Record<string, number> = {};
    
    logs?.forEach(log => {
      const cardIds = log.card_ids || [];
      
      // Count individual cards
      cardIds.forEach((cardId: string) => {
        cardCounts[cardId] = (cardCounts[cardId] || 0) + 1;
      });
      
      // Count pairs (for 2-card comparisons)
      if (cardIds.length === 2) {
        const pairKey = [...cardIds].sort().join(' vs ');
        pairCounts[pairKey] = (pairCounts[pairKey] || 0) + 1;
      } else if (cardIds.length === 3) {
        // For 3-card comparisons, count all pairs
        for (let i = 0; i < cardIds.length; i++) {
          for (let j = i + 1; j < cardIds.length; j++) {
            const pairKey = [cardIds[i], cardIds[j]].sort().join(' vs ');
            pairCounts[pairKey] = (pairCounts[pairKey] || 0) + 1;
          }
        }
      }
    });

    // Get top cards
    const topCards = Object.entries(cardCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([cardId, count]) => ({ cardId, count }));

    // Get top pairs
    const topCardPairs = Object.entries(pairCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([pair, count]) => ({ pair, count }));

    // Daily stats
    const dailyMap: Record<string, number> = {};
    logs?.forEach(log => {
      const date = log.created_at.split('T')[0];
      dailyMap[date] = (dailyMap[date] || 0) + 1;
    });
    
    const dailyStats = Object.entries(dailyMap)
      .sort((a, b) => a[0].localeCompare(b[0]))
      .map(([date, count]) => ({ date, count }));

    // Recent logs (last 20)
    const recentLogs = (logs || []).slice(0, 20).map(log => ({
      id: log.id,
      cardIds: log.card_ids,
      userId: log.user_id,
      createdAt: log.created_at
    }));

    return NextResponse.json({
      totalComparisons,
      uniqueUsers,
      topCards,
      topCardPairs,
      dailyStats,
      recentLogs
    });
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

