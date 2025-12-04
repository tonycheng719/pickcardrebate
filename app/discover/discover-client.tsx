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
import { useState } from "react";
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
];

type ContentType = "all" | "promo" | "guide";

export function DiscoverClient() {
  const [isReporting, setIsReporting] = useState(false);
  const { user, followPromo, unfollowPromo, isPromoFollowed } = useWallet();
  const { promos } = useDataset();
  const [contentType, setContentType] = useState<ContentType>("all");
  const [tagFilter, setTagFilter] = useState<string>("all");

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

  // 將攻略排在最前面
  const sortedContent = filteredContent.sort((a, b) => {
    if (a.contentType === "guide" && b.contentType === "promo") return -1;
    if (a.contentType === "promo" && b.contentType === "guide") return 1;
    return 0;
  });

  const contentTypes = [
    { id: "all", label: "全部", icon: Sparkles },
    { id: "promo", label: "優惠", icon: Tag },
    { id: "guide", label: "攻略", icon: BookOpen },
  ];

  const tagFilters = [
    { id: "all", label: "全部" },
    { id: "餐飲", label: "餐飲" },
    { id: "網購", label: "網購" },
    { id: "旅遊", label: "旅遊" },
    { id: "海外消費", label: "海外" },
    { id: "HSBC", label: "HSBC" },
  ];

  return (
    <>
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 pt-8 pb-4 px-4 sticky top-0 z-40 border-b dark:border-gray-800">
        <div className="container mx-auto">
          <div className="flex justify-between items-end mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Sparkles className="h-7 w-7 text-amber-500" />
                探索
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">優惠資訊、慳錢攻略一覽無遺</p>
            </div>
            <Button 
              onClick={() => setIsReporting(!isReporting)} 
              variant="outline" 
              size="sm" 
              className="gap-2 rounded-full dark:border-gray-700 dark:text-gray-300"
            >
              <PlusCircle className="h-4 w-4" />
              {isReporting ? "取消" : "回報"}
            </Button>
          </div>
          
          {/* Content Type Tabs */}
          <div className="flex gap-2 mb-3">
            {contentTypes.map(type => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setContentType(type.id as ContentType)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 transition-all ${
                    contentType === type.id 
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/30" 
                      : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {type.label}
                </button>
              );
            })}
          </div>
          
          {/* Tag Filters */}
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {tagFilters.map(f => (
              <button
                key={f.id}
                onClick={() => setTagFilter(f.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  tagFilter === f.id 
                    ? "bg-black text-white dark:bg-white dark:text-black" 
                    : "bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400"
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
                      {'imageUrl' in item && item.imageUrl ? (
                        <img 
                          src={item.imageUrl} 
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

