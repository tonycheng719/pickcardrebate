import { Metadata } from "next";
import { Locale, locales, localePathMap } from "@/lib/i18n/config";
import { getTranslation } from "@/lib/i18n/translations";
import { Navbar } from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calculator, CreditCard, Search, BarChart3, Users, Mail, 
  Heart, Lightbulb, Target, CheckCircle
} from "lucide-react";
import Link from "next/link";

interface PageProps {
  params: Promise<{ locale: string }>;
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslation(locale as Locale);
  
  const titles: Record<Locale, string> = {
    'zh-HK': '關於我們｜PickCardRebate 香港信用卡回贈比較平台',
    'zh-CN': '关于我们｜PickCardRebate 香港信用卡回赠比较平台',
    'en': 'About Us | PickCardRebate Hong Kong Credit Card Rebate Calculator',
  };
  
  const descriptions: Record<Locale, string> = {
    'zh-HK': 'PickCardRebate 是香港首個智能信用卡回贈比較平台，收錄超過50張信用卡，幫助消費者輕鬆找出每筆消費最高回贈的信用卡！',
    'zh-CN': 'PickCardRebate 是香港首个智能信用卡回赠比较平台，收录超过50张信用卡，帮助消费者轻松找出每笔消费最高回赠的信用卡！',
    'en': 'PickCardRebate is Hong Kong\'s first smart credit card rebate comparison platform with 50+ cards!',
  };
  
  return {
    title: titles[locale as Locale] || titles['zh-HK'],
    description: descriptions[locale as Locale] || descriptions['zh-HK'],
  };
}

export default async function AboutPage({ params }: PageProps) {
  const { locale: localeParam } = await params;
  const locale = localeParam as Locale;
  const t = getTranslation(locale);
  const prefix = localePathMap[locale] ? `/${localePathMap[locale]}` : '';

  const features = [
    { icon: Calculator, title: locale === 'en' ? 'Smart Calculator' : '智能回贈計算', description: locale === 'en' ? 'Input merchant and amount, instantly calculate rebate for each card!' : '輸入商戶和金額，即時計算每張信用卡的回贈金額！' },
    { icon: CreditCard, title: locale === 'en' ? 'Card Library' : '全港信用卡庫', description: locale === 'en' ? '50+ Hong Kong credit cards from HSBC, Citi, Standard Chartered, Hang Seng, DBS.' : '收錄超過 50 張香港主流信用卡，包括 HSBC、Citi、渣打、恒生、DBS 等銀行。' },
    { icon: Search, title: locale === 'en' ? 'Merchant Search' : '商戶搜尋', description: locale === 'en' ? '500+ merchants supported with automatic category detection.' : '支援超過 500 間商戶，自動識別消費類別。' },
    { icon: BarChart3, title: locale === 'en' ? 'Compare' : '比較功能', description: locale === 'en' ? 'Compare multiple cards side by side.' : '並排比較多張信用卡的回贈、年費、迎新優惠。' },
  ];

  const values = [
    { icon: Target, title: locale === 'en' ? 'Accurate' : '精準', description: locale === 'en' ? 'Data from official bank terms.' : '根據各銀行官方條款精確計算。' },
    { icon: Lightbulb, title: locale === 'en' ? 'Practical' : '實用', description: locale === 'en' ? 'Designed for Hong Kong consumers.' : '專為香港消費者設計。' },
    { icon: Heart, title: locale === 'en' ? 'Free' : '免費', description: locale === 'en' ? 'All features completely free!' : '所有功能完全免費使用！' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-12 pb-24 md:pb-12">
        <section className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-6">
            <Users className="h-4 w-4" />
            {t.footer.about}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            {locale === 'en' ? 'Hong Kong\'s First Smart Credit Card' : '香港首個智能信用卡'}<br />
            <span className="text-blue-600 dark:text-blue-400">{locale === 'en' ? 'Rebate Comparison Platform' : '回贈比較平台'}</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            {locale === 'en' 
              ? 'We believe every consumer deserves the best rebates. PickCardRebate helps you find the best card for every purchase!' 
              : '我們相信每位消費者都值得獲得最高的回贈。PickCardRebate 透過智能計算，幫助你在每次消費前找出最抵的信用卡！'}
          </p>
        </section>

        <section className="mb-16">
          <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 border-0 text-white overflow-hidden">
            <CardContent className="p-8 md:p-12 relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{locale === 'en' ? 'Our Mission' : '我們的使命'}</h2>
                <p className="text-lg text-blue-100 leading-relaxed max-w-2xl">
                  {locale === 'en' 
                    ? 'Help every Hong Kong consumer easily find the best credit card and maximize rebates on every purchase!' 
                    : '讓每位香港消費者都能輕鬆找出最適合自己的信用卡，在日常消費中賺取最高回贈。'}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {locale === 'en' ? 'Platform Features' : '平台功能'}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl shrink-0">
                      <feature.icon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            {locale === 'en' ? 'Our Values' : '我們的價值觀'}
          </h2>
          <div className="grid grid-cols-3 gap-4">
            {values.map((value, index) => (
              <Card key={index} className="dark:bg-gray-800 dark:border-gray-700 text-center">
                <CardContent className="p-6">
                  <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-xl inline-block mb-3">
                    <value.icon className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-xs">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-500" />
                {t.footer.contact}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {locale === 'en' ? 'For any inquiries, suggestions, or corrections:' : '如有任何查詢、建議或發現資料錯誤，歡迎聯絡我們：'}
              </p>
              <a href="mailto:info@pickcardrebate.com" className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline">
                <Mail className="h-4 w-4" />
                info@pickcardrebate.com
              </a>
            </CardContent>
          </Card>
        </section>

        <section className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            {locale === 'en' ? 'Ready to maximize your rebates?' : '準備好賺盡回贈了嗎？'}
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href={`${prefix}/`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
            >
              <Calculator className="h-5 w-5" />
              {t.nav.calculator}
            </Link>
            <Link 
              href={`${prefix}/cards`}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-medium transition-colors"
            >
              <CreditCard className="h-5 w-5" />
              {t.nav.cards}
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}


