import { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { adminAuthClient } from "@/lib/supabase/admin-client";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { 
  ExternalLink, Calendar, Tag, Clock, ArrowLeft, MessageCircle, 
  ChevronDown, Share2, BookOpen, Globe, ChevronRight,
  AlertTriangle, CheckCircle, XCircle, Info, CreditCard, 
  ShoppingCart, Plane, Calculator, Trophy, Smartphone
} from "lucide-react";
import { SharePromoButton } from "@/app/discover/components/share-promo-button";
import { PromoReviews } from "@/app/discover/components/promo-reviews";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Promo, PromoFAQ } from "@/lib/types";
import { PROMOS } from "@/lib/data/promos";
import { WHATSAPP_GROUP_URL } from "@/lib/constants";
import { getSystemSetting } from "@/lib/data/settings";
import { HK_CARDS } from "@/lib/data/cards";
import { ShareButton } from "@/components/share-button";
import { ShareSection } from "@/components/share-section";
import { DebitCardGuide, debitCardFaqData } from "./debit-card-guide";
import { MilesVsCashbackGuide, milesVsCashbackFaqData } from "./miles-vs-cashback-guide";
import { BestCashbackCardsGuide, bestCashbackCardsFaqData } from "./best-cashback-cards-guide";
import { UtilityBillGuide, utilityBillFaqData } from "./utility-bill-guide";
import { RentPaymentGuide, rentPaymentFaqData } from "./rent-payment-guide";
import { TaxPaymentGuide, taxPaymentFaqData } from "./tax-payment-guide";
import { OnlineShoppingGuide, onlineShoppingFaqData } from "./online-shopping-guide";
import { DiningGuide, diningFaqData } from "./dining-guide";
import { OverseasSpendingGuide, overseasSpendingFaqData } from "./overseas-spending-guide";
import { SupermarketGuide, supermarketFaqData } from "./supermarket-guide";
import { TaobaoGuide, taobaoFaqData } from "./taobao-guide";
import { NoAnnualFeeGuide, noAnnualFeeFaqData } from "./no-annual-fee-guide";
import { StudentCardGuide, studentCardFaqData } from "./student-card-guide";
import { LargePurchaseGuide, largePurchaseFaqData } from "./large-purchase-guide";
import { OctopusGuide, octopusFaqData } from "./octopus-guide";
import { MobilePaymentGuide, mobilePaymentFaqData } from "./mobile-payment-guide";
import { LowIncomeGuide, lowIncomeFaqData } from "./low-income-guide";
import { FoodDeliveryGuide, foodDeliveryFaqData } from "./food-delivery-guide";
import { StreamingGuide, streamingFaqData } from "./streaming-guide";
import { DrivingGuide, drivingFaqData } from "./driving-guide";
import { InsuranceGuide, insuranceFaqData } from "./insurance-guide";
import { PinduoduoGuide, pinduoduoFaqData } from "./pinduoduo-guide";
import { UberGuide, uberFaqData } from "./uber-guide";
import { IherbGuide, iherbFaqData } from "./iherb-guide";
import { IphoneGuide, iphoneFaqData } from "./iphone-guide";
import { IpadGuide, ipadFaqData } from "./ipad-guide";
import { MacbookGuide, macbookFaqData } from "./macbook-guide";
import { AppleWatchGuide, appleWatchFaqData } from "./apple-watch-guide";
import { Ps5Guide, ps5FaqData } from "./ps5-guide";
import { XboxGuide, xboxFaqData } from "./xbox-guide";
import { SwitchGuide, switchFaqData } from "./switch-guide";
import { MilesCreditCardGuide, milesCreditCardFaqData } from "./miles-credit-card-guide";
import { PaymentMethodsGuide, paymentMethodsFaqData } from "./payment-methods-guide";
import { DahsingWinterPromoGuide } from "./dahsing-winter-promo-guide";
import { TuitionFeeGuide, tuitionFeeFaqData } from "./tuition-fee-guide";
import { ScTaxPayment2025Guide, scTaxPayment2025FaqData } from "./sc-tax-payment-2025";
import { BeaJcbContactless2025Guide, beaJcbContactless2025FaqData } from "./bea-jcb-contactless-2025";
import { UnionpayForeignFeeGuide, unionpayForeignFeeFaqData } from "./unionpay-foreign-fee-2025";
import BeaRewardExtension2026Guide, { beaRewardExtensionFaqData } from "./bea-reward-extension-2026";
import BocVisaCrazyRewards2026Guide, { bocVisaCrazyRewardsFaqData } from "./boc-visa-crazy-rewards-2026";
import { CitiPartnerOffersGuide, citiPartnerOffersFaqData } from "./citi-partner-offers-guide";
import { PayMeCreditCardGuide, paymeCreditCardFaqData } from "./payme-credit-card-guide";
import { ApplePayCreditCardGuide, applePayCreditCardFaqData } from "./apple-pay-credit-card-guide";
import { OctopusAavsCreditCardGuide, octopusAavsCreditCardFaqData } from "./octopus-aavs-credit-card-guide";
import { CostcoCreditCardGuide, costcoCreditCardFaqData } from "./costco-credit-card-guide";
import { WeChatPayCreditCardGuide, wechatPayCreditCardFaqData } from "./wechat-pay-credit-card-guide";
import { HkdOnlineShoppingGuide, hkdOnlineShoppingFaqData } from "./hkd-online-shopping-guide";
import AEJapanPromo2026Guide, { aeJapanPromoFaqData } from "./ae-japan-promo-2026";
import { CardPreviewSection, RECOMMENDED_CARDS } from "@/app/discover/components/card-preview-section";
import { CardMarkdownRenderer } from "@/app/discover/components/card-markdown-renderer";
import { ArticleTracker } from "@/app/discover/components/article-tracker";
import { ArticleReviews } from "@/app/discover/components/article-reviews";
import { PageViewTracker } from "@/components/page-view-tracker";

// Revalidate every 5 minutes
export const revalidate = 300;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

