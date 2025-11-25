"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Calculator, PieChart, Wallet, Smartphone } from "lucide-react";

export default function AdminAnalyticsPage() {
  // Mock Data for Calculation Analytics
  const topMerchants = [
    { name: "壽司郎 Sushiro", count: 2450, trend: "+15%" },
    { name: "HKTVmall", count: 1890, trend: "+8%" },
    { name: "Apple Store", count: 1200, trend: "+25%" },
    { name: "Klook", count: 980, trend: "+12%" },
    { name: "百佳 ParknShop", count: 850, trend: "-5%" },
  ];

  const categoryDistribution = [
    { name: "餐飲美食", percentage: 35, color: "bg-orange-500" },
    { name: "網上購物", percentage: 28, color: "bg-blue-500" },
    { name: "超市百貨", percentage: 18, color: "bg-green-500" },
    { name: "旅遊外幣", percentage: 12, color: "bg-purple-500" },
    { name: "其他", percentage: 7, color: "bg-gray-400" },
  ];

  const paymentMethods = [
    { name: "Apple Pay / Google Pay", count: 4500, trend: "+10%" },
    { name: "實體卡", count: 2100, trend: "-5%" },
    { name: "網上輸入信用卡", count: 1800, trend: "+2%" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">計算行為分析</h1>
        <p className="text-gray-500 dark:text-gray-400">洞察用戶消費習慣，優化推廣策略與商戶合作。</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">今日計算次數</p>
                <div className="flex items-baseline gap-2 mt-1">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">12,502</h3>
                    <span className="text-xs font-medium text-green-600 flex items-center gap-0.5">
                        <TrendingUp className="h-3 w-3" /> +8.4%
                    </span>
                </div>
            </CardContent>
        </Card>
        <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">平均計算金額</p>
                <div className="flex items-baseline gap-2 mt-1">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">$840</h3>
                    <span className="text-xs font-medium text-gray-500">HKD</span>
                </div>
            </CardContent>
        </Card>
        <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">加入錢包轉換率</p>
                <div className="flex items-baseline gap-2 mt-1">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">15.2%</h3>
                    <span className="text-xs font-medium text-green-600 flex items-center gap-0.5">
                        <TrendingUp className="h-3 w-3" /> +2.1%
                    </span>
                </div>
            </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
                <CardTitle className="text-lg dark:text-white flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-blue-600" /> 熱門計算商戶 Top 5
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-5">
                    {topMerchants.map((item, i) => (
                        <div key={i} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                                    i === 0 ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" : 
                                    i === 1 ? "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300" :
                                    i === 2 ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400" :
                                    "bg-gray-50 text-gray-500 dark:bg-gray-800/50 dark:text-gray-400"
                                }`}>
                                    {i + 1}
                                </div>
                                <span className="font-medium text-gray-900 dark:text-white">{item.name}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <span className="text-sm text-gray-500 dark:text-gray-400 font-mono">{item.count} 次</span>
                                <span className={`text-xs font-medium ${item.trend.includes("-") ? "text-red-500" : "text-green-500"}`}>
                                    {item.trend}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>

        <div className="space-y-8">
             <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                    <CardTitle className="text-lg dark:text-white flex items-center gap-2">
                        <PieChart className="h-5 w-5 text-purple-600" /> 消費類別分佈
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {categoryDistribution.map((item, i) => (
                            <div key={i} className="space-y-1">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
                                    <span className="font-medium text-gray-900 dark:text-white">{item.percentage}%</span>
                                </div>
                                <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percentage}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
                <CardHeader>
                    <CardTitle className="text-lg dark:text-white flex items-center gap-2">
                        <Smartphone className="h-5 w-5 text-indigo-600" /> 支付方式偏好
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {paymentMethods.map((item, i) => (
                             <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/30 rounded-lg border border-transparent hover:border-gray-200 dark:hover:border-gray-600 transition-colors">
                                <span className="font-medium text-gray-900 dark:text-white text-sm">{item.name}</span>
                                <div className="text-right">
                                    <div className="text-sm font-bold text-gray-900 dark:text-white">{item.count}</div>
                                    <div className={`text-[10px] ${item.trend.includes("-") ? "text-red-500" : "text-green-500"}`}>{item.trend}</div>
                                </div>
                             </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
