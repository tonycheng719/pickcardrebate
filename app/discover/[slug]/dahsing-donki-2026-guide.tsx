"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, Calendar, Gift, CreditCard, MapPin, 
  Lightbulb, FileText, MessageCircle, ArrowRight, CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { 
  CardRecommendationBlock, 
  QuickComparisonTable,
  type CardRecommendation 
} from "@/components/card-recommendation-block";

// 大新 DONKI 優惠適用的信用卡
const dahsingCards: CardRecommendation[] = [
  {
    id: "dahsing-one",
    rate: "7.67%",
    cap: "DONKI 6.67% + 基本 1%",
    pros: ["合計回贈最高", "所有簽賬 1% 無上限"],
    cons: ["需要 WhatsApp 登記"],
    bestFor: "追求最高回贈用戶",
  },
  {
    id: "dahsing-myauto",
    rate: "7.67%",
    cap: "DONKI 6.67% + 基本 1%",
    pros: ["車主專享優惠", "油站/汽車相關 4%"],
    cons: ["需要 WhatsApp 登記"],
    bestFor: "車主用戶",
  },
  {
    id: "dahsing-ba",
    rate: "6.67%",
    cap: "DONKI 優惠",
    pros: ["可賺 Avios 里數", "生日雙倍積分"],
    cons: ["里數卡不計現金回贈"],
    bestFor: "英航 Avios 儲里用戶",
  },
  {
    id: "dahsing-united",
    rate: "6.67%",
    cap: "DONKI 優惠",
    pros: ["可賺聯合航空里數", "貴賓室通行證"],
    cons: ["里數卡不計現金回贈"],
    bestFor: "聯合航空儲里用戶",
  },
];

// DONKI 門市地址
const donkiStores = [
  { area: "中環", address: "皇后大道中 100 號 LG 及地庫" },
  { area: "銅鑼灣", address: "百德新街 22-36 號名珠城 1 至 4 樓" },
  { area: "黃埔", address: "黃埔天地時尚坊第二期 B1-B8 & B27-B32 號舖" },
  { area: "尖沙咀", address: "美麗華廣場 2 期地庫 B161, 163 & B165-173 號舗" },
  { area: "九龍灣", address: "淘大商場第 3 期一樓 F188-204 號舖" },
  { area: "鑽石山", address: "荷里活廣場一樓 101 號舗" },
  { area: "旺角", address: "奶路臣街 11 號及砵蘭街 240-244 號文華商場 2樓 2A 舖" },
  { area: "屯門", address: "屯門市廣場一期 UG 樓 UG001-UG023 號舖" },
  { area: "將軍澳", address: "Monterey Place 1 樓 107-113, 115-122 號舖" },
  { area: "荃灣", address: "海之戀商場 2 樓 2001 號舖" },
];

