"use client";

import React from "react";
import Link from "next/link";
import { Calendar, CreditCard, TrendingUp, Clock, CheckCircle, AlertTriangle, ExternalLink } from "lucide-react";

export const beaRewardExtensionFaqData = [
  {
    question: "BEA GOAL 信用卡嘅額外獎分推廣延長到幾時？",
    answer: "BEA GOAL 信用卡嘅額外獎分推廣已延長至 2026 年 6 月 30 日。手機支付 11X (4.4%)、網上簽賬 10X (4%)、食肆/海外 5X (2%) 嘅回贈維持不變。"
  },
  {
    question: "BEA i-Titanium 卡嘅推廣期延長到幾時？",
    answer: "BEA i-Titanium 信用卡嘅額外獎分推廣已延長至 2026 年 12 月 31 日。網上/手機支付/海外簽賬 10X (4%)、食肆 5X (2%) 嘅回贈維持不變，每月回贈上限 $300。"
  },
  {
    question: "BEA Flyer World Mastercard 嘅里數回贈有冇改變？",
    answer: "冇改變！BEA Flyer World Mastercard 嘅額外里數推廣延長至 2026 年 6 月 30 日，海外簽賬 $2.5/里 (4.8%)、本地食肆 $5/里 (2.4%) 維持不變。"
  },
  {
    question: "東亞銀聯卡嘅推廣有冇續期？",
    answer: "有！BEA 銀聯雙幣鑽石卡及白金卡嘅額外獎分推廣都延長至 2026 年 12 月 31 日，本地食肆 3X (1.2%)、本地零售 2X (0.8%) 維持不變。"
  },
  {
    question: "回贈上限有冇改變？",
    answer: "所有卡嘅回贈上限維持不變。例如 GOAL 卡手機支付/網購每月回贈上限仍然係 $200，i-Titanium 卡每月回贈上限仍然係 $300。"
  }
];

