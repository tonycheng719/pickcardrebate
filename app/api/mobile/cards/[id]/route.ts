import { NextRequest, NextResponse } from "next/server";
import { HK_CARDS } from "@/lib/data/cards";
import { adminAuthClient } from "@/lib/supabase/admin-client";

export const dynamic = 'force-dynamic';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

// 取得單張信用卡詳情
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // 從本地數據找卡片
    const card = HK_CARDS.find(c => c.id === id);
    
    if (!card) {
      return NextResponse.json({ error: "Card not found" }, { status: 404, headers: corsHeaders });
    }

    // 嘗試從資料庫取得圖片
    let imageUrl = card.imageUrl || null;
    try {
      const { data: dbCard } = await adminAuthClient
        .from('cards')
        .select('image_url')
        .eq('id', id)
        .single();
      
      if (dbCard?.image_url) {
        imageUrl = dbCard.image_url;
      }
    } catch (e) {
      // 忽略資料庫錯誤，使用本地數據
    }

    // 轉換為 Mobile 格式
    const cardData = {
      id: card.id,
      name: card.name,
      bank: card.bank,
      imageUrl,
      style: card.style,
      
      // 基本資訊
      annualFee: card.annualFee,
      feeWaiverCondition: card.feeWaiverCondition,
      minIncome: card.minIncome,
      foreignCurrencyFee: card.foreignCurrencyFee,
      
      // 回贈規則
      rules: card.rules.map(rule => ({
        description: rule.description,
        percentage: rule.percentage,
        cap: rule.cap,
        capType: rule.capType,
        capPeriod: rule.capPeriod,
        matchType: rule.matchType,
      })),
      
      // 賣點和標籤
      tags: card.tags || [],
      sellingPoints: card.sellingPoints || [],
      welcomeOfferText: card.welcomeOfferText,
      
      // 推廣信息
      promoEndDate: card.promoEndDate,
      promoName: card.promoName,
      featuredMerchants: card.featuredMerchants || [],
      
      // 排除項目和注意事項
      exclusions: card.exclusions || [],
      note: card.note,
      
      // 申請連結
      officialApplyUrl: card.officialApplyUrl,
      applyUrl: card.applyUrl,
    };

    return NextResponse.json({ card: cardData }, { headers: corsHeaders });
  } catch (error) {
    console.error("Error fetching card:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500, headers: corsHeaders });
  }
}

