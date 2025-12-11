// 支付方式回贈攻略文章內容組件
// 用於 /discover/payment-methods-guide 頁面
// SEO 優化：針對「Apple Pay 回贈」「信用卡支付方式」「流動支付」等關鍵字

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { 
  AlertTriangle, CheckCircle, XCircle, ChevronRight,
  CreditCard, Smartphone, Globe, ShoppingCart,
  Info, Zap, HelpCircle, Wallet, Store, Laptop,
  CircleDollarSign, TrendingUp, Shield
} from "lucide-react";

// FAQ 數據 - SEO 結構化資料
export const paymentMethodsFaqData = [
  {
    question: "流動支付（Apple Pay / Google Pay）同實體卡回贈有冇分別？",
    answer: "視乎信用卡！部分卡如恒生 MMPOWER、BOC SOGO Visa 用流動支付可獲額外 5% 回贈，但渣打 Simply Cash、安信 EarnMORE 則全部一樣。Apple Pay 和 Google Pay 回贈率通常相同，建議使用 PickCardRebate 計算機查詢。"
  },
  {
    question: "網上用 Apple Pay / Google Pay 同直接輸入卡號有冇分別？",
    answer: "通常冇分別！銀行會將兩者都歸類為「網上簽賬」。少數銀行可能有細微差異，但大多數情況下回贈率相同。"
  },
  {
    question: "門市用流動支付會唔會當網購計？",
    answer: "唔會。銀行可以識別到交易係透過實體店 NFC 支付，會歸類為「流動支付」或「感應式支付」，而非網上簽賬。Apple Pay 和 Google Pay 在實體店使用都屬於流動支付。"
  },
  {
    question: "流動支付同增值型電子錢包有咩分別？",
    answer: "流動支付（Apple Pay / Google Pay）直接從信用卡扣款，多數銀行有回贈。增值型電子錢包（AlipayHK、WeChat Pay、PayMe）需要先用信用卡增值，增值交易多數銀行不計回贈，係兩種完全唔同嘅支付方式！"
  },
  {
    question: "增值型電子錢包（AlipayHK、PayMe）有冇回贈？",
    answer: "多數銀行對增值型電子錢包增值設有限制：1) 增值通常無回贈或有月簽上限；2) 部分銀行完全不計回贈；3) 少數銀行如渣打 Simply Cash 可計回贈但有上限。建議用前查清楚！注意：呢類錢包同 Apple Pay / Google Pay 唔同。"
  },
  {
    question: "八達通自動增值有冇回贈？",
    answer: "部分銀行有回贈：渣打國泰卡可計里數、建行 eye 卡有回贈。但大多數銀行的八達通自動增值不計入回贈。"
  },
  {
    question: "邊種支付方式最安全？",
    answer: "流動支付（Apple Pay / Google Pay）最安全！因為：1) 不會暴露真實卡號；2) 每次交易用獨特 Token；3) 需要 Face ID/Touch ID 驗證。網上輸入卡號風險較高，建議用 3D Secure 驗證。"
  },
  {
    question: "海外用流動支付有冇額外手續費？",
    answer: "Apple Pay / Google Pay 本身無額外手續費，但信用卡的外幣交易手續費（通常 1.95%）仍然適用。選擇免外幣手續費的卡如渣打國泰、SC Smart Card 可避免此費用。"
  }
];

