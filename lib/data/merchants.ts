import { Merchant } from "../types";

export const POPULAR_MERCHANTS: Merchant[] = [
  // General / Other Merchants for each category
  { id: "general-dining", name: "一般餐廳 / 食肆", categoryIds: ["dining"], aliases: ["餐廳", "食肆", "restaurant"], logo: "🍽️", accentColor: "#f59e0b", isGeneral: true },
  { id: "general-supermarket", name: "一般超市", categoryIds: ["supermarket"], aliases: ["超市", "supermarket"], logo: "🛒", accentColor: "#16a34a", isGeneral: true },
  { id: "general-online", name: "一般網上簽賬", categoryIds: ["online"], aliases: ["網購", "online"], logo: "🌐", accentColor: "#3b82f6", isGeneral: true, isOnlineOnly: true },
  { id: "general-travel", name: "一般旅遊 / 外幣", categoryIds: ["travel"], aliases: ["旅遊", "travel", "外幣"], logo: "✈️", accentColor: "#8b5cf6", isGeneral: true },
  { id: "general-other", name: "其他商戶 / 實體店", categoryIds: ["other"], aliases: ["其他"], logo: "🏪", accentColor: "#6b7280", isGeneral: true },

  // Specific Merchants
  { id: "wellcome", name: "Wellcome 惠康", categoryIds: ["supermarket"], aliases: ["wellcome", "惠康", "marketplace", "3hreesixty"], logo: "🛒", accentColor: "#f97316" },
  { id: "parknshop", name: "PARKnSHOP 百佳", categoryIds: ["supermarket"], aliases: ["pns", "百佳", "fusion", "taste", "international"], logo: "🅿️", accentColor: "#2563eb" },
  { id: "yata", name: "YATA 一田", categoryIds: ["supermarket", "department_store"], aliases: ["yata", "一田"], logo: "🥬", accentColor: "#16a34a" },
  { id: "759", name: "759 阿信屋", categoryIds: ["supermarket"], aliases: ["759", "阿信屋"], logo: "7️⃣", accentColor: "#f43f5e" },
  { id: "hktvmall", name: "HKTVmall", categoryIds: ["online", "supermarket"], aliases: ["hktv", "王維基"], logo: "📺", accentColor: "#65a30d", isOnlineOnly: true },
  { id: "donki", name: "Don Don Donki", categoryIds: ["supermarket"], aliases: ["donki", "唐吉訶德"], logo: "🐧", accentColor: "#facc15" },
  { id: "mannings", name: "Mannings 萬寧", categoryIds: ["personal_care", "supermarket"], aliases: ["mannings", "萬寧"], logo: "🧴", accentColor: "#fb923c" },
  { id: "watsons", name: "Watsons 屈臣氏", categoryIds: ["personal_care", "supermarket"], aliases: ["watsons", "屈臣氏"], logo: "💊", accentColor: "#0ea5e9" },
  { id: "maxims", name: "Maxim's Group 美心集團", categoryIds: ["dining"], aliases: ["美心", "maxims", "翠園", "美心皇宮", "潮江春", "北京樓", "美心MX", "can.teen"], logo: "🍱", accentColor: "#f59e0b" },
  { id: "mcdonalds", name: "McDonald's 麥當勞", categoryIds: ["dining"], aliases: ["mcd", "麥記", "老麥", "mcdonald"], logo: "🍔", accentColor: "#fbbf24" },
  { id: "deliveroo", name: "Deliveroo 戶戶送", categoryIds: ["dining", "online"], aliases: ["外賣", "deliveroo"], logo: "🛵", accentColor: "#06b6d4", isOnlineOnly: true },
  { id: "foodpanda", name: "foodpanda", categoryIds: ["dining", "online"], aliases: ["熊貓", "foodpanda"], logo: "🐼", accentColor: "#ec4899", isOnlineOnly: true },
  { id: "keeta", name: "KeeTa", categoryIds: ["dining", "online"], aliases: ["keeta", "美團"], logo: "🦅", accentColor: "#facc15", isOnlineOnly: true },
  { id: "kmb", name: "KMB 九巴", categoryIds: ["transport"], aliases: ["bus", "巴士", "kmb"], logo: "🚌", accentColor: "#dc2626" },
  { id: "apple", name: "Apple Store", categoryIds: ["electronics", "online"], aliases: ["iphone", "macbook", "apple", "ipad"], logo: "🍎", accentColor: "#111827" },
  { id: "ird", name: "Inland Revenue Department 稅務局", categoryIds: ["tax", "government"], aliases: ["稅", "交稅", "ird", "tax"], logo: "📄", accentColor: "#4b5563", isOnlineOnly: true },
  { id: "clp", name: "CLP 中電", categoryIds: ["utilities"], aliases: ["電費", "中電", "clp"], logo: "⚡️", accentColor: "#2563eb", isOnlineOnly: true },
  { id: "payme", name: "PayMe", categoryIds: ["ewallet"], aliases: ["payme", "增值"], logo: "💖", accentColor: "#ec4899", isOnlineOnly: true },
  { id: "alipayhk", name: "AlipayHK", categoryIds: ["ewallet"], aliases: ["支付寶", "alipay"], logo: "💠", accentColor: "#0284c7", isOnlineOnly: true },
  { id: "sogo", name: "SOGO 崇光", categoryIds: ["department_store"], aliases: ["sogo", "崇光"], logo: "🛍️", accentColor: "#2563eb" },
  { id: "klook", name: "Klook", categoryIds: ["travel", "online"], aliases: ["klook"], logo: "🎟️", accentColor: "#ff5b00", isOnlineOnly: true },
  { id: "cathay-pacific", name: "國泰航空 Cathay Pacific", categoryIds: ["travel"], aliases: ["cx", "cathay", "國泰", "cathay pacific"], logo: "✈️", accentColor: "#006564", isOnlineOnly: true },
  { id: "hk-express", name: "香港快運 HK Express", categoryIds: ["travel"], aliases: ["uo", "hkexpress", "快運", "hk express"], logo: "✈️", accentColor: "#6a3077", isOnlineOnly: true },
];
