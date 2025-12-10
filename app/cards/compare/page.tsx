"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { HK_CARDS } from "@/lib/data/cards";
import { useDataset } from "@/lib/admin/data-store";
import { useWallet } from "@/lib/store/wallet-context";
import { CreditCard } from "@/lib/types";
import { 
  ArrowLeft, Plus, X, Check, Search, 
  CreditCard as CardIcon, Percent, DollarSign, 
  Plane, Gift, Calendar, AlertCircle, ChevronDown
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Input } from "@/components/ui/input";

const MAX_COMPARE = 3;

export default function CompareCardsPage() {
  const { cards: datasetCards } = useDataset();
  const { user } = useWallet();
  const cards = datasetCards.length > 0 ? datasetCards : HK_CARDS;
  
  const [selectedCardIds, setSelectedCardIds] = useState<string[]>([]);
  const [showCardPicker, setShowCardPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllRules, setShowAllRules] = useState(false);
  const lastLoggedRef = useRef<string>("");
  const selectedCardIdsRef = useRef<string[]>([]);
  const userIdRef = useRef<string | null>(null);

  // Keep refs in sync with state
  useEffect(() => {
    selectedCardIdsRef.current = selectedCardIds;
  }, [selectedCardIds]);

  useEffect(() => {
    userIdRef.current = user?.id || null;
  }, [user?.id]);

  // Log comparison when user LEAVES the page (not on every selection)
  useEffect(() => {
    const logComparison = () => {
      const cardIds = selectedCardIdsRef.current;
      if (cardIds.length >= 2) {
        const sortedIds = [...cardIds].sort().join(',');
        // Only log if this is a new combination (not already logged)
        if (sortedIds !== lastLoggedRef.current) {
          lastLoggedRef.current = sortedIds;
          // Use sendBeacon for reliable logging on page unload
          const data = JSON.stringify({
            cardIds: cardIds,
            userId: userIdRef.current
          });
          if (navigator.sendBeacon) {
            // sendBeacon needs a Blob with correct Content-Type
            const blob = new Blob([data], { type: 'application/json' });
            navigator.sendBeacon('/api/compare/log', blob);
          } else {
            // Fallback for browsers without sendBeacon
            fetch('/api/compare/log', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: data,
              keepalive: true
            }).catch(() => {});
          }
        }
      }
    };

    // Log when page becomes hidden (user switches tab or closes)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        logComparison();
      }
    };

    // Log when user navigates away
    const handleBeforeUnload = () => {
      logComparison();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      // Also log on component unmount (e.g., navigation within the app)
      logComparison();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);
  
  const selectedCards = useMemo(() => {
    return selectedCardIds.map(id => cards.find(c => c.id === id)).filter(Boolean) as CreditCard[];
  }, [selectedCardIds, cards]);
  
  const filteredCards = useMemo(() => {
    // Filter out hidden cards first
    const visibleCards = cards.filter(c => !c.hidden);
    if (!searchQuery.trim()) return visibleCards;
    const q = searchQuery.toLowerCase();
    return visibleCards.filter(c => 
      c.name.toLowerCase().includes(q) || 
      c.bank.toLowerCase().includes(q) ||
      c.tags?.some(t => t.toLowerCase().includes(q))
    );
  }, [cards, searchQuery]);
  
  const addCard = (cardId: string) => {
    if (selectedCardIds.length >= MAX_COMPARE) return;
    if (selectedCardIds.includes(cardId)) return;
    setSelectedCardIds([...selectedCardIds, cardId]);
    setShowCardPicker(false);
    setSearchQuery("");
  };
  
  const removeCard = (cardId: string) => {
    setSelectedCardIds(selectedCardIds.filter(id => id !== cardId));
  };
  
  // Get all unique rule descriptions across selected cards
  const allRuleDescriptions = useMemo(() => {
    const descriptions = new Set<string>();
    selectedCards.forEach(card => {
      card.rules?.forEach(rule => {
        descriptions.add(rule.description);
      });
    });
    return Array.from(descriptions);
  }, [selectedCards]);
  
  // Get reward for a specific rule description
  const getCardReward = (card: CreditCard, description: string) => {
    const rule = card.rules?.find(r => r.description === description);
    if (!rule) return null;
    return {
      percentage: rule.percentage,
      cap: rule.cap,
      capType: rule.capType,
      isDiscount: rule.isDiscount
    };
  };

  // Get base reward for a card (non-special merchant/category)
  // Finds the lowest-threshold base reward (preferably one without monthlyMinSpend)
  const getBaseReward = (card: CreditCard): { percentage: number; condition?: string } => {
    const baseRules = card.rules?.filter(r => 
      r.matchType === 'base' && 
      !r.isDiscount && 
      !r.isForeignCurrency &&
      !r.validDays && // Exclude day-specific rules
      !r.validDates
    ) || [];
    
    if (baseRules.length === 0) return { percentage: 0 };
    
    // Prefer rules without monthlyMinSpend, then lowest monthlyMinSpend
    const sortedRules = baseRules.sort((a, b) => {
      const aMin = a.monthlyMinSpend || 0;
      const bMin = b.monthlyMinSpend || 0;
      return aMin - bMin;
    });
    
    const bestRule = sortedRules[0];
    return {
      percentage: bestRule.percentage,
      condition: bestRule.monthlyMinSpend ? `需月簽$${bestRule.monthlyMinSpend.toLocaleString()}` : undefined
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-1">
        {/* Header */}
        <div className="mb-6">
          <Link href="/cards" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-4 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>返回信用卡列表</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">信用卡比較</h1>
          <p className="text-gray-600 dark:text-gray-400">選擇最多 {MAX_COMPARE} 張信用卡進行比較</p>
        </div>
        
        {/* Selected Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {selectedCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative"
            >
              <Card className="overflow-hidden border-2 border-emerald-200 dark:border-emerald-800">
                <button
                  onClick={() => removeCard(card.id)}
                  className="absolute top-2 right-2 z-10 bg-white dark:bg-gray-800 rounded-full p-1 shadow-md hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  <X className="h-4 w-4 text-red-500" />
                </button>
                
                <div className={`h-32 ${card.imageUrl ? 'bg-white dark:bg-gray-900' : (card.style?.bgColor || 'bg-gray-700')} flex items-center justify-center p-4`}>
                  {card.imageUrl ? (
                    <img src={card.imageUrl} alt={card.name} className="max-h-full max-w-full object-contain" referrerPolicy="no-referrer" />
                  ) : (
                    <div className={`text-center ${card.style?.textColor || 'text-white'}`}>
                      <p className="text-xs opacity-80">{card.bank}</p>
                      <p className="font-bold">{card.name}</p>
                    </div>
                  )}
                </div>
                
                <CardContent className="p-4">
                  <p className="text-xs text-gray-500 dark:text-gray-400">{card.bank}</p>
                  <h3 className="font-bold text-gray-900 dark:text-white">{card.name}</h3>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {card.tags?.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[10px] px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
          
          {/* Add Card Button */}
          {selectedCardIds.length < MAX_COMPARE && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <button
                onClick={() => setShowCardPicker(true)}
                className="w-full h-full min-h-[200px] rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center gap-3 hover:border-emerald-400 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/10 transition-colors group"
              >
                <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/30 transition-colors">
                  <Plus className="h-6 w-6 text-gray-400 group-hover:text-emerald-600" />
                </div>
                <span className="text-gray-500 dark:text-gray-400 group-hover:text-emerald-600 font-medium">
                  新增信用卡
                </span>
              </button>
            </motion.div>
          )}
        </div>
        
        {/* Comparison Table */}
        {selectedCards.length >= 2 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl border dark:border-gray-700 overflow-hidden shadow-sm"
          >
            <div className="p-4 border-b dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              <h2 className="font-bold text-lg text-gray-900 dark:text-white">詳細比較</h2>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b dark:border-gray-700">
                    <th className="text-left p-4 text-sm font-medium text-gray-500 dark:text-gray-400 w-1/4">
                      比較項目
                    </th>
                    {selectedCards.map(card => (
                      <th key={card.id} className="text-center p-4 text-sm font-bold text-gray-900 dark:text-white">
                        {card.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {/* Basic Info */}
                  <tr className="border-b dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30">
                    <td className="p-4 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <CardIcon className="h-4 w-4 text-gray-400" />
                      銀行
                    </td>
                    {selectedCards.map(card => (
                      <td key={card.id} className="p-4 text-center text-sm text-gray-600 dark:text-gray-300">
                        {card.bank}
                      </td>
                    ))}
                  </tr>
                  
                  <tr className="border-b dark:border-gray-700">
                    <td className="p-4 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      年費
                    </td>
                    {selectedCards.map(card => (
                      <td key={card.id} className="p-4 text-center text-sm">
                        {card.annualFee ? (
                          <span className="text-gray-600 dark:text-gray-300">${card.annualFee}</span>
                        ) : (
                          <span className="text-emerald-600 font-medium">免年費</span>
                        )}
                        {card.feeWaiverCondition && (
                          <p className="text-[10px] text-gray-400 mt-1">{card.feeWaiverCondition}</p>
                        )}
                      </td>
                    ))}
                  </tr>
                  
                  <tr className="border-b dark:border-gray-700 bg-gray-50/50 dark:bg-gray-900/30">
                    <td className="p-4 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <Plane className="h-4 w-4 text-gray-400" />
                      外幣手續費
                    </td>
                    {selectedCards.map(card => (
                      <td key={card.id} className="p-4 text-center text-sm">
                        {card.foreignCurrencyFee !== undefined ? (
                          card.foreignCurrencyFee === 0 ? (
                            <span className="text-emerald-600 font-medium">免手續費</span>
                          ) : (
                            <span className="text-gray-600 dark:text-gray-300">{card.foreignCurrencyFee}%</span>
                          )
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                    ))}
                  </tr>
                  
                  <tr className="border-b dark:border-gray-700">
                    <td className="p-4 text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
                      <Gift className="h-4 w-4 text-gray-400" />
                      迎新優惠
                    </td>
                    {selectedCards.map(card => (
                      <td key={card.id} className="p-4 text-center text-sm text-gray-600 dark:text-gray-300">
                        {card.welcomeOfferText || card.sellingPoints?.[0] || '-'}
                      </td>
                    ))}
                  </tr>
                  
                  {/* Reward Rules Header */}
                  <tr className="border-b dark:border-gray-700 bg-emerald-50 dark:bg-emerald-900/20">
                    <td colSpan={selectedCards.length + 1} className="p-3 text-sm font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                      <Percent className="h-4 w-4" />
                      回贈規則
                    </td>
                  </tr>

                  {/* Base Reward - Important for non-special merchants */}
                  <tr className="border-b dark:border-gray-700 bg-blue-50 dark:bg-blue-900/20">
                    <td className="p-4 text-sm font-medium text-blue-700 dark:text-blue-300">
                      ⭐ 基本回贈（非特約商戶）
                    </td>
                    {selectedCards.map(card => {
                      const { percentage, condition } = getBaseReward(card);
                      return (
                        <td key={card.id} className="p-4 text-center">
                          <span className={`font-bold ${percentage > 0 ? 'text-blue-600' : 'text-gray-400'}`}>
                            {percentage > 0 ? `${percentage}%` : '0%'}
                          </span>
                          {condition && (
                            <p className="text-[10px] text-orange-500 mt-0.5">
                              {condition}
                            </p>
                          )}
                          {card.rewardConfig?.currency && (
                            <p className="text-[10px] text-gray-400 mt-0.5">
                              ({card.rewardConfig.currency})
                            </p>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                  
                  {/* Dynamic Rules Rows */}
                  {(showAllRules ? allRuleDescriptions : allRuleDescriptions.slice(0, 8)).map((desc, index) => (
                    <tr key={desc} className={`border-b dark:border-gray-700 ${index % 2 === 0 ? 'bg-gray-50/50 dark:bg-gray-900/30' : ''}`}>
                      <td className="p-4 text-sm text-gray-700 dark:text-gray-300">
                        {desc}
                      </td>
                      {selectedCards.map(card => {
                        const reward = getCardReward(card, desc);
                        return (
                          <td key={card.id} className="p-4 text-center">
                            {reward ? (
                              <div>
                                <span className={`font-bold ${reward.isDiscount ? 'text-orange-600' : 'text-emerald-600'}`}>
                                  {reward.isDiscount ? `${(100 - reward.percentage) / 10}折` : `${reward.percentage}%`}
                                </span>
                                {reward.cap && (
                                  <p className="text-[10px] text-gray-400 mt-0.5">
                                    上限 ${reward.cap}
                                  </p>
                                )}
                              </div>
                            ) : (
                              <span className="text-gray-300 dark:text-gray-600">-</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                  
                  {allRuleDescriptions.length > 8 && (
                    <tr className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 cursor-pointer transition-colors" onClick={() => setShowAllRules(!showAllRules)}>
                      <td colSpan={selectedCards.length + 1} className="p-3 text-center">
                        <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-center gap-1 mx-auto">
                          {showAllRules ? (
                            <>收起規則 <ChevronDown className="h-3 w-3 rotate-180" /></>
                          ) : (
                            <>展開更多 {allRuleDescriptions.length - 8} 項規則 <ChevronDown className="h-3 w-3" /></>
                          )}
                        </button>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
        
        {/* Empty State */}
        {selectedCards.length < 2 && (
          <div className="text-center py-12">
            <CardIcon className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
            <h3 className="text-lg font-bold text-gray-700 dark:text-gray-300 mb-2">
              選擇至少 2 張信用卡
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              點擊上方「新增信用卡」按鈕開始比較
            </p>
          </div>
        )}
      </main>
      
      {/* Card Picker Modal */}
      <AnimatePresence>
        {showCardPicker && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setShowCardPicker(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed inset-x-0 bottom-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 bg-white dark:bg-gray-800 rounded-t-2xl md:rounded-2xl z-50 max-h-[80vh] md:max-h-[70vh] md:w-full md:max-w-lg overflow-hidden flex flex-col"
            >
              <div className="p-4 border-b dark:border-gray-700 flex items-center justify-between">
                <h3 className="font-bold text-lg text-gray-900 dark:text-white">選擇信用卡</h3>
                <button onClick={() => setShowCardPicker(false)} className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>
              
              <div className="p-4 border-b dark:border-gray-700">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="搜尋信用卡..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              
              <div className="flex-1 overflow-y-auto p-4 space-y-2">
                {filteredCards.map(card => {
                  const isSelected = selectedCardIds.includes(card.id);
                  return (
                    <button
                      key={card.id}
                      onClick={() => !isSelected && addCard(card.id)}
                      disabled={isSelected}
                      className={`w-full p-3 rounded-xl border flex items-center gap-3 transition-colors ${
                        isSelected 
                          ? 'bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600 opacity-50 cursor-not-allowed' 
                          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20'
                      }`}
                    >
                      {card.imageUrl ? (
                        <div className="w-12 h-8 rounded border bg-white flex items-center justify-center overflow-hidden shrink-0">
                          <img src={card.imageUrl} alt={card.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                        </div>
                      ) : (
                        <div className={`w-12 h-8 rounded ${card.style?.bgColor || 'bg-gray-500'} shrink-0`}></div>
                      )}
                      <div className="flex-1 text-left">
                        <p className="text-xs text-gray-500 dark:text-gray-400">{card.bank}</p>
                        <p className="font-medium text-gray-900 dark:text-white">{card.name}</p>
                      </div>
                      {isSelected && (
                        <Check className="h-5 w-5 text-emerald-500" />
                      )}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