// 支付方式數據
const paymentMethodsData = [
  {
    id: "physical",
    name: "門市實體卡",
    icon: "💳",
    description: "傳統拍卡/插卡",
    howItWorks: "將實體信用卡插入讀卡機或拍卡感應",
    bankRecognition: "實體簽賬 / 本地簽賬",
    pros: ["最傳統可靠", "所有商戶都接受", "無需手機"],
    cons: ["需攜帶實體卡", "部分卡回贈較低", "卡號可能被複製"],
    rebateLevel: "基本",
    color: "gray"
  },
  {
    id: "mobile_pay",
    name: "門市 Apple Pay / Google Pay",
    icon: "📱",
    description: "手機 NFC 感應支付",
    howItWorks: "用手機靠近讀卡機感應付款",
    bankRecognition: "流動支付 / 手機支付 / 感應式支付",
    pros: ["部分卡有額外回贈", "無需帶卡", "更安全（Token 技術）"],
    cons: ["需要 NFC 手機", "部分商戶不支援", "可能有月簽上限"],
    rebateLevel: "可能較高",
    color: "blue"
  },
  {
    id: "online_card",
    name: "網上輸入卡號",
    icon: "💻",
    description: "手動輸入信用卡資料",
    howItWorks: "在網站輸入卡號、到期日、CVV",
    bankRecognition: "網上簽賬 / 電子商貿",
    pros: ["網購必備", "部分卡有高回贈", "方便快捷"],
    cons: ["有資料外洩風險", "需記住卡號", "部分網站不支援"],
    rebateLevel: "網購卡較高",
    color: "purple"
  },
  {
    id: "online_mobile_pay",
    name: "網上流動支付",
    icon: "📲",
    description: "網站/App 內 Apple Pay / Google Pay",
    howItWorks: "點擊 Apple Pay / Google Pay 按鈕，驗證付款",
    bankRecognition: "網上簽賬（同輸入卡號）",
    pros: ["無需輸入卡號", "更安全", "更快速"],
    cons: ["不是所有網站支援", "需支援嘅設備"],
    rebateLevel: "同網上簽賬",
    color: "green"
  }
];

// 信用卡回贈比較數據
const cardComparisonData = [
  {
    card: "安信 EarnMORE",
    id: "earnmore",
    physical: "2%",
    mobilePay: "2%",
    online: "2%",
    note: "全部一樣，無腦刷",
    highlight: "全能卡"
  },
  {
    card: "渣打 Simply Cash",
    id: "sc-simply-cash",
    physical: "1.5%",
    mobilePay: "1.5%",
    online: "1.5%",
    note: "全部一樣，無上限",
    highlight: "全能卡"
  },
  {
    card: "HSBC Red Card",
    id: "hsbc-red",
    physical: "1%",
    mobilePay: "1%",
    online: "4% ⭐",
    note: "網購回贈最高",
    highlight: "網購卡"
  },
  {
    card: "恒生 MMPOWER",
    id: "hangseng-mmpower",
    physical: "0.4%",
    mobilePay: "5% ⭐",
    online: "5% ⭐",
    note: "流動支付/網購最抵",
    highlight: "流動支付"
  },
  {
    card: "BOC SOGO Visa",
    id: "boc-sogo",
    physical: "0.4%",
    mobilePay: "5.4% ⭐",
    online: "0.4%",
    note: "只限門市 Apple Pay",
    highlight: "流動支付"
  },
  {
    card: "建行 eye 卡",
    id: "ccb-eye",
    physical: "2%",
    mobilePay: "2%",
    online: "2%",
    note: "餐飲/網購額外獎賞",
    highlight: "全能卡"
  },
  {
    card: "Citi Rewards",
    id: "citi-rewards",
    physical: "0.4%",
    mobilePay: "2% ⭐",
    online: "0.4%",
    note: "流動支付 5X 積分",
    highlight: "流動支付"
  }
];

// 電子錢包數據
const ewalletData = [
  {
    wallet: "AlipayHK",
    icon: "💙",
    creditCardTopup: "大多數銀行不計回贈",
    spending: "用 AlipayHK 消費：視乎銀行",
    tips: "用 HSBC Red 增值可能有回贈",
    warning: true
  },
  {
    wallet: "WeChat Pay HK",
    icon: "💚",
    creditCardTopup: "大多數銀行不計回贈",
    spending: "用 WeChat Pay 消費：視乎銀行",
    tips: "部分銀行完全不計",
    warning: true
  },
  {
    wallet: "PayMe",
    icon: "💜",
    creditCardTopup: "增值不計回贈",
    spending: "PayMe 消費：視乎銀行",
    tips: "HSBC 信用卡增值無回贈",
    warning: true
  },
  {
    wallet: "八達通自動增值",
    icon: "🟠",
    creditCardTopup: "部分銀行可計",
    spending: "N/A",
    tips: "渣打國泰卡計里數、建行 eye 有回贈",
    warning: false
  }
];

