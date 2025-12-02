"use client";

import { Navbar } from "@/components/navbar";
import { CreditCardCalculator } from "@/components/credit-card-calculator";
import { TrendingMerchants } from "@/components/trending-merchants";
import { useWallet } from "@/lib/store/wallet-context";
import { Zap, ShieldCheck, PieChart, BadgeCheck, Plane, RefreshCw, Smartphone } from "lucide-react";
import { motion } from "framer-motion";
import { useMemo } from "react";

// Get greeting based on current time (Hong Kong Time)
function getGreeting(): string {
  const now = new Date();
  // Convert to Hong Kong time (UTC+8)
  const hkHour = (now.getUTCHours() + 8) % 24;
  
  if (hkHour >= 5 && hkHour < 12) {
    return "早晨";
  } else if (hkHour >= 12 && hkHour < 18) {
    return "午安";
  } else if (hkHour >= 18 && hkHour < 22) {
    return "晚安";
  } else {
    return "夜了";
  }
}

const features = [
  {
    title: "一鍵計算",
    desc: "輸入商戶金額，AI 即時找出全港回贈最高的信用卡。",
    icon: Zap,
    color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  {
    title: "社群驗證",
    desc: "全港首創！結合用戶實測數據，回贈真偽一目了然，不再中伏。",
    icon: BadgeCheck,
    color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400",
  },
  {
    title: "智能記賬",
    desc: "一鍵記錄消費與回贈，自動生成月度報表，理財更輕鬆。",
    icon: PieChart,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    title: "里數現金",
    desc: "無論是現金回贈還是飛行里數，自訂偏好，精準計算每一分價值。",
    icon: Plane,
    color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  },
  {
    title: "即時更新",
    desc: "緊貼各大銀行最新優惠，折扣日、限時優惠第一時間通知你。",
    icon: RefreshCw,
    color: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400",
  },
  {
    title: "免費使用",
    desc: "完全免費，無廣告干擾，專注幫你慳到盡，輕鬆上手無負擔。",
    icon: Smartphone,
    color: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400",
  },
];

export default function Home() {
  const { user } = useWallet();
  const greeting = useMemo(() => getGreeting(), []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 pt-6 pb-24">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1 font-medium">{greeting}, {user?.name || "精明消費者"} 👋</p>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">信用卡回贈計算機</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              選擇商戶與消費方式，即刻知道哪張卡最抵。
          </p>
        </div>
        </div>

        <section className="mb-12">
          <CreditCardCalculator showIntro={false} />
          <TrendingMerchants />
        </section>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">為什麼選擇 PickCardRebate？</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-900 p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex flex-col items-center text-center hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-3 ${feature.color}`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <div className="font-bold text-gray-900 dark:text-white mb-1">{feature.title}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">{feature.desc}</div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
