"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  CreditCard, AlertTriangle, ArrowRight, Sparkles, TrendingUp,
  Train, RefreshCw, CheckCircle
} from "lucide-react";
import Link from "next/link";
import { PromoFAQ } from "@/lib/types";
import { 
  CardRecommendationBlock, 
  QuickComparisonTable,
  type CardRecommendation 
} from "@/components/card-recommendation-block";

// FAQ 數據 for Schema
export const octopusAavsCreditCardFaqData: PromoFAQ[] = [
  {
    question: "八達通自動增值 (AAVS) 係咩？",
    answer: "八達通自動增值服務，當餘額不足時自動從信用卡增值 $150/$250/$500 到八達通。",
  },
  {
    question: "AAVS 有冇回贈？",
    answer: "視乎信用卡，部分卡將 AAVS 計入「自動轉賬」或特定類別，可享回贈。Citi Octopus 更有額外獎賞。",
  },
  {
    question: "邊張卡 AAVS 回贈最高？",
    answer: "Citi Octopus 15%（上限）、渣打 Smart 5%、HSBC Red 0.4%（基本）。",
  },
  {
    question: "點樣申請 AAVS？",
    answer: "透過八達通 App 或銀行 App 申請，需綁定信用卡。一張八達通只能綁定一張卡。",
  },
  {
    question: "AAVS 每次增值幾多？",
    answer: "可選擇 $150、$250 或 $500，視乎銀行/信用卡支援的選項。",
  },
];

// 使用真實的卡片 ID（對應 cards.ts）
const topCards: CardRecommendation[] = [
  {
    id: "citi-octopus",
    rate: "15%",
    cap: "交通消費額外獎賞",
    pros: ["八達通消費額外 15%", "交通回贈最高", "Citi 優惠多"],
    cons: ["有上限", "需用八達通消費"],
    bestFor: "每日搭車用戶",
  },
  {
    id: "sc-smart",
    rate: "5%",
    cap: "每月首 $2,000",
    pros: ["回贈率高", "出糧戶口更優惠"],
    cons: ["上限較低"],
    bestFor: "小額交通開支用戶",
  },
  {
    id: "hsbc-red",
    rate: "0.4%",
    cap: "無上限",
    pros: ["基本回贈", "穩定可靠"],
    cons: ["回贈率較低"],
    bestFor: "追求穩定用戶",
  },
  {
    id: "citi-cashback",
    rate: "1%",
    cap: "八達通自動增值",
    pros: ["自動增值有回贈", "無上限"],
    cons: ["回贈率一般"],
    bestFor: "Citi 用戶",
  },
];

const faqItems = [
  {
    q: "八達通自動增值 (AAVS) 係咩？",
    a: "八達通自動增值服務，當餘額不足時自動從信用卡增值 $150/$250/$500 到八達通。",
  },
  {
    q: "AAVS 有冇回贈？",
    a: "視乎信用卡，部分卡將 AAVS 計入「自動轉賬」或特定類別，可享回贈。Citi Octopus 更有額外獎賞。",
  },
  {
    q: "邊張卡 AAVS 回贈最高？",
    a: "Citi Octopus 15%（上限）、渣打 Smart 5%、HSBC Red 0.4%（基本）。",
  },
  {
    q: "點樣申請 AAVS？",
    a: "透過八達通 App 或銀行 App 申請，需綁定信用卡。一張八達通只能綁定一張卡。",
  },
  {
    q: "AAVS 每次增值幾多？",
    a: "可選擇 $150、$250 或 $500，視乎銀行/信用卡支援的選項。",
  },
];

export function OctopusAavsCreditCardGuide() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <CreditCard className="h-8 w-8" />
          <h1 className="text-2xl font-bold">2026 八達通自動增值信用卡攻略</h1>
        </div>
        <p className="text-orange-100 mb-4">
          八達通自動增值 (AAVS) 可以用信用卡自動增值八達通，
          配合適合嘅信用卡更可賺取回贈！
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-white/20 text-white">自動增值</Badge>
          <Badge className="bg-white/20 text-white">交通回贈</Badge>
          <Badge className="bg-white/20 text-white">最高 15%</Badge>
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
        title="八達通自動增值信用卡詳細比較" 
      />

      {/* How to Apply */}
      <Card className="bg-orange-50 dark:bg-orange-900/20 border-orange-200">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <RefreshCw className="h-5 w-5 text-orange-500" />
            申請 AAVS 步驟
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-bold">1</div>
              <div>
                <strong>下載八達通 App</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400">於 App Store 或 Google Play 下載</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-bold">2</div>
              <div>
                <strong>登記八達通</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400">將實體八達通或手機八達通加入 App</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center text-sm font-bold">3</div>
              <div>
                <strong>申請自動增值</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400">選擇「自動增值服務」，輸入信用卡資料</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <strong>完成！</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400">餘額低於 $0 時自動增值</p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            注意事項
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <Train className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <strong>一張八達通只能綁定一張卡</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400">如需更換，需先取消現有 AAVS</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <strong>部分卡不計 AAVS 回贈</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400">如 AEON、安信等，申請前請確認</p>
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
      <Card className="bg-gradient-to-r from-orange-500 to-amber-500 text-white">
        <CardContent className="p-6 text-center">
          <h2 className="text-xl font-bold mb-2">計算你的交通回贈</h2>
          <p className="text-orange-100 mb-4">輸入你的月均交通開支，即時找出最適合的 AAVS 信用卡</p>
          <Link href="/?category=transport">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50">
              使用計算機 <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

