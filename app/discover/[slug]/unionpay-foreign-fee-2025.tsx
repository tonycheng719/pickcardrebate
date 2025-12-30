"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Info, CheckCircle, XCircle, CreditCard, Globe, TrendingDown, ArrowRight } from "lucide-react";
import Link from "next/link";

// FAQ 資料
export const unionpayForeignFeeFaqData = [
  {
    question: "AEON 銀聯卡幾時開始收外幣手續費？",
    answer: "AEON 銀聯信用卡已開始收取 1% 外幣交易手續費，適用於所有外幣簽賬交易。"
  },
  {
    question: "銀聯卡仲有邊張免外幣手續費？",
    answer: "目前香港主要銀聯信用卡（包括 HSBC、恒生、中銀、東亞、安信等）均已收取約 1% 外幣手續費。如果想慳手續費，可以考慮使用高回贈 Visa/Mastercard。"
  },
  {
    question: "去內地簽賬應該用咩卡？",
    answer: "如果有銀行推廣優惠（如 AEON 銀聯「賞」亞洲 6%），銀聯卡扣除 1% 手續費後仍有約 5% 淨回贈，依然抵用。但如果無推廣優惠，可以考慮用高回贈 Visa/Mastercard。"
  },
  {
    question: "銀聯 QR Pay 會唔會收手續費？",
    answer: "銀聯 QR Pay 在內地使用人民幣結算時，同樣會收取外幣手續費。實際收費視乎發卡銀行政策。"
  },
  {
    question: "外幣手續費點樣計算？",
    answer: "外幣手續費通常以交易金額的百分比計算。例如 1% 手續費，消費 $1,000 就會收取 $10 手續費，連同交易金額一併記入月結單。"
  }
];

