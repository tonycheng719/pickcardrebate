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
  { id: "lungfung", name: "龍豐藥房", categoryIds: ["personal_care"], aliases: ["龍豐", "lungfung", "lung fung"], logo: "💊", accentColor: "#dc2626" },
  // DBS 官方認定超市
  { id: "citysuper", name: "city'super", categoryIds: ["supermarket"], aliases: ["citysuper", "city super"], logo: "https://logo.clearbit.com/citysuper.com.hk", accentColor: "#1e3a8a" },
  { id: "eshop360", name: "優品360", categoryIds: ["supermarket"], aliases: ["優品", "360", "eshop360"], logo: "🛒", accentColor: "#ef4444" },
  { id: "daisang", name: "大生生活超市", categoryIds: ["supermarket"], aliases: ["大生", "daisang"], logo: "🛒", accentColor: "#22c55e" },
  { id: "pandamart", name: "pandamart / foodpanda mall", categoryIds: ["supermarket", "online"], aliases: ["pandamart", "foodpanda mall"], logo: "https://logo.clearbit.com/foodpanda.hk", accentColor: "#ec4899", isOnlineOnly: true },
  { id: "kaibo", name: "佳宝食品超級市場", categoryIds: ["supermarket"], aliases: ["佳宝", "kaibo"], logo: "🛒", accentColor: "#f97316" },
  { id: "mns_food", name: "Marks and Spencer Food", categoryIds: ["supermarket"], aliases: ["marks", "spencer", "m&s food"], logo: "https://logo.clearbit.com/marksandspencer.com", accentColor: "#000000" },
  { id: "linzhubuy", name: "鄰住買", categoryIds: ["supermarket", "online"], aliases: ["鄰住買", "linzhubuy"], logo: "🛒", accentColor: "#16a34a", isOnlineOnly: true },
  { id: "pricerite-supermarket", name: "價真棧", categoryIds: ["supermarket"], aliases: ["價真棧", "價真"], logo: "🛒", accentColor: "#dc2626" },
  { id: "pricerite", name: "Pricerite 實惠", categoryIds: ["shopping"], aliases: ["實惠", "pricerite", "實惠家居"], logo: "https://logo.clearbit.com/pricerite.com.hk", accentColor: "#e11d48" },
  { id: "uselect", name: "U購Select超級市場", categoryIds: ["supermarket"], aliases: ["u購", "uselect", "u select"], logo: "🛒", accentColor: "#8b5cf6" },
  { id: "maxims", name: "Maxim's Group 美心集團", categoryIds: ["dining"], aliases: ["美心", "maxims", "翠園", "美心皇宮", "潮江春", "北京樓", "美心MX", "can.teen"], logo: "https://logo.clearbit.com/maxims.com.hk", accentColor: "#f59e0b" },
  { id: "mcdonalds", name: "McDonald's 麥當勞", categoryIds: ["dining"], aliases: ["mcd", "麥記", "老麥", "mcdonald"], logo: "https://logo.clearbit.com/mcdonalds.com.hk", accentColor: "#fbbf24" },
  { id: "foodpanda", name: "foodpanda", categoryIds: ["dining", "online", "supermarket"], aliases: ["熊貓", "foodpanda"], logo: "https://logo.clearbit.com/foodpanda.hk", accentColor: "#ec4899", isOnlineOnly: true },
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
  
  // 跨境電商 Cross-border E-commerce (人民幣交易)
  { id: "taobao", name: "淘寶 Taobao", categoryIds: ["online"], aliases: ["淘寶", "taobao", "tb"], logo: "https://logo.clearbit.com/taobao.com", accentColor: "#ff5000", isOnlineOnly: true, isForeignCurrency: true, currency: "CNY" },
  { id: "tmall", name: "天貓 Tmall", categoryIds: ["online"], aliases: ["天貓", "tmall"], logo: "https://logo.clearbit.com/tmall.com", accentColor: "#ff0036", isOnlineOnly: true, isForeignCurrency: true, currency: "CNY" },
  { id: "jd", name: "京東 JD.com", categoryIds: ["online"], aliases: ["京東", "jd", "jd.com"], logo: "https://logo.clearbit.com/jd.com", accentColor: "#e2231a", isOnlineOnly: true, isForeignCurrency: true, currency: "CNY" },
  { id: "pinduoduo", name: "拼多多 Pinduoduo", categoryIds: ["online"], aliases: ["拼多多", "pdd", "pinduoduo"], logo: "https://logo.clearbit.com/pinduoduo.com", accentColor: "#e02e24", isOnlineOnly: true, isForeignCurrency: true, currency: "CNY" },
  { id: "xiaohongshu", name: "小紅書 RED", categoryIds: ["online"], aliases: ["小紅書", "red", "xiaohongshu"], logo: "https://logo.clearbit.com/xiaohongshu.com", accentColor: "#fe2c55", isOnlineOnly: true, isForeignCurrency: true, currency: "CNY" },
  { id: "amazon", name: "Amazon 亞馬遜", categoryIds: ["online"], aliases: ["amazon", "亞馬遜"], logo: "https://logo.clearbit.com/amazon.com", accentColor: "#ff9900", isOnlineOnly: true },
  { id: "ebay", name: "eBay", categoryIds: ["online"], aliases: ["ebay"], logo: "https://logo.clearbit.com/ebay.com", accentColor: "#0064d2", isOnlineOnly: true },
  { id: "shein", name: "SHEIN", categoryIds: ["online"], aliases: ["shein", "希音"], logo: "https://logo.clearbit.com/shein.com", accentColor: "#000000", isOnlineOnly: true },
  { id: "temu", name: "Temu", categoryIds: ["online"], aliases: ["temu"], logo: "https://logo.clearbit.com/temu.com", accentColor: "#f97316", isOnlineOnly: true },

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
  { id: "namco", name: "NAMCO", categoryIds: ["entertainment"], aliases: ["namco", "南夢宮"], logo: "https://logo.clearbit.com/namco.co.jp", accentColor: "#f97316" },
  { id: "taito", name: "TAITO STATION", categoryIds: ["entertainment"], aliases: ["taito", "太東"], logo: "https://logo.clearbit.com/taito.co.jp", accentColor: "#7c3aed" },
  { id: "game-station", name: "Game Station", categoryIds: ["entertainment", "electronics"], aliases: ["game station", "gamestation", "遊戲店"], logo: "🎮", accentColor: "#7c3aed" },
  
  // 餐飲 - 連鎖店 (門市+網上)
  { id: "kfc", name: "KFC 肯德基", categoryIds: ["dining", "online"], aliases: ["kfc", "肯德基", "kentucky"], logo: "https://logo.clearbit.com/kfc.com.hk", accentColor: "#dc2626" },
  { id: "genki-sushi", name: "元氣壽司 Genki Sushi", categoryIds: ["dining", "online"], aliases: ["genki", "元氣", "元氣壽司"], logo: "https://logo.clearbit.com/genkisushi.com.hk", accentColor: "#dc2626" },
  { id: "pizza-hut", name: "Pizza Hut 必勝客", categoryIds: ["dining", "online"], aliases: ["pizza hut", "必勝客", "pizzahut"], logo: "https://logo.clearbit.com/pizzahut.com.hk", accentColor: "#dc2626" },
  
  // 電器/數碼 (門市+網上)
  { id: "fortress", name: "Fortress 豐澤", categoryIds: ["electronics", "online"], aliases: ["fortress", "豐澤"], logo: "https://logo.clearbit.com/fortress.com.hk", accentColor: "#0ea5e9" },
  { id: "yoho", name: "友和 YOHO", categoryIds: ["electronics", "online"], aliases: ["yoho", "友和"], logo: "https://logo.clearbit.com/yohohongkong.com", accentColor: "#f97316" },
  { id: "broadway", name: "Broadway 百老滙", categoryIds: ["electronics", "online"], aliases: ["broadway", "百老滙", "百老匯"], logo: "https://logo.clearbit.com/broadway.com.hk", accentColor: "#1d4ed8" },
  { id: "wilson_comm", name: "Wilson 衛訊", categoryIds: ["electronics", "online"], aliases: ["wilson", "衛訊", "wilsoncomm"], logo: "https://logo.clearbit.com/wilsoncomm.com.hk", accentColor: "#e11d48" },

  // ========== yuu 積分商戶 (恒生 enJoy 卡) ==========
  // 4X yuu積分 (2%) - 美心中菜
  { id: "jade_garden", name: "翠園 Jade Garden", categoryIds: ["dining"], aliases: ["翠園", "jade garden"], logo: "🥢", accentColor: "#16a34a" },
  { id: "maxims_palace", name: "美心皇宮", categoryIds: ["dining"], aliases: ["美心皇宮", "maxims palace"], logo: "🏯", accentColor: "#f59e0b" },
  { id: "peking_garden", name: "北京樓 Peking Garden", categoryIds: ["dining"], aliases: ["北京樓", "peking garden"], logo: "🦆", accentColor: "#dc2626" },
  { id: "chiu_chow", name: "潮江春", categoryIds: ["dining"], aliases: ["潮江春", "chiu chow"], logo: "🦐", accentColor: "#0ea5e9" },
  { id: "jasmine_place", name: "翠玉軒", categoryIds: ["dining"], aliases: ["翠玉軒", "jasmine"], logo: "🥟", accentColor: "#84cc16" },
  { id: "orchid_court", name: "紫玉蘭", categoryIds: ["dining"], aliases: ["紫玉蘭", "orchid"], logo: "🌸", accentColor: "#a855f7" },
  { id: "eight_month", name: "八月花", categoryIds: ["dining"], aliases: ["八月花", "eight month"], logo: "🌺", accentColor: "#f43f5e" },

  // 4X yuu積分 (2%) - 美心西餐
  { id: "cafe_landmark", name: "Café Landmark", categoryIds: ["dining"], aliases: ["cafe landmark"], logo: "☕", accentColor: "#78350f" },
  { id: "muses", name: "MUSES", categoryIds: ["dining"], aliases: ["muses"], logo: "🎭", accentColor: "#7c3aed" },
  { id: "wildfire", name: "Wildfire Pizzabar", categoryIds: ["dining"], aliases: ["wildfire", "pizzabar"], logo: "🔥", accentColor: "#ea580c" },

  // 4X yuu積分 (2%) - m.a.x. concepts 國際食府
  { id: "simplylife", name: "simplylife BAKERY CAFÉ", categoryIds: ["dining"], aliases: ["simplylife", "simply life"], logo: "🥐", accentColor: "#f59e0b" },
  { id: "kikusan", name: "吉谷舍 kikusan", categoryIds: ["dining"], aliases: ["吉谷舍", "kikusan"], logo: "🍱", accentColor: "#dc2626" },
  { id: "thai_basil", name: "THAI BASIL", categoryIds: ["dining"], aliases: ["thai basil", "泰式"], logo: "🌿", accentColor: "#16a34a" },
  { id: "exp", name: "EXP", categoryIds: ["dining"], aliases: ["exp"], logo: "🍜", accentColor: "#3b82f6" },
  { id: "ming_court", name: "明谷", categoryIds: ["dining"], aliases: ["明谷", "ming court"], logo: "🏮", accentColor: "#f97316" },
  { id: "hong_kong_day", name: "香港地", categoryIds: ["dining"], aliases: ["香港地", "hong kong day"], logo: "🇭🇰", accentColor: "#dc2626" },

  // 4X yuu積分 (2%) - 美心快餐
  { id: "mx", name: "美心MX", categoryIds: ["dining"], aliases: ["mx", "美心mx", "美心快餐"], logo: "🍱", accentColor: "#f59e0b" },
  { id: "canteen", name: "can.teen", categoryIds: ["dining"], aliases: ["canteen", "can.teen"], logo: "🍽️", accentColor: "#84cc16" },
  { id: "deli_o", name: "Deli-O", categoryIds: ["dining"], aliases: ["deli-o", "deli o"], logo: "🥪", accentColor: "#0ea5e9" },

  // 4X yuu積分 (2%) - 麵包西餅店
  { id: "arome", name: "東海堂 Arome", categoryIds: ["dining"], aliases: ["東海堂", "arome"], logo: "🍰", accentColor: "#f43f5e" },
  { id: "maxims_cakes", name: "美心西餅", categoryIds: ["dining"], aliases: ["美心西餅", "maxims cakes"], logo: "🎂", accentColor: "#f59e0b" },
  { id: "paper_stone", name: "Paper Stone Bakery", categoryIds: ["dining"], aliases: ["paper stone", "paper stone bakery"], logo: "🥖", accentColor: "#78350f" },
  { id: "urban_bakery", name: "URBAN Bakery", categoryIds: ["dining"], aliases: ["urban", "urban bakery"], logo: "🥐", accentColor: "#1d4ed8" },
  { id: "homebake", name: "Homebake", categoryIds: ["dining"], aliases: ["homebake", "美心烘焙所"], logo: "🍞", accentColor: "#f97316" },

  // 4X yuu積分 (2%) - 其他
  { id: "starbucks", name: "Starbucks 星巴克", categoryIds: ["dining"], aliases: ["starbucks", "星巴克"], logo: "https://logo.clearbit.com/starbucks.com", accentColor: "#16a34a" },
  { id: "heichinrou", name: "并并屋", categoryIds: ["dining"], aliases: ["并并屋", "heichinrou"], logo: "🍜", accentColor: "#dc2626" },
  { id: "fish_izakaya", name: "魚尚", categoryIds: ["dining"], aliases: ["魚尚", "fish izakaya"], logo: "🐟", accentColor: "#0ea5e9" },
  { id: "phd", name: "PHD (Pizza Hut Delivery)", categoryIds: ["dining", "online"], aliases: ["phd", "pizza hut delivery"], logo: "🍕", accentColor: "#dc2626", isOnlineOnly: true },

  // 3X yuu積分 (1.5%) - 零售
  { id: "ikea", name: "IKEA 宜家家居", categoryIds: ["home", "online"], aliases: ["ikea", "宜家", "宜家家居"], logo: "https://logo.clearbit.com/ikea.com.hk", accentColor: "#0ea5e9" },
  { id: "gnc", name: "GNC", categoryIds: ["personal_care"], aliases: ["gnc"], logo: "https://logo.clearbit.com/gnc.com.hk", accentColor: "#1d4ed8" },
  { id: "3hreesixty", name: "3hreesixty", categoryIds: ["supermarket"], aliases: ["3hreesixty", "360"], logo: "🛒", accentColor: "#16a34a" },
  { id: "olivers", name: "Oliver's The Delicatessen", categoryIds: ["supermarket"], aliases: ["olivers", "oliver's"], logo: "🥗", accentColor: "#84cc16" },
  { id: "market_place", name: "Market Place by Jasons", categoryIds: ["supermarket"], aliases: ["market place", "jasons"], logo: "🛒", accentColor: "#f97316" },

  // 2X yuu積分 (1%) - 油站
  { id: "shell", name: "Shell 蜆殼", categoryIds: ["petrol"], aliases: ["shell", "蜆殼"], logo: "https://logo.clearbit.com/shell.com.hk", accentColor: "#facc15" },

  // ========== 渣打 Smart 卡特約商戶 ==========
  { id: "japanhome", name: "Japan Home 日本城", categoryIds: ["home"], aliases: ["japan home", "日本城"], logo: "https://logo.clearbit.com/japanhome.com.hk", accentColor: "#dc2626" },

  // ========== 電訊 ==========
  { id: "cmhk", name: "中國移動香港 CMHK", categoryIds: ["telecom", "online"], aliases: ["cmhk", "中國移動", "china mobile"], logo: "https://logo.clearbit.com/hk.chinamobile.com", accentColor: "#0ea5e9", isOnlineOnly: true },
  { id: "csl", name: "CSL", categoryIds: ["telecom"], aliases: ["csl", "1010"], logo: "https://logo.clearbit.com/csl.com", accentColor: "#e11d48" },
  { id: "smartone", name: "SmarTone 數碼通", categoryIds: ["telecom"], aliases: ["smartone", "數碼通"], logo: "https://logo.clearbit.com/smartone.com", accentColor: "#16a34a" },
  { id: "3hk", name: "3 香港", categoryIds: ["telecom"], aliases: ["3hk", "3香港", "three"], logo: "https://logo.clearbit.com/three.com.hk", accentColor: "#000000" },
  { id: "hgc", name: "HGC 環電", categoryIds: ["telecom"], aliases: ["hgc", "環電", "和記環球電訊"], logo: "https://logo.clearbit.com/hgc.com.hk", accentColor: "#dc2626" },
  { id: "hkbn", name: "香港寬頻 HKBN", categoryIds: ["telecom"], aliases: ["hkbn", "香港寬頻", "hkbroadband"], logo: "https://logo.clearbit.com/hkbn.net", accentColor: "#3b82f6" },

  // ========== 油站 ==========
  { id: "caltex", name: "Caltex 加德士", categoryIds: ["petrol"], aliases: ["caltex", "加德士"], logo: "https://logo.clearbit.com/caltex.com", accentColor: "#dc2626" },
  { id: "esso", name: "Esso 埃索", categoryIds: ["petrol"], aliases: ["esso", "埃索"], logo: "https://logo.clearbit.com/esso.com.hk", accentColor: "#1d4ed8" },
  { id: "sinopec", name: "Sinopec 中石化", categoryIds: ["petrol"], aliases: ["sinopec", "中石化"], logo: "https://logo.clearbit.com/sinopec.com", accentColor: "#dc2626" },
  { id: "petrochina", name: "PetroChina 中油", categoryIds: ["petrol"], aliases: ["petrochina", "中油", "中國石油"], logo: "https://logo.clearbit.com/petrochina.com.cn", accentColor: "#dc2626" },

  // ========== 交通 ==========
  { id: "citybus", name: "Citybus 城巴", categoryIds: ["transport"], aliases: ["citybus", "城巴"], logo: "https://logo.clearbit.com/citybus.com.hk", accentColor: "#facc15" },
  { id: "nwfb", name: "NWFB 新巴", categoryIds: ["transport"], aliases: ["nwfb", "新巴", "new world first bus"], logo: "https://logo.clearbit.com/nwfb.com.hk", accentColor: "#f97316" },
  { id: "hktramways", name: "Hong Kong Tramways 香港電車", categoryIds: ["transport"], aliases: ["tram", "電車", "叮叮"], logo: "🚃", accentColor: "#16a34a" },
  { id: "star_ferry", name: "Star Ferry 天星小輪", categoryIds: ["transport"], aliases: ["star ferry", "天星小輪", "天星"], logo: "⛴️", accentColor: "#16a34a" },

  // ========== 百貨公司 ==========
  { id: "aeon", name: "AEON 永旺", categoryIds: ["department_store", "supermarket"], aliases: ["aeon", "永旺", "jusco"], logo: "https://logo.clearbit.com/aeon.com.hk", accentColor: "#ec4899" },
  { id: "muji", name: "MUJI 無印良品", categoryIds: ["department_store", "home", "sports_apparel"], aliases: ["muji", "無印良品", "無印"], logo: "https://logo.clearbit.com/muji.com", accentColor: "#78350f" },

  // ========== 運動服飾 ==========
  { id: "nike", name: "Nike", categoryIds: ["sports_apparel"], aliases: ["nike"], logo: "https://logo.clearbit.com/nike.com", accentColor: "#000000" },
  { id: "adidas", name: "Adidas", categoryIds: ["sports_apparel"], aliases: ["adidas"], logo: "https://logo.clearbit.com/adidas.com", accentColor: "#000000" },
  { id: "lululemon", name: "lululemon", categoryIds: ["sports_apparel"], aliases: ["lululemon"], logo: "https://logo.clearbit.com/lululemon.com", accentColor: "#dc2626" },
  { id: "decathlon", name: "Decathlon 迪卡儂", categoryIds: ["sports_apparel"], aliases: ["decathlon", "迪卡儂"], logo: "https://logo.clearbit.com/decathlon.com", accentColor: "#0ea5e9" },
  { id: "gu", name: "GU", categoryIds: ["sports_apparel", "department_store"], aliases: ["gu"], logo: "https://logo.clearbit.com/gu-global.com", accentColor: "#dc2626" },
  { id: "uniqlo", name: "UNIQLO", categoryIds: ["sports_apparel", "department_store"], aliases: ["uniqlo", "優衣庫"], logo: "https://logo.clearbit.com/uniqlo.com", accentColor: "#dc2626" },

  // ========== 停車場/隧道 ==========
  { id: "autotoll", name: "Autotoll 易通行", categoryIds: ["tunnel_fee"], aliases: ["autotoll", "易通行", "隧道費"], logo: "🚗", accentColor: "#3b82f6" },
  { id: "wilson_parking", name: "Wilson Parking 威信停車場", categoryIds: ["parking"], aliases: ["wilson", "威信", "停車場"], logo: "🅿️", accentColor: "#1d4ed8" },

  // ========== 電動車充電 ==========
  { id: "ev_charging", name: "電動車充電站", categoryIds: ["ev_charging"], aliases: ["ev charging", "充電站", "電動車"], logo: "🔌", accentColor: "#16a34a", isGeneral: true },
];