// ============ GUIDE DATA ============
// 攻略文章靜態資料
const GUIDES: Record<string, {
  id: string;
  title: string;
  seoTitle: string;
  heroTitle: string;
  heroSubtitle: string;
  description: string;
  content: string; // Will be rendered as component
  imageUrl: string;
  tags: string[];
  keywords: string[];
  publishDate: string;
  lastUpdated?: string; // 最後更新日期 (optional, defaults to current date)
  readTime: string;
}> = {
  "ae-japan-promo-2026": {
    id: "ae-japan-promo-2026",
    title: "AE 日本簽賬優惠｜Donki $80 回贈・LOFT $50 回贈・Osaka Metro $5 回贈",
    seoTitle: "AE 日本簽賬優惠 2026｜美國運通 Donki/LOFT/Osaka Metro 回贈攻略｜香港",
    heroTitle: "🎌 AE 日本簽賬優惠",
    heroSubtitle: "Donki・LOFT・Osaka Metro 回贈！",
    description: "AE 信用卡日本新春優惠！日本 Donki 簽 ¥20,000 回 HK$80、LOFT 簽 ¥10,000 回 HK$50、Osaka Metro 簽 ¥1,000 回 HK$5，需在 Amex HK App 登記！",
    content: "ae-japan-promo-2026",
    imageUrl: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=2070&auto=format&fit=crop",
    tags: ["日本", "Donki", "LOFT", "Osaka Metro", "AE", "American Express"],
    keywords: [
      "AE 日本",
      "美國運通 日本",
      "Donki 信用卡",
      "Don Quijote 回贈",
      "LOFT 信用卡",
      "Osaka Metro 信用卡",
      "日本旅行 信用卡",
    ],
    publishDate: "2026-01-29",
    lastUpdated: "2026-01-29",
    readTime: "4 分鐘",
  },
  "overseas-fee": {
    id: "overseas-fee",
    title: "海外簽賬手續費完全攻略｜DCC、CBF 陷阱拆解",
    seoTitle: "海外簽賬手續費完全攻略｜DCC、CBF 陷阱拆解｜網購、App Store、Netflix 避雷指南",
    heroTitle: "💳 海外簽賬手續費完全攻略",
    heroSubtitle: "DCC、CBF 陷阱大拆解！",
    description: "拆解信用卡海外簽賬 DCC、CBF 陷阱，教你點樣避開隱藏收費！Netflix、Spotify、App Store 都會中招？",
    content: "overseas-fee",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2070&auto=format&fit=crop",
    tags: ["海外消費", "網購", "手續費"],
    keywords: [
      "DCC 動態貨幣轉換",
      "CBF 跨境手續費",
      "海外簽賬手續費",
      "信用卡外幣手續費",
      "網購手續費",
      "App Store 手續費",
      "Netflix 信用卡收費",
    ],
    publishDate: "2025-01-01",
    readTime: "8 分鐘",
  },
  "payme-credit-card-guide": {
    id: "payme-credit-card-guide",
    title: "2026 PayMe 信用卡增值攻略｜邊張卡最高回贈？",
    seoTitle: "PayMe 信用卡增值攻略 2026｜渣打Smart/HSBC Red/Citi 回贈比較｜香港",
    heroTitle: "💳 PayMe 信用卡增值攻略",
    heroSubtitle: "渣打 5% / HSBC Red 4% / Citi 2%",
    description: "PayMe 增值信用卡回贈比較！用信用卡增值 PayMe 賺回贈，HSBC Red 4%、渣打 Smart 5%、Citi Cash Back 2%⋯邊張最抵？附 PayMe 消費攻略！",
    content: "payme-credit-card-guide",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
    tags: ["PayMe", "電子錢包", "增值回贈", "HSBC Red", "渣打Smart"],
    keywords: [
      "PayMe 信用卡",
      "PayMe 增值 回贈",
      "PayMe 信用卡增值",
      "PayMe 邊張卡最抵",
      "PayMe 渣打 Smart",
      "PayMe HSBC Red",
      "電子錢包 信用卡",
    ],
    publishDate: "2026-01-26",
    readTime: "6 分鐘",
  },
  "apple-pay-credit-card-guide": {
    id: "apple-pay-credit-card-guide",
    title: "2026 Apple Pay 信用卡攻略｜NFC 感應支付最高回贈",
    seoTitle: "Apple Pay 信用卡攻略 2026｜HSBC Red/渣打/建行 感應支付回贈比較｜香港",
    heroTitle: "📱 Apple Pay 信用卡攻略",
    heroSubtitle: "HSBC Red 4% / 渣打 1.5% / 建行 eye 9%+",
    description: "Apple Pay 用邊張信用卡最抵？感應支付信用卡回贈比較！HSBC Red 8%、渣打 Simply Cash 1.5%、建行 eye 9%+⋯完整攻略！",
    content: "apple-pay-credit-card-guide",
    imageUrl: "https://images.unsplash.com/photo-1556740714-a8395b3bf30f?q=80&w=2070&auto=format&fit=crop",
    tags: ["Apple Pay", "感應支付", "NFC", "HSBC Red", "流動支付"],
    keywords: ["Apple Pay 信用卡", "Apple Pay 回贈", "NFC 信用卡", "感應支付 信用卡", "流動支付 回贈"],
    publishDate: "2026-01-26",
    readTime: "5 分鐘",
  },
  "octopus-aavs-credit-card-guide": {
    id: "octopus-aavs-credit-card-guide",
    title: "2026 八達通自動增值信用卡攻略｜AAVS 邊張卡最高回贈？",
    seoTitle: "八達通自動增值 AAVS 信用卡攻略 2026｜Citi Octopus/渣打Smart 回贈比較｜香港",
    heroTitle: "🚇 八達通自動增值攻略",
    heroSubtitle: "Citi Octopus 15% / 渣打 5%",
    description: "八達通自動增值 (AAVS) 信用卡回贈比較！Citi Octopus 15%、渣打 Smart 5%、HSBC Red⋯邊張最抵？附申請教學！",
    content: "octopus-aavs-credit-card-guide",
    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop",
    tags: ["八達通", "AAVS", "自動增值", "Citi Octopus", "交通回贈"],
    keywords: ["八達通 AAVS", "八達通 自動增值", "八達通 信用卡", "Citi Octopus", "交通 信用卡 回贈"],
    publishDate: "2026-01-26",
    readTime: "5 分鐘",
  },
  "costco-credit-card-guide": {
    id: "costco-credit-card-guide",
    title: "2026 Costco 信用卡攻略｜好市多只收 Visa/Mastercard！",
    seoTitle: "Costco 信用卡攻略 2026｜好市多香港收咩卡？Visa/Mastercard 回贈比較｜香港",
    heroTitle: "🛒 Costco 信用卡攻略",
    heroSubtitle: "只收 Visa/MC・最高 5% 回贈",
    description: "Costco 好市多香港只收 Visa 及 Mastercard！邊張信用卡 Costco 消費最抵？渣打 Smart 5%、恒生 enJoy 2%⋯完整攻略！",
    content: "costco-credit-card-guide",
    imageUrl: "https://images.unsplash.com/photo-1534723452862-4c874018d66d?q=80&w=2070&auto=format&fit=crop",
    tags: ["Costco", "好市多", "Visa", "Mastercard", "超市"],
    keywords: ["Costco 信用卡", "好市多 信用卡", "Costco 收咩卡", "Costco Visa", "Costco 回贈"],
    publishDate: "2026-01-26",
    readTime: "5 分鐘",
  },
  "wechat-pay-credit-card-guide": {
    id: "wechat-pay-credit-card-guide",
    title: "2026 WeChat Pay HK 信用卡攻略｜微信支付增值回贈比較",
    seoTitle: "WeChat Pay 信用卡攻略 2026｜微信支付 增值回贈・北上消費攻略｜香港",
    heroTitle: "💚 WeChat Pay HK 信用卡攻略",
    heroSubtitle: "微信支付・北上消費必備",
    description: "WeChat Pay HK 信用卡增值有冇回贈？微信支付跨境消費攻略！北上用邊張卡最抵？HSBC Pulse 銀聯 4.4%⋯",
    content: "wechat-pay-credit-card-guide",
    imageUrl: "https://images.unsplash.com/photo-1611262588024-d12430b98920?q=80&w=2074&auto=format&fit=crop",
    tags: ["WeChat Pay", "微信支付", "電子錢包", "北上消費", "跨境支付"],
    keywords: ["WeChat Pay 信用卡", "微信支付 回贈", "WeChat Pay 增值", "北上 信用卡", "跨境支付 信用卡"],
    publishDate: "2026-01-26",
    readTime: "6 分鐘",
  },
  "hkd-online-shopping-2026": {
    id: "hkd-online-shopping-2026",
    title: "🛒 港幣網購信用卡排行榜 2026｜最高8%回贈",
    seoTitle: "港幣網購信用卡排行榜 2026｜HKTVmall・百佳網店・友和回贈比較｜香港",
    heroTitle: "🛒 港幣網購信用卡排行榜",
    heroSubtitle: "2026 最高 8% 回贈攻略",
    description: "港幣網購邊張卡最抵？本文比較香港各大信用卡港幣網購回贈率，由 8% 到 4%，HKTVmall、百佳網店、友和 YOHO 等都適用！",
    content: "hkd-online-shopping-2026",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
    tags: ["港幣網購", "排行榜", "HKTVmall", "2026"],
    keywords: ["港幣網購 信用卡", "HKTVmall 信用卡", "網購 回贈", "百佳網店 信用卡", "友和 信用卡", "網購最抵信用卡"],
    publishDate: "2026-01-28",
    readTime: "8 分鐘",
  },
  "debit-card-guide": {
    id: "debit-card-guide",
    title: "Debit Card 扣賬卡完全攻略｜香港銀行比較、海外使用、申請教學",
    seoTitle: "Debit Card 扣賬卡完全攻略 2025｜中文解釋、vs 信用卡比較、HSBC/恒生/中銀比較｜香港",
    heroTitle: "💳 Debit Card 扣賬卡完全攻略",
    heroSubtitle: "香港各銀行比較、海外使用貼士",
    description: "Debit Card 中文係咩？同 Credit Card 有咩分別？HSBC、恒生、中銀 Debit Card 邊張最抵？日本旅行用 Debit Card 得唔得？本文一一解答！",
    content: "debit-card-guide",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop",
    tags: ["基礎知識", "銀行卡", "海外消費"],
    keywords: [
      "debit card 中文",
      "debit card 用法",
      "debit card hsbc",
      "debit card hang seng",
      "debit card 日本",
      "debit card 海外簽賬",
      "debit card 中銀",
      "debit card 好處",
      "debit card 申請",
      "debit card 香港",
      "debit card vs credit card",
      "debit card 推薦",
      "debit card meaning",
      "扣賬卡",
      "借記卡",
    ],
    publishDate: "2025-01-01",
    readTime: "10 分鐘",
  },
  "miles-vs-cashback": {
    id: "miles-vs-cashback",
    title: "儲里數定現金回贈抵？完全分析指南｜1里數值幾錢？里數換機票攻略",
    seoTitle: "里數 vs 現金回贈 2025｜1里數幾錢？里數換機票攻略｜里數信用卡比較｜香港",
    heroTitle: "✈️ 里數 vs 現金回贈",
    heroSubtitle: "儲邊樣最抵？完全分析指南",
    description: "儲里數定現金回贈抵？1 里數值幾錢？里數換機票有咩技巧？買里數、里數加現金抵唔抵？本文用數據分析，幫你揀最啱你嘅信用卡回贈方式！",
    content: "miles-vs-cashback",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop",
    tags: ["里數", "現金回贈", "信用卡攻略"],
    keywords: [
      "里數vs現金回贈",
      "里數現金兌換率",
      "里數價值",
      "里數換機票",
      "1里數幾錢",
      "里數加現金抵唔抵",
      "里數信用卡",
      "買里數",
      "asia miles",
      "現金回贈信用卡",
      "儲里數",
      "信用卡里數",
      "里數機票",
    ],
    publishDate: "2025-01-01",
    readTime: "12 分鐘",
  },
  "best-miles-credit-cards": {
    id: "best-miles-credit-cards",
    title: "2025 最抵里數信用卡攻略｜Asia Miles 信用卡比較｜儲里數技巧",
    seoTitle: "里數信用卡攻略 2025｜最抵 Asia Miles 信用卡比較｜儲里數邊張卡最好｜香港",
    heroTitle: "✈️ 里數信用卡攻略",
    heroSubtitle: "Asia Miles 信用卡完全比較",
    description: "2025年最抵儲里數信用卡比較！渣打國泰、HSBC EveryMile、Citi PremierMiles、DBS Black 邊張最啱你？$/里比率、年費、迎新獎賞完全分析，教你揀最啱自己嘅里數卡！",
    content: "best-miles-credit-cards",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop",
    tags: ["里數", "Asia Miles", "信用卡攻略"],
    keywords: [
      "里數信用卡",
      "里數信用卡2025",
      "asia miles信用卡",
      "asia miles 信用卡比較",
      "儲里數信用卡",
      "儲里數邊張卡好",
      "里數卡推薦",
      "渣打國泰卡",
      "hsbc everymile",
      "citi premiermiles",
      "dbs black card",
      "里數換機票",
      "最抵里數卡",
      "avios 信用卡",
      "里數計劃比較",
    ],
    publishDate: "2025-12-11",
    readTime: "15 分鐘",
  },
  "best-cashback-cards": {
    id: "best-cashback-cards",
    title: "2025 最高回贈信用卡比較｜現金回贈信用卡推薦組合",
    seoTitle: "2025 最高回贈信用卡比較｜無上限現金回贈信用卡推薦｜邊張信用卡好｜香港",
    heroTitle: "💰 2025 最高回贈信用卡",
    heroSubtitle: "現金回贈信用卡完全比較指南",
    description: "2025年現金回贈信用卡邊張最抵？無上限現金回贈信用卡有邊幾張？本地消費、網購、餐飲、超市信用卡回贈完全比較，教你揀最適合自己嘅信用卡組合！",
    content: "best-cashback-cards",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
    tags: ["現金回贈", "信用卡比較", "信用卡攻略"],
    keywords: [
      "本地消費信用卡回贈",
      "現金回贈信用卡",
      "現金回贈信用卡2025",
      "無上限現金回贈信用卡",
      "信用卡回贈2025",
      "信用卡現金回贈比較",
      "邊張信用卡好",
      "網購信用卡",
      "餐飲信用卡",
      "超市信用卡",
      "信用卡推薦",
      "信用卡組合",
    ],
    publishDate: "2025-01-01",
    readTime: "15 分鐘",
  },
  "utility-bill-guide": {
    id: "utility-bill-guide",
    title: "信用卡繳費攻略｜交水電煤/差餉/電話費/管理費高達4%回贈",
    seoTitle: "信用卡繳費攻略 2025｜交水電煤/差餉/電話費最高4%回贈｜AlipayHK/BoC Pay 繳費",
    heroTitle: "💡 信用卡繳費攻略",
    heroSubtitle: "交水電煤/差餉/電話費/管理費最高4%回贈",
    description: "用信用卡交水電煤、差餉、電話費、管理費可以賺回贈！本文教你網上繳費信用卡邊張最抵，AlipayHK、BoC Pay、雲閃付繳費攻略，每年輕鬆賺返幾百蚊！",
    content: "utility-bill-guide",
    imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2070&auto=format&fit=crop",
    tags: ["繳費", "水電煤", "差餉", "信用卡攻略"],
    keywords: [
      "煤氣繳費信用卡",
      "網上繳費信用卡",
      "信用卡繳費攻略",
      "信用卡繳費優惠",
      "網上繳費信用卡回贈",
      "差餉信用卡繳費",
      "Alipay繳費信用卡",
      "中電繳費信用卡",
      "交電費信用卡",
      "交水費信用卡2025",
      "信用卡交電費優惠",
      "交煤氣費信用卡",
      "電話費信用卡回贈",
      "電話費信用卡2025",
      "信用卡交差餉2025",
      "管理費信用卡回饋",
      "管理費信用卡2025",
    ],
    publishDate: "2025-01-01",
    readTime: "10 分鐘",
  },
  "rent-payment-guide": {
    id: "rent-payment-guide",
    title: "信用卡交租攻略｜公屋/私樓用 RentSmart 交租賺回贈",
    seoTitle: "信用卡交租攻略 2025｜公屋/私樓用 RentSmart 交租賺回贈｜食迎新必睇",
    heroTitle: "🏠 信用卡交租攻略",
    heroSubtitle: "公屋/私樓都可以用信用卡交租賺回贈",
    description: "信用卡交租有回贈嗎？公屋、私樓可以用信用卡交租嗎？本文教你透過 RentSmart、KeyChain Pay 用信用卡交租，仲可以食迎新！交租信用卡推薦及回贈計算。",
    content: "rent-payment-guide",
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2070&auto=format&fit=crop",
    tags: ["交租", "公屋", "私樓", "信用卡攻略"],
    keywords: [
      "公屋交租信用卡",
      "交租信用卡2025",
      "RentSmart交租信用卡",
      "信用卡交租lihkg",
      "公屋交租信用卡2025",
      "RentSmart信用卡",
      "RentSmart呃人",
      "HSBC信用卡交租",
      "私樓交租信用卡",
      "交租信用卡回贈",
      "KeyChain Pay",
      "信用卡交租迎新",
      "交租平台比較",
    ],
    publishDate: "2025-01-01",
    readTime: "12 分鐘",
  },
  "tax-payment-guide": {
    id: "tax-payment-guide",
    title: "信用卡交稅攻略｜AlipayHK/雲閃付/BoC Pay 交稅賺高達2%回贈",
    seoTitle: "信用卡交稅攻略 2025/2026｜AlipayHK/雲閃付交稅賺2%回贈｜免息分期",
    heroTitle: "📋 信用卡交稅攻略",
    heroSubtitle: "AlipayHK/雲閃付/BoC Pay 交稅賺高達2%回贈",
    description: "信用卡交稅有回贈嗎？透過 AlipayHK、雲閃付、BoC Pay 交稅可賺高達 2% 回贈！本文教你交稅信用卡攻略、各銀行交稅優惠、免息分期計劃比較。",
    content: "tax-payment-guide",
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop",
    tags: ["交稅", "AlipayHK", "雲閃付", "信用卡攻略"],
    keywords: [
      "交稅信用卡優惠",
      "交稅信用卡回贈",
      "信用卡交稅優惠2026",
      "交稅信用卡2025",
      "交稅信用卡hsbc",
      "渣打信用卡交稅",
      "中銀信用卡交稅",
      "恒生信用卡交稅",
      "AlipayHK交稅",
      "雲閃付交稅",
      "BoC Pay交稅",
      "交稅分期",
      "免息交稅分期",
    ],
    publishDate: "2025-01-01",
    readTime: "12 分鐘",
  },
  "sc-tax-payment-2025": {
    id: "sc-tax-payment-2025",
    title: "渣打信用卡交稅優惠攻略｜高達$2,300回贈/23,000里",
    seoTitle: "渣打信用卡交稅優惠 2025｜交稅高達$2,300回贈/23,000 Asia Miles｜分期早鳥優惠",
    heroTitle: "🔥 渣打信用卡交稅優惠",
    heroSubtitle: "高達$2,300回贈 / 23,000 Asia Miles｜早鳥優惠12月31日截止",
    description: "渣打信用卡推出交稅及分期優惠！透過渣打網上理財交稅，特選客戶可賺高達$2,300現金回贈或23,000 Asia Miles！12月31日前完成分期更有早鳥額外獎賞！",
    content: "sc-tax-payment-2025",
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop",
    tags: ["渣打", "交稅", "分期", "里數", "限時優惠"],
    keywords: [
      "渣打信用卡交稅",
      "渣打交稅優惠",
      "渣打交稅分期",
      "渣打交稅回贈",
      "渣打交稅里數",
      "Standard Chartered 交稅",
      "SC Simply Cash 交稅",
      "渣打國泰卡交稅",
      "交稅信用卡優惠2025",
      "交稅分期免息",
      "交稅賺里數",
      "交稅早鳥優惠",
    ],
    publishDate: "2025-11-18",
    readTime: "8 分鐘",
  },
  "bea-jcb-contactless-2025": {
    id: "bea-jcb-contactless-2025",
    title: "BEA JCB 白金卡 Apple Pay/Google Pay 15% 現金回贈攻略",
    seoTitle: "BEA JCB 白金卡優惠 2025｜Apple Pay/Google Pay 非接觸式付款 15% 現金回贈｜最高$600",
    heroTitle: "🔥 BEA JCB Apple Pay/Google Pay 15% 回贈",
    heroSubtitle: "非接觸式付款（Apple Pay / Google Pay）15% 現金回贈｜最高 $600",
    description: "東亞銀行 BEA JCB 白金卡推出 Apple Pay / Google Pay 非接觸式付款 15% 現金回贈優惠！本地及澳門實體店用手機支付，每月簽滿 $500 即享 15% 回贈，整個推廣期最高可賺 $600！",
    content: "bea-jcb-contactless-2025",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
    tags: ["BEA", "JCB", "Apple Pay", "Google Pay", "非接觸式", "限時優惠"],
    keywords: [
      "BEA JCB 白金卡",
      "BEA JCB Apple Pay",
      "BEA JCB Google Pay",
      "東亞 JCB 卡",
      "非接觸式付款回贈",
      "Apple Pay 回贈",
      "Google Pay 回贈",
      "手機支付回贈",
      "JCB 信用卡優惠",
      "東亞銀行信用卡",
      "15%現金回贈",
    ],
    publishDate: "2025-10-15",
    readTime: "6 分鐘",
  },
  "unionpay-foreign-fee-2025": {
    id: "unionpay-foreign-fee-2025",
    title: "銀聯卡外幣手續費調整｜AEON 等銀聯卡開始收 1%",
    seoTitle: "銀聯卡外幣手續費 2025｜AEON/滙豐/恒生/安信銀聯卡收 1% 手續費｜替代方案",
    heroTitle: "⚠️ 銀聯卡外幣手續費調整",
    heroSubtitle: "AEON 等銀聯卡開始收取 1% 外幣交易手續費",
    description: "AEON 銀聯信用卡及香港各大銀行銀聯卡已開始收取 1% 外幣交易手續費。了解最新收費詳情、對持卡人嘅影響及替代方案！",
    content: "unionpay-foreign-fee-2025",
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=2071&auto=format&fit=crop",
    tags: ["銀聯", "外幣手續費", "AEON", "北上消費", "海外簽賬"],
    keywords: [
      "銀聯卡外幣手續費",
      "AEON 銀聯卡手續費",
      "銀聯 1% 手續費",
      "銀聯卡北上消費",
      "銀聯卡內地消費",
      "銀聯卡日本消費",
      "銀聯卡韓國消費",
      "HSBC Pulse 手續費",
      "恒生銀聯手續費",
      "安信銀聯手續費",
      "EarnMORE 外幣手續費",
      "WeWa 外幣手續費",
    ],
    publishDate: "2025-12-30",
    lastUpdated: "2025-12-30",
    readTime: "5 分鐘",
  },
  "boc-visa-crazy-rewards-2026": {
    id: "boc-visa-crazy-rewards-2026",
    title: "中銀 Visa 狂賞派+狂賞飛攻略｜本地5%/海外10%",
    seoTitle: "中銀 Visa 狂賞派+狂賞飛 2026 完全攻略｜本地5%回贈｜海外高達10%",
    heroTitle: "🔥 中銀 Visa 狂賞派 + 狂賞飛 完全攻略",
    heroSubtitle: "狂賞派：7大類別高達 5%｜狂賞飛：內地/澳門高達 10%！",
    description: "中銀 Visa 卡「狂賞派」+「狂賞飛」2026 完全攻略！狂賞派：7大類別高達 5%；狂賞飛：內地/澳門 6%，搭 Cheers VI 最高 10%！",
    content: "boc-visa-crazy-rewards-2026",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
    tags: ["中銀", "Visa", "狂賞派", "狂賞飛", "5%回贈", "北上", "需登記"],
    keywords: [
      "中銀 Visa 狂賞派",
      "中銀 Visa 狂賞飛",
      "中銀信用卡優惠",
      "BOC Visa 5%回贈",
      "中銀 Cheers 10%",
      "中銀 SOGO 卡",
      "中銀 Cheers 卡",
      "香港信用卡優惠 2026",
      "中銀 Visa 簽賬回贈",
      "狂賞派登記",
      "狂賞飛登記",
      "內地消費回贈",
      "北上消費",
    ],
    publishDate: "2026-01-01",
    lastUpdated: "2026-01-01",
    readTime: "8 分鐘",
  },
  "bea-reward-extension-2026": {
    id: "bea-reward-extension-2026",
    title: "東亞信用卡回贈推廣續期｜GOAL卡/i-Titanium 延長",
    seoTitle: "東亞銀行信用卡回贈延長 2026｜BEA GOAL/Flyer World/i-Titanium 推廣期更新",
    heroTitle: "📅 東亞信用卡回贈推廣續期",
    heroSubtitle: "GOAL卡/World Mastercard 續期至 6 月，i-Titanium 續期至 12 月",
    description: "東亞銀行多張信用卡額外獎分推廣延長！GOAL 卡、World Mastercard 續期至 2026 年 6 月，i-Titanium 卡續期至 12 月，回贈上下限維持不變。",
    content: "bea-reward-extension-2026",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
    tags: ["東亞銀行", "回贈延期", "GOAL卡", "i-Titanium", "Flyer World"],
    keywords: [
      "東亞信用卡回贈",
      "BEA GOAL 信用卡",
      "BEA i-Titanium",
      "BEA Flyer World Mastercard",
      "東亞 Visa Signature",
      "東亞銀聯卡",
      "東亞信用卡優惠",
      "BEA 額外獎分",
      "東亞信用卡推廣延長",
      "東亞信用卡 2026",
    ],
    publishDate: "2025-12-30",
    lastUpdated: "2025-12-30",
    readTime: "4 分鐘",
  },
  "online-shopping-guide": {
    id: "online-shopping-guide",
    title: "網購信用卡攻略｜HKTVmall/淘寶/Amazon 最高5%回贈",
    seoTitle: "網購信用卡攻略 2025｜網上簽賬信用卡比較｜HKTVmall/淘寶最高5%回贈",
    heroTitle: "🛒 網購信用卡攻略",
    heroSubtitle: "HKTVmall/淘寶/Amazon 最高5%回贈",
    description: "網購信用卡邊張回贈最高？網上簽賬定義係咩？本文教你網購信用卡攻略，HKTVmall、淘寶、Amazon 都可以賺高達 5% 回贈！外幣網購注意事項及 Apple Pay 網購攻略。",
    content: "online-shopping-guide",
    imageUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070&auto=format&fit=crop",
    tags: ["網購", "網上簽賬", "HKTVmall", "淘寶", "信用卡攻略"],
    keywords: [
      "網上簽賬定義",
      "網上簽賬現金回贈",
      "網上簽賬回贈信用卡",
      "網上簽賬外幣",
      "網上簽賬高達5現金回贈",
      "外幣網上簽賬信用卡",
      "信用卡網上簽賬定義",
      "網上簽賬信用卡比較",
      "網購信用卡2025",
      "HKTVmall信用卡",
      "淘寶信用卡",
      "Amazon信用卡",
      "Apple Pay網購",
    ],
    publishDate: "2025-01-01",
    readTime: "12 分鐘",
  },
  "dining-guide": {
    id: "dining-guide",
    title: "餐飲信用卡攻略｜食飯最高9%+回贈｜酒樓/快餐/外賣",
    seoTitle: "餐飲信用卡攻略 2026｜食飯信用卡比較｜酒樓/快餐/外賣最高9%+回贈",
    heroTitle: "🍽️ 餐飲信用卡攻略",
    heroSubtitle: "食飯最高9%+回贈｜酒樓/快餐/外賣",
    description: "食飯信用卡邊張回贈最高？餐飲簽賬定義係咩？本文教你餐飲信用卡攻略，酒樓、茶餐廳、快餐店、外賣平台都可以賺高達 9%+ 回贈！建行eye 9%+、AEON Purple 6%、Apple Pay 食飯攻略。",
    content: "dining-guide",
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2070&auto=format&fit=crop",
    tags: ["餐飲", "食肆", "外賣", "信用卡攻略"],
    keywords: [
      "食飯信用卡",
      "食飯信用卡2025",
      "食飯信用卡里數",
      "信用卡食肆回贈",
      "餐飲信用卡回贈",
      "餐飲簽賬信用卡",
      "餐飲信用卡回饋",
      "購物信用卡",
      "Foodpanda信用卡",
      "Keeta信用卡",
      "酒樓信用卡",
      "Apple Pay食飯",
    ],
    publishDate: "2025-01-01",
    readTime: "12 分鐘",
  },
  "overseas-spending-guide": {
    id: "overseas-spending-guide",
    title: "海外簽賬信用卡攻略｜旅行最高7%回贈｜日本/韓國/台灣",
    seoTitle: "海外簽賬信用卡攻略 2025｜旅行信用卡比較｜日本/韓國/台灣最高7%回贈",
    heroTitle: "✈️ 海外簽賬信用卡攻略",
    heroSubtitle: "旅行最高7%回贈｜日本/韓國/台灣/歐美",
    description: "海外簽賬信用卡邊張最抵？旅行用邊張卡？本文教你海外簽賬信用卡攻略，比較手續費、回贈率，日本、韓國、台灣、泰國、歐美旅行都適用！",
    content: "overseas-spending-guide",
    imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070&auto=format&fit=crop",
    tags: ["海外簽賬", "旅行", "日本", "韓國", "信用卡攻略"],
    keywords: [
      "海外簽賬信用卡優惠",
      "海外簽賬信用卡免手續費",
      "海外簽賬信用卡匯率",
      "海外簽賬信用卡最好",
      "海外簽賬信用卡比較",
      "海外簽賬信用卡手續費",
      "海外簽賬信用卡2025",
      "旅行信用卡2025",
      "旅行信用卡推薦",
      "旅行信用卡lihkg",
      "旅行信用卡學生",
      "旅行信用卡比較",
      "日本旅行信用卡",
      "韓國旅行信用卡",
    ],
    publishDate: "2025-01-01",
    readTime: "12 分鐘",
  },
  "supermarket-guide": {
    id: "supermarket-guide",
    title: "超市信用卡攻略｜百佳/惠康/HKTVmall 最高5%回贈",
    seoTitle: "超市信用卡攻略 2025｜百佳/惠康/HKTVmall/AEON 信用卡優惠比較",
    heroTitle: "🛒 超市信用卡攻略",
    heroSubtitle: "百佳/惠康/HKTVmall/AEON 最高5%回贈",
    description: "超市信用卡邊張回贈最高？百佳、惠康有咩信用卡優惠？本文教你超市信用卡攻略，HKTVmall、AEON 都可以賺高達 5% 回贈！92 折優惠日攻略。",
    content: "supermarket-guide",
    imageUrl: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=2070&auto=format&fit=crop",
    tags: ["超市", "百佳", "惠康", "HKTVmall", "信用卡攻略"],
    keywords: [
      "超市信用卡lihkg",
      "超市信用卡回贈",
      "AEON超市信用卡",
      "超市信用卡里數",
      "HKTVmall信用卡",
      "大生超市信用卡優惠",
      "惠康信用卡優惠",
      "HKTVmall信用卡95折",
      "百佳信用卡優惠",
      "百佳信用卡優惠2025",
      "百佳92折優惠日",
      "惠康信用卡優惠2025",
      "惠康92折",
    ],
    publishDate: "2025-01-01",
    readTime: "12 分鐘",
  },
  "taobao-guide": {
    id: "taobao-guide",
    title: "淘寶信用卡攻略｜扣埋手續費淨賺1.5%回贈",
    seoTitle: "淘寶信用卡攻略 2025｜AlipayHK 淘寶付款免手續費｜淨賺1.5%回贈",
    heroTitle: "🛍️ 淘寶信用卡攻略",
    heroSubtitle: "扣埋手續費淨賺1.5%回贈",
    description: "淘寶用邊張信用卡最抵？淘寶信用卡付款有手續費嗎？本文教你淘寶信用卡攻略，用 AlipayHK 付款免手續費，淨賺 1.5% 回贈！天貓、集運付款攻略。",
    content: "taobao-guide",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
    tags: ["淘寶", "天貓", "AlipayHK", "信用卡攻略"],
    keywords: [
      "淘寶信用卡付款失敗",
      "淘寶信用卡免手續費",
      "淘寶信用卡付款安全嗎",
      "淘寶付款方法香港2025",
      "淘寶信用卡手續費",
      "淘寶用邊張信用卡",
      "淘寶付款方式只有支付寶",
      "淘寶信用卡回贈",
      "天貓信用卡",
      "AlipayHK淘寶",
    ],
    publishDate: "2025-01-01",
    readTime: "12 分鐘",
  },
  "no-annual-fee-guide": {
    id: "no-annual-fee-guide",
    title: "永久免年費信用卡推薦｜年費豁免攻略｜waive年費方法",
    seoTitle: "永久免年費信用卡推薦 2025｜年費豁免攻略｜HSBC/Citi waive 年費方法",
    heroTitle: "💳 永久免年費信用卡攻略",
    heroSubtitle: "年費豁免攻略｜waive 年費方法",
    description: "邊張信用卡永久免年費？信用卡年費可以 waive 嗎？本文教你永久免年費信用卡推薦，仲有 HSBC、Citi 年費豁免攻略！",
    content: "no-annual-fee-guide",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop",
    tags: ["免年費", "年費豁免", "waive年費", "信用卡攻略"],
    keywords: [
      "永久免年費信用卡2025",
      "免年費信用卡hsbc",
      "免年費信用卡學生",
      "信用卡永久免年費",
      "免年費信用卡比較",
      "匯豐信用卡年費豁免申請",
      "免年費信用卡中銀",
      "免年費信用卡迎新",
      "waive年費hsbc",
      "waive年費citi",
      "信用卡年費幾時收",
    ],
    publishDate: "2025-01-01",
    readTime: "12 分鐘",
  },
  "student-card-guide": {
    id: "student-card-guide",
    title: "學生信用卡攻略｜大學生必備免入息證明信用卡推薦",
    seoTitle: "學生信用卡攻略 2025｜大學生信用卡推薦｜免入息證明信用卡比較",
    heroTitle: "🎓 學生信用卡攻略",
    heroSubtitle: "大學生必備免入息證明信用卡推薦",
    description: "大學生可以申請信用卡嗎？學生信用卡邊張最好？本文教你學生信用卡攻略，免入息證明信用卡推薦，建立信用記錄、網購/交學費賺回贈！",
    content: "student-card-guide",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
    tags: ["學生", "大學生", "免入息", "信用卡攻略"],
    keywords: [
      "大學生信用卡邊張好",
      "大學生信用卡額度",
      "大學生信用卡中銀",
      "學生信用卡lihkg",
      "學生信用卡申請條件",
      "大學生信用卡免年費",
      "學生信用卡visa",
      "免入息證明信用卡",
      "學生信用卡2025",
    ],
    publishDate: "2025-01-01",
    readTime: "12 分鐘",
  },
  "tuition-fee-guide": {
    id: "tuition-fee-guide",
    title: "交學費信用卡攻略｜大學學費最高4%回贈｜食迎新必睇",
    seoTitle: "交學費信用卡攻略 2025｜大學學費信用卡回贈｜AlipayHK繳費4%｜食迎新",
    heroTitle: "🎓 交學費信用卡攻略",
    heroSubtitle: "大學學費最高4%回贈｜食迎新必睇",
    description: "用信用卡交學費有回贈嗎？本文教你交學費信用卡攻略，比較各種繳費方式、AlipayHK/雲閃付繳費最高4%回贈，仲教你點用學費食迎新優惠！",
    content: "tuition-fee-guide",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
    tags: ["學費", "大學", "AlipayHK", "信用卡攻略"],
    keywords: [
      "交學費信用卡",
      "交學費信用卡回贈",
      "大學學費信用卡",
      "學費信用卡2025",
      "AlipayHK交學費",
      "雲閃付交學費",
      "Flywire信用卡",
      "學費迎新",
      "交學費回贈",
      "港大學費",
      "中大學費",
      "科大學費",
    ],
    publishDate: "2025-12-11",
    readTime: "12 分鐘",
  },
  "large-purchase-guide": {
    id: "large-purchase-guide",
    title: "大額簽賬信用卡攻略｜結婚/裝修/醫療賺盡迎新優惠",
    seoTitle: "大額簽賬信用卡攻略 2025｜結婚擺酒/裝修/醫療賺盡迎新優惠｜拆單大法",
    heroTitle: "💰 大額簽賬信用卡攻略",
    heroSubtitle: "結婚/裝修/醫療賺盡迎新優惠",
    description: "大額簽賬用邊張信用卡最抵？結婚擺酒、裝修、私家醫院點樣賺盡迎新優惠？本文教你大額簽賬信用卡攻略，拆單大法賺幾千蚊回贈！",
    content: "large-purchase-guide",
    imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2070&auto=format&fit=crop",
    tags: ["大額簽賬", "迎新", "結婚", "裝修", "信用卡攻略"],
    keywords: [
      "大額簽賬迎新信用卡",
      "大額簽賬信用卡2025",
      "醫院信用卡回贈",
      "大額簽賬優惠",
      "醫療簽賬信用卡",
      "婚宴信用卡",
      "結婚宴信用卡",
      "裝修信用卡分期",
      "信用卡迎新",
      "拆單大法",
    ],
    publishDate: "2025-01-01",
    readTime: "12 分鐘",
  },
  "octopus-guide": {
    id: "octopus-guide",
    title: "八達通自動增值&手動增值攻略｜最高5%回贈｜Chok 回贈教學",
    seoTitle: "八達通增值信用卡攻略 2025｜自動增值/手動增值/O!ePay 回贈比較｜Chok 回贈教學",
    heroTitle: "🚇 八達通自動增值&手動增值攻略",
    heroSubtitle: "最高5%回贈｜Chok 回贈教學",
    description: "八達通自動增值信用卡邊張有回贈？最高2%！八達通 App 手動增值最高5%回贈！本文教你八達通增值信用卡攻略，比較自動增值同手動增值回贈，Chok 回贈每年賺$1,440+！",
    content: "octopus-guide",
    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop",
    tags: ["八達通", "自動增值", "手動增值", "O!ePay", "Chok回贈"],
    keywords: [
      "八達通自動增值信用卡",
      "八達通自動增值信用卡2025",
      "八達通自動增值信用卡回贈",
      "八達通自動增值信用卡比較",
      "八達通手動增值信用卡回贈",
      "八達通App增值回贈",
      "八達通增值信用卡回贈",
      "八達通自動增值EarnMORE",
      "八達通自動增值Simply Cash",
      "八達通Chok回贈",
      "O!ePay信用卡",
      "八達通銀包信用卡",
      "八達通銀包增值",
      "八達通銀包轉賬",
    ],
    publishDate: "2025-01-01",
    lastUpdated: "2025-12-11",
    readTime: "15 分鐘",
  },
  "mobile-payment-guide": {
    id: "mobile-payment-guide",
    title: "手機支付信用卡攻略｜Apple Pay/Google Pay 回贈比較",
    seoTitle: "手機支付信用卡攻略 2025｜Apple Pay/Google Pay 回贈比較｜Mobile Pay 最高5%",
    heroTitle: "📱 手機支付信用卡攻略",
    heroSubtitle: "Apple Pay/Google Pay 回贈比較",
    description: "Apple Pay 信用卡回贈點計？Google Pay 同 Apple Pay 回贈一樣嗎？本文教你手機支付信用卡攻略，比較各銀行 Mobile Pay 回贈！",
    content: "mobile-payment-guide",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
    tags: ["Apple Pay", "Google Pay", "手機支付", "信用卡攻略"],
    keywords: [
      "手機支付信用卡2025",
      "手機支付信用卡回贈",
      "手機支付信用卡優惠",
      "Apple pay回贈信用卡",
      "手機支付定義",
      "手機支付回贈",
      "Google pay信用卡回贈",
      "Apple pay信用卡優惠",
      "Apple pay信用卡付款",
      "Apple pay信用卡回贈",
    ],
    publishDate: "2025-01-01",
    readTime: "12 分鐘",
  },
  "payment-methods-guide": {
    id: "payment-methods-guide",
    title: "支付方式回贈攻略｜流動支付 vs 實體卡 vs 網購回贈比較",
    seoTitle: "支付方式回贈攻略 2025｜Apple Pay Google Pay vs 實體卡 vs 網購｜同一張卡回贈差 10 倍",
    heroTitle: "💳 支付方式回贈攻略",
    heroSubtitle: "流動支付 vs 實體卡 vs 網購",
    description: "同一張信用卡，不同支付方式回贈可以差 10 倍！Apple Pay、Google Pay、實體卡、網上簽賬回贈有咩分別？電子錢包陷阱要點避？本文詳細比較！",
    content: "payment-methods-guide",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
    tags: ["支付方式", "Apple Pay", "網購", "信用卡攻略"],
    keywords: [
      "apple pay回贈",
      "apple pay信用卡回贈",
      "google pay回贈",
      "信用卡支付方式",
      "網上簽賬回贈",
      "流動支付回贈",
      "實體卡回贈",
      "電子錢包回贈",
      "apple pay vs實體卡",
      "alipay信用卡回贈",
      "payme信用卡回贈",
      "八達通自動增值回贈",
    ],
    publishDate: "2025-12-11",
    readTime: "15 分鐘",
  },
  "dahsing-winter-promo": {
    id: "dahsing-winter-promo",
    title: "大新信用卡冬日狂賞｜高達額外5%現金回贈",
    seoTitle: "大新信用卡冬日狂賞 2025｜食肆5%網購3%額外回贈｜登記教學+回贈計算",
    heroTitle: "🎁 大新信用卡冬日狂賞",
    heroSubtitle: "高達額外 5% 現金回贈",
    description: "大新信用卡冬日狂賞！登記後本地食肆享額外5%回贈，網上/旅遊/海外享額外3%回贈。推廣期2025年12月8日至2026年2月28日，名額8,000人先到先得！",
    content: "dahsing-winter-promo",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
    tags: ["大新銀行", "冬日優惠", "現金回贈", "限時優惠"],
    keywords: [
      "大新信用卡優惠",
      "大新冬日狂賞",
      "大新信用卡回贈",
      "大新ONE+優惠",
      "信用卡食肆回贈",
      "信用卡網購回贈",
      "大新信用卡登記",
      "冬日簽賬優惠",
      "信用卡現金回贈",
      "大新銀行優惠2025",
    ],
    publishDate: "2025-12-11",
    readTime: "8 分鐘",
  },
  "low-income-guide": {
    id: "low-income-guide",
    title: "免入息證明信用卡攻略｜家庭主婦/自僱/現金出糧都開到",
    seoTitle: "免入息證明信用卡攻略 2025｜低門檻信用卡比較｜家庭主婦/自僱/無業都開到",
    heroTitle: "📋 免入息證明信用卡攻略",
    heroSubtitle: "家庭主婦/自僱/現金出糧都開到",
    description: "無入息證明可以申請信用卡嗎？家庭主婦、自僱人士、現金出糧點申請？本文教你免入息證明信用卡攻略，即時批核信用卡推薦！",
    content: "low-income-guide",
    imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2070&auto=format&fit=crop",
    tags: ["免入息", "低門檻", "家庭主婦", "自僱", "信用卡攻略"],
    keywords: [
      "無糧單信用卡",
      "即時批核信用卡",
      "中銀信用卡入息要求",
      "無收入信用卡",
      "低門檻信用卡",
      "家庭主婦信用卡推薦",
      "香港最容易申請信用卡",
      "信用卡年薪證明",
      "信用卡年薪唔夠",
      "信用卡即批即用",
    ],
    publishDate: "2025-01-01",
    readTime: "12 分鐘",
  },
  "food-delivery-guide": {
    id: "food-delivery-guide",
    title: "外賣平台信用卡攻略｜Foodpanda/Keeta 高達5%回贈",
    seoTitle: "外賣信用卡攻略 2025｜Foodpanda/KeeTa 信用卡優惠｜高達5%回贈",
    heroTitle: "🍕 外賣平台信用卡攻略",
    heroSubtitle: "Foodpanda/KeeTa 高達5%回贈",
    description: "Foodpanda、KeeTa 用邊張信用卡最抵？外賣當網購定餐飲？本文教你外賣平台信用卡攻略，高達 5% 回贈！",
    content: "food-delivery-guide",
    imageUrl: "https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=2071&auto=format&fit=crop",
    tags: ["Foodpanda", "KeeTa", "外賣", "信用卡攻略"],
    keywords: [
      "Foodpanda信用卡回贈",
      "網上消費信用卡回贈",
      "網購信用卡回贈2025",
      "食飯信用卡2025",
      "Keeta信用卡優惠",
      "網購信用卡比較",
      "外賣信用卡",
      "KeeTa信用卡",
      "外賣優惠碼",
    ],
    publishDate: "2025-01-01",
    readTime: "12 分鐘",
  },
  "streaming-guide": {
    id: "streaming-guide",
    title: "串流平台信用卡攻略｜Netflix/Spotify/Disney+ 回贈比較",
    seoTitle: "串流平台信用卡攻略 2025｜Netflix/Spotify/Disney+ 信用卡優惠｜CBF 手續費拆解",
    heroTitle: "📺 串流平台信用卡攻略",
    heroSubtitle: "Netflix/Spotify/Disney+ 回贈比較",
    description: "Netflix、Spotify、Disney+ 用邊張信用卡最抵？串流平台有 CBF 手續費？本文教你串流平台信用卡攻略！",
    content: "streaming-guide",
    imageUrl: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=2070&auto=format&fit=crop",
    tags: ["Netflix", "Spotify", "Disney+", "串流", "信用卡攻略"],
    keywords: [
      "Netflix信用卡回贈",
      "網上消費信用卡回贈",
      "Youtube premium信用卡回贈香港",
      "Youtube premium信用卡香港",
      "Netflix信用卡優惠2025",
      "Netflix信用卡優惠香港",
      "Netflix信用卡手續費",
      "Spotify信用卡",
      "Disney+信用卡",
    ],
    publishDate: "2025-01-01",
    readTime: "12 分鐘",
  },
  "driving-guide": {
    id: "driving-guide",
    title: "揸車必備信用卡攻略｜入油、易通行、停車場高達8%回贈",
    seoTitle: "揸車信用卡攻略 2025｜入油/易通行/停車場/牌費最高 8% 回贈",
    heroTitle: "🚗 揸車必備信用卡攻略",
    heroSubtitle: "入油、易通行、停車場高達8%回贈",
    description: "揸車入油、易通行、停車場用邊張信用卡最抵？本文教你揸車信用卡攻略，入油最高 8% 回贈！",
    content: "driving-guide",
    imageUrl: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop",
    tags: ["入油", "易通行", "停車場", "車主", "信用卡攻略"],
    keywords: [
      "易通行信用卡2025",
      "易通行信用卡回贈",
      "車主信用卡",
      "泊車信用卡",
      "大新myauto車主信用卡",
      "入油信用卡優惠",
      "停車場信用卡回贈",
      "入油信用卡2025",
      "入油攻略",
    ],
    publishDate: "2025-01-01",
    readTime: "12 分鐘",
  },
  "insurance-guide": {
    id: "insurance-guide",
    title: "信用卡交保費攻略｜AIA/保誠/宏利保費回贈高達2%",
    seoTitle: "信用卡交保費攻略 2025｜AIA/保誠/宏利保費信用卡回贈｜最高2%",
    heroTitle: "🛡️ 信用卡交保費攻略",
    heroSubtitle: "AIA/保誠/宏利保費回贈高達2%",
    description: "交保費都可以賺信用卡回贈？邊張卡交保費最抵？本文教你信用卡交保費攻略，保費回贈高達 2%！",
    content: "insurance-guide",
    imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop",
    tags: ["保費", "保險", "AIA", "保誠", "信用卡攻略"],
    keywords: [
      "信用卡交保費攻略",
      "AIA保費信用卡",
      "HSBC信用卡交保費",
      "恒生信用卡交保費積分",
      "宏利交保費信用卡",
      "網上交保費信用卡",
      "信用卡交保費回贈",
      "中銀信用卡交保費積分上限",
      "交保費信用卡2025",
    ],
    publishDate: "2025-01-01",
    readTime: "12 分鐘",
  },
  "pinduoduo-guide": {
    id: "pinduoduo-guide",
    title: "拼多多信用卡攻略｜免手續費兼賺高達5%回贈",
    seoTitle: "拼多多信用卡攻略 2025｜免手續費付款方法｜AlipayHK 回贈最高5%",
    heroTitle: "🛒 拼多多信用卡攻略",
    heroSubtitle: "免手續費兼賺高達5%回贈",
    description: "拼多多購物用邊張信用卡最抵？有手續費嗎？本文教你拼多多信用卡攻略，用 AlipayHK 免手續費兼賺高達 5% 回贈！",
    content: "pinduoduo-guide",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
    tags: ["拼多多", "網購", "AlipayHK", "信用卡攻略"],
    keywords: [
      "拼多多信用卡推薦",
      "拼多多信用卡回饋",
      "拼多多信用卡付款",
      "拼多多香港信用卡手續費",
      "拼多多alipayhk手續費",
      "多多支付信用卡",
      "拼多多優惠",
      "拼多多百億補貼",
    ],
    publishDate: "2025-01-01",
    readTime: "12 分鐘",
  },
  "uber-guide": {
    id: "uber-guide",
    title: "Uber 信用卡攻略｜扣埋 CBF 手續費仲淨賺2%回贈",
    seoTitle: "Uber 信用卡攻略 2025｜免 CBF 手續費信用卡推薦｜Uber Eats 回贈",
    heroTitle: "🚗 Uber 信用卡攻略",
    heroSubtitle: "扣埋 CBF 手續費仲淨賺2%回贈",
    description: "Uber 用邊張信用卡最抵？有 CBF 手續費嗎？本文教你 Uber 信用卡攻略，扣埋手續費仲淨賺 2% 回贈！",
    content: "uber-guide",
    imageUrl: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop",
    tags: ["Uber", "Uber Eats", "交通", "信用卡攻略"],
    keywords: [
      "Uber信用卡回贈",
      "Uber mastercard優惠",
      "Uber信用卡2025",
      "Uber機場優惠碼2025",
      "Uber信用卡香港",
      "Uber信用卡手續費",
      "Uber優惠碼2025",
    ],
    publishDate: "2025-01-01",
    readTime: "12 分鐘",
  },
  "iherb-guide": {
    id: "iherb-guide",
    title: "iHerb 信用卡攻略｜扣埋 CBF 手續費仲淨賺2%回贈",
    seoTitle: "iHerb 信用卡攻略 2025｜免 CBF 手續費信用卡推薦｜保健品網購回贈",
    heroTitle: "💊 iHerb 信用卡攻略",
    heroSubtitle: "扣埋 CBF 手續費仲淨賺2%回贈",
    description: "iHerb 買保健品用邊張信用卡最抵？有 CBF 手續費嗎？本文教你 iHerb 信用卡攻略，扣埋手續費仲淨賺 2% 回贈！",
    content: "iherb-guide",
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2070&auto=format&fit=crop",
    tags: ["iHerb", "保健品", "網購", "信用卡攻略"],
    keywords: [
      "iHerb信用卡優惠",
      "iHerb信用卡香港",
      "iHerb信用卡手續費",
      "iHerb信用卡2025",
      "網上消費信用卡回贈",
      "iHerb折扣碼75折",
      "iHerb優惠碼76折",
      "iHerb折扣碼7折",
    ],
    publishDate: "2025-01-01",
    readTime: "12 分鐘",
  },
  "iphone-guide": {
    id: "iphone-guide",
    title: "iPhone 17 信用卡攻略｜食迎新買 iPhone 慳 $2,000！",
    seoTitle: "iPhone 17 信用卡攻略 2025｜食迎新優惠買 iPhone 慳 $2,000！連拆單大法",
    heroTitle: "📱 iPhone 17 信用卡攻略",
    heroSubtitle: "食迎新買 iPhone 慳 $2,000！",
    description: "買 iPhone 17 用邊張信用卡最抵？食迎新可以慳幾多？本文教你 iPhone 信用卡攻略，食迎新買 iPhone 慳 $2,000！連拆單大法！",
    content: "iphone-guide",
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=2070&auto=format&fit=crop",
    tags: ["iPhone", "Apple", "信用卡攻略", "迎新"],
    keywords: [
      "信用卡買iPhone優惠2025",
      "買iPhone信用卡優惠",
      "iPhone信用卡回贈",
      "Apple信用卡優惠2025",
      "iPhone17信用卡優惠",
      "iPhone16信用卡優惠",
      "iPhone17信用卡優惠2025",
      "iPhone16信用卡優惠2025",
    ],
    publishDate: "2025-01-01",
    readTime: "15 分鐘",
  },
  "ipad-guide": {
    id: "ipad-guide",
    title: "iPad 出機攻略｜食迎新買 iPad 慳 $2,000！連 M4 iPad Pro 價錢",
    seoTitle: "iPad 出機攻略 2025｜食迎新優惠買 iPad 慳 $2,000！連 M4 iPad Pro 價錢",
    heroTitle: "📱 iPad 出機攻略",
    heroSubtitle: "食迎新買 iPad 慳 $2,000！",
    description: "買 iPad 用邊張信用卡最抵？邊款 iPad 最適合你？本文教你 iPad 出機攻略，食迎新買 iPad 慳 $2,000！連 M4 iPad Pro 價錢！",
    content: "ipad-guide",
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=2070&auto=format&fit=crop",
    tags: ["iPad", "Apple", "信用卡攻略", "迎新"],
    keywords: [
      "信用卡迎新iPad",
      "信用卡送iPad",
      "百老匯iPad優惠",
      "iPad優惠2025",
      "邊度買iPad平",
      "iPad信用卡",
      "豐澤iPad優惠",
      "iPad免息分期",
    ],
    publishDate: "2025-01-01",
    readTime: "15 分鐘",
  },
  "macbook-guide": {
    id: "macbook-guide",
    title: "MacBook 出機攻略｜食迎新買 MacBook 慳 $2,000！連 M4/M5 價錢",
    seoTitle: "MacBook 出機攻略 2025｜食迎新優惠買 MacBook 慳 $2,000！連 M4/M5 MacBook Pro 價錢",
    heroTitle: "💻 MacBook 出機攻略",
    heroSubtitle: "食迎新買 MacBook 慳 $2,000！",
    description: "買 MacBook 用邊張信用卡最抵？MacBook Air 定 Pro？本文教你 MacBook 出機攻略，食迎新買 MacBook 慳 $2,000！連 M4/M5 MacBook Pro 價錢！",
    content: "macbook-guide",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2070&auto=format&fit=crop",
    tags: ["MacBook", "Apple", "信用卡攻略", "迎新"],
    keywords: [
      "MacBook信用卡優惠",
      "MacBook信用卡分期",
      "買MacBook優惠",
      "Apple信用卡優惠2025",
      "MacBook免息分期",
      "買MacBook分期",
      "邊度買MacBook最平",
      "AppStore信用卡回贈",
    ],
    publishDate: "2025-01-01",
    readTime: "15 分鐘",
  },
  "apple-watch-guide": {
    id: "apple-watch-guide",
    title: "Apple Watch 出機攻略｜食迎新買 Apple Watch 慳 $2,000！",
    seoTitle: "Apple Watch 出機攻略 2025｜Series 10 / Ultra 2 價錢比較｜信用卡優惠",
    heroTitle: "⌚ Apple Watch 出機攻略",
    heroSubtitle: "食迎新買 Apple Watch 慳 $2,000！",
    description: "買 Apple Watch 用邊張信用卡最抵？Series 10 定 Ultra 2？本文教你 Apple Watch 出機攻略，食迎新買 Apple Watch 慳 $2,000！",
    content: "apple-watch-guide",
    imageUrl: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?q=80&w=2070&auto=format&fit=crop",
    tags: ["Apple Watch", "Apple", "信用卡攻略", "迎新"],
    keywords: [
      "AppleWatch信用卡優惠",
      "AppleWatch錢包付款",
      "信用卡送AppleWatch",
      "CSLAppleWatch買一送一",
      "AppleWatch付款方式",
      "AppleWatch學生優惠",
      "信用卡迎新AppleWatchSE",
      "AppleWatch錢包同步",
    ],
    publishDate: "2025-01-01",
    readTime: "12 分鐘",
  },
  "ps5-guide": {
    id: "ps5-guide",
    title: "PS5 出機攻略｜食迎新買 PS5 最平 $1,400 起！",
    seoTitle: "PS5 出機攻略 2025｜PS5 Slim / Pro 價錢比較｜信用卡優惠食迎新",
    heroTitle: "🎮 PS5 出機攻略",
    heroSubtitle: "食迎新買 PS5 最平 $1,400 起！",
    description: "買 PS5 用邊張信用卡最抵？PS5 Slim 定 Pro？數位版定光碟版？本文教你 PS5 出機攻略，食迎新買 PS5 最平 $1,400 起！",
    content: "ps5-guide",
    imageUrl: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=2070&auto=format&fit=crop",
    tags: ["PS5", "PlayStation", "信用卡攻略", "遊戲"],
    keywords: [
      "PS5信用卡優惠",
      "PS5信用卡設定",
      "PS5信用卡分期",
      "PS5分期付款",
      "PS5優惠2025",
      "PS5現貨哪裡買",
      "百老匯PS5現貨",
      "PS5香港現貨",
    ],
    publishDate: "2025-01-01",
    readTime: "12 分鐘",
  },
  "xbox-guide": {
    id: "xbox-guide",
    title: "Xbox 出機攻略｜食迎新買 Xbox 最平 $1,000 起！",
    seoTitle: "Xbox 出機攻略 2025｜Series X / S 價錢比較｜Game Pass 攻略｜信用卡優惠",
    heroTitle: "🎮 Xbox 出機攻略",
    heroSubtitle: "食迎新買 Xbox 最平 $1,000 起！",
    description: "買 Xbox 用邊張信用卡最抵？Series X 定 Series S？Game Pass 值唔值得買？本文教你 Xbox 出機攻略！",
    content: "xbox-guide",
    imageUrl: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=2070&auto=format&fit=crop",
    tags: ["Xbox", "Game Pass", "信用卡攻略", "遊戲"],
    keywords: [
      "Xbox付款方式",
      "XboxGamePass付費方式",
      "XboxAlipayHK",
      "Microsoft信用卡扣款",
      "Microsoft移除信用卡",
      "Microsoft付款方式",
      "MicrosoftAlipayHK",
      "Xbox訂購紀錄",
    ],
    publishDate: "2025-01-01",
    readTime: "12 分鐘",
  },
  "switch-guide": {
    id: "switch-guide",
    title: "Switch 2 出機攻略｜食迎新買 Switch 最平 $1,850 起！",
    seoTitle: "Switch 2 出機攻略 2025｜幾時出？價錢幾多？｜信用卡優惠食迎新",
    heroTitle: "🎮 Switch 2 出機攻略",
    heroSubtitle: "食迎新買 Switch 最平 $1,850 起！",
    description: "買 Switch 2 用邊張信用卡最抵？幾時出？價錢幾多？本文教你 Switch 2 出機攻略，食迎新買 Switch 最平 $1,850 起！",
    content: "switch-guide",
    imageUrl: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?q=80&w=2070&auto=format&fit=crop",
    tags: ["Switch", "Nintendo", "信用卡攻略", "遊戲"],
    keywords: [
      "Switch2優惠",
      "Switch2分期付款",
      "信用卡送SwitchOLED",
      "信用卡迎新Switch",
      "送Switch2",
      "MoxSwitch2",
      "Switch2遊戲",
      "Switch2免息分期",
    ],
    publishDate: "2025-01-01",
    readTime: "12 分鐘",
  },
  "citi-partner-offers": {
    id: "citi-partner-offers",
    title: "Citi 信用卡合作夥伴獎賞攻略｜MoneyHero 迎新優惠高達 $4,288+",
    seoTitle: "Citi 信用卡合作夥伴獎賞 2026｜MoneyHero 迎新高達 $4,288｜Citi Cash Back/Rewards/PremierMiles",
    heroTitle: "🎁 Citi 信用卡合作夥伴獎賞攻略",
    heroSubtitle: "銀行迎新 + 合作夥伴獎賞 雙重獎賞高達 $4,288+！",
    description: "經本網指定連結申請 Citi 信用卡，除銀行迎新外，更可享額外獎賞高達 $4,288+！Citi Cash Back、Citi Rewards、Citi PremierMiles 完全介紹。",
    content: "citi-partner-offers",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop",
    tags: ["Citi", "合作夥伴", "迎新優惠", "MoneyHero"],
    keywords: [
      "Citi 信用卡迎新",
      "Citi 信用卡優惠",
      "MoneyHero Citi",
      "Citi Cash Back 迎新",
      "Citi Rewards 迎新",
      "Citi PremierMiles 迎新",
      "Citi Prestige 迎新",
      "Citi 信用卡申請",
      "信用卡合作夥伴獎賞",
      "信用卡迎新優惠 2026",
      "Citi 銀聯卡",
    ],
    publishDate: "2026-01-06",
    readTime: "8 分鐘",
  },
};

