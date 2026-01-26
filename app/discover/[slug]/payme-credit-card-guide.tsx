"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Wallet, CreditCard, CheckCircle2, XCircle, 
  AlertTriangle, ArrowRight, Sparkles, TrendingUp,
  Smartphone, ShoppingCart, Gift
} from "lucide-react";
import Link from "next/link";
import { PromoFAQ } from "@/lib/types";

// FAQ 數據 for Schema
export const paymeCreditCardFaqData: PromoFAQ[] = [
  {
    question: "PayMe 增值有冇手續費？",
    answer: "用信用卡增值 PayMe 免手續費，每月上限 $3,000。銀行轉賬增值無上限且免費。",
  },
  {
    question: "PayMe 增值上限係幾多？",
    answer: "信用卡增值每月上限 $3,000；銀行轉賬增值每日上限視乎銀行，一般 $50,000-$100,000。",
  },
  {
    question: "PayMe 增值有冇回贈？",
    answer: "視乎信用卡，部分卡將 PayMe 增值計入網上簽賬或電子錢包類別，可享回贈。",
  },
  {
    question: "邊張卡 PayMe 增值最抵？",
    answer: "渣打 Smart Card 5% 最高（上限 $2,000），HSBC Red 4%（上限 $10,000）性價比最佳。",
  },
  {
    question: "PayMe 消費有冇回贈？",
    answer: "用 PayMe 餘額消費無信用卡回贈。但部分商戶有 PayMe 專屬優惠。",
  },
];

interface CardRecommendation {
  id: string;
  name: string;
  bank: string;
  rate: string;
  cap?: string;
  conditions?: string[];
  pros: string[];
  cons: string[];
  bestFor: string;
}

const topCards: CardRecommendation[] = [
  {
    id: "sc-smart",
    name: "渣打 Smart Card",
    bank: "渣打銀行",
    rate: "5%",
    cap: "每月首 $2,000 增值",
    conditions: ["需透過 SC Mobile App 綁卡"],
    pros: ["回贈率最高", "出糧戶口可享更多優惠"],
    cons: ["上限較低", "需指定 App 增值"],
    bestFor: "小額增值用戶",
  },
  {
    id: "hsbc-red",
    name: "HSBC Red Card",
    bank: "滙豐銀行",
    rate: "4%",
    cap: "每月首 $10,000 網上簽賬",
    conditions: ["計入網上簽賬類別"],
    pros: ["上限較高", "超市同享 4%"],
    cons: ["需綁定 HSBC Reward+"],
    bestFor: "中高消費用戶",
  },
  {
    id: "citi-cashback",
    name: "Citi Cash Back Card",
    bank: "Citibank",
    rate: "2%",
    cap: "無上限",
    conditions: ["PayMe 增值計入網上簽賬"],
    pros: ["無上限", "申請門檻低"],
    cons: ["回贈率較低"],
    bestFor: "追求穩定回贈用戶",
  },
  {
    id: "boc-dual-currency",
    name: "中銀雙幣卡",
    bank: "中國銀行",
    rate: "0.4%",
    conditions: ["基本回贈"],
    pros: ["無上限", "穩定"],
    cons: ["回贈率低"],
    bestFor: "大額增值用戶",
  },
];

const faqItems = [
  {
    q: "PayMe 增值有冇手續費？",
    a: "用信用卡增值 PayMe 免手續費，每月上限 $3,000。銀行轉賬增值無上限且免費。",
  },
  {
    q: "PayMe 增值上限係幾多？",
    a: "信用卡增值每月上限 $3,000；銀行轉賬增值每日上限視乎銀行，一般 $50,000-$100,000。",
  },
  {
    q: "PayMe 增值有冇回贈？",
    a: "視乎信用卡，部分卡將 PayMe 增值計入網上簽賬或電子錢包類別，可享回贈。",
  },
  {
    q: "邊張卡 PayMe 增值最抵？",
    a: "渣打 Smart Card 5% 最高（上限 $2,000），HSBC Red 4%（上限 $10,000）性價比最佳。",
  },
  {
    q: "PayMe 消費有冇回贈？",
    a: "用 PayMe 餘額消費無信用卡回贈。但部分商戶有 PayMe 專屬優惠。",
  },
];

