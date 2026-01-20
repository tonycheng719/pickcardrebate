import { NextRequest, NextResponse } from "next/server";
import { HK_CARDS } from "@/lib/data/cards";
import { adminAuthClient } from "@/lib/supabase/admin-client";

export const dynamic = 'force-dynamic';

// CORS headers for mobile app
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// 公開 API - 供 Mobile App 使用
export async function GET(request: NextRequest) {
  try {
    // 嘗試從資料庫取得卡片圖片
    let dbCardMap = new Map<string, { image_url: string | null }>();
    
    try {
      const { data: dbCards } = await adminAuthClient
        .from('cards')
        .select('id, image_url');
      
      if (dbCards) {
        dbCardMap = new Map(dbCards.map((c: any) => [c.id, c]));
      }
    } catch (e) {
      console.warn("Could not fetch card images from DB, using static data");
    }

    // 合併本地卡片資料和資料庫圖片
    const cards = HK_CARDS.map(card => {
      const dbCard = dbCardMap.get(card.id);
      const imageUrl = dbCard?.image_url || card.imageUrl || null;
      
      return {
        id: card.id,
        name: card.name,
        bank: card.bank,
        imageUrl: imageUrl,
        style: card.style,
        tags: card.tags || [],
        annualFee: card.annualFee,
        feeWaiverCondition: card.feeWaiverCondition,
        welcomeOfferText: card.welcomeOfferText,
        sellingPoints: card.sellingPoints || [],
        promoEndDate: card.promoEndDate,
        promoName: card.promoName,
        // 簡化版規則用於 Mobile 顯示
        topRate: getTopRate(card.rules),
        topRateCategory: getTopRateCategory(card.rules),
      };
    });

    return NextResponse.json({ 
      cards,
      count: cards.length,
      lastUpdated: new Date().toISOString()
    }, { headers: corsHeaders });
  } catch (error) {
    console.error("Error fetching cards for mobile:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500, headers: corsHeaders });
  }
}

// 取得最高回贈率
function getTopRate(rules: any[]): number {
  if (!rules || rules.length === 0) return 0;
  return Math.max(...rules.map(r => r.percentage || 0));
}

// 取得最高回贈類別
function getTopRateCategory(rules: any[]): string | null {
  if (!rules || rules.length === 0) return null;
  const topRule = rules.reduce((prev, curr) => 
    (curr.percentage || 0) > (prev.percentage || 0) ? curr : prev
  );
  return topRule.description || null;
}