// Generate static params for both promos and guides
export async function generateStaticParams() {
  const promoIds = PROMOS.map(p => ({ slug: p.id }));
  const guideIds = Object.keys(GUIDES).map(id => ({ slug: id }));
  
  return [...promoIds, ...guideIds];
}

// Check if slug is a guide
function isGuide(slug: string): boolean {
  return slug in GUIDES;
}

// Map database fields to Promo type (snake_case -> camelCase)
function mapPromoFromDB(dbPromo: any): Promo {
  return {
    id: dbPromo.id,
    title: dbPromo.title,
    merchant: dbPromo.merchant,
    description: dbPromo.description,
    imageUrl: dbPromo.image_url,
    expiryDate: dbPromo.expiry_date,
    relatedCardIds: dbPromo.related_card_ids || [],
    tags: dbPromo.tags || [],
    url: dbPromo.url,
    content: dbPromo.content,
    isPinned: dbPromo.is_pinned || false,
    seoTitle: dbPromo.seo_title,
    seoDescription: dbPromo.seo_description,
    faqs: dbPromo.faqs || [],
    updatedAt: dbPromo.updated_at,
  };
}

// Get promo data
async function getPromo(id: string): Promise<Promo | null> {
  try {
    const supabase = adminAuthClient;
    
    const { data, error } = await supabase
      .from("promos")
      .select("*")
      .eq("id", id)
      .single();

    if (data) return mapPromoFromDB(data);
  } catch (e) {
    console.error("getPromo exception:", e);
  }

  const localPromo = PROMOS.find(p => p.id === id);
  return localPromo || null;
}

