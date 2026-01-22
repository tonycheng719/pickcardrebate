"use client";

import { CreditCardCalculator } from "@/components/credit-card-calculator";
import { Locale } from "@/lib/i18n/config";
import { getTranslation } from "@/lib/i18n/translations";

interface CalculatorClientProps {
  locale: Locale;
}

export default function CalculatorClient({ locale }: CalculatorClientProps) {
  const t = getTranslation(locale);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-600 to-emerald-700 pb-24">
      <div className="max-w-3xl mx-auto px-4 py-10 text-white">
        <p className="text-sm uppercase tracking-widest flex items-center gap-2">🇭🇰 Beta 1.0</p>
        <h1 className="text-3xl font-bold mt-2">{t.calculator.title}</h1>
        <p className="text-white/80 mt-2 text-sm">{t.calculator.subtitle}</p>
      </div>

      <div className="max-w-3xl mx-auto px-4">
        <CreditCardCalculator showIntro={false} />
      </div>
    </div>
  );
}


