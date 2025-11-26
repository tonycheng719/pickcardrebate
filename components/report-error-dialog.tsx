"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Flag } from "lucide-react";
import { toast } from "sonner";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useWallet } from "@/lib/store/wallet-context";

interface ReportErrorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
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
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Use refs for uncontrolled inputs to prevent re-render lag
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const proposedRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
        setIsSuccess(false);
        // Don't clear refs immediately to allow animation, or clear manually
        if (descriptionRef.current) descriptionRef.current.value = "";
        if (proposedRef.current) proposedRef.current.value = "";
    }
  }, [open]);

  const handleSubmitClick = async (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();

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

    if (!description.trim()) {
        toast.error("請填寫錯誤描述");
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
                merchant_name: merchantName,
                category_id: categoryId,
                amount,
                payment_method: paymentMethod,
                card_id: cardId,
                card_name: cardName,
                description,
                proposed_reward: proposedReward,
                user_id: user.id
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

  const SuccessView = () => (
    <div className="flex flex-col items-center justify-center py-8 text-center animate-in fade-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
            <CheckCircle2 className="h-8 w-8" />
        </div>
        <h3 className="text-xl font-bold text-green-700 mb-2">回報已提交！</h3>
        <p className="text-gray-500 mb-6">
            感謝您的寶貴意見，我們會盡快審核並更新資料。
        </p>
        <Button onClick={() => onOpenChange(false)} className="w-full bg-green-600 hover:bg-green-700 text-white">
            關閉
        </Button>
    </div>
  );

  const FormView = () => (
    <div className="space-y-4">
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

        <div className="grid gap-2">
            <Label htmlFor="description">錯誤描述 / 正確算法 <span className="text-red-500">*</span></Label>
            <Textarea
                id="description"
                ref={descriptionRef}
                placeholder="例如：此卡在該商戶只有 0.4% 回贈，因為..."
                required
                rows={3}
                className="resize-none"
            />
        </div>

        <div className="grid gap-2">
            <Label htmlFor="proposed">建議回贈 % (選填)</Label>
            <Input
                id="proposed"
                ref={proposedRef}
                placeholder="例如：0.4"
            />
        </div>

        <div className="pt-2">
            <Button 
                type="button"
                onClick={handleSubmitClick} 
                disabled={isSubmitting} 
                className="w-full"
            >
                {isSubmitting ? "提交中..." : "提交回報"}
            </Button>
        </div>
    </div>
  );

  if (isDesktop) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                {isSuccess ? (
                    <SuccessView />
                ) : (
                    <>
                        <DialogHeader>
                            <DialogTitle className="flex items-center gap-2">
                                <Flag className="h-5 w-5 text-red-500" /> 回報回贈錯誤
                            </DialogTitle>
                            <DialogDescription>
                                如果您發現計算結果有誤，請告訴我們正確的資訊。
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
                            <Flag className="h-5 w-5 text-red-500" /> 回報回贈錯誤
                        </DrawerTitle>
                        <DrawerDescription>
                            如果您發現計算結果有誤，請告訴我們正確的資訊。
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="px-4 pb-8">
                        <FormView />
                    </div>
                </>
            )}
        </DrawerContent>
    </Drawer>
  );
}
