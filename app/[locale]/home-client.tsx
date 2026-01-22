"use client";

import { Navbar } from "@/components/navbar";
import { CreditCardCalculator } from "@/components/credit-card-calculator";
import { TrendingMerchants } from "@/components/trending-merchants";
import { useWallet } from "@/lib/store/wallet-context";
import { Zap, BadgeCheck, PieChart, Plane, RefreshCw, Smartphone, Calendar, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Script from "next/script";
import { Locale } from "@/lib/i18n/config";
import { getTranslation } from "@/lib/i18n/translations";

// 根據語言返回 HowTo Schema
function getHowToSchema(locale: Locale) {
  const t = getTranslation(locale);
  
  if (locale === 'en') {
    return {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "How to Use the Credit Card Rebate Calculator",
      "description": "Use PickCardRebate credit card rebate calculator to find the highest cashback card in just 3 steps.",
      "totalTime": "PT1M",
      "estimatedCost": { "@type": "MonetaryAmount", "currency": "HKD", "value": "0" },
      "step": [
        { "@type": "HowToStep", "position": 1, "name": "Select Merchant", "text": "Search or select the merchant name where you plan to spend." },
        { "@type": "HowToStep", "position": 2, "name": "Enter Amount", "text": "Enter your expected spending amount in HKD." },
        { "@type": "HowToStep", "position": 3, "name": "Choose Payment Method", "text": "Select your payment method such as physical card, Apple Pay, or Google Pay." },
        { "@type": "HowToStep", "position": 4, "name": "View Results", "text": "The system will display the credit cards with the highest rebate rates." }
      ]
    };
  }
  
  if (locale === 'zh-CN') {
    return {
      "@context": "https://schema.org",
      "@type": "HowTo",
      "name": "如何使用信用卡回赠计算器",
      "description": "使用 PickCardRebate 信用卡回赠计算器，只需 3 步即可找出最高回赠的信用卡。",
      "totalTime": "PT1M",
      "estimatedCost": { "@type": "MonetaryAmount", "currency": "HKD", "value": "0" },
      "step": [
        { "@type": "HowToStep", "position": 1, "name": "选择商户", "text": "在搜索栏输入或选择你要消费的商户名称。" },
        { "@type": "HowToStep", "position": 2, "name": "输入消费金额", "text": "输入你预计的消费金额（港币）。" },
        { "@type": "HowToStep", "position": 3, "name": "选择支付方式", "text": "选择你的付款方式，如实体卡、Apple Pay、Google Pay 等。" },
        { "@type": "HowToStep", "position": 4, "name": "查看结果", "text": "系统会自动显示回赠最高的信用卡排名。" }
      ]
    };
  }
  
  // Default: zh-HK
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "如何使用信用卡回贈計算機",
    "description": "使用 PickCardRebate 信用卡回贈計算機，只需 3 步即可找出最高回贈的信用卡。",
    "totalTime": "PT1M",
    "estimatedCost": { "@type": "MonetaryAmount", "currency": "HKD", "value": "0" },
    "step": [
      { "@type": "HowToStep", "position": 1, "name": "選擇商戶", "text": "在搜尋欄輸入或選擇你要消費的商戶名稱。" },
      { "@type": "HowToStep", "position": 2, "name": "輸入消費金額", "text": "輸入你預計的消費金額（港幣）。" },
      { "@type": "HowToStep", "position": 3, "name": "選擇支付方式", "text": "選擇你的付款方式，如實體卡、Apple Pay、Google Pay 等。" },
      { "@type": "HowToStep", "position": 4, "name": "查看結果", "text": "系統會自動顯示回贈最高的信用卡排名。" }
    ]
  };
}

// 根據語言返回問候語
function getGreeting(locale: Locale): string {
  const now = new Date();
  const hkHour = (now.getUTCHours() + 8) % 24;
  
  if (locale === 'en') {
    if (hkHour >= 5 && hkHour < 12) return "Good morning";
    if (hkHour >= 12 && hkHour < 18) return "Good afternoon";
    if (hkHour >= 18 && hkHour < 22) return "Good evening";
    return "Good night";
  }
  
  if (locale === 'zh-CN') {
    if (hkHour >= 5 && hkHour < 12) return "早上好";
    if (hkHour >= 12 && hkHour < 18) return "下午好";
    if (hkHour >= 18 && hkHour < 22) return "晚上好";
    return "夜深了";
  }
  
  // zh-HK
  if (hkHour >= 5 && hkHour < 12) return "早晨";
  if (hkHour >= 12 && hkHour < 18) return "午安";
  if (hkHour >= 18 && hkHour < 22) return "晚安";
  return "夜了";
}

