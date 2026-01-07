/**
 * 信用卡條款摘要系統
 * 
 * 用途：儲存各信用卡的官方條款摘要，方便日後更新和參考
 * 
 * 更新指引：
 * 1. 每次收到新條款時，更新對應卡片的 CardTerms
 * 2. 記錄更新日期和來源
 * 3. 標記重要條款變動
 */

export interface CardTerms {
  cardId: string;
  cardName: string;
  bank: string;
  
  // 推廣期
  promoStartDate?: string;
  promoEndDate?: string;
  
  // 回贈上限
  rewardCap?: {
    type: "total" | "extra";  // total = 總回贈, extra = 額外回贈
    amount: number;
    period: "monthly" | "quarterly" | "semi-annual" | "annual" | "promo";
    note?: string;
  };
  
  // 簽賬上限（計算得出）
  spendingCap?: {
    amount: number;
    period: "monthly" | "quarterly" | "semi-annual" | "annual" | "promo";
    calculation?: string;  // 計算方式
  };
  
  // 簽賬門檻
  minSpend?: {
    amount: number;
    period: "monthly" | "quarterly" | "semi-annual" | "annual";
    type?: "total" | "physical" | "category";  // 總簽賬 / 實體店 / 指定類別
    note?: string;
  };
  
  // 回贈率
  rewardRates?: {
    category: string;
    totalRate: number;
    baseRate: number;
    extraRate: number;
    note?: string;
  }[];
  
  // 不計回贈
  exclusions?: string[];
  
  // 重要提示
  warnings?: string[];
  
  // 官方來源
  officialSource?: string;
  
  // 更新日期
  lastUpdated: string;
}

// ========================================================================
// 條款摘要資料
// ========================================================================