// Generate metadata
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  
  // Guide metadata
  if (isGuide(slug)) {
    const guide = GUIDES[slug];
    return {
      title: guide.seoTitle,
      description: guide.description,
      keywords: [...(guide.keywords || []), ...(guide.tags || [])],
      openGraph: {
        title: guide.seoTitle,
        description: guide.description,
        images: [{ url: guide.imageUrl }],
        type: 'article',
        url: `https://pickcardrebate.com/discover/${slug}`,
      },
      twitter: {
        card: "summary_large_image",
        title: guide.seoTitle,
        description: guide.description,
        images: [guide.imageUrl],
      },
      alternates: {
        canonical: `https://pickcardrebate.com/discover/${slug}`,
      },
    };
  }
  
  // Promo metadata
  const promo = await getPromo(slug);
  if (!promo) return { title: "內容未找到" };

  const seoTitle = promo.seoTitle || `${promo.title} - ${promo.merchant}信用卡優惠`;
  const seoDescription = promo.seoDescription || `${promo.description} 有效期至 ${promo.expiryDate}。`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: [promo.merchant, "信用卡優惠", "信用卡回贈", ...promo.tags],
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      images: promo.imageUrl ? [{ url: promo.imageUrl }] : [],
      type: 'article',
      url: `https://pickcardrebate.com/discover/${promo.id}`,
    },
    alternates: {
      canonical: `https://pickcardrebate.com/discover/${promo.id}`,
    },
  };
}

