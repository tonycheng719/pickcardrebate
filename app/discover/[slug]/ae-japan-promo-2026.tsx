"use client";

import React from "react";
import Link from "next/link";
import { Calendar, CreditCard, MapPin, Train, ShoppingBag, Store, AlertTriangle, ExternalLink, CheckCircle, Gift, Clock } from "lucide-react";

export const aeJapanPromoFaqData = [
  {
    question: "AE 日本簽賬優惠需要登記嗎？",
    answer: "需要！你必須在 Amex HK App 內登記每個優惠才能享受回贈。每個優惠只適用於首 50,000 張成功登記的 AE 信用卡。"
  },
  {
    question: "AE 日本 Donki 優惠可以享受幾多次？",
    answer: "每張已登記的 AE 卡最多可享 2 次回贈。每次簽滿 ¥20,000 可獲 HK$80，總共最多 HK$160 回贈。"
  },
  {
    question: "AE 日本 LOFT 優惠有咩限制？",
    answer: "每次簽滿 ¥10,000 可獲 HK$50，最多 2 次，總共 HK$100。但百貨公司內的 LOFT、COSME LOFT（Gransta Tokyo 店除外）及 MoMA Design Store 不適用。"
  },
  {
    question: "Osaka Metro 優惠點樣用？",
    answer: "只要用已登記的 AE 卡在 Osaka Metro 閘機拍卡入閘即可。每次簽滿 ¥1,000 可獲 HK$5，最多 2 次，總共 HK$10。注意不適用於巴士及非 Osaka Metro 營運的列車。"
  },
  {
    question: "回贈幾時入賬？",
    answer: "簽賬回贈會在合資格交易完成後 15 個工作天內，或推廣期結束後 90 天內存入你的 AE 卡賬戶。"
  },
  {
    question: "附屬卡可以享用優惠嗎？",
    answer: "附屬卡需要獨立登記才可享用優惠，其簽賬不可與主卡合併計算。"
  }
];

