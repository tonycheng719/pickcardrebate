import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

// 真實 MoneyHero 獨家優惠資料 (截至 2025年12月)
// 資料來源：MoneyHero 官網條款與細則
const MONEYHERO_PARTNER_OFFERS = [
  // ========================================
  // Citi 花旗銀行 (2025/12/01 18:00 - 2025/12/31 12:00)
  // 適用：八達通白金卡、Cash Back、Rewards、Rewards 銀聯、Premier Miles
  // 條件：批卡後30日內簽賬滿$4,000
  // ========================================
  {
    cardId: "citi-rewards",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/citi-rewards-card",
      bonusValue: 4288,
      bonusDescription: "獎品6選1：PHILIPS飲水機(HK$4,288)/LG空氣清新機(HK$3,690)/Marshall藍牙喇叭(HK$3,499)/HK$2,000 Apple禮品卡/HK$2,000惠康現金券/4K投影機(HK$2,499)",
      bonusItems: [
        "PHILIPS 飛利浦 ADD6920BK RO 純淨飲水機（價值HK$4,288）",
        "LG AS35GGW20 PuriCare™ AeroHit 空氣清新機 寵物版（價值HK$3,690）",
        "Marshall Stanmore III 家用藍牙喇叭（價值HK$3,499）",
        "HK$2,000 Apple Store 禮品卡",
        "HK$2,000 惠康購物現金券",
        "Usatisfy mini 無線音箱4K投影機（價值HK$2,499）"
      ],
      validFrom: "2025-12-01",
      validTo: "2025-12-31",
      requirements: [
        "全新Citi信用卡客戶（過去12個月內未曾持有Citi信用卡主卡）",
        "批卡後30日內累積簽賬滿HK$4,000",
        "2026年1月31日或之前成功獲批並啟動信用卡",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 4000,
      minSpendDays: 30,
      notes: "換領流程由推廣期結束後起計需時至少16星期。申請前請關掉AdBlocker及「私人模式」。",
    }
  },
  // Citi HKTVmall 信用卡 - 同樣適用Citi優惠
  {
    cardId: "citi-hktvmall",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/citi-hktvmall-credit-card",
      bonusValue: 4288,
      bonusDescription: "獎品6選1：PHILIPS飲水機(HK$4,288)/LG空氣清新機(HK$3,690)/Marshall藍牙喇叭(HK$3,499)/HK$2,000 Apple禮品卡/HK$2,000惠康現金券/4K投影機(HK$2,499)",
      bonusItems: [
        "PHILIPS 飛利浦 ADD6920BK RO 純淨飲水機（價值HK$4,288）",
        "LG AS35GGW20 PuriCare™ AeroHit 空氣清新機 寵物版（價值HK$3,690）",
        "Marshall Stanmore III 家用藍牙喇叭（價值HK$3,499）",
        "HK$2,000 Apple Store 禮品卡",
        "HK$2,000 惠康購物現金券",
        "Usatisfy mini 無線音箱4K投影機（價值HK$2,499）"
      ],
      validFrom: "2025-12-01",
      validTo: "2025-12-31",
      requirements: [
        "全新Citi信用卡客戶（過去12個月內未曾持有Citi信用卡主卡）",
        "批卡後30日內累積簽賬滿HK$4,000",
        "2026年1月31日或之前成功獲批並啟動信用卡",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 4000,
      minSpendDays: 30,
      notes: "換領流程由推廣期結束後起計需時至少16星期。申請前請關掉AdBlocker及「私人模式」。",
    }
  },
  // Citi The Club 信用卡
  {
    cardId: "citi-the-club",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/citi-the-club-credit-card",
      bonusValue: 4288,
      bonusDescription: "獎品6選1：PHILIPS飲水機(HK$4,288)/LG空氣清新機(HK$3,690)/Marshall藍牙喇叭(HK$3,499)/HK$2,000 Apple禮品卡/HK$2,000惠康現金券/4K投影機(HK$2,499)",
      bonusItems: [
        "PHILIPS 飛利浦 ADD6920BK RO 純淨飲水機（價值HK$4,288）",
        "LG AS35GGW20 PuriCare™ AeroHit 空氣清新機 寵物版（價值HK$3,690）",
        "Marshall Stanmore III 家用藍牙喇叭（價值HK$3,499）",
        "HK$2,000 Apple Store 禮品卡",
        "HK$2,000 惠康購物現金券",
        "Usatisfy mini 無線音箱4K投影機（價值HK$2,499）"
      ],
      validFrom: "2025-12-01",
      validTo: "2025-12-31",
      requirements: [
        "全新Citi信用卡客戶（過去12個月內未曾持有Citi信用卡主卡）",
        "批卡後30日內累積簽賬滿HK$4,000",
        "2026年1月31日或之前成功獲批並啟動信用卡",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 4000,
      minSpendDays: 30,
      notes: "換領流程由推廣期結束後起計需時至少16星期。申請前請關掉AdBlocker及「私人模式」。",
    }
  },
  {
    cardId: "citi-octopus",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/citi-octopus-platinum",
      bonusValue: 4288,
      bonusDescription: "獎品6選1：PHILIPS飲水機(HK$4,288)/LG空氣清新機(HK$3,690)/Marshall藍牙喇叭(HK$3,499)/HK$2,000 Apple禮品卡/HK$2,000惠康現金券/4K投影機(HK$2,499)",
      bonusItems: [
        "PHILIPS 飛利浦 ADD6920BK RO 純淨飲水機（價值HK$4,288）",
        "LG AS35GGW20 PuriCare™ AeroHit 空氣清新機 寵物版（價值HK$3,690）",
        "Marshall Stanmore III 家用藍牙喇叭（價值HK$3,499）",
        "HK$2,000 Apple Store 禮品卡",
        "HK$2,000 惠康購物現金券",
        "Usatisfy mini 無線音箱4K投影機（價值HK$2,499）"
      ],
      validFrom: "2025-12-01",
      validTo: "2025-12-31",
      requirements: [
        "全新Citi信用卡客戶（過去12個月內未曾持有Citi信用卡主卡）",
        "批卡後30日內累積簽賬滿HK$4,000",
        "2026年1月31日或之前成功獲批並啟動信用卡",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 4000,
      minSpendDays: 30,
      notes: "換領流程由推廣期結束後起計需時至少16星期。申請前請關掉AdBlocker及「私人模式」。",
    }
  },
  {
    cardId: "citi-cashback",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/citi-cash-back-card",
      bonusValue: 4288,
      bonusDescription: "獎品6選1：PHILIPS飲水機(HK$4,288)/LG空氣清新機(HK$3,690)/Marshall藍牙喇叭(HK$3,499)/HK$2,000 Apple禮品卡/HK$2,000惠康現金券/4K投影機(HK$2,499)",
      bonusItems: [
        "PHILIPS 飛利浦 ADD6920BK RO 純淨飲水機（價值HK$4,288）",
        "LG AS35GGW20 PuriCare™ AeroHit 空氣清新機 寵物版（價值HK$3,690）",
        "Marshall Stanmore III 家用藍牙喇叭（價值HK$3,499）",
        "HK$2,000 Apple Store 禮品卡",
        "HK$2,000 惠康購物現金券",
        "Usatisfy mini 無線音箱4K投影機（價值HK$2,499）"
      ],
      validFrom: "2025-12-01",
      validTo: "2025-12-31",
      requirements: [
        "全新Citi信用卡客戶（過去12個月內未曾持有Citi信用卡主卡）",
        "批卡後30日內累積簽賬滿HK$4,000",
        "2026年1月31日或之前成功獲批並啟動信用卡",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 4000,
      minSpendDays: 30,
      notes: "換領流程由推廣期結束後起計需時至少16星期。申請前請關掉AdBlocker及「私人模式」。",
    }
  },
  {
    cardId: "citi-premiermiles",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/citi-premiermiles-card",
      bonusValue: 4288,
      bonusDescription: "獎品6選1：PHILIPS飲水機(HK$4,288)/LG空氣清新機(HK$3,690)/Marshall藍牙喇叭(HK$3,499)/HK$2,000 Apple禮品卡/HK$2,000惠康現金券/4K投影機(HK$2,499)",
      bonusItems: [
        "PHILIPS 飛利浦 ADD6920BK RO 純淨飲水機（價值HK$4,288）",
        "LG AS35GGW20 PuriCare™ AeroHit 空氣清新機 寵物版（價值HK$3,690）",
        "Marshall Stanmore III 家用藍牙喇叭（價值HK$3,499）",
        "HK$2,000 Apple Store 禮品卡",
        "HK$2,000 惠康購物現金券",
        "Usatisfy mini 無線音箱4K投影機（價值HK$2,499）"
      ],
      validFrom: "2025-12-01",
      validTo: "2025-12-31",
      requirements: [
        "全新Citi信用卡客戶（過去12個月內未曾持有Citi信用卡主卡）",
        "批卡後30日內累積簽賬滿HK$4,000",
        "2026年1月31日或之前成功獲批並啟動信用卡",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 4000,
      minSpendDays: 30,
      notes: "換領流程由推廣期結束後起計需時至少16星期。申請前請關掉AdBlocker及「私人模式」。",
    }
  },

  // ========================================
  // DBS 星展銀行 (2025/12/01 18:00 - 2025/12/31 12:00)
  // 適用：Black World Mastercard、Eminent Visa Signature、Eminent Visa Platinum
  // ========================================
  {
    cardId: "dbs-black",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/dbs-black-world-mastercard",
      bonusValue: 4980,
      bonusDescription: "獎品7選1：Delsey行李箱(HK$4,980)/Foreo LUNA 3(HK$2,090)/NESCAFÉ咖啡機(HK$1,780)/Marshall藍牙喇叭(HK$1,499)/HK$800 HKTVmall/Apple/Trip.com禮券",
      bonusItems: [
        "Delsey 30\" GRENELLE SE Expandable Front Opening Suitcase（價值HK$4,980）",
        "Foreo LUNA 3 潔面及按摩儀（價值HK$2,090）",
        "NESCAFÉ Dolce Gusto Genio S Plus 膠囊咖啡機連6盒膠囊（價值HK$1,780）",
        "Marshall Emberton II 藍牙喇叭（價值HK$1,499）",
        "HK$800 HKTVmall電子購物禮券",
        "HK$800 Apple Store禮品卡",
        "HK$800 Trip.com電子禮券"
      ],
      validFrom: "2025-12-01",
      validTo: "2025-12-31",
      requirements: [
        "全新星展信用卡客戶",
        "2026年1月31日或之前成功獲批信用卡",
        "收到表格後7日內填妥「獎賞換領表格」",
        "申請時請記下申請參考編號"
      ],
      minSpend: 0,
      minSpendDays: 0,
      notes: "換領流程由推廣期結束後起計需時至少16星期。申請前請關掉AdBlocker及「私人模式」。建議一次過交齊所需文件，以加快批核程序。",
    }
  },
  // DBS Eminent Visa Signature - 系統中合併為 dbs-eminent
  {
    cardId: "dbs-eminent",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/dbs-eminent-visa-platinum",
      bonusValue: 4980,
      bonusDescription: "獎品7選1：Delsey行李箱(HK$4,980)/Foreo LUNA 3(HK$2,090)/NESCAFÉ咖啡機(HK$1,780)/Marshall藍牙喇叭(HK$1,499)/HK$800 HKTVmall/Apple/Trip.com禮券",
      bonusItems: [
        "Delsey 30\" GRENELLE SE Expandable Front Opening Suitcase（價值HK$4,980）",
        "Foreo LUNA 3 潔面及按摩儀（價值HK$2,090）",
        "NESCAFÉ Dolce Gusto Genio S Plus 膠囊咖啡機連6盒膠囊（價值HK$1,780）",
        "Marshall Emberton II 藍牙喇叭（價值HK$1,499）",
        "HK$800 HKTVmall電子購物禮券",
        "HK$800 Apple Store禮品卡",
        "HK$800 Trip.com電子禮券"
      ],
      validFrom: "2025-12-01",
      validTo: "2025-12-31",
      requirements: [
        "全新星展信用卡客戶",
        "2026年1月31日或之前成功獲批信用卡",
        "收到表格後7日內填妥「獎賞換領表格」",
        "申請時請記下申請參考編號"
      ],
      minSpend: 0,
      minSpendDays: 0,
      notes: "換領流程由推廣期結束後起計需時至少16星期。申請前請關掉AdBlocker及「私人模式」。建議一次過交齊所需文件，以加快批核程序。",
    }
  },

  // ========================================
  // 渣打銀行 (2025/12/01 18:00 - 2025/12/31 12:00)
  // 適用：Smart Card、Simply Cash
  // ========================================
  {
    cardId: "sc-smart",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/scb-smart-credit-card",
      bonusValue: 800,
      bonusDescription: "HK$800 HKTVmall電子購物禮券（迎新總值高達HK$4,980）",
      bonusItems: ["HK$800 HKTVmall電子購物禮券"],
      validFrom: "2025-12-01",
      validTo: "2025-12-31",
      requirements: [
        "全新渣打銀行信用卡客戶",
        "2026年1月31日或之前成功獲批信用卡",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 0,
      minSpendDays: 0,
      notes: "迎新總價值高達HK$4,980。換領流程由推廣期結束後起計需時至少16星期。申請前請關掉AdBlocker及「私人模式」。",
    }
  },
  {
    cardId: "sc-simply-cash",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/scb-simply-cash-visa",
      bonusValue: 800,
      bonusDescription: "HK$800 HKTVmall電子購物禮券（迎新總值高達HK$4,980）",
      bonusItems: ["HK$800 HKTVmall電子購物禮券"],
      validFrom: "2025-12-01",
      validTo: "2025-12-31",
      requirements: [
        "全新渣打銀行信用卡客戶",
        "2026年1月31日或之前成功獲批信用卡",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 0,
      minSpendDays: 0,
      notes: "迎新總價值高達HK$4,980。換領流程由推廣期結束後起計需時至少16星期。申請前請關掉AdBlocker及「私人模式」。",
    }
  },

  // ========================================
  // 恒生銀行 (2025/12/01 10:00 - 2025/12/21 23:59)
  // 適用：Travel+ Visa Signature 卡
  // 條件：批卡後30日內簽賬滿HK$100
  // ========================================
  {
    cardId: "hangseng-travel-plus",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/hang-seng-travel-plus-visa-signature",
      bonusValue: 300,
      bonusDescription: "HK$300 惠康購物現金券",
      bonusItems: ["HK$300 惠康購物現金券"],
      validFrom: "2025-12-01",
      validTo: "2025-12-21",
      requirements: [
        "全新及現有恒生信用卡客戶",
        "提交申請後30日內成功獲批",
        "批卡後30日內累積簽賬滿HK$100",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 100,
      minSpendDays: 30,
      notes: "⚠️ 優惠期至12月21日！換領流程由推廣期結束後起計需時至少16星期。若客戶於開戶後13個月內取消有關信用卡戶口，並已獲贈有關之迎新獎賞，則須繳付同等價值之金額作為手續費。",
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
        message: `已添加 ${successCount} 張信用卡的 MoneyHero 獨家優惠${errorCount > 0 ? `，${errorCount} 張失敗` : ''}`,
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
    source: 'MoneyHero 官網條款與細則',
    lastUpdated: '2025-12-05',
    availableOffers: MONEYHERO_PARTNER_OFFERS.map(o => ({
      cardId: o.cardId,
      bonusValue: o.partnerOffer.bonusValue,
      description: o.partnerOffer.bonusDescription,
      validTo: o.partnerOffer.validTo,
      minSpend: o.partnerOffer.minSpend,
    }))
  });
}