// ============ GUIDE COMPONENT ============
// 海外簽賬攻略內容
function OverseasFeeGuide() {
  const currentYear = new Date().getFullYear();
  
  // Service data for the table
  const serviceData = [
    { name: "App Store / Apple Music", country: "🇮🇪 愛爾蘭", risk: "high" },
    { name: "Google Play", country: "🇺🇸 美國", risk: "high" },
    { name: "Netflix", country: "🇳🇱 荷蘭", risk: "high" },
    { name: "Spotify", country: "🇸🇪 瑞典", risk: "high" },
    { name: "YouTube Premium", country: "🇺🇸 美國", risk: "high" },
    { name: "Disney+", country: "🇺🇸 美國", risk: "high" },
    { name: "Amazon Prime Video", country: "🇺🇸 美國", risk: "high" },
    { name: "PlayStation Store", country: "🇭🇰 香港", risk: "low" },
    { name: "Nintendo eShop", country: "🇯🇵 日本", risk: "high" },
    { name: "Steam", country: "🇩🇪 德國", risk: "high" },
    { name: "Airbnb", country: "🇮🇪 愛爾蘭", risk: "high" },
    { name: "Booking.com", country: "🇳🇱 荷蘭", risk: "high" },
    { name: "Agoda", country: "🇸🇬 新加坡", risk: "high" },
    { name: "Trip.com", country: "🇭🇰 香港", risk: "low" },
    { name: "Klook", country: "🇭🇰 香港", risk: "low" },
    { name: "Uber", country: "🇳🇱 荷蘭", risk: "high" },
    { name: "KeeTa", country: "🇭🇰 香港", risk: "low" },
    { name: "foodpanda", country: "🇭🇰 香港", risk: "low" },
    { name: "OpenAI / ChatGPT Plus", country: "🇺🇸 美國", risk: "high" },
    { name: "Canva Pro", country: "🇦🇺 澳洲", risk: "high" },
  ];

  // Banks data
  const bankFeeData = [
    { bank: "HSBC", cbf: true, fee: "1%", note: "所有卡都收" },
    { bank: "恒生銀行", cbf: true, fee: "1%", note: "所有卡都收" },
    { bank: "渣打銀行", cbf: true, fee: "1%", note: "部分卡免（如 Smart Card）" },
    { bank: "Citi", cbf: true, fee: "1%", note: "所有卡都收" },
    { bank: "DBS", cbf: true, fee: "1%", note: "所有卡都收" },
    { bank: "中銀", cbf: false, fee: "0%", note: "不收 CBF" },
    { bank: "東亞銀行", cbf: false, fee: "0%", note: "不收 CBF" },
    { bank: "大新銀行", cbf: false, fee: "0%", note: "不收 CBF" },
    { bank: "富邦銀行", cbf: false, fee: "0%", note: "不收 CBF" },
    { bank: "安信", cbf: false, fee: "0%", note: "不收 CBF" },
    { bank: "WeWa / AEON", cbf: false, fee: "0%", note: "不收 CBF" },
  ];

  // FAQ data
  const faqData = [
    {
      question: "什麼是 DCC 動態貨幣轉換？",
      answer: "DCC (Dynamic Currency Conversion) 是指在海外實體店消費時，商戶提供以港幣結算的選項。看似方便，但實際上商戶會收取 3-5% 的手續費，比直接用外幣結算貴得多。建議一定要選擇以當地貨幣結算。"
    },
    {
      question: "什麼是 CBF 跨境手續費？",
      answer: "CBF (Cross Border Fee) 是指當你在海外註冊的網站（如 Netflix、App Store）用港幣付款時，部分銀行會收取的 1% 手續費。即使網站顯示港幣價錢，只要商戶註冊地不在香港，就可能被收取 CBF。"
    },
    {
      question: "Netflix、Spotify 會被收取海外手續費嗎？",
      answer: "會！Netflix 註冊在荷蘭、Spotify 註冊在瑞典，即使你用港幣付款，HSBC、恒生、Citi、DBS 等銀行都會收取 1% CBF 跨境手續費。建議使用中銀、東亞、大新等不收 CBF 的銀行信用卡。"
    },
    {
      question: "App Store 用港幣付款有手續費嗎？",
      answer: "有！Apple 的收單機構在愛爾蘭，即使 App Store 顯示港幣價錢，部分銀行（如 HSBC、恒生）仍會收取 1% CBF。建議使用不收 CBF 的信用卡，或考慮用 Apple Gift Card 增值。"
    },
    {
      question: "如何避免海外簽賬手續費？",
      answer: "1) 實體店消費堅持用當地貨幣結算，拒絕 DCC；2) 網購選擇不收 CBF 的銀行信用卡（如中銀、東亞）；3) 使用免外幣手續費的信用卡（如 SC Smart Card、HSBC Pulse）；4) 常用訂閱服務可考慮用 Gift Card 或其他付款方式。"
    }
  ];

  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* Alert Box */}
      <div className="not-prose bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl p-6 mb-10">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0 mt-1" />
          <div>
            <h2 className="font-bold text-red-800 dark:text-red-200 text-lg mb-2">⚠️ 你知道嗎？</h2>
            <p className="text-red-700 dark:text-red-300">
              好多人以為用港幣俾錢就無手續費，但其實<strong>商戶註冊地點</strong>先係關鍵！
              即使 Netflix 顯示 HK$63，只要商戶喺海外註冊，部分銀行都會收取 <strong>1% 跨境手續費 (CBF)</strong>。
              每月俾多幾蚊睇落唔多，但一年落嚟可能蝕咗成百蚊！
            </p>
          </div>
        </div>
      </div>
      
      {/* Table of Contents */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6 mb-10">
        <h2 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          📑 本文目錄
        </h2>
        <ul className="space-y-2 text-sm">
          <li><a href="#what-is-dcc" className="text-blue-600 dark:text-blue-400 hover:underline">1. 什麼是 DCC 動態貨幣轉換？（實體店陷阱）</a></li>
          <li><a href="#what-is-cbf" className="text-blue-600 dark:text-blue-400 hover:underline">2. 什麼是 CBF 跨境手續費？（網購陷阱）</a></li>
          <li><a href="#high-risk-services" className="text-blue-600 dark:text-blue-400 hover:underline">3. 高危服務一覽：Netflix、Spotify、App Store...</a></li>
          <li><a href="#bank-comparison" className="text-blue-600 dark:text-blue-400 hover:underline">4. 銀行 CBF 收費比較表</a></li>
          <li><a href="#how-to-avoid" className="text-blue-600 dark:text-blue-400 hover:underline">5. 5 招避開手續費陷阱</a></li>
          <li><a href="#recommended-cards" className="text-blue-600 dark:text-blue-400 hover:underline">6. 推薦信用卡</a></li>
          <li><a href="#faq" className="text-blue-600 dark:text-blue-400 hover:underline">7. 常見問題 FAQ</a></li>
        </ul>
      </div>
      
      {/* Section 1: DCC */}
      <section id="what-is-dcc" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Plane className="h-6 w-6 text-blue-500" />
          1. 什麼是 DCC 動態貨幣轉換？
        </h2>
        
        <p>
          <strong>DCC (Dynamic Currency Conversion)</strong> 係指你喺外地實體店碌卡時，商戶主動問你：
          「想用港幣定當地貨幣結算？」
        </p>
        
        <p>
          聽落好似好方便、好貼心，但其實係<strong className="text-red-500">超級陷阱</strong>！
          點解？因為揀咗港幣結算，商戶就會用佢哋自己嘅匯率幫你換錢，
          呢個匯率通常<strong>差過銀行匯率 3-5%</strong>！
        </p>
        
        <div className="not-prose bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-4 my-6">
          <h4 className="font-bold text-amber-800 dark:text-amber-200 mb-2">💡 真實例子</h4>
          <p className="text-amber-700 dark:text-amber-300 text-sm">
            喺日本買 ¥10,000 嘅嘢：<br />
            ❌ 揀 DCC 港幣結算：可能俾 HK$720<br />
            ✅ 揀日圓結算：實際只需 HK$580 左右（視乎匯率）<br />
            <strong>差價可以高達 HK$140！</strong>
          </p>
        </div>
        
        <h3 className="text-xl font-bold mt-6 mb-3">🛡️ 點樣避開 DCC？</h3>
        <ul className="not-prose space-y-2">
          <li className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span><strong>永遠揀當地貨幣結算</strong>：俾錢時同店員講「Pay in local currency」或「Pay in Yen/USD/Euro」</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span><strong>睇清楚收據</strong>：如果見到有「HKD」或港幣金額，即係中咗 DCC</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
            <span><strong>拒絕簽名</strong>：如果發現係 DCC，可以要求取消重新結算</span>
          </li>
        </ul>
      </section>
      
      {/* Section 2: CBF */}
      <section id="what-is-cbf" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Globe className="h-6 w-6 text-purple-500" />
          2. 什麼是 CBF 跨境手續費？
        </h2>
        
        <p>
          <strong>CBF (Cross Border Fee)</strong> 中文叫「跨境手續費」，係指當你喺
          <strong>海外註冊嘅網站</strong>用港幣簽賬時，部分銀行會收取嘅額外費用（通常 1%）。
        </p>
        
        <p>
          最陰險嘅地方係：<strong className="text-red-500">就算個網站顯示港幣價錢，你都可能中招！</strong>
        </p>
        
        <div className="not-prose bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-xl p-4 my-6">
          <h4 className="font-bold text-purple-800 dark:text-purple-200 mb-2">🤔 點解會咁？</h4>
          <p className="text-purple-700 dark:text-purple-300 text-sm">
            因為銀行係睇<strong>商戶註冊地點</strong>，唔係睇你用咩貨幣！<br /><br />
            例如 Netflix 雖然顯示 HK$63，但 Netflix 嘅收單機構係喺<strong>荷蘭</strong>，
            所以 HSBC、恒生等銀行就會當呢筆係「跨境交易」，收取 1% CBF。
          </p>
        </div>
        
        <h3 className="text-xl font-bold mt-6 mb-3">⚠️ CBF vs 外幣手續費</h3>
        <div className="not-prose overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800">
                <th className="border dark:border-gray-700 px-4 py-2 text-left">費用類型</th>
                <th className="border dark:border-gray-700 px-4 py-2 text-left">觸發條件</th>
                <th className="border dark:border-gray-700 px-4 py-2 text-left">收費</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border dark:border-gray-700 px-4 py-2 font-medium">外幣手續費 (FX Fee)</td>
                <td className="border dark:border-gray-700 px-4 py-2">用非港幣貨幣結算</td>
                <td className="border dark:border-gray-700 px-4 py-2">通常 1.95%</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800/50">
                <td className="border dark:border-gray-700 px-4 py-2 font-medium">跨境手續費 (CBF)</td>
                <td className="border dark:border-gray-700 px-4 py-2">商戶喺海外註冊（即使用港幣）</td>
                <td className="border dark:border-gray-700 px-4 py-2">通常 1%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      
      {/* Section 3: High Risk Services */}
      <section id="high-risk-services" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Smartphone className="h-6 w-6 text-red-500" />
          3. 高危服務一覽
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          以下係香港人常用嘅服務同佢哋嘅註冊地點。<strong className="text-red-500">紅色標記</strong>代表可能被收取 CBF：
        </p>
        
        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">服務</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">註冊地點</th>
                  <th className="px-4 py-3 text-center font-medium text-gray-500 dark:text-gray-400">風險</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {serviceData.map((service, index) => (
                  <tr key={index} className={service.risk === "high" ? "bg-red-50/50 dark:bg-red-900/10" : ""}>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{service.name}</td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{service.country}</td>
                    <td className="px-4 py-3 text-center">
                      {service.risk === "high" ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                          <XCircle className="h-3 w-3 mr-1" /> 可能收 CBF
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          <CheckCircle className="h-3 w-3 mr-1" /> 本地商戶
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="not-prose bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
          <div className="flex items-start gap-2">
            <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              <strong>提示：</strong>以上資料僅供參考，商戶可能隨時更改註冊地點。
              建議留意信用卡月結單，如果見到有 "Cross Border Fee" 或類似字眼，就代表被收取咗 CBF。
            </p>
          </div>
        </div>
      </section>
      
      {/* Section 4: Bank Comparison */}
      <section id="bank-comparison" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-emerald-500" />
          4. 銀行 CBF 收費比較
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          唔同銀行對 CBF 嘅政策唔同。以下係主要銀行嘅收費情況：
        </p>
        
        <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-900">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">銀行</th>
                  <th className="px-4 py-3 text-center font-medium text-gray-500 dark:text-gray-400">CBF 收費</th>
                  <th className="px-4 py-3 text-left font-medium text-gray-500 dark:text-gray-400">備註</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                {bankFeeData.map((bank, index) => (
                  <tr key={index} className={!bank.cbf ? "bg-green-50/50 dark:bg-green-900/10" : ""}>
                    <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">{bank.bank}</td>
                    <td className="px-4 py-3 text-center">
                      {bank.cbf ? (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                          {bank.fee}
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                          免收 ✓
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-gray-600 dark:text-gray-400">{bank.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="not-prose bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4">
          <h4 className="font-bold text-emerald-800 dark:text-emerald-200 mb-2">✅ 推薦策略</h4>
          <p className="text-emerald-700 dark:text-emerald-300 text-sm">
            如果你經常用 Netflix、Spotify、App Store 等海外服務，
            建議使用<strong>中銀、東亞、大新</strong>等不收 CBF 嘅銀行信用卡，
            可以每年慳返幾十到幾百蚊手續費！
          </p>
        </div>
      </section>
      
      {/* Section 5: How to Avoid */}
      <section id="how-to-avoid" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          🛡️ 5. 五招避開手續費陷阱
        </h2>
        
        <div className="not-prose space-y-4">
          {[
            { title: "實體店：堅持用當地貨幣結算", desc: "無論店員點講，都要揀「Pay in local currency」。見到 HKD 就即刻 say no！", icon: "🏪" },
            { title: "網購：使用不收 CBF 的銀行卡", desc: "Netflix、Spotify、App Store 等海外服務，用中銀、東亞、大新等銀行嘅卡最穩陣。", icon: "💳" },
            { title: "考慮免外幣手續費的卡", desc: "如 SC Smart Card、HSBC Pulse 銀聯卡等，外幣簽賬免手續費，北上消費特別適合。", icon: "🌍" },
            { title: "用 Gift Card 增值", desc: "App Store、PlayStation Store 等可以買 Gift Card 增值，避開信用卡手續費。", icon: "🎁" },
            { title: "定期檢查月結單", desc: "留意有無 \"Cross Border Fee\"、\"FX Fee\" 等字眼，發現問題及早處理。", icon: "📋" }
          ].map((tip, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 p-4 flex items-start gap-4">
              <span className="text-3xl">{tip.icon}</span>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white mb-1">{index + 1}. {tip.title}</h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{tip.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      {/* Section 6: Recommended Cards */}
      <section id="recommended-cards" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Trophy className="h-6 w-6 text-amber-500" />
          6. 推薦信用卡
        </h2>
        
        {/* Card Preview Section */}
        <CardPreviewSection 
          title="📌 海外簽賬推薦信用卡"
          subtitle="以下信用卡適合海外簽賬及網購，部分免 CBF 或外幣手續費"
          cards={RECOMMENDED_CARDS.overseas}
        />
        
        <div className="not-prose grid md:grid-cols-2 gap-4 mt-6">
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-2xl p-5 border border-emerald-200 dark:border-emerald-800">
            <h4 className="font-bold text-emerald-800 dark:text-emerald-200 mb-2">🌐 海外網購首選</h4>
            <ul className="space-y-2 text-sm text-emerald-700 dark:text-emerald-300">
              <li>• <Link href="/cards/boc-cheers" className="text-blue-600 hover:underline font-medium">中銀 Cheers</Link>：不收 CBF</li>
              <li>• <Link href="/cards/bea-world-mastercard" className="text-blue-600 hover:underline font-medium">東亞 World Mastercard</Link>：不收 CBF</li>
              <li>• <Link href="/cards/sc-simply-cash" className="text-blue-600 hover:underline font-medium">渣打 Simply Cash</Link>：海外 2% 回贈</li>
            </ul>
            <Link href="/blog/best-online-shopping-cards">
              <Button variant="outline" size="sm" className="mt-3 w-full border-emerald-300 text-emerald-700 hover:bg-emerald-100">
                查看網購卡排行榜 <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-5 border border-blue-200 dark:border-blue-800">
            <h4 className="font-bold text-blue-800 dark:text-blue-200 mb-2">✈️ 海外實體消費首選</h4>
            <ul className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
              <li>• <Link href="/cards/sc-smart" className="text-blue-600 hover:underline font-medium">SC Smart Card</Link>：免外幣手續費</li>
              <li>• <Link href="/cards/hsbc-pulse" className="text-blue-600 hover:underline font-medium">HSBC Pulse</Link>：銀聯免手續費，北上必備</li>
              <li>• <Link href="/cards/hangseng-travel-plus" className="text-blue-600 hover:underline font-medium">Hang Seng Travel+</Link>：旅遊回贈</li>
            </ul>
            <Link href="/blog/best-travel-cards">
              <Button variant="outline" size="sm" className="mt-3 w-full border-blue-300 text-blue-700 hover:bg-blue-100">
                查看旅遊卡排行榜 <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Section 7: FAQ */}
      <section id="faq" className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          ❓ 7. 常見問題 FAQ
        </h2>
        
        <div className="not-prose space-y-4">
          {faqData.map((faq, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden">
              <details className="group">
                <summary className="flex items-center justify-between p-4 cursor-pointer font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900">
                  <span>Q: {faq.question}</span>
                  <ChevronDown className="h-5 w-5 text-gray-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-4 pb-4 text-gray-600 dark:text-gray-400 text-sm">
                  A: {faq.answer}
                </div>
              </details>
            </div>
          ))}
        </div>
      </section>
      
      {/* CTA Section */}
      <div className="not-prose bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white mb-10">
        <h3 className="text-xl font-bold mb-2">💡 想知邊張卡最適合你？</h3>
        <p className="mb-4 opacity-90">使用我哋嘅回贈計算機，輸入你嘅消費習慣，即刻搵到最高回贈嘅信用卡！</p>
        <Link href="/">
          <Button className="bg-white text-emerald-600 hover:bg-gray-100">
            <Calculator className="h-4 w-4 mr-2" />
            立即計算回贈
          </Button>
        </Link>
      </div>
      
      {/* Related Links */}
      <div className="not-prose bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🔗 相關文章</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <Link href="/blog/best-travel-cards" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Plane className="h-5 w-5 text-emerald-600" />
            <span>旅遊信用卡排行榜</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/blog/best-online-shopping-cards" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <ShoppingCart className="h-5 w-5 text-emerald-600" />
            <span>網購信用卡排行榜</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Calculator className="h-5 w-5 text-emerald-600" />
            <span>回贈計算機</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
          <Link href="/rankings" className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
            <Trophy className="h-5 w-5 text-emerald-600" />
            <span>回贈排行榜</span>
            <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}

// FAQ Accordion Component for Promos
function FAQSection({ faqs }: { faqs: PromoFAQ[] }) {
  if (!faqs || faqs.length === 0) return null;
  
  return (
    <section className="mt-10 border-t dark:border-gray-700 pt-8">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
        <span className="text-2xl">❓</span> 常見問題
      </h2>
      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <details 
            key={index} 
            className="group bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
          >
            <summary className="flex items-center justify-between p-4 cursor-pointer list-none font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <span>{faq.question}</span>
              <ChevronDown className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform" />
            </summary>
                <div className="px-4 pb-4 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{faq.answer}</ReactMarkdown>
                </div>
          </details>
        ))}
      </div>
    </section>
  );
}

// ============ GUIDE FAQ DATA ============
// Overseas Fee FAQ data for schema
const overseasFeeFaqData = [
  { question: "什麼是 DCC 動態貨幣轉換？", answer: "DCC (Dynamic Currency Conversion) 是指在海外實體店消費時，商戶提供以港幣結算的選項。" },
  { question: "什麼是 CBF 跨境手續費？", answer: "CBF (Cross Border Fee) 是指當你在海外註冊的網站用港幣付款時，部分銀行會收取的 1% 手續費。" },
  { question: "Netflix、Spotify 會被收取海外手續費嗎？", answer: "會！Netflix 註冊在荷蘭、Spotify 註冊在瑞典，部分銀行會收取 1% CBF。" },
  { question: "如何避免海外簽賬手續費？", answer: "使用不收 CBF 的銀行信用卡（如中銀、東亞），或用 Gift Card 增值。" },
];

// 大新冬日狂賞 FAQ 資料
const dahsingWinterPromoFaqData = [
  { question: "大新冬日狂賞需要登記嗎？", answer: "需要。必須透過大新手機 App 或指定網頁登記，名額只限首 8,000 名，先到先得。登記後才開始計算簽賬，未登記的簽賬不計入回贈！" },
  { question: "冬日狂賞的推廣期是什麼時候？", answer: "推廣期由 2025年12月8日 至 2026年2月28日，分為三個階段：階段1 (12月8-31日)、階段2 (1月1-31日)、階段3 (2月1-28日)。每個階段獨立計算回贈。" },
  { question: "每階段需要簽多少才有回贈？", answer: "每階段需累積簽賬滿 $6,000（只計算單一簽賬滿 $300 的交易），才可享有本地食肆 5% 或網上/旅遊/海外 3% 的額外回贈。" },
  { question: "網上訂餐如 foodpanda 算本地食肆嗎？", answer: "不算。網上訂餐只計入「網上簽賬」類別（3%回贈），而非本地食肆（5%回贈）。要享 5% 回贈必須實體到店消費。" },
  { question: "用 AlipayHK 或 WeChat Pay 簽賬可以嗎？", answer: "不可以。透過 AlipayHK、WeChat Pay HK、PayMe 的簽賬均不符合資格，即使是在餐廳消費也不計！" },
  { question: "大新 Visa Infinite 卡可以參加嗎？", answer: "不可以。大新 VIP 銀行服務 Visa Infinite、Private Banking Visa Infinite、Visa Infinite 卡均不適用於此推廣。" },
  { question: "回贈什麼時候發放？", answer: "所有回贈將於 2026年6月30日或之前，以免找數簽賬額形式存入主卡賬戶，並顯示於隨後的月結單上。" },
  { question: "冬日狂賞值得參加嗎？", answer: "如果你有大新信用卡並經常外出食飯，5% 食肆回贈配合 ONE+ 本身 1% 可達 6%，算是不錯。但名額有限、回贈上限較低，建議同時比較其他銀行優惠。" }
];

// Get FAQ data for specific guide
function getGuideFaqData(guideId: string) {
  switch (guideId) {
    case "overseas-fee":
      return overseasFeeFaqData;
    case "payme-credit-card-guide":
      return paymeCreditCardFaqData;
    case "apple-pay-credit-card-guide":
      return applePayCreditCardFaqData;
    case "octopus-aavs-credit-card-guide":
      return octopusAavsCreditCardFaqData;
    case "costco-credit-card-guide":
      return costcoCreditCardFaqData;
    case "wechat-pay-credit-card-guide":
      return wechatPayCreditCardFaqData;
    case "hkd-online-shopping-2026":
      return hkdOnlineShoppingFaqData;
    case "ae-japan-promo-2026":
      return aeJapanPromoFaqData;
    case "debit-card-guide":
      return debitCardFaqData;
    case "miles-vs-cashback":
      return milesVsCashbackFaqData;
    case "best-miles-credit-cards":
      return milesCreditCardFaqData;
    case "best-cashback-cards":
      return bestCashbackCardsFaqData;
    case "utility-bill-guide":
      return utilityBillFaqData;
    case "rent-payment-guide":
      return rentPaymentFaqData;
    case "tax-payment-guide":
      return taxPaymentFaqData;
    case "sc-tax-payment-2025":
      return scTaxPayment2025FaqData;
    case "bea-jcb-contactless-2025":
      return beaJcbContactless2025FaqData;
    case "unionpay-foreign-fee-2025":
      return unionpayForeignFeeFaqData;
    case "bea-reward-extension-2026":
      return beaRewardExtensionFaqData;
    case "boc-visa-crazy-rewards-2026":
      return bocVisaCrazyRewardsFaqData;
    case "citi-partner-offers":
      return citiPartnerOffersFaqData;
    case "online-shopping-guide":
      return onlineShoppingFaqData;
    case "dining-guide":
      return diningFaqData;
    case "overseas-spending-guide":
      return overseasSpendingFaqData;
    case "supermarket-guide":
      return supermarketFaqData;
    case "taobao-guide":
      return taobaoFaqData;
    case "no-annual-fee-guide":
      return noAnnualFeeFaqData;
    case "student-card-guide":
      return studentCardFaqData;
    case "tuition-fee-guide":
      return tuitionFeeFaqData;
    case "large-purchase-guide":
      return largePurchaseFaqData;
    case "octopus-guide":
      return octopusFaqData;
    case "mobile-payment-guide":
      return mobilePaymentFaqData;
    case "payment-methods-guide":
      return paymentMethodsFaqData;
    case "dahsing-winter-promo":
      return dahsingWinterPromoFaqData;
    case "low-income-guide":
      return lowIncomeFaqData;
    case "food-delivery-guide":
      return foodDeliveryFaqData;
    case "streaming-guide":
      return streamingFaqData;
    case "driving-guide":
      return drivingFaqData;
    case "insurance-guide":
      return insuranceFaqData;
    case "pinduoduo-guide":
      return pinduoduoFaqData;
    case "uber-guide":
      return uberFaqData;
    case "iherb-guide":
      return iherbFaqData;
    case "iphone-guide":
      return iphoneFaqData;
    case "ipad-guide":
      return ipadFaqData;
    case "macbook-guide":
      return macbookFaqData;
    case "apple-watch-guide":
      return appleWatchFaqData;
    case "ps5-guide":
      return ps5FaqData;
    case "xbox-guide":
      return xboxFaqData;
    case "switch-guide":
      return switchFaqData;
    default:
      return [];
  }
}

// Render guide component
function renderGuideContent(guideId: string) {
  switch (guideId) {
    case "overseas-fee":
      return <OverseasFeeGuide />;
    case "payme-credit-card-guide":
      return <PayMeCreditCardGuide />;
    case "apple-pay-credit-card-guide":
      return <ApplePayCreditCardGuide />;
    case "octopus-aavs-credit-card-guide":
      return <OctopusAavsCreditCardGuide />;
    case "costco-credit-card-guide":
      return <CostcoCreditCardGuide />;
    case "wechat-pay-credit-card-guide":
      return <WeChatPayCreditCardGuide />;
    case "hkd-online-shopping-2026":
      return <HkdOnlineShoppingGuide />;
    case "ae-japan-promo-2026":
      return <AEJapanPromo2026Guide />;
    case "debit-card-guide":
      return <DebitCardGuide />;
    case "miles-vs-cashback":
      return <MilesVsCashbackGuide />;
    case "best-miles-credit-cards":
      return <MilesCreditCardGuide />;
    case "best-cashback-cards":
      return <BestCashbackCardsGuide />;
    case "utility-bill-guide":
      return <UtilityBillGuide />;
    case "rent-payment-guide":
      return <RentPaymentGuide />;
    case "tax-payment-guide":
      return <TaxPaymentGuide />;
    case "sc-tax-payment-2025":
      return <ScTaxPayment2025Guide />;
    case "bea-jcb-contactless-2025":
      return <BeaJcbContactless2025Guide />;
    case "unionpay-foreign-fee-2025":
      return <UnionpayForeignFeeGuide />;
    case "bea-reward-extension-2026":
      return <BeaRewardExtension2026Guide />;
    case "boc-visa-crazy-rewards-2026":
      return <BocVisaCrazyRewards2026Guide />;
    case "citi-partner-offers":
      return <CitiPartnerOffersGuide />;
    case "online-shopping-guide":
      return <OnlineShoppingGuide />;
    case "dining-guide":
      return <DiningGuide />;
    case "overseas-spending-guide":
      return <OverseasSpendingGuide />;
    case "supermarket-guide":
      return <SupermarketGuide />;
    case "taobao-guide":
      return <TaobaoGuide />;
    case "no-annual-fee-guide":
      return <NoAnnualFeeGuide />;
    case "student-card-guide":
      return <StudentCardGuide />;
    case "tuition-fee-guide":
      return <TuitionFeeGuide />;
    case "large-purchase-guide":
      return <LargePurchaseGuide />;
    case "octopus-guide":
      return <OctopusGuide />;
    case "mobile-payment-guide":
      return <MobilePaymentGuide />;
    case "payment-methods-guide":
      return <PaymentMethodsGuide />;
    case "dahsing-winter-promo":
      return <DahsingWinterPromoGuide />;
    case "low-income-guide":
      return <LowIncomeGuide />;
    case "food-delivery-guide":
      return <FoodDeliveryGuide />;
    case "streaming-guide":
      return <StreamingGuide />;
    case "driving-guide":
      return <DrivingGuide />;
    case "insurance-guide":
      return <InsuranceGuide />;
    case "pinduoduo-guide":
      return <PinduoduoGuide />;
    case "uber-guide":
      return <UberGuide />;
    case "iherb-guide":
      return <IherbGuide />;
    case "iphone-guide":
      return <IphoneGuide />;
    case "ipad-guide":
      return <IpadGuide />;
    case "macbook-guide":
      return <MacbookGuide />;
    case "apple-watch-guide":
      return <AppleWatchGuide />;
    case "ps5-guide":
      return <Ps5Guide />;
    case "xbox-guide":
      return <XboxGuide />;
    case "switch-guide":
      return <SwitchGuide />;
    default:
      return null;
  }
}

// ============ MAIN PAGE COMPONENT ============
export default async function DiscoverDetailPage({ params }: PageProps) {
  const { slug } = await params;
  
  // Handle guide pages
  if (isGuide(slug)) {
    const guide = GUIDES[slug];
    const currentYear = new Date().getFullYear();
    const lastUpdated = guide.lastUpdated || new Date().toISOString().split('T')[0];
    
    // Get FAQ data for this specific guide
    const faqData = getGuideFaqData(slug) || [];

    // Fetch article rating data for SEO
    let avgRating = 0;
    let reviewCount = 0;
    try {
      const ratingRes = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://pickcardrebate.com'}/api/articles/comments?articleId=${slug}`, { 
        next: { revalidate: 3600 } 
      });
      if (ratingRes.ok) {
        const ratingData = await ratingRes.json();
        avgRating = ratingData.avgRating || 0;
        reviewCount = ratingData.totalCount || 0;
      }
    } catch (e) {
      console.error('Failed to fetch article rating:', e);
    }

    const structuredData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Article",
          "headline": guide.title,
          "description": guide.description,
          "keywords": (guide.keywords || []).join(", "),
          "author": { "@type": "Organization", "name": "PickCardRebate" },
          "publisher": { "@type": "Organization", "name": "PickCardRebate", "logo": { "@type": "ImageObject", "url": "https://pickcardrebate.com/logo.png" } },
          "datePublished": guide.publishDate,
          "dateModified": lastUpdated,
          "image": guide.imageUrl,
          "mainEntityOfPage": `https://pickcardrebate.com/discover/${slug}`,
          // Add AggregateRating for SEO if there are reviews
          ...(reviewCount > 0 && {
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": avgRating.toFixed(1),
              "bestRating": "5",
              "worstRating": "1",
              "reviewCount": reviewCount
            }
          })
        },
        {
          "@type": "FAQPage",
          "mainEntity": Array.isArray(faqData) ? faqData.map(faq => ({
            "@type": "Question",
            "name": faq.question,
            "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
          })) : []
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "首頁", "item": "https://pickcardrebate.com" },
            { "@type": "ListItem", "position": 2, "name": "探索", "item": "https://pickcardrebate.com/discover" },
            { "@type": "ListItem", "position": 3, "name": guide.title, "item": `https://pickcardrebate.com/discover/${slug}` }
          ]
        }
      ]
    };

    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
        <ArticleTracker articleSlug={slug} articleTitle={guide.title} />
        <PageViewTracker pageType="article" pageId={slug} pageName={guide.title} />
        <Navbar />
        
        <main className="container mx-auto px-4 py-6 pb-24 md:pb-8 max-w-4xl">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
            <Link href="/" className="hover:text-emerald-600 flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" /> 首頁
            </Link>
            <ChevronRight className="h-4 w-4" />
            <Link href="/discover" className="hover:text-emerald-600">探索</Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-gray-900 dark:text-white truncate max-w-[200px]">攻略</span>
          </nav>
          
          {/* Hero Section */}
          <header className="mb-10">
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
              <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                <BookOpen className="h-3 w-3" /> 攻略
              </span>
              <span>📅 {currentYear}年最新</span>
              <span>•</span>
              <span>⏱️ 閱讀時間約 {guide.readTime}</span>
              <span>•</span>
              <span>🔄 最後更新：{lastUpdated}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
              {guide.heroTitle}
              <br />
              <span className="text-2xl md:text-3xl text-emerald-600 dark:text-emerald-400">{guide.heroSubtitle}</span>
            </h1>
            
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">
              {guide.description}
            </p>
            
            <div className="flex items-center gap-3">
              <ShareButton
                title={guide.title}
                text={guide.description}
                variant="prominent"
                size="sm"
              />
            </div>
          </header>
          
          {/* Guide Content */}
          <article className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border dark:border-gray-800 p-6 md:p-10">
            {renderGuideContent(slug)}
            
            {/* FAQ Section for Guides */}
            {faqData && faqData.length > 0 && (
              <section className="mt-10 border-t dark:border-gray-700 pt-8">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                  <span className="text-2xl">❓</span> 常見問題
                </h2>
                <div className="space-y-3">
                  {faqData.map((faq: PromoFAQ, index: number) => (
                    <details 
                      key={index} 
                      className="group bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
                    >
                      <summary className="flex items-center justify-between p-4 cursor-pointer list-none font-medium text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                        <span>{faq.question}</span>
                        <ChevronDown className="h-5 w-5 text-gray-500 group-open:rotate-180 transition-transform" />
                      </summary>
                      <div className="px-4 pb-4 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{faq.answer}</ReactMarkdown>
                      </div>
                    </details>
                  ))}
                </div>
              </section>
            )}
            
            {/* Article Reviews Section */}
            <ArticleReviews articleId={slug} articleTitle={guide.title} />
            
            {/* Share Section */}
            <ShareSection 
              title={guide.title}
              text={guide.description}
            />
          </article>
          
          {/* Disclaimer */}
          <div className="mt-8 bg-gray-100 dark:bg-gray-800 rounded-xl p-4 text-sm text-gray-600 dark:text-gray-400">
            <strong>免責聲明：</strong>本頁面資料僅供參考，以各發卡機構官方公佈為準。
            銀行政策可能隨時更改，建議直接向銀行查詢最新資訊。
          </div>
        </main>
      </div>
    );
  }
  
  // Handle promo pages
  const promo = await getPromo(slug);
  const whatsappUrl = await getSystemSetting("whatsapp_group_url") || WHATSAPP_GROUP_URL;

  if (!promo) {
    notFound();
  }

  const daysLeft = promo.expiryDate 
    ? Math.ceil((new Date(promo.expiryDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)) 
    : 0;

  const isExpired = daysLeft <= 0;

  const relatedCards = promo.relatedCardIds?.map(cardId => {
    const card = HK_CARDS.find(c => c.id === cardId);
    return card ? { id: card.id, name: card.name, bank: card.bank } : null;
  }).filter(Boolean) || [];

  // 使用 Article 而非 Offer，避免 Google 要求 shippingDetails/hasMerchantReturnPolicy
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        "headline": promo.title,
        "description": promo.description,
        "url": `https://pickcardrebate.com/discover/${promo.id}`,
        "image": promo.imageUrl,
        "datePublished": promo.expiryDate,
        "dateModified": promo.expiryDate,
        "author": {
          "@type": "Organization",
          "name": "PickCardRebate"
        },
        "publisher": {
          "@type": "Organization",
          "name": "PickCardRebate",
          "url": "https://pickcardrebate.com"
        },
        "about": {
          "@type": "Thing",
          "name": promo.merchant
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "首頁", "item": "https://pickcardrebate.com" },
          { "@type": "ListItem", "position": 2, "name": "探索", "item": "https://pickcardrebate.com/discover" },
          { "@type": "ListItem", "position": 3, "name": promo.title, "item": `https://pickcardrebate.com/discover/${promo.id}` }
        ]
      },
      ...(promo.faqs && promo.faqs.length > 0 ? [{
        "@type": "FAQPage",
        "mainEntity": promo.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": { "@type": "Answer", "text": faq.answer }
        }))
      }] : [])
    ]
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors pb-24 md:pb-0">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <ArticleTracker articleSlug={promo.id} articleTitle={promo.title} />
      <PageViewTracker pageType="article" pageId={promo.id} pageName={promo.title} />
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Breadcrumb */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-2">
            <li><Link href="/" className="hover:text-gray-900 dark:hover:text-white">首頁</Link></li>
            <li>/</li>
            <li><Link href="/discover" className="hover:text-gray-900 dark:hover:text-white">探索</Link></li>
            <li>/</li>
            <li className="text-gray-900 dark:text-white font-medium truncate max-w-[200px]">{promo.title}</li>
          </ol>
        </nav>

        <article className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border dark:border-gray-800 overflow-hidden">
          {/* Hero Image */}
          <div className="relative h-64 md:h-96 w-full bg-gray-100 dark:bg-gray-800">
            {promo.imageUrl ? (
              <img src={promo.imageUrl} alt={promo.title} className="w-full h-full object-cover" />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-300"><span className="text-6xl">🎁</span></div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-center gap-2 mb-3 flex-wrap">
                <span className="bg-blue-600/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold">{promo.merchant}</span>
                {isExpired ? (
                  <span className="bg-gray-500/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold">已過期</span>
                ) : daysLeft < 7 && daysLeft > 0 ? (
                  <span className="bg-red-500/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold flex items-center">
                    <Clock className="h-3 w-3 mr-1" /> 剩 {daysLeft} 天
                  </span>
                ) : null}
              </div>
              <h1 className="text-2xl md:text-4xl font-bold leading-tight drop-shadow-lg">{promo.title}</h1>
            </div>
          </div>

          <div className="p-6 md:p-10">
            {/* Meta Info */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8 text-sm text-gray-500 dark:text-gray-400 border-b dark:border-gray-800 pb-6">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center"><Calendar className="h-4 w-4 mr-2" /><span>有效期至：</span>{promo.expiryDate}</div>
                <div className="flex items-center"><Tag className="h-4 w-4 mr-2" />{promo.tags.join(" · ")}</div>
              </div>
              <SharePromoButton title={promo.title} description={promo.description} promoId={promo.id} />
            </div>

            {/* Description */}
            <div className="mb-10">
              <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-6 font-medium">{promo.description}</p>
              {promo.content ? (
                <CardMarkdownRenderer content={promo.content} />
              ) : (
                <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-xl text-center text-gray-500 dark:text-gray-400 italic">
                  此優惠暫無詳細內容，請點擊下方按鈕前往官網查看。
                </div>
              )}
            </div>

            {/* Related Cards */}
            {relatedCards.length > 0 && (
              <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-900/30">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">💳 適用信用卡</h3>
                <div className="flex flex-wrap gap-2">
                  {relatedCards.map((card: any) => (
                    <Link key={card.id} href={`/cards/${card.id}`}
                      className="px-3 py-1.5 bg-white dark:bg-gray-800 rounded-lg text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-gray-700 border border-blue-200 dark:border-gray-600">
                      {card.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 border-t dark:border-gray-800 pt-8">
              {promo.url && (
                <a href={promo.url} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <Button className="w-full h-12 text-base rounded-xl" size="lg">
                    前往官網查看詳情 <ExternalLink className="h-4 w-4 ml-2" />
                  </Button>
                </a>
              )}
              {relatedCards.length > 0 ? (
                <Link href={`/cards?ids=${promo.relatedCardIds?.join(',')}`} className="flex-1">
                  <Button variant="outline" className="w-full h-12 text-base rounded-xl dark:border-gray-700 dark:text-white dark:hover:bg-gray-800">
                    查看相關信用卡 ({relatedCards.length})
                  </Button>
                </Link>
              ) : (
                <Link href="/cards" className="flex-1">
                  <Button variant="outline" className="w-full h-12 text-base rounded-xl dark:border-gray-700 dark:text-white dark:hover:bg-gray-800">
                    瀏覽所有信用卡
                  </Button>
                </Link>
              )}
            </div>

            <FAQSection faqs={promo.faqs || []} />
            <PromoReviews promoId={promo.id} promoTitle={promo.title} />

            {/* WhatsApp CTA */}
            <div className="mt-8 bg-green-50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/30 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                  <MessageCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-gray-100">對這個優惠有疑問？</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">加入我們的 WhatsApp 討論群！</p>
                </div>
              </div>
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white border-none gap-2 rounded-lg">
                  <MessageCircle className="h-4 w-4" /> 加入討論群
                </Button>
              </a>
            </div>
          </div>
        </article>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </main>
    </div>
  );
}

