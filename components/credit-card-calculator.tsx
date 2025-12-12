"use client";
// Force deploy: 2024-12-10 v2
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
import { PARTNER_MODE_ENABLED } from "@/lib/config";
import { CreditCard as CreditCardType } from "@/lib/types";
import { useWallet } from "@/lib/store/wallet-context";
  import { CheckCircle2, CreditCard, DollarSign, Sparkles, Flag, Info, Calendar, AlertCircle, Lightbulb, Store, Globe, ChevronDown, ChevronUp, BadgeCheck, Tag, AlertTriangle, Search, LogIn, PlusCircle, Loader2, History, HelpCircle, Swords, X, Share2 } from "lucide-react";
import { ShareButton } from "@/components/share-button";
import { DynamicIcon } from "@/components/dynamic-icon";
import { useDataset } from "@/lib/admin/data-store";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ReportErrorDialog } from "@/components/report-error-dialog";
import { logSearch } from "@/app/actions/log-search";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { trackSearch, trackCalculateRebate, trackSelectCategory } from "@/lib/analytics";
import { Label } from "@/components/ui/label";
import { useMerchantCommunityData } from "@/hooks/use-merchant-community-data";
import Link from "next/link";

// Helper to render note with Markdown links
function renderNoteWithLinks(note: string) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = linkRegex.exec(note)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      elements.push(note.slice(lastIndex, match.index));
    }
    
    // Add the link
    const [, text, url] = match;
    elements.push(
      <Link 
        key={key++} 
        href={url} 
        className="text-blue-600 hover:underline font-medium"
      >
        {text}
      </Link>
    );
    
    lastIndex = match.index + match[0].length;
  }
  
  // Add remaining text after last link
  if (lastIndex < note.length) {
    elements.push(note.slice(lastIndex));
  }
  
  return elements.length > 0 ? elements : note;
}
import { LoginPromptDialog } from "@/components/login-prompt-dialog";
import { toast } from "sonner";
import { RewardBreakdown } from "@/components/reward-breakdown";

const PAYMENT_OPTIONS = [
  { id: "physical_card", label: "門市使用實體卡", onlineOnly: false },
  { id: "online", label: "網上輸入信用卡", onlineOnly: true },
  { id: "apple_pay", label: "Apple Pay", onlineOnly: false },
  { id: "google_pay", label: "Google Pay", onlineOnly: false },
  { id: "alipay", label: "AlipayHK", onlineOnly: false },
  { id: "wechat_pay", label: "WeChat Pay HK", onlineOnly: false },
  { id: "unionpay_qr", label: "雲閃付 App", onlineOnly: false },
  { id: "boc_pay", label: "BoC Pay", onlineOnly: false },
];

// 純網上消費的類別 - 這些類別不應該顯示「門市使用實體卡」選項
const ONLINE_ONLY_CATEGORIES = ["online"];

