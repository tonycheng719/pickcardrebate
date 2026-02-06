/**
 * 信用卡分類數據 - 用於 SEO 分類頁面
 */

// 銀行分類
export interface BankCategory {
  id: string;
  name: string;
  nameEn: string;
  bankNames: string[]; // 對應 cards.ts 中的 bank 欄位（可能有多個寫法）
  description: string;
  seoTitle: string;
  seoDescription: string;
}

export const BANK_CATEGORIES: BankCategory[] = [
  {
    id: "hsbc",
    name: "HSBC 匯豐",
    nameEn: "HSBC",
    bankNames: ["HSBC", "匯豐"],
    description: "HSBC 匯豐銀行信用卡，包括 Red Card、Visa Signature、EveryMile 等熱門卡款。",
    seoTitle: "HSBC 匯豐信用卡比較 2026｜Red Card、Visa Signature、EveryMile",
    seoDescription: "比較所有 HSBC 匯豐信用卡回贈率、年費、迎新優惠。Red Card 4% 網購回贈、Visa Signature 餐飲優惠、EveryMile 飛行里數卡。",
  },
  {
    id: "sc",
    name: "渣打",
    nameEn: "Standard Chartered",
    bankNames: ["Standard Chartered", "渣打"],
    description: "渣打銀行信用卡，包括 Smart Card、Simply Cash、Cathay Mastercard 等。",
    seoTitle: "渣打信用卡比較 2026｜Smart Card、Simply Cash、Cathay Mastercard",
    seoDescription: "比較所有渣打信用卡回贈率、年費、迎新優惠。Smart Card 5% 回贈、Simply Cash Visa 1.5% 無上限、Cathay Mastercard 儲里數。",
  },
  {
    id: "boc",
    name: "中銀",
    nameEn: "BOC",
    bankNames: ["BOC", "中銀", "中國銀行"],
    description: "中國銀行（香港）信用卡，包括 Chill Card、淘寶卡、i-card 等。",
    seoTitle: "中銀信用卡比較 2026｜Chill Card、淘寶卡、i-card",
    seoDescription: "比較所有中銀信用卡回贈率、年費、迎新優惠。Chill Card 10% Chill 商戶回贈、淘寶卡 4% 淘寶回贈。",
  },
  {
    id: "hangseng",
    name: "恒生",
    nameEn: "Hang Seng",
    bankNames: ["Hang Seng", "恒生"],
    description: "恒生銀行信用卡，包括 MMPOWER、enJoy 卡、優越理財 Visa Infinite 等。",
    seoTitle: "恒生信用卡比較 2026｜MMPOWER、enJoy 卡",
    seoDescription: "比較所有恒生信用卡回贈率、年費、迎新優惠。MMPOWER 5% 網購/外幣回贈、enJoy 卡食肆 2% 回贈。",
  },
  {
    id: "citi",
    name: "Citi 花旗",
    nameEn: "Citi",
    bankNames: ["Citi", "花旗"],
    description: "Citi 花旗銀行信用卡，包括 Cash Back、PremierMiles、Rewards 等。",
    seoTitle: "Citi 花旗信用卡比較 2026｜Cash Back、PremierMiles、Rewards",
    seoDescription: "比較所有 Citi 花旗信用卡回贈率、年費、迎新優惠。Cash Back 2% 無上限、PremierMiles 儲亞洲萬里通。",
  },
  {
    id: "dbs",
    name: "DBS 星展",
    nameEn: "DBS",
    bankNames: ["DBS", "星展"],
    description: "DBS 星展銀行信用卡，包括 Black World、Eminent Card、Live Fresh 等。",
    seoTitle: "DBS 星展信用卡比較 2026｜Black World、Eminent Card、Live Fresh",
    seoDescription: "比較所有 DBS 星展信用卡回贈率、年費、迎新優惠。Black World 儲里數、Eminent Card 網購回贈。",
  },
  {
    id: "bea",
    name: "東亞",
    nameEn: "BEA",
    bankNames: ["BEA", "東亞"],
    description: "東亞銀行信用卡，包括 Flyer World、i-Titanium、World Mastercard 等。",
    seoTitle: "東亞信用卡比較 2026｜Flyer World、i-Titanium",
    seoDescription: "比較所有東亞銀行信用卡回贈率、年費、迎新優惠。Flyer World 儲亞洲萬里通、i-Titanium 網購回贈。",
  },
  {
    id: "aeon",
    name: "AEON",
    nameEn: "AEON",
    bankNames: ["AEON"],
    description: "AEON 信用卡，包括 WAKUWAKU、銀聯卡等，日本消費必備。",
    seoTitle: "AEON 信用卡比較 2026｜WAKUWAKU、銀聯卡",
    seoDescription: "比較所有 AEON 信用卡回贈率、年費、迎新優惠。WAKUWAKU 6% 日本/網購回贈、銀聯卡海外免手續費。",
  },
  {
    id: "amex",
    name: "美國運通",
    nameEn: "American Express",
    bankNames: ["American Express", "AMEX", "AE"],
    description: "美國運通信用卡，包括 Explorer、Blue Cash、Platinum 等。",
    seoTitle: "美國運通 AE 信用卡比較 2026｜Explorer、Blue Cash、Platinum",
    seoDescription: "比較所有美國運通信用卡回贈率、年費、迎新優惠。Explorer 儲 MR 積分、Blue Cash 1.2% 無上限。",
  },
  {
    id: "dahsing",
    name: "大新",
    nameEn: "Dah Sing",
    bankNames: ["大新銀行", "大新", "Dah Sing"],
    description: "大新銀行信用卡，包括 ONE+、英國航空卡、聯合航空卡等。",
    seoTitle: "大新信用卡比較 2026｜ONE+、英國航空卡、聯合航空卡",
    seoDescription: "比較所有大新銀行信用卡回贈率、年費、迎新優惠。ONE+ 1% 無上限回贈、航空卡儲里數。",
  },
  {
    id: "fubon",
    name: "富邦",
    nameEn: "Fubon",
    bankNames: ["富邦", "Fubon"],
    description: "富邦銀行信用卡，包括 Visa 白金卡等。",
    seoTitle: "富邦信用卡比較 2026｜Visa 白金卡",
    seoDescription: "比較所有富邦銀行信用卡回贈率、年費、迎新優惠。",
  },
  {
    id: "cncbi",
    name: "信銀國際",
    nameEn: "CNCBI",
    bankNames: ["信銀國際", "CNCBI", "中信"],
    description: "信銀國際信用卡，包括 Motion、大灣區雙幣卡等。",
    seoTitle: "信銀國際信用卡比較 2026｜Motion、大灣區雙幣卡",
    seoDescription: "比較所有信銀國際信用卡回贈率、年費、迎新優惠。Motion 6% 網購/外幣回贈。",
  },
  {
    id: "wlb",
    name: "安信",
    nameEn: "WeLab Bank",
    bankNames: ["WeLab Bank", "安信", "EarnMore"],
    description: "WeLab Bank / 安信信用卡，包括 EarnMore 等。",
    seoTitle: "安信 WeLab Bank 信用卡比較 2026｜EarnMore",
    seoDescription: "比較所有安信/WeLab Bank 信用卡回贈率、年費、迎新優惠。EarnMore 2% 無上限回贈。",
  },
];

