"use client";

import { useState, useEffect } from "react";
import { useFormState } from "react-dom"; // Correction: verify hook import for nextjs 14
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitReport } from "@/app/actions/submit-report"; // We'll define this
import { Flag } from "lucide-react";
import { toast } from "sonner";

// Note: "useFormState" is from "react-dom" in newer Next.js versions, 
// but sometimes it's "react-dom/client" or just "react-dom" depending on React version.
// For Next.js 14, it is often imported from "react-dom".
// However, since we are in a client component, let's stick to standard fetch/client-side call or useFormState if we are sure.
// Let's use client-side invocation for simplicity with the server action.

interface ReportErrorDialogProps {
  merchantName?: string;
  categoryId?: string;
  amount?: string;
  paymentMethod?: string;
  cardId?: string;
  cardName?: string;
}

export function ReportErrorDialog({
  merchantName,
  categoryId,
  amount,
  paymentMethod,
  cardId,
  cardName
}: ReportErrorDialogProps) {
  const [open, setOpen] = useState(false);
  const [description, setDescription] = useState("");
  const [proposedReward, setProposedReward] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    if (merchantName) formData.append("merchant_name", merchantName);
    if (categoryId) formData.append("category_id", categoryId);
    if (amount) formData.append("amount", amount);
    if (paymentMethod) formData.append("payment_method", paymentMethod);
    if (cardId) formData.append("card_id", cardId);
    formData.append("description", description);
    if (proposedReward) formData.append("proposed_reward", proposedReward);

    // Call server action directly
    const result = await submitReport({}, formData);

    setIsSubmitting(false);

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("感謝您的回報！我們會盡快查核。");
      setOpen(false);
      setDescription("");
      setProposedReward("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-xs text-gray-400 hover:text-red-500 gap-1 h-8 px-2">
          <Flag className="h-3 w-3" /> 回報錯誤
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>回報回贈錯誤</DialogTitle>
          <DialogDescription>
            如果您發現計算結果有誤，請告訴我們正確的資訊。
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
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
            <Label htmlFor="description">錯誤描述 / 正確算法</Label>
            <Textarea
              id="description"
              placeholder="例如：此卡在該商戶只有 0.4% 回贈，因為..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
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

          <DialogFooter>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "提交中..." : "提交回報"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

