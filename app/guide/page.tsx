import { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { 
  Globe, ChevronRight, BookOpen, CreditCard, 
  ShoppingCart, Plane, Calculator 
} from "lucide-react";

export const metadata: Metadata = {
  title: "信用卡攻略教學｜最新慳錢技巧｜PickCardRebate",
  description: "信用卡攻略、慳錢技巧、回贈教學。教你點樣避開隱藏收費，揀啱信用卡慳到盡！",
  openGraph: {
    title: "信用卡攻略教學",
    description: "信用卡攻略、慳錢技巧、回贈教學",
    type: "website",
    url: "https://pickcardrebate.com/guide",
  },
};

const guides = [
  {
    slug: "overseas-fee",
    title: "海外簽賬手續費完全攻略｜DCC、CBF 陷阱拆解",
    description: "拆解信用卡海外簽賬 DCC、CBF 陷阱，教你點樣避開隱藏收費！Netflix、Spotify、App Store 都會中招？",
    icon: Globe,
    tags: ["海外消費", "網購", "手續費"],
    isNew: true,
  },
  // Add more guides here in the future
];

export default function GuidePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors pb-24 md:pb-0">
      <Navbar />
      
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 pt-8 pb-6 px-4 border-b dark:border-gray-800">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="h-8 w-8 text-emerald-600" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">信用卡攻略</h1>
          </div>
          <p className="text-gray-500 dark:text-gray-400">
            慳錢技巧、回贈教學、避雷指南，幫你精明消費！
          </p>
        </div>
      </div>
      
      <main className="container mx-auto px-4 py-6 max-w-4xl">
        {/* Guide List */}
        <div className="space-y-4 mb-10">
          {guides.map((guide) => {
            const Icon = guide.icon;
            return (
              <Link key={guide.slug} href={`/guide/${guide.slug}`}>
                <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-5 hover:shadow-lg transition-all hover:border-emerald-300 dark:hover:border-emerald-700 group">
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-100 dark:bg-emerald-900/30 p-3 rounded-xl">
                      <Icon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-bold text-gray-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          {guide.title}
                        </h3>
                        {guide.isNew && (
                          <span className="px-2 py-0.5 text-xs font-bold bg-red-500 text-white rounded-full">
                            NEW
                          </span>
                        )}
                      </div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm mb-2 line-clamp-2">
                        {guide.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {guide.tags.map((tag) => (
                          <span key={tag} className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex-shrink-0" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        
        {/* Quick Links */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 p-6">
          <h2 className="font-bold text-gray-900 dark:text-white mb-4">🔗 快速連結</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <Link href="/">
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <Calculator className="h-5 w-5 text-emerald-600" />
                <span>回贈計算機</span>
                <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
              </div>
            </Link>
            <Link href="/cards">
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <CreditCard className="h-5 w-5 text-emerald-600" />
                <span>所有信用卡</span>
                <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
              </div>
            </Link>
            <Link href="/blog/best-travel-cards">
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <Plane className="h-5 w-5 text-emerald-600" />
                <span>旅遊卡排行榜</span>
                <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
              </div>
            </Link>
            <Link href="/blog/best-online-shopping-cards">
              <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                <ShoppingCart className="h-5 w-5 text-emerald-600" />
                <span>網購卡排行榜</span>
                <ChevronRight className="h-4 w-4 ml-auto text-gray-400" />
              </div>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

