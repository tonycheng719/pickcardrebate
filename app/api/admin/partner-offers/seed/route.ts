import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

// Sample MoneyHero-style partner offers
const SAMPLE_PARTNER_OFFERS = [
  {
    cardId: "hsbc-vs",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/hsbc-visa-signature",
      bonusValue: 500,
      bonusDescription: "HK$500 現金回贈",
      bonusItems: ["HK$500 現金回贈", "或 Apple Gift Card"],
      validFrom: "2024-01-01",
      validTo: "2025-12-31",
      requirements: ["必須為全新 HSBC 信用卡客戶", "批卡後30日內完成首次簽賬"],
      minSpend: 100,
      minSpendDays: 30,
      notes: "連同銀行迎新，總值可達 $1,300！",
    }
  },
  {
    cardId: "hsbc-red",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/hsbc-red-credit-card",
      bonusValue: 400,
      bonusDescription: "HK$400 現金回贈",
      bonusItems: ["HK$400 現金回贈"],
      validFrom: "2024-01-01",
      validTo: "2025-12-31",
      requirements: ["必須為全新 HSBC 信用卡客戶"],
      minSpend: 100,
      minSpendDays: 30,
      notes: "永久免年費，加上額外 $400！",
    }
  },
  {
    cardId: "citi-rewards",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/citi-rewards-card",
      bonusValue: 600,
      bonusDescription: "HK$600 現金回贈",
      bonusItems: ["HK$600 現金回贈", "或 $600 HKTVmall 電子購物禮券"],
      validFrom: "2024-01-01",
      validTo: "2025-12-31",
      requirements: ["必須為全新花旗銀行信用卡客戶", "批卡後60日內簽賬滿 $8,000"],
      minSpend: 8000,
      minSpendDays: 60,
      notes: "憑卡簽賬可享超市/百貨等6大類別5倍積分！",
    }
  },
  {
    cardId: "citi-prestige",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/citi-prestige-card",
      bonusValue: 1000,
      bonusDescription: "HK$1,000 現金回贈",
      bonusItems: ["HK$1,000 現金回贈", "或 $1,000 Apple Gift Card"],
      validFrom: "2024-01-01",
      validTo: "2025-12-31",
      requirements: ["必須為全新花旗銀行信用卡客戶", "批卡後90日內簽賬滿 $30,000"],
      minSpend: 30000,
      minSpendDays: 90,
      notes: "尊享無限次免費使用全球 1,000+ 機場貴賓室！",
    }
  },
  {
    cardId: "scb-smart",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/scb-smart-credit-card",
      bonusValue: 500,
      bonusDescription: "HK$500 現金回贈",
      bonusItems: ["HK$500 現金回贈"],
      validFrom: "2024-01-01",
      validTo: "2025-12-31",
      requirements: ["必須為全新渣打信用卡客戶", "批卡後60日內簽賬滿 $4,000"],
      minSpend: 4000,
      minSpendDays: 60,
      notes: "永久免年費 + 額外 $500 回贈！",
    }
  },
  {
    cardId: "dbs-eminent",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/dbs-eminent-card",
      bonusValue: 500,
      bonusDescription: "HK$500 現金回贈",
      bonusItems: ["HK$500 現金回贈", "或 $500 HKTVmall 電子購物禮券"],
      validFrom: "2024-01-01",
      validTo: "2025-12-31",
      requirements: ["必須為全新 DBS 信用卡客戶", "批卡後30日內完成首次簽賬"],
      minSpend: 100,
      minSpendDays: 30,
      notes: "星期五指定食肆高達20%回贈！",
    }
  },
  {
    cardId: "hang-seng-visa-signature",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/hang-seng-visa-signature",
      bonusValue: 500,
      bonusDescription: "HK$500 現金回贈",
      bonusItems: ["HK$500 現金回贈"],
      validFrom: "2024-01-01",
      validTo: "2025-12-31",
      requirements: ["必須為全新恒生信用卡客戶", "批卡後60日內簽賬滿 $5,000"],
      minSpend: 5000,
      minSpendDays: 60,
      notes: "恒生 yuu 積分額外回贈！",
    }
  },
  {
    cardId: "bea-world",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/bea-world-mastercard",
      bonusValue: 800,
      bonusDescription: "HK$800 現金回贈",
      bonusItems: ["HK$800 現金回贈", "或 $800 Apple Gift Card"],
      validFrom: "2024-01-01",
      validTo: "2025-12-31",
      requirements: ["必須為全新東亞銀行信用卡客戶", "批卡後60日內簽賬滿 $6,000"],
      minSpend: 6000,
      minSpendDays: 60,
      notes: "每年首 $250,000 本地簽賬 2% 回贈！",
    }
  },
  {
    cardId: "mox-credit-card",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/mox-credit-card",
      bonusValue: 300,
      bonusDescription: "HK$300 現金回贈",
      bonusItems: ["HK$300 現金回贈"],
      validFrom: "2024-01-01",
      validTo: "2025-12-31",
      requirements: ["必須為全新 Mox 客戶"],
      minSpend: 0,
      minSpendDays: 0,
      notes: "無年費、無最低入息要求！",
    }
  },
  {
    cardId: "za-card",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/za-bank-credit-card",
      bonusValue: 200,
      bonusDescription: "HK$200 現金回贈",
      bonusItems: ["HK$200 現金回贈"],
      validFrom: "2024-01-01",
      validTo: "2025-12-31",
      requirements: ["必須為全新 ZA Bank 客戶"],
      minSpend: 0,
      minSpendDays: 0,
      notes: "Visa Debit Card 都有回贈！",
    }
  },
];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'seed') {
      let successCount = 0;
      let errorCount = 0;

      for (const offer of SAMPLE_PARTNER_OFFERS) {
        try {
          // Check if card exists
          const { data: existingCard } = await adminAuthClient
            .from('cards')
            .select('id')
            .eq('id', offer.cardId)
            .single();

          if (existingCard) {
            // Update existing
            await adminAuthClient
              .from('cards')
              .update({ partner_offer: offer.partnerOffer })
              .eq('id', offer.cardId);
          } else {
            // Insert new
            await adminAuthClient
              .from('cards')
              .insert({ 
                id: offer.cardId, 
                partner_offer: offer.partnerOffer 
              });
          }
          successCount++;
        } catch (e) {
          console.error(`Error seeding ${offer.cardId}:`, e);
          errorCount++;
        }
      }

      return NextResponse.json({ 
        success: true, 
        message: `已添加 ${successCount} 張信用卡的合作夥伴資料${errorCount > 0 ? `，${errorCount} 張失敗` : ''}`,
        successCount,
        errorCount,
        totalOffers: SAMPLE_PARTNER_OFFERS.length,
      });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    console.error('Error in seed endpoint:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ 
    availableOffers: SAMPLE_PARTNER_OFFERS.map(o => ({
      cardId: o.cardId,
      bonusValue: o.partnerOffer.bonusValue,
      description: o.partnerOffer.bonusDescription,
    }))
  });
}

