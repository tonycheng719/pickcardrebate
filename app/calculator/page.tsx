"use client";

import { CreditCardCalculator } from "@/components/credit-card-calculator";

export default function CalculatorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-600 to-emerald-700 pb-24">
      <div className="max-w-3xl mx-auto px-4 py-10 text-white">
        <p className="text-sm uppercase tracking-widest flex items-center gap-2">🇭🇰 Beta 1.0</p>
        <h1 className="text-3xl font-bold mt-2">信用卡回贈計算機</h1>
        <p className="text-white/80 mt-2 text-sm">選擇商戶 → 輸入金額 → 即刻知道哪張卡最抵！</p>
      </div>

      <div className="max-w-3xl mx-auto px-4">
        <CreditCardCalculator showIntro={false} />
      </div>
    </div>
  );
}

