/**
 * 商戶數據 - 從 Web 版本同步
 */

import { MerchantCategory, Merchant } from '../types';

export const MERCHANT_CATEGORIES: MerchantCategory[] = [
  {
    id: 'supermarket',
    name: '超市',
    icon: '🛒',
    merchants: [
      { id: 'wellcome', name: 'Wellcome 惠康', category: 'supermarket', aliases: ['惠康', 'wellcome'] },
      { id: 'parknshop', name: 'PARKnSHOP 百佳', category: 'supermarket', aliases: ['百佳', 'parknshop', 'pns'] },
      { id: 'yata', name: 'YATA 一田', category: 'supermarket', aliases: ['一田', 'yata'] },
      { id: '759', name: '759 阿信屋', category: 'supermarket', aliases: ['阿信屋', '759'] },
      { id: 'hktvmall', name: 'HKTVmall', category: 'supermarket', aliases: ['hktv', 'hktvmall'] },
      { id: 'donki', name: 'Don Don Donki', category: 'supermarket', aliases: ['donki', '激安殿堂'] },
      { id: 'mannings', name: 'Mannings 萬寧', category: 'supermarket', aliases: ['萬寧', 'mannings'] },
      { id: 'watsons', name: 'Watsons 屈臣氏', category: 'supermarket', aliases: ['屈臣氏', 'watsons'] },
      { id: 'citysuper', name: "city'super", category: 'supermarket', aliases: ['citysuper'] },
      { id: 'aeon', name: 'AEON 永旺', category: 'supermarket', aliases: ['永旺', 'aeon', 'jusco'] },
    ],
  },
  {
    id: 'dining',
    name: '餐飲',
    icon: '🍽️',
    merchants: [
      { id: 'mcdonalds', name: "McDonald's 麥當勞", category: 'dining', aliases: ['麥當勞', 'mcdonalds', 'mcd'] },
      { id: 'starbucks', name: 'Starbucks 星巴克', category: 'dining', aliases: ['星巴克', 'starbucks'] },
      { id: 'pacific_coffee', name: 'Pacific Coffee', category: 'dining', aliases: ['太平洋咖啡', 'pacific coffee'] },
      { id: 'kfc', name: 'KFC 肯德基', category: 'dining', aliases: ['肯德基', 'kfc'] },
      { id: 'genki_sushi', name: '元氣壽司', category: 'dining', aliases: ['元氣', 'genki'] },
      { id: 'yoshinoya', name: '吉野家', category: 'dining', aliases: ['yoshinoya'] },
      { id: 'fairwood', name: '大快活', category: 'dining', aliases: ['fairwood', '大快活'] },
      { id: 'cafe_de_coral', name: '大家樂', category: 'dining', aliases: ['大家樂', 'cafe de coral'] },
      { id: 'maxims', name: "美心 Maxim's", category: 'dining', aliases: ['美心', 'maxims'] },
      { id: 'lady_m', name: 'Lady M', category: 'dining', aliases: ['lady m', 'ladym', '千層蛋糕'] },
    ],
  },
  {
    id: 'travel',
    name: '旅遊/外幣',
    icon: '✈️',
    merchants: [
      { id: 'cathay-pacific', name: '國泰航空', category: 'travel', aliases: ['cathay', '國泰'] },
      { id: 'hk-express', name: 'HK Express', category: 'travel', aliases: ['香港快運'] },
      { id: 'klook', name: 'Klook', category: 'travel', aliases: ['客路'] },
      { id: 'kkday', name: 'KKday', category: 'travel', aliases: [] },
      { id: 'trip-com', name: 'Trip.com', category: 'travel', aliases: ['攜程', 'ctrip'] },
      { id: 'agoda', name: 'Agoda', category: 'travel', aliases: [] },
      { id: 'booking-com', name: 'Booking.com', category: 'travel', aliases: [] },
      { id: 'expedia', name: 'Expedia', category: 'travel', aliases: [] },
    ],
  },
  {
    id: 'online',
    name: '網購/串流',
    icon: '💻',
    merchants: [
      { id: 'taobao', name: '淘寶/天貓', category: 'online', aliases: ['taobao', 'tmall', '天貓'] },
      { id: 'jd', name: '京東', category: 'online', aliases: ['jd'] },
      { id: 'amazon', name: 'Amazon', category: 'online', aliases: ['亞馬遜'] },
      { id: 'amazon_japan', name: 'Amazon Japan', category: 'online', aliases: ['amazon.co.jp', '日本亞馬遜', 'amazon jp'] },
      { id: 'rakuten', name: 'Rakuten 樂天', category: 'online', aliases: ['rakuten', '樂天', '樂天市場'] },
      { id: 'netflix', name: 'Netflix', category: 'online', aliases: [] },
      { id: 'spotify', name: 'Spotify', category: 'online', aliases: [] },
      { id: 'apple', name: 'Apple Store', category: 'online', aliases: ['app store', 'itunes'] },
      { id: 'google-play', name: 'Google Play', category: 'online', aliases: ['google play store', 'play store'] },
    ],
  },
  {
    id: 'transport',
    name: '交通',
    icon: '🚇',
    merchants: [
      { id: 'mtr', name: 'MTR 港鐵', category: 'transport', aliases: ['港鐵', 'mtr'] },
      { id: 'octopus', name: '八達通', category: 'transport', aliases: ['octopus'] },
      { id: 'uber', name: 'Uber', category: 'transport', aliases: [] },
      { id: 'hkgrabcar', name: 'HKTaxi', category: 'transport', aliases: ['的士'] },
      { id: 'shell', name: 'Shell 蜆殼', category: 'transport', aliases: ['蜆殼', 'shell'] },
      { id: 'esso', name: 'Esso 埃索', category: 'transport', aliases: ['埃索', 'esso'] },
      { id: 'caltex', name: 'Caltex 加德士', category: 'transport', aliases: ['加德士', 'caltex'] },
    ],
  },
  {
    id: 'entertainment',
    name: '娛樂/影音',
    icon: '🎬',
    merchants: [
      { id: 'cinema', name: '戲院', category: 'entertainment', aliases: ['電影院', 'cinema', 'mce', 'ua', 'broadway'] },
      { id: 'disney-plus', name: 'Disney+', category: 'entertainment', aliases: ['disney+'] },
      { id: 'hong_kong_disneyland', name: '香港迪士尼樂園', category: 'entertainment', aliases: ['迪士尼', 'disneyland', 'disney', '香港迪士尼'] },
      { id: 'universal_studios', name: 'Universal Studios', category: 'entertainment', aliases: ['universal', '環球影城'] },
      { id: 'youtube', name: 'YouTube Premium', category: 'entertainment', aliases: [] },
      { id: 'nintendo', name: 'Nintendo', category: 'entertainment', aliases: ['任天堂'] },
      { id: 'playstation', name: 'PlayStation', category: 'entertainment', aliases: ['ps', 'psn', 'ps store', 'ps5', 'ps4'] },
    ],
  },
  {
    id: 'government',
    name: '政府繳費',
    icon: '🏛️',
    merchants: [
      { id: 'gov_bill', name: '政府繳費', category: 'government', aliases: ['繳費靈', 'pps'] },
      { id: 'water', name: '水費', category: 'government', aliases: [] },
      { id: 'rates', name: '差餉', category: 'government', aliases: [] },
    ],
  },
  {
    id: 'tax',
    name: '交稅',
    icon: '📋',
    merchants: [
      { id: 'tax', name: '交稅', category: 'tax', aliases: ['稅務', 'tax'] },
    ],
  },
  {
    id: 'insurance',
    name: '保險',
    icon: '🛡️',
    merchants: [
      { id: 'insurance', name: '保險', category: 'insurance', aliases: [] },
      { id: 'aia', name: 'AIA 友邦', category: 'insurance', aliases: ['友邦', 'aia'] },
      { id: 'prudential', name: '保誠', category: 'insurance', aliases: ['prudential'] },
      { id: 'manulife', name: '宏利', category: 'insurance', aliases: ['manulife'] },
    ],
  },
  {
    id: 'utilities',
    name: '水電煤',
    icon: '💡',
    merchants: [
      { id: 'clp', name: 'CLP 中電', category: 'utilities', aliases: ['中電', 'clp'] },
      { id: 'hkelectric', name: '港燈', category: 'utilities', aliases: ['hk electric'] },
      { id: 'towngas', name: '煤氣', category: 'utilities', aliases: ['towngas', '中華煤氣'] },
    ],
  },
  {
    id: 'ewallet',
    name: '電子錢包',
    icon: '📱',
    merchants: [
      { id: 'payme', name: 'PayMe', category: 'ewallet', aliases: [] },
      { id: 'alipayhk', name: 'AlipayHK', category: 'ewallet', aliases: ['支付寶', 'alipay'] },
      { id: 'wechat-pay', name: 'WeChat Pay HK', category: 'ewallet', aliases: ['微信支付'] },
      { id: 'tap-go', name: 'Tap & Go', category: 'ewallet', aliases: ['拍住賞'] },
    ],
  },
  {
    id: 'electronics',
    name: '電器/數碼',
    icon: '📺',
    merchants: [
      { id: 'fortress', name: '豐澤', category: 'electronics', aliases: ['fortress'] },
      { id: 'broadway', name: '百老滙', category: 'electronics', aliases: ['broadway'] },
      { id: 'chung_yuen', name: '中原電器', category: 'electronics', aliases: ['中原'] },
      { id: 'apple', name: 'Apple Store', category: 'electronics', aliases: ['蘋果'] },
      { id: 'log_on', name: 'LOG-ON', category: 'electronics', aliases: [] },
    ],
  },
  {
    id: 'sports',
    name: '運動/健身',
    icon: '🏃',
    merchants: [
      { id: 'pure_fitness', name: 'PURE Fitness', category: 'sports', aliases: ['pure fitness', 'pure', 'pure yoga'] },
      { id: 'puma', name: 'PUMA', category: 'sports', aliases: ['puma'] },
      { id: 'nike', name: 'Nike', category: 'sports', aliases: ['nike'] },
      { id: 'adidas', name: 'Adidas', category: 'sports', aliases: ['adidas'] },
      { id: 'decathlon', name: 'Decathlon 迪卡儂', category: 'sports', aliases: ['decathlon', '迪卡儂'] },
    ],
  },
  {
    id: 'department',
    name: '百貨公司',
    icon: '🏬',
    merchants: [
      { id: 'sogo', name: 'SOGO 崇光', category: 'department', aliases: ['崇光', 'sogo'] },
      { id: 'lane_crawford', name: 'Lane Crawford', category: 'department', aliases: ['連卡佛'] },
      { id: 'harvey_nichols', name: 'Harvey Nichols', category: 'department', aliases: [] },
      { id: 'seibu', name: 'Seibu 西武', category: 'department', aliases: ['西武'] },
    ],
  },
];

