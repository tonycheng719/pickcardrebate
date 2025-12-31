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
    minIncome: 240000,
    rewardConfig: { method: 'conversion', ratio: 10, currency: 'RC' }, // $10 = $1 RC = 0.4%
    rules: [
      // 🔥 最紅冬日賞 - 百老滙 (2025/12/1 - 2026/2/28)
      // 累積簽賬滿 $10,000 享 6% 回贈 (上限 $900)，單一簽賬需滿 $500，需登記
      { description: "🔥百老滙 6% [冬日賞,累積$10,000,需登記]", matchType: "merchant", matchValue: ["broadway"], percentage: 6.0, minSpend: 500, cap: 900, capType: "reward", validDateRange: { start: "2025-12-01", end: "2026-02-28" } },
      // T&C: 最紅自主獎賞 9X (3.6%)，需登記，額外「獎賞錢」簽賬上限 $100,000
      // Visa Signature: 9X = 5X額外 + 1X基本 + 3X VS專享 = 3.6%
      // 5大類別：賞滋味/賞購物/賞家居/賞享受/賞世界，可自由分配 5X 額外倍數
      { description: "最紅自主獎賞 9X (3.6%) [需登記]", matchType: "category", matchValue: ["dining", "supermarket", "lifestyle", "home", "entertainment"], percentage: 3.6, cap: 100000, capType: "spending", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 賞世界 - 海外簽賬 (非港幣交易)，不包括香港進行或以港幣交易的簽賬
      { description: "賞世界 9X (3.6%) [需登記]", matchType: "base", percentage: 3.6, isForeignCurrency: true, cap: 100000, capType: "spending", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 賞滋味限制：不包括酒席宴會/私人宴會/包場派對/酒店百貨公司俱樂部內飲食專櫃
      // T&C: 八達通自動增值 0.4% ($25/里) - mrmiles.hk 確認
      { description: "八達通自動增值 0.4% ($25/里)", matchType: "paymentMethod", matchValue: ["octopus"], percentage: 0.4 },
      // T&C: 基本回饋 0.4% ($250 = $1 RC)，排除電子錢包、繳稅、繳費
      { description: "基本回饋 0.4% ($25/里)", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
    ],
    tags: ["餐飲神卡", "最紅自主獎賞", "9X積分", "需登記", "八達通增值", "百老滙6%", "Travel Guru"],
    imageUrl: "https://pickcardrebate-supabase-kong.zeabur.app/storage/v1/object/public/images/cards/1764329466898-zu95i1newy.png",
    feeWaiverCondition: "首兩年免年費",
    welcomeOfferText: "迎新簽 $8,000 送 $600-$800 獎賞錢 (首60日內)",
    officialApplyUrl: "https://www.hsbc.com.hk/zh-hk/credit-cards/products/visa-signature/",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=255&a=228&sub_id1=pickcardrebate&sub_id2=web",
    sellingPoints: ["最紅自主獎賞 9X (3.6%)，5大類別自由分配", "💡 Travel Guru 海外實體店可達 6.6%~9.6%", "首 $100,000 簽賬享額外獎賞"],
    note: "⚠️ 【最紅自主獎賞 2026】需於 2026/10/31 前登記！**Visa Signature 專享 9X = 5X額外 + 1X基本 + 3X VS專享 = 3.6%**。5大類別：賞滋味/賞家居/賞享受/賞購物/賞世界，可自由分配 5X 額外倍數。首 $100,000 簽賬享額外獎賞。\n\n🌍 **Travel Guru 會員計劃**（登記期 2025/10/1-10/31）：海外實體店外幣簽賬額外回贈！\n• GO級 +3%（連續3個月簽≥$8,000解鎖，上限$500/年）→ 合共 **6.6%**\n• GING級 +4%（累積≥$30,000，上限$1,200/年）→ 合共 **7.6%**\n• GURU級 +6%（累積≥$70,000，上限$2,200/年）→ 合共 **9.6%**\n⚠️ 2024/9起只限海外實體店，不包括網購、電子錢包、八達通增值。\n\n⚠️ 賞滋味限制：不包括酒席宴會、私人宴會、包場派對、酒店/百貨公司/俱樂部內飲食專櫃。⚠️ 賞世界限制：不包括香港進行或以港幣交易的簽賬。❌ 不適用於電子錢包（Alipay/WeChat Pay/PayMe）、八達通增值、繳稅、網上繳費。\n\n✈️ **香港快運機票半價**（至12/15）：優惠碼 HSBC160，20個航點低至半價！[查看詳情](/discover/hkexpress-hsbc-flash-2025)\n\n🔥 **最紅冬日賞萬寧**（至2026/2/28）：週末高達10%回贈！[查看詳情](/discover/hsbc-mannings-winter-2025)\n\n🔥 **最紅冬日賞百老滙**（至2026/2/28）：累積簽賬滿$10,000享6%回贈！[查看詳情](/discover/hsbc-broadway-winter-2025)",
    promoEndDate: "2025-12-15",
    promoName: "香港快運機票低至半價",
  },
  {
    id: "hsbc-red",
    name: "HSBC Red Credit Card",
    bank: "HSBC",
    style: { bgColor: "bg-gradient-to-br from-red-500 via-red-600 to-pink-700", textColor: "text-white" },
    // imageUrl from DB
    rewardTimeline: "獎賞錢即時入賬",
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 10, currency: 'RC' },
    rules: [
      // 🔥 最紅冬日賞 - 百老滙 (2025/12/1 - 2026/2/28)
      // 累積簽賬滿 $10,000 享 6% 回贈 (上限 $900)，單一簽賬需滿 $500，需登記
      { description: "🔥百老滙 6% [冬日賞,累積$10,000,需登記]", matchType: "merchant", matchValue: ["broadway"], percentage: 6.0, minSpend: 500, cap: 900, capType: "reward", validDateRange: { start: "2025-12-01", end: "2026-02-28" } },
      // T&C 2025/9/1-2026/3/31: 指定商戶 8% (每月首$1,250 = $100獎賞錢上限)
      // 餐飲：壽司郎/譚仔三哥/譚仔雲南/The Coffee Academïcs
      // 潮流及運動服飾：GU/Decathlon/lululemon
      // 休閒娛樂：NAMCO/TAITO STATION
      { description: "指定商戶 8% [壽司郎/譚仔/GU等]", matchType: "merchant", matchValue: ["sushiro", "tamjai", "tamjai_yunnan", "coffee_academics", "gu", "decathlon", "lululemon", "namco", "taito"], percentage: 8.0, cap: 100, capType: "reward" },
      // T&C: 網上簽賬 4% (每月首$10,000 = $400獎賞錢上限)
      // 不包括：網上繳費、電子錢包簽賬、保費、證券買賣、租金/物業管理費、廣告服務、八達通增值
      { description: "網上簽賬 4% [每月首$10,000]", matchType: "category", matchValue: "online", percentage: 4.0, cap: 400, capType: "reward", excludeCategories: ["utilities", "insurance", "ewallet"], excludePaymentMethods: ["octopus"] },
      // T&C: 八達通自動增值 0.4% ($25/里) - mrmiles.hk 確認
      { description: "八達通自動增值 0.4% ($25/里)", matchType: "paymentMethod", matchValue: ["octopus"], percentage: 0.4 },
      // T&C: 基本獎賞 0.4%
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["payme", "alipay", "wechat_pay"] }, 
    ],
    tags: ["網購神卡", "永久免年費", "指定商戶8%", "八達通增值", "百老滙6%"],
    annualFee: 0,
    feeWaiverCondition: "永久免年費",
    welcomeOfferText: "迎新簽 $3,000 送 $300 獎賞錢 (首60日)",
    officialApplyUrl: "https://www.hsbc.com.hk/zh-hk/credit-cards/products/red/",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=896&a=228&sub_id1=pickcardrebate&sub_id2=web",
    sellingPoints: ["指定商戶 8% (壽司郎/譚仔/GU/Decathlon/lululemon)", "網上簽賬 4% (每月首$10,000)", "永久免年費"],
    note: "⚠️ 【推廣期 2025/9/1-2026/3/31】指定商戶 8%：🍽️ 壽司郎/譚仔三哥/譚仔雲南/The Coffee Academïcs；👕 GU/Decathlon/lululemon；🎮 NAMCO/TAITO STATION（只限香港分店，百貨公司專櫃除外）。每月上限 $100 獎賞錢（首 $1,250）。網上簽賬 4% 每月上限 $400（首 $10,000）。網上不計：網上繳費、電子錢包簽賬、保費、證券、租金、廣告、八達通增值。實體超市只有 0.4%！\n\n🌍 **Travel Guru 會員計劃**（登記期 2025/10/1-10/31）：海外實體店外幣簽賬額外回贈！\n• GO級 +3%（連續3個月簽≥$8,000解鎖，上限$500/年）\n• GING級 +4%（累積≥$30,000，上限$1,200/年）\n• GURU級 +6%（累積≥$70,000，上限$2,200/年）\n⚠️ 2024/9起只限海外實體店，不包括網購、電子錢包、八達通增值。\n\n✈️ **香港快運機票半價**（至12/15）：優惠碼 HSBC160，20個航點低至半價！[查看詳情](/discover/hkexpress-hsbc-flash-2025)\n\n🔥 **最紅冬日賞萬寧**（至2026/2/28）：週末高達10%回贈！[查看詳情](/discover/hsbc-mannings-winter-2025)\n\n🔥 **最紅冬日賞百老滙**（至2026/2/28）：累積簽賬滿$10,000享6%回贈！[查看詳情](/discover/hsbc-broadway-winter-2025)",
    promoEndDate: "2025-12-15",
    promoName: "香港快運機票低至半價",
  },
  {
    id: "hsbc-everymile",
    name: "HSBC EveryMile",
    bank: "HSBC",
    style: { bgColor: "bg-gradient-to-br from-stone-700 to-stone-900", textColor: "text-white" },
    rewardTimeline: "獎賞錢即時入賬",
    foreignCurrencyFee: 1.95,
    annualFee: 2000,
    minIncome: 240000,
    feeWaiverCondition: "首兩年免年費",
    rewardConfig: { method: 'conversion', ratio: 20, currency: 'RC' }, // 1 RC = 20 Miles (Special rate for EveryMile)
    rules: [
      // 🔥 最紅冬日賞 - 百老滙 (2025/12/1 - 2026/2/28)
      // 累積簽賬滿 $10,000 享 6% 回贈 (上限 $900)，單一簽賬需滿 $500，需登記
      { description: "🔥百老滙 6% [冬日賞,累積$10,000,需登記]", matchType: "merchant", matchValue: ["broadway"], percentage: 6.0, minSpend: 500, cap: 900, capType: "reward", validDateRange: { start: "2025-12-01", end: "2026-02-28" } },
      // T&C: 指定日常及旅遊消費 $2/里 (2.5%) - 只限特定商戶
      // 咖啡店及輕便美食：Starbucks、Pacific Coffee、Lady M 等
      { description: "指定咖啡店 $2/里 (2.5%)", matchType: "merchant", matchValue: ["starbucks", "pacific-coffee", "lady-m", "pret-a-manger", "green-common", "blue-bottle"], percentage: 2.5 },
      // 本地交通出行：港鐵、巴士、的士、停車場、隧道費
      { description: "本地交通 $2/里 (2.5%)", matchType: "category", matchValue: ["transport"], percentage: 2.5, excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
      // 旅遊服務：租車等
      { description: "旅遊服務 $2/里 (2.5%)", matchType: "merchant", matchValue: ["avis", "hertz", "toyota-rent-a-car"], percentage: 2.5 },
      // 海外簽賬
      { description: "海外簽賬 $2/里 (2.5%)", matchType: "base", percentage: 2.5, isForeignCurrency: true },
      // T&C: 本地及海外簽賬 $5/里 (1%) - 一般網購、餐飲等
      { description: "本地及海外簽賬 $5/里 (1%)", matchType: "base", percentage: 1.0, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 八達通自動增值、網上繳費等 $12.5/里 (0.4%)
      { description: "八達通/繳費 $12.5/里 (0.4%)", matchType: "paymentMethod", matchValue: ["octopus"], percentage: 0.4 },
    ],
    tags: ["旅遊神卡", "交通$2/里", "Lounge", "百老滙6%"],
    welcomeOfferText: "迎新簽 $8,000 送 $600-$800 獎賞錢 (首60日內)",
    officialApplyUrl: "https://www.hsbc.com.hk/zh-hk/credit-cards/products/everymile/",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=245&a=228&sub_id1=pickcardrebate&sub_id2=web",
    sellingPoints: ["指定咖啡店/交通 $2/里", "一般簽賬 $5/里", "免費環亞機場貴賓室"],
    note: "⚠️ **$2/里 (2.5%) 只適用於「指定日常及旅遊消費」**：\n• 咖啡店：Starbucks、Pacific Coffee、Lady M、Pret A Manger 等\n• 本地交通：港鐵、巴士、的士、停車場、隧道費\n• 旅遊服務：AVIS、HERTZ、Toyota Rent a Car\n\n📌 **一般網購（如 Apple Store）屬於「本地及海外簽賬」= $5/里 (1%)**\n\n迎新：全新客戶 $600/$800 (網上申請)、現有客戶 $200。不適用於電子錢包（Alipay/WeChat Pay/PayMe）、繳稅。\n\n🌍 **Travel Guru 會員計劃**（登記期 2025/10/1-10/31）：海外實體店外幣簽賬額外回贈！\n• GO級 +3%（連續3個月簽≥$8,000解鎖，上限$500/年）→ 合共 **5.5%**\n• GING級 +4%（累積≥$30,000，上限$1,200/年）→ 合共 **6.5%**\n• GURU級 +6%（累積≥$70,000，上限$2,200/年）→ 合共 **8.5%**\n⚠️ 2024/9起只限海外實體店，不包括網購、電子錢包、八達通增值。\n\n✈️ **香港快運機票半價**（至12/15）：優惠碼 HSBC160，20個航點低至半價！[查看詳情](/discover/hkexpress-hsbc-flash-2025)\n\n🔥 **最紅冬日賞萬寧**（至2026/2/28）：週末高達10%回贈！[查看詳情](/discover/hsbc-mannings-winter-2025)\n\n🔥 **最紅冬日賞百老滙**（至2026/2/28）：累積簽賬滿$10,000享6%回贈！[查看詳情](/discover/hsbc-broadway-winter-2025)",
    promoEndDate: "2025-12-15",
    promoName: "香港快運機票低至半價",
  },
  {
    id: "hsbc-pulse",
    name: "HSBC Pulse 銀聯雙幣卡",
    bank: "HSBC",
    cardNetwork: "unionpay",
    style: { bgColor: "bg-gradient-to-br from-red-400 to-red-600", textColor: "text-white" },
    rewardTimeline: "獎賞錢即時入賬",
    foreignCurrencyFee: 0,
    annualFee: 1800,
    minIncome: 150000,
    feeWaiverCondition: "首兩年免年費",
    rewardConfig: { method: 'conversion', ratio: 10, currency: 'RC' },
    rules: [
      // 🔥 最紅冬日賞 - 百老滙 (2025/12/1 - 2026/2/28)
      // 銀聯卡：累積簽賬滿 $10,000 享 8% 回贈 (上限 $1,000)，單一簽賬需滿 $500，需登記
      { description: "🔥百老滙 8% [冬日賞,累積$10,000,需登記]", matchType: "merchant", matchValue: ["broadway"], percentage: 8.0, minSpend: 500, cap: 1000, capType: "reward", validDateRange: { start: "2025-12-01", end: "2026-02-28" } },
      // T&C 2025: 內地/澳門 QR Code/流動支付 額外5倍 (2%) + 基本0.4% + 賞世界2% = 4.4%
      // 簽賬上限 $80,000
      { description: "內地/澳門 QR Code/流動支付 4.4%", matchType: "base", percentage: 4.4, isForeignCurrency: true, cap: 80000, capType: "spending", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 最紅自主獎賞「賞世界」
      { description: "最紅自主獎賞 (賞世界) 2.4%", matchType: "category", matchValue: "china", percentage: 2.4, cap: 100000, capType: "spending", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 基本回饋 0.4%，排除電子錢包、繳稅、繳費、PayMe增值
      { description: "基本回饋 0.4% ($25/里)", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
    ],
    tags: ["北上消費", "銀聯", "免手續費", "內地4.4%", "百老滙8%"],
    welcomeOfferText: "迎新簽 $8,000 送 $600-$800 獎賞錢 (首60日內)",
    officialApplyUrl: "https://www.hsbc.com.hk/zh-hk/credit-cards/products/pulse-unionpay/",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=259&a=228&sub_id1=pickcardrebate&sub_id2=web",
    sellingPoints: ["內地/澳門 QR Code/流動支付 4.4%", "人民幣/港幣雙幣結算", "豁免外幣手續費", "北上消費必備"],
    note: "⚠️ 內地/澳門 4.4% 需透過 QR Code (Reward+/雲閃付) 或流動支付 (Apple Pay/Google Pay/Samsung Pay)！簽賬上限 $80,000。需登記「賞世界」及「最紅自主獎賞」。迎新：全新客戶 $600/$800 (網上申請)、現有客戶 $200。不適用於：電子錢包（Alipay/WeChat Pay/PayMe）、八達通增值、繳稅、網上繳費。\n\n🔥 **最紅冬日賞萬寧**（至2026/2/28）：週末高達10%回贈！[查看詳情](/discover/hsbc-mannings-winter-2025)\n\n🔥 **最紅冬日賞百老滙**（至2026/2/28）：銀聯卡累積簽賬滿$10,000享8%回贈！[查看詳情](/discover/hsbc-broadway-winter-2025)",
    promoEndDate: "2026-02-28",
    promoName: "最紅冬日賞百老滙",
  },
  {
    id: "hsbc-premier",
    name: "HSBC Premier Mastercard",
    bank: "HSBC",
    style: { bgColor: "bg-gradient-to-br from-slate-800 to-black", textColor: "text-white" },
    rewardTimeline: "獎賞錢即時入賬",
    foreignCurrencyFee: 1.95,
    annualFee: 2000,
    minIncome: 1000000,
    feeWaiverCondition: "卓越理財客戶豁免年費",
    incomeNote: "或持有 HK$1,000,000 全面理財總值",
    rewardConfig: { method: 'conversion', ratio: 10, currency: 'RC' },
    rules: [
      // 🔥 最紅冬日賞 - 百老滙 (2025/12/1 - 2026/2/28)
      // 累積簽賬滿 $10,000 享 6% 回贈 (上限 $900)，單一簽賬需滿 $500，需登記
      { description: "🔥百老滙 6% [冬日賞,累積$10,000,需登記]", matchType: "merchant", matchValue: ["broadway"], percentage: 6.0, minSpend: 500, cap: 900, capType: "reward", validDateRange: { start: "2025-12-01", end: "2026-02-28" } },
      // T&C: 最紅自主獎賞適用
      { description: "海外/網上簽賬 2.4%", matchType: "category", matchValue: ["travel", "online"], percentage: 2.4, minSpend: 8000, excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
      // T&C: 基本回饋 0.4%，排除電子錢包、繳稅、繳費
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
    ],
    tags: ["卓越理財", "旅遊", "百老滙6%"],
    sellingPoints: ["卓越理財客戶專享", "指定類別額外獎賞錢"],
    note: "⚠️ 需月簽賬滿 $8,000 才享 2.4% 回贈！不適用於電子錢包簽賬、繳稅、網上繳費。僅限卓越理財客戶申請。\n\n🔥 **最紅冬日賞萬寧**（至2026/2/28）：週末高達10%回贈！[查看詳情](/discover/hsbc-mannings-winter-2025)\n\n🔥 **最紅冬日賞百老滙**（至2026/2/28）：累積簽賬滿$10,000享6%回贈！[查看詳情](/discover/hsbc-broadway-winter-2025)",
    officialApplyUrl: "https://www.hsbc.com.hk/zh-hk/credit-cards/products/premier/",
    promoEndDate: "2026-02-28",
    promoName: "最紅冬日賞百老滙",
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
      { description: "指定學院學費 2.4% [網上繳費]", matchType: "category", matchValue: ["education"], percentage: 2.4, cap: 200, capType: "reward" },
      // T&C: 最紅自主獎賞適用
      { description: "最紅自主獎賞 2.4%", matchType: "category", matchValue: ["dining", "supermarket", "lifestyle", "home", "entertainment"], percentage: 2.4, cap: 25000, capType: "spending", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 基本回饋 0.4%
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
    ],
    tags: ["學生卡", "交學費2.4%", "永久免年費"],
    welcomeOfferText: "迎新簽 $2,000 送 $300 獎賞錢 (首60日內)",
    officialApplyUrl: "https://www.hsbc.com.hk/zh-hk/credit-cards/products/gold/",
    applyUrl: "https://www.hsbc.com.hk/zh-hk/credit-cards/products/gold/",
    sellingPoints: ["網上繳付指定學院學費 2.4% 額外獎賞錢", "永久年費豁免", "最紅自主獎賞 2.4%", "專為學生而設"],
    note: "⚠️ 僅限全日制大學/大專學生申請。學費 2.4% 需透過滙豐 App/網上理財繳費，每階段上限 $200 獎賞錢。指定學院包括：HKU/CUHK/HKUST/PolyU/CityU/HKBU/LingU/EdUHK/HKMU/HSU/VTC 等。不適用於電子錢包（Alipay/WeChat Pay/PayMe）、八達通增值、繳稅。\n\n🔥 **最紅冬日賞萬寧**（至2026/2/28）：累積簽賬滿$1,000享高達10%回贈！[查看詳情](/discover/hsbc-mannings-winter-2025)\n\n🔥 **最紅冬日賞百老滙**（至2026/2/28）：累積簽賬滿$10,000享6%回贈！[查看詳情](/discover/hsbc-broadway-winter-2025)",
  },

  // ========================================================================
  // Standard Chartered 渣打
  // ========================================================================
  {
    id: "sc-smart",
    name: "SC Smart Card",
    bank: "Standard Chartered",
    style: { bgColor: "bg-gradient-to-r from-emerald-400 to-cyan-600", textColor: "text-white" },
    // imageUrl from DB
    rewardTimeline: "現金回贈於「360°全面賞」平台顯示，需手動換領 (最低$50)",
    annualFee: 0,
    foreignCurrencyFee: 0, // T&C: 外幣交易手續費全免 (本地+海外)
    rules: [
      // T&C: 特約商戶 5% (需月簽賬滿$4,000)，5% 已包含基本回贈
      // 特約商戶名單及簽賬上限需查閱 sc.com/hk/smartcard
      // 電子錢包消費只適用於月結單上有顯示特約商戶名稱之交易
      { description: "特約商戶 5% [月簽$4,000]", matchType: "merchant", matchValue: ["parknshop", "fusion", "taste", "watsons", "759", "japanhome", "klook", "decathlon", "netflix", "disney", "spotify", "cmhk"], percentage: 5.0, monthlyMinSpend: 4000, excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
      // T&C: 八達通自動增值計回贈
      { description: "八達通增值 0.56% [月簽$4,000]", matchType: "paymentMethod", matchValue: ["octopus"], percentage: 0.56, monthlyMinSpend: 4000 },
      // T&C: 月簽 $15,000+ 基本回贈升至 1.20%
      { description: "基本回贈 1.20% [月簽$15,000+]", matchType: "base", percentage: 1.20, monthlyMinSpend: 15000, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
      // T&C: 月簽 $4,000-$14,999 基本回贈 0.56%
      { description: "基本回贈 0.56% [月簽$4,000-$15,000]", matchType: "base", percentage: 0.56, monthlyMinSpend: 4000, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
    ],
    tags: ["特約商戶5%", "永久免年費", "免外幣手續費", "八達通增值", "免現金透支費", "繳稅優惠"],
    feeWaiverCondition: "永久免年費",
    welcomeOfferText: "迎新簽 $3,500 送 $800 現金回贈 (首月內)",
    officialApplyUrl: "https://www.sc.com/hk/zh/credit-cards/smart-card/",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=176&a=228&sub_id1=pickcardrebate&sub_id2=web",
    sellingPoints: ["特約商戶 5% (百佳/屈臣氏/759/Klook/Netflix等)", "基本回贈 0.56%-1.2% (視乎月簽)", "永久免年費", "🔥繳稅優惠高達$2,300"],
    note: "⚠️ 【階梯制回贈】月簽 < $4,000 = 0%！月簽 $4,000-$14,999 = 0.56%。月簽 $15,000+ = 1.2%。特約商戶 5% 已包含基本回贈，超出簽賬上限部分只計基本回贈。✅ 八達通自動增值計回贈！✅ 外幣交易手續費全免（本地+海外）！✅ 現金透支費豁免！❌ 不計回贈：八達通錢包/支付寶/微信支付/PayMe增值、FPS、保費、繳費、繳稅（日常）、賭博、金融機構交易。回贈需於「360°全面賞」平台手動換領（最低 $50）。\n\n🔥 **繳稅優惠**（2025/11/18-2026/2/2）：\n- 需透過 SC Mobile App 登記\n- 交稅 $2萬-$5萬：$50-$150 / 交稅 $5萬-$10萬：$100-$300\n- 交稅 $10萬-$25萬：$150-$500 / 交稅 $25萬+：$500-$1,500\n- 分期額外獎賞：$200-$500（早鳥12/31前再加$100-$300）\n- 合共高達 $2,300 現金回贈！[查看詳情](/discover/sc-tax-payment-2025)",
    promoEndDate: "2026-02-02",
    promoName: "渣打交稅及分期優惠",
  },
  {
    id: "sc-cathay",
    name: "SC Cathay Mastercard",
    bank: "Standard Chartered",
    style: { bgColor: "bg-gradient-to-br from-teal-700 to-teal-900", textColor: "text-white" },
    rewardTimeline: "里數自動存入 (月結單後7個工作天)",
    annualFee: 2000,
    minIncome: 240000,
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'direct_rate', baseRate: 6, currency: 'AM' }, // Direct rate: $6/mile
    rules: [
      // 2025年指定類別：食肆、酒店、海外 = $4/里
      { description: "食肆簽賬 $4/里 (港幣)", matchType: "category", matchValue: ["dining"], percentage: 2.5, excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
      { description: "酒店/旅遊簽賬 $4/里 (港幣)", matchType: "category", matchValue: ["hotel", "travel"], percentage: 2.5, excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
      { description: "海外簽賬 $4/里 (外幣)", matchType: "base", percentage: 2.5, isForeignCurrency: true, excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
      // T&C: 八達通自動增值計里數
      { description: "八達通自動增值 $6/里", matchType: "paymentMethod", matchValue: ["octopus"], percentage: 1.67 },
      { description: "基本回饋 $6/里", matchType: "base", percentage: 1.67, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
    ],
    tags: ["儲里數", "國泰", "出糧優惠", "八達通增值", "繳稅優惠", "會籍積分"],
    feeWaiverCondition: "首年免年費；優先理財($100萬+)/Premium理財($20萬+)/出糧客戶免年費",
    welcomeOfferText: "迎新送高達 60,000 里 / 🔥繳稅高達23,000里 / 出糧客戶額外 2,000 里",
    sellingPoints: ["食肆/酒店/海外簽賬 HK$4/里", "八達通增值計里數", "🔥 繳稅高達23,000里 (2025/11-2026/2)", "🔥 簽$10萬送20會籍積分 (2025全年)"],
    note: "⚠️ 基本比率 $6/里。【2025年指定類別 $4/里】食肆（港幣）、酒店（港幣）、海外（外幣）。✅ 八達通自動增值計里數！💳 外幣手續費 1.95% (Mastercard 1% + 銀行 0.95%)。⚠️ 跨境港幣交易收取 1% 徵費！❌ 不計里數：保費、繳稅（日常）、FPS、支付寶/八達通錢包增值、網上理財繳費、電話/郵購、賭博、金融機構交易、P2P轉賬。⚠️ 食肆限制：不包括酒席宴會、私人派對、酒店/美食廣場/超市/百貨公司內食肆。⚠️ 酒店限制：須直接於酒店或官網簽賬，不包括第三方平台（如Agoda/Booking.com）。年費：$2,000（首年豁免），優先理財($100萬+)/Premium理財($20萬+)/出糧客戶免年費。【會籍積分推廣 2025全年】每簽$100,000送20會籍積分，上限100積分！【出糧客戶禮遇】額外 2,000 里。\n\n🔥 **繳稅優惠**（2025/11/18-2026/2/2）：\n- 需透過 SC Mobile App 登記\n- 交稅 $2萬-$5萬：500-1,500里 / 交稅 $5萬-$10萬：1,000-3,000里\n- 交稅 $10萬-$25萬：1,500-5,000里 / 交稅 $25萬+：5,000-15,000里\n- 分期額外獎賞：2,000-5,000里（早鳥12/31前再加1,000-3,000里）\n- 合共高達 23,000 里！[查看詳情](/discover/sc-tax-payment-2025)",
    officialApplyUrl: "https://www.sc.com/hk/zh/credit-cards/cathay/",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=177&a=228&sub_id1=pickcardrebate&sub_id2=web",
    promoEndDate: "2026-02-02",
    promoName: "渣打交稅及分期優惠",
  },
  {
    id: "sc-simply-cash",
    name: "SC Simply Cash Visa",
    bank: "Standard Chartered",
    style: { bgColor: "bg-gradient-to-br from-blue-500 to-blue-700", textColor: "text-white" },
    // imageUrl from DB
    rewardTimeline: "現金回贈於下期賬單顯示，需手動換領 ($50倍數)",
    annualFee: 2000,
    minIncome: 96000,
    feeWaiverCondition: "首年免年費",
    foreignCurrencyFee: 1.95,
    rules: [
      // T&C: 外幣簽賬 2%
      { description: "外幣簽賬 2%", matchType: "base", percentage: 2.0, isForeignCurrency: true, excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
      // T&C: 八達通自動增值 1.5% (mrmiles.hk 確認)
      { description: "八達通自動增值 1.5%", matchType: "paymentMethod", matchValue: ["octopus"], percentage: 1.5 },
      // T&C: 港幣簽賬 1.5%
      { description: "港幣簽賬 1.5%", matchType: "base", percentage: 1.5, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
    ],
    tags: ["現金回贈", "無腦刷", "外幣2%", "八達通1.5%", "繳稅優惠"],
    welcomeOfferText: "迎新簽 $8,000 送 $600 現金回贈 (首2個月內)",
    officialApplyUrl: "https://www.sc.com/hk/zh/credit-cards/simply-cash-visa/",
    applyUrl: "https://www.sc.com/hk/zh/credit-cards/simply-cash-visa/",
    sellingPoints: ["港幣簽賬 1.5% 現金回贈", "外幣簽賬 2%", "無最低簽賬要求", "🔥繳稅優惠高達$2,300"],
    note: "⚠️ 不適用於：八達通自動增值、八達通錢包/支付寶/微信支付/PayMe增值、FPS、保費、繳費、繳稅（日常）。回贈需手動換領 ($50 倍數)。\n\n🔥 **繳稅優惠**（2025/11/18-2026/2/2）：\n- 需透過 SC Mobile App 登記\n- 交稅 $2萬-$5萬：$50-$150 / 交稅 $5萬-$10萬：$100-$300\n- 交稅 $10萬-$25萬：$150-$500 / 交稅 $25萬+：$500-$1,500\n- 分期額外獎賞：$200-$500（早鳥12/31前再加$100-$300）\n- 合共高達 $2,300 現金回贈！[查看詳情](/discover/sc-tax-payment-2025)",
    promoEndDate: "2026-02-02",
    promoName: "渣打交稅及分期優惠",
  },

  // ========================================================================
  // BOC 中銀香港
  // ========================================================================
  {
    id: "boc-chill",
    name: "BOC Chill Card",
    bank: "BOC",
    style: { bgColor: "bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500", textColor: "text-white" },
    // imageUrl from DB
    rewardTimeline: "現金回贈",
    annualFee: 600,
    feeWaiverCondition: "首年免年費",
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 0.0666, currency: 'Points' }, // 15 pts = 1 mile -> ratio 0.0666
    rules: [
      // T&C: Chill 商戶 10% (World) / 8% (Platinum)，需每月簽滿 $3,000/$1,000，額外回贈上限 $150 (與海外/網上合併計算)
      { description: "Chill 商戶 10% [月簽$3,000]", matchType: "merchant", matchValue: ["百佳", "屈臣氏", "豐澤", "萬寧", "7-eleven", "circle-k", "麥當勞", "starbucks", "pacific-coffee", "kkbox", "spotify", "netflix", "disney-plus"], percentage: 10.0, monthlyMinSpend: 3000, cap: 150, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay"] },
      // T&C: 海外及網上簽賬 5% (World) / 4% (Platinum)，需每月簽滿 $3,000/$1,000，額外回贈上限 $150 (與Chill商戶合併計算)
      { description: "網上簽賬 5% [月簽$3,000]", matchType: "category", matchValue: ["online"], percentage: 5.0, monthlyMinSpend: 3000, cap: 150, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay"], excludeCategories: ["ewallet", "insurance", "utilities", "tax", "government"] },
      { description: "海外簽賬 5% [月簽$3,000]", matchType: "base", percentage: 5.0, isForeignCurrency: true, monthlyMinSpend: 3000, cap: 150, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay"] },
      // T&C: 基本回贈 0.4%，排除電子錢包、八達通、繳費等
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["octopus", "alipay", "wechat_pay", "payme"] },
    ],
    tags: ["Chill商戶10%", "網購5%", "海外5%"],
    welcomeOfferText: "迎新簽 $5,000 送 $500 現金回贈 (World) / 簽 $3,000 送 $300 (Platinum)",
    sellingPoints: ["Chill 商戶 10% (需月簽$3,000)", "海外及網上簽賬 5%", "支援 Apple Pay/Google Pay/Samsung Pay", "永久免年費"],
    note: "⚠️ Chill 商戶 10% 及網上/海外 5% 需每月簽滿 $3,000 才可享用！「Chill 商戶」及「海外/網上簽賬」額外回贈每月合共上限 $150（兩者合併計算）。合資格手機支付：Apple Pay/Google Pay/Samsung Pay。❌ 不適用於 AlipayHK/WeChat Pay HK/八達通增值/網上繳費/公共事務費用/保險/P2P轉賬。Platinum 版本回贈率較低（8%/4%），門檻 $1,000。迎新：World 版簽 $5,000 送 $500 現金回贈；Platinum 版簽 $3,000 送 $300 現金回贈。\n\n📅 **2025年12月30日更新**：推廣期延長至 **2026年6月30日**",
    officialApplyUrl: "https://www.bochk.com/tc/creditcard/products/chillcard.html",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=456&a=228&sub_id1=pickcardrebate&sub_id2=web",
    promoEndDate: "2026-06-30",
    promoName: "Chill 商戶 10% 現金回贈",
  },
  {
    id: "boc-sogo",
    name: "BOC SOGO Visa Signature",
    bank: "BOC",
    style: { bgColor: "bg-gradient-to-br from-blue-700 to-blue-900", textColor: "text-white" },
    // imageUrl from DB
    rewardTimeline: "現金回贈 (下個月內入賬)",
    annualFee: 600,
    feeWaiverCondition: "首年免年費",
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 0.0666, currency: 'Points' },
    rules: [
      // T&C: 手機支付額外 5% (Apple Pay/Google Pay/Samsung Pay)，每月上限 $100 回贈
      // 5% + 基本 0.4% = 5.4%，每月回贈上限 $100
      { description: "手機支付 5.4% [上限回贈$100]", matchType: "paymentMethod", matchValue: ["mobile", "apple_pay", "google_pay", "samsung_pay"], percentage: 5.4, cap: 100, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 崇光百貨全年 5% 現金回贈 (指定商戶/產品)
      { description: "崇光百貨 5%", matchType: "merchant", matchValue: ["sogo"], percentage: 5.0, excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 崇光超市 Freshmart 逢星期一 5% 現金折扣
      { description: "崇光超市星期一 5%", matchType: "merchant", matchValue: ["sogo_freshmart"], percentage: 5.0, validDays: [1], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 基本回贈 0.4%，不適用於八達通增值、電子錢包充值、P2P 轉賬
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
    ],
    tags: ["SOGO", "崇光5%", "手機支付5.4%"],
    welcomeOfferText: "迎新簽 $5,000 送 $500 崇光禮券 / 手機簽賬 10% (上限$300)",
    officialApplyUrl: "https://www.bochk.com/tc/creditcard/cardproduct/sogo.html",
    applyUrl: "https://www.bochk.com/tc/creditcard/cardproduct/sogo.html",
    sellingPoints: ["手機支付 5.4% (每月上限$100)", "崇光百貨全年 5%", "崇光超市星期一 5%", "日本 SOGO/西武 5% 折扣"],
    note: "💡 **手機支付**（Apple Pay/Google Pay/Samsung Pay）額外 5% 回贈（連基本 0.4% 共 5.4%），每月回贈上限 $100（即每月 $2,000 簽賬爆 Cap）。\n\n🛍️ **崇光百貨全年 5%**：適用於崇光百貨指定商戶及產品。\n\n🛒 **崇光超市 Freshmart**：逢星期一 5% 現金折扣。\n\n🇯🇵 **日本優惠**：日本 SOGO/西武滿 ¥1,000 享 5% 折扣；累積滿 ¥10萬可換 $800 崇光禮券。\n\n🍽️ **和三昧日本料理**：9 折優惠。\n\n❌ 不適用於：八達通增值、電子錢包充值/P2P轉賬（AlipayHK/PayMe/WeChat Pay）、繳稅、網上繳費。\n\n🎁 **迎新二選一**：$500 崇光禮券（需簽滿 $5,000）或 手機簽賬 10% (上限$300)。\n\n📅 **2025年12月30日更新**：推廣期延長至 **2026年12月31日**",
    promoEndDate: "2026-12-31",
    promoName: "手機支付 5% 現金回贈",
  },
  {
    id: "boc-cheers",
    name: "BOC Cheers Visa Infinite",
    bank: "BOC",
    style: { bgColor: "bg-gradient-to-br from-neutral-800 to-black", textColor: "text-yellow-400" },
    // imageUrl from DB
    rewardTimeline: "積分",
    annualFee: 3800,
    feeWaiverCondition: "首年免年費；私人銀行/私人財富/中銀理財客戶豁免年費",
    minIncome: 600000, // 或持有 $100萬資產
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 0.125, currency: 'Points' }, // 8 pts = 1 mile -> ratio 0.125
    rules: [
      // T&C 2026/1/1-2026/6/30: 需每月簽滿 $5,000，餐飲+外幣可享 10X 積分 (4%)
      // 餐飲上限：100,000 積分/月 = $10,000 簽賬
      // 外幣上限：250,000 積分/月 = $25,000 簽賬
      // 餐飲+外幣合共上限：300,000 積分/月 = $30,000 簽賬
      { description: "本地餐飲 4% [月簽$5,000]", matchType: "category", matchValue: ["dining"], percentage: 4.0, monthlyMinSpend: 5000, cap: 10000, capType: "spending", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "bocpay"], validDateRange: { start: "2026-01-01", end: "2026-06-30" } },
      { description: "外幣簽賬 4% [月簽$5,000]", matchType: "base", percentage: 4.0, isForeignCurrency: true, monthlyMinSpend: 5000, cap: 25000, capType: "spending", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "bocpay"], validDateRange: { start: "2026-01-01", end: "2026-06-30" } },
      // T&C: 不適用於 BoC Pay+/Alipay/WeChat Pay/PayMe
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "bocpay"] },
    ],
    tags: ["餐飲4%", "旅遊4%", "高級卡", "機場貴賓室"],
    welcomeOfferText: "迎新高達 810,000 積分 (54,000里/HK$3,240)",
    officialApplyUrl: "https://www.bochk.com/tc/creditcard/products/cheers.html",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=452&a=228&sub_id1=pickcardrebate&sub_id2=web",
    sellingPoints: ["本地餐飲 10X (4%)", "外幣簽賬 10X (4%)", "需每月簽滿 $5,000", "免費旅遊保險", "機場貴賓室"],
    note: "## 📌 餐飲及旅遊簽賬 10X 積分優惠\n**推廣期：2026/1/1 - 2026/6/30**\n\n| 簽賬類別 | 積分 | 回贈 | 每月上限 |\n|:---|:---:|:---:|:---:|\n| 本地餐飲 | 10X | 4% | $10,000 |\n| 外幣零售 | 10X | 4% | $25,000 |\n| **合共** | - | - | **$30,000** |\n\n⚠️ **條件**：月簽滿 $5,000 方可享用\n❌ **不適用**：BoC Pay+、AlipayHK、WeChat Pay、PayMe\n\n---\n\n## 🎁 其他權益\n- ✈️ **免費旅遊保險**：凴卡支付機票/酒店/套票，即享高達 $780萬人身意外保障\n- 🎫 **機場貴賓室**：每季度簽滿 $15,000 可享免費2次\n- 🍽️ **高級餐廳買一送一**：指定套餐\n- ✈️ **卡塔爾航空 85 折**：推廣至 2026/8/31\n- 🏨 **Hotels.com 75 折**：連續入住4晚或以上\n\n---\n\n📅 **2025年12月31日更新**",
    promoEndDate: "2026-06-30",
    promoName: "餐飲及旅遊簽賬 10X 積分優惠",
  },
  {
    id: "boc-cheers-signature",
    name: "BOC Cheers Visa Signature",
    bank: "BOC",
    hidden: true,
    style: { bgColor: "bg-gradient-to-br from-gray-700 to-gray-900", textColor: "text-yellow-300" },
    // imageUrl from DB
    rewardTimeline: "積分",
    annualFee: 2000,
    feeWaiverCondition: "首年免年費；私人銀行/私人財富/中銀理財客戶豁免年費",
    minIncome: 150000,
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 0.125, currency: 'Points' },
    rules: [
      // T&C 2026/1/1-2026/6/30: 需每月簽滿 $5,000，餐飲+外幣可享 8X 積分 (3.2%)
      // 餐飲上限：60,000 積分/月 = $7,500 簽賬
      // 外幣上限：150,000 積分/月 = $18,750 簽賬
      // 餐飲+外幣合共上限：180,000 積分/月 = $22,500 簽賬
      { description: "本地餐飲 3.2% [月簽$5,000]", matchType: "category", matchValue: ["dining"], percentage: 3.2, monthlyMinSpend: 5000, cap: 7500, capType: "spending", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "bocpay"], validDateRange: { start: "2026-01-01", end: "2026-06-30" } },
      { description: "外幣簽賬 3.2% [月簽$5,000]", matchType: "base", percentage: 3.2, isForeignCurrency: true, monthlyMinSpend: 5000, cap: 18750, capType: "spending", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "bocpay"], validDateRange: { start: "2026-01-01", end: "2026-06-30" } },
      // T&C: 不適用於 BoC Pay+/Alipay/WeChat Pay/PayMe
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "bocpay"] },
    ],
    tags: ["餐飲3.2%", "外幣3.2%"],
    welcomeOfferText: "迎新高達 390,000 積分 (26,000里/HK$1,560)",
    officialApplyUrl: "https://www.bochk.com/tc/creditcard/products/cheers.html",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=452&a=228&sub_id1=pickcardrebate&sub_id2=web",
    sellingPoints: ["本地餐飲 8X (3.2%)", "外幣簽賬 8X (3.2%)", "需每月簽滿 $5,000"],
    note: "## 📌 餐飲及旅遊簽賬 8X 積分優惠\n**推廣期：2026/1/1 - 2026/6/30**\n\n| 簽賬類別 | 積分 | 回贈 | 每月上限 |\n|:---|:---:|:---:|:---:|\n| 本地餐飲 | 8X | 3.2% | $7,500 |\n| 外幣零售 | 8X | 3.2% | $18,750 |\n| **合共** | - | - | **$22,500** |\n\n⚠️ **條件**：月簽滿 $5,000 方可享用\n❌ **不適用**：BoC Pay+、AlipayHK、WeChat Pay、PayMe\n\n---\n\n📅 **2025年12月31日更新**",
    promoEndDate: "2026-06-30",
    promoName: "餐飲及旅遊簽賬 8X 積分優惠",
  },
  {
    id: "boc-gba",
    name: "BOC 大灣區一卡通",
    bank: "BOC",
    style: { bgColor: "bg-gradient-to-br from-blue-600 to-cyan-600", textColor: "text-white" },
    // imageUrl from DB
    annualFee: 800,
    feeWaiverCondition: "首年免年費",
    foreignCurrencyFee: 0,
    rules: [
      // T&C: 不適用於 Alipay/WeChat Pay/PayMe
      { description: "內地簽賬 4%", matchType: "base", percentage: 4.0, isForeignCurrency: true, excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
    ],
    tags: ["大灣區", "北上"],
    welcomeOfferText: "迎新手機簽賬 10% 回贈 (上限$300)",
    sellingPoints: ["內地簽賬高達 4% 回贈", "支援內地交通乘車碼"],
    note: "⚠️ 不適用於 Alipay/WeChat Pay/PayMe 簽賬。迎新：手機簽賬 (Apple Pay/Google Pay/Samsung Pay/Huawei Pay/雲閃付 App) 享 10% 回贈，上限 $300。",
    officialApplyUrl: "https://www.bochk.com/tc/creditcard/products/gba.html",
  },
  {
    id: "boc-icard",
    name: "中銀 i-card 雙幣鑽石卡",
    bank: "中銀",
    hidden: true,
    style: { bgColor: "bg-gradient-to-br from-blue-400 to-blue-600", textColor: "text-white" },
    // imageUrl from DB
    annualFee: 0,
    feeWaiverCondition: "永久免年費",
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 250, currency: 'Points' }, // 250 積分 = $1 (0.4%)
    rules: [
      // ⚠️ 用戶回報：4% 手機支付回贈已取消
      // 現只有基本回贈 0.4%
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
    ],
    tags: ["虛擬卡", "永久免年費", "BoC Pay"],
    welcomeOfferText: "迎新手機簽賬 10% 回贈 (上限$300，首3個月)",
    officialApplyUrl: "https://www.bochk.com/tc/creditcard/products/icard.html",
    applyUrl: "https://www.bochk.com/tc/creditcard/products/icard.html",
    sellingPoints: ["永久免年費", "虛擬卡即時使用", "支援 BoC Pay/Apple Pay/Google Pay"],
    note: "💡 虛擬卡，永久免年費。迎新：首3個月手機簽賬（Apple Pay/Google Pay/Samsung Pay/Huawei Pay/雲閃付）享 10% 現金回贈，上限 $300。⚠️ 注意：4% 手機支付常規回贈已取消，現只有基本 0.4% 回贈。不計回贈：Alipay/WeChat Pay/PayMe、繳費、八達通增值。",
  },
  {
    id: "boc-go-platinum",
    name: "中銀 Go 銀聯白金卡",
    bank: "中銀",
    cardNetwork: "unionpay",
    style: { bgColor: "bg-gradient-to-br from-red-600 to-red-800", textColor: "text-white" },
    annualFee: 0,
    minIncome: 150000,
    feeWaiverCondition: "首年免年費（持有中銀儲蓄/往來賬戶可獲豁免）",
    foreignCurrencyFee: 0, // 人民幣海外簽賬免手續費
    rewardConfig: { method: 'conversion', ratio: 250, currency: 'Points' },
    rules: [
      // 指定Go商戶高達5%
      { description: "指定Go商戶 5% [keeta/美團/高鐵等]", matchType: "merchant", matchValue: ["keeta", "meituan", "wellcome", "market-place-jasons"], percentage: 5, cap: 100, capType: "reward" },
      // 內地手機簽賬高達2% - 只限內地/澳門消費（外幣簽賬）
      { description: "內地/澳門手機簽賬2%回贈", matchType: "paymentMethod", matchValue: ["apple_pay", "huawei_pay", "boc_pay", "unionpay_qr"], percentage: 2, cap: 100, capType: "reward", isForeignCurrency: true },
      // 海外簽賬0.8%
      { description: "海外簽賬0.8%回贈", matchType: "base", percentage: 0.8, isForeignCurrency: true },
      // 基本回贈
      { description: "基本回贈0.4%", matchType: "base", percentage: 0.4 },
    ],
    tags: ["Go商戶5%", "內地手機簽賬2%", "人民幣免手續費", "一卡雙幣"],
    welcomeOfferText: "迎新手機簽賬10%回贈 (上限$500)",
    welcomeOfferReward: "$500",
    officialApplyUrl: "https://www.bochk.com/tc/creditcard/products/gocard.html",
    applyUrl: "https://www.bochk.com/tc/creditcard/products/gocard.html",
    sellingPoints: ["指定Go商戶高達5%現金回贈", "內地手機簽賬高達2%回贈", "人民幣海外簽賬免手續費", "一卡雙幣"],
    note: "💡 指定Go商戶(keeta、美團、大眾點評、高鐵西九龍站、滴滴出行、京東港澳站、惠康、Market Place等)簽賬享高達5%回贈。內地手機簽賬(BoC Pay/雲閃付/Apple Pay/Huawei Pay)享高達2%回贈。⚠️ 每月回贈上限HK$100，需累積簽賬滿HK$1,500（豁免至2025年12月31日）。🎁 迎新：首3個月手機簽賬（Apple Pay/Google Pay/Samsung Pay/Huawei Pay/雲閃付）享10%回贈，基本$300+額外$200=$500上限。",
  },
  {
    id: "boc-go-diamond",
    name: "中銀 Go 銀聯鑽石卡",
    bank: "中銀",
    cardNetwork: "unionpay",
    style: { bgColor: "bg-gradient-to-br from-slate-800 to-black", textColor: "text-white" },
    annualFee: 0,
    minIncome: 240000,
    feeWaiverCondition: "首年免年費（持有中銀儲蓄/往來賬戶可獲豁免）",
    foreignCurrencyFee: 0, // 人民幣海外簽賬免手續費
    rewardConfig: { method: 'conversion', ratio: 250, currency: 'Points' },
    rules: [
      // 指定Go商戶高達5%
      { description: "指定Go商戶 5% [keeta/美團/高鐵等]", matchType: "merchant", matchValue: ["keeta", "meituan", "wellcome", "market-place-jasons"], percentage: 5, cap: 100, capType: "reward" },
      // 內地手機簽賬高達4% - 只限內地/澳門消費（外幣簽賬）
      { description: "內地/澳門手機簽賬4%回贈", matchType: "paymentMethod", matchValue: ["apple_pay", "huawei_pay", "boc_pay", "unionpay_qr"], percentage: 4, cap: 100, capType: "reward", isForeignCurrency: true },
      // 海外簽賬0.8%
      { description: "海外簽賬0.8%回贈", matchType: "base", percentage: 0.8, isForeignCurrency: true },
      // 基本回贈
      { description: "基本回贈0.4%", matchType: "base", percentage: 0.4 },
    ],
    tags: ["Go商戶5%", "內地手機簽賬4%", "人民幣免手續費", "一卡雙幣"],
    welcomeOfferText: "迎新手機簽賬10%回贈 (上限$500)",
    welcomeOfferReward: "$500",
    officialApplyUrl: "https://www.bochk.com/tc/creditcard/products/gocard.html",
    applyUrl: "https://www.bochk.com/tc/creditcard/products/gocard.html",
    sellingPoints: ["指定Go商戶高達5%現金回贈", "內地手機簽賬高達4%回贈", "人民幣海外簽賬免手續費", "一卡雙幣"],
    note: "💡 指定Go商戶(keeta、美團、大眾點評、高鐵西九龍站、滴滴出行、京東港澳站、惠康、Market Place等)簽賬享高達5%回贈。內地手機簽賬(BoC Pay/雲閃付/Apple Pay/Huawei Pay)享高達4%回贈(10X積分)。⚠️ 每月回贈上限HK$100，需累積簽賬滿HK$1,500（豁免至2025年12月31日）。🎁 迎新：首3個月手機簽賬（Apple Pay/Google Pay/Samsung Pay/Huawei Pay/雲閃付）享10%回贈，基本$300+額外$200=$500上限。",
  },

  // ========================================================================
  // Hang Seng 恆生
  // ========================================================================
  {
    id: "hangseng-mmpower",
    name: "Hang Seng MMPOWER",
    bank: "Hang Seng",
    style: { bgColor: "bg-gradient-to-br from-purple-600 via-pink-600 to-red-500", textColor: "text-white" },
    // imageUrl from DB
    annualFee: 0,
    minIncome: 150000,
    feeWaiverCondition: "永久免年費",
    foreignCurrencyFee: 1.95,
    rules: [
      // T&C: 海外外幣 6% (需月簽賬滿$5,000，每月上限$500回贈，優惠期延長至2026/3/31)
      { description: "海外外幣簽賬 6% [需月簽$5,000,需登記]", matchType: "base", percentage: 6.0, monthlyMinSpend: 5000, isForeignCurrency: true, cap: 500, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "octopus"], validDateRange: { start: "2024-07-01", end: "2026-03-31" } },
      // T&C: 網上簽賬 5% (需月簽賬滿$5,000，與海外/自選共用$500上限)
      // 不包括網上繳費、保險、電子錢包
      { description: "網上簽賬 5% [需月簽$5,000,需登記]", matchType: "category", matchValue: "online", percentage: 5.0, monthlyMinSpend: 5000, cap: 500, capType: "reward", excludeCategories: ["ewallet", "utilities", "insurance", "tax"], excludePaymentMethods: ["alipay", "wechat_pay", "octopus"], validDateRange: { start: "2024-07-01", end: "2026-03-31" } },
      // T&C: 自選類別 (餐飲/電子產品/娛樂，最多選2個) 1%
      // 餐飲不包括：快餐店、酒店/百貨公司/俱樂部內食肆
      // 網上自選簽賬會計入網上5%，不會計入自選1%
      { description: "自選類別 1% [餐飲(不含快餐)/電子/娛樂,需登記]", matchType: "category", matchValue: ["dining", "electronics", "entertainment"], percentage: 1.0, monthlyMinSpend: 5000, cap: 500, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "octopus"], validDateRange: { start: "2024-07-01", end: "2026-03-31" } },
      // T&C: 八達通自動增值 0.4% (計基本回贈)
      { description: "八達通自動增值 0.4%", matchType: "paymentMethod", matchValue: ["octopus"], percentage: 0.4 },
      // T&C: 基本回饋 0.4%，排除繳費、保險、Alipay/WeChat Pay/PayMe (電子錢包充值)
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
    ],
    tags: ["網購5%", "外幣6%", "永久免年費", "八達通增值", "必須登記", "冬日賞"],
    welcomeOfferText: "迎新簽 $5,000 送 $700 +FUN Dollars (全新客戶) / $300 (現有客戶) / 學生簽$2,000送$300 (首60日)",
    sellingPoints: ["永久免年費", "海外外幣簽賬 6% (需月簽$5,000)", "網上簽賬 5% (需月簽$5,000)", "自選類別 1% (餐飲/電子/娛樂)", "八達通自動增值 0.4%", "每月回贈上限 $500", "🔥冬日簽賬賞額外高達$2,800"],
    note: "⚠️ **需月簽賬滿 $5,000** 並於 hangseng.com/mpower 登記才享優惠！\n\n🎉 **好消息**：+FUN Dollars 回贈計劃已延長至 **2026/3/31**！已登記嘅客戶唔使再登記，之前揀咗嘅消費類別會繼續生效。\n\n📌 **重要排除**：\n• 餐飲不包括：快餐店、酒店/百貨公司/俱樂部內食肆\n• Alipay/WeChat Pay/PayMe 簽賬不計\n• 網上繳費（水電費、保險等）不計\n• 交稅、保險公司簽賬不計\n\n✅ **八達通自動增值計 0.4% 基本回贈**\n\n📌 **自選類別**：餐飲、電子產品、娛樂（最多選2個），網上自選簽賬只計網上5%，不重覆計算。\n\n💡 迎新：全新客戶簽$5,000送$700；現有客戶簽$5,000送$300；學生簽$2,000送$300 (首60日)。13個月內取消會扣回迎新獎賞！\n\n🔥 **冬日簽賬賞**（至2026/2/28）：累積簽賬可享額外高達$2,800回贈！[查看詳情](/discover/hangseng-winter-2025)",
    officialApplyUrl: "https://www.hangseng.com/zh-hk/personal/cards/products/mmpower-world-mastercard/",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=212&a=228&sub_id1=pickcardrebate&sub_id2=web",
    promoEndDate: "2026-03-31",
    promoName: "+FUN Dollars獎賞計劃 (延長至3月)",
  },
  {
    id: "hangseng-enjoy",
    name: "Hang Seng enJoy Card",
    bank: "Hang Seng",
    style: { bgColor: "bg-gradient-to-br from-red-500 to-red-700", textColor: "text-white" },
    // imageUrl from DB
    annualFee: 0,
    feeWaiverCondition: "永久免年費",
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 200, currency: 'yuu積分' }, // 200 yuu points = $1 cash
    rules: [
      // T&C: 7-Eleven 全年 95折 - 折扣優惠，非回贈
      { description: "7-Eleven 全年 95折", matchType: "merchant", matchValue: ["7-eleven"], percentage: 5.0, isDiscount: true },
      // 惠康/Market Place: 每月3/13/23日 92折 - 折扣優惠，非回贈
      { description: "惠康 92折 [3/13/23號]", matchType: "merchant", matchValue: ["wellcome"], percentage: 8.0, validDates: [3, 13, 23], isDiscount: true, minSpend: 100 },
      // 萬寧: 每月1/20日 94折 - 折扣優惠，非回贈
      { description: "萬寧 94折 [1/20號]", matchType: "merchant", matchValue: ["mannings"], percentage: 6.0, validDates: [1, 20], isDiscount: true },
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
      { description: "基本回饋 1X yuu積分 (0.5%)", matchType: "base", percentage: 0.5, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
    ],
    tags: ["儲分", "食肆優惠", "yuu積分", "折扣日", "7-Eleven 95折", "八達通增值", "冬日賞"],
    sellingPoints: ["7-Eleven 全年 95折 [折扣]", "惠康 92折 (3/13/23號) [折扣]", "萬寧 94折 (1/20號) [折扣]", "指定食肆 4X yuu積分 (2%)", "yuu 積分可當現金使用 (200積分=$1)", "八達通自動增值計積分", "🔥冬日簽賬賞額外高達560,000 yuu"],
    note: "⚠️ 【yuu積分獎賞】4X (2%)：Pizza Hut/PHD/KFC/美心中菜(翠園/美心皇宮/八月花等)/美心西餐/m.a.x. concepts(simplylife/吉谷舍等)/美心快餐(MX/can.teen)/麵包西餅(東海堂/美心西餅/Paper Stone)/星巴克/并并屋/魚尚。3X (1.5%)：7-Eleven/IKEA/萬寧/惠康/Market Place/3hreesixty/Oliver's/GNC。2X (1%)：Shell油站/美心其他品牌。1X (0.5%)：其他商戶。✅ 八達通自動增值計積分！❌ 不計積分：現金透支、分期計劃、e-Banking繳費、電子錢包充值（八達通自動增值除外）、易通行增值。折扣優惠與積分可同時享有！需綁定 yuu App。\n\n🔥 **冬日簽賬賞**（至2026/2/28）：累積簽賬可享額外高達560,000 yuu積分！[查看詳情](/discover/hangseng-winter-2025)",
    officialApplyUrl: "https://www.hangseng.com/zh-hk/personal/cards/products/enjoy-card/",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=213&a=228&sub_id1=pickcardrebate&sub_id2=web",
    promoEndDate: "2026-02-28",
    promoName: "恒生冬日簽賬賞",
  },
  {
    id: "hangseng-travel-plus",
    name: "Hang Seng Travel+",
    bank: "Hang Seng",
    style: { bgColor: "bg-gradient-to-br from-sky-500 to-blue-600", textColor: "text-white" },
    // imageUrl from DB
    annualFee: 2000,
    minIncome: 150000,
    feeWaiverCondition: "首年免年費",
    foreignCurrencyFee: 1.95,
    rules: [
      // T&C: 指定國家外幣簽賬 7% (日本/韓國/泰國/新加坡/澳洲，需月簽賬滿$6,000)
      // 注意：7% 只適用於指定國家的外幣簽賬，不是旅遊類別
      { description: "指定國家外幣 7% [日韓泰星澳,月簽$6,000]", matchType: "base", percentage: 7.0, monthlyMinSpend: 6000, isForeignCurrency: true, cap: 500, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "octopus"] },
      // T&C: 其他外幣簽賬 5% (需月簽賬滿$6,000)
      { description: "其他外幣 5% [月簽$6,000]", matchType: "base", percentage: 5.0, monthlyMinSpend: 6000, isForeignCurrency: true, cap: 500, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "octopus"] },
      // 旅遊類別 (酒店/航空公司/旅行社)
      { description: "旅遊簽賬 5% [月簽$6,000]", matchType: "category", matchValue: ["travel", "hotel", "airline"], percentage: 5.0, monthlyMinSpend: 6000, cap: 500, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "octopus"] },
      // T&C: 本地交通 5% (九巴/城巴/龍運/港鐵/電車/天星小輪，需月簽賬滿$6,000)
      { description: "本地交通 5% [月簽$6,000]", matchType: "category", matchValue: ["transport"], percentage: 5.0, monthlyMinSpend: 6000, cap: 500, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "octopus"] },
      // T&C: 本地餐飲 5% (不包括快餐店/酒店內食肆，需月簽賬滿$6,000)
      { description: "本地餐飲 5% [不含快餐,月簽$6,000]", matchType: "category", matchValue: ["dining"], percentage: 5.0, monthlyMinSpend: 6000, cap: 500, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "octopus"] },
      // T&C: 基本回饋 0.4%，排除繳費、保險、Alipay/WeChat Pay、八達通增值、電子錢包充值
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "octopus"] },
    ],
    tags: ["旅遊7%", "餐飲5%", "交通5%", "必須登記", "冬日賞"],
    welcomeOfferText: "迎新簽 $5,000 送 $700 Fun Dollars",
    sellingPoints: ["指定國家外幣 7% (日韓泰星澳)", "其他外幣/本地交通/餐飲 5%", "每月回贈上限 $500", "🔥冬日簽賬賞額外高達$2,800"],
    note: "⚠️ 需月簽賬滿 $6,000 並登記才享優惠！指定國家：日本/韓國/泰國/新加坡/澳洲。本地交通：九巴/城巴/龍運/港鐵/電車/天星小輪。餐飲不包括快餐店及酒店內食肆。Alipay/WeChat Pay/八達通自動增值/電子錢包充值/易通行增值不計回贈。\n\n🔥 **冬日簽賬賞**（至2026/2/28）：累積簽賬可享額外高達$2,800回贈！[查看詳情](/discover/hangseng-winter-2025)",
    officialApplyUrl: "https://www.hangseng.com/zh-hk/personal/cards/products/travel-plus-visa-signature/",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=688&a=228&sub_id1=pickcardrebate&sub_id2=web",
    promoEndDate: "2026-02-28",
    promoName: "恒生冬日簽賬賞",
  },

  // ========================================================================
  // Citi 花旗
  // ========================================================================
  {
    id: "citi-cashback",
    name: "Citi Cash Back Card",
    bank: "Citi",
    style: { bgColor: "bg-gradient-to-br from-blue-700 to-blue-900", textColor: "text-white" },
    // imageUrl from DB
    annualFee: 1200,
    minIncome: 120000,
    feeWaiverCondition: "首年免年費",
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "週五六日食肆 3%", matchType: "category", matchValue: ["dining"], percentage: 3.0, validDays: [5, 6, 0] },
      { description: "食肆/酒店 2%", matchType: "category", matchValue: ["dining", "travel"], percentage: 2.0 },
      { description: "外幣 2%", matchType: "base", percentage: 2.0, isForeignCurrency: true },
      // T&C: 八達通自動增值 1% - mrmiles.hk 確認
      { description: "八達通自動增值 1%", matchType: "paymentMethod", matchValue: ["octopus"], percentage: 1.0 },
      { description: "基本回饋 1%", matchType: "base", percentage: 1.0, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"] },
    ],
    tags: ["自動回贈", "餐飲2%", "週末餐飲3%", "八達通1%"],
    welcomeOfferText: "迎新簽 $5,000 送 $1,200 現金回贈 (首2個月內)",
    officialApplyUrl: "https://www.citibank.com.hk/zh-hk/credit-cards/citi-cash-back-card.html",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=168&a=228&sub_id1=pickcardrebate&sub_id2=web",
    sellingPoints: ["週五六日食肆 3% 回贈", "全球食肆及酒店 2% 回贈", "八達通自動增值 1%", "無上限，自動入賬"],
    note: "⚠️ 不適用於：FPS、繳稅、保費、公共事務費用。✅ 八達通自動增值有 1% 回贈！",
  },
  {
    id: "citi-rewards",
    name: "Citi Rewards Card",
    bank: "Citi",
    style: { bgColor: "bg-gradient-to-r from-blue-400 to-cyan-500", textColor: "text-white" },
    // imageUrl from DB
    annualFee: 1800,
    minIncome: 120000,
    feeWaiverCondition: "首年免年費",
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 0.0666, currency: 'Points' }, // 15 pts = 1 mile
    rules: [
      // 流動支付 5X (Apple Pay/Google Pay/Samsung Pay，不包括八達通增值/電子錢包增值)
      { description: "流動支付 2% [上限$50,000簽賬]", matchType: "paymentMethod", matchValue: ["mobile", "apple_pay", "google_pay", "samsung_pay"], percentage: 2.0, cap: 50000, capType: "spending", excludeCategories: ["ewallet"], excludePaymentMethods: ["octopus", "payme", "alipay", "wechat_pay"] },
      { description: "超市/百貨 5X (2%)", matchType: "category", matchValue: ["supermarket", "department_store"], percentage: 2.0 },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"] },
    ],
    tags: ["Apple Pay之選", "積分", "流動支付"],
    welcomeOfferText: "迎新簽 $5,000 送 $1,200 回贈",
    sellingPoints: ["流動支付 5X 積分 (Apple Pay/Google Pay/Samsung Pay)", "超市/百貨 5X 積分", "積分永不過期"],
    note: "⚠️ 流動支付 5X 需使用 Apple Pay/Google Pay/Samsung Pay！八達通增值/電子錢包增值不計。每月額外積分上限 50,000 分。",
    officialApplyUrl: "https://www.citibank.com.hk/zh-hk/credit-cards/citi-rewards-card.html",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=169&a=228&sub_id1=pickcardrebate&sub_id2=web",
  },
  {
    id: "citi-premiermiles",
    name: "Citi PremierMiles",
    bank: "Citi",
    style: { bgColor: "bg-gradient-to-br from-slate-600 to-slate-800", textColor: "text-white" },
    // imageUrl from DB
    annualFee: 1800,
    minIncome: 150000,
    feeWaiverCondition: "首年免年費",
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 0.0833, currency: 'Points' }, // 12 pts = 1 mile
    rules: [
      { description: "旅遊/酒店/航空 $4/里 (2.25%)", matchType: "category", matchValue: ["travel", "hotel", "airline"], percentage: 2.25, excludePaymentMethods: ["octopus"] },
      { description: "外幣簽賬 $4/里 (3%*)", matchType: "base", percentage: 2.25, isForeignCurrency: true }, // $20000/m for $3/mile promo often active
      { description: "本地簽賬 $8/里 (1.1%)", matchType: "base", percentage: 1.1, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["octopus"] },
    ],
    tags: ["旅遊", "里數"],
    welcomeOfferText: "迎新簽 $5,000 送 240,000積分 (20,000里) (首2個月內)",
    officialApplyUrl: "https://www.citibank.com.hk/zh-hk/credit-cards/citi-premiermiles-card.html",
    applyUrl: "https://www.citibank.com.hk/chinese/credit-cards/citi-premiermiles-card.html",
    sellingPoints: ["外幣簽賬低至 HK$3/里 (需滿額)", "免費享用機場貴賓室"],
    note: "⚠️ 不適用於：FPS、八達通增值、繳稅、保費、公共事務費用。",
  },
  {
    id: "citi-prestige",
    name: "Citi Prestige Card",
    bank: "Citi",
    style: { bgColor: "bg-gradient-to-br from-gray-700 to-gray-900", textColor: "text-white" },
    // imageUrl from DB
    annualFee: 3800,
    minIncome: 600000,
    feeWaiverCondition: "首年免年費",
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 0.0833, currency: 'Points' }, // 12 pts = 1 mile
    rules: [
      { description: "旅遊/酒店/航空 $4/里 (2.5%)", matchType: "category", matchValue: ["travel", "hotel", "airline"], percentage: 2.5, excludePaymentMethods: ["octopus"] },
      { description: "海外簽賬 $4/里", matchType: "base", percentage: 2.5, isForeignCurrency: true }, // 3pts/$ * 0.0833 = 0.25 miles/$ -> $4/mile
      { description: "本地簽賬 $6/里", matchType: "base", percentage: 1.67, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["octopus"] }, // 2pts/$ * 0.0833 = 0.166 miles/$ -> $6/mile
    ],
    tags: ["高端", "年費卡", "旅遊"],
    welcomeOfferText: "迎新繳年費 $3,800 送 360,000積分 (30,000里)",
    officialApplyUrl: "https://www.citibank.com.hk/zh-hk/credit-cards/citi-prestige-card.html",
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
    // imageUrl removed - DBS official URL no longer valid
    annualFee: 1800,
    feeWaiverCondition: "首年免年費",
    minIncome: 360000,
    incomeNote: "Visa Signature 需年薪 $360,000；未達要求會自動當作 Platinum ($150,000) 申請",
    foreignCurrencyFee: 1.95,
    rules: [
      // 🔥 DBS x 衛訊優惠 (2025/12/1 - 2026/2/28)
      // 優惠一：單一簽賬滿$3,500享$100一扣即享 (2.86%)
      // 優惠二：單一簽賬滿$8,000享$320一扣即享 (4%)
      // 每月只可享其中一個優惠一次，需開啟DBS Card+ App「一扣即享」
      { description: "🔥衛訊 4% [$8,000享$320一扣即享]", matchType: "merchant", matchValue: ["wilson_comm"], percentage: 4.0, minSpend: 8000, validDateRange: { start: "2025-12-01", end: "2026-02-28" }, excludePaymentMethods: ["payme", "alipay", "wechat_pay", "octopus"] },
      { description: "🔥衛訊 2.86% [$3,500享$100一扣即享]", matchType: "merchant", matchValue: ["wilson_comm"], percentage: 2.86, minSpend: 3500, validDateRange: { start: "2025-12-01", end: "2026-02-28" }, excludePaymentMethods: ["payme", "alipay", "wechat_pay", "octopus"] },
      // T&C: 海外簽賬 5% (單筆≥$300，Signature卡每月首$8,000)
      { description: "海外簽賬 5% [單筆≥$300]", matchType: "base", percentage: 5.0, isForeignCurrency: true, minSpend: 300, cap: 8000, capType: "spending", excludePaymentMethods: ["payme", "alipay", "wechat_pay", "octopus"] },
      // T&C: 指定類別 5%: 餐飲/運動服飾/健身中心/醫療 (單筆≥$300，Signature卡每月首$8,000)
      // 餐飲不包括：酒席宴會、私人宴會、酒店/百貨公司/會所內食肆
      { description: "餐飲 5% [單筆≥$300]", matchType: "category", matchValue: "dining", percentage: 5.0, minSpend: 300, cap: 8000, capType: "spending", excludePaymentMethods: ["payme", "alipay", "wechat_pay", "octopus"] },
      { description: "運動服飾/健身 5% [單筆≥$300]", matchType: "category", matchValue: ["sports", "gym", "sportswear", "sports_apparel"], percentage: 5.0, minSpend: 300, cap: 8000, capType: "spending", excludePaymentMethods: ["payme", "alipay", "wechat_pay", "octopus"] },
      // 醫療不包括獸醫
      { description: "醫療 5% [單筆≥$300]", matchType: "category", matchValue: "medical", percentage: 5.0, minSpend: 300, cap: 8000, capType: "spending", excludePaymentMethods: ["payme", "alipay", "wechat_pay", "octopus"] },
      // T&C: 其他零售 1% (包括未滿$300的指定類別)
      { description: "其他零售 1%", matchType: "base", percentage: 1.0, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["payme", "alipay", "wechat_pay", "octopus"] },
    ],
    tags: ["餐飲5%", "海外5%", "健身5%", "運動服飾5%", "需登記", "衛訊4%"],
    welcomeOfferText: "迎新高達 $1,000 回贈",
    sellingPoints: ["海外簽賬 5% (單筆≥$300)", "餐飲/運動服飾/健身/醫療 5% (單筆≥$300)", "其他零售 1%", "需透過 DBS Card+ App 登記"],
    note: "⚠️ 指定類別及海外簽賬 5% 需單筆消費滿 $300 並透過 DBS Card+ App 登記！未滿 $300 只有 1%。Signature卡每月首 $8,000 享 5%。餐飲不包括酒席宴會/酒店內食肆。醫療不包括獸醫。✅ DBS$ 積分無限期！⚠️ 電子錢包（八達通增值/PayMe/支付寶/微信支付增值及簽賬）**每月首 $5,000 可獲 DBS$**，超過不計。Apple Pay/Google Pay/Samsung Pay 不受此限。❌ 不計回贈：繳稅、繳費、保費、籌碼、外幣兌換、信用卡年費、結餘轉戶。\n\n🔥 **DBS x 衛訊優惠**（至2026/2/28）：單一簽賬滿$8,000享$320回贈！[查看詳情](/discover/dbs-wilson-2025)",
    officialApplyUrl: "https://www.dbs.com.hk/personal-zh/cards/credit-cards/dbs-eminent-card",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=187&a=228&sub_id1=pickcardrebate&sub_id2=web",
    promoEndDate: "2026-02-28",
    promoName: "DBS x 衛訊優惠",
  },
  {
    id: "dbs-black",
    name: "DBS Black World Mastercard",
    bank: "DBS",
    style: { bgColor: "bg-black", textColor: "text-white" },
    // imageUrl from DB
    annualFee: 1800,
    feeWaiverCondition: "首年免年費",
    minIncome: 240000,
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'direct_rate', baseRate: 6, currency: 'DBS$' }, // $6/mile standard
    rules: [
      // 🔥 DBS x 衛訊優惠 (2025/12/1 - 2026/2/28)
      { description: "🔥衛訊 4% [$8,000享$320一扣即享]", matchType: "merchant", matchValue: ["wilson_comm"], percentage: 4.0, minSpend: 8000, validDateRange: { start: "2025-12-01", end: "2026-02-28" }, excludePaymentMethods: ["payme", "alipay", "wechat_pay", "octopus"] },
      { description: "🔥衛訊 2.86% [$3,500享$100一扣即享]", matchType: "merchant", matchValue: ["wilson_comm"], percentage: 2.86, minSpend: 3500, validDateRange: { start: "2025-12-01", end: "2026-02-28" }, excludePaymentMethods: ["payme", "alipay", "wechat_pay", "octopus"] },
      { description: "旅遊/酒店 $4/里 (2.5%)", matchType: "category", matchValue: ["travel", "hotel", "airline"], percentage: 2.5, excludePaymentMethods: ["payme", "alipay", "wechat_pay", "octopus"] },
      { description: "外幣簽賬 $4/里", matchType: "base", percentage: 2.5, isForeignCurrency: true }, // ~2.5% value
      { description: "本地簽賬 $6/里", matchType: "base", percentage: 1.6, excludeCategories: ["tax", "utilities", "government", "insurance"] }, // ~1.6% value
    ],
    tags: ["儲里數", "里數神卡", "衛訊4%"],
    sellingPoints: ["積分無限期", "兌換里數免手續費", "外幣 HK$4/里"],
    note: "⚠️ Black Card 有獨立 DBS$ 兌換比率，詳情見官網。✅ DBS$ 積分無限期！⚠️ 電子錢包（八達通增值/PayMe/支付寶/微信支付增值及簽賬）**每月首 $5,000 可獲 DBS$**，超過不計。Apple Pay/Google Pay/Samsung Pay 不受此限。❌ 不計回贈：繳稅、繳費、保費、籌碼、外幣兌換、信用卡年費、結餘轉戶。\n\n🔥 **DBS x 衛訊優惠**（至2026/2/28）：單一簽賬滿$8,000享$320回贈！[查看詳情](/discover/dbs-wilson-2025)",
    officialApplyUrl: "https://www.dbs.com.hk/personal-zh/cards/credit-cards/dbs-black-world-mastercard",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=188&a=228&sub_id1=pickcardrebate&sub_id2=web",
    promoEndDate: "2026-02-28",
    promoName: "DBS x 衛訊優惠",
  },
  {
    id: "dbs-live-fresh",
    name: "DBS Live Fresh",
    bank: "DBS",
    style: { bgColor: "bg-gradient-to-br from-lime-300 to-lime-500", textColor: "text-black" },
    // imageUrl from DB
    annualFee: 600,
    feeWaiverCondition: "首年免年費",
    minIncome: 150000,
    incomeNote: "全日制學生可豁免入息要求",
    foreignCurrencyFee: 1.95,
    rules: [
      // 🔥 DBS x 衛訊優惠 (2025/12/1 - 2026/2/28)
      { description: "🔥衛訊 4% [$8,000享$320一扣即享]", matchType: "merchant", matchValue: ["wilson_comm"], percentage: 4.0, minSpend: 8000, validDateRange: { start: "2025-12-01", end: "2026-02-28" }, excludePaymentMethods: ["payme", "alipay", "wechat_pay", "octopus"] },
      { description: "🔥衛訊 2.86% [$3,500享$100一扣即享]", matchType: "merchant", matchValue: ["wilson_comm"], percentage: 2.86, minSpend: 3500, validDateRange: { start: "2025-12-01", end: "2026-02-28" }, excludePaymentMethods: ["payme", "alipay", "wechat_pay", "octopus"] },
      // 基本回贈 0.4%，排除電子錢包、八達通、繳費等
      // 注意：自選類別 5% 推廣已於 2025/3/31 結束
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["octopus", "alipay", "wechat_pay", "payme"] },
    ],
    tags: ["學生卡", "低門檻", "衛訊4%"],
    sellingPoints: ["基本回贈 0.4%", "學生可豁免入息要求", "DBS$ 積分無限期"],
    note: "💡 基本回贈 0.4%。✅ DBS$ 積分無限期！⚠️ 電子錢包（八達通增值/PayMe/支付寶/微信支付）**每月首 $5,000 可獲 DBS$**，超過不計。Apple Pay/Google Pay/Samsung Pay 不受此限。❌ 不計回贈：繳稅、繳費、保費。📌 注意：自選類別 5% 推廣已於 2025年3月31日結束。\n\n🔥 **DBS x 衛訊優惠**（至2026/2/28）：單一簽賬滿$8,000享$320回贈！[查看詳情](/discover/dbs-wilson-2025)",
    officialApplyUrl: "https://www.dbs.com.hk/personal-zh/cards/credit-cards/live-fresh-card",
    promoEndDate: "2026-02-28",
    promoName: "DBS x 衛訊優惠",
  },
  {
    id: "dbs-compass",
    name: "DBS COMPASS VISA",
    bank: "DBS",
    style: { bgColor: "bg-gradient-to-br from-red-500 to-red-700", textColor: "text-white" },
    // imageUrl from DB
    annualFee: 600,
    feeWaiverCondition: "首年免年費",
    minIncome: 100000,
    foreignCurrencyFee: 1.95,
    rules: [
      // 🔥 DBS x 衛訊優惠 (2025/12/1 - 2026/2/28)
      { description: "🔥衛訊 4% [$8,000享$320一扣即享]", matchType: "merchant", matchValue: ["wilson_comm"], percentage: 4.0, minSpend: 8000, validDateRange: { start: "2025-12-01", end: "2026-02-28" }, excludePaymentMethods: ["payme", "alipay", "wechat_pay", "octopus"] },
      { description: "🔥衛訊 2.86% [$3,500享$100一扣即享]", matchType: "merchant", matchValue: ["wilson_comm"], percentage: 2.86, minSpend: 3500, validDateRange: { start: "2025-12-01", end: "2026-02-28" }, excludePaymentMethods: ["payme", "alipay", "wechat_pay", "octopus"] },
      // T&C「四圍簽，好 COM 賺」: 指定類別 2% (0.4% 基本 + 1.6% 額外)
      // 指定類別：AliPay/AliPayHK/WeChat Pay、百貨公司、家居傢俬、油站
      // 單筆≥$300，每月首 $12,500
      { description: "指定類別 2% [單筆≥$300,需登記]", matchType: "category", matchValue: ["department_store", "home", "petrol"], percentage: 2.0, minSpend: 300, cap: 12500, capType: "spending", excludePaymentMethods: ["payme", "octopus"] },
      // AliPay/WeChat Pay 零售簽賬 2%
      { description: "AliPay/WeChat Pay 2% [單筆≥$300,需登記]", matchType: "paymentMethod", matchValue: ["alipay", "wechat_pay"], percentage: 2.0, minSpend: 300, cap: 12500, capType: "spending" },
      // T&C 2025/7/2-12/31: 週三大折日：全港超市 8% (單筆≥$300，每月首$2,000)
      // Apple Pay/Google Pay/Samsung Pay 可以，支付寶/微信支付/PayMe 不可以
      { description: "週三超市 8% [單筆≥$300]", matchType: "category", matchValue: "supermarket", percentage: 8.0, validDays: [3], minSpend: 300, cap: 2000, capType: "spending", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 八達通自動增值 0.4% ($25/里) - mrmiles.hk 確認，每次增值上限 $1,000
      { description: "八達通自動增值 0.4% ($25/里)", matchType: "paymentMethod", matchValue: ["octopus"], percentage: 0.4 },
      // 基本回贈 0.4%
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["payme", "alipay", "wechat_pay"] },
    ],
    tags: ["週三超市8%", "指定類別2%", "八達通增值", "需登記", "衛訊4%"],
    officialApplyUrl: "https://www.dbs.com.hk/personal-zh/cards/credit-cards/dbs-compass-visa",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=185&a=228&sub_id1=pickcardrebate&sub_id2=web",
    sellingPoints: ["🔥 週三超市 8% (單筆≥$300)", "指定類別 2% (百貨/家居/油站/AliPay/WeChat Pay) [需登記]", "每月首 $2,000 超市 / $12,500 指定類別"],
    note: "⚠️ COMPASS VISA 使用 COMPASS Dollar（非 DBS$），獎賞系統不同！【週三大折日 2025/7/2-12/31】全港超市 8% (單筆≥$300，每月首$2,000)，✅ Apple Pay/Google Pay/Samsung Pay 可以，❌ 支付寶/微信支付/PayMe/八達通增值 不可以。【四圍簽，好 COM 賺】需透過 DBS Card+ App 登記！指定類別 2% (單筆≥$300，每月首$12,500)：AliPay/WeChat Pay、百貨公司、家居傢俬、油站。❌ 不計回贈：PayMe、八達通增值、電子錢包增值、繳費、保費、繳稅。\n\n🔥 **DBS x 衛訊優惠**（至2026/2/28）：單一簽賬滿$8,000享$320回贈！[查看詳情](/discover/dbs-wilson-2025)",
    promoEndDate: "2026-02-28",
    promoName: "DBS x 衛訊優惠",
  },

  // ========================================================================
  // AEON
  // ========================================================================
  {
    id: "aeon-wakuwaku",
    name: "AEON CARD WAKUWAKU",
    bank: "AEON",
    style: { bgColor: "bg-gradient-to-br from-pink-400 to-pink-600", textColor: "text-white" },
    // imageUrl from DB
    annualFee: 0,
    feeWaiverCondition: "永久免年費",
    foreignCurrencyFee: 1.95,
    rules: [
      // 每月20日 AEON 會員日 95折 - 折扣優惠，非回贈
      { description: "每月20日 AEON 95折", matchType: "merchant", matchValue: ["aeon"], percentage: 5.0, validDates: [20], isDiscount: true },
      // T&C: 網上簽賬 6% (0.4% 基本 + 5.6% 額外)，額外獎賞每月上限 $200
      // 不包括：保險、電子錢包、AEON商戶免息分期
      { description: "網上簽賬 6% [上限$200]", matchType: "category", matchValue: "online", percentage: 6.0, cap: 200, capType: "reward", excludeCategories: ["ewallet", "insurance"] },
      // T&C: 日本簽賬 3% (0.4% 基本 + 2.6% 額外)，額外獎賞每月上限 $200
      // 只限日元簽賬
      { description: "日本簽賬 3% [上限$200]", matchType: "base", percentage: 3.0, isForeignCurrency: true, cap: 200, capType: "reward" },
      // T&C: 本地餐飲 1% (0.4% 基本 + 0.6% 額外)，額外獎賞每月上限 $200
      // 包括：酒樓、餐廳、快餐店及酒店餐飲
      { description: "本地餐飲 1% [上限$200]", matchType: "category", matchValue: ["dining"], percentage: 1.0, cap: 200, capType: "reward" },
      // T&C: 其他簽賬 0.4%，排除電子錢包、八達通、保險、AEON Netmember繳費
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["octopus", "alipay", "wechat_pay", "payme"] },
    ],
    tags: ["網購6%", "日本3%", "本地餐飲1%", "AEON會員日"],
    welcomeOfferText: "迎新高達 $900 回贈 (Apple Pay/Google Pay 10%上限$500 + 指定類別$200 + App申請$200)",
    sellingPoints: ["每月20日 AEON 95折 [折扣]", "網上簽賬 6% (上限$200回贈)", "日本簽賬 3%", "本地餐飲 1%", "永久免年費"],
    note: "⚠️ 每月20日 AEON 95折是購物時直接減價，非事後回贈。額外獎賞每月合共上限 $200 WAKU COIN（基本獎賞 0.4% 無上限）。WAKU COIN 有效期 24 個月。迎新：(1) 簽滿$8,000後 Apple Pay/Google Pay 享10%回贈(上限$500)；(2) 指定類別簽賬各$50(八達通自動增值/繳租金/自動轉賬/App Store或Google Play)共$200；(3) 經AEON App申請輸入「WAKUWAKU」送$200。不適用於電子錢包（AlipayHK/PayMe/WeChat Pay）、八達通增值、保險繳費。",
    officialApplyUrl: "https://www.aeon.com.hk/tc/credit-card/aeon-card-wakuwaku/",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=505&a=228&sub_id1=pickcardrebate&sub_id2=web",
  },
  {
    id: "aeon-card-jal",
    name: "AEON Card JAL",
    bank: "AEON",
    hidden: true,
    style: { bgColor: "bg-gradient-to-br from-red-600 to-red-800", textColor: "text-white" },
    // imageUrl from DB
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
      { description: "基本回饋 $8/里", matchType: "base", percentage: 1.25, excludeCategories: ["tax", "utilities", "government", "insurance"] }
    ],
    tags: ["日本旅遊", "JAL"],
    sellingPoints: ["日圓簽賬 $6 = 1 里", "JAL 機艙銷售 9 折"],
    officialApplyUrl: "https://www.aeon.com.hk/chi/credit_card/cardapp.jsp",
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
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["octopus", "alipay", "wechat_pay", "payme"] },
    ],
    tags: ["AEON會員日", "永久免年費"],
    feeWaiverCondition: "永久免年費",
    welcomeOfferText: "迎新簽 $6,000 送 175,000 積分 ($700) (需手機支付$1,000+App申請)",
    officialApplyUrl: "https://www.aeon.com.hk/tc/credit-card/",
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
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["octopus", "alipay", "wechat_pay", "payme"] },
    ],
    tags: ["AEON會員日", "永久免年費"],
    feeWaiverCondition: "永久免年費",
    welcomeOfferText: "迎新簽 $6,000 送 175,000 積分 ($700) (需手機支付$1,000+App申請)",
    officialApplyUrl: "https://www.aeon.com.hk/tc/credit-card/",
    applyUrl: "https://www.aeon.com.hk/tc/credit-card/",
    sellingPoints: ["每月20日 AEON 95折 [折扣]", "永久免年費", "迎新高達 $700 回贈"],
    note: "⚠️ 每月20日 AEON 95折是購物時直接減價，非事後回贈。迎新：(1) 簽滿$6,000送100,000積分($400)；(2) 當中$1,000透過手機支付額外25,000積分($100)；(3) 經官網/App申請額外50,000積分($200)。不適用於電子錢包增值/轉賬、八達通自動增值、AEON Netmember繳費。",
  },
  {
    id: "aeon-unionpay",
    name: "AEON 銀聯信用卡",
    bank: "AEON",
    cardNetwork: "unionpay",
    style: { bgColor: "bg-gradient-to-br from-red-600 to-red-800", textColor: "text-white" },
    foreignCurrencyFee: 1, // ⚠️ 2025年起收取1%外幣手續費
    rewardConfig: { method: 'conversion', ratio: 250, currency: 'Points' }, // 250 積分 = $1 回贈
    rules: [
      // 🔥「賞」亞洲優惠 - 內地/澳門/台灣 (2025/7/1 - 2026/1/31)
      // 15X積分 = 6%，每月上限$100回贈（即每月首$1,667簽賬享6%），需登記
      { description: "🔥內地/澳門/台灣 6% [賞亞洲,需登記]", matchType: "base", percentage: 6.0, isForeignCurrency: true, cap: 100, capType: "reward", validDateRange: { start: "2025-07-01", end: "2026-01-31" }, excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // 🔥「賞」亞洲優惠 - 韓國 (2025/12/1 - 2026/1/31)
      // 15X積分 = 6%，每月上限$200回贈（即每月首$3,333簽賬享6%），需登記
      { description: "🔥韓國 6% [賞亞洲,需登記]", matchType: "base", percentage: 6.0, isForeignCurrency: true, cap: 200, capType: "reward", validDateRange: { start: "2025-12-01", end: "2026-1-31" }, excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // 每月20日 AEON 會員日 95折 - 折扣優惠，非回贈
      { description: "每月20日 AEON 95折", matchType: "merchant", matchValue: ["aeon"], percentage: 5.0, validDates: [20], isDiscount: true },
      // 基本回贈：$1 = 1 積分，250 積分 = $1 回贈 (0.4%)
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["octopus", "alipay", "wechat_pay", "payme"] },
    ],
    tags: ["AEON會員日", "永久免年費", "銀聯", "內地6%", "韓國6%", "銀聯1%手續費"],
    feeWaiverCondition: "永久免年費",
    welcomeOfferText: "迎新簽 $6,000 送 175,000 積分 ($700) (需手機支付$1,000+App申請)",
    officialApplyUrl: "https://www.aeon.com.hk/tc/credit-card/",
    applyUrl: "https://www.aeon.com.hk/tc/credit-card/",
    sellingPoints: ["🔥內地/澳門/台灣 6% (需登記)", "🔥韓國 6% (需登記)", "每月20日 AEON 95折 [折扣]", "永久免年費", "⚠️ 外幣手續費 1%"],
    note: "⚠️ 每月20日 AEON 95折是購物時直接減價，非事後回贈。迎新須手機支付$1,000並經App申請。\n\n⚠️ **外幣手續費調整**：AEON 銀聯卡已開始收取 **1% 外幣手續費**，「賞」亞洲優惠淨回贈約 5%。[了解更多](/discover/unionpay-foreign-fee-2025)\n\n🔥 **「賞」亞洲優惠**（至2026/1/31）：內地/澳門/台灣/韓國簽賬可享6%回贈，須登記！[查看詳情](/discover/aeon-unionpay-asia-2025)",
    promoEndDate: "2026-01-31",
    promoName: "AEON銀聯「賞」亞洲優惠",
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
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["octopus", "alipay", "wechat_pay", "payme"] },
    ],
    tags: ["AEON會員日", "永久免年費", "JCB", "日本"],
    feeWaiverCondition: "永久免年費",
    // JCB 不適用手機支付獎賞，所以最高只有 150,000 積分
    welcomeOfferText: "迎新簽 $6,000 送 150,000 積分 ($600) (需App申請，手機支付獎賞除外)",
    officialApplyUrl: "https://www.aeon.com.hk/tc/credit-card/",
    applyUrl: "https://www.aeon.com.hk/tc/credit-card/",
    sellingPoints: ["每月20日 AEON 95折 [折扣]", "永久免年費", "迎新高達 $600 回贈", "JCB 網絡適合日本消費"],
    note: "⚠️ 每月20日 AEON 95折是購物時直接減價，非事後回贈。迎新：(1) 簽滿$6,000送100,000積分($400)；(2) 經官網/App申請額外50,000積分($200)。⚠️ JCB 卡不適用手機支付獎賞！JCB 卡適合日本消費。不適用於電子錢包增值/轉賬、八達通自動增值、AEON Netmember繳費。",
  },

  // ========================================================================
  // BEA 東亞
  // ========================================================================
  {
    id: "bea-goal",
    name: "BEA GOAL 信用卡",
    bank: "東亞銀行",
    style: { bgColor: "bg-gradient-to-br from-purple-500 to-purple-700", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    annualFee: 0,
    feeWaiverCondition: "永久免年費",
    rewardConfig: { method: 'conversion', ratio: 250, currency: 'Points' }, // 250 獎分 = $1 回贈 (0.4%)
    rules: [
      // T&C 2025: 手機支付 11X 獎分 (4.4%)，需月簽滿 $2,000，每月回贈上限 $200 (即首 $4,545 簽賬)
      { description: "手機支付 4.4% [月簽$2,000]", matchType: "paymentMethod", matchValue: ["mobile", "apple_pay", "google_pay", "samsung_pay"], percentage: 4.4, monthlyMinSpend: 2000, cap: 200, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C 2025: 網上簽賬 10X 獎分 (4%)，需月簽滿 $2,000，每月回贈上限 $200 (即首 $5,000 簽賬)
      { description: "網上簽賬 4% [月簽$2,000]", matchType: "category", matchValue: "online", percentage: 4.0, monthlyMinSpend: 2000, cap: 200, capType: "reward", excludeCategories: ["ewallet", "utilities", "insurance", "supermarket", "government"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C 2025: 本地食肆 5X 獎分 (2%)，需月簽滿 $2,000
      { description: "本地食肆 2% [月簽$2,000]", matchType: "category", matchValue: ["dining"], percentage: 2.0, monthlyMinSpend: 2000, excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
      // T&C 2025: 外幣簽賬 5X 獎分 (2%)，需月簽滿 $2,000
      { description: "外幣簽賬 2% [月簽$2,000]", matchType: "base", percentage: 2.0, monthlyMinSpend: 2000, isForeignCurrency: true, excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
      // T&C: 基本獎賞 0.4%
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
    ],
    tags: ["手機支付4.4%", "網購4%", "食肆2%", "海外2%", "永久免年費", "月簽$2000"],
    welcomeOfferText: "迎新簽 $3,000 送 $300 現金回贈 (首2個月內)",
    officialApplyUrl: "https://www.hkbea.com/html/tc/bea-credit-card-goal-card.html",
    applyUrl: "https://www.hkbea.com/html/tc/bea-goal-credit-card.html",
    sellingPoints: ["🔥 手機支付 11X (4.4%)", "網上簽賬 10X (4%)", "本地食肆 5X (2%)", "外幣簽賬 5X (2%)", "每月回贈上限 $200", "永久免年費"],
    note: "⚠️ 需每月簽滿 $2,000 才享額外獎分！手機支付 11X (4.4%)、網上簽賬 10X (4%)，每月回贈上限 $200。本地食肆/外幣簽賬 5X (2%)。❌ 不計回贈：超市、電子錢包充值(Alipay/PayMe/WeChat Pay)、保費、透過電子網絡繳款、政府部門。迎新：首2個月簽滿 $3,000 送 $300。12個月內取消扣回迎新。\n\n📅 **2025年12月30日更新**：推廣期延長至 **2026年6月30日**",
    promoEndDate: "2026-06-30",
    promoName: "BEA GOAL 額外獎分推廣",
  },
  {
    id: "bea-world-master",
    name: "BEA Flyer World Mastercard",
    bank: "東亞銀行",
    style: { bgColor: "bg-gradient-to-br from-sky-600 to-blue-800", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    annualFee: 1800,
    feeWaiverCondition: "首年免年費",
    minIncome: 150000,
    rewardConfig: { method: 'direct_rate', baseRate: 5, currency: 'Miles' }, // $5/里 基本
    rules: [
      // T&C 2025: 本地食肆 $5/里 (即2.4%@$0.12/里)
      { description: "本地食肆 $5/里 (2.4%)", matchType: "category", matchValue: ["dining"], percentage: 2.4, excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
      // T&C 2025: 海外簽賬 $2.5/里 (即4.8%@$0.12/里)
      { description: "海外簽賬 $2.5/里 (4.8%)", matchType: "base", percentage: 4.8, isForeignCurrency: true, excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
      // T&C: 基本獎賞 $5/里 (0.4%)
      { description: "基本回饋 $5/里 (0.4%)", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
    ],
    tags: ["里數", "Flyer", "食肆$5/里", "海外$2.5/里"],
    welcomeOfferText: "迎新簽 $4,000 送 $400 現金回贈 / 簽 $100,000 送 70,000 里 (首3個月)",
    sellingPoints: ["海外簽賬 $2.5/里 (4.8%)", "本地食肆 $5/里 (2.4%)", "積分無限期", "亞洲萬里通直接入賬"],
    officialApplyUrl: "https://www.hkbea.com/html/tc/bea-credit-card-flyer-world-mastercard.html",
    applyUrl: "https://www.hkbea.com/html/tc/bea-flyer-world-mastercard.html",
    note: "💡 【推廣期延長至 2026/6/30】海外簽賬 $2.5/里 (4.8%@$0.12/里估值)，本地食肆 $5/里 (2.4%)，其他本地 $5/里 (0.4%)。⚠️ 不計回贈：電子錢包充值(Alipay/PayMe/WeChat Pay)、保費、透過電子網絡繳款。八達通自動增值/政府部門簽賬每月上限 $40 回贈。迎新：簽$4,000送$400回贈 或 簽$5,000-$100,000送5,000-70,000里。12個月內取消扣回迎新。年費 $1,800，首年免。\n\n📅 **2025年12月30日更新**：推廣期延長至 **2026年6月30日**",
    promoEndDate: "2026-06-30",
    promoName: "BEA Flyer World 額外獎分推廣",
  },
  {
    id: "bea-i-titanium",
    name: "BEA i-Titanium 信用卡",
    bank: "東亞銀行",
    hidden: true, // 東亞已停止接受新申請
    style: { bgColor: "bg-gradient-to-br from-gray-400 to-gray-600", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    annualFee: 0,
    feeWaiverCondition: "永久免年費",
    rewardConfig: { method: 'conversion', ratio: 250, currency: 'Points' }, // 250 獎分 = $1 回贈 (0.4%)
    rules: [
      // T&C: 網上簽賬/手機支付 10X 獎分 (4%)，每月回贈上限 $300 (即首 $8,333 簽賬)
      // ❗ 超市/旅行社/政府 除外
      { description: "網上簽賬 10X (4%)", matchType: "category", matchValue: "online", percentage: 4.0, cap: 300, capType: "reward", excludeCategories: ["ewallet", "utilities", "insurance", "supermarket", "travel", "government"] },
      { description: "手機支付 10X (4%)", matchType: "paymentMethod", matchValue: ["mobile", "apple_pay", "google_pay", "samsung_pay"], percentage: 4.0, cap: 300, capType: "reward", excludeCategories: ["ewallet", "utilities", "insurance", "supermarket", "travel", "government"] },
      // T&C: 海外簽賬 10X 獎分 (4%)，每月回贈上限 $300
      { description: "海外簽賬 10X (4%)", matchType: "base", percentage: 4.0, cap: 300, capType: "reward", isForeignCurrency: true, excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
      // T&C: 本地食肆 5X 獎分 (2%)
      { description: "本地食肆 5X (2%)", matchType: "category", matchValue: ["dining"], percentage: 2.0, excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
      // T&C: 網上繳費 1X 獎分 (0.4%)
      { description: "網上繳費 1X (0.4%)", matchType: "category", matchValue: ["utilities"], percentage: 0.4 },
      // T&C: 基本獎賞 1X 獎分 (0.4%)
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "government", "insurance", "ewallet"] },
    ],
    tags: ["網購4%", "手機支付4%", "海外4%", "食肆2%", "永久免年費"],
    officialApplyUrl: "https://www.hkbea.com/html/tc/bea-credit-card-i-titanium-card.html",
    applyUrl: "https://www.hkbea.com/html/tc/bea-i-titanium-card.html",
    sellingPoints: ["網上/手機支付 10X 獎分 (4%)", "海外簽賬 10X 獎分 (4%)", "本地食肆 5X 獎分 (2%)", "每月回贈上限 $300"],
    note: "💡 【推廣期延長至 2026/12/31】網上/手機支付/海外簽賬 10X 獎分 (4%)，每月回贈上限 $300 (即首 $8,333 簽賬享 4%)。本地食肆 5X (2%)。⚠️ 不計回贈：超市、旅行社、政府部門、電子錢包充值、保費、透過電子網絡繳款。八達通自動增值/政府部門簽賬每月上限 $40 回贈。\n\n📅 **2025年12月30日更新**：推廣期延長至 **2026年12月31日**",
    promoEndDate: "2026-12-31",
    promoName: "BEA i-Titanium 額外獎分推廣",
  },
  {
    id: "bea-visa-signature",
    name: "BEA Visa Signature 卡",
    bank: "東亞銀行",
    hidden: true,
    style: { bgColor: "bg-gradient-to-br from-slate-700 to-slate-900", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    annualFee: 1800,
    feeWaiverCondition: "首年免年費",
    minIncome: 300000,
    rewardConfig: { method: 'conversion', ratio: 250, currency: 'Points' }, // 250 獎分 = $1 回贈 (0.4%)
    rules: [
      // T&C 2025: 本地食肆 6X 獎分 (2.4%)
      { description: "本地食肆 6X (2.4%)", matchType: "category", matchValue: ["dining"], percentage: 2.4, excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
      // T&C 2025: 外幣簽賬 4X 獎分 (1.6%)
      { description: "外幣簽賬 4X (1.6%)", matchType: "base", percentage: 1.6, isForeignCurrency: true, excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
      // T&C: 基本獎賞 1X 獎分 (0.4%)
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
    ],
    tags: ["食肆2.4%", "海外1.6%", "免費旅遊保障"],
    welcomeOfferText: "迎新簽 $4,000 送 $400 現金回贈 (首2個月內)",
    officialApplyUrl: "https://www.hkbea.com/html/tc/bea-credit-card-visa-signature-card.html",
    applyUrl: "https://www.hkbea.com/html/tc/bea-visa-signature-card.html",
    sellingPoints: ["本地食肆 6X 獎分 (2.4%)", "外幣簽賬 4X 獎分 (1.6%)", "年簽$60,000享免費旅遊保障", "機場貴賓室優惠"],
    note: "💡 【推廣期延長至 2026/12/31】本地食肆 6X (2.4%)，外幣簽賬 4X (1.6%)。年簽$60,000/$90,000享1/2次免費7天家庭旅遊保障。⚠️ 不計回贈：電子錢包充值(Alipay/PayMe/WeChat Pay)、保費、透過電子網絡繳款。八達通自動增值/政府部門簽賬每月上限 $40 回贈。年費 $1,800，首年免。年薪要求 $300,000。\n\n📅 **2025年12月30日更新**：推廣期延長至 **2026年12月31日**",
    promoEndDate: "2026-12-31",
    promoName: "BEA Visa Signature 額外獎分推廣",
  },
  {
    id: "bea-unionpay-diamond",
    name: "BEA 銀聯雙幣鑽石信用卡",
    bank: "東亞銀行",
    cardNetwork: "unionpay",
    style: { bgColor: "bg-gradient-to-br from-cyan-600 to-blue-800", textColor: "text-white" },
    foreignCurrencyFee: 0, // 銀聯卡通常無外幣手續費
    annualFee: 1800,
    feeWaiverCondition: "首年免年費",
    minIncome: 150000,
    rewardConfig: { method: 'conversion', ratio: 250, currency: 'Points' }, // 250 獎分 = $1 回贈 (0.4%)
    rules: [
      // T&C 2025: 本地食肆 3X 獎分 (1.2%)
      { description: "本地食肆 3X (1.2%)", matchType: "category", matchValue: ["dining"], percentage: 1.2, excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
      // T&C 2025: 本地零售 2X 獎分 (0.8%)
      { description: "本地零售 2X (0.8%)", matchType: "base", percentage: 0.8, excludeCategories: ["dining", "tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 網上繳費 1X 獎分 (0.4%)，每月上限 20,000 獎分 = $80 回贈
      { description: "網上繳費 1X (0.4%)", matchType: "category", matchValue: ["utilities"], percentage: 0.4, cap: 80, capType: "reward" },
      // T&C: 基本獎賞 1X 獎分 (0.4%)
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "government", "insurance", "ewallet"] },
    ],
    tags: ["食肆1.2%", "本地0.8%", "免外幣手續費", "銀聯"],
    welcomeOfferText: "迎新簽 $4,000 送 $400 現金回贈 (首2個月內)",
    officialApplyUrl: "https://www.hkbea.com/html/tc/bea-credit-card-unionpay-diamond-dual-currency-card.html",
    applyUrl: "https://www.hkbea.com/html/tc/bea-unionpay-dual-currency-diamond-credit-card.html",
    sellingPoints: ["本地食肆 3X 獎分 (1.2%)", "本地零售 2X 獎分 (0.8%)", "免外幣手續費", "內地消費免貨幣兌換費"],
    note: "💡 【推廣期延長至 2026/12/31】本地食肆 3X (1.2%)，本地零售 2X (0.8%)。網上繳費每月上限 20,000 獎分。銀聯卡內地消費免貨幣兌換費。⚠️ 不計回贈：電子錢包充值(Alipay/PayMe/WeChat Pay)、保費、透過電子網絡繳款。八達通自動增值/政府部門簽賬每月上限 $40 回贈。年費 $1,800，首年免。\n\n📅 **2025年12月30日更新**：推廣期延長至 **2026年12月31日**",
    promoEndDate: "2026-12-31",
    promoName: "BEA 銀聯雙幣鑽石 額外獎分推廣",
  },
  {
    id: "bea-unionpay-platinum",
    name: "BEA 銀聯雙幣白金信用卡",
    bank: "東亞銀行",
    cardNetwork: "unionpay",
    hidden: true,
    style: { bgColor: "bg-gradient-to-br from-slate-400 to-slate-600", textColor: "text-white" },
    foreignCurrencyFee: 0, // 銀聯卡通常無外幣手續費
    annualFee: 600,
    feeWaiverCondition: "首年免年費",
    rewardConfig: { method: 'conversion', ratio: 250, currency: 'Points' }, // 250 獎分 = $1 回贈 (0.4%)
    rules: [
      // T&C 2025: 本地食肆 3X 獎分 (1.2%)
      { description: "本地食肆 3X (1.2%)", matchType: "category", matchValue: ["dining"], percentage: 1.2, excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
      // T&C 2025: 本地零售 2X 獎分 (0.8%)
      { description: "本地零售 2X (0.8%)", matchType: "base", percentage: 0.8, excludeCategories: ["dining", "tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 基本獎賞 1X 獎分 (0.4%)
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "government", "insurance", "ewallet"] },
    ],
    tags: ["食肆1.2%", "本地0.8%", "免外幣手續費", "銀聯", "低門檻"],
    welcomeOfferText: "迎新簽 $2,000 送 $200 現金回贈 (首2個月內)",
    officialApplyUrl: "https://www.hkbea.com/html/tc/bea-credit-card-unionpay-platinum-dual-currency-card.html",
    applyUrl: "https://www.hkbea.com/html/tc/bea-unionpay-dual-currency-platinum-credit-card.html",
    sellingPoints: ["本地食肆 3X 獎分 (1.2%)", "本地零售 2X 獎分 (0.8%)", "免外幣手續費", "內地消費免貨幣兌換費"],
    note: "💡 【推廣期延長至 2026/12/31】本地食肆 3X (1.2%)，本地零售 2X (0.8%)。銀聯卡內地消費免貨幣兌換費。⚠️ 不計回贈：電子錢包充值(Alipay/PayMe/WeChat Pay)、保費、透過電子網絡繳款。八達通自動增值/政府部門簽賬每月上限 $40 回贈。年費 $600，首年免。\n\n📅 **2025年12月30日更新**：推廣期延長至 **2026年12月31日**",
    promoEndDate: "2026-12-31",
    promoName: "BEA 銀聯雙幣白金 額外獎分推廣",
  },
  {
    id: "bea-jcb-platinum",
    name: "BEA JCB 白金卡",
    bank: "東亞銀行",
    cardNetwork: "jcb",
    style: { bgColor: "bg-gradient-to-br from-blue-600 to-indigo-800", textColor: "text-white" },
    foreignCurrencyFee: 1.95, // 一般外幣手續費
    annualFee: 1800,
    feeWaiverCondition: "首年免年費",
    rewardConfig: { method: 'conversion', ratio: 250, currency: 'Points' }, // 250 獎分 = $1 回贈 (0.4%)
    rules: [
      // 🔥 限時優惠：本地及澳門實體店非接觸式簽賬 15% (2025/10/15-2026/3/31)
      // 需透過 BEA Mall App 登記，首5,000名，每月簽滿$500，每月上限$100，整個推廣期上限$600
      { description: "🔥Apple Pay/Google Pay 15% [月簽$500,上限$100,需登記]", matchType: "paymentMethod", matchValue: ["contactless", "apple_pay", "google_pay"], percentage: 15.0, monthlyMinSpend: 500, cap: 100, capType: "reward", validDateRange: { start: "2025-10-15", end: "2026-03-31" }, excludeCategories: ["online", "ewallet", "insurance", "tax", "utilities"] },
      // JCB 大灣區航空日本機票 8 折 (至2026/1/31)
      { description: "🔥大灣區航空日本機票 8 折", matchType: "merchant", matchValue: ["greater-bay-airlines"], percentage: 20.0, isDiscount: true, validDateRange: { start: "2025-11-01", end: "2026-01-31" } },
      // JCB 香港松本清 3% 折扣 (至2026/12/31)
      { description: "香港松本清 3% 折扣", matchType: "merchant", matchValue: ["matsumoto-kiyoshi"], percentage: 3.0, isDiscount: true, validDateRange: { start: "2023-01-01", end: "2026-12-31" } },
      // 基本獎賞：$250 = $1 (0.4%)
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
    ],
    tags: ["JCB", "日本優惠", "Apple Pay 15%", "Google Pay 15%", "藥妝折扣", "機場貴賓室", "松本清3%", "大灣區航空8折", "機場星巴克", "需登記"],
    welcomeOfferText: "迎新優惠請查詢官網",
    officialApplyUrl: "https://www.hkbea.com/html/tc/bea-jcb-platinum-card.html",
    applyUrl: "https://www.hkbea.com/html/tc/bea-jcb-platinum-card.html",
    sellingPoints: ["🔥Apple Pay/Google Pay 15% (月簽$500,上限$100)", "🔥大灣區航空日本機票 8 折", "香港機場星巴克滿$90減$45", "日本/夏威夷機場貴賓室"],
    note: "🔥 **Apple Pay / Google Pay 15% 現金回贈**（2025/10/15-2026/3/31）：\n- 需透過 BEA Mall App 登記，首 5,000 名\n- 本地及澳門實體店用手機支付（Apple Pay/Google Pay）或拍卡\n- 每月累積簽賬滿 $500 即享 15% 回贈\n- 每月最高回贈 $100（即每月 $667 簽賬封頂）\n- 整個推廣期最高 $600（階段1: $300 + 階段2: $300）\n\n✈️ **大灣區航空日本機票 8 折**（至2026/1/31）：官網預訂日本來回機票，優惠碼「25JCBHKGPRO」，適用航點：東京、大阪、仙台、札幌。\n\n☕ **香港機場星巴克優惠**（至2026/1/31）：滿$90減$45！需出示登機證。\n\n🛒 **香港松本清 3% 折扣**（至2026/12/31）：需結賬前聲明使用JCB卡。\n\n✈️ **機場貴賓室**：日本及夏威夷機場貴賓室免費使用（至2026/3/31）\n\n❌ **不合資格簽賬**：網上簽賬、電子錢包增值（Alipay/PayMe/WeChat Pay）、八達通增值、稅務繳款、循環付款、儲值卡充值、指定售票網絡（Cityline/快達票等）。\n\n[查看詳情](/discover/bea-jcb-contactless-2025)",
    promoEndDate: "2026-03-31",
    promoName: "Apple Pay/Google Pay 15%回贈",
  },

  // ========================================================================
  // PrimeCredit 安信 / WeWa
  // ========================================================================
  {
    id: "earnmore",
    name: "安信 EarnMORE 銀聯卡",
    bank: "安信",
    cardNetwork: "unionpay",
    style: { bgColor: "bg-gradient-to-br from-blue-600 to-indigo-700", textColor: "text-white" },
    // imageUrl from DB
    rewardTimeline: "現金回贈下期月結單入賬",
    annualFee: 250,
    feeWaiverCondition: "首年免年費",
    foreignCurrencyFee: 1, // 2025/1/1 起銀聯卡外幣手續費 1%
    rules: [
      // T&C: 全方位 2% 現金回贈 (1% 基本 + 1% 加碼)
      // 加碼回贈上限 $1,500/年 (即總簽賬上限 $150,000/年)
      // ❌ 不包括：八達通自動增值、電子錢包充值/繳費、P2P 轉賬
      // 官方 T&C: https://www.primecredit.com/sta-data/tnc/EM_20250409/tnc.html
      { description: "全方位 2%", matchType: "base", percentage: 2.0, cap: 1500, capType: "reward", excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["octopus", "alipay", "wechat_pay", "payme"] },
      // T&C: 八達通自動增值只有 0.4%（不計入 2% 全方位），但 Apple Pay 手動增值 Smart Octopus 有 2%
      // mrmiles.hk 確認
      { description: "八達通自動增值 0.4%", matchType: "paymentMethod", matchValue: ["octopus"], percentage: 0.4 },
    ],
    tags: ["全方位2%", "懶人必備", "銀聯1%手續費", "八達通0.4%"],
    welcomeOfferText: "迎新簽 $8,500 送 $500 回贈 / 洗碗機 (首90天內)",
    officialApplyUrl: "https://www.primecredit.com/tc/credit-card/earnmore/",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=182&a=228&sub_id1=pickcardrebate&sub_id2=web",
    sellingPoints: ["全方位 2% 現金回贈", "1% 加碼回贈上限 $1,500/年", "銀聯外幣手續費 1%", "Apple Pay 手動增值八達通 2%", "無需登記"],
    note: "⚠️ 2% 回贈 = 1% 基本 + 1% 加碼（1% 加碼上限 $1,500/年，即有效簽賬 $150,000/年）。\n\n📌 **八達通增值玩法**：\n• 八達通自動增值：只有 **0.4%**（不計入 2%）\n• Apple Pay 手動增值 Smart Octopus：有 **2%** 回贈！\n\n不適用於：電子錢包充值/繳費（AlipayHK/PayMe/WeChat Pay）、P2P 轉賬、賭場交易。\n⚠️ 銀聯卡外幣手續費 1%（2025/1/1起），海外淨回贈約 1%。\n迎新：簽 $8,500 送 $500 / 簽 $8,800 送平板 / 簽 $9,500 送洗碗機。",
  },
  {
    id: "wewa-unionpay",
    name: "WeWa 銀聯卡",
    bank: "安信",
    cardNetwork: "unionpay",
    style: { bgColor: "bg-gradient-to-br from-yellow-300 to-yellow-500", textColor: "text-black" },
    // imageUrl from DB
    annualFee: 600,
    feeWaiverCondition: "首年免年費",
    foreignCurrencyFee: 1, // 2025/1/1 起銀聯卡外幣手續費 1%
    rules: [
      // 🔥 本地餐飲優惠 (2025/12/1 - 2025/12/31)
      // 實體卡：9.6% 推廣 + 0.4% 基本 = 10%（唔使月簽$1,500）
      // 手機支付夠$1,500：6% 推廣 + 3.6% 手機支付類別 + 0.4% 基本 = 10%
      // 手機支付唔夠$1,500：6% 推廣 + 0.4% 基本 = 6.4%
      // 單一簽賬滿 $100，全期上限 $500 額外回贈，需登記
      { description: "🔥餐飲 10% [實體卡,單筆≥$100,唔使月簽$1500]", matchType: "category", matchValue: "dining", percentage: 10.0, minSpend: 100, cap: 500, capType: "reward", validDateRange: { start: "2025-12-01", end: "2025-12-31" }, excludePaymentMethods: ["mobile", "apple_pay", "unionpay_qr", "octopus", "alipay", "wechat_pay", "payme"] },
      { description: "🔥餐飲 10% [手機支付,需月簽$1,500]", matchType: "category", matchValue: "dining", percentage: 10.0, minSpend: 100, monthlyMinSpend: 1500, cap: 500, capType: "reward", validDateRange: { start: "2025-12-01", end: "2025-12-31" }, excludePaymentMethods: ["octopus", "alipay", "wechat_pay", "payme"] },
      { description: "🔥餐飲 6.4% [手機支付,唔夠月簽$1,500]", matchType: "category", matchValue: "dining", percentage: 6.4, minSpend: 100, cap: 500, capType: "reward", validDateRange: { start: "2025-12-01", end: "2025-12-31" }, excludePaymentMethods: ["octopus", "alipay", "wechat_pay", "payme"] },
      // T&C 2025/7/1-2026/6/30: 玩樂類別 4 選 1，需月簽$1,500，每月回贈上限 $200
      // 回贈率已包含基本 0.4%，顯示為總回贈 4%
      // 1. 手機支付 (Apple Pay/銀聯手機閃付/銀聯二維碼/雲閃付)
      { description: "手機支付 4% [需月簽$1,500,4選1]", matchType: "paymentMethod", matchValue: ["mobile", "apple_pay", "unionpay_qr"], percentage: 4.0, monthlyMinSpend: 1500, cap: 200, capType: "reward", excludeCategories: ["ewallet"], excludePaymentMethods: ["octopus", "alipay", "wechat_pay", "payme"] },
      // 2. 旅遊簽賬 (旅行社/航空公司/酒店客房住宿)
      { description: "旅遊 4% [需月簽$1,500,4選1]", matchType: "category", matchValue: ["travel"], percentage: 4.0, monthlyMinSpend: 1500, cap: 200, capType: "reward", excludePaymentMethods: ["octopus", "alipay", "wechat_pay", "payme"] },
      // 3. 海外簽賬 (非香港登記商戶 + 外幣交易)，扣除1%外幣手續費後淨回贈約3%
      { description: "海外 4% [需月簽$1,500,4選1]", matchType: "base", percentage: 4.0, isForeignCurrency: true, monthlyMinSpend: 1500, cap: 200, capType: "reward", excludePaymentMethods: ["octopus", "alipay", "wechat_pay", "payme"] },
      // 4. 線上娛樂 (Apple App Store/Disney+/Google Play/JOOX/KKBOX/MyTV SUPER/Netflix/Nintendo/Patreon/PlayStation/Spotify/Steam/Xbox/YouTube)
      { description: "線上娛樂 4% [需月簽$1,500,4選1]", matchType: "merchant", matchValue: ["netflix", "spotify", "disney-plus", "youtube", "steam", "playstation", "xbox", "nintendo", "kkbox", "joox", "mytv-super", "patreon", "apple-app-store", "google-play"], percentage: 4.0, monthlyMinSpend: 1500, cap: 200, capType: "reward", excludePaymentMethods: ["octopus", "alipay", "wechat_pay", "payme"] },
      // T&C: 八達通自動增值計入基本 0.4%（無上限），但不計入玩樂類別 3.6%
      { description: "八達通自動增值 0.4%", matchType: "paymentMethod", matchValue: ["octopus"], percentage: 0.4 },
      // T&C: 基本回贈 0.4%（$250=$1），排除電子錢包充值、P2P轉賬、賭場等
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
    ],
    tags: ["玩樂4%", "旅遊", "海外", "線上娛樂", "八達通增值", "銀聯1%手續費", "餐飲10%"],
    welcomeOfferText: "🔥網上申請額外$300 (限12/31前) + 簽$8,500送$500 / 簽$8,800送LG顯示器或Marshall喇叭",
    officialApplyUrl: "https://www.primecredit.com/tc/credit-card/wewa/",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=180&a=228&sub_id1=pickcardrebate&sub_id2=web",
    sellingPoints: ["🔥網上申請額外$300 (限12/31前)", "🔥餐飲 10% (12月限定,需登記)", "玩樂類別 4% (4選1)", "每月回贈上限 $200", "八達通增值 0.4%"],
    note: "🎁 **迎新優惠**（2025/12/1-2026/2/28）：\n- 網上申請額外 $300（🔥限2025/12/31前申請）\n- 簽 $8,800 送 LG 27吋顯示器 / Marshall喇叭\n- 簽 $8,500 送 $500 現金回贈\n- 高達 $90,000 免息套現（無簽賬要求）\n- 學生專享：簽 $2,000 送 $200\n\n💡 【推廣期 2025/7/1-2026/6/30】玩樂類別 **4%**（已包 0.4% 基本）需 4 選 1（透過 OmyCard App 自選），需每月簽滿 $1,500，每月回贈上限 $200。如未選擇，自動選擇「手機支付」。\n\n📌 **玩樂類別選項**：手機支付 / 旅遊 / 海外 / 線上娛樂\n\n📌 **手機支付包括**：Apple Pay / 銀聯手機閃付 / 雲閃付（銀聯二維碼）\n\n📌 **線上娛樂包括**：Apple App Store / Disney+ / Google Play / JOOX / KKBOX / MyTV SUPER / Netflix / Nintendo / Patreon / PlayStation / Spotify / Steam / Xbox / YouTube\n\n✅ 八達通自動增值計 0.4%（無上限）！\n❌ 玩樂4%不計：電子錢包充值/轉賬、分期、賭場、繳費\n⚠️ 銀聯外幣手續費 1%（2025/1/1起），海外淨回贈約 3%\n\n🔥 **本地餐飲優惠**（至2025/12/31）：全港食肆高達10%回贈！\n- **實體卡**：10%（唔使月簽$1,500）\n- **手機支付夠$1,500**：10%\n- **手機支付唔夠$1,500**：6.4%\n[查看詳情](/discover/wewa-dining-2025)",
    promoEndDate: "2025-12-31",
    promoName: "WeWa 本地餐飲優惠",
  },
  {
    id: "wewa-visa-signature",
    name: "WeWa Visa Signature 卡",
    bank: "安信",
    cardNetwork: "visa",
    style: { bgColor: "bg-gradient-to-br from-yellow-400 to-amber-500", textColor: "text-black" },
    annualFee: 600,
    feeWaiverCondition: "首年免年費",
    foreignCurrencyFee: 1.95, // Visa 外幣手續費約 1.95%
    rules: [
      // 🔥 本地餐飲優惠 (2025/12/1 - 2025/12/31)
      // 實體卡：9.6% 推廣 + 0.4% 基本 = 10%（唔使月簽$1,500）
      // Apple Pay 夠$1,500：6% 推廣 + 3.6% 手機支付類別 + 0.4% 基本 = 10%
      // Apple Pay 唔夠$1,500：6% 推廣 + 0.4% 基本 = 6.4%
      { description: "🔥餐飲 10% [實體卡,唔使月簽$1500]", matchType: "category", matchValue: "dining", percentage: 10.0, minSpend: 100, cap: 500, capType: "reward", validDateRange: { start: "2025-12-01", end: "2025-12-31" }, excludePaymentMethods: ["mobile", "apple_pay", "octopus", "alipay", "wechat_pay", "payme"] },
      { description: "🔥餐飲 10% [Apple Pay,需月簽$1,500]", matchType: "category", matchValue: "dining", percentage: 10.0, minSpend: 100, monthlyMinSpend: 1500, cap: 500, capType: "reward", validDateRange: { start: "2025-12-01", end: "2025-12-31" }, excludePaymentMethods: ["octopus", "alipay", "wechat_pay", "payme"] },
      { description: "🔥餐飲 6.4% [Apple Pay,唔夠月簽$1,500]", matchType: "category", matchValue: "dining", percentage: 6.4, minSpend: 100, cap: 500, capType: "reward", validDateRange: { start: "2025-12-01", end: "2025-12-31" }, excludePaymentMethods: ["octopus", "alipay", "wechat_pay", "payme"] },
      // T&C 2025/7/1-2026/6/30: 玩樂類別 4 選 1，需月簽$1,500，每月回贈上限 $200
      // 1. 手機支付 - ⚠️ WeWa Visa 只支援 Apple Pay (iOS)，Android 不支援
      { description: "手機支付 4% [需月簽$1,500,4選1,僅iOS]", matchType: "paymentMethod", matchValue: ["apple_pay"], percentage: 4.0, monthlyMinSpend: 1500, cap: 200, capType: "reward", excludeCategories: ["ewallet"], excludePaymentMethods: ["octopus", "alipay", "wechat_pay", "payme"] },
      // 2. 旅遊簽賬 (旅行社/航空公司/酒店客房住宿)
      { description: "旅遊 4% [需月簽$1,500,4選1]", matchType: "category", matchValue: ["travel"], percentage: 4.0, monthlyMinSpend: 1500, cap: 200, capType: "reward", excludePaymentMethods: ["octopus", "alipay", "wechat_pay", "payme"] },
      // 3. 海外簽賬 - 扣除1.95%外幣手續費後淨回贈約2%
      { description: "海外 4% [需月簽$1,500,4選1]", matchType: "base", percentage: 4.0, isForeignCurrency: true, monthlyMinSpend: 1500, cap: 200, capType: "reward", excludePaymentMethods: ["octopus", "alipay", "wechat_pay", "payme"] },
      // 4. 線上娛樂
      { description: "線上娛樂 4% [需月簽$1,500,4選1]", matchType: "merchant", matchValue: ["netflix", "spotify", "disney-plus", "youtube", "steam", "playstation", "xbox", "nintendo", "kkbox", "joox", "mytv-super", "patreon", "apple-app-store", "google-play"], percentage: 4.0, monthlyMinSpend: 1500, cap: 200, capType: "reward", excludePaymentMethods: ["octopus", "alipay", "wechat_pay", "payme"] },
      { description: "八達通自動增值 0.4%", matchType: "paymentMethod", matchValue: ["octopus"], percentage: 0.4 },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
    ],
    tags: ["玩樂4%", "旅遊", "海外", "線上娛樂", "八達通增值", "餐飲10%", "Visa Signature"],
    welcomeOfferText: "🔥網上申請額外$300 (限12/31前) + 簽$8,500送$500 / 簽$8,800送LG顯示器或Marshall喇叭",
    officialApplyUrl: "https://www.primecredit.com/tc/credit-card/wewa/",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=180&a=228&sub_id1=pickcardrebate&sub_id2=web",
    sellingPoints: ["🔥網上申請額外$300 (限12/31前)", "🔥餐飲 10% (12月限定,需登記)", "玩樂類別 4% (4選1)", "Visa Signature 禮遇", "八達通增值 0.4%"],
    note: "🎁 **迎新優惠**（2025/12/1-2026/2/28）：\n- 網上申請額外 $300（🔥限2025/12/31前申請）\n- 簽 $8,800 送 LG 27吋顯示器 / Marshall喇叭\n- 簽 $8,500 送 $500 現金回贈\n- 高達 $90,000 免息套現（無簽賬要求）\n- 學生專享：簽 $2,000 送 $200\n\n💡 【推廣期 2025/7/1-2026/6/30】玩樂類別 **4%**（已包 0.4% 基本）需 4 選 1（透過 OmyCard App 自選），需每月簽滿 $1,500，每月回贈上限 $200。\n\n📌 **玩樂類別選項**：手機支付 / 旅遊 / 海外 / 線上娛樂\n\n⚠️ **手機支付僅支援 iOS 使用 Apple Pay**！Android 用戶無法使用此類別。\n\n📌 **線上娛樂包括**：Apple App Store / Disney+ / Google Play / JOOX / KKBOX / MyTV SUPER / Netflix / Nintendo / Patreon / PlayStation / Spotify / Steam / Xbox / YouTube\n\n✅ 八達通自動增值計 0.4%（無上限）！\n❌ 玩樂4%不計：電子錢包充值/轉賬、分期、賭場、繳費\n⚠️ Visa 外幣手續費約 1.95%，海外淨回贈約 2%\n\n🔥 **本地餐飲優惠**（至2025/12/31）：全港食肆高達10%回贈！\n- **實體卡**：10%（唔使月簽$1,500）\n- **Apple Pay夠$1,500**：10%\n- **Apple Pay唔夠$1,500**：6.4%\n[查看詳情](/discover/wewa-dining-2025)",
    promoEndDate: "2025-12-31",
    promoName: "WeWa 本地餐飲優惠",
  },

  // ========================================================================
  // Dah Sing 大新
  // ========================================================================
  {
    id: "dahsing-one",
    name: "大新 ONE+ 白金卡",
    bank: "大新銀行",
    hidden: true,
    style: { bgColor: "bg-gradient-to-br from-purple-800 to-purple-950", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "全方位 1%", matchType: "base", percentage: 1.0, excludeCategories: ["tax", "utilities", "government", "insurance"] },
    ],
    tags: ["無腦1%", "現金回贈", "冬日狂賞"],
    sellingPoints: ["本地及外幣簽賬一律 1% 回贈", "無上限", "🔥 冬日狂賞：食肆額外5%、網購/旅遊/海外額外3%"],
    officialApplyUrl: "https://www.dahsing.com/html/tc/credit_card/one_plus.html",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=604&a=228&sub_id1=pickcardrebate&sub_id2=web",
    note: "🔥 **冬日狂賞**（2025/12/8 - 2026/2/28）：\n\n登記後享額外回贈！配合 ONE+ 本身 1% 回贈：\n• 本地食肆：1% + 5% = **6%**（簽 $6,000 爆上限 $300）\n• 網上/旅遊/海外：1% + 3% = **4%**（簽 $10,000 爆上限 $300）\n\n📌 每階段累積簽滿 $6,000（單筆需滿 $300），整個推廣期最高 $900 回贈\n\n⚠️ **注意**：名額只限 8,000 人，需登記！AlipayHK、WeChat Pay、PayMe 不計！[查看詳情及登記](/discover/dahsing-winter-promo)",
    promoEndDate: "2026-02-28",
    promoName: "冬日狂賞",
  },
  {
    id: "dahsing-ba",
    name: "大新英國航空白金卡",
    bank: "大新銀行",
    hidden: true,
    style: { bgColor: "bg-gradient-to-br from-blue-800 to-blue-950", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 16.6666, currency: 'Avios' }, // Approx? Need to check strictly.
    rules: [
      { description: "本地簽賬 $6/Avios", matchType: "base", percentage: 1.67, excludeCategories: ["tax", "utilities", "government", "insurance"] },
      { description: "海外簽賬 $4/Avios", matchType: "base", percentage: 2.5, isForeignCurrency: true },
    ],
    tags: ["Avios", "英航", "冬日狂賞"],
    sellingPoints: ["本地簽賬 HK$6 = 1 Avios", "生日當天 HK$6 = 2 Avios", "🔥 冬日狂賞：食肆額外5%、網購/旅遊/海外額外3%"],
    officialApplyUrl: "https://www.dahsing.com/html/tc/credit_card/british_airways.html",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=604&a=228&sub_id1=pickcardrebate&sub_id2=web",
    note: "🔥 **冬日狂賞**（2025/12/8 - 2026/2/28）：登記後本地食肆享額外5%、網上/旅遊/海外享額外3%現金回贈！每階段上限 $300，整個推廣期最高 $900。名額只限 8,000 人！[查看詳情及登記](/discover/dahsing-winter-promo)",
    promoEndDate: "2026-02-28",
    promoName: "冬日狂賞",
  },
  {
    id: "dahsing-united",
    name: "大新聯合航空 World 萬事達卡",
    bank: "大新銀行",
    style: { bgColor: "bg-gradient-to-br from-blue-900 to-indigo-950", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    annualFee: 2000,
    feeWaiverCondition: "豁免首2年年費",
    minIncome: 150000,
    incomeNote: "最低年薪 HK$150,000",
    rewardConfig: { method: 'conversion', ratio: 1, currency: 'United Miles' },
    rules: [
      // 聯合航空及海外簽賬 HK$5 = 1里數
      { description: "聯合航空簽賬 $5/里", matchType: "merchant", matchValue: ["united_airlines"], percentage: 2.0 },
      { description: "海外簽賬 $5/里", matchType: "base", percentage: 2.0, isForeignCurrency: true, excludeCategories: ["tax", "utilities", "government", "insurance"] },
      // 指定商戶簽賬 HK$6 = 1里數
      { description: "指定商戶簽賬 $6/里", matchType: "category", matchValue: ["dining", "entertainment"], percentage: 1.67 },
      // 八達通自動增值/電子錢包增值 HK$12 = 1里數 (較低回贈)
      { description: "八達通增值 $12/里", matchType: "paymentMethod", matchValue: ["octopus_aavs"], percentage: 0.83 },
      // 本地簽賬 HK$8 = 1里數
      { description: "本地簽賬 $8/里", matchType: "base", percentage: 1.25, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["payme", "wechat_pay", "alipay", "octopus"] },
    ],
    tags: ["聯合航空", "United Miles", "里數不設限期", "貴賓室", "85折買里數", "冬日狂賞"],
    welcomeOfferText: "迎新簽 $8,000 送 10,000 里數 (首2個月內累積)",
    officialApplyUrl: "https://www.dahsing.com/html/tc/credit_card/united.html",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=604&a=228&sub_id1=pickcardrebate&sub_id2=web",
    sellingPoints: [
      "聯合航空/海外簽賬 HK$5 = 1 里數",
      "指定商戶簽賬 HK$6 = 1 里數",
      "本地簽賬 HK$8 = 1 里數",
      "里數不設限期（持有有效卡）",
      "季簽 $40,000 送聯合航空貴賓室通行證",
      "85折購買聯合航空里數",
      "🔥 冬日狂賞：食肆額外5%、網購/旅遊/海外額外3%",
    ],
    note: "🔥 **冬日狂賞**（2025/12/8 - 2026/2/28）：登記後本地食肆享額外5%、網上/旅遊/海外享額外3%現金回贈！每階段上限 $300，整個推廣期最高 $900。名額只限 8,000 人！[查看詳情及登記](/discover/dahsing-winter-promo)\n\n---\n\n💡 **香港唯一**可賺聯合航空 MileagePlus 里數的信用卡！\n\n**貴賓室優惠**：主卡客戶於上一個信用卡季度內，憑卡累積零售簽賬達 HK$40,000 或以上，可獲聯合航空貴賓室單次電子通行證 1 張（每季最多 1 張）。\n\n**里數不設限期**：只要持有有效合資格信用卡及良好紀錄，MileagePlus 賬戶內的里數將不設到期日。\n\n**85折買里數**：可於 united.com/buymiles 以 85 折購買聯合航空里數。\n\n⚠️ **不計里數**：PayMe、TNG、AlipayHK、WeChat Pay HK、網上繳費、交稅、現金透支、分期計劃。八達通增值只有 HK$12/里（較低回贈）。\n\n⚠️ **注意**：新卡發出後 13 個月內取消主卡，將扣除 $800 手續費。迎新推廣期至 2025/12/31。",
    promoEndDate: "2026-02-28",
    promoName: "冬日狂賞",
  },

  // ========================================================================
  // CCB (Asia) 建行(亞洲) & ICBC 工銀亞洲
  // ========================================================================
  {
    id: "ccb-eye",
    name: "建行(亞洲) eye 信用卡",
    bank: "建行(亞洲)",
    style: { bgColor: "bg-gradient-to-br from-pink-300 to-pink-500", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    annualFee: 0,
    feeWaiverCondition: "永久免年費",
    rewardConfig: { method: 'conversion', ratio: 250, currency: 'Points' }, // 25,000 積分 = $100 回贈 (0.4%)
    minIncome: 240000, // 年薪要求 $240,000
    rules: [
      // ========== 基本回贈 (無需登記) ==========
      // T&C: 網上零售簽賬 5X 積分 (2%)，每曆年首 $75,000 簽賬
      { description: "網購 2% (5X積分)", matchType: "category", matchValue: ["online"], percentage: 2.0, cap: 75000, capType: "spending", excludeCategories: ["ewallet", "insurance", "tax", "government", "utilities"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 拍卡支付 5X 積分 (2%)，每曆年首 $75,000 簽賬
      { description: "拍卡支付 2% (5X積分)", matchType: "paymentMethod", matchValue: ["contactless", "apple_pay", "google_pay", "samsung_pay"], percentage: 2.0, cap: 75000, capType: "spending", excludeCategories: ["ewallet", "insurance", "tax", "government", "utilities"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 八達通自動增值 0.4%
      { description: "八達通自動增值 0.4%", matchType: "paymentMethod", matchValue: ["octopus"], percentage: 0.4 },
      // T&C: 網上繳費 0.4%
      { description: "網上繳費 0.4%", matchType: "category", matchValue: ["utilities"], percentage: 0.4 },
      // 基本回贈 0.4%
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
      
      // ========== 加碼賞 (需登記，唔會自動計入總回贈) ==========
      // T&C 2026/1-3月: 本地餐飲/外賣 9% (月簽≥$5,000 + 單筆≥$300)
      // ⚠️ 呢個係額外回贈，唔係加埋基本2%！9%+2%=11% 係分開計
      { description: "🔥本地餐飲 +9% [需登記,月簽≥$5,000,單筆≥$300]", matchType: "category", matchValue: ["dining"], percentage: 9.0, monthlyMinSpend: 5000, minSpend: 300, cap: 400, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"], validDateRange: { start: "2026-01-01", end: "2026-03-31" }, requiresRegistration: true },
      // T&C 2026/1-3月: 本地餐飲/外賣 2% (月簽<$5,000 或 單筆<$300)
      { description: "本地餐飲 +2% [需登記,月簽<$5,000或單筆<$300]", matchType: "category", matchValue: ["dining"], percentage: 2.0, cap: 100, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"], validDateRange: { start: "2026-01-01", end: "2026-03-31" }, requiresRegistration: true },
      // T&C 2026/1-3月: 本地交通 2% (無簽賬要求)
      { description: "本地交通 +2% [需登記]", matchType: "category", matchValue: ["transport"], percentage: 2.0, cap: 100, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"], validDateRange: { start: "2026-01-01", end: "2026-03-31" }, requiresRegistration: true },
    ],
    tags: ["網購2%", "拍卡2%", "八達通0.4%", "永久免年費"],
    welcomeOfferText: "迎新簽 $6,000 送 $600 現金回贈 (首2個月) / Chill分期$15,000送$800 (首3個月)",
    officialApplyUrl: "https://www.asia.ccb.com/hongkong_tc/personal/credit_cards/eye_card.html",
    applyUrl: "https://www.asia.ccb.com/hongkong/personal/credit-cards/eye-card.html",
    sellingPoints: ["網購/拍卡 2% (5X積分)", "八達通自動增值 0.4%", "永久免年費", "🔥 加碼賞：餐飲最高+9% [需登記]"],
    note: "## 📌 基本回贈（無需登記）\n- **網購/拍卡支付**：2%（5X積分），每年首 $75,000 簽賬\n- **八達通自動增值**：0.4%\n- **網上繳費**：0.4%\n- **其他簽賬**：0.4%\n\n---\n\n## 🔥 加碼賞（需每月登記，首2,500名）\n**推廣期：2026/1/1 - 3/31**\n\n| 類別 | 條件 | 額外回贈 | 上限/月 |\n|:---|:---|:---:|:---:|\n| 本地餐飲/外賣 | 月簽≥$5,000 + 單筆≥$300 | **+9%** | $400 |\n| 本地餐飲/外賣 | 月簽<$5,000 或 單筆<$300 | +2% | $100 |\n| 本地交通 | 無要求 | +2% | $100 |\n\n💡 **11% 計法**：基本 2%（網購/拍卡）+ 加碼 9% = 11%\n\n⚠️ **爆Cap計算**：$400 ÷ 9% = $4,445\n\n---\n\n## ❌ 不計回贈\n電子錢包（AlipayHK/PayMe/WeChat Pay）增值/轉賬、八達通自動增值（計加碼賞時）、酒店/會所餐飲、保險、RentSmart、稅項。\n\n---\n\n📅 **2025年12月30日更新**",
    promoEndDate: "2026-03-31",
    promoName: "建行 eye 加碼賞",
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
      { description: "本地/海外簽賬 1.5%", matchType: "base", percentage: 1.5, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"] },
    ],
    tags: ["星座卡", "高回贈", "飛行里數"],
    welcomeOfferText: "迎新簽 $3,000 送 $700 免找數簽賬額 (首2個月內)",
    officialApplyUrl: "https://www.icbcasia.com/tc/personal/cards/credit-cards/horoscope-visa-signature-card/",
    applyUrl: "https://www.icbcasia.com/tc/personal/cards/credit-cards/horoscope-visa-signature-card/",
    sellingPoints: ["本地及海外簽賬 1.5% 現金回贈", "自選星座設計", "積分可換國航/港航里數"],
    note: "⚠️ 每 $1 = 1 分。可換國航里數 (8分=1公里) 或港航里數 (10分=1金鵬里數)。積分有效期最少 1 年。迎新：首2個月簽 $3,000 送 $700 免找數簽賬額。發卡後 12 個月內取消卡將被扣除迎新等值金額。",
  },

  // ========================================================================
  // Other Banks (CNCBI, Fubon, Chong Hing, Public, Shanghai Comm)
  // ========================================================================
  {
    id: "cncbi-motion",
    name: "信銀國際 Motion 信用卡",
    bank: "信銀國際",
    style: { bgColor: "bg-gradient-to-br from-orange-500 to-red-600", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      // T&C: 食肆及網上簽賬 6%，需每月累積簽滿 $3,800，額外回贈上限 $200
      // 不包括：酒店餐飲、美食廣場/超市/百貨公司內食肆、麵包房、糕點商店
      // 網上不包括：超級市場網上平台
      { description: "食肆 6% [月簽$3,800]", matchType: "category", matchValue: ["dining"], percentage: 6.0, monthlyMinSpend: 3800, cap: 200, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      { description: "網上簽賬 6% [月簽$3,800]", matchType: "category", matchValue: ["online"], percentage: 6.0, monthlyMinSpend: 3800, cap: 200, capType: "reward", excludeCategories: ["ewallet", "supermarket"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 基本回贈 0.55%，排除電子錢包、八達通、繳費等
      { description: "基本回饋 0.55%", matchType: "base", percentage: 0.55, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["octopus", "alipay", "wechat_pay", "payme"] },
    ],
    tags: ["餐飲6%", "網購6%", "月簽$3800"],
    sellingPoints: ["食肆及網上簽賬 6% (需月簽$3,800)", "額外回贈每月上限 $200", "基本回贈 0.55%"],
    note: "⚠️ 食肆/網上 6% 需每月累積簽滿 $3,800！額外回贈上限 $200/月。不適用於：酒店餐飲、美食廣場/超市內食肆、超市網購平台、電子錢包（支付寶/微信支付/PayMe）、八達通增值。",
    officialApplyUrl: "https://www.cncbinternational.com/personal/credit-card/motion/tc/index.html",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=178&a=228&sub_id1=pickcardrebate&sub_id2=web",
  },
  {
    id: "cncbi-hkairlines",
    name: "中信銀行(國際)香港航空 Mastercard 卡",
    bank: "信銀國際",
    style: { bgColor: "bg-gradient-to-br from-red-700 to-rose-900", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    annualFee: 2000,
    feeWaiverCondition: "豁免首年年費",
    minIncome: 96000,
    incomeNote: "最低年薪 HK$96,000",
    rewardConfig: { method: 'conversion', ratio: 1, currency: 'FWC' },
    rules: [
      // 香港航空簽賬 HK$2 = 1 FWC 積分
      { description: "香港航空簽賬 $2/FWC", matchType: "merchant", matchValue: ["hong_kong_airlines"], percentage: 5.0 },
      // 海外及網上簽賬 HK$4 = 1 FWC 積分
      { description: "海外簽賬 $4/FWC", matchType: "base", percentage: 2.5, isForeignCurrency: true, excludeCategories: ["tax", "utilities", "government", "insurance"] },
      { description: "網上簽賬 $4/FWC", matchType: "category", matchValue: ["online"], percentage: 2.5, excludeCategories: ["ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // 本地簽賬 HK$6 = 1 FWC 積分
      { description: "本地簽賬 $6/FWC", matchType: "base", percentage: 1.67, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
    ],
    tags: ["香港航空", "FWC積分", "貴賓室", "海外$4/FWC"],
    welcomeOfferText: "全新客戶迎新：150日內簽 $25,000 送 26,000 FWC；簽 $70,000 送 104,000 FWC (需換領費)",
    officialApplyUrl: "https://www.cncbinternational.com/personal/credit-card/hongkong-airlines/tc/index.html",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=178&a=228&sub_id1=pickcardrebate&sub_id2=web",
    sellingPoints: [
      "香港航空簽賬 HK$2 = 1 FWC",
      "海外及網上簽賬 HK$4 = 1 FWC",
      "本地簽賬 HK$6 = 1 FWC",
      "免費 2 張香港航空機場貴賓室禮券",
      "機上免稅商品 9 折",
      "專屬登機櫃檯、優先登機及優先行李",
      "5折 FWC 積分兌換獎勵機票",
      "免費旅遊保險（保額高達10萬美元）",
      "免費 12 個月 HoteLux Elite 會籍",
    ],
    note: "💡 **香港航空專屬禮遇**！FWC 積分可兌換香港航空機票。\n\n**迎新禮遇（全新客戶）**：150日內累積簽賬達指定金額可享 FWC 積分：\n- $25,000 → 26,000 FWC（免費）\n- $40,000 → 52,000 FWC（換領費$800）\n- $55,000 → 78,000 FWC（換領費$1,600）\n- $70,000 → 104,000 FWC（換領費$2,400）\n\n**機場貴賓室**：成功啟動卡並作任何零售簽賬即送 2 張可共享的香港航空機場貴賓室禮券。另可以 $60/張換領額外禮券（需於換領日起計至下一曆月內累積簽 $3,000）。\n\n⚠️ 推廣期至 2026/6/30。",
    promoEndDate: "2026-06-30",
    promoName: "香港航空卡迎新",
  },

  // ========================================================================
  // 交通銀行（香港）Bank of Communications
  // ========================================================================
  {
    id: "bocom-gogoal",
    name: "交銀 Go-Goal 白金卡",
    bank: "交通銀行",
    style: { bgColor: "bg-gradient-to-br from-red-600 to-red-800", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    annualFee: 0,
    feeWaiverCondition: "永久免年費（限大學及大專全日制學生）",
    rewardConfig: { method: 'conversion', ratio: 250, currency: 'Points' }, // 250 獎分 = $1 回贈 (0.4%)
    rules: [
      // 高達6%簽賬回贈：首12個月，每月首$2,000簽賬享5.6%額外回贈 + 0.4%基本 = 6%
      { description: "🔥首12月 6% [首$2,000/月]", matchType: "base", percentage: 6.0, cap: 2000, capType: "spending", validDateRange: { start: "2025-01-01", end: "2025-12-31" }, excludeCategories: ["ewallet", "insurance", "tax", "utilities"] },
      // 基本獎賞：$250 = $1 (0.4%)，無上限
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["ewallet"] },
    ],
    tags: ["學生卡", "首12月6%", "永久免年費", "八達通增值"],
    welcomeOfferText: "迎新簽 $2,500 送 $300 回贈 / 20吋行李箱 / Hedgren背囊 (首3個月)",
    officialApplyUrl: "https://www.hk.bankcomm.com/hk/shtml/hk/tw/2004980/2005005/2005035/2500459/2500839/list.shtml?channelId=2004980",
    applyUrl: "https://www.hk.bankcomm.com/hk/shtml/hk/tw/2004980/2005005/2005035/2500459/2500839/list.shtml?channelId=2004980",
    sellingPoints: ["🔥首12個月高達 6% 回贈", "每月首 $2,000 簽賬享額外 5.6%", "永久免年費", "八達通自動增值計回贈"],
    note: "💡 **學生專屬卡**！適用於大學及大專全日制學生。\n\n🔥 **高達6%簽賬回贈**（首12個月）：\n• 基本回贈 0.4%（無上限）\n• 額外回贈 5.6%（每月首 $2,000 簽賬）\n• 合計最高 6%！\n\n📚 **學費回贈**：繳付8大學費可享積分（上限50,000分），適用大學：城大、浸大、嶺南、中大、教大、理工、科大、港大\n\n✅ **合資格簽賬**：本地/海外零售、網購、八達通自動增值、現金透支\n\n❌ **不計回贈**：網上銀行繳費、強積金、賭場籌碼、旅行支票、年費\n\n🎁 **迎新**：首3個月簽 $2,500 送 $300 回贈 / 20吋行李箱 / Hedgren背囊（三選一）\n\n⚠️ 13個月內取消卡需付 $600 行政費",
    promoEndDate: "2025-12-31",
    promoName: "Go-Goal 高達6%簽賬回贈",
  },

  // ========================================================================
  // 富邦銀行 Fubon Bank
  // ========================================================================
  {
    id: "fubon-titanium",
    name: "富邦 Titanium 卡",
    bank: "富邦銀行",
    hidden: true,
    style: { bgColor: "bg-gradient-to-br from-blue-800 to-indigo-900", textColor: "text-white" },
    // imageUrl from DB
    foreignCurrencyFee: 1.95,
    rules: [
      // T&C: 新台幣簽賬 20X 積分 = 8%，每月上限 80,000 額外積分，全年 240,000
      { description: "新台幣簽賬 8% (20X)", matchType: "base", percentage: 8.0, isForeignCurrency: true, cap: 80000, capType: "reward" },
      // T&C: 日圓/韓圜簽賬 10X 積分 = 4%，每月上限 80,000 額外積分
      { description: "日圓/韓圜簽賬 4% (10X)", matchType: "base", percentage: 4.0, isForeignCurrency: true, cap: 80000, capType: "reward" },
      // T&C: 非港幣簽賬 5X 積分 = 2%
      { description: "其他外幣簽賬 2% (5X)", matchType: "base", percentage: 2.0, isForeignCurrency: true },
      // T&C: 本地網上商戶 高達 10X 積分 = 4% (需登記)
      { description: "本地網上 4% [需登記]", matchType: "category", matchValue: "online", percentage: 4.0, cap: 6250, capType: "spending", excludeCategories: ["tax", "utilities", "insurance", "ewallet"] },
      // T&C: 星期六日滿$300 2X 積分 = 0.8%
      { description: "週六日滿$300 0.8% (2X)", matchType: "base", percentage: 0.8, validDays: [0, 6], minSpend: 300 },
      // T&C: 八達通自動增值 1X 積分 = 0.4%
      { description: "八達通自動增值 0.4%", matchType: "paymentMethod", matchValue: ["octopus"], percentage: 0.4 },
      // T&C: 本地簽賬 1X 積分 = 0.4%
      { description: "本地簽賬 0.4% (1X)", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"] },
    ],
    tags: ["台灣8%", "日韓4%", "網上4%", "八達通增值"],
    sellingPoints: ["🇹🇼 新台幣簽賬 8% (20X)", "🇯🇵🇰🇷 日韓簽賬 4% (10X)", "其他外幣 2%", "本地網上 4% [需登記]", "八達通自動增值 0.4%"],
    note: "⚠️ 台幣/日韓額外積分每月上限 80,000 (全年 240,000)。本地網上 4% 需致電 2566 8181 登記 (按1>7>2)，每月上限 50,000 積分 (即 $6,250 簽賬)。週六日滿 $300 享額外積分。✅ 八達通自動增值計 0.4% 積分！積分可兌換現金回贈或亞洲萬里通里數 (15分=1里)。不適用於：稅務、保險、水電費繳費、分期付款。",
    officialApplyUrl: "https://www.fubonbank.com.hk/tc/personal/credit-card/titanium-card.html",
  },
  {
    id: "amex-explorer",
    name: "Amex Explorer",
    bank: "American Express",
    cardNetwork: "amex",
    style: { bgColor: "bg-slate-800", textColor: "text-white" },
    // imageUrl from DB
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
      { description: "本地簽賬 $6/里", matchType: "base", percentage: 3.0, excludeCategories: ["tax", "utilities", "government", "insurance"] }, // 3 pts/$
    ],
    tags: ["里數", "旅遊保險", "天星小輪$1"],
    sellingPoints: ["積分無限期", "指定簽賬 HK$3.6/里", "免費旅遊保險及貴賓室 (年費豁免)", "⛴️天星小輪$1優惠"],
    officialApplyUrl: "https://www.americanexpress.com/hk/credit-cards/explorer-credit-card/",
    note: "⛴️ **天星小輪 $1 優惠**（至2025/12/31）：在閘機按「Amex $1」鍵再拍卡即可！適用中環/尖沙咀及灣仔/尖沙咀航線。\n\n⚠️ 部分商戶不接受美國運通。",
    hidden: true, // 暫時隱藏
  },
  {
    id: "amex-platinum",
    name: "美國運通白金卡",
    bank: "American Express",
    cardNetwork: "amex",
    style: { bgColor: "bg-gradient-to-br from-gray-300 via-gray-100 to-gray-300", textColor: "text-gray-900" },
    annualFee: 7800,
    minIncome: 600000,
    feeWaiverCondition: "無免年費優惠",
    foreignCurrencyFee: 2.0,
    rewardConfig: { method: 'conversion', ratio: 15, currency: 'Points' },
    rules: [
      // 每HK$5 = 1積分，15積分 = 1里，所以 $75 = 1里
      { description: "外幣簽賬 3X 積分", matchType: "base", percentage: 1.33, isForeignCurrency: true },
      { description: "本地簽賬 1X 積分", matchType: "base", percentage: 0.67, excludeCategories: ["tax", "utilities", "government", "insurance"] },
    ],
    tags: ["機場貴賓室", "旅遊保險", "禮賓服務", "天星小輪$1"],
    welcomeOfferText: "迎新高達240,000積分（16,000里）",
    officialApplyUrl: "https://www.americanexpress.com/hk/zh/credit-cards/platinum-card/",
    applyUrl: "https://www.americanexpress.com/hk/zh/credit-cards/platinum-card/",
    sellingPoints: ["無限次免費進入全球機場貴賓室", "免費旅遊保險", "24小時禮賓服務", "⛴️天星小輪$1優惠"],
    note: "💎 頂級信用卡，年費HK$7,800。主要優勢為機場貴賓室通行證、酒店升級、旅遊保險等。積分回贈率較低，適合經常旅遊及重視尊享服務的用戶。\n\n⛴️ **天星小輪 $1 優惠**（至2025/12/31）：在閘機按「Amex $1」鍵再拍卡即可！適用中環/尖沙咀及灣仔/尖沙咀航線。\n\n⚠️ 部分商戶不接受美國運通。",
  },
  {
    id: "amex-blue-cash",
    name: "Amex Blue Cash 信用卡",
    bank: "American Express",
    cardNetwork: "amex",
    style: { bgColor: "bg-gradient-to-br from-blue-600 to-blue-800", textColor: "text-white" },
    annualFee: 0,
    feeWaiverCondition: "永久免年費",
    foreignCurrencyFee: 2.0,
    rules: [
      // T&C: 本地超市及HKTVmall 2%，其他本地零售 1.2%
      { description: "超市/HKTVmall 2%", matchType: "merchant", matchValue: ["wellcome", "parknshop", "aeon", "hktvmall", "donki", "759", "yata", "citysuper"], percentage: 2.0 },
      { description: "本地零售 1.2%", matchType: "base", percentage: 1.2, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"] },
    ],
    tags: ["超市2%", "免年費", "天星小輪$1"],
    welcomeOfferText: "迎新簽$6,000送$500現金回贈",
    officialApplyUrl: "https://www.americanexpress.com/hk/zh/credit-cards/blue-cash-credit-card/",
    applyUrl: "https://www.americanexpress.com/hk/zh/credit-cards/blue-cash-credit-card/",
    sellingPoints: ["永久免年費", "超市/HKTVmall 2%", "本地零售 1.2%", "⛴️天星小輪$1優惠"],
    note: "💰 **永久免年費**的 Amex 現金回贈卡！超市及 HKTVmall 簽賬可享 2% 回贈，其他本地零售 1.2%。\n\n⛴️ **天星小輪 $1 優惠**（至2025/12/31）：在閘機按「Amex $1」鍵再拍卡即可！適用中環/尖沙咀及灣仔/尖沙咀航線。\n\n⚠️ 部分商戶不接受美國運通。",
  },
  {
    id: "mox-credit",
    name: "Mox Credit",
    bank: "Mox",
    style: { bgColor: "bg-gradient-to-br from-teal-400 to-cyan-600", textColor: "text-white" },
    // imageUrl from DB
    foreignCurrencyFee: 0,
    rules: [
      // T&C: 超市消費 3% 無上限 (商戶類別由 Mastercard 釐定)
      { description: "指定超市 3% (無上限)", matchType: "merchant", matchValue: ["wellcome", "parknshop", "aeon", "hktvmall", "donki", "759", "yata", "citysuper"], percentage: 3.0 },
      // T&C: 合資格結餘 ≥$250,000 或 出糧 ≥$25,000 享 2%；否則 1%
      // 以 1% 作為基本（因大部分用戶未必符合高存款條件）
      { description: "基本回饋 1% (無上限)", matchType: "base", percentage: 1.0 },
    ],
    tags: ["超市3%", "虛擬銀行", "無上限", "免外幣手續費"],
    sellingPoints: ["指定超市 3% 現金回贈 (無上限)", "所有簽賬 1-2% (無上限)", "免外幣手續費", "💡 存款$25萬或出糧$2.5萬可享 2%"],
    note: "⚠️ 高存款獎賞：合資格結餘 ≥$250,000 或 出糧 ≥$25,000 可享 2% 無上限！另有亞洲萬里通計劃：滿足條件可享 HKD4=1里。超市 3% 適用商戶類別由 Mastercard 釐定。",
    officialApplyUrl: "https://mox.com/zh/credit/",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=402&a=228&sub_id1=pickcardrebate&sub_id2=web",
  },
  {
    id: "sim-credit-card",
    name: "sim Credit Card",
    bank: "亞洲聯合財務",
    style: { bgColor: "bg-gradient-to-br from-purple-800 to-purple-950", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      // T&C: 網上零售簽賬 8% (單筆滿$500，需月簽非網上$1,000)
      { description: "網購 8% [單筆滿$500]", matchType: "category", matchValue: "online", percentage: 8.0, minSpend: 500, monthlyMinSpend: 1000, cap: 200, capType: "reward", excludeCategories: ["ewallet", "utilities", "insurance"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 指定本地公共交通工具 8% (城巴/九巴/龍運/港鐵/電車/天星小輪)
      { description: "交通 8% [巴士/港鐵/電車]", matchType: "category", matchValue: ["transport"], percentage: 8.0, monthlyMinSpend: 1000, cap: 200, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 指定商戶 3%
      { description: "指定商戶 3%", matchType: "merchant", matchValue: ["mcdonalds", "adidas"], percentage: 3.0, monthlyMinSpend: 1000, excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 基本回饋 0.4%，排除電子錢包、八達通增值、繳稅、保險
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
    ],
    tags: ["網購8%", "交通8%", "需月簽$1,000"],
    sellingPoints: ["網上簽賬 8% (單筆滿$500)", "交通 8% (巴士/港鐵/電車)", "每月回贈上限 $200"],
    note: "⚠️ 需每月累積非網上零售簽賬滿 $1,000 方可享 8% 回贈！網購需單筆滿 $500。每月回贈上限 $200。不適用於電子錢包（Alipay/WeChat Pay/PayMe）、八達通增值。港鐵只適用於拍卡出入閘（不包括機場快綫/輕鐵/港鐵巴士）。",
    officialApplyUrl: "https://www.uafl.com.hk/tc/sim-credit-card/",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=503&a=228&sub_id1=pickcardrebate&sub_id2=web",
  },
  {
    id: "sim-world-mastercard",
    name: "sim World Mastercard",
    bank: "亞洲聯合財務",
    style: { bgColor: "bg-gradient-to-br from-indigo-800 to-indigo-950", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      // T&C: 網上零售簽賬 8% (單筆滿$500，需月簽非網上$1,000)
      { description: "網購 8% [單筆滿$500]", matchType: "category", matchValue: "online", percentage: 8.0, minSpend: 500, monthlyMinSpend: 1000, cap: 200, capType: "reward", excludeCategories: ["ewallet", "utilities", "insurance"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 海外零售簽賬 8% (外幣簽賬，需月簽非網上$1,000)
      { description: "海外簽賬 8%", matchType: "base", percentage: 8.0, isForeignCurrency: true, monthlyMinSpend: 1000, cap: 200, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 指定商戶 3%
      { description: "指定商戶 3%", matchType: "merchant", matchValue: ["mcdonalds", "adidas"], percentage: 3.0, monthlyMinSpend: 1000, excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 基本回饋 0.4%，排除電子錢包、八達通增值、繳稅、保險
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
    ],
    tags: ["網購8%", "海外8%", "需月簽$1,000"],
    sellingPoints: ["網上簽賬 8% (單筆滿$500)", "海外簽賬 8%", "每月回贈上限 $200"],
    note: "⚠️ 需每月累積非網上零售簽賬滿 $1,000 方可享 8% 回贈！網購需單筆滿 $500。每月回贈上限 $200。不適用於電子錢包（Alipay/WeChat Pay/PayMe）、八達通增值。",
    officialApplyUrl: "https://www.uafl.com.hk/tc/sim-world-mastercard/",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=504&a=228&sub_id1=pickcardrebate&sub_id2=web",
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
      { description: "交通 15% [港鐵/巴士/渡輪/小巴/電車/的士,需登記]", matchType: "category", matchValue: ["transport"], percentage: 15.0, monthlyMinSpend: 4000, cap: 300, capType: "reward" },
      // T&C: 月簽$10,000 可額外獲 5% 隧道/泊車/電車充電回贈，合共上限$500
      { description: "隧道/泊車/電車充電 5% [月簽$10,000,需登記]", matchType: "category", matchValue: ["tunnel_fee", "parking"], percentage: 5.0, monthlyMinSpend: 10000, cap: 500, capType: "reward" },
      { description: "八達通自動增值 0.5%", matchType: "paymentMethod", matchValue: ["octopus"], percentage: 0.5 },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
    ],
    tags: ["八達通", "交通15%", "需登記"],
    welcomeOfferText: "迎新簽 $5,000 + 1次$500自動增值 送 $2,500 現金回贈 (首2個月內)",
    officialApplyUrl: "https://www.citibank.com.hk/zh-hk/credit-cards/citi-octopus-card.html",
    applyUrl: "https://www.citibank.com.hk/chinese/credit-cards/citi-octopus-card.html",
    sellingPoints: ["🔥 交通 15% 回贈 (限時至2026/3/31)", "內置八達通功能", "隧道/泊車 5% (月簽$10,000)"],
    note: "⚠️ 【限時推廣 2025/10/1-2026/3/31】交通 15% 回贈需登記 (citibank.hk/transreg)，月簽滿 $4,000 可獲 15% 車費回贈 (上限$300)；月簽滿 $10,000 可額外獲 5% 隧道/泊車/電車充電回贈 (合共上限$500)。合資格交通：港鐵、九巴、龍運、城巴、渡輪、綠色專線小巴、電車、的士。不適用於：FPS、繳稅、保費、電子錢包增值/轉賬、八達通自動增值（計算門檻）。",
    promoEndDate: "2026-03-31",
    promoName: "Citi 八達通卡交通 15% 回贈推廣",
  },
  {
    id: "ccb-travo",
    name: "建行(亞洲) TRAVO World Mastercard",
    bank: "建行(亞洲)",
    style: { bgColor: "bg-gradient-to-br from-sky-600 to-blue-800", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
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
    tags: ["海外10X", "餐飲5X", "1.95%手續費", "需登記", "指定商戶15%"],
    welcomeOfferText: "迎新 $600 現金回贈；或申請低息分期兼享 $800 現金回贈",
    officialApplyUrl: "https://www.asia.ccb.com/hongkong_tc/personal/credit_cards/ccb_unionpay_dual_currency_diamond_credit_card.html",
    applyUrl: "https://www.asia.ccb.com/hongkong/personal/credit-cards/travo-world-mastercard.html",
    sellingPoints: ["🔥 指定海外商戶 15% 回贈 [限時]", "海外簽賬 4% / $1.5/里 [需登記]", "本地餐飲 2% / $3/里 [需登記]", "⚠️ 外幣手續費 1.95%"],
    note: "⚠️ 【TRAVO Rewards 需登記】推廣期至 2025/12/31。海外簽賬 10X 積分 (4% 或 $1.5/里)，上限 400,000 額外積分；本地餐飲 5X 積分 (2% 或 $3/里)，上限 100,000 額外積分。基本 0.4%。\n\n🔥 【指定海外商戶 15% 回贈】推廣期 2025/7/1-12/31，分兩階段，每階段每商戶可享1次。包括：🇨🇳 支付寶/滴滴/Ole&blt；🇯🇵 BicCamera、JR EAST SUICA (Apple Pay)；🇰🇷 樂天/新羅/新世界免稅店；🇸🇬 樟宜新羅/TANGS；🇹🇭 King Power、Emporium、Paragon；🇬🇧 Bicester Village、Burberry、文華東方、Hertz；🇫🇷🇮🇹🇪🇸 歐洲 Outlet Village、Hertz 等。\n\n⚠️ 外幣簽賬手續費 1.95%，海外簽賬淨回贈約 2.05%。\n\n❌ 不計：電子錢包增值（微信/支付寶/PayMe）、八達通、保險、稅項、賭博。",
    promoEndDate: "2025-12-31",
    promoName: "TRAVO Rewards 海外/餐飲積分獎賞",
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
    tags: ["油站4%", "汽車", "易通行", "車主專享", "冬日狂賞"],
    sellingPoints: ["油站簽賬 4% 回贈", "汽車相關消費 4% (維修/泊車/充電)", "易通行隧道費 4%", "專為車主而設", "🔥 冬日狂賞：食肆額外5%、網購/旅遊/海外額外3%"],
    note: "🔥 **冬日狂賞**（2025/12/8 - 2026/2/28）：登記後本地食肆享額外5%、網上/旅遊/海外享額外3%現金回贈！每階段上限 $300，整個推廣期最高 $900。名額只限 8,000 人！[查看詳情及登記](/discover/dahsing-winter-promo)\n\n---\n\n⚠️ 汽車相關簽賬包括：易通行隧道費、購買汽車、時租泊車、洗車、汽車美容、汽車維修、汽車零件、汽車保養、拖車服務、電動汽車充電、油站消費。",
    officialApplyUrl: "https://www.dahsing.com/html/tc/credit_card/myauto/",
    promoEndDate: "2026-02-28",
    promoName: "冬日狂賞",
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
      { description: "百佳 92折 [2/12/22號]", matchType: "merchant", matchValue: ["parknshop"], percentage: 8.0, validDates: [2, 12, 22], isDiscount: true, minSpend: 100 },
      // 屈臣氏 92折日 (每月8/18/28日，需滿$400) - 折扣優惠，非回贈
      { description: "屈臣氏 92折 [8/18/28號]", matchType: "merchant", matchValue: ["watsons"], percentage: 8.0, validDates: [8, 18, 28], isDiscount: true, minSpend: 400 },
      // 豐澤 95折日 (1/5/8/12月的10日，需滿$2,000) - 折扣優惠，非回贈
      { description: "豐澤 95折 [每月10號]", matchType: "merchant", matchValue: ["fortress"], percentage: 5.0, validDates: [10], isDiscount: true, minSpend: 2000 },
      // VIP會員 6倍易賞錢 (2.4%) - 回贈，需綁定易賞錢App
      { description: "百佳/屈臣氏/豐澤 VIP 2.4%", matchType: "merchant", matchValue: ["parknshop", "watsons", "fortress"], percentage: 2.4 },
      // 最紅自主獎賞 (需登記) - 回贈
      { description: "最紅自主獎賞 2.4%", matchType: "category", matchValue: ["dining", "supermarket", "lifestyle", "home", "entertainment"], percentage: 2.4, cap: 25000, capType: "spending", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
    ],
    tags: ["易賞錢", "百佳", "屈臣氏", "折扣日"],
    feeWaiverCondition: "首兩年免年費",
    welcomeOfferText: "迎新送一年「易賞錢」VIP 會籍 (6倍積分) + 簽 $5,800 送 $600 獎賞錢",
    officialApplyUrl: "https://www.hsbc.com.hk/zh-hk/credit-cards/products/gold/",
    applyUrl: "https://www.hsbc.com.hk/zh-hk/credit-cards/products/easy/",
    sellingPoints: ["百佳 92折 (每月2/12/22號) [折扣]", "屈臣氏 92折 (每月8/18/28號) [折扣]", "VIP會員 6倍易賞錢 (2.4%)", "最紅自主獎賞 2.4%", "首兩年免年費"],
    note: "⚠️ 折扣優惠：百佳92折需滿$100 (2/12/22號)、屈臣氏92折需滿$400 (8/18/28號)、豐澤95折需滿$2,000。折扣是購物時直接減價，非事後回贈。迎新：發卡後首 30 日內綁定「易賞錢」App 可獲一年 VIP 會籍（百佳/屈臣氏/豐澤 6 倍積分）。開戶後 13 個月內取消卡或取消綁定將被取消 VIP 會籍。不適用於電子錢包（Alipay/WeChat Pay/PayMe）、八達通增值、繳稅、網上繳費。\n\n🔥 **最紅冬日賞萬寧**（至2026/2/28）：累積簽賬滿$1,000享高達10%回贈！[查看詳情](/discover/hsbc-mannings-winter-2025)\n\n🔥 **最紅冬日賞百老滙**（至2026/2/28）：累積簽賬滿$10,000享6%回贈！[查看詳情](/discover/hsbc-broadway-winter-2025)",
  },
  {
    id: "citi-hktvmall",
    name: "Citi HKTVmall 信用卡",
    bank: "Citi",
    hidden: true,
    style: { bgColor: "bg-gradient-to-br from-green-500 to-green-700", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      // HKTVmall 5% (需每月登記)
      { description: "HKTVmall 5%", matchType: "merchant", matchValue: ["hktvmall"], percentage: 5.0, cap: 300, capType: "reward" },
      // 指定日子 HKTVmall 額外優惠
      { description: "基本回饋 1%", matchType: "base", percentage: 1.0, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["octopus"] },
    ],
    tags: ["HKTVmall", "網購"],
    welcomeOfferText: "迎新簽 $5,000 送 $1,000 現金回贈 (首2個月內)",
    officialApplyUrl: "https://www.citibank.com.hk/zh-hk/credit-cards/citi-hktvmall-card.html",
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
      { description: "指定商戶 4%", matchType: "merchant", matchValue: ["csl", "1010", "now_tv", "netvigator", "hkt", "pccw"], percentage: 4.0, cap: 1500, capType: "reward", excludePaymentMethods: ["octopus"] },
      // T&C: Club Shopping 4% (1% 基本 + 1% 額外 + 2% The Club)，額外上限 500 Club積分 = $100
      { description: "Club Shopping 4%", matchType: "merchant", matchValue: ["club_shopping", "theclub"], percentage: 4.0, cap: 500, capType: "reward", excludePaymentMethods: ["octopus"] },
      // T&C: 基本 1% 無上限
      { description: "基本回饋 1%", matchType: "base", percentage: 1.0, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["octopus"] },
    ],
    tags: ["The Club", "Club積分", "csl/1010"],
    welcomeOfferText: "迎新簽 $5,000 送 5,000 Club積分 + $1,000 現金回贈 (首2個月內)",
    officialApplyUrl: "https://www.citibank.com.hk/zh-hk/credit-cards/citi-the-club-credit-card.html",
    applyUrl: "https://www.citibank.com.hk/chinese/credit-cards/citi-the-club-card.html",
    sellingPoints: ["指定商戶 4% Club積分 (csl/1010/Now TV等)", "Club Shopping 4%", "基本簽賬 1% 無上限", "csl/1010/Now TV/網上行自動轉賬高達 3%"],
    note: "⚠️ 指定商戶額外 3% 上限 1,500 Club積分 ($300)/月。Club Shopping 額外 1% 上限 500 Club積分 ($100)/月。5 Club積分 = $1。不適用於：FPS、八達通增值、繳稅、保費、Citi PayAll。",
  },
  {
    id: "fubon-yata",
    name: "富邦一田 Visa 白金卡",
    bank: "富邦銀行",
    style: { bgColor: "bg-gradient-to-br from-purple-600 to-purple-800", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    annualFee: 0,
    feeWaiverCondition: "永久免年費",
    rules: [
      // T&C: 服裝及家庭用品正價 9折 - 折扣優惠，非回贈
      { description: "一田服裝/家品正價 9折 [折扣]", matchType: "merchant", matchValue: ["yata"], percentage: 10.0, isDiscount: true },
      // T&C: 週一超市 95折 - 折扣優惠
      { description: "一田超市週一 95折 [折扣]", matchType: "merchant", matchValue: ["yata"], percentage: 5.0, isDiscount: true, validDays: [1] },
      // T&C: 月月多簽多賞 - 每月滿$2000送$50禮券 = 2.5%
      { description: "一田月滿$2000 送$50禮券 (2.5%)", matchType: "merchant", matchValue: ["yata"], percentage: 2.5, monthlyMinSpend: 2000 },
      // T&C: 一田信用卡積分 - $1=1分, 25000分=$100 = 0.4%
      { description: "一田積分 0.4%", matchType: "merchant", matchValue: ["yata"], percentage: 0.4 },
      // 其他簽賬基本回饋
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
    ],
    tags: ["一田", "百貨公司", "永久免年費", "9折"],
    welcomeOfferText: "迎新送一田購物禮券",
    officialApplyUrl: "https://www.fubonbank.com.hk/tc/personal/credit-card/yata-card.html",
    applyUrl: "https://www.fubonbank.com.hk/tc/cards/bonus-points-program/yata-credit-card.html",
    sellingPoints: ["一田服裝/家品正價 9折 [折扣]", "一田週一超市 95折 [折扣]", "月滿$2000送$50禮券 (2.5%)", "永久免年費"],
    note: "💡 一田三重獎賞：(1) 月月多簽多賞：每月一田滿 $2,000 送 $50 禮券 (2.5%)，截數日每月15日；(2) 累積結餘獎賞：半年滿 $5,000 送 $50 禮券 (1%)，截數日4月/10月15日；(3) 積分 0.4%。折扣優惠：服裝/家品正價9折、週一超市95折。⚠️ 不適用於儲值支付工具充值。積分有效期一年。",
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
    rewardConfig: { method: 'conversion', ratio: 250, currency: 'Points' }, // 25,000 分 = $100 (即 250 分 = $1, 0.4%)
    rules: [
      // T&C: 新台幣簽賬 20X 積分 = 8%，每月上限 80,000 額外積分 = $5,333 簽賬
      { description: "新台幣簽賬 8% (20X)", matchType: "base", percentage: 8.0, isForeignCurrency: true, cap: 5333, capType: "spending" },
      // T&C: 日圓/韓圜簽賬 10X 積分 = 4%，每月上限 80,000 額外積分 = $16,000 簽賬
      { description: "日圓/韓圜簽賬 4% (10X)", matchType: "base", percentage: 4.0, isForeignCurrency: true, cap: 16000, capType: "spending" },
      // T&C: 非港幣簽賬 5X 積分 = 2%
      { description: "其他外幣簽賬 2% (5X)", matchType: "base", percentage: 2.0, isForeignCurrency: true },
      // T&C: 本地網上商戶 高達 10X 積分 = 4% (需登記)，每月上限 50,000 積分 = $6,250 簽賬
      { description: "本地網上 4% [需登記]", matchType: "category", matchValue: "online", percentage: 4.0, cap: 6250, capType: "spending", excludeCategories: ["tax", "utilities", "insurance", "ewallet"] },
      // T&C: 星期六日滿$300 2X 積分 = 0.8%
      { description: "週六日滿$300 0.8% (2X)", matchType: "base", percentage: 0.8, validDays: [0, 6], minSpend: 300 },
      // T&C: 八達通自動增值 1X 積分 = 0.4%
      { description: "八達通自動增值 0.4%", matchType: "paymentMethod", matchValue: ["octopus"], percentage: 0.4 },
      // T&C: 本地簽賬 1X 積分 = 0.4%
      { description: "本地簽賬 0.4% (1X)", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"] },
    ],
    tags: ["台灣8%", "日韓4%", "網上4%", "八達通增值"],
    sellingPoints: ["🇹🇼 新台幣簽賬 8% (20X)", "🇯🇵🇰🇷 日韓簽賬 4% (10X)", "其他外幣 2%", "本地網上 4% [需登記]", "八達通自動增值 0.4%"],
    officialApplyUrl: "https://www.fubonbank.com.hk/tc/personal/credit-card/platinum-card.html",
    applyUrl: "https://www.fubonbank.com.hk/tc/cards/credit-card-products/platinum-card.html",
    note: "⚠️ 台幣額外積分每月上限 80,000 (即 $5,333 簽賬享 8%)。日韓每月上限 80,000 (即 $16,000 簽賬享 4%)。本地網上 4% 需致電 2566 8181 登記，每月上限 50,000 積分 ($6,250)。週六日滿 $300 享額外積分。✅ 八達通自動增值計 0.4% 積分！積分可兌換現金回贈 (250分=$1) 或亞洲萬里通里數 (15分=1里)。不適用於：稅務、保險、水電費繳費、分期付款。",
  },
  {
    id: "fubon-visa-infinite",
    name: "富邦 Visa Infinite 卡",
    bank: "富邦銀行",
    style: { bgColor: "bg-gradient-to-br from-slate-800 to-black", textColor: "text-yellow-400" },
    foreignCurrencyFee: 1.95,
    annualFee: 3600,
    feeWaiverCondition: "年簽滿 $180,000 免翌年年費",
    minIncome: 600000,
    rewardConfig: { method: 'conversion', ratio: 200, currency: 'Points' }, // 40,000 分 = $200 (即 200 分 = $1, 0.5%)
    rules: [
      // T&C: 新台幣簽賬 20X 積分 (5X基本+15X額外) = 10%，每月額外積分上限 120,000 (即 $8,000 簽賬)
      { description: "新台幣簽賬 10% (20X)", matchType: "base", percentage: 10.0, isForeignCurrency: true, cap: 8000, capType: "spending" },
      // T&C: 日圓/韓圜簽賬 10X 積分 (5X基本+5X額外) = 5%，每月額外積分上限 120,000 (即 $24,000 簽賬)
      { description: "日圓/韓圜簽賬 5% (10X)", matchType: "base", percentage: 5.0, isForeignCurrency: true, cap: 24000, capType: "spending" },
      // T&C: 非港幣簽賬 5X 積分 = 2.5%，無上限
      { description: "其他外幣簽賬 2.5% (5X)", matchType: "base", percentage: 2.5, isForeignCurrency: true },
      // T&C: 本地網上商戶 高達 10X 積分 (1X基本+8X額外+1X週末) = 5%，需登記，每月額外上限 80,000 積分 (即 $10,000 簽賬)
      { description: "本地網上 5% [需登記]", matchType: "category", matchValue: "online", percentage: 5.0, cap: 10000, capType: "spending", excludeCategories: ["tax", "utilities", "insurance", "ewallet"] },
      // T&C: 星期六日滿$300 2X 積分 = 1%
      { description: "週六日滿$300 1% (2X)", matchType: "base", percentage: 1.0, validDays: [0, 6], minSpend: 300 },
      // T&C: 八達通自動增值 1X 積分 = 0.5%
      { description: "八達通自動增值 0.5%", matchType: "paymentMethod", matchValue: ["octopus"], percentage: 0.5 },
      // T&C: 本地簽賬 1X 積分 = 0.5%
      { description: "本地簽賬 0.5% (1X)", matchType: "base", percentage: 0.5, excludeCategories: ["tax", "utilities", "government", "insurance"] },
    ],
    tags: ["台灣10%", "日韓5%", "網購5%", "高端卡", "八達通增值"],
    sellingPoints: ["🇹🇼 新台幣簽賬 10% (月上限$8,000)", "🇯🇵🇰🇷 日韓簽賬 5% (月上限$24,000)", "本地網上 5% [需登記]", "其他外幣 2.5%", "機場貴賓室4次"],
    officialApplyUrl: "https://www.fubonbank.com.hk/tc/personal/credit-card/visa-infinite-card.html",
    applyUrl: "https://www.fubonbank.com.hk/tc/cards/credit-card-products/visa-infinite-card.html",
    note: "💡 【推廣期 2025/1/1-12/31】🇹🇼 新台幣 10% (20X)，每月首 $8,000 簽賬享額外積分（全年上限 $32,000）。🇯🇵🇰🇷 日韓 5% (10X)，每月首 $24,000 簽賬享額外積分。本地網上 5% 需致電 2566 8181 登記 (按1>7>2)，每月上限 $10,000 簽賬。週六日滿 $300 享 2X。積分可兌換現金 (200分=$1) 或里數 (15分=1里，手續費$250-$500)。⚠️ 不適用於：稅務、保險、水電費繳費、分期付款。年費 $3,600，年薪要求 $600,000。",
    promoEndDate: "2025-12-31",
    promoName: "富邦 Visa Infinite 海外額外積分推廣",
  },
  {
    id: "fubon-incard",
    name: "富邦 iN VISA 白金卡",
    bank: "富邦銀行",
    style: { bgColor: "bg-gradient-to-br from-pink-500 to-purple-600", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      // T&C: 網上簽賬 20X 積分 = 8%，額外積分上限75,000/月 = 簽賬上限 $3,947
      { description: "網上簽賬 8% (20X) [上限$3,947]", matchType: "category", matchValue: "online", percentage: 8.0, cap: 3947, capType: "spending", excludeCategories: ["ewallet", "insurance", "tax"], excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
      // T&C: 流動支付及八達通自動增值也計積分
      { description: "流動支付 0.4%", matchType: "paymentMethod", matchValue: ["mobile", "apple_pay", "google_pay", "samsung_pay"], percentage: 0.4 },
      { description: "八達通自動增值 0.4%", matchType: "paymentMethod", matchValue: ["octopus"], percentage: 0.4 },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
    ],
    tags: ["網購8%", "年輕人", "無需登記"],
    welcomeOfferText: "迎新簽 $5,000 送 $150 現金回贈 (首3個月)",
    sellingPoints: ["網上簽賬 8% 回贈 (無需登記)", "每月簽賬上限 $3,947", "永久免年費", "流動支付/八達通增值計積分"],
    officialApplyUrl: "https://www.fubonbank.com.hk/tc/personal/credit-card/in-card.html",
    applyUrl: "https://www.fubonbank.com.hk/tc/cards/credit-card-products/incard.html",
    note: "💡 【推廣期 2025/4/28-12/31】網上簽賬 8% (1X基本+19X額外=20X積分) 無需登記！每月額外積分上限 75,000 (即每月首 $3,947 網上簽賬享 8%)。\n\n⚠️ **重要注意**：\n• 每月上限以**記賬日**計算（非交易日），月底簽賬可能跌落下月 quota\n• 海外商戶簽港幣有 **1% CBF 手續費**（如 App Store/Netflix/Spotify/Airbnb）\n• 積分有效期一年，250分=$1\n\n✅ 流動支付及八達通自動增值也計 0.4% 積分\n❌ 不計回贈：Alipay/WeChat Pay/PayMe 充值、保險、稅務\n\n🎁 **迎新**：首3個月簽 $5,000 送 $150 現金回贈，配合8%網購可額外賺 $400！14個月內取消扣回迎新。",
    promoEndDate: "2025-12-31",
    promoName: "富邦 iN VISA 網上簽賬 8% 推廣",
  },
  {
    id: "cncbi-gba",
    name: "信銀國際大灣區雙幣信用卡",
    bank: "信銀國際",
    style: { bgColor: "bg-gradient-to-br from-red-600 to-red-800", textColor: "text-white" },
    foreignCurrencyFee: 0,
    rules: [
      // T&C: 人民幣簽賬/雲閃付App 4% (每月上限$150)
      { description: "人民幣/雲閃付 4% [上限$150]", matchType: "base", percentage: 4.0, isForeignCurrency: true, cap: 150, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 單筆滿CNY4,000 額外6% (每月上限$250)
      { description: "單筆滿¥4k 額外6% [上限$250]", matchType: "base", percentage: 6.0, isForeignCurrency: true, minSpend: 4000, cap: 250, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 本地簽賬 0.4%，排除繳稅、網上繳費、八達通增值、電子錢包
      { description: "本地簽賬 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["octopus", "alipay", "wechat_pay", "payme"] },
    ],
    tags: ["大灣區", "北上", "免手續費", "人民幣10%"],
    sellingPoints: ["人民幣/雲閃付 4% (月上限$150)", "單筆滿¥4,000 高達10%", "免外幣手續費"],
    officialApplyUrl: "https://www.cncbinternational.com/personal/credit-card/gba/tc/index.html",
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
      { description: "AlipayHK 跨境/北上 2%", matchType: "paymentMethod", matchValue: ["alipay"], percentage: 2.0, isForeignCurrency: true },
      // 實體卡/電子錢包簽賬: 10個 A. Point/$1 = 1%
      { description: "實體卡/電子錢包 1%", matchType: "base", percentage: 1.0, excludeCategories: ["tax", "utilities", "government", "insurance"] },
      // AlipayHK 本地合資格簽賬: 2個 A. Point/$1 = 0.2%
      { description: "AlipayHK 本地 0.2%", matchType: "paymentMethod", matchValue: ["alipay"], percentage: 0.2 },
    ],
    tags: ["AlipayHK", "北上2%", "淘寶免手續費", "繳稅優惠"],
    sellingPoints: ["AlipayHK 北上/跨境 2% (20 A. Point/$1)", "實體卡簽賬 1% (10 A. Point/$1)", "淘寶首5筆免手續費", "🔥繳稅優惠高達$2,300"],
    officialApplyUrl: "https://www.sc.com/hk/zh/credit-cards/asiamiles/",
    applyUrl: "https://www.sc.com/hk/zh/credit-cards/apointcard/",
    note: "⚠️ 需連結 AlipayHK 使用！北上/跨境消費透過 AlipayHK 可享 2%。實體卡簽賬 1%。AlipayHK 本地消費只有 0.2%。淘寶每月首5筆免手續費。\n\n🔥 **繳稅優惠**（2025/11/18-2026/2/2）：\n- 需透過 SC Mobile App 登記\n- 交稅 $2萬-$5萬：$50-$150 / 交稅 $5萬-$10萬：$100-$300\n- 交稅 $10萬-$25萬：$150-$500 / 交稅 $25萬+：$500-$1,500\n- 分期額外獎賞：$200-$500（早鳥12/31前再加$100-$300）\n- 合共高達 $2,300 現金回贈！[查看詳情](/discover/sc-tax-payment-2025)",
    promoEndDate: "2026-02-02",
    promoName: "渣打交稅及分期優惠",
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
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
    ],
    tags: ["淘寶", "網購", "免外幣手續費"],
    welcomeOfferText: "迎新手機簽賬 10% 回贈 (上限$300)",
    sellingPoints: ["淘寶/天貓簽賬 4% 回贈", "0% 淘寶手續費", "0% 海外簽賬手續費", "專為淘寶用戶而設"],
    officialApplyUrl: "https://www.bochk.com/tc/creditcard/products/taobao.html",
    applyUrl: "https://www.bochk.com/tc/creditcard/products/taobao.html",
    note: "💡 透過手機淘寶 App 或 AlipayHK 付款免淘寶手續費！海外簽賬免 1.95% 手續費（推廣期至 2025年12月31日）。⚠️ 積分不適用於 Alipay/WeChat Pay/PayMe 簽賬。迎新：手機簽賬 10% 回贈，上限 $300。",
  },
  {
    id: "hangseng-muji",
    name: "恒生 MUJI Card",
    bank: "恒生銀行",
    hidden: true,
    style: { bgColor: "bg-gradient-to-br from-stone-600 to-stone-800", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "MUJI 5%", matchType: "merchant", matchValue: ["muji"], percentage: 5.0 },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"] },
    ],
    tags: ["MUJI", "生活品味"],
    sellingPoints: ["MUJI 簽賬 5% 回贈", "MUJI 專屬優惠", "無印良品愛好者必備"],
    officialApplyUrl: "https://www.hangseng.com/zh-hk/personal/cards/products/muji-card/",
    applyUrl: "https://www.hangseng.com/zh-hk/personal/cards/products/co-branded/muji-card/",
  },
  {
    id: "hangseng-platinum",
    name: "恒生白金卡",
    bank: "恒生銀行",
    hidden: true,
    style: { bgColor: "bg-gradient-to-br from-gray-500 to-gray-700", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"] },
    ],
    tags: ["基本卡"],
    sellingPoints: ["基本回贈", "入門信用卡"],
    officialApplyUrl: "https://www.hangseng.com/zh-hk/personal/cards/products/visa-platinum-card/",
    applyUrl: "https://www.hangseng.com/zh-hk/personal/cards/products/platinum-card/",
  },
];
