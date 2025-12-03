"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Wallet, Compass, Repeat, CreditCard, Gift } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

export function BottomNav() {
  const pathname = usePathname();
  const [pressedTab, setPressedTab] = useState<string | null>(null);

  const tabs = [
    { name: "計算", href: "/", icon: Repeat, active: pathname === "/" || pathname.startsWith("/calculator") },
    { name: "信用卡", href: "/cards", icon: CreditCard, active: pathname.startsWith("/cards") },
    { name: "優惠", href: "/promos", icon: Gift, active: pathname.startsWith("/promos") },
    { name: "錢包", href: "/wallet", icon: Wallet, active: pathname.startsWith("/wallet") },
  ];

  return (
    <nav 
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t dark:border-gray-800 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}
    >
      <div className="flex items-center justify-around h-[60px] max-w-lg mx-auto">
        {tabs.map((tab) => (
          <Link 
            key={tab.name} 
            href={tab.href} 
            className="flex-1 relative h-full select-none touch-manipulation"
            onTouchStart={() => setPressedTab(tab.name)}
            onTouchEnd={() => setPressedTab(null)}
            onTouchCancel={() => setPressedTab(null)}
          >
            <motion.div 
              className="flex flex-col items-center justify-center h-full gap-0.5"
              animate={{ 
                scale: pressedTab === tab.name ? 0.9 : 1,
                opacity: pressedTab === tab.name ? 0.7 : 1 
              }}
              transition={{ duration: 0.1 }}
            >
              {/* Active indicator line */}
              {tab.active && (
                <motion.div
                  layoutId="bottom-nav-indicator"
                  className="absolute inset-x-0 top-0 mx-auto w-10 h-[3px] bg-gradient-to-r from-blue-500 to-cyan-500 rounded-b-full"
                  transition={{ type: "spring", stiffness: 500, damping: 35 }}
                />
              )}
              
              {/* Background glow for active tab */}
              {tab.active && (
                <motion.div
                  layoutId="bottom-nav-glow"
                  className="absolute inset-0 bg-blue-50 dark:bg-blue-900/30 rounded-2xl mx-3 my-1"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}

              {/* Icon */}
              <motion.div
                animate={{ 
                  scale: tab.active ? 1.15 : 1, 
                  y: tab.active ? -1 : 0 
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className={cn(
                  "relative z-10 transition-colors duration-200", 
                  tab.active 
                    ? "text-blue-600 dark:text-blue-400" 
                    : "text-gray-400 dark:text-gray-500"
                )}
              >
                <tab.icon className={cn("h-[22px] w-[22px]", tab.active && "drop-shadow-sm")} strokeWidth={tab.active ? 2.5 : 2} />
              </motion.div>
              
              {/* Label */}
              <span 
                className={cn(
                  "text-[10px] font-semibold relative z-10 transition-colors duration-200", 
                  tab.active 
                    ? "text-blue-600 dark:text-blue-400" 
                    : "text-gray-400 dark:text-gray-500"
                )}
              >
                {tab.name}
              </span>
            </motion.div>
          </Link>
        ))}
      </div>
    </nav>
  );
}
