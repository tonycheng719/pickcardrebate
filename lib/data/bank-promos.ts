import { BankPromo } from "@/lib/types";

// 恒生銀行「冬日簽賬賞」推廣
export const HANGSENG_WINTER_PROMO: BankPromo = {
  id: "hangseng-winter-2025",
  name: "冬日簽賬賞",
  description: "累積簽賬賺額外 +FUN Dollars / yuu積分，Visa卡享額外獎賞！",
  validFrom: "2025-12-01",
  validTo: "2026-02-28",
  visaExtraReward: true,
  maxReward: "$2,800 +FUN Dollars",
  registrationUrl: "https://www.hangseng.com/zh-hk/personal/cards/promotions/winter-spending-rewards/",
  termsUrl: "https://www.hangseng.com/zh-hk/personal/cards/promotions/winter-spending-rewards/",
  
  phases: [
    {
      name: "階段1",
      startDate: "2025-12-01",
      endDate: "2026-01-14",
      tiers: [
        { 
          minSpend: 8000, 
          reward: "$150 +FUN Dollars", 
          rewardValue: 150,
          extraReward: "$100",
          extraRewardValue: 100
        },
        { 
          minSpend: 15000, 
          reward: "$500 +FUN Dollars", 
          rewardValue: 500,
          extraReward: "$200",
          extraRewardValue: 200
        },
      ]
    },
    {
      name: "階段2",
      startDate: "2026-01-15",
      endDate: "2026-02-28",
      tiers: [
        { 
          minSpend: 8000, 
          reward: "$150 +FUN Dollars", 
          rewardValue: 150,
          extraReward: "$100",
          extraRewardValue: 100
        },
        { 
          minSpend: 15000, 
          reward: "$500 +FUN Dollars", 
          rewardValue: 500,
          extraReward: "$200",
          extraRewardValue: 200
        },
      ]
    }
  ],
  
  bonusTiers: [
    {
      minSpend: 5000, // 網上/外幣簽賬
      reward: "獎賞二：$100 (需達獎賞一+網上/外幣簽$5,000)",
      rewardValue: 100,
      extraReward: "$100",
      extraRewardValue: 100
    },
    {
      minSpend: 60000, // 全期累積
      reward: "獎賞三：$600 (全期簽$60,000)",
      rewardValue: 600,
      extraReward: "$400",
      extraRewardValue: 400
    }
  ],
  
  requirements: [
    "須以合資格信用卡主卡透過網上登記",
    "登記後方可享有優惠",
    "每位客戶只需登記一次",
    "合資格簽賬須於推廣期內完成",
    "簽賬須於2026年3月15日前誌賬"
  ],
  
  exclusions: [
    "網上繳費（水費、電費、保險費等）",
    "交稅",
    "所有保險公司簽賬",
    "Alipay及WeChat Pay簽賬",
    "電話/傳真訂購",
    "購買禮券",
    "分期付款、結餘轉戶",
    "八達通自動增值",
    "易通行增值（Autotoll）",
    "購買/充值儲值卡",
    "電子錢包簽賬",
    "金融機構交易（外滙、滙票等）"
  ],
  
  notes: "獎賞將於2026年5月底前存入。enJoy卡客戶會賺取yuu積分（$150 = 30,000 yuu積分）。如同時登記「豐澤購物激賞」，12月豐澤簽賬不計入本推廣。"
};

// 導出所有銀行推廣
export const BANK_PROMOS: Record<string, BankPromo> = {
  "hangseng-winter-2025": HANGSENG_WINTER_PROMO,
};

// 根據銀行獲取適用的推廣
export function getPromosForBank(bank: string): BankPromo[] {
  const bankLower = bank.toLowerCase();
  if (bankLower.includes("hang seng") || bankLower.includes("恒生")) {
    return [HANGSENG_WINTER_PROMO];
  }
  return [];
}

