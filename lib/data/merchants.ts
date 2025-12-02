import { Merchant } from "../types";

export const POPULAR_MERCHANTS: Merchant[] = [
  // General / Other Merchants for each category
  { id: "general-dining", name: "一般餐廳 / 食肆", categoryIds: ["dining"], aliases: ["餐廳", "食肆", "restaurant"], logo: "🍽️", accentColor: "#f59e0b", isGeneral: true },
  { id: "general-supermarket", name: "一般超市", categoryIds: ["supermarket"], aliases: ["超市", "supermarket"], logo: "🛒", accentColor: "#16a34a", isGeneral: true },
  { id: "general-online", name: "一般網上簽賬", categoryIds: ["online"], aliases: ["網購", "online"], logo: "🌐", accentColor: "#3b82f6", isGeneral: true, isOnlineOnly: true },
  { id: "general-travel", name: "一般旅遊 / 外幣", categoryIds: ["travel"], aliases: ["旅遊", "travel", "外幣"], logo: "✈️", accentColor: "#8b5cf6", isGeneral: true },
  { id: "general-other", name: "其他商戶 / 實體店", categoryIds: ["other"], aliases: ["其他"], logo: "🏪", accentColor: "#6b7280", isGeneral: true },

  // Specific Merchants
  { id: "wellcome", name: "Wellcome 惠康", categoryIds: ["supermarket"], aliases: ["wellcome", "惠康", "marketplace", "3hreesixty"], logo: "https://logo.clearbit.com/wellcome.com.hk", accentColor: "#f97316" },
  { id: "parknshop", name: "PARKnSHOP 百佳", categoryIds: ["supermarket"], aliases: ["pns", "百佳", "fusion", "taste", "international"], logo: "https://logo.clearbit.com/parknshop.com", accentColor: "#2563eb" },
  { id: "yata", name: "YATA 一田", categoryIds: ["supermarket", "department_store"], aliases: ["yata", "一田"], logo: "https://logo.clearbit.com/yata.hk", accentColor: "#16a34a" },
  { id: "759", name: "759 阿信屋", categoryIds: ["supermarket"], aliases: ["759", "阿信屋"], logo: "https://logo.clearbit.com/759store.com", accentColor: "#f43f5e" },
  { id: "hktvmall", name: "HKTVmall", categoryIds: ["online", "supermarket"], aliases: ["hktv", "王維基"], logo: "https://logo.clearbit.com/hktvmall.com", accentColor: "#65a30d", isOnlineOnly: true },
  { id: "donki", name: "Don Don Donki", categoryIds: ["supermarket"], aliases: ["donki", "唐吉訶德"], logo: "https://logo.clearbit.com/dondondonki.com", accentColor: "#facc15" },
  { id: "mannings", name: "Mannings 萬寧", categoryIds: ["personal_care", "supermarket"], aliases: ["mannings", "萬寧"], logo: "https://logo.clearbit.com/mannings.com.hk", accentColor: "#fb923c" },
  { id: "watsons", name: "Watsons 屈臣氏", categoryIds: ["personal_care", "supermarket"], aliases: ["watsons", "屈臣氏"], logo: "https://logo.clearbit.com/watsons.com.hk", accentColor: "#0ea5e9" },
  { id: "maxims", name: "Maxim's Group 美心集團", categoryIds: ["dining"], aliases: ["美心", "maxims", "翠園", "美心皇宮", "潮江春", "北京樓", "美心MX", "can.teen"], logo: "https://logo.clearbit.com/maxims.com.hk", accentColor: "#f59e0b" },
  { id: "mcdonalds", name: "McDonald's 麥當勞", categoryIds: ["dining"], aliases: ["mcd", "麥記", "老麥", "mcdonald"], logo: "https://logo.clearbit.com/mcdonalds.com.hk", accentColor: "#fbbf24" },
  { id: "deliveroo", name: "Deliveroo 戶戶送", categoryIds: ["dining", "online"], aliases: ["外賣", "deliveroo"], logo: "https://logo.clearbit.com/deliveroo.hk", accentColor: "#06b6d4", isOnlineOnly: true },
  { id: "foodpanda", name: "foodpanda", categoryIds: ["dining", "online"], aliases: ["熊貓", "foodpanda"], logo: "https://logo.clearbit.com/foodpanda.hk", accentColor: "#ec4899", isOnlineOnly: true },
  { id: "keeta", name: "KeeTa", categoryIds: ["dining", "online"], aliases: ["keeta", "美團"], logo: "🦅", accentColor: "#facc15", isOnlineOnly: true },
  { id: "kmb", name: "KMB 九巴", categoryIds: ["transport"], aliases: ["bus", "巴士", "kmb"], logo: "https://logo.clearbit.com/kmb.hk", accentColor: "#dc2626" },
  { id: "mtr", name: "MTR 港鐵", categoryIds: ["transport"], aliases: ["mtr", "港鐵", "地鐵", "metro"], logo: "https://logo.clearbit.com/mtr.com.hk", accentColor: "#dc2626" },
  { id: "apple", name: "Apple Store", categoryIds: ["electronics", "online"], aliases: ["iphone", "macbook", "apple", "ipad"], logo: "https://logo.clearbit.com/apple.com", accentColor: "#111827" },
  { id: "ird", name: "Inland Revenue Department 稅務局", categoryIds: ["tax", "government"], aliases: ["稅", "交稅", "ird", "tax"], logo: "https://logo.clearbit.com/ird.gov.hk", accentColor: "#4b5563", isOnlineOnly: true },
  { id: "clp", name: "CLP 中電", categoryIds: ["utilities"], aliases: ["電費", "中電", "clp"], logo: "https://logo.clearbit.com/clp.com.hk", accentColor: "#2563eb", isOnlineOnly: true },
  { id: "payme", name: "PayMe", categoryIds: ["ewallet"], aliases: ["payme", "增值"], logo: "https://payme.hsbc.com.hk/content/dam/hsbc/payme/images/logo-payme-horizontal-en.svg", accentColor: "#ec4899", isOnlineOnly: true },
  { id: "alipayhk", name: "AlipayHK", categoryIds: ["ewallet"], aliases: ["支付寶", "alipay"], logo: "https://logo.clearbit.com/alipayhk.com", accentColor: "#0284c7", isOnlineOnly: true },
  { id: "sogo", name: "SOGO 崇光", categoryIds: ["department_store"], aliases: ["sogo", "崇光"], logo: "https://logo.clearbit.com/sogo.com.hk", accentColor: "#2563eb" },
  { id: "klook", name: "Klook", categoryIds: ["travel", "online"], aliases: ["klook"], logo: "https://logo.clearbit.com/klook.com", accentColor: "#ff5b00", isOnlineOnly: true },
  { id: "cathay-pacific", name: "國泰航空 Cathay Pacific", categoryIds: ["travel"], aliases: ["cx", "cathay", "國泰", "cathay pacific"], logo: "https://logo.clearbit.com/cathaypacific.com", accentColor: "#006564", isOnlineOnly: true },
  { id: "hk-express", name: "香港快運 HK Express", categoryIds: ["travel"], aliases: ["uo", "hkexpress", "快運", "hk express"], logo: "https://logo.clearbit.com/hkexpress.com", accentColor: "#6a3077", isOnlineOnly: true },
  
  // New Online Only Merchants
  { id: "kkday", name: "KKday", categoryIds: ["travel", "online"], aliases: ["kkday"], logo: "https://logo.clearbit.com/kkday.com", accentColor: "#22d3ee", isOnlineOnly: true },
  { id: "trip-com", name: "Trip.com", categoryIds: ["travel", "online"], aliases: ["trip", "携程"], logo: "https://logo.clearbit.com/trip.com", accentColor: "#2563eb", isOnlineOnly: true },
  { id: "agoda", name: "Agoda", categoryIds: ["travel", "online"], aliases: ["agoda"], logo: "https://logo.clearbit.com/agoda.com", accentColor: "#14b8a6", isOnlineOnly: true },
  { id: "booking-com", name: "Booking.com", categoryIds: ["travel", "online"], aliases: ["booking", "booking.com"], logo: "https://logo.clearbit.com/booking.com", accentColor: "#1d4ed8", isOnlineOnly: true },
  { id: "uber", name: "Uber", categoryIds: ["transport", "online"], aliases: ["uber", "的士"], logo: "https://logo.clearbit.com/uber.com", accentColor: "#000000", isOnlineOnly: true },
  { id: "netflix", name: "Netflix", categoryIds: ["entertainment", "online"], aliases: ["netflix", "網飛"], logo: "https://logo.clearbit.com/netflix.com", accentColor: "#dc2626", isOnlineOnly: true },
  { id: "spotify", name: "Spotify", categoryIds: ["entertainment", "online"], aliases: ["spotify"], logo: "https://logo.clearbit.com/spotify.com", accentColor: "#16a34a", isOnlineOnly: true },
  { id: "disney-plus", name: "Disney+", categoryIds: ["entertainment", "online"], aliases: ["disney", "disney+"], logo: "https://logo.clearbit.com/disneyplus.com", accentColor: "#2563eb", isOnlineOnly: true },
  { id: "towngas", name: "Towngas 煤氣", categoryIds: ["utilities"], aliases: ["煤氣", "towngas"], logo: "https://logo.clearbit.com/towngas.com", accentColor: "#ea580c", isOnlineOnly: true },
  { id: "wechat-pay-hk", name: "WeChat Pay HK", categoryIds: ["ewallet"], aliases: ["wechat", "微信支付"], logo: "https://logo.clearbit.com/wechat.com", accentColor: "#16a34a", isOnlineOnly: true },
  
  // Government / Utilities
  { id: "wsd", name: "Water Supplies Department 水務署", categoryIds: ["utilities", "government"], aliases: ["水費", "水務署", "wsd", "water"], logo: "https://logo.clearbit.com/wsd.gov.hk", accentColor: "#0ea5e9", isOnlineOnly: true },
  { id: "housing-authority", name: "房屋署 Housing Authority", categoryIds: ["government"], aliases: ["公屋租", "公屋", "房屋署", "房署", "housing", "租金"], logo: "🏠", accentColor: "#4b5563", isOnlineOnly: true },
  { id: "hkelectric", name: "港燈 HK Electric", categoryIds: ["utilities"], aliases: ["港燈", "電費", "hk electric"], logo: "https://logo.clearbit.com/hkelectric.com", accentColor: "#f59e0b", isOnlineOnly: true },
  
  // Convenience Stores
  { id: "7-eleven", name: "7-Eleven", categoryIds: ["convenience"], aliases: ["7-11", "seven eleven", "7仔", "七仔"], logo: "https://logo.clearbit.com/7-eleven.com.hk", accentColor: "#16a34a" },
  { id: "circle-k", name: "OK便利店 Circle K", categoryIds: ["convenience"], aliases: ["ok", "circle k", "ok便利店"], logo: "https://logo.clearbit.com/circlek.hk", accentColor: "#dc2626" },
  
  // HSBC Red 指定商戶 (8% 回贈)
  { id: "sushiro", name: "壽司郎 Sushiro", categoryIds: ["dining"], aliases: ["sushiro", "壽司郎"], logo: "https://logo.clearbit.com/sushiro.hk", accentColor: "#dc2626" },
  { id: "tamjai", name: "譚仔三哥米線", categoryIds: ["dining"], aliases: ["譚仔三哥", "tamjai", "譚仔"], logo: "https://logo.clearbit.com/tamjai.com.hk", accentColor: "#f97316" },
  { id: "tamjai_yunnan", name: "譚仔雲南米線", categoryIds: ["dining"], aliases: ["譚仔雲南", "雲南米線"], logo: "https://logo.clearbit.com/tamjaiyunnan.com", accentColor: "#ea580c" },
  { id: "coffee_academics", name: "The Coffee Academïcs", categoryIds: ["dining"], aliases: ["coffee academics", "咖啡學院"], logo: "https://logo.clearbit.com/the-coffeeacademics.com", accentColor: "#78350f" },
  { id: "gu", name: "GU", categoryIds: ["department_store"], aliases: ["gu", "極優"], logo: "https://logo.clearbit.com/gu-global.com", accentColor: "#dc2626" },
  { id: "decathlon", name: "Decathlon 迪卡儂", categoryIds: ["other"], aliases: ["decathlon", "迪卡儂"], logo: "https://logo.clearbit.com/decathlon.com.hk", accentColor: "#0284c7" },
  { id: "lululemon", name: "lululemon", categoryIds: ["other"], aliases: ["lululemon"], logo: "https://logo.clearbit.com/lululemon.com", accentColor: "#dc2626" },
  { id: "namco", name: "NAMCO", categoryIds: ["entertainment"], aliases: ["namco", "南夢宮"], logo: "https://logo.clearbit.com/namco.co.jp", accentColor: "#f97316" },
  { id: "taito", name: "TAITO STATION", categoryIds: ["entertainment"], aliases: ["taito", "太東"], logo: "https://logo.clearbit.com/taito.co.jp", accentColor: "#7c3aed" },
  
  // 餐飲 - 連鎖店 (門市+網上)
  { id: "kfc", name: "KFC 肯德基", categoryIds: ["dining", "online"], aliases: ["kfc", "肯德基", "kentucky"], logo: "https://logo.clearbit.com/kfc.com.hk", accentColor: "#dc2626" },
  { id: "genki-sushi", name: "元氣壽司 Genki Sushi", categoryIds: ["dining", "online"], aliases: ["genki", "元氣", "元氣壽司"], logo: "https://logo.clearbit.com/genkisushi.com.hk", accentColor: "#dc2626" },
  { id: "pizza-hut", name: "Pizza Hut 必勝客", categoryIds: ["dining", "online"], aliases: ["pizza hut", "必勝客", "pizzahut"], logo: "https://logo.clearbit.com/pizzahut.com.hk", accentColor: "#dc2626" },
  
  // 電器/數碼 (門市+網上)
  { id: "fortress", name: "Fortress 豐澤", categoryIds: ["electronics", "online"], aliases: ["fortress", "豐澤"], logo: "https://logo.clearbit.com/fortress.com.hk", accentColor: "#0ea5e9" },
  { id: "yoho", name: "友和 YOHO", categoryIds: ["electronics", "online"], aliases: ["yoho", "友和"], logo: "https://logo.clearbit.com/yohohongkong.com", accentColor: "#f97316" },
  { id: "broadway", name: "Broadway 百老滙", categoryIds: ["electronics", "online"], aliases: ["broadway", "百老滙", "百老匯"], logo: "https://logo.clearbit.com/broadway.com.hk", accentColor: "#1d4ed8" },
];
