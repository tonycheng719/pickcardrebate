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
  
  // 適用卡片（如果條款適用於多張卡）
  applicableCards?: {
    cardId: string;
    cardName: string;
    note?: string;  // 例如 "JCB 不適用手機支付獎賞"
  }[];
  
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
  // DBS COMPASS VISA 百佳推廣
  // ========================================================================
  {
    cardId: "dbs-compass-visa-parknshop-2026q1",
    cardName: "DBS COMPASS VISA 百佳推廣 2026Q1",
    bank: "DBS",
    applicableCards: [
      { cardId: "dbs-compass-visa", cardName: "DBS COMPASS VISA" },
    ],
    documentName: "「DBS COMPASS VISA 百佳推廣」的條款及細則",
    promoStartDate: "2026-01-02",
    promoEndDate: "2026-02-28",
    rewardRates: [
      {
        category: "🛒 百佳門市（逢星期五、六、日）",
        totalRate: 10,
        baseRate: 0,
        extraRate: 10,
        note: "單一淨簽賬滿 **$300** → 送 **$30 門市電子優惠券**（10%回贈）🔥🔥",
      },
      {
        category: "💻 PNS 網購（逢星期五、六、日）",
        totalRate: 8.3,
        baseRate: 0,
        extraRate: 8.3,
        note: "單一淨簽賬滿 **$600** → 送 **$50 網購電子優惠券**（8.3%回贈）🔥🔥",
      },
    ],
    minSpend: {
      amount: 300,
      period: "promo",
      note: "門市滿 $300 / 網購滿 $600",
    },
    rewardCap: {
      type: "extra",
      amount: 200,
      period: "promo",
      note: "每月最多 2 次，推廣期內合共最多 4 次（門市最多 $120 + 網購最多 $200）",
    },
    exclusions: [
      "取消、退貨、退款交易",
      "自動轉賬、分期付款、未誌賬交易",
      "透過星展 iBanking/繳費易/24小時客戶服務熱線/DBS Card+ 繳款及轉賬完成的交易",
      "電子錢包付款（Apple Pay/Google Pay/Samsung Pay 於門市除外）",
      "電子錢包增值及八達通自動增值",
      "自助收銀機",
    ],
    warnings: [
      "📌 **只限逢星期五、六、日**",
      "📌 必須是「易賞錢」會員",
      "📌 門市：簽賬前必須先掃瞄「易賞錢」App",
      "📌 網購：須登入 PNS.hk 或 PNS 網購 App",
      "📌 電子優惠券會於簽賬後 **10 個工作天內** 自動存入易賞錢賬戶",
      "📌 電子優惠券有效期至 **2026年3月31日**",
      "⚠️ 每位持卡人每月最多享優惠 **2 次**，推廣期內合共最多 **4 次**",
      "⚠️ 名額先到先得，額滿即止",
      "⚠️ 不適用於自助收銀機",
    ],
    officialSource: "https://dms.pnshk.aswatson.net/images/SN/DBS%20tactical%20offer/TnC_CV_PNS_2026_zh.pdf",
    lastUpdated: "2026-01-09",
  },

  // ========================================================================
  // 交通銀行 Apple Pay 大激賞
  // ========================================================================
  {
    cardId: "bocom-applepay-2026h1",
    cardName: "交通銀行信用卡 Apple Pay 大激賞 2026H1",
    bank: "交通銀行",
    applicableCards: [
      { cardId: "bocom-credit-card", cardName: "交通銀行信用卡" },
    ],
    documentName: "交通銀行信用卡「Apple Pay 大激賞」推廣計劃條款及細則",
    promoStartDate: "2026-01-01",
    promoEndDate: "2026-06-30",
    rewardRates: [
      {
        category: "🎁 首次綁定迎新賞",
        totalRate: 0,
        baseRate: 0,
        extraRate: 0,
        note: "首次綁定 Apple Pay 可獲 **$20 簽賬回贈** 🎁",
      },
      {
        category: "📱 Apple Pay 簽賬",
        totalRate: 5,
        baseRate: 0,
        extraRate: 5,
        note: "每階段累積簽賬滿 $3,000 後，Apple Pay 簽賬享額外 **5% 回贈** 🔥🔥🔥",
      },
    ],
    minSpend: {
      amount: 3000,
      period: "monthly",
      note: "每階段（每月）累積簽賬滿 $3,000（實體卡 + Apple Pay）",
    },
    rewardCap: {
      type: "extra",
      amount: 1200,
      period: "promo",
      note: "每階段上限 $200，整個推廣期上限 $1,200（+ 首次綁定 $20 = $1,220）",
    },
    exclusions: [
      "2025年12月31日或之前曾綁定 Apple Pay 的卡戶（首次綁定獎賞不適用）",
      "多張主卡簽賬不可轉讓或合併計算",
    ],
    warnings: [
      "📌 **必須登記**：推廣編號 **202601CCD0000096**",
      "📌 登記名額有限，先到先得，額滿即止",
      "📌 每階段需重新計算累積簽賬",
      "📌 首次綁定獎賞：不適用於 2025年12月31日前曾綁定的卡戶",
      "⚠️ 每階段（每月）上限 **$200** 回贈",
      "⚠️ 整個推廣期上限 **$1,200** 回贈",
      "⚠️ Apple Pay 簽賬上限 $4,000/月（$4,000 × 5% = $200）",
    ],
    officialSource: "https://www.hk.bankcomm.com/hk/uploadhk/infos/202601/07/7049561/20260107154755_2026%20Apple%20Pay%20Reward%20Promotion_TnC_TC.pdf",
    lastUpdated: "2026-01-09",
  },

  // ========================================================================
  // HSBC Mastercard PCLO 個人化信用卡優惠 - 7-11 / 天仁茗茶
  // ========================================================================
  {
    cardId: "hsbc-mastercard-pclo-7eleven-tenren-2026",
    cardName: "滙豐Mastercard PCLO 7-Eleven/天仁茗茶優惠",
    bank: "HSBC",
    applicableCards: [
      { cardId: "hsbc-premier-mc", cardName: "HSBC Premier Mastercard" },
      { cardId: "hsbc-vs", cardName: "HSBC Visa Signature", note: "需為 Mastercard 版本" },
    ],
    documentName: "滙豐Mastercard®個人化信用卡優惠 (PCLO) 計劃條款及細則",
    rewardCap: {
      type: "total",
      amount: 20,
      period: "promo",
      note: "7-11 和天仁茗茶各 $20 回贈，合共 $40"
    },
    minSpend: {
      amount: 20,
      period: "promo",
      type: "total",
      note: "單一簽賬滿 $20"
    },
    rewardRates: [
      {
        category: "7-Eleven",
        totalRate: 100,
        baseRate: 0,
        extraRate: 100,
        note: "簽滿 $20 回贈 $20（100%回贈）"
      },
      {
        category: "天仁茗茶",
        totalRate: 100,
        baseRate: 0,
        extraRate: 100,
        note: "簽滿 $20 回贈 $20（100%回贈）"
      },
    ],
    exclusions: [
      "透過電子錢包付款（包括但不限於支付寶和微信支付）",
      "非港幣交易",
      "須先登記才簽賬，消費後登記無效",
    ],
    warnings: [
      "🔥 **100%回贈**：簽$20送$20！",
      "⚠️ **只限首次註冊 PCLO 用戶**",
      "📌 必須**先登記後簽賬**，消費後登記無效",
      "📌 每個優惠需獨立登記",
      "📌 回贈於 30 個曆日內自動入賬",
      "📌 月結單以「HSBCPCLO」標註",
    ],
    officialSource: "https://hkg.mastercardservices.com/hsbc/landing-page?language=zn_HK",
    lastUpdated: "2026-01-20",
  },

  // ========================================================================
  // 美國運通卡 x 支付寶（內地錢包）優惠 2026
  // 來源：https://www.americanexpress.com/content/dam/amex/zh-hk/benefits/TC/Alipay2026_TnCs_CH.pdf
  // ========================================================================
  {
    cardId: "amex-alipay-mainland-2026",
    cardName: "美國運通卡 x 支付寶（內地錢包）優惠 2026",
    bank: "美國運通",
    applicableCards: [
      { cardId: "amex-explorer", cardName: "美國運通 Explorer 信用卡" },
      { cardId: "amex-platinum", cardName: "美國運通白金卡" },
      { cardId: "amex-blue-cash", cardName: "美國運通 Blue Cash 信用卡" },
    ],
    documentName: "美國運通卡支付寶（內地錢包）優惠條款及細則",
    promoStartDate: "2026-01-20",
    promoEndDate: "2026-06-30",
    rewardCap: {
      type: "total",
      amount: 90,  // 每張卡最多 HK$90 (6次 x HK$15)
      period: "promo",
      note: "每張卡每月限1次，共6次，合共 HK$90"
    },
    minSpend: {
      amount: 300,
      period: "monthly",
      type: "total",
      note: "每曆月累積人民幣簽賬滿 HK$300"
    },
    rewardRates: [
      { 
        category: "支付寶（內地錢包）人民幣簽賬", 
        totalRate: 5,  // HK$15 / HK$300 = 5%
        baseRate: 0,
        extraRate: 5,
        note: "每月累積滿 HK$300 回贈 HK$15（5%）"
      },
    ],
    exclusions: [
      "❌ 透過 AlipayHK 或 Alipay+ 付款不適用",
      "❌ 以港元簽賬之交易不適用",
      "❌ 外幣費用不計入所需簽賬總額",
      "❌ 未過賬/取消/退款的交易不適用",
    ],
    warnings: [
      "⚠️ 須透過 Amex HK App 登記",
      "⚠️ 名額：首 50,000 張成功登記之合資格卡",
      "⚠️ AE 外幣簽賬手續費約 2%",
      "⚠️ 支付寶單筆交易超過 ¥200 會收取 3% 手續費",
      "💡 分拆小額交易（每筆≤¥200）可避免支付寶 3% 手續費",
      "📌 附屬卡會員須獨立登記，簽賬不可合併計算",
      "📌 簽賬回贈於交易完成後 15 個工作天內或推廣期結束後 90 天內存入賬戶",
    ],
    officialSource: "https://www.americanexpress.com/content/dam/amex/zh-hk/benefits/TC/Alipay2026_TnCs_CH.pdf",
    lastUpdated: "2026-01-22",
  },

  // ========================================================================
  // PayMe 銀聯卡 Apple Pay 消費回贈（2026/01/22 - 2026/04/22）
  // ========================================================================
  {
    cardId: "payme-unionpay-applepay-2026",
    cardName: "PayMe 銀聯卡 Apple Pay 優惠",
    bank: "HSBC (PayMe)",
    documentName: "PayMe 銀聯卡 Apple Pay 消費回贈獎賞推廣條款及細則",
    promoStartDate: "2026-01-22",
    promoEndDate: "2026-04-22",
    rewardCap: {
      type: "total",
      amount: 200,
      period: "promo",
      note: "每階段上限 $200，三階段合共 $600"
    },
    spendingCap: {
      amount: 6667,  // $200 ÷ 3% = $6,667（港幣/人民幣/澳門幣）
      period: "promo",
      calculation: "港幣/人民幣/澳門幣：$200 ÷ 3% = $6,667 / 其他外幣：$200 ÷ 10% = $2,000"
    },
    rewardRates: [
      {
        category: "港幣/人民幣/澳門幣簽賬",
        totalRate: 3,
        baseRate: 0,
        extraRate: 3,
        note: "透過 Apple Pay 使用 PayMe 銀聯卡於銀聯商戶消費"
      },
      {
        category: "其他外幣簽賬",
        totalRate: 10,
        baseRate: 0,
        extraRate: 10,
        note: "透過 Apple Pay 使用 PayMe 銀聯卡於銀聯商戶消費"
      },
    ],
    exclusions: [
      "❌ 透過 AlipayHK 或 Alipay+ 付款不適用",
      "❌ 掃描商戶銀聯二維碼不適用",
      "❌ 展示 PayMe 銀聯二維碼予商戶掃描不適用",
      "❌ 增值或資助任何電子支付工具（包括電子錢包）不適用",
      "❌ 「繳付賬單」功能不適用",
      "❌ 不適用於赚取儲火或解鎖轉轉賞",
    ],
    warnings: [
      "⚠️ 必須將 PayMe 銀聯虛擬卡加入 Apple 銀包",
      "⚠️ 必須透過 Apple Pay 進行免觸式支付（NFC）",
      "⚠️ 交易須透過銀聯商戶進行",
      "💡 每階段（約1個月）上限 $200 回贈",
      "💡 第一階段：2026/1/22-2/21",
      "💡 第二階段：2026/2/22-3/21",
      "💡 第三階段：2026/3/22-4/21",
      "📌 回贈於每階段完結後 10 個工作天內存入 PayMe 錢包",
      "📌 先到先得，送完即止",
    ],
    officialSource: "https://payme.hsbc.com.hk/files/PayMe_CUP_ApplePay_Rebate_Jan-Apr_2026_TC.pdf",
    lastUpdated: "2026-01-22",
  },
  // ========================================================================
  // AE 卡 APITA / UNY / 千色優惠（2026/01/23 - 2026/02/23）
  // ========================================================================
  {
    cardId: "amex-apita-uny-citistore-2026",
    cardName: "AE 卡 APITA / UNY / 千色優惠",
    bank: "American Express",
    applicableCards: [
      { cardId: "amex-explorer", cardName: "美國運通 Explorer 信用卡" },
      { cardId: "amex-gold", cardName: "美國運通金卡" },
      { cardId: "amex-green", cardName: "美國運通綠卡" },
      { cardId: "amex-platinum", cardName: "美國運通白金卡" },
      { cardId: "amex-blue-cash", cardName: "美國運通 Blue Cash 信用卡" },
    ],
    documentName: "AE 卡 APITA / UNY / 千色 Citistore 優惠條款及細則",
    promoStartDate: "2026-01-23",
    promoEndDate: "2026-02-23",
    rewardCap: {
      type: "total",
      amount: 38,
      period: "promo",
      note: "每張卡限1次，最高 $38 回贈"
    },
    minSpend: {
      amount: 380,
      period: "promo",
      type: "total",
      note: "單一簽賬滿 $380"
    },
    rewardRates: [
      {
        category: "APITA / UNY / 千色門市消費",
        totalRate: 10,
        baseRate: 0,
        extraRate: 10,
        note: "單一消費滿 $380 回贈 $38（**10% 回贈**）🔥"
      },
    ],
    exclusions: [
      "❌ 千色荃灣門市：Pokka Cafe、A-1 Bakery、Pacific Coffee、華御結、茶木、Zoff 眼鏡",
      "❌ 千色荃灣/馬鞍山門市：賞茶",
      "❌ APITA 太古城 / UNY 樂富：QB House",
      "❌ 網店交易不適用",
      "❌ 透過第三方支付服務不適用",
    ],
    warnings: [
      "⚠️ 必須先在 Amex HK App 登記",
      "⚠️ 必須親身到門市消費",
      "⚠️ 附屬卡需獨立登記",
      "💡 名額：首 25,000 張成功登記卡",
      "💡 每張卡只可享用 1 次",
    ],
    officialSource: "https://go.amex/apita-uny-citistore-tnc-cn",
    lastUpdated: "2026-01-23",
  },
  // ========================================================================
  // 美國運通 - 日本 Donki 優惠 2026
  // ========================================================================
  {
    cardId: "amex-japan-donki-2026",
    cardName: "美國運通卡 x 日本 Donki 優惠 2026",
    bank: "美國運通",
    applicableCards: [
      { cardId: "amex-explorer", cardName: "美國運通 Explorer 信用卡" },
      { cardId: "amex-platinum", cardName: "美國運通白金卡" },
      { cardId: "amex-blue-cash", cardName: "美國運通 Blue Cash 信用卡" },
    ],
    documentName: "日本 Donki 優惠條款及細則",
    promoStartDate: "2026-01-27",
    promoEndDate: "2026-04-12",
    rewardCap: {
      type: "total",
      amount: 160,
      period: "promo",
      note: "每張卡最多 2 次回贈，每次 HK$80",
    },
    rewardRates: [
      { 
        category: "日本 Donki / Don Quijote 實體店", 
        totalRate: 0.4, 
        baseRate: 0.4, 
        extraRate: 0,
        note: "累積簽 ¥20,000 回 HK$80（約 0.4% 回贈）",
      },
    ],
    exclusions: [
      "指定 Donki 及 Don Quijote 門市不適用",
      "網店交易不適用",
      "透過第三方機構的交易不適用",
      "美國運通公司卡及特許發卡公司簽發的卡不適用",
    ],
    warnings: [
      "每張已登記卡最多可享 2 次回贈，總共 HK$160",
      "只適用於首 50,000 張成功登記的合資格美國運通卡",
      "附屬卡須獨立登記，簽賬不可合併計算",
      "簽賬回贈將於合資格交易完成後 15 個工作天內或推廣期結束後 90 天內存入賬戶",
      "外幣手續費不計入簽賬總額",
    ],
    officialSource: "https://www.americanexpress.com/content/dam/amex/zh-hk/benefits/TC/Donki_TnCs_CH.pdf",
    lastUpdated: "2026-01-29",
  },
  // ========================================================================
  // 美國運通 - 日本 LOFT 優惠 2026
  // ========================================================================
  {
    cardId: "amex-japan-loft-2026",
    cardName: "美國運通卡 x 日本 LOFT 優惠 2026",
    bank: "美國運通",
    applicableCards: [
      { cardId: "amex-explorer", cardName: "美國運通 Explorer 信用卡" },
      { cardId: "amex-platinum", cardName: "美國運通白金卡" },
      { cardId: "amex-blue-cash", cardName: "美國運通 Blue Cash 信用卡" },
    ],
    documentName: "日本 LOFT 優惠條款及細則",
    promoStartDate: "2026-01-27",
    promoEndDate: "2026-04-12",
    rewardCap: {
      type: "total",
      amount: 100,
      period: "promo",
      note: "每張卡最多 2 次回贈，每次 HK$50",
    },
    rewardRates: [
      { 
        category: "日本 LOFT 實體店", 
        totalRate: 0.5, 
        baseRate: 0.5, 
        extraRate: 0,
        note: "累積簽 ¥10,000 回 HK$50（約 0.5% 回贈）",
      },
    ],
    exclusions: [
      "百貨公司內的 LOFT 不適用",
      "COSME LOFT 不適用（Gransta Tokyo 店除外）",
      "MoMA Design Store 不適用",
      "網店交易不適用",
      "透過第三方機構的交易不適用",
      "美國運通公司卡及特許發卡公司簽發的卡不適用",
    ],
    warnings: [
      "每張已登記卡最多可享 2 次回贈，總共 HK$100",
      "只適用於首 50,000 張成功登記的合資格美國運通卡",
      "附屬卡須獨立登記，簽賬不可合併計算",
      "簽賬回贈將於合資格交易完成後 15 個工作天內或推廣期結束後 90 天內存入賬戶",
      "外幣手續費不計入簽賬總額",
    ],
    officialSource: "https://www.americanexpress.com/content/dam/amex/zh-hk/benefits/TC/LOFT_TnCs_CH.pdf",
    lastUpdated: "2026-01-29",
  },
  // ========================================================================
  // 美國運通 - Osaka Metro 優惠 2026
  // ========================================================================
  {
    cardId: "amex-japan-osaka-metro-2026",
    cardName: "美國運通卡 x Osaka Metro 優惠 2026",
    bank: "美國運通",
    applicableCards: [
      { cardId: "amex-explorer", cardName: "美國運通 Explorer 信用卡" },
      { cardId: "amex-platinum", cardName: "美國運通白金卡" },
      { cardId: "amex-blue-cash", cardName: "美國運通 Blue Cash 信用卡" },
    ],
    documentName: "Osaka Metro 優惠條款及細則",
    promoStartDate: "2026-01-27",
    promoEndDate: "2026-04-12",
    rewardCap: {
      type: "total",
      amount: 10,
      period: "promo",
      note: "每張卡最多 2 次回贈，每次 HK$5",
    },
    rewardRates: [
      { 
        category: "Osaka Metro 拍卡入閘", 
        totalRate: 0.5, 
        baseRate: 0.5, 
        extraRate: 0,
        note: "累積簽 ¥1,000 回 HK$5（約 0.5% 回贈）",
      },
    ],
    exclusions: [
      "巴士不適用",
      "非 Osaka Metro 營運的列車不適用（包括往返關西機場的列車）",
      "售票櫃檯或自動售票機購票不適用",
      "購買通勤通行證不適用",
      "IC 卡或 PiTaPa 卡充值不適用",
      "透過第三方機構的交易不適用",
      "美國運通公司卡及特許發卡公司簽發的卡不適用",
    ],
    warnings: [
      "每張已登記卡最多可享 2 次回贈，總共 HK$10",
      "只適用於首 50,000 張成功登記的合資格美國運通卡",
      "附屬卡須獨立登記，簽賬不可合併計算",
      "簽賬回贈將於合資格交易完成後 15 個工作天內或推廣期結束後 90 天內存入賬戶",
      "外幣手續費不計入簽賬總額",
    ],
    officialSource: "https://www.americanexpress.com/content/dam/amex/zh-hk/benefits/TC/OsakaMetro_TnCs_CH.pdf",
    lastUpdated: "2026-01-29",
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