// 卡組織分類
export interface NetworkCategory {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
}

export const NETWORK_CATEGORIES: NetworkCategory[] = [
  {
    id: "visa",
    name: "Visa",
    nameEn: "Visa",
    description: "Visa 信用卡，全球最廣泛接受的卡組織，適合海外消費。",
    seoTitle: "Visa 信用卡比較 2026｜全港 Visa 卡回贈比較",
    seoDescription: "比較所有 Visa 信用卡回贈率、年費、迎新優惠。Visa 全球接受度最高，海外消費首選。",
  },
  {
    id: "mastercard",
    name: "Mastercard",
    nameEn: "Mastercard",
    description: "Mastercard 信用卡，全球第二大卡組織，Costco 香港指定卡。",
    seoTitle: "Mastercard 信用卡比較 2026｜全港 Mastercard 卡回贈比較",
    seoDescription: "比較所有 Mastercard 信用卡回贈率、年費、迎新優惠。Mastercard 全球接受度高，Costco 香港指定。",
  },
  {
    id: "unionpay",
    name: "銀聯",
    nameEn: "UnionPay",
    description: "銀聯信用卡，內地/澳門消費免手續費，北上必備。",
    seoTitle: "銀聯信用卡比較 2026｜內地消費免手續費",
    seoDescription: "比較所有銀聯信用卡回贈率、年費、迎新優惠。銀聯卡內地/澳門消費免外幣手續費，北上必備。",
  },
  {
    id: "amex",
    name: "American Express",
    nameEn: "American Express",
    description: "American Express 美國運通卡，積分彈性兌換，高端禮遇。",
    seoTitle: "American Express AE 信用卡比較 2026｜MR 積分、機場貴賓室",
    seoDescription: "比較所有 American Express 美國運通信用卡回贈率、年費、迎新優惠。MR 積分彈性兌換、高端禮遇。",
  },
  {
    id: "jcb",
    name: "JCB",
    nameEn: "JCB",
    description: "JCB 信用卡，日本消費優惠多，日本旅遊首選。",
    seoTitle: "JCB 信用卡比較 2026｜日本消費優惠",
    seoDescription: "比較所有 JCB 信用卡回贈率、年費、迎新優惠。JCB 日本消費優惠多，日本旅遊首選。",
  },
];

// 功能分類
export interface FeatureCategory {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  tags: string[]; // 對應 cards.ts 中的 tags
}

