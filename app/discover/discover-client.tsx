"use client";

import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDataset } from "@/lib/admin/data-store";
import { 
  Clock, ExternalLink, Tag, Send, Bell, PlusCircle, 
  Image as ImageIcon, BookOpen, Globe, Sparkles 
} from "lucide-react";
import { useState, useEffect } from "react";
import { useWallet } from "@/lib/store/wallet-context";
import Link from "next/link";
import { motion } from "framer-motion";
import { PROMOS } from "@/lib/data/promos";

// 攻略文章資料
const GUIDES = [
  {
    id: "overseas-fee",
    type: "guide" as const,
    title: "海外簽賬手續費完全攻略｜DCC、CBF 陷阱拆解",
    description: "拆解信用卡海外簽賬 DCC、CBF 陷阱，教你點樣避開隱藏收費！Netflix、Spotify、App Store 都會中招？",
    imageUrl: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=2070&auto=format&fit=crop",
    tags: ["海外消費", "網購", "手續費"],
    merchant: "攻略",
    isNew: false,
    updatedAt: "2025-12-01",
  },
  {
    id: "debit-card-guide",
    type: "guide" as const,
    title: "Debit Card 扣賬卡完全攻略｜香港各銀行比較、海外使用貼士",
    description: "Debit Card 中文係咩？同 Credit Card 有咩分別？HSBC、恒生、中銀 Debit Card 邊張最抵？日本旅行用 Debit Card 得唔得？",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop",
    tags: ["基礎知識", "銀行卡", "海外消費"],
    merchant: "攻略",
    isNew: false,
  },
  {
    id: "miles-vs-cashback",
    type: "guide" as const,
    title: "里數 vs 現金回贈｜儲邊樣最抵？1 里數值幾錢？",
    description: "儲里數定現金回贈抵？1 里數值幾錢？里數換機票有咩技巧？買里數、里數加現金抵唔抵？用數據分析幫你揀最啱你嘅回贈方式！",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop",
    tags: ["里數", "現金回贈", "信用卡攻略"],
    merchant: "攻略",
    isNew: false,
  },
  {
    id: "best-miles-credit-cards",
    type: "guide" as const,
    title: "里數信用卡攻略｜Asia Miles 信用卡比較｜儲里數技巧",
    description: "2025年最抵儲里數信用卡比較！渣打國泰、HSBC EveryMile、Citi PremierMiles、DBS Black 邊張最啱你？$/里比率、年費、迎新獎賞完全分析！",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop",
    tags: ["里數", "Asia Miles", "信用卡攻略"],
    merchant: "攻略",
    isNew: true,
    updatedAt: "2025-12-11",
  },
  {
    id: "best-cashback-cards",
    type: "guide" as const,
    title: "2025 最高回贈信用卡比較｜邊張信用卡好？",
    description: "現金回贈信用卡邊張最抵？無上限回贈卡有邊幾張？網購、餐飲、超市信用卡完全比較，教你揀最適合自己嘅信用卡組合！",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
    tags: ["現金回贈", "信用卡比較", "2025"],
    merchant: "攻略",
    isNew: true,
  },
  {
    id: "utility-bill-guide",
    type: "guide" as const,
    title: "信用卡繳費攻略｜交水電煤/差餉/電話費高達4%回贈",
    description: "用信用卡交水電煤、差餉、電話費、管理費可以賺回贈！網上繳費信用卡邊張最抵？AlipayHK、BoC Pay 繳費攻略！",
    imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2070&auto=format&fit=crop",
    tags: ["繳費", "水電煤", "差餉"],
    merchant: "攻略",
    isNew: true,
  },
  {
    id: "rent-payment-guide",
    type: "guide" as const,
    title: "信用卡交租攻略｜公屋/私樓用 RentSmart 交租賺回贈",
    description: "信用卡交租有回贈嗎？公屋、私樓可以用信用卡交租嗎？透過 RentSmart 用信用卡交租，仲可以食迎新！",
    imageUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2070&auto=format&fit=crop",
    tags: ["交租", "公屋", "私樓"],
    merchant: "攻略",
    isNew: true,
  },
  {
    id: "tax-payment-guide",
    type: "guide" as const,
    title: "信用卡交稅攻略｜AlipayHK/雲閃付交稅賺2%回贈",
    description: "信用卡交稅有回贈嗎？透過 AlipayHK、雲閃付、BoC Pay 交稅可賺高達 2% 回贈！各銀行交稅優惠及免息分期計劃比較。",
    imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=2070&auto=format&fit=crop",
    tags: ["交稅", "AlipayHK", "雲閃付"],
    merchant: "攻略",
    isNew: true,
  },
  {
    id: "online-shopping-guide",
    type: "guide" as const,
    title: "網購信用卡攻略｜HKTVmall/淘寶/Amazon 最高5%回贈",
    description: "網購信用卡邊張回贈最高？HKTVmall、淘寶、Amazon 都可以賺高達 5% 回贈！外幣網購注意事項及 Apple Pay 網購攻略。",
    imageUrl: "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=2070&auto=format&fit=crop",
    tags: ["網購", "HKTVmall", "淘寶"],
    merchant: "攻略",
    isNew: true,
  },
  {
    id: "dining-guide",
    type: "guide" as const,
    title: "餐飲信用卡攻略｜食飯最高5%回贈",
    description: "食飯信用卡邊張回贈最高？酒樓、茶餐廳、快餐店、外賣平台都可以賺高達 5% 回贈！Apple Pay 食飯攻略。",
    imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2070&auto=format&fit=crop",
    tags: ["餐飲", "食肆", "外賣"],
    merchant: "攻略",
    isNew: true,
  },
  {
    id: "overseas-spending-guide",
    type: "guide" as const,
    title: "海外簽賬信用卡攻略｜旅行最高7%回贈",
    description: "海外簽賬信用卡邊張最抵？日本、韓國、台灣、泰國、歐美旅行都適用！比較手續費及回贈率。",
    imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=2070&auto=format&fit=crop",
    tags: ["海外簽賬", "旅行", "日本"],
    merchant: "攻略",
    isNew: true,
  },
  {
    id: "supermarket-guide",
    type: "guide" as const,
    title: "超市信用卡攻略｜百佳/惠康/HKTVmall 最高5%回贈",
    description: "超市信用卡邊張回贈最高？百佳、惠康、HKTVmall、AEON 都可以賺高達 5% 回贈！92 折優惠日攻略。",
    imageUrl: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=2070&auto=format&fit=crop",
    tags: ["超市", "百佳", "惠康"],
    merchant: "攻略",
    isNew: true,
  },
  {
    id: "taobao-guide",
    type: "guide" as const,
    title: "淘寶信用卡攻略｜扣埋手續費淨賺1.5%回贈",
    description: "淘寶用邊張信用卡最抵？用 AlipayHK 付款免手續費，淨賺 1.5% 回贈！天貓、集運付款攻略。",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
    tags: ["淘寶", "天貓", "AlipayHK"],
    merchant: "攻略",
    isNew: true,
  },
  {
    id: "no-annual-fee-guide",
    type: "guide" as const,
    title: "永久免年費信用卡推薦｜年費豁免攻略",
    description: "邊張信用卡永久免年費？HSBC、Citi 年費點 waive？本文教你年費豁免攻略！",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop",
    tags: ["免年費", "年費豁免", "waive"],
    merchant: "攻略",
    isNew: true,
  },
  {
    id: "student-card-guide",
    type: "guide" as const,
    title: "學生信用卡攻略｜大學生必備免入息證明信用卡",
    description: "大學生可以申請信用卡嗎？學生信用卡邊張最好？免入息證明信用卡推薦！",
    imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
    tags: ["學生", "大學生", "免入息"],
    merchant: "攻略",
    isNew: true,
  },
  {
    id: "large-purchase-guide",
    type: "guide" as const,
    title: "大額簽賬信用卡攻略｜結婚/裝修/醫療賺盡迎新",
    description: "大額簽賬點樣賺盡信用卡優惠？結婚擺酒、裝修、私家醫院拆單大法！",
    imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2070&auto=format&fit=crop",
    tags: ["大額簽賬", "迎新", "結婚"],
    merchant: "攻略",
    isNew: true,
  },
  {
    id: "octopus-guide",
    type: "guide" as const,
    title: "八達通增值信用卡攻略｜自動增值/O!ePay 回贈",
    description: "八達通自動增值有回贈嗎？O!ePay 增值點樣 Chok 回贈？比較各銀行八達通增值回贈！",
    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop",
    tags: ["八達通", "自動增值", "O!ePay"],
    merchant: "攻略",
    isNew: true,
  },
  {
    id: "mobile-payment-guide",
    type: "guide" as const,
    title: "手機支付信用卡攻略｜Apple Pay/Google Pay 回贈",
    description: "Apple Pay 回贈點計？Google Pay 同 Apple Pay 回贈一樣嗎？比較各銀行 Mobile Pay 回贈！",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
    tags: ["Apple Pay", "Google Pay", "手機支付"],
    merchant: "攻略",
    isNew: true,
  },
  {
    id: "payment-methods-guide",
    type: "guide" as const,
    title: "支付方式回贈攻略｜流動支付 vs 實體卡 vs 網購",
    description: "同一張卡，不同支付方式回贈差 10 倍！Apple Pay / Google Pay、實體卡、網上簽賬回贈有咩分別？增值型電子錢包陷阱要點避？",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
    tags: ["支付方式", "Apple Pay", "網購"],
    merchant: "攻略",
    isNew: true,
    updatedAt: "2025-12-11",
  },
  {
    id: "low-income-guide",
    type: "guide" as const,
    title: "免入息證明信用卡攻略｜低門檻即批信用卡",
    description: "無入息證明可以申請信用卡嗎？家庭主婦、自僱人士、現金出糧都適用！即時批核信用卡推薦！",
    imageUrl: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2070&auto=format&fit=crop",
    tags: ["免入息", "低門檻", "即批"],
    merchant: "攻略",
    isNew: true,
  },
  {
    id: "food-delivery-guide",
    type: "guide" as const,
    title: "外賣平台信用卡攻略｜Foodpanda/Keeta 高達5%回贈",
    description: "Foodpanda、KeeTa 用邊張信用卡最抵？外賣都可以賺高達 5% 回贈！",
    imageUrl: "https://images.unsplash.com/photo-1526367790999-0150786686a2?q=80&w=2071&auto=format&fit=crop",
    tags: ["Foodpanda", "Keeta", "外賣"],
    merchant: "攻略",
    isNew: true,
  },
  {
    id: "streaming-guide",
    type: "guide" as const,
    title: "串流平台信用卡攻略｜Netflix/Spotify/Disney+ 回贈比較",
    description: "Netflix、Spotify、Disney+ 用邊張信用卡最抵？CBF 手續費點樣避？串流平台信用卡攻略！",
    imageUrl: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=2070&auto=format&fit=crop",
    tags: ["Netflix", "Spotify", "Disney+"],
    merchant: "攻略",
    isNew: true,
  },
  {
    id: "driving-guide",
    type: "guide" as const,
    title: "揸車必備信用卡攻略｜入油/易通行/停車場高達8%回贈",
    description: "揸車入油、易通行、停車場用邊張信用卡最抵？入油最高 8% 回贈！",
    imageUrl: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop",
    tags: ["入油", "易通行", "車主"],
    merchant: "攻略",
    isNew: true,
  },
  {
    id: "insurance-guide",
    type: "guide" as const,
    title: "信用卡交保費攻略｜AIA/保誠/宏利保費回贈高達2%",
    description: "交保費都可以賺信用卡回贈？邊張卡交保費最抵？保費回贈高達 2%！",
    imageUrl: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2070&auto=format&fit=crop",
    tags: ["保費", "保險", "AIA"],
    merchant: "攻略",
    isNew: true,
  },
  {
    id: "pinduoduo-guide",
    type: "guide" as const,
    title: "拼多多信用卡攻略｜免手續費兼賺高達5%回贈",
    description: "拼多多購物用邊張信用卡最抵？用 AlipayHK 免手續費兼賺高達 5% 回贈！",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
    tags: ["拼多多", "網購", "AlipayHK"],
    merchant: "攻略",
    isNew: true,
  },
  {
    id: "uber-guide",
    type: "guide" as const,
    title: "Uber 信用卡攻略｜扣埋 CBF 手續費仲淨賺2%回贈",
    description: "Uber 用邊張信用卡最抵？有 CBF 手續費嗎？用免 CBF 卡淨賺 2% 回贈！",
    imageUrl: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop",
    tags: ["Uber", "交通", "免 CBF"],
    merchant: "攻略",
    isNew: true,
  },
  {
    id: "iherb-guide",
    type: "guide" as const,
    title: "iHerb 信用卡攻略｜扣埋 CBF 手續費仲淨賺2%回贈",
    description: "iHerb 買保健品用邊張信用卡最抵？用免 CBF 卡淨賺 2% 回贈！",
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=2070&auto=format&fit=crop",
    tags: ["iHerb", "保健品", "免 CBF"],
    merchant: "攻略",
    isNew: true,
  },
  {
    id: "iphone-guide",
    type: "guide" as const,
    title: "iPhone 17 信用卡攻略｜食迎新買 iPhone 慳 $2,000！",
    description: "買 iPhone 用邊張信用卡最抵？食迎新 + 拆單大法慳 $2,000！",
    imageUrl: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=2070&auto=format&fit=crop",
    tags: ["iPhone", "Apple", "迎新"],
    merchant: "攻略",
    isNew: true,
  },
  {
    id: "ipad-guide",
    type: "guide" as const,
    title: "iPad 出機攻略｜食迎新買 iPad 慳 $2,000！",
    description: "買 iPad 用邊張信用卡最抵？連 M4 iPad Pro 價錢及教育優惠！",
    imageUrl: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=2070&auto=format&fit=crop",
    tags: ["iPad", "Apple", "迎新"],
    merchant: "攻略",
    isNew: true,
  },
  {
    id: "macbook-guide",
    type: "guide" as const,
    title: "MacBook 出機攻略｜食迎新買 MacBook 慳 $2,000！",
    description: "買 MacBook 用邊張信用卡最抵？連 M4/M5 MacBook Pro 價錢！",
    imageUrl: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2070&auto=format&fit=crop",
    tags: ["MacBook", "Apple", "迎新"],
    merchant: "攻略",
    isNew: true,
  },
  {
    id: "apple-watch-guide",
    type: "guide" as const,
    title: "Apple Watch 出機攻略｜Series 10 / Ultra 2 價錢比較",
    description: "買 Apple Watch 用邊張信用卡最抵？連 Series 10 / Ultra 2 價錢！",
    imageUrl: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?q=80&w=2070&auto=format&fit=crop",
    tags: ["Apple Watch", "Apple", "迎新"],
    merchant: "攻略",
    isNew: true,
  },
  {
    id: "ps5-guide",
    type: "guide" as const,
    title: "PS5 出機攻略｜食迎新買 PS5 最平 $1,400 起！",
    description: "買 PS5 用邊張信用卡最抵？Slim 定 Pro？數位版定光碟版？",
    imageUrl: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?q=80&w=2070&auto=format&fit=crop",
    tags: ["PS5", "PlayStation", "遊戲"],
    merchant: "攻略",
    isNew: true,
  },
  {
    id: "xbox-guide",
    type: "guide" as const,
    title: "Xbox 出機攻略｜食迎新買 Xbox 最平 $1,000 起！",
    description: "買 Xbox 用邊張信用卡最抵？Series X 定 S？Game Pass 攻略！",
    imageUrl: "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?q=80&w=2070&auto=format&fit=crop",
    tags: ["Xbox", "Game Pass", "遊戲"],
    merchant: "攻略",
    isNew: true,
  },
  {
    id: "switch-guide",
    type: "guide" as const,
    title: "Switch 2 出機攻略｜食迎新買 Switch 最平 $1,850 起！",
    description: "買 Switch 2 用邊張信用卡最抵？幾時出？價錢幾多？",
    imageUrl: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?q=80&w=2070&auto=format&fit=crop",
    tags: ["Switch", "Nintendo", "遊戲"],
    merchant: "攻略",
    isNew: true,
  },
];

