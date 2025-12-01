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
      { description: "最紅自主獎賞 (類別) 3.6% ($2.78/里)", matchType: "category", matchValue: ["dining", "supermarket", "lifestyle", "home", "entertainment"], percentage: 3.6, cap: 100000, capType: "spending" },
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
      // 指定商戶 8% (每月首$1,250): 壽司郎/譚仔/The Coffee Academïcs/GU/Decathlon/lululemon/NAMCO/TAITO
      { description: "指定商戶 8% (壽司郎/譚仔等)", matchType: "merchant", matchValue: ["sushiro", "tamjai", "tamjai_yunnan", "coffee_academics", "gu", "decathlon", "lululemon", "namco", "taito"], percentage: 8.0, cap: 1250, capType: "spending" },
      { description: "網上簽賬 4% (每月首$10,000)", matchType: "category", matchValue: "online", percentage: 4.0, cap: 10000, capType: "spending" },
      { description: "超市簽賬 2%", matchType: "category", matchValue: "supermarket", percentage: 2.0 },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "payme", "alipay", "wechat_pay"] }, 
    ],
    tags: ["網購神卡", "超市必備", "永久免年費", "指定商戶8%"],
    feeWaiverCondition: "永久免年費",
    welcomeOfferText: "迎新簽 $8,000 送 $800 獎賞錢",
    applyUrl: "https://www.hsbc.com.hk/zh-hk/credit-cards/products/red/",
    sellingPoints: ["指定商戶 8% (壽司郎/譚仔/GU/Decathlon等)", "網上簽賬 4% (每月首$10,000)", "超市 2%", "永久免年費"],
    note: "網上簽賬 4% 每月首 $10,000，其後 0.4%。指定商戶 8% 每月首 $1,250。",
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
      { description: "手機支付 5%", matchType: "paymentMethod", matchValue: ["mobile", "boc_pay"], percentage: 5.0, cap: 150, capType: "reward", excludeCategories: ["ewallet"] },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["娛樂10%", "BoC Pay", "週末娛樂12%"],
    welcomeOfferText: "迎新簽 $5,000 送 $500 現金回贈",
    sellingPoints: ["週五六日影視娛樂 12%", "影視娛樂 10%", "手機支付 5%", "永久免年費"],
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
      { description: "週二 SOGO 8%", matchType: "merchant", matchValue: ["sogo"], percentage: 8.0, validDays: [2] },
      { description: "手機支付 5% (SOGO)", matchType: "merchant", matchValue: ["sogo"], percentage: 5.5 },
      { description: "手機支付 5%", matchType: "paymentMethod", matchValue: "mobile", percentage: 5.0, cap: 100, capType: "reward", excludeCategories: ["ewallet"] },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["手機支付5%", "SOGO", "週二SOGO"],
    sellingPoints: ["週二 SOGO 8% 回贈", "手機支付 5% 現金回贈", "崇光百貨全年 5%"],
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
      { description: "手機支付/網購 10X (4% / $3.75/里)", matchType: "category", matchValue: ["online", "paymentMethod"], percentage: 4.0, cap: 11111, capType: "spending", excludeCategories: ["ewallet"] }, 
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["網購4%", "手機支付4%"],
    sellingPoints: ["網上及手機支付 10X 積分 (4%)", "每月額外積分上限 10,000 分"],
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
      { description: "手機支付 5% (需月簽賬滿$5,000)", matchType: "paymentMethod", matchValue: "mobile", percentage: 5.0, minSpend: 5000, cap: 500, capType: "reward", excludeCategories: ["ewallet"] },
      { description: "外幣簽賬 6% (需月簽賬滿$5,000)", matchType: "base", percentage: 6.0, minSpend: 5000, isForeignCurrency: true, cap: 500, capType: "reward" },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["網購5%", "手機支付5%", "必須登記"],
    welcomeOfferText: "迎新簽 $5,000 送 $700 Fun Dollars",
    sellingPoints: ["網購及手機支付 5% (需月簽賬滿$5,000)", "外幣 6%", "每月簽賬滿額解鎖"],
    note: "⚠️ 需月簽賬滿 $5,000 才享 5%/6% 回贈！未滿額只有 0.4% 基本回贈。需每月登記。",
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
      { description: "週三超市 5% (惠康/百佳/萬寧)", matchType: "merchant", matchValue: ["wellcome", "parknshop", "mannings"], percentage: 5.0, validDays: [3] },
      { description: "惠康/百佳 3X yuu積分 (1.5%)", matchType: "merchant", matchValue: ["wellcome", "parknshop"], percentage: 1.5 },
      { description: "萬寧 3X yuu積分 (1.5%)", matchType: "merchant", matchValue: ["mannings"], percentage: 1.5 },
      { description: "特約食肆 4X (2%)", matchType: "merchant", matchValue: ["mcdonalds", "kfc", "maxims", "pizzahut", "starbucks"], percentage: 2.0 },
      { description: "基本回饋 1X yuu積分 (0.5%)", matchType: "base", percentage: 0.5, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["儲分", "食肆優惠", "週三超市"],
    sellingPoints: ["週三惠康/百佳/萬寧 5%", "惠康/百佳 3X yuu 積分", "yuu 積分可當現金使用"],
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
      { description: "流動支付 5X (2% / $3/里)", matchType: "paymentMethod", matchValue: ["mobile"], percentage: 2.0, cap: 50000, capType: "spending", excludeCategories: ["ewallet"] }, // Max 50,000 points
      { description: "超市/百貨 5X", matchType: "category", matchValue: ["supermarket", "department_store"], percentage: 2.0 },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["ApplePay之選", "積分"],
    welcomeOfferText: "迎新簽 $10,000 送 20,000 里數",
    sellingPoints: ["流動支付 5X 積分 ($3/里)", "積分永不過期"],
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
      { description: "每月20日 AEON 5%", matchType: "merchant", matchValue: ["aeon"], percentage: 5.0, validDates: [20] }, // 20th of each month
      { description: "網上簽賬 6%", matchType: "category", matchValue: "online", percentage: 6.0, cap: 300, capType: "reward", excludeCategories: ["ewallet"] }, // $300 reward cap
      { description: "日本簽賬 3%", matchType: "base", percentage: 3.0, isForeignCurrency: true },
      { description: "基本回饋 0.5%", matchType: "base", percentage: 0.5, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["網購6%", "日本3%", "每月20日AEON"],
    welcomeOfferText: "迎新高達 16% 回贈",
    sellingPoints: ["每月20日 AEON 5%", "網上簽賬 6% 現金回贈", "日本簽賬 3%", "永久免年費"],
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
    bank: "BEA",
    style: { bgColor: "bg-gradient-to-br from-purple-500 to-purple-700", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "手機支付/網購 12% (迎新/推廣)", matchType: "paymentMethod", matchValue: ["mobile", "online"], percentage: 4.4, excludeCategories: ["ewallet"] },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["手機支付", "網購"],
    sellingPoints: ["手機支付及網購高達 4.4% 回贈", "PayMe/AlipayHK 增值亦有回贈"],
  },
  {
    id: "bea-world-master",
    name: "BEA Flyer World Mastercard",
    bank: "BEA",
    style: { bgColor: "bg-gradient-to-br from-sky-600 to-blue-800", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'direct_rate', baseRate: 5, currency: 'Miles' }, // $5/mile
    rules: [
      { description: "本地簽賬 $5/里", matchType: "base", percentage: 2.0, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["里數", "低門檻"],
    sellingPoints: ["本地簽賬低至 HK$5/里", "積分無限期"],
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
    name: "Dah Sing ONE+ Credit Card",
    bank: "Dah Sing",
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
    id: "bea-world",
    name: "東亞 World Mastercard",
    bank: "東亞銀行",
    style: { bgColor: "bg-gradient-to-br from-slate-800 to-slate-950", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'direct_rate', baseRate: 5, currency: 'Miles' }, // $5/mile
    rules: [
      { description: "海外簽賬 $5=1里 (2%)", matchType: "base", percentage: 2.0, isForeignCurrency: true },
      { description: "本地簽賬 $5=1里 (2%)", matchType: "base", percentage: 2.0 },
    ],
    tags: ["里數卡", "高端卡"],
    sellingPoints: ["本地及海外簽賬 $5=1里", "機場貴賓室", "旅遊保險"],
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
  {
    id: "dahsing-one-plus",
    name: "大新 ONE+ 白金卡",
    bank: "大新銀行",
    style: { bgColor: "bg-gradient-to-br from-red-600 to-red-800", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "所有簽賬 1%", matchType: "base", percentage: 1.0 },
    ],
    tags: ["全方位1%", "簡單"],
    sellingPoints: ["所有簽賬 1% 現金回贈", "無上限", "簡單易用"],
  },
];
