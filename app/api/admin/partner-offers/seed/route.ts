import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

// 真實 MoneyHero 額外迎新優惠資料 (截至 2025年12月)
const MONEYHERO_PARTNER_OFFERS = [
  // ========================================
  // Citi 花旗銀行
  // ========================================
  {
    cardId: "citi-rewards",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/citi-rewards-card",
      bonusValue: 4288,
      bonusDescription: "PHILIPS 飛利浦 ADD6920BK RO 純淨飲水機（價值HK$4,288）",
      bonusItems: ["PHILIPS 飛利浦 RO 純淨飲水機"],
      validFrom: "2024-01-01",
      validTo: "2025-12-31",
      requirements: ["必須為全新花旗銀行信用卡客戶"],
      minSpend: 0,
      minSpendDays: 0,
      notes: "經 MoneyHero 申請可獲額外迎新禮品。高達3%積分回贈，最低年薪要求 HK$120,000。",
    }
  },
  {
    cardId: "citi-octopus",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/citi-octopus-platinum",
      bonusValue: 4288,
      bonusDescription: "PHILIPS 飛利浦 ADD6920BK RO 純淨飲水機（價值HK$4,288）",
      bonusItems: ["PHILIPS 飛利浦 RO 純淨飲水機"],
      validFrom: "2024-01-01",
      validTo: "2025-12-31",
      requirements: ["必須為全新花旗銀行信用卡客戶"],
      minSpend: 0,
      minSpendDays: 0,
      notes: "高達15%車費回贈，最低年薪要求 HK$120,000。",
    }
  },
  {
    cardId: "citi-prestige",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/citi-prestige-card",
      bonusValue: 4680,
      bonusDescription: "DYSON WashG1 洗地機（價值HK$4,680）",
      bonusItems: ["DYSON WashG1 洗地機"],
      validFrom: "2024-01-01",
      validTo: "2025-12-31",
      requirements: ["必須為全新花旗銀行信用卡客戶"],
      minSpend: 0,
      minSpendDays: 0,
      notes: "低至$4/里，最低年薪要求 HK$600,000。",
    }
  },
  {
    cardId: "citi-premiermiles",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/citi-premiermiles-card",
      bonusValue: 4288,
      bonusDescription: "PHILIPS 飛利浦 ADD6920BK RO 純淨飲水機（價值HK$4,288）",
      bonusItems: ["PHILIPS 飛利浦 RO 純淨飲水機"],
      validFrom: "2024-01-01",
      validTo: "2025-12-31",
      requirements: ["必須為全新花旗銀行信用卡客戶"],
      minSpend: 0,
      minSpendDays: 0,
      notes: "低至$3/里，最低年薪要求 HK$120,000。",
    }
  },

  // ========================================
  // 渣打銀行
  // ========================================
  {
    cardId: "scb-smart",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/scb-smart-credit-card",
      bonusValue: 800,
      bonusDescription: "HK$800 HKTVmall電子購物禮券",
      bonusItems: ["HK$800 HKTVmall電子購物禮券"],
      validFrom: "2024-01-01",
      validTo: "2025-12-31",
      requirements: ["必須為全新渣打銀行信用卡客戶"],
      minSpend: 0,
      minSpendDays: 0,
      notes: "迎新總價值高達 HK$4,980。高達5%現金回贈，最低年薪要求 HK$96,000。",
    }
  },
  {
    cardId: "scb-simply-cash",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/scb-simply-cash-visa",
      bonusValue: 800,
      bonusDescription: "HK$800 HKTVmall電子購物禮券",
      bonusItems: ["HK$800 HKTVmall電子購物禮券"],
      validFrom: "2024-01-01",
      validTo: "2025-12-31",
      requirements: ["必須為全新渣打銀行信用卡客戶"],
      minSpend: 0,
      minSpendDays: 0,
      notes: "迎新總價值高達 HK$4,980。高達2%現金回贈，最低年薪要求 HK$96,000。",
    }
  },

  // ========================================
  // DBS 星展銀行
  // ========================================
  {
    cardId: "dbs-eminent",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/dbs-eminent-visa-platinum",
      bonusValue: 800,
      bonusDescription: "HK$800 HKTVmall電子購物禮券",
      bonusItems: ["HK$800 HKTVmall電子購物禮券"],
      validFrom: "2024-01-01",
      validTo: "2025-12-31",
      requirements: ["必須為全新DBS信用卡客戶"],
      minSpend: 0,
      minSpendDays: 0,
      notes: "迎新總價值高達 HK$4,980。高達5%現金回贈，最低年薪要求 HK$150,000。",
    }
  },
  {
    cardId: "dbs-eminent-vs",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/dbs-eminent-visa-signature",
      bonusValue: 800,
      bonusDescription: "HK$800 HKTVmall電子購物禮券",
      bonusItems: ["HK$800 HKTVmall電子購物禮券"],
      validFrom: "2024-01-01",
      validTo: "2025-12-31",
      requirements: ["必須為全新DBS信用卡客戶"],
      minSpend: 0,
      minSpendDays: 0,
      notes: "迎新總價值高達 HK$4,980。高達5%現金回贈，最低年薪要求 HK$360,000。",
    }
  },
  {
    cardId: "dbs-compass",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/dbs-compass-visa",
      bonusValue: 200,
      bonusDescription: "HK$200 Apple Store禮品卡",
      bonusItems: ["HK$200 Apple Store禮品卡"],
      validFrom: "2024-01-01",
      validTo: "2025-12-31",
      requirements: ["必須為全新DBS信用卡客戶"],
      minSpend: 0,
      minSpendDays: 0,
      notes: "高達10%現金回贈，最低年薪要求 HK$100,000。",
    }
  },
  {
    cardId: "dbs-live-fresh",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/dbs-live-fresh-card",
      bonusValue: 200,
      bonusDescription: "HK$200 Apple Store禮品卡",
      bonusItems: ["HK$200 Apple Store禮品卡"],
      validFrom: "2024-01-01",
      validTo: "2025-12-31",
      requirements: ["必須為全新DBS信用卡客戶"],
      minSpend: 0,
      minSpendDays: 0,
      notes: "高達6%現金回贈，最低年薪要求 HK$150,000。",
    }
  },

  // ========================================
  // 恒生銀行
  // ========================================
  {
    cardId: "hang-seng-travel-plus",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/hang-seng-travel-plus-visa-signature",
      bonusValue: 300,
      bonusDescription: "HK$300 惠康購物現金券",
      bonusItems: ["HK$300 惠康購物現金券"],
      validFrom: "2024-01-01",
      validTo: "2025-12-31",
      requirements: ["必須為全新恒生銀行信用卡客戶"],
      minSpend: 0,
      minSpendDays: 0,
      notes: "迎新總價值高達 HK$1,000。高達7%+FUN Dollar回贈，最低年薪要求 HK$150,000。",
    }
  },

  // ========================================
  // 中信銀行
  // ========================================
  {
    cardId: "citic-hka",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/citic-hong-kong-airlines-mastercard",
      bonusValue: 999,
      bonusDescription: "SONY XE200 X 系列可攜式無線揚聲器（價值HK$999）",
      bonusItems: ["SONY XE200 X 系列可攜式無線揚聲器"],
      validFrom: "2024-01-01",
      validTo: "2025-12-31",
      requirements: ["必須為全新中信銀行信用卡客戶"],
      minSpend: 0,
      minSpendDays: 0,
      notes: "高達6%消費里數回贈，最低年薪要求 HK$96,000。",
    }
  },

  // ========================================
  // 大新銀行
  // ========================================
  {
    cardId: "dah-sing-ana",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/dah-sing-ana-world-mastercard",
      bonusValue: 400,
      bonusDescription: "HK$400 Apple Store禮品卡",
      bonusItems: ["HK$400 Apple Store禮品卡"],
      validFrom: "2024-01-01",
      validTo: "2025-12-31",
      requirements: ["必須為全新大新銀行信用卡客戶"],
      minSpend: 0,
      minSpendDays: 0,
      notes: "低至$8/里，最低年薪要求 HK$150,000。",
    }
  },
  {
    cardId: "dah-sing-myauto",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/dah-sing-myauto-credit-card",
      bonusValue: 400,
      bonusDescription: "HK$400 Apple Store禮品卡",
      bonusItems: ["HK$400 Apple Store禮品卡"],
      validFrom: "2024-01-01",
      validTo: "2025-12-31",
      requirements: ["必須為全新大新銀行信用卡客戶"],
      minSpend: 0,
      minSpendDays: 0,
      notes: "迎新總價值高達 HK$900。高達8%現金回贈，最低年薪要求 HK$150,000。",
    }
  },
  {
    cardId: "dah-sing-united",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/dah-sing-united-world-mastercard",
      bonusValue: 400,
      bonusDescription: "HK$400 Apple Store禮品卡",
      bonusItems: ["HK$400 Apple Store禮品卡"],
      validFrom: "2024-01-01",
      validTo: "2025-12-31",
      requirements: ["必須為全新大新銀行信用卡客戶"],
      minSpend: 0,
      minSpendDays: 0,
      notes: "低至$5/里，最低年薪要求 HK$150,000。",
    }
  },
  {
    cardId: "dah-sing-ba",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/dah-sing-british-airways-platinum",
      bonusValue: 400,
      bonusDescription: "HK$400 Apple Store禮品卡",
      bonusItems: ["HK$400 Apple Store禮品卡"],
      validFrom: "2024-01-01",
      validTo: "2025-12-31",
      requirements: ["必須為全新大新銀行信用卡客戶"],
      minSpend: 0,
      minSpendDays: 0,
      notes: "低至$4/里，最低年薪要求 HK$150,000。",
    }
  },

  // ========================================
  // 美國運通
  // ========================================
  {
    cardId: "amex-platinum-credit",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/amex-platinum-credit-card",
      bonusValue: 1800,
      bonusDescription: "迎新優惠總值高達HK$1,800",
      bonusItems: ["迎新優惠總值高達HK$1,800"],
      validFrom: "2024-01-01",
      validTo: "2025-12-31",
      requirements: ["必須為全新美國運通信用卡客戶"],
      minSpend: 0,
      minSpendDays: 0,
      notes: "迎新總價值高達 HK$3,600。低至$2.5/里，最低年薪要求 HK$300,000。",
    }
  },
  {
    cardId: "amex-blue-cash",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/amex-blue-cash-credit-card",
      bonusValue: 600,
      bonusDescription: "高達HK$600消費回贈兼豁免首年年費",
      bonusItems: ["HK$600消費回贈", "首年年費豁免"],
      validFrom: "2024-01-01",
      validTo: "2025-12-31",
      requirements: ["必須為全新美國運通信用卡客戶"],
      minSpend: 0,
      minSpendDays: 0,
      notes: "迎新總價值高達 HK$1,200。高達1.2%現金回贈，最低年薪要求 HK$150,000。",
    }
  },

  // ========================================
  // 其他
  // ========================================
  {
    cardId: "airwallex-visa",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/airwallex-visa-card",
      bonusValue: 400,
      bonusDescription: "HK$400 Apple Store禮品卡",
      bonusItems: ["HK$400 Apple Store禮品卡"],
      validFrom: "2024-01-01",
      validTo: "2025-12-31",
      requirements: ["必須為全新 Airwallex 客戶"],
      minSpend: 0,
      minSpendDays: 0,
      notes: "高達1%現金回贈，無最低年薪要求。",
    }
  },
  {
    cardId: "wlab-debit",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/welab-debit-card",
      bonusValue: 16040,
      bonusDescription: "14,000 MaxMiles 飛行里數（可1:1兌換30+航空及酒店獎賞計劃）",
      bonusItems: ["14,000 MaxMiles 飛行里數"],
      validFrom: "2024-01-01",
      validTo: "2025-12-31",
      requirements: ["必須為全新 WeLab Bank 客戶"],
      minSpend: 0,
      minSpendDays: 0,
      notes: "迎新總價值高達 HK$16,040。高達8%現金回贈，最低年薪要求 HK$150,000。",
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
      const errors: string[] = [];

      for (const offer of MONEYHERO_PARTNER_OFFERS) {
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
        } catch (e: any) {
          console.error(`Error seeding ${offer.cardId}:`, e);
          errors.push(`${offer.cardId}: ${e.message}`);
          errorCount++;
        }
      }

      return NextResponse.json({ 
        success: true, 
        message: `已添加 ${successCount} 張信用卡的 MoneyHero 額外迎新資料${errorCount > 0 ? `，${errorCount} 張失敗` : ''}`,
        successCount,
        errorCount,
        errors: errors.length > 0 ? errors : undefined,
        totalOffers: MONEYHERO_PARTNER_OFFERS.length,
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
    source: 'MoneyHero',
    lastUpdated: '2025-12',
    availableOffers: MONEYHERO_PARTNER_OFFERS.map(o => ({
      cardId: o.cardId,
      bonusValue: o.partnerOffer.bonusValue,
      description: o.partnerOffer.bonusDescription,
    }))
  });
}
