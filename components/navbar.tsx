"use client";

import Link from "next/link";
import { CreditCard, Wallet, LogOut, Settings, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useWallet } from "@/lib/store/wallet-context";
import { useTheme } from "./theme-provider";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const { user, logout } = useWallet();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // 監聽捲動以改變 Navbar 樣式
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
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
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600 dark:text-blue-400 active:scale-95 transition-transform">
          <div className="bg-blue-600 dark:bg-blue-500 text-white p-1.5 rounded-lg">
            <CreditCard className="h-5 w-5" />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
            PickCardRebate
          </span>
        </Link>
        
        <nav className="flex items-center gap-1 md:gap-4">
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 mr-4">
            <Link href="/promos" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              最新優惠
            </Link>
            <Link href="/cards" className="text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              所有卡片
            </Link>
          </div>

          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
          >
            <motion.div
              initial={false}
              animate={{ rotate: theme === "dark" ? 180 : 0 }}
              transition={{ duration: 0.5 }}
            >
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </motion.div>
          </Button>

          {user ? (
            <div className="flex items-center gap-2 ml-1">
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
                              <Link href="/settings">
                                  <button 
                                      onClick={() => setIsMenuOpen(false)}
                                      className="w-full text-left px-3 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-xl flex items-center gap-3 transition-colors"
                                  >
                                      <Settings className="h-4 w-4 text-gray-400" /> 帳戶設定
                                  </button>
                              </Link>
                              <button 
                                  onClick={async () => {
                                      await logout();
                                      setIsMenuOpen(false);
                                      router.push("/");
                                      router.refresh();
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
            <div className="flex items-center gap-2">
                <Link href="/login">
                    <Button variant="primary" size="sm" className="rounded-full px-5 shadow-blue-200 dark:shadow-none bg-blue-600 hover:bg-blue-700 text-white border-none">
                      登入
                    </Button>
                </Link>
            </div>
          )}
        </nav>
      </div>
    </motion.header>
  );
}
