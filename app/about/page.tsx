import { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Calculator, CreditCard, Search, BarChart3, Users, Mail, 
  Shield, Heart, Lightbulb, Target, CheckCircle, ExternalLink
} from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "關於我們｜PickCardRebate 信用卡回贈計算機",
  description: "PickCardRebate 是香港首個智能信用卡回贈比較平台，幫助消費者找出每筆消費最高回贈的信用卡，讓你每次簽賬都賺盡回贈！",
  openGraph: {
    title: "關於我們｜PickCardRebate 信用卡回贈計算機",
    description: "香港首個智能信用卡回贈比較平台，幫助你找出最抵信用卡！",
    url: "https://pickcardrebate.com/about",
  },
  alternates: {
    canonical: "https://pickcardrebate.com/about",
  },
};

const features = [
  {
    icon: Calculator,
    title: "智能回贈計算",
    description: "輸入商戶和金額，即時計算每張信用卡的回贈金額，一眼睇晒邊張最抵！"
  },
  {
    icon: CreditCard,
    title: "全港信用卡庫",
    description: "收錄超過 50 張香港主流信用卡，包括 HSBC、Citi、渣打、恒生、DBS 等銀行。"
  },
  {
    icon: Search,
    title: "商戶搜尋",
    description: "支援超過 500 間商戶，自動識別消費類別，計算最準確的回贈率。"
  },
  {
    icon: BarChart3,
    title: "比較功能",
    description: "並排比較多張信用卡的回贈、年費、迎新優惠，幫你做出最明智的選擇。"
  },
];

const values = [
  {
    icon: Target,
    title: "精準",
    description: "我們根據各銀行官方條款，精確計算每張卡的回贈率，確保資料準確可靠。"
  },
  {
    icon: Lightbulb,
    title: "實用",
    description: "專為香港消費者設計，涵蓋超市、餐飲、網購、交通等日常消費場景。"
  },
  {
    icon: Heart,
    title: "免費",
    description: "所有功能完全免費使用，致力幫助每位消費者賺盡回贈！"
  },
  {
    icon: Shield,
    title: "中立",
    description: "我們不接受銀行贊助影響排名，所有推薦基於真實回贈數據。"
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      
      <main className="max-w-4xl mx-auto px-4 py-12 pb-24 md:pb-12">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium mb-6">
            <Users className="h-4 w-4" />
            關於 PickCardRebate
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            香港首個智能信用卡<br />
            <span className="text-blue-600 dark:text-blue-400">回贈比較平台</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            我們相信每位消費者都值得獲得最高的回贈。PickCardRebate 透過智能計算，
            幫助你在每次消費前找出最抵的信用卡，讓你輕鬆賺盡回贈！
          </p>
        </section>

        {/* Mission */}
        <section className="mb-16">
          <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 border-0 text-white overflow-hidden">
            <CardContent className="p-8 md:p-12 relative">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
              <div className="relative">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">我們的使命</h2>
                <p className="text-lg text-blue-100 leading-relaxed max-w-2xl">
                  讓每位香港消費者都能輕鬆找出最適合自己的信用卡，
                  在日常消費中賺取最高回贈。我們致力於提供準確、實用、免費的信用卡比較服務，
                  讓你的每一蚊都用得更精明！
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Features */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            平台功能
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

        {/* Values */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            我們的價值觀
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
            使用方法
          </h2>
          <div className="space-y-4">
            {[
              { step: 1, title: "輸入商戶或選擇類別", description: "在首頁輸入你想消費的商戶名稱，或選擇消費類別（如餐飲、超市、網購等）" },
              { step: 2, title: "輸入消費金額", description: "輸入你預計的消費金額，系統會自動計算每張卡的回贈" },
              { step: 3, title: "查看最高回贈卡", description: "系統會即時顯示各張信用卡的回贈金額，幫你找出最抵的一張！" },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
                  {item.step}
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="font-bold text-gray-900 dark:text-white">{item.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Data Sources */}
        <section className="mb-16">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                資料來源
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                我們的信用卡回贈資料均來自各銀行官方網站及條款細則，並定期更新以確保準確性。
                如發現任何資料錯誤，歡迎透過下方聯絡方式告知我們。
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-500">
                ⚠️ 本網站資料僅供參考，實際回贈以各銀行官方公佈為準。
                申請信用卡前請詳閱相關條款及細則。
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Contact */}
        <section className="mb-16">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Mail className="h-5 w-5 text-blue-500" />
                聯絡我們
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                如有任何查詢、建議或發現資料錯誤，歡迎聯絡我們：
              </p>
              <div className="space-y-3">
                <a 
                  href="mailto:info@pickcardrebate.com" 
                  className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                >
                  <Mail className="h-4 w-4" />
                  info@pickcardrebate.com
                </a>
                <p className="text-sm text-gray-500 dark:text-gray-500">
                  我們會盡快回覆你的查詢。如需更新條款或報告錯誤，請在郵件中提供相關資料及來源。
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* CTA */}
        <section className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            準備好賺盡回贈了嗎？
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            立即試用 PickCardRebate，找出最適合你的信用卡！
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors"
            >
              <Calculator className="h-5 w-5" />
              開始計算回贈
            </Link>
            <Link 
              href="/cards"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-xl font-medium transition-colors"
            >
              <CreditCard className="h-5 w-5" />
              瀏覽信用卡庫
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