export const cardTerms: CardTerms[] = [
  // ========================================================================
  // 中銀 Chill World Mastercard
  // ========================================================================
  {
    cardId: "boc-chill",
    cardName: "BOC Chill World Mastercard",
    bank: "BOC",
    promoStartDate: "2025-01-01",
    promoEndDate: "2026-06-30",
    rewardCap: {
      type: "extra",  // 條款寫「額外回贈上限」
      amount: 150,
      period: "monthly",
      note: "Chill商戶 + 網上/海外 共用上限"
    },
    minSpend: {
      amount: 1500,
      period: "monthly",
      type: "physical",  // 實體店簽賬
      note: "Chill 商戶 10% 需月簽實體店 $1,500；網上/海外 5% 無門檻"
    },
    rewardRates: [
      { category: "Chill 商戶", totalRate: 10.0, baseRate: 0.4, extraRate: 9.6, note: "需月簽實體店$1,500" },
      { category: "網上簽賬", totalRate: 5.0, baseRate: 0.4, extraRate: 4.6, note: "無門檻" },
      { category: "海外簽賬", totalRate: 5.0, baseRate: 0.4, extraRate: 4.6, note: "無門檻" },
      { category: "八達通自動增值", totalRate: 0.4, baseRate: 0.4, extraRate: 0 },
      { category: "其他簽賬", totalRate: 0.4, baseRate: 0.4, extraRate: 0 },
    ],
    exclusions: [
      "BoC Pay+",
      "AlipayHK",
      "WeChat Pay HK",
      "八達通增值（額外回贈）",
      "網上繳費",
      "公共事務費用",
      "保險",
      "P2P 轉賬",
    ],
    warnings: [
      "CBF 手續費 0.95%（海外網站簽港幣）",
      "外幣手續費 1.95%",
    ],
    officialSource: "https://www.bochk.com/s/a/chill",
    lastUpdated: "2026-01-07",
  },

  // ========================================================================
  // 恒生 MMPOWER World Mastercard
  // ========================================================================
  {
    cardId: "hangseng-mmpower",
    cardName: "Hang Seng MMPOWER World Mastercard",
    bank: "Hang Seng",
    promoStartDate: "2024-07-01",
    promoEndDate: "2026-03-31",
    rewardCap: {
      type: "total",  // 條款寫「每月合共最高 500 +FUN Dollars」
      amount: 500,
      period: "monthly",
      note: "海外/網上/自選 三個類別共用上限"
    },
    minSpend: {
      amount: 5000,
      period: "monthly",
      type: "total",
      note: "需月簽滿 $5,000 並登記才享優惠"
    },
    rewardRates: [
      { category: "海外外幣", totalRate: 6.0, baseRate: 0.4, extraRate: 5.6 },
      { category: "網上簽賬", totalRate: 5.0, baseRate: 0.4, extraRate: 4.6 },
      { category: "自選類別", totalRate: 1.0, baseRate: 0.4, extraRate: 0.6, note: "餐飲/電子/娛樂，最多選2個" },
      { category: "八達通自動增值", totalRate: 0.4, baseRate: 0.4, extraRate: 0 },
      { category: "其他簽賬", totalRate: 0.4, baseRate: 0.4, extraRate: 0 },
    ],
    exclusions: [
      "快餐店",
      "酒店/百貨公司/俱樂部內食肆",
      "Alipay/WeChat Pay/PayMe",
      "網上繳費（水電費、保險等）",
      "交稅",
      "保險公司簽賬",
    ],
    warnings: [
      "餐飲不包括快餐店",
      "需於 hangseng.com/mpower 登記",
    ],
    officialSource: "https://www.hangseng.com/mpower",
    lastUpdated: "2026-01-07",
  },

  // ========================================================================
  // 信銀 Motion 信用卡
  // ========================================================================
  {
    cardId: "cncbi-motion",
    cardName: "信銀國際 Motion 信用卡",
    bank: "信銀國際",
    promoStartDate: "2026-01-01",
    promoEndDate: "2026-06-30",
    rewardCap: {
      type: "extra",  // 條款寫「額外回贈上限 $200」
      amount: 200,
      period: "monthly",
      note: "食肆 + 網上 共用上限"
    },
    spendingCap: {
      amount: 3670,  // $200 ÷ 5.45% = $3,670
      period: "monthly",
      calculation: "$200 ÷ 5.45% = $3,670"
    },
    minSpend: {
      amount: 3800,
      period: "monthly",
      type: "total",
      note: "⚠️ 簽賬門檻 $3,800 > 簽賬上限 $3,670！需簽超過上限才有 6%"
    },
    rewardRates: [
      { category: "食肆", totalRate: 6.0, baseRate: 0.55, extraRate: 5.45 },
      { category: "網上簽賬", totalRate: 6.0, baseRate: 0.55, extraRate: 5.45 },
      { category: "其他簽賬", totalRate: 0.55, baseRate: 0.55, extraRate: 0 },
    ],
    exclusions: [
      "酒店餐飲",
      "美食廣場/超市/百貨公司內食肆",
      "麵包房、糕點商店",
      "超級市場網上平台",
      "電子錢包（支付寶/微信支付/PayMe/轉數快）",
      "八達通增值",
    ],
    warnings: [
      "⚠️ 簽賬門檻 $3,800 高過簽賬上限 $3,670！",
      "即係要簽 $3,800 先有 6%，但額外回贈上限喺 $3,670 已經爆 Cap",
      "最後 $130 只有 0.55% 基本回贈",
    ],
    officialSource: "https://www.cncbinternational.com/motion",
    lastUpdated: "2026-01-07",
  },

  // ========================================================================
  // sim Credit Card 基本版
  // ========================================================================
  {
    cardId: "sim-credit-card",
    cardName: "sim Credit Card",
    bank: "亞洲聯合財務",
    promoStartDate: "2025-11-01",
    promoEndDate: "2026-01-31",
    rewardCap: {
      type: "total",  // 條款寫「每月合共現金回贈上限 HKD200」
      amount: 200,
      period: "monthly",
      note: "整個優惠期上限 $600（3個月）"
    },
    spendingCap: {
      amount: 2500,  // $200 ÷ 8% = $2,500
      period: "monthly",
      calculation: "$200 ÷ 8% = $2,500"
    },
    minSpend: {
      amount: 1000,
      period: "monthly",
      type: "physical",  // 非網上簽賬
      note: "需月簽非網上 $1,000；網購需單筆滿 $500"
    },
    rewardRates: [
      { category: "網購", totalRate: 8.0, baseRate: 0.4, extraRate: 7.6, note: "需月簽非網上$1,000 + 單筆$500" },
      { category: "指定交通", totalRate: 8.0, baseRate: 0.4, extraRate: 7.6, note: "港鐵拍卡/城巴/九巴/龍運/電車/天星小輪" },
      { category: "指定商戶", totalRate: 3.0, baseRate: 0.4, extraRate: 2.6, note: "Adidas/@cosme STORE/Fila/PUMA/松本清/東京生活館" },
      { category: "其他簽賬", totalRate: 0.4, baseRate: 0.4, extraRate: 0 },
    ],
    exclusions: [
      "電子錢包（支付寶/微信支付/PayMe）",
      "八達通增值",
      "繳費",
      "保險",
      "政府部門",
    ],
    warnings: [
      "CBF 手續費 1.95%",
      "整個優惠期上限 $600（3個月）",
    ],
    officialSource: "https://www.uafl.com.hk/tc/sim-credit-card/",
    lastUpdated: "2026-01-07",
  },

  // ========================================================================
  // sim World Mastercard 高級版
  // ========================================================================
  {
    cardId: "sim-world-mastercard",
    cardName: "sim World Mastercard",
    bank: "亞洲聯合財務",
    promoStartDate: "2025-11-01",
    promoEndDate: "2026-01-31",
    rewardCap: {
      type: "total",  // 條款寫「每月合共現金回贈上限 HKD200」
      amount: 200,
      period: "monthly",
      note: "整個優惠期上限 $600（3個月）"
    },
    spendingCap: {
      amount: 2500,  // $200 ÷ 8% = $2,500
      period: "monthly",
      calculation: "$200 ÷ 8% = $2,500"
    },
    minSpend: {
      amount: 1000,
      period: "monthly",
      type: "physical",  // 非網上簽賬
      note: "需月簽非網上 $1,000；網購需單筆滿 $500"
    },
    rewardRates: [
      { category: "網購", totalRate: 8.0, baseRate: 0.4, extraRate: 7.6, note: "需月簽非網上$1,000 + 單筆$500" },
      { category: "海外實體店", totalRate: 8.0, baseRate: 0.4, extraRate: 7.6, note: "外幣簽賬" },
      { category: "指定商戶", totalRate: 3.0, baseRate: 0.4, extraRate: 2.6, note: "Adidas/@cosme STORE/Fila/PUMA/松本清/東京生活館" },
      { category: "其他簽賬", totalRate: 0.4, baseRate: 0.4, extraRate: 0 },
    ],
    exclusions: [
      "電子錢包（支付寶/微信支付/PayMe）",
      "八達通增值",
      "繳費",
      "保險",
      "政府部門",
    ],
    warnings: [
      "CBF 手續費 1.95%",
      "外幣手續費 1.95%",
      "整個優惠期上限 $600（3個月）",
    ],
    officialSource: "https://www.uafl.com.hk/tc/sim-world-mastercard/",
    lastUpdated: "2026-01-07",
  },

  // ========================================================================
  // AEON WAKUWAKU
  // ========================================================================
  {
    cardId: "aeon-wakuwaku",
    cardName: "AEON CARD WAKUWAKU",
    bank: "AEON",
    rewardCap: {
      type: "extra",  // 條款寫「額外獎賞每月上限 $200」
      amount: 200,
      period: "monthly",
      note: "網上/日本/餐飲 共用上限"
    },
    rewardRates: [
      { category: "網上簽賬", totalRate: 6.0, baseRate: 0.4, extraRate: 5.6 },
      { category: "日本簽賬", totalRate: 3.0, baseRate: 0.4, extraRate: 2.6, note: "只限日元簽賬" },
      { category: "本地餐飲", totalRate: 1.0, baseRate: 0.4, extraRate: 0.6 },
      { category: "其他簽賬", totalRate: 0.4, baseRate: 0.4, extraRate: 0 },
    ],
    exclusions: [
      "電子錢包（AlipayHK/PayMe/WeChat Pay）",
      "八達通增值",
      "保險繳費",
    ],
    officialSource: "https://www.aeon.com.hk/tc/credit-card/aeon-card-wakuwaku/",
    lastUpdated: "2026-01-07",
  },

  // ========================================================================
  // 建行 TRAVO Mastercard
  // ========================================================================
  {
    cardId: "ccb-travo",
    cardName: "建行(亞洲) TRAVO Mastercard",
    bank: "建行(亞洲)",
    promoStartDate: "2026-01-01",
    promoEndDate: "2026-06-30",
    spendingCap: {
      amount: 25000,
      period: "semi-annual",  // 每半年
      calculation: "海外簽賬每半年上限 $25,000"
    },
    rewardRates: [
      { category: "海外迪士尼/環球影城", totalRate: 15.0, baseRate: 0.4, extraRate: 14.6, note: "每半年上限 $1,000" },
      { category: "海外簽賬", totalRate: 4.0, baseRate: 0.4, extraRate: 3.6, note: "每半年上限 $25,000" },
      { category: "本地餐飲", totalRate: 2.0, baseRate: 0.4, extraRate: 1.6, note: "每半年上限 $12,500" },
      { category: "八達通自動增值", totalRate: 0.4, baseRate: 0.4, extraRate: 0 },
      { category: "其他簽賬", totalRate: 0.4, baseRate: 0.4, extraRate: 0 },
    ],
    exclusions: [
      "電子錢包增值/轉賬（微信/支付寶/PayMe）",
      "保險",
      "稅項",
      "賭博",
      "餐飲：酒席宴會、酒店/百貨公司/俱樂部內食肆",
    ],
    warnings: [
      "需登記 TRAVO Rewards",
      "外幣手續費 1.95%，海外淨回贈約 2.05%",
      "積分有效期最長 2 年",
    ],
    officialSource: "https://www.asia.ccb.com/hongkong/personal/credit-cards/travo-mastercard.html",
    lastUpdated: "2026-01-07",
  },
];