// 所有商戶（扁平化列表）
export const MERCHANTS: Merchant[] = MERCHANT_CATEGORIES.flatMap(cat => cat.merchants);

// 熱門商戶
export const POPULAR_MERCHANTS: Merchant[] = [
  ...MERCHANT_CATEGORIES.find(c => c.id === 'supermarket')?.merchants.slice(0, 5) || [],
  ...MERCHANT_CATEGORIES.find(c => c.id === 'dining')?.merchants.slice(0, 5) || [],
  ...MERCHANT_CATEGORIES.find(c => c.id === 'online')?.merchants.slice(0, 5) || [],
];

// 取得所有商戶（扁平化）
export function getAllMerchants(): Merchant[] {
  return MERCHANTS;
}

// 根據 ID 取得商戶
export function getMerchantById(id: string): Merchant | undefined {
  return getAllMerchants().find(m => m.id === id);
}

// 搜尋商戶（支援名稱和別名）
export function searchMerchants(query: string): Merchant[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  
  return getAllMerchants().filter(m => 
    m.name.toLowerCase().includes(q) ||
    m.id.includes(q) ||
    m.aliases?.some(a => a.toLowerCase().includes(q))
  );
}

// 取得類別
export function getCategoryById(id: string): MerchantCategory | undefined {
  return MERCHANT_CATEGORIES.find(c => c.id === id);
}

