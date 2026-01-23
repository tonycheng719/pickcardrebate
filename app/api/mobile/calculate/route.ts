import { NextRequest, NextResponse } from "next/server";
import { findBestCards } from "@/lib/logic/calculator";
import { adminAuthClient } from "@/lib/supabase/admin-client";

export const dynamic = 'force-dynamic';

// CORS headers for mobile app
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// Mobile 計算 API - 計算回贈
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      query, // 商戶名稱或類別
      amount = 0,
      paymentMethod,
      isForeignCurrency = false,
      limit = 10,
      myCardIds = [], // 用戶持有的卡片 IDs，優先顯示
    } = body;

    if (!query) {
      return NextResponse.json(
        { error: "請提供商戶名稱或類別" },
        { status: 400, headers: corsHeaders }
      );
    }

    // 計算回贈
    const results = findBestCards(query, {
      amount: parseFloat(amount) || 0,
      paymentMethod,
      isForeignCurrency,
    });

    // 取得資料庫中的卡片圖片
    let dbCardMap = new Map<string, { image_url: string | null }>();
    try {
      const { data: dbCards } = await adminAuthClient
        .from('cards')
        .select('id, image_url');
      if (dbCards) {
        dbCardMap = new Map(dbCards.map((c: any) => [c.id, c]));
      }
    } catch (e) {
      console.warn("Could not fetch card images");
    }

    // 智能排序：確保用戶持有的卡片都被包含
    // 1. 先取 top N 結果
    // 2. 再補上用戶持有但不在 top N 的卡片
    const myCardIdSet = new Set(myCardIds as string[]);
    const topResults = results.slice(0, limit);
    const topResultIds = new Set(topResults.map(r => r.card.id));
    
    // 找出用戶持有但不在 top N 的卡片
    const myMissingCards = results.filter(r => 
      myCardIdSet.has(r.card.id) && !topResultIds.has(r.card.id)
    );
    
    // 合併結果：top N + 用戶持有的其他卡
    const combinedResults = [...topResults, ...myMissingCards];

    // 轉換為 mobile-friendly 格式
    const mobileResults = combinedResults.map((result, index) => {
      const dbCard = dbCardMap.get(result.card.id);
      // 保留原始排名（基於回贈率）
      const originalRank = results.findIndex(r => r.card.id === result.card.id) + 1;
      
      return {
        rank: originalRank, // 使用原始排名（基於回贈率）
        cardId: result.card.id,
        cardName: result.card.name,
        bank: result.card.bank,
        imageUrl: dbCard?.image_url || result.card.imageUrl || null,
        isOwned: myCardIdSet.has(result.card.id), // 標記是否為用戶持有
        
        // 回贈資訊
        percentage: result.percentage,
        rewardAmount: result.rewardAmount,
        ruleDescription: result.matchedRule?.description || '基本回贈',
        
        // 回贈組成
        rewardBreakdown: {
          baseRate: 0.4, // 基本回贈率
          bonusRate: result.percentage - 0.4,
          bonusDescription: result.matchedRule?.description,
        },
        
        // 額外資訊
        isCapped: result.isCapped || false,
        isForeignCurrency: result.isForeignCurrency || false,
        netRewardAmount: result.netRewardAmount,
        netPercentage: result.netPercentage,
        fxFee: result.fxFee,
        
        // 折扣資訊（如有）
        discountPercentage: result.discountPercentage,
        discountAmount: result.discountAmount,
        
        // 建議
        spendingSuggestion: result.spendingSuggestion,
        dateSuggestion: result.dateSuggestion ? {
          validDays: result.dateSuggestion.validDays,
          validDates: result.dateSuggestion.validDates,
          description: result.dateSuggestion.ruleDescription,
          newPercentage: result.dateSuggestion.newPercentage,
        } : null,
        suggestedPaymentMethod: result.suggestedPaymentMethod,
        
        // 積分顯示
        pointsAmount: result.pointsAmount,
        pointsCurrency: result.pointsCurrency,
        
        // 超額資訊
        overCapInfo: result.overCapInfo,
        
        // 申請連結
        applyUrl: result.card.applyUrl || null,
      };
    });

    return NextResponse.json({
      query,
      amount,
      paymentMethod,
      results: mobileResults,
      count: mobileResults.length,
      totalFound: results.length,
    }, { headers: corsHeaders });

  } catch (error) {
    console.error("Error calculating rewards:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers: corsHeaders }
    );
  }
}

// GET 版本 - 簡單查詢
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || '';
    const amount = parseFloat(searchParams.get('amount') || '0');
    const paymentMethod = searchParams.get('paymentMethod') || undefined;
    const isForeignCurrency = searchParams.get('isForeignCurrency') === 'true';
    const limit = parseInt(searchParams.get('limit') || '10');

    if (!query) {
      return NextResponse.json(
        { error: "請提供 query 參數" },
        { status: 400, headers: corsHeaders }
      );
    }

    // 計算回贈
    const results = findBestCards(query, {
      amount,
      paymentMethod,
      isForeignCurrency,
    });

    // 取得資料庫中的卡片圖片
    let dbCardMap = new Map<string, { image_url: string | null }>();
    try {
      const { data: dbCards } = await adminAuthClient
        .from('cards')
        .select('id, image_url');
      if (dbCards) {
        dbCardMap = new Map(dbCards.map((c: any) => [c.id, c]));
      }
    } catch (e) {
      console.warn("Could not fetch card images");
    }

    // 轉換為 mobile-friendly 格式
    const mobileResults = results.slice(0, limit).map((result, index) => {
      const dbCard = dbCardMap.get(result.card.id);
      
      return {
        rank: index + 1,
        cardId: result.card.id,
        cardName: result.card.name,
        bank: result.card.bank,
        imageUrl: dbCard?.image_url || result.card.imageUrl || null,
        percentage: result.percentage,
        rewardAmount: result.rewardAmount,
        ruleDescription: result.matchedRule?.description || '基本回贈',
        isCapped: result.isCapped || false,
        netRewardAmount: result.netRewardAmount,
        netPercentage: result.netPercentage,
        fxFee: result.fxFee,
        discountPercentage: result.discountPercentage,
        discountAmount: result.discountAmount,
        spendingSuggestion: result.spendingSuggestion,
        dateSuggestion: result.dateSuggestion ? {
          validDays: result.dateSuggestion.validDays,
          validDates: result.dateSuggestion.validDates,
          description: result.dateSuggestion.ruleDescription,
          newPercentage: result.dateSuggestion.newPercentage,
        } : null,
        suggestedPaymentMethod: result.suggestedPaymentMethod,
        pointsAmount: result.pointsAmount,
        pointsCurrency: result.pointsCurrency,
        overCapInfo: result.overCapInfo,
      };
    });

    return NextResponse.json({
      query,
      amount,
      paymentMethod,
      results: mobileResults,
      count: mobileResults.length,
      totalFound: results.length,
    }, { headers: corsHeaders });

  } catch (error) {
    console.error("Error calculating rewards:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500, headers: corsHeaders }
    );
  }
}

