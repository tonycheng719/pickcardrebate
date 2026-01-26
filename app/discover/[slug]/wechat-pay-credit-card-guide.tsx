"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Wallet, AlertTriangle, ArrowRight, Sparkles, TrendingUp,
  Globe, ShoppingBag, MapPin
} from "lucide-react";
import Link from "next/link";
import { PromoFAQ } from "@/lib/types";
import { 
  CardRecommendationBlock, 
  QuickComparisonTable,
  type CardRecommendation 
} from "@/components/card-recommendation-block";

// FAQ 數據 for Schema
export const wechatPayCreditCardFaqData: PromoFAQ[] = [
  {
    question: "WeChat Pay HK 增值有冇回贈？",
    answer: "視乎信用卡，部分卡將 WeChat Pay 增值計入電子錢包或網上簽賬類別，可享回贈。但多數卡不計回贈。",
  },
  {
    question: "WeChat Pay 消費有冇信用卡回贈？",
    answer: "用 WeChat Pay 餘額消費無信用卡回贈。但直接綁卡消費（pay with card）則視乎商戶類別。",
  },
  {
    question: "WeChat Pay 可以北上用嗎？",
    answer: "可以！WeChat Pay HK 支援內地跨境支付，直接用港幣付款，匯率按當日結算。",
  },
  {
    question: "WeChat Pay HK 同內地微信支付有咩分別？",
    answer: "WeChat Pay HK 係香港版，用港幣；內地微信支付用人民幣。兩者錢包分開。",
  },
  {
    question: "邊張卡增值 WeChat Pay 有回贈？",
    answer: "大部分卡不計 WeChat Pay 增值回贈。建議直接綁卡消費或用其他方式增值。",
  },
];

// 使用真實的卡片 ID（對應 cards.ts）
const topCards: CardRecommendation[] = [
  {
    id: "hsbc-pulse",
    rate: "4.4%",
    cap: "內地/澳門消費",
    pros: ["內地 QR Code 4.4%", "銀聯免外幣手續費", "北上必備"],
    cons: ["需登記", "只限 QR Code/流動支付"],
    bestFor: "經常北上消費",
  },
  {
    id: "boc-chill",
    rate: "5%",
    cap: "網上簽賬",
    pros: ["網上消費 5%", "部分商戶計回贈"],
    cons: ["WeChat Pay 增值不計"],
    bestFor: "綁卡直接消費",
  },
  {
    id: "sc-smart",
    rate: "5%",
    cap: "每月首 $2,000",
    pros: ["電子錢包增值計回贈", "回贈率高"],
    cons: ["上限較低"],
    bestFor: "小額增值用戶",
  },
  {
    id: "citi-cashback",
    rate: "2%",
    cap: "無上限",
    pros: ["無上限", "穩定回贈"],
    cons: ["WeChat Pay 增值可能不計"],
    bestFor: "追求穩定用戶",
  },
];

const faqItems = [
  {
    q: "WeChat Pay HK 增值有冇回贈？",
    a: "視乎信用卡，部分卡將 WeChat Pay 增值計入電子錢包或網上簽賬類別，可享回贈。但多數卡不計回贈。",
  },
  {
    q: "WeChat Pay 消費有冇信用卡回贈？",
    a: "用 WeChat Pay 餘額消費無信用卡回贈。但直接綁卡消費（pay with card）則視乎商戶類別。",
  },
  {
    q: "WeChat Pay 可以北上用嗎？",
    a: "可以！WeChat Pay HK 支援內地跨境支付，直接用港幣付款，匯率按當日結算。",
  },
  {
    q: "WeChat Pay HK 同內地微信支付有咩分別？",
    a: "WeChat Pay HK 係香港版，用港幣；內地微信支付用人民幣。兩者錢包分開。",
  },
  {
    q: "邊張卡增值 WeChat Pay 有回贈？",
    a: "大部分卡不計 WeChat Pay 增值回贈。建議直接綁卡消費或用其他方式增值。",
  },
];

export function WeChatPayCreditCardGuide() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Wallet className="h-8 w-8" />
          <h1 className="text-2xl font-bold">2026 WeChat Pay HK 信用卡攻略</h1>
        </div>
        <p className="text-green-100 mb-4">
          WeChat Pay HK 係香港常用電子錢包之一，更可用於內地跨境消費！
          了解點樣配合信用卡賺取回贈！
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-white/20 text-white">微信支付</Badge>
          <Badge className="bg-white/20 text-white">跨境消費</Badge>
          <Badge className="bg-white/20 text-white">北上必備</Badge>
        </div>
      </div>

      {/* Important Notice */}
      <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-6 w-6 text-amber-500" />
            <div>
              <strong className="text-amber-700 dark:text-amber-400">重要提示</strong>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                大部分信用卡<strong>不計 WeChat Pay 增值回贈</strong>，建議直接綁卡消費或用銀行轉賬增值
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
        title="WeChat Pay 相關信用卡詳細比較" 
      />

      {/* Cross-border Tips */}
      <Card className="bg-green-50 dark:bg-green-900/20 border-green-200">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Globe className="h-5 w-5 text-green-500" />
            北上消費攻略
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <strong>WeChat Pay HK 跨境支付</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400">在內地商戶掃碼付款，自動以港幣結算，匯率即日計算</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <ShoppingBag className="h-5 w-5 text-green-500 mt-0.5" />
              <div>
                <strong>消費場景</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400">餐飲、便利店、的士、超市等大部分商戶支援</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <strong>注意事項</strong>
                <p className="text-sm text-gray-600 dark:text-gray-400">跨境消費用 WeChat Pay HK 餘額，無信用卡回贈</p>
              </div>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* Alternative Recommendation */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4">💡 北上消費更好選擇</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            如果經常北上消費，建議考慮以下方案賺取更高回贈：
          </p>
          <ul className="space-y-2 text-sm">
            <li>✅ <strong>HSBC Pulse 銀聯卡</strong>：內地 QR Code/流動支付 4.4% 回贈</li>
            <li>✅ <strong>中銀 Go 銀聯卡</strong>：內地消費 3% 回贈</li>
            <li>✅ <strong>雲閃付 App</strong>：直接綁定銀聯卡消費，有回贈</li>
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
      <Card className="bg-gradient-to-r from-green-500 to-emerald-600 text-white">
        <CardContent className="p-6 text-center">
          <h2 className="text-xl font-bold mb-2">計算你的電子錢包回贈</h2>
          <p className="text-green-100 mb-4">比較各電子錢包增值信用卡回贈</p>
          <Link href="/">
            <Button size="lg" className="bg-white text-green-600 hover:bg-green-50">
              使用計算機 <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

