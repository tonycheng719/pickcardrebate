"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { POPULAR_MERCHANTS } from "@/lib/data/merchants";
import { CATEGORIES } from "@/lib/data/categories";
import { HK_CARDS } from "@/lib/data/cards";
import { findBestCards, CalculationResult } from "@/lib/logic/calculator";
import { useWallet } from "@/lib/store/wallet-context";
import { CheckCircle2, CreditCard, DollarSign, Sparkles, Flag, Info, Calendar, AlertCircle } from "lucide-react";
import { DynamicIcon } from "@/components/dynamic-icon";
import { useDataset } from "@/lib/admin/data-store";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ReportErrorDialog } from "@/components/report-error-dialog";
import { logSearch } from "@/app/actions/log-search";

const PAYMENT_OPTIONS = [
  { id: "physical_card", label: "實體卡" },
  { id: "online", label: "網上輸入信用卡" },
  { id: "apple_pay", label: "Apple Pay" },
  { id: "google_pay", label: "Google Pay" },
  { id: "payme", label: "PayMe" },
  { id: "alipay", label: "AlipayHK" },
  { id: "wechat_pay", label: "WeChat Pay HK" },
  { id: "unionpay_qr", label: "雲閃付 App" },
  { id: "boc_pay", label: "BoC Pay" },
  { id: "fps", label: "FPS" },
];

const categoryNameMap = Object.fromEntries(CATEGORIES.map((cat) => [cat.id, cat.name]));

// Define general merchants explicitly to ensure they always appear
const GENERAL_MERCHANTS = POPULAR_MERCHANTS.filter(m => m.isGeneral);

const DAYS_MAP = ["週日", "週一", "週二", "週三", "週四", "週五", "週六"];

type CreditCardCalculatorProps = {
  showIntro?: boolean;
  title?: string;
  subtitle?: string;
};

