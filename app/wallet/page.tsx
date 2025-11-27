"use client";

import { Navbar } from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWallet } from "@/lib/store/wallet-context";
import { useDataset } from "@/lib/admin/data-store";
import { Plus, Wallet as WalletIcon, Trophy, Calendar, AlertCircle, ChevronRight, Settings2, Trash2, TrendingUp, Receipt, ArrowUpRight } from "lucide-react";
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
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { CreditCard } from "@/lib/types";

function TransactionHistoryDialog({ transactions }: { transactions: any[] }) {
    return (
        <DialogContent className="max-w-md max-h-[80vh] overflow-hidden flex flex-col">
            <DialogHeader>
                <DialogTitle>最近消費記錄</DialogTitle>
                <DialogDescription>您的一鍵記賬歷史</DialogDescription>
            </DialogHeader>
            <div className="flex-1 overflow-y-auto pr-2 space-y-3 py-4">
                {transactions.length === 0 ? (
                    <p className="text-center text-gray-500 py-8">暫無記錄</p>
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

function CardSettingsDialog({ cardId, cardName, currentFeeDate, children }: { cardId: string, cardName: string, currentFeeDate?: string, children: React.ReactNode }) {
    const { updateCardSetting, removeCard } = useWallet();
    const [feeDate, setFeeDate] = useState(currentFeeDate || "");
    const [open, setOpen] = useState(false);
    
    const handleSave = () => {
        updateCardSetting(cardId, { annualFeeDate: feeDate });
        toast.success("設定已更新", {
            description: "年費到期日已儲存。",
        });
        setOpen(false);
    };

    const handleRemove = () => {
        if (confirm(`確定要從錢包移除 ${cardName} 嗎？`)) {
            removeCard(cardId);
            toast.success("已移除卡片", {
                description: `${cardName} 已從您的錢包中移除。`,
            });
            setOpen(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>卡片設定 - {cardName}</DialogTitle>
                    <DialogDescription>
                        管理此卡片的個人化設定與狀態。
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">年費到期日</label>
                        <Input 
                            type="date" 
                            value={feeDate} 
                            onChange={(e) => setFeeDate(e.target.value)}
                            className="dark:bg-gray-800"
                        />
                        <p className="text-xs text-gray-500">我們將在到期前 1 個月提醒您申請豁免。</p>
                    </div>
                    
                    <div className="flex flex-col gap-3 pt-4 border-t dark:border-gray-800">
                        <Button onClick={handleSave} className="w-full">儲存設定</Button>
                        <Button 
                            variant="destructive" 
                            onClick={handleRemove}
                            className="w-full bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/40 border-none shadow-none"
                        >
                            <Trash2 className="h-4 w-4 mr-2" /> 從錢包移除此卡
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

function WalletCard({ card, feeDate }: { card: CreditCard, feeDate?: string }) {
    const [imageError, setImageError] = useState(false);

    return (
        <Card className="h-full hover:shadow-md transition-all active:scale-[0.98] border-0 ring-1 ring-gray-200 dark:ring-gray-700 dark:bg-gray-800 overflow-hidden group">
            <div className={`h-32 relative overflow-hidden flex items-center justify-center ${!card.imageUrl || imageError ? (card.style?.bgColor || 'bg-gray-500') + ' p-4' : 'bg-gray-50 dark:bg-gray-900'}`}>
                {card.imageUrl && !imageError ? (
                    <img 
                        src={card.imageUrl} 
                        alt={card.name} 
                        className="max-h-full max-w-full object-contain shadow-md rounded-lg" 
                        referrerPolicy="no-referrer"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <>
                        <div className="flex justify-between items-start z-10 relative w-full">
                            <div className={`font-bold text-lg ${card.style?.textColor || 'text-white'} opacity-90`}>{card.bank}</div>
                            <CardSettingsDialog cardId={card.id} cardName={card.name} currentFeeDate={feeDate}>
                                <button className={`p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors`}>
                                    <Settings2 className="h-4 w-4" />
                                </button>
                            </CardSettingsDialog>
                        </div>
                        <div className={`text-2xl font-bold mt-1 ${card.style?.textColor || 'text-white'} z-10 relative w-full text-left`}>{card.name}</div>
                        <div className="absolute bottom-4 right-4 w-10 h-8 bg-white/20 rounded backdrop-blur-md border border-white/30 z-10"></div>
                    </>
                )}
                {card.imageUrl && !imageError && (
                    <div className="absolute top-0 right-0 p-4 z-10">
                        <CardSettingsDialog cardId={card.id} cardName={card.name} currentFeeDate={feeDate}>
                            <button className="p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-colors">
                                <Settings2 className="h-4 w-4" />
                            </button>
                        </CardSettingsDialog>
                    </div>
                )}
            </div>
            
            <CardContent className="pt-6 space-y-6">
                {/* 年費提醒 */}
                <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                <Calendar className={`h-5 w-5 mt-0.5 ${feeDate ? "text-blue-600 dark:text-blue-400" : "text-gray-400"}`} />
                <div>
                    <div className="text-sm font-medium text-blue-900 dark:text-blue-200">年費到期日</div>
                    {feeDate ? (
                        <div className="text-xs text-blue-700 dark:text-blue-300 mt-0.5 font-mono">
                            {feeDate}
                        </div>
                    ) : (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            尚未設定
                        </div>
                    )}
                </div>
                </div>

                <div className="pt-2 flex justify-end">
                    <Link href={`/cards?highlight=${card.id}`}>
                    <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                        查看詳情 <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}

export default function WalletPage() {
  const { myCardIds, cardSettings, user } = useWallet();
  const { cards } = useDataset();
  
  const myCards = cards.filter((c) => myCardIds.includes(c.id));

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
             // Calculate stats for current month
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

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors">
      <Navbar />

      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">我的錢包</h1>
            <p className="text-gray-600 dark:text-gray-400">管理您擁有的信用卡，追蹤迎新進度與消費。</p>
          </div>
        </div>

        {myCards.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-white dark:bg-gray-900 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800"
          >
            <div className="w-20 h-20 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-400">
              <WalletIcon className="h-10 w-10" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">您的錢包是空的</h2>
            <p className="text-gray-500 mb-6 max-w-xs mx-auto">加入您擁有的信用卡，我們將為您計算最佳簽賬策略。</p>
            <Link href="/cards">
              <Button className="gap-2 rounded-full px-6">
                <Plus className="h-4 w-4" /> 加入第一張卡
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-8">
            {/* 錢包摘要 - Monthly Dashboard */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border dark:border-gray-800 shadow-sm">
                <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                    <WalletIcon className="w-3 h-3" /> 持有卡片
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{myCards.length} 張</div>
              </div>
              
              <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border dark:border-gray-800 shadow-sm">
                <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                    <TrendingUp className="w-3 h-3" /> 本月支出
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${stats.spending.toLocaleString()}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-900 p-4 rounded-2xl border dark:border-gray-800 shadow-sm">
                <div className="flex items-center gap-2 text-gray-500 text-xs mb-1">
                    <Trophy className="w-3 h-3" /> 本月回贈
                </div>
                <div className="text-2xl font-bold text-emerald-600">
                    ${stats.rewards.toLocaleString()}
                </div>
              </div>

              <Dialog open={isHistoryOpen} onOpenChange={setIsHistoryOpen}>
                <DialogTrigger asChild>
                    <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-2xl border border-emerald-100 dark:border-emerald-800/30 shadow-sm cursor-pointer hover:bg-emerald-100 dark:hover:bg-emerald-900/30 transition-colors group">
                        <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 text-xs mb-1 font-medium">
                            <Receipt className="w-3 h-3" /> 記賬記錄
                        </div>
                        <div className="text-lg font-bold text-emerald-800 dark:text-emerald-300 flex items-center justify-between">
                            {transactions.length} 筆
                            <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                    </div>
                </DialogTrigger>
                <TransactionHistoryDialog transactions={transactions} />
              </Dialog>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myCards.map((card, index) => {
                const settings = cardSettings[card.id] || {};
                const feeDate = settings.annualFeeDate;

                return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <WalletCard card={card} feeDate={feeDate} />
                </motion.div>
              )})}
              
              <Link href="/cards">
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: myCards.length * 0.1 }}
                    className="h-full min-h-[300px] rounded-xl border-2 border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer group"
                >
                    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Plus className="h-8 w-8 text-gray-400" />
                    </div>
                    <span className="font-medium text-gray-500">新增更多卡片</span>
                </motion.div>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
