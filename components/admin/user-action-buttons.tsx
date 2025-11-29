"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Ban, CheckCircle2, MessageSquareOff, MessageSquare } from "lucide-react";
import { toast } from "sonner";

interface UserActionButtonsProps {
  userId: string;
  isBanned: boolean;
  isBannedComment: boolean;
}

export function UserActionButtons({ userId, isBanned, isBannedComment }: UserActionButtonsProps) {
  const [banned, setBanned] = useState(isBanned);
  const [bannedComment, setBannedComment] = useState(isBannedComment);
  const [loading, setLoading] = useState(false);

  const handleBanUser = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users/ban", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, ban: !banned }),
      });
      
      if (!res.ok) throw new Error("操作失敗");
      
      setBanned(!banned);
      toast.success(banned ? "已解除封鎖" : "已封鎖會員");
    } catch (e) {
      toast.error("操作失敗，請重試");
    } finally {
      setLoading(false);
    }
  };

  const handleBanComment = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/users/ban-comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, ban: !bannedComment }),
      });
      
      if (!res.ok) throw new Error("操作失敗");
      
      setBannedComment(!bannedComment);
      toast.success(bannedComment ? "已解除評論禁止" : "已禁止評論");
    } catch (e) {
      toast.error("操作失敗，請重試");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-3">
      <Button 
        variant="outline" 
        className={banned 
          ? "text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20" 
          : "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"
        }
        onClick={handleBanUser}
        disabled={loading}
      >
        {banned ? (
          <>
            <CheckCircle2 className="h-4 w-4 mr-2" /> 解除封鎖
          </>
        ) : (
          <>
            <Ban className="h-4 w-4 mr-2" /> 封鎖會員
          </>
        )}
      </Button>
      <Button 
        variant="outline" 
        className={bannedComment 
          ? "text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/20" 
          : "text-orange-600 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-900/20"
        }
        onClick={handleBanComment}
        disabled={loading}
      >
        {bannedComment ? (
          <>
            <MessageSquare className="h-4 w-4 mr-2" /> 解除禁言
          </>
        ) : (
          <>
            <MessageSquareOff className="h-4 w-4 mr-2" /> 禁止評論
          </>
        )}
      </Button>
    </div>
  );
}

