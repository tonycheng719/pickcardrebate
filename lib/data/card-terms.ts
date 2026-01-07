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
  
  // 條款文件
  documentName?: string;  // 條款名稱（無則從 officialSource URL 提取）
  
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
    period: "monthly" | "quarterly" | "semi-annual" | "annual" | "promo";  // promo = 推廣期內一次性
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
  // HSBC Visa Signature - 2026 最紅自主獎賞
  // ========================================================================
  {
    cardId: "hsbc-vs-red-hot",
    cardName: "HSBC Visa Signature（最紅自主獎賞）",
    bank: "HSBC",
    documentName: "2026「最紅自主獎賞」使用條款及細則",
    promoStartDate: "2026-01-01",
    promoEndDate: "2026-12-31",
    rewardCap: {
      type: "total",
      amount: 3600,  // $100,000 × 3.6%
      period: "annual",
      note: "五大類別共用上限（賞滋味/賞購物/賞家居/賞享受/賞世界），需自選一類享 9X"
    },
    spendingCap: {
      amount: 100000,
      period: "annual",
      calculation: "每年首 $100,000 簽賬享額外獎賞"
    },
    rewardRates: [
      { category: "自選類別 9X", totalRate: 3.6, baseRate: 0.4, extraRate: 3.2, note: "1X基本 + 3X VS專享 + 5X額外（五選一）" },
      { category: "非自選類別 4X", totalRate: 1.6, baseRate: 0.4, extraRate: 1.2, note: "1X基本 + 3X VS專享" },
      { category: "八達通自動增值", totalRate: 0.4, baseRate: 0.4, extraRate: 0 },
      { category: "其他簽賬", totalRate: 0.4, baseRate: 0.4, extraRate: 0 },
    ],
    exclusions: [
      "賞滋味：酒席宴會、私人宴會、包場派對、酒店/百貨公司/俱樂部內飲食專櫃",
      "賞世界：香港進行或以港幣交易的簽賬",
      "電子錢包（AlipayHK/WeChat Pay/PayMe）",
      "八達通自動增值（只有 0.4%）",
      "繳費、繳稅",
    ],
    warnings: [
      "五大類別共用 $100,000/年簽賬上限，只能選一類享 9X",
      "需於 Reward+ App 登記選擇自選類別",
      "海外簽賬手續費 1.95%",
      "海外商戶簽港幣（CBF）手續費 1%",
    ],
    officialSource: "https://www.hsbc.com.hk/content/dam/hsbc/hk/tc/docs/credit-cards/rewards/2026-red-hot-rewards-of-your-choice-terms-and-conditions.pdf",
    lastUpdated: "2026-01-08",
  },

  // ========================================================================
  // HSBC Visa Signature 卡特別獎賞推廣（額外 3X）
  // ========================================================================
  {
    cardId: "hsbc-vs-special",
    cardName: "HSBC Visa Signature（特別獎賞）",
    bank: "HSBC",
    documentName: "滙豐Visa Signature卡特別獎賞推廣條款及細則",
    promoStartDate: "2026-01-01",
    promoEndDate: "2026-12-31",
    rewardCap: {
      type: "extra",  // 額外 3X 獎賞錢
      amount: 1200,   // $100,000 × 1.2%
      period: "annual",
      note: "首 $100,000 合資格簽賬享額外 3X（1.2%）"
    },
    spendingCap: {
      amount: 100000,
      period: "annual",
      calculation: "每年首 $100,000 簽賬享額外 3X"
    },
    rewardRates: [
      { category: "賞滋味（餐飲）", totalRate: 1.2, baseRate: 0, extraRate: 1.2, note: "額外 3X，不包括酒店/百貨/俱樂部內食肆" },
      { category: "賞購物（指定商戶）", totalRate: 1.2, baseRate: 0, extraRate: 1.2, note: "額外 3X，參閱 hsbc.com.hk/rewards" },
      { category: "賞家居（指定商戶）", totalRate: 1.2, baseRate: 0, extraRate: 1.2, note: "額外 3X，參閱 hsbc.com.hk/rewards" },
      { category: "賞享受（指定商戶）", totalRate: 1.2, baseRate: 0, extraRate: 1.2, note: "額外 3X，參閱 hsbc.com.hk/rewards" },
      { category: "賞世界（海外/內地/澳門）", totalRate: 1.2, baseRate: 0, extraRate: 1.2, note: "額外 3X，香港/港幣簽賬除外" },
    ],
    exclusions: [
      "財務及銀行費用（年費、財務費用、逾期費用）",
      "透過滙豐流動理財及/或網上理財繳費",
      "購買及/或充值儲值卡的交易",
      "以電子錢包所作的交易（包括增值電子錢包）",
      "現金貸款、現金套現、簽賬分期計劃",
      "於非金融機構的交易（包括購買外匯、匯票及旅行支票）",
      "於金融機構的交易（包括購買銀行產品及服務）",
      "電匯",
      "賭博交易",
      "繳稅",
      "所有未誌賬/取消/退款的交易",
      "賞滋味：酒席宴會、私人宴會、包場派對、酒店/百貨公司/俱樂部內飲食專櫃",
      "賞購物/賞家居/賞享受：百貨公司專櫃及特賣場",
      "賞世界：香港進行或以港幣交易的簽賬",
    ],
    warnings: [
      "此為 VS 卡專享額外 3X，與最紅自主獎賞 5X 分開計算",
      "VS 卡總計：1X基本 + 3X特別獎賞 + 5X最紅自主獎賞 = 9X (3.6%)",
      "首 $100,000 簽賬上限（同一持卡人所有卡合併計算）",
      "外幣簽賬會兌換至港幣計算",
    ],
    officialSource: "https://www.hsbc.com.hk/content/dam/hsbc/hk/docs/credit-cards/visa-signature/special-reward-tnc.pdf",
    lastUpdated: "2026-01-08",
  },
  
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
  // 安信 WeWa Visa Signature
  // ========================================================================
  {
    cardId: "wewa-visa-signature",
    cardName: "WeWa Visa Signature 卡",
    bank: "安信",
    promoStartDate: "2025-07-01",
    promoEndDate: "2026-06-30",
    rewardCap: {
      type: "extra",  // 額外回贈上限
      amount: 200,
      period: "monthly",
      note: "玩樂類別 4 選 1 共用上限"
    },
    spendingCap: {
      // hkcashrebate 說是 $25,000，但 $200 ÷ 4% = $5,000
      // $25,000 可能是「合資格簽賬上限」（包括基本 0.4%）
      // 實際能獲 4% 回贈的簽賬上限是 $5,000
      amount: 5000,  
      period: "monthly",
      calculation: "$200 ÷ 4% = $5,000"
    },
    minSpend: {
      amount: 1500,
      period: "monthly",
      type: "total",
      note: "需月簽滿 $1,500 先有 4% 回贈"
    },
    rewardRates: [
      { category: "手機支付", totalRate: 4.0, baseRate: 0.4, extraRate: 3.6, note: "Apple Pay（僅 iOS）" },
      { category: "旅遊", totalRate: 4.0, baseRate: 0.4, extraRate: 3.6, note: "航空公司/酒店/旅行社" },
      { category: "海外", totalRate: 4.0, baseRate: 0.4, extraRate: 3.6, note: "淨約 2.05%（扣手續費）" },
      { category: "線上娛樂", totalRate: 4.0, baseRate: 0.4, extraRate: 3.6, note: "Netflix/Spotify/Steam 等" },
      { category: "八達通自動增值", totalRate: 0.4, baseRate: 0.4, extraRate: 0 },
      { category: "其他簽賬", totalRate: 0.4, baseRate: 0.4, extraRate: 0 },
    ],
    exclusions: [
      "電子錢包充值/轉賬",
      "分期付款",
      "賭場",
      "繳費",
    ],
    warnings: [
      "手機支付僅支援 iOS 使用 Apple Pay，Android 不支援",
      "Visa 外幣手續費約 1.95%",
    ],
    officialSource: "https://www.primecredit.com/tc/credit-card/wewa/",
    lastUpdated: "2026-01-08",
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
  // 東亞 World Mastercard
  // ========================================================================
  {
    cardId: "bea-world-mastercard",
    cardName: "東亞 World Mastercard",
    bank: "東亞銀行",
    promoStartDate: "2025-07-01",
    promoEndDate: "2026-06-30",
    spendingCap: {
      amount: 10000,
      period: "monthly",
      calculation: "指定類別每月上限簽 $10,000（回 115,000 額外獎分）"
    },
    minSpend: {
      amount: 4000,
      period: "monthly",
      type: "total",
      note: "需月簽滿 $4,000 + BEA Mall App 登記"
    },
    rewardRates: [
      { category: "外幣簽賬", totalRate: 5.0, baseRate: 0.33, extraRate: 4.67, note: "歐洲實體簽賬除外" },
      { category: "本地食肆", totalRate: 5.0, baseRate: 0.33, extraRate: 4.67 },
      { category: "本地電子產品", totalRate: 5.0, baseRate: 0.33, extraRate: 4.67 },
      { category: "運動/健身/醫療", totalRate: 5.0, baseRate: 0.33, extraRate: 4.67 },
      { category: "八達通自動增值", totalRate: 0.33, baseRate: 0.33, extraRate: 0, note: "連同政府簽賬每月上限 $40 回贈" },
      { category: "其他簽賬", totalRate: 0.33, baseRate: 0.33, extraRate: 0 },
    ],
    exclusions: [
      "歐洲實體簽賬（外幣類別）",
      "超市",
      "旅行社",
      "政府部門",
      "網上繳費",
    ],
    warnings: [
      "需透過 BEA Mall App 登記",
      "外幣手續費 1.95%",
      "Pay with Points: 25,000 分抵銷 $100 = 5% 回贈",
    ],
    officialSource: "https://www.hkbea.com/html/tc/bea-credit-card-world-mastercard.html",
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

  // ========================================================================
  // HSBC EveryMile 信用卡
  // ========================================================================
  {
    cardId: "hsbc-everymile",
    cardName: "HSBC EveryMile 信用卡",
    bank: "HSBC",
    documentName: "滙豐EveryMile信用卡獎賞計劃之條款及細則",
    promoStartDate: "2026-01-01",
    promoEndDate: "2026-06-30",
    rewardRates: [
      // 指定日常及旅遊消費
      { 
        category: "指定日常及旅遊消費", 
        totalRate: 2.5, 
        baseRate: 0.4, 
        extraRate: 2.1, 
        note: "咖啡店(Starbucks/Pacific Coffee/Lady M等)、本地交通(港鐵/巴士/的士)、跨境交通、旅遊服務(AVIS/HERTZ等)；$2/里" 
      },
      // 本地及海外簽賬
      { 
        category: "本地及海外簽賬", 
        totalRate: 1.0, 
        baseRate: 0.4, 
        extraRate: 0.6, 
        note: "非指定類別的一般簽賬；$5/里" 
      },
      // 其他指定簽賬（只有基本）
      { 
        category: "八達通自動增值/網上繳費", 
        totalRate: 0.4, 
        baseRate: 0.4, 
        extraRate: 0, 
        note: "$12.5/里" 
      },
      { 
        category: "本地超市", 
        totalRate: 0.4, 
        baseRate: 0.4, 
        extraRate: 0, 
        note: "⚠️ 超市只有 0.4%！$12.5/里" 
      },
      { 
        category: "保費/證券/租金/廣告", 
        totalRate: 0.4, 
        baseRate: 0.4, 
        extraRate: 0, 
        note: "⚠️ 只有基本 0.4%！$12.5/里" 
      },
    ],
    exclusions: [
      "財務及銀行費用",
      "現金貸款、現金套現、簽賬分期計劃",
      "繳稅",
      "購買及/或充值儲值卡或電子錢包（八達通自動增值除外）",
      "以電子錢包所作的交易（包括增值電子錢包）",
      "郵購、傳真及電話訂購",
      "透過滙豐流動理財及/或網上理財繳費",
      "於非金融機構的交易（包括購買外匯、匯票及旅行支票）",
      "於金融機構的交易（包括購買銀行產品及服務）",
      "電匯",
      "賭博交易",
      "自動轉賬、循環付款",
      "所有未誌賬/取消/退款的交易",
    ],
    warnings: [
      "⚠️ 不適用於「最紅自主獎賞」和「Visa Signature 卡專享優惠」",
      "⚠️ 不適用於「Travel Guru 會員計劃」",
      "⚠️ 本地超市只有 0.4%（不是 2.5%）！",
      "⚠️ 保費、證券、租金、廣告只有 0.4%",
      "優惠兌換率：$1 獎賞錢 = 20 里",
      "首年年費豁免",
      "海外簽賬手續費 1.95%",
    ],
    officialSource: "https://www.hsbc.com.hk/content/dam/hsbc/hk/tc/docs/credit-cards/everymile/everymile-rewards-scheme-travel-benefits.pdf",
    lastUpdated: "2026-01-08",
  },

  // ========================================================================
  // HSBC EveryMile 限時額外迎新（2026/1/7-2/28）
  // ========================================================================
  {
    cardId: "hsbc-everymile-welcome-2026",
    cardName: "HSBC EveryMile 限時額外迎新優惠",
    bank: "HSBC",
    documentName: "滙豐EveryMile信用卡限時額外迎新獎賞優惠之條款及細則",
    promoStartDate: "2026-01-07",
    promoEndDate: "2026-02-28",
    minSpend: {
      amount: 40000,
      period: "promo",
      type: "total",
      note: "發卡後首60日內累積簽賬"
    },
    rewardRates: [
      // 全新客戶
      { 
        category: "全新客戶 - 簽$40,000-$119,999", 
        totalRate: 0, 
        baseRate: 0, 
        extraRate: 0, 
        note: "額外 $1,000 獎賞錢（20,000里）" 
      },
      { 
        category: "全新客戶 - 簽$120,000+", 
        totalRate: 0, 
        baseRate: 0, 
        extraRate: 0, 
        note: "額外 $4,600 獎賞錢（92,000里）🔥" 
      },
      // 現有客戶
      { 
        category: "現有客戶 - 簽$40,000+", 
        totalRate: 0, 
        baseRate: 0, 
        extraRate: 0, 
        note: "額外 $250 獎賞錢（5,000里）" 
      },
    ],
    exclusions: [
      "財務及銀行費用（年費、財務費用、逾期費用）",
      "以附屬卡作的交易",
      "郵購、傳真及電話訂購",
      "透過滙豐流動理財及/或網上理財繳費",
      "購買及/或充值儲值卡的交易（包括增值八達通）",
      "以電子錢包所作的交易（包括增值電子錢包）",
      "八達通自動增值",
      "於「獎賞錢」購物網及其他推廣進行的換購交易",
      "現金貸款、現金套現、簽賬分期計劃",
      "於非金融機構的交易（包括購買外匯、匯票及旅行支票）",
      "於金融機構的交易（包括購買銀行產品及服務）",
      "電匯",
      "賭博交易",
      "繳稅",
      "自動轉賬、循環付款",
      "所有未誌賬/取消/退款的交易",
    ],
    warnings: [
      "⚠️ 12個月內曾取消任何滙豐信用卡不可參加",
      "⚠️ 附屬卡不適用",
      "⚠️ 13個月內取消卡會被扣回獎賞",
      "需透過滙豐網頁/網上理財/HSBC HK App 申請",
    ],
    officialSource: "https://www.hsbc.com.hk/content/dam/hsbc/hk/tc/docs/credit-cards/offers/p4-acq-offer-tnc.pdf",
    lastUpdated: "2026-01-08",
  },

  // ========================================================================
  // HSBC Travel Guru 會員計劃
  // ========================================================================
  {
    cardId: "hsbc-travel-guru",
    cardName: "滙豐 Travel Guru 會員計劃",
    bank: "HSBC",
    documentName: "滙豐Travel Guru會員計劃之簽賬獎賞條款及細則",
    promoStartDate: "2025-04-01",
    promoEndDate: "2026-12-31",
    rewardCap: {
      type: "extra",  // 額外「獎賞錢」回贈
      amount: 2200,   // 最高等級 GURU 級上限
      period: "annual",  // 會籍年度
      note: "會籍等級上限：GO級 $500、GING級 $1,200、GURU級 $2,200（獎賞錢）"
    },
    rewardRates: [
      // GO 級旅人（第一級）
      { 
        category: "GO 級旅人 - 海外簽賬", 
        totalRate: 3.0, 
        baseRate: 0.4, 
        extraRate: 2.6, 
        note: "需連續3個月累積 $8,000 合資格簽賬解鎖；上限 $500 獎賞錢/年" 
      },
      // GING 級旅人（第二級）
      { 
        category: "GING 級旅人 - 海外簽賬", 
        totalRate: 4.0, 
        baseRate: 0.4, 
        extraRate: 3.6, 
        note: "需累積 $30,000 + 3次 $800 機票/郵輪/酒店預訂；上限 $1,200 獎賞錢/年" 
      },
      // GURU 級旅人（第三級）
      { 
        category: "GURU 級旅人 - 海外簽賬", 
        totalRate: 6.0, 
        baseRate: 0.4, 
        extraRate: 5.6, 
        note: "需累積 $70,000 + 6次 $800 機票/郵輪/酒店預訂；上限 $2,200 獎賞錢/年" 
      },
      // 指定商戶（Klook、Trip.com）
      { 
        category: "指定商戶（Klook/Trip.com）", 
        totalRate: 6.0, 
        baseRate: 0.4, 
        extraRate: 5.6, 
        note: "可與「最紅自主獎賞」賞世界疊加，VS卡可達 9.6%" 
      },
    ],
    minSpend: {
      amount: 8000,
      period: "quarterly",  // 連續3個月
      type: "category",  // 合資格簽賬類別
      note: "GO級解鎖條件：連續3個月累積 $8,000 合資格外幣簽賬"
    },
    exclusions: [
      // 不計合資格簽賬的交易
      "郵購、傳真及電話訂購",
      "透過滙豐流動理財及/或網上理財進行的簽賬交易",
      "購買及/或充值儲值卡的交易",
      "以電子錢包所作的交易（包括增值電子錢包）",
      "「現金套現」分期計劃及「現金套現」計劃的提款金額",
      "「商戶免息分期付款計劃」的整筆簽賬金額",
      "「現金套現」分期計劃及「現金套現」計劃、「簽賬分期計劃」、「商戶免息分期付款計劃」及其他分期計劃之每月供款金額",
      "於非金融機構的交易（包括購買外匯、匯票及旅行支票）",
      "於金融機構的交易（包括購買銀行產品及服務）",
      "電匯",
      "賭博交易",
      "繳稅",
      "自動轉賬、循環付款",
      "所有未誌賬/取消/退回/退款的交易",
      "⚠️ 網上消費並以外幣結算的簽賬（即使是外幣，網上不計！）",
      "⚠️ 以港元結算的 DCC 服務交易",
    ],
    warnings: [
      "⚠️ 網上簽賬不計！即使是外幣簽賬，網上也不計為合資格簽賬",
      "⚠️ 需透過 Reward+ App 登記成為會員",
      "⚠️ 登記前的簽賬不計為合資格簽賬",
      "會籍有效期為 12 個月，由登記日起計",
      "會籍每年自動續會，根據累積簽賬評定下年等級",
      "之前會籍的累積簽賬不可帶到下一年",
      "合資格機票/郵輪預訂：需單筆滿 $800 + MCC 為航空公司或郵輪",
      "合資格酒店預訂：需單筆滿 $800 + MCC 為官方酒店或旅行社",
      "旅遊網站（如 Trip.com、Klook）的機票預訂會被歸類為酒店預訂",
      "回贈按月入賬：2026年1月簽賬的獎賞錢於2026年2月入賬",
      "獎賞錢入賬到累積最高簽賬的信用卡戶口",
    ],
    officialSource: "https://www.hsbc.com.hk/credit-cards/offers/travel-guru/",
    lastUpdated: "2026-01-08",
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

