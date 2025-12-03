"use client";

import { Navbar } from "@/components/navbar";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDataset } from "@/lib/admin/data-store";
import { Clock, ExternalLink, Tag, Send, Bell, PlusCircle, Image as ImageIcon } from "lucide-react";
import { useState } from "react";
import { useWallet } from "@/lib/store/wallet-context";
import Link from "next/link";
import { motion } from "framer-motion";
import { PROMOS } from "@/lib/data/promos"; // Fallback

export default function PromosPage() {
  const [isReporting, setIsReporting] = useState(false);
  const { user, followPromo, unfollowPromo, isPromoFollowed } = useWallet();
  const { promos } = useDataset();
  const [filter, setFilter] = useState<string>("all");

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

  const filteredPromos = filter === "all" 
    ? displayPromos 
    : displayPromos.filter(p => p.tags.includes(filter) || p.merchant.toLowerCase() === filter.toLowerCase());

  const filters = [
      { id: "all", label: "全部" },
      { id: "餐飲", label: "餐飲" },
      { id: "網購", label: "網購" },
      { id: "旅遊", label: "旅遊" },
      { id: "HSBC", label: "HSBC" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors pb-24 md:pb-0">
      <Navbar />
      
      {/* Unified Header */}
      <div className="bg-white dark:bg-gray-900 pt-8 pb-4 px-4 sticky top-0 z-10 border-b dark:border-gray-800">
          <div className="container mx-auto">
              <div className="flex justify-between items-end mb-4">
                  <div>
                      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">最新優惠</h1>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">探索限時獎賞與活動</p>
                  </div>
                  <Button onClick={() => setIsReporting(!isReporting)} variant="outline" size="sm" className="gap-2 rounded-full dark:border-gray-700 dark:text-gray-300">
                    <PlusCircle className="h-4 w-4" />
                    {isReporting ? "取消" : "回報"}
                  </Button>
              </div>
              
              {/* Scrollable Filters */}
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
                  {filters.map(f => (
                      <button
                        key={f.id}
                        onClick={() => setFilter(f.id)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                            filter === f.id 
                            ? "bg-black text-white dark:bg-white dark:text-black" 
                            : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                        }`}
                      >
                          {f.label}
                      </button>
                  ))}
              </div>
          </div>
      </div>

      <main className="container mx-auto px-4 py-6 flex-1">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPromos.map((promo, index) => {
            const isFollowed = isPromoFollowed(promo.id);
            const daysLeft = promo.expiryDate ? Math.ceil((new Date(promo.expiryDate).getTime() - new Date().getTime()) / (1000 * 3600 * 24)) : 0;
            
            return (
            <motion.div
                key={promo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
            >
                <Link href={`/promos/${promo.id}`} className="block h-full">
                <Card className="flex flex-col h-full hover:shadow-lg transition-all active:scale-[0.98] duration-300 overflow-hidden border-0 ring-1 ring-gray-200 dark:ring-gray-800 dark:bg-gray-800 rounded-2xl cursor-pointer">
                {/* Promo Visual Header */}
                <div className="h-40 bg-gray-100 dark:bg-gray-900 relative overflow-hidden group">
                    {promo.imageUrl ? (
                        <img src={promo.imageUrl} alt={promo.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-300 dark:text-gray-700 bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                            <ImageIcon className="h-12 w-12 opacity-50" />
                        </div>
                    )}
                    
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60"></div>

                    <div className="absolute top-3 right-3 flex gap-2 z-10">
                        <button 
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleFollow(promo.id);
                            }}
                            className={`p-2 rounded-full backdrop-blur-md transition-colors shadow-sm ${isFollowed ? "bg-yellow-400 text-white" : "bg-white/20 text-white hover:bg-white/40"}`}
                        >
                            {isFollowed ? <Bell className="h-4 w-4 fill-current" /> : <Bell className="h-4 w-4" />}
                        </button>
                        
                        {promo.expiryDate && (
                            <div className={`flex items-center text-xs font-bold text-white backdrop-blur-md px-3 py-1 rounded-full shadow-sm ${daysLeft < 3 ? "bg-red-500/90" : "bg-black/40"}`}>
                                <Clock className="h-3 w-3 mr-1" />
                                剩 {daysLeft} 天
                            </div>
                        )}
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 z-10">
                         <div className="flex justify-between items-end">
                             <span className="text-[10px] font-bold text-white bg-black/50 backdrop-blur px-2 py-1 rounded-md uppercase tracking-wider">
                                {promo.merchant}
                            </span>
                         </div>
                    </div>
                </div>

                <CardHeader className="pb-2 pt-4 px-5">
                    <CardTitle className="text-lg font-bold leading-snug dark:text-white line-clamp-2">{promo.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 px-5">
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3">
                        {promo.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                    {promo.tags.map(tag => (
                        <span key={tag} className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-md">
                        <Tag className="h-3 w-3 mr-1 opacity-50" />
                        {tag}
                        </span>
                    ))}
                    </div>
                </CardContent>
                <CardFooter className="border-t dark:border-gray-800 pt-4 bg-gray-50/30 dark:bg-gray-800/50 px-5 pb-5 mt-auto">
                    <div className="w-full flex items-center justify-between text-xs">
                        <span className="text-gray-400 dark:text-gray-500">有效期至 {promo.expiryDate}</span>
                        <span className="text-blue-600 dark:text-blue-400 font-medium flex items-center">
                            詳情 <ExternalLink className="h-3 w-3 ml-1" />
                        </span>
                    </div>
                </CardFooter>
                </Card>
                </Link>
            </motion.div>
            )})}
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4">
            <Link href="/cards" className="bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 p-6 rounded-2xl text-center hover:opacity-90 transition-opacity active:scale-95">
                <div className="text-2xl mb-2">💳</div>
                <div className="font-bold text-gray-900 dark:text-white">所有信用卡</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">查看全港卡片庫</div>
            </Link>
            <Link href="/combos" className="bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/40 dark:to-purple-800/40 p-6 rounded-2xl text-center hover:opacity-90 transition-opacity active:scale-95">
                <div className="text-2xl mb-2">⚡️</div>
                <div className="font-bold text-purple-900 dark:text-white">疊加技攻略</div>
                <div className="text-xs text-purple-600 dark:text-purple-300">賺盡每一分</div>
            </Link>
        </div>
      </main>
    </div>
  );
}
