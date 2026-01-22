import { NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

// 真實 MoneyHero 獨家優惠資料 (截至 2025年12月)
// 資料來源：MoneyHero 官網條款與細則
const MONEYHERO_PARTNER_OFFERS = [
  // ========================================
  // Citi 花旗銀行 (2025/12/31 12:00 - 2026/01/30 18:00)
  // 適用：八達通白金卡、Cash Back、Rewards、Rewards 銀聯、Premier Miles
  // 條件：批卡後30日內簽賬滿$4,000
  // ========================================
  {
    cardId: "citi-rewards",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=169&a=228&sub_id1=pickcardrebate&sub_id2=web",
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
      validFrom: "2025-12-31",
      validTo: "2026-01-30",
      requirements: [
        "全新Citi信用卡客戶（過去12個月內未曾持有Citi信用卡主卡）",
        "批卡後30日內累積簽賬滿HK$4,000",
        "2026年2月28日或之前成功獲批並啟動信用卡",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 4000,
      minSpendDays: 30,
      notes: "⚠️ 領取MoneyHero獨家優惠不能同時獲取花旗銀行迎新優惠。換領流程由推廣期結束後起計需時至少16星期。申請前請關掉AdBlocker及「私人模式」。",
    }
  },
  // Citi HKTVmall 信用卡 - 不適用於本期優惠（學生卡除外）
  // 注意：HKTVmall卡不在本期MoneyHero優惠範圍
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
      validFrom: "2025-12-31",
      validTo: "2026-01-30",
      requirements: [
        "全新Citi信用卡客戶（過去12個月內未曾持有Citi信用卡主卡）",
        "批卡後30日內累積簽賬滿HK$4,000",
        "2026年2月28日或之前成功獲批並啟動信用卡",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 4000,
      minSpendDays: 30,
      notes: "⚠️ 領取MoneyHero獨家優惠不能同時獲取花旗銀行迎新優惠。換領流程由推廣期結束後起計需時至少16星期。申請前請關掉AdBlocker及「私人模式」。",
    }
  },
  {
    cardId: "citi-cashback",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=168&a=228&sub_id1=pickcardrebate&sub_id2=web",
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
      validFrom: "2025-12-31",
      validTo: "2026-01-30",
      requirements: [
        "全新Citi信用卡客戶（過去12個月內未曾持有Citi信用卡主卡）",
        "批卡後30日內累積簽賬滿HK$4,000",
        "2026年2月28日或之前成功獲批並啟動信用卡",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 4000,
      minSpendDays: 30,
      notes: "⚠️ 領取MoneyHero獨家優惠不能同時獲取花旗銀行迎新優惠。換領流程由推廣期結束後起計需時至少16星期。申請前請關掉AdBlocker及「私人模式」。",
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
      validFrom: "2025-12-31",
      validTo: "2026-01-30",
      requirements: [
        "全新Citi信用卡客戶（過去12個月內未曾持有Citi信用卡主卡）",
        "批卡後30日內累積簽賬滿HK$4,000",
        "2026年2月28日或之前成功獲批並啟動信用卡",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 4000,
      minSpendDays: 30,
      notes: "⚠️ 領取MoneyHero獨家優惠不能同時獲取花旗銀行迎新優惠。換領流程由推廣期結束後起計需時至少16星期。申請前請關掉AdBlocker及「私人模式」。",
    }
  },
  // Citi Rewards 銀聯 (同樣適用)
  {
    cardId: "citi-rewards-unionpay",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/citi-rewards-unionpay",
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
      validFrom: "2025-12-31",
      validTo: "2026-01-30",
      requirements: [
        "全新Citi信用卡客戶（過去12個月內未曾持有Citi信用卡主卡）",
        "批卡後30日內累積簽賬滿HK$4,000",
        "2026年2月28日或之前成功獲批並啟動信用卡",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 4000,
      minSpendDays: 30,
      notes: "⚠️ 領取MoneyHero獨家優惠不能同時獲取花旗銀行迎新優惠。換領流程由推廣期結束後起計需時至少16星期。申請前請關掉AdBlocker及「私人模式」。",
    }
  },
  // ========================================
  // Citi Prestige 信用卡 (2025/12/31 12:00 - 2026/01/30 18:00)
  // 條件：批卡後30日內簽賬滿HK$10,000
  // 更新日期：2026-01-22
  // ========================================
  {
    cardId: "citi-prestige",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/citi-prestige-card",
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
      validFrom: "2025-12-31",
      validTo: "2026-01-30",
      requirements: [
        "全新Citi信用卡客戶（過去12個月內未曾持有Citi信用卡主卡）",
        "批卡後30日內累積簽賬滿HK$10,000",
        "2026年2月28日或之前成功獲批並啟動信用卡",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 10000,
      minSpendDays: 30,
      notes: "⚠️ 領取MoneyHero獨家優惠不能同時獲取花旗銀行迎新優惠。換領流程由推廣期結束後起計需時至少16星期。申請前請關掉AdBlocker及「私人模式」。Citi Prestige 年費 HK$3,800。",
    }
  },

  // ========================================
  // DBS 星展銀行 (2025/12/25 18:00 - 2026/01/30 18:00)
  // 適用：Black World Mastercard、Eminent Visa Signature、Eminent Visa Platinum
  // ========================================
  {
    cardId: "dbs-black",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=188&a=228&sub_id1=pickcardrebate&sub_id2=web",
      bonusValue: 4980,
      bonusDescription: "獎品7選1：Delsey行李箱(HK$4,980)/Foreo LUNA 3(HK$2,090)/NESCAFÉ咖啡機(HK$1,780)/Marshall藍牙喇叭(HK$1,499)/HK$800 HKTVmall/Apple/Trip.com禮券",
      bonusItems: [
        "Delsey 30\" GRENELLE SE Expandable Front Opening Suitcase（價值HK$4,980; 顏色隨機）",
        "Foreo LUNA 3 潔面及按摩儀（價值HK$2,090）",
        "NESCAFÉ Dolce Gusto Genio S Plus 膠囊咖啡機連6盒膠囊（價值HK$1,780; 顏色隨機）",
        "Marshall Emberton II 藍牙喇叭（價值HK$1,499; 顏色隨機）",
        "HK$800 HKTVmall電子購物禮券",
        "HK$800 Apple Store禮品卡",
        "HK$800 Trip.com電子禮券"
      ],
      validFrom: "2025-12-25",
      validTo: "2026-01-30",
      requirements: [
        "全新星展信用卡客戶",
        "2026年2月28日或之前成功獲批信用卡",
        "收到表格後7日內填妥「獎賞換領表格」",
        "申請時請記下申請參考編號"
      ],
      minSpend: 0,
      minSpendDays: 0,
      notes: "換領流程由推廣期結束後起計需時至少16星期。申請前請關掉AdBlocker及「私人模式」。建議一次過交齊所需文件，以加快批核程序。",
    }
  },
  // DBS Eminent Visa Signature / Platinum - 系統中合併為 dbs-eminent
  {
    cardId: "dbs-eminent",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=187&a=228&sub_id1=pickcardrebate&sub_id2=web",
      bonusValue: 4980,
      bonusDescription: "獎品7選1：Delsey行李箱(HK$4,980)/Foreo LUNA 3(HK$2,090)/NESCAFÉ咖啡機(HK$1,780)/Marshall藍牙喇叭(HK$1,499)/HK$800 HKTVmall/Apple/Trip.com禮券",
      bonusItems: [
        "Delsey 30\" GRENELLE SE Expandable Front Opening Suitcase（價值HK$4,980; 顏色隨機）",
        "Foreo LUNA 3 潔面及按摩儀（價值HK$2,090）",
        "NESCAFÉ Dolce Gusto Genio S Plus 膠囊咖啡機連6盒膠囊（價值HK$1,780; 顏色隨機）",
        "Marshall Emberton II 藍牙喇叭（價值HK$1,499; 顏色隨機）",
        "HK$800 HKTVmall電子購物禮券",
        "HK$800 Apple Store禮品卡",
        "HK$800 Trip.com電子禮券"
      ],
      validFrom: "2025-12-25",
      validTo: "2026-01-30",
      requirements: [
        "全新星展信用卡客戶",
        "2026年2月28日或之前成功獲批信用卡",
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
      applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=185&a=228&sub_id1=pickcardrebate&sub_id2=web",
      bonusValue: 200,
      bonusDescription: "獎品2選1：HK$200 Apple Store禮品卡 或 HK$200 惠康購物現金券",
      bonusItems: ["HK$200 Apple Store禮品卡", "HK$200 惠康購物現金券"],
      validFrom: "2026-01-01",
      validTo: "2026-01-30",
      requirements: [
        "全新星展信用卡客戶",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 0,
      minSpendDays: 0,
      notes: "換領流程由推廣期結束後起計需時至少16星期。申請前請關掉AdBlocker及「私人模式」。",
    }
  },
  {
    cardId: "dbs-live-fresh",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/dbs-live-fresh-card",
      bonusValue: 200,
      bonusDescription: "獎品2選1：HK$200 Apple Store禮品卡 或 HK$200 惠康購物現金券",
      bonusItems: ["HK$200 Apple Store禮品卡", "HK$200 惠康購物現金券"],
      validFrom: "2026-01-01",
      validTo: "2026-01-30",
      requirements: [
        "全新星展信用卡客戶",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 0,
      minSpendDays: 0,
      notes: "換領流程由推廣期結束後起計需時至少16星期。申請前請關掉AdBlocker及「私人模式」。",
    }
  },

  // ========================================
  // 渣打銀行 (2025/12/31 12:00 - 2026/01/30 18:00)
  // 適用：Smart Card、Simply Cash
  // 條件：毋需簽賬
  // ========================================
  {
    cardId: "sc-smart",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=176&a=228&sub_id1=pickcardrebate&sub_id2=web",
      bonusValue: 4980,
      bonusDescription: "獎品6選1：HK$800 HKTVmall / HK$800 Apple禮品卡 / HK$800 惠康現金券 / Delsey行李箱(HK$4,980) / NESCAFÉ咖啡機(HK$1,780) / Marshall喇叭(HK$1,499)",
      bonusItems: [
        "HK$800 HKTVmall電子購物禮券",
        "HK$800 Apple Store禮品卡",
        "HK$800 惠康購物現金券",
        "Delsey 30\" GRENELLE SE Expandable Front Opening Suitcase（價值HK$4,980; 顏色隨機）",
        "NESCAFÉ® Dolce Gusto® Genio S Plus 咖啡機 + 6盒咖啡膠囊（價值HK$1,780）",
        "Marshall Emberton II 藍牙喇叭（價值HK$1,499; 顏色隨機）"
      ],
      validFrom: "2025-12-31",
      validTo: "2026-01-30",
      requirements: [
        "全新渣打信用卡客戶（過去6個月內未曾持有或取消任何渣打/MANHATTAN信用卡主卡）",
        "毋需簽賬",
        "2026年2月28日或之前成功獲批信用卡",
        "收到表格後7日內填妥「獎賞換領表格」",
        "批卡後7日內填寫表格及上傳批核證明"
      ],
      minSpend: 0,
      minSpendDays: 0,
      notes: "渣打信用卡申請參考編號格式: HK + 14位數字（例：HKxxxxxxxxxxxxxx）。換領流程由推廣期結束後起計需時至少16星期。申請前請關掉AdBlocker及「私人模式」。⚠️ MoneyHero 獨家優惠由 MoneyHero 提供，與渣打銀行無關。",
    }
  },
  {
    cardId: "sc-simply-cash",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/scb-simply-cash-visa",
      bonusValue: 4980,
      bonusDescription: "獎品6選1：HK$800 HKTVmall / HK$800 Apple禮品卡 / HK$800 惠康現金券 / Delsey行李箱(HK$4,980) / NESCAFÉ咖啡機(HK$1,780) / Marshall喇叭(HK$1,499)",
      bonusItems: [
        "HK$800 HKTVmall電子購物禮券",
        "HK$800 Apple Store禮品卡",
        "HK$800 惠康購物現金券",
        "Delsey 30\" GRENELLE SE Expandable Front Opening Suitcase（價值HK$4,980; 顏色隨機）",
        "NESCAFÉ® Dolce Gusto® Genio S Plus 咖啡機 + 6盒咖啡膠囊（價值HK$1,780）",
        "Marshall Emberton II 藍牙喇叭（價值HK$1,499; 顏色隨機）"
      ],
      validFrom: "2025-12-31",
      validTo: "2026-01-30",
      requirements: [
        "全新渣打信用卡客戶（過去6個月內未曾持有或取消任何渣打/MANHATTAN信用卡主卡）",
        "毋需簽賬",
        "2026年2月28日或之前成功獲批信用卡",
        "收到表格後7日內填妥「獎賞換領表格」",
        "批卡後7日內填寫表格及上傳批核證明"
      ],
      minSpend: 0,
      minSpendDays: 0,
      notes: "渣打信用卡申請參考編號格式: HK + 14位數字（例：HKxxxxxxxxxxxxxx）。換領流程由推廣期結束後起計需時至少16星期。申請前請關掉AdBlocker及「私人模式」。⚠️ MoneyHero 獨家優惠由 MoneyHero 提供，與渣打銀行無關。",
    }
  },

  // ========================================
  // 大新銀行 (即日起至2026年01月30日下午6時)
  // 指定信用卡：ONE+、MyAuto車主、ANA World、聯合航空World、英國航空白金卡
  // 更新日期：2026-01-22
  // ========================================
  {
    cardId: "dahsing-one",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=604&a=228&sub_id1=pickcardrebate&sub_id2=web",
      bonusValue: 400,
      bonusDescription: "獎品2選1：HK$400 Apple Store禮品卡 / HK$400 惠康超市現金券",
      bonusItems: [
        "HK$400 Apple Store禮品卡",
        "HK$400 惠康超市現金券"
      ],
      validFrom: "2026-01-01",
      validTo: "2026-01-30",
      requirements: [
        "全新大新銀行信用卡客戶",
        "2026年2月28日或之前成功獲批信用卡",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 0,
      minSpendDays: 0,
      notes: "申請參考編號格式為以6個0開首＋6位數字（如：000000123456）。換領流程由推廣期結束後起計需時至少16星期。指定信用卡包括 大新ONE+信用卡、大新MyAuto車主信用卡、大新ANA World萬事達卡、大新聯合航空World萬事達卡、大新英國航空白金卡。",
    }
  },
  {
    cardId: "dahsing-ba",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=604&a=228&sub_id1=pickcardrebate&sub_id2=web",
      bonusValue: 400,
      bonusDescription: "獎品2選1：HK$400 Apple Store禮品卡 / HK$400 惠康超市現金券",
      bonusItems: [
        "HK$400 Apple Store禮品卡",
        "HK$400 惠康超市現金券"
      ],
      validFrom: "2026-01-01",
      validTo: "2026-01-30",
      requirements: [
        "全新大新銀行信用卡客戶",
        "2026年2月28日或之前成功獲批信用卡",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 0,
      minSpendDays: 0,
      notes: "申請參考編號格式為以6個0開首＋6位數字（如：000000123456）。換領流程由推廣期結束後起計需時至少16星期。指定信用卡包括 大新ONE+信用卡、大新MyAuto車主信用卡、大新ANA World萬事達卡、大新聯合航空World萬事達卡、大新英國航空白金卡。",
    }
  },
  {
    cardId: "dahsing-united",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=604&a=228&sub_id1=pickcardrebate&sub_id2=web",
      bonusValue: 400,
      bonusDescription: "獎品2選1：HK$400 Apple Store禮品卡 / HK$400 惠康超市現金券",
      bonusItems: [
        "HK$400 Apple Store禮品卡",
        "HK$400 惠康超市現金券"
      ],
      validFrom: "2026-01-01",
      validTo: "2026-01-30",
      requirements: [
        "全新大新銀行信用卡客戶",
        "2026年2月28日或之前成功獲批信用卡",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 0,
      minSpendDays: 0,
      notes: "申請參考編號格式為以6個0開首＋6位數字（如：000000123456）。換領流程由推廣期結束後起計需時至少16星期。指定信用卡包括 大新ONE+信用卡、大新MyAuto車主信用卡、大新ANA World萬事達卡、大新聯合航空World萬事達卡、大新英國航空白金卡。",
    }
  },
  {
    cardId: "dahsing-myauto",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=604&a=228&sub_id1=pickcardrebate&sub_id2=web",
      bonusValue: 400,
      bonusDescription: "獎品2選1：HK$400 Apple Store禮品卡 / HK$400 惠康超市現金券",
      bonusItems: [
        "HK$400 Apple Store禮品卡",
        "HK$400 惠康超市現金券"
      ],
      validFrom: "2026-01-01",
      validTo: "2026-01-30",
      requirements: [
        "全新大新銀行信用卡客戶",
        "2026年2月28日或之前成功獲批信用卡",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 0,
      minSpendDays: 0,
      notes: "申請參考編號格式為以6個0開首＋6位數字（如：000000123456）。換領流程由推廣期結束後起計需時至少16星期。指定信用卡包括 大新ONE+信用卡、大新MyAuto車主信用卡、大新ANA World萬事達卡、大新聯合航空World萬事達卡、大新英國航空白金卡。",
    }
  },

  // ========================================
  // 安信信貸
  // ========================================
  {
    cardId: "wewa-unionpay",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=180&a=228&sub_id1=pickcardrebate&sub_id2=web",
      bonusValue: 300,
      bonusDescription: "全新客戶：HK$200 惠康購物現金券 + HK$100現金回贈",
      bonusItems: ["HK$200 惠康購物現金券", "HK$100現金回贈"],
      validFrom: "2025-12-31",
      validTo: "2026-01-30",
      requirements: [
        "全新安信信用卡客戶（過去12個月內未曾持有安信信用卡主卡）",
        "經MoneyHero成功申請安信銀聯信用卡",
        "2026年2月28日或之前成功獲批",
        "批卡成功後30日內累積簽賬滿HK$100",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 100,
      minSpendDays: 30,
      notes: "換領流程由推廣期結束後起計需時至少16星期。",
    }
  },
  {
    cardId: "wewa-visa-signature",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=180&a=228&sub_id1=pickcardrebate&sub_id2=web",
      bonusValue: 300,
      bonusDescription: "全新客戶：HK$200 惠康購物現金券 + HK$100現金回贈",
      bonusItems: ["HK$200 惠康購物現金券", "HK$100現金回贈"],
      validFrom: "2025-12-31",
      validTo: "2026-01-30",
      requirements: [
        "全新安信信用卡客戶（過去12個月內未曾持有安信信用卡主卡）",
        "經MoneyHero成功申請 WeWa Visa Signature 卡",
        "2026年2月28日或之前成功獲批",
        "批卡成功後30日內累積簽賬滿HK$100",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 100,
      minSpendDays: 30,
      notes: "換領流程由推廣期結束後起計需時至少16星期。",
    }
  },
  {
    cardId: "earnmore",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=182&a=228&sub_id1=pickcardrebate&sub_id2=web",
      bonusValue: 300,
      bonusDescription: "全新客戶：HK$200 惠康購物現金券 + HK$100現金回贈",
      bonusItems: ["HK$200 惠康購物現金券", "HK$100現金回贈"],
      validFrom: "2025-12-31",
      validTo: "2026-01-30",
      requirements: [
        "全新安信信用卡客戶（過去12個月內未曾持有安信信用卡主卡）",
        "經MoneyHero成功申請安信銀聯信用卡",
        "2026年2月28日或之前成功獲批",
        "批卡成功後30日內累積簽賬滿HK$100",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 100,
      minSpendDays: 30,
      notes: "換領流程由推廣期結束後起計需時至少16星期。",
    }
  },

  // ========================================
  // 中信銀行(國際) (2026/01/15 18:00 - 2026/01/26 18:00)
  // 適用：Motion信用卡、大灣區雙幣信用卡、香港航空Mastercard
  // 條件：批卡後30日內簽賬滿HK$100
  // 更新日期：2026-01-22
  // ========================================
  {
    cardId: "cncbi-motion",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=178&a=228&sub_id1=pickcardrebate&sub_id2=web",
      bonusValue: 5980,
      bonusDescription: "獎品7選1：Dyson Zone™耳機(HK$5,980) / LG空氣清新機(HK$3,690) / Philips吸塵機(HK$2,498) / 14,000 Max Miles / HK$1,300 Apple禮品卡 / HK$1,300 惠康現金券 / HK$1,100 現金回贈",
      bonusItems: [
        "Dyson Zone™ 降噪耳機（價值HK$5,980）",
        "LG AS35GGW20 PuriCare™ 空氣清新機 寵物版（價值HK$3,690）",
        "Philips輕量強效無線吸塵機 XC2011/61（價值HK$2,498）",
        "14,000 Max Miles 飛行里數",
        "HK$1,300 Apple Store禮品卡",
        "HK$1,300 惠康購物現金券",
        "HK$1,100 現金回贈（經轉數快存入戶口）"
      ],
      validFrom: "2026-01-15",
      validTo: "2026-01-26",
      requirements: [
        "全新信銀國際信用卡客戶（過去12個月內未曾持有信銀國際信用卡主卡）",
        "批卡後30日內簽賬滿HK$100",
        "2026年2月28日或之前成功獲批信用卡",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 100,
      minSpendDays: 30,
      notes: "指定信用卡包括Motion信用卡、大灣區雙幣信用卡及香港航空Mastercard。每位客戶只可享一份MoneyHero獎賞。選擇Max Miles時，登記電郵需與HEYMAX賬戶相同。",
    }
  },
  {
    cardId: "cncbi-gba",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=179&a=228&sub_id1=pickcardrebate&sub_id2=web",
      bonusValue: 5980,
      bonusDescription: "獎品7選1：Dyson Zone™耳機(HK$5,980) / LG空氣清新機(HK$3,690) / Philips吸塵機(HK$2,498) / 14,000 Max Miles / HK$1,300 Apple禮品卡 / HK$1,300 惠康現金券 / HK$1,100 現金回贈",
      bonusItems: [
        "Dyson Zone™ 降噪耳機（價值HK$5,980）",
        "LG AS35GGW20 PuriCare™ 空氣清新機 寵物版（價值HK$3,690）",
        "Philips輕量強效無線吸塵機 XC2011/61（價值HK$2,498）",
        "14,000 Max Miles 飛行里數",
        "HK$1,300 Apple Store禮品卡",
        "HK$1,300 惠康購物現金券",
        "HK$1,100 現金回贈（經轉數快存入戶口）"
      ],
      validFrom: "2026-01-15",
      validTo: "2026-01-26",
      requirements: [
        "全新信銀國際信用卡客戶（過去12個月內未曾持有信銀國際信用卡主卡）",
        "批卡後30日內簽賬滿HK$100",
        "2026年2月28日或之前成功獲批信用卡",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 100,
      minSpendDays: 30,
      notes: "指定信用卡包括Motion信用卡、大灣區雙幣信用卡及香港航空Mastercard。每位客戶只可享一份MoneyHero獎賞。選擇Max Miles時，登記電郵需與HEYMAX賬戶相同。",
    }
  },
  {
    cardId: "cncbi-hkairlines",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=178&a=228&sub_id1=pickcardrebate&sub_id2=web",
      bonusValue: 5980,
      bonusDescription: "獎品7選1：Dyson Zone™耳機(HK$5,980) / LG空氣清新機(HK$3,690) / Philips吸塵機(HK$2,498) / 14,000 Max Miles / HK$1,300 Apple禮品卡 / HK$1,300 惠康現金券 / HK$1,100 現金回贈",
      bonusItems: [
        "Dyson Zone™ 降噪耳機（價值HK$5,980）",
        "LG AS35GGW20 PuriCare™ 空氣清新機 寵物版（價值HK$3,690）",
        "Philips輕量強效無線吸塵機 XC2011/61（價值HK$2,498）",
        "14,000 Max Miles 飛行里數",
        "HK$1,300 Apple Store禮品卡",
        "HK$1,300 惠康購物現金券",
        "HK$1,100 現金回贈（經轉數快存入戶口）"
      ],
      validFrom: "2026-01-15",
      validTo: "2026-01-26",
      requirements: [
        "全新信銀國際信用卡客戶（過去12個月內未曾持有信銀國際信用卡主卡）",
        "批卡後30日內簽賬滿HK$100",
        "2026年2月28日或之前成功獲批信用卡",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 100,
      minSpendDays: 30,
      notes: "指定信用卡包括Motion信用卡、大灣區雙幣信用卡及香港航空Mastercard。每位客戶只可享一份MoneyHero獎賞。選擇Max Miles時，登記電郵需與HEYMAX賬戶相同。",
    }
  },

  // ========================================
  // 恒生銀行 Travel+ (即日起至 2026/01/30 18:00)
  // 適用：Travel+ Visa Signature 卡
  // 條件：提交申請後30日內批卡，批卡後30日內簽賬滿HK$100
  // ========================================
  {
    cardId: "hangseng-travel-plus",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=688&a=228&sub_id1=pickcardrebate&sub_id2=web",
      bonusValue: 400,
      bonusDescription: "獎品2選1：HK$400 Apple Store禮品卡 或 HK$400 惠康購物現金券",
      bonusItems: ["HK$400 Apple Store禮品卡", "HK$400 惠康購物現金券"],
      validFrom: "2025-12-22",
      validTo: "2026-01-30",
      requirements: [
        "全新及現有恒生信用卡客戶",
        "提交申請後30日內成功獲批",
        "批卡後30日內累積簽賬滿HK$100",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 100,
      minSpendDays: 30,
      notes: "換領流程由推廣期結束後起計需時至少16星期。若客戶於開戶後13個月內取消有關信用卡戶口，並已獲贈有關之迎新獎賞，則須繳付同等價值之金額作為手續費。「全新信用卡客戶」為過去12個月內未曾持有任何恒生信用卡/聯營卡/消費卡主卡之申請人。「現有信用卡客戶」為過去12個月內曾持有恒生信用卡/聯營卡主卡（不包括消費卡及專享卡）之申請人。",
    }
  },
  // ========================================
  // 恒生 MMPOWER World Mastercard (即日起至 2026/01/30 18:00)
  // 條件：批卡後30日內簽賬滿HK$400
  // ⚠️ 全新客戶與現有客戶優惠不同
  // 更新日期：2026-01-22
  // ========================================
  {
    cardId: "hangseng-mmpower",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=212&a=228&sub_id1=pickcardrebate&sub_id2=web",
      bonusValue: 4980,
      bonusDescription: "全新客戶6選1：Delsey行李箱(HK$4,980) / Foreo LUNA 3(HK$2,090) / Marshall Emberton II(HK$1,499) / HK$800 Apple禮品卡 / HK$800 惠康現金券 / HK$800 現金回贈(FPS)",
      bonusItems: [
        "Delsey 30\" GRENELLE SE Expandable Front Opening Suitcase（價值HK$4,980; 顏色隨機）",
        "Foreo LUNA 3 潔面及按摩儀（價值HK$2,090）",
        "Marshall Emberton II 藍牙喇叭（價值HK$1,499; 顏色隨機）",
        "HK$800 Apple Store禮品卡",
        "HK$800 惠康購物現金券",
        "HK$800 現金回贈（經轉數快存入戶口）"
      ],
      validFrom: "2026-01-01",
      validTo: "2026-01-30",
      requirements: [
        "全新恒生信用卡客戶（過去12個月內未曾持有任何恒生信用卡/聯營卡/消費卡主卡）",
        "提交申請後30日內成功獲批",
        "批卡後30日內累積簽賬滿HK$400",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 400,
      minSpendDays: 30,
      notes: "換領流程由推廣期結束後起計需時至少16星期。若客戶於開戶後13個月內取消有關信用卡戶口，並已獲贈有關之迎新獎賞，則須繳付同等價值之金額作為手續費。",
      // 現有客戶優惠
      existingCustomerOffer: {
        bonusValue: 2090,
        bonusDescription: "現有客戶6選1：Foreo LUNA 3(HK$2,090) / Marshall Willen II(HK$999) / Polaroid Go Gen 2(HK$999) / HK$600 Apple禮品卡 / HK$600 惠康現金券 / HK$600 現金回贈(FPS)",
        bonusItems: [
          "Foreo LUNA 3 潔面及按摩儀（價值HK$2,090）",
          "Marshall Willen II 小型無線便攜喇叭（價值HK$999）",
          "Polaroid Go Generation 2 即影即有相機（價值HK$999）",
          "HK$600 Apple Store禮品卡",
          "HK$600 惠康購物現金券",
          "HK$600 現金回贈（經轉數快存入戶口）"
        ],
        requirements: [
          "現有恒生信用卡客戶（過去12個月內曾持有任何恒生信用卡/聯營卡主卡）",
          "如現在或過去12個月內曾持有MMPOWER卡，不可獲享此優惠",
          "批卡後30日內累積簽賬滿HK$400"
        ]
      }
    }
  },

  // ========================================
  // 亞洲聯合財務 sim 信用卡 (2026/01/19 18:00 - 2026/01/31 23:59)
  // 獨家優惠1：選擇「6個月免息免手續費現金套現分期計劃」作爲迎新優惠（無需簽賬）
  // 獨家優惠2：批卡後30日內簽賬滿HK$100
  // 更新日期：2026-01-22
  // ========================================
  {
    cardId: "sim-credit-card",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=503&a=228&sub_id1=pickcardrebate&sub_id2=web",
      bonusValue: 2100,
      bonusDescription: "獎品7選1：10,000 Max Miles / HK$1,000 Apple禮品卡 / HK$1,000 惠康現金券 / HK$800 現金回贈 / LOJEL行李箱(HK$2,100) / NESCAFÉ咖啡機(HK$1,780) / Marshall喇叭(HK$1,499)",
      bonusItems: [
        "10,000 Max Miles 飛行里數",
        "HK$1,000 Apple Store禮品卡",
        "HK$1,000 惠康購物現金券",
        "HK$800 現金回贈（經轉數快存入戶口）",
        "LOJEL Alto 29吋超輕量拉鍊行李箱（價值HK$2,100; 顏色隨機）",
        "NESCAFÉ® Dolce Gusto® Genio S Plus 咖啡機 + 6盒咖啡膠囊（價值HK$1,780）",
        "Marshall Emberton II 藍牙喇叭（價值HK$1,499; 顏色隨機）"
      ],
      validFrom: "2026-01-19",
      validTo: "2026-01-31",
      requirements: [
        "全新sim信用卡客戶",
        "選擇「6個月免息免手續費現金套現分期計劃」作爲迎新優惠（無需簽賬）",
        "或批卡後30日內簽賬滿HK$100",
        "2026年2月28日或之前成功獲批並啟動信用卡"
      ],
      minSpend: 0,
      minSpendDays: 0,
      notes: "⚠️ 獨家優惠1和2只能選擇其一！選擇Max Miles時，登記電郵需與HEYMAX賬戶相同。申請前請關掉AdBlocker及「私人模式」。記下完成申請後頁面提供的申請參考編號（例如ABC123456789）。",
    }
  },

  // ========================================
  // sim World Mastercard (2026/01/19 18:00 - 2026/01/31 23:59)
  // 獨家優惠1：選擇「6個月免息免手續費現金套現分期計劃」作爲迎新優惠（無需簽賬）
  // 獨家優惠2：批卡後30日內簽賬滿HK$100
  // 更新日期：2026-01-22
  // ========================================
  {
    cardId: "sim-world-mastercard",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/sim-world-mastercard",
      bonusValue: 2100,
      bonusDescription: "獎品7選1：10,000 Max Miles / HK$1,000 Apple禮品卡 / HK$1,000 惠康現金券 / HK$800 現金回贈 / LOJEL行李箱(HK$2,100) / NESCAFÉ咖啡機(HK$1,780) / Marshall喇叭(HK$1,499)",
      bonusItems: [
        "10,000 Max Miles 飛行里數",
        "HK$1,000 Apple Store禮品卡",
        "HK$1,000 惠康購物現金券",
        "HK$800 現金回贈（經轉數快存入戶口）",
        "LOJEL Alto 29吋超輕量拉鍊行李箱（價值HK$2,100; 顏色隨機）",
        "NESCAFÉ® Dolce Gusto® Genio S Plus 咖啡機 + 6盒咖啡膠囊（價值HK$1,780）",
        "Marshall Emberton II 藍牙喇叭（價值HK$1,499; 顏色隨機）"
      ],
      validFrom: "2026-01-19",
      validTo: "2026-01-31",
      requirements: [
        "全新sim信用卡客戶",
        "選擇「6個月免息免手續費現金套現分期計劃」作爲迎新優惠（無需簽賬）",
        "或批卡後30日內簽賬滿HK$100",
        "2026年2月28日或之前成功獲批並啟動信用卡"
      ],
      minSpend: 0,
      minSpendDays: 0,
      notes: "⚠️ 獨家優惠1和2只能選擇其一！選擇Max Miles時，登記電郵需與HEYMAX賬戶相同。申請前請關掉AdBlocker及「私人模式」。記下完成申請後頁面提供的申請參考編號（例如ABC123456789）。",
    }
  },

  // ========================================
  // 渣打國泰 Mastercard (2026/01/19 18:00 - 2026/01/30 18:00)
  // 更新日期：2026-01-22
  // ========================================
  {
    cardId: "sc-cathay",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=177&a=228&sub_id1=pickcardrebate&sub_id2=web",
      bonusValue: 5980,
      bonusDescription: "獎品6選1：HK$900 Apple禮品卡 / HK$900 惠康現金券 / HK$900 HKTVmall / Dyson Zone™耳機(HK$5,980) / Delsey行李箱(HK$4,980) / Marshall喇叭(HK$1,499)",
      bonusItems: [
        "HK$900 Apple Store禮品卡",
        "HK$900 惠康購物現金券",
        "HK$900 HKTVmall電子購物禮券",
        "Dyson Zone™ 降噪耳機（價值HK$5,980）",
        "Delsey 30\" GRENELLE SE Expandable Front Opening Suitcase（價值HK$4,980; 顏色隨機）",
        "Marshall Emberton II 藍牙喇叭（價值HK$1,499; 顏色隨機）"
      ],
      validFrom: "2026-01-19",
      validTo: "2026-01-30",
      requirements: [
        "全新渣打信用卡客戶（過去6個月內未曾持有或取消任何渣打/MANHATTAN信用卡主卡）",
        "2026年2月28日或之前成功獲批信用卡",
        "收到表格後7日內填妥「獎賞換領表格」",
        "批卡後7日內填寫表格及上傳批核證明"
      ],
      minSpend: 0,
      minSpendDays: 0,
      notes: "渣打信用卡申請參考編號格式: HK + 14位數字（例：HKxxxxxxxxxxxxxx）。換領流程由推廣期結束後起計需時至少16星期。申請前請關掉AdBlocker及「私人模式」。⚠️ MoneyHero 獨家優惠由 MoneyHero 提供，與渣打銀行無關。",
    }
  },

  // ========================================
  // 恒生 enJoy 卡 (即日起 - 2026/01/30 18:00)
  // 全新客戶：批卡後30日內簽滿 $500
  // 現有客戶：批卡後30日內簽滿 $500
  // 更新日期：2026-01-22
  // ========================================
  {
    cardId: "hangseng-enjoy",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=213&a=228&sub_id1=pickcardrebate&sub_id2=web",
      bonusValue: 4980,
      bonusDescription: "全新客戶5選1：Delsey行李箱(HK$4,980) / Foreo LUNA 3(HK$2,090) / Marshall喇叭(HK$1,499) / HK$800 Apple禮品卡 / HK$800 惠康現金券",
      bonusItems: [
        "Delsey 30\" GRENELLE SE Expandable Front Opening Suitcase（價值HK$4,980; 顏色隨機）",
        "Foreo LUNA 3 潔面及按摩儀（價值HK$2,090）",
        "Marshall Emberton II 藍牙喇叭（價值HK$1,499; 顏色隨機）",
        "HK$800 Apple Store禮品卡",
        "HK$800 惠康購物現金券"
      ],
      validFrom: "2026-01-01",
      validTo: "2026-01-30",
      requirements: [
        "全新恒生信用卡客戶（現在及緊接申請日期前12個月內未曾持有任何恒生信用卡/聯營卡/消費卡主卡）",
        "提交申請後30日內成功獲批信用卡",
        "批卡後30日內簽賬滿HK$500",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 500,
      minSpendDays: 30,
      notes: "換領流程由推廣期結束後起計需時至少16星期。申請前請關掉AdBlocker及「私人模式」。⚠️ 如經電話申請，需先下載恒生 Mobile App。若客戶於開戶後13個月內取消有關信用卡戶口並已獲贈迎新獎賞，則須繳付同等價值之金額作為手續費。",
      existingCustomerOffer: {
        bonusValue: 999,
        bonusDescription: "現有客戶5選1：Marshall Willen II(HK$999) / Braun空氣炸鍋(HK$988) / Foreo fofo洗面機(HK$890) / HK$500 Apple禮品卡 / HK$500 惠康現金券",
        bonusItems: [
          "Marshall Willen II 小型無線便攜喇叭（價值HK$999）",
          "Braun MultiFry 3 空氣炸鍋 HF3000（價值HK$988）",
          "Foreo LUNA fofo 洗面機（價值HK$890）",
          "HK$500 Apple Store禮品卡",
          "HK$500 惠康購物現金券"
        ],
        requirements: [
          "現有恒生信用卡客戶（現在及/或緊接申請日期前12個月內曾持有任何恒生信用卡/聯營卡主卡，不包括消費卡及專享卡）",
          "過去12個月內未曾持有恒生enJoy卡/消費卡主卡",
          "批卡後30日內簽賬滿HK$500"
        ]
      }
    }
  },

  // ========================================
  // 中銀信用卡 (2026/01/02 12:00 - 2026/01/30 18:00)
  // 適用卡種：Cheers Visa Infinite、Cheers Visa Signature、Chill World、Chill Platinum、Go Diamond、Go Platinum
  // ⚠️ 先到先得，送完即止
  // 更新日期：2026-01-22
  // ========================================
  {
    cardId: "boc-cheers",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/boc-cheers-card",
      bonusValue: 2100,
      bonusDescription: "獎品5選1：HK$800 Apple禮品卡 / HK$800 惠康現金券 / LOJEL行李箱(HK$2,100) / Marshall喇叭(HK$1,499) / BRUNO飲水機(HK$998)",
      bonusItems: [
        "HK$800 Apple Store禮品卡",
        "HK$800 惠康購物現金券",
        "LOJEL Alto 29吋超輕量拉鍊行李箱（價值HK$2,100; 顏色隨機）",
        "Marshall Emberton II 藍牙喇叭（價值HK$1,499; 顏色隨機）",
        "BRUNO BAK801 即熱式飲水機（價值HK$998; 顏色隨機）"
      ],
      validFrom: "2026-01-02",
      validTo: "2026-01-30",
      requirements: [
        "全新中銀信用卡客戶（現時並未持有或過去12個月內未曾持有/取消任何中銀信用卡主卡）",
        "2026年2月28日或之前成功獲批信用卡",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 0,
      minSpendDays: 0,
      notes: "⚠️ 先到先得，送完即止！換領流程由批核後起計需時至少16星期。申請前請關掉AdBlocker及「私人模式」。",
    }
  },
  {
    cardId: "boc-cheers-signature",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/boc-cheers-card",
      bonusValue: 2100,
      bonusDescription: "獎品5選1：HK$800 Apple禮品卡 / HK$800 惠康現金券 / LOJEL行李箱(HK$2,100) / Marshall喇叭(HK$1,499) / BRUNO飲水機(HK$998)",
      bonusItems: [
        "HK$800 Apple Store禮品卡",
        "HK$800 惠康購物現金券",
        "LOJEL Alto 29吋超輕量拉鍊行李箱（價值HK$2,100; 顏色隨機）",
        "Marshall Emberton II 藍牙喇叭（價值HK$1,499; 顏色隨機）",
        "BRUNO BAK801 即熱式飲水機（價值HK$998; 顏色隨機）"
      ],
      validFrom: "2026-01-02",
      validTo: "2026-01-30",
      requirements: [
        "全新中銀信用卡客戶（現時並未持有或過去12個月內未曾持有/取消任何中銀信用卡主卡）",
        "2026年2月28日或之前成功獲批信用卡",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 0,
      minSpendDays: 0,
      notes: "⚠️ 先到先得，送完即止！換領流程由批核後起計需時至少16星期。申請前請關掉AdBlocker及「私人模式」。",
    }
  },
  {
    cardId: "boc-chill",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/boc-chill-card",
      bonusValue: 2100,
      bonusDescription: "獎品5選1：HK$800 Apple禮品卡 / HK$800 惠康現金券 / LOJEL行李箱(HK$2,100) / Marshall喇叭(HK$1,499) / BRUNO飲水機(HK$998)",
      bonusItems: [
        "HK$800 Apple Store禮品卡",
        "HK$800 惠康購物現金券",
        "LOJEL Alto 29吋超輕量拉鍊行李箱（價值HK$2,100; 顏色隨機）",
        "Marshall Emberton II 藍牙喇叭（價值HK$1,499; 顏色隨機）",
        "BRUNO BAK801 即熱式飲水機（價值HK$998; 顏色隨機）"
      ],
      validFrom: "2026-01-02",
      validTo: "2026-01-30",
      requirements: [
        "全新中銀信用卡客戶（現時並未持有或過去12個月內未曾持有/取消任何中銀信用卡主卡）",
        "2026年2月28日或之前成功獲批信用卡",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 0,
      minSpendDays: 0,
      notes: "⚠️ 先到先得，送完即止！適用於 Chill World Mastercard。換領流程由批核後起計需時至少16星期。申請前請關掉AdBlocker及「私人模式」。",
    }
  },
  {
    cardId: "boc-chill-platinum",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/boc-chill-card",
      bonusValue: 2100,
      bonusDescription: "獎品5選1：HK$800 Apple禮品卡 / HK$800 惠康現金券 / LOJEL行李箱(HK$2,100) / Marshall喇叭(HK$1,499) / BRUNO飲水機(HK$998)",
      bonusItems: [
        "HK$800 Apple Store禮品卡",
        "HK$800 惠康購物現金券",
        "LOJEL Alto 29吋超輕量拉鍊行李箱（價值HK$2,100; 顏色隨機）",
        "Marshall Emberton II 藍牙喇叭（價值HK$1,499; 顏色隨機）",
        "BRUNO BAK801 即熱式飲水機（價值HK$998; 顏色隨機）"
      ],
      validFrom: "2026-01-02",
      validTo: "2026-01-30",
      requirements: [
        "全新中銀信用卡客戶（現時並未持有或過去12個月內未曾持有/取消任何中銀信用卡主卡）",
        "2026年2月28日或之前成功獲批信用卡",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 0,
      minSpendDays: 0,
      notes: "⚠️ 先到先得，送完即止！適用於 Chill Platinum Mastercard。換領流程由批核後起計需時至少16星期。申請前請關掉AdBlocker及「私人模式」。",
    }
  },
  {
    cardId: "boc-go-platinum",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/boc-go-card",
      bonusValue: 2100,
      bonusDescription: "獎品5選1：HK$800 Apple禮品卡 / HK$800 惠康現金券 / LOJEL行李箱(HK$2,100) / Marshall喇叭(HK$1,499) / BRUNO飲水機(HK$998)",
      bonusItems: [
        "HK$800 Apple Store禮品卡",
        "HK$800 惠康購物現金券",
        "LOJEL Alto 29吋超輕量拉鍊行李箱（價值HK$2,100; 顏色隨機）",
        "Marshall Emberton II 藍牙喇叭（價值HK$1,499; 顏色隨機）",
        "BRUNO BAK801 即熱式飲水機（價值HK$998; 顏色隨機）"
      ],
      validFrom: "2026-01-02",
      validTo: "2026-01-30",
      requirements: [
        "全新中銀信用卡客戶（現時並未持有或過去12個月內未曾持有/取消任何中銀信用卡主卡）",
        "2026年2月28日或之前成功獲批信用卡",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 0,
      minSpendDays: 0,
      notes: "⚠️ 先到先得，送完即止！適用於中銀 Go 銀聯鑽石卡及中銀 Go 銀聯白金卡。換領流程由批核後起計需時至少16星期。申請前請關掉AdBlocker及「私人模式」。",
    }
  },
  {
    cardId: "boc-go-diamond",
    partnerOffer: {
      enabled: true,
      applyUrl: "https://www.moneyhero.com.hk/zh/credit-card/boc-go-card",
      bonusValue: 2100,
      bonusDescription: "獎品5選1：HK$800 Apple禮品卡 / HK$800 惠康現金券 / LOJEL行李箱(HK$2,100) / Marshall喇叭(HK$1,499) / BRUNO飲水機(HK$998)",
      bonusItems: [
        "HK$800 Apple Store禮品卡",
        "HK$800 惠康購物現金券",
        "LOJEL Alto 29吋超輕量拉鍊行李箱（價值HK$2,100; 顏色隨機）",
        "Marshall Emberton II 藍牙喇叭（價值HK$1,499; 顏色隨機）",
        "BRUNO BAK801 即熱式飲水機（價值HK$998; 顏色隨機）"
      ],
      validFrom: "2026-01-02",
      validTo: "2026-01-30",
      requirements: [
        "全新中銀信用卡客戶（現時並未持有或過去12個月內未曾持有/取消任何中銀信用卡主卡）",
        "2026年2月28日或之前成功獲批信用卡",
        "收到表格後7日內填妥「獎賞換領表格」"
      ],
      minSpend: 0,
      minSpendDays: 0,
      notes: "⚠️ 先到先得，送完即止！適用於中銀 Go 銀聯鑽石卡及中銀 Go 銀聯白金卡。換領流程由批核後起計需時至少16星期。申請前請關掉AdBlocker及「私人模式」。",
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
    lastUpdated: '2026-01-03',
    availableOffers: MONEYHERO_PARTNER_OFFERS.map(o => ({
      cardId: o.cardId,
      bonusValue: o.partnerOffer.bonusValue,
      description: o.partnerOffer.bonusDescription,
      validTo: o.partnerOffer.validTo,
      minSpend: o.partnerOffer.minSpend,
    }))
  });
}