export function PaymentMethodsGuide() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="prose prose-lg dark:prose-invert max-w-none">
      {/* Hero Section */}
      <div className="not-prose mb-12">
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium backdrop-blur-sm">
                💳 {currentYear}年最新
              </span>
              <span className="px-3 py-1 bg-amber-400/20 rounded-full text-sm font-medium backdrop-blur-sm">
                📱 支付攻略
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              支付方式回贈攻略<br />
              <span className="text-purple-200">流動支付 vs 實體卡 vs 網購</span>
            </h1>
            <p className="text-lg md:text-xl text-purple-100 max-w-2xl mb-6">
              同一張信用卡，不同支付方式回贈可以差 10 倍！教你揀最抵支付方式。
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/">
                <Button size="lg" className="bg-white text-purple-700 hover:bg-purple-100">
                  <CreditCard className="h-5 w-5 mr-2" />
                  回贈計算機
                </Button>
              </Link>
              <Link href="/rankings">
                <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  排行榜
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Navigation */}
      <div className="not-prose mb-8">
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6">
          <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-amber-500" />
            快速導航
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <a href="#payment-types" className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow">
              <CreditCard className="h-5 w-5 text-indigo-600" />
              <span className="font-medium">四種支付方式</span>
            </a>
            <a href="#comparison" className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span className="font-medium">回贈比較表</span>
            </a>
            <a href="#ewallet" className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow">
              <Wallet className="h-5 w-5 text-purple-600" />
              <span className="font-medium">電子錢包陷阱</span>
            </a>
            <a href="#faq" className="flex items-center gap-2 p-3 bg-white dark:bg-gray-800 rounded-xl hover:shadow-md transition-shadow">
              <HelpCircle className="h-5 w-5 text-amber-600" />
              <span className="font-medium">常見問題</span>
            </a>
          </div>
        </div>
      </div>

      {/* Key Point */}
      <div className="not-prose mb-8">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6 border border-amber-200 dark:border-amber-800">
          <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            重要提醒
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            <strong>同一張卡，不同支付方式回贈可以差 10 倍以上！</strong><br />
            例如恒生 MMPOWER：門市實體卡只有 0.4%，但用 Apple Pay 可享 5%。
            用錯支付方式，等於白白損失回贈！
          </p>
        </div>
      </div>

      {/* Four Payment Types */}
      <h2 id="payment-types" className="flex items-center gap-2 scroll-mt-20">
        <CreditCard className="h-6 w-6 text-indigo-600" />
        四種主要支付方式
      </h2>

      <div className="not-prose my-8 grid md:grid-cols-2 gap-4">
        {paymentMethodsData.map((method) => (
          <div key={method.id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-3xl">{method.icon}</span>
              <div>
                <h3 className="font-bold text-lg">{method.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{method.description}</p>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">銀行識別為</p>
              <p className="font-medium text-indigo-600 dark:text-indigo-400">{method.bankRecognition}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs font-medium text-green-600 dark:text-green-400 mb-2">✓ 優點</p>
                <ul className="space-y-1">
                  {method.pros.map((pro, i) => (
                    <li key={i} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-1">
                      <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                      {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-xs font-medium text-amber-600 dark:text-amber-400 mb-2">⚠️ 注意</p>
                <ul className="space-y-1">
                  {method.cons.map((con, i) => (
                    <li key={i} className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-1">
                      <AlertTriangle className="h-3 w-3 text-amber-500 flex-shrink-0 mt-0.5" />
                      {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-3 border-t border-gray-100 dark:border-gray-800">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                method.rebateLevel.includes('高') 
                  ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
              }`}>
                回贈：{method.rebateLevel}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Comparison Table */}
      <h2 id="comparison" className="flex items-center gap-2 scroll-mt-20">
        <TrendingUp className="h-6 w-6 text-green-600" />
        熱門信用卡回贈比較
      </h2>

      <p>
        以下係香港熱門信用卡喺不同支付方式嘅回贈比較：
      </p>

      <div className="not-prose my-8 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-800">
              <th className="px-4 py-3 text-left text-sm font-medium">信用卡</th>
              <th className="px-4 py-3 text-center text-sm font-medium">💳 門市實體卡</th>
              <th className="px-4 py-3 text-center text-sm font-medium">📱 流動支付</th>
              <th className="px-4 py-3 text-center text-sm font-medium">💻 網上簽賬</th>
              <th className="px-4 py-3 text-left text-sm font-medium">備註</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {cardComparisonData.map((card, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                <td className="px-4 py-3">
                  <Link href={`/cards/${card.id}`} className="font-medium text-indigo-600 hover:underline">
                    {card.card}
                  </Link>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={card.physical.includes('⭐') ? 'font-bold text-green-600' : ''}>
                    {card.physical}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={card.mobilePay.includes('⭐') ? 'font-bold text-green-600' : ''}>
                    {card.mobilePay}
                  </span>
                </td>
                <td className="px-4 py-3 text-center">
                  <span className={card.online.includes('⭐') ? 'font-bold text-green-600' : ''}>
                    {card.online}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                  <span className={`px-2 py-0.5 rounded text-xs ${
                    card.highlight === '全能卡' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400' :
                    card.highlight === '網購卡' ? 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400' :
                    'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                  }`}>
                    {card.highlight}
                  </span>
                  <span className="ml-2">{card.note}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* E-wallet Warning */}
      <h2 id="ewallet" className="flex items-center gap-2 scroll-mt-20">
        <Wallet className="h-6 w-6 text-purple-600" />
        增值型電子錢包陷阱 ⚠️
      </h2>

      <div className="not-prose mb-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>⚠️ 注意：</strong>呢度講嘅「電子錢包」係指<strong>增值型錢包</strong>（AlipayHK、WeChat Pay、PayMe），
            與<strong>流動支付</strong>（Apple Pay、Google Pay）唔同！
            <br />
            Apple Pay / Google Pay 直接扣信用卡，多數銀行有回贈；
            增值型錢包需要先增值，銀行對增值交易多數不計回贈。
          </p>
        </div>
      </div>

      <p>
        <strong>增值型電子錢包（AlipayHK、WeChat Pay、PayMe）係回贈黑洞！</strong>
        大多數銀行對電子錢包增值或消費設有限制，甚至完全不計回贈。
      </p>

      <div className="not-prose my-8 grid md:grid-cols-2 gap-4">
        {ewalletData.map((wallet, index) => (
          <div key={index} className={`rounded-xl border p-5 ${
            wallet.warning 
              ? 'bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800' 
              : 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-800'
          }`}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{wallet.icon}</span>
              <h3 className="font-bold">{wallet.wallet}</h3>
              {wallet.warning && (
                <span className="px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs rounded-full">
                  ⚠️ 小心
                </span>
              )}
            </div>
            <div className="space-y-2 text-sm">
              <p><strong>信用卡增值：</strong>{wallet.creditCardTopup}</p>
              <p><strong>錢包消費：</strong>{wallet.spending}</p>
              <p className="text-gray-600 dark:text-gray-400">💡 {wallet.tips}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Security */}
      <h2 className="flex items-center gap-2">
        <Shield className="h-6 w-6 text-blue-600" />
        安全性比較
      </h2>

      <div className="not-prose my-8">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
          <h3 className="font-bold text-lg mb-4">🛡️ 安全性排名（高至低）</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">1</span>
              <div>
                <p className="font-medium">Apple Pay / Google Pay</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Token 技術 + 生物識別，最安全</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">2</span>
              <div>
                <p className="font-medium">實體卡感應支付（payWave/PayPass）</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">無需輸入密碼，但有金額限制</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold">3</span>
              <div>
                <p className="font-medium">實體卡插卡 + 密碼</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">傳統方式，有被複製風險</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">4</span>
              <div>
                <p className="font-medium">網上輸入卡號</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">風險較高，建議用 3D Secure</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Tips */}
      <h2 className="flex items-center gap-2">
        <Zap className="h-6 w-6 text-amber-500" />
        快速選擇指南
      </h2>

      <div className="not-prose my-8 grid md:grid-cols-3 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-200 dark:border-blue-800">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <Store className="h-5 w-5 text-blue-600" />
            門市消費
          </h3>
          <p className="text-sm mb-3">優先用 Apple Pay / Google Pay</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            推薦卡：恒生 MMPOWER（5%）、BOC SOGO Visa（5.4%）
          </p>
        </div>
        <div className="bg-purple-50 dark:bg-purple-900/20 rounded-xl p-5 border border-purple-200 dark:border-purple-800">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <Laptop className="h-5 w-5 text-purple-600" />
            網上購物
          </h3>
          <p className="text-sm mb-3">用網購回贈高嘅卡</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            推薦卡：HSBC Red（4%）、恒生 MMPOWER（5%）
          </p>
        </div>
        <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-5 border border-green-200 dark:border-green-800">
          <h3 className="font-bold mb-3 flex items-center gap-2">
            <CircleDollarSign className="h-5 w-5 text-green-600" />
            無腦刷
          </h3>
          <p className="text-sm mb-3">用全能卡，無需考慮支付方式</p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            推薦卡：安信 EarnMORE（2%）、渣打 Simply Cash（1.5%）
          </p>
        </div>
      </div>

      {/* CTA */}
      <div className="not-prose my-12">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">想知道你張卡邊種支付方式最抵？</h2>
          <p className="text-indigo-100 mb-6 max-w-xl mx-auto">
            用我哋嘅計算機，選擇商戶同支付方式，即時計算最高回贈！
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/">
              <Button size="lg" className="bg-white text-indigo-700 hover:bg-indigo-100">
                <CreditCard className="h-5 w-5 mr-2" />
                回贈計算機
              </Button>
            </Link>
            <Link href="/cards">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <TrendingUp className="h-5 w-5 mr-2" />
                比較信用卡
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <h2 id="faq" className="flex items-center gap-2 scroll-mt-20">
        <HelpCircle className="h-6 w-6 text-amber-600" />
        常見問題 FAQ
      </h2>

      <div className="not-prose my-8 space-y-4">
        {paymentMethodsFaqData.map((faq, index) => (
          <div key={index} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-6">
            <h3 className="font-bold text-lg mb-2 flex items-start gap-2">
              <span className="text-indigo-600 dark:text-indigo-400">Q.</span>
              {faq.question}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 pl-6">
              <span className="text-green-600 dark:text-green-400 font-medium">A.</span> {faq.answer}
            </p>
          </div>
        ))}
      </div>

      {/* Related */}
      <h2 className="flex items-center gap-2">
        <Globe className="h-6 w-6 text-blue-600" />
        相關攻略
      </h2>

      <div className="not-prose my-8 grid md:grid-cols-2 gap-4">
        <Link href="/discover/mobile-payment-guide" className="block p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-indigo-300 dark:hover:border-indigo-700 transition-colors">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <Smartphone className="h-5 w-5 text-indigo-600" />
            流動支付信用卡攻略
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Apple Pay、Google Pay 最抵信用卡推薦！
          </p>
        </Link>
        <Link href="/discover/online-shopping-guide" className="block p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-700 transition-colors">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-purple-600" />
            網購信用卡攻略
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            HKTVmall、淘寶、Amazon 最高 5% 回贈！
          </p>
        </Link>
      </div>
    </div>
  );
}

