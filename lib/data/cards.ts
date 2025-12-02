import { CreditCard } from "../types";

export const HK_CARDS: CreditCard[] = [
  // ========================================================================
  // HSBC 匯豐
  // ========================================================================
  {
    id: "hsbc-vs",
    name: "HSBC Visa Signature",
    bank: "HSBC",
    style: { bgColor: "bg-gradient-to-br from-red-700 via-red-800 to-black", textColor: "text-white" },
    rewardTimeline: "獎賞錢即時入賬",
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 10, currency: 'RC' },
    rules: [
      // 最紅自主獎賞: 需登記並選擇類別，每季額外積分上限 $25,000 (每月約 $8,333)
      { description: "最紅自主獎賞 (類別) 3.6% ($2.78/里)", matchType: "category", matchValue: ["dining", "supermarket", "lifestyle", "home", "entertainment"], percentage: 3.6, cap: 25000, capType: "spending" },
      { description: "基本回饋 0.4% ($25/里)", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["餐飲神卡", "最紅自主獎賞", "5X積分"],
    imageUrl: "https://www.hsbc.com.hk/content/dam/hsbc/hk/images/credit-cards/visa-signature-card-en.png",
    feeWaiverCondition: "首兩年免年費",
    welcomeOfferText: "迎新簽 $8,000 送 $800 獎賞錢",
    welcomeOfferReward: "$800 獎賞錢",
    welcomeOfferDeadline: "2024-12-31",
    applyUrl: "https://www.hsbc.com.hk/zh-hk/credit-cards/products/visa-signature/",
    sellingPoints: ["最紅自主獎賞 5X，自選類別可達 3.6% (HK$2.78/里)", "Visa Signature 專屬優惠"],
    note: "⚠️ 需登記「最紅自主獎賞」並選擇類別才享 3.6%！未登記只有 0.4% 基本回贈。每季額外積分上限 $25,000 簽賬。",
  },
  {
    id: "hsbc-red",
    name: "HSBC Red Credit Card",
    bank: "HSBC",
    style: { bgColor: "bg-gradient-to-br from-red-500 via-red-600 to-pink-700", textColor: "text-white" },
    imageUrl: "https://www.hsbc.com.hk/content/dam/hsbc/hk/images/credit-cards/red-credit-card-en.png",
    rewardTimeline: "獎賞錢即時入賬",
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 10, currency: 'RC' },
    rules: [
      // 指定商戶 8% (每月首$1,250): 壽司郎/譚仔三哥/譚仔雲南/The Coffee Academïcs/GU/Decathlon/lululemon/NAMCO/TAITO
      { description: "指定商戶 8% (壽司郎/譚仔等)", matchType: "merchant", matchValue: ["sushiro", "tamjai", "tamjai_yunnan", "coffee_academics", "gu", "decathlon", "lululemon", "namco", "taito"], percentage: 8.0, cap: 1250, capType: "spending" },
      // 網上簽賬 4% (包括網上超市)
      { description: "網上簽賬 4% (每月首$10,000)", matchType: "category", matchValue: "online", percentage: 4.0, cap: 10000, capType: "spending" },
      // 實體超市只有 0.4% (屬於「其他簽賬」)
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "payme", "alipay", "wechat_pay"] }, 
    ],
    tags: ["網購神卡", "永久免年費", "指定商戶8%"],
    feeWaiverCondition: "永久免年費",
    welcomeOfferText: "迎新簽 $8,000 送 $800 獎賞錢",
    applyUrl: "https://www.hsbc.com.hk/zh-hk/credit-cards/products/red/",
    sellingPoints: ["指定商戶 8% (壽司郎/譚仔/GU/Decathlon等)", "網上簽賬 4% (每月首$10,000)", "永久免年費"],
    note: "⚠️ 實體超市簽賬只有 0.4%！網上超市 (如 HKTVmall) 才享 4%。指定商戶 8% 每月首 $1,250。",
  },
  {
    id: "hsbc-everymile",
    name: "HSBC EveryMile",
    bank: "HSBC",
    style: { bgColor: "bg-gradient-to-br from-stone-700 to-stone-900", textColor: "text-white" },
    rewardTimeline: "獎賞錢即時入賬",
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 20, currency: 'RC' }, // 1 RC = 20 Miles (Special rate for EveryMile)
    rules: [
      { description: "指定商戶/交通 $2/里 (2.5%)", matchType: "category", matchValue: ["transport", "online", "dining"], percentage: 2.5 },
      { description: "海外簽賬 $2/里 (2.5%)", matchType: "base", percentage: 2.5, isForeignCurrency: true },
      { description: "基本回饋 $5/里 (1%)", matchType: "base", percentage: 1.0, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["旅遊神卡", "交通$2/里", "Lounge"],
    welcomeOfferText: "迎新簽 $8,000 送 $800 獎賞錢",
    applyUrl: "https://www.hsbc.com.hk/zh-hk/credit-cards/products/everymile/",
    sellingPoints: ["指定日常簽賬低至 HK$2/里", "免費環亞機場貴賓室"],
    note: "指定商戶包括：交通 (港鐵/巴士/的士)、網購、餐飲。需配合「獎賞錢」兌換里數。",
  },
  {
    id: "hsbc-pulse",
    name: "HSBC Pulse 銀聯雙幣卡",
    bank: "HSBC",
    style: { bgColor: "bg-gradient-to-br from-red-400 to-red-600", textColor: "text-white" },
    rewardTimeline: "獎賞錢即時入賬",
    foreignCurrencyFee: 0,
    rewardConfig: { method: 'conversion', ratio: 10, currency: 'RC' },
    rules: [
      { description: "內地/澳門簽賬 (賞世界) 4.4% ($2.27/里)", matchType: "base", percentage: 4.4, isForeignCurrency: true }, // 2.4% + 2% from travel guru/promo often
      { description: "最紅自主獎賞 2.4% ($4.17/里)", matchType: "category", matchValue: "china", percentage: 2.4 },
      { description: "基本回饋 0.4% ($25/里)", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["北上消費", "銀聯", "免手續費"],
    sellingPoints: ["人民幣/港幣雙幣結算", "豁免外幣手續費", "北上消費必備"],
    note: "⚠️ 內地 4.4% 需登記「賞世界」及「最紅自主獎賞」！未登記只有 0.4% 基本回贈。",
  },
  {
    id: "hsbc-premier",
    name: "HSBC Premier Mastercard",
    bank: "HSBC",
    style: { bgColor: "bg-gradient-to-br from-slate-800 to-black", textColor: "text-white" },
    rewardTimeline: "獎賞錢即時入賬",
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 10, currency: 'RC' },
    rules: [
      { description: "海外/網上簽賬 2.4%", matchType: "category", matchValue: ["travel", "online"], percentage: 2.4, minSpend: 8000 },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["卓越理財", "旅遊"],
    sellingPoints: ["卓越理財客戶專享", "指定類別額外獎賞錢"],
    note: "⚠️ 需月簽賬滿 $8,000 才享 2.4% 回贈！未滿額只有 0.4% 基本回贈。僅限卓越理財客戶申請。",
  },

  // ========================================================================
  // Standard Chartered 渣打
  // ========================================================================
  {
    id: "sc-smart",
    name: "SC Smart Card",
    bank: "Standard Chartered",
    style: { bgColor: "bg-gradient-to-r from-emerald-400 to-cyan-600", textColor: "text-white" },
    imageUrl: "https://av.sc.com/hk/content/images/hk-smart-card-masthead-400x255.png",
    rewardTimeline: "現金回贈於下期賬單顯示，需手動換領 ($50倍數)",
    foreignCurrencyFee: 0,
    rules: [
      // 特約商戶 5% (需月簽賬滿$4,000，每月上限簽$5,000)
      { description: "特約商戶 5% (百佳/屈臣氏/759/Klook等)", matchType: "merchant", matchValue: ["parknshop", "fusion", "taste", "watsons", "759", "japanhome", "deliveroo", "klook", "decathlon", "netflix", "disney", "spotify", "cmhk"], percentage: 5.0, cap: 5000, capType: "spending" },
      // 基本回贈 0.56% (假設月簽賬滿$4,000)
      { description: "基本回贈 0.56%", matchType: "base", percentage: 0.56, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["特約商戶5%", "永久免年費", "免外幣手續費"],
    welcomeOfferText: "迎新簽 $3,500 送 $1,000 現金回贈",
    applyUrl: "https://www.sc.com/hk/zh/credit-cards/smart/",
    sellingPoints: ["特約商戶 5% (百佳/屈臣氏/759/Klook/Deliveroo等)", "基本回贈 0.56% (月簽滿$15,000升至1.2%)", "永久免年費", "豁免外幣手續費"],
    note: "⚠️ 需月簽賬滿 $4,000 才有回贈！未滿 $4,000 = 0%。特約商戶每月上限簽 $5,000。回贈需手動換領 ($50 倍數)。",
  },
  {
    id: "sc-cathay",
    name: "SC Cathay Mastercard",
    bank: "Standard Chartered",
    style: { bgColor: "bg-gradient-to-br from-teal-700 to-teal-900", textColor: "text-white" },
    rewardTimeline: "里數自動存入",
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'direct_rate', baseRate: 6, currency: 'AM' }, // Direct rate: $6/mile
    rules: [
      { description: "國泰/HK Express 簽賬 $2/里", matchType: "merchant", matchValue: ["cathay", "hkexpress"], percentage: 0, // Special override in calc
        // For direct_rate, percentage is tricky. We might need to handle it.
        // Let's assume percentage is for Cash equivalent if someone wants to see it?
        // 1 Mile approx $0.1. So $2/mile is ~5%.
      },
      { description: "餐飲/外賣/網上 $4/里", matchType: "category", matchValue: ["dining", "online"], percentage: 0 }, 
      { description: "基本回饋 $6/里", matchType: "base", percentage: 0, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    // Override for direct mile calculation in calculator logic if needed,
    // or we map percentages roughly: $2/mile=5%, $4/mile=2.5%, $6/mile=1.67%
    // Let's set percentage for sorting compatibility
    tags: ["儲里數", "國泰"],
    sellingPoints: ["國泰航空簽賬低至 HK$2/里", "餐飲食肆 HK$4/里"],
  },
  {
    id: "sc-simply-cash",
    name: "SC Simply Cash Visa",
    bank: "Standard Chartered",
    style: { bgColor: "bg-gradient-to-br from-blue-500 to-blue-700", textColor: "text-white" },
    imageUrl: "https://av.sc.com/hk/content/images/hk-simply-cash-visa-card-masthead-400x255.png",
    rewardTimeline: "現金回贈",
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "外幣簽賬 2%", matchType: "base", percentage: 2.0, isForeignCurrency: true },
      { description: "港幣簽賬 1.5%", matchType: "base", percentage: 1.5, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["現金回贈", "無腦刷"],
    sellingPoints: ["港幣簽賬 1.5% 現金回贈", "外幣簽賬 2%", "無最低簽賬要求"],
  },

  // ========================================================================
  // BOC 中銀香港
  // ========================================================================
  {
    id: "boc-chill",
    name: "BOC Chill Card",
    bank: "BOC",
    style: { bgColor: "bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500", textColor: "text-white" },
    imageUrl: "https://www.bochk.com/dam/more/creditcard/chill/chill_card_face.png",
    rewardTimeline: "積分",
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 0.0666, currency: 'Points' }, // 15 pts = 1 mile -> ratio 0.0666
    rules: [
      { description: "週五六日影視娛樂 12%", matchType: "category", matchValue: "entertainment", percentage: 12.0, validDays: [5, 6, 0], cap: 150, capType: "reward" },
      { description: "影視娛樂 10%", matchType: "category", matchValue: "entertainment", percentage: 10.0, cap: 150, capType: "reward" }, 
      { description: "手機支付 5% (BoC Pay/Apple Pay等)", matchType: "paymentMethod", matchValue: ["mobile", "boc_pay", "apple_pay", "google_pay"], percentage: 5.0, cap: 150, capType: "reward", excludeCategories: ["ewallet"] },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["娛樂10%", "BoC Pay", "週末娛樂12%"],
    welcomeOfferText: "迎新簽 $5,000 送 $500 現金回贈",
    sellingPoints: ["週五六日影視娛樂 12%", "影視娛樂 10%", "手機支付 5% (BoC Pay/Apple Pay等)", "永久免年費"],
    note: "手機支付 5% 需使用 BoC Pay/Apple Pay/Google Pay/Samsung Pay。每月回贈上限 $150。",
  },
  {
    id: "boc-sogo",
    name: "BOC SOGO Visa Signature",
    bank: "BOC",
    style: { bgColor: "bg-gradient-to-br from-blue-700 to-blue-900", textColor: "text-white" },
    imageUrl: "https://www.bochk.com/dam/more/creditcard/sogo/sogo_visa_signature_card_face.png",
    rewardTimeline: "現金回贈",
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 0.0666, currency: 'Points' },
    rules: [
      // 週二 SOGO 8% (需用 BoC Pay)
      { description: "週二 SOGO 8% (BoC Pay)", matchType: "merchant", matchValue: ["sogo"], percentage: 8.0, validDays: [2] },
      // SOGO 手機支付 5.5% (BoC Pay/Apple Pay/Google Pay)
      { description: "SOGO 手機支付 5.5%", matchType: "merchant", matchValue: ["sogo"], percentage: 5.5 },
      // 一般商戶手機支付 5% (每月上限$100回贈)
      { description: "手機支付 5% (上限$100回贈)", matchType: "paymentMethod", matchValue: ["mobile", "boc_pay", "apple_pay", "google_pay"], percentage: 5.0, cap: 100, capType: "reward", excludeCategories: ["ewallet"] },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["手機支付5%", "SOGO", "週二SOGO 8%", "BoC Pay"],
    sellingPoints: ["週二 SOGO 8% (需用 BoC Pay)", "SOGO 手機支付 5.5%", "一般手機支付 5% (上限$100回贈)", "崇光百貨專屬優惠"],
    note: "⚠️ 週二 SOGO 8% 需使用 BoC Pay！手機支付包括 BoC Pay/Apple Pay/Google Pay。每月手機支付回贈上限 $100。",
  },
  {
    id: "boc-cheers",
    name: "BOC Cheers Visa Infinite",
    bank: "BOC",
    style: { bgColor: "bg-gradient-to-br from-neutral-800 to-black", textColor: "text-yellow-400" },
    imageUrl: "https://www.bochk.com/dam/more/creditcard/cheers/cheers_visa_infinite_card_face.png",
    rewardTimeline: "積分",
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 0.125, currency: 'Points' }, // 8 pts = 1 mile -> ratio 0.125
    rules: [
      { description: "餐飲/旅遊 10X (4% / $1.5/里)", matchType: "category", matchValue: ["dining", "travel"], percentage: 4.0 },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["餐飲4%", "旅遊4%", "高級卡"],
    sellingPoints: ["餐飲及旅遊簽賬 10X 積分 ($1.5/里)", "每年免費享用貴賓室"],
  },
  {
    id: "boc-gba",
    name: "BOC 大灣區一卡通",
    bank: "BOC",
    style: { bgColor: "bg-gradient-to-br from-blue-600 to-cyan-600", textColor: "text-white" },
    imageUrl: "https://www.bochk.com/dam/more/creditcard/gba/gba_diamond_card_face.png",
    foreignCurrencyFee: 0,
    rules: [
      { description: "內地簽賬 4%", matchType: "base", percentage: 4.0, isForeignCurrency: true },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["大灣區", "北上"],
    sellingPoints: ["內地簽賬高達 4% 回贈", "支援內地交通乘車碼"],
  },
  {
    id: "boc-icard",
    name: "BOC i-card",
    bank: "BOC",
    style: { bgColor: "bg-gradient-to-br from-blue-400 to-blue-600", textColor: "text-white" },
    imageUrl: "https://www.bochk.com/dam/more/creditcard/icard/icard_card_face.png",
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 0.0666, currency: 'Points' },
    rules: [
      { description: "網購/手機支付 4% (10X積分)", matchType: "category", matchValue: ["online"], percentage: 4.0, cap: 11111, capType: "spending", excludeCategories: ["ewallet"] }, 
      { description: "手機支付 4% (BoC Pay/Apple Pay等)", matchType: "paymentMethod", matchValue: ["mobile", "boc_pay", "apple_pay", "google_pay"], percentage: 4.0, cap: 11111, capType: "spending", excludeCategories: ["ewallet"] }, 
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["網購4%", "手機支付4%", "BoC Pay"],
    sellingPoints: ["網購 4% (10X積分)", "手機支付 4% (BoC Pay/Apple Pay等)", "每月額外積分上限 10,000 分"],
    note: "網購及手機支付 4% 需使用 BoC Pay/Apple Pay/Google Pay/Samsung Pay。每月額外積分上限 10,000 分 (約 $11,111 簽賬)。",
  },

  // ========================================================================
  // Hang Seng 恆生
  // ========================================================================
  {
    id: "hangseng-mmpower",
    name: "Hang Seng MMPOWER",
    bank: "Hang Seng",
    style: { bgColor: "bg-gradient-to-br from-purple-600 via-pink-600 to-red-500", textColor: "text-white" },
    imageUrl: "https://www.hangseng.com/content/dam/hase/config/personal/credit-cards/mmpower-card/images/mmpower-card-face.png",
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "網上簽賬 5% (需月簽賬滿$5,000)", matchType: "category", matchValue: "online", percentage: 5.0, minSpend: 5000, cap: 500, capType: "reward", excludeCategories: ["ewallet"] }, // Max $500 +FUN Dollars
      { description: "手機支付 5% (Apple Pay/Google Pay等)", matchType: "paymentMethod", matchValue: ["mobile", "apple_pay", "google_pay", "samsung_pay"], percentage: 5.0, minSpend: 5000, cap: 500, capType: "reward", excludeCategories: ["ewallet"] },
      { description: "外幣簽賬 6% (需月簽賬滿$5,000)", matchType: "base", percentage: 6.0, minSpend: 5000, isForeignCurrency: true, cap: 500, capType: "reward" },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["網購5%", "手機支付5%", "必須登記"],
    welcomeOfferText: "迎新簽 $5,000 送 $700 Fun Dollars",
    sellingPoints: ["網購 5% (需月簽賬滿$5,000)", "手機支付 5% (Apple Pay/Google Pay等)", "外幣 6%", "每月簽賬滿額解鎖"],
    note: "⚠️ 需月簽賬滿 $5,000 才享 5%/6% 回贈！未滿額只有 0.4% 基本回贈。需每月登記。手機支付包括 Apple Pay/Google Pay/Samsung Pay。",
  },
  {
    id: "hangseng-enjoy",
    name: "Hang Seng enJoy Card",
    bank: "Hang Seng",
    style: { bgColor: "bg-gradient-to-br from-red-500 to-red-700", textColor: "text-white" },
    imageUrl: "https://www.hangseng.com/content/dam/hase/config/personal/credit-cards/enjoy-card/images/enjoy-card-face.png",
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 200, currency: 'yuu積分' }, // $1 = 1 yuu point, 200 points = $1 cash
    rules: [
      // 惠康/Market Place: 每月3/13/23日 92折 - 折扣優惠，非回贈
      { description: "惠康 92折 (3/13/23號)", matchType: "merchant", matchValue: ["wellcome"], percentage: 8.0, validDates: [3, 13, 23], isDiscount: true, minSpend: 100 },
      // 萬寧: 每月1/20日 94折 - 折扣優惠，非回贈
      { description: "萬寧 94折 (1/20號)", matchType: "merchant", matchValue: ["mannings"], percentage: 6.0, validDates: [1, 20], isDiscount: true },
      // 平日惠康/百佳 3X yuu積分 (1.5%) - 回贈
      { description: "惠康/百佳 3X yuu積分 (1.5%)", matchType: "merchant", matchValue: ["wellcome", "parknshop"], percentage: 1.5 },
      { description: "萬寧 3X yuu積分 (1.5%)", matchType: "merchant", matchValue: ["mannings"], percentage: 1.5 },
      { description: "特約食肆 4X (2%)", matchType: "merchant", matchValue: ["mcdonalds", "kfc", "maxims", "pizzahut", "starbucks"], percentage: 2.0 },
      { description: "基本回饋 1X yuu積分 (0.5%)", matchType: "base", percentage: 0.5, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["儲分", "食肆優惠", "yuu積分", "折扣日"],
    sellingPoints: ["惠康 92折 (每月3/13/23號) [折扣]", "萬寧 94折 (每月1/20號) [折扣]", "惠康/百佳 3X yuu積分", "yuu 積分可當現金使用"],
    note: "⚠️ 折扣優惠：惠康92折僅限每月 3/13/23 號 (需滿$100)、萬寧94折僅限每月 1/20 號。折扣是購物時直接減價，非事後回贈。折扣與 yuu 積分可同時享有！",
  },
  {
    id: "hangseng-travel-plus",
    name: "Hang Seng Travel+",
    bank: "Hang Seng",
    style: { bgColor: "bg-gradient-to-br from-sky-500 to-blue-600", textColor: "text-white" },
    imageUrl: "https://www.hangseng.com/content/dam/hase/config/personal/credit-cards/travel-plus-card/images/travel-plus-card-face.png",
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "外幣簽賬 7% (需月簽賬滿$6,000)", matchType: "base", percentage: 7.0, minSpend: 6000, isForeignCurrency: true, cap: 500, capType: "reward" },
      { description: "本地餐飲/交通 5% (需月簽賬滿$6,000)", matchType: "category", matchValue: ["dining", "transport"], percentage: 5.0, minSpend: 6000, cap: 500, capType: "reward" },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["旅遊7%", "餐飲5%"],
    sellingPoints: ["外幣簽賬高達 7% (需月簽賬滿$6,000)", "本地餐飲及交通 5% (需月簽賬滿$6,000)"],
    note: "⚠️ 需月簽賬滿 $6,000 才享 5%/7% 回贈！未滿額只有 0.4% 基本回贈。",
  },

  // ========================================================================
  // Citi 花旗
  // ========================================================================
  {
    id: "citi-cashback",
    name: "Citi Cash Back Card",
    bank: "Citi",
    style: { bgColor: "bg-gradient-to-br from-blue-700 to-blue-900", textColor: "text-white" },
    imageUrl: "https://www.citibank.com.hk/chinese/credit-cards/images/cash-back-card.png",
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "週五六日食肆 3%", matchType: "category", matchValue: ["dining"], percentage: 3.0, validDays: [5, 6, 0] },
      { description: "食肆/酒店 2%", matchType: "category", matchValue: ["dining", "travel"], percentage: 2.0 },
      { description: "外幣 2%", matchType: "base", percentage: 2.0, isForeignCurrency: true },
      { description: "基本回饋 1%", matchType: "base", percentage: 1.0, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["自動回贈", "餐飲2%", "週末餐飲3%"],
    sellingPoints: ["週五六日食肆 3% 回贈", "全球食肆及酒店 2% 回贈", "無上限，自動入賬"],
  },
  {
    id: "citi-rewards",
    name: "Citi Rewards Card",
    bank: "Citi",
    style: { bgColor: "bg-gradient-to-r from-blue-400 to-cyan-500", textColor: "text-white" },
    imageUrl: "https://www.citibank.com.hk/chinese/credit-cards/images/rewards-card.png",
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 0.0666, currency: 'Points' }, // 15 pts = 1 mile
    rules: [
      { description: "流動支付 5X (2% / $3/里)", matchType: "paymentMethod", matchValue: ["mobile", "apple_pay", "google_pay", "samsung_pay"], percentage: 2.0, cap: 50000, capType: "spending", excludeCategories: ["ewallet"] }, // Max 50,000 points
      { description: "超市/百貨 5X (2%)", matchType: "category", matchValue: ["supermarket", "department_store"], percentage: 2.0 },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["Apple Pay之選", "積分", "流動支付"],
    welcomeOfferText: "迎新簽 $10,000 送 20,000 里數",
    sellingPoints: ["流動支付 5X 積分 (Apple Pay/Google Pay等)", "超市/百貨 5X 積分", "積分永不過期"],
    note: "流動支付 5X 需使用 Apple Pay/Google Pay/Samsung Pay。每月額外積分上限 50,000 分 (約 $50,000 簽賬)。",
  },
  {
    id: "citi-premiermiles",
    name: "Citi PremierMiles",
    bank: "Citi",
    style: { bgColor: "bg-gradient-to-br from-slate-600 to-slate-800", textColor: "text-white" },
    imageUrl: "https://www.citibank.com.hk/chinese/credit-cards/images/premiermiles-card.png",
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 0.0833, currency: 'Points' }, // 12 pts = 1 mile
    rules: [
      { description: "外幣簽賬 $4/里 (3%*)", matchType: "base", percentage: 2.25, isForeignCurrency: true }, // $20000/m for $3/mile promo often active
      { description: "本地簽賬 $8/里 (1.1%)", matchType: "base", percentage: 1.1, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["旅遊", "里數"],
    sellingPoints: ["外幣簽賬低至 HK$3/里 (需滿額)", "免費享用機場貴賓室"],
  },
  {
    id: "citi-prestige",
    name: "Citi Prestige Card",
    bank: "Citi",
    style: { bgColor: "bg-gradient-to-br from-gray-700 to-gray-900", textColor: "text-white" },
    imageUrl: "https://www.citibank.com.hk/chinese/credit-cards/images/prestige-card.png",
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 0.0833, currency: 'Points' }, // 12 pts = 1 mile
    rules: [
      { description: "海外簽賬 $4/里", matchType: "base", percentage: 2.5, isForeignCurrency: true }, // 3pts/$ * 0.0833 = 0.25 miles/$ -> $4/mile
      { description: "本地簽賬 $6/里", matchType: "base", percentage: 1.67, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] }, // 2pts/$ * 0.0833 = 0.166 miles/$ -> $6/mile
    ],
    tags: ["高端", "年費卡"],
    sellingPoints: ["任何酒店第 4 晚免費", "無限次使用機場貴賓室", "年資獎賞"],
  },

  // ========================================================================
  // DBS 星展
  // ========================================================================
  {
    id: "dbs-eminent",
    name: "DBS Eminent Card",
    bank: "DBS",
    style: { bgColor: "bg-gradient-to-br from-gray-600 to-gray-900", textColor: "text-white" },
    imageUrl: "https://www.dbs.com.hk/personal/credit-cards/credit-cards/eminent-card/images/card_face_eminent_visa_signature.png",
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "餐飲 5% (單筆滿$300)", matchType: "category", matchValue: "dining", percentage: 5.0, minSpend: 300, cap: 8000, capType: "spending" },
      { description: "健身/運動 5% (單筆滿$300)", matchType: "category", matchValue: ["sports", "gym"], percentage: 5.0, minSpend: 300, cap: 8000, capType: "spending" },
      { description: "醫療 5% (單筆滿$300)", matchType: "category", matchValue: "medical", percentage: 5.0, minSpend: 300, cap: 8000, capType: "spending" },
      { description: "基本回饋 1%", matchType: "base", percentage: 1.0, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["餐飲5%", "健身5%"],
    welcomeOfferText: "迎新高達 $1,000 回贈",
    sellingPoints: ["餐飲、健身、醫療 5% 回贈 (單筆滿$300)", "基本簽賬 1%"],
    note: "⚠️ 餐飲/健身/醫療 5% 需單筆消費滿 $300！未滿 $300 只有 1% 基本回贈。每月上限簽 $8,000。",
  },
  {
    id: "dbs-black",
    name: "DBS Black World Mastercard",
    bank: "DBS",
    style: { bgColor: "bg-black", textColor: "text-white" },
    imageUrl: "https://www.dbs.com.hk/personal/credit-cards/credit-cards/black-card/images/card_face_black_world_master.png",
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'direct_rate', baseRate: 6, currency: 'DBS$' }, // $6/mile standard
    rules: [
      { description: "外幣簽賬 $4/里", matchType: "base", percentage: 2.5, isForeignCurrency: true }, // ~2.5% value
      { description: "本地簽賬 $6/里", matchType: "base", percentage: 1.6, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] }, // ~1.6% value
    ],
    tags: ["儲里數", "里數神卡"],
    sellingPoints: ["積分無限期", "兌換里數免手續費", "外幣 HK$4/里"],
  },
  {
    id: "dbs-live-fresh",
    name: "DBS Live Fresh",
    bank: "DBS",
    style: { bgColor: "bg-gradient-to-br from-lime-300 to-lime-500", textColor: "text-black" },
    imageUrl: "https://www.dbs.com.hk/personal/credit-cards/credit-cards/live-fresh-card/images/card_face_live_fresh.png",
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "自選類別 (網購) 6%", matchType: "category", matchValue: "online", percentage: 6.0, excludeCategories: ["ewallet"], cap: 150, capType: "reward" }, // $150 reward cap for extra 5%
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["網購6%", "自選類別"],
    sellingPoints: ["自選回贈類別高達 6% (如網上娛樂、超市)", "適合年輕人"],
    note: "⚠️ 自選類別 6% 需每月登記！每月回贈上限 $150。未登記只有 0.4% 基本回贈。",
  },
  {
    id: "dbs-compass",
    name: "DBS COMPASS VISA",
    bank: "DBS",
    style: { bgColor: "bg-gradient-to-br from-red-500 to-red-700", textColor: "text-white" },
    imageUrl: "https://www.dbs.com.hk/personal/credit-cards/credit-cards/compass-visa/images/card_face_compass_visa.png",
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "星期三超市/淘寶 10%", matchType: "category", matchValue: ["supermarket", "online"], percentage: 10.0, validDays: [3] }, // Wednesday (0=Sun, 3=Wed)
      { description: "指定日子超市/淘寶 1% (非週三)", matchType: "category", matchValue: ["supermarket", "online"], percentage: 1.0 },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["超市10%", "淘寶"],
    sellingPoints: ["逢星期三超市/淘寶 10% 回贈 (需登記)", "每月 2/12/22 日 Flexi-Shopping 免手續費"],
    note: "⚠️ 週三超市/淘寶 10% 需每月登記！未登記只有 1% 回贈。",
  },

  // ========================================================================
  // AEON
  // ========================================================================
  {
    id: "aeon-wakuwaku",
    name: "AEON CARD WAKUWAKU",
    bank: "AEON",
    style: { bgColor: "bg-gradient-to-br from-pink-400 to-pink-600", textColor: "text-white" },
    imageUrl: "https://www.aeon.com.hk/wakuwaku/images/card_face.png",
    foreignCurrencyFee: 1.95,
    rules: [
      // 每月20日 AEON 會員日 95折 - 折扣優惠，非回贈
      { description: "每月20日 AEON 95折", matchType: "merchant", matchValue: ["aeon"], percentage: 5.0, validDates: [20], isDiscount: true },
      { description: "網上簽賬 6%", matchType: "category", matchValue: "online", percentage: 6.0, cap: 300, capType: "reward", excludeCategories: ["ewallet"] }, // $300 reward cap
      { description: "日本簽賬 3%", matchType: "base", percentage: 3.0, isForeignCurrency: true },
      { description: "基本回饋 0.5%", matchType: "base", percentage: 0.5, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["網購6%", "日本3%", "AEON會員日"],
    welcomeOfferText: "迎新高達 16% 回贈",
    sellingPoints: ["每月20日 AEON 95折 [折扣]", "網上簽賬 6% 現金回贈", "日本簽賬 3%", "永久免年費"],
    note: "⚠️ 每月20日 AEON 95折是購物時直接減價，非事後回贈。網上簽賬 6% 每月回贈上限 $300。日本簽賬 3% 僅限日圓交易。",
  },
  {
    id: "aeon-card-jal",
    name: "AEON Card JAL",
    bank: "AEON",
    style: { bgColor: "bg-gradient-to-br from-red-600 to-red-800", textColor: "text-white" },
    imageUrl: "https://www.aeon.com.hk/tc/privileges/promotion_images/jal_mastercard_card_face.png",
    foreignCurrencyFee: 0,
    rewardConfig: { method: 'conversion', ratio: 12.5, currency: 'Points' }, // AEON Points -> JAL Miles? No, usually direct JAL miles $8/mile
    // Actually AEON JAL has separate program. $8 = 1 Mile. $6 = 1 Mile overseas.
    // Let's use direct_rate
    // Wait, it earns "AEON Points" but special rate? Or just direct? 
    // It's $8 spending = 1 Mile.
    rules: [
      { description: "日本簽賬 $6/里", matchType: "base", percentage: 1.67, isForeignCurrency: true },
      { description: "本地餐飲/海外 $8/里", matchType: "category", matchValue: ["dining"], percentage: 1.25 },
      { description: "基本回饋 $8/里", matchType: "base", percentage: 1.25, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] }
    ],
    tags: ["日本旅遊", "JAL"],
    sellingPoints: ["日圓簽賬 $6 = 1 里", "JAL 機艙銷售 9 折"],
  },

  // ========================================================================
  // BEA 東亞
  // ========================================================================
  {
    id: "bea-goal",
    name: "BEA GOAL Credit Card",
    bank: "東亞銀行",
    style: { bgColor: "bg-gradient-to-br from-purple-500 to-purple-700", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      // 手機支付/網購 4% (單筆 $2,000-$5,556)
      { description: "手機支付 4% ($2000-$5556)", matchType: "paymentMethod", matchValue: ["mobile"], percentage: 4.0, minSpend: 2000, cap: 5556, capType: "spending", excludeCategories: ["ewallet"] },
      { description: "網購 4% ($2000-$5556)", matchType: "category", matchValue: "online", percentage: 4.0, minSpend: 2000, cap: 5556, capType: "spending", excludeCategories: ["ewallet"] },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["手機支付", "網購"],
    sellingPoints: ["手機支付及網購 4% 回贈", "單筆 $2,000-$5,556 享優惠"],
    note: "⚠️ 手機支付/網購 4% 需單筆消費 $2,000-$5,556！未滿 $2,000 或超過 $5,556 部分只有 0.4%。",
  },
  {
    id: "bea-world-master",
    name: "BEA Flyer World Mastercard",
    bank: "東亞銀行",
    style: { bgColor: "bg-gradient-to-br from-sky-600 to-blue-800", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'direct_rate', baseRate: 5, currency: 'Miles' }, // $5/mile
    rules: [
      { description: "本地簽賬 $5/里 (2%)", matchType: "base", percentage: 2.0, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
      { description: "海外簽賬 $5/里 (2%)", matchType: "base", percentage: 2.0, isForeignCurrency: true },
    ],
    tags: ["里數", "Flyer"],
    sellingPoints: ["本地簽賬低至 HK$5/里", "積分無限期", "亞洲萬里通直接入賬"],
    applyUrl: "https://www.hkbea.com/html/tc/bea-flyer-world-mastercard.html",
  },
  {
    id: "bea-i-titanium",
    name: "BEA i-Titanium Card",
    bank: "BEA",
    style: { bgColor: "bg-gradient-to-br from-gray-400 to-gray-600", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "網上簽賬 3.4%", matchType: "category", matchValue: "online", percentage: 3.4, excludeCategories: ["ewallet"] },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["網購", "老牌"],
    sellingPoints: ["網上購物 3.4% 回贈", "優先預訂演唱會票"],
  },

  // ========================================================================
  // PrimeCredit 安信 / WeWa
  // ========================================================================
  {
    id: "earnmore",
    name: "EarnMORE 銀聯卡",
    bank: "WeWa",
    style: { bgColor: "bg-gradient-to-br from-blue-600 to-indigo-700", textColor: "text-white" },
    imageUrl: "https://www.primecredit.com/credit-card/images/earnmore_card_face.png",
    rewardTimeline: "現金回贈即時入賬",
    foreignCurrencyFee: 0,
    rules: [
      { description: "週五六日 3%", matchType: "base", percentage: 3.0, validDays: [5, 6, 0], cap: 150000, capType: "spending", excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
      { description: "全方位 2%", matchType: "base", percentage: 2.0, cap: 150000, capType: "spending", excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] }, // $150000 spending cap
      { description: "八達通自動增值 2%", matchType: "category", matchValue: ["ewallet"], percentage: 2.0 },
    ],
    tags: ["全方位2%", "懶人必備", "週末3%"],
    welcomeOfferText: "迎新送按摩椅或 $500 回贈",
    sellingPoints: ["週五六日 3% 回贈", "全方位 2% 回贈", "八達通自動增值 2%", "免外幣手續費"],
  },
  {
    id: "wewa-unionpay",
    name: "WeWa 銀聯卡",
    bank: "WeWa",
    style: { bgColor: "bg-gradient-to-br from-yellow-300 to-yellow-500", textColor: "text-black" },
    imageUrl: "https://www.wewacard.com/images/card_face.png",
    foreignCurrencyFee: 0,
    rules: [
      { description: "旅遊/主題公園/戲院/卡拉OK 4%", matchType: "category", matchValue: ["travel", "entertainment"], percentage: 4.0, cap: 2000, capType: "reward" }, 
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["娛樂4%", "旅遊4%"],
    sellingPoints: ["旅遊、主題公園、戲院 4% 回贈", "免外幣手續費"],
  },

  // ========================================================================
  // Dah Sing 大新
  // ========================================================================
  {
    id: "dahsing-one",
    name: "大新 ONE+ 白金卡",
    bank: "大新銀行",
    style: { bgColor: "bg-gradient-to-br from-purple-800 to-purple-950", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "全方位 1%", matchType: "base", percentage: 1.0, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["無腦1%", "現金回贈"],
    sellingPoints: ["本地及外幣簽賬一律 1% 回贈", "無上限"],
  },
  {
    id: "dahsing-ba",
    name: "British Airways Platinum Card",
    bank: "Dah Sing",
    style: { bgColor: "bg-gradient-to-br from-blue-800 to-blue-950", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 16.6666, currency: 'Avios' }, // Approx? Need to check strictly.
    rules: [
      { description: "本地簽賬 $6/Avios", matchType: "base", percentage: 1.67, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
      { description: "海外簽賬 $4/Avios", matchType: "base", percentage: 2.5, isForeignCurrency: true },
    ],
    tags: ["Avios", "英航"],
    sellingPoints: ["本地簽賬 HK$6 = 1 Avios", "生日當天 HK$6 = 2 Avios"],
  },

  // ========================================================================
  // CCB (Asia) 建行(亞洲) & ICBC 工銀亞洲
  // ========================================================================
  {
    id: "ccb-eye",
    name: "CCB (Asia) eye Card",
    bank: "CCB",
    style: { bgColor: "bg-gradient-to-br from-pink-300 to-pink-500", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "網購/PayWave 2%", matchType: "category", matchValue: ["online", "paymentMethod"], percentage: 2.0, cap: 300000, capType: "spending", excludeCategories: ["ewallet"] }, // 300,000 points cap
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["網購", "感應式支付"],
    sellingPoints: ["網購及感應式支付 5X 積分 (2%)", "積分永久有效"],
  },
  {
    id: "icbc-horoscope",
    name: "ICBC Horoscope Visa Signature",
    bank: "ICBC",
    style: { bgColor: "bg-gradient-to-br from-indigo-800 to-purple-900", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "本地/海外簽賬 1.5%", matchType: "base", percentage: 1.5, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["星座卡", "高回贈"],
    sellingPoints: ["本地及海外簽賬 1.5% 現金回贈", "自選星座設計"],
  },

  // ========================================================================
  // Other Banks (CNCBI, Fubon, Chong Hing, Public, Shanghai Comm)
  // ========================================================================
  {
    id: "cncbi-motion",
    name: "CNCBI Motion Credit Card",
    bank: "CNCBI",
    style: { bgColor: "bg-gradient-to-br from-orange-500 to-red-600", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "餐飲/網上 6%", matchType: "category", matchValue: ["dining", "online"], percentage: 6.0, cap: 3600, capType: "spending", excludeCategories: ["ewallet"] }, // $3600 spending cap
      { description: "基本回饋 0.5%", matchType: "base", percentage: 0.5, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["餐飲6%", "網購6%"],
    sellingPoints: ["餐飲及網上簽賬 6% 現金回贈", "回贈每月上限較高"],
  },
  {
    id: "fubon-titanium",
    name: "Fubon Titanium Card",
    bank: "Fubon",
    style: { bgColor: "bg-gradient-to-br from-blue-800 to-indigo-900", textColor: "text-white" },
    imageUrl: "https://www.fubonbank.com.hk/web/html/cc_platinum_card_face.png",
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "日韓台 8% (20X) (需登記)", matchType: "base", percentage: 8.0, isForeignCurrency: true, minSpend: 2000 },
      { description: "本地簽賬 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["日韓台8%", "旅遊神卡"],
    sellingPoints: ["日本、韓國、台灣簽賬高達 20X 積分 (8%)", "需要登記及符合最低簽賬"],
    note: "⚠️ 日韓台 8% 需每月登記及單筆滿 $2,000！未符合條件只有 0.4% 基本回贈。",
  },
  {
    id: "amex-explorer",
    name: "Amex Explorer",
    bank: "American Express",
    style: { bgColor: "bg-slate-800", textColor: "text-white" },
    imageUrl: "https://www.americanexpress.com/content/dam/amex/hk/en/staticassets/card-art/Explorer-Credit-Card/480x304_Explorer_Card_Art_Di_No_Name.png",
    foreignCurrencyFee: 2.0,
    rewardConfig: { method: 'conversion', ratio: 16.6666, currency: 'Points' }, // 18 pts = 1 mile (approx $6/mile local, but earn rate is 3X/5X)
    // Actually Amex Explorer earns 3 pts per HK$1 (local) -> 3/18 = 1/6 mile ($6/mile).
    // 3.75 pts per HK$1 (Foreign) -> 3.75/18 = ~0.2 miles ($4.8/mile)
    // 5 pts per HK$1 (Selected) -> 5/18 = 0.27 miles ($3.6/mile)
    // Wait, Ratio is: How many points = 1 Mile?
    // Usually 15 or 18 points = 1 Mile. Let's assume 18.
    // Then percentage should be points earning rate.
    rules: [
      { description: "指定簽賬 $3.6/里", matchType: "category", matchValue: ["online", "travel", "airline"], percentage: 5.0, excludeCategories: ["ewallet"] }, // 5 pts/$
      { description: "外幣簽賬 $4.8/里", matchType: "base", percentage: 3.75, isForeignCurrency: true }, // 3.75 pts/$
      { description: "本地簽賬 $6/里", matchType: "base", percentage: 3.0, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] }, // 3 pts/$
    ],
    tags: ["里數", "旅遊保險"],
    sellingPoints: ["積分無限期", "指定簽賬 HK$3.6/里", "免費旅遊保險及貴賓室 (年費豁免)"],
  },
  {
    id: "mox-credit",
    name: "Mox Credit",
    bank: "Mox",
    style: { bgColor: "bg-gradient-to-br from-teal-400 to-cyan-600", textColor: "text-white" },
    imageUrl: "https://mox.com/images/cards/mox-card-black-front.png",
    foreignCurrencyFee: 0,
    rules: [
      { description: "指定超市 3% (惠康/百佳/AEON/HKTVmall等)", matchType: "merchant", matchValue: ["wellcome", "parknshop", "aeon", "hktvmall", "donki", "759"], percentage: 3.0 },
      { description: "基本回饋 1% (無上限)", matchType: "base", percentage: 1.0 },
    ],
    tags: ["超市3%", "虛擬銀行", "無上限1%"],
    sellingPoints: ["指定超市 3% 現金回贈 (無上限)", "所有簽賬 1% (無上限)", "免外幣手續費"],
  },
  {
    id: "sim-credit-card",
    name: "sim Credit Card",
    bank: "sim",
    style: { bgColor: "bg-gradient-to-br from-purple-800 to-purple-950", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "網購 8%", matchType: "category", matchValue: "online", percentage: 8.0, cap: 200, capType: "reward", excludeCategories: ["ewallet"] }, 
      { description: "指定商戶 3%", matchType: "merchant", matchValue: ["mcdonalds", "adidas"], percentage: 3.0 },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["網購8%", "新卡"],
    sellingPoints: ["網上簽賬高達 8% 回贈", "門檻低"],
  },
  // === 新增卡片 ===
  {
    id: "citi-octopus",
    name: "Citi 八達通白金卡",
    bank: "Citi",
    style: { bgColor: "bg-gradient-to-br from-orange-500 to-orange-700", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "八達通自動增值 0.5%", matchType: "paymentMethod", matchValue: ["octopus"], percentage: 0.5 },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4 },
    ],
    tags: ["八達通", "交通"],
    sellingPoints: ["內置八達通功能", "自動增值 0.5% 回贈", "方便日常交通消費"],
  },
  {
    id: "ccb-travo",
    name: "建行(亞洲) TRAVO Mastercard",
    bank: "建行(亞洲)",
    style: { bgColor: "bg-gradient-to-br from-sky-600 to-blue-800", textColor: "text-white" },
    foreignCurrencyFee: 0,
    rewardConfig: { method: 'direct_rate', baseRate: 6, currency: 'AM' }, // $6/mile standard, $1.5/mile overseas
    rules: [
      { description: "海外/內地簽賬 4%", matchType: "base", percentage: 4.0, isForeignCurrency: true },
      { description: "本地餐飲 2%", matchType: "category", matchValue: ["dining"], percentage: 2.0 },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4 },
    ],
    tags: ["旅遊4%", "餐飲2%", "免外幣手續費"],
    sellingPoints: ["海外及內地簽賬 4% 回贈 (或 $1.5=1里)", "本地餐飲 2% 回贈 (或 $3=1里)", "免外幣手續費", "送旅遊保險"],
  },
  {
    id: "dahsing-myauto",
    name: "大新 My Auto 信用卡",
    bank: "大新銀行",
    style: { bgColor: "bg-gradient-to-br from-blue-600 to-blue-800", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "油站 4%", matchType: "category", matchValue: ["petrol"], percentage: 4.0 },
      { description: "汽車相關 4%", matchType: "merchant", matchValue: ["shell", "esso", "caltex", "sinopec"], percentage: 4.0 },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4 },
    ],
    tags: ["油站4%", "汽車"],
    sellingPoints: ["油站簽賬 4% 回贈", "汽車相關消費優惠", "專為車主而設"],
  },

  // ========================================================================
  // 新增卡片 (2024-2025)
  // ========================================================================
  {
    id: "hsbc-easy",
    name: "HSBC Easy Card",
    bank: "HSBC",
    style: { bgColor: "bg-gradient-to-br from-red-500 to-red-700", textColor: "text-white" },
    rewardTimeline: "獎賞錢即時入賬",
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 10, currency: 'RC' },
    rules: [
      // 百佳 92折日 (每月2/12/22日，需滿$100) - 折扣優惠，非回贈
      { description: "百佳 92折 (2/12/22號)", matchType: "merchant", matchValue: ["parknshop"], percentage: 8.0, validDates: [2, 12, 22], isDiscount: true, minSpend: 100 },
      // 屈臣氏 92折日 (每月8/18/28日，需滿$400) - 折扣優惠，非回贈
      { description: "屈臣氏 92折 (8/18/28號)", matchType: "merchant", matchValue: ["watsons"], percentage: 8.0, validDates: [8, 18, 28], isDiscount: true, minSpend: 400 },
      // 豐澤 95折日 (1/5/8/12月的10日，需滿$2,000) - 折扣優惠，非回贈
      { description: "豐澤 95折 (每月10號)", matchType: "merchant", matchValue: ["fortress"], percentage: 5.0, validDates: [10], isDiscount: true, minSpend: 2000 },
      // VIP會員 6倍易賞錢 (2.4%) - 回贈
      { description: "百佳/屈臣氏/豐澤 VIP 2.4%", matchType: "merchant", matchValue: ["parknshop", "watsons", "fortress"], percentage: 2.4 },
      // 最紅自主獎賞 (需登記) - 回贈
      { description: "最紅自主獎賞 2.4%", matchType: "category", matchValue: ["dining", "supermarket", "lifestyle", "home", "entertainment"], percentage: 2.4, cap: 25000, capType: "spending" },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["易賞錢", "百佳", "屈臣氏", "折扣日"],
    feeWaiverCondition: "首兩年免年費",
    welcomeOfferText: "迎新簽 $5,800 送 $600 獎賞錢",
    applyUrl: "https://www.hsbc.com.hk/zh-hk/credit-cards/products/easy/",
    sellingPoints: ["百佳 92折 (每月2/12/22號) [折扣]", "屈臣氏 92折 (每月8/18/28號) [折扣]", "VIP會員 6倍易賞錢 (2.4%)", "最紅自主獎賞 2.4%"],
    note: "⚠️ 折扣優惠：百佳92折需滿$100 (2/12/22號)、屈臣氏92折需滿$400 (8/18/28號)、豐澤95折需滿$2,000。折扣是購物時直接減價，非事後回贈。需綁定「易賞錢」App。",
  },
  {
    id: "citi-hktvmall",
    name: "Citi HKTVmall 信用卡",
    bank: "Citi",
    style: { bgColor: "bg-gradient-to-br from-green-500 to-green-700", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      // HKTVmall 5% (需每月登記)
      { description: "HKTVmall 5%", matchType: "merchant", matchValue: ["hktvmall"], percentage: 5.0, cap: 300, capType: "reward" },
      // 指定日子 HKTVmall 額外優惠
      { description: "基本回饋 1%", matchType: "base", percentage: 1.0, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["HKTVmall", "網購"],
    welcomeOfferText: "迎新高達 $1,000 HKTVmall 電子購物禮券",
    applyUrl: "https://www.citibank.com.hk/chinese/credit-cards/citi-hktvmall-card.html",
    sellingPoints: ["HKTVmall 5% 回贈 (每月上限$300)", "迎新送 HKTVmall 禮券", "基本簽賬 1%"],
    note: "⚠️ HKTVmall 5% 需每月登記！每月回贈上限 $300。未登記只有 1% 基本回贈。",
  },
  {
    id: "fubon-yata",
    name: "富邦一田 Visa 白金卡",
    bank: "Fubon",
    style: { bgColor: "bg-gradient-to-br from-purple-600 to-purple-800", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      // 一田 VIP Day 95折 - 折扣優惠，非回贈
      { description: "一田 VIP Day 95折", matchType: "merchant", matchValue: ["yata"], percentage: 5.0, isDiscount: true },
      // 一田平日 2% 回贈
      { description: "一田 2%", matchType: "merchant", matchValue: ["yata"], percentage: 2.0 },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["一田", "百貨公司", "VIP Day"],
    welcomeOfferText: "迎新送一田購物禮券",
    applyUrl: "https://www.fubonbank.com.hk/tc/cards/bonus-points-program/yata-credit-card.html",
    sellingPoints: ["一田 VIP Day 95折 [折扣]", "一田平日 2% 回贈", "一田專屬優惠"],
    note: "⚠️ 一田 VIP Day 95折是購物時直接減價，非事後回贈。一田平日消費享 2% 回贈。需配合一田會員使用。",
  },

  // ========================================================================
  // 新增卡片 - 2024-12 批次
  // ========================================================================
  {
    id: "fubon-platinum",
    name: "富邦白金卡",
    bank: "富邦銀行",
    style: { bgColor: "bg-gradient-to-br from-blue-700 to-blue-900", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "本地簽賬 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["基本卡"],
    sellingPoints: ["基本回贈", "免首年年費"],
    applyUrl: "https://www.fubonbank.com.hk/tc/cards/credit-card-products/platinum-card.html",
  },
  {
    id: "fubon-visa-infinite",
    name: "富邦 Visa Infinite 卡",
    bank: "富邦銀行",
    style: { bgColor: "bg-gradient-to-br from-slate-800 to-black", textColor: "text-yellow-400" },
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "海外簽賬 3%", matchType: "base", percentage: 3.0, isForeignCurrency: true },
      { description: "本地簽賬 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["高端卡", "旅遊"],
    sellingPoints: ["海外簽賬 3% 回贈", "機場貴賓室", "旅遊保險"],
    applyUrl: "https://www.fubonbank.com.hk/tc/cards/credit-card-products/visa-infinite-card.html",
  },
  {
    id: "fubon-incard",
    name: "富邦 iN VISA 白金卡",
    bank: "富邦銀行",
    style: { bgColor: "bg-gradient-to-br from-pink-500 to-purple-600", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      // 網上簽賬 8% (需每月登記，每月首 $10,000 簽賬)
      { description: "網上簽賬 8% (需登記)", matchType: "category", matchValue: "online", percentage: 8.0, cap: 10000, capType: "spending", excludeCategories: ["ewallet"] },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["網購8%", "年輕人"],
    sellingPoints: ["網上簽賬 8% 回贈 (需每月登記)", "永久免年費", "適合年輕人"],
    applyUrl: "https://www.fubonbank.com.hk/tc/cards/credit-card-products/incard.html",
    note: "⚠️ 網上簽賬 8% 需每月登記！每月首 $10,000 網上簽賬享 8%，超出部分為 0.4%。未登記只有 0.4% 基本回贈。",
  },
  {
    id: "cncbi-gba",
    name: "信銀國際大灣區雙幣信用卡",
    bank: "信銀國際",
    style: { bgColor: "bg-gradient-to-br from-red-600 to-red-800", textColor: "text-white" },
    foreignCurrencyFee: 0,
    rules: [
      { description: "內地簽賬 4%", matchType: "base", percentage: 4.0, isForeignCurrency: true },
      { description: "本地簽賬 0.55%", matchType: "base", percentage: 0.55, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["大灣區", "北上", "免手續費"],
    sellingPoints: ["內地簽賬 4% 回贈", "人民幣/港幣雙幣", "免外幣手續費"],
    applyUrl: "https://www.cncbinternational.com/personal/credit-cards/gba-dual-currency-credit-card/tc/index.jsp",
    note: "內地簽賬 4% 回贈無上限。適合經常北上消費的用戶。",
  },
  {
    id: "sc-apoint",
    name: "渣打 A. Point Card",
    bank: "Standard Chartered",
    style: { bgColor: "bg-gradient-to-br from-orange-500 to-orange-700", textColor: "text-white" },
    foreignCurrencyFee: 0,
    rewardConfig: { method: 'conversion', ratio: 1000, currency: 'A. Point' }, // 1000 A. Point = $1
    rules: [
      // AlipayHK 跨境商戶 (北上/淘寶): 20個 A. Point/$1 = 2%
      { description: "AlipayHK 跨境/北上 2% (20 A. Point/$1)", matchType: "paymentMethod", matchValue: ["alipay"], percentage: 2.0, isForeignCurrency: true },
      // 實體卡/電子錢包簽賬: 10個 A. Point/$1 = 1%
      { description: "實體卡/電子錢包 1% (10 A. Point/$1)", matchType: "base", percentage: 1.0, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
      // AlipayHK 本地合資格簽賬: 2個 A. Point/$1 = 0.2%
      { description: "AlipayHK 本地 0.2% (2 A. Point/$1)", matchType: "paymentMethod", matchValue: ["alipay"], percentage: 0.2 },
    ],
    tags: ["AlipayHK", "北上2%", "淘寶免手續費"],
    sellingPoints: ["AlipayHK 北上/跨境 2% (20 A. Point/$1)", "實體卡簽賬 1% (10 A. Point/$1)", "淘寶首5筆免手續費", "免外幣手續費"],
    applyUrl: "https://www.sc.com/hk/zh/credit-cards/apointcard/",
    note: "⚠️ 需連結 AlipayHK 使用！北上/跨境消費透過 AlipayHK 可享 2%。實體卡簽賬 1%。AlipayHK 本地消費只有 0.2%。淘寶每月首5筆免手續費。",
  },
  {
    id: "boc-taobao",
    name: "中銀淘寶 World 萬事達卡",
    bank: "中銀香港",
    style: { bgColor: "bg-gradient-to-br from-orange-400 to-red-500", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "淘寶/天貓 4%", matchType: "merchant", matchValue: ["taobao", "tmall"], percentage: 4.0 },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["淘寶", "網購"],
    sellingPoints: ["淘寶/天貓簽賬 4% 回贈", "專為淘寶用戶而設"],
    applyUrl: "https://www.bochk.com/tc/creditcard/products/taobao.html",
  },
  {
    id: "hangseng-muji",
    name: "恒生 MUJI Card",
    bank: "恒生銀行",
    style: { bgColor: "bg-gradient-to-br from-stone-600 to-stone-800", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "MUJI 5%", matchType: "merchant", matchValue: ["muji"], percentage: 5.0 },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["MUJI", "生活品味"],
    sellingPoints: ["MUJI 簽賬 5% 回贈", "MUJI 專屬優惠", "無印良品愛好者必備"],
    applyUrl: "https://www.hangseng.com/zh-hk/personal/cards/products/co-branded/muji-card/",
  },
  {
    id: "hangseng-platinum",
    name: "恒生白金卡",
    bank: "恒生銀行",
    style: { bgColor: "bg-gradient-to-br from-gray-500 to-gray-700", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["基本卡"],
    sellingPoints: ["基本回贈", "入門信用卡"],
    applyUrl: "https://www.hangseng.com/zh-hk/personal/cards/products/platinum-card/",
  },
];
