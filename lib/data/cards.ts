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
    rules: [
      { description: "最紅自主獎賞 (類別) 3.6%", matchType: "category", matchValue: ["dining", "supermarket", "lifestyle", "home", "entertainment"], percentage: 3.6, cap: 100000 },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["餐飲神卡", "最紅自主獎賞", "5X積分"],
    imageUrl: "https://mhgprod.blob.core.windows.net/moneyhero/strapi-uploads/HSBC_Visa_Signature_Card_774a722fef.jpg",
    feeWaiverCondition: "首兩年免年費",
    welcomeOfferText: "迎新簽 $8,000 送 $800 獎賞錢",
    welcomeOfferReward: "$800 獎賞錢",
    welcomeOfferDeadline: "2024-12-31",
    applyUrl: "https://www.hsbc.com.hk/zh-hk/credit-cards/products/visa-signature/",
    sellingPoints: ["最紅自主獎賞 5X，自選類別可達 3.6%", "Visa Signature 專屬優惠"],
  },
  {
    id: "hsbc-red",
    name: "HSBC Red Credit Card",
    bank: "HSBC",
    style: { bgColor: "bg-gradient-to-br from-red-500 via-red-600 to-pink-700", textColor: "text-white" },
    // imageUrl: "https://www.hsbc.com.hk/content/dam/hsbc/hk/images/credit-cards/red-credit-card-en.png",
    rewardTimeline: "獎賞錢即時入賬",
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "網上簽賬 4%", matchType: "category", matchValue: "online", percentage: 4.0, cap: 12500 }, // Includes Alipay spending often, but NOT top-up usually. We should exclude ewallet category if it means top-up.
      { description: "超市簽賬 2%", matchType: "category", matchValue: "supermarket", percentage: 2.0 },
      { description: "基本回饋 1%", matchType: "base", percentage: 1.0, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "payme", "alipay", "wechat_pay"] }, 
      { description: "電子錢包/繳費 0.4%", matchType: "base", percentage: 0.4 },
    ],
    tags: ["網購神卡", "超市必備", "永久免年費"],
    feeWaiverCondition: "永久免年費",
    welcomeOfferText: "迎新簽 $8,000 送 $800 獎賞錢",
    applyUrl: "https://www.hsbc.com.hk/zh-hk/credit-cards/products/red/",
    sellingPoints: ["網上簽賬 4%", "超市 2%", "永久免年費"],
  },
  {
    id: "hsbc-everymile",
    name: "HSBC EveryMile",
    bank: "HSBC",
    style: { bgColor: "bg-gradient-to-br from-stone-700 to-stone-900", textColor: "text-white" },
    rewardTimeline: "獎賞錢即時入賬",
    foreignCurrencyFee: 1.95,
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
    rules: [
      { description: "內地/澳門簽賬 (賞世界) 2.4%", matchType: "base", percentage: 2.4, isForeignCurrency: true },
      { description: "最紅自主獎賞 2.4%", matchType: "category", matchValue: "china", percentage: 2.4 },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
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
    rewardTimeline: "現金回贈於下期賬單顯示",
    foreignCurrencyFee: 0,
    rules: [
      { description: "指定商戶 5%", matchType: "merchant", matchValue: ["mcdonalds", "kfc", "hktvmall", "759", "parknshop", "watsons", "donki"], percentage: 5.0, cap: 60000 },
      { description: "基本回饋 0.56%", matchType: "base", percentage: 0.56, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["指定商戶5%", "永久免年費", "免手續費"],
    welcomeOfferText: "迎新簽 $3,500 送 $1,000 現金回贈",
    applyUrl: "https://www.sc.com/hk/zh/credit-cards/smart/",
    sellingPoints: ["指定商戶 5% 現金回贈", "永久免年費", "豁免外幣手續費"],
  },
  {
    id: "sc-cathay",
    name: "SC Cathay Mastercard",
    bank: "Standard Chartered",
    style: { bgColor: "bg-gradient-to-br from-teal-700 to-teal-900", textColor: "text-white" },
    rewardTimeline: "里數自動存入",
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "國泰/HK Express 簽賬 $2/里", matchType: "merchant", matchValue: ["cathay", "hkexpress"], percentage: 3.0 },
      { description: "餐飲/外賣/網上 $4/里", matchType: "category", matchValue: ["dining", "online"], percentage: 1.5 },
      { description: "基本回饋 $6/里", matchType: "base", percentage: 1.0, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["儲里數", "國泰"],
    sellingPoints: ["國泰航空簽賬低至 HK$2/里", "餐飲食肆 HK$4/里"],
  },
  {
    id: "sc-simply-cash",
    name: "SC Simply Cash Visa",
    bank: "Standard Chartered",
    style: { bgColor: "bg-gradient-to-br from-blue-500 to-blue-700", textColor: "text-white" },
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
    rewardTimeline: "積分",
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "影視娛樂 10%", matchType: "category", matchValue: "entertainment", percentage: 10.0, cap: 1500 },
      { description: "手機支付 5%", matchType: "paymentMethod", matchValue: ["mobile", "boc_pay"], percentage: 5.0, cap: 3000, excludeCategories: ["ewallet"] }, // Exclude Top-up
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["娛樂10%", "BoC Pay"],
    welcomeOfferText: "迎新簽 $5,000 送 $500 現金回贈",
    sellingPoints: ["影視娛樂 10%", "手機支付 5%", "永久免年費"],
  },
  {
    id: "boc-sogo",
    name: "BOC SOGO Visa Signature",
    bank: "BOC",
    style: { bgColor: "bg-gradient-to-br from-blue-700 to-blue-900", textColor: "text-white" },
    rewardTimeline: "現金回贈",
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "手機支付 5% (SOGO)", matchType: "merchant", matchValue: ["sogo"], percentage: 5.5 },
      { description: "手機支付 5%", matchType: "paymentMethod", matchValue: "mobile", percentage: 5.0, cap: 2000, excludeCategories: ["ewallet"] }, // Exclude Top-up
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["手機支付5%", "SOGO"],
    sellingPoints: ["手機支付 5% 現金回贈", "崇光百貨全年 5%"],
  },
  {
    id: "boc-cheers",
    name: "BOC Cheers Visa Infinite",
    bank: "BOC",
    style: { bgColor: "bg-gradient-to-br from-neutral-800 to-black", textColor: "text-yellow-400" },
    rewardTimeline: "積分",
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "餐飲/旅遊 10X (4%)", matchType: "category", matchValue: ["dining", "travel"], percentage: 4.0 },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["餐飲4%", "旅遊4%", "高級卡"],
    sellingPoints: ["餐飲及旅遊簽賬 10X 積分", "每年免費享用貴賓室"],
  },
  {
    id: "boc-gba",
    name: "BOC 大灣區一卡通",
    bank: "BOC",
    style: { bgColor: "bg-gradient-to-br from-blue-600 to-cyan-600", textColor: "text-white" },
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
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "手機支付/網購 10X (4%)", matchType: "category", matchValue: ["online", "paymentMethod"], percentage: 4.0, cap: 11111, excludeCategories: ["ewallet"] }, // Exclude Top-up
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
    imageUrl: "https://mhgprod.blob.core.windows.net/moneyhero/strapi-uploads/blt01c6ac63487924bd_21cb85603d.png",
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "網上簽賬 5%", matchType: "category", matchValue: "online", percentage: 5.0, minSpend: 5000, cap: 16000, excludeCategories: ["ewallet"] },
      { description: "手機支付 5%", matchType: "paymentMethod", matchValue: "mobile", percentage: 5.0, minSpend: 5000, cap: 16000, excludeCategories: ["ewallet"] },
      { description: "外幣簽賬 6%", matchType: "base", percentage: 6.0, minSpend: 5000, isForeignCurrency: true },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["網購5%", "手機支付5%", "必須登記"],
    welcomeOfferText: "迎新簽 $5,000 送 $700 Fun Dollars",
    sellingPoints: ["網購及手機支付 5%", "外幣 6%", "每月簽賬滿額解鎖"],
  },
  {
    id: "hangseng-enjoy",
    name: "Hang Seng enJoy Card",
    bank: "Hang Seng",
    style: { bgColor: "bg-gradient-to-br from-red-500 to-red-700", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "特約食肆 4X (2%)", matchType: "merchant", matchValue: ["mcdonalds", "kfc", "maxims", "pizzahut"], percentage: 2.0 },
      { description: "萬寧/惠康 3X/2X", matchType: "merchant", matchValue: ["mannings", "wellcome", "7-11", "ikea"], percentage: 1.5 },
      { description: "基本回饋 0.5%", matchType: "base", percentage: 0.5, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["儲分", "食肆優惠"],
    sellingPoints: ["特約商戶高達 4X yuu 積分", "yuu 積分可當現金使用"],
  },
  {
    id: "hangseng-travel-plus",
    name: "Hang Seng Travel+",
    bank: "Hang Seng",
    style: { bgColor: "bg-gradient-to-br from-sky-500 to-blue-600", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "外幣簽賬 7%", matchType: "base", percentage: 7.0, minSpend: 6000, isForeignCurrency: true },
      { description: "本地餐飲/交通 5%", matchType: "category", matchValue: ["dining", "transport"], percentage: 5.0, minSpend: 6000 },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["旅遊7%", "餐飲5%"],
    sellingPoints: ["外幣簽賬高達 7%", "本地餐飲及交通 5%"],
  },

  // ========================================================================
  // Citi 花旗
  // ========================================================================
  {
    id: "citi-cashback",
    name: "Citi Cash Back Card",
    bank: "Citi",
    style: { bgColor: "bg-gradient-to-br from-blue-700 to-blue-900", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "食肆/酒店 2%", matchType: "category", matchValue: ["dining", "travel"], percentage: 2.0 },
      { description: "外幣 2%", matchType: "base", percentage: 2.0, isForeignCurrency: true },
      { description: "基本回饋 1%", matchType: "base", percentage: 1.0, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["自動回贈", "餐飲2%"],
    sellingPoints: ["全球食肆及酒店 2% 回贈", "無上限，自動入賬"],
  },
  {
    id: "citi-rewards",
    name: "Citi Rewards Card",
    bank: "Citi",
    style: { bgColor: "bg-gradient-to-r from-blue-400 to-cyan-500", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "流動支付 5X (2%)", matchType: "paymentMethod", matchValue: ["mobile"], percentage: 2.0, excludeCategories: ["ewallet"] }, // Exclude top-up
      { description: "超市/百貨 5X", matchType: "category", matchValue: ["supermarket", "department_store"], percentage: 2.0 },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["ApplePay之選", "積分"],
    welcomeOfferText: "迎新簽 $10,000 送 20,000 里數",
    sellingPoints: ["流動支付 5X 積分", "積分永不過期"],
  },
  {
    id: "citi-premiermiles",
    name: "Citi PremierMiles",
    bank: "Citi",
    style: { bgColor: "bg-gradient-to-br from-slate-600 to-slate-800", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "外幣簽賬 $3/里", matchType: "base", percentage: 3.0, isForeignCurrency: true },
      { description: "本地簽賬 $8/里", matchType: "base", percentage: 1.25, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["旅遊", "里數"],
    sellingPoints: ["外幣簽賬低至 HK$3/里", "免費享用機場貴賓室"],
  },
  {
    id: "citi-octopus",
    name: "Citi 八達通白金卡",
    bank: "Citi",
    style: { bgColor: "bg-gradient-to-br from-orange-400 to-orange-600", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "交通 15% (九巴)", matchType: "merchant", matchValue: ["kmb", "bus"], percentage: 15.0, minSpend: 1500 },
      { description: "基本回饋 0.5%", matchType: "base", percentage: 0.5, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["交通15%", "八達通"],
    sellingPoints: ["九巴車費高達 15% 回贈", "內置八達通功能"],
  },
  {
    id: "citi-prestige",
    name: "Citi Prestige Card",
    bank: "Citi",
    style: { bgColor: "bg-gradient-to-br from-gray-700 to-gray-900", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "海外簽賬 $4/里", matchType: "base", percentage: 2.5, isForeignCurrency: true },
      { description: "本地簽賬 $6/里", matchType: "base", percentage: 1.67, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["高端", "年費卡"],
    sellingPoints: ["任何酒店第 4 晚免費", "無限次使用機場貴賓室"],
  },

  // ========================================================================
  // DBS 星展
  // ========================================================================
  {
    id: "dbs-eminent",
    name: "DBS Eminent Card",
    bank: "DBS",
    style: { bgColor: "bg-gradient-to-br from-gray-600 to-gray-900", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "餐飲 5%", matchType: "category", matchValue: "dining", percentage: 5.0, minSpend: 300, cap: 8000 },
      { description: "健身/運動 5%", matchType: "category", matchValue: ["sports", "gym"], percentage: 5.0, minSpend: 300, cap: 8000 },
      { description: "醫療 5%", matchType: "category", matchValue: "medical", percentage: 5.0, minSpend: 300, cap: 8000 },
      { description: "基本回饋 1%", matchType: "base", percentage: 1.0, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["餐飲5%", "健身5%"],
    welcomeOfferText: "迎新高達 $1,000 回贈",
    sellingPoints: ["餐飲、健身、醫療 5% 回贈", "基本簽賬 1%"],
  },
  {
    id: "dbs-black",
    name: "DBS Black World Mastercard",
    bank: "DBS",
    style: { bgColor: "bg-black", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "外幣簽賬 $4/里", matchType: "base", percentage: 2.0, isForeignCurrency: true },
      { description: "本地簽賬 $6/里", matchType: "base", percentage: 1.0, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["儲里數", "里數神卡"],
    sellingPoints: ["積分無限期", "兌換里數免手續費", "外幣 HK$4/里"],
  },
  {
    id: "dbs-live-fresh",
    name: "DBS Live Fresh",
    bank: "DBS",
    style: { bgColor: "bg-gradient-to-br from-lime-300 to-lime-500", textColor: "text-black" },
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "自選類別 (網購) 6%", matchType: "category", matchValue: "online", percentage: 6.0, excludeCategories: ["ewallet"] }, // Exclude top-up
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
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "指定日子超市/淘寶 1%", matchType: "category", matchValue: ["supermarket", "online"], percentage: 1.0 },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["超市", "淘寶"],
    sellingPoints: ["逢星期三超市簽賬高達 8% 回贈", "淘寶天貓簽賬優惠"],
  },

  // ========================================================================
  // AEON
  // ========================================================================
  {
    id: "aeon-wakuwaku",
    name: "AEON CARD WAKUWAKU",
    bank: "AEON",
    style: { bgColor: "bg-gradient-to-br from-pink-400 to-pink-600", textColor: "text-white" },
    imageUrl: "https://mhgprod.blob.core.windows.net/moneyhero/strapi-uploads/blt6404429f0179dbba_0bc13b65f2.png", 
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "網上簽賬 6%", matchType: "category", matchValue: "online", percentage: 6.0, cap: 5000, excludeCategories: ["ewallet"] },
      { description: "日本簽賬 3%", matchType: "base", percentage: 3.0, isForeignCurrency: true },
      { description: "基本回饋 0.5%", matchType: "base", percentage: 0.5, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["網購6%", "日本3%"],
    welcomeOfferText: "迎新高達 16% 回贈",
    sellingPoints: ["網上簽賬 6% 現金回贈", "日本簽賬 3%", "永久免年費"],
  },
  {
    id: "aeon-card-jal",
    name: "AEON Card JAL",
    bank: "AEON",
    style: { bgColor: "bg-gradient-to-br from-red-600 to-red-800", textColor: "text-white" },
    foreignCurrencyFee: 0,
    rules: [
      { description: "日本簽賬 $6/里", matchType: "base", percentage: 1.5, isForeignCurrency: true },
      { description: "本地餐飲/海外 $8/里", matchType: "category", matchValue: ["dining"], percentage: 1.0 },
      { description: "基本回饋 $8/里", matchType: "base", percentage: 1.0, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] }
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
    rules: [
      { description: "本地簽賬 $5/里", matchType: "base", percentage: 1.6, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
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
    imageUrl: "https://mhgprod.blob.core.windows.net/moneyhero/strapi-uploads/68_01_JNHYA_6_PDHB_9_F53_EJCHWHCTDH_16a90fe0a8.png", 
    rewardTimeline: "現金回贈即時入賬",
    foreignCurrencyFee: 0,
    rules: [
      { description: "全方位 2%", matchType: "base", percentage: 2.0, cap: 150000, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] }, // EarnMORE excludes utilities/fps for 2%, usually 0% or low
      { description: "八達通自動增值 2%", matchType: "category", matchValue: ["ewallet"], percentage: 2.0 },
    ],
    tags: ["全方位2%", "懶人必備"],
    welcomeOfferText: "迎新送按摩椅或 $500 回贈",
    sellingPoints: ["全方位 2% 回贈", "八達通自動增值 2%", "免外幣手續費"],
  },
  {
    id: "wewa-unionpay",
    name: "WeWa 銀聯卡",
    bank: "WeWa",
    style: { bgColor: "bg-gradient-to-br from-yellow-300 to-yellow-500", textColor: "text-black" },
    foreignCurrencyFee: 0,
    rules: [
      { description: "旅遊/主題公園/戲院/卡拉OK 4%", matchType: "category", matchValue: ["travel", "entertainment"], percentage: 4.0 },
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
    rules: [
      { description: "本地簽賬 $6/Avios", matchType: "base", percentage: 1.5, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
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
      { description: "網購/PayWave 2%", matchType: "category", matchValue: ["online", "paymentMethod"], percentage: 2.0, cap: 300000, excludeCategories: ["ewallet"] },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["網購", "感應式支付"],
    sellingPoints: ["網購及感應式支付 5X 積分 (2%)", "積分永久有效"],
  },
  {
    id: "ccb-jd",
    name: "CCB (Asia) JD Credit Card",
    bank: "CCB",
    style: { bgColor: "bg-gradient-to-br from-red-600 to-red-800", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "網上簽賬 4%", matchType: "category", matchValue: "online", percentage: 4.0, excludeCategories: ["ewallet"] },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["京東", "網購"],
    sellingPoints: ["網上簽賬 4% 現金回贈", "JD.com 購物優惠"],
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
  {
    id: "icbc-gba",
    name: "ICBC Greater Bay Area UnionPay",
    bank: "ICBC",
    style: { bgColor: "bg-gradient-to-br from-orange-600 to-orange-800", textColor: "text-white" },
    foreignCurrencyFee: 0,
    rules: [
      { description: "內地/澳門簽賬 4%", matchType: "base", percentage: 4.0, isForeignCurrency: true },
      { description: "基本回饋 0.5%", matchType: "base", percentage: 0.5, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["大灣區", "免手續費"],
    sellingPoints: ["內地及澳門簽賬高達 4% 回贈", "豁免外幣手續費"],
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
      { description: "餐飲/網上 6%", matchType: "category", matchValue: ["dining", "online"], percentage: 6.0, cap: 3600, excludeCategories: ["ewallet"] },
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
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "日韓台 8% (20X)", matchType: "base", percentage: 8.0, isForeignCurrency: true, minSpend: 2000 },
      { description: "本地簽賬 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["日韓台8%", "旅遊神卡"],
    sellingPoints: ["日本、韓國、台灣簽賬高達 20X 積分 (8%)", "需要登記及符合最低簽賬"],
  },
  {
    id: "shcb-smart",
    name: "ShCom Smart Credit Card",
    bank: "Shanghai Commercial",
    style: { bgColor: "bg-gradient-to-br from-red-500 to-pink-600", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "網購/流動支付 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["上商"],
    sellingPoints: ["永久免年費", "迎新禮品豐富"],
  },
  {
    id: "chonghing-diamond",
    name: "Chong Hing UnionPay Diamond",
    bank: "Chong Hing",
    style: { bgColor: "bg-gradient-to-br from-purple-600 to-indigo-800", textColor: "text-white" },
    foreignCurrencyFee: 0,
    rules: [
      { description: "海外簽賬 5%", matchType: "base", percentage: 5.0, isForeignCurrency: true },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["海外5%", "創興"],
    sellingPoints: ["海外簽賬及網上外幣簽賬 5% 現金回贈", "豁免外幣手續費"],
  },
  {
    id: "public-vs",
    name: "Public Bank Visa Signature",
    bank: "Public Bank",
    style: { bgColor: "bg-gradient-to-br from-red-800 to-red-950", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "餐飲/海外 $20000 享 $300", matchType: "base", percentage: 1.5, minSpend: 300 },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["大眾銀行"],
    sellingPoints: ["高達 $3,600 現金回贈", "免費享用機場貴賓室"],
  },

  // ========================================================================
  // American Express
  // ========================================================================
  {
    id: "amex-explorer",
    name: "Amex Explorer",
    bank: "American Express",
    style: { bgColor: "bg-slate-800", textColor: "text-white" },
    // imageUrl: "https://www.americanexpress.com/content/dam/amex/hk/en/staticassets/card-art/Explorer-Credit-Card/480x304_Explorer_Card_Art_Di_No_Name.png",
    foreignCurrencyFee: 2.0,
    rules: [
      { description: "指定簽賬 $3/里", matchType: "category", matchValue: ["online", "travel", "airline"], percentage: 2.5, excludeCategories: ["ewallet"] }, // Usually excludes
      { description: "外幣簽賬 $3.6/里", matchType: "base", percentage: 2.0, isForeignCurrency: true },
      { description: "本地簽賬 $5/里", matchType: "base", percentage: 1.0, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["里數", "旅遊保險"],
    sellingPoints: ["積分無限期", "指定簽賬 HK$3/里", "免費旅遊保險及貴賓室 (年費豁免)"],
  },
  {
    id: "amex-blue-cash",
    name: "Amex Blue Cash",
    bank: "American Express",
    style: { bgColor: "bg-blue-400", textColor: "text-white" },
    // imageUrl: "https://www.americanexpress.com/content/dam/amex/hk/en/staticassets/card-art/Blue-Cash-Credit-Card/480x304_Blue_Cash_Card_Art_Di_No_Name.png",
    foreignCurrencyFee: 2.0,
    rules: [
      { description: "基本回饋 1.2%", matchType: "base", percentage: 1.2, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["現金回贈", "無腦刷"],
    sellingPoints: ["本地及外幣簽賬 1.2% 回贈", "百老匯院線 8 折"],
  },

  // ========================================================================
  // Virtual Banks / Others
  // ========================================================================
  {
    id: "mox-credit",
    name: "Mox Credit",
    bank: "Mox",
    style: { bgColor: "bg-black", textColor: "text-white" },
    // imageUrl: "https://mox.com/images/cards/mox-card-black-front.png",
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "超市 3%", matchType: "category", matchValue: ["supermarket"], percentage: 3.0 },
      { description: "無上限 2%", matchType: "base", percentage: 2.0, minSpend: 75000 },
      { description: "基本回饋 1%", matchType: "base", percentage: 1.0 }, // Mox often allows more types
    ],
    tags: ["超市3%", "虛擬銀行"],
    sellingPoints: ["指定超市 3% 現金回贈", "無上限 1% 或 2% (需存款)"],
  },
  {
    id: "sim-credit-card",
    name: "sim Credit Card",
    bank: "sim",
    style: { bgColor: "bg-gradient-to-br from-purple-800 to-purple-950", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "網購 8%", matchType: "category", matchValue: "online", percentage: 8.0, cap: 2500, excludeCategories: ["ewallet"] },
      { description: "指定商戶 3%", matchType: "merchant", matchValue: ["mcdonalds", "adidas"], percentage: 3.0 },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["網購8%", "新卡"],
    sellingPoints: ["網上簽賬高達 8% 回贈", "門檻低"],
  },
];