export default function BeaRewardExtension2026Guide() {
  const cards = [
    {
      name: "BEA GOAL 信用卡",
      id: "bea-goal",
      oldDate: "2025-12-31",
      newDate: "2026-06-30",
      highlights: ["手機支付 11X (4.4%)", "網上簽賬 10X (4%)", "食肆/海外 5X (2%)", "月簽 $2,000 要求", "每月回贈上限 $200"],
      color: "from-purple-500 to-purple-700"
    },
    {
      name: "BEA Flyer World Mastercard",
      id: "bea-flyer-world",
      oldDate: "2025-12-31",
      newDate: "2026-06-30",
      highlights: ["海外簽賬 $2.5/里 (4.8%)", "本地食肆 $5/里 (2.4%)", "積分無限期", "亞洲萬里通直接入賬"],
      color: "from-sky-600 to-blue-800"
    },
    {
      name: "東亞 World Mastercard",
      id: "bea-world-mastercard",
      oldDate: "2025-12-31",
      newDate: "2026-06-30",
      highlights: ["指定類別 5%", "外幣/食肆/電子產品", "月簽 $4,000 門檻", "需 BEA Mall App 登記"],
      color: "from-amber-600 to-orange-800"
    },
    {
      name: "BEA i-Titanium 信用卡",
      id: "bea-i-titanium",
      oldDate: "2025-12-31",
      newDate: "2026-12-31",
      highlights: ["網上/手機/海外 10X (4%)", "食肆 5X (2%)", "每月回贈上限 $300", "永久免年費"],
      color: "from-gray-400 to-gray-600"
    },
    {
      name: "BEA Visa Signature 卡",
      id: "bea-visa-signature",
      oldDate: "2025-12-31",
      newDate: "2026-12-31",
      highlights: ["本地食肆 6X (2.4%)", "外幣簽賬 4X (1.6%)", "免費旅遊保障", "機場貴賓室"],
      color: "from-slate-700 to-slate-900"
    },
    {
      name: "BEA 銀聯雙幣鑽石卡",
      id: "bea-unionpay-diamond",
      oldDate: "2025-12-31",
      newDate: "2026-12-31",
      highlights: ["食肆 3X (1.2%)", "本地零售 2X (0.8%)", "免外幣手續費", "內地消費免兌換費"],
      color: "from-cyan-600 to-blue-800"
    },
    {
      name: "BEA 銀聯雙幣白金卡",
      id: "bea-unionpay-platinum",
      oldDate: "2025-12-31",
      newDate: "2026-12-31",
      highlights: ["食肆 3X (1.2%)", "本地零售 2X (0.8%)", "免外幣手續費", "低門檻申請"],
      color: "from-slate-400 to-slate-600"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-6 md:p-8 text-white">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-white/20 p-2 rounded-lg">
            <Calendar className="h-6 w-6" />
          </div>
          <span className="text-sm font-medium bg-white/20 px-3 py-1 rounded-full">
            2025年12月30日更新
          </span>
        </div>
        <h1 className="text-2xl md:text-3xl font-bold mb-3">
          東亞信用卡回贈推廣續期！📅
        </h1>
        <p className="text-white/90 text-lg">
          多張信用卡額外獎分推廣延長，GOAL 卡/World Mastercard 續期至 6 月，i-Titanium 卡續期至 12 月！
        </p>
      </div>

      {/* Quick Summary */}
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          <div>
            <h2 className="font-bold text-green-800 dark:text-green-300 text-lg mb-2">
              好消息速覽 😎
            </h2>
            <ul className="space-y-1 text-green-700 dark:text-green-400">
              <li>✅ <strong>GOAL 卡</strong>：延長至 2026 年 6 月</li>
              <li>✅ <strong>Flyer World Mastercard</strong>：延長至 2026 年 6 月</li>
              <li>✅ <strong>i-Titanium 卡</strong>：延長至 2026 年 12 月</li>
              <li>✅ <strong>Visa Signature 卡</strong>：延長至 2026 年 12 月</li>
              <li>✅ <strong>銀聯雙幣鑽石/白金卡</strong>：延長至 2026 年 12 月</li>
              <li>✅ <strong>回贈上下限維持不變</strong> 👍</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-blue-600" />
          各卡詳情
        </h2>

        <div className="grid gap-4 md:grid-cols-2">
          {cards.map((card, idx) => (
            <div key={idx} className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow">
              {/* Card Header */}
              <div className={`bg-gradient-to-r ${card.color} p-4 text-white`}>
                <h3 className="font-bold text-lg">{card.name}</h3>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-4">
                {/* Date Change */}
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="text-xs text-gray-500 dark:text-gray-400">舊到期日</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300 line-through">{card.oldDate}</div>
                  </div>
                  <div className="text-2xl">→</div>
                  <div className="text-center">
                    <div className="text-xs text-green-600 dark:text-green-400 font-medium">新到期日</div>
                    <div className="text-sm font-bold text-green-700 dark:text-green-300">{card.newDate}</div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="flex flex-wrap gap-2">
                  {card.highlights.map((highlight, hIdx) => (
                    <span key={hIdx} className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs">
                      {highlight}
                    </span>
                  ))}
                </div>

                {/* View Card Button */}
                <Link
                  href={`/cards/${card.id}`}
                  className="block w-full text-center py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors"
                >
                  查看詳情 →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Points */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          重點分析
        </h2>

        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
            <div className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">1</div>
            <div>
              <h3 className="font-bold text-purple-800 dark:text-purple-300">GOAL 卡繼續係手機支付神卡</h3>
              <p className="text-purple-700 dark:text-purple-400 text-sm mt-1">
                手機支付 4.4%、網購 4% 嘅回贈率繼續維持，喺同級卡中依然係最高之一。每月只需簽滿 $2,000 就可以享受額外回贈，門檻相當低。
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-sky-50 dark:bg-sky-900/20 rounded-lg">
            <div className="w-8 h-8 bg-sky-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">2</div>
            <div>
              <h3 className="font-bold text-sky-800 dark:text-sky-300">Flyer World 儲里數最佳選擇</h3>
              <p className="text-sky-700 dark:text-sky-400 text-sm mt-1">
                海外簽賬 $2.5/里（相當於 4.8% 回贈），係市場上儲里數最抵嘅選擇之一。食肆 $5/里 都算唔錯，適合經常外遊及食飯嘅朋友。
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div className="w-8 h-8 bg-gray-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">3</div>
            <div>
              <h3 className="font-bold text-gray-800 dark:text-gray-200">i-Titanium 適合穩定網購用家</h3>
              <p className="text-gray-700 dark:text-gray-400 text-sm mt-1">
                雖然東亞已停止接受新申請，但現有持卡人可以繼續享用 4% 網購/手機/海外回贈。每月上限 $300，即每月首 $7,500 簽賬享最高回贈。
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-cyan-50 dark:bg-cyan-900/20 rounded-lg">
            <div className="w-8 h-8 bg-cyan-600 text-white rounded-full flex items-center justify-center font-bold flex-shrink-0">4</div>
            <div>
              <h3 className="font-bold text-cyan-800 dark:text-cyan-300">銀聯卡北上消費首選</h3>
              <p className="text-cyan-700 dark:text-cyan-400 text-sm mt-1">
                東亞銀聯雙幣卡內地消費免貨幣兌換費，加上食肆 1.2%、零售 0.8% 回贈，適合經常北上消費嘅朋友。而且銀聯卡喺內地接受度極高。
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6">
        <div className="flex items-start gap-3">
          <AlertTriangle className="h-6 w-6 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <div>
            <h2 className="font-bold text-amber-800 dark:text-amber-300 text-lg mb-3">
              注意事項
            </h2>
            <ul className="space-y-2 text-amber-700 dark:text-amber-400 text-sm">
              <li>⚠️ <strong>月簽要求</strong>：GOAL 卡需每月簽滿 $2,000 先享額外回贈</li>
              <li>⚠️ <strong>不計回贈</strong>：電子錢包充值（Alipay/PayMe/WeChat Pay）、保費、透過電子網絡繳款</li>
              <li>⚠️ <strong>政府/八達通上限</strong>：八達通自動增值及政府部門簽賬每月最多 $40 回贈</li>
              <li>⚠️ <strong>i-Titanium 停止新申請</strong>：現有持卡人可繼續使用，但新客戶無法申請</li>
              <li>⚠️ <strong>超市/旅行社除外</strong>：部分卡嘅額外回贈不適用於超市及旅行社簽賬</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          <Clock className="h-5 w-5 text-blue-600" />
          推廣期時間表
        </h2>

        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <div className="text-center min-w-[100px]">
              <div className="text-2xl font-bold text-green-700 dark:text-green-300">2026/6</div>
              <div className="text-xs text-green-600 dark:text-green-400">6月30日</div>
            </div>
            <div className="flex-1">
              <div className="font-medium text-green-800 dark:text-green-200">GOAL 卡 / Flyer World Mastercard</div>
              <div className="text-sm text-green-600 dark:text-green-400">手機支付、網購、食肆、海外簽賬額外回贈</div>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="text-center min-w-[100px]">
              <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">2026/12</div>
              <div className="text-xs text-blue-600 dark:text-blue-400">12月31日</div>
            </div>
            <div className="flex-1">
              <div className="font-medium text-blue-800 dark:text-blue-200">i-Titanium / Visa Signature / 銀聯雙幣卡</div>
              <div className="text-sm text-blue-600 dark:text-blue-400">網購、食肆、海外簽賬額外回贈</div>
            </div>
          </div>
        </div>
      </div>

      {/* Source */}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4 text-center">
        <a
          href="https://www.hkbea.com/pdf/tc/credit-card/master-reward-tnc_tc.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
        >
          <ExternalLink className="h-4 w-4" />
          查看官方條款及細則 (PDF)
        </a>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl p-6 text-center text-white">
        <h2 className="text-xl font-bold mb-2">想知邊張卡最適合你？</h2>
        <p className="text-white/80 mb-4">用我哋嘅回贈計算器，即時比較各卡回贈！</p>
        <Link
          href="/"
          className="inline-block px-6 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-colors"
        >
          立即比較 →
        </Link>
      </div>
    </div>
  );
}

