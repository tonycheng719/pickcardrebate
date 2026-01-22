"use client";

// Re-export the existing compare page with locale context
import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { HK_CARDS } from "@/lib/data/cards";
import { useDataset } from "@/lib/admin/data-store";
import { Search, X, Plus, Check, Scale } from "lucide-react";
import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Locale, localePathMap } from "@/lib/i18n/config";
import { getTranslation } from "@/lib/i18n/translations";

interface CompareClientProps {
  locale: Locale;
}

export default function CompareClient({ locale }: CompareClientProps) {
  const t = getTranslation(locale);
  const prefix = localePathMap[locale] ? `/${localePathMap[locale]}` : '';
  const { cards: datasetCards } = useDataset();
  const cards = datasetCards.length > 0 ? datasetCards.filter(c => !c.hidden) : HK_CARDS.filter(c => !c.hidden);
  
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredCards = useMemo(() => {
    if (!searchQuery.trim()) return cards.slice(0, 12);
    const query = searchQuery.toLowerCase();
    return cards.filter(card => 
      card.name.toLowerCase().includes(query) ||
      card.bank.toLowerCase().includes(query)
    );
  }, [cards, searchQuery]);
  
  const selectedCardData = useMemo(() => {
    return selectedCards.map(id => cards.find(c => c.id === id)).filter(Boolean);
  }, [selectedCards, cards]);
  
  const toggleCard = (cardId: string) => {
    if (selectedCards.includes(cardId)) {
      setSelectedCards(prev => prev.filter(id => id !== cardId));
    } else if (selectedCards.length < 4) {
      setSelectedCards(prev => [...prev, cardId]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 flex items-center justify-center gap-2">
            <Scale className="h-8 w-8 text-emerald-600" />
            {locale === 'en' ? 'Compare Credit Cards' : locale === 'zh-CN' ? '信用卡比较' : '信用卡比較'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {locale === 'en' ? 'Select up to 4 cards to compare' : locale === 'zh-CN' ? '选择最多 4 张卡进行比较' : '選擇最多 4 張卡進行比較'}
          </p>
        </div>
        
        {/* Search */}
        <div className="relative max-w-md mx-auto mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder={t.common.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 h-11"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2">
              <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>
        
        {/* Selected Cards Count */}
        {selectedCards.length > 0 && (
          <div className="text-center mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-full text-sm font-medium">
              <Check className="h-4 w-4" />
              {selectedCards.length} / 4 {locale === 'en' ? 'selected' : '已選擇'}
            </span>
          </div>
        )}
        
        {/* Card Selection Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {filteredCards.map((card) => {
            const isSelected = selectedCards.includes(card.id);
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => toggleCard(card.id)}
                className={`cursor-pointer rounded-xl border-2 p-4 transition-all ${
                  isSelected 
                    ? 'border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20' 
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 bg-white dark:bg-gray-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-8 rounded-lg flex items-center justify-center overflow-hidden ${!card.imageUrl ? (card.style?.bgColor || 'bg-gray-600') : 'bg-white dark:bg-gray-900'}`}>
                    {card.imageUrl ? (
                      <img src={card.imageUrl} alt={card.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                    ) : (
                      <span className="text-white text-xs font-bold">{card.bank.slice(0, 2)}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{card.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{card.bank}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${isSelected ? 'bg-emerald-500 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}>
                    {isSelected ? <Check className="h-4 w-4" /> : <Plus className="h-4 w-4 text-gray-400" />}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        
        {/* Comparison Table */}
        {selectedCardData.length > 0 && (
          <Card className="mb-8">
            <CardContent className="p-6 overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="border-b dark:border-gray-700">
                    <th className="text-left py-3 px-2 text-gray-500 dark:text-gray-400 font-medium">{locale === 'en' ? 'Feature' : '特性'}</th>
                    {selectedCardData.map(card => card && (
                      <th key={card.id} className="text-center py-3 px-2">
                        <Link href={`${prefix}/cards/${card.id}`} className="hover:text-blue-600">
                          <p className="font-bold text-gray-900 dark:text-white">{card.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">{card.bank}</p>
                        </Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b dark:border-gray-800">
                    <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{t.cards.annualFee}</td>
                    {selectedCardData.map(card => card && (
                      <td key={card.id} className="text-center py-3 px-2 font-medium text-gray-900 dark:text-white">
                        {card.annualFee === 0 ? (locale === 'en' ? 'Free' : '免年費') : card.annualFee ? `$${card.annualFee.toLocaleString()}` : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b dark:border-gray-800">
                    <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{locale === 'en' ? 'Max Rebate' : '最高回贈'}</td>
                    {selectedCardData.map(card => card && (
                      <td key={card.id} className="text-center py-3 px-2 font-bold text-emerald-600 dark:text-emerald-400">
                        {Math.max(...card.rules.filter(r => !r.isDiscount).map(r => r.percentage))}%
                      </td>
                    ))}
                  </tr>
                  <tr className="border-b dark:border-gray-800">
                    <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{t.cards.minIncome}</td>
                    {selectedCardData.map(card => card && (
                      <td key={card.id} className="text-center py-3 px-2 text-gray-900 dark:text-white">
                        {card.minIncome ? `$${card.minIncome.toLocaleString()}` : '-'}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-2 text-gray-600 dark:text-gray-400">{locale === 'en' ? 'FX Fee' : '外幣手續費'}</td>
                    {selectedCardData.map(card => card && (
                      <td key={card.id} className={`text-center py-3 px-2 font-medium ${card.foreignCurrencyFee === 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-white'}`}>
                        {card.foreignCurrencyFee !== undefined ? (card.foreignCurrencyFee === 0 ? (locale === 'en' ? 'Free' : '豁免') : `${card.foreignCurrencyFee}%`) : '-'}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </CardContent>
          </Card>
        )}
        
        {/* CTA */}
        <div className="text-center">
          <Link href={`${prefix}/cards`}>
            <Button variant="outline">{locale === 'en' ? 'View All Cards' : '瀏覽所有信用卡'}</Button>
          </Link>
        </div>
      </main>
    </div>
  );
}