export function PayMeCreditCardGuide() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <Wallet className="h-8 w-8" />
          <h1 className="text-2xl font-bold">2026 PayMe 信用卡增值攻略</h1>
        </div>
        <p className="text-pink-100 mb-4">
          PayMe 係香港最受歡迎嘅電子錢包之一，用信用卡增值可以賺取回贈！
          本文比較各大信用卡 PayMe 增值回贈，幫你搵出最抵組合。
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-white/20 text-white">最高 5% 回贈</Badge>
          <Badge className="bg-white/20 text-white">每月上限 $3,000</Badge>
          <Badge className="bg-white/20 text-white">免手續費</Badge>
        </div>
      </div>

      {/* Quick Summary */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-amber-500" />
            TL;DR 快速推薦
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">排名</th>
                  <th className="text-left py-2">信用卡</th>
                  <th className="text-left py-2">回贈</th>
                  <th className="text-left py-2">上限</th>
                  <th className="text-left py-2">適合</th>
                </tr>
              </thead>
              <tbody>
                {topCards.slice(0, 3).map((card, i) => (
                  <tr key={card.id} className="border-b">
                    <td className="py-3">
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-white text-xs font-bold ${
                        i === 0 ? 'bg-amber-500' : i === 1 ? 'bg-gray-400' : 'bg-amber-700'
                      }`}>
                        {i + 1}
                      </span>
                    </td>
                    <td className="py-3 font-medium">{card.name}</td>
                    <td className="py-3 text-emerald-600 font-bold">{card.rate}</td>
                    <td className="py-3 text-gray-500">{card.cap || '無上限'}</td>
                    <td className="py-3 text-gray-500">{card.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Comparison */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-blue-500" />
          PayMe 增值信用卡詳細比較
        </h2>
        
        {topCards.map((card, index) => (
          <Card key={card.id} className={index === 0 ? "border-2 border-amber-400" : ""}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {index === 0 && <Badge className="bg-amber-500">🏆 推薦</Badge>}
                    <h3 className="font-bold text-lg">{card.name}</h3>
                  </div>
                  <p className="text-sm text-gray-500">{card.bank}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-600">{card.rate}</div>
                  <div className="text-xs text-gray-500">{card.cap}</div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <h4 className="font-semibold text-sm text-green-600 mb-2 flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" /> 優點
                  </h4>
                  <ul className="space-y-1 text-sm">
                    {card.pros.map((pro, i) => (
                      <li key={i} className="text-gray-600">• {pro}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-red-600 mb-2 flex items-center gap-1">
                    <XCircle className="h-4 w-4" /> 缺點
                  </h4>
                  <ul className="space-y-1 text-sm">
                    {card.cons.map((con, i) => (
                      <li key={i} className="text-gray-600">• {con}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 flex justify-end">
                <Link href={`/cards/${card.id}`}>
                  <Button variant="outline" size="sm">
                    查看詳情 <ArrowRight className="h-4 w-4 ml-1" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tips Section */}
      <Card className="bg-amber-50 dark:bg-amber-900/20 border-amber-200">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            PayMe 增值注意事項
          </h2>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <Smartphone className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <strong>每月信用卡增值上限 $3,000</strong>
                <p className="text-sm text-gray-600">超過需用銀行轉賬，銀行轉賬無回贈</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <ShoppingCart className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <strong>部分信用卡不計回贈</strong>
                <p className="text-sm text-gray-600">如 AEON、安信等，增值前請確認</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Gift className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <strong>配合 PayMe 商戶優惠更抵</strong>
                <p className="text-sm text-gray-600">PayMe 不時有消費優惠，可疊加使用</p>
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
                <p className="text-gray-600 text-sm">A: {faq.a}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA */}
      <Card className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
        <CardContent className="p-6 text-center">
          <h2 className="text-xl font-bold mb-2">即刻計算你的最佳 PayMe 增值卡</h2>
          <p className="text-emerald-100 mb-4">輸入你的消費習慣，即時找出最高回贈信用卡</p>
          <Link href="/?merchant=payme">
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-emerald-50">
              使用計算機 <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