export default function DahsingDonki2026Guide() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-4">
          <ShoppingCart className="h-8 w-8" />
          <h1 className="text-2xl font-bold">大新信用卡 DONKI 優惠</h1>
        </div>
        <p className="text-red-100 mb-4">
          憑大新信用卡於香港 DON DON DONKI 門市購物，單一簽賬滿 $300 即享 $20 現金回贈！
          每人最多享 5 次，最高 $100 回贈！
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge className="bg-white/20 text-white">6.67% 回贈</Badge>
          <Badge className="bg-white/20 text-white">最高 $100</Badge>
          <Badge className="bg-white/20 text-white">需 WhatsApp 登記</Badge>
        </div>
      </div>

      {/* 推廣期 */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            推廣期
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
              <div className="text-sm text-gray-500 mb-1">推廣期</div>
              <div className="font-bold">2026年2月6日 至 4月8日</div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-xl">
              <div className="text-sm text-gray-500 mb-1">回贈入賬</div>
              <div className="font-bold">2026年7月或之前</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 優惠詳情 */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Gift className="h-5 w-5 text-amber-500" />
            優惠詳情
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-amber-600">$300</div>
              <div className="text-sm text-gray-600">最低簽賬</div>
            </div>
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-green-600">$20</div>
              <div className="text-sm text-gray-600">每次回贈</div>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-blue-600">5 次</div>
              <div className="text-sm text-gray-600">每人上限</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-xl text-center">
              <div className="text-2xl font-bold text-purple-600">$100</div>
              <div className="text-sm text-gray-600">最高回贈</div>
            </div>
          </div>
          <div className="mt-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-xl">
            <p className="text-green-700 dark:text-green-300">
              💡 簽 $300 回 $20 = <strong>6.67% 回贈</strong>！配合大新 ONE+ 卡基本 1% 回贈，總共可達 <strong>7.67%</strong>！
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 適用信用卡 - 使用組件顯示封面圖 */}
      <CardRecommendationBlock 
        cards={dahsingCards} 
        title="適用信用卡" 
      />

      {/* 登記方法 */}
      <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-blue-500" />
            登記方法
          </h2>
          <ol className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <div>WhatsApp 傳送訊息至大新銀行官方賬戶 <strong>2808 5533</strong></div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">2</span>
              <div>按指示完成登記</div>
            </li>
            <li className="flex items-start gap-3">
              <span className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm font-bold shrink-0">3</span>
              <div>成功登記後即可享優惠</div>
            </li>
          </ol>
          <div className="mt-4 p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
            <p className="text-amber-800 dark:text-amber-200 text-sm">
              ⚠️ <strong>名額限制</strong>：優惠只適用於首 <strong>5,000 名</strong>成功登記之客戶，先到先得，額滿即止！
            </p>
          </div>
        </CardContent>
      </Card>

      {/* DONKI 門市地址 */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <MapPin className="h-5 w-5 text-red-500" />
            DON DON DONKI 門市地址
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {donkiStores.map((store, i) => (
              <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <Badge variant="outline" className="shrink-0">{store.area}</Badge>
                <span className="text-sm text-gray-600 dark:text-gray-300">{store.address}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 識玩攻略 */}
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20">
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-purple-500" />
            識玩攻略
          </h2>
          
          <div className="space-y-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
              <h3 className="font-bold mb-2">1. 拆單玩盡 5 次！</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                每次買滿 $300 就結賬，分開 5 單最著數！
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b dark:border-gray-700">
                      <th className="text-left py-2">次數</th>
                      <th className="text-right py-2">簽賬</th>
                      <th className="text-right py-2">回贈</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5].map(i => (
                      <tr key={i} className="border-b dark:border-gray-700">
                        <td className="py-2">第 {i} 次</td>
                        <td className="text-right py-2">$300</td>
                        <td className="text-right py-2">$20</td>
                      </tr>
                    ))}
                    <tr className="font-bold">
                      <td className="py-2">合計</td>
                      <td className="text-right py-2">$1,500</td>
                      <td className="text-right py-2 text-green-600">$100</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl">
              <h3 className="font-bold mb-2">2. 建議用大新 ONE+</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                大新 ONE+ 所有簽賬都有 1% 無上限回贈，配合 DONKI 優惠：
              </p>
              <ul className="mt-2 space-y-1">
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  DONKI 優惠：6.67%
                </li>
                <li className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ONE+ 基本：1%
                </li>
                <li className="flex items-center gap-2 text-sm font-bold text-green-600">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                  合計：7.67% 🔥
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 條款重點 */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <FileText className="h-5 w-5 text-gray-500" />
            條款及細則重點
          </h2>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
            <li className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              每位合資格信用卡主卡客戶憑其名下所有合資格信用卡（包括主卡及附屬卡）於整個推廣期內作合資格簽賬，合共最高可享 <strong>$100</strong> 現金回贈
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              憑合資格信用卡附屬卡所獲享之現金回贈將合併於主卡賬戶內
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              回贈將以<strong>免找數簽賬額</strong>形式存入，用以扣減新簽賬項
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              優惠只適用於首 5,000 名成功登記之客戶
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gray-400">•</span>
              登記須使用本行記錄之主卡持卡人有效流動電話號碼
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* CTA */}
      <Card className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
        <CardContent className="p-6 text-center">
          <h2 className="text-xl font-bold mb-2">即刻 WhatsApp 登記！</h2>
          <p className="text-red-100 mb-4">名額有限，先到先得！</p>
          <a href="https://wa.me/85228085533" target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-white text-red-600 hover:bg-red-50">
              WhatsApp 登記 <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </a>
        </CardContent>
      </Card>

      <p className="text-sm text-gray-500 text-center">📅 2026年2月6日更新</p>
    </div>
  );
}

