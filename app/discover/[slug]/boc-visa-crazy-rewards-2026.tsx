"use client";

import React from "react";
import Link from "next/link";
import { 
  Calendar, CreditCard, TrendingUp, Clock, CheckCircle, 
  AlertTriangle, ExternalLink, Gift, ShoppingCart, Store, 
  Globe, Utensils, Smartphone, Plane, Sparkles, Info
} from "lucide-react";

export const bocVisaCrazyRewardsFaqData = [
  {
    question: "中銀 Visa 狂賞派幾時要登記？",
    answer: "登記期由 2026 年 1 月 1 日上午 10 時至 2 月 28 日晚上 11 時 59 分。登記名額只限首 40,000 名，先到先得！"
  },
  {
    question: "今年中銀 Visa 狂賞派有咩類別剔除咗？",
    answer: "2026 年已剔除嘅類別包括：超市、百貨公司、繳費（交稅/水電煤/電話費）。新增咗寵物生活及休閒娛樂類別。"
  },
  {
    question: "本地實體店同網上簽賬有咩分別？",
    answer: "本地實體店需每月累積簽賬滿 $5,000（單筆 ≥$500），先可享額外回贈；網上簽賬無任何簽賬下限，直接享回贈！"
  },
  {
    question: "可以用 Apple Pay / Google Pay 簽賬嗎？",
    answer: "狂賞派：透過 BoC Pay+、Apple Pay、Google Pay、Samsung Pay 付款都計，但雲閃付、AlipayHK、WeChat Pay HK 唔計。狂賞飛：雲閃付都計！"
  },
  {
    question: "狂賞派同狂賞飛可以同時登記嗎？",
    answer: "可以！狂賞派同狂賞飛係兩個獨立優惠，各有各嘅登記連結。用 Cheers VI 卡可以疊加狂賞飛 + Cheers 外幣 4% = 內地/澳門高達 10%！"
  },
  {
    question: "狂賞飛每季要簽幾多？",
    answer: "內地/澳門每季簽滿 $5,000 回贈 $300 (6%)；其他海外每季簽滿 $10,000 回贈 $300 (3%)。搭配 Cheers VI 最高可達 10%！"
  },
  {
    question: "每月最高可以賺幾多回贈？",
    answer: "狂賞派每月最高 $680，推廣期最高 $4,080。狂賞飛每季最高 $600（內地/澳門 $300 + 其他海外 $300），推廣期最高 $1,200。"
  },
  {
    question: "咩係「紅日」？",
    answer: "紅日指星期日及公眾假期。於紅日簽賬可享 5% 回贈，平日（非紅日）簽賬享 2% 回贈。只適用於狂賞派。"
  }
];

