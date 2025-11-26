"use client";

import { Navbar } from "@/components/navbar";
import { CreditCardCalculator } from "@/components/credit-card-calculator";
import { useWallet } from "@/lib/store/wallet-context";
import { Zap, ShieldCheck, Gift, Search } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    title: "一鍵計算",
    desc: "輸入商戶金額，即時找出回贈最高的信用卡。",
    icon: Zap,
    color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400",
  },
  {
    title: "迎新追蹤",
    desc: "自動提醒迎新簽賬進度，賺盡每一分獎賞。",
    icon: Gift,
    color: "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400",
  },
  {
    title: "全港卡庫",
    desc: "收錄主流信用卡資訊，年費豁免方法一目了然。",
    icon: Search,
    color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    title: "安心無憂",
    desc: "無需連結銀行戶口，資料只儲存於您的裝置。",
    icon: ShieldCheck,
    color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400",
  },
];

export default function Home() {
  const { user } = useWallet();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Navbar />

      <main className="flex-1 container mx-auto px-4 pt-6 pb-24">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1 font-medium">早晨, {user?.name || "精明消費者"} 👋</p>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">信用卡回贈計算機</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              選擇商戶與消費方式，即刻知道哪張卡最抵。
          </p>
        </div>
        </div>

        <section className="mb-12">
          <CreditCardCalculator showIntro={false} />
        </section>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">為什麼選擇 PickCardRebate？</h3>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