export function CreditCardCalculator({
  showIntro = true,
  title = "信用卡回贈計算機",
  subtitle = "選擇商戶與消費方式，即時計算最高回贈信用卡。",
}: CreditCardCalculatorProps) {
  const { myCardIds, user } = useWallet(); // Get user from wallet context
  const { cards, merchants } = useDataset();
  const categoryList = CATEGORIES;
  
  const merchantList = useMemo(() => {
      const datasetMerchants = merchants.length ? merchants : POPULAR_MERCHANTS;
      const existingIds = new Set(datasetMerchants.map(m => m.id));
      const missingGeneral = GENERAL_MERCHANTS.filter(m => !existingIds.has(m.id));
      return [...datasetMerchants, ...missingGeneral];
  }, [merchants]);

  const cardList = cards.length ? cards : HK_CARDS;
  const [selectedCategory, setSelectedCategory] = useState(categoryList[0]?.id || "");
  const [selectedMerchantId, setSelectedMerchantId] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("physical_card");
  const [results, setResults] = useState<CalculationResult[]>([]);
  const [open, setOpen] = useState(false);
  
  // Separate state for report dialog
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Refs for auto-scrolling
  const merchantsRef = useRef<HTMLDivElement>(null);
  const inputSectionRef = useRef<HTMLDivElement>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll when category changes
  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    setSelectedMerchantId(null);
    setTimeout(() => {
      merchantsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  // Auto-scroll and focus when merchant changes
  const handleMerchantSelect = (merchantId: string) => {
    setSelectedMerchantId(merchantId);
    setTimeout(() => {
      inputSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      amountInputRef.current?.focus();
    }, 150);
  };

  const filteredMerchants = useMemo(
    () => {
        if (!selectedCategory || selectedCategory === 'all') return merchantList;
        
        return merchantList
            .filter((m) => m.categoryIds.includes(selectedCategory))
            .sort((a, b) => {
                if (a.isGeneral && !b.isGeneral) return 1;
                if (!a.isGeneral && b.isGeneral) return -1;
                return 0;
            });
    },
    [merchantList, selectedCategory]
  );
  
  const effectiveMerchants = filteredMerchants;

  const selectedMerchant =
    effectiveMerchants.find((m) => m.id === selectedMerchantId) ||
    null; 

  const handleCalculate = () => {
    if (!selectedMerchant || !amount) return;
    const res = findBestCards(
      selectedMerchant.name,
      {
        amount: parseFloat(amount),
        paymentMethod,
      },
      cardList,
      merchantList,
      categoryList
    );
    
    const bestResult = res[0];
    logSearch({
        merchantId: selectedMerchant.id,
        merchantName: selectedMerchant.name,
        categoryId: selectedCategory,
        amount: parseFloat(amount),
        paymentMethod,
        bestCardId: bestResult?.card.id,
        bestRewardAmount: bestResult?.rewardAmount,
        userId: user?.id // Pass user ID from context state
    });

    setResults(res);
    setOpen(true);
  };

  const best = results[0];
  const others = results.slice(1);

  const handleReportClick = () => {
    // Close the result dialog to avoid stacking issues
    setOpen(false);
    // Open report dialog with a slight delay to ensure clean transition
    setTimeout(() => {
        setIsReportDialogOpen(true);
    }, 100);
  };

  const ResultContent = () => (
    <div className="space-y-4 p-4 pb-8">
      {!best ? (
        <p className="text-gray-500 text-sm">請輸入金額並重新計算。</p>
      ) : (
        <>
          <div className="rounded-2xl border-2 border-emerald-200 p-4 bg-emerald-50 relative overflow-hidden">
            {best.isCapped && (
              <div className="absolute top-0 right-0 bg-amber-100 text-amber-700 text-[10px] px-2 py-1 rounded-bl-lg font-medium flex items-center gap-1">
                <AlertCircle className="w-3 h-3" /> 已達上限
              </div>
            )}
            <div className="text-xs uppercase text-emerald-600 font-bold mb-1">本場最抵</div>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500">{best.card.bank}</p>
                <h3 className="text-lg font-bold">{best.card.name}</h3>
                <p className="text-sm text-gray-500">{best.matchedRule.description}</p>
                
                {/* Condition & Cap Tags */}
                <div className="flex flex-wrap gap-1 mt-2">
                   {best.matchedRule.validDays && (
                       <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-medium border border-blue-100">
                           <Calendar className="w-3 h-3" /> 
                           僅限 {best.matchedRule.validDays.map(d => DAYS_MAP[d]).join("/")}
                       </span>
                   )}
                   {best.matchedRule.cap && (
                       <span className="inline-flex items-center gap-1 px-1.5 py-0.5 bg-orange-50 text-orange-600 rounded text-[10px] font-medium border border-orange-100">
                           <Info className="w-3 h-3" /> 
                           上限: {best.matchedRule.capType === 'spending' ? '簽賬' : '回贈'} ${best.matchedRule.cap}
                       </span>
                   )}
                </div>

                {myCardIds.includes(best.card.id) ? (
                  <span className="inline-flex items-center gap-1 text-xs text-emerald-600 mt-2">
                    <CheckCircle2 className="h-3 w-3" /> 你已持有
                  </span>
                ) : null}
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-emerald-700">
                  {best.rewardAmount > 0 ? `+$${best.rewardAmount.toFixed(1)}` : `${best.percentage}%`}
                </div>
                {best.card.welcomeOfferText && !myCardIds.includes(best.card.id) && (
                  <div className="text-xs text-orange-500 mt-2">{best.card.welcomeOfferText}</div>
                )}
              </div>
            </div>
            {!myCardIds.includes(best.card.id) && best.card.applyUrl && (
              <Button
                className="w-full mt-3 bg-orange-500 hover:bg-orange-600"
                onClick={() => window.open(best.card.applyUrl, "_blank")}
              >
                立即申請
              </Button>
            )}
          </div>

          <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-1">
            {others.map((result) => (
              <div
                key={result.card.id}
                className="rounded-xl border bg-white dark:bg-gray-900 p-3 flex items-center justify-between relative"
              >
                {result.isCapped && (
                  <div className="absolute top-2 right-2 text-amber-500" title="已達上限">
                    <AlertCircle className="w-3 h-3" />
                  </div>
                )}
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">{result.card.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{result.matchedRule.description}</p>
                  
                  {/* Mini Condition Tags for others */}
                  <div className="flex flex-wrap gap-1 mt-1">
                      {result.matchedRule.validDays && (
                        <span className="text-[10px] text-blue-500 bg-blue-50 px-1 rounded">
                            僅限 {result.matchedRule.validDays.map(d => DAYS_MAP[d]).join("/")}
                        </span>
                      )}
                       {result.matchedRule.cap && (
                         <span className="text-[10px] text-gray-400">
                           (上限 {result.matchedRule.capType === 'spending' ? '簽' : '回'} ${result.matchedRule.cap})
                         </span>
                       )}
                  </div>

                  {myCardIds.includes(result.card.id) && (
                    <span className="text-xs text-emerald-500 inline-flex items-center gap-1 mt-1">
                      <CreditCard className="h-3 w-3" /> 你已持有
                    </span>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-gray-800 dark:text-gray-100">
                    {result.rewardAmount > 0 ? `+$${result.rewardAmount.toFixed(1)}` : `${result.percentage}%`}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex justify-center">
             <Button variant="ghost" size="sm" className="text-xs text-gray-400 hover:text-red-500 gap-1 h-8 px-2" onClick={handleReportClick}>
                <Flag className="h-3 w-3" /> 回報錯誤
             </Button>
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {showIntro && (
        <div>
          <p className="text-xs uppercase tracking-widest text-emerald-600 font-semibold">Beta 1.0</p>
          <h2 className="text-2xl font-bold text-gray-900 mt-2">{title}</h2>
          <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
        </div>
      )}

      <div className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3 flex-wrap mb-4">
          {categoryList.map((cat) => (
            <button
              key={cat.id}
              className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition active:scale-95 ${
                selectedCategory === cat.id
                  ? `${cat.bgColor} ${cat.accentColor} ring-2 ring-offset-2 ring-emerald-200`
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
              onClick={() => handleCategorySelect(cat.id)}
            >
              <DynamicIcon name={cat.icon} className="h-4 w-4" />
              {cat.name}
            </button>
          ))}
        </div>

        <div ref={merchantsRef} className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-6 scroll-mt-20">
          {effectiveMerchants.map((merchant) => (
            <Card
              key={merchant.id}
              className={`p-4 cursor-pointer border-2 transition-all active:scale-[0.98] ${
                selectedMerchant?.id === merchant.id ? "border-emerald-500 shadow-md" : "border-transparent hover:bg-gray-50 dark:hover:bg-gray-800"
              } ${merchant.isGeneral ? "bg-gray-50/50 dark:bg-gray-800/30 border-dashed" : ""}`}
              onClick={() => handleMerchantSelect(merchant.id)}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                  style={{
                    backgroundColor: `${merchant.accentColor || "#e5e7eb"}20`,
                    color: merchant.accentColor || "#111827",
                  }}
                >
                  {merchant.logo || merchant.name.charAt(0)}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-gray-900 leading-tight truncate">{merchant.name}</div>
                  <div className="text-[11px] text-gray-400 uppercase tracking-wide truncate">
                    {merchant.isGeneral ? "通用類別" : (categoryNameMap[merchant.categoryIds[0]] || merchant.categoryIds[0])}
                  </div>
                </div>
              </div>
            </Card>
          ))}
          {effectiveMerchants.length === 0 && (
            <div className="col-span-full text-center py-8 text-gray-500">
                此分類暫無特定商戶，請選擇「其他」類別試試。
            </div>
          )}
        </div>

        {/* Only show input section if a merchant is selected */}
        <div 
            ref={inputSectionRef} 
            className={`bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 space-y-3 scroll-mt-20 transition-all duration-500 ${selectedMerchant ? "opacity-100 translate-y-0" : "opacity-50 translate-y-4 pointer-events-none"}`}
        >
          <div>
            <label className="text-xs text-gray-500 dark:text-gray-400 mb-1 block">
              在 {selectedMerchant?.name || "商戶"} 消費
            </label>
            <div className="flex gap-3 flex-col md:flex-row">
              <div className="relative flex-1">
                <div className="absolute left-3 top-0 bottom-0 flex items-center justify-center pointer-events-none">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                </div>
                <Input
                  ref={amountInputRef}
                  type="number"
                  placeholder="輸入金額"
                  className="pl-9 bg-white dark:bg-gray-900 h-12 rounded-xl text-lg"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  disabled={!selectedMerchant}
                />
              </div>
              <select
                className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm h-12"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                disabled={!selectedMerchant}
              >
                {PAYMENT_OPTIONS.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                  {opt.label}
                  </option>
                ))}
              </select>
              <Button 
                className="rounded-xl shrink-0 h-12 px-6 text-base font-medium shadow-emerald-100 dark:shadow-none active:scale-95 transition-transform" 
                onClick={handleCalculate} 
                disabled={!amount || !selectedMerchant}
              >
                即刻計回贈
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Result Dialog/Drawer */}
      {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-emerald-600">
                <Sparkles className="h-5 w-5" /> {selectedMerchant?.name} 最抵攻略
              </DialogTitle>
            </DialogHeader>
            <ResultContent />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle className="flex items-center gap-2 text-emerald-600 justify-center">
                <Sparkles className="h-5 w-5" /> {selectedMerchant?.name} 最抵攻略
              </DrawerTitle>
            </DrawerHeader>
            <ResultContent />
          </DrawerContent>
        </Drawer>
      )}

      {/* Independent Report Error Dialog - Renders on top */}
      <ReportErrorDialog 
        open={isReportDialogOpen}
        onOpenChange={setIsReportDialogOpen}
        merchantName={selectedMerchant?.name}
        categoryId={selectedMerchant?.categoryIds[0]}
        amount={amount}
        paymentMethod={PAYMENT_OPTIONS.find(p => p.id === paymentMethod)?.label}
        cardName={best?.card.name}
        cardId={best?.card.id}
      />
    </div>
  );
}