export default function AEJapanPromo2026Guide() {
  const promos = [
    {
      name: "日本 Donki / Don Quijote",
      icon: <ShoppingBag className="h-6 w-6" />,
      amount: "¥20,000",
      rebate: "HK$80",
      maxTimes: 2,
      maxRebate: "HK$160",
      color: "from-yellow-500 to-orange-500",
      bgLight: "bg-yellow-50 dark:bg-yellow-900/20",
      borderLight: "border-yellow-200 dark:border-yellow-800",
      textLight: "text-yellow-800 dark:text-yellow-300",
      percentage: "0.4%",
      exclusions: ["指定 Donki 及 Don Quijote 門市除外"]
    },
    {
      name: "日本 LOFT",
      icon: <Store className="h-6 w-6" />,
      amount: "¥10,000",
      rebate: "HK$50",
      maxTimes: 2,
      maxRebate: "HK$100",
      color: "from-red-500 to-pink-500",
      bgLight: "bg-red-50 dark:bg-red-900/20",
      borderLight: "border-red-200 dark:border-red-800",
      textLight: "text-red-800 dark:text-red-300",
      percentage: "0.5%",
      exclusions: ["百貨公司內 LOFT", "COSME LOFT（Gransta Tokyo 店除外）", "MoMA Design Store"]
    },
    {
      name: "Osaka Metro",
      icon: <Train className="h-6 w-6" />,
      amount: "¥1,000",
      rebate: "HK$5",
      maxTimes: 2,
      maxRebate: "HK$10",
      color: "from-blue-500 to-cyan-500",
      bgLight: "bg-blue-50 dark:bg-blue-900/20",
      borderLight: "border-blue-200 dark:border-blue-800",
      textLight: "text-blue-800 dark:text-blue-300",
      percentage: "0.5%",
      exclusions: ["巴士", "非 Osaka Metro 營運列車", "往返關西機場列車", "售票機/櫃檯購票", "IC 卡/PiTaPa 卡充值"]
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 text-8xl opacity-10">🇯🇵</div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 p-2 rounded-lg">
              <MapPin className="h-6 w-6" />
            </div>
            <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
              2026年1月29日更新
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-3">
            AE 日本簽賬優惠！🎌
          </h1>
          <p className="text-white/90 text-lg">
            日本 Donki 簽 ¥20,000 回 HK$80、LOFT 簽 ¥10,000 回 HK$50、Osaka Metro 簽 ¥1,000 回 HK$5！記得 Amex App 登記！
          </p>
        </div>
      </div>

      {/* Quick Summary */}
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <Gift className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          <div>
            <h2 className="font-bold text-green-800 dark:text-green-300 text-lg mb-2">
              優惠速覽 🎁
            </h2>
            <ul className="space-y-1 text-green-700 dark:text-green-400">
              <li>🛒 <strong>Donki</strong>：簽 ¥20,000 回 HK$80（最多2次＝HK$160）</li>
              <li>🏬 <strong>LOFT</strong>：簽 ¥10,000 回 HK$50（最多2次＝HK$100）</li>
              <li>🚇 <strong>Osaka Metro</strong>：簽 ¥1,000 回 HK$5（最多2次＝HK$10）</li>
              <li>📅 <strong>優惠期</strong>：2026年1月27日至4月12日</li>
              <li>⚠️ <strong>需登記</strong>：Amex HK App（首50,000張卡）</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Registration Reminder */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <h2 className="font-bold text-amber-800 dark:text-amber-300 text-lg mb-2">
              ⚠️ 登記先至有！
            </h2>
            <p className="text-amber-700 dark:text-amber-400">
              每個優惠都需要在 <strong>Amex HK App</strong> 內獨立登記！
              每個優惠只適用於首 <strong>50,000 張</strong>成功登記的 AE 信用卡，先到先得！
            </p>
            <p className="text-amber-700 dark:text-amber-400 mt-2 text-sm">
              📱 登記方法：打開 Amex HK App → 優惠 → 搜尋相關優惠 → 登記
            </p>
          </div>
        </div>
      </div>

      {/* Promo Cards */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-blue-600" />
          三大日本優惠詳情
        </h2>

        <div className="grid gap-6">
          {promos.map((promo, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
              {/* Promo Header */}
              <div className={`bg-gradient-to-r ${promo.color} p-4 text-white flex items-center gap-3`}>
                <div className="bg-white/20 p-2 rounded-lg">
                  {promo.icon}
                </div>
                <div>
                  <h3 className="font-bold text-lg">{promo.name}</h3>
                  <p className="text-white/80 text-sm">優惠 {idx + 1}</p>
                </div>
              </div>

              {/* Promo Body */}
              <div className="p-5 space-y-4">
                {/* Key Numbers */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className={`${promo.bgLight} rounded-lg p-3`}>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">簽賬要求</div>
                    <div className={`font-bold text-lg ${promo.textLight}`}>{promo.amount}</div>
                  </div>
                  <div className={`${promo.bgLight} rounded-lg p-3`}>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">每次回贈</div>
                    <div className={`font-bold text-lg ${promo.textLight}`}>{promo.rebate}</div>
                  </div>
                  <div className={`${promo.bgLight} rounded-lg p-3`}>
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">最高回贈</div>
                    <div className={`font-bold text-lg ${promo.textLight}`}>{promo.maxRebate}</div>
                  </div>
                </div>

                {/* Details */}
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span>每張卡最多享用 <strong>{promo.maxTimes} 次</strong>（回贈率約 {promo.percentage}）</span>
                </div>

                {/* Exclusions */}
                {promo.exclusions.length > 0 && (
                  <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-3">
                    <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-medium">❌ 不適用：</div>
                    <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                      {promo.exclusions.map((exc, eIdx) => (
                        <li key={eIdx}>• {exc}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Applicable Cards */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-blue-600" />
          適用信用卡
        </h2>
        
        <div className="space-y-3">
          <p className="text-gray-600 dark:text-gray-400">
            優惠適用於美國運通國際股份有限公司在香港簽發的美國運通卡（基本卡及附屬卡）：
          </p>
          
          <div className="grid gap-3 md:grid-cols-2">
            <Link 
              href="/cards/amex-platinum" 
              className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="w-10 h-6 bg-gradient-to-br from-gray-300 via-gray-100 to-gray-300 rounded shadow-sm flex items-center justify-center">
                <span className="text-xs font-bold text-gray-700">AE</span>
              </div>
              <span className="font-medium text-gray-700 dark:text-gray-300">美國運通白金卡</span>
            </Link>
            
            <Link 
              href="/cards/amex-blue-cash" 
              className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="w-10 h-6 bg-gradient-to-br from-blue-600 to-blue-800 rounded shadow-sm flex items-center justify-center">
                <span className="text-xs font-bold text-white">AE</span>
              </div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Amex Blue Cash 信用卡</span>
            </Link>
            
            <Link 
              href="/cards/amex-explorer" 
              className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="w-10 h-6 bg-slate-800 rounded shadow-sm flex items-center justify-center">
                <span className="text-xs font-bold text-white">AE</span>
              </div>
              <span className="font-medium text-gray-700 dark:text-gray-300">Amex Explorer</span>
            </Link>
          </div>
          
          <p className="text-sm text-amber-600 dark:text-amber-400 mt-2">
            ⚠️ 美國運通公司卡及由特許發卡公司簽發的美國運通卡<strong>不適用</strong>此優惠。
          </p>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <h2 className="font-bold text-red-800 dark:text-red-300 text-lg mb-3">
              重要注意事項
            </h2>
            <ul className="space-y-2 text-red-700 dark:text-red-400 text-sm">
              <li>⚠️ <strong>必須親身簽賬</strong>：網店交易不適用</li>
              <li>⚠️ <strong>只限日圓簽賬</strong>：外幣手續費不計入簽賬要求</li>
              <li>⚠️ <strong>附屬卡須獨立登記</strong>：簽賬不可與主卡合併</li>
              <li>⚠️ <strong>第三方支付不適用</strong>：透過第三方機構的交易不計</li>
              <li>⚠️ <strong>退款會被扣除</strong>：取消/退款交易的回贈會被撤回</li>
              <li>⚠️ <strong>名額有限</strong>：每個優惠只限首 50,000 張卡</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          <Calendar className="h-5 w-5 text-blue-600" />
          推廣期及回贈時間
        </h2>

        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-center min-w-[100px]">
              <div className="text-sm text-blue-600 dark:text-blue-400">推廣期</div>
              <div className="text-lg font-bold text-blue-700 dark:text-blue-300">1月27日</div>
              <div className="text-xs text-blue-500">至 4月12日</div>
            </div>
            <div className="flex-1 text-blue-800 dark:text-blue-200">
              所有三個優惠的推廣期相同
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-center min-w-[100px]">
              <div className="text-sm text-green-600 dark:text-green-400">回贈入賬</div>
              <div className="text-lg font-bold text-green-700 dark:text-green-300">15 日內</div>
              <div className="text-xs text-green-500">或推廣結束 90 天內</div>
            </div>
            <div className="flex-1 text-green-800 dark:text-green-200">
              簽賬回贈會自動存入卡賬戶
            </div>
          </div>
        </div>
      </div>

      {/* T&C Links */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6">
        <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-4">
          條款及細則
        </h2>
        <div className="space-y-2">
          <a
            href="https://www.americanexpress.com/content/dam/amex/zh-hk/benefits/TC/Donki_TnCs_CH.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ExternalLink className="h-4 w-4" />
            日本 Donki 優惠條款 (PDF)
          </a>
          <a
            href="https://www.americanexpress.com/content/dam/amex/zh-hk/benefits/TC/LOFT_TnCs_CH.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ExternalLink className="h-4 w-4" />
            日本 LOFT 優惠條款 (PDF)
          </a>
          <a
            href="https://www.americanexpress.com/content/dam/amex/zh-hk/benefits/TC/OsakaMetro_TnCs_CH.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            <ExternalLink className="h-4 w-4" />
            Osaka Metro 優惠條款 (PDF)
          </a>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-xl p-6 text-center text-white">
        <h2 className="text-xl font-bold mb-2">去日本前記得登記！🇯🇵</h2>
        <p className="text-white/80 mb-4">名額有限，先到先得！</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="https://www.americanexpress.com/hk/zh/network/app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
          >
            下載 Amex HK App →
          </a>
          <Link
            href="/cards"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/20 text-white font-bold rounded-lg hover:bg-white/30 transition-colors"
          >
            比較 AE 信用卡
          </Link>
        </div>
      </div>
    </div>
  );
}

