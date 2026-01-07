import { BankPromo } from "@/lib/types";

// 大新銀行「冬日狂賞」推廣
export const DAHSING_WINTER_PROMO: BankPromo = {
  id: "dahsing-winter-2025",
  name: "冬日狂賞",
  description: "登記後本地食肆享額外5%回贈，網上/旅遊/海外享額外3%回贈！",
  validFrom: "2025-12-08",
  validTo: "2026-02-28",
  maxReward: "$900 現金回贈",
  registrationUrl: "https://www.dahsing.com/pws/promo-reg-ccard/?lang=zh-HK&camp_code=PDM25629",
  termsUrl: "https://www.dahsing.com/html/tc/credit_card/promotions/winter_spending_madness.html",
  
  phases: [
    {
      name: "階段1",
      startDate: "2025-12-08",
      endDate: "2025-12-31",
      tiers: [
        { 
          minSpend: 6000, 
          reward: "本地食肆 5% / 網上旅遊海外 3%", 
          rewardValue: 300, // 每階段上限
        },
      ]
    },
    {
      name: "階段2",
      startDate: "2026-01-01",
      endDate: "2026-01-31",
      tiers: [
        { 
          minSpend: 6000, 
          reward: "本地食肆 5% / 網上旅遊海外 3%", 
          rewardValue: 300,
        },
      ]
    },
    {
      name: "階段3",
      startDate: "2026-02-01",
      endDate: "2026-02-28",
      tiers: [
        { 
          minSpend: 6000, 
          reward: "本地食肆 5% / 網上旅遊海外 3%", 
          rewardValue: 300,
        },
      ]
    }
  ],
  
  requirements: [
    "須透過大新手機 App 或指定網頁登記",
    "名額只限首 8,000 名，先到先得",
    "每階段累積簽賬滿 $6,000（單一簽賬需滿 $300）",
    "登記後才開始計算，越早登記享越多階段",
  ],
  
  exclusions: [
    "AlipayHK、WeChat Pay HK、PayMe 簽賬",
    "八達通自動增值",
    "網上繳費、交稅",
    "分期付款",
    "單一簽賬低於 $300",
    "酒席宴會、私人宴會",
    "美食廣場/超市/百貨公司內食肆",
    "大新 Visa Infinite 卡"
  ],
  
  notes: "本地食肆簽 $6,000 即爆上限 $300（5%）；網上/旅遊/海外簽 $10,000 即爆上限 $300（3%）。配合 ONE+ 本身 1% 回贈，可達 6%/4%！回贈於 2026年6月入賬。"
};

