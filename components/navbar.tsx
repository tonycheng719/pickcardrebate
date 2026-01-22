"use client";

import Link from "next/link";
import Image from "next/image";
import { Wallet, LogOut, Settings, Moon, Sun, Coins, Plane, MessageCircle, CalendarDays } from "lucide-react";
import { Button } from "./ui/button";
import { useWallet } from "@/lib/store/wallet-context";
import { useTheme } from "./theme-provider";
import { useSettings } from "@/lib/store/settings-context";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { WHATSAPP_GROUP_URL } from "@/lib/constants";
import { PromoCalendar } from "./promo-calendar";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Navbar() {
  const { user, logout, rewardPreference, toggleRewardPreference } = useWallet();
  const { getSetting } = useSettings();
  const router = useRouter();
  const { theme, setTheme, resolvedTheme } = useTheme();
  
  // Use setting from DB, fallback to constant
  const whatsappUrl = getSetting("whatsapp_group_url") || WHATSAPP_GROUP_URL;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);

  // 監聽捲動以改變 Navbar 樣式
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <motion.header 
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled 
          ? "bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-gray-200 dark:border-gray-800 shadow-sm" 
          : "bg-white dark:bg-gray-950 border-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center active:scale-95 transition-transform">
          <Image
            src="/logo.png"
            alt="PickCardRebate"
            width={180}
            height={48}
            className="h-8 sm:h-10 w-auto"
            priority
          />
        </Link>
        
        <nav className="flex items-center gap-1 md:gap-3 flex-shrink-0">
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 mr-4">
            <Link href="/discover" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              探索
            </Link>
            <Link href="/cards" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              所有信用卡
            </Link>
            <Link href="/rankings" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              🏆 排行榜
            </Link>
          </div>

          {/* Reward Preference Toggle - visible on all sizes */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleRewardPreference}
            className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
            title={`切換至${rewardPreference === 'miles' ? '現金' : '里數'}顯示`}
          >
            <motion.div
              key={rewardPreference}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {rewardPreference === 'miles' ? <Plane className="h-5 w-5 text-sky-500" /> : <Coins className="h-5 w-5 text-amber-500" />}
            </motion.div>
          </Button>

          {/* Calendar - visible on all sizes */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowCalendar(true)}
            className="text-gray-600 dark:text-gray-300 hover:bg-emerald-50 hover:text-emerald-600 dark:hover:bg-emerald-900/20 dark:hover:text-emerald-400 rounded-full"
            title="本月優惠日曆"
          >
            <CalendarDays className="h-5 w-5" />
          </Button>

          {/* Desktop only: WhatsApp */}
          <a 
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            title="加入 WhatsApp 討論群"
            className="hidden md:block"
          >
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-gray-600 dark:text-gray-300 hover:bg-green-50 hover:text-green-600 dark:hover:bg-green-900/20 dark:hover:text-green-400 rounded-full"
            >
              <MessageCircle className="h-5 w-5" />
            </Button>
          </a>

          {/* Desktop only: Theme Toggle */}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="hidden md:flex text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          >
            {mounted ? (
                <motion.div
                  initial={false}
                  animate={{ rotate: resolvedTheme === "dark" ? 180 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </motion.div>
            ) : (
                <div className="w-5 h-5" />
            )}
          </Button>

          {/* Desktop only: Language Switcher */}
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          {user ? (
            <div className="flex items-center gap-1 md:gap-2 ml-1">
               <Link href="/wallet" className="hidden md:block">
                <Button variant="ghost" className="gap-2 font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                  <Wallet className="h-4 w-4" />
                  <span>我的錢包</span>
                </Button>
              </Link>
              
              <div className="relative z-50">
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    className="rounded-full w-9 h-9 p-0.5 border-2 border-transparent hover:border-blue-100 dark:hover:border-blue-900 transition-all"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 w-full h-full rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                        {user.name[0].toUpperCase()}
                    </div>
                  </motion.button>
                  
                  <AnimatePresence>
                    {isMenuOpen && (
                      <>
                        {/* Backdrop for mobile click-away */}
                        <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setIsMenuOpen(false)} />
                        
                        <motion.div 
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 py-2 z-50 overflow-hidden origin-top-right"
                        >
                            <div className="px-4 py-3 border-b border-gray-50 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                                <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{user.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                            </div>
                            <div className="p-1">
                                {/* Mobile only: Theme Toggle */}
                                <button 
                                    onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        toggleTheme();
                                    }}
                                    className="md:hidden w-full text-left px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl flex items-center justify-between gap-3 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        {mounted && resolvedTheme === "dark" ? (
                                            <Sun className="h-4 w-4 text-amber-500" />
                                        ) : (
                                            <Moon className="h-4 w-4 text-indigo-500" />
                                        )}
                                        <span>外觀模式</span>
                                    </div>
                                    <span className="text-xs px-2 py-0.5 rounded-md font-medium bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300">
                                        {mounted && resolvedTheme === "dark" ? '深色' : '淺色'}
                                    </span>
                                </button>

                                {/* Mobile only: WhatsApp */}
                                <a 
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="md:hidden w-full text-left px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-xl flex items-center gap-3 transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <MessageCircle className="h-4 w-4 text-green-500" />
                                    <span>加入討論群</span>
                                </a>

                              <Link href="/settings">
                                  <button 
                                      onClick={() => setIsMenuOpen(false)}
                                      className="w-full text-left px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl flex items-center gap-3 transition-colors"
                                  >
                                      <Settings className="h-4 w-4 text-gray-400" /> 帳戶設定
                                  </button>
                              </Link>
                              <button 
                                  onClick={async (e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      try {
                                          await logout();
                                          // Force hard reload to clear all states and cache
                                          window.location.href = "/";
                                      } catch (error) {
                                          console.error("Logout failed", error);
                                          window.location.href = "/";
                                      }
                                  }}
                                  className="w-full text-left px-3 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl flex items-center gap-3 transition-colors"
                              >
                                  <LogOut className="h-4 w-4" /> 登出帳號
                              </button>
                            </div>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1 flex-shrink-0">
                {/* Mobile only: Theme Toggle for guests */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={toggleTheme}
                  className="md:hidden text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full flex-shrink-0"
                >
                  {mounted ? (
                      resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />
                  ) : (
                      <div className="w-5 h-5" />
                  )}
                </Button>
                <Link href="/login" className="flex-shrink-0">
                    <Button variant="primary" size="sm" className="rounded-full px-4 md:px-5 shadow-blue-200 dark:shadow-none bg-blue-600 hover:bg-blue-700 text-white border-none whitespace-nowrap">
                      登入
                    </Button>
                </Link>
            </div>
          )}
        </nav>
      </div>
      
      {/* Promo Calendar Dialog */}
      <PromoCalendar open={showCalendar} onOpenChange={setShowCalendar} />
    </motion.header>
  );
}
