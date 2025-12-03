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
    annualFee: 2000,
    rewardConfig: { method: 'conversion', ratio: 10, currency: 'RC' }, // $10 = $1 RC = 0.4%
    rules: [
      // T&C: 最紅自主獎賞 6X (2.4%)，需登記，額外「獎賞錢」簽賬上限 $100,000
      // 5大類別：賞滋味/賞購物/賞家居/賞享受/賞世界，可自由分配 5X 額外倍數
      // 6X = 5X額外 + 1X基本 = 2.4%
      { description: "最紅自主獎賞 6X (2.4%) [需登記]", matchType: "category", matchValue: ["dining", "supermarket", "lifestyle", "home", "entertainment"], percentage: 2.4, cap: 100000, capType: "spending", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 賞世界 - 海外簽賬 (非港幣交易)，不包括香港進行或以港幣交易的簽賬
      { description: "賞世界 6X (2.4%) [需登記]", matchType: "base", percentage: 2.4, isForeignCurrency: true, cap: 100000, capType: "spending", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 賞滋味限制：不包括酒席宴會/私人宴會/包場派對/酒店百貨公司俱樂部內飲食專櫃
      // T&C: 基本回饋 0.4% ($250 = $1 RC)，排除電子錢包、繳稅、繳費
      { description: "基本回饋 0.4% ($25/里)", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "alipay", "wechat_pay", "payme", "octopus"] },
    ],
    tags: ["餐飲神卡", "最紅自主獎賞", "6X積分", "需登記"],
    imageUrl: "https://www.hsbc.com.hk/content/dam/hsbc/hk/images/credit-cards/visa-signature-card-en.png",
    feeWaiverCondition: "首兩年免年費",
    welcomeOfferText: "迎新簽 $8,000 送 $600-$800 獎賞錢 (首60日內)",
    applyUrl: "https://www.hsbc.com.hk/zh-hk/credit-cards/products/visa-signature/",
    sellingPoints: ["最紅自主獎賞 6X (2.4%)，5大類別自由分配", "首 $100,000 簽賬享額外獎賞", "首兩年免年費"],
    note: "⚠️ 【最紅自主獎賞 2026】需於 2026/10/31 前登記！6X = 5X額外 + 1X基本 = 2.4%。5大類別：賞滋味/賞家居/賞享受/賞購物/賞世界，可自由分配 5X 額外倍數。首 $100,000 簽賬享額外獎賞。登記後 3 個工作天內生效，一經登記不能更改！⚠️ 賞滋味限制：不包括酒席宴會、私人宴會、包場派對、酒店/百貨公司/俱樂部內飲食專櫃。⚠️ 賞世界限制：不包括香港進行或以港幣交易的簽賬。❌ 不適用於電子錢包（Alipay/WeChat Pay/PayMe）、八達通增值、繳稅、網上繳費。",
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
      // T&C 2025/9/1-2026/3/31: 指定商戶 8% (每月首$1,250 = $100獎賞錢上限)
      // 餐飲：壽司郎/譚仔三哥/譚仔雲南/The Coffee Academïcs
      // 潮流及運動服飾：GU/Decathlon/lululemon
      // 休閒娛樂：NAMCO/TAITO STATION
      { description: "指定商戶 8% (壽司郎/譚仔/GU等)", matchType: "merchant", matchValue: ["sushiro", "tamjai", "tamjai_yunnan", "coffee_academics", "gu", "decathlon", "lululemon", "namco", "taito"], percentage: 8.0, cap: 100, capType: "reward" },
      // T&C: 網上簽賬 4% (每月首$10,000 = $400獎賞錢上限)
      // 不包括：網上繳費、電子錢包簽賬、保費、證券買賣、租金/物業管理費、廣告服務、八達通增值
      { description: "網上簽賬 4% (每月首$10,000)", matchType: "category", matchValue: "online", percentage: 4.0, cap: 400, capType: "reward", excludeCategories: ["utilities", "insurance", "ewallet"], excludePaymentMethods: ["octopus"] },
      // T&C: 基本獎賞 0.4%
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "payme", "alipay", "wechat_pay", "octopus"] }, 
    ],
    tags: ["網購神卡", "永久免年費", "指定商戶8%"],
    annualFee: 0,
    feeWaiverCondition: "永久免年費",
    welcomeOfferText: "迎新簽 $3,000 送 $300 獎賞錢 (首60日)",
    applyUrl: "https://www.hsbc.com.hk/zh-hk/credit-cards/products/red/",
    sellingPoints: ["指定商戶 8% (壽司郎/譚仔/GU/Decathlon/lululemon)", "網上簽賬 4% (每月首$10,000)", "永久免年費"],
    note: "⚠️ 【推廣期 2025/9/1-2026/3/31】指定商戶 8%：🍽️ 壽司郎/譚仔三哥/譚仔雲南/The Coffee Academïcs；👕 GU/Decathlon/lululemon；🎮 NAMCO/TAITO STATION（只限香港分店，百貨公司專櫃除外）。每月上限 $100 獎賞錢（首 $1,250）。網上簽賬 4% 每月上限 $400（首 $10,000）。網上不計：網上繳費、電子錢包簽賬、保費、證券、租金、廣告、八達通增值。實體超市只有 0.4%！",
  },
  {
    id: "hsbc-everymile",
    name: "HSBC EveryMile",
    bank: "HSBC",
    style: { bgColor: "bg-gradient-to-br from-stone-700 to-stone-900", textColor: "text-white" },
    rewardTimeline: "獎賞錢即時入賬",
    foreignCurrencyFee: 1.95,
    annualFee: 2000,
    rewardConfig: { method: 'conversion', ratio: 20, currency: 'RC' }, // 1 RC = 20 Miles (Special rate for EveryMile)
    rules: [
      // T&C: 指定商戶/交通 $2/里 (2.5%)
      { description: "指定商戶/交通 $2/里 (2.5%)", matchType: "category", matchValue: ["transport", "online", "dining"], percentage: 2.5, excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      { description: "海外簽賬 $2/里 (2.5%)", matchType: "base", percentage: 2.5, isForeignCurrency: true },
      // T&C: 基本回饋 $5/里 (1%)，排除電子錢包（八達通自動增值除外）
      { description: "基本回饋 $5/里 (1%)", matchType: "base", percentage: 1.0, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "alipay", "wechat_pay", "payme", "octopus"] },
    ],
    tags: ["旅遊神卡", "交通$2/里", "Lounge"],
    welcomeOfferText: "迎新簽 $8,000 送 $600-$800 獎賞錢 (首60日內)",
    applyUrl: "https://www.hsbc.com.hk/zh-hk/credit-cards/products/everymile/",
    sellingPoints: ["指定日常簽賬低至 HK$2/里", "免費環亞機場貴賓室", "首兩年免年費"],
    note: "⚠️ 指定商戶包括：交通 (港鐵/巴士/的士)、網購、餐飲。迎新：全新客戶 $600/$800 (網上申請)、現有客戶 $200。不適用於電子錢包（Alipay/WeChat Pay/PayMe）、八達通增值、繳稅、網上繳費。",
  },
  {
    id: "hsbc-pulse",
    name: "HSBC Pulse 銀聯雙幣卡",
    bank: "HSBC",
    style: { bgColor: "bg-gradient-to-br from-red-400 to-red-600", textColor: "text-white" },
    rewardTimeline: "獎賞錢即時入賬",
    foreignCurrencyFee: 0,
    annualFee: 1800,
    rewardConfig: { method: 'conversion', ratio: 10, currency: 'RC' },
    rules: [
      // T&C 2025: 內地/澳門 QR Code/流動支付 額外5倍 (2%) + 基本0.4% + 賞世界2% = 4.4%
      // 簽賬上限 $80,000
      { description: "內地/澳門 QR Code/流動支付 4.4%", matchType: "base", percentage: 4.4, isForeignCurrency: true, cap: 80000, capType: "spending", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 最紅自主獎賞「賞世界」
      { description: "最紅自主獎賞 (賞世界) 2.4%", matchType: "category", matchValue: "china", percentage: 2.4, cap: 100000, capType: "spending", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 基本回饋 0.4%，排除電子錢包、繳稅、繳費、PayMe增值
      { description: "基本回饋 0.4% ($25/里)", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "alipay", "wechat_pay", "payme", "octopus"] },
    ],
    tags: ["北上消費", "銀聯", "免手續費", "內地4.4%"],
    welcomeOfferText: "迎新簽 $8,000 送 $600-$800 獎賞錢 (首60日內)",
    applyUrl: "https://www.hsbc.com.hk/zh-hk/credit-cards/products/pulse/",
    sellingPoints: ["內地/澳門 QR Code/流動支付 4.4%", "人民幣/港幣雙幣結算", "豁免外幣手續費", "北上消費必備"],
    note: "⚠️ 內地/澳門 4.4% 需透過 QR Code (Reward+/雲閃付) 或流動支付 (Apple Pay/Google Pay/Samsung Pay)！簽賬上限 $80,000。需登記「賞世界」及「最紅自主獎賞」。迎新：全新客戶 $600/$800 (網上申請)、現有客戶 $200。不適用於：電子錢包（Alipay/WeChat Pay/PayMe）、八達通增值、繳稅、網上繳費。",
  },
  {
    id: "hsbc-premier",
    name: "HSBC Premier Mastercard",
    bank: "HSBC",
    style: { bgColor: "bg-gradient-to-br from-slate-800 to-black", textColor: "text-white" },
    rewardTimeline: "獎賞錢即時入賬",
    foreignCurrencyFee: 1.95,
    annualFee: 2000,
    rewardConfig: { method: 'conversion', ratio: 10, currency: 'RC' },
    rules: [
      // T&C: 最紅自主獎賞適用
      { description: "海外/網上簽賬 2.4%", matchType: "category", matchValue: ["travel", "online"], percentage: 2.4, minSpend: 8000, excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
      // T&C: 基本回饋 0.4%，排除電子錢包、繳稅、繳費
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "alipay", "wechat_pay", "payme"] },
    ],
    tags: ["卓越理財", "旅遊"],
    sellingPoints: ["卓越理財客戶專享", "指定類別額外獎賞錢"],
    note: "⚠️ 需月簽賬滿 $8,000 才享 2.4% 回贈！不適用於電子錢包簽賬、繳稅、網上繳費。僅限卓越理財客戶申請。",
  },
  {
    id: "hsbc-student",
    name: "滙豐滙財金卡 - 學生卡",
    bank: "HSBC",
    style: { bgColor: "bg-gradient-to-br from-amber-400 to-amber-600", textColor: "text-white" },
    rewardTimeline: "獎賞錢即時入賬",
    foreignCurrencyFee: 1.95,
    annualFee: 0,
    rewardConfig: { method: 'conversion', ratio: 10, currency: 'RC' },
    rules: [
      // T&C: 網上繳付指定學院學費 2.4% 額外獎賞錢 (每階段上限$200，全期$400)
      { description: "指定學院學費 2.4% (網上繳費)", matchType: "category", matchValue: ["education"], percentage: 2.4, cap: 200, capType: "reward" },
      // T&C: 最紅自主獎賞適用
      { description: "最紅自主獎賞 2.4%", matchType: "category", matchValue: ["dining", "supermarket", "lifestyle", "home", "entertainment"], percentage: 2.4, cap: 25000, capType: "spending", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 基本回饋 0.4%
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "alipay", "wechat_pay", "payme", "octopus"] },
    ],
    tags: ["學生卡", "交學費2.4%", "永久免年費"],
    welcomeOfferText: "迎新簽 $2,000 送 $300 獎賞錢 (首60日內)",
    applyUrl: "https://www.hsbc.com.hk/zh-hk/credit-cards/products/gold/",
    sellingPoints: ["網上繳付指定學院學費 2.4% 額外獎賞錢", "永久年費豁免", "最紅自主獎賞 2.4%", "專為學生而設"],
    note: "⚠️ 僅限全日制大學/大專學生申請。學費 2.4% 需透過滙豐 App/網上理財繳費，每階段上限 $200 獎賞錢。指定學院包括：HKU/CUHK/HKUST/PolyU/CityU/HKBU/LingU/EdUHK/HKMU/HSU/VTC 等。不適用於電子錢包（Alipay/WeChat Pay/PayMe）、八達通增值、繳稅。",
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
    rewardTimeline: "現金回贈於「360°全面賞」平台顯示，需手動換領 (最低$50)",
    annualFee: 0,
    foreignCurrencyFee: 0, // T&C: 外幣交易手續費全免 (本地+海外)
    rules: [
      // T&C: 特約商戶 5% (需月簽賬滿$4,000)，5% 已包含基本回贈
      // 特約商戶名單及簽賬上限需查閱 sc.com/hk/smartcard
      // 電子錢包消費只適用於月結單上有顯示特約商戶名稱之交易
      { description: "特約商戶 5% (月簽$4000)", matchType: "merchant", matchValue: ["parknshop", "fusion", "taste", "watsons", "759", "japanhome", "deliveroo", "klook", "decathlon", "netflix", "disney", "spotify", "cmhk"], percentage: 5.0, monthlyMinSpend: 4000, excludePaymentMethods: ["fps", "alipay", "wechat_pay", "payme"] },
      // T&C: 八達通自動增值計回贈
      { description: "八達通自動增值 (月簽$4000)", matchType: "paymentMethod", matchValue: ["octopus"], percentage: 0.56, monthlyMinSpend: 4000 },
      // T&C: 月簽 $15,000+ 基本回贈升至 1.20%
      { description: "基本回贈 1.20% (月簽$15000+)", matchType: "base", percentage: 1.20, monthlyMinSpend: 15000, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "alipay", "wechat_pay", "payme"] },
      // T&C: 月簽 $4,000-$14,999 基本回贈 0.56%
      { description: "基本回贈 0.56% (月簽$4000-$14999)", matchType: "base", percentage: 0.56, monthlyMinSpend: 4000, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "alipay", "wechat_pay", "payme"] },
    ],
    tags: ["特約商戶5%", "永久免年費", "免外幣手續費", "八達通增值", "免現金透支費"],
    feeWaiverCondition: "永久免年費",
    welcomeOfferText: "迎新簽 $3,500 送 $800 現金回贈 (首月內)",
    applyUrl: "https://www.sc.com/hk/zh/credit-cards/smart/",
    sellingPoints: ["特約商戶 5% (百佳/屈臣氏/759/Klook/Deliveroo等)", "基本回贈 0.56%-1.2% (視乎月簽)", "永久免年費", "外幣交易手續費全免", "現金透支費豁免"],
    note: "⚠️ 【階梯制回贈】月簽 < $4,000 = 0%！月簽 $4,000-$14,999 = 0.56%。月簽 $15,000+ = 1.2%。特約商戶 5% 已包含基本回贈，超出簽賬上限部分只計基本回贈。✅ 八達通自動增值計回贈！✅ 外幣交易手續費全免（本地+海外）！✅ 現金透支費豁免！❌ 不計回贈：八達通錢包/支付寶/微信支付/PayMe增值、FPS、保費、繳費、繳稅、賭博、金融機構交易。回贈需於「360°全面賞」平台手動換領（最低 $50）。",
  },
  {
    id: "sc-cathay",
    name: "SC Cathay Mastercard",
    bank: "Standard Chartered",
    style: { bgColor: "bg-gradient-to-br from-teal-700 to-teal-900", textColor: "text-white" },
    rewardTimeline: "里數自動存入 (月結單後7個工作天)",
    annualFee: 1800,
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'direct_rate', baseRate: 6, currency: 'AM' }, // Direct rate: $6/mile
    rules: [
      { description: "國泰/HK Express 簽賬 $2/里", matchType: "merchant", matchValue: ["cathay", "hkexpress"], percentage: 5.0 },
      { description: "餐飲/外賣/網上 $4/里", matchType: "category", matchValue: ["dining", "online"], percentage: 2.5 }, 
      // T&C: 八達通自動增值計里數
      { description: "八達通自動增值 $6/里", matchType: "paymentMethod", matchValue: ["octopus"], percentage: 1.67 },
      { description: "基本回饋 $6/里", matchType: "base", percentage: 1.67, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "alipay", "wechat_pay", "payme"] },
    ],
    tags: ["儲里數", "國泰", "出糧優惠", "八達通增值", "繳稅", "會籍積分"],
    feeWaiverCondition: "首年免年費；優先理財($100萬+)/Premium理財($20萬+)/出糧客戶免年費",
    welcomeOfferText: "迎新送高達 60,000 里 / FanFest繳稅$4/里(上限20,000里) / 出糧客戶額外 2,000 里",
    sellingPoints: ["國泰航空簽賬低至 HK$2/里", "餐飲食肆 HK$4/里", "八達通增值計里數", "🔥 簽$10萬送20會籍積分 (2025全年)"],
    note: "⚠️ 基本比率 $6/里。✅ 八達通自動增值計里數！❌ 不計里數：保費、繳稅（日常）、FPS、支付寶/八達通錢包增值、網上理財繳費、電話/郵購、賭博、金融機構交易、P2P轉賬。免息分期只計每期已入賬金額。年費：$2,000（首年豁免），優先理財($100萬+)/Premium理財($20萬+)/出糧客戶免年費。【會籍積分推廣 2025全年】每簽$100,000送20會籍積分，上限100積分（$500,000）！分4階段計算，未達$10萬之簽賬可累積至下階段。【FanFest禮遇 2025/10/31-2026/1/15】全新客戶簽$10,000+透過網上理財/SC Mobile繳稅：$4/里（上限20,000里）！需網上申請時選擇，不可與普通迎新同享。【現有客戶禮遇】額外 5,000 里。【出糧客戶禮遇 2025/12/2-2026/4/30】網上申請額外 2,000 里（可與迎新/FanFest同享）！發卡後 1 年內取消會被扣回里數。",
  },
  {
    id: "sc-simply-cash",
    name: "SC Simply Cash Visa",
    bank: "Standard Chartered",
    style: { bgColor: "bg-gradient-to-br from-blue-500 to-blue-700", textColor: "text-white" },
    imageUrl: "https://av.sc.com/hk/content/images/hk-simply-cash-visa-card-masthead-400x255.png",
    rewardTimeline: "現金回贈於下期賬單顯示，需手動換領 ($50倍數)",
    annualFee: 2000,
    feeWaiverCondition: "首年免年費",
    foreignCurrencyFee: 1.95,
    rules: [
      // T&C: 外幣簽賬 2%
      { description: "外幣簽賬 2%", matchType: "base", percentage: 2.0, isForeignCurrency: true, excludePaymentMethods: ["fps", "octopus", "alipay", "wechat_pay", "payme"] },
      // T&C: 港幣簽賬 1.5%
      { description: "港幣簽賬 1.5%", matchType: "base", percentage: 1.5, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "octopus", "alipay", "wechat_pay", "payme"] },
    ],
    tags: ["現金回贈", "無腦刷", "外幣2%"],
    welcomeOfferText: "迎新簽 $8,000 送 $600 現金回贈 (首2個月內)",
    applyUrl: "https://www.sc.com/hk/zh/credit-cards/simply-cash-visa/",
    sellingPoints: ["港幣簽賬 1.5% 現金回贈", "外幣簽賬 2%", "無最低簽賬要求"],
    note: "⚠️ 不適用於：八達通自動增值、八達通錢包/支付寶/微信支付/PayMe增值、FPS、保費、繳費、繳稅。回贈需手動換領 ($50 倍數)。",
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
    rewardTimeline: "現金回贈",
    annualFee: 600,
    feeWaiverCondition: "首年免年費",
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 0.0666, currency: 'Points' }, // 15 pts = 1 mile -> ratio 0.0666
    rules: [
      // T&C: Chill 商戶 10% (World) / 8% (Platinum)，需每月簽滿 $3,000/$1,000，額外回贈上限 $150 (與海外/網上合併計算)
      { description: "Chill 商戶 10% (月簽$3000)", matchType: "merchant", matchValue: ["百佳", "屈臣氏", "豐澤", "萬寧", "7-eleven", "circle-k", "麥當勞", "starbucks", "pacific-coffee", "kkbox", "spotify", "netflix", "disney-plus"], percentage: 10.0, monthlyMinSpend: 3000, cap: 150, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay"] },
      // T&C: 海外及網上簽賬 5% (World) / 4% (Platinum)，需每月簽滿 $3,000/$1,000，額外回贈上限 $150 (與Chill商戶合併計算)
      { description: "海外及網上簽賬 5% (月簽$3000)", matchType: "category", matchValue: ["online"], percentage: 5.0, monthlyMinSpend: 3000, cap: 150, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay"], excludeCategories: ["ewallet", "insurance", "utilities", "tax", "government"] },
      { description: "海外簽賬 5% (月簽$3000)", matchType: "base", percentage: 5.0, isForeignCurrency: true, monthlyMinSpend: 3000, cap: 150, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay"] },
      // T&C: 基本回贈 0.4%，排除電子錢包、八達通、繳費等
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "octopus", "alipay", "wechat_pay", "payme"] },
    ],
    tags: ["Chill商戶10%", "網購5%", "海外5%"],
    welcomeOfferText: "迎新簽 $5,000 送 $500 現金回贈 (World) / 簽 $3,000 送 $300 (Platinum)",
    sellingPoints: ["Chill 商戶 10% (需月簽$3,000)", "海外及網上簽賬 5%", "支援 Apple Pay/Google Pay/Samsung Pay", "永久免年費"],
    note: "⚠️ Chill 商戶 10% 及網上/海外 5% 需每月簽滿 $3,000 才可享用！「Chill 商戶」及「海外/網上簽賬」額外回贈每月合共上限 $150（兩者合併計算）。合資格手機支付：Apple Pay/Google Pay/Samsung Pay。❌ 不適用於 AlipayHK/WeChat Pay HK/八達通增值/網上繳費/公共事務費用/保險/P2P轉賬。Platinum 版本回贈率較低（8%/4%），門檻 $1,000。迎新：World 版簽 $5,000 送 $500 現金回贈；Platinum 版簽 $3,000 送 $300 現金回贈。",
  },
  {
    id: "boc-sogo",
    name: "BOC SOGO Visa Signature",
    bank: "BOC",
    style: { bgColor: "bg-gradient-to-br from-blue-700 to-blue-900", textColor: "text-white" },
    imageUrl: "https://www.bochk.com/dam/more/creditcard/sogo/sogo_visa_signature_card_face.png",
    rewardTimeline: "現金回贈 (下個月內入賬)",
    annualFee: 600,
    feeWaiverCondition: "首年免年費",
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 0.0666, currency: 'Points' },
    rules: [
      // T&C: 週二 SOGO 5% 現金回贈 (每月上限$100)
      { description: "週二 SOGO 5% (上限$100)", matchType: "merchant", matchValue: ["sogo"], percentage: 5.0, validDays: [2], cap: 100, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 基本回贈 0.4%，不適用於八達通增值、電子錢包充值、P2P 轉賬
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "alipay", "wechat_pay", "payme", "octopus"] },
    ],
    tags: ["SOGO", "週二SOGO 5%"],
    welcomeOfferText: "迎新簽 $5,000 送 $500 崇光禮券 / 手機簽賬 10% (上限$300)",
    applyUrl: "https://www.bochk.com/tc/creditcard/cardproduct/sogo.html",
    sellingPoints: ["週二 SOGO 5% 現金回贈 (每月上限$100)", "崇光百貨專屬優惠", "SOGO Rewards 會員專屬"],
    note: "⚠️ 週二 SOGO 5% 每月回贈上限 $100。不適用於：八達通增值、電子錢包充值/P2P轉賬（AlipayHK/PayMe/WeChat Pay）、繳稅、網上繳費。迎新二選一：$500 崇光禮券 或 手機簽賬 10% (上限$300)。",
  },
  {
    id: "boc-cheers",
    name: "BOC Cheers Visa Infinite",
    bank: "BOC",
    style: { bgColor: "bg-gradient-to-br from-neutral-800 to-black", textColor: "text-yellow-400" },
    imageUrl: "https://www.bochk.com/dam/more/creditcard/cheers/cheers_visa_infinite_card_face.png",
    rewardTimeline: "積分",
    annualFee: 1800,
    feeWaiverCondition: "首年免年費",
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 0.125, currency: 'Points' }, // 8 pts = 1 mile -> ratio 0.125
    rules: [
      // T&C: 不適用於 Alipay/WeChat Pay/PayMe
      { description: "餐飲/旅遊 10X (4% / $1.5/里)", matchType: "category", matchValue: ["dining", "travel"], percentage: 4.0, excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps", "alipay", "wechat_pay", "payme"] },
    ],
    tags: ["餐飲4%", "旅遊4%", "高級卡"],
    welcomeOfferText: "迎新簽 $12,000 送 225,000 積分 (私人財富客戶額外 +75,000)",
    sellingPoints: ["餐飲及旅遊簽賬 10X 積分 ($1.5/里)", "每年免費享用貴賓室"],
    note: "⚠️ 不適用於 Alipay/WeChat Pay/PayMe 簽賬。迎新：簽賬期內 (發卡當月+首2個曆月) 累積簽滿 $12,000 送 225,000 積分。同時持有「私人財富」或「中銀理財」賬戶可額外獲 75,000 積分。",
  },
  {
    id: "boc-gba",
    name: "BOC 大灣區一卡通",
    bank: "BOC",
    style: { bgColor: "bg-gradient-to-br from-blue-600 to-cyan-600", textColor: "text-white" },
    imageUrl: "https://www.bochk.com/dam/more/creditcard/gba/gba_diamond_card_face.png",
    annualFee: 800,
    feeWaiverCondition: "首年免年費",
    foreignCurrencyFee: 0,
    rules: [
      // T&C: 不適用於 Alipay/WeChat Pay/PayMe
      { description: "內地簽賬 4%", matchType: "base", percentage: 4.0, isForeignCurrency: true, excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps", "alipay", "wechat_pay", "payme"] },
    ],
    tags: ["大灣區", "北上"],
    welcomeOfferText: "迎新手機簽賬 10% 回贈 (上限$300)",
    sellingPoints: ["內地簽賬高達 4% 回贈", "支援內地交通乘車碼"],
    note: "⚠️ 不適用於 Alipay/WeChat Pay/PayMe 簽賬。迎新：手機簽賬 (Apple Pay/Google Pay/Samsung Pay/Huawei Pay/雲閃付 App) 享 10% 回贈，上限 $300。",
  },
  {
    id: "boc-icard",
    name: "BOC i-card",
    bank: "BOC",
    style: { bgColor: "bg-gradient-to-br from-blue-400 to-blue-600", textColor: "text-white" },
    imageUrl: "https://www.bochk.com/dam/more/creditcard/icard/icard_card_face.png",
    annualFee: 600,
    feeWaiverCondition: "首年免年費",
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 0.0666, currency: 'Points' },
    rules: [
      // T&C: 不適用於 Alipay/WeChat Pay/PayMe
      { description: "網購/手機支付 4% (10X積分)", matchType: "category", matchValue: ["online"], percentage: 4.0, cap: 11111, capType: "spending", excludeCategories: ["ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme"] }, 
      { description: "手機支付 4% (BoC Pay/Apple Pay等)", matchType: "paymentMethod", matchValue: ["mobile", "boc_pay", "apple_pay", "google_pay"], percentage: 4.0, cap: 11111, capType: "spending", excludeCategories: ["ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme"] }, 
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps", "alipay", "wechat_pay", "payme"] },
    ],
    tags: ["網購4%", "手機支付4%", "BoC Pay"],
    welcomeOfferText: "迎新手機簽賬 10% 回贈 (上限$300)",
    sellingPoints: ["網購 4% (10X積分)", "手機支付 4% (BoC Pay/Apple Pay等)", "每月額外積分上限 10,000 分"],
    note: "⚠️ 網購及手機支付 4% 需使用 BoC Pay/Apple Pay/Google Pay/Samsung Pay。不適用於 Alipay/WeChat Pay/PayMe。每月額外積分上限 10,000 分 (約 $11,111 簽賬)。迎新：手機簽賬 10% 回贈，上限 $300。",
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
    annualFee: 2000,
    feeWaiverCondition: "首年免年費",
    foreignCurrencyFee: 1.95,
    rules: [
      // T&C: 海外外幣 6% (需月簽賬滿$5,000，每月上限$500回贈)
      { description: "海外外幣簽賬 6% (需月簽$5,000)", matchType: "base", percentage: 6.0, monthlyMinSpend: 5000, isForeignCurrency: true, cap: 500, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "octopus"] },
      // T&C: 網上簽賬 5% (需月簽賬滿$5,000，與自選類別共用$500上限)
      { description: "網上簽賬 5% (需月簽$5,000)", matchType: "category", matchValue: "online", percentage: 5.0, monthlyMinSpend: 5000, cap: 500, capType: "reward", excludeCategories: ["ewallet", "utilities", "insurance"], excludePaymentMethods: ["alipay", "wechat_pay", "octopus"] },
      // T&C: 自選類別 (餐飲/電子產品/娛樂) 1% - 但網上自選會計入網上5%
      { description: "自選類別 1% (餐飲/電子/娛樂)", matchType: "category", matchValue: ["dining", "electronics", "entertainment"], percentage: 1.0, monthlyMinSpend: 5000, excludePaymentMethods: ["alipay", "wechat_pay", "octopus"] },
      // T&C: 基本回饋 0.4%，排除繳費、保險、Alipay/WeChat Pay、八達通增值
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "alipay", "wechat_pay", "octopus"] },
    ],
    tags: ["網購5%", "外幣6%", "必須登記"],
    welcomeOfferText: "迎新簽 $5,000 送 $700 +FUN Dollars (全新客戶) / $300 (現有客戶) / 學生簽$2,000送$300 (首60日)",
    sellingPoints: ["海外外幣簽賬 6% (需月簽$5,000)", "網上簽賬 5% (需月簽$5,000)", "自選類別 1% (餐飲/電子/娛樂)", "每月回贈上限 $500"],
    note: "⚠️ 需月簽賬滿 $5,000 並於 hangseng.com/mpower 登記才享優惠！迎新：全新客戶簽$5,000送$700；現有客戶簽$5,000送$300；學生簽$2,000送$300 (首60日)。13個月內取消會扣回迎新獎賞！迎新不計：八達通自動增值、電子錢包充值、繳費、稅款、分期計劃。Alipay/WeChat Pay/八達通自動增值不計回贈。網上繳費（水電費、保險等）不計回贈。",
  },
  {
    id: "hangseng-enjoy",
    name: "Hang Seng enJoy Card",
    bank: "Hang Seng",
    style: { bgColor: "bg-gradient-to-br from-red-500 to-red-700", textColor: "text-white" },
    imageUrl: "https://www.hangseng.com/content/dam/hase/config/personal/credit-cards/enjoy-card/images/enjoy-card-face.png",
    annualFee: 0,
    feeWaiverCondition: "永久免年費",
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 200, currency: 'yuu積分' }, // 200 yuu points = $1 cash
    rules: [
      // T&C: 7-Eleven 全年 95折 - 折扣優惠，非回贈
      { description: "7-Eleven 全年 95折", matchType: "merchant", matchValue: ["7-eleven"], percentage: 5.0, isDiscount: true },
      // 惠康/Market Place: 每月3/13/23日 92折 - 折扣優惠，非回贈
      { description: "惠康 92折 (3/13/23號)", matchType: "merchant", matchValue: ["wellcome"], percentage: 8.0, validDates: [3, 13, 23], isDiscount: true, minSpend: 100 },
      // 萬寧: 每月1/20日 94折 - 折扣優惠，非回贈
      { description: "萬寧 94折 (1/20號)", matchType: "merchant", matchValue: ["mannings"], percentage: 6.0, validDates: [1, 20], isDiscount: true },
      // T&C: 指定食肆 4X yuu積分 (2%) - Pizza Hut/PHD/KFC/美心中菜/美心西餐/m.a.x. concepts/美心快餐/麵包西餅店/星巴克/并并屋/魚尚
      { description: "指定食肆 4X yuu積分 (2%)", matchType: "merchant", matchValue: ["pizzahut", "phd", "kfc", "maxims", "maxims_palace", "jade_garden", "peking_garden", "starbucks", "arome", "mx", "simplylife", "canteen", "deli_o", "paper_stone", "homebake", "urban_bakery"], percentage: 2.0 },
      // T&C: 惠康/Market Place/萬寧/7-Eleven/宜家/GNC/3hreesixty/Oliver's 3X yuu積分 (1.5%)
      { description: "惠康/萬寧/7-Eleven/宜家/GNC 3X yuu積分 (1.5%)", matchType: "merchant", matchValue: ["wellcome", "market_place", "mannings", "7-eleven", "ikea", "gnc", "3hreesixty", "olivers"], percentage: 1.5 },
      // T&C: Shell 油站 2X yuu積分 (1%)
      { description: "Shell 油站 2X yuu積分 (1%)", matchType: "merchant", matchValue: ["shell"], percentage: 1.0 },
      // T&C: 美心集團其他品牌 2X yuu積分 (1%)
      { description: "美心集團其他 2X yuu積分 (1%)", matchType: "merchant", matchValue: ["maxims_other"], percentage: 1.0 },
      // T&C: 八達通自動增值計積分 (0.5%)
      { description: "八達通自動增值 1X yuu積分 (0.5%)", matchType: "paymentMethod", matchValue: ["octopus"], percentage: 0.5 },
      // T&C: 其他商戶 1X yuu積分 (0.5%)，排除電子錢包充值（八達通自動增值除外）
      { description: "基本回饋 1X yuu積分 (0.5%)", matchType: "base", percentage: 0.5, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "alipay", "wechat_pay", "payme"] },
    ],
    tags: ["儲分", "食肆優惠", "yuu積分", "折扣日", "7-Eleven 95折", "八達通增值"],
    sellingPoints: ["7-Eleven 全年 95折 [折扣]", "惠康 92折 (3/13/23號) [折扣]", "萬寧 94折 (1/20號) [折扣]", "指定食肆 4X yuu積分 (2%)", "yuu 積分可當現金使用 (200積分=$1)", "八達通自動增值計積分"],
    note: "⚠️ 【yuu積分獎賞】4X (2%)：Pizza Hut/PHD/KFC/美心中菜(翠園/美心皇宮/八月花等)/美心西餐/m.a.x. concepts(simplylife/吉谷舍等)/美心快餐(MX/can.teen)/麵包西餅(東海堂/美心西餅/Paper Stone)/星巴克/并并屋/魚尚。3X (1.5%)：7-Eleven/IKEA/萬寧/惠康/Market Place/3hreesixty/Oliver's/GNC。2X (1%)：Shell油站/美心其他品牌。1X (0.5%)：其他商戶。✅ 八達通自動增值計積分！❌ 不計積分：現金透支、分期計劃、e-Banking繳費、電子錢包充值（八達通自動增值除外）。折扣優惠與積分可同時享有！需綁定 yuu App。",
  },
  {
    id: "hangseng-travel-plus",
    name: "Hang Seng Travel+",
    bank: "Hang Seng",
    style: { bgColor: "bg-gradient-to-br from-sky-500 to-blue-600", textColor: "text-white" },
    imageUrl: "https://www.hangseng.com/content/dam/hase/config/personal/credit-cards/travel-plus-card/images/travel-plus-card-face.png",
    annualFee: 2000,
    feeWaiverCondition: "首年免年費",
    foreignCurrencyFee: 1.95,
    rules: [
      // T&C: 指定國家外幣簽賬 7% (日本/韓國/泰國/新加坡/澳洲，需月簽賬滿$6,000)
      { description: "指定國家外幣 7% (日韓泰星澳)", matchType: "base", percentage: 7.0, monthlyMinSpend: 6000, isForeignCurrency: true, cap: 500, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "octopus"] },
      // T&C: 其他外幣簽賬 5% (需月簽賬滿$6,000)
      { description: "其他外幣簽賬 5%", matchType: "base", percentage: 5.0, monthlyMinSpend: 6000, isForeignCurrency: true, cap: 500, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "octopus"] },
      // T&C: 本地交通 5% (九巴/城巴/龍運/港鐵/電車/天星小輪，需月簽賬滿$6,000)
      { description: "本地交通 5% (巴士/港鐵/電車)", matchType: "category", matchValue: ["transport"], percentage: 5.0, monthlyMinSpend: 6000, cap: 500, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "octopus"] },
      // T&C: 本地餐飲 5% (不包括快餐店/酒店內食肆，需月簽賬滿$6,000)
      { description: "本地餐飲 5% (不包括快餐店)", matchType: "category", matchValue: ["dining"], percentage: 5.0, monthlyMinSpend: 6000, cap: 500, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "octopus"] },
      // T&C: 基本回饋 0.4%，排除繳費、保險、Alipay/WeChat Pay、八達通增值、電子錢包充值
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "alipay", "wechat_pay", "octopus"] },
    ],
    tags: ["旅遊7%", "餐飲5%", "交通5%", "必須登記"],
    welcomeOfferText: "迎新簽 $5,000 送 $700 Fun Dollars",
    sellingPoints: ["指定國家外幣 7% (日韓泰星澳)", "其他外幣/本地交通/餐飲 5%", "每月回贈上限 $500"],
    note: "⚠️ 需月簽賬滿 $6,000 並登記才享優惠！指定國家：日本/韓國/泰國/新加坡/澳洲。本地交通：九巴/城巴/龍運/港鐵/電車/天星小輪。餐飲不包括快餐店及酒店內食肆。Alipay/WeChat Pay/八達通自動增值/電子錢包充值不計回贈。",
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
    annualFee: 1200,
    feeWaiverCondition: "首年免年費",
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "週五六日食肆 3%", matchType: "category", matchValue: ["dining"], percentage: 3.0, validDays: [5, 6, 0], excludePaymentMethods: ["fps", "octopus"] },
      { description: "食肆/酒店 2%", matchType: "category", matchValue: ["dining", "travel"], percentage: 2.0, excludePaymentMethods: ["fps", "octopus"] },
      { description: "外幣 2%", matchType: "base", percentage: 2.0, isForeignCurrency: true },
      { description: "基本回饋 1%", matchType: "base", percentage: 1.0, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "octopus"] },
    ],
    tags: ["自動回贈", "餐飲2%", "週末餐飲3%"],
    welcomeOfferText: "迎新簽 $5,000 送 $1,200 現金回贈 (首2個月內)",
    applyUrl: "https://www.citibank.com.hk/chinese/credit-cards/citi-cash-back-card.html",
    sellingPoints: ["週五六日食肆 3% 回贈", "全球食肆及酒店 2% 回贈", "無上限，自動入賬"],
    note: "⚠️ 不適用於：FPS、八達通增值、繳稅、保費、公共事務費用。",
  },
  {
    id: "citi-rewards",
    name: "Citi Rewards Card",
    bank: "Citi",
    style: { bgColor: "bg-gradient-to-r from-blue-400 to-cyan-500", textColor: "text-white" },
    imageUrl: "https://www.citibank.com.hk/chinese/credit-cards/images/rewards-card.png",
    annualFee: 1800,
    feeWaiverCondition: "首年免年費",
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 0.0666, currency: 'Points' }, // 15 pts = 1 mile
    rules: [
      // 流動支付 5X (Apple Pay/Google Pay/Samsung Pay，不包括八達通增值/電子錢包增值)
      { description: "流動支付 5X (2% / $3/里)", matchType: "paymentMethod", matchValue: ["mobile", "apple_pay", "google_pay", "samsung_pay"], percentage: 2.0, cap: 50000, capType: "spending", excludeCategories: ["ewallet"], excludePaymentMethods: ["octopus", "payme", "alipay", "wechat_pay"] },
      { description: "超市/百貨 5X (2%)", matchType: "category", matchValue: ["supermarket", "department_store"], percentage: 2.0 },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["Apple Pay之選", "積分", "流動支付"],
    welcomeOfferText: "迎新簽 $5,000 送 $1,200 回贈",
    sellingPoints: ["流動支付 5X 積分 (Apple Pay/Google Pay/Samsung Pay)", "超市/百貨 5X 積分", "積分永不過期"],
    note: "⚠️ 流動支付 5X 需使用 Apple Pay/Google Pay/Samsung Pay！八達通增值/電子錢包增值不計。每月額外積分上限 50,000 分。",
  },
  {
    id: "citi-premiermiles",
    name: "Citi PremierMiles",
    bank: "Citi",
    style: { bgColor: "bg-gradient-to-br from-slate-600 to-slate-800", textColor: "text-white" },
    imageUrl: "https://www.citibank.com.hk/chinese/credit-cards/images/premiermiles-card.png",
    annualFee: 1800,
    feeWaiverCondition: "首年免年費",
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 0.0833, currency: 'Points' }, // 12 pts = 1 mile
    rules: [
      { description: "外幣簽賬 $4/里 (3%*)", matchType: "base", percentage: 2.25, isForeignCurrency: true }, // $20000/m for $3/mile promo often active
      { description: "本地簽賬 $8/里 (1.1%)", matchType: "base", percentage: 1.1, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "octopus"] },
    ],
    tags: ["旅遊", "里數"],
    welcomeOfferText: "迎新簽 $5,000 送 240,000積分 (20,000里) (首2個月內)",
    applyUrl: "https://www.citibank.com.hk/chinese/credit-cards/citi-premiermiles-card.html",
    sellingPoints: ["外幣簽賬低至 HK$3/里 (需滿額)", "免費享用機場貴賓室"],
    note: "⚠️ 不適用於：FPS、八達通增值、繳稅、保費、公共事務費用。",
  },
  {
    id: "citi-prestige",
    name: "Citi Prestige Card",
    bank: "Citi",
    style: { bgColor: "bg-gradient-to-br from-gray-700 to-gray-900", textColor: "text-white" },
    imageUrl: "https://www.citibank.com.hk/chinese/credit-cards/images/prestige-card.png",
    annualFee: 3800,
    feeWaiverCondition: "首年免年費",
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 0.0833, currency: 'Points' }, // 12 pts = 1 mile
    rules: [
      { description: "海外簽賬 $4/里", matchType: "base", percentage: 2.5, isForeignCurrency: true }, // 3pts/$ * 0.0833 = 0.25 miles/$ -> $4/mile
      { description: "本地簽賬 $6/里", matchType: "base", percentage: 1.67, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "octopus"] }, // 2pts/$ * 0.0833 = 0.166 miles/$ -> $6/mile
    ],
    tags: ["高端", "年費卡"],
    welcomeOfferText: "迎新繳年費 $3,800 送 360,000積分 (30,000里)",
    applyUrl: "https://www.citibank.com.hk/chinese/credit-cards/citi-prestige-card.html",
    sellingPoints: ["任何酒店第 4 晚免費", "無限次使用機場貴賓室", "年資獎賞"],
    note: "⚠️ 年費 $3,800。不適用於：FPS、八達通增值、繳稅、保費、公共事務費用。",
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
    annualFee: 1800,
    feeWaiverCondition: "首年免年費",
    foreignCurrencyFee: 1.95,
    rules: [
      // T&C: 指定類別 5%: 餐飲/運動服飾/健身中心/醫療 (單筆≥$300，Signature卡每月首$8,000)
      // 餐飲不包括：酒席宴會、私人宴會、酒店/百貨公司/會所內食肆
      { description: "餐飲 5% (單筆≥$300)", matchType: "category", matchValue: "dining", percentage: 5.0, minSpend: 300, cap: 8000, capType: "spending", excludePaymentMethods: ["payme", "alipay", "wechat_pay", "octopus"] },
      { description: "運動服飾/健身 5% (單筆≥$300)", matchType: "category", matchValue: ["sports", "gym", "sportswear", "sports_apparel"], percentage: 5.0, minSpend: 300, cap: 8000, capType: "spending", excludePaymentMethods: ["payme", "alipay", "wechat_pay", "octopus"] },
      // 醫療不包括獸醫
      { description: "醫療 5% (單筆≥$300)", matchType: "category", matchValue: "medical", percentage: 5.0, minSpend: 300, cap: 8000, capType: "spending", excludePaymentMethods: ["payme", "alipay", "wechat_pay", "octopus"] },
      // T&C: 其他零售 1% (包括未滿$300的指定類別)
      { description: "其他零售 1%", matchType: "base", percentage: 1.0, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "payme", "alipay", "wechat_pay", "octopus"] },
    ],
    tags: ["餐飲5%", "健身5%", "運動服飾5%", "需登記"],
    welcomeOfferText: "迎新高達 $1,000 回贈",
    sellingPoints: ["餐飲/運動服飾/健身/醫療 5% (單筆≥$300)", "其他零售 1%", "需透過 DBS Card+ App 登記"],
    note: "⚠️ 指定類別 5% 需單筆消費滿 $300 並透過 DBS Card+ App 登記！未滿 $300 只有 1%。Signature卡每月首 $8,000 享 5%。餐飲不包括酒席宴會/酒店內食肆。醫療不包括獸醫。不適用於：八達通自動增值、電子錢包增值（PayMe/支付寶/微信支付）、繳稅、繳費、保費。",
  },
  {
    id: "dbs-black",
    name: "DBS Black World Mastercard",
    bank: "DBS",
    style: { bgColor: "bg-black", textColor: "text-white" },
    imageUrl: "https://www.dbs.com.hk/personal/credit-cards/credit-cards/black-card/images/card_face_black_world_master.png",
    annualFee: 1800,
    feeWaiverCondition: "首年免年費",
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
    annualFee: 600,
    feeWaiverCondition: "首年免年費",
    foreignCurrencyFee: 1.95,
    rules: [
      // T&C: 自選類別 5%，需透過 DBS Card+ App 登記及 45 日內按「一扣即享」
      // 選項: 娛樂/網上旅遊/美容服飾/指定網上商戶等 (每月自選一項)
      { description: "自選類別 5% [需登記+一扣即享]", matchType: "category", matchValue: ["entertainment", "travel", "online", "fashion", "beauty"], percentage: 5.0, cap: 150, capType: "reward", excludeCategories: ["ewallet", "insurance", "tax"], excludePaymentMethods: ["octopus", "alipay", "wechat_pay", "payme"] },
      // T&C: 基本回贈 0.4%，排除電子錢包、八達通、繳費等
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "octopus", "alipay", "wechat_pay", "payme"] },
    ],
    tags: ["自選5%", "一扣即享", "需登記"],
    sellingPoints: ["自選類別 5% (娛樂/旅遊/美容/服飾等)", "需透過 DBS Card+ App 登記", "每月回贈上限 $150 (即$3,000簽賬)"],
    note: "⚠️ 【推廣期 2025/4/1-12/31】自選類別 5% 需：(1) 安裝 DBS Card+ App；(2) 開啟「一扣即享」通知；(3) 於 App 內登記及選擇類別；(4) 簽賬後 45 日內按「一扣即享」按鈕！逾期未按視作放棄獎賞。每月可重新選擇類別，未選擇則自動延續上月。不適用於電子錢包增值、八達通增值、繳費、保險、稅項。",
  },
  {
    id: "dbs-compass",
    name: "DBS COMPASS VISA",
    bank: "DBS",
    style: { bgColor: "bg-gradient-to-br from-red-500 to-red-700", textColor: "text-white" },
    imageUrl: "https://www.dbs.com.hk/personal/credit-cards/credit-cards/compass-visa/images/card_face_compass_visa.png",
    annualFee: 600,
    feeWaiverCondition: "首年免年費",
    foreignCurrencyFee: 1.95,
    rules: [
      // T&C「四圍簽，好 COM 賺」: 指定類別 2% (0.4% 基本 + 1.6% 額外)
      // 指定類別：AliPay/AliPayHK/WeChat Pay、百貨公司、家居傢俬、油站
      // 單筆≥$300，每月首 $12,500
      { description: "指定類別 2% (單筆≥$300) [需登記]", matchType: "category", matchValue: ["department_store", "home", "petrol"], percentage: 2.0, minSpend: 300, cap: 12500, capType: "spending", excludePaymentMethods: ["payme", "octopus"] },
      // AliPay/WeChat Pay 零售簽賬 2%
      { description: "AliPay/WeChat Pay 2% (單筆≥$300) [需登記]", matchType: "paymentMethod", matchValue: ["alipay", "wechat_pay"], percentage: 2.0, minSpend: 300, cap: 12500, capType: "spending" },
      // T&C 2025/7/2-12/31: 週三大折日：全港超市 8% (單筆≥$300，每月首$2,000)
      // Apple Pay/Google Pay/Samsung Pay 可以，支付寶/微信支付/PayMe 不可以
      { description: "週三超市 8% (單筆≥$300)", matchType: "category", matchValue: "supermarket", percentage: 8.0, validDays: [3], minSpend: 300, cap: 2000, capType: "spending", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // 基本回贈 0.4%
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "payme", "octopus", "alipay", "wechat_pay"] },
    ],
    tags: ["週三超市8%", "指定類別2%", "需登記"],
    applyUrl: "https://www.dbs.com.hk/personal-zh/cards/credit-cards/dbs-compass-visa",
    sellingPoints: ["🔥 週三超市 8% (單筆≥$300)", "指定類別 2% (百貨/家居/油站/AliPay/WeChat Pay) [需登記]", "每月首 $2,000 超市 / $12,500 指定類別"],
    note: "⚠️ 【週三大折日 2025/7/2-12/31】全港超市 8% (單筆≥$300，每月首$2,000)，✅ Apple Pay/Google Pay/Samsung Pay 可以，❌ 支付寶/微信支付/PayMe/八達通增值 不可以。【四圍簽，好 COM 賺】需透過 DBS Card+ App 登記！指定類別 2% (單筆≥$300，每月首$12,500)：AliPay/WeChat Pay、百貨公司、家居傢俬、油站。不適用於：PayMe、八達通增值、電子錢包增值、繳費、保費、繳稅。",
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
    annualFee: 0,
    feeWaiverCondition: "永久免年費",
    foreignCurrencyFee: 1.95,
    rules: [
      // 每月20日 AEON 會員日 95折 - 折扣優惠，非回贈
      { description: "每月20日 AEON 95折", matchType: "merchant", matchValue: ["aeon"], percentage: 5.0, validDates: [20], isDiscount: true },
      // T&C: 網上簽賬 6% (0.4% 基本 + 5.6% 額外)，額外獎賞每月上限 $200
      // 不包括：保險、電子錢包、AEON商戶免息分期
      { description: "網上簽賬 6%", matchType: "category", matchValue: "online", percentage: 6.0, cap: 200, capType: "reward", excludeCategories: ["ewallet", "insurance"] },
      // T&C: 日本簽賬 3% (0.4% 基本 + 2.6% 額外)，額外獎賞每月上限 $200
      // 只限日元簽賬
      { description: "日本簽賬 3% (日元)", matchType: "base", percentage: 3.0, isForeignCurrency: true, cap: 200, capType: "reward" },
      // T&C: 本地餐飲 1% (0.4% 基本 + 0.6% 額外)，額外獎賞每月上限 $200
      // 包括：酒樓、餐廳、快餐店及酒店餐飲
      { description: "本地餐飲 1%", matchType: "category", matchValue: ["dining"], percentage: 1.0, cap: 200, capType: "reward" },
      // T&C: 其他簽賬 0.4%，排除電子錢包、八達通、保險、AEON Netmember繳費
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "octopus", "alipay", "wechat_pay", "payme"] },
    ],
    tags: ["網購6%", "日本3%", "本地餐飲1%", "AEON會員日"],
    welcomeOfferText: "迎新高達 $900 回贈 (Apple Pay/Google Pay 10%上限$500 + 指定類別$200 + App申請$200)",
    sellingPoints: ["每月20日 AEON 95折 [折扣]", "網上簽賬 6% (上限$200回贈)", "日本簽賬 3%", "本地餐飲 1%", "永久免年費"],
    note: "⚠️ 每月20日 AEON 95折是購物時直接減價，非事後回贈。額外獎賞每月合共上限 $200 WAKU COIN（基本獎賞 0.4% 無上限）。WAKU COIN 有效期 24 個月。迎新：(1) 簽滿$8,000後 Apple Pay/Google Pay 享10%回贈(上限$500)；(2) 指定類別簽賬各$50(八達通自動增值/繳租金/自動轉賬/App Store或Google Play)共$200；(3) 經AEON App申請輸入「WAKUWAKU」送$200。不適用於電子錢包（AlipayHK/PayMe/WeChat Pay）、八達通增值、保險繳費。",
  },
  {
    id: "aeon-card-jal",
    name: "AEON Card JAL",
    bank: "AEON",
    style: { bgColor: "bg-gradient-to-br from-red-600 to-red-800", textColor: "text-white" },
    imageUrl: "https://www.aeon.com.hk/tc/privileges/promotion_images/jal_mastercard_card_face.png",
    annualFee: 300,
    feeWaiverCondition: "首年免年費",
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
  {
    id: "aeon-visa",
    name: "AEON Visa 信用卡",
    bank: "AEON",
    style: { bgColor: "bg-gradient-to-br from-blue-500 to-blue-700", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 250, currency: 'Points' }, // 250 積分 = $1 回贈
    rules: [
      // 每月20日 AEON 會員日 95折 - 折扣優惠，非回贈
      { description: "每月20日 AEON 95折", matchType: "merchant", matchValue: ["aeon"], percentage: 5.0, validDates: [20], isDiscount: true },
      // 基本回贈：$1 = 1 積分，250 積分 = $1 回贈 (0.4%)
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "octopus", "alipay", "wechat_pay", "payme"] },
    ],
    tags: ["AEON會員日", "永久免年費"],
    feeWaiverCondition: "永久免年費",
    welcomeOfferText: "迎新簽 $6,000 送 175,000 積分 ($700) (需手機支付$1,000+App申請)",
    applyUrl: "https://www.aeon.com.hk/tc/credit-card/",
    sellingPoints: ["每月20日 AEON 95折 [折扣]", "永久免年費", "迎新高達 $700 回贈"],
    note: "⚠️ 每月20日 AEON 95折是購物時直接減價，非事後回贈。迎新：(1) 簽滿$6,000送100,000積分($400)；(2) 當中$1,000透過手機支付額外25,000積分($100)；(3) 經官網/App申請額外50,000積分($200)。不適用於電子錢包增值/轉賬、八達通自動增值、AEON Netmember繳費。",
  },
  {
    id: "aeon-mastercard",
    name: "AEON 萬事達信用卡",
    bank: "AEON",
    style: { bgColor: "bg-gradient-to-br from-orange-500 to-red-600", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 250, currency: 'Points' }, // 250 積分 = $1 回贈
    rules: [
      // 每月20日 AEON 會員日 95折 - 折扣優惠，非回贈
      { description: "每月20日 AEON 95折", matchType: "merchant", matchValue: ["aeon"], percentage: 5.0, validDates: [20], isDiscount: true },
      // 基本回贈：$1 = 1 積分，250 積分 = $1 回贈 (0.4%)
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "octopus", "alipay", "wechat_pay", "payme"] },
    ],
    tags: ["AEON會員日", "永久免年費"],
    feeWaiverCondition: "永久免年費",
    welcomeOfferText: "迎新簽 $6,000 送 175,000 積分 ($700) (需手機支付$1,000+App申請)",
    applyUrl: "https://www.aeon.com.hk/tc/credit-card/",
    sellingPoints: ["每月20日 AEON 95折 [折扣]", "永久免年費", "迎新高達 $700 回贈"],
    note: "⚠️ 每月20日 AEON 95折是購物時直接減價，非事後回贈。迎新：(1) 簽滿$6,000送100,000積分($400)；(2) 當中$1,000透過手機支付額外25,000積分($100)；(3) 經官網/App申請額外50,000積分($200)。不適用於電子錢包增值/轉賬、八達通自動增值、AEON Netmember繳費。",
  },
  {
    id: "aeon-unionpay",
    name: "AEON 銀聯信用卡",
    bank: "AEON",
    style: { bgColor: "bg-gradient-to-br from-red-600 to-red-800", textColor: "text-white" },
    foreignCurrencyFee: 0, // 銀聯通常免外幣手續費
    rewardConfig: { method: 'conversion', ratio: 250, currency: 'Points' }, // 250 積分 = $1 回贈
    rules: [
      // 每月20日 AEON 會員日 95折 - 折扣優惠，非回贈
      { description: "每月20日 AEON 95折", matchType: "merchant", matchValue: ["aeon"], percentage: 5.0, validDates: [20], isDiscount: true },
      // 基本回贈：$1 = 1 積分，250 積分 = $1 回贈 (0.4%)
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "octopus", "alipay", "wechat_pay", "payme"] },
    ],
    tags: ["AEON會員日", "永久免年費", "銀聯"],
    feeWaiverCondition: "永久免年費",
    welcomeOfferText: "迎新簽 $6,000 送 175,000 積分 ($700) (需手機支付$1,000+App申請)",
    applyUrl: "https://www.aeon.com.hk/tc/credit-card/",
    sellingPoints: ["每月20日 AEON 95折 [折扣]", "永久免年費", "迎新高達 $700 回贈", "銀聯網絡適合內地消費"],
    note: "⚠️ 每月20日 AEON 95折是購物時直接減價，非事後回贈。迎新：(1) 簽滿$6,000送100,000積分($400)；(2) 當中$1,000透過手機支付額外25,000積分($100)；(3) 經官網/App申請額外50,000積分($200)。銀聯卡適合內地消費。不適用於電子錢包增值/轉賬、八達通自動增值、AEON Netmember繳費。",
  },
  {
    id: "aeon-jcb",
    name: "AEON JCB 信用卡",
    bank: "AEON",
    style: { bgColor: "bg-gradient-to-br from-green-600 to-green-800", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 250, currency: 'Points' }, // 250 積分 = $1 回贈
    rules: [
      // 每月20日 AEON 會員日 95折 - 折扣優惠，非回贈
      { description: "每月20日 AEON 95折", matchType: "merchant", matchValue: ["aeon"], percentage: 5.0, validDates: [20], isDiscount: true },
      // 基本回贈：$1 = 1 積分，250 積分 = $1 回贈 (0.4%)
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "octopus", "alipay", "wechat_pay", "payme"] },
    ],
    tags: ["AEON會員日", "永久免年費", "JCB", "日本"],
    feeWaiverCondition: "永久免年費",
    // JCB 不適用手機支付獎賞，所以最高只有 150,000 積分
    welcomeOfferText: "迎新簽 $6,000 送 150,000 積分 ($600) (需App申請，手機支付獎賞除外)",
    applyUrl: "https://www.aeon.com.hk/tc/credit-card/",
    sellingPoints: ["每月20日 AEON 95折 [折扣]", "永久免年費", "迎新高達 $600 回贈", "JCB 網絡適合日本消費"],
    note: "⚠️ 每月20日 AEON 95折是購物時直接減價，非事後回贈。迎新：(1) 簽滿$6,000送100,000積分($400)；(2) 經官網/App申請額外50,000積分($200)。⚠️ JCB 卡不適用手機支付獎賞！JCB 卡適合日本消費。不適用於電子錢包增值/轉賬、八達通自動增值、AEON Netmember繳費。",
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
      // T&C: 手機支付/網購 4.4% (每月消費 $2,000-$5,000)
      // 電子錢包充值不計 (PayMe/八達通自動增值除外)
      { description: "手機支付 4.4% (月消費$2000-$5000)", matchType: "paymentMethod", matchValue: ["mobile"], percentage: 4.4, monthlyMinSpend: 2000, cap: 5000, capType: "spending", excludeCategories: ["ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      { description: "網購 4.4% (月消費$2000-$5000)", matchType: "category", matchValue: "online", percentage: 4.4, monthlyMinSpend: 2000, cap: 5000, capType: "spending", excludeCategories: ["ewallet", "utilities", "insurance", "supermarket", "government"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 基本獎賞 0.4%
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "alipay", "wechat_pay", "payme", "octopus"] },
    ],
    tags: ["手機支付", "網購", "4.4%"],
    welcomeOfferText: "迎新簽 $3,000 送 $300 現金回贈 (首2個月內)",
    applyUrl: "https://www.hkbea.com/html/tc/bea-goal-credit-card.html",
    sellingPoints: ["手機支付及網購 4.4% 回贈", "每月消費 $2,000-$5,000 享優惠", "無需登記"],
    note: "⚠️ 手機支付/網購 4.4% 需每月消費 $2,000-$5,000！未滿 $2,000 或超過 $5,000 部分只有 0.4%。迎新：首2個月簽滿 $3,000 送 $300 現金回贈（2026年5月31日前存入）。迎新不適用於：超級市場、政府部門、電子錢包(AlipayHK/PayMe/WeChat Pay)、八達通增值。開卡後 12 個月內取消卡將被扣除迎新獎賞。",
  },
  {
    id: "bea-world-master",
    name: "BEA Flyer World Mastercard",
    bank: "東亞銀行",
    style: { bgColor: "bg-gradient-to-br from-sky-600 to-blue-800", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'direct_rate', baseRate: 5, currency: 'Miles' }, // $5/mile base, better for dining/overseas
    rules: [
      // T&C: 本地食肆 6X 獎分 (2.4%)
      { description: "本地食肆 6X (2.4%)", matchType: "category", matchValue: ["dining"], percentage: 2.4, excludePaymentMethods: ["fps", "alipay", "wechat_pay", "payme"] },
      // T&C: 外幣簽賬 4X 獎分 (1.6%)
      { description: "外幣簽賬 4X (1.6%)", matchType: "base", percentage: 1.6, isForeignCurrency: true, excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
      // T&C: 基本獎賞 1X 獎分 (0.4%)
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "alipay", "wechat_pay", "payme", "octopus"] },
    ],
    tags: ["里數", "Flyer", "食肆6X", "外幣4X"],
    welcomeOfferText: "迎新簽 $4,000 送 $400 現金回贈 / 簽 $100,000 送 70,000 里 (首3個月)",
    sellingPoints: ["本地食肆 6X 獎分 (2.4%)", "外幣簽賬 4X 獎分 (1.6%)", "積分無限期", "亞洲萬里通直接入賬"],
    applyUrl: "https://www.hkbea.com/html/tc/bea-flyer-world-mastercard.html",
    note: "⚠️ 迎新：簽$4,000送$400回贈 或 簽$5,000-$100,000送5,000-70,000里 (首3個月)。迎新不計：超市、政府部門、電子錢包(Alipay/PayMe/WeChat Pay)、八達通增值、保險、售票網絡。12個月內取消會扣回迎新獎賞！不適用於：電子錢包充值、保費、透過電子網絡繳款。八達通自動增值/政府部門簽賬每月上限 $40 回贈。",
  },
  {
    id: "bea-i-titanium",
    name: "BEA i-Titanium Card",
    bank: "東亞銀行",
    style: { bgColor: "bg-gradient-to-br from-gray-400 to-gray-600", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      // T&C: 網上簽賬 5X 獎分 (每月上限 20,000 獎分)
      // 5X = 5 獎分/$1 = 2% (以 250分=$1 計)
      { description: "網上簽賬 5X (2%)", matchType: "category", matchValue: "online", percentage: 2.0, cap: 20000, capType: "reward", excludeCategories: ["ewallet", "utilities", "insurance"] },
      // T&C: 網上繳費 1X 獎分 (0.4%)
      { description: "網上繳費 1X (0.4%)", matchType: "category", matchValue: ["utilities"], percentage: 0.4 },
      // T&C: 基本獎賞 1X 獎分 (0.4%)
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["網購5X", "老牌"],
    applyUrl: "https://www.hkbea.com/html/tc/bea-i-titanium-card.html",
    sellingPoints: ["網上簽賬 5X 獎分 (2%)", "每月網上獎分上限 20,000", "優先預訂演唱會票"],
    note: "⚠️ 網上簽賬 5X 每月獎分上限 20,000。不適用於：電子錢包充值、保費、透過電子網絡繳款。八達通自動增值/政府部門簽賬每月上限 $40 回贈。",
  },

  // ========================================================================
  // PrimeCredit 安信 / WeWa
  // ========================================================================
  {
    id: "earnmore",
    name: "安信 EarnMORE 銀聯卡",
    bank: "安信",
    style: { bgColor: "bg-gradient-to-br from-blue-600 to-indigo-700", textColor: "text-white" },
    imageUrl: "https://www.primecredit.com/credit-card/images/earnmore_card_face.png",
    rewardTimeline: "現金回贈下期月結單入賬",
    annualFee: 250,
    feeWaiverCondition: "首年免年費",
    foreignCurrencyFee: 0,
    rules: [
      // T&C: 全方位 2% 現金回贈 (1% 基本 + 1% 加碼)
      // 加碼回贈上限 $1,500/年 (即總簽賬上限 $150,000/年)
      // ❌ 不包括：八達通自動增值、電子錢包充值/繳費、P2P 轉賬
      { description: "全方位 2%", matchType: "base", percentage: 2.0, cap: 1500, capType: "reward", excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "octopus", "alipay", "wechat_pay", "payme"] },
    ],
    tags: ["全方位2%", "懶人必備", "免外幣手續費"],
    welcomeOfferText: "迎新簽 $8,500 送 $500 回贈 / 洗碗機 (首90天內)",
    applyUrl: "https://www.primecredit.com/credit-card/earnmore/",
    sellingPoints: ["全方位 2% 現金回贈", "1% 加碼回贈上限 $1,500/年", "免外幣手續費", "無需登記"],
    note: "⚠️ 2% 回贈 = 1% 基本 + 1% 加碼（1% 加碼上限 $1,500/年，即有效簽賬 $150,000/年）。不適用於：八達通自動增值、電子錢包充值/繳費（包括 AlipayHK/PayMe/WeChat Pay）、P2P 轉賬、賭場交易。迎新：簽 $8,500 送 $500 / 簽 $8,800 送平板 / 簽 $9,500 送洗碗機。",
  },
  {
    id: "wewa-unionpay",
    name: "WeWa 銀聯卡",
    bank: "安信",
    style: { bgColor: "bg-gradient-to-br from-yellow-300 to-yellow-500", textColor: "text-black" },
    imageUrl: "https://www.wewacard.com/images/card_face.png",
    annualFee: 600,
    feeWaiverCondition: "首年免年費",
    foreignCurrencyFee: 0,
    rules: [
      // T&C: 玩樂類別 4 選 1 (3.6% 額外 + 0.4% 基本 = 4%)，需月簽$1,500，每月回贈上限 $200
      // 1. 手機支付 (Apple Pay/銀聯手機閃付/銀聯二維碼)
      { description: "手機支付 4% (需月簽$1500)", matchType: "paymentMethod", matchValue: ["mobile", "apple_pay"], percentage: 4.0, monthlyMinSpend: 1500, cap: 200, capType: "reward", excludeCategories: ["ewallet"], excludePaymentMethods: ["octopus", "alipay", "wechat_pay", "payme"] },
      // 2. 旅遊簽賬 (旅行社/航空公司/酒店客房)
      { description: "旅遊 4% (需月簽$1500)", matchType: "category", matchValue: ["travel"], percentage: 4.0, monthlyMinSpend: 1500, cap: 200, capType: "reward", excludePaymentMethods: ["octopus", "alipay", "wechat_pay", "payme"] },
      // 3. 海外簽賬 (外幣交易)
      { description: "海外 4% (需月簽$1500)", matchType: "base", percentage: 4.0, isForeignCurrency: true, monthlyMinSpend: 1500, cap: 200, capType: "reward", excludePaymentMethods: ["octopus", "alipay", "wechat_pay", "payme"] },
      // 4. 線上娛樂 (Netflix/Spotify/Disney+/YouTube/Steam/PlayStation/Xbox等)
      { description: "線上娛樂 4% (需月簽$1500)", matchType: "merchant", matchValue: ["netflix", "spotify", "disney-plus", "youtube", "steam", "playstation", "xbox", "nintendo", "kkbox", "joox", "mytv-super", "patreon", "apple-app-store", "google-play"], percentage: 4.0, monthlyMinSpend: 1500, cap: 200, capType: "reward", excludePaymentMethods: ["octopus", "alipay", "wechat_pay", "payme"] },
      // T&C: 八達通自動增值 0.4% (合資格交易)
      { description: "八達通自動增值 0.4%", matchType: "paymentMethod", matchValue: ["octopus"], percentage: 0.4 },
      // T&C: 基本回贈 0.4%，排除電子錢包充值、P2P轉賬、賭場等
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "alipay", "wechat_pay", "payme"] },
    ],
    tags: ["玩樂4%", "旅遊4%", "海外4%", "線上娛樂4%", "八達通增值"],
    welcomeOfferText: "迎新簽 $8,500 送 $500 現金回贈 / 簽 $8,800 送 LG顯示器或Marshall喇叭 (首90天)",
    sellingPoints: ["玩樂類別 4% (4選1: 手機支付/旅遊/海外/線上娛樂)", "每月回贈上限 $200", "免外幣手續費", "八達通增值 0.4%"],
    note: "⚠️ 玩樂類別 4% 需 4 選 1，需每月簽滿 $1,500，每月回贈上限 $200。如未選擇，自動選擇「手機支付」。線上娛樂包括：Netflix/Spotify/Disney+/YouTube/Steam/PlayStation/Xbox/Nintendo/KKBOX/JOOX/MyTV SUPER。⚠️ 手機支付暫不支援 WeWa Visa + Android 組合。✅ 八達通自動增值計 0.4% 基本回贈（無上限）！不適用於電子錢包充值/P2P轉賬（Alipay/WeChat Pay/PayMe）、賭場交易、分期計劃。",
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
    rewardConfig: { method: 'conversion', ratio: 250, currency: 'Points' }, // 250 積分 = $1 回贈 (0.4%)
    rules: [
      // T&C: 本地餐飲/外賣平台 高達11% (需登記，月簽$8,000享9%+2%積分)，推廣期 2025年7月-12月
      { description: "本地餐飲/外賣 高達11% (需登記)", matchType: "category", matchValue: ["dining"], percentage: 11.0, monthlyMinSpend: 8000, cap: 800, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 本地交通 2% (需登記)，推廣期 2025年7月-12月
      { description: "本地交通 2% (需登記)", matchType: "category", matchValue: ["transport"], percentage: 2.0, cap: 400, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 網上零售交易 5X 積分 (2%)，每曆年額外4倍積分上限 300,000
      { description: "網購 5X積分 (2%)", matchType: "category", matchValue: ["online"], percentage: 2.0, excludeCategories: ["ewallet", "insurance", "tax", "government"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: Visa 感應式付款 5X 積分 (2%)，每曆年額外4倍積分上限 300,000
      { description: "Visa感應式支付 5X積分 (2%)", matchType: "paymentMethod", matchValue: ["contactless", "apple_pay", "google_pay", "samsung_pay"], percentage: 2.0, excludeCategories: ["ewallet", "insurance", "tax", "government"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // 基本回贈 0.4%，排除電子錢包、八達通、繳費等
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "octopus", "alipay", "wechat_pay", "payme"] },
    ],
    tags: ["餐飲11%", "交通2%", "網購2%", "需登記"],
    welcomeOfferText: "迎新簽 $6,000 送 $600 現金回贈 (首2個月) / Chill分期$15,000送$800 (首3個月)",
    sellingPoints: ["本地餐飲/外賣高達 11% (需登記)", "本地交通 2%", "網購及感應式支付 2%", "迎新高達 $800 現金回贈"],
    note: "⚠️ 【限時推廣 2025年7月-12月】本地餐飲/外賣高達 11% 需每月經 App 登記（首2,000名），月簽$8,000享9%+2%積分，每階段上限$800。本地交通 2% 每階段上限$400。網購/感應式支付 5X 積分，每曆年額外積分上限 300,000。不適用於電子錢包、酒店/會所餐飲、保險、RentSmart。迎新：(1) Chill分期$15,000送$800；(2) 簽$6,000送$600。兩者只可選一。",
  },
  {
    id: "icbc-horoscope",
    name: "ICBC 宇宙星座 Visa Signature",
    bank: "ICBC",
    style: { bgColor: "bg-gradient-to-br from-indigo-800 to-purple-900", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 8, currency: 'Miles' }, // 8分=1公里 (國航)
    rules: [
      // T&C: $1 = 1 分，可換現金回贈或飛行里數
      // 國航 8分=1公里，港航 10分=1金鵬里數
      { description: "本地/海外簽賬 1.5%", matchType: "base", percentage: 1.5, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["星座卡", "高回贈", "飛行里數"],
    welcomeOfferText: "迎新簽 $3,000 送 $700 免找數簽賬額 (首2個月內)",
    applyUrl: "https://www.icbcasia.com/tc/personal/cards/credit-cards/horoscope-visa-signature-card/",
    sellingPoints: ["本地及海外簽賬 1.5% 現金回贈", "自選星座設計", "積分可換國航/港航里數"],
    note: "⚠️ 每 $1 = 1 分。可換國航里數 (8分=1公里) 或港航里數 (10分=1金鵬里數)。積分有效期最少 1 年。迎新：首2個月簽 $3,000 送 $700 免找數簽賬額。發卡後 12 個月內取消卡將被扣除迎新等值金額。",
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
      // T&C: 食肆及網上簽賬 6%，需每月累積簽滿 $3,800，額外回贈上限 $200
      // 不包括：酒店餐飲、美食廣場/超市/百貨公司內食肆、麵包房、糕點商店
      // 網上不包括：超級市場網上平台
      { description: "食肆 6% (月簽$3800)", matchType: "category", matchValue: ["dining"], percentage: 6.0, monthlyMinSpend: 3800, cap: 200, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "fps", "octopus"] },
      { description: "網上簽賬 6% (月簽$3800)", matchType: "category", matchValue: ["online"], percentage: 6.0, monthlyMinSpend: 3800, cap: 200, capType: "reward", excludeCategories: ["ewallet", "supermarket"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "fps", "octopus"] },
      // T&C: 基本回贈 0.55%，排除電子錢包、八達通、繳費等
      { description: "基本回饋 0.55%", matchType: "base", percentage: 0.55, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "octopus", "alipay", "wechat_pay", "payme"] },
    ],
    tags: ["餐飲6%", "網購6%", "月簽$3800"],
    sellingPoints: ["食肆及網上簽賬 6% (需月簽$3,800)", "額外回贈每月上限 $200", "基本回贈 0.55%"],
    note: "⚠️ 食肆/網上 6% 需每月累積簽滿 $3,800！額外回贈上限 $200/月。不適用於：酒店餐飲、美食廣場/超市內食肆、超市網購平台、電子錢包（支付寶/微信支付/PayMe）、八達通增值。",
  },
  {
    id: "fubon-titanium",
    name: "富邦 Titanium 卡",
    bank: "富邦銀行",
    style: { bgColor: "bg-gradient-to-br from-blue-800 to-indigo-900", textColor: "text-white" },
    imageUrl: "https://www.fubonbank.com.hk/web/html/cc_platinum_card_face.png",
    foreignCurrencyFee: 1.95,
    rules: [
      // T&C: 新台幣簽賬 20X 積分 = 8%，每月上限 80,000 額外積分，全年 240,000
      { description: "新台幣簽賬 8% (20X)", matchType: "base", percentage: 8.0, isForeignCurrency: true, cap: 80000, capType: "reward" },
      // T&C: 日圓/韓圜簽賬 10X 積分 = 4%，每月上限 80,000 額外積分
      { description: "日圓/韓圜簽賬 4% (10X)", matchType: "base", percentage: 4.0, isForeignCurrency: true, cap: 80000, capType: "reward" },
      // T&C: 非港幣簽賬 5X 積分 = 2%
      { description: "其他外幣簽賬 2% (5X)", matchType: "base", percentage: 2.0, isForeignCurrency: true },
      // T&C: 本地網上商戶 高達 10X 積分 = 4% (需登記)
      { description: "本地網上 4% [需登記]", matchType: "category", matchValue: "online", percentage: 4.0 },
      // T&C: 星期六日滿$300 2X 積分 = 0.8%
      { description: "週六日滿$300 0.8% (2X)", matchType: "base", percentage: 0.8, validDays: [0, 6], minSpend: 300 },
      // T&C: 本地簽賬/八達通自動增值 1X 積分 = 0.4%
      { description: "本地簽賬 0.4% (1X)", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["台灣8%", "日韓4%", "網上4%"],
    sellingPoints: ["🇹🇼 新台幣簽賬 8% (20X)", "🇯🇵🇰🇷 日韓簽賬 4% (10X)", "其他外幣 2%", "本地網上 4% [需登記]"],
    note: "⚠️ 台幣/日韓額外積分每月上限 80,000 (全年 240,000)。本地網上 4% 需致電 2566 8181 登記 (按1>7>2)。週六日滿 $300 享額外積分。積分可兌換現金回贈或亞洲萬里通里數 (15分=1里)。不適用於：稅務、保險、水電費繳費、分期付款。",
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
    hidden: true, // 暫時隱藏
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
      // T&C: 網上零售簽賬 8% (單筆滿$500，需月簽非網上$1,000)
      { description: "網購 8% (單筆滿$500)", matchType: "category", matchValue: "online", percentage: 8.0, minSpend: 500, monthlyMinSpend: 1000, cap: 200, capType: "reward", excludeCategories: ["ewallet", "utilities", "insurance"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "fps", "octopus"] },
      // T&C: 指定本地公共交通工具 8% (城巴/九巴/龍運/港鐵/電車/天星小輪)
      { description: "交通 8% (巴士/港鐵/電車)", matchType: "category", matchValue: ["transport"], percentage: 8.0, monthlyMinSpend: 1000, cap: 200, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "fps", "octopus"] },
      // T&C: 指定商戶 3%
      { description: "指定商戶 3%", matchType: "merchant", matchValue: ["mcdonalds", "adidas"], percentage: 3.0, monthlyMinSpend: 1000, excludePaymentMethods: ["alipay", "wechat_pay", "payme", "fps", "octopus"] },
      // T&C: 基本回饋 0.4%，排除電子錢包、八達通增值、繳稅、保險
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "alipay", "wechat_pay", "payme", "octopus"] },
    ],
    tags: ["網購8%", "交通8%", "需月簽$1,000"],
    sellingPoints: ["網上簽賬 8% (單筆滿$500)", "交通 8% (巴士/港鐵/電車)", "每月回贈上限 $200"],
    note: "⚠️ 需每月累積非網上零售簽賬滿 $1,000 方可享 8% 回贈！網購需單筆滿 $500。每月回贈上限 $200。不適用於電子錢包（Alipay/WeChat Pay/PayMe）、八達通增值。港鐵只適用於拍卡出入閘（不包括機場快綫/輕鐵/港鐵巴士）。",
  },
  {
    id: "sim-world-mastercard",
    name: "sim World Mastercard",
    bank: "sim",
    style: { bgColor: "bg-gradient-to-br from-indigo-800 to-indigo-950", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      // T&C: 網上零售簽賬 8% (單筆滿$500，需月簽非網上$1,000)
      { description: "網購 8% (單筆滿$500)", matchType: "category", matchValue: "online", percentage: 8.0, minSpend: 500, monthlyMinSpend: 1000, cap: 200, capType: "reward", excludeCategories: ["ewallet", "utilities", "insurance"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "fps", "octopus"] },
      // T&C: 海外零售簽賬 8% (外幣簽賬，需月簽非網上$1,000)
      { description: "海外簽賬 8%", matchType: "base", percentage: 8.0, isForeignCurrency: true, monthlyMinSpend: 1000, cap: 200, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "fps", "octopus"] },
      // T&C: 指定商戶 3%
      { description: "指定商戶 3%", matchType: "merchant", matchValue: ["mcdonalds", "adidas"], percentage: 3.0, monthlyMinSpend: 1000, excludePaymentMethods: ["alipay", "wechat_pay", "payme", "fps", "octopus"] },
      // T&C: 基本回饋 0.4%，排除電子錢包、八達通增值、繳稅、保險
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "alipay", "wechat_pay", "payme", "octopus"] },
    ],
    tags: ["網購8%", "海外8%", "需月簽$1,000"],
    sellingPoints: ["網上簽賬 8% (單筆滿$500)", "海外簽賬 8%", "每月回贈上限 $200"],
    note: "⚠️ 需每月累積非網上零售簽賬滿 $1,000 方可享 8% 回贈！網購需單筆滿 $500。每月回贈上限 $200。不適用於電子錢包（Alipay/WeChat Pay/PayMe）、八達通增值。",
  },
  // === 新增卡片 ===
  {
    id: "citi-octopus",
    name: "Citi 八達通白金卡",
    bank: "Citi",
    style: { bgColor: "bg-gradient-to-br from-orange-500 to-orange-700", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      // T&C: 15% 交通回贈推廣 (2025/10/1-2026/3/31)，需登記，月簽$4,000，上限$300
      { description: "交通 15% (港鐵/巴士/渡輪/小巴/電車/的士) [需登記]", matchType: "category", matchValue: ["transport"], percentage: 15.0, monthlyMinSpend: 4000, cap: 300, capType: "reward" },
      // T&C: 月簽$10,000 可額外獲 5% 隧道/泊車/電車充電回贈，合共上限$500
      { description: "隧道/泊車/電車充電 5% (月簽$10,000) [需登記]", matchType: "category", matchValue: ["tunnel_fee", "parking"], percentage: 5.0, monthlyMinSpend: 10000, cap: 500, capType: "reward" },
      { description: "八達通自動增值 0.5%", matchType: "paymentMethod", matchValue: ["octopus"], percentage: 0.5 },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps", "alipay", "wechat_pay", "payme"] },
    ],
    tags: ["八達通", "交通15%", "需登記"],
    welcomeOfferText: "迎新簽 $5,000 + 1次$500自動增值 送 $2,500 現金回贈 (首2個月內)",
    applyUrl: "https://www.citibank.com.hk/chinese/credit-cards/citi-octopus-card.html",
    sellingPoints: ["🔥 交通 15% 回贈 (限時至2026/3/31)", "內置八達通功能", "隧道/泊車 5% (月簽$10,000)"],
    note: "⚠️ 【限時推廣 2025/10/1-2026/3/31】交通 15% 回贈需登記 (citibank.hk/transreg)，月簽滿 $4,000 可獲 15% 車費回贈 (上限$300)；月簽滿 $10,000 可額外獲 5% 隧道/泊車/電車充電回贈 (合共上限$500)。合資格交通：港鐵、九巴、龍運、城巴、渡輪、綠色專線小巴、電車、的士。不適用於：FPS、繳稅、保費、電子錢包增值/轉賬、八達通自動增值（計算門檻）。",
  },
  {
    id: "ccb-travo",
    name: "建行(亞洲) TRAVO World Mastercard",
    bank: "建行(亞洲)",
    style: { bgColor: "bg-gradient-to-br from-sky-600 to-blue-800", textColor: "text-white" },
    foreignCurrencyFee: 0,
    rewardConfig: { method: 'direct_rate', baseRate: 6, currency: 'AM' }, // $6/mile standard, better with TRAVO Rewards
    rules: [
      // T&C: 海外指定商戶 15% 回贈 (2025/7/1-12/31)
      { description: "指定海外商戶 15% [限時]", matchType: "merchant", matchValue: ["biccamera", "king-power", "lotte-duty-free", "shilla-duty-free", "bicester-village", "burberry"], percentage: 15.0, isForeignCurrency: true },
      // T&C: TRAVO Rewards 海外簽賬 10 倍積分 (需登記)，上限 400,000 額外積分
      { description: "海外簽賬 10X積分 [需登記]", matchType: "base", percentage: 4.0, isForeignCurrency: true, cap: 400000, capType: "reward", excludePaymentMethods: ["alipay", "payme", "wechat_pay", "octopus"] },
      // T&C: TRAVO Rewards 本地餐飲 5 倍積分 (需登記)，上限 100,000 額外積分
      { description: "本地餐飲 5X積分 [需登記]", matchType: "category", matchValue: ["dining"], percentage: 2.0, cap: 100000, capType: "reward", excludePaymentMethods: ["alipay", "payme", "wechat_pay", "octopus"] },
      // 基本回饋 0.4%
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "payme", "wechat_pay", "octopus"] },
    ],
    tags: ["海外10X", "餐飲5X", "免外幣手續費", "需登記", "指定商戶15%"],
    welcomeOfferText: "迎新簽 $6,000 送 $600 現金回贈 (首2個月內)",
    applyUrl: "https://www.asia.ccb.com/hongkong/personal/credit-cards/travo-world-mastercard.html",
    sellingPoints: ["🔥 指定海外商戶 15% 回贈 [限時]", "海外簽賬 10X 積分 [需登記]", "本地餐飲 5X 積分 [需登記]", "免外幣手續費"],
    note: "⚠️ 【指定海外商戶 15% 回贈】推廣期 2025/7/1-12/31，分兩階段，每階段每商戶可享1次。指定商戶包括：🇯🇵 BicCamera、JR EAST SUICA (Apple Pay)；🇰🇷 樂天/新羅/新世界免稅店；🇹🇭 King Power、Emporium、Paragon；🇬🇧 Bicester Village、Burberry、文華東方；🇫🇷🇮🇹🇪🇸 歐洲 Outlet Village 等。【TRAVO Rewards 需登記】海外 10X 積分 (上限 400,000)；餐飲 5X 積分 (上限 100,000)。不計：電子錢包、八達通、保險、稅項、賭博。",
  },
  {
    id: "dahsing-myauto",
    name: "大新 MyAuto 車主信用卡",
    bank: "大新銀行",
    style: { bgColor: "bg-gradient-to-br from-blue-600 to-blue-800", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      // T&C: 汽車相關簽賬包括：易通行隧道費、購買汽車、時租泊車、洗車、汽車美容、汽車維修、汽車零件、汽車保養、拖車服務、電動汽車充電、油站消費
      { description: "油站/汽車相關 4%", matchType: "category", matchValue: ["petrol", "parking", "car_service"], percentage: 4.0 },
      { description: "易通行隧道費 4%", matchType: "merchant", matchValue: ["hket"], percentage: 4.0 },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"] },
    ],
    tags: ["油站4%", "汽車", "易通行", "車主專享"],
    sellingPoints: ["油站簽賬 4% 回贈", "汽車相關消費 4% (維修/泊車/充電)", "易通行隧道費 4%", "專為車主而設"],
    note: "⚠️ 汽車相關簽賬包括：易通行隧道費、購買汽車、時租泊車、洗車、汽車美容、汽車維修、汽車零件、汽車保養、拖車服務、電動汽車充電、油站消費。",
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
      // VIP會員 6倍易賞錢 (2.4%) - 回贈，需綁定易賞錢App
      { description: "百佳/屈臣氏/豐澤 VIP 2.4%", matchType: "merchant", matchValue: ["parknshop", "watsons", "fortress"], percentage: 2.4 },
      // 最紅自主獎賞 (需登記) - 回贈
      { description: "最紅自主獎賞 2.4%", matchType: "category", matchValue: ["dining", "supermarket", "lifestyle", "home", "entertainment"], percentage: 2.4, cap: 25000, capType: "spending", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "alipay", "wechat_pay", "payme", "octopus"] },
    ],
    tags: ["易賞錢", "百佳", "屈臣氏", "折扣日"],
    feeWaiverCondition: "首兩年免年費",
    welcomeOfferText: "迎新送一年「易賞錢」VIP 會籍 (6倍積分) + 簽 $5,800 送 $600 獎賞錢",
    applyUrl: "https://www.hsbc.com.hk/zh-hk/credit-cards/products/easy/",
    sellingPoints: ["百佳 92折 (每月2/12/22號) [折扣]", "屈臣氏 92折 (每月8/18/28號) [折扣]", "VIP會員 6倍易賞錢 (2.4%)", "最紅自主獎賞 2.4%", "首兩年免年費"],
    note: "⚠️ 折扣優惠：百佳92折需滿$100 (2/12/22號)、屈臣氏92折需滿$400 (8/18/28號)、豐澤95折需滿$2,000。折扣是購物時直接減價，非事後回贈。迎新：發卡後首 30 日內綁定「易賞錢」App 可獲一年 VIP 會籍（百佳/屈臣氏/豐澤 6 倍積分）。開戶後 13 個月內取消卡或取消綁定將被取消 VIP 會籍。不適用於電子錢包（Alipay/WeChat Pay/PayMe）、八達通增值、繳稅、網上繳費。",
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
      { description: "基本回饋 1%", matchType: "base", percentage: 1.0, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "octopus"] },
    ],
    tags: ["HKTVmall", "網購"],
    welcomeOfferText: "迎新簽 $5,000 送 $1,000 現金回贈 (首2個月內)",
    applyUrl: "https://www.citibank.com.hk/chinese/credit-cards/citi-hktvmall-card.html",
    sellingPoints: ["HKTVmall 5% 回贈 (每月上限$300)", "迎新送現金回贈", "基本簽賬 1%"],
    note: "⚠️ HKTVmall 5% 需每月登記！每月回贈上限 $300。未登記只有 1% 基本回贈。不適用於：FPS、八達通增值、繳稅、保費。",
  },
  {
    id: "citi-the-club",
    name: "Citi The Club 信用卡",
    bank: "Citi",
    style: { bgColor: "bg-gradient-to-br from-purple-600 to-purple-800", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 0.2, currency: 'Club積分' }, // 5 Club積分 = $1
    rules: [
      // T&C: 指定商戶 4% (1% 基本 + 3% 額外)，額外上限 1,500 Club積分 = $300
      { description: "指定商戶 4%", matchType: "merchant", matchValue: ["csl", "1010", "now_tv", "netvigator", "hkt", "pccw"], percentage: 4.0, cap: 1500, capType: "reward", excludePaymentMethods: ["fps", "octopus"] },
      // T&C: Club Shopping 4% (1% 基本 + 1% 額外 + 2% The Club)，額外上限 500 Club積分 = $100
      { description: "Club Shopping 4%", matchType: "merchant", matchValue: ["club_shopping", "theclub"], percentage: 4.0, cap: 500, capType: "reward", excludePaymentMethods: ["fps", "octopus"] },
      // T&C: 基本 1% 無上限
      { description: "基本回饋 1%", matchType: "base", percentage: 1.0, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "octopus"] },
    ],
    tags: ["The Club", "Club積分", "csl/1010"],
    welcomeOfferText: "迎新簽 $5,000 送 5,000 Club積分 + $1,000 現金回贈 (首2個月內)",
    applyUrl: "https://www.citibank.com.hk/chinese/credit-cards/citi-the-club-card.html",
    sellingPoints: ["指定商戶 4% Club積分 (csl/1010/Now TV等)", "Club Shopping 4%", "基本簽賬 1% 無上限", "csl/1010/Now TV/網上行自動轉賬高達 3%"],
    note: "⚠️ 指定商戶額外 3% 上限 1,500 Club積分 ($300)/月。Club Shopping 額外 1% 上限 500 Club積分 ($100)/月。5 Club積分 = $1。不適用於：FPS、八達通增值、繳稅、保費、Citi PayAll。",
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
      // T&C: 新台幣簽賬 20X 積分 = 8%，每月上限 80,000 額外積分，全年 240,000
      { description: "新台幣簽賬 8% (20X)", matchType: "base", percentage: 8.0, isForeignCurrency: true, cap: 80000, capType: "reward" },
      // T&C: 日圓/韓圜簽賬 10X 積分 = 4%，每月上限 80,000 額外積分
      { description: "日圓/韓圜簽賬 4% (10X)", matchType: "base", percentage: 4.0, isForeignCurrency: true, cap: 80000, capType: "reward" },
      // T&C: 非港幣簽賬 5X 積分 = 2%
      { description: "其他外幣簽賬 2% (5X)", matchType: "base", percentage: 2.0, isForeignCurrency: true },
      // T&C: 本地網上商戶 高達 10X 積分 = 4% (需登記)
      { description: "本地網上 4% [需登記]", matchType: "category", matchValue: "online", percentage: 4.0 },
      // T&C: 星期六日滿$300 2X 積分 = 0.8%
      { description: "週六日滿$300 0.8% (2X)", matchType: "base", percentage: 0.8, validDays: [0, 6], minSpend: 300 },
      // T&C: 本地簽賬/八達通自動增值 1X 積分 = 0.4%
      { description: "本地簽賬 0.4% (1X)", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["台灣8%", "日韓4%", "網上4%"],
    sellingPoints: ["🇹🇼 新台幣簽賬 8% (20X)", "🇯🇵🇰🇷 日韓簽賬 4% (10X)", "其他外幣 2%", "本地網上 4% [需登記]"],
    applyUrl: "https://www.fubonbank.com.hk/tc/cards/credit-card-products/platinum-card.html",
    note: "⚠️ 台幣/日韓額外積分每月上限 80,000 (全年 240,000)。本地網上 4% 需致電 2566 8181 登記 (按1>7>2)。週六日滿 $300 享額外積分。積分可兌換現金回贈或亞洲萬里通里數 (15分=1里)。不適用於：稅務、保險、水電費繳費、分期付款。",
  },
  {
    id: "fubon-visa-infinite",
    name: "富邦 Visa Infinite 卡",
    bank: "富邦銀行",
    style: { bgColor: "bg-gradient-to-br from-slate-800 to-black", textColor: "text-yellow-400" },
    foreignCurrencyFee: 1.95,
    rules: [
      // T&C: 新台幣簽賬 20X 積分 = 10%，每月上限 120,000 額外積分，全年 480,000
      { description: "新台幣簽賬 10% (20X)", matchType: "base", percentage: 10.0, isForeignCurrency: true, cap: 120000, capType: "reward" },
      // T&C: 日圓/韓圜簽賬 10X 積分 = 5%，每月上限 120,000 額外積分
      { description: "日圓/韓圜簽賬 5% (10X)", matchType: "base", percentage: 5.0, isForeignCurrency: true, cap: 120000, capType: "reward" },
      // T&C: 非港幣簽賬 5X 積分 = 2.5%
      { description: "其他外幣簽賬 2.5% (5X)", matchType: "base", percentage: 2.5, isForeignCurrency: true },
      // T&C: 本地網上商戶 高達 10X 積分 = 5% (需登記)
      { description: "本地網上 5% [需登記]", matchType: "category", matchValue: "online", percentage: 5.0 },
      // T&C: 星期六日滿$300 2X 積分 = 1%
      { description: "週六日滿$300 1% (2X)", matchType: "base", percentage: 1.0, validDays: [0, 6], minSpend: 300 },
      // T&C: 本地簽賬/八達通自動增值 1X 積分 = 0.5%
      { description: "本地簽賬 0.5% (1X)", matchType: "base", percentage: 0.5, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps"] },
    ],
    tags: ["台灣10%", "日韓5%", "高端卡"],
    sellingPoints: ["🇹🇼 新台幣簽賬 10% (20X)", "🇯🇵🇰🇷 日韓簽賬 5% (10X)", "其他外幣 2.5%", "本地網上 5% [需登記]", "機場貴賓室"],
    applyUrl: "https://www.fubonbank.com.hk/tc/cards/credit-card-products/visa-infinite-card.html",
    note: "⚠️ 台幣/日韓額外積分每月上限 120,000 (全年 480,000)。本地網上 5% 需致電 2566 8181 登記 (按1>7>2)。週六日滿 $300 享額外積分。積分可兌換現金回贈或亞洲萬里通里數 (15分=1里，手續費$250-$500)。不適用於：稅務、保險、水電費繳費、分期付款。",
  },
  {
    id: "fubon-incard",
    name: "富邦 iN VISA 白金卡",
    bank: "富邦銀行",
    style: { bgColor: "bg-gradient-to-br from-pink-500 to-purple-600", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      // T&C: 網上簽賬 20X 積分 = 8% (無需登記，每月回贈上限 $300)
      { description: "網上簽賬 8% (20X)", matchType: "category", matchValue: "online", percentage: 8.0, cap: 300, capType: "reward", excludeCategories: ["ewallet", "insurance", "tax"], excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
      // T&C: 流動支付及八達通自動增值也計積分
      { description: "流動支付 0.4%", matchType: "paymentMethod", matchValue: ["mobile", "apple_pay", "google_pay", "samsung_pay"], percentage: 0.4 },
      { description: "八達通自動增值 0.4%", matchType: "paymentMethod", matchValue: ["octopus"], percentage: 0.4 },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "alipay", "wechat_pay", "payme"] },
    ],
    tags: ["網購8%", "年輕人", "無需登記"],
    welcomeOfferText: "迎新簽 $5,000 送 $150 現金回贈 (首3個月)",
    sellingPoints: ["網上簽賬 8% 回贈 (無需登記)", "每月回贈上限 $300", "永久免年費", "流動支付/八達通增值計積分"],
    applyUrl: "https://www.fubonbank.com.hk/tc/cards/credit-card-products/incard.html",
    note: "💡 【推廣期 2025/4/28-12/31】網上簽賬 8% (20X 積分) 無需登記！每月回贈上限 $300 (即首 $3,750 網上簽賬享 8%)。流動支付及八達通自動增值也計 0.4% 積分。不計回贈：Alipay/WeChat Pay/PayMe 充值、保險、稅務。迎新：首3個月簽 $5,000 送 $150 現金回贈。14個月內取消扣回迎新。積分有效期一年，250分=$1。",
  },
  {
    id: "cncbi-gba",
    name: "信銀國際大灣區雙幣信用卡",
    bank: "信銀國際",
    style: { bgColor: "bg-gradient-to-br from-red-600 to-red-800", textColor: "text-white" },
    foreignCurrencyFee: 0,
    rules: [
      // T&C: 人民幣簽賬/雲閃付App 4% (每月上限$150)
      { description: "人民幣/雲閃付 4% (月上限$150)", matchType: "base", percentage: 4.0, isForeignCurrency: true, cap: 150, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 單筆滿CNY4,000 額外6% (每月上限$250)
      { description: "單筆滿¥4,000 額外6% (月上限$250)", matchType: "base", percentage: 6.0, isForeignCurrency: true, minSpend: 4000, cap: 250, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 本地簽賬 0.4%，排除繳稅、網上繳費、八達通增值、電子錢包
      { description: "本地簽賬 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["fps", "octopus", "alipay", "wechat_pay", "payme"] },
    ],
    tags: ["大灣區", "北上", "免手續費", "人民幣10%"],
    sellingPoints: ["人民幣/雲閃付 4% (月上限$150)", "單筆滿¥4,000 高達10%", "免外幣手續費"],
    applyUrl: "https://www.cncbinternational.com/personal/credit-cards/gba-dual-currency-credit-card/tc/index.jsp",
    note: "⚠️ 人民幣/雲閃付簽賬 4% (月上限$150)。單筆滿 CNY 4,000 可享額外 6% (月上限$250)，合共最高 10%。雲閃付需用商戶掃描付款模式。不適用於：繳稅、網上繳費、八達通自動增值、電子錢包增值。推廣期至 2025年12月31日。",
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
    // T&C: 0% 海外簽賬手續費（推廣期至 2025年12月31日）
    foreignCurrencyFee: 0,
    rules: [
      // T&C: 淘寶/天貓簽賬回贈，不適用於 Alipay/WeChat Pay/PayMe
      { description: "淘寶/天貓 4%", matchType: "merchant", matchValue: ["taobao", "tmall"], percentage: 4.0, excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["fps", "alipay", "wechat_pay", "payme"] },
    ],
    tags: ["淘寶", "網購", "免外幣手續費"],
    welcomeOfferText: "迎新手機簽賬 10% 回贈 (上限$300)",
    sellingPoints: ["淘寶/天貓簽賬 4% 回贈", "0% 淘寶手續費", "0% 海外簽賬手續費", "專為淘寶用戶而設"],
    applyUrl: "https://www.bochk.com/tc/creditcard/products/taobao.html",
    note: "💡 透過手機淘寶 App 或 AlipayHK 付款免淘寶手續費！海外簽賬免 1.95% 手續費（推廣期至 2025年12月31日）。⚠️ 積分不適用於 Alipay/WeChat Pay/PayMe 簽賬。迎新：手機簽賬 10% 回贈，上限 $300。",
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