export function UnionpayForeignFeeGuide() {
  // 受影響銀聯卡列表
  const affectedCards = [
    { bank: "AEON", card: "AEON 銀聯信用卡", fee: "1%", previousFee: "0%", status: "已生效" },
    { bank: "滙豐", card: "HSBC Pulse 銀聯雙幣卡", fee: "1%", previousFee: "0%", status: "已生效" },
    { bank: "恒生", card: "恒生銀聯信用卡", fee: "1%", previousFee: "0%", status: "已生效" },
    { bank: "中銀", card: "中銀銀聯信用卡", fee: "1%", previousFee: "0%", status: "已生效" },
    { bank: "東亞", card: "BEA 銀聯信用卡", fee: "1%", previousFee: "0%", status: "已生效" },
    { bank: "安信", card: "EarnMORE 銀聯卡", fee: "1%", previousFee: "0%", status: "已生效" },
    { bank: "安信", card: "WeWa 銀聯卡", fee: "1%", previousFee: "0%", status: "已生效" },
  ];

  // 替代卡選擇
  const alternativeCards = [
    { 
      card: "AEON CARD WAKUWAKU", 
      network: "JCB",
      foreignFee: "1.95%",
      japanBonus: "日本 3%",
      netReturn: "約 1%",
      note: "日本專用首選"
    },
    { 
      card: "恒生 MMPOWER", 
      network: "Mastercard",
      foreignFee: "1.95%",
      japanBonus: "海外 6%",
      netReturn: "約 4%",
      note: "需月簽 $5,000"
    },
    { 
      card: "DBS Black World", 
      network: "Visa/MC",
      foreignFee: "1.95%",
      japanBonus: "$4/里",
      netReturn: "約 2.5%",
      note: "里數首選"
    },
    { 
      card: "渣打國泰 Mastercard", 
      network: "Mastercard",
      foreignFee: "1.95%",
      japanBonus: "$4/里",
      netReturn: "約 2.5%",
      note: "里數首選"
    },
  ];

  return (
    <div className="space-y-8">
      {/* 重要提醒 */}
      <div className="p-6 bg-amber-500/20 dark:bg-amber-900/30 border border-amber-500/50 rounded-xl">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-6 w-6 text-amber-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-bold text-amber-700 dark:text-amber-400 text-lg">⚠️ 重要通知</h3>
            <p className="text-amber-800 dark:text-amber-300 mt-2">
              AEON 銀聯信用卡已開始收取 <strong>1% 外幣交易手續費</strong>。
              配合現時市場趨勢，香港大部分銀聯卡均已收取類似手續費。
            </p>
            <p className="text-amber-700 dark:text-amber-400 text-sm mt-2">
              📅 資料來源：<a href="https://www.aeon.com.hk/tc/useful-info/fee-schedule.html" target="_blank" rel="noopener noreferrer" className="underline">AEON 官方服務收費表</a>
            </p>
          </div>
        </div>
      </div>

      {/* 受影響銀聯卡 */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-red-500" />
          受影響銀聯卡一覽
        </h2>
        <p className="text-muted-foreground mb-4">
          以下銀聯信用卡均已開始收取外幣交易手續費：
        </p>
        
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3 font-medium">發卡機構</th>
                <th className="text-left p-3 font-medium">卡種</th>
                <th className="text-center p-3 font-medium">手續費</th>
                <th className="text-center p-3 font-medium">之前</th>
                <th className="text-center p-3 font-medium">狀態</th>
              </tr>
            </thead>
            <tbody>
              {affectedCards.map((card, index) => (
                <tr key={index} className="border-b border-muted">
                  <td className="p-3 font-medium">{card.bank}</td>
                  <td className="p-3">{card.card}</td>
                  <td className="p-3 text-center">
                    <Badge variant="destructive">{card.fee}</Badge>
                  </td>
                  <td className="p-3 text-center text-muted-foreground line-through">{card.previousFee}</td>
                  <td className="p-3 text-center">
                    <Badge variant="secondary">{card.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 影響分析 */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <TrendingDown className="h-6 w-6 text-orange-500" />
          對持卡人嘅影響
        </h2>
        
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="border-red-500/30 bg-red-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <XCircle className="h-5 w-5 text-red-500" />
                壞消息
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>• 北上消費成本增加 1%</p>
              <p>• 銀聯「免外幣手續費」優勢不再</p>
              <p>• 日本/韓國/台灣簽賬同樣受影響</p>
              <p>• 網購外幣商品都要俾手續費</p>
            </CardContent>
          </Card>

          <Card className="border-green-500/30 bg-green-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-lg">
                <CheckCircle className="h-5 w-5 text-green-500" />
                好消息
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>• 銀行推廣優惠仍然抵用</p>
              <p>• AEON「賞」亞洲 6% 扣除手續費仍有 5%</p>
              <p>• 本地消費不受影響</p>
              <p>• 可以轉用高回贈 Visa/Mastercard</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 實際例子 */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Info className="h-6 w-6 text-blue-500" />
          實際計算示範
        </h2>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">例子：內地消費 ¥1,000（約 HK$1,100）</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 rounded-lg bg-muted/50">
                <h4 className="font-bold mb-2">😢 以前（免手續費）</h4>
                <div className="space-y-1 text-sm">
                  <p>消費金額：HK$1,100</p>
                  <p>外幣手續費：$0</p>
                  <p>AEON「賞」亞洲 6%：-$66</p>
                  <p className="font-bold text-green-600 dark:text-green-400 pt-2 border-t">
                    實際成本：HK$1,034（6% 回贈）
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-lg bg-muted/50">
                <h4 className="font-bold mb-2">😐 現在（1% 手續費）</h4>
                <div className="space-y-1 text-sm">
                  <p>消費金額：HK$1,100</p>
                  <p>外幣手續費：+$11</p>
                  <p>AEON「賞」亞洲 6%：-$66</p>
                  <p className="font-bold text-amber-600 dark:text-amber-400 pt-2 border-t">
                    實際成本：HK$1,045（5% 淨回贈）
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-blue-500/10 rounded-lg text-sm">
              <p className="flex items-center gap-2">
                <Info className="h-4 w-4 text-blue-500" />
                <span>
                  結論：AEON「賞」亞洲優惠扣除 1% 手續費後仍有約 <strong>5% 淨回贈</strong>，
                  依然比大部分卡抵用！
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 替代方案 */}
      <section>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <Globe className="h-6 w-6 text-purple-500" />
          海外簽賬替代方案
        </h2>
        <p className="text-muted-foreground mb-4">
          如果無銀行推廣優惠，可以考慮以下高回贈 Visa/Mastercard：
        </p>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-3 font-medium">信用卡</th>
                <th className="text-center p-3 font-medium">卡網絡</th>
                <th className="text-center p-3 font-medium">外幣手續費</th>
                <th className="text-center p-3 font-medium">海外回贈</th>
                <th className="text-center p-3 font-medium">淨回贈</th>
                <th className="text-left p-3 font-medium">備註</th>
              </tr>
            </thead>
            <tbody>
              {alternativeCards.map((card, index) => (
                <tr key={index} className="border-b border-muted">
                  <td className="p-3 font-medium">{card.card}</td>
                  <td className="p-3 text-center">
                    <Badge variant="outline">{card.network}</Badge>
                  </td>
                  <td className="p-3 text-center text-amber-600 dark:text-amber-400">{card.foreignFee}</td>
                  <td className="p-3 text-center text-green-600 dark:text-green-400 font-medium">{card.japanBonus}</td>
                  <td className="p-3 text-center font-bold">{card.netReturn}</td>
                  <td className="p-3 text-sm text-muted-foreground">{card.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 建議策略 */}
      <section>
        <h2 className="text-2xl font-bold mb-4">💡 我哋嘅建議</h2>
        
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">🇨🇳 去內地</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p><strong>有推廣優惠時：</strong></p>
              <p>繼續用 AEON 銀聯（淨 5%）</p>
              <p className="pt-2"><strong>無推廣優惠時：</strong></p>
              <p>用 EarnMORE（淨 1%）</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">🇯🇵 去日本</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p><strong>現金回贈：</strong></p>
              <p>AEON WAKUWAKU（3%）</p>
              <p className="pt-2"><strong>儲里數：</strong></p>
              <p>DBS Black / 渣打國泰</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">🇰🇷 去韓國</CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-2">
              <p><strong>有推廣優惠時：</strong></p>
              <p>AEON 銀聯（淨 5%）🔥</p>
              <p className="pt-2"><strong>無推廣優惠時：</strong></p>
              <p>恒生 MMPOWER（淨 4%）</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="mt-8 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl border border-blue-500/20">
        <h3 className="text-xl font-bold mb-2">想知邊張卡最適合你？</h3>
        <p className="text-muted-foreground mb-4">
          用我哋嘅計算器，輸入你嘅消費習慣，即時比較各卡回贈！
        </p>
        <Link href="/">
          <Button className="gap-2">
            立即計算
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </section>
    </div>
  );
}

