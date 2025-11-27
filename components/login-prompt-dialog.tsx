"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { LogIn } from "lucide-react";

interface LoginPromptDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
}

export function LoginPromptDialog({ 
    open, 
    onOpenChange, 
    title = "需要登入", 
    description = "登入後即可使用此功能，並同步您的資料。" 
}: LoginPromptDialogProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const Content = () => (
    <div className="flex flex-col items-center justify-center py-6 text-center">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
            <LogIn className="h-8 w-8" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
        <p className="text-gray-500 mb-6 max-w-xs text-sm">
            {description}
        </p>
        <Button onClick={() => window.location.href = "/login"} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white mb-3 h-12 text-lg md:h-10 md:text-sm">
            立即登入
        </Button>
        <Button variant="ghost" onClick={() => onOpenChange(false)} className="w-full text-gray-500 h-12 md:h-10">
            暫不登入
        </Button>
    </div>
  );

  if (isDesktop) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[400px]">
                <Content />
            </DialogContent>
        </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent>
            <div className="p-4">
                <Content />
            </div>
        </DrawerContent>
    </Drawer>
  );
}