// 根據語言返回功能介紹
function getFeatures(locale: Locale) {
  const t = getTranslation(locale);
  
  if (locale === 'en') {
    return [
      { title: "One-Click Calculate", desc: "Enter merchant and amount, AI instantly finds the highest cashback card.", icon: Zap, color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400" },
      { title: "Community Verified", desc: "First in HK! Combined with user-tested data for accurate rebate info.", icon: BadgeCheck, color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" },
      { title: "Smart Tracking", desc: "One-click record spending and rebates, auto-generate monthly reports.", icon: PieChart, color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" },
      { title: "Miles & Cash", desc: "Whether cash rebate or miles, customize your preference for precise calculation.", icon: Plane, color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" },
      { title: "Real-time Updates", desc: "Keep up with latest bank offers, discount days, and limited-time deals.", icon: RefreshCw, color: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400" },
      { title: "Free to Use", desc: "Completely free, no ads, focused on helping you save more.", icon: Smartphone, color: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400" },
      { title: "Offers Calendar", desc: "View all monthly discount days and member days at a glance.", icon: Calendar, color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400" },
      { title: "Multi-Card Compare", desc: "Compare multiple cards at once, clearly see which one is best.", icon: Layers, color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400" },
    ];
  }
  
  if (locale === 'zh-CN') {
    return [
      { title: "一键计算", desc: "输入商户金额，AI 即时找出全港回赠最高的信用卡。", icon: Zap, color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400" },
      { title: "社群验证", desc: "全港首创！结合用户实测数据，回赠真伪一目了然。", icon: BadgeCheck, color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" },
      { title: "智能记账", desc: "一键记录消费与回赠，自动生成月度报表，理财更轻松。", icon: PieChart, color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" },
      { title: "里程现金", desc: "无论是现金回赠还是飞行里程，自定偏好，精准计算每一分价值。", icon: Plane, color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" },
      { title: "即时更新", desc: "紧贴各大银行最新优惠，折扣日、限时优惠第一时间通知你。", icon: RefreshCw, color: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400" },
      { title: "免费使用", desc: "完全免费，无广告干扰，专注帮你省到底。", icon: Smartphone, color: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400" },
      { title: "优惠月历", desc: "一览全月折扣日、会员日，提前计划消费。", icon: Calendar, color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400" },
      { title: "多卡比较", desc: "一次过比较多张信用卡，清楚看到哪张最划算。", icon: Layers, color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400" },
    ];
  }
  
  // zh-HK
  return [
    { title: "一鍵計算", desc: "輸入商戶金額，AI 即時找出全港回贈最高的信用卡。", icon: Zap, color: "bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400" },
    { title: "社群驗證", desc: "全港首創！結合用戶實測數據，回贈真偽一目了然，不再中伏。", icon: BadgeCheck, color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400" },
    { title: "智能記賬", desc: "一鍵記錄消費與回贈，自動生成月度報表，理財更輕鬆。", icon: PieChart, color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400" },
    { title: "里數現金", desc: "無論是現金回贈還是飛行里數，自訂偏好，精準計算每一分價值。", icon: Plane, color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400" },
    { title: "即時更新", desc: "緊貼各大銀行最新優惠，折扣日、限時優惠第一時間通知你。", icon: RefreshCw, color: "bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400" },
    { title: "免費使用", desc: "完全免費，無廣告干擾，專注幫你慳到盡，輕鬆上手無負擔。", icon: Smartphone, color: "bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400" },
    { title: "優惠月曆", desc: "一覽全月折扣日、會員日，提前計劃消費，從此不再錯過優惠。", icon: Calendar, color: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400" },
    { title: "多卡比較", desc: "一次過比較多張信用卡，清楚睇到邊張最抵，揀卡從此唔使煩。", icon: Layers, color: "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400" },
  ];
}

interface HomePageProps {
  locale: Locale;
}

export default function HomePage({ locale }: HomePageProps) {
  const { user } = useWallet();
  const [greeting, setGreeting] = useState(""); // Default empty for SSR
  const t = getTranslation(locale);
  const features = getFeatures(locale);
  const howToSchema = getHowToSchema(locale);
  
  // Set greeting on client-side only to avoid hydration mismatch
  useEffect(() => {
    setGreeting(getGreeting(locale));
  }, [locale]);
  
  // 根據語言獲取文本
  const pageText = {
    'zh-HK': {
      defaultUser: '精明消費者',
      title: '信用卡回贈計算機',
      subtitle: '選擇商戶與消費方式，即刻知道哪張卡最抵。',
      whyTitle: '為什麼選擇 PickCardRebate？',
    },
    'zh-CN': {
      defaultUser: '精明消费者',
      title: '信用卡回赠计算器',
      subtitle: '选择商户与消费方式，即刻知道哪张卡最划算。',
      whyTitle: '为什么选择 PickCardRebate？',
    },
    'en': {
      defaultUser: 'Smart Shopper',
      title: 'Credit Card Rebate Calculator',
      subtitle: 'Select merchant and payment method to find the best card.',
      whyTitle: 'Why Choose PickCardRebate?',
    },
  }[locale];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Script
        id="howto-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      
      <Navbar />

      <main className="flex-1 container mx-auto px-4 pt-6 pb-24">
        <div className="mb-8 flex justify-between items-start">
          <div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-1 font-medium">
              {greeting && `${greeting}, `}{user?.name || pageText.defaultUser} 👋
            </p>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{pageText.title}</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{pageText.subtitle}</p>
          </div>
        </div>

        <section className="mb-12">
          <CreditCardCalculator showIntro={false} />
          <TrendingMerchants />
        </section>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-bold text-gray-900 dark:text-white text-lg">{pageText.whyTitle}</h3>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

