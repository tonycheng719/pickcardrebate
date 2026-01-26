"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Smartphone, AlertTriangle, ArrowRight, Sparkles, TrendingUp,
  Zap, Shield, Store
} from "lucide-react";
import Link from "next/link";
import { PromoFAQ } from "@/lib/types";
import { 
  CardRecommendationBlock, 
  QuickComparisonTable,
  type CardRecommendation 
} from "@/components/card-recommendation-block";

// FAQ 數據 for Schema
export const applePayCreditCardFaqData: PromoFAQ[] = [
  {
    question: "Apple Pay 有冇手續費？",
    answer: "Apple Pay 本身無手續費，但用外幣網站消費可能需付外幣手續費（視乎信用卡）。",
  },
  {
    question: "Apple Pay 可以賺信用卡回贈嗎？",
    answer: "可以！大部分信用卡將 Apple Pay 計入「感應支付」或「流動支付」類別，部分卡更有額外回贈。",
  },
  {
    question: "邊張卡 Apple Pay 回贈最高？",
    answer: "HSBC Red 網上消費 4%（透過 App）、渣打 Simply Cash 1.5% 全面回贈、建行 eye 9%+ 餐飲。",
  },
  {
    question: "Apple Pay 同實體卡碌卡有咩分別？",
    answer: "Apple Pay 是感應支付（NFC），部分卡的感應支付回贈與實體卡不同。某些商戶系統也可能分類不同。",
  },
  {
    question: "Apple Pay 可以網上購物嗎？",
    answer: "可以！支援 Apple Pay 的網站/App 可直接用 Face ID/Touch ID 確認付款。",
  },
];

// 使用真實的卡片 ID（對應 cards.ts）
const topCards: CardRecommendation[] = [
  {
    id: "hsbc-red",
    rate: "4%",
    cap: "每月首 $10,000 網上簽賬",
    pros: ["網上/App 內消費 4%", "超市同享 4%", "永久免年費"],
    cons: ["實體店只有 0.4%", "需透過 App 內消費"],
    bestFor: "網購/App 消費用戶",
  },
  {
    id: "sc-simply-cash",
    rate: "1.5%",
    cap: "無上限",
    pros: ["全面 1.5% 無條件", "無上限", "簡單易用"],
    cons: ["回贈率不算最高"],
    bestFor: "追求簡單穩定用戶",
  },
  {
    id: "ccb-eye",
    rate: "9%+",
    cap: "餐飲類別",
    pros: ["餐飲回贈極高", "配合 Apple Pay 使用"],
    cons: ["只限餐飲類別", "需登記"],
    bestFor: "經常外食用戶",
  },
  {
    id: "citi-rewards",
    rate: "3X",
    cap: "流動支付",
    pros: ["流動支付 3X 積分", "百貨公司同享"],
    cons: ["積分兌換現金較低"],
    bestFor: "儲積分換禮品用戶",
  },
];

const faqItems = [
  {
    q: "Apple Pay 有冇手續費？",
    a: "Apple Pay 本身無手續費，但用外幣網站消費可能需付外幣手續費（視乎信用卡）。",
  },
  {
    q: "Apple Pay 可以賺信用卡回贈嗎？",
    a: "可以！大部分信用卡將 Apple Pay 計入「感應支付」或「流動支付」類別，部分卡更有額外回贈。",
  },
  {
    q: "邊張卡 Apple Pay 回贈最高？",
    a: "HSBC Red 網上消費 4%（透過 App）、渣打 Simply Cash 1.5% 全面回贈、建行 eye 9%+ 餐飲。",
  },
  {
    q: "Apple Pay 同實體卡碌卡有咩分別？",
    a: "Apple Pay 是感應支付（NFC），部分卡的感應支付回贈與實體卡不同。某些商戶系統也可能分類不同。",
  },
  {
    q: "Apple Pay 可以網上購物嗎？",
    a: "可以！支援 Apple Pay 的網站/App 可直接用 Face ID/Touch ID 確認付款。",
  },
];

export function ApplePayCreditCardGuide() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Smartphone className="h-8 w-8" />
          <h1 className="text-2xl font-bold">2026 Apple Pay 信用卡攻略</h1>
        </div>
        <p className="text-gray-300 mb-4">
          Apple Pay 係最方便嘅流動支付方式！用 iPhone/Apple Watch 輕觸即付，
          配合適合嘅信用卡更可賺取額外回贈！
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-white/20 text-white">NFC 感應支付</Badge>
          <Badge className="bg-white/20 text-white">Face ID 確認</Badge>
          <Badge className="bg-white/20 text-white">最高 9%+ 回贈</Badge>
        </div>
      </div>

      {/* Quick Summary */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            TL;DR 快速推薦
          </h2>
          <QuickComparisonTable cards={topCards} />
        </CardContent>
      </Card>

      {/* Detailed Comparison */}
      <CardRecommendationBlock 
        cards={topCards} 
        title="Apple Pay 信用卡詳細比較" 
      />

      {/* Tips Section */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-500" />
            Apple Pay 使用貼士
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <strong>安全便捷</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400">Apple Pay 使用 Face ID/Touch ID 驗證，比實體卡更安全</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Store className="h-5 w-5 text-blue-500 mt-0.5" />
              <div>
                <strong>廣泛接受</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400">香港大部分商戶已支援 NFC 感應支付</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <strong>注意回贈類別</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400">部分卡 Apple Pay 回贈與實體卡不同，使用前請確認</p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* FAQ Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-purple-500" />
          常見問題 FAQ
        </h2>
        <div className="space-y-3">
          {faqItems.map((faq, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Q: {faq.q}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">A: {faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Card className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <CardContent className="p-6 text-center">
          <h2 className="text-xl font-bold mb-2">即刻計算你的最佳 Apple Pay 信用卡</h2>
          <p className="text-gray-300 mb-4">輸入你的消費習慣，即時找出最高回贈信用卡</p>
          <Link href="/">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
              使用計算機 <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

