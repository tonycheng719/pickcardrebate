"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Wallet, Compass, Repeat, CreditCard } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function BottomNav() {
  const pathname = usePathname();

  const tabs = [
    { name: "計算", href: "/", icon: Repeat, active: pathname === "/" || pathname.startsWith("/calculator") },
    { name: "信用卡", href: "/cards", icon: CreditCard, active: pathname.startsWith("/cards") },
    { name: "優惠", href: "/promos", icon: Compass, active: pathname.startsWith("/promos") },
    { name: "錢包", href: "/wallet", icon: Wallet, active: pathname.startsWith("/wallet") },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-lg border-t dark:border-gray-800 pb-safe">
      <div className="flex items-center justify-around h-16 relative">
        {tabs.map((tab) => (
          <Link key={tab.name} href={tab.href} className="flex-1 relative h-full">
            <div className="flex flex-col items-center justify-center h-full gap-1 cursor-pointer">
              {tab.active && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute inset-x-0 top-0 mx-auto w-12 h-1 bg-blue-600 dark:bg-blue-400 rounded-b-full shadow-[0_0_10px_rgba(37,99,235,0.5)]"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              
              {tab.active && (
                <motion.div
                  layoutId="bottom-nav-glow"
                  className="absolute inset-0 bg-blue-50/50 dark:bg-blue-900/20 rounded-xl m-2"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              <motion.div
                animate={{ scale: tab.active ? 1.1 : 1, y: tab.active ? -2 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className={cn("relative z-10", tab.active ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500")}
              >
                <tab.icon className={cn("h-6 w-6", tab.active && "fill-current")} />
              </motion.div>
              
              <motion.span 
                animate={{ opacity: tab.active ? 1 : 0.7, scale: tab.active ? 1.05 : 1 }}
                className={cn(
                  "text-[10px] font-medium relative z-10", 
                  tab.active ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500"
                )}
              >
                {tab.name}
              </motion.span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