type ContentType = "all" | "promo" | "guide";

export function DiscoverClient() {
  const [isReporting, setIsReporting] = useState(false);
  const { user, followPromo, unfollowPromo, isPromoFollowed } = useWallet();
  const { promos } = useDataset();
  const [contentType, setContentType] = useState<ContentType>("all");
  const [tagFilter, setTagFilter] = useState<string>("all");
  const [customCovers, setCustomCovers] = useState<Record<string, string>>({});

  // 獲取自訂封面設定
  useEffect(() => {
    async function fetchCustomCovers() {
      try {
        const res = await fetch('/api/article-settings');
        if (res.ok) {
          const data = await res.json();
          setCustomCovers(data.settings || {});
        }
      } catch (e) {
        console.error('Failed to fetch custom covers:', e);
      }
    }
    fetchCustomCovers();
  }, []);

  // 獲取有效封面圖片 (自訂或預設)
  const getCoverImage = (item: { id: string; imageUrl?: string }) => {
    return customCovers[item.id] || item.imageUrl || '';
  };

  const displayPromos = promos.length > 0 ? promos : PROMOS;

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("感謝您的回報！我們將盡快審核此優惠資訊。");
    setIsReporting(false);
  };

  const toggleFollow = (id: string) => {
    if (!user) {
      alert("請先登入以關注優惠");
      return;
    }
    if (isPromoFollowed(id)) {
      unfollowPromo(id);
    } else {
      followPromo(id);
    }
  };

  // 合併優惠和攻略
  const allContent = [
    ...GUIDES.map(g => ({ ...g, contentType: "guide" as const })),
    ...displayPromos.map(p => ({ ...p, contentType: "promo" as const, type: "promo" as const })),
  ];

  // 根據類型和標籤篩選
  const filteredContent = allContent.filter(item => {
    const typeMatch = contentType === "all" || item.contentType === contentType;
    const tagMatch = tagFilter === "all" || 
      item.tags.includes(tagFilter) || 
      ('merchant' in item && item.merchant.toLowerCase() === tagFilter.toLowerCase());
    return typeMatch && tagMatch;
  });

  // 排序邏輯：1. 置頂優先 2. 最後更新時間降序
  const sortedContent = filteredContent.sort((a, b) => {
    // 1. 置頂優先
    const aIsPinned = 'isPinned' in a && a.isPinned;
    const bIsPinned = 'isPinned' in b && b.isPinned;
    if (aIsPinned && !bIsPinned) return -1;
    if (!aIsPinned && bIsPinned) return 1;
    
    // 2. 按 sortOrder 排序（數字越大越前）
    const aSortOrder = 'sortOrder' in a ? (a.sortOrder || 0) : 0;
    const bSortOrder = 'sortOrder' in b ? (b.sortOrder || 0) : 0;
    if (aSortOrder !== bSortOrder) return bSortOrder - aSortOrder;
    
    // 3. 按 updatedAt 排序（最新更新在前）
    const aUpdated = 'updatedAt' in a && a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
    const bUpdated = 'updatedAt' in b && b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
    if (aUpdated !== bUpdated) return bUpdated - aUpdated;
    
    return 0;
  });

  const contentTypes = [
    { id: "all", label: "全部", icon: Sparkles },
    { id: "promo", label: "優惠", icon: Tag },
    { id: "guide", label: "攻略", icon: BookOpen },
  ];

  const tagFilters = [
    { id: "all", label: "全部" },
    { id: "餐飲", label: "🍽️ 餐飲" },
    { id: "網購", label: "🛒 網購" },
    { id: "旅遊", label: "✈️ 旅遊" },
    { id: "海外消費", label: "🌍 海外" },
    { id: "超市", label: "🏪 超市" },
    { id: "迎新", label: "🎁 迎新" },
    { id: "HSBC", label: "HSBC" },
    { id: "恒生", label: "恒生" },
    { id: "DBS", label: "DBS" },
  ];

  return (
    <>
      {/* Header - 更簡潔的設計 */}
      <div className="bg-white dark:bg-gray-900 sticky top-0 z-40 border-b dark:border-gray-800">
        <div className="container mx-auto px-4">
          {/* 主標題區域 */}
          <div className="flex items-center justify-between py-4">
            {/* Content Type Tabs - 更緊湊的 pill 設計 */}
            <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-full">
              {contentTypes.map(type => {
                const Icon = type.icon;
                return (
                  <button
                    key={type.id}
                    onClick={() => setContentType(type.id as ContentType)}
                    className={`px-4 py-1.5 rounded-full text-sm font-medium flex items-center gap-1.5 transition-all ${
                      contentType === type.id 
                        ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm" 
                        : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {type.label}
                  </button>
                );
              })}
            </div>
            
            {/* 回報按鈕 */}
            <Button 
              onClick={() => setIsReporting(!isReporting)} 
              variant="ghost" 
              size="sm" 
              className="gap-1.5 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <PlusCircle className="h-4 w-4" />
              {isReporting ? "取消" : "回報優惠"}
            </Button>
          </div>
          
          {/* Tag Filters - 水平滾動標籤 */}
          <div className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 scrollbar-hide">
            {tagFilters.map(f => (
              <button
                key={f.id}
                onClick={() => setTagFilter(f.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                  tagFilter === f.id 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 py-6 flex-1 relative z-0">
        {/* Report Form */}
        {isReporting && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="max-w-xl mx-auto mb-8 bg-white dark:bg-gray-800 p-6 rounded-2xl border dark:border-gray-700 shadow-lg overflow-hidden"
          >
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2 dark:text-white">
              <Send className="h-5 w-5 text-blue-600" /> 提交新優惠
            </h3>
            <form onSubmit={handleReportSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">優惠標題</label>
                <Input placeholder="例如：麥當勞週末滿$100送$10" required className="dark:bg-gray-700 dark:border-gray-600" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">銀行/商戶</label>
                  <Input placeholder="例如：HSBC" required className="dark:bg-gray-700 dark:border-gray-600" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">截止日期</label>
                  <Input type="date" required className="dark:bg-gray-700 dark:border-gray-600" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">詳細內容</label>
                <textarea 
                  className="w-full min-h-[80px] rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 px-3 py-2 text-sm placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 dark:text-white resize-none"
                  placeholder="請簡述優惠詳情..."
                  required
                />
              </div>
              <Button type="submit" className="w-full rounded-xl">提交審核</Button>
            </form>
          </motion.div>
        )}

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedContent.map((item, index) => {
            const isGuide = item.contentType === "guide";
            const isFollowed = !isGuide && isPromoFollowed(item.id);
            const daysLeft = !isGuide && 'expiryDate' in item && item.expiryDate 
              ? Math.ceil((new Date(item.expiryDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)) 
              : 0;
            
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
              >
                <Link 
                  href={`/discover/${item.id}`} 
                  className="block h-full"
                >
                  <Card className={`flex flex-col h-full hover:shadow-lg transition-all active:scale-[0.98] duration-300 overflow-hidden border-0 ring-1 dark:bg-gray-800 rounded-2xl cursor-pointer ${
                    isGuide 
                      ? "ring-emerald-200 dark:ring-emerald-800 bg-gradient-to-br from-emerald-50/50 to-white dark:from-emerald-900/10 dark:to-gray-800" 
                      : "ring-gray-200 dark:ring-gray-800"
                  }`}>
                    {/* Visual Header */}
                    <div className="h-40 bg-gray-100 dark:bg-gray-900 relative overflow-hidden group">
                      {getCoverImage(item) ? (
                        <img 
                          src={getCoverImage(item)} 
                          alt={item.title} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-300 dark:text-gray-700 bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                          <ImageIcon className="h-12 w-12 opacity-50" />
                        </div>
                      )}
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>

                      <div className="absolute top-3 right-3 flex gap-2 z-10">
                        {/* Guide Badge */}
                        {isGuide && (
                          <div className="flex items-center text-xs font-bold text-white bg-emerald-500 px-3 py-1 rounded-full shadow-sm">
                            <BookOpen className="h-3 w-3 mr-1" />
                            攻略
                          </div>
                        )}
                        
                        {/* New Badge */}
                        {'isNew' in item && item.isNew && (
                          <div className="flex items-center text-xs font-bold text-white bg-red-500 px-2 py-1 rounded-full shadow-sm animate-pulse">
                            NEW
                          </div>
                        )}
                        
                        {/* Follow Button (Promo only) */}
                        {!isGuide && (
                          <button 
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleFollow(item.id);
                            }}
                            className={`p-2 rounded-full backdrop-blur-md transition-colors shadow-sm ${
                              isFollowed 
                                ? "bg-yellow-400 text-white" 
                                : "bg-white/20 text-white hover:bg-white/40"
                            }`}
                          >
                            {isFollowed ? <Bell className="h-4 w-4 fill-current" /> : <Bell className="h-4 w-4" />}
                          </button>
                        )}
                        
                        {/* Expiry Badge (Promo only) */}
                        {!isGuide && 'expiryDate' in item && item.expiryDate && (
                          <div className={`flex items-center text-xs font-bold text-white backdrop-blur-md px-3 py-1 rounded-full shadow-sm ${
                            daysLeft < 3 ? "bg-red-500/90" : "bg-black/40"
                          }`}>
                            <Clock className="h-3 w-3 mr-1" />
                            剩 {daysLeft} 天
                          </div>
                        )}
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 z-10">
                        <div className="flex justify-between items-end">
                          <span className={`text-[10px] font-bold text-white backdrop-blur px-2 py-1 rounded-md uppercase tracking-wider ${
                            isGuide ? "bg-emerald-600/70" : "bg-black/50"
                          }`}>
                            {'merchant' in item ? item.merchant : '攻略'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <CardHeader className="pb-2 pt-4 px-5">
                      <CardTitle className="text-lg font-bold leading-snug dark:text-white line-clamp-2">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="flex-1 px-5">
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map(tag => (
                          <span 
                            key={tag} 
                            className={`inline-flex items-center text-xs px-2 py-1 rounded-md ${
                              isGuide 
                                ? "text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30" 
                                : "text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700"
                            }`}
                          >
                            <Tag className="h-3 w-3 mr-1 opacity-50" />
                            {tag}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                    
                    <CardFooter className={`border-t pt-4 px-5 pb-5 mt-auto ${
                      isGuide 
                        ? "border-emerald-100 dark:border-emerald-900/50 bg-emerald-50/30 dark:bg-emerald-900/10" 
                        : "border-gray-100 dark:border-gray-800 bg-gray-50/30 dark:bg-gray-800/50"
                    }`}>
                      <div className="w-full flex items-center justify-between text-xs">
                        <span className="text-gray-400 dark:text-gray-500">
                          {isGuide ? "📖 閱讀攻略" : `有效期至 ${'expiryDate' in item ? item.expiryDate : ''}`}
                        </span>
                        <span className={`font-medium flex items-center ${
                          isGuide 
                            ? "text-emerald-600 dark:text-emerald-400" 
                            : "text-blue-600 dark:text-blue-400"
                        }`}>
                          {isGuide ? "查看" : "詳情"} <ExternalLink className="h-3 w-3 ml-1" />
                        </span>
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Empty State */}
        {sortedContent.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">暫無相關內容</h3>
            <p className="text-gray-500 dark:text-gray-400">請嘗試其他篩選條件</p>
          </div>
        )}

        {/* Quick Links */}
        <div className="mt-12 grid grid-cols-2 gap-4">
          <Link href="/cards" className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl text-center hover:opacity-90 transition-opacity active:scale-95">
            <div className="text-2xl mb-2">💳</div>
            <div className="font-bold text-gray-900 dark:text-white">所有信用卡</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">查看全港卡片庫</div>
          </Link>
          <Link href="/rankings" className="bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/40 dark:to-amber-800/40 p-6 rounded-2xl text-center hover:opacity-90 transition-opacity active:scale-95">
            <div className="text-2xl mb-2">🏆</div>
            <div className="font-bold text-amber-900 dark:text-white">回贈排行榜</div>
            <div className="text-xs text-amber-600 dark:text-amber-300">揀卡無難度</div>
          </Link>
        </div>
      </main>
    </>
  );
}

