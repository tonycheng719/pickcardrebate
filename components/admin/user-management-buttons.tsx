"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Ban, CheckCircle2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface UserManagementButtonsProps {
  userId: string;
  isBanned: boolean; // Account ban
  isCommentBanned: boolean; // Comment ban
}

export function UserManagementButtons({ 
  userId, 
  isBanned, 
  isCommentBanned 
}: UserManagementButtonsProps) {
  const router = useRouter();
  const [isLoadingBan, setIsLoadingBan] = useState(false);
  const [isLoadingCommentBan, setIsLoadingCommentBan] = useState(false);

  const handleToggleBan = async () => {
    // Not implemented yet for full account ban
    toast.info("帳號封鎖功能尚在開發中");
  };

  const handleToggleCommentBan = async () => {
    setIsLoadingCommentBan(true);
    try {
      const response = await fetch(`/api/admin/users/ban-comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action: isCommentBanned ? "unban" : "ban" }),
      });

      if (!response.ok) throw new Error("Failed to update status");

      toast.success(isCommentBanned ? "已解除評論禁止" : "已禁止該會員評論");
      router.refresh();
    } catch (error) {
      toast.error("操作失敗，請稍後再試");
      console.error(error);
    } finally {
      setIsLoadingCommentBan(false);
    }
  };

  return (
    <div className="flex gap-3">
      <Button 
        variant="outline" 
        className={`${isBanned ? "bg-red-50 text-red-600 border-red-200" : "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20"}`}
        onClick={handleToggleBan}
        disabled={isLoadingBan}
      >
        {isLoadingBan ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Ban className="h-4 w-4 mr-2" />}
        {isBanned ? "解除封鎖" : "封鎖會員"}
      </Button>
      
      <Button 
        variant="outline" 
        className={`${isCommentBanned ? "bg-orange-50 text-orange-600 border-orange-200" : "text-orange-600 hover:bg-orange-50 dark:text-orange-400 dark:hover:bg-orange-900/20"}`}
        onClick={handleToggleCommentBan}
        disabled={isLoadingCommentBan}
      >
        {isLoadingCommentBan ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : (isCommentBanned ? <CheckCircle2 className="h-4 w-4 mr-2" /> : <Ban className="h-4 w-4 mr-2" />)}
        {isCommentBanned ? "允許評論" : "禁止評論"}
      </Button>
    </div>
  );
}

