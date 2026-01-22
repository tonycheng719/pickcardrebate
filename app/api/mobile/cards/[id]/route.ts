import { NextRequest, NextResponse } from "next/server";
import { HK_CARDS } from "@/lib/data/cards";
import { adminAuthClient } from "@/lib/supabase/admin-client";
import { PartnerOffer } from "@/lib/types";

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

    // 嘗試從資料庫取得圖片和 partner_offer
    let imageUrl = card.imageUrl || null;
    let partnerOffer: PartnerOffer | null = null;
    let partnerOffersEnabled = false;
    
    try {
      // 獲取卡片資料（包括 partner_offer）
      const { data: dbCard } = await adminAuthClient
        .from('cards')
        .select('image_url, partner_offer')
        .eq('id', id)
        .single();
      
      if (dbCard?.image_url) {
        imageUrl = dbCard.image_url;
      }
      
      // 處理 partner_offer
      if (dbCard?.partner_offer) {
        const offer = dbCard.partner_offer as any;
        // 檢查是否在有效期內
        const now = new Date();
        const validFrom = new Date(offer.validFrom);
        const validTo = new Date(offer.validTo);
        validTo.setHours(23, 59, 59, 999);
        
        if (offer.enabled && now >= validFrom && now <= validTo) {
          partnerOffer = offer as PartnerOffer;
        }
      }
      
      // 獲取全域開關
      const { data: settings } = await adminAuthClient
        .from('system_settings')
        .select('value')
        .eq('key', 'partner_offers_enabled')
        .single();
      
      partnerOffersEnabled = settings?.value === 'true';
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
      
      // Partner Offer（經本網連結申請額外獎賞）
      partnerOffer: partnerOffersEnabled && partnerOffer ? partnerOffer : null,
    };

    return NextResponse.json({ card: cardData }, { headers: corsHeaders });
  } catch (error) {
    console.error("Error fetching card:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500, headers: corsHeaders });
  }
}

