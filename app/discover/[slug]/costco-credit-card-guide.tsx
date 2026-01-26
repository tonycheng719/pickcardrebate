"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, AlertTriangle, ArrowRight, Sparkles, TrendingUp,
  CreditCard, Ban, CheckCircle
} from "lucide-react";
import Link from "next/link";
import { PromoFAQ } from "@/lib/types";
import { 
  CardRecommendationBlock, 
  QuickComparisonTable,
  type CardRecommendation 
} from "@/components/card-recommendation-block";

// FAQ 數據 for Schema
export const costcoCreditCardFaqData: PromoFAQ[] = [
  {
    question: "Costco 收咩信用卡？",
    answer: "Costco 香港只接受 Visa 及 Mastercard，不接受 AMEX、銀聯、JCB。",
  },
  {
    question: "Costco 用邊張信用卡最抵？",
    answer: "渣打 Smart 5%（上限$2,000）、恒生 enJoy 2%、HSBC Red 0.4% 都適用。",
  },
  {
    question: "Costco 會員卡可以用信用卡買嗎？",
    answer: "可以！會員費可用信用卡支付，部分卡可賺回贈。",
  },
  {
    question: "Costco 有冇信用卡優惠？",
    answer: "Costco 不定期與銀行合作推出優惠，如購物滿額贈現金券等。",
  },
  {
    question: "Costco 退貨政策係點？",
    answer: "大部分商品可無限期退貨（電子產品除外），退款會退回原信用卡。",
  },
];

// 使用真實的卡片 ID（對應 cards.ts）- 只選 Visa/Mastercard
const topCards: CardRecommendation[] = [
  {
    id: "sc-smart",
    rate: "5%",
    cap: "每月首 $2,000",
    pros: ["回贈率最高", "Mastercard 適用", "出糧戶口更優惠"],
    cons: ["上限較低", "超過上限只有 0.5%"],
    bestFor: "小額 Costco 消費",
  },
  {
    id: "hangseng-enjoy",
    rate: "2%",
    cap: "yuu 積分",
    pros: ["yuu 積分可兌換現金", "Visa 適用"],
    cons: ["需於指定商戶使用積分"],
    bestFor: "yuu 積分用戶",
  },
  {
    id: "hsbc-red",
    rate: "0.4%",
    cap: "無上限",
    pros: ["永久免年費", "Visa 適用", "穩定回贈"],
    cons: ["超市實體店只有 0.4%"],
    bestFor: "大額 Costco 消費",
  },
  {
    id: "sc-simply-cash",
    rate: "1.5%",
    cap: "無上限",
    pros: ["全面 1.5%", "Visa 適用", "無條件"],
    cons: ["回贈率一般"],
    bestFor: "追求簡單用戶",
  },
];

const faqItems = [
  {
    q: "Costco 收咩信用卡？",
    a: "Costco 香港只接受 Visa 及 Mastercard，不接受 AMEX、銀聯、JCB。",
  },
  {
    q: "Costco 用邊張信用卡最抵？",
    a: "渣打 Smart 5%（上限$2,000）、恒生 enJoy 2%、HSBC Red 0.4% 都適用。",
  },
  {
    q: "Costco 會員卡可以用信用卡買嗎？",
    a: "可以！會員費可用信用卡支付，部分卡可賺回贈。",
  },
  {
    q: "Costco 有冇信用卡優惠？",
    a: "Costco 不定期與銀行合作推出優惠，如購物滿額贈現金券等。",
  },
  {
    q: "Costco 退貨政策係點？",
    a: "大部分商品可無限期退貨（電子產品除外），退款會退回原信用卡。",
  },
];

export function CostcoCreditCardGuide() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <ShoppingCart className="h-8 w-8" />
          <h1 className="text-2xl font-bold">2026 Costco 信用卡攻略</h1>
        </div>
        <p className="text-red-100 mb-4">
          Costco 好市多香港只接受 Visa 及 Mastercard！
          揀啱信用卡可以賺取額外回贈，每次大手購物都慳到！
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-white/20 text-white">只收 Visa/MC</Badge>
          <Badge className="bg-white/20 text-white">批發價超抵</Badge>
          <Badge className="bg-white/20 text-white">最高 5% 回贈</Badge>
        </div>
      </div>

      {/* Important Notice */}
      <Card className="bg-red-50 dark:bg-red-900/20 border-red-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Ban className="h-6 w-6 text-red-500" />
            <div>
              <strong className="text-red-700 dark:text-red-400">重要提示</strong>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Costco 香港<strong>不接受 AMEX、銀聯、JCB</strong>，只收 Visa 及 Mastercard
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

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
        title="Costco 適用信用卡詳細比較" 
      />

      {/* Accepted Cards */}
      <Card className="bg-green-50 dark:bg-green-900/20 border-green-200">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-green-500" />
            Costco 接受的付款方式
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-green-600 mb-2 flex items-center gap-1">
                <CheckCircle className="h-4 w-4" /> 接受
              </h3>
              <ul className="space-y-1 text-sm">
                <li className="text-gray-600 dark:text-gray-400">✅ Visa 信用卡/扣賬卡</li>
                <li className="text-gray-600 dark:text-gray-400">✅ Mastercard 信用卡/扣賬卡</li>
                <li className="text-gray-600 dark:text-gray-400">✅ 現金</li>
                <li className="text-gray-600 dark:text-gray-400">✅ Costco Shop Card</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-red-600 mb-2 flex items-center gap-1">
                <Ban className="h-4 w-4" /> 不接受
              </h3>
              <ul className="space-y-1 text-sm">
                <li className="text-gray-600 dark:text-gray-400">❌ American Express (AMEX)</li>
                <li className="text-gray-600 dark:text-gray-400">❌ 銀聯 UnionPay</li>
                <li className="text-gray-600 dark:text-gray-400">❌ JCB</li>
                <li className="text-gray-600 dark:text-gray-400">❌ Apple Pay / Google Pay</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips */}
      <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            Costco 消費小貼士
          </h2>
          <ul className="space-y-3 text-sm">
            <li>💡 會員費 $450/年（個人）或 $900/年（高級），可用信用卡支付</li>
            <li>💡 大部分商品可無限期退貨，電子產品 90 日內可退</li>
            <li>💡 Costco 網店另有優惠，可用不同信用卡</li>
            <li>💡 油站只收 Visa/Mastercard 扣賬卡或現金</li>
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
      <Card className="bg-gradient-to-r from-red-600 to-red-700 text-white">
        <CardContent className="p-6 text-center">
          <h2 className="text-xl font-bold mb-2">計算你的 Costco 消費回贈</h2>
          <p className="text-red-100 mb-4">輸入你的預計消費金額，即時比較各卡回贈</p>
          <Link href="/?merchant=costco">
            <Button size="lg" className="bg-white text-red-600 hover:bg-red-50">
              使用計算機 <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

