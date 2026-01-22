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
    rewardTimeline: "獎賞錢於月結單入賬",
    foreignCurrencyFee: 1.95,
    annualFee: 2000,
    minIncome: 240000,
    feeWaiverCondition: "首兩年免年費",
    rewardConfig: { method: 'conversion', ratio: 10, currency: 'RC' }, // $10 = $1 RC = 0.4%
    rules: [
      // ========== 最紅自主獎賞（需登記，每年簽賬上限 $100,000，五選一共用）==========
      // Visa Signature 專享：9X = 5X額外 + 1X基本 + 3X VS專享 = 3.6%
      // 五大類別（非自選）：1.6% = 0.4%基本 + 1.2% VS專享
      // 可自由分配 5X 到一個自選類別（賞滋味/賞購物/賞家居/賞享受/賞世界）
      // ⚠️ 五個類別共用 $100,000/年上限，只能選一類享 9X
      { description: "最紅自主獎賞 9X (3.6%) [需登記,五選一]", matchType: "category", matchValue: ["dining", "supermarket", "lifestyle", "home", "entertainment"], percentage: 3.6, cap: 100000, capType: "spending", capPeriod: "yearly", shareCapWith: "hsbc_vs_red_hot", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // 賞世界 - 海外實體店簽賬 (非港幣交易) - 與上述共用上限
      { description: "賞世界 9X (3.6%) [需登記,五選一]", matchType: "base", percentage: 3.6, isForeignCurrency: true, cap: 100000, capType: "spending", capPeriod: "yearly", shareCapWith: "hsbc_vs_red_hot", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // ========== Travel Guru 會員計劃（優惠推廣期至 2026/12/31）==========
      // 只限海外實體店外幣簽賬，需透過 Reward+ App 登記
      // GO級：+3%（連續3個月累積≥$8,000，上限$500/年）
      // GING級：+4%（累積≥$30,000 + 3次預訂≥$800，上限$1,200/年）
      // GURU級：+6%（累積≥$70,000 + 6次預訂≥$800，上限$2,200/年）
      // ========== 其他 ==========
      // 八達通自動增值 0.4%
      { description: "八達通自動增值 0.4%", matchType: "paymentMethod", matchValue: ["octopus"], percentage: 0.4 },
      // 基本回饋 0.4%
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
    ],
    tags: ["餐飲神卡", "最紅自主獎賞", "9X積分", "需登記", "八達通增值", "Travel Guru"],
    imageUrl: "https://pickcardrebate-supabase-kong.zeabur.app/storage/v1/object/public/images/cards/1764329466898-zu95i1newy.png",
    welcomeOfferText: "迎新簽 $8,000 送 $800 獎賞錢 (16,000里) / 現有客戶 $200 (4,000里) (網上申請)",
    officialApplyUrl: "https://www.hsbc.com.hk/zh-hk/credit-cards/products/visa-signature/",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=255&a=228&sub_id1=pickcardrebate&sub_id2=web",
    sellingPoints: ["最紅自主獎賞 9X (3.6%)", "五大類別 1.6%（0.4% + VS專享1.2%）", "🌍 Travel Guru 海外實體店可達 6.6%~9.6%", "每年首 $100,000 簽賬享額外獎賞"],
    note: "## 📌 最紅自主獎賞（需登記）\n\n**Visa Signature 專享**：9X = 5X額外 + 1X基本 + 3X VS專享 = **3.6%**\n\n| 類別 | 自選類別 | 非自選類別 |\n|:---|:---:|:---:|\n| 賞滋味 | **3.6%** | 1.6% |\n| 賞購物 | **3.6%** | 1.6% |\n| 賞家居 | **3.6%** | 1.6% |\n| 賞享受 | **3.6%** | 1.6% |\n| 賞世界 | **3.6%** | 1.6% |\n\n- 每年簽賬上限 **$100,000**\n- 需於 Reward+ App 登記\n\n📌 **賞滋味**：酒席宴會、私人宴會、包場派對、酒店/百貨公司/俱樂部內飲食專櫃除外\n📌 **賞世界**：只限海外外幣簽賬（香港/港幣簽賬除外）\n\n---\n\n## 🌍 Travel Guru 會員計劃（至 2026/12/31）\n\n**只限海外實體店外幣簽賬，需透過 Reward+ App 登記**\n\n| 會籍等級 | 額外回贈 | 升級條件 | 回贈上限 |\n|:---|:---:|:---|:---:|\n| GO級旅人 | +3% | 連續3個月累積簽≥$8,000 | $500/年 |\n| GING級旅人 | +4% | 累積≥$30,000 + 3次預訂≥$800 | $1,200/年 |\n| GURU級旅人 | +6% | 累積≥$70,000 + 6次預訂≥$800 | $2,200/年 |\n\n**配合最紅自主獎賞「賞世界」3.6%**：\n- GO級：3.6% + 3% = **6.6%**\n- GING級：3.6% + 4% = **7.6%**\n- GURU級：3.6% + 6% = **9.6%**\n\n⚠️ **Travel Guru 不計**：網購、電子錢包、八達通增值、繳費、繳稅\n\n---\n\n## 🎁 迎新優惠（至 2026/2/28）\n\n| 客戶類型 | 簽賬要求 | 獎賞 |\n|:---|:---:|:---|\n| 新客（網上申請） | 60日內簽$8,000 | **$800 獎賞錢** |\n| 新客（櫃檯申請） | 60日內簽$8,000 | $600 獎賞錢 |\n| 現有客戶 | 60日內簽$8,000 | $200 獎賞錢 |\n\n⚠️ 不計迎新：電子錢包、八達通增值、繳費、繳稅\n\n---\n\n## 💡 附屬卡大法\n\n幫無滙豐卡的親友開附屬卡，可以揀不同自選類別，各享 3.6%！\n\n---\n\n## ⚠️ 注意事項\n\n- 海外簽賬手續費：**1.95%**\n- 海外商戶簽港幣（CBF）：**1%**\n- E-banking繳費：0.4%（每月首$10,000）\n- E-banking交稅：無回贈\n- 基本回贈：0.4%\n- ❌ PayMe/支付寶/微信支付：無回贈\n\n📅 **2026年1月7日更新**",
    promoEndDate: "2026-12-31",
    promoName: "Travel Guru 會員計劃",
    featuredMerchants: [
      { name: "英皇戲院", rate: "買4送4", category: "戲院折扣" },
      { name: "麗新餐飲", rate: "85折", category: "餐飲折扣" },
      { name: "胡同", rate: "85折", category: "餐飲折扣" },
      { name: "名人坊", rate: "85折", category: "餐飲折扣" },
      { name: "AQUA", rate: "85折", category: "餐飲折扣" },
      { name: "和牛懷石 殿", rate: "85折", category: "餐飲折扣" },
    ],
  },
  {
    id: "hsbc-red",
    name: "HSBC Red Credit Card",
    bank: "HSBC",
    style: { bgColor: "bg-gradient-to-br from-red-500 via-red-600 to-pink-700", textColor: "text-white" },
    // imageUrl from DB
    rewardTimeline: "獎賞錢於月結單入賬",
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
    tags: ["網購神卡", "永久免年費", "指定商戶8%", "麥當勞印花"],
    annualFee: 0,
    feeWaiverCondition: "永久免年費",
    welcomeOfferText: "迎新簽 $3,000 送 $300 獎賞錢 (首60日)",
    officialApplyUrl: "https://www.hsbc.com.hk/zh-hk/credit-cards/products/red/",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=896&a=228&sub_id1=pickcardrebate&sub_id2=web",
    sellingPoints: ["🍔麥當勞印花高達16.5% [全年]", "指定商戶 8% (壽司郎/譚仔/GU等)", "網上簽賬 4% (每月首$10,000)", "永久免年費"],
    featuredMerchants: [
      { name: "壽司郎", rate: "8%", category: "餐飲" },
      { name: "譚仔三哥", rate: "8%", category: "餐飲" },
      { name: "GU", rate: "8%", category: "服飾" },
      { name: "Decathlon", rate: "8%", category: "運動" },
      { name: "lululemon", rate: "8%", category: "服飾" },
      { name: "麥當勞", rate: "16.5%", category: "餐飲" },
    ],
    exclusions: ["網上繳費", "電子錢包簽賬", "保費", "證券", "租金", "廣告"],
    note: "🍔 **麥當勞印花獎賞 2026**（全年）：\n- 簽賬滿 $30 = 1 個印花（每日限1個）\n- 同月儲齊 4 個印花 = $15 獎賞錢\n- 每月上限 8 印花 = $30，全年上限 $360\n- 用麥當勞 App 可疊加 4% 網上回贈，最高 **16.5%**！\n- ⚠️ 只限主卡，附屬卡不適用\n\n👉 [查看麥當勞印花詳情](/discover/hsbc-red-mcdonalds-2026)\n\n---\n\n⚠️ 【推廣期 2025/9/1-2026/3/31】指定商戶 8%：🍽️ 壽司郎/譚仔三哥/譚仔雲南/The Coffee Academïcs；👕 GU/Decathlon/lululemon；🎮 NAMCO/TAITO STATION（只限香港分店，百貨公司專櫃除外）。每月上限 $100 獎賞錢（首 $1,250）。網上簽賬 4% 每月上限 $400（首 $10,000）。網上不計：網上繳費、電子錢包簽賬、保費、證券、租金、廣告、八達通增值。實體超市只有 0.4%！\n\n🔥 **最紅冬日賞萬寧**（至2026/2/28）：週末高達10%回贈！[查看詳情](/discover/hsbc-mannings-winter-2025)\n\n🔥 **最紅冬日賞百老滙**（至2026/2/28）：累積簽賬滿$10,000享6%回贈！[查看詳情](/discover/hsbc-broadway-winter-2025)",
    promoEndDate: "2026-12-31",
    promoName: "麥當勞印花獎賞",
  },
  {
    id: "hsbc-everymile",
    name: "HSBC EveryMile",
    bank: "HSBC",
    style: { bgColor: "bg-gradient-to-br from-stone-700 to-stone-900", textColor: "text-white" },
    rewardTimeline: "獎賞錢於月結單入賬",
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
    featuredMerchants: [
      { name: "Starbucks", rate: "$2/里", category: "咖啡店" },
      { name: "Pacific Coffee", rate: "$2/里", category: "咖啡店" },
      { name: "Lady M", rate: "$2/里", category: "咖啡店" },
    ],
    exclusions: ["電子錢包（Alipay/WeChat Pay/PayMe）", "繳稅"],
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
    rewardTimeline: "獎賞錢於月結單入賬",
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
      // T&C: 最紅自主獎賞 6X = 5X額外 + 1X基本 = 2.4%（五選一共用上限）
      { description: "最紅自主獎賞 6X (2.4%) [需登記,五選一]", matchType: "category", matchValue: ["dining", "supermarket", "lifestyle", "home", "entertainment"], percentage: 2.4, cap: 100000, capType: "spending", capPeriod: "yearly", shareCapWith: "hsbc_pulse_red_hot", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      { description: "賞世界 6X (2.4%) [需登記,五選一]", matchType: "base", percentage: 2.4, isForeignCurrency: true, cap: 100000, capType: "spending", capPeriod: "yearly", shareCapWith: "hsbc_pulse_red_hot", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 基本回饋 0.4%，排除電子錢包、繳稅、繳費、PayMe增值
      { description: "基本回饋 0.4% ($25/里)", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
    ],
    tags: ["北上消費", "銀聯", "免手續費", "內地4.4%", "百老滙8%", "最紅自主獎賞"],
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
    rewardTimeline: "獎賞錢於月結單入賬",
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
      // T&C: 最紅自主獎賞 6X = 5X額外 + 1X基本 = 2.4%（五選一共用上限）
      { description: "最紅自主獎賞 6X (2.4%) [需登記,五選一]", matchType: "category", matchValue: ["dining", "supermarket", "lifestyle", "home", "entertainment"], percentage: 2.4, cap: 100000, capType: "spending", capPeriod: "yearly", shareCapWith: "hsbc_premier_red_hot", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      { description: "賞世界 6X (2.4%) [需登記,五選一]", matchType: "base", percentage: 2.4, isForeignCurrency: true, cap: 100000, capType: "spending", capPeriod: "yearly", shareCapWith: "hsbc_premier_red_hot", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 基本回饋 0.4%，排除電子錢包、繳稅、繳費
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
    ],
    tags: ["卓越理財", "旅遊", "百老滙6%", "最紅自主獎賞"],
    sellingPoints: ["卓越理財客戶專享", "最紅自主獎賞 6X (2.4%)", "指定類別額外獎賞錢"],
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
    rewardTimeline: "獎賞錢於月結單入賬",
    foreignCurrencyFee: 1.95,
    annualFee: 0,
    rewardConfig: { method: 'conversion', ratio: 10, currency: 'RC' },
    rules: [
      // T&C: 網上繳付指定學院學費 2.4% 額外獎賞錢 (每階段上限$200，全期$400)
      { description: "指定學院學費 2.4% [網上繳費]", matchType: "category", matchValue: ["education"], percentage: 2.4, cap: 200, capType: "reward" },
      // T&C: 最紅自主獎賞 6X = 5X額外 + 1X基本 = 2.4%（五選一共用上限，學生卡上限較低）
      { description: "最紅自主獎賞 6X (2.4%) [需登記,五選一]", matchType: "category", matchValue: ["dining", "supermarket", "lifestyle", "home", "entertainment"], percentage: 2.4, cap: 25000, capType: "spending", capPeriod: "yearly", shareCapWith: "hsbc_student_red_hot", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      { description: "賞世界 6X (2.4%) [需登記,五選一]", matchType: "base", percentage: 2.4, isForeignCurrency: true, cap: 25000, capType: "spending", capPeriod: "yearly", shareCapWith: "hsbc_student_red_hot", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 基本回饋 0.4%
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
    ],
    tags: ["學生卡", "交學費2.4%", "永久免年費", "最紅自主獎賞"],
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
    tags: ["特約商戶5%", "永久免年費", "免外幣手續費", "八達通增值", "免現金透支費", "繳稅優惠", "MoneyHero獨家"],
    feeWaiverCondition: "永久免年費",
    welcomeOfferText: "首月簽滿$3,500送$800現金回贈",
    officialApplyUrl: "https://www.sc.com/hk/zh/credit-cards/smart-card/",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=176&a=228&sub_id1=pickcardrebate&sub_id2=web&promo_id=sc-smart-moneyhero-20260130",
    sellingPoints: ["特約商戶 5% (百佳/屈臣氏/759/Klook/Netflix等)", "基本回贈 0.56%-1.2% (視乎月簽)", "永久免年費", "🔥繳稅優惠高達$2,300"],
    featuredMerchants: [
      { name: "百佳", rate: "5%", category: "超市" },
      { name: "屈臣氏", rate: "5%", category: "健康" },
      { name: "759阿信屋", rate: "5%", category: "超市" },
      { name: "Klook", rate: "5%", category: "旅遊" },
      { name: "Netflix", rate: "5%", category: "串流" },
      { name: "Disney+", rate: "5%", category: "串流" },
    ],
    exclusions: ["八達通錢包增值", "支付寶/微信支付/PayMe增值", "FPS", "保費", "繳費", "繳稅（日常）", "賭博"],
    note: "## 🔥 MoneyHero 限時獨家優惠（無需簽賬！）\n**優惠期：2026年1月19日下午6時至1月30日下午6時**\n\n### 🎁 獨家禮品（6選1）\n| 禮品 | 價值 |\n|:---|:---:|\n| Delsey 30\" GRENELLE SE 行李箱 | **$4,980** |\n| NESCAFÉ® Dolce Gusto® 咖啡機+6盒膠囊 | **$1,780** |\n| Marshall Emberton II 藍牙喇叭 | **$1,499** |\n| HK$800 Apple Store 禮品卡 | $800 |\n| HK$800 惠康購物現金券 | $800 |\n| HK$800 HKTVmall電子購物禮券 | $800 |\n\n### 📋 申請條件\n1. ✅ 全新渣打信用卡客戶\n2. ✅ 收到獎賞換領表格後 **7日內** 填妥及遞交\n3. ✅ 2026年2月28日或之前成功獲批\n4. ✅ 批卡後 **7日內** 填寫表格及上傳批核證明\n\n---\n\n## 📌 銀行迎新優惠（至 2026/4/15）\n發卡後首 **1個月** 內簽滿 **$3,500**：\n- **$800 現金回贈**\n\n---\n\n## 💳 回贈率（階梯制）\n| 月簽金額 | 回贈率 |\n|:---|:---:|\n| < $4,000 | **0%** ⚠️ |\n| $4,000-$14,999 | 0.56% |\n| $15,000+ | 1.2% |\n| 特約商戶 | **5%** |\n\n✅ 永久免年費 + 免外幣手續費！\n\n📅 **2026年1月22日更新**",
    promoEndDate: "2026-01-30",
    promoName: "MoneyHero限時獨家優惠",
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
    tags: ["儲里數", "國泰", "出糧優惠", "八達通增值", "繳稅優惠", "會籍積分", "MoneyHero獨家"],
    feeWaiverCondition: "首年免年費；優先理財($100萬+)/Premium理財($20萬+)/出糧客戶免年費",
    welcomeOfferText: "迎新簽$5,000即送10,000里 ($0.5/里)",
    sellingPoints: ["食肆/酒店/海外簽賬 HK$4/里", "八達通增值計里數", "🔥 迎新簽$5,000即送10,000里 ($0.5/里)", "🔥 繳稅高達23,000里 (2025/11-2026/2)"],
    note: "## 🔥 MoneyHero 限時獨家優惠\n**優惠期：2026年1月19日下午6時至1月30日下午6時**\n\n### 🎁 獨家禮品（6選1）\n| 禮品 | 價值 |\n|:---|:---:|\n| Dyson Zone™ 降噪耳機 | **$5,980** |\n| Delsey 30\" GRENELLE SE 行李箱 | **$4,980** |\n| Marshall Emberton II 防水藍牙喇叭 | **$1,499** |\n| HK$900 Apple Store 禮品卡 | $900 |\n| HK$900 惠康購物現金券 | $900 |\n| HK$900 HKTVmall電子購物禮券 | $900 |\n\n### 📋 申請條件\n1. ✅ 全新渣打信用卡客戶\n2. ✅ 收到獎賞換領表格後7日內填妥及遞交\n3. ✅ 2026年2月28日或之前成功獲批\n4. ✅ 批卡後7日內填寫表格並上傳批核證明\n\n---\n\n## 📌 渣打迎新優惠\n發卡後首 **2 個月**內簽賬（階梯制）：\n- 簽 $5,000 送 **10,000里** ($0.5/里 🔥)\n- 簽 $40,000 送 **20,000里** ($2/里)\n- 簽 $110,000 送 **40,000里** ($2.75/里)\n\n---\n\n⚠️ 基本比率 $6/里。【指定類別 $4/里】食肆、酒店、海外。\n✅ 八達通自動增值計里數！\n\n📅 **2026年1月22日更新**",
    officialApplyUrl: "https://www.sc.com/hk/zh/credit-cards/cathay/",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=177&a=228&sub_id1=pickcardrebate&sub_id2=web",
    promoEndDate: "2026-01-30",
    promoName: "MoneyHero限時獨家優惠",
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
    tags: ["現金回贈", "無腦刷", "外幣2%", "八達通1.5%", "繳稅優惠", "MoneyHero獨家"],
    welcomeOfferText: "迎新送高達$1,200現金回贈",
    officialApplyUrl: "https://www.sc.com/hk/zh/credit-cards/simply-cash-visa/",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=176&a=228&sub_id1=pickcardrebate&sub_id2=web&promo_id=sc-simplycash-moneyhero-20260130",
    sellingPoints: ["港幣簽賬 1.5% 現金回贈", "外幣簽賬 2%", "無最低簽賬要求", "🔥繳稅優惠高達$2,300"],
    featuredMerchants: [
      { name: "海外消費", rate: "2%", category: "旅遊" },
      { name: "八達通增值", rate: "1.5%", category: "增值" },
    ],
    exclusions: ["八達通自動增值", "支付寶/微信支付/PayMe增值", "FPS", "保費", "繳費", "繳稅"],
    note: "## 🔥 MoneyHero 限時獨家優惠（無需簽賬！）\n**優惠期：2026年1月19日下午6時至1月30日下午6時**\n\n### 🎁 獨家禮品（6選1）\n| 禮品 | 價值 |\n|:---|:---:|\n| Delsey 30\" GRENELLE SE 行李箱 | **$4,980** |\n| NESCAFÉ® Dolce Gusto® 咖啡機+6盒膠囊 | **$1,780** |\n| Marshall Emberton II 藍牙喇叭 | **$1,499** |\n| HK$800 Apple Store 禮品卡 | $800 |\n| HK$800 惠康購物現金券 | $800 |\n| HK$800 HKTVmall電子購物禮券 | $800 |\n\n### 📋 申請條件\n1. ✅ 全新渣打信用卡客戶\n2. ✅ 收到獎賞換領表格後 **7日內** 填妥及遞交\n3. ✅ 2026年2月28日或之前成功獲批\n4. ✅ 批卡後 **7日內** 填寫表格及上傳批核證明\n\n---\n\n## 💳 回贈率\n| 類別 | 回贈率 |\n|:---|:---:|\n| 外幣簽賬 | **2%** |\n| 港幣簽賬 | 1.5% |\n| 八達通增值 | 1.5% |\n\n✅ 無最低簽賬要求！\n\n---\n\n🔥 **繳稅優惠**（至2026/2/2）：[查看詳情](/discover/sc-tax-payment-2025)\n\n📅 **2026年1月22日更新**",
    promoEndDate: "2026-01-30",
    promoName: "MoneyHero限時獨家優惠",
  },

  // ========================================================================
  // BOC 中銀香港
  // ========================================================================
  {
    id: "boc-chill",
    name: "BOC Chill World Mastercard",
    bank: "BOC",
    style: { bgColor: "bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500", textColor: "text-white" },
    // imageUrl from DB
    rewardTimeline: "現金回贈（結算後3個月內入賬）",
    annualFee: 600,
    minIncome: 300000,
    feeWaiverCondition: "首年免年費，持有中銀戶口自動豁免",
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 250, currency: 'Points' }, // $1=1分, 25,000分=$100 = 0.4%
    rules: [
      // ========== Chill 商戶 10%（需月簽實體店 $1,500）==========
      // T&C: 需每月於實體店簽滿 $1,500，額外 9.6% + 基本 0.4% = 10%
      // 商戶：McDonald's、Pacific Coffee、Starbucks、UNIQLO、GU、IKEA、Dyson、Samsung、Sony、LOG-ON
      // 影視娛樂：全港戲院、Apple TV/Music、App Store、Disney+、Google Play、JOOX、KK Box、MOOV、Netflix、Nintendo、PlayStation、Spotify、YouTube
      { description: "Chill 商戶 10% [需月簽實體店$1,500]", matchType: "merchant", matchValue: ["mcdonalds", "pacific_coffee", "starbucks", "uniqlo", "gu", "ikea", "dyson", "samsung", "sony", "log_on", "cinema", "apple_tv", "apple_music", "app_store", "disney_plus", "google_play", "joox", "kkbox", "moov", "netflix", "nintendo", "playstation", "spotify", "youtube"], percentage: 10.0, monthlyMinSpend: 1500, isPhysicalStore: true, cap: 150, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "bocpay"] },
      // ========== 海外及網上簽賬 5%（無簽賬要求）==========
      // T&C: 額外 4.6% + 基本 0.4% = 5%，無簽賬門檻
      // 額外回贈上限 $150（與 Chill 商戶合併計算）
      { description: "網上簽賬 5% [無門檻]", matchType: "category", matchValue: ["online"], percentage: 5.0, cap: 150, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "bocpay"], excludeCategories: ["ewallet", "insurance", "utilities", "tax", "government"] },
      { description: "海外簽賬 5% [無門檻]", matchType: "base", percentage: 5.0, isForeignCurrency: true, cap: 150, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "bocpay"] },
      // ========== 八達通自動增值 0.4% ==========
      { description: "八達通自動增值 0.4%", matchType: "paymentMethod", matchValue: ["octopus"], percentage: 0.4 },
      // ========== 基本回贈 0.4% ==========
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "bocpay"] },
    ],
    tags: ["Chill商戶10%", "網購5%", "海外5%", "無簽賬門檻", "MoneyHero獨家"],
    welcomeOfferText: "送$300 Apple禮品卡",
    sellingPoints: ["🔥 網上/海外 5% (無門檻，月簽上限$3,260)", "Chill 商戶 10% (月簽上限$1,562)", "額外回贈上限 $150/月", "CBF 手續費僅 0.95%"],
    featuredMerchants: [
      { name: "McDonald's", rate: "10%", category: "餐飲" },
      { name: "Starbucks", rate: "10%", category: "餐飲" },
      { name: "UNIQLO", rate: "10%", category: "服飾" },
      { name: "IKEA", rate: "10%", category: "家品" },
      { name: "Netflix", rate: "10%", category: "娛樂" },
      { name: "Spotify", rate: "10%", category: "娛樂" },
    ],
    exclusions: ["BoC Pay+", "AlipayHK", "WeChat Pay HK", "八達通增值（額外回贈）", "網上繳費", "保險"],
    note: "## 📌 中銀 Chill World Mastercard\n**推廣期：至 2026/6/30**\n\n### 🌐 網上及海外簽賬\n| 項目 | 詳情 |\n|:---|:---|\n| 回贈率 | **5%**（0.4%基本 + 4.6%額外）|\n| 簽賬門檻 | **無** |\n| 月簽上限 | **$3,260**（額外回贈$150）|\n\n### 🛍️ Chill 商戶簽賬\n| 項目 | 詳情 |\n|:---|:---|\n| 回贈率 | **10%**（0.4%基本 + 9.6%額外）|\n| 簽賬門檻 | 月簽**實體店** $1,500 |\n| 月簽上限 | **$1,562**（額外回贈$150）|\n\n### 🏪 Chill 商戶名單\n**購物消閒**：McDonald's、Pacific Coffee、Starbucks、UNIQLO、GU、IKEA、Dyson、Samsung、Sony、LOG-ON\n\n**影視娛樂**：全港戲院、Apple TV/Music、App Store、Disney+、Google Play、JOOX、KK Box、MOOV、Netflix、Nintendo、PlayStation、Spotify、YouTube\n\n👉 [完整商戶名單](https://www.bochk.com/s/a/chill)\n\n---\n\n## ⚠️ 重要提示\n\n- 額外回贈上限 **$150/月**（Chill商戶 + 網上/海外**合併計算**）\n- 同一簽賬符合多個類別，以較高回贈計算\n- CBF 手續費：**0.95%**（海外網站簽港幣）\n- 外幣手續費：**1.95%**\n- 八達通自動增值：**0.4%**\n\n---\n\n## 🎁 迎新優惠（至 2026/12/31）\n**全新客戶**：批卡後首2個曆月內簽滿 $5,000 → **$500 回贈**\n\n⚠️ 不計迎新：電子錢包轉賬、八達通增值\n\n---\n\n## ❌ 不計回贈\n- BoC Pay+、AlipayHK、WeChat Pay HK\n- 八達通增值（額外回贈）\n- 網上繳費、公共事務費用、保險\n- P2P 轉賬\n\n---\n\n## 💡 Platinum 版本\n如年薪不足 $300,000，可申請 **Chill Platinum Mastercard**：\n- 網上/海外：**4%**（門檻：無）\n- Chill 商戶：**8%**（門檻：月簽實體店 $1,000）\n- 年薪要求：$150,000\n- 永久免年費\n- 學生可申請！\n\n📅 **2026年1月7日更新**",
    officialApplyUrl: "https://www.bochk.com/tc/creditcard/products/chillcard.html",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=456&a=228&sub_id1=pickcardrebate&sub_id2=web&promo_id=boc-chill-moneyhero-20260130",
    promoEndDate: "2026-01-30",
    promoName: "MoneyHero限時獨家優惠",
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
    tags: ["SOGO", "崇光5%", "手機支付5.4%", "狂賞派"],
    welcomeOfferText: "迎新簽 $5,000 送 $500 崇光禮券 / 手機簽賬 10% (上限$300)",
    officialApplyUrl: "https://www.bochk.com/tc/creditcard/cardproduct/sogo.html",
    applyUrl: "https://www.bochk.com/tc/creditcard/cardproduct/sogo.html",
    sellingPoints: ["手機支付 5.4% (每月上限$100)", "崇光百貨全年 5%", "🔥 可疊加狂賞派 5% 回贈", "崇光超市星期一 5%"],
    featuredMerchants: [
      { name: "崇光百貨", rate: "5%", category: "百貨" },
      { name: "崇光超市", rate: "5%", category: "超市" },
      { name: "Apple Pay", rate: "5.4%", category: "手機支付" },
      { name: "Google Pay", rate: "5.4%", category: "手機支付" },
    ],
    exclusions: ["八達通增值", "電子錢包充值/P2P轉賬", "繳稅", "網上繳費"],
    note: "💡 **手機支付**（Apple Pay/Google Pay/Samsung Pay）額外 5% 回贈（連基本 0.4% 共 5.4%），每月回贈上限 $100（即每月 $2,000 簽賬爆 Cap）。\n\n🛍️ **崇光百貨全年 5%**：適用於崇光百貨指定商戶及產品。\n\n🛒 **崇光超市 Freshmart**：逢星期一 5% 現金折扣。\n\n---\n\n## 🔥 狂賞派疊加攻略（需另外登記）\n**推廣期：2026/1/1 - 6/30**\n\n用 SOGO 卡手機支付可疊加狂賞派優惠：\n- 手機支付 5.4% + 狂賞派紅日 5% = **10.4%** 🔥\n- 手機支付 5.4% + 狂賞派平日 2% = **7.4%**\n\n👉 [立即登記狂賞派](https://iservice.boccc.com.hk/LDPRegistrationWEB/w-verify.jsp?lang=zh_HK&action=register&campaignid=rewards2601)\n\n---\n\n🇯🇵 **日本優惠**：日本 SOGO/西武滿 ¥1,000 享 5% 折扣；累積滿 ¥10萬可換 $800 崇光禮券。\n\n❌ 不適用於：八達通增值、電子錢包充值/P2P轉賬（AlipayHK/PayMe/WeChat Pay）、繳稅、網上繳費。\n\n📅 **2026年1月1日更新**：新增狂賞派疊加",
    promoEndDate: "2026-12-31",
    promoName: "手機支付 5% 現金回贈 + 狂賞派",
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
      // 狂賞飛 2026: 內地/澳門實體店每季簽$5,000回贈$300 (6%)，疊加 Cheers 4% = 10%
      // 狂賞飛 2026: 其他海外實體店每季簽$10,000回贈$300 (3%)，疊加 Cheers 4% = 7%
      // 由於狂賞飛需額外登記，使用 requiresRegistration 標記，此處規則僅作參考
      // T&C: 不適用於 BoC Pay+/Alipay/WeChat Pay/PayMe
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "bocpay"] },
    ],
    tags: ["餐飲4%", "旅遊4%", "高級卡", "機場貴賓室", "狂賞飛10%", "MoneyHero獨家"],
    welcomeOfferText: "送$300 Apple禮品卡",
    officialApplyUrl: "https://www.bochk.com/tc/creditcard/products/cheers.html",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=452&a=228&sub_id1=pickcardrebate&sub_id2=web&promo_id=boc-cheers-moneyhero-20260130",
    sellingPoints: ["本地餐飲 10X (4%)", "外幣簽賬 10X (4%)", "🔥 狂賞飛：內地/澳門高達 10%", "需每月簽滿 $5,000", "機場貴賓室"],
    note: "## 🔥 MoneyHero 限時獨家優惠\n**優惠期：2026年1月2日下午12時至1月30日下午6時**\n\n### 🎁 獨家禮品（5選1）\n| 禮品 | 價值 |\n|:---|:---:|\n| LOJEL Alto 29吋超輕量行李箱 | **$2,100** |\n| Marshall Emberton II 藍牙喇叭 | **$1,499** |\n| BRUNO BAK801 即熱式飲水機 | **$998** |\n| HK$800 Apple Store 禮品卡 | $800 |\n| HK$800 惠康購物現金券 | $800 |\n\n### 📋 申請條件\n1. ✅ 全新中銀信用卡客戶（過去12個月內未持有主卡）\n2. ✅ 獲取換領表格後 **7日內** 填妥及遞交\n3. ✅ 2026年2月28日或之前成功獲批\n\n---\n\n## 📌 餐飲及旅遊 10X 積分 (至 2026/6/30)\n| 類別 | 回贈 | 月簽上限 |\n|:---|:---:|:---:|\n| 本地餐飲 | **4%** | $10,000 |\n| 外幣簽賬 | **4%** | $25,000 |\n\n⚠️ 需月簽 $5,000 方可享用\n\n📅 **2026年1月22日更新**",
    promoEndDate: "2026-01-30",
    promoName: "MoneyHero限時獨家優惠",
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
    hidden: true, // ⚠️ 2025年6月起已改名為「中銀Go卡」，舊卡已停發
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
    note: "⚠️ 此卡已於2025年6月改名為「中銀Go卡」，請參考新卡資料。不適用於 Alipay/WeChat Pay/PayMe 簽賬。",
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
    tags: ["Go商戶5%", "內地手機簽賬2%", "人民幣免手續費", "一卡雙幣", "MoneyHero獨家"],
    welcomeOfferText: "送$300 Apple禮品卡",
    welcomeOfferReward: "up to $2,100",
    officialApplyUrl: "https://www.bochk.com/tc/creditcard/products/gocard.html",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=456&a=228&sub_id1=pickcardrebate&sub_id2=web&promo_id=boc-go-moneyhero-20260130",
    sellingPoints: ["指定Go商戶高達5%現金回贈", "內地手機簽賬高達2%回贈", "人民幣海外簽賬免手續費", "一卡雙幣"],
    note: "## 🔥 MoneyHero 限時獨家優惠\n**優惠期：2026年1月2日下午12時至1月30日下午6時**\n\n### 🎁 獨家禮品（5選1）\n| 禮品 | 價值 |\n|:---|:---:|\n| LOJEL Alto 29吋超輕量行李箱 | **$2,100** |\n| Marshall Emberton II 藍牙喇叭 | **$1,499** |\n| BRUNO BAK801 即熱式飲水機 | **$998** |\n| HK$800 Apple Store 禮品卡 | $800 |\n| HK$800 惠康購物現金券 | $800 |\n\n### 📋 申請條件\n1. ✅ 全新中銀信用卡客戶（過去12個月內未持有主卡）\n2. ✅ 獲取換領表格後 **7日內** 填妥及遞交\n3. ✅ 2026年2月28日或之前成功獲批\n\n---\n\n## 📌 銀行迎新\n首3個月手機簽賬享10%回贈，上限$500\n\n📅 **2026年1月22日更新**",
    promoEndDate: "2026-01-30",
    promoName: "MoneyHero限時獨家優惠",
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
    tags: ["Go商戶5%", "內地手機簽賬4%", "人民幣免手續費", "一卡雙幣", "MoneyHero獨家"],
    welcomeOfferText: "送$300 Apple禮品卡",
    welcomeOfferReward: "up to $2,100",
    officialApplyUrl: "https://www.bochk.com/tc/creditcard/products/gocard.html",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=456&a=228&sub_id1=pickcardrebate&sub_id2=web&promo_id=boc-go-moneyhero-20260130",
    sellingPoints: ["指定Go商戶高達5%現金回贈", "內地手機簽賬高達4%回贈", "人民幣海外簽賬免手續費", "一卡雙幣"],
    note: "## 🔥 MoneyHero 限時獨家優惠\n**優惠期：2026年1月2日下午12時至1月30日下午6時**\n\n### 🎁 獨家禮品（5選1）\n| 禮品 | 價值 |\n|:---|:---:|\n| LOJEL Alto 29吋超輕量行李箱 | **$2,100** |\n| Marshall Emberton II 藍牙喇叭 | **$1,499** |\n| BRUNO BAK801 即熱式飲水機 | **$998** |\n| HK$800 Apple Store 禮品卡 | $800 |\n| HK$800 惠康購物現金券 | $800 |\n\n### 📋 申請條件\n1. ✅ 全新中銀信用卡客戶（過去12個月內未持有主卡）\n2. ✅ 獲取換領表格後 **7日內** 填妥及遞交\n3. ✅ 2026年2月28日或之前成功獲批\n\n---\n\n## 📌 銀行迎新\n首3個月手機簽賬享10%回贈，上限$500\n\n📅 **2026年1月22日更新**",
    promoEndDate: "2026-01-30",
    promoName: "MoneyHero限時獨家優惠",
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
    tags: ["網購5%", "外幣6%", "永久免年費", "八達通增值", "必須登記", "MoneyHero獨家"],
    welcomeOfferText: "全新客戶簽$5,000送$700 +FUN / 現有客戶送$300 +FUN",
    sellingPoints: ["永久免年費", "海外 6% (簽上限$8,333/月)", "網上 5% (簽上限$10,000/月)", "回贈上限 $500/月 (共用)", "🚨 需月簽滿$5,000先有高回贈", "🔥冬日簽賬賞額外高達$2,800"],
    featuredMerchants: [
      { name: "Amazon", rate: "5%", category: "網購" },
      { name: "Apple Store", rate: "5%", category: "網購" },
      { name: "Netflix", rate: "5%", category: "串流" },
      { name: "Spotify", rate: "5%", category: "串流" },
    ],
    exclusions: ["快餐店", "酒店/百貨公司/俱樂部內食肆", "Alipay/WeChat Pay/PayMe", "網上繳費", "交稅", "保險公司簽賬"],
    note: "## 🔥 MoneyHero 限時獨家優惠\n**優惠期：即日至 2026年1月30日下午6時**\n\n### 🎁 全新客戶獨家禮品（6選1）\n批卡後30日內簽滿 **$400** 即可獲得：\n\n| 禮品 | 價值 |\n|:---|:---:|\n| Delsey 30\" GRENELLE SE 行李箱 | **$4,980** |\n| Foreo LUNA 3 潔面及按摩儀 | **$2,090** |\n| Marshall Emberton II 藍牙喇叭 | **$1,499** |\n| HK$800 Apple Store 禮品卡 | $800 |\n| HK$800 惠康購物現金券 | $800 |\n| HK$800 現金回贈 (轉數快) | $800 |\n\n### 🎁 現有客戶獨家禮品（6選1）\n批卡後30日內簽滿 **$400** 即可獲得：\n\n| 禮品 | 價值 |\n|:---|:---:|\n| Foreo LUNA 3 潔面及按摩儀 | **$2,090** |\n| Marshall Willen II 小型無線便攜喇叭 | **$999** |\n| Polaroid Go Generation 2 即影即有相機 | **$999** |\n| HK$600 Apple Store 禮品卡 | $600 |\n| HK$600 惠康購物現金券 | $600 |\n| HK$600 現金回贈 (轉數快) | $600 |\n\n---\n\n## 📌 銀行迎新優惠（至 2026/12/31）\n開卡後60日內簽滿指定金額：\n\n| 客戶類型 | 簽賬要求 | 獎賞 |\n|:---|:---:|:---:|\n| 全新客戶 | $5,000 | **$700** +FUN |\n| 現有客戶 | $5,000 | $300 +FUN |\n| 學生 | $2,000 | $300 +FUN |\n\n---\n\n## 💳 回贈率及上限\n| 類別 | 回贈率 | 回贈上限 |\n|:---|:---:|:---:|\n| 海外外幣 | **6%** | $500 (共用) |\n| 網上簽賬 | **5%** | $500 (共用) |\n| 自選類別 | 1% | $500 (共用) |\n\n⚠️ 需月簽 $5,000 + 登記：hangseng.com/mpower\n\n📅 **2026年1月22日更新**",
    officialApplyUrl: "https://www.hangseng.com/zh-hk/personal/cards/products/mmpower-world-mastercard/",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=212&a=228&sub_id1=pickcardrebate&sub_id2=web",
    promoEndDate: "2026-01-30",
    promoName: "MoneyHero限時獨家優惠",
  },
  {
    id: "hangseng-enjoy",
    name: "Hang Seng enJoy Card",
    bank: "Hang Seng",
    style: { bgColor: "bg-gradient-to-br from-red-500 to-red-700", textColor: "text-white" },
    // imageUrl from DB
    annualFee: 0,
    feeWaiverCondition: "永久免年費",
    minIncome: 150000,
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 200, currency: 'yuu積分' }, // 200 yuu points = $1 cash
    rules: [
      // ========== 折扣優惠 (直接減價，非回贈) ==========
      // 惠康/Market Place: 每月3/13/23日 92折 - 折扣優惠，單一簽賬滿$100
      { description: "惠康/Market Place 92折 [3/13/23號,滿$100]", matchType: "merchant", matchValue: ["wellcome", "market_place"], percentage: 8.0, validDates: [3, 13, 23], isDiscount: true, minSpend: 100 },
      // 萬寧: 每月1/20日 94折 - 折扣優惠
      { description: "萬寧 94折 [1/20號]", matchType: "merchant", matchValue: ["mannings"], percentage: 6.0, validDates: [1, 20], isDiscount: true },
      // 7-Eleven: 每月8/18日 95折 - 折扣優惠
      { description: "7-Eleven 95折 [8/18號]", matchType: "merchant", matchValue: ["7-eleven"], percentage: 5.0, validDates: [8, 18], isDiscount: true },
      // ========== yuu 積分獎賞 ==========
      // T&C: 指定食肆 4X yuu積分 (2%) - Pizza Hut/PHD/KFC/美心中菜/美心西餐/m.a.x. concepts/美心快餐/麵包西餅店/星巴克/丼丼屋/魚尚
      { description: "指定食肆 4X yuu積分 (2%)", matchType: "merchant", matchValue: ["pizzahut", "phd", "kfc", "maxims", "maxims_palace", "jade_garden", "peking_garden", "starbucks", "arome", "mx", "simplylife", "canteen", "deli_o", "paper_stone", "homebake", "urban_bakery", "dondonya", "sakana"], percentage: 2.0 },
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
    tags: ["儲分", "食肆優惠", "yuu積分", "惠康92折", "萬寧94折", "八達通增值", "永久免年費", "MoneyHero獨家"],
    welcomeOfferText: "全新客戶送140,000 yuu ($700) / 現有客戶送60,000 yuu ($300)",
    sellingPoints: ["🛒惠康92折 (3/13/23號)", "💊萬寧94折 (1/20號)", "🏪7-Eleven 95折 (8/18號)", "🍕指定食肆 4X yuu (2%)", "八達通增值計積分", "永久免年費"],
    featuredMerchants: [
      { name: "惠康", rate: "92折", category: "超市" },
      { name: "萬寧", rate: "94折", category: "藥妝" },
      { name: "7-Eleven", rate: "95折", category: "便利店" },
      { name: "Pizza Hut", rate: "2%", category: "餐飲" },
      { name: "KFC", rate: "2%", category: "餐飲" },
      { name: "Starbucks", rate: "2%", category: "餐飲" },
    ],
    exclusions: ["電子錢包", "繳稅", "保險"],
    note: "## 🔥 MoneyHero 限時獨家優惠\n**優惠期：即日至 2026年1月30日下午6時**\n\n### 🎁 全新客戶獨家禮品（5選1）\n批卡後30日內簽滿 **$500** 即可獲得：\n\n| 禮品 | 價值 |\n|:---|:---:|\n| Delsey 30\" GRENELLE SE 行李箱 | **$4,980** |\n| Foreo LUNA 3 潔面及按摩儀 | **$2,090** |\n| Marshall Emberton II 藍牙喇叭 | **$1,499** |\n| HK$800 Apple Store 禮品卡 | $800 |\n| HK$800 惠康購物現金券 | $800 |\n\n### 🎁 現有客戶獨家禮品（5選1）\n批卡後30日內簽滿 **$500** 即可獲得：\n\n| 禮品 | 價值 |\n|:---|:---:|\n| Marshall Willen II 小型無線便攜喇叭 | **$999** |\n| Braun MultiFry 3 空氣炸鍋 HF3000 | **$988** |\n| Foreo LUNA fofo 洗面機 | **$890** |\n| HK$500 Apple Store 禮品卡 | $500 |\n| HK$500 惠康購物現金券 | $500 |\n\n---\n\n## 📌 銀行迎新優惠（至 2026/12/31）\n綁定 yuu + 60日內簽滿 $5,000：\n- **全新客戶**：140,000 yuu ($700)\n- **現有客戶**：60,000 yuu ($300)\n\n---\n\n## 🛒 特約商戶折扣\n| 商戶 | 折扣 | 日期 |\n|:---|:---:|:---:|\n| 惠康/Market Place | **92折** | 3/13/23號 |\n| 萬寧 | **94折** | 1/20號 |\n| 7-Eleven | **95折** | 8/18號 |\n\n📅 **2026年1月22日更新**",
    officialApplyUrl: "https://www.hangseng.com/zh-hk/personal/cards/products/enjoy-card/",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=213&a=228&sub_id1=pickcardrebate&sub_id2=web&promo_id=hangseng-enjoy-moneyhero-20260130",
    promoEndDate: "2026-01-30",
    promoName: "MoneyHero限時獨家優惠",
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
      // 2026年條款變動：https://www.hangseng.com/content/dam/wpb/hase/rwd/personal/cards/pdfs/travelplus_fundollars_tnc_tc.pdf
      // 1. 只限實體店簽賬，網購全部無回贈
      // 2. 7% 改為日本/韓國/泰國/內地/台灣/澳門（刪除新加坡/澳洲，新增內地/台灣/澳門）
      // 3. 取消交通類別
      // 4. 餐飲計返快餐（但不包括酒店/百貨/會所內食肆）
      // T&C: 指定國家外幣簽賬 7% (日本/韓國/泰國/內地/澳門/台灣實體店，需月簽賬滿$6,000)
      { description: "指定國家外幣 7% [日韓泰陸澳台實體店,月簽$6,000]", matchType: "base", percentage: 7.0, monthlyMinSpend: 6000, isForeignCurrency: true, isPhysicalStore: true, cap: 500, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "octopus"] },
      // T&C: 其他國家外幣簽賬 5% (實體店，需月簽賬滿$6,000)
      { description: "其他外幣 5% [實體店,月簽$6,000]", matchType: "base", percentage: 5.0, monthlyMinSpend: 6000, isForeignCurrency: true, isPhysicalStore: true, cap: 500, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "octopus"] },
      // T&C: 本地餐飲 5% (包括快餐，但不包括酒店/百貨/會所內食肆，需月簽賬滿$6,000)
      { description: "本地餐飲 5% [含快餐,月簽$6,000]", matchType: "category", matchValue: ["dining"], percentage: 5.0, monthlyMinSpend: 6000, cap: 500, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "octopus"] },
      // T&C: 基本回饋 0.4%，排除繳費、保險、Alipay/WeChat Pay、八達通增值、電子錢包充值
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "octopus"] },
    ],
    tags: ["旅遊7%", "餐飲5%", "實體店限定", "必須登記", "冬日賞", "MoneyHero獨家"],
    welcomeOfferText: "全新客戶簽$5,000送$700 +FUN / 現有客戶送$300 +FUN",
    sellingPoints: ["🔥 MoneyHero獨家 $400 禮品 (簽$100)", "指定國家 7% (簽上限$7,143/月)", "其他外幣/餐飲 5% (簽上限$10,000/月)", "回贈上限 $500/月", "🚨 需月簽滿$6,000先有高回贈"],
    note: "## 🔥 MoneyHero 限時獨家優惠\n**優惠期：即日至 2026年1月30日下午6時**\n\n### 🎁 獨家禮品（2選1）\n| 禮品 | 價值 |\n|:---|:---:|\n| Apple Store 禮品卡 | **$400** |\n| 惠康購物現金券 | **$400** |\n\n### 📋 申請條件\n1. ✅ 全新/現有恒生信用卡客戶均可\n2. ✅ 收到獎賞換領表格後 **7日內** 填妥及遞交\n3. ✅ 提交申請後 **30日內** 成功獲批\n4. ✅ 批卡後30日內簽賬滿 **$100** 🎉 超低門檻！\n\n---\n\n## 📌 銀行迎新優惠（至 2026/12/31）\n開卡後60日內簽滿 $5,000：\n\n| 客戶類型 | 獎賞 |\n|:---|:---:|\n| 全新客戶 | **$700** +FUN Dollars |\n| 現有客戶 | $300 +FUN Dollars |\n\n---\n\n## ⚠️ 2026年條款變動（1月1日生效）\n\n**重大改變：**\n1. ❌ **網購全部無回贈** - 只限實體店簽賬\n2. 🔄 **7%國家改變** - 日本/韓國/泰國/內地/台灣/澳門（刪除新加坡/澳洲）\n3. ❌ **取消交通類別** - 港鐵/巴士等不再有5%\n4. ✅ **餐飲計返快餐** - 但酒店/百貨/會所內食肆仍不計\n\n### 💳 回贈率及上限\n| 類別 | 回贈率 | 簽賬上限 | 回贈上限 |\n|:---|:---:|:---:|:---:|\n| 指定國家外幣 | **7%** | $7,143 | $500 (共用) |\n| 其他外幣 | **5%** | $10,000 | $500 (共用) |\n| 本地餐飲 | **5%** | $10,000 | $500 (共用) |\n| 其他簽賬 | 0.4% | 無上限 | - |\n\n---\n\n🔥 **冬日簽賬賞**（至2026/2/28）：累積簽賬可享額外高達$2,800回贈！[查看詳情](/discover/hangseng-winter-2025)\n\n📅 **2026年1月22日更新**",
    officialApplyUrl: "https://www.hangseng.com/zh-hk/personal/cards/products/travel-plus-visa-signature/",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=688&a=228&sub_id1=pickcardrebate&sub_id2=web&promo_id=hangseng-travel-plus-moneyhero-20260130",
    promoEndDate: "2026-01-30",
    promoName: "MoneyHero限時獨家優惠",
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
    annualFee: 1800,
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
    tags: ["自動回贈", "餐飲2%", "週末餐飲3%", "八達通1%", "MoneyHero獨家"],
    welcomeOfferText: "簽$10,000享高達$2,600迎新獎賞",
    officialApplyUrl: "https://www.citibank.com.hk/zh-hk/credit-cards/citi-cash-back-card.html",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=168&a=228&sub_id1=pickcardrebate&sub_id2=web",
    sellingPoints: ["週五六日食肆 3% 回贈", "全球食肆及酒店 2% 回贈", "八達通自動增值 1%", "無上限，自動入賬"],
    note: "## 🔥 MoneyHero 限時獨家優惠\n**優惠期：2026年1月19日中午12時至1月26日下午6時**\n\n### 🎁 獨家禮品（7選1）\n| 禮品 | 價值 |\n|:---|:---:|\n| PHILIPS 飛利浦 ADD6920 RO 純淨飲水機 | **$4,288** |\n| Dyson Supersonic Nural™ 風筒 HD16 | **$3,980** |\n| LOJEL Cubo 30吋行李箱 | **$3,700** |\n| Harman Kardon AURA Studio 5 藍芽喇叭 | **$2,599** |\n| HK$2,200 Apple Store 禮品卡 | $2,200 |\n| HK$2,200 惠康購物現金券 | $2,200 |\n| 22,000 Max Miles 飛行里數 | ~$2,200 |\n\n### 📋 申請條件\n1. ✅ Citi 新客戶（過去12個月內未持有Citi信用卡主卡）\n2. ✅ 2026年2月28日或之前成功批核並啟動\n3. ✅ 批卡後30日內累積簽賬滿 **$4,000**\n\n---\n\n⚠️ 不適用於：FPS、繳稅、保費、公共事務費用\n✅ 八達通自動增值有 1% 回贈！\n\n📅 **2026年1月22日更新**",
    promoEndDate: "2026-01-26",
    promoName: "MoneyHero限時獨家優惠",
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
    rewardConfig: { method: 'conversion', ratio: 270, currency: 'Points' }, // 270 pts = $1 現金回贈
    rules: [
      // T&C 2024/10/31: 購物和娛樂 8.1X 積分 = 3% 回贈
      // MCC: 百貨公司(5311)/服裝店(5611,5621,5631,5651,5655,5661,5691,5699)/鐘錶珠寶(5944)/皮具(5948)/化妝品(5977)/專門零售(5999)
      // MCC: 有線電視(4899)/數碼媒體(5815,5816,5817,5818)/電影院(7832)/演出票務(7922)/遊樂園(7996)
      { description: "購物和娛樂 3% (8.1X積分)", matchType: "category", matchValue: ["shopping", "entertainment", "department_store", "clothing", "cosmetics", "jewelry", "cinema", "streaming", "theme_park"], percentage: 3.0, cap: 113400, capType: "reward", excludeCategories: ["supermarket"], excludePaymentMethods: ["octopus", "payme", "alipay", "wechat_pay", "fps"] },
      // T&C 2024/10/31: 本地流動支付 2.7X 積分 = 1% 回贈 (只限港幣)
      // 如同時符合購物娛樂，只計較高的 8.1X
      { description: "流動支付 1% (2.7X積分) [本地港幣]", matchType: "paymentMethod", matchValue: ["mobile", "apple_pay", "google_pay", "samsung_pay"], percentage: 1.0, cap: 113400, capType: "reward", excludeCategories: ["ewallet"], excludePaymentMethods: ["octopus", "payme", "alipay", "wechat_pay", "fps"] },
      // T&C: 基本積分 1X = 0.37%
      { description: "基本回饋 0.37% (1X積分)", matchType: "base", percentage: 0.37, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["octopus", "payme", "alipay", "wechat_pay", "fps"] },
    ],
    tags: ["購物娛樂3%", "流動支付1%", "積分永不過期", "MoneyHero獨家"],
    welcomeOfferText: "簽$10,000享高達$2,600迎新獎賞",
    sellingPoints: ["購物和娛樂 3% 回贈 (8.1X積分)", "本地流動支付 1% 回贈 (2.7X積分)", "積分永不過期", "里數兌換免手續費"],
    note: "## 🔥 MoneyHero 限時獨家優惠\n**優惠期：2026年1月19日中午12時至1月26日下午6時**\n\n### 🎁 獨家禮品（7選1）\n| 禮品 | 價值 |\n|:---|:---:|\n| PHILIPS 飛利浦 ADD6920 RO 純淨飲水機 | **$4,288** |\n| Dyson Supersonic Nural™ 風筒 HD16 | **$3,980** |\n| LOJEL Cubo 30吋行李箱 | **$3,700** |\n| Harman Kardon AURA Studio 5 藍芽喇叭 | **$2,599** |\n| HK$2,200 Apple Store 禮品卡 | $2,200 |\n| HK$2,200 惠康購物現金券 | $2,200 |\n| 22,000 Max Miles 飛行里數 | ~$2,200 |\n\n### 📋 申請條件\n1. ✅ Citi 新客戶（過去12個月內未持有Citi信用卡主卡）\n2. ✅ 2026年2月28日或之前成功批核並啟動\n3. ✅ 批卡後30日內累積簽賬滿 **$4,000**\n\n---\n\n## 📌 Citi Rewards 積分計劃\n| 類別 | 積分倍數 | 回贈率 |\n|:---|:---|:---|\n| 購物和娛樂 | 8.1X | **3%** |\n| 本地流動支付 | 2.7X | **1%** |\n| 其他簽賬 | 1X | 0.37% |\n\n📅 **2026年1月22日更新**",
    officialApplyUrl: "https://www.citibank.com.hk/zh-hk/credit-cards/citi-rewards-card.html",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=169&a=228&sub_id1=pickcardrebate&sub_id2=web",
    promoEndDate: "2026-01-26",
    promoName: "MoneyHero限時獨家優惠",
  },
  {
    id: "citi-rewards-unionpay",
    name: "Citi Rewards 銀聯信用卡",
    bank: "Citi",
    style: { bgColor: "bg-gradient-to-br from-red-600 to-red-800", textColor: "text-white" },
    annualFee: 1800,
    minIncome: 120000,
    feeWaiverCondition: "首年免年費",
    foreignCurrencyFee: 0, // 銀聯免手續費
    rewardConfig: { method: 'conversion', ratio: 270, currency: 'Points' }, // 270 pts = $1 現金回贈
    rules: [
      // T&C 2024/10/31: 購物和娛樂 8.1X 積分 = 3% 回贈 (包括內地簽賬)
      { description: "購物和娛樂 3% (8.1X積分)", matchType: "category", matchValue: ["shopping", "entertainment", "department_store", "clothing", "cosmetics", "jewelry", "cinema", "streaming", "theme_park"], percentage: 3.0, cap: 113400, capType: "reward", excludeCategories: ["supermarket"], excludePaymentMethods: ["octopus", "payme", "alipay", "wechat_pay", "fps"] },
      // T&C 2024/10/31: 本地流動支付 2.7X 積分 = 1% 回贈 (只限港幣)
      { description: "流動支付 1% (2.7X積分) [本地港幣]", matchType: "paymentMethod", matchValue: ["mobile", "apple_pay", "google_pay", "samsung_pay"], percentage: 1.0, cap: 113400, capType: "reward", excludeCategories: ["ewallet"], excludePaymentMethods: ["octopus", "payme", "alipay", "wechat_pay", "fps"] },
      // T&C: 基本積分 1X = 0.37%
      { description: "基本回饋 0.37% (1X積分)", matchType: "base", percentage: 0.37, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["octopus", "payme", "alipay", "wechat_pay", "fps"] },
    ],
    tags: ["銀聯", "一卡雙幣", "購物娛樂3%", "免外幣手續費", "MoneyHero獨家"],
    welcomeOfferText: "簽$10,000享高達$2,600迎新獎賞",
    sellingPoints: ["一卡雙幣 (港幣/人民幣)", "購物和娛樂 3% 回贈 (8.1X積分)", "內地簽賬同享 3% 回贈", "免外幣手續費 (銀聯)", "積分永不過期"],
    note: "## 🔥 MoneyHero 限時獨家優惠\n**優惠期：2026年1月19日中午12時至1月26日下午6時**\n\n### 🎁 獨家禮品（7選1）\n| 禮品 | 價值 |\n|:---|:---:|\n| PHILIPS 飛利浦 ADD6920 RO 純淨飲水機 | **$4,288** |\n| Dyson Supersonic Nural™ 風筒 HD16 | **$3,980** |\n| LOJEL Cubo 30吋行李箱 | **$3,700** |\n| Harman Kardon AURA Studio 5 藍芽喇叭 | **$2,599** |\n| HK$2,200 Apple Store 禮品卡 | $2,200 |\n| HK$2,200 惠康購物現金券 | $2,200 |\n| 22,000 Max Miles 飛行里數 | ~$2,200 |\n\n### 📋 申請條件\n1. ✅ Citi 新客戶（過去12個月內未持有Citi信用卡主卡）\n2. ✅ 2026年2月28日或之前成功批核並啟動\n3. ✅ 批卡後30日內累積簽賬滿 **$4,000**\n\n---\n\n## 📌 一卡雙幣優勢\n- 本地及海外簽賬：港幣結算\n- 中國內地簽賬：人民幣結算，無匯率風險\n- **內地購物娛樂同享 3% 回贈！**\n- 免外幣手續費（銀聯卡優勢）\n\n📅 **2026年1月22日更新**",
    promoEndDate: "2026-01-26",
    promoName: "MoneyHero限時獨家優惠",
    officialApplyUrl: "https://www.citibank.com.hk/zh-hk/credit-cards/citi-rewards-unionpay-card.html",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=170&a=228&sub_id1=pickcardrebate&sub_id2=web",
  },
  {
    id: "citi-premiermiles",
    name: "Citi PremierMiles",
    bank: "Citi",
    style: { bgColor: "bg-gradient-to-br from-slate-600 to-slate-800", textColor: "text-white" },
    // imageUrl from DB
    annualFee: 1800,
    minIncome: 120000,
    feeWaiverCondition: "首年免年費",
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 0.0833, currency: 'Points' }, // 12 pts = 1 mile
    rules: [
      { description: "旅遊/酒店/航空 $4/里 (2.25%)", matchType: "category", matchValue: ["travel", "hotel", "airline"], percentage: 2.25, excludePaymentMethods: ["octopus"] },
      { description: "外幣簽賬 $4/里 (3%*)", matchType: "base", percentage: 2.25, isForeignCurrency: true }, // $20000/m for $3/mile promo often active
      { description: "本地簽賬 $8/里 (1.1%)", matchType: "base", percentage: 1.1, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["octopus"] },
    ],
    tags: ["旅遊", "里數", "機場貴賓室", "MoneyHero獨家"],
    welcomeOfferText: "簽$10,000享高達24,000里迎新獎賞",
    officialApplyUrl: "https://www.citibank.com.hk/zh-hk/credit-cards/citi-premiermiles-card.html",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=172&a=228&sub_id1=pickcardrebate&sub_id2=web",
    sellingPoints: ["外幣簽賬低至 HK$3/里 (月簽$20,000)", "每年 12 次免費機場貴賓室", "積分永不過期，免兌換手續費", "免費旅遊保險"],
    note: "## 🔥 MoneyHero 限時獨家優惠\n**優惠期：2026年1月19日中午12時至1月26日下午6時**\n\n### 🎁 獨家禮品（7選1）\n| 禮品 | 價值 |\n|:---|:---:|\n| PHILIPS 飛利浦 ADD6920 RO 純淨飲水機 | **$4,288** |\n| Dyson Supersonic Nural™ 風筒 HD16 | **$3,980** |\n| LOJEL Cubo 30吋行李箱 | **$3,700** |\n| Harman Kardon AURA Studio 5 藍芽喇叭 | **$2,599** |\n| HK$2,200 Apple Store 禮品卡 | $2,200 |\n| HK$2,200 惠康購物現金券 | $2,200 |\n| 22,000 Max Miles 飛行里數 | ~$2,200 |\n\n### 📋 申請條件\n1. ✅ Citi 新客戶（過去12個月內未持有Citi信用卡主卡）\n2. ✅ 2026年2月28日或之前成功批核並啟動\n3. ✅ 批卡後30日內累積簽賬滿 **$4,000**\n\n---\n\n💡 **里數攻略**：月簽 $20,000 可解鎖 $3/里！12次機場貴賓室需簽賬滿 $5,000 (30天內)。\n\n📅 **2026年1月22日更新**",
    promoEndDate: "2026-01-26",
    promoName: "MoneyHero限時獨家優惠",
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
    tags: ["高端", "年費卡", "旅遊", "機場貴賓室", "MoneyHero獨家"],
    welcomeOfferText: "簽$10,000享高達24,000里迎新獎賞",
    officialApplyUrl: "https://www.citibank.com.hk/zh-hk/credit-cards/citi-prestige-card.html",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=171&a=228&sub_id1=pickcardrebate&sub_id2=web&promo_id=citi-prestige-moneyhero-20260130",
    sellingPoints: ["任何酒店第 4 晚免費", "無限次使用機場貴賓室", "年資獎賞", "免費旅遊保險"],
    note: "## 🔥 MoneyHero 限時獨家優惠\n**優惠期：2026年1月21日上午10時至1月30日下午6時**\n\n### 🎁 獨家禮品（7選1）\n| 禮品 | 價值 |\n|:---|:---:|\n| Dyson Digital Slim Submarine 輕量乾濕洗地吸塵機 | **$4,680** |\n| Insta360 X5 8K 全景運動相機 (標準套裝) | **$4,099** |\n| Dyson AM15 HF1 風扇暖風機 | **$3,990** |\n| PHILIPS 飛利浦 ADD6912 RO 冷熱純淨飲水機 | **$3,788** |\n| 38,000 Max Miles 飛行里數 | ~$3,800 |\n| HK$3,500 Apple Gift Card | $3,500 |\n| HK$3,500 惠康購物現金券 | $3,500 |\n\n### 📋 申請條件\n1. ✅ Citi 新客戶（過去12個月內未持有Citi信用卡主卡）\n2. ✅ 收到換領表格後 **7日內** 填妥及遞交\n3. ✅ 2026年2月28日或之前成功批核並啟動\n4. ✅ 批卡後30日內簽賬滿 **$8,000** + 支付年費 **$3,800**\n\n⚠️ **注意**：領取 MoneyHero 獨家優惠**不能同時獲取**花旗銀行迎新優惠！\n\n---\n\n## 💳 高端禮遇\n- 🏨 **任何酒店連續入住 4 晚，第 4 晚免費！**\n- ✈️ **無限次** Priority Pass 機場貴賓室\n- 📈 **年資獎賞**：每年自動獲贈里數\n- 🛡️ **免費旅遊保險**\n\n📅 **2026年1月22日更新**",
    promoEndDate: "2026-01-30",
    promoName: "MoneyHero限時獨家優惠",
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
    featuredMerchants: [
      { name: "衛訊", rate: "4%", category: "電子產品" },
      { name: "Decathlon", rate: "5%", category: "運動" },
      { name: "Pure Fitness", rate: "5%", category: "健身" },
      { name: "海外消費", rate: "5%", category: "旅遊" },
    ],
    exclusions: ["酒席宴會", "酒店/百貨公司/會所內食肆", "獸醫", "繳稅", "繳費", "保費", "電子錢包增值"],
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
    featuredMerchants: [
      { name: "衛訊", rate: "4%", category: "電子產品" },
      { name: "海外消費", rate: "$4/里", category: "旅遊" },
      { name: "旅遊/酒店", rate: "$4/里", category: "旅遊" },
    ],
    exclusions: ["繳稅", "繳費", "保費", "籌碼", "外幣兌換", "信用卡年費", "結餘轉戶"],
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
    featuredMerchants: [
      { name: "衛訊", rate: "4%", category: "電子產品" },
    ],
    exclusions: ["繳稅", "繳費", "保費"],
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
      // T&C 2026/1/7-5/27: 週三大折日：全港超市 8% (單筆≥$300，每月首$2,000)
      // 8% = 0.4% 基本 + 7.6% 額外，Apple Pay/Google Pay/Samsung Pay 可以，支付寶/微信支付/PayMe 不可以
      { description: "週三超市 8% [單筆≥$300]", matchType: "category", matchValue: "supermarket", percentage: 8.0, validDays: [3], minSpend: 300, cap: 2000, capType: "spending", validDateRange: { start: "2026-01-07", end: "2026-05-27" }, excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 八達通自動增值 0.4% ($25/里) - mrmiles.hk 確認，每次增值上限 $1,000
      { description: "八達通自動增值 0.4% ($25/里)", matchType: "paymentMethod", matchValue: ["octopus"], percentage: 0.4 },
      // 基本回贈 0.4%
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["payme", "alipay", "wechat_pay"] },
    ],
    tags: ["週三超市8%", "指定類別2%", "八達通增值", "需登記", "衛訊4%", "MoneyHero獨家"],
    welcomeOfferText: "簽$4,800送$200回贈",
    officialApplyUrl: "https://www.dbs.com.hk/personal-zh/cards/credit-cards/dbs-compass-visa",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=185&a=228&sub_id1=pickcardrebate&sub_id2=web&promo_id=dbs-compass-moneyhero-20260130",
    sellingPoints: ["🔥 MoneyHero獨家 $200 禮品 (無需簽賬)", "週三超市 8% (單筆≥$300)", "指定類別 2% (百貨/家居/油站/AliPay/WeChat Pay) [需登記]", "每月首 $2,000 超市 / $12,500 指定類別"],
    note: "## 🔥 MoneyHero 獨家優惠\n\n### 🎁 獨家禮品（2選1）\n| 禮品 | 價值 |\n|:---|:---:|\n| Apple Store 禮品卡 | **$200** |\n| 惠康購物現金券 | **$200** |\n\n### 📋 申請條件\n1. ✅ 全新星展信用卡客戶\n2. ✅ 收到獎賞換領表格後 **7日內** 填妥及遞交\n3. ⚠️ **無需簽賬！** 🎉\n\n---\n\n⚠️ COMPASS VISA 使用 COMPASS Dollar（非 DBS$），獎賞系統不同！\n\n## 🛒 週三大折日（2026/1/7-5/27）\n\n全港超市星期三 8% 回贈（0.4% 基本 + 7.6% 額外）：\n- 單筆簽賬滿 **$300**\n- 每月首 **$2,000** 超市簽賬\n- ✅ Apple Pay/Google Pay/Samsung Pay 可以\n- ❌ 支付寶/微信支付/PayMe/八達通增值 不可以\n- 回贈自動入賬，無需登記\n\n👉 [查看官網詳情](https://www.dbs.com.hk/personal-zh/promotion/CV-super-wed)\n\n---\n\n## 📦 四圍簽，好 COM 賺（需登記）\n\n指定類別 2% (單筆≥$300，每月首$12,500)：\n- AliPay/AliPayHK/WeChat Pay\n- 百貨公司、家居傢俬、油站\n- ⚠️ 需透過 DBS Card+ App 登記！\n\n---\n\n🔥 **DBS x 衛訊優惠**（至2026/2/28）：單一簽賬滿$8,000享$320回贈！[查看詳情](/discover/dbs-wilson-2025)\n\n❌ **不計回贈**：PayMe、八達通增值、電子錢包增值、繳費、保費、繳稅。\n\n📅 **2026年1月22日更新**",
    promoEndDate: "2026-01-30",
    promoName: "MoneyHero獨家優惠",
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
    sellingPoints: ["每月20日 AEON 95折 [折扣]", "網上 6% (月簽上限$3,571)", "日本 3% (月簽上限$7,692)", "回贈上限 $200/月 (共用)", "永久免年費"],
    featuredMerchants: [
      { name: "AEON", rate: "95折", category: "百貨" },
      { name: "Amazon JP", rate: "6%", category: "網購" },
      { name: "樂天", rate: "6%", category: "網購" },
      { name: "日本酒店", rate: "3%", category: "旅遊" },
    ],
    exclusions: ["電子錢包（AlipayHK/PayMe/WeChat Pay）", "八達通增值", "保險繳費"],
    note: "## 📌 AEON CARD WAKUWAKU\n\n### 💳 回贈率及上限\n| 簽賬類別 | 回贈率 | 簽賬上限 | 回贈上限 |\n|:---|:---:|:---:|:---:|\n| 網上簽賬 | **6%** | $3,571 | $200 (共用) |\n| 日本簽賬 | **3%** | $7,692 | $200 (共用) |\n| 本地餐飲 | 1% | $33,333 | $200 (共用) |\n| 其他簽賬 | 0.4% | 無上限 | - |\n\n⚠️ 網上/日本/餐飲 **共用 $200 回贈上限**\n\n---\n\n## 🛍️ 每月20日 AEON 95折\n購物時**直接減價**，非事後回贈\n\n---\n\n## 🎁 迎新優惠（高達 $900）\n| 項目 | 獎賞 |\n|:---|:---:|\n| 簽滿$8,000後 Apple Pay/Google Pay 10% | 上限 $500 |\n| 指定類別各簽$50（八達通/租金/自動轉賬/App Store/Google Play）| 共 $200 |\n| 經 AEON App 申請輸入「WAKUWAKU」| $200 |\n\n---\n\n## ❌ 不計簽賬\n- 電子錢包（AlipayHK/PayMe/WeChat Pay）\n- 八達通增值\n- 保險繳費\n\n---\n\n📅 **2026年1月7日更新**",
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
    annualFee: 0,
    feeWaiverCondition: "永久免年費",
    rewardConfig: { method: 'conversion', ratio: 250, currency: 'Points' }, // 250 積分 = $1 回贈 (0.4%)
    rules: [
      // ========== 紫「賞」生活優惠（推廣期至 2026/2/28，需 App 登記）==========
      // 手機支付（Apple Pay/Google Pay）：15X 積分 = 6%，每類別月上限 25,000 額外積分
      { description: "🔥本地食肆 6% [手機支付,需登記]", matchType: "category", matchValue: ["dining"], percentage: 6.0, cap: 100, capType: "reward", validDateRange: { start: "2025-03-01", end: "2026-02-28" }, excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"], requiresRegistration: true },
      { description: "🔥本地交通 6% [手機支付,需登記]", matchType: "category", matchValue: ["transport"], percentage: 6.0, cap: 100, capType: "reward", validDateRange: { start: "2025-03-01", end: "2026-02-28" }, excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"], requiresRegistration: true },
      { description: "🔥AEON Stores 6% [手機支付,需登記]", matchType: "merchant", matchValue: ["aeon"], percentage: 6.0, cap: 100, capType: "reward", validDateRange: { start: "2025-03-01", end: "2026-02-28" }, excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"], requiresRegistration: true },
      // 實體卡簽賬：5X 積分 = 2%
      { description: "本地食肆 2% [實體卡,需登記]", matchType: "category", matchValue: ["dining"], percentage: 2.0, cap: 100, capType: "reward", validDateRange: { start: "2025-03-01", end: "2026-02-28" }, excludePaymentMethods: ["apple_pay", "google_pay", "alipay", "wechat_pay", "payme", "octopus"], requiresRegistration: true },
      { description: "本地交通 2% [實體卡,需登記]", matchType: "category", matchValue: ["transport"], percentage: 2.0, cap: 100, capType: "reward", validDateRange: { start: "2025-03-01", end: "2026-02-28" }, excludePaymentMethods: ["apple_pay", "google_pay", "alipay", "wechat_pay", "payme", "octopus"], requiresRegistration: true },
      { description: "AEON Stores 2% [實體卡,需登記]", matchType: "merchant", matchValue: ["aeon"], percentage: 2.0, cap: 100, capType: "reward", validDateRange: { start: "2025-03-01", end: "2026-02-28" }, excludePaymentMethods: ["apple_pay", "google_pay", "alipay", "wechat_pay", "payme", "octopus"], requiresRegistration: true },
      // ========== AEON 折扣優惠 ==========
      // 每月2、20日 AEON 會員日 95折 - 折扣優惠，非回贈
      { description: "每月2/20日 AEON 95折", matchType: "merchant", matchValue: ["aeon"], percentage: 5.0, validDates: [2, 20], isDiscount: true },
      // 八達通自動增值 0.4%
      { description: "八達通自動增值 0.4%", matchType: "paymentMethod", matchValue: ["octopus"], percentage: 0.4 },
      // 基本回贈 0.4%
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
    ],
    tags: ["🔥食肆6%", "🔥交通6%", "🔥AEON 6%", "無簽賬下限", "永久免年費", "低門檻"],
    welcomeOfferText: "迎新高達 $900 (簽$6,000送$800 + App申請簽一次送$100，至2026/2/28)",
    officialApplyUrl: "https://www.aeon.com.hk/tc/credit-card/",
    applyUrl: "https://www.aeon.com.hk/tc/credit-card/",
    sellingPoints: ["🔥本地食肆/交通/AEON 高達6%", "無簽賬下限", "每月2/20日 AEON 95折", "永久免年費", "低門檻"],
    note: "## 📌 紫「賞」生活優惠（至 2026/2/28）\n\n**需於 AEON App 登記，無簽賬下限！**\n\n| 簽賬方式 | 本地食肆 | 本地交通 | AEON Stores |\n|:---|:---:|:---:|:---:|\n| 手機支付 (Apple Pay/Google Pay) | **6%** | **6%** | **6%** |\n| 實體卡 | 2% | 2% | 2% |\n\n### 上限\n- 每人每月每類別上限 25,000 額外積分\n- 3個類別合共每月上限 75,000 額外積分\n- 以手機支付計，每類別月簽上限約 $1,786-$1,923\n\n⚠️ **本地食肆不包括**：經網上平台簽賬（如外賣 App）\n\n---\n\n## 🎁 迎新優惠（至 2026/2/28）\n\n**全新 AEON 信用卡客戶（12個月內未持有）**\n\n| 條件 | 獎賞 |\n|:---|:---|\n| 經 AEON App 申請，60日內簽賬一次 | **100,000 分 ($400)** |\n| 60日內簽滿 $6,000 | **100,000 分 ($400)** |\n| 60日內經 Apple Pay/Google Pay 簽滿 $1,000 | **25,000 分 ($100)** |\n| **合共** | **$900** |\n\n⚠️ 不計迎新：電子錢包\n\n---\n\n## 📌 積分兌換\n\n| 積分 | 現金回贈 | 兌換率 |\n|:---:|:---:|:---:|\n| 30,000 | $100 | 300分=$1 |\n| 60,000 | $200 | 272分=$1 |\n| **100,000** | **$400** | **250分=$1 (最抵)** |\n\n---\n\n## ⚠️ 注意事項\n\n- 海外商戶簽港幣有 **1% CBF 手續費**\n- 每月 **2號和20號** AEON 95折（直接減價）\n- AEON JCB 卡暫不支援 Apple Pay/Google Pay\n\n📅 **2026年1月7日更新**",
    promoEndDate: "2026-02-28",
    promoName: "紫「賞」生活優惠",
  },
  {
    id: "aeon-mastercard",
    name: "AEON 萬事達信用卡",
    bank: "AEON",
    style: { bgColor: "bg-gradient-to-br from-orange-500 to-red-600", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    annualFee: 0,
    feeWaiverCondition: "永久免年費",
    rewardConfig: { method: 'conversion', ratio: 250, currency: 'Points' }, // 250 積分 = $1 回贈 (0.4%)
    rules: [
      // ========== 紫「賞」生活優惠（推廣期至 2026/2/28，需 App 登記）==========
      // 手機支付（Apple Pay/Google Pay）：15X 積分 = 6%，每類別月上限 25,000 額外積分
      { description: "🔥本地食肆 6% [手機支付,需登記]", matchType: "category", matchValue: ["dining"], percentage: 6.0, cap: 100, capType: "reward", validDateRange: { start: "2025-03-01", end: "2026-02-28" }, excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"], requiresRegistration: true },
      { description: "🔥本地交通 6% [手機支付,需登記]", matchType: "category", matchValue: ["transport"], percentage: 6.0, cap: 100, capType: "reward", validDateRange: { start: "2025-03-01", end: "2026-02-28" }, excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"], requiresRegistration: true },
      { description: "🔥AEON Stores 6% [手機支付,需登記]", matchType: "merchant", matchValue: ["aeon"], percentage: 6.0, cap: 100, capType: "reward", validDateRange: { start: "2025-03-01", end: "2026-02-28" }, excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"], requiresRegistration: true },
      // 實體卡簽賬：5X 積分 = 2%
      { description: "本地食肆 2% [實體卡,需登記]", matchType: "category", matchValue: ["dining"], percentage: 2.0, cap: 100, capType: "reward", validDateRange: { start: "2025-03-01", end: "2026-02-28" }, excludePaymentMethods: ["apple_pay", "google_pay", "alipay", "wechat_pay", "payme", "octopus"], requiresRegistration: true },
      { description: "本地交通 2% [實體卡,需登記]", matchType: "category", matchValue: ["transport"], percentage: 2.0, cap: 100, capType: "reward", validDateRange: { start: "2025-03-01", end: "2026-02-28" }, excludePaymentMethods: ["apple_pay", "google_pay", "alipay", "wechat_pay", "payme", "octopus"], requiresRegistration: true },
      { description: "AEON Stores 2% [實體卡,需登記]", matchType: "merchant", matchValue: ["aeon"], percentage: 2.0, cap: 100, capType: "reward", validDateRange: { start: "2025-03-01", end: "2026-02-28" }, excludePaymentMethods: ["apple_pay", "google_pay", "alipay", "wechat_pay", "payme", "octopus"], requiresRegistration: true },
      // ========== AEON 折扣優惠 ==========
      // 每月2、20日 AEON 會員日 95折 - 折扣優惠，非回贈
      { description: "每月2/20日 AEON 95折", matchType: "merchant", matchValue: ["aeon"], percentage: 5.0, validDates: [2, 20], isDiscount: true },
      // 八達通自動增值 0.4%
      { description: "八達通自動增值 0.4%", matchType: "paymentMethod", matchValue: ["octopus"], percentage: 0.4 },
      // 基本回贈 0.4%
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
    ],
    tags: ["🔥食肆6%", "🔥交通6%", "🔥AEON 6%", "無簽賬下限", "永久免年費", "低門檻"],
    welcomeOfferText: "迎新高達 $900 (簽$6,000送$800 + App申請簽一次送$100，至2026/2/28)",
    officialApplyUrl: "https://www.aeon.com.hk/tc/credit-card/",
    applyUrl: "https://www.aeon.com.hk/tc/credit-card/",
    sellingPoints: ["🔥本地食肆/交通/AEON 高達6%", "無簽賬下限", "每月2/20日 AEON 95折", "永久免年費", "低門檻"],
    note: "## 📌 紫「賞」生活優惠（至 2026/2/28）\n\n**需於 AEON App 登記，無簽賬下限！**\n\n| 簽賬方式 | 本地食肆 | 本地交通 | AEON Stores |\n|:---|:---:|:---:|:---:|\n| 手機支付 (Apple Pay/Google Pay) | **6%** | **6%** | **6%** |\n| 實體卡 | 2% | 2% | 2% |\n\n### 上限\n- 每人每月每類別上限 25,000 額外積分\n- 3個類別合共每月上限 75,000 額外積分\n- 以手機支付計，每類別月簽上限約 $1,786-$1,923\n\n⚠️ **本地食肆不包括**：經網上平台簽賬（如外賣 App）\n\n---\n\n## 🎁 迎新優惠（至 2026/2/28）\n\n**全新 AEON 信用卡客戶（12個月內未持有）**\n\n| 條件 | 獎賞 |\n|:---|:---|\n| 經 AEON App 申請，60日內簽賬一次 | **100,000 分 ($400)** |\n| 60日內簽滿 $6,000 | **100,000 分 ($400)** |\n| 60日內經 Apple Pay/Google Pay 簽滿 $1,000 | **25,000 分 ($100)** |\n| **合共** | **$900** |\n\n⚠️ 不計迎新：電子錢包\n\n---\n\n## 📌 積分兌換\n\n| 積分 | 現金回贈 | 兌換率 |\n|:---:|:---:|:---:|\n| 30,000 | $100 | 300分=$1 |\n| 60,000 | $200 | 272分=$1 |\n| **100,000** | **$400** | **250分=$1 (最抵)** |\n\n---\n\n## ⚠️ 注意事項\n\n- 海外商戶簽港幣有 **1% CBF 手續費**\n- 每月 **2號和20號** AEON 95折（直接減價）\n\n📅 **2026年1月7日更新**",
    promoEndDate: "2026-02-28",
    promoName: "紫「賞」生活優惠",
  },
  {
    id: "aeon-unionpay",
    name: "AEON 銀聯信用卡",
    bank: "AEON",
    cardNetwork: "unionpay",
    style: { bgColor: "bg-gradient-to-br from-red-600 to-red-800", textColor: "text-white" },
    foreignCurrencyFee: 1, // ⚠️ 2025年起收取1%外幣手續費
    annualFee: 0,
    feeWaiverCondition: "永久免年費",
    rewardConfig: { method: 'conversion', ratio: 250, currency: 'Points' }, // 250 積分 = $1 回贈 (0.4%)
    rules: [
      // ========== 紫「賞」生活優惠（推廣期至 2026/2/28，需 App 登記）==========
      // 手機支付（Apple Pay/Google Pay/AEON銀聯QR Pay）：15X 積分 = 6%
      { description: "🔥本地食肆 6% [手機支付,需登記]", matchType: "category", matchValue: ["dining"], percentage: 6.0, cap: 100, capType: "reward", validDateRange: { start: "2025-03-01", end: "2026-02-28" }, excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"], requiresRegistration: true },
      { description: "🔥本地交通 6% [手機支付,需登記]", matchType: "category", matchValue: ["transport"], percentage: 6.0, cap: 100, capType: "reward", validDateRange: { start: "2025-03-01", end: "2026-02-28" }, excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"], requiresRegistration: true },
      { description: "🔥AEON Stores 6% [手機支付,需登記]", matchType: "merchant", matchValue: ["aeon"], percentage: 6.0, cap: 100, capType: "reward", validDateRange: { start: "2025-03-01", end: "2026-02-28" }, excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"], requiresRegistration: true },
      // 實體卡簽賬：5X 積分 = 2%
      { description: "本地食肆 2% [實體卡,需登記]", matchType: "category", matchValue: ["dining"], percentage: 2.0, cap: 100, capType: "reward", validDateRange: { start: "2025-03-01", end: "2026-02-28" }, excludePaymentMethods: ["apple_pay", "google_pay", "alipay", "wechat_pay", "payme", "octopus"], requiresRegistration: true },
      { description: "本地交通 2% [實體卡,需登記]", matchType: "category", matchValue: ["transport"], percentage: 2.0, cap: 100, capType: "reward", validDateRange: { start: "2025-03-01", end: "2026-02-28" }, excludePaymentMethods: ["apple_pay", "google_pay", "alipay", "wechat_pay", "payme", "octopus"], requiresRegistration: true },
      { description: "AEON Stores 2% [實體卡,需登記]", matchType: "merchant", matchValue: ["aeon"], percentage: 2.0, cap: 100, capType: "reward", validDateRange: { start: "2025-03-01", end: "2026-02-28" }, excludePaymentMethods: ["apple_pay", "google_pay", "alipay", "wechat_pay", "payme", "octopus"], requiresRegistration: true },
      // 🔥「賞」亞洲優惠 - 內地/澳門/台灣 (2025/7/1 - 2026/1/31)
      { description: "🔥內地/澳門/台灣 6% [賞亞洲,需登記]", matchType: "base", percentage: 6.0, isForeignCurrency: true, cap: 100, capType: "reward", validDateRange: { start: "2025-07-01", end: "2026-01-31" }, excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // 🔥「賞」亞洲優惠 - 韓國 (2025/12/1 - 2026/1/31)
      { description: "🔥韓國 6% [賞亞洲,需登記]", matchType: "base", percentage: 6.0, isForeignCurrency: true, cap: 200, capType: "reward", validDateRange: { start: "2025-12-01", end: "2026-01-31" }, excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // ========== AEON 折扣優惠 ==========
      // 每月2、20日 AEON 會員日 95折 - 折扣優惠，非回贈
      { description: "每月2/20日 AEON 95折", matchType: "merchant", matchValue: ["aeon"], percentage: 5.0, validDates: [2, 20], isDiscount: true },
      // 八達通自動增值 0.4%
      { description: "八達通自動增值 0.4%", matchType: "paymentMethod", matchValue: ["octopus"], percentage: 0.4 },
      // 基本回贈 0.4%
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
    ],
    tags: ["🔥食肆6%", "🔥交通6%", "🔥AEON 6%", "內地6%", "韓國6%", "銀聯", "永久免年費", "低門檻"],
    welcomeOfferText: "迎新高達 $900 (簽$6,000送$800 + App申請簽一次送$100，至2026/2/28)",
    officialApplyUrl: "https://www.aeon.com.hk/tc/credit-card/",
    applyUrl: "https://www.aeon.com.hk/tc/credit-card/",
    sellingPoints: ["🔥本地食肆/交通/AEON 高達6%", "🔥內地/澳門/台灣/韓國 6%", "⚠️ 銀聯外幣手續費 1%", "每月2/20日 AEON 95折", "永久免年費", "低門檻"],
    note: "## 📌 紫「賞」生活優惠（至 2026/2/28）\n\n**需於 AEON App 登記，無簽賬下限！**\n\n| 簽賬方式 | 本地食肆 | 本地交通 | AEON Stores |\n|:---|:---:|:---:|:---:|\n| 手機支付 (Apple Pay/Google Pay/銀聯QR Pay) | **6%** | **6%** | **6%** |\n| 實體卡 | 2% | 2% | 2% |\n\n### 上限\n- 每人每月每類別上限 25,000 額外積分\n- 3個類別合共每月上限 75,000 額外積分\n\n---\n\n## 🔥「賞」亞洲優惠（至 2026/1/31）\n\n| 地區 | 回贈率 | 月上限 |\n|:---|:---:|:---:|\n| 內地/澳門/台灣 | 6% | $100 |\n| 韓國 | 6% | $200 |\n\n⚠️ **銀聯外幣手續費**：AEON 銀聯卡收取 **1% 外幣手續費**，淨回贈約 5%。\n\n---\n\n## 🎁 迎新優惠（至 2026/2/28）\n\n**全新 AEON 信用卡客戶（12個月內未持有）**\n\n| 條件 | 獎賞 |\n|:---|:---|\n| 經 AEON App 申請，60日內簽賬一次 | **100,000 分 ($400)** |\n| 60日內簽滿 $6,000 | **100,000 分 ($400)** |\n| 60日內經 Apple Pay/Google Pay 簽滿 $1,000 | **25,000 分 ($100)** |\n| **合共** | **$900** |\n\n---\n\n## 📌 積分兌換\n\n| 積分 | 現金回贈 | 兌換率 |\n|:---:|:---:|:---:|\n| 30,000 | $100 | 300分=$1 |\n| 60,000 | $200 | 272分=$1 |\n| **100,000** | **$400** | **250分=$1 (最抵)** |\n\n---\n\n⚠️ 每月 **2號和20號** AEON 95折（直接減價）\n\n📅 **2026年1月7日更新**",
    promoEndDate: "2026-02-28",
    promoName: "紫「賞」生活優惠",
  },
  {
    id: "aeon-jcb",
    name: "AEON JCB 信用卡",
    bank: "AEON",
    style: { bgColor: "bg-gradient-to-br from-green-600 to-green-800", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 250, currency: 'Points' }, // 250 積分 = $1 回贈
    rules: [
      // 🔥 紫「賞」生活優惠 - 本地食肆 6% (2025/10/1 - 2026/3/31)
      // 需用 Apple Pay/Google Pay，每月上限 $107 回贈（即首 $1,786 簽賬），需 App 登記
      // ⚠️ JCB 可能不支援 Apple Pay，需確認
      { description: "🔥本地食肆 6% [手機支付,需登記]", matchType: "category", matchValue: ["dining"], percentage: 6.0, cap: 107, capType: "reward", validDateRange: { start: "2025-10-01", end: "2026-03-31" }, excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"], requiresRegistration: true },
      // 每月20日 AEON 會員日 95折 - 折扣優惠，非回贈
      { description: "每月20日 AEON 95折", matchType: "merchant", matchValue: ["aeon"], percentage: 5.0, validDates: [20], isDiscount: true },
      // 基本回贈：$1 = 1 積分，250 積分 = $1 回贈 (0.4%)
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["octopus", "alipay", "wechat_pay", "payme"] },
    ],
    tags: ["AEON會員日", "永久免年費", "JCB", "日本", "🔥餐飲6%"],
    feeWaiverCondition: "永久免年費",
    // JCB 不適用手機支付獎賞，所以最高只有 150,000 積分
    welcomeOfferText: "迎新簽 $6,000 送 150,000 積分 ($600) (需App申請，手機支付獎賞除外)",
    officialApplyUrl: "https://www.aeon.com.hk/tc/credit-card/",
    applyUrl: "https://www.aeon.com.hk/tc/credit-card/",
    sellingPoints: ["🔥本地食肆 6% [手機支付,需登記]", "每月20日 AEON 95折 [折扣]", "永久免年費", "JCB 網絡適合日本消費"],
    note: "## 🔥 紫「賞」生活優惠\n**推廣期：2025/10/1 - 2026/3/31**\n\n憑 Apple Pay 或 Google Pay 於本地食肆簽賬可享高達 **6% 回贈**（15X 積分）！\n\n| 項目 | 詳情 |\n|:---|:---|\n| 回贈率 | 6% |\n| 付款方式 | Apple Pay / Google Pay |\n| 月簽上限 | $1,786 |\n| 月回贈上限 | $107 |\n| 需登記 | ✅ 需於 AEON App 登記 |\n\n⚠️ **JCB 卡可能不支援 Apple Pay**，建議使用 Google Pay 或選用 Visa/Mastercard 版本。\n\n⚠️ **不計回贈**：網上平台（如外賣 App）、酒店/百貨公司/會所內餐飲\n\n---\n\n⚠️ 每月20日 AEON 95折是購物時直接減價，非事後回贈。\n\n📅 **2026年1月更新**",
    promoEndDate: "2026-03-31",
    promoName: "紫「賞」生活優惠",
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
    annualFee: 600,
    feeWaiverCondition: "首年免年費，之後可致電 waive",
    minIncome: 40000,
    rewardConfig: { method: 'conversion', ratio: 250, currency: 'Points' }, // 250 獎分 = $1 回贈 (0.4%)
    rules: [
      // ========== 額外獎賞（推廣期至 2026/6/30，需月簽$2,000）==========
      // T&C: Apple Pay/Google Pay 4% 額外 + 0.4% 基本 = 4.4%，每月上限 $200（即首 $4,545 簽賬）
      { description: "Apple Pay/Google Pay 4.4% [月簽$2,000]", matchType: "paymentMethod", matchValue: ["apple_pay", "google_pay"], percentage: 4.4, monthlyMinSpend: 2000, cap: 200, capType: "reward", validDateRange: { start: "2025-01-01", end: "2026-06-30" }, excludeCategories: ["ewallet", "supermarket", "government"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 網上簽賬 4% 額外 + 0.4% 基本 = 4.4%，每月上限 $200（即首 $4,545 簽賬）
      { description: "網上簽賬 4.4% [月簽$2,000]", matchType: "category", matchValue: ["online"], percentage: 4.4, monthlyMinSpend: 2000, cap: 200, capType: "reward", validDateRange: { start: "2025-01-01", end: "2026-06-30" }, excludeCategories: ["ewallet", "supermarket", "government"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 娛樂消費 5% 額外 + 0.4% 基本 = 5.4%（本地主題公園、卡拉OK、電影院、售票網）
      { description: "娛樂消費 5.4% [月簽$2,000]", matchType: "category", matchValue: ["entertainment"], percentage: 5.4, monthlyMinSpend: 2000, cap: 200, capType: "reward", validDateRange: { start: "2025-01-01", end: "2026-06-30" }, excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 旅遊 6% 額外 + 0.4% 基本 = 6.4%（指定旅遊代理、酒店、航空公司）
      { description: "旅遊 6.4% [月簽$2,000]", matchType: "category", matchValue: ["travel"], percentage: 6.4, monthlyMinSpend: 2000, cap: 200, capType: "reward", validDateRange: { start: "2025-01-01", end: "2026-06-30" }, excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 本地交通 6% 額外 + 0.4% 基本 = 6.4%（專營巴士、的士App不含UBER、油站）
      { description: "本地交通/油站 6.4% [月簽$2,000]", matchType: "category", matchValue: ["transport", "petrol"], percentage: 6.4, monthlyMinSpend: 2000, cap: 200, capType: "reward", validDateRange: { start: "2025-01-01", end: "2026-06-30" }, excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // ========== 基本獎賞 ==========
      // T&C: 八達通自動增值/政府部門簽賬 0.4%，每月上限 $40 回贈（合共首 $10,000 簽賬）
      { description: "八達通增值/政府簽賬 0.4% [上限$40/月]", matchType: "paymentMethod", matchValue: ["octopus", "government"], percentage: 0.4, cap: 40, capType: "reward" },
      // T&C: 基本獎賞 0.4%（$250 = $1）
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet", "supermarket"], excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
    ],
    tags: ["手機支付4.4%", "網購4.4%", "旅遊6.4%", "交通6.4%", "娛樂5.4%", "月簽$2000", "首年免年費"],
    welcomeOfferText: "迎新簽 $3,000 送 $300 現金回贈 (首2個月，至2026/1/20)",
    officialApplyUrl: "https://www.hkbea.com/html/tc/bea-credit-card-goal-card.html",
    applyUrl: "https://www.hkbea.com/html/tc/bea-goal-credit-card.html",
    sellingPoints: ["🔥旅遊/交通 6.4% (簽上限$3,125/月)", "娛樂 5.4% (簽上限$3,704/月)", "手機/網上 4.4% (簽上限$4,545/月)", "回贈上限 $200/月 (共用)", "🚨 需月簽滿$2,000先有高回贈"],
    note: "## 📌 額外獎賞（推廣期至 2026/6/30）\n\n**需每月累積簽賬滿 $2,000 方可享額外回贈**\n\n### 💳 回贈率及上限\n| 類別 | 回贈率 | 簽賬上限 | 回贈上限 |\n|:---|:---:|:---:|:---:|\n| 旅遊/交通/油站 | **6.4%** | $3,125 | $200 (共用) |\n| 娛樂消費 | **5.4%** | $3,704 | $200 (共用) |\n| Apple Pay/Google Pay | **4.4%** | $4,545 | $200 (共用) |\n| 網上簽賬 | **4.4%** | $4,545 | $200 (共用) |\n| 其他簽賬 | 0.4% | 無上限 | - |\n\n⚠️ 所有類別**共用 $200 回贈上限**\n\n---\n\n## 📌 本地交通包括\n- 專營巴士（城巴/九巴/龍運）\n- 的士 App（**不包括 UBER**）\n- 本地油站\n\n---\n\n## 🎁 迎新優惠（至 2026/1/20）\n\n| 條件 | 獎賞 |\n|:---|:---|\n| 批卡後首2個月簽滿 $3,000 | **$300 現金回贈** |\n| 需 BEA App 確認信用卡 | ✅ |\n\n⚠️ 不計迎新：電子錢包、八達通增值、超級市場、政府部門\n\n---\n\n## ⚠️ 注意事項\n\n- **海外商戶簽港幣**有 **1% CBF 手續費**（App Store/Netflix/Spotify/Airbnb）\n- **海外簽賬手續費** 1.95%\n- 八達通增值/政府簽賬：每月上限 $40 回贈（首 $10,000）\n- PayMe 計 0.4%（時有時無）\n- 支付寶/微信支付：時有時無\n- 網上理財繳費：無回贈\n- 12個月內取消主卡：扣回迎新\n\n---\n\n## ❌ 不計額外回贈\n超級市場、政府部門、循環付款/自動轉賬、電子錢包增值/轉賬（AlipayHK/PayMe/WeChat Pay）\n\n📅 **2026年1月7日更新**",
    promoEndDate: "2026-06-30",
    promoName: "BEA GOAL 額外獎賞計劃",
  },
  {
    id: "bea-flyer-world",
    name: "BEA Flyer World Mastercard",
    bank: "東亞銀行",
    hidden: true, // 已隱藏
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
    note: "💡 【推廣期延長至 2026/6/30】海外簽賬 $2.5/里 (4.8%@$0.12/里估值)，本地食肆 $5/里 (2.4%)，其他本地 $5/里 (0.4%)。⚠️ 不計回贈：電子錢包充值(Alipay/PayMe/WeChat Pay)、保費、透過電子網絡繳款。八達通自動增值/政府部門簽賬每月上限 $40 回贈。迎新：簽$4,000送$400回贈 或 簽$5,000-$100,000送5,000-70,000里。12個月內取消扣回迎新。年費 $1,800，首年免。\n\n🧧 **新春自主賞**（2026/1/2-2/28）：每階段簽滿 $8,000 可享額外 3.3% 回贈，疊加本卡最高 **8.3%**！首10,000名，需 BEA Mall App 登記。[查看詳情](/discover/bea-cny-2026)",
    promoEndDate: "2026-02-28",
    promoName: "新春自主賞",
  },
  {
    id: "bea-world-mastercard",
    name: "東亞 World Mastercard",
    bank: "東亞銀行",
    style: { bgColor: "bg-gradient-to-br from-amber-600 to-orange-800", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    annualFee: 1800,
    feeWaiverCondition: "首年免年費，之後致電可 waive",
    minIncome: 40000,
    rewardConfig: { method: 'conversion', ratio: 250, currency: 'Points' }, // 25,000 獎分 = $100 (Pay with Points)
    rules: [
      // T&C 2026/6/30: BEA 簽賬獎分計劃，月簽滿 $4,000 + BEA Mall App 登記
      // 指定類別 12.5X 積分 = 5% 回贈 (25,000分=$100)
      // 每月上限 115,000 額外獎分 = 簽 $10,000 指定類別
      // 外幣簽賬 5% (歐洲實體簽賬除外)
      { description: "外幣簽賬 5% [月簽$4,000,需登記]", matchType: "base", percentage: 5.0, monthlyMinSpend: 4000, cap: 10000, capType: "spending", isForeignCurrency: true, excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
      // 本地食肆/酒類專賣店 5%
      { description: "本地食肆 5% [月簽$4,000,需登記]", matchType: "category", matchValue: ["dining"], percentage: 5.0, monthlyMinSpend: 4000, cap: 10000, capType: "spending", excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
      // 本地電器/電子產品 5%
      { description: "本地電子產品 5% [月簽$4,000,需登記]", matchType: "category", matchValue: ["electronics"], percentage: 5.0, monthlyMinSpend: 4000, cap: 10000, capType: "spending", excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
      // 本地運動服飾/健身中心/醫療服務 5% (獸醫除外)
      { description: "本地運動/健身/醫療 5% [月簽$4,000,需登記]", matchType: "category", matchValue: ["sports", "fitness", "medical"], percentage: 5.0, monthlyMinSpend: 4000, cap: 10000, capType: "spending", excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
      // 八達通自動增值 0.33% (連同政府簽賬每月上限 $40)
      { description: "八達通自動增值 0.33%", matchType: "paymentMethod", matchValue: ["octopus"], percentage: 0.33, cap: 40, capType: "reward" },
      // PayMe 0.33%
      { description: "PayMe 0.33%", matchType: "paymentMethod", matchValue: ["payme"], percentage: 0.33 },
      // 基本回贈 0.33% (30,000分=$100)，但指定類別可用 Pay with Points 0.4%
      { description: "基本回饋 0.33%", matchType: "base", percentage: 0.33, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet", "supermarket", "travel"], excludePaymentMethods: ["alipay", "wechat_pay", "octopus", "payme"] },
    ],
    tags: ["🔥食肆5%", "🔥海外5%", "電子產品5%", "月簽$4000", "需登記"],
    welcomeOfferText: "迎新優惠詳見官網",
    sellingPoints: ["🔥 指定類別 12.5X (5%)", "外幣簽賬 5% (1.95%手續費)", "本地食肆 5%", "本地電子產品 5%", "本地運動/健身/醫療 5%", "月簽 $4,000 門檻", "需 BEA Mall App 登記"],
    featuredMerchants: [
      { name: "豐澤", rate: "5%", category: "電子產品" },
      { name: "百老滙", rate: "5%", category: "電子產品" },
      { name: "Decathlon", rate: "5%", category: "運動" },
      { name: "Pure Fitness", rate: "5%", category: "健身" },
    ],
    exclusions: ["電子錢包（AlipayHK/WeChat Pay）", "歐洲實體簽賬（外幣5%不適用）", "獸醫（醫療5%不適用）"],
    officialApplyUrl: "https://www.hkbea.com/html/tc/bea-credit-card-world-mastercard.html",
    applyUrl: "https://www.hkbea.com/html/tc/bea-credit-card-world-mastercard.html",
    note: "💡 【推廣期至 2026/6/30】BEA 簽賬獎分計劃，指定類別享 12.5X 積分 = **5% 回贈**！\n\n| 指定類別 | 回贈率 |\n|:---|:---|\n| 外幣簽賬 | 5% (1.95%手續費) |\n| 本地食肆、酒類專賣店 | 5% |\n| 本地電器、電子產品商店 | 5% |\n| 本地運動服飾、健身中心、醫療服務 | 5% |\n\n⚠️ **門檻要求**：\n- 每月簽滿 $4,000 才享額外獎分\n- 需透過 **BEA Mall App** 登記\n- 每月指定類別上限簽 $10,000（回 115,000 額外獎分）\n\n❌ **不計回贈**：歐洲實體簽賬、超市、旅行社、政府部門、網上繳費\n\n💰 **Pay with Points**：用 25,000 分抵銷 $100 食肆/海外簽賬，計出 5% 回贈\n\n📅 2026年1月更新",
    promoEndDate: "2026-06-30",
    promoName: "BEA 簽賬獎分計劃",
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
    note: "💡 【推廣期延長至 2026/12/31】網上/手機支付/海外簽賬 10X 獎分 (4%)，每月回贈上限 $300 (即首 $8,333 簽賬享 4%)。本地食肆 5X (2%)。⚠️ 不計回贈：超市、旅行社、政府部門、電子錢包充值、保費、透過電子網絡繳款。八達通自動增值/政府部門簽賬每月上限 $40 回贈。\n\n🧧 **新春自主賞**（2026/1/2-2/28）：每階段簽滿 $8,000 可享額外 3.3% 回贈，疊加本卡最高 **7.3%**！首10,000名，需 BEA Mall App 登記。[查看詳情](/discover/bea-cny-2026)",
    promoEndDate: "2026-02-28",
    promoName: "新春自主賞",
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
    tags: ["JCB", "日本優惠", "Apple Pay 15%", "Google Pay 15%", "藥妝折扣", "機場貴賓室", "松本清3%", "大灣區航空8折", "機場星巴克", "OK便利店", "需登記"],
    welcomeOfferText: "迎新優惠請查詢官網",
    officialApplyUrl: "https://www.hkbea.com/html/tc/bea-jcb-platinum-card.html",
    applyUrl: "https://www.hkbea.com/html/tc/bea-jcb-platinum-card.html",
    sellingPoints: ["🔥Apple Pay/Google Pay 15% (月簽$500,上限$100)", "🔥OK便利店$30減$10 [可疊加]", "大灣區航空日本機票 8 折", "日本/夏威夷機場貴賓室"],
    note: "🧧 **新春自主賞**（2026/1/2-2/28）：每階段簽滿 $8,000 可享額外 3.3% 回贈！首10,000名，需 BEA Mall App 登記。[查看詳情](/discover/bea-cny-2026)\n\n---\n\n🔥 **Apple Pay / Google Pay 15% 現金回贈**（2025/10/15-2026/3/31）：\n- 需透過 BEA Mall App 登記，首 5,000 名\n- 本地及澳門實體店用手機支付（Apple Pay/Google Pay）或拍卡\n- 每月累積簽賬滿 $500 即享 15% 回贈\n- 每月最高回贈 $100（即每月 $667 簽賬封頂）\n- 整個推廣期最高 $600（階段1: $300 + 階段2: $300）\n\n---\n\n🏪 **OK 便利店 $30 減 $10**（2026 全年）：\n- 單一簽賬滿 $30 即減 $10（33% 折扣）\n- 每人每日限用一次，每月名額先到先得\n- **結賬前必須主動講「我要用 JCB 減 $10」**\n- 可疊加 15% 回贈：$30 → 實付 $20 → 回贈 $3 → 實際成本 $17（慳 43%）\n- ⚠️ 建議用實體卡拍卡，第三方支付平台可能不適用\n\n👉 [查看 OK 便利店優惠詳情](/discover/jcb-circlek-2026)\n\n---\n\n✈️ **大灣區航空日本機票 8 折**（至2026/1/31）：官網預訂日本來回機票，優惠碼「25JCBHKGPRO」，適用航點：東京、大阪、仙台、札幌。\n\n☕ **香港機場星巴克優惠**（至2026/1/31）：滿$90減$45！需出示登機證。\n\n🛒 **香港松本清 3% 折扣**（至2026/12/31）：需結賬前聲明使用JCB卡。\n\n✈️ **機場貴賓室**：日本及夏威夷機場貴賓室免費使用（至2026/3/31）\n\n❌ **不合資格簽賬**：網上簽賬、電子錢包增值（Alipay/PayMe/WeChat Pay）、八達通增值、稅務繳款、循環付款、儲值卡充值、指定售票網絡（Cityline/快達票等）。\n\n[查看 15% 回贈詳情](/discover/bea-jcb-contactless-2025)",
    promoEndDate: "2026-02-28",
    promoName: "新春自主賞",
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
      // 流動支付（Apple Pay/Google Pay）也是 2%，因為全方位回贈
      { description: "流動支付 2% (全方位)", matchType: "paymentMethod", matchValue: ["mobile", "apple_pay", "google_pay", "samsung_pay"], percentage: 2.0, cap: 1500, capType: "reward", capPeriod: "yearly", excludeCategories: ["ewallet"], excludePaymentMethods: ["octopus", "alipay", "wechat_pay", "payme"] },
      { description: "全方位 2%", matchType: "base", percentage: 2.0, cap: 1500, capType: "reward", capPeriod: "yearly", excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["octopus", "alipay", "wechat_pay", "payme"] },
      // T&C: 八達通自動增值只有 0.4%（不計入 2% 全方位），但 Apple Pay 手動增值 Smart Octopus 有 2%
      // mrmiles.hk 確認
      { description: "八達通自動增值 0.4%", matchType: "paymentMethod", matchValue: ["octopus"], percentage: 0.4 },
    ],
    tags: ["全方位2%", "懶人必備", "銀聯1%手續費", "八達通0.4%", "🔥中澳台日韓7%", "MoneyHero獨家"],
    welcomeOfferText: "簽$8,800送禮品 或 簽$8,500送$500回贈",
    officialApplyUrl: "https://www.primecredit.com/tc/credit-card/earnmore/",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=182&a=228&sub_id1=pickcardrebate&sub_id2=web&promo_id=earnmore-moneyhero-20260130",
    sellingPoints: ["🔥 MoneyHero獨家 $300 (簽$100)", "全方位 2% (年簽上限$150,000)", "🔥中澳台日韓 7% [需登記]", "銀聯外幣僅 1%", "Apple Pay 手動增值八達通 2%"],
    note: "## 🔥 MoneyHero 限時獨家優惠\n**優惠期：2025年12月31日中午12時至2026年1月30日下午6時**\n\n### 🎁 獨家優惠（共 $300）\n| 禮品 | 來源 |\n|:---|:---:|\n| HK$200 惠康購物現金券 | MoneyHero |\n| HK$100 現金回贈 | 安信信貸 |\n\n### 📋 申請條件\n1. ✅ 全新安信信用卡客戶（過去12個月內未持有主卡）\n2. ✅ 收到獎賞換領表格後 **7日內** 填妥及遞交\n3. ✅ 2026年2月28日或之前成功獲批\n4. ✅ 批卡成功後30日內簽賬滿 **$100** 🎉 超低門檻！\n\n---\n\n## 📌 銀行迎新優惠（2026/1/1-3/31）\n\n### 雙重獎賞\n1. **$100 現金回贈**（免簽賬）\n2. **迎新禮遇** 五選一：\n\n| 簽賬要求 | 迎新禮品 |\n|:---|:---|\n| $8,800 (90天內) | PHILIPS RO 純淨飲水機 (ADD6901) |\n| $8,800 (90天內) | Garmin Forerunner 165 GPS 智能手錶 |\n| $8,500 (90天內) | $500 現金回贈 |\n| $2,000（大專生）| $200 現金回贈 |\n| 無簽賬要求 | 高達 $90,000 免息免手續費現金分期套現計劃 |\n\n---\n\n## 🔥 中澳台日韓簽賬優惠（至 2026/6/30）\n中國內地、澳門、台灣、日本、韓國實體店當地貨幣簽賬：\n• 基本 2% + 額外 5% = **7%**（扣 1% 手續費後淨 6%）\n• 每張卡每月上限 $10,000\n• ⚠️ **需入 OmyCard App 登記！**\n\n---\n\n## 💳 全方位 2% 回贈\n⚠️ 2% = 1% 基本 + 1% 加碼（加碼上限 $1,500/年）\n\n📌 **八達通增值玩法**：\n• 八達通自動增值：只有 **0.4%**（不計入 2%）\n• Apple Pay 手動增值 Smart Octopus：有 **2%** 回贈！\n\n❌ **不適用**：電子錢包充值/繳費、P2P 轉賬、賭場交易\n\n📅 **2026年1月22日更新**",
    promoEndDate: "2026-01-30",
    promoName: "MoneyHero限時獨家優惠",
  },
  {
    id: "wewa-unionpay",
    name: "WeWa 銀聯鑽石卡",
    bank: "安信",
    cardNetwork: "unionpay",
    style: { bgColor: "bg-gradient-to-br from-yellow-300 to-yellow-500", textColor: "text-black" },
    // imageUrl from DB
    annualFee: 1500,
    feeWaiverCondition: "首兩年免年費，之後可致電 waive",
    minIncome: 240000, // 學生可申請
    foreignCurrencyFee: 1, // 2025/1/1 起銀聯卡外幣手續費 1%
    rules: [
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
    tags: ["玩樂4%", "旅遊", "海外", "線上娛樂", "八達通增值", "銀聯1%手續費", "🔥中澳台日韓9%", "學生可申請", "月簽$1500"],
    welcomeOfferText: "迎新簽$8,800送Marshall喇叭/LG顯示器 或 簽$8,500送$500回贈 (首90天，至2026/2/28)",
    officialApplyUrl: "https://www.primecredit.com/tc/credit-card/wewa/",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=180&a=228&sub_id1=pickcardrebate&sub_id2=web",
    sellingPoints: ["🔥中澳台日韓 9% [需登記]", "玩樂 4% (簽上限$5,000/月)", "回贈上限 $200/月", "🚨 需月簽滿$1,500先有4%回贈", "🎓 學生可申請"],
    note: "🔥 **中澳台日韓簽賬優惠**（即日起至 2026/6/30）：\n中國內地、澳門、台灣、日本、韓國實體店當地貨幣簽賬，每月累積滿 $500 享額外 **5%** 回贈！\n• 玩樂類別揀「海外」4% + 額外 5% = **9%**（扣 1% 手續費後淨 8%）\n• 每張卡每月上限 $10,000\n• ⚠️ **需入 OmyCard App 登記！**\n\n---\n\n## 🎁 迎新優惠（至2026/2/28）\n全新安信信用卡客戶（過往6個月未持有），批卡90日內簽滿合資格簽賬，四揀一：\n\n| 簽賬要求 | 迎新禮品 |\n|:---|:---|\n| $8,800 | Marshall Emberton II 便攜式藍芽喇叭 + $35 回贈 |\n| $8,800 | LG 27吋全高清IPS智能顯示器 + $35 回贈 |\n| $8,500 | $500 現金回贈 + $34 回贈 |\n| $2,000（大專生）| $200 現金回贈 + $8 回贈 |\n\n✅ 合資格簽賬包括八達通自動增值！\n\n---\n\n## 💡 玩樂類別 4 選 1（推廣期 2025/7/1-2026/6/30）\n\n| 類別 | 回贈率 | 備註 |\n|:---|:---|:---|\n| 手機支付 | 4% | Apple Pay/銀聯手機閃付/雲閃付 |\n| 旅遊 | 4% | 航空公司/酒店/旅行社 |\n| 海外 | 4% | 外幣簽賬（淨約 3%） |\n| 線上娛樂 | 4% | Netflix/Spotify/Steam 等 |\n\n⚠️ **門檻**：每月簽滿 $1,500 才享 4%\n⚠️ **上限**：每月回贈上限 $200（即首 $5,556 簽賬）\n⚠️ **選擇**：透過 OmyCard App 自選，未選擇自動選「手機支付」\n\n📌 **手機支付包括**：Apple Pay / 銀聯手機閃付 / 雲閃付（銀聯二維碼）\n📌 **線上娛樂包括**：App Store / Disney+ / Google Play / JOOX / KKBOX / MyTV SUPER / Netflix / Nintendo / Patreon / PlayStation / Spotify / Steam / Xbox / YouTube\n\n✅ 八達通自動增值計 0.4%（無上限）！\n❌ 玩樂4%不計：電子錢包充值/轉賬、分期、賭場、繳費\n⚠️ 銀聯外幣手續費 1%（2025/1/1起），海外淨回贈約 3%\n\n📅 **2026年1月7日更新**",
    promoEndDate: "2026-06-30",
    promoName: "中澳台日韓 9% 回贈",
  },
  {
    id: "wewa-visa-signature",
    name: "WeWa Visa Signature 卡",
    bank: "安信",
    cardNetwork: "visa",
    style: { bgColor: "bg-gradient-to-br from-yellow-400 to-amber-500", textColor: "text-black" },
    annualFee: 1500,
    feeWaiverCondition: "首兩年免年費，之後可致電 waive",
    minIncome: 240000, // 學生可申請
    foreignCurrencyFee: 1.95, // Visa 外幣手續費約 1.95%
    rules: [
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
    tags: ["玩樂4%", "旅遊", "海外", "線上娛樂", "八達通增值", "Visa Signature", "學生可申請", "月簽$1500", "MoneyHero獨家"],
    welcomeOfferText: "$100免簽賬回贈 + 簽$8,800送禮品",
    officialApplyUrl: "https://www.primecredit.com/tc/credit-card/wewa/",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=180&a=228&sub_id1=pickcardrebate&sub_id2=web&promo_id=wewa-visa-moneyhero-20260130",
    sellingPoints: ["玩樂 4% (簽上限$5,000/月)", "回贈上限 $200/月", "🚨 需月簽滿$1,500先有4%回贈", "🎓 學生可申請", "Visa Signature 禮遇"],
    featuredMerchants: [
      { name: "Netflix", rate: "4%", category: "娛樂" },
      { name: "Spotify", rate: "4%", category: "娛樂" },
      { name: "Steam", rate: "4%", category: "娛樂" },
      { name: "PlayStation", rate: "4%", category: "娛樂" },
    ],
    exclusions: ["電子錢包充值/轉賬", "分期付款", "賭場", "繳費", "Android 手機支付（僅 iOS 支援）"],
    note: "## 🔥 MoneyHero 限時獨家優惠\n**優惠期：2025年12月31日中午12時至2026年1月30日下午6時**\n\n### 🎁 獨家優惠（共 $300）\n| 禮品 | 來源 |\n|:---|:---:|\n| HK$200 惠康購物現金券 | MoneyHero |\n| HK$100 現金回贈 | 安信信貸 |\n\n### 📋 申請條件\n1. ✅ 全新安信信用卡客戶（過去12個月內未持有主卡）\n2. ✅ 收到獎賞換領表格後 **7日內** 填妥及遞交\n3. ✅ 2026年2月28日或之前成功獲批\n4. ✅ 批卡成功後30日內簽賬滿 **$100** 🎉 超低門檻！\n\n---\n\n## 📌 銀行迎新優惠（至2026/2/28）\n全新安信信用卡客戶，批卡90日內簽滿合資格簽賬：\n\n| 簽賬要求 | 迎新禮品 |\n|:---|:---|\n| $8,800 | LG 27吋全高清 IPS 智能顯示器 |\n| $8,800 | Marshall Emberton II 便攜式藍芽喇叭 |\n| $8,500 | $500 現金回贈 |\n| $2,000（大專生）| $200 現金回贈 |\n| 無簽賬要求 | 高達 $90,000 免息免手續費現金分期套現計劃 |\n\n---\n\n## 💡 玩樂類別 4 選 1（推廣期 2025/7/1-2026/6/30）\n\n| 類別 | 回贈率 | 備註 |\n|:---|:---|:---|\n| 手機支付 | 4% | Apple Pay（僅 iOS） |\n| 旅遊 | 4% | 航空公司/酒店/旅行社 |\n| 海外 | 4% | 外幣簽賬（淨約 2.05%） |\n| 線上娛樂 | 4% | Netflix/Spotify/Steam 等 |\n\n⚠️ **門檻**：每月簽滿 $1,500 才享 4%\n⚠️ **上限**：每月回贈上限 $200（即首 $5,556 簽賬）\n\n---\n\n## ⚠️ 注意事項\n- **手機支付僅支援 iOS 使用 Apple Pay**！Android 用戶無法使用此類別\n- 八達通自動增值計 0.4%（無上限）\n- Visa 外幣手續費約 1.95%\n\n📅 **2026年1月22日更新**",
    promoEndDate: "2026-01-30",
    promoName: "MoneyHero限時獨家優惠",
  },

  // ========================================================================
  // Dah Sing 大新
  // ========================================================================
  {
    id: "dahsing-one",
    name: "大新 ONE+ 信用卡",
    bank: "大新銀行",
    style: { bgColor: "bg-gradient-to-br from-purple-800 to-purple-950", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    rules: [
      { description: "全方位 1%", matchType: "base", percentage: 1.0, excludeCategories: ["tax", "utilities", "government", "insurance"] },
    ],
    tags: ["無腦1%", "現金回贈", "無上限", "MoneyHero獨家"],
    welcomeOfferText: "簽$6,800送$400回贈",
    sellingPoints: ["本地及外幣簽賬一律 1% 回贈", "無上限", "簡單易用無門檻"],
    officialApplyUrl: "https://www.dahsing.com/html/tc/credit_card/one_plus.html",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=604&a=228&sub_id1=pickcardrebate&sub_id2=web&promo_id=dahsing-one-moneyhero-20260127",
    note: "## 🔥 MoneyHero 限時獨家優惠\n**優惠期：2026年1月14日上午10時至1月27日下午6時**\n\n### 🎁 獨家禮品（4選1）\n| 禮品 | 價值 |\n|:---|:---:|\n| LOJEL Alto 29吋超輕量行李箱 | **$2,100** |\n| BRUNO BAK806 升級多功能熱湯豆漿機 | **$798** |\n| HK$700 Apple Store 禮品卡 | $700 |\n| HK$700 惠康超市現金券 | $700 |\n\n### 📋 申請條件\n1. ✅ 全新大新信用卡客戶\n2. ✅ 收到換領表格後 **7日內** 填妥及遞交\n3. ✅ 2026年2月28日或之前成功獲批\n4. ✅ 發卡後 **2個月內** 成功簽賬一次\n\n---\n\n## 📌 銀行迎新優惠\n首2個月內簽賬滿 **$5,000**（需5次交易）：\n- **$500 現金回贈**\n\n開立優易綜合理財戶口額外：\n- **$300 現金回贈**（需新存款 $30,000）\n\n---\n\n## 💳 回贈率\n- **所有簽賬 1% 無上限！**\n- 本地 / 海外 / 網上 均適用\n- 簡單易用，無需登記\n\n📅 **2026年1月22日更新**",
    promoEndDate: "2026-01-27",
    promoName: "MoneyHero限時獨家優惠",
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
      // T&C: 網上零售簽賬 5X 積分 (2%)，每曆年首 $75,000 簽賬（額外4倍上限 300,000 積分）
      { description: "網購 2% (5X積分)", matchType: "category", matchValue: ["online"], percentage: 2.0, cap: 75000, capType: "spending", capPeriod: "yearly", excludeCategories: ["ewallet", "insurance", "tax", "government", "utilities"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: Visa 感應式付款 5X 積分 (2%)，每曆年首 $75,000 簽賬（與網購共用上限）
      { description: "Visa payWave 拍卡 2% (5X積分)", matchType: "paymentMethod", matchValue: ["contactless", "apple_pay", "google_pay", "samsung_pay"], percentage: 2.0, cap: 75000, capType: "spending", capPeriod: "yearly", excludeCategories: ["ewallet", "insurance", "tax", "government", "utilities"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // T&C: 八達通自動增值 0.4%
      { description: "八達通自動增值 0.4%", matchType: "paymentMethod", matchValue: ["octopus"], percentage: 0.4 },
      // T&C: 網上理財繳費 0.4%
      { description: "網上理財繳費 0.4%", matchType: "category", matchValue: ["utilities"], percentage: 0.4 },
      // 基本回贈 0.4%
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
      
      // ========== 加碼賞 (需登記，每月首2,500名) ==========
      // T&C 2026/1-3月: 本地餐飲/外賣 9% (月簽≥$5,000 + 單筆≥$300)，每階段上限 $400
      { description: "🔥本地餐飲 +9% [需登記,月簽≥$5,000,單筆≥$300]", matchType: "category", matchValue: ["dining"], percentage: 9.0, monthlyMinSpend: 5000, minSpend: 300, cap: 400, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"], validDateRange: { start: "2026-01-01", end: "2026-03-31" }, requiresRegistration: true },
      // T&C 2026/1-3月: 本地餐飲/外賣 2% (月簽<$5,000 或 單筆<$300)，每階段上限 $100
      { description: "本地餐飲 +2% [需登記,月簽<$5,000或單筆<$300]", matchType: "category", matchValue: ["dining"], percentage: 2.0, cap: 100, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"], validDateRange: { start: "2026-01-01", end: "2026-03-31" }, requiresRegistration: true },
      // T&C 2026/1-3月: 本地交通 2% (港鐵/專營巴士/專營渡輪/電車)，每階段上限 $100
      { description: "本地交通 +2% [需登記]", matchType: "category", matchValue: ["transport"], percentage: 2.0, cap: 100, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"], validDateRange: { start: "2026-01-01", end: "2026-03-31" }, requiresRegistration: true },
    ],
    tags: ["網購2%", "拍卡2%", "八達通0.4%", "永久免年費", "餐飲高達11%"],
    welcomeOfferText: "迎新簽 $6,000 送 $600 (首2個月) 或 Chill分期$15,000送$800 (首3個月，至2026/2/28)",
    officialApplyUrl: "https://www.asia.ccb.com/hongkong_tc/personal/credit_cards/eye_card.html",
    applyUrl: "https://www.asia.ccb.com/hongkong/personal/credit-cards/eye-card.html",
    sellingPoints: ["網購/payWave 2% (年簽上限$75,000)", "🔥餐飲 11% (月簽上限$4,444)", "回贈上限 $400/階段", "永久免年費"],
    note: "## 📌 基本回贈（無需登記）\n\n| 類別 | 回贈率 | 上限 |\n|:---|:---:|:---:|\n| 網購/Visa payWave 拍卡 | **2%** (5X積分) | 每年 $75,000 |\n| 八達通自動增值 | 0.4% | 無上限 |\n| 網上理財繳費 | 0.4% | 無上限 |\n| 其他簽賬 | 0.4% | 無上限 |\n\n---\n\n## 🔥 加碼賞（需每月登記，首2,500名）\n**推廣期：2026/1/1 - 3/31**（分3個階段）\n\n| 類別 | 條件 | 額外回贈 | 上限/階段 |\n|:---|:---|:---:|:---:|\n| 本地餐飲/外賣 | 月簽≥$5,000 + 單筆≥$300 | **+9%** | $400 |\n| 本地餐飲/外賣 | 月簽<$5,000 或 單筆<$300 | +2% | $100 |\n| 本地交通 | 無門檻 | +2% | $100 |\n\n**每階段合共上限：$400**\n\n### 💡 11% 計法\n基本 2%（拍卡/網購）+ 加碼賞 9% = **11%**\n\n### 📱 登記方法\n建行（港澳）手機 App → 信用卡/貸款 → 精選優惠 → 登記獎賞\n\n### ⚠️ 注意事項\n- 每階段登記期：每月首日 10:00 至 尾日 23:59\n- 名額先到先得，每月 2,500 名\n- 回贈將於 2026/4/30 或之前入賬\n\n### 🚌 本地交通包括\n港鐵、城巴、九巴、龍運巴士、新渡輪、天星小輪、港九小輪、電車\n\n---\n\n## 🎁 迎新優惠（至 2026/2/28）\n**全新客戶（過往6個月未持有建行亞洲信用卡主卡）**\n\n| 選項 | 條件 | 獎賞 |\n|:---|:---|:---|\n| 禮品1 | 首3個月 Chill分期 ≥$15,000 | **$800** |\n| 禮品2 | 首2個月簽滿 $6,000 | **$600** |\n\n⚠️ 迎新不計：電子錢包轉賬、八達通自動增值\n\n---\n\n## ❌ 不計回贈\n電子錢包（AlipayHK/PayMe/WeChat Pay）增值/轉賬、八達通自動增值（加碼賞）、酒店/百貨/會所內餐飲、保險、RentSmart、稅項、賭博。\n\n📅 **2026年1月7日更新**",
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
      // ⚠️ 2026/3/16起條款大幅收緊
      { description: "本地/海外簽賬 1.5%", matchType: "base", percentage: 1.5, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet", "cinema", "parking", "gas", "transport"] },
    ],
    tags: ["星座卡", "高回贈", "飛行里數"],
    welcomeOfferText: "迎新簽 $3,000 送 $700 免找數簽賬額 (首2個月內)",
    officialApplyUrl: "https://www.icbcasia.com/tc/personal/cards/credit-cards/horoscope-visa-signature-card/",
    applyUrl: "https://www.icbcasia.com/tc/personal/cards/credit-cards/horoscope-visa-signature-card/",
    sellingPoints: ["本地及海外簽賬 1.5% 現金回贈", "自選星座設計", "積分可換國航/港航里數"],
    exclusions: [
      "電影院🚨", "停車場🚨", "汽車租賃🚨", "入油🚨", "電子遊戲場🚨",
      "本地超市/便利店(降至0.5%)", "本地餐廳/麵包店(降至0.5%)",
      "電子錢包(Alipay/PayMe/WeChat/Tap&Go)", "八達通增值",
      "保險", "證券/金融機構", "繳費", "通訊費", "會費",
    ],
    note: "🚨 **2026/3/16起條款大幅收緊！**\n\n**❌ 無回贈**：電影院、停車場、汽車租賃、入油、交通、電子遊戲場、金融機構、通訊費、會費、慈善機構\n\n**📉 降至0.5%**：本地超市/便利店/雜貨店、餐廳/麵包店/糕餅店、物業、汽車、批發、醫院、學費\n\n💡 建議補底卡：Simply Cash(1.5%) 或 EarnMORE(2%)\n\n---\n\n每 $1 = 1 分。可換國航里數 (8分=1公里) 或港航里數 (10分=1金鵬里數)。積分有效期最少 1 年。迎新：首2個月簽 $3,000 送 $700 免找數簽賬額。發卡後 12 個月內取消卡將被扣除迎新等值金額。",
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
    annualFee: 0,
    feeWaiverCondition: "永久免年費",
    rules: [
      // T&C 2026/1/1-2026/6/30: 食肆及網上簽賬 6%，需每月累積簽滿 $3,800，額外回贈上限 $200
      // 6% = 基本 0.55% + 額外 5.45%
      // 額外回贈上限 $200 = $200 / 5.45% = $3,670 簽賬
      // ⚠️ 下限 ($3,800) 高過上限 ($3,670)！
      // 不包括：酒店餐飲、美食廣場/超市/百貨公司內食肆、麵包房、糕點商店
      // 網上不包括：超級市場網上平台
      { description: "食肆 6% [月簽$3,800]", matchType: "category", matchValue: ["dining"], percentage: 6.0, monthlyMinSpend: 3800, cap: 200, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus", "fps"], validDateRange: { start: "2026-01-01", end: "2026-06-30" } },
      { description: "網上簽賬 6% [月簽$3,800]", matchType: "category", matchValue: ["online"], percentage: 6.0, monthlyMinSpend: 3800, cap: 200, capType: "reward", excludeCategories: ["ewallet", "supermarket"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus", "fps"], validDateRange: { start: "2026-01-01", end: "2026-06-30" } },
      // T&C: 基本回贈 0.55%，排除電子錢包、八達通、繳費等
      { description: "基本回饋 0.55%", matchType: "base", percentage: 0.55, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["octopus", "alipay", "wechat_pay", "payme", "fps"] },
    ],
    tags: ["餐飲6%", "網購6%", "月簽$3800", "永久免年費", "MoneyHero獨家"],
    welcomeOfferText: "外幣簽賬10%回贈（上限$1,000）或 簽滿$6,000送$600現金回贈",
    sellingPoints: ["食肆/網上 6% (簽上限$3,670/月)", "回贈上限 $200/月", "🚨 需月簽滿$3,800先有6%（但上限只有$3,670！）", "永久免年費", "🔥 MoneyHero獨家禮品高達$5,980"],
    featuredMerchants: [
      { name: "譚仔", rate: "6%", category: "餐飲" },
      { name: "大家樂", rate: "6%", category: "餐飲" },
      { name: "Amazon", rate: "6%", category: "網購" },
      { name: "HKTVmall", rate: "6%", category: "網購" },
    ],
    exclusions: ["酒店餐飲", "美食廣場/超市/百貨公司內食肆", "麵包房/糕點商店", "超市網上平台", "電子錢包", "八達通增值"],
    note: "## 🔥 MoneyHero 限時獨家優惠\n**優惠期：2026年1月15日下午6時至1月26日下午6時**\n\n### 🎁 獨家禮品（7選1）\n| 禮品 | 價值 |\n|:---|:---:|\n| Dyson Zone™ 降噪耳機 | **$5,980** |\n| LG AS35GGW20 PuriCare™ 空氣清新機 (寵物版) | **$3,690** |\n| Philips 輕量強效無線吸塵機 XC2011/61 | **$2,498** |\n| 14,000 Max Miles 飛行里數 | ~$1,400 |\n| HK$1,300 Apple Store 禮品卡 | $1,300 |\n| HK$1,300 惠康購物現金券 | $1,300 |\n| HK$1,100 現金回贈 (轉數快) | $1,100 |\n\n### 📋 申請條件\n1. ✅ 全新信銀國際信用卡客戶（過去12個月內未持有主卡）\n2. ✅ 收到獎賞換領表格後 **7日內** 填妥及遞交\n3. ✅ 2026年2月28日或之前成功獲批\n4. ✅ 批卡後30日內簽賬滿 **$100**\n\n---\n\n## 📌 銀行迎新優惠（2選1）\n**推廣期：即日至 2026/6/30**\n\n| 選項 | 內容 |\n|:---|:---|\n| 🌍 外幣回贈 | 首3個月外幣簽賬（含人民幣）**10%** 回贈，上限 $1,000 |\n| 💵 現金回贈 | 首2個月簽滿 $6,000 送 **$600** 現金回贈 |\n\n---\n\n## 🚨 重要提示：簽賬門檻高過上限！\n簽賬門檻 $3,800 > 簽賬上限 $3,670\n最後 $130 只有 0.55% 基本回贈\n\n📅 **2026年1月22日更新**",
    officialApplyUrl: "https://www.cncbinternational.com/personal/credit-card/motion/tc/index.html",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=178&a=228&sub_id1=pickcardrebate&sub_id2=web",
    promoEndDate: "2026-01-26",
    promoName: "MoneyHero限時獨家優惠",
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
    tags: ["香港航空", "FWC積分", "貴賓室", "海外$4/FWC", "MoneyHero獨家"],
    welcomeOfferText: "外幣簽賬10%回贈（上限$1,000）或 簽滿$6,000送$600現金回贈",
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
    note: "## 🔥 MoneyHero 限時獨家優惠\n**優惠期：2026年1月15日下午6時至1月26日下午6時**\n\n### 🎁 獨家禮品（7選1）\n| 禮品 | 價值 |\n|:---|:---:|\n| Dyson Zone™ 降噪耳機 | **$5,980** |\n| LG PuriCare™ 空氣清新機 (寵物版) | **$3,690** |\n| Philips 無線吸塵機 | **$2,498** |\n| 14,000 Max Miles | ~$1,400 |\n| HK$1,300 Apple Store 禮品卡 | $1,300 |\n| HK$1,300 惠康購物現金券 | $1,300 |\n| HK$1,100 現金回贈 | $1,100 |\n\n### 📋 申請條件\n- ✅ 全新信銀國際信用卡客戶\n- ✅ 2026/2/28前獲批\n- ✅ 批卡後30日內簽滿 **$100**\n\n---\n\n💡 **香港航空專屬禮遇**！\n- 免費 2 張香港航空機場貴賓室禮券\n- 5折 FWC 積分兌換獎勵機票\n\n📅 **2026年1月22日更新**",
    promoEndDate: "2026-01-26",
    promoName: "MoneyHero限時獨家優惠",
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
    sellingPoints: ["🌏 新台幣簽賬 8% (20X)", "🇯🇵🇰🇷 日韓簽賬 4% (10X)", "其他外幣 2%", "本地網上 4% [需登記]", "八達通自動增值 0.4%"],
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
    note: "💳 **支付寶（內地錢包）優惠**（至2026/6/30）：每月累積滿HK$300回贈HK$15，最多6次共HK$90！[查看詳情](/discover/ae-alipay-mainland-2026)\n\n⛴️ **天星小輪 $1 優惠**（至2025/12/31）：在閘機按「Amex $1」鍵再拍卡即可！\n\n⚠️ 部分商戶不接受美國運通。",
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
    tags: ["機場貴賓室", "旅遊保險", "禮賓服務", "天星小輪$1", "MoneyHero獨家"],
    welcomeOfferText: "簽$10,000享高達24,000里迎新獎賞",
    officialApplyUrl: "https://www.americanexpress.com/hk/zh/credit-cards/platinum-card/",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=500&a=228&sub_id1=pickcardrebate&sub_id2=web&promo_id=amex-platinum-moneyhero-20260130",
    sellingPoints: ["無限次免費進入全球機場貴賓室", "免費旅遊保險", "24小時禮賓服務", "⛴️天星小輪$1優惠"],
    note: "## 🔥 MoneyHero 限時獨家優惠\n**優惠期：2026年1月14日下午6時至1月30日下午6時**\n\n### 🎁 獨家禮品（6選1）\n| 禮品 | 價值 |\n|:---|:---:|\n| LG 43吋 QNED 4K QNED80 智能電視 | **$5,480** |\n| Bambu Lab P2S 3D Printer 單機 (國際版) | **$4,999** |\n| Dyson PencilVac Fluffycones 無線吸塵機 | **$4,990** |\n| HK$4,500 Apple Store 禮品卡 | $4,500 |\n| HK$4,500 HKTVmall電子購物禮券 | $4,500 |\n| HK$4,500 現金回贈 (轉數快) | $4,500 |\n\n### 📋 申請條件\n1. ✅ 全新美國運通白金卡客戶\n2. ✅ 收到換領表格後 **7日內** 填妥及遞交\n3. ✅ 2026年2月28日或之前成功獲批\n4. ✅ 發卡後 **2個月內** 簽賬滿 **$15,000** + 已清繳年費\n\n⚠️ **注意**：領取 MoneyHero 獨家優惠**不能同時獲取**銀行迎新優惠！\n\n---\n\n## 💎 高端禮遇\n- ✈️ **無限次** Priority Pass 全球機場貴賓室\n- 🛡️ **免費旅遊保險**\n- 🎩 **24小時禮賓服務**\n- ⛴️ **天星小輪 $1 優惠**\n\n💳 **支付寶（內地錢包）優惠**（至2026/6/30）：[查看詳情](/discover/ae-alipay-mainland-2026)\n\n📅 **2026年1月22日更新**",
    promoEndDate: "2026-01-30",
    promoName: "MoneyHero限時獨家優惠",
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
    note: "💳 **支付寶（內地錢包）優惠**（至2026/6/30）：每月累積滿HK$300回贈HK$15，最多6次共HK$90！[查看詳情](/discover/ae-alipay-mainland-2026)\n\n💰 **永久免年費**的 Amex 現金回贈卡！超市及 HKTVmall 簽賬可享 2% 回贈，其他本地零售 1.2%。\n\n⛴️ **天星小輪 $1 優惠**（至2025/12/31）：在閘機按「Amex $1」鍵再拍卡即可！\n\n⚠️ 部分商戶不接受美國運通。",
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
    style: { bgColor: "bg-gradient-to-br from-yellow-400 to-amber-500", textColor: "text-gray-900" }, // 黃色基本版
    annualFee: 800,
    feeWaiverCondition: "首年免年費",
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 1, currency: 'Cashback' },
    rules: [
      // ========== 網上簽賬 8% (需月簽非網上$1,000 + 單筆$500) ==========
      // T&C: 於相同曆月內累積合資格非網上零售簽賬滿$1,000，單筆滿$500之網上零售簽賬可享8%
      { description: "網購 8% [需月簽非網上$1,000+單筆$500]", matchType: "category", matchValue: "online", percentage: 8.0, minSpend: 500, monthlyMinSpend: 1000, isPhysicalStore: true, cap: 200, capType: "reward", validDateRange: { start: "2025-11-01", end: "2026-01-31" }, excludeCategories: ["ewallet", "utilities", "insurance", "government", "tax"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // ========== 指定本地公共交通 8% (sim Credit Card 限定) ==========
      // T&C: 城巴、九巴、龍運、港鐵（拍卡出入閘）、電車、天星小輪
      { description: "交通 8% [港鐵/巴士/電車/天星小輪]", matchType: "merchant", matchValue: ["mtr", "kmb", "citybus", "lwb", "tram", "starferry"], percentage: 8.0, monthlyMinSpend: 1000, isPhysicalStore: true, cap: 200, capType: "reward", validDateRange: { start: "2025-11-01", end: "2026-01-31" }, excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // ========== 指定商戶 3% ==========
      // T&C: Adidas、@cosme STORE、Fila、PUMA、松本清香港、東京生活館
      { description: "指定商戶 3% [Adidas/PUMA/松本清等]", matchType: "merchant", matchValue: ["adidas", "cosme_store", "fila", "puma", "matsumoto_kiyoshi", "tokyo_lifestyle"], percentage: 3.0, validDateRange: { start: "2025-11-01", end: "2026-01-31" }, excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // ========== 基本回贈 0.4% ==========
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
    ],
    tags: ["網購8%", "交通8%", "學生可申請", "需月簽$1,000", "MoneyHero獨家"],
    welcomeOfferText: "簽$4,000送$200回贈/禮品卡 或 簽$8,000送Canon打印機($1,080)",
    sellingPoints: ["🔥 網購 8% (簽上限$2,500/月)", "🚌 交通 8% (港鐵/巴士/電車)", "🚨 需月簽非網上$1,000+單筆$500先有8%", "👨‍🎓 學生可申請", "回贈上限 $200/月"],
    featuredMerchants: [
      { name: "Adidas", rate: "3%", category: "運動" },
      { name: "PUMA", rate: "3%", category: "運動" },
      { name: "松本清", rate: "3%", category: "藥妝" },
    ],
    exclusions: ["電子錢包", "八達通增值", "繳費", "保險", "政府服務"],
    note: "## 🔥 MoneyHero 限時獨家優惠\n**優惠期：2026年1月19日下午6時至1月31日下午11時59分**\n\n### 🎁 獨家優惠1️⃣（無需簽賬）\n選擇「6個月免息免手續費現金套現分期計劃」作爲迎新，可獲：\n\n| 禮品 | 價值 |\n|:---|:---:|\n| LOJEL Alto 29吋行李箱 | **$2,100** |\n| NESCAFÉ Dolce Gusto 咖啡機+6盒膠囊 | **$1,780** |\n| Marshall Emberton II 藍牙喇叭 | **$1,499** |\n| 10,000 Max Miles 飛行里數 | ~$1,000 |\n| HK$1,000 Apple Store 禮品卡 | $1,000 |\n| HK$1,000 惠康購物現金券 | $1,000 |\n| HK$800 現金回贈 (轉數快) | $800 |\n\n### 🎁 獨家優惠2️⃣（簽賬$100）\n批卡後30日內簽滿 **$100**，可獲同樣禮品！\n\n---\n\n## 📌 銀行迎新優惠（至 2026/1/31）\n**90日內簽滿 $4,000**：\n- $200 現金回贈 / $200 Apple禮品卡 / $500 Netflix禮品卡\n- 或：簽滿 $8,000 送 Canon SELPHY QX20 打印機 ($1,080)\n\n---\n\n## 🚌 交通 8% / 🌐 網購 8%\n- 需月簽非網上 $1,000 + 單筆 $500\n- 月回贈上限 $200\n\n📅 **2026年1月22日更新**",
    officialApplyUrl: "https://www.uafl.com.hk/tc/sim-credit-card/",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=503&a=228&sub_id1=pickcardrebate&sub_id2=web",
    promoEndDate: "2026-01-31",
    promoName: "MoneyHero限時獨家優惠",
  },
  {
    id: "sim-world-mastercard",
    name: "sim World Mastercard",
    bank: "亞洲聯合財務",
    style: { bgColor: "bg-gradient-to-br from-purple-700 to-purple-950", textColor: "text-white" }, // 紫色高級版
    annualFee: 1800,
    minIncome: 150000,
    feeWaiverCondition: "首年免年費",
    foreignCurrencyFee: 1.95,
    rewardConfig: { method: 'conversion', ratio: 1, currency: 'Cashback' },
    rules: [
      // ========== 網上簽賬 8% (需月簽非網上$1,000 + 單筆$500) ==========
      // T&C: 於相同曆月內累積合資格非網上零售簽賬滿$1,000，單筆滿$500之網上零售簽賬可享8%
      { description: "網購 8% [需月簽非網上$1,000+單筆$500]", matchType: "category", matchValue: "online", percentage: 8.0, minSpend: 500, monthlyMinSpend: 1000, isPhysicalStore: true, cap: 200, capType: "reward", validDateRange: { start: "2025-11-01", end: "2026-01-31" }, excludeCategories: ["ewallet", "utilities", "insurance", "government", "tax"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // ========== 海外非網上零售簽賬 8% (sim World 限定) ==========
      // T&C: 外幣簽賬之香港境外零售簽賬（網上海外簽賬視為網購）
      { description: "海外實體店 8% [需月簽非網上$1,000]", matchType: "base", percentage: 8.0, isForeignCurrency: true, isPhysicalStore: true, monthlyMinSpend: 1000, cap: 200, capType: "reward", validDateRange: { start: "2025-11-01", end: "2026-01-31" }, excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // ========== 指定商戶 3% ==========
      // T&C: Adidas、@cosme STORE、Fila、PUMA、松本清香港、東京生活館
      { description: "指定商戶 3% [Adidas/PUMA/松本清等]", matchType: "merchant", matchValue: ["adidas", "cosme_store", "fila", "puma", "matsumoto_kiyoshi", "tokyo_lifestyle"], percentage: 3.0, validDateRange: { start: "2025-11-01", end: "2026-01-31" }, excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      // ========== 基本回贈 0.4% ==========
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
    ],
    tags: ["網購8%", "海外8%", "需月簽$1,000", "MoneyHero獨家"],
    welcomeOfferText: "簽$4,000送$200回贈/禮品卡 或 簽$8,000送Canon打印機($1,080)",
    sellingPoints: ["🔥 網購 8% (簽上限$2,500/月)", "✈️ 海外實體店 8%", "🚨 需月簽非網上$1,000+單筆$500先有8%", "回贈上限 $200/月"],
    featuredMerchants: [
      { name: "Adidas", rate: "3%", category: "運動" },
      { name: "PUMA", rate: "3%", category: "運動" },
      { name: "松本清", rate: "3%", category: "藥妝" },
    ],
    exclusions: ["電子錢包", "八達通增值", "繳費", "保險", "政府服務"],
    note: "## 📌 sim World Mastercard 高級版（紫色）\n**推廣期：2025/11/1 至 2026/1/31**\n\n### 🌐 網上簽賬 8%\n| 項目 | 詳情 |\n|:---|:---|\n| 回贈率 | **8%** |\n| 簽賬門檻 | 月簽非網上 $1,000 |\n| 單筆門檻 | **$500** |\n| 月回贈上限 | **$200**（以8%計算即$2,500）|\n\n### ✈️ 海外實體店簽賬 8%\n| 項目 | 詳情 |\n|:---|:---|\n| 回贈率 | **8%** |\n| 簽賬門檻 | 月簽非網上 $1,000 |\n| 適用範圍 | 外幣簽賬之香港境外實體零售 |\n| 外幣手續費 | 1.95% |\n\n💡 **旅行玩法**：去旅行簽海外實體店，順便達成「非網上$1,000」門檻！\n\n⚠️ 網上海外簽賬視為「網購」，不是「海外簽賬」\n\n### 🏪 指定商戶 3%\nAdidas、@cosme STORE、Fila、PUMA、松本清香港、東京生活館\n\n---\n\n## 🎁 迎新優惠（至 2026/1/31）\n**全新客戶**：90日內簽滿 $8,000，可獲以下其中一項：\n- **$700 現金回贈**\n- $700 Apple 禮品卡\n- Canon SELPHY QX20 流動無線相片打印機（價值$1,219）\n\n📱 **App 額外迎新**：申請後3小時內下載 sim Credit App 並完成身份驗證，額外 **$50 現金回贈**\n\n⚠️ 新客：12個月內未持有/取消 sim 信用卡 + 24個月內未使用 sim 貸款\n\n---\n\n## ⚠️ 重要提示\n- 每月回贈上限：**$200**\n- 整個優惠期上限：**$600**（3個月）\n- CBF 手續費：**1.95%**\n- 外幣手續費：**1.95%**\n- 年薪要求：**$150,000**\n- ❌ 不適用：電子錢包、八達通增值、繳費、保險、政府\n\n---\n\n## 💡 vs 基本版 sim Credit Card\n| 項目 | World | 基本版 |\n|:---|:---:|:---:|\n| 網購 8% | ✅ | ✅ |\n| 海外實體店 8% | ✅ | ❌ |\n| 交通 8% | ❌ | ✅ |\n| 年薪要求 | $150,000 | 無（學生可申請）|\n| 年費 | $1,800 | $800 |\n\n📅 **2026年1月7日更新**",
    officialApplyUrl: "https://www.uafl.com.hk/tc/sim-world-mastercard/",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=504&a=228&sub_id1=pickcardrebate&sub_id2=web",
    promoEndDate: "2026-01-31",
    promoName: "MoneyHero限時獨家優惠",
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
    tags: ["八達通", "交通15%", "需登記", "MoneyHero獨家"],
    welcomeOfferText: "簽$10,000享高達$2,600迎新獎賞",
    officialApplyUrl: "https://www.citibank.com.hk/zh-hk/credit-cards/citi-octopus-card.html",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=166&a=228&sub_id1=pickcardrebate&sub_id2=web",
    sellingPoints: ["🔥 交通 15% 回贈 (限時至2026/3/31)", "內置八達通功能", "隧道/泊車 5% (月簽$10,000)"],
    note: "## 🔥 MoneyHero 限時獨家優惠\n**優惠期：2026年1月19日中午12時至1月26日下午6時**\n\n### 🎁 獨家禮品（7選1）\n| 禮品 | 價值 |\n|:---|:---:|\n| PHILIPS 飛利浦 ADD6920 RO 純淨飲水機 | **$4,288** |\n| Dyson Supersonic Nural™ 風筒 HD16 | **$3,980** |\n| LOJEL Cubo 30吋行李箱 | **$3,700** |\n| Harman Kardon AURA Studio 5 藍芽喇叭 | **$2,599** |\n| HK$2,200 Apple Store 禮品卡 | $2,200 |\n| HK$2,200 惠康購物現金券 | $2,200 |\n| 22,000 Max Miles 飛行里數 | ~$2,200 |\n\n### 📋 申請條件\n1. ✅ Citi 新客戶（過去12個月內未持有Citi信用卡主卡）\n2. ✅ 2026年2月28日或之前成功批核並啟動\n3. ✅ 批卡後30日內累積簽賬滿 **$4,000**\n\n---\n\n⚠️ 【限時推廣 2025/10/1-2026/3/31】交通 15% 回贈需登記 (citibank.hk/transreg)，月簽滿 $4,000 可獲 15% 車費回贈 (上限$300)；月簽滿 $10,000 可額外獲 5% 隧道/泊車/電車充電回贈 (合共上限$500)。\n\n📅 **2026年1月22日更新**",
    promoEndDate: "2026-01-26",
    promoName: "MoneyHero限時獨家優惠",
  },
  {
    id: "ccb-travo",
    name: "建行(亞洲) TRAVO Mastercard",
    bank: "建行(亞洲)",
    style: { bgColor: "bg-gradient-to-br from-sky-600 to-blue-800", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    annualFee: 0,
    feeWaiverCondition: "永久免年費",
    minIncome: 240000,
    rewardConfig: { method: 'conversion', ratio: 250, currency: 'Points' }, // 25,000 積分 = $100 (0.4%)
    rules: [
      // T&C 2026/1/1-6/30: TRAVO Rewards 海外迪士尼/環球影城 15% (每半年上限 $1,000)
      { description: "海外迪士尼/環球影城 15% [需登記]", matchType: "merchant", matchValue: ["disney", "universal_studios"], percentage: 15.0, cap: 1000, capType: "spending", capPeriod: "semiannual", isForeignCurrency: true, excludePaymentMethods: ["alipay", "payme", "wechat_pay", "octopus"] },
      // T&C 2026/1/1-6/30: TRAVO Rewards 海外簽賬 10X積分 = 4% (每半年上限 $25,000)
      { description: "海外簽賬 4% [需登記]", matchType: "base", percentage: 4.0, isForeignCurrency: true, cap: 25000, capType: "spending", capPeriod: "semiannual", excludePaymentMethods: ["alipay", "payme", "wechat_pay", "octopus"] },
      // T&C 2026/1/1-6/30: TRAVO Rewards 本地餐飲 5X積分 = 2% (每半年上限 $12,500)
      { description: "本地餐飲 2% [需登記]", matchType: "category", matchValue: ["dining"], percentage: 2.0, cap: 12500, capType: "spending", capPeriod: "semiannual", excludePaymentMethods: ["alipay", "payme", "wechat_pay", "octopus"] },
      // 八達通自動增值 0.4%
      { description: "八達通自動增值 0.4%", matchType: "paymentMethod", matchValue: ["octopus"], percentage: 0.4 },
      // 網上繳費 0.4%
      { description: "網上繳費 0.4%", matchType: "category", matchValue: ["utilities"], percentage: 0.4 },
      // 基本回饋 0.4%
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "payme", "wechat_pay"] },
    ],
    tags: ["🔥海外4%", "餐飲2%", "迪士尼15%", "永久免年費", "需登記"],
    welcomeOfferText: "迎新簽 $6,000 送 $600 現金回贈 (首2個月內，至2026/1/31)",
    officialApplyUrl: "https://www.asia.ccb.com/hongkong/personal/credit-cards/travo-mastercard.html",
    applyUrl: "https://www.asia.ccb.com/hongkong/personal/credit-cards/travo-mastercard.html",
    sellingPoints: ["🔥 海外 4% (半年簽上限$25,000)", "餐飲 2% (半年簽上限$12,500)", "🎢 迪士尼/環球影城 15%", "永久免年費", "無簽賬門檻"],
    featuredMerchants: [
      { name: "迪士尼樂園", rate: "15%", category: "娛樂" },
      { name: "環球影城", rate: "15%", category: "娛樂" },
    ],
    exclusions: ["電子錢包增值/轉賬", "保險", "稅項", "賭博", "酒席宴會", "酒店/百貨公司/俱樂部內食肆"],
    note: "## 📌 TRAVO Rewards 計劃\n**推廣期：2026/1/1 - 2026/6/30**\n\n### 🌏 海外零售簽賬獎賞\n| 項目 | 詳情 |\n|:---|:---|\n| 積分倍數 | **10X** (4% 或 $1.5/里) |\n| 每半年上限 | **$25,000** |\n| 簽賬下限 | **無** |\n\n### 🍽️ 本地餐飲獎賞\n| 項目 | 詳情 |\n|:---|:---|\n| 積分倍數 | **5X** (2% 或 $3/里) |\n| 每半年上限 | **$12,500** |\n\n### 🎢 海外迪士尼/環球影城\n| 項目 | 詳情 |\n|:---|:---|\n| 回贈率 | **15%** |\n| 每半年上限 | **$1,000** |\n| 適用範圍 | 包括官網購買門票 |\n\n---\n\n## 🎁 積分預領獎賞\n- **換領期**：2026/2/1 - 5/31\n- **預領上限**：450,000 積分\n- **清還期**：同年 6/30 前\n- **未清還罰款**：每 100 分 = $1.2\n\n---\n\n## ⚠️ 注意事項\n- 需於網上銀行或手機銀行登記 TRAVO Rewards\n- 外幣手續費 1.95%，海外淨回贈約 **2.05%**\n- 積分有效期最長 **2 年**\n- 換分最少 25,000 分 = $100\n- 換里數有手續費\n\n## ❌ 不計簽賬\n- 電子錢包增值/轉賬（微信/支付寶/PayMe）\n- 保險、稅項、賭博\n- 餐飲：酒席宴會、酒店/百貨公司/俱樂部內食肆\n\n---\n\n## 🎁 迎新優惠（至2026/1/31）\n- 全新客戶批卡後首 2 個月簽滿 $6,000 → **$600 回贈**\n- 不包括電子錢包轉賬及八達通自動增值\n\n📅 **2026年1月7日更新**",
    promoEndDate: "2026-06-30",
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
    tags: ["油站4%", "汽車", "易通行", "車主專享", "冬日狂賞", "MoneyHero獨家"],
    welcomeOfferText: "簽$4,000+易通行送$500回贈",
    officialApplyUrl: "https://www.dahsing.com/html/tc/credit_card/myauto/",
    applyUrl: "https://apply.creatory.moneyhero.com.hk/click?o=604&a=228&sub_id1=pickcardrebate&sub_id2=web&promo_id=dahsing-myauto-moneyhero-20260130",
    sellingPoints: ["🔥 MoneyHero獨家 $400 禮品 (無需簽賬)", "油站簽賬 4% 回贈", "汽車相關消費 4% (維修/泊車/充電)", "易通行隧道費 4%", "專為車主而設"],
    note: "## 🔥 MoneyHero 限時獨家優惠\n**優惠期：即日至 2026年1月30日下午6時**\n\n### 🎁 獨家禮品（2選1）\n| 禮品 | 價值 |\n|:---|:---:|\n| Apple Store 禮品卡 | **$400** |\n| 惠康超市現金券 | **$400** |\n\n### 📋 申請條件\n1. ✅ 全新大新信用卡客戶\n2. ✅ 收到獎賞換領表格後 **7日內** 填妥及遞交\n3. ✅ 2026年2月28日或之前成功獲批\n4. ⚠️ **無需簽賬！** 🎉\n\n---\n\n## 📌 銀行迎新優惠\n\n| 條件 | 獎賞 |\n|:---|:---:|\n| 首2個月簽滿 $4,000 + 最少5筆易通行/汽車相關簽賬 | **$500** 現金回贈 |\n\n---\n\n## 🔥 冬日狂賞（2025/12/8 - 2026/2/28）\n登記後本地食肆享額外5%、網上/旅遊/海外享額外3%現金回贈！\n- 每階段上限 $300，整個推廣期最高 $900\n- 名額只限 8,000 人！\n[查看詳情及登記](/discover/dahsing-winter-promo)\n\n---\n\n## 🚗 汽車相關簽賬 4% 回贈\n包括：易通行隧道費、購買汽車、時租泊車、洗車、汽車美容、汽車維修、汽車零件、汽車保養、拖車服務、電動汽車充電、油站消費。\n\n📅 **2026年1月22日更新**",
    promoEndDate: "2026-01-30",
    promoName: "MoneyHero限時獨家優惠",
  },

  // ========================================================================
  // 新增卡片 (2024-2025)
  // ========================================================================
  {
    id: "hsbc-easy",
    name: "HSBC Easy Card",
    bank: "HSBC",
    style: { bgColor: "bg-gradient-to-br from-red-500 to-red-700", textColor: "text-white" },
    rewardTimeline: "獎賞錢於月結單入賬",
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
      // 最紅自主獎賞 6X = 5X額外 + 1X基本 = 2.4%（五選一共用上限）
      { description: "最紅自主獎賞 6X (2.4%) [需登記,五選一]", matchType: "category", matchValue: ["dining", "supermarket", "lifestyle", "home", "entertainment"], percentage: 2.4, cap: 25000, capType: "spending", capPeriod: "yearly", shareCapWith: "hsbc_easy_red_hot", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      { description: "賞世界 6X (2.4%) [需登記,五選一]", matchType: "base", percentage: 2.4, isForeignCurrency: true, cap: 25000, capType: "spending", capPeriod: "yearly", shareCapWith: "hsbc_easy_red_hot", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"] },
    ],
    tags: ["易賞錢", "百佳", "屈臣氏", "折扣日", "最紅自主獎賞"],
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
    sellingPoints: ["🌏 新台幣簽賬 8% (20X)", "🇯🇵🇰🇷 日韓簽賬 4% (10X)", "其他外幣 2%", "本地網上 4% [需登記]", "八達通自動增值 0.4%"],
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
    sellingPoints: ["🌏 新台幣簽賬 10% (月上限$8,000)", "🇯🇵🇰🇷 日韓簽賬 5% (月上限$24,000)", "本地網上 5% [需登記]", "其他外幣 2.5%", "機場貴賓室4次"],
    officialApplyUrl: "https://www.fubonbank.com.hk/tc/personal/credit-card/visa-infinite-card.html",
    applyUrl: "https://www.fubonbank.com.hk/tc/cards/credit-card-products/visa-infinite-card.html",
    note: "💡 【推廣期 2025/1/1-12/31】🌏 新台幣 10% (20X)，每月首 $8,000 簽賬享額外積分（全年上限 $32,000）。🇯🇵🇰🇷 日韓 5% (10X)，每月首 $24,000 簽賬享額外積分。本地網上 5% 需致電 2566 8181 登記 (按1>7>2)，每月上限 $10,000 簽賬。週六日滿 $300 享 2X。積分可兌換現金 (200分=$1) 或里數 (15分=1里，手續費$250-$500)。⚠️ 不適用於：稅務、保險、水電費繳費、分期付款。年費 $3,600，年薪要求 $600,000。",
    promoEndDate: "2025-12-31",
    promoName: "富邦 Visa Infinite 海外額外積分推廣",
  },
  {
    id: "fubon-incard",
    name: "富邦 iN VISA 白金卡",
    bank: "富邦銀行",
    style: { bgColor: "bg-gradient-to-br from-pink-500 to-purple-600", textColor: "text-white" },
    foreignCurrencyFee: 1.95,
    annualFee: 0,
    feeWaiverCondition: "永久免年費",
    rules: [
      // T&C 2026/1/1-2026/6/30: 網上簽賬 20X 積分 = 8%
      // 新增：每月累積簽賬滿 $1,000 方可享額外積分
      // 額外積分上限 62,500/月 = 簽賬上限 $3,290
      { description: "網上簽賬 8% (20X) [月簽$1,000,上限$3,290]", matchType: "category", matchValue: "online", percentage: 8.0, monthlyMinSpend: 1000, cap: 3290, capType: "spending", excludeCategories: ["ewallet", "insurance", "tax"], excludePaymentMethods: ["alipay", "wechat_pay", "payme"], validDateRange: { start: "2026-01-01", end: "2026-06-30" } },
      // T&C: 流動支付及八達通自動增值也計積分
      { description: "流動支付 0.4%", matchType: "paymentMethod", matchValue: ["mobile", "apple_pay", "google_pay", "samsung_pay"], percentage: 0.4 },
      { description: "八達通自動增值 0.4%", matchType: "paymentMethod", matchValue: ["octopus"], percentage: 0.4 },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
    ],
    tags: ["網購8%", "月簽$1000", "永久免年費"],
    welcomeOfferText: "迎新簽 $5,000 送 $150 現金回贈 (首3個月)",
    sellingPoints: ["網上簽賬 8% 回贈 (無需登記)", "每月下限 $1,000 / 上限 $3,290", "永久免年費", "流動支付/八達通增值計積分"],
    officialApplyUrl: "https://www.fubonbank.com.hk/tc/personal/credit-card/in-card.html",
    applyUrl: "https://www.fubonbank.com.hk/tc/cards/credit-card-products/incard.html",
    note: "## 📌 網上簽賬 8% 積分獎賞\n**推廣期：2026/1/1 - 2026/6/30**\n\n| 項目 | 詳情 |\n|:---|:---|\n| 回贈率 | 8% (20X積分) |\n| 月簽下限 | **$1,000** (新增！) |\n| 月簽上限 | $3,290 |\n| 額外積分上限 | 62,500/月 |\n\n---\n\n## ⚠️ 2026 更新重點\n\n### 🆕 新增月簽下限\n- 每月累積簽賬滿 **$1,000** 方可享 8%\n- 未夠 $1,000 只有 0.4% 基本回贈\n\n### 📉 上限收緊\n- 額外積分：75,000 → **62,500**/月\n- 簽賬上限：$3,947 → **$3,290**/月\n\n---\n\n## 💡 使用技巧\n\n- 每月簽 $1,000 - $3,290 最著數\n- 上限以**記賬日**計算（非交易日）\n- 月底簽賬可能跌落下月 quota\n\n---\n\n## ⚠️ 注意事項\n\n- 海外商戶簽港幣有 **1% CBF 手續費**（App Store/Netflix/Spotify/Airbnb）\n- 積分有效期一年，250分=$1\n\n---\n\n## ✅ 計積分\n- 流動支付（Apple Pay/Google Pay/Samsung Pay）0.4%\n- 八達通自動增值 0.4%\n\n## ❌ 不計回贈\n- Alipay/WeChat Pay/PayMe 充值\n- 保險、稅務\n\n---\n\n📅 **2025年12月31日更新**",
    promoEndDate: "2026-06-30",
    promoName: "富邦 iN VISA 網上簽賬 8% 推廣",
  },
  {
    id: "cncbi-gba",
    name: "信銀國際大灣區雙幣信用卡",
    bank: "信銀國際",
    style: { bgColor: "bg-gradient-to-br from-red-600 to-red-800", textColor: "text-white" },
    foreignCurrencyFee: 0,
    annualFee: 0,
    feeWaiverCondition: "永久免年費",
    rules: [
      // T&C 2026/1/1-2026/6/30: 人民幣簽賬/雲閃付App 4% (每月上限$150)
      { description: "人民幣/雲閃付 4% [上限$150]", matchType: "base", percentage: 4.0, isForeignCurrency: true, cap: 150, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"], validDateRange: { start: "2026-01-01", end: "2026-06-30" } },
      // T&C 2026/1/1-2026/6/30: 單筆滿CNY4,000 額外6% (每月上限$250)
      { description: "單筆滿¥4k 額外6% [上限$250]", matchType: "base", percentage: 6.0, isForeignCurrency: true, minSpend: 4000, cap: 250, capType: "reward", excludePaymentMethods: ["alipay", "wechat_pay", "payme", "octopus"], validDateRange: { start: "2026-01-01", end: "2026-06-30" } },
      // T&C: 本地簽賬 0.4%，排除繳稅、網上繳費、八達通增值、電子錢包
      { description: "本地簽賬 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance", "ewallet"], excludePaymentMethods: ["octopus", "alipay", "wechat_pay", "payme"] },
    ],
    tags: ["大灣區", "北上", "免手續費", "人民幣10%", "永久免年費", "MoneyHero獨家"],
    sellingPoints: ["人民幣/雲閃付 4% (月上限$150)", "單筆滿¥4,000 高達10%", "免外幣手續費", "永久免年費", "🔥 MoneyHero獨家禮品高達$5,980"],
    welcomeOfferText: "外幣簽賬10%回贈（上限$1,000）或 簽滿$6,000送$600現金回贈",
    officialApplyUrl: "https://www.cncbinternational.com/personal/credit-card/gba/tc/index.html",
    applyUrl: "https://www.cncbinternational.com/personal/credit-cards/gba-dual-currency-credit-card/tc/index.jsp",
    note: "## 🔥 MoneyHero 限時獨家優惠\n**優惠期：2026年1月15日下午6時至1月26日下午6時**\n\n### 🎁 獨家禮品（7選1）\n| 禮品 | 價值 |\n|:---|:---:|\n| Dyson Zone™ 降噪耳機 | **$5,980** |\n| LG PuriCare™ 空氣清新機 (寵物版) | **$3,690** |\n| Philips 無線吸塵機 | **$2,498** |\n| 14,000 Max Miles | ~$1,400 |\n| HK$1,300 Apple Store 禮品卡 | $1,300 |\n| HK$1,300 惠康購物現金券 | $1,300 |\n| HK$1,100 現金回贈 | $1,100 |\n\n### 📋 申請條件\n- ✅ 全新信銀國際信用卡客戶\n- ✅ 2026/2/28前獲批\n- ✅ 批卡後30日內簽滿 **$100**\n\n---\n\n## 📌 人民幣/雲閃付回贈優惠\n**推廣期：2026/1/1 - 2026/6/30**\n\n| 簽賬類別 | 回贈 | 每月上限 |\n|:---|:---:|:---:|\n| 人民幣/雲閃付 | 4% | $150 |\n| 單筆滿 ¥4,000 額外 | +6% | $250 |\n| **合共** | **10%** | **$400** |\n\n📅 **2026年1月22日更新**",
    promoEndDate: "2026-01-26",
    promoName: "MoneyHero限時獨家優惠",
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
    // T&C: 0% 海外簽賬手續費（推廣期至 2026年12月31日）
    foreignCurrencyFee: 0,
    annualFee: 0,
    feeWaiverCondition: "永久免年費",
    rules: [
      // T&C: 淘寶/天貓簽賬回贈，不適用於 Alipay/WeChat Pay/PayMe
      { description: "淘寶/天貓 4%", matchType: "merchant", matchValue: ["taobao", "tmall"], percentage: 4.0, excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
      { description: "基本回饋 0.4%", matchType: "base", percentage: 0.4, excludeCategories: ["tax", "utilities", "government", "insurance"], excludePaymentMethods: ["alipay", "wechat_pay", "payme"] },
    ],
    tags: ["淘寶", "網購", "免外幣手續費", "免淘寶手續費"],
    welcomeOfferText: "迎新手機簽賬 10% 回贈 (上限$300，至2026/12/31)",
    sellingPoints: ["0% 淘寶手續費 (AlipayHK)", "0% 海外簽賬手續費", "迎新手機簽賬 10%", "專為淘寶用戶而設"],
    officialApplyUrl: "https://www.bochk.com/tc/creditcard/products/taobao.html",
    applyUrl: "https://www.bochk.com/tc/creditcard/products/taobao.html",
    note: "## 📌 主要優惠（推廣期至 2026/12/31）\n\n### 🛒 0% 淘寶手續費\n- 透過手機淘寶 App 或淘寶網 (world.taobao.com)\n- 用 **AlipayHK** 以中銀淘寶卡付款\n- 幣種設置必須設定為「HKD」\n- 次數不限\n\n⚠️ **不適用於**：淘寶手續費少於 $0.1、閑魚平台、非實物類商品（虛擬幣/話費充值卡等）\n\n### 🌏 0% 海外簽賬手續費\n- 海外實體商戶或海外網上商戶\n- 主卡及附屬卡適用\n- 次數不限\n\n---\n\n## 🎁 迎新優惠（至 2026/12/31）\n\n| 項目 | 詳情 |\n|:---|:---|\n| 回贈率 | 手機簽賬 **10%** |\n| 上限 | $300 |\n| 簽賬期 | 發卡當月及其後首兩個曆月 |\n\n**合資格手機支付**：Apple Pay、Google Pay、Samsung Pay、Huawei Pay、雲閃付 APP 二維碼\n\n⚠️ 不適用於現有中銀信用卡主卡持有人，或 12 個月內曾取消/持有的持卡人\n\n---\n\n## ❌ 不計回贈\n- Alipay/WeChat Pay/PayMe/BoC Pay+ 簽賬\n- 八達通增值、電子錢包充值\n- 網上繳費、繳稅\n- 賭博交易、P2P 轉賬\n\n📅 **2026年1月7日更新**：推廣期延長至 2026年12月31日",
    promoEndDate: "2026-12-31",
    promoName: "中銀淘寶 0% 手續費優惠",
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
