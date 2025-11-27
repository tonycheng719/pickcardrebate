"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle2, Flag, AlertTriangle, PartyPopper, Lightbulb, Plane } from "lucide-react";
import { toast } from "sonner";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useWallet } from "@/lib/store/wallet-context";

interface ReportErrorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  merchantId?: string | null;
  merchantName?: string | null;
  categoryId?: string | null;
  amount?: string | null;
  paymentMethod?: string | null;
  cardId?: string | null;
  cardName?: string | null;
}

export function ReportErrorDialog({
  open,
  onOpenChange,
  merchantId,
  merchantName,
  categoryId,
  amount,
  paymentMethod,
  cardId,
  cardName
}: ReportErrorDialogProps) {
  const { user } = useWallet();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [reportType, setReportType] = useState<string>("error");
  const [conditions, setConditions] = useState<string[]>([]);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Use refs for uncontrolled inputs to prevent re-render lag
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const proposedRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
        setIsSuccess(false);
        setReportType("error");
        setConditions([]);
        // Don't clear refs immediately to allow animation, or clear manually
        if (descriptionRef.current) descriptionRef.current.value = "";
        if (proposedRef.current) proposedRef.current.value = "";
    }
  }, [open]);

  const handleSubmitClick = async (e: React.MouseEvent) => {
    if (!user) {
        toast.error("請先登入會員", {
            description: "您需要登入才能提交回報。",
            action: {
                label: "去登入",
                onClick: () => window.location.href = "/login"
            }
        });
        return;
    }

    const description = descriptionRef.current?.value || "";
    const proposedReward = proposedRef.current?.value || "";

    // Validate description for error reports
    if (!description.trim() && reportType !== 'verification') {
        toast.error("請填寫描述說明情況");
        descriptionRef.current?.focus();
        return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading("正在提交回報...");

    try {
        const response = await fetch("/api/report", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                merchant_id: merchantId,
                merchant_name: merchantName,
                category_id: categoryId,
                amount,
                payment_method: paymentMethod,
                card_id: cardId,
                card_name: cardName,
                description,
                proposed_reward: proposedReward,
                user_id: user.id,
                // New fields
                report_type: reportType,
                conditions: conditions,
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "提交失敗");
        }

        setIsSuccess(true);
        toast.success("回報已提交！");
    } catch (error: any) {
        console.error("Submission error:", error);
        toast.error(error.message || "提交失敗，請稍後再試");
    } finally {
        toast.dismiss(loadingToast);
        setIsSubmitting(false);
    }
  };

  const toggleCondition = (cond: string) => {
      setConditions(prev => 
          prev.includes(cond) ? prev.filter(c => c !== cond) : [...prev, cond]
      );
  };

  const SuccessView = () => (
    <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in zoom-in-95 duration-300">
        {/* Hidden Title/Desc for Accessibility when in Success View */}
        <div className="sr-only">
            <DialogTitle>回報提交成功</DialogTitle>
            <DialogDescription>您的回報已成功提交。</DialogDescription>
        </div>
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="text-xl font-bold text-green-700 mb-2">回報已提交！</h3>
        <p className="text-gray-500 mb-6">
            感謝您的情報，我們會盡快審核並更新資料。
        </p>
        <Button onClick={() => onOpenChange(false)} className="w-full bg-green-600 hover:bg-green-700 text-white">
            關閉
        </Button>
    </div>
  );

  const FormView = () => (
    <div className="space-y-5">
        {/* Info Summary */}
        <div className="grid gap-4 p-3 bg-gray-50 dark:bg-gray-900 rounded-lg text-sm border dark:border-gray-800">
            <div className="grid grid-cols-3 gap-1">
                <span className="text-gray-500">商戶/類別:</span>
                <span className="col-span-2 font-medium truncate">{merchantName || "未指定"}</span>
            </div>
            <div className="grid grid-cols-3 gap-1">
                <span className="text-gray-500">支付方式:</span>
                <span className="col-span-2 font-medium">{paymentMethod || "未指定"}</span>
            </div>
            {cardName && (
                <div className="grid grid-cols-3 gap-1">
                    <span className="text-gray-500">信用卡:</span>
                    <span className="col-span-2 font-medium">{cardName}</span>
                </div>
            )}
        </div>

        {/* Report Type Selection */}
        <div className="space-y-3">
            <Label>回報類型</Label>
            <RadioGroup 
                value={reportType} 
                onValueChange={setReportType} 
                className="grid grid-cols-3 sm:grid-cols-5 gap-2"
            >
                <div>
                    <RadioGroupItem value="error" id="type-error" className="peer sr-only" />
                    <Label
                        htmlFor="type-error"
                        className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-red-500 peer-data-[state=checked]:bg-red-50 dark:peer-data-[state=checked]:bg-red-900/20 cursor-pointer transition-all h-full"
                    >
                        <AlertTriangle className="mb-1 h-5 w-5 text-red-500" />
                        <span className="text-[10px] text-center font-medium leading-tight">計算錯誤</span>
                    </Label>
                </div>
                <div>
                    <RadioGroupItem value="miles_error" id="type-miles" className="peer sr-only" />
                    <Label
                        htmlFor="type-miles"
                        className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-purple-500 peer-data-[state=checked]:bg-purple-50 dark:peer-data-[state=checked]:bg-purple-900/20 cursor-pointer transition-all h-full"
                    >
                        <Plane className="mb-1 h-5 w-5 text-purple-500" />
                        <span className="text-[10px] text-center font-medium leading-tight">里數錯誤</span>
                    </Label>
                </div>
                <div>
                    <RadioGroupItem value="verification" id="type-verification" className="peer sr-only" />
                    <Label
                        htmlFor="type-verification"
                        className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-green-500 peer-data-[state=checked]:bg-green-50 dark:peer-data-[state=checked]:bg-green-900/20 cursor-pointer transition-all h-full"
                    >
                        <CheckCircle2 className="mb-1 h-5 w-5 text-green-500" />
                        <span className="text-[10px] text-center font-medium leading-tight">回報成功</span>
                    </Label>
                </div>
                <div>
                    <RadioGroupItem value="discovery" id="type-discovery" className="peer sr-only" />
                    <Label
                        htmlFor="type-discovery"
                        className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-blue-500 peer-data-[state=checked]:bg-blue-50 dark:peer-data-[state=checked]:bg-blue-900/20 cursor-pointer transition-all h-full"
                    >
                        <Lightbulb className="mb-1 h-5 w-5 text-blue-500" />
                        <span className="text-[10px] text-center font-medium leading-tight">新發現</span>
                    </Label>
                </div>
                <div>
                    <RadioGroupItem value="trap" id="type-trap" className="peer sr-only" />
                    <Label
                        htmlFor="type-trap"
                        className="flex flex-col items-center justify-center rounded-md border-2 border-muted bg-popover p-2 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-orange-500 peer-data-[state=checked]:bg-orange-50 dark:peer-data-[state=checked]:bg-orange-900/20 cursor-pointer transition-all h-full"
                    >
                        <AlertTriangle className="mb-1 h-5 w-5 text-orange-500" />
                        <span className="text-[10px] text-center font-medium leading-tight">中伏警報</span>
                    </Label>
                </div>
            </RadioGroup>
        </div>

        {/* Conditions Tags */}
        <div className="space-y-3">
            <Label>條件標籤 (多選)</Label>
            <div className="flex flex-wrap gap-2">
                {[
                    { id: 'must_register', label: '需登記' },
                    { id: 'min_spend', label: '最低簽賬' },
                    { id: 'promo_period', label: '限時推廣' },
                    { id: 'weekend_only', label: '週末/指定日' },
                    { id: 'targeted', label: '特選客戶' },
                ].map((tag) => (
                    <div 
                        key={tag.id}
                        onClick={() => toggleCondition(tag.id)}
                        className={`px-3 py-1.5 rounded-full text-xs border cursor-pointer transition-colors ${
                            conditions.includes(tag.id) 
                                ? 'bg-gray-900 text-white border-gray-900 dark:bg-white dark:text-black' 
                                : 'bg-transparent text-gray-600 border-gray-200 hover:border-gray-400 dark:text-gray-300 dark:border-gray-700'
                        }`}
                    >
                        {tag.label}
                    </div>
                ))}
            </div>
        </div>

        {/* Description Input */}
        <div className="grid gap-2">
            <Label htmlFor="description">
                {reportType === 'verification' ? '備註 (選填)' : '詳細說明'} 
                {reportType !== 'verification' && <span className="text-red-500">*</span>}
            </Label>
            <Textarea
                id="description"
                ref={descriptionRef}
                placeholder={
                    reportType === 'error' ? "例如：此卡在該商戶只有 0.4% 回贈..." :
                    reportType === 'miles_error' ? "例如：此卡應該是 $5/里，但顯示為 $6/里..." :
                    reportType === 'verification' ? "例如：剛收到月結單確認有回贈..." :
                    "例如：發現這家店其實可以用 Apple Pay..."
                }
                required={reportType !== 'verification'}
                rows={3}
                className="resize-none"
            />
        </div>

        {/* Proposed Reward Input */}
        <div className="grid gap-2">
            <Label htmlFor="proposed">
                {reportType === 'miles_error' ? '正確里數兌換率 (如 $5/里) (選填)' : 
                 reportType === 'error' ? '正確回贈 % (選填)' : '實際回贈 % (選填)'}
            </Label>
            <Input
                id="proposed"
                ref={proposedRef}
                placeholder={reportType === 'miles_error' ? "例如：5" : "例如：0.4"}
                type="number"
                step="0.1"
            />
        </div>

        <div className="pt-2">
            <Button 
                type="button"
                onClick={handleSubmitClick}
                disabled={isSubmitting} 
                className="w-full bg-gray-900 hover:bg-gray-800 text-white dark:bg-white dark:text-black dark:hover:bg-gray-200"
            >
                {isSubmitting ? "提交中..." : "提交情報"}
            </Button>
        </div>
    </div>
  );

  if (isDesktop) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[480px]">
                {isSuccess ? (
                    <SuccessView />
                ) : (
                    <>
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <Flag className="h-5 w-5 text-gray-900 dark:text-white" /> 回報與情報分享
                            </DialogTitle>
                            <DialogDescription>
                                您的回報將幫助社群獲得更準確的資訊。
                            </DialogDescription>
                        </DialogHeader>
                        <FormView />
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
            {isSuccess ? (
                <div className="p-4">
                    <SuccessView />
                </div>
            ) : (
                <>
                    <DrawerHeader className="text-left">
                        <DrawerTitle className="flex items-center gap-2">
                            <Flag className="h-5 w-5 text-gray-900 dark:text-white" /> 回報與情報分享
                        </DrawerTitle>
                        <DrawerDescription>
                            您的回報將幫助社群獲得更準確的資訊。
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="px-4 pb-8 max-h-[80vh] overflow-y-auto">
                        <FormView />
                    </div>
                </>
            )}
        </DrawerContent>
    </Drawer>
  );
}
