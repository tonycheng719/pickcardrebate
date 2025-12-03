"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { 
  Gift, Plus, Trash2, Calendar, Target, TrendingUp, 
  ChevronDown, ChevronUp, AlertCircle, Check, Edit2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { HK_CARDS } from "@/lib/data/cards";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface WelcomeOfferProgress {
  id: string;
  cardId: string;
  cardName: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  startDate: string;
  transactions: {
    date: string;
    amount: number;
    merchant?: string;
  }[];
}

const STORAGE_KEY = "pickcardrebate-welcome-offers";

export function WelcomeOfferTracker({ userCards }: { userCards: string[] }) {
  const [offers, setOffers] = useState<WelcomeOfferProgress[]>([]);
  const [isExpanded, setIsExpanded] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newOffer, setNewOffer] = useState({
    cardId: "",
    targetAmount: 0,
    deadline: "",
  });
  const [addTransactionFor, setAddTransactionFor] = useState<string | null>(null);
  const [newTransaction, setNewTransaction] = useState({ amount: 0, merchant: "" });

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setOffers(JSON.parse(saved));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(offers));
  }, [offers]);

  const addOffer = () => {
    if (!newOffer.cardId || !newOffer.targetAmount || !newOffer.deadline) {
      toast.error("請填寫所有欄位");
      return;
    }

    const card = HK_CARDS.find(c => c.id === newOffer.cardId);
    if (!card) return;

    const offer: WelcomeOfferProgress = {
      id: Date.now().toString(),
      cardId: newOffer.cardId,
      cardName: card.name,
      targetAmount: newOffer.targetAmount,
      currentAmount: 0,
      deadline: newOffer.deadline,
      startDate: new Date().toISOString().split('T')[0],
      transactions: [],
    };

    setOffers([...offers, offer]);
    setNewOffer({ cardId: "", targetAmount: 0, deadline: "" });
    setShowAddDialog(false);
    toast.success("已新增迎新追蹤");
  };

  const removeOffer = (id: string) => {
    setOffers(offers.filter(o => o.id !== id));
    toast.success("已移除追蹤");
  };

  const addTransaction = (offerId: string) => {
    if (newTransaction.amount <= 0) {
      toast.error("請輸入有效金額");
      return;
    }

    setOffers(offers.map(o => {
      if (o.id === offerId) {
        const newTx = {
          date: new Date().toISOString().split('T')[0],
          amount: newTransaction.amount,
          merchant: newTransaction.merchant || undefined,
        };
        return {
          ...o,
          currentAmount: o.currentAmount + newTransaction.amount,
          transactions: [...o.transactions, newTx],
        };
      }
      return o;
    }));

    setNewTransaction({ amount: 0, merchant: "" });
    setAddTransactionFor(null);
    toast.success("已記錄簽賬");
  };

  const getDaysRemaining = (deadline: string) => {
    const today = new Date();
    const end = new Date(deadline);
    const diff = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const getProgressColor = (current: number, target: number, daysRemaining: number) => {
    const progress = (current / target) * 100;
    if (progress >= 100) return "bg-emerald-500";
    if (daysRemaining < 7 && progress < 80) return "bg-red-500";
    if (daysRemaining < 14 && progress < 60) return "bg-amber-500";
    return "bg-blue-500";
  };

  // Filter cards that user owns and not already tracking
  const availableCards = HK_CARDS.filter(
    c => userCards.includes(c.id) && !offers.some(o => o.cardId === c.id)
  );

  if (offers.length === 0 && userCards.length === 0) {
    return null;
  }

  return (
    <Card className="border-0 shadow-lg bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950/30 dark:to-indigo-950/30 dark:border dark:border-purple-800/30">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-purple-900 dark:text-purple-100">
            <Gift className="h-5 w-5 text-purple-500" />
            迎新追蹤器
          </CardTitle>
          <div className="flex items-center gap-2">
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline" className="h-8 text-purple-700 border-purple-300 hover:bg-purple-100 dark:text-purple-300 dark:border-purple-700 dark:hover:bg-purple-900/50">
                  <Plus className="h-4 w-4 mr-1" /> 新增
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>新增迎新追蹤</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 pt-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">選擇信用卡</label>
                    <select
                      className="w-full mt-1 p-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                      value={newOffer.cardId}
                      onChange={(e) => setNewOffer({ ...newOffer, cardId: e.target.value })}
                    >
                      <option value="">選擇信用卡...</option>
                      {availableCards.map(card => (
                        <option key={card.id} value={card.id}>{card.bank} - {card.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">迎新目標金額 (HKD)</label>
                    <Input
                      type="number"
                      placeholder="例如：8000"
                      value={newOffer.targetAmount || ""}
                      onChange={(e) => setNewOffer({ ...newOffer, targetAmount: Number(e.target.value) })}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">截止日期</label>
                    <Input
                      type="date"
                      value={newOffer.deadline}
                      onChange={(e) => setNewOffer({ ...newOffer, deadline: e.target.value })}
                      className="mt-1"
                    />
                  </div>
                  <Button onClick={addOffer} className="w-full">
                    開始追蹤
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
              className="h-8 w-8 p-0"
            >
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <CardContent className="pt-2">
              {offers.length === 0 ? (
                <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                  <Gift className="h-12 w-12 mx-auto mb-3 text-purple-300" />
                  <p className="text-sm">尚未追蹤任何迎新優惠</p>
                  <p className="text-xs mt-1">點擊「新增」開始追蹤你的迎新進度</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {offers.map((offer) => {
                    const progress = Math.min((offer.currentAmount / offer.targetAmount) * 100, 100);
                    const daysRemaining = getDaysRemaining(offer.deadline);
                    const remaining = Math.max(offer.targetAmount - offer.currentAmount, 0);
                    const isComplete = progress >= 100;

                    return (
                      <motion.div
                        key={offer.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`p-4 rounded-xl border ${
                          isComplete 
                            ? 'bg-emerald-50 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800' 
                            : daysRemaining < 7 && progress < 80
                            ? 'bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-800'
                            : 'bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">{offer.cardName}</h4>
                            <div className="flex items-center gap-3 mt-1 text-sm text-gray-500 dark:text-gray-400">
                              <span className="flex items-center gap-1">
                                <Target className="h-3.5 w-3.5" />
                                ${offer.targetAmount.toLocaleString()}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5" />
                                {daysRemaining > 0 ? `剩餘 ${daysRemaining} 天` : '已截止'}
                              </span>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-gray-400 hover:text-red-500"
                            onClick={() => removeOffer(offer.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600 dark:text-gray-400">
                              已簽 ${offer.currentAmount.toLocaleString()}
                            </span>
                            <span className={`font-medium ${isComplete ? 'text-emerald-600' : 'text-gray-900 dark:text-white'}`}>
                              {isComplete ? (
                                <span className="flex items-center gap-1">
                                  <Check className="h-4 w-4" /> 已達標！
                                </span>
                              ) : (
                                `尚欠 $${remaining.toLocaleString()}`
                              )}
                            </span>
                          </div>
                          <Progress 
                            value={progress} 
                            className={`h-2 ${getProgressColor(offer.currentAmount, offer.targetAmount, daysRemaining)}`}
                          />
                          <div className="flex justify-between items-center text-xs text-gray-500">
                            <span>{progress.toFixed(0)}%</span>
                            {!isComplete && daysRemaining > 0 && (
                              <span className="flex items-center gap-1">
                                <TrendingUp className="h-3 w-3" />
                                每日需簽 ${Math.ceil(remaining / daysRemaining).toLocaleString()}
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Add Transaction */}
                        {addTransactionFor === offer.id ? (
                          <div className="mt-3 pt-3 border-t dark:border-gray-700 flex gap-2">
                            <Input
                              type="number"
                              placeholder="金額"
                              value={newTransaction.amount || ""}
                              onChange={(e) => setNewTransaction({ ...newTransaction, amount: Number(e.target.value) })}
                              className="flex-1"
                            />
                            <Input
                              type="text"
                              placeholder="商戶 (選填)"
                              value={newTransaction.merchant}
                              onChange={(e) => setNewTransaction({ ...newTransaction, merchant: e.target.value })}
                              className="flex-1"
                            />
                            <Button size="sm" onClick={() => addTransaction(offer.id)}>
                              記錄
                            </Button>
                            <Button size="sm" variant="ghost" onClick={() => setAddTransactionFor(null)}>
                              取消
                            </Button>
                          </div>
                        ) : (
                          <Button
                            size="sm"
                            variant="outline"
                            className="w-full mt-3"
                            onClick={() => setAddTransactionFor(offer.id)}
                          >
                            <Plus className="h-4 w-4 mr-1" /> 記錄簽賬
                          </Button>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