// ========================================================================
// 輔助函數
// ========================================================================

/**
 * 根據卡片 ID 查找條款摘要
 */
export function getCardTerms(cardId: string): CardTerms | undefined {
  return cardTerms.find(t => t.cardId === cardId);
}

/**
 * 檢查是否有「簽賬門檻高過上限」的問題
 */
export function hasMinSpendIssue(terms: CardTerms): boolean {
  if (!terms.minSpend || !terms.spendingCap) return false;
  return terms.minSpend.amount > terms.spendingCap.amount;
}

/**
 * 計算簽賬上限（根據回贈上限和回贈率）
 * @param rewardCap 回贈上限
 * @param rate 回贈率（%）
 * @param isExtraRate 是否為額外回贈率（true = 用額外回贈率計算）
 */
export function calculateSpendingCap(
  rewardCap: number,
  rate: number,
  isExtraRate: boolean = false
): number {
  return Math.round(rewardCap / (rate / 100));
}

/**
 * 格式化期限
 */
export function formatPeriod(period: string): string {
  switch (period) {
    case "monthly": return "月";
    case "quarterly": return "季";
    case "semi-annual": return "半年";
    case "annual": return "年";
    case "promo": return "推廣期";
    default: return period;
  }
}

/**
 * 檢查條款是否已過期
 * @param terms 條款資料
 * @param daysAfterExpiry 過期後多少天才算需要清理（預設 15 天）
 */
