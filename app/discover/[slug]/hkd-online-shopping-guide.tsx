"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, AlertTriangle, CheckCircle2, XCircle, 
  TrendingUp, Smartphone, CreditCard, ArrowRight, Zap,
  Star, Target, Calculator
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PromoFAQ } from "@/lib/types";
import { 
  CardRecommendationBlock, 
  QuickComparisonTable,
  type CardRecommendation 
} from "@/components/card-recommendation-block";
import { useDataset } from "@/lib/admin/data-store";
import { HK_CARDS } from "@/lib/data/cards";

// 卡片圖片組件（帶連結）
function CardImageCell({ id, name }: { id: string; name: string }) {
  const { cards: dbCards } = useDataset();
  const card = dbCards.find(c => c.id === id) || HK_CARDS.find(c => c.id === id);
  
  return (
    <Link href={`/cards/${id}`} className="flex items-center gap-2 group">
      {/* 卡片圖片 */}
      <div className={`relative w-12 h-8 rounded overflow-hidden shadow-sm flex-shrink-0 ${card?.style?.bgColor || 'bg-gray-200'}`}>
        {card?.imageUrl ? (
          <Image
            src={card.imageUrl}
            alt={name}
            fill
            className="object-cover"
            sizes="48px"
            unoptimized
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center ${card?.style?.textColor || 'text-white'}`}>
            <span className="text-[8px] font-bold">{card?.bank?.slice(0, 2) || ''}</span>
          </div>
        )}
      </div>
      {/* 卡片名稱 */}
      <span className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {name}
      </span>
    </Link>
  );
}

// FAQ 數據 for Schema
export const hkdOnlineShoppingFaqData: PromoFAQ[] = [
  {
    question: "港幣網購邊張卡最抵？",
    answer: "富邦 iN VISA 白金卡 8% 回贈率最高，但需月簽滿 $1,000。如果簽唔夠門檻，AEON WAKUWAKU 無門檻 6% 係最佳選擇。"
  },
  {
    question: "點解港幣網購比外幣網購抵？",
    answer: "港幣網購無外幣手續費（1.95%），回贈率即係淨回贈。例如 8% 卡港幣網購淨袋 8%，但外幣網購只淨袋 6.05%。"
  },
  {
    question: "HKTVmall 用邊張卡最抵？",
    answer: "HKTVmall 係港幣網購，推薦富邦 iN VISA（8%）或 AEON WAKUWAKU（6% 無門檻）。"
  },
  {
    question: "麥當勞 App 用邊張卡？",
    answer: "滙豐 Red 卡！麥當勞印花獎賞 + 網上 4% 回贈，最高可達 16.5% 回贈。"
  },
  {
    question: "Netflix/Spotify 計唔計網購？",
    answer: "計！Netflix/Spotify 屬於網上簽賬。推薦渣打 Smart 卡（特約商戶 5%）或 AEON WAKUWAKU（6%）。"
  },
  {
    question: "多張卡點配合用？",
    answer: "建議順序：1. 富邦 iN（$3,290 @ 8%）→ 2. AEON WAKUWAKU（$3,333 @ 6%）→ 3. 滙豐 Red（餘額 @ 4%）。月簽 $10,000 可賺約 $600 回贈。"
  }
];

// 使用真實的卡片 ID（對應 cards.ts）
const topCards: CardRecommendation[] = [
  {
    id: "fubon-incard",
    rate: "8%",
    cap: "每月簽賬上限 $3,290",
    pros: ["網購回贈率最高", "永久免年費", "流動支付也計積分"],
    cons: ["2026年新增月簽下限 $1,000", "上限較低"],
    bestFor: "網購高回贈追求者",
  },
  {
    id: "sim-credit-card",
    rate: "8%",
    cap: "每月回贈上限 $200",
    pros: ["交通+網購雙 8%", "覆蓋範圍廣"],
    cons: ["單筆需滿 $500", "需每月簽非網購 $1,000"],
    bestFor: "交通+網購用戶",
  },
  {
    id: "aeon-wakuwaku",
    rate: "6%",
    cap: "每月簽賬上限 $3,333",
    pros: ["無入場門檻", "日本簽賬 3%", "永久免年費"],
    cons: ["回贈率較低", "多類別共用上限"],
    bestFor: "無門檻首選",
  },
  {
    id: "hsbc-red",
    rate: "4%",
    cap: "每月簽賬上限 $10,000",
    pros: ["上限最高", "指定商戶 8%", "麥當勞 16.5%"],
    cons: ["回贈率只有 4%", "部分交易不計"],
    bestFor: "高消費用戶",
  },
  {
    id: "cncbi-motion",
    rate: "6%",
    cap: "每月回贈上限 $200",
    pros: ["食肆+網購雙 6%", "適合外食族"],
    cons: ["需月簽 $3,800", "門檻較高"],
    bestFor: "外食+網購用戶",
  },
];

export function HkdOnlineShoppingGuide() {
  return (
    <div className="space-y-8">
      {/* 重點提示 */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 dark:border-blue-800">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-xl">
              <Zap className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-blue-900 dark:text-blue-100 mb-2">
                💡 港幣網購 = 回贈率即係淨回贈
              </h3>
              <p className="text-blue-700 dark:text-blue-300">
                港幣網購（HKTVmall、百佳網店、友和 YOHO 等）<strong>唔使俾外幣手續費</strong>，
                相比外幣網購要扣 1.95%，港幣網購係真正「食盡」回贈！
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 排行榜 */}
      <section>
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <span className="text-3xl">🏆</span> 2026 港幣網購回贈排行榜
        </h2>

        {/* 第一級 8% */}
        <Card className="mb-4 border-amber-200 dark:border-amber-800">
          <CardHeader className="pb-3 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-950/30 dark:to-yellow-950/30">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Badge className="bg-amber-500">🥇 第一級</Badge>
              <span className="text-amber-700 dark:text-amber-300">8% 回贈</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium">排名</th>
                    <th className="text-left py-3 px-4 font-medium">信用卡</th>
                    <th className="text-left py-3 px-4 font-medium">回贈率</th>
                    <th className="text-left py-3 px-4 font-medium">每月上限</th>
                    <th className="text-left py-3 px-4 font-medium">入場門檻</th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-gray-800">
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4"><Badge variant="outline">🥇 1</Badge></td>
                    <td className="py-3 px-4">
                      <CardImageCell id="fubon-incard" name="富邦 iN VISA 白金卡" />
                    </td>
                    <td className="py-3 px-4 text-green-600 font-bold">8%</td>
                    <td className="py-3 px-4">$3,290</td>
                    <td className="py-3 px-4">月簽 $1,000</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4"><Badge variant="outline">🥈 2</Badge></td>
                    <td className="py-3 px-4">
                      <CardImageCell id="sim-credit-card" name="sim Credit Card" />
                    </td>
                    <td className="py-3 px-4 text-green-600 font-bold">8%</td>
                    <td className="py-3 px-4">$2,500</td>
                    <td className="py-3 px-4">單筆 $500 + 月簽非網購 $1,000</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* 第二級 6% */}
        <Card className="mb-4 border-gray-200 dark:border-gray-700">
          <CardHeader className="pb-3 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-900/30 dark:to-slate-900/30">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Badge variant="secondary">🥈 第二級</Badge>
              <span className="text-gray-700 dark:text-gray-300">6% 回贈</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium">排名</th>
                    <th className="text-left py-3 px-4 font-medium">信用卡</th>
                    <th className="text-left py-3 px-4 font-medium">回贈率</th>
                    <th className="text-left py-3 px-4 font-medium">每月上限</th>
                    <th className="text-left py-3 px-4 font-medium">入場門檻</th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-gray-800">
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4"><Badge variant="outline">🥉 3</Badge></td>
                    <td className="py-3 px-4">
                      <CardImageCell id="aeon-wakuwaku" name="AEON WAKUWAKU" />
                    </td>
                    <td className="py-3 px-4 text-blue-600 font-bold">6%</td>
                    <td className="py-3 px-4">$3,333</td>
                    <td className="py-3 px-4"><Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">✅ 無門檻</Badge></td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4"><Badge variant="outline">4</Badge></td>
                    <td className="py-3 px-4">
                      <CardImageCell id="cncbi-motion" name="信銀國際 Motion" />
                    </td>
                    <td className="py-3 px-4 text-blue-600 font-bold">6%</td>
                    <td className="py-3 px-4">$3,333</td>
                    <td className="py-3 px-4">月簽 $3,800</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* 第三級 4-5% */}
        <Card className="border-gray-200 dark:border-gray-700">
          <CardHeader className="pb-3 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Badge className="bg-orange-500">🥉 第三級</Badge>
              <span className="text-orange-700 dark:text-orange-300">4-5% 回贈</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium">排名</th>
                    <th className="text-left py-3 px-4 font-medium">信用卡</th>
                    <th className="text-left py-3 px-4 font-medium">回贈率</th>
                    <th className="text-left py-3 px-4 font-medium">每月上限</th>
                    <th className="text-left py-3 px-4 font-medium">入場門檻</th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-gray-800">
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4"><Badge variant="outline">5</Badge></td>
                    <td className="py-3 px-4">
                      <CardImageCell id="hangseng-mmpower" name="恒生 MMPOWER" />
                    </td>
                    <td className="py-3 px-4 font-bold">5%</td>
                    <td className="py-3 px-4">$10,000</td>
                    <td className="py-3 px-4">月簽 $5,000</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4"><Badge variant="outline">6</Badge></td>
                    <td className="py-3 px-4">
                      <CardImageCell id="boc-chill" name="中銀 Chill Card" />
                    </td>
                    <td className="py-3 px-4 font-bold">5%</td>
                    <td className="py-3 px-4">$3,260</td>
                    <td className="py-3 px-4"><Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">✅ 無門檻</Badge></td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4"><Badge variant="outline">7</Badge></td>
                    <td className="py-3 px-4">
                      <CardImageCell id="hsbc-red" name="滙豐 Red 信用卡" />
                    </td>
                    <td className="py-3 px-4 font-bold">4%</td>
                    <td className="py-3 px-4 text-green-600 font-semibold">$10,000</td>
                    <td className="py-3 px-4"><Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">✅ 無門檻</Badge></td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4"><Badge variant="outline">8</Badge></td>
                    <td className="py-3 px-4">
                      <CardImageCell id="dbs-live-fresh" name="DBS Live Fresh" />
                    </td>
                    <td className="py-3 px-4 font-bold">4%</td>
                    <td className="py-3 px-4">$4,167</td>
                    <td className="py-3 px-4"><Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">✅ 無門檻</Badge></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 詳細卡片比較 */}
      <section>
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <span className="text-3xl">💳</span> 信用卡詳細比較
        </h2>
        <CardRecommendationBlock cards={topCards} title="" showRanking={true} />
      </section>

      {/* 攻略建議 */}
      <section>
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <span className="text-3xl">💡</span> 識玩攻略
        </h2>

        {/* 按月簽金額選卡 */}
        <Card className="mb-4">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Target className="h-5 w-5 text-blue-500" />
              按月簽金額選卡
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium">月簽金額</th>
                    <th className="text-left py-3 px-4 font-medium">推薦信用卡</th>
                    <th className="text-left py-3 px-4 font-medium">原因</th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-gray-800">
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4">&lt; $1,000</td>
                    <td className="py-3 px-4 font-medium text-blue-600">AEON WAKUWAKU</td>
                    <td className="py-3 px-4">無入場門檻，直接 6%</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4">$1,000 - $3,000</td>
                    <td className="py-3 px-4 font-medium text-blue-600">富邦 iN VISA</td>
                    <td className="py-3 px-4">8% 最高回贈</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4">$3,000 - $5,000</td>
                    <td className="py-3 px-4 font-medium text-blue-600">滙豐 Red</td>
                    <td className="py-3 px-4">上限高，無門檻 4%</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4">&gt; $5,000</td>
                    <td className="py-3 px-4 font-medium text-blue-600">恒生 MMPOWER</td>
                    <td className="py-3 px-4">5% + 上限 $500</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* 多卡配合策略 */}
        <Card className="mb-4 border-green-200 dark:border-green-800">
          <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Calculator className="h-5 w-5 text-green-500" />
              多卡配合策略（月網購 $10,000）
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium">順序</th>
                    <th className="text-left py-3 px-4 font-medium">信用卡</th>
                    <th className="text-left py-3 px-4 font-medium">簽賬金額</th>
                    <th className="text-left py-3 px-4 font-medium">回贈</th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-gray-800">
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4">1️⃣</td>
                    <td className="py-3 px-4 font-medium">富邦 iN VISA</td>
                    <td className="py-3 px-4">$3,290</td>
                    <td className="py-3 px-4 text-green-600">$263 (8%)</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4">2️⃣</td>
                    <td className="py-3 px-4 font-medium">AEON WAKUWAKU</td>
                    <td className="py-3 px-4">$3,333</td>
                    <td className="py-3 px-4 text-green-600">$200 (6%)</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4">3️⃣</td>
                    <td className="py-3 px-4 font-medium">滙豐 Red</td>
                    <td className="py-3 px-4">$3,377</td>
                    <td className="py-3 px-4 text-green-600">$135 (4%)</td>
                  </tr>
                  <tr className="bg-green-50 dark:bg-green-900/20 font-bold">
                    <td className="py-3 px-4">合計</td>
                    <td className="py-3 px-4">-</td>
                    <td className="py-3 px-4">$10,000</td>
                    <td className="py-3 px-4 text-green-600 text-lg">$598 (5.98%)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* 指定商戶優惠 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Star className="h-5 w-5 text-amber-500" />
              指定商戶額外優惠
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium">商戶</th>
                    <th className="text-left py-3 px-4 font-medium">推薦信用卡</th>
                    <th className="text-left py-3 px-4 font-medium">回贈</th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-gray-800">
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4 font-medium">🛒 HKTVmall</td>
                    <td className="py-3 px-4">AEON WAKUWAKU / 富邦 iN</td>
                    <td className="py-3 px-4 text-green-600 font-bold">6-8%</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4 font-medium">🏪 百佳網店</td>
                    <td className="py-3 px-4">渣打 Smart（特約商戶）</td>
                    <td className="py-3 px-4 text-green-600 font-bold">5%</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4 font-medium">🎬 Netflix / Spotify</td>
                    <td className="py-3 px-4">渣打 Smart（特約商戶）</td>
                    <td className="py-3 px-4 text-green-600 font-bold">5%</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50 bg-amber-50 dark:bg-amber-900/20">
                    <td className="py-3 px-4 font-medium">🍔 麥當勞 App</td>
                    <td className="py-3 px-4">滙豐 Red</td>
                    <td className="py-3 px-4 text-amber-600 font-bold text-lg">16.5% 🔥</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4 font-medium">🇯🇵 Amazon JP（港幣）</td>
                    <td className="py-3 px-4">AEON WAKUWAKU</td>
                    <td className="py-3 px-4 text-green-600 font-bold">6%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 港幣 vs 外幣比較 */}
      <section>
        <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
          <span className="text-3xl">🆚</span> 港幣網購 vs 外幣網購
        </h2>
        
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th className="text-left py-3 px-4 font-medium">項目</th>
                    <th className="text-left py-3 px-4 font-medium">港幣網購</th>
                    <th className="text-left py-3 px-4 font-medium">外幣網購</th>
                  </tr>
                </thead>
                <tbody className="divide-y dark:divide-gray-800">
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4 font-medium">外幣手續費</td>
                    <td className="py-3 px-4 text-green-600 font-bold">❌ 無</td>
                    <td className="py-3 px-4 text-red-600">⚠️ 1.95%</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4 font-medium">淨回贈計算</td>
                    <td className="py-3 px-4">回贈率即淨回贈</td>
                    <td className="py-3 px-4">回贈率 - 1.95%</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4 font-medium">例：8% 卡</td>
                    <td className="py-3 px-4 text-green-600 font-bold text-lg">淨 8%</td>
                    <td className="py-3 px-4 text-orange-600">淨 6.05%</td>
                  </tr>
                  <tr className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <td className="py-3 px-4 font-medium">推薦卡</td>
                    <td className="py-3 px-4">富邦 / AEON / 滙豐 Red</td>
                    <td className="py-3 px-4">渣打 Smart（免手續費）</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 溫馨提示 */}
      <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 dark:border-amber-800">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="p-2 bg-amber-100 dark:bg-amber-900/50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div>
              <h3 className="font-bold text-amber-900 dark:text-amber-100 mb-2">💡 溫馨提示</h3>
              <p className="text-amber-700 dark:text-amber-300 text-sm">
                網購回贈通常<strong>不計</strong>電子錢包充值（PayMe/AlipayHK/WeChat Pay）、繳費、保險等。
                詳細條款請參閱各信用卡官網。
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