export default function BocVisaCrazyRewards2026Guide() {
  const categories = [
    { icon: "🐕", name: "寵物生活", examples: "Q-Pets、Pet Line、獸醫", isNew: true },
    { icon: "🎮", name: "休閒娛樂", examples: "Pop Mart、Namco、迪士尼", isNew: true },
    { icon: "✈️", name: "機票酒店", examples: "Agoda、Klook、Trip.com", isNew: false },
    { icon: "📱", name: "電子產品", examples: "Apple、百老滙、豐澤", isNew: false },
    { icon: "🍽️", name: "餐飲", examples: "麥當勞、大家樂、foodpanda", isNew: false },
    { icon: "🏥", name: "醫療", examples: "養和醫院、卓健醫療", isNew: false },
    { icon: "💎", name: "珠寶服飾", examples: "周生生、Nike、Adidas", isNew: false },
  ];

  const physicalStoreDetails = {
    requirement: "月簽 $5,000 + 單筆 ≥$500",
    weekday: { rate: "2%", monthCap: "$120", periodCap: "$720", spendCap: "$6,000" },
    holiday: { rate: "5%", monthCap: "$300", periodCap: "$1,800", spendCap: "$6,000" },
  };

  const onlineDetails = {
    requirement: "無最低簽賬要求",
    weekday: { rate: "2%", monthCap: "$60", periodCap: "$360", spendCap: "$3,000" },
    holiday: { rate: "5%", monthCap: "$200", periodCap: "$1,200", spendCap: "$4,000" },
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-pink-500 rounded-2xl p-6 md:p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white/20 p-2 rounded-lg">
            <Sparkles className="h-6 w-6" />
          </div>
          <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
            2026年1月更新
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-3">
          中銀 Visa 狂賞派 + 狂賞飛 完全攻略 🔥✈️
        </h1>
        <p className="text-white/90 text-lg">
          狂賞派：7大類別高達 5%！狂賞飛：內地/澳門高達 6%，搭 Cheers VI 最高 10%！
        </p>
      </div>

      {/* Quick Summary */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            <h3 className="font-bold text-green-800 dark:text-green-300">2026 年新增 ✨</h3>
          </div>
          <ul className="space-y-1 text-green-700 dark:text-green-400 text-sm">
            <li>✅ 🐕 寵物生活（寵物店/獸醫）</li>
            <li>✅ 🎮 休閒娛樂（遊戲/主題公園）</li>
          </ul>
        </div>
        
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
            <h3 className="font-bold text-red-800 dark:text-red-300">2026 年剔除 ❌</h3>
          </div>
          <ul className="space-y-1 text-red-700 dark:text-red-400 text-sm">
            <li>❌ 🛒 超市/百貨公司</li>
            <li>❌ 💳 繳費（交稅/水電煤/電話費）</li>
          </ul>
        </div>
      </div>

      {/* Registration Alert */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-400 dark:border-amber-600 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <Calendar className="h-6 w-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h2 className="font-bold text-amber-800 dark:text-amber-300 text-lg mb-2">
              ⏰ 記得登記！名額有限！
            </h2>
            <div className="grid gap-2 text-amber-700 dark:text-amber-400 text-sm">
              <div><strong>登記期：</strong>2026年1月1日 10:00 - 2月28日 23:59</div>
              <div><strong>名額：</strong>首 40,000 名，先到先得</div>
              <div><strong>推廣期：</strong>2026年1月1日 - 6月30日</div>
            </div>
            <a
              href="https://iservice.boccc.com.hk/LDPRegistrationWEB/w-verify.jsp?lang=zh_HK&action=register&campaignid=rewards2601"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors font-medium"
            >
              <ExternalLink className="h-4 w-4" />
              立即登記
            </a>
          </div>
        </div>
      </div>

      {/* 7 Categories */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          <Gift className="h-5 w-5 text-red-600" />
          7大指定簽賬類別
        </h2>
        
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, idx) => (
            <div 
              key={idx} 
              className={`p-4 rounded-lg border-2 ${
                cat.isNew 
                  ? "border-green-400 bg-green-50 dark:bg-green-900/20" 
                  : "border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{cat.icon}</span>
                <span className="font-bold text-gray-800 dark:text-gray-200">{cat.name}</span>
                {cat.isNew && (
                  <span className="px-2 py-0.5 bg-green-500 text-white text-xs rounded-full">NEW</span>
                )}
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">{cat.examples}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Offer 1: Physical Store */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-4 text-white">
          <div className="flex items-center gap-2">
            <Store className="h-6 w-6" />
            <h2 className="text-xl font-bold">優惠 1：本地實體店簽賬</h2>
          </div>
          <p className="text-purple-100 text-sm mt-1">需月簽 $5,000 + 單筆 ≥$500</p>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2 p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
            <Info className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            <span className="text-sm text-amber-800 dark:text-amber-300">
              每月累積本地實體店簽賬滿 <strong>$5,000</strong>（只計算單筆 ≥$500），當中 7 大類別簽賬可享額外回贈
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="px-4 py-3 text-left">日子</th>
                  <th className="px-4 py-3 text-center">回贈</th>
                  <th className="px-4 py-3 text-center">每月上限</th>
                  <th className="px-4 py-3 text-center">即簽</th>
                  <th className="px-4 py-3 text-center">推廣期上限</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-gray-700">
                  <td className="px-4 py-3 font-medium">平日（非紅日）</td>
                  <td className="px-4 py-3 text-center text-purple-600 dark:text-purple-400 font-bold">2%</td>
                  <td className="px-4 py-3 text-center">$120</td>
                  <td className="px-4 py-3 text-center text-gray-500">$6,000</td>
                  <td className="px-4 py-3 text-center">$720</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">🔴 紅日（日/假期）</td>
                  <td className="px-4 py-3 text-center text-red-600 dark:text-red-400 font-bold">5%</td>
                  <td className="px-4 py-3 text-center">$300</td>
                  <td className="px-4 py-3 text-center text-gray-500">$6,000</td>
                  <td className="px-4 py-3 text-center">$1,800</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <h4 className="font-bold text-purple-800 dark:text-purple-300 mb-2">💡 可雙食疊加</h4>
            <ul className="text-sm text-purple-700 dark:text-purple-400 space-y-1">
              <li>✅ <strong>SOGO 卡</strong>：手機付款優惠</li>
              <li>✅ <strong>Cheers 卡</strong>：餐飲額外回贈</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Offer 2: Online */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-4 text-white">
          <div className="flex items-center gap-2">
            <Globe className="h-6 w-6" />
            <h2 className="text-xl font-bold">優惠 2：網上簽賬</h2>
          </div>
          <p className="text-blue-100 text-sm mt-1">無最低簽賬要求 🔥</p>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2 p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
            <span className="text-sm text-green-800 dark:text-green-300">
              網上簽賬 <strong>無任何簽賬下限</strong>！簽幾多都有回贈！
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="px-4 py-3 text-left">日子</th>
                  <th className="px-4 py-3 text-center">回贈</th>
                  <th className="px-4 py-3 text-center">每月上限</th>
                  <th className="px-4 py-3 text-center">即簽</th>
                  <th className="px-4 py-3 text-center">推廣期上限</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-gray-700">
                  <td className="px-4 py-3 font-medium">平日（非紅日）</td>
                  <td className="px-4 py-3 text-center text-blue-600 dark:text-blue-400 font-bold">2%</td>
                  <td className="px-4 py-3 text-center">$60</td>
                  <td className="px-4 py-3 text-center text-gray-500">$3,000</td>
                  <td className="px-4 py-3 text-center">$360</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">🔴 紅日（日/假期）</td>
                  <td className="px-4 py-3 text-center text-red-600 dark:text-red-400 font-bold">5%</td>
                  <td className="px-4 py-3 text-center">$200</td>
                  <td className="px-4 py-3 text-center text-gray-500">$4,000</td>
                  <td className="px-4 py-3 text-center">$1,200</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">💡 可雙食疊加</h4>
            <ul className="text-sm text-blue-700 dark:text-blue-400 space-y-1">
              <li>✅ <strong>SOGO 卡</strong>：手機付款優惠</li>
              <li>✅ <strong>Cheers 卡</strong>：餐飲額外回贈 + 海外網購優惠</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Total Rewards */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl p-6 text-white">
        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="h-6 w-6" />
          回贈上限總覽
        </h2>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-white/20 rounded-lg p-4">
            <div className="text-4xl font-bold mb-1">$680</div>
            <div className="text-white/80">每月最高回贈</div>
            <div className="text-xs text-white/60 mt-2">
              = 實體店$120+$300 + 網上$60+$200
            </div>
          </div>
          <div className="bg-white/20 rounded-lg p-4">
            <div className="text-4xl font-bold mb-1">$4,080</div>
            <div className="text-white/80">推廣期最高回贈</div>
            <div className="text-xs text-white/60 mt-2">
              = 6 個月 x $680
            </div>
          </div>
        </div>
      </div>

      {/* Payment Methods */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          <Smartphone className="h-5 w-5 text-blue-600" />
          付款方式
        </h2>
        
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <h3 className="font-bold text-green-700 dark:text-green-400 mb-2">✅ 可以計</h3>
            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>✅ 實體卡簽賬</li>
              <li>✅ BoC Pay+</li>
              <li>✅ Apple Pay</li>
              <li>✅ Google Pay</li>
              <li>✅ Samsung Pay</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-red-700 dark:text-red-400 mb-2">❌ 唔計</h3>
            <ul className="space-y-1 text-sm text-gray-700 dark:text-gray-300">
              <li>❌ AlipayHK</li>
              <li>❌ WeChat Pay HK</li>
              <li>❌ 雲閃付 App</li>
              <li>❌ Huawei Pay</li>
              <li>❌ 八達通增值</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Strategy Tips */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-purple-600" />
          識玩攻略
        </h2>

        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <div className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
            <div>
              <h3 className="font-bold text-red-800 dark:text-red-300">紅日簽賬最著數</h3>
              <p className="text-red-700 dark:text-red-400 text-sm mt-1">
                星期日/公眾假期簽賬可享 5% 回贈，平日只有 2%。記得集中喺紅日消費！
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
            <div>
              <h3 className="font-bold text-blue-800 dark:text-blue-300">網上簽賬無門檻</h3>
              <p className="text-blue-700 dark:text-blue-400 text-sm mt-1">
                網上簽賬唔使滿足月簽 $5,000，直接簽就有回贈！最適合 Agoda、Klook、Trip.com 訂酒店機票。
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
            <div>
              <h3 className="font-bold text-purple-800 dark:text-purple-300">疊加其他中銀卡優惠</h3>
              <p className="text-purple-700 dark:text-purple-400 text-sm mt-1">
                SOGO 卡可疊加手機付款優惠，Cheers 卡可疊加餐飲/海外優惠，雙重回贈！
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
            <div>
              <h3 className="font-bold text-green-800 dark:text-green-300">新增寵物/娛樂要把握</h3>
              <p className="text-green-700 dark:text-green-400 text-sm mt-1">
                今年新增寵物生活及休閒娛樂類別，買 Pop Mart、去迪士尼都有回贈！
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Cards */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-blue-600" />
          適用信用卡
        </h2>
        
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { name: "BOC SOGO Visa Signature", id: "boc-sogo", tip: "可疊加手機付款優惠" },
            { name: "BOC Cheers Visa Infinite", id: "boc-cheers", tip: "可疊加餐飲/海外優惠" },
            { name: "BOC Cheers Visa Signature", id: "boc-cheers-signature", tip: "可疊加餐飲優惠" },
          ].map((card, idx) => (
            <Link
              key={idx}
              href={`/cards/${card.id}`}
              className="block p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="font-medium text-gray-800 dark:text-gray-200 mb-1">{card.name}</div>
              <div className="text-xs text-blue-600 dark:text-blue-400">{card.tip}</div>
            </Link>
          ))}
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <h2 className="font-bold text-red-800 dark:text-red-300 text-lg mb-3">
              ⚠️ 重要注意事項
            </h2>
            <ul className="space-y-2 text-red-700 dark:text-red-400 text-sm">
              <li>❌ <strong>唔計類別</strong>：超市、百貨公司、繳費（交稅/水電煤）、八達通增值、電子錢包充值</li>
              <li>❌ <strong>唔計付款</strong>：AlipayHK、WeChat Pay HK、雲閃付、Huawei Pay</li>
              <li>⚠️ <strong>實體店門檻</strong>：需月簽 $5,000 + 單筆 ≥$500 才有回贈</li>
              <li>⚠️ <strong>登記名額</strong>：只限首 40,000 名，記得盡早登記！</li>
              <li>⚠️ <strong>餐飲除外</strong>：酒店/百貨/俱樂部/會所內餐飲唔計</li>
              <li>⚠️ <strong>回贈入賬</strong>：每月結束後約 3 個月內入賬</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 狂賞飛 Section */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border-2 border-sky-400 dark:border-sky-600 overflow-hidden">
        <div className="bg-gradient-to-r from-sky-600 to-blue-700 p-4 text-white">
          <div className="flex items-center gap-2">
            <Plane className="h-6 w-6" />
            <h2 className="text-xl font-bold">狂賞飛：海外簽賬高達 6% 回贈！✈️</h2>
          </div>
          <p className="text-sky-100 text-sm mt-1">搭配 Cheers VI 最高 10%！</p>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-2 p-3 bg-sky-100 dark:bg-sky-900/30 rounded-lg">
            <Info className="h-5 w-5 text-sky-600 dark:text-sky-400" />
            <span className="text-sm text-sky-800 dark:text-sky-300">
              <strong>狂賞飛</strong>同<strong>狂賞派</strong>係兩個獨立優惠，各有各嘅登記連結！
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700">
                  <th className="px-4 py-3 text-left">地區</th>
                  <th className="px-4 py-3 text-center">每季累積簽</th>
                  <th className="px-4 py-3 text-center">回贈</th>
                  <th className="px-4 py-3 text-center">每季上限</th>
                  <th className="px-4 py-3 text-center">疊加 Cheers VI</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b dark:border-gray-700 bg-sky-50 dark:bg-sky-900/20">
                  <td className="px-4 py-3 font-medium">🇨🇳🇲🇴 內地/澳門</td>
                  <td className="px-4 py-3 text-center">$5,000</td>
                  <td className="px-4 py-3 text-center text-sky-600 dark:text-sky-400 font-bold">6% ($300)</td>
                  <td className="px-4 py-3 text-center">$300</td>
                  <td className="px-4 py-3 text-center text-green-600 dark:text-green-400 font-bold">10% 🔥</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">🌍 其他海外</td>
                  <td className="px-4 py-3 text-center">$10,000</td>
                  <td className="px-4 py-3 text-center text-blue-600 dark:text-blue-400 font-bold">3% ($300)</td>
                  <td className="px-4 py-3 text-center">$300</td>
                  <td className="px-4 py-3 text-center text-green-600 dark:text-green-400 font-bold">7%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h4 className="font-bold text-green-800 dark:text-green-300 mb-2">✅ 狂賞飛可以計</h4>
              <ul className="text-sm text-green-700 dark:text-green-400 space-y-1">
                <li>✅ 實體卡簽賬</li>
                <li>✅ Apple Pay / Google Pay</li>
                <li>✅ <strong>雲閃付 App</strong>（狂賞派唔計，但狂賞飛計！）</li>
                <li>✅ BoC Pay+</li>
              </ul>
            </div>
            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <h4 className="font-bold text-red-800 dark:text-red-300 mb-2">❌ 狂賞飛唔計</h4>
              <ul className="text-sm text-red-700 dark:text-red-400 space-y-1">
                <li>❌ AlipayHK / WeChat Pay HK</li>
                <li>❌ <strong>網上簽賬</strong>（只限實體店！）</li>
                <li>❌ 繳費、保險、八達通增值</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
            <h4 className="font-bold text-amber-800 dark:text-amber-300 mb-2">⏰ 狂賞飛登記資訊</h4>
            <ul className="text-sm text-amber-700 dark:text-amber-400 space-y-1">
              <li>📅 推廣期：2026/1/1 - 6/30（分 2 季）</li>
              <li>🕐 登記期：2026/1/1 10:00 - 2/28 23:59</li>
              <li>👥 名額：首 30,000 名（狂賞派係 40,000）</li>
            </ul>
            <a
              href="https://iservice.boccc.com.hk/LDPRegistrationWEB/w-verify.jsp?lang=zh_HK&action=register&campaignid=fly2601"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors font-medium"
            >
              <ExternalLink className="h-4 w-4" />
              立即登記狂賞飛
            </a>
          </div>
        </div>
      </div>

      {/* Holiday Calendar */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-red-600" />
          狂賞派紅日一覽
        </h2>
        
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { month: "1月", dates: "1, 4, 11, 18, 25, 29-31" },
            { month: "2月", dates: "1, 8, 15, 17-19, 22" },
            { month: "3月", dates: "1, 8, 15, 22, 29" },
            { month: "4月", dates: "3-7, 12, 19, 26" },
            { month: "5月", dates: "1, 3, 10, 17, 24-25, 31" },
            { month: "6月", dates: "7, 14, 19, 21, 28" },
          ].map((m, idx) => (
            <div key={idx} className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="font-bold text-red-800 dark:text-red-300 mb-1">{m.month}</div>
              <div className="text-sm text-red-600 dark:text-red-400">{m.dates}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
          紅日 = 星期日 + 公眾假期（以香港政府憲報公布為準）
        </p>
      </div>

      {/* Source */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 text-center">
        <a
          href="https://www.bochk.com/tc/creditcard/promotions/offers/ms_1h26v.html"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
        >
          <ExternalLink className="h-4 w-4" />
          查看官方條款及細則
        </a>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-red-600 to-pink-500 rounded-xl p-6 text-center text-white">
        <h2 className="text-xl font-bold mb-2">想知邊張卡最適合你？</h2>
        <p className="text-white/80 mb-4">用我哋嘅回贈計算器，即時比較各卡回贈！</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-white text-red-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
        >
          立即比較 →
        </Link>
      </div>
    </div>
  );
}

