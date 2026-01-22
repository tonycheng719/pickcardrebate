"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWallet } from "@/lib/store/wallet-context";
import { useDataset } from "@/lib/admin/data-store";
import { Plus, Wallet as WalletIcon, Trophy, Calendar, ChevronRight, Settings2, Trash2, TrendingUp, Receipt, ArrowUpRight } from "lucide-react";
import { WelcomeOfferTracker } from "@/components/welcome-offer-tracker";
import { SpendingReminders } from "@/components/spending-reminders";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState, useEffect, useRef } from "react";
import { toast } from "sonner";
import { CreditCard } from "@/lib/types";
import { Locale, localePathMap } from "@/lib/i18n/config";
import { getTranslation } from "@/lib/i18n/translations";

interface WalletClientProps {
  locale: Locale;
}

function TransactionHistoryDialog({ transactions, t }: { transactions: any[]; t: ReturnType<typeof getTranslation> }) {
    return (
        <DialogContent className="max-w-md max-h-[80vh] overflow-hidden flex flex-col">
            <DialogHeader>
                <DialogTitle>{t.wallet.recentTransactions}</DialogTitle>
                <DialogDescription>{t.wallet.transactions}</DialogDescription>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto pr-2 space-y-3 py-4">
                {transactions.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">{t.wallet.noTransactions}</p>
                ) : (
                    transactions.map((tx) => (
                        <div key={tx.id} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700">
                            <div>
                                <div className="font-bold text-gray-900 dark:text-gray-100">{tx.merchant_name}</div>
                                <div className="text-xs text-gray-500 flex gap-2">
                                    <span>{tx.transaction_date}</span>
                                    <span>•</span>
                                    <span>{tx.payment_method}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="font-mono font-bold">-${tx.amount}</div>
                                <div className="text-xs text-emerald-600 font-medium">
                                    +{tx.reward_amount > 0 ? `$${tx.reward_amount}` : '-'}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </DialogContent>
    );
}

function CardSettingsDialog({ cardId, cardName, currentFeeDate, children, t }: { cardId: string, cardName: string, currentFeeDate?: string, children: React.ReactNode, t: ReturnType<typeof getTranslation> }) {
    const { updateCardSetting, removeCard } = useWallet();
    const [feeDate, setFeeDate] = useState(currentFeeDate || "");
    const [open, setOpen] = useState(false);
    
    const handleSave = () => {
        updateCardSetting(cardId, { annualFeeDate: feeDate });
        toast.success(t.common.save);
        setOpen(false);
    };

    const handleRemove = () => {
        if (confirm(`${t.common.confirm} ${t.cards.removeFromWallet} ${cardName}?`)) {
            removeCard(cardId);
            toast.success(t.cards.removeFromWallet);
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{cardName}</DialogTitle>
                    <DialogDescription>{t.settings.title}</DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t.cards.annualFee}</label>
                        <Input type="date" value={feeDate} onChange={(e) => setFeeDate(e.target.value)} className="dark:bg-gray-800" />
                    </div>
                    
                    <div className="flex flex-col gap-3 pt-4 border-t dark:border-gray-800">
                        <Button onClick={handleSave} className="w-full">{t.common.save}</Button>
                        <Button variant="destructive" onClick={handleRemove} className="w-full bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 border-none shadow-none">
                            <Trash2 className="h-4 w-4 mr-2" /> {t.cards.removeFromWallet}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function WalletCard({ card, feeDate, locale, t }: { card: CreditCard, feeDate?: string, locale: Locale, t: ReturnType<typeof getTranslation> }) {
    const [imageError, setImageError] = useState(false);
    const prefix = localePathMap[locale] ? `/${localePathMap[locale]}` : '';

    useEffect(() => {
        setImageError(false);
    }, [card.imageUrl]);

    return (
        <Card className="h-full hover:shadow-md transition-all active:scale-[0.98] border-0 ring-1 ring-gray-200 dark:ring-gray-700 dark:bg-gray-800 overflow-hidden group flex flex-col">
            <div className={`h-32 relative overflow-hidden flex items-center justify-center ${(!card.imageUrl || imageError) ? (card.style?.bgColor || 'bg-gray-500') + ' p-4' : 'bg-gray-50 dark:bg-gray-900'}`}>
                {card.imageUrl && !imageError ? (
                    <img src={card.imageUrl} alt={card.name} className="max-h-full max-w-full object-contain shadow-md rounded-lg" referrerPolicy="no-referrer" onError={() => setImageError(true)} />
                ) : (
                    <>
                        <div className={`font-bold text-lg ${card.style?.textColor || 'text-white'} opacity-90`}>{card.bank}</div>
                        <div className={`text-2xl font-bold mt-1 ${card.style?.textColor || 'text-white'}`}>{card.name}</div>
                    </>
                )}
                <div className="absolute top-0 right-0 p-4 z-10">
                    <CardSettingsDialog cardId={card.id} cardName={card.name} currentFeeDate={feeDate} t={t}>
                        <button className="p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-colors">
                            <Settings2 className="h-4 w-4" />
                        </button>
                    </CardSettingsDialog>
                </div>
            </div>
            
            <CardContent className="pt-4 space-y-4 flex-1 flex flex-col">
                <div>
                    <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">{card.bank}</div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{card.name}</h3>
                </div>

                <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl mt-auto">
                <Calendar className={`h-5 w-5 mt-0.5 ${feeDate ? "text-blue-600 dark:text-blue-400" : "text-gray-400"}`} />
                <div>
                    <div className="text-sm font-medium text-blue-900 dark:text-blue-200">{t.cards.annualFee}</div>
                    {feeDate ? (
                        <div className="text-xs text-blue-700 dark:text-blue-300 mt-0.5 font-mono">{feeDate}</div>
                    ) : (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">-</div>
                    )}
                </div>
                </div>

                <div className="pt-2 flex justify-end">
                    <Link href={`${prefix}/cards/${card.id}`}>
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                        {t.cards.details} <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}

export default function WalletClient({ locale }: WalletClientProps) {
  const t = getTranslation(locale);
  const prefix = localePathMap[locale] ? `/${localePathMap[locale]}` : '';
  const { myCardIds, cardSettings, user, removeCard } = useWallet();
  const { cards } = useDataset();
  
  const myCards = cards.filter((c) => myCardIds.includes(c.id));
  const hasCleanedUp = useRef(false);
  
  useEffect(() => {
    if (cards.length > 0 && user?.id && !hasCleanedUp.current) {
      const invalidCardIds = myCardIds.filter(id => !cards.find(c => c.id === id));
      if (invalidCardIds.length > 0) {
        hasCleanedUp.current = true;
        invalidCardIds.forEach(id => removeCard(id));
        toast.info(`${t.common.delete} ${invalidCardIds.length}`);
      }
    }
  }, [cards, myCardIds, user, removeCard, t]);

  const [transactions, setTransactions] = useState<any[]>([]);
  const [stats, setStats] = useState({ spending: 0, rewards: 0 });
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  useEffect(() => {
    if (!user?.id) return;
    
    fetch(`/api/user/transactions?userId=${user.id}`)
      .then(res => res.json())
      .then(data => {
         if (Array.isArray(data)) {
             setTransactions(data);
             const now = new Date();
             const currentMonth = now.getMonth();
             const currentYear = now.getFullYear();
             
             let spending = 0;
             let rewards = 0;
             
             data.forEach((tx: any) => {
                 const d = new Date(tx.transaction_date);
                 if (d.getMonth() === currentMonth && d.getFullYear() === currentYear) {
                     spending += parseFloat(tx.amount || 0);
                     rewards += parseFloat(tx.reward_amount || 0);
                 }
             });
             setStats({ spending, rewards });
         }
      })
      .catch(err => console.error("Failed to fetch transactions", err));
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors">
        <Navbar />
        <main className="container mx-auto px-4 py-8 flex-1 flex flex-col items-center justify-center">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-md">
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <WalletIcon className="h-10 w-10 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{t.auth.loginRequired}</h1>
            <Link href={`${prefix}/login`}>
              <Button size="lg" className="w-full">{t.auth.login}</Button>
            </Link>
          </motion.div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors">
      <Navbar />

      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t.wallet.title}</h1>
            <p className="text-gray-600 dark:text-gray-400">{t.seo.walletDescription}</p>
          </div>
        </div>

        {myCards.length === 0 ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-16 bg-white dark:bg-gray-900 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <WalletIcon className="h-10 w-10" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{t.wallet.noCards}</h2>
            <p className="text-gray-500 mb-6 max-w-xs mx-auto">{t.wallet.addFirstCard}</p>
            <Link href={`${prefix}/cards`}>
              <Button className="gap-2 rounded-full px-6">
                <Plus className="h-4 w-4" /> {t.cards.addToWallet}
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              <SpendingReminders userCards={myCardIds} cardSettings={cardSettings} />
              <WelcomeOfferTracker userCards={myCardIds} />
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border dark:border-gray-800 shadow-sm">
                <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                    <WalletIcon className="w-3 h-3" /> {t.wallet.myCards}
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{myCards.length}</div>
              </div>
              
              <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border dark:border-gray-800 shadow-sm">
                <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                    <TrendingUp className="w-3 h-3" /> {t.wallet.monthlySpending}
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">${stats.spending.toLocaleString()}</div>
              </div>

              <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border dark:border-gray-800 shadow-sm">
                <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                    <Trophy className="w-3 h-3" /> {t.wallet.monthlyRebate}
                </div>
                <div className="text-2xl font-bold text-emerald-600">${stats.rewards.toLocaleString()}</div>
              </div>

              <Dialog open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
                <DialogTrigger asChild>
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-800/30 shadow-sm cursor-pointer hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors group">
                        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-xs mb-1 font-medium">
                            <Receipt className="w-3 h-3" /> {t.wallet.transactions}
                        </div>
                        <div className="text-lg font-bold text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                            {transactions.length}
                            <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </div>
                </DialogTrigger>
                <TransactionHistoryDialog transactions={transactions} t={t} />
              </Dialog>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myCards.map((card, index) => {
                const settings = cardSettings[card.id] || {};
                const feeDate = settings.annualFeeDate;

                return (
                <motion.div key={card.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                  <WalletCard card={card} feeDate={feeDate} locale={locale} t={t} />
                </motion.div>
              )})}
              
              <Link href={`${prefix}/cards`}>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: myCards.length * 0.1 }} className="h-full min-h-[300px] rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group">
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Plus className="h-8 w-8 text-gray-400" />
                    </div>
                    <span className="font-medium text-gray-500">{t.cards.addToWallet}</span>
                </motion.div>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}