// Payment methods that might be used online or offline
const AMBIGUOUS_PAYMENT_METHODS = ["apple_pay", "google_pay", "alipay", "wechat_pay", "unionpay_qr", "boc_pay"];

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
  title = "信用卡回贈計算機 (Beta)",
  subtitle = "選擇商戶與消費方式，即時計算最高回贈信用卡。",
}: CreditCardCalculatorProps) {
  const { myCardIds, user, rewardPreference } = useWallet(); // Get user and preference from wallet context
  const { cards, merchants } = useDataset();
  const categoryList = CATEGORIES;
  
  const merchantList = useMemo(() => {
      const datasetMerchants = merchants.length ? merchants : POPULAR_MERCHANTS;
      const existingIds = new Set(datasetMerchants.map(m => m.id));
      const missingGeneral = GENERAL_MERCHANTS.filter(m => !existingIds.has(m.id));
      return [...datasetMerchants, ...missingGeneral];
  }, [merchants]);

  // Merge cards: HK_CARDS has the latest rules, dataset cards may have updated images
  const cardList = useMemo(() => {
    const cardMap = new Map<string, CreditCardType>();
    
    // Start with HK_CARDS (has all latest rules), excluding hidden cards
    HK_CARDS.filter(c => !c.hidden).forEach(card => cardMap.set(card.id, card));
    
    // Overlay with dataset cards (for updated images, etc.) but keep rules from HK_CARDS
    cards.forEach(card => {
      const existing = cardMap.get(card.id);
      if (existing) {
        // Keep rules/note from HK_CARDS, but update imageUrl and other fields
        cardMap.set(card.id, { 
          ...existing, 
          imageUrl: card.imageUrl || existing.imageUrl,
        });
      }
      // Note: Don't add cards that are only in DB but not in HK_CARDS
    });
    
    return Array.from(cardMap.values());
  }, [cards]);
  const [selectedCategory, setSelectedCategory] = useState(categoryList[0]?.id || "");
  const [selectedMerchantId, setSelectedMerchantId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(""); // New Search State
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("physical_card");
  const [isOnlineScenario, setIsOnlineScenario] = useState<boolean | null>(null); // null = not selected yet
  const [results, setResults] = useState<CalculationResult[]>([]);
  const [open, setOpen] = useState(false);
  const [showMyOtherCards, setShowMyOtherCards] = useState(false); // Toggle for owned cards
  const [showUnownedCards, setShowUnownedCards] = useState(false); // Toggle for unowned cards
  const [showLoginPrompt, setShowLoginPrompt] = useState(false); // New state for login prompt
  
  // Transaction Recording State
  const [recordingCardId, setRecordingCardId] = useState<string | null>(null);
  const [recordedCardIds, setRecordedCardIds] = useState<Set<string>>(new Set());
  
  // Separate state for report dialog
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  
  // New states for "Why this card" and "Compare" features
  const [showWhyDialog, setShowWhyDialog] = useState(false);
  const [whyCardResult, setWhyCardResult] = useState<CalculationResult | null>(null); // Track which card to show "Why" for
  const [showCompareDialog, setShowCompareDialog] = useState(false);
  const [compareCardResult, setCompareCardResult] = useState<CalculationResult | null>(null);

  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Refs for auto-scrolling
  const merchantsRef = useRef<HTMLDivElement>(null);
  const inputSectionRef = useRef<HTMLDivElement>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);

  // Community Data Hook
  const { verifiedCards, tags, isLoading: isCommunityLoading, trapCount } = useMerchantCommunityData(selectedMerchantId);

  const handleRecordTransaction = async (result: CalculationResult) => {
    if (!user || !selectedMerchant) return;
    
    const cardId = result.card.id;
    setRecordingCardId(cardId);
    
    try {
        const res = await fetch("/api/user/transactions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                userId: user.id,
                merchantName: selectedMerchant.name,
                categoryId: selectedCategory,
                amount: amount,
                paymentMethod: paymentMethod,
                cardId: cardId,
                rewardAmount: result.rewardAmount,
                rewardCurrency: rewardPreference,
                // rewardUnit: result.card.rewardConfig?.currency // Optional
            })
        });

        if (!res.ok) throw new Error("Failed to record");
        
        setRecordedCardIds(prev => new Set(prev).add(cardId));
        toast.success("已成功記錄這筆消費！", { description: "您可以在錢包中查看消費統計。" });
    } catch (e) {
        console.error(e);
        toast.error("記錄失敗，請稍後再試。");
    } finally {
        setRecordingCardId(null);
    }
  };

  const filteredMerchants = useMemo(
    () => {
        let list = merchantList;

        // If search query exists, filter by name/alias globally (ignore category)
        if (searchQuery.trim()) {
            const q = searchQuery.toLowerCase().trim();
            return list.filter(m => 
                m.name.toLowerCase().includes(q) || 
                m.aliases.some(a => a.toLowerCase().includes(q))
            ).map(m => {
                // Hot-fix: Merge local static config
                const staticConfig = POPULAR_MERCHANTS.find(pm => pm.id === m.id);
                if (staticConfig?.isOnlineOnly) {
                    return { ...m, isOnlineOnly: true };
                }
                return m;
            }).slice(0, 12); // Limit results for performance
        }

        if (!selectedCategory || selectedCategory === 'all') return list;
        
        return list
            .filter((m) => m.categoryIds.includes(selectedCategory))
            .map(m => {
                // Hot-fix: Merge local static config (like isOnlineOnly) if DB data is stale
                const staticConfig = POPULAR_MERCHANTS.find(pm => pm.id === m.id);
                if (staticConfig?.isOnlineOnly) {
                    return { ...m, isOnlineOnly: true };
                }
                return m;
            })
            .sort((a, b) => {
                if (a.isGeneral && !b.isGeneral) return 1;
                if (!a.isGeneral && b.isGeneral) return -1;
                return 0;
            });
    },
    [merchantList, selectedCategory, searchQuery]
  );
  
  const effectiveMerchants = filteredMerchants;

  const selectedMerchant =
    effectiveMerchants.find((m) => m.id === selectedMerchantId) ||
    null; 

  // Reset online scenario when payment method changes
  // For ambiguous methods (Apple Pay, etc.), set to null to force user selection
  useEffect(() => {
      // Priority Check: Is merchant Online Only?
      if (selectedMerchant?.isOnlineOnly) {
          setIsOnlineScenario(true);
          return;
      }

      if (paymentMethod === "online") {
          setIsOnlineScenario(true);
      } else if (paymentMethod === "physical_card") {
          setIsOnlineScenario(false);
      } else if (AMBIGUOUS_PAYMENT_METHODS.includes(paymentMethod)) {
          // For ambiguous methods, set to null to force user to choose
          setIsOnlineScenario(null);
      }
  }, [paymentMethod, selectedMerchant]); // Add selectedMerchant to dependency

  // Auto-scroll when category changes
  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    setSelectedMerchantId(null);
    setSearchQuery(""); // Reset search on category change
    
    // 🔴 FIX: 根據類別自動調整付款方式
    if (ONLINE_ONLY_CATEGORIES.includes(catId)) {
      // 網購類別：自動切換為「網上輸入信用卡」
      setPaymentMethod("online");
      setIsOnlineScenario(true);
    } else {
      // 非網購類別：如果當前是「網上輸入信用卡」，重置為「門市使用實體卡」
      if (paymentMethod === "online") {
        setPaymentMethod("physical_card");
        setIsOnlineScenario(null);
      }
    }
    
    // Track category selection
    const categoryName = categoryList.find(c => c.id === catId)?.name || catId;
    trackSelectCategory(categoryName);
    
    setTimeout(() => {
      merchantsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  // Auto-scroll and focus when merchant changes
  const handleMerchantSelect = (merchantId: string) => {
    setSelectedMerchantId(merchantId);
    
    // 🔴 FIX: 如果選擇純網上商戶（如 KeeTa、foodpanda），自動切換付款方式
    const merchant = effectiveMerchants.find(m => m.id === merchantId);
    if (merchant?.isOnlineOnly) {
      // 純網上商戶：自動設為「網上輸入信用卡」（如果當前是門市實體卡）
      if (paymentMethod === "physical_card") {
        setPaymentMethod("online");
        setIsOnlineScenario(true);
      }
    } else {
      // 非純網上商戶：如果當前是「網上輸入信用卡」且不在網購類別，重置為「門市使用實體卡」
      if (paymentMethod === "online" && !ONLINE_ONLY_CATEGORIES.includes(selectedCategory)) {
        setPaymentMethod("physical_card");
        setIsOnlineScenario(null);
      }
    }
    
    setTimeout(() => {
      inputSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      amountInputRef.current?.focus();
    }, 150);
  };


  const handleCalculate = () => {
    if (!selectedMerchant || !amount) return;

    // Calculator is now open to all users (guests included)
    // Login is only required for other features like recording transactions

    let res = findBestCards(
      selectedMerchant.name,
      {
        amount: parseFloat(amount),
        paymentMethod,
        isOnlineScenario: isOnlineScenario ?? false, // Convert null to false for type safety
        rewardPreference, // Pass preference
      },
      cardList,
      merchantList,
      categoryList
    );
    
    // Filter for UnionPay cards when using 雲閃付 App
    // 雲閃付 App 只能綁定銀聯卡
    if (paymentMethod === "unionpay_qr") {
      res = res.filter(r => r.card.cardNetwork === "unionpay");
    }
    
    // Filter for BOC cards when using BoC Pay
    // BoC Pay 只能綁定中銀信用卡
    if (paymentMethod === "boc_pay") {
      res = res.filter(r => 
        r.card.bank === "BOC" || 
        r.card.bank === "中銀" || 
        r.card.bank === "中銀香港" ||
        r.card.bank.includes("中銀") ||
        r.card.bank.toUpperCase().includes("BOC")
      );
    }
    
    const bestResult = res[0];
    
    // Track search and calculate events
    trackSearch(selectedMerchant.name);
    trackCalculateRebate({
      amount: parseFloat(amount),
      paymentMethod,
      merchant: selectedMerchant.name,
      category: categoryList.find(c => c.id === selectedCategory)?.name,
    });
    
    // Log Search via API Route (Safe from Server Action errors)
    try {
        fetch("/api/search/log", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                merchantId: selectedMerchant.id,
                merchantName: selectedMerchant.name,
                categoryId: selectedCategory,
                amount: parseFloat(amount),
                paymentMethod,
                isOnline: isOnlineScenario ?? false,
                bestCardId: bestResult?.card.id,
                bestRewardAmount: bestResult?.rewardAmount,
                userId: user?.id
            })
        }).catch(e => console.error("Log search failed silently", e));
    } catch (e) {
        console.error("Error triggering log search", e);
    }

    setResults(res);
    setOpen(true);
    setShowMyOtherCards(false); // Reset on new calculation
    setShowUnownedCards(false);
  };

  const best = results[0];
  
  // Filter Logic for Display
  const otherResults = results.slice(1);
  
  // Only consider owned cards if user is logged in
  const effectiveMyCardIds = user ? myCardIds : [];
  
  // 1. My Best Card (if 'best' is not owned)
  // Find the first card in 'others' that is owned by user
  const myBestCardIndex = otherResults.findIndex(r => effectiveMyCardIds.includes(r.card.id));
  const myBestCard = myBestCardIndex !== -1 ? otherResults[myBestCardIndex] : null;

  // 2. My Other Cards (owned cards that are not 'best' and not 'myBestCard')
  const myOtherCards = otherResults.filter((r, index) => 
      effectiveMyCardIds.includes(r.card.id) && index !== myBestCardIndex
  );

  // 3. The Rest (unowned cards, filtered out by default)
  const unownedCards = otherResults.filter(r => !effectiveMyCardIds.includes(r.card.id));

  // Generate "Why this card" analysis text - now accepts a result parameter
  const generateWhyAnalysis = (result: CalculationResult | null) => {
    if (!result) return "";
    const { card, matchedRule, percentage, rewardAmount } = result;
    const parts: string[] = [];
    
    // Main reason
    if (matchedRule.matchType === 'merchant') {
      parts.push(`${card.name} 在 ${selectedMerchant?.name} 有專屬 ${percentage}% 回贈優惠。`);
    } else if (matchedRule.matchType === 'category') {
      parts.push(`${card.name} 在${categoryNameMap[selectedCategory] || '此類別'}消費享 ${percentage}% 回贈。`);
    } else if (matchedRule.matchType === 'paymentMethod') {
      const paymentLabel = PAYMENT_OPTIONS.find(p => p.id === paymentMethod)?.label || paymentMethod;
      parts.push(`${card.name} 使用 ${paymentLabel} 付款可享 ${percentage}% 回贈。`);
    } else {
      parts.push(`${card.name} 基本回贈為 ${percentage}%。`);
    }
    
    // Cap info
    if (matchedRule.cap) {
      if (matchedRule.capType === 'reward') {
        parts.push(`每月回贈上限 $${matchedRule.cap}。`);
      } else {
        parts.push(`每月簽賬上限 $${matchedRule.cap}。`);
      }
    } else {
      parts.push(`無上限。`);
    }
    
    // Day restriction
    if (matchedRule.validDays) {
      parts.push(`限 ${matchedRule.validDays.map(d => DAYS_MAP[d]).join("/")} 適用。`);
    }
    
    return parts.join(' ');
  };

  // Handle "Why this card" click - now supports any card
  const handleWhyClick = (result: CalculationResult) => {
    setWhyCardResult(result);
    setShowWhyDialog(true);
  };

  // Handle compare click
  const handleCompareClick = (result: CalculationResult) => {
    setCompareCardResult(result);
    setShowCompareDialog(true);
  };

  const handleReportClick = () => {
    // Close the result dialog to avoid stacking issues
    setOpen(false);
    // Open report dialog with a slight delay to ensure clean transition
    setTimeout(() => {
        setIsReportDialogOpen(true);
    }, 100);
  };

  const ResultRow = ({ result, isBest = false }: { result: CalculationResult, isBest?: boolean }) => {
      const isVerified = verifiedCards[result.card.id]?.count > 0;
      const milesText = result.milesReturn ? `$${result.milesReturn.toFixed(1)}/里` : null;
      const isCashFallback = rewardPreference === 'miles' && !milesText && result.rewardAmount > 0;
      
      const isRecording = recordingCardId === result.card.id;
      const isRecorded = recordedCardIds.has(result.card.id);
      const isOwned = effectiveMyCardIds.includes(result.card.id);

      return (
      <div
        className={`rounded-xl border p-3 flex items-center justify-between relative ${isBest ? 'bg-emerald-50 border-emerald-200' : 'bg-white dark:bg-gray-900'}`}
        title={`Debug: Miles=${result.milesReturn}, Pref=${rewardPreference}, Config=${!!result.card.rewardConfig}`}
      >
        {result.isCapped && (
          <div className="absolute top-2 right-2 text-amber-500" title="已達上限">
            <AlertCircle className="w-3 h-3" />
          </div>
        )}
        <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Card Image for Row */}
            {result.card.imageUrl ? (
                <div className="w-12 h-8 rounded border bg-white flex items-center justify-center overflow-hidden shrink-0">
                    <img src={result.card.imageUrl} alt={result.card.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                </div>
            ) : (
                <div className={`w-12 h-8 rounded border ${result.card.style?.bgColor || 'bg-gray-500'} shrink-0`}></div>
            )}

            <div className="min-w-0 flex-1">
            <p className="font-semibold text-gray-900 dark:text-white flex items-center gap-2 text-sm truncate">
                {result.card.name}
                {isBest && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-bold">最抵</span>}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">{result.matchedRule.description}</p>
            
            {/* Mini Condition Tags */}
            <div className="flex flex-wrap gap-1 mt-1">
                {isVerified && (
                    <span className="text-[10px] text-green-600 bg-green-50 px-1 rounded border border-green-100 flex items-center gap-0.5">
                        <BadgeCheck className="w-3 h-3" /> 社群驗證
                    </span>
                )}
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

            {/* Missed Discount Suggestion */}
            {result.missedDiscountRule && result.missedDiscountAmount && result.missedDiscountAmount > 0 && (
                <div className="text-[10px] text-orange-500 mt-1 flex items-center gap-1">
                    <Lightbulb className="w-3 h-3" />
                    {result.missedDiscountRule.validDates && result.missedDiscountRule.validDates.length > 0
                        ? `每月 ${result.missedDiscountRule.validDates.join("/")} 號可享 ${(100 - (result.missedDiscountPercentage || 0)) / 10}折`
                        : `特定日子可享 ${(100 - (result.missedDiscountPercentage || 0)) / 10}折`
                    }
                </div>
            )}

            {/* Date Suggestion */}
            {result.dateSuggestion && (
                <div className="text-[10px] text-blue-500 mt-1 flex items-center gap-1">
                    <Lightbulb className="w-3 h-3" />
                    {result.dateSuggestion.validDays && result.dateSuggestion.validDays.length > 0 
                        ? `${result.dateSuggestion.validDays.map(d => DAYS_MAP[d]).join("/")} 可享 ${result.dateSuggestion.newPercentage}%`
                        : result.dateSuggestion.validDates && result.dateSuggestion.validDates.length > 0
                        ? `每月 ${result.dateSuggestion.validDates.join("/")} 號可享 ${result.dateSuggestion.newPercentage}%`
                        : `特定日子可享 ${result.dateSuggestion.newPercentage}%`
                    }
                </div>
            )}

            {/* Action Buttons Row */}
            <div className="flex items-center gap-2 mt-2 flex-wrap">
                {isOwned && (
                    <span className="text-xs text-emerald-500 inline-flex items-center gap-1">
                    <CreditCard className="h-3 w-3" /> 你已持有
                    </span>
                )}
                {/* Why this card button - available for all cards */}
                <button 
                    className="text-xs border border-gray-200 rounded px-2 py-0.5 flex items-center gap-1 text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleWhyClick(result);
                    }}
                >
                    <HelpCircle className="w-3 h-3" /> 點解係呢張？
                </button>
                {isOwned && user && (
                    <button 
                        className={`text-xs border rounded px-2 py-0.5 flex items-center gap-1 transition-colors ${
                            isRecorded 
                            ? "bg-gray-100 text-gray-500 border-gray-200 cursor-default" 
                            : "bg-white hover:bg-gray-50 text-gray-600 border-gray-200"
                        }`}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (!isRecorded && !isRecording) handleRecordTransaction(result);
                        }}
                        disabled={isRecorded || isRecording}
                    >
                        {isRecording ? <Loader2 className="w-3 h-3 animate-spin" /> : isRecorded ? <CheckCircle2 className="w-3 h-3" /> : <PlusCircle className="w-3 h-3" />}
                        {isRecorded ? "已記錄" : "記賬"}
                    </button>
                )}
                {/* Compare with Best Button - only show for non-best cards */}
                {!isBest && best && (
                    <button 
                        className="text-xs border border-gray-200 rounded px-2 py-0.5 flex items-center gap-1 text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleCompareClick(result);
                        }}
                    >
                        <Swords className="w-3 h-3" /> 同冠軍比較
                    </button>
                )}
            </div>
          </div>
        </div>
        
        <div className="text-right shrink-0">
          {/* Points display (e.g. yuu積分) */}
          {result.pointsAmount && result.pointsCurrency ? (
            <>
              <div className={`text-lg font-bold ${isBest ? 'text-emerald-700' : 'text-orange-600'}`}>
                {result.pointsAmount.toLocaleString()} {result.pointsCurrency}
              </div>
              <div className="text-[10px] text-gray-500">
                ≈ ${result.pointsCashValue?.toFixed(1)} · {result.percentage}%
              </div>
            </>
          ) : (
            <>
              <div className={`text-lg font-bold ${isBest ? 'text-emerald-700' : isCashFallback ? 'text-gray-400' : 'text-gray-800 dark:text-gray-100'}`}>
                {milesText || (result.rewardAmount > 0 ? `+$${result.rewardAmount.toFixed(1)}` : `${result.percentage}%`)}
              </div>
              {isCashFallback && <div className="text-[10px] text-gray-400">現金回贈 · 此卡不支持里數</div>}
              {!isCashFallback && !milesText && result.rewardAmount > 0 && (
                <div className="text-[10px] text-gray-500">{result.percentage}%</div>
              )}
            </>
          )}
        </div>
      </div>
  )};

  // ResultRow with RewardBreakdown - used for "其他卡" lists
  const ResultRowWithBreakdown = ({ result, isBest = false }: { result: CalculationResult, isBest?: boolean }) => {
    const isVerified = verifiedCards[result.card.id]?.count > 0;
    const milesText = result.milesReturn ? `$${result.milesReturn.toFixed(1)}/里` : null;
    const isCashFallback = rewardPreference === 'miles' && !milesText && result.rewardAmount > 0;
    
    const isRecording = recordingCardId === result.card.id;
    const isRecorded = recordedCardIds.has(result.card.id);
    const isOwned = effectiveMyCardIds.includes(result.card.id);

    return (
    <div className={`rounded-xl border ${isBest ? 'bg-emerald-50 border-emerald-200' : 'bg-white dark:bg-gray-900'}`}>
      <div
        className="p-3 flex items-center justify-between relative"
        title={`Debug: Miles=${result.milesReturn}, Pref=${rewardPreference}, Config=${!!result.card.rewardConfig}`}
      >
        {result.isCapped && (
          <div className="absolute top-2 right-2 text-amber-500" title="已達上限">
            <AlertCircle className="w-3 h-3" />
          </div>
        )}
        <div className="flex items-center gap-3 flex-1 min-w-0">
            {result.card.imageUrl ? (
                <div className="w-12 h-8 rounded border bg-white flex items-center justify-center overflow-hidden shrink-0">
                    <img src={result.card.imageUrl} alt={result.card.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                </div>
            ) : (
                <div className={`w-12 h-8 rounded border ${result.card.style?.bgColor || 'bg-gray-500'} shrink-0`}></div>
            )}

            <div className="min-w-0 flex-1">
            <p className="font-semibold text-gray-900 dark:text-white flex items-center gap-2 text-sm">
                <span className="truncate">{result.card.name}</span>
                {isBest && <span className="text-[10px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded-full font-bold shrink-0">最抵</span>}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{result.matchedRule.description}</p>
            
            <div className="flex flex-wrap gap-1 mt-1">
                {isVerified && (
                    <span className="text-[10px] text-green-600 bg-green-50 px-1 rounded border border-green-100 flex items-center gap-0.5">
                        <BadgeCheck className="w-3 h-3" /> 社群驗證
                    </span>
                )}
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

            <div className="flex items-center gap-2 mt-2 flex-wrap">
                {isOwned && (
                    <span className="text-xs text-emerald-500 inline-flex items-center gap-1">
                    <CreditCard className="h-3 w-3" /> 你已持有
                    </span>
                )}
                <button 
                    className="text-xs border border-gray-200 rounded px-2 py-0.5 flex items-center gap-1 text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleWhyClick(result);
                    }}
                >
                    <HelpCircle className="w-3 h-3" /> 點解係呢張？
                </button>
                {isOwned && user && (
                    <button 
                        className={`text-xs border rounded px-2 py-0.5 flex items-center gap-1 transition-colors ${
                            isRecorded 
                            ? "bg-gray-100 text-gray-500 border-gray-200 cursor-default" 
                            : "bg-white hover:bg-gray-50 text-gray-600 border-gray-200"
                        }`}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (!isRecorded && !isRecording) handleRecordTransaction(result);
                        }}
                        disabled={isRecorded || isRecording}
                    >
                        {isRecording ? <Loader2 className="w-3 h-3 animate-spin" /> : isRecorded ? <CheckCircle2 className="w-3 h-3" /> : <PlusCircle className="w-3 h-3" />}
                        {isRecorded ? "已記錄" : "記賬"}
                    </button>
                )}
                {!isBest && best && (
                    <button 
                        className="text-xs border border-gray-200 rounded px-2 py-0.5 flex items-center gap-1 text-gray-500 hover:bg-gray-50 hover:border-gray-300 transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleCompareClick(result);
                        }}
                    >
                        <Swords className="w-3 h-3" /> 同冠軍比較
                    </button>
                )}
            </div>
          </div>
        </div>
        
        <div className="text-right shrink-0">
          {result.pointsAmount && result.pointsCurrency ? (
            <>
              <div className={`text-lg font-bold ${isBest ? 'text-emerald-700' : 'text-orange-600'}`}>
                {result.pointsAmount.toLocaleString()} {result.pointsCurrency}
              </div>
              <div className="text-[10px] text-gray-500">
                ≈ ${result.pointsCashValue?.toFixed(1)} · {result.percentage}%
              </div>
            </>
          ) : (
            <>
              <div className={`text-lg font-bold ${isBest ? 'text-emerald-700' : isCashFallback ? 'text-gray-400' : 'text-gray-800 dark:text-gray-100'}`}>
                {milesText || (result.rewardAmount > 0 ? `+$${result.rewardAmount.toFixed(1)}` : `${result.percentage}%`)}
              </div>
              {isCashFallback && <div className="text-[10px] text-gray-400">現金回贈 · 此卡不支持里數</div>}
              {!isCashFallback && !milesText && result.rewardAmount > 0 && (
                <div className="text-[10px] text-gray-500">{result.percentage}%</div>
              )}
            </>
          )}
        </div>
      </div>
      {/* 回贈組成 */}
      <div className="px-3 pb-2">
        <RewardBreakdown
          card={result.card}
          matchedRule={result.matchedRule}
          percentage={result.percentage}
          rewardAmount={result.rewardAmount}
          isForeignCurrency={result.isForeignCurrency}
          fxFee={result.card.foreignCurrencyFee}
          netPercentage={result.netPercentage}
          netRewardAmount={result.netRewardAmount}
          compact={true}
          showToggle={true}
          overCapInfo={result.overCapInfo}
        />
      </div>
    </div>
  )};

    const ResultContent = () => {
    // Check if the best card is verified
    const isBestVerified = best ? verifiedCards[best.card.id]?.count > 0 : false;
    const bestMilesText = best?.milesReturn ? `$${best.milesReturn.toFixed(1)}/里` : null;
    const isBestCashFallback = best && rewardPreference === 'miles' && !bestMilesText && best.rewardAmount > 0;
    
    const isBestRecording = best && recordingCardId === best.card.id;
    const isBestRecorded = best && recordedCardIds.has(best.card.id);
    const isBestOwned = effectiveMyCardIds.includes(best.card.id);
    
    // 方案 C: 智能建議 - 計算差距
    const rewardDifference = myBestCard && best && !isBestOwned 
        ? (best.rewardAmount - myBestCard.rewardAmount).toFixed(1) 
        : null;

    return (
    <div className="space-y-4 p-4 pb-8">
      {!best ? (
        <p className="text-gray-500 text-sm">請輸入金額並重新計算。</p>
      ) : (
        <>
          {/* Tags Display in Result Dialog */}
          {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                  {tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full flex items-center gap-1">
                          <Tag className="w-3 h-3" /> {tag}
                      </span>
                  ))}
              </div>
          )}

          {/* 天星小輪 Amex $1 優惠提示 */}
          {selectedMerchant?.id === "star_ferry" && (
            <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-xl">
              <div className="flex items-start gap-2">
                <Sparkles className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-blue-800 dark:text-blue-200">💳 Amex 卡專屬優惠！</p>
                  <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                    使用任何<span className="font-bold">美國運通卡</span>搭天星小輪只需 <span className="font-bold text-blue-600">$1</span>！
                    <br/>
                    <span className="text-blue-500">閘機按「Amex $1」鍵再拍卡即可（至 2025/12/31）</span>
                  </p>
                  <Link href="/cards?bank=American%20Express" className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline mt-2 font-medium">
                    查看 Amex 卡 <ChevronUp className="w-3 h-3 rotate-90" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* 香港快運 HSBC 機票半價優惠提示 */}
          {selectedMerchant?.id === "hk-express" && (
            <div className="mb-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border border-purple-200 dark:border-purple-800 rounded-xl">
              <div className="flex items-start gap-2">
                <Sparkles className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-purple-800 dark:text-purple-200">✈️ HSBC 限時機票優惠！</p>
                  <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">
                    憑 <span className="font-bold">HSBC 信用卡</span>輸入優惠碼 <span className="font-bold text-purple-600">HSBC160</span>，20 個航點低至 <span className="font-bold text-purple-600">半價</span>！
                    <br/>
                    <span className="text-purple-500">亞庇、河內等航點享 50% 折扣（預訂至 12/15）</span>
                  </p>
                  <Link href="/discover/hkexpress-hsbc-flash-2025" className="inline-flex items-center gap-1 text-xs text-purple-600 hover:underline mt-2 font-medium">
                    查看優惠詳情 <ChevronUp className="w-3 h-3 rotate-90" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* 方案 C: 智能建議模式 */}
          
          {/* CASE 1: 用戶已持有全場最抵卡 - 精簡版 */}
          {isBestOwned ? (
            <div className="rounded-xl border-2 border-emerald-400 p-3 bg-gradient-to-br from-emerald-50 to-green-50 relative overflow-hidden">
              {/* 恭喜標籤 */}
              <div className="absolute -top-1 -right-1 bg-emerald-500 text-white text-[9px] px-2 py-1 rounded-bl-lg font-bold">
                🎉 已持有最抵卡
              </div>
              
              <div className="flex items-center gap-3">
                {/* Card Image - 更小 */}
                {best.card.imageUrl ? (
                  <div className="w-12 h-8 rounded border border-emerald-200 bg-white flex items-center justify-center overflow-hidden shrink-0">
                    <img src={best.card.imageUrl} alt={best.card.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                  </div>
                ) : (
                  <div className={`w-12 h-8 rounded border border-emerald-200 ${best.card.style?.bgColor || 'bg-gray-500'} shrink-0`}></div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <h3 className="font-bold text-emerald-800 truncate">{best.card.name}</h3>
                    {isBestVerified && <BadgeCheck className="w-3.5 h-3.5 text-green-600 shrink-0" />}
                  </div>
                  <p className="text-xs text-gray-600 truncate">{best.matchedRule.description}</p>
                </div>

                {/* 獎勵金額 */}
                <div className="text-right shrink-0">
                  {best.pointsAmount && best.pointsCurrency ? (
                    <>
                      <div className="text-lg font-bold text-emerald-600">{best.pointsAmount.toLocaleString()} {best.pointsCurrency}</div>
                      <div className="text-[10px] text-gray-500">≈ ${best.pointsCashValue?.toFixed(1)}</div>
                    </>
                  ) : (
                    <>
                      <div className={`text-lg font-bold ${isBestCashFallback ? 'text-gray-400' : 'text-emerald-700'}`}>
                        {bestMilesText || (best.rewardAmount > 0 ? `+$${best.rewardAmount.toFixed(1)}` : `${best.percentage}%`)}
                      </div>
                      {!isBestCashFallback && !bestMilesText && best.rewardAmount > 0 && (
                        <div className="text-[10px] text-gray-500">{best.percentage}%</div>
                      )}
                    </>
                  )}
                </div>
              </div>
              
              {/* 精簡標籤 + 按鈕 - 單行 */}
              <div className="flex items-center justify-between mt-2 pt-2 border-t border-emerald-200">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {best.matchedRule.cap && (
                    <span className="text-[10px] text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded">上限 ${best.matchedRule.cap}</span>
                  )}
                  {best.isCapped && (
                    <span className="text-[10px] text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                      <AlertCircle className="w-2.5 h-2.5" /> 已達上限
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5">
                  <button 
                    className="text-[10px] text-emerald-600 hover:underline"
                    onClick={() => handleWhyClick(best)}
                  >
                    點解？
                  </button>
                  {user && (
                    <button 
                      className={`text-[10px] px-2 py-0.5 rounded ${isBestRecorded ? 'bg-gray-100 text-gray-400' : 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'}`}
                      onClick={() => !isBestRecorded && !isBestRecording && handleRecordTransaction(best)}
                      disabled={isBestRecorded || isBestRecording}
                    >
                      {isBestRecording ? '...' : isBestRecorded ? '✓' : '記賬'}
                    </button>
                  )}
                </div>
              </div>
              
              {/* 回贈明細 - 可收起/展開 */}
              <div className="mt-2">
                <RewardBreakdown
                  card={best.card}
                  matchedRule={best.matchedRule}
                  percentage={best.percentage}
                  rewardAmount={best.rewardAmount}
                  isForeignCurrency={best.isForeignCurrency}
                  fxFee={best.card.foreignCurrencyFee}
                  netPercentage={best.netPercentage}
                  netRewardAmount={best.netRewardAmount}
                  compact={true}
                  showToggle={true}
                  overCapInfo={best.overCapInfo}
                />
              </div>
              
              {/* Tips & Notes */}
              {best.missedDiscountRule && best.missedDiscountAmount && best.missedDiscountAmount > 0 && (
                <div className="mt-3 p-3 bg-orange-50 border border-orange-100 rounded-xl flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                  <div className="text-xs text-orange-700">
                    <span className="font-bold">💡 折扣日提示：</span>
                    {best.missedDiscountRule.validDays?.length ? (
                      <>在 <span className="font-bold">{best.missedDiscountRule.validDays.map(d => DAYS_MAP[d]).join("/")}</span> 消費，</>
                    ) : best.missedDiscountRule.validDates?.length ? (
                      <>在 <span className="font-bold">每月 {best.missedDiscountRule.validDates.join("/")} 號</span> 消費，</>
                    ) : <>在特定日子消費，</>}
                    可享 <span className="font-bold">{(100 - (best.missedDiscountPercentage || 0)) / 10}折</span>！
                  </div>
                </div>
              )}
              
              {best.dateSuggestion && (
                <div className="mt-3 p-3 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-2">
                  <Lightbulb className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                  <div className="text-xs text-blue-700">
                    <span className="font-bold">小貼士：</span>
                    {best.dateSuggestion.validDays?.length ? (
                      <>在 <span className="font-bold">{best.dateSuggestion.validDays.map(d => DAYS_MAP[d]).join("/")}</span> 消費，</>
                    ) : best.dateSuggestion.validDates?.length ? (
                      <>在 <span className="font-bold">每月 {best.dateSuggestion.validDates.join("/")} 號</span> 消費，</>
                    ) : <>在特定日子消費，</>}
                    回贈可達 <span className="font-bold">+${best.dateSuggestion.newRewardAmount.toFixed(1)} ({best.dateSuggestion.newPercentage}%)</span>！
                  </div>
                </div>
              )}

              {best.card.note && (
                <div className="mt-2 p-2.5 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div className="text-[11px] text-amber-800 leading-snug">{renderNoteWithLinks(best.card.note)}</div>
                </div>
              )}

              <div className="flex gap-2 mt-3">
                <ShareButton
                  title={`PickCardRebate 計算結果`}
                  text={`💳 ${selectedMerchant?.name || '消費'} $${amount}\n🏆 最佳信用卡：${best.card.name}\n💰 回贈：$${best.rewardAmount.toFixed(2)} (${best.percentage}%)`}
                  url="https://pickcardrebate.com"
                  variant="prominent"
                  size="md"
                  className="flex-1"
                />
              </div>
            </div>
          ) : (
            /* CASE 2: 用戶未持有全場最抵卡 - 顯示推薦 + 全場最抵 */
            <>
              {/* 2A. 推薦使用：你持有的最抵卡 */}
              {myBestCard && (
                <div className="rounded-2xl border-2 border-emerald-300 p-4 bg-gradient-to-br from-emerald-50 to-green-50 relative overflow-hidden shadow-sm">
                  <div className="text-xs uppercase text-emerald-700 font-bold mb-2 flex items-center gap-2">
                    <span className="bg-emerald-100 px-2 py-1 rounded-lg">🏆 推薦使用</span>
                    <span className="text-emerald-500 font-normal">你已持有</span>
                  </div>
                  
                  <div className="flex items-start justify-between gap-3">
                    {myBestCard.card.imageUrl ? (
                      <div className="w-16 h-10 rounded-lg border border-emerald-200 bg-white flex items-center justify-center overflow-hidden shrink-0">
                        <img src={myBestCard.card.imageUrl} alt={myBestCard.card.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                      </div>
                    ) : (
                      <div className={`w-16 h-10 rounded-lg border ${myBestCard.card.style?.bgColor || 'bg-gray-500'} shrink-0`}></div>
                    )}

                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-gray-500">{myBestCard.card.bank}</p>
                      <h3 className="text-lg font-bold leading-tight text-emerald-800">{myBestCard.card.name}</h3>
                      <p className="text-sm text-gray-600 mt-0.5">{myBestCard.matchedRule.description}</p>
                      
                      {rewardDifference && parseFloat(rewardDifference) > 0 && (
                        <div className="mt-2 text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-lg inline-block">
                          比全場最抵少賺 <span className="text-orange-600 font-bold">${rewardDifference}</span>，但你已持有
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 mt-2 flex-wrap">
                        <button 
                          className="text-xs border border-emerald-200 rounded px-2 py-0.5 flex items-center gap-1 text-emerald-700 hover:bg-emerald-100 transition-colors"
                          onClick={() => handleWhyClick(myBestCard)}
                        >
                          <HelpCircle className="w-3 h-3" /> 點解係呢張？
                        </button>
                        {user && (
                          <button 
                            className={`text-xs border rounded px-2 py-0.5 flex items-center gap-1 transition-colors ${
                              recordedCardIds.has(myBestCard.card.id) 
                              ? "bg-gray-100 text-gray-500 border-gray-200" 
                              : "bg-white hover:bg-emerald-50 text-emerald-600 border-emerald-200"
                            }`}
                            onClick={() => !recordedCardIds.has(myBestCard.card.id) && handleRecordTransaction(myBestCard)}
                            disabled={recordedCardIds.has(myBestCard.card.id)}
                          >
                            {recordingCardId === myBestCard.card.id ? <Loader2 className="w-3 h-3 animate-spin" /> : recordedCardIds.has(myBestCard.card.id) ? <CheckCircle2 className="w-3 h-3" /> : <PlusCircle className="w-3 h-3" />}
                            {recordedCardIds.has(myBestCard.card.id) ? "已記錄" : "記賬"}
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      {myBestCard.pointsAmount && myBestCard.pointsCurrency ? (
                        <>
                          <div className="text-2xl font-bold text-emerald-600">{myBestCard.pointsAmount.toLocaleString()} {myBestCard.pointsCurrency}</div>
                          <div className="text-xs text-gray-500">≈ ${myBestCard.pointsCashValue?.toFixed(1)} · {myBestCard.percentage}%</div>
                        </>
                      ) : (
                        <>
                          <div className="text-2xl font-bold text-emerald-700">
                            {myBestCard.milesReturn ? `$${myBestCard.milesReturn.toFixed(1)}/里` : (myBestCard.rewardAmount > 0 ? `+$${myBestCard.rewardAmount.toFixed(1)}` : `${myBestCard.percentage}%`)}
                          </div>
                          {myBestCard.rewardAmount > 0 && <div className="text-xs text-gray-500">{myBestCard.percentage}%</div>}
                        </>
                      )}
                    </div>
                  </div>
                  {/* 回贈明細 - 你持有的卡 */}
                  <div className="mt-3">
                    <RewardBreakdown
                      card={myBestCard.card}
                      matchedRule={myBestCard.matchedRule}
                      percentage={myBestCard.percentage}
                      rewardAmount={myBestCard.rewardAmount}
                      isForeignCurrency={myBestCard.isForeignCurrency}
                      fxFee={myBestCard.card.foreignCurrencyFee}
                      netPercentage={myBestCard.netPercentage}
                      netRewardAmount={myBestCard.netRewardAmount}
                      compact={true}
                      showToggle={true}
                      overCapInfo={myBestCard.overCapInfo}
                    />
                  </div>
                </div>
              )}

              {/* 2B. 全場最抵（如果申請新卡） */}
              <div className="rounded-xl border border-orange-200 p-3 bg-orange-50/50 relative">
                <div className="text-xs uppercase text-orange-600 font-bold mb-2 flex items-center gap-2">
                  <span className="bg-orange-100 px-2 py-0.5 rounded">💡 如果申請新卡</span>
                  <span className="text-orange-400 font-normal">全場最抵</span>
                </div>
                
                <div className="flex items-start justify-between gap-3">
                  {best.card.imageUrl ? (
                    <div className="w-14 h-9 rounded border border-orange-200 bg-white flex items-center justify-center overflow-hidden shrink-0">
                      <img src={best.card.imageUrl} alt={best.card.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
                    </div>
                  ) : (
                    <div className={`w-14 h-9 rounded border ${best.card.style?.bgColor || 'bg-gray-500'} shrink-0`}></div>
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-500">{best.card.bank}</p>
                    <h3 className="font-bold leading-tight">{best.card.name}</h3>
                    <p className="text-xs text-gray-600">{best.matchedRule.description}</p>
                    
                    {myBestCard && rewardDifference && parseFloat(rewardDifference) > 0 && (
                      <div className="mt-1 text-xs text-orange-600 font-medium">
                        比你現有卡多賺 <span className="font-bold">${rewardDifference}</span>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <button 
                        className="text-xs border border-orange-200 rounded px-2 py-0.5 flex items-center gap-1 text-orange-600 hover:bg-orange-100 transition-colors"
                        onClick={() => handleWhyClick(best)}
                      >
                        <HelpCircle className="w-3 h-3" /> 點解係呢張？
                      </button>
                      {(() => {
                        const applyLink = PARTNER_MODE_ENABLED && best.card.applyUrl 
                          ? best.card.applyUrl 
                          : (best.card.officialApplyUrl || best.card.applyUrl);
                        return applyLink && (
                          <Button
                            size="sm"
                            className="h-7 text-xs bg-orange-500 hover:bg-orange-600"
                            onClick={() => window.open(applyLink, "_blank")}
                          >
                            立即申請
                          </Button>
                        );
                      })()}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    {best.discountRule && best.discountAmount ? (
                      <div className="mb-1">
                        <div className="text-xl font-bold text-orange-600">{(100 - best.discountPercentage!) / 10}折</div>
                        <div className="text-[10px] text-orange-500">即減 ${best.discountAmount.toFixed(0)}</div>
                      </div>
                    ) : null}
                    
                    {best.pointsAmount && best.pointsCurrency ? (
                      <>
                        <div className="text-xl font-bold text-orange-600">{best.pointsAmount.toLocaleString()} {best.pointsCurrency}</div>
                        <div className="text-[10px] text-gray-500">≈ ${best.pointsCashValue?.toFixed(1)} · {best.percentage}%</div>
                      </>
                    ) : (
                      <>
                        <div className={`text-xl font-bold ${isBestCashFallback ? 'text-gray-400' : 'text-orange-600'}`}>
                          {bestMilesText || (best.rewardAmount > 0 ? `+$${best.rewardAmount.toFixed(1)}` : `${best.percentage}%`)}
                        </div>
                        {best.rewardAmount > 0 && <div className="text-[10px] text-gray-500">{best.percentage}%</div>}
                      </>
                    )}
                  </div>
                </div>
                {/* 回贈明細 - 全場最抵 */}
                <div className="mt-2">
                  <RewardBreakdown
                    card={best.card}
                    matchedRule={best.matchedRule}
                    percentage={best.percentage}
                    rewardAmount={best.rewardAmount}
                    isForeignCurrency={best.isForeignCurrency}
                    fxFee={best.card.foreignCurrencyFee}
                    netPercentage={best.netPercentage}
                    netRewardAmount={best.netRewardAmount}
                    compact={true}
                    showToggle={true}
                    overCapInfo={best.overCapInfo}
                  />
                </div>
              </div>
              
              {/* Share Button */}
              <div className="flex gap-2">
                <ShareButton
                  title={`PickCardRebate 計算結果`}
                  text={`💳 ${selectedMerchant?.name || '消費'} $${amount}\n🏆 最佳信用卡：${best.card.name}\n💰 回贈：$${best.rewardAmount.toFixed(2)} (${best.percentage}%)`}
                  url="https://pickcardrebate.com"
                  variant="prominent"
                  size="md"
                  className="flex-1"
                />
              </div>
            </>
          )}

          {/* 其他卡片區域 - 精簡版 */}
          <div className="space-y-2">
            
            {/* 你持有的其他卡 (折疊) */}
            {myOtherCards.length > 0 && (
              <div>
                <button 
                  className="w-full text-xs text-gray-500 hover:text-gray-700 py-2 flex items-center justify-between border-b border-gray-100"
                  onClick={() => setShowMyOtherCards(prev => !prev)}
                >
                  <span className="flex items-center gap-1">
                    <CreditCard className="w-3 h-3" />
                    你持有的其他卡 ({myOtherCards.length})
                  </span>
                  {showMyOtherCards ? <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
                </button>
                
                {showMyOtherCards && (
                  <div className="space-y-2 pt-2 animate-in fade-in slide-in-from-top-2">
                    {myOtherCards.map(card => (
                      <ResultRowWithBreakdown key={card.card.id} result={card} />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 其他未持有的卡 (折疊) */}
            {unownedCards.length > 0 && (
              <div>
                <button 
                  className="w-full text-xs text-gray-400 hover:text-gray-600 py-2 flex items-center justify-between border-b border-gray-100"
                  onClick={() => setShowUnownedCards(prev => !prev)}
                >
                  <span className="flex items-center gap-1">
                    查看其他未持有的卡 ({unownedCards.length})
                  </span>
                  {showUnownedCards ? <ChevronUp className="w-4 h-4"/> : <ChevronDown className="w-4 h-4"/>}
                </button>
                
                {showUnownedCards && (
                  <div className="space-y-2 pt-2 animate-in fade-in slide-in-from-top-2">
                    {unownedCards.slice(0, 10).map(card => (
                      <ResultRowWithBreakdown key={card.card.id} result={card} />
                    ))}
                    {unownedCards.length > 10 && (
                      <p className="text-[10px] text-gray-400 text-center py-1">還有 {unownedCards.length - 10} 張卡...</p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex justify-center">
             <Button variant="ghost" size="sm" className="text-xs text-gray-400 hover:text-red-500 gap-1 h-8 px-2" onClick={handleReportClick}>
                <Flag className="h-3 w-3" /> 回報錯誤
             </Button>
          </div>
        </>
      )}
    </div>
  )};

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
        
        {/* Search Bar */}
        <div className="relative mb-4">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input 
                placeholder="搜尋商戶 (例如: 國泰, HKTVMall, 麥當勞...)" 
                className="pl-9 bg-gray-50 dark:bg-gray-800 border-transparent focus:bg-white dark:focus:bg-gray-900 transition-all"
                value={searchQuery}
                onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value) setSelectedCategory(""); // Clear category selection when searching
                }}
            />
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2 mb-4">
          {categoryList.map((cat) => (
            <button
              key={cat.id}
              className={`p-2 sm:p-3 rounded-xl text-center transition active:scale-95 flex flex-col items-center gap-1 ${
                selectedCategory === cat.id && !searchQuery
                  ? `${cat.bgColor} ${cat.accentColor} ring-2 ring-offset-1 ring-emerald-300 shadow-sm`
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
              }`}
              onClick={() => handleCategorySelect(cat.id)}
            >
              <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
                selectedCategory === cat.id && !searchQuery
                  ? "bg-white/50 dark:bg-black/20"
                  : "bg-gray-100 dark:bg-gray-700"
              }`}>
                <DynamicIcon name={cat.icon} className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
              <span className="text-[10px] sm:text-xs font-medium leading-tight">{cat.name}</span>
            </button>
          ))}
        </div>

        <div ref={merchantsRef} className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2 sm:gap-3 mb-6 scroll-mt-20">
          {effectiveMerchants.map((merchant) => (
            <Card
              key={merchant.id}
              className={`p-2 sm:p-3 cursor-pointer border-2 transition-all active:scale-[0.96] ${
                selectedMerchant?.id === merchant.id ? "border-emerald-500 shadow-md bg-emerald-50 dark:bg-emerald-900/20" : "border-transparent hover:bg-gray-50 dark:hover:bg-gray-800 hover:border-gray-200 dark:hover:border-gray-700"
              } ${merchant.isGeneral ? "bg-gray-50/50 dark:bg-gray-800/30 border-dashed" : ""}`}
              onClick={() => handleMerchantSelect(merchant.id)}
            >
              <div className="flex flex-col items-center text-center gap-1.5 sm:gap-2">
                <div
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center text-xl shrink-0 overflow-hidden"
                  style={{
                    backgroundColor: `${merchant.accentColor || "#e5e7eb"}20`,
                    color: merchant.accentColor || "#111827",
                  }}
                >
                  {merchant.logo?.startsWith("http") ? (
                      <img 
                        src={merchant.logo} 
                        alt={merchant.name} 
                        className="w-full h-full object-contain p-1" 
                        onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            // Fallback to first letter if logo fails
                            e.currentTarget.parentElement!.innerText = merchant.name.charAt(0);
                        }}
                      />
                  ) : (
                      merchant.logo || merchant.name.charAt(0)
                  )}
                </div>
                <div className="w-full min-w-0">
                  <div className="text-[9px] sm:text-[10px] font-medium text-gray-900 dark:text-gray-100 leading-snug break-words hyphens-auto">{merchant.name}</div>
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
            <div className="flex justify-between items-baseline mb-1">
                <label className="text-xs text-gray-500 dark:text-gray-400 block">
                在 {selectedMerchant?.name || "商戶"} 消費
                </label>
                {/* Community Tags Display */}
                {tags.length > 0 && (
                    <div className="flex gap-1.5 items-center">
                        {trapCount > 0 && (
                            <span className="text-[10px] px-1.5 py-0.5 bg-orange-100 text-orange-700 rounded-full border border-orange-200 flex items-center gap-0.5 font-medium animate-pulse" title="有中伏報告，請小心">
                                <AlertTriangle className="w-2.5 h-2.5" /> 中伏警報 ({trapCount})
                            </span>
                        )}
                        {tags.slice(0, 3).map(tag => (
                            <span key={tag} className="text-[10px] px-1.5 py-0.5 bg-emerald-50 text-emerald-600 rounded-full border border-emerald-100 flex items-center gap-0.5">
                                <Tag className="w-2.5 h-2.5" /> {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <div className="flex gap-3 flex-col md:flex-row items-start md:items-center">
              <div className="relative flex-1 w-full">
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
                  autoComplete="off"
                  min="0"
                />
              </div>
              <select
                className="w-full md:w-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 text-sm h-12"
                value={paymentMethod}
                onChange={(e) => {
                  const newMethod = e.target.value;
                  setPaymentMethod(newMethod);
                  // 如果切換到需要選擇場景的支付方式，重置場景選擇
                  if (AMBIGUOUS_PAYMENT_METHODS.includes(newMethod)) {
                    setIsOnlineScenario(null);
                  } else if (newMethod === "physical_card") {
                    setIsOnlineScenario(false);
                  } else if (newMethod === "online") {
                    setIsOnlineScenario(true);
                  }
                }}
                disabled={!selectedMerchant}
              >
                {PAYMENT_OPTIONS
                  // 🔴 FIX: 純網上類別或純網上商戶，不顯示「門市使用實體卡」選項
                  .filter(opt => {
                    const isOnlineCategory = ONLINE_ONLY_CATEGORIES.includes(selectedCategory);
                    const merchantIsOnlineOnly = selectedMerchant?.isOnlineOnly === true;
                    // 如果是純網上類別或商戶，隱藏門市選項
                    if ((isOnlineCategory || merchantIsOnlineOnly) && opt.id === "physical_card") {
                      return false;
                    }
                    return true;
                  })
                  .map((opt) => (
                  <option key={opt.id} value={opt.id}>
                  {opt.label}
                  </option>
                ))}
              </select>
              <Button 
                className="w-full md:w-auto rounded-xl shrink-0 h-12 px-6 text-base font-medium shadow-emerald-100 dark:shadow-none active:scale-95 transition-transform" 
                onClick={handleCalculate} 
                disabled={!amount || !selectedMerchant || (AMBIGUOUS_PAYMENT_METHODS.includes(paymentMethod) && !selectedMerchant?.isOnlineOnly && isOnlineScenario === null)}
              >
                {AMBIGUOUS_PAYMENT_METHODS.includes(paymentMethod) && !selectedMerchant?.isOnlineOnly && isOnlineScenario === null 
                  ? "請先選擇付款場景 ↓" 
                  : "即刻計回贈"}
              </Button>
            </div>

            {/* Scenario Toggle for Ambiguous Payments */}
            {/* Only show if merchant is NOT online-only AND payment method is ambiguous */}
            {AMBIGUOUS_PAYMENT_METHODS.includes(paymentMethod) && !selectedMerchant?.isOnlineOnly && (
                <div className={`mt-3 p-3 border rounded-xl animate-in fade-in slide-in-from-top-2 ${
                    isOnlineScenario === null 
                        ? "bg-amber-50 dark:bg-amber-900/20 border-amber-300 dark:border-amber-700" 
                        : "bg-gray-50 dark:bg-gray-800/50 border-gray-100 dark:border-gray-700"
                }`}>
                    <Label className={`text-xs mb-2 block font-medium ${
                        isOnlineScenario === null 
                            ? "text-amber-700 dark:text-amber-400" 
                            : "text-gray-500 dark:text-gray-400"
                    }`}>
                        {isOnlineScenario === null ? "⚠️ 請先選擇付款場景：" : "請問您的付款場景是？"}
                    </Label>
                    <RadioGroup 
                        value={isOnlineScenario === null ? "" : (isOnlineScenario ? "online" : "offline")} 
                        onValueChange={(v) => setIsOnlineScenario(v === "online")}
                        className="flex flex-col sm:flex-row gap-3"
                    >
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="offline" id="offline" className="text-emerald-600 border-gray-300" />
                            <Label htmlFor="offline" className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300 cursor-pointer font-normal">
                                <Store className="w-4 h-4 text-gray-500" /> 門市付款
                            </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="online" id="online" className="text-emerald-600 border-gray-300" />
                            <Label htmlFor="online" className="flex items-center gap-1.5 text-sm text-gray-700 dark:text-gray-300 cursor-pointer font-normal">
                                <Globe className="w-4 h-4 text-gray-500" /> 網上 / App 內付款
                            </Label>
                        </div>
                    </RadioGroup>
                </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Result Dialog/Drawer */}
      {isDesktop ? (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
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
          <DrawerContent className="h-[85vh]">
            <DrawerHeader className="shrink-0">
              <DrawerTitle className="flex items-center gap-2 text-emerald-600 justify-center">
                <Sparkles className="h-5 w-5" /> {selectedMerchant?.name} 最抵攻略
              </DrawerTitle>
            </DrawerHeader>
            <div className="overflow-y-auto overscroll-contain flex-1 px-0">
              <ResultContent />
            </div>
          </DrawerContent>
        </Drawer>
      )}

      {/* Independent Report Error Dialog - Renders on top */}
      <ReportErrorDialog 
        open={isReportDialogOpen}
        onOpenChange={setIsReportDialogOpen}
        merchantId={selectedMerchant?.id}
        merchantName={selectedMerchant?.name}
        categoryId={selectedMerchant?.categoryIds[0]}
        amount={amount}
        paymentMethod={PAYMENT_OPTIONS.find(p => p.id === paymentMethod)?.label}
        cardName={best?.card.name}
        cardId={best?.card.id}
      />

      {/* Login Prompt Dialog for Calculator */}
      <LoginPromptDialog 
          open={showLoginPrompt} 
          onOpenChange={setShowLoginPrompt} 
          title="查看最抵回贈"
          description={`登入後即可查看 ${selectedMerchant?.name || "商戶"} 的最佳信用卡回贈攻略，並記錄您的搜尋歷史。`}
      />

      {/* "Why This Card" Dialog - Now supports any card */}
      <Dialog open={showWhyDialog} onOpenChange={setShowWhyDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-gray-800">
              <HelpCircle className="h-5 w-5 text-emerald-500" /> 點解係呢張？
            </DialogTitle>
          </DialogHeader>
          {whyCardResult && (
            <div className="space-y-4">
              {/* Card Info */}
              <div className="flex items-center gap-3">
                {whyCardResult.card.imageUrl ? (
                  <img src={whyCardResult.card.imageUrl} alt={whyCardResult.card.name} className="w-16 h-10 object-contain rounded border" referrerPolicy="no-referrer" />
                ) : (
                  <div className={`w-16 h-10 rounded ${whyCardResult.card.style?.bgColor || 'bg-gray-500'}`}></div>
                )}
                <div>
                  <p className="font-bold text-gray-900">{whyCardResult.card.name}</p>
                  <p className="text-xs text-gray-500">{whyCardResult.card.bank}</p>
                </div>
              </div>
              
              {/* Analysis */}
              <div className="p-3 bg-emerald-50 border border-emerald-100 border-dashed rounded-xl">
                <p className="text-sm text-emerald-800 font-medium mb-1">智能分析：</p>
                <p className="text-sm text-emerald-700 leading-relaxed">
                  {generateWhyAnalysis(whyCardResult)}
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">回贈率</p>
                  <p className="text-lg font-bold text-emerald-600">{whyCardResult.percentage}%</p>
                </div>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500">預計回贈</p>
                  <p className="text-lg font-bold text-emerald-600">+${whyCardResult.rewardAmount.toFixed(1)}</p>
                </div>
              </div>

              {/* Card Note if exists */}
              {whyCardResult.card.note && (
                <div className="p-2.5 bg-amber-50 border border-amber-100 rounded-xl flex items-start gap-2">
                  <Info className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                  <div className="text-[11px] text-amber-800 leading-snug">
                    {renderNoteWithLinks(whyCardResult.card.note)}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Compare Dialog */}
      <Dialog open={showCompareDialog} onOpenChange={setShowCompareDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-gray-800 justify-center">
              <Swords className="h-5 w-5 text-gray-500" /> 殘酷二選一
            </DialogTitle>
          </DialogHeader>
          {best && compareCardResult && (
            <div className="space-y-4">
              {/* Cards Comparison Header */}
              <div className="flex items-center justify-center gap-6">
                {/* Best Card */}
                <div className="text-center">
                  {best.card.imageUrl ? (
                    <img src={best.card.imageUrl} alt={best.card.name} className="w-20 h-12 object-contain rounded border mx-auto mb-2" referrerPolicy="no-referrer" />
                  ) : (
                    <div className={`w-20 h-12 rounded ${best.card.style?.bgColor || 'bg-gray-500'} mx-auto mb-2`}></div>
                  )}
                  <p className="text-sm font-bold text-gray-900 flex items-center justify-center gap-1">
                    🏆 {best.card.name}
                  </p>
                </div>

                {/* Compare Card */}
                <div className="text-center">
                  {compareCardResult.card.imageUrl ? (
                    <img src={compareCardResult.card.imageUrl} alt={compareCardResult.card.name} className="w-20 h-12 object-contain rounded border mx-auto mb-2" referrerPolicy="no-referrer" />
                  ) : (
                    <div className={`w-20 h-12 rounded ${compareCardResult.card.style?.bgColor || 'bg-gray-500'} mx-auto mb-2`}></div>
                  )}
                  <p className="text-sm font-bold text-gray-900">{compareCardResult.card.name}</p>
                </div>
              </div>

              {/* Comparison Table - Compact Single Row Format */}
              <div className="border rounded-lg overflow-hidden">
                <div className="divide-y">
                  {/* Row 1: Reward Amount */}
                  <div className="flex items-center justify-between p-3">
                    <span className="text-sm font-medium text-gray-600">回贈金額</span>
                    <span className="text-sm">
                      <span className="font-bold text-emerald-600">${best.rewardAmount.toFixed(1)}</span>
                      <span className="text-gray-400 mx-1">vs</span>
                      <span className="text-gray-600">${compareCardResult.rewardAmount.toFixed(1)}</span>
                    </span>
                  </div>
                  
                  {/* Row 2: Percentage */}
                  <div className="flex items-center justify-between p-3 bg-gray-50">
                    <span className="text-sm font-medium text-gray-600">回贈率</span>
                    <span className="text-sm">
                      <span className="font-bold text-emerald-600">{best.percentage}%</span>
                      <span className="text-gray-400 mx-1">vs</span>
                      <span className="text-gray-600">{compareCardResult.percentage}%</span>
                    </span>
                  </div>
                  
                  {/* Row 3: Cap */}
                  <div className="flex items-center justify-between p-3">
                    <span className="text-sm font-medium text-gray-600">上限</span>
                    <span className="text-sm">
                      <span className="text-gray-700">{best.matchedRule.cap ? `$${best.matchedRule.cap}` : '無上限'}</span>
                      <span className="text-gray-400 mx-1">vs</span>
                      <span className="text-gray-500">{compareCardResult.matchedRule.cap ? `$${compareCardResult.matchedRule.cap}` : '無上限'}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Conclusion */}
              <div className="p-3 bg-red-50 rounded-xl text-center">
                <p className="text-sm text-red-700">
                  結論：用錯卡會蝕 <span className="font-bold">${(best.rewardAmount - compareCardResult.rewardAmount).toFixed(1)}</span>！ 💸
                </p>
              </div>

              {/* CTA */}
              {(() => {
                const applyLink = PARTNER_MODE_ENABLED && best.card.applyUrl 
                  ? best.card.applyUrl 
                  : (best.card.officialApplyUrl || best.card.applyUrl);
                return applyLink ? (
                  <Button 
                    className="w-full bg-orange-500 hover:bg-orange-600"
                    onClick={() => {
                      window.open(applyLink, "_blank");
                      setShowCompareDialog(false);
                    }}
                  >
                    立即申請 {best.card.name}
                  </Button>
                ) : (
                  <Button 
                    className="w-full bg-gray-800 hover:bg-gray-900"
                    onClick={() => setShowCompareDialog(false)}
                  >
                    明白，關閉
                  </Button>
                );
              })()}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
