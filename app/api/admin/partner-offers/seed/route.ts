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
  {
    cardId: "dbs-compass",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/dbs-compass-visa",
      bonusValue: 200,
      bonusDescription: "HK$200 Apple Store禮品卡",
      bonusItems: ["HK$200 Apple Store禮品卡"],
      validFrom: "2025-12-01",
      validTo: "2025-12-31",
      requirements: [
        "全新星展信用卡客戶",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 0,
      minSpendDays: 0,
      notes: "高達10%現金回贈，最低年薪要求HK$100,000。",
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
      validFrom: "2025-12-01",
      validTo: "2025-12-31",
      requirements: [
        "全新星展信用卡客戶",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 0,
      minSpendDays: 0,
      notes: "高達6%現金回贈，最低年薪要求HK$150,000（大專生版無最低年薪要求）。",
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
  // 大新銀行
  // ========================================
  {
    cardId: "dahsing-one",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/dah-sing-one-plus-credit-card",
      bonusValue: 400,
      bonusDescription: "HK$400 Apple Store禮品卡",
      bonusItems: ["HK$400 Apple Store禮品卡"],
      validFrom: "2025-12-01",
      validTo: "2025-12-31",
      requirements: [
        "全新大新銀行信用卡客戶",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 0,
      minSpendDays: 0,
      notes: "高達1%現金回贈，最低年薪要求HK$150,000。",
    }
  },
  {
    cardId: "dahsing-ba",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/dah-sing-british-airways-platinum",
      bonusValue: 400,
      bonusDescription: "HK$400 Apple Store禮品卡",
      bonusItems: ["HK$400 Apple Store禮品卡"],
      validFrom: "2025-12-01",
      validTo: "2025-12-31",
      requirements: [
        "全新大新銀行信用卡客戶",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 0,
      minSpendDays: 0,
      notes: "低至$4/里，最低年薪要求HK$150,000。",
    }
  },
  {
    cardId: "dahsing-myauto",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/dah-sing-myauto-credit-card",
      bonusValue: 400,
      bonusDescription: "HK$400 Apple Store禮品卡（迎新總值高達HK$900）",
      bonusItems: ["HK$400 Apple Store禮品卡"],
      validFrom: "2025-12-01",
      validTo: "2025-12-31",
      requirements: [
        "全新大新銀行信用卡客戶",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 0,
      minSpendDays: 0,
      notes: "迎新總價值高達HK$900。高達8%現金回贈，最低年薪要求HK$150,000。",
    }
  },

  // ========================================
  // 安信信貸
  // ========================================
  {
    cardId: "wewa-unionpay",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/wewa-visa-signature",
      bonusValue: 500,
      bonusDescription: "全新客戶：HK$400 惠康購物現金券 + HK$100現金回贈",
      bonusItems: ["HK$400 惠康購物現金券", "HK$100現金回贈"],
      validFrom: "2025-12-01",
      validTo: "2025-12-31",
      requirements: [
        "全新安信信貸客戶",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 0,
      minSpendDays: 0,
      notes: "高達8%現金回贈。最低年薪要求HK$240,000（學生版無最低年薪要求）。",
    }
  },
  {
    cardId: "earnmore",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/earnmore-unionpay-diamond",
      bonusValue: 500,
      bonusDescription: "全新客戶：HK$400 惠康購物現金券 + HK$100現金回贈",
      bonusItems: ["HK$400 惠康購物現金券", "HK$100現金回贈"],
      validFrom: "2025-12-01",
      validTo: "2025-12-31",
      requirements: [
        "全新安信信貸客戶",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 0,
      minSpendDays: 0,
      notes: "高達2%現金回贈，無最低年薪要求。",
    }
  },

  // ========================================
  // 中信銀行(國際)
  // ========================================
  {
    cardId: "cncbi-motion",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/cncbi-hong-kong-airlines-mastercard",
      bonusValue: 1600,
      bonusDescription: "HK$1,600 HKTVmall電子購物禮券（升級優惠，迎新總值高達HK$5,980）",
      bonusItems: ["HK$1,600 HKTVmall電子購物禮券"],
      validFrom: "2025-12-01",
      validTo: "2025-12-31",
      requirements: [
        "全新中信銀行(國際)信用卡客戶",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 0,
      minSpendDays: 0,
      notes: "迎新總價值高達HK$5,980。高達6%消費里數回贈，最低年薪要求HK$96,000。",
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

  // ========================================
  // 滙豐銀行 HSBC (截至 2025/12/05 23:59)
  // 適用：Visa Signature 卡、Pulse銀聯雙幣鑽石卡
  // ⚠️ 全新客戶與現有客戶優惠不同
  // ========================================
  {
    cardId: "hsbc-vs",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/hsbc-visa-signature-card",
      bonusValue: 5980,
      bonusDescription: "全新客戶8選1：HK$1,300 HKTVmall/HK$1,000 Apple禮品卡/HK$1,000 惠康/12,000 Max Miles/Dyson Zone™ 耳機(HK$5,980)/Delsey行李箱(HK$4,980)/Marshall喇叭(HK$1,499)/Canon 打印機(HK$1,080)",
      bonusItems: [
        "HK$1,300 HKTVmall電子購物禮券",
        "HK$1,000 Apple Store禮品卡",
        "HK$1,000 惠康購物禮券",
        "12,000 Max Miles 飛行里數",
        "Dyson Zone™ 降噪耳機（價值HK$5,980）",
        "Delsey 30\" GRENELLE SE Expandable Front Opening Suitcase（價值HK$4,980; 顏色隨機）",
        "Marshall Emberton II 藍牙喇叭（價值HK$1,499; 顏色隨機）",
        "Canon SELPHY QX20 流動無線相片打印機（價值HK$1,080）"
      ],
      validFrom: "2025-12-01",
      validTo: "2025-12-05",
      requirements: [
        "全新滙豐信用卡客戶（於處理申請時沒有任何滙豐個人信用卡基本卡）",
        "2026年1月5日之前成功獲批信用卡",
        "收到表格後7日內填妥「獎賞換領表格」",
        "批卡後7日內填寫表格及上傳批核證明"
      ],
      minSpend: 0,
      minSpendDays: 0,
      notes: "⚠️ 優惠期至12月5日晚上11:59分！選擇Max Miles時，登記電郵需與HEYMAX賬戶相同。換領流程由推廣期結束後起計需時至少8星期。申請前請關掉AdBlocker及「私人模式」。",
      // 新增：現有客戶優惠
      existingCustomerOffer: {
        bonusValue: 4980,
        bonusDescription: "現有客戶6選1：HK$200 Apple禮品卡/HK$200 惠康禮券/8,000 Max Miles/Delsey行李箱(HK$4,980)/Marshall喇叭(HK$1,499)/Insta360 Flow 2(HK$819)",
        bonusItems: [
          "HK$200 Apple Store禮品卡",
          "HK$200 惠康超市禮券",
          "8,000 Max Miles 飛行里數",
          "Delsey 30\" GRENELLE SE Expandable Front Opening Suitcase（價值HK$4,980; 顏色隨機）",
          "Marshall Emberton II 藍牙喇叭（價值HK$1,499; 顏色隨機）",
          "Insta360 Flow 2 AI 追蹤模組套裝（價值HK$819）"
        ],
        requirements: [
          "現有滙豐信用卡客戶（於處理申請時已持有任何滙豐個人信用卡基本卡）"
        ]
      }
    }
  },
  {
    cardId: "hsbc-pulse",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/hsbc-pulse-unionpay-card",
      bonusValue: 5980,
      bonusDescription: "全新客戶8選1：HK$1,300 HKTVmall/HK$1,000 Apple禮品卡/HK$1,000 惠康/12,000 Max Miles/Dyson Zone™ 耳機(HK$5,980)/Delsey行李箱(HK$4,980)/Marshall喇叭(HK$1,499)/Canon 打印機(HK$1,080)",
      bonusItems: [
        "HK$1,300 HKTVmall電子購物禮券",
        "HK$1,000 Apple Store禮品卡",
        "HK$1,000 惠康購物禮券",
        "12,000 Max Miles 飛行里數",
        "Dyson Zone™ 降噪耳機（價值HK$5,980）",
        "Delsey 30\" GRENELLE SE Expandable Front Opening Suitcase（價值HK$4,980; 顏色隨機）",
        "Marshall Emberton II 藍牙喇叭（價值HK$1,499; 顏色隨機）",
        "Canon SELPHY QX20 流動無線相片打印機（價值HK$1,080）"
      ],
      validFrom: "2025-12-01",
      validTo: "2025-12-05",
      requirements: [
        "全新滙豐信用卡客戶（於處理申請時沒有任何滙豐個人信用卡基本卡）",
        "2026年1月5日之前成功獲批信用卡",
        "收到表格後7日內填妥「獎賞換領表格」",
        "批卡後7日內填寫表格及上傳批核證明"
      ],
      minSpend: 0,
      minSpendDays: 0,
      notes: "⚠️ 優惠期至12月5日晚上11:59分！選擇Max Miles時，登記電郵需與HEYMAX賬戶相同。換領流程由推廣期結束後起計需時至少8星期。申請前請關掉AdBlocker及「私人模式」。",
      // 新增：現有客戶優惠
      existingCustomerOffer: {
        bonusValue: 4980,
        bonusDescription: "現有客戶6選1：HK$200 Apple禮品卡/HK$200 惠康禮券/8,000 Max Miles/Delsey行李箱(HK$4,980)/Marshall喇叭(HK$1,499)/Insta360 Flow 2(HK$819)",
        bonusItems: [
          "HK$200 Apple Store禮品卡",
          "HK$200 惠康超市禮券",
          "8,000 Max Miles 飛行里數",
          "Delsey 30\" GRENELLE SE Expandable Front Opening Suitcase（價值HK$4,980; 顏色隨機）",
          "Marshall Emberton II 藍牙喇叭（價值HK$1,499; 顏色隨機）",
          "Insta360 Flow 2 AI 追蹤模組套裝（價值HK$819）"
        ],
        requirements: [
          "現有滙豐信用卡客戶（於處理申請時已持有任何滙豐個人信用卡基本卡）"
        ]
      }
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