export const FEATURE_CATEGORIES: FeatureCategory[] = [
  {
    id: "cashback",
    name: "現金回贈",
    nameEn: "Cash Back",
    description: "現金回贈信用卡，簽賬直接回贈現金，簡單易用。",
    seoTitle: "現金回贈信用卡比較 2026｜最高回贈率排行榜",
    seoDescription: "比較所有現金回贈信用卡回贈率、年費、迎新優惠。最高 6% 回贈，邊張卡最抵？",
    tags: ["現金回贈", "無腦1%", "無腦回贈"],
  },
  {
    id: "miles",
    name: "飛行里數",
    nameEn: "Miles",
    description: "飛行里數信用卡，儲 Asia Miles、Avios、MR 積分換機票。",
    seoTitle: "飛行里數信用卡比較 2026｜Asia Miles、Avios 儲分攻略",
    seoDescription: "比較所有飛行里數信用卡，儲 Asia Miles、Avios、MR 積分。最低 $4/里，邊張卡最抵？",
    tags: ["里數", "Asia Miles", "Avios", "MR積分"],
  },
  {
    id: "dining",
    name: "餐飲",
    nameEn: "Dining",
    description: "餐飲信用卡，食飯高回贈，食肆簽賬最抵。",
    seoTitle: "餐飲信用卡比較 2026｜食飯最高回贈排行榜",
    seoDescription: "比較所有餐飲信用卡回贈率，食飯簽賬最高 9% 回贈。邊張卡食飯最抵？",
    tags: ["餐飲", "食肆", "餐飲神卡"],
  },
  {
    id: "overseas",
    name: "海外簽賬",
    nameEn: "Overseas",
    description: "海外簽賬信用卡，外幣消費高回贈，旅遊必備。",
    seoTitle: "海外簽賬信用卡比較 2026｜外幣消費最高回贈",
    seoDescription: "比較所有海外簽賬信用卡回贈率，外幣消費最高 6% 回贈。邊張卡海外簽賬最抵？",
    tags: ["海外", "外幣", "旅遊"],
  },
  {
    id: "online",
    name: "網購",
    nameEn: "Online Shopping",
    description: "網購信用卡，網上購物高回贈，包括本地及外幣網購。",
    seoTitle: "網購信用卡比較 2026｜網上購物最高回贈",
    seoDescription: "比較所有網購信用卡回贈率，網上購物最高 8% 回贈。邊張卡網購最抵？",
    tags: ["網購", "網上購物", "Online"],
  },
  {
    id: "supermarket",
    name: "超市",
    nameEn: "Supermarket",
    description: "超市信用卡，超市購物高回贈，買餸慳錢。",
    seoTitle: "超市信用卡比較 2026｜超市購物最高回贈",
    seoDescription: "比較所有超市信用卡回贈率，超市購物最高 5% 回贈。邊張卡買餸最抵？",
    tags: ["超市", "買餸"],
  },
  {
    id: "no-annual-fee",
    name: "免年費",
    nameEn: "No Annual Fee",
    description: "免年費信用卡，永久免年費或輕鬆豁免，零成本持有。",
    seoTitle: "免年費信用卡比較 2026｜永久免年費卡",
    seoDescription: "比較所有免年費信用卡，永久免年費或輕鬆豁免。零成本持有，邊張卡最抵？",
    tags: ["免年費", "永久免年費"],
  },
  {
    id: "student",
    name: "學生",
    nameEn: "Student",
    description: "學生信用卡，無需收入證明，學生專屬優惠。",
    seoTitle: "學生信用卡比較 2026｜無需收入證明",
    seoDescription: "比較所有學生信用卡，無需收入證明即可申請。學生專屬優惠，邊張卡最抵？",
    tags: ["學生", "學生卡"],
  },
  {
    id: "octopus",
    name: "八達通增值",
    nameEn: "Octopus AAVS",
    description: "八達通自動增值信用卡，AAVS 增值賺回贈。",
    seoTitle: "八達通增值信用卡比較 2026｜AAVS 最高回贈",
    seoDescription: "比較所有八達通自動增值信用卡回贈率，AAVS 增值最高 1% 回贈。邊張卡最抵？",
    tags: ["八達通", "AAVS", "八達通增值"],
  },
  {
    id: "payme",
    name: "PayMe 增值",
    nameEn: "PayMe Top-up",
    description: "PayMe 增值信用卡，電子錢包增值賺回贈。",
    seoTitle: "PayMe 增值信用卡比較 2026｜最高 5% 回贈",
    seoDescription: "比較所有 PayMe 增值信用卡回贈率，PayMe 增值最高 5% 回贈。邊張卡最抵？",
    tags: ["PayMe", "電子錢包"],
  },
];

// 獲取所有分類的函數
export function getAllCategories() {
  return {
    banks: BANK_CATEGORIES,
    networks: NETWORK_CATEGORIES,
    features: FEATURE_CATEGORIES,
  };
}

// 根據 ID 獲取銀行分類
export function getBankCategory(id: string): BankCategory | undefined {
  return BANK_CATEGORIES.find(b => b.id === id);
}

// 根據 ID 獲取卡組織分類
export function getNetworkCategory(id: string): NetworkCategory | undefined {
  return NETWORK_CATEGORIES.find(n => n.id === id);
}

// 根據 ID 獲取功能分類
export function getFeatureCategory(id: string): FeatureCategory | undefined {
  return FEATURE_CATEGORIES.find(f => f.id === id);
}