export function isTermsExpired(terms: CardTerms, daysAfterExpiry: number = 15): boolean {
  if (!terms.promoEndDate) return false;
  
  const endDate = new Date(terms.promoEndDate);
  const expiryDate = new Date(endDate);
  expiryDate.setDate(expiryDate.getDate() + daysAfterExpiry);
  
  return new Date() > expiryDate;
}

/**
 * 獲取所有有效（未過期）的條款
 * @param daysAfterExpiry 過期後多少天才算需要清理（預設 15 天）
 */
export function getActiveTerms(daysAfterExpiry: number = 15): CardTerms[] {
  return cardTerms.filter(t => !isTermsExpired(t, daysAfterExpiry));
}

/**
 * 獲取所有已過期需要清理的條款
 * @param daysAfterExpiry 過期後多少天才算需要清理（預設 15 天）
 */
export function getExpiredTerms(daysAfterExpiry: number = 15): CardTerms[] {
  return cardTerms.filter(t => isTermsExpired(t, daysAfterExpiry));
}

/**
 * 檢查條款是否快將過期（7 天內）
 */
export function isTermsExpiringSoon(terms: CardTerms, daysBeforeExpiry: number = 7): boolean {
  if (!terms.promoEndDate) return false;
  
  const endDate = new Date(terms.promoEndDate);
  const warningDate = new Date();
  warningDate.setDate(warningDate.getDate() + daysBeforeExpiry);
  
  return endDate <= warningDate && endDate >= new Date();
}

/**
 * 獲取所有快將過期的條款
 */
export function getExpiringSoonTerms(daysBeforeExpiry: number = 7): CardTerms[] {
  return cardTerms.filter(t => isTermsExpiringSoon(t, daysBeforeExpiry));
}

/**
 * 格式化簽賬門檻提示
 * 用於在卡片顯示醒目的簽賬門檻警告
 */
export function formatMinSpendWarning(terms: CardTerms): string | null {
  if (!terms.minSpend) return null;
  
  const period = formatPeriod(terms.minSpend.period);
  const amount = terms.minSpend.amount.toLocaleString();
  
  // 檢查是否門檻高過上限
  if (hasMinSpendIssue(terms)) {
    const capAmount = terms.spendingCap?.amount.toLocaleString();
    return `🚨 簽賬門檻 $${amount}/${period} > 簽賬上限 $${capAmount}/${period}！需簽超過上限先有高回贈`;
  }
  
  // 一般簽賬門檻提示
  return `⚠️ 需月簽滿 $${amount} 先有高回贈`;
}

