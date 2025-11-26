"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerFooter } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitReport } from "@/app/actions/submit-report";
import { CheckCircle2, Flag } from "lucide-react";
import { toast } from "sonner";
import { useMediaQuery } from "@/hooks/use-media-query";

interface ReportErrorDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  merchantName?: string | null; // Allow null
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
  const [description, setDescription] = useState("");
  const [proposedReward, setProposedReward] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Reset state when dialog opens
  useEffect(() => {
    if (open) {
        setIsSuccess(false);
        setDescription("");
        setProposedReward("");
    }
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    if (merchantName) formData.append("merchant_name", merchantName);
    if (categoryId) formData.append("category_id", categoryId);
    if (amount) formData.append("amount", amount);
    if (paymentMethod) formData.append("payment_method", paymentMethod);
    if (cardId) formData.append("card_id", cardId);
    if (cardName) formData.append("card_name", cardName); // Add card name
    formData.append("description", description);
    if (proposedReward) formData.append("proposed_reward", proposedReward);

    try {
        const result = await submitReport({ success: false }, formData);

        if (result.error) {
          toast.error(result.error);
        } else {
          setIsSuccess(true);
          // Don't auto close, let user see success message
        }
    } catch (error) {
        toast.error("提交失敗，請稍後再試");
    } finally {
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
    <form onSubmit={handleSubmit} className="space-y-4">
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
                placeholder="例如：此卡在該商戶只有 0.4% 回贈，因為..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={3}
            />
        </div>

        <div className="grid gap-2">
            <Label htmlFor="proposed">建議回贈 % (選填)</Label>
            <Input
                id="proposed"
                placeholder="例如：0.4"
                value={proposedReward}
                onChange={(e) => setProposedReward(e.target.value)}
            />
        </div>

        <div className="pt-2">
            <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? "提交中..." : "提交回報"}
            </Button>
        </div>
    </form>
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