// 恒生銀行「冬日簽賬賞」推廣
export const HANGSENG_WINTER_PROMO: BankPromo = {
  id: "hangseng-winter-2025",
  name: "冬日簽賬賞",
  description: "累積簽賬賺額外 +FUN Dollars / yuu積分，Visa卡享額外獎賞！",
  validFrom: "2025-12-01",
  validTo: "2026-02-28",
  visaExtraReward: true,
  maxReward: "$2,800 +FUN Dollars",
  // enJoy 卡專用 yuu 版本（$1 = 200 yuu）
  maxRewardYuu: "560,000 yuu積分",
  registrationUrl: "https://cms.hangseng.com/cms/emkt/pmo/grp05/p52/chi/index.html",
  termsUrl: "https://cms.hangseng.com/cms/emkt/pmo/grp05/p52/chi/index.html",
  
  phases: [
    {
      name: "階段1",
      startDate: "2025-12-01",
      endDate: "2026-01-14",
      tiers: [
        { 
          minSpend: 8000, 
          reward: "$150 +FUN Dollars", 
          rewardYuu: "30,000 yuu積分",
          rewardValue: 150,
          extraReward: "$100",
          extraRewardValue: 100
        },
        { 
          minSpend: 15000, 
          reward: "$500 +FUN Dollars", 
          rewardYuu: "100,000 yuu積分",
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
          rewardYuu: "30,000 yuu積分",
          rewardValue: 150,
          extraReward: "$100",
          extraRewardValue: 100
        },
        { 
          minSpend: 15000, 
          reward: "$500 +FUN Dollars", 
          rewardYuu: "100,000 yuu積分",
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
      rewardYuu: "獎賞二：20,000 yuu (需達獎賞一+網上/外幣簽$5,000)",
      rewardValue: 100,
      extraReward: "$100",
      extraRewardValue: 100
    },
    {
      minSpend: 60000, // 全期累積
      reward: "獎賞三：$600 (全期簽$60,000)",
      rewardYuu: "獎賞三：120,000 yuu (全期簽$60,000)",
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

// HSBC「最紅冬日賞」百老滙推廣
export const HSBC_BROADWAY_WINTER_PROMO: BankPromo = {
  id: "hsbc-broadway-winter-2025",
  name: "最紅冬日賞百老滙",
  description: "百老滙累積簽賬滿 $10,000 享 6% 獎賞錢回贈！",
  validFrom: "2025-12-01",
  validTo: "2026-02-28",
  maxReward: "$900 獎賞錢",
  // 暫無確認的登記連結，只顯示「需登記」
  
  phases: [
    {
      name: "推廣期",
      startDate: "2025-12-01",
      endDate: "2026-02-28",
      tiers: [
        { 
          minSpend: 10000, 
          reward: "6% 獎賞錢回贈", 
          rewardValue: 600,
        },
      ]
    }
  ],
  
  requirements: [
    "須透過最紅優惠網站登記",
    "累積百老滙簽賬滿 $10,000",
    "單一簽賬需滿 $500",
    "回贈上限 $900 獎賞錢",
  ],
  
  exclusions: [
    "百老滙網店簽賬",
    "購買禮品卡/現金券",
    "分期付款",
  ],
  
  notes: "配合 HSBC Red 網上 4% 回贈，可達 10% 總回贈！獎賞錢將於 2026 年 5 月存入。"
};

// HSBC「最紅冬日賞」萬寧推廣
export const HSBC_MANNINGS_WINTER_PROMO: BankPromo = {
  id: "hsbc-mannings-winter-2025",
  name: "最紅冬日賞萬寧",
  description: "週末萬寧簽賬享高達 10% 獎賞錢回贈！",
  validFrom: "2025-12-01",
  validTo: "2026-02-28",
  maxReward: "$300 獎賞錢",
  // 暫無確認的登記連結，只顯示「需登記」
  
  phases: [
    {
      name: "推廣期",
      startDate: "2025-12-01",
      endDate: "2026-02-28",
      tiers: [
        { 
          minSpend: 0, 
          reward: "週末 10% 獎賞錢回贈", 
          rewardValue: 100, // 每月上限
        },
      ]
    }
  ],
  
  requirements: [
    "須透過最紅優惠網站登記",
    "只限星期六、日及公眾假期",
    "每月回贈上限 $100 獎賞錢",
  ],
  
  exclusions: [
    "萬寧網店簽賬",
    "購買禮品卡/現金券",
  ],
  
  notes: "週末萬寧購物首選！獎賞錢將於簽賬誌賬後 60 日內存入。"
};

// 導出所有銀行推廣
export const BANK_PROMOS: Record<string, BankPromo> = {
  "hangseng-winter-2025": HANGSENG_WINTER_PROMO,
  "dahsing-winter-2025": DAHSING_WINTER_PROMO,
  "hsbc-broadway-winter-2025": HSBC_BROADWAY_WINTER_PROMO,
  "hsbc-mannings-winter-2025": HSBC_MANNINGS_WINTER_PROMO,
};

// 根據銀行獲取適用的推廣
export function getPromosForBank(bank: string): BankPromo[] {
  const bankLower = bank.toLowerCase();
  if (bankLower.includes("hang seng") || bankLower.includes("恒生")) {
    return [HANGSENG_WINTER_PROMO];
  }
  if (bankLower.includes("dah sing") || bankLower.includes("大新")) {
    return [DAHSING_WINTER_PROMO];
  }
  if (bankLower.includes("hsbc") || bankLower.includes("滙豐")) {
    return [HSBC_BROADWAY_WINTER_PROMO, HSBC_MANNINGS_WINTER_PROMO];
  }
  return [];
}

