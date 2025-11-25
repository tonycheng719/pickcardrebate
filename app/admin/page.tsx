"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Search, CreditCard, AlertCircle } from "lucide-react";

export default function AdminDashboard() {
  const stats = [
    { title: "總註冊會員", value: "1,234", icon: Users, change: "+12%", color: "text-blue-600" },
    { title: "今日搜尋量", value: "8,502", icon: Search, change: "+5.4%", color: "text-green-600" },
    { title: "收錄信用卡", value: "45", icon: CreditCard, change: "New", color: "text-purple-600" },
    { title: "待審核回報", value: "12", icon: AlertCircle, change: "需處理", color: "text-orange-600" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">管理後台總覽</h1>
        <p className="text-gray-500 dark:text-gray-400">歡迎回來，今天有 12 則新回報需要您的關注。</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="dark:bg-gray-800 dark:border-gray-700">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</p>
                <div className="flex items-baseline gap-2 mt-1">
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                  <span className={`text-xs font-medium ${stat.change.includes("+") ? "text-green-600" : "text-gray-500"}`}>
                    {stat.change}
                  </span>
                </div>
              </div>
              <div className={`p-3 rounded-full bg-gray-50 dark:bg-gray-700 ${stat.color}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Popular Searches Table */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg dark:text-white">熱門搜尋關鍵字 (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { term: "壽司郎", count: 452, trend: "up" },
                { term: "日本機票", count: 321, trend: "up" },
                { term: "Apple Store", count: 289, trend: "down" },
                { term: "交稅", count: 156, trend: "up" },
                { term: "AEon", count: 98, trend: "flat" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between border-b dark:border-gray-700 pb-2 last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-400 w-4">{i + 1}</span>
                    <span className="font-medium text-gray-900 dark:text-gray-200">{item.term}</span>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{item.count} 次</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Reports */}
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="text-lg dark:text-white">最新用戶回報</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { user: "User_882", type: "優惠失效", subject: "HSBC Red 網購", time: "10分鐘前" },
                { user: "Alex_Chan", type: "新優惠", subject: "麥當勞 x PayMe", time: "1小時前" },
                { user: "Sarah_L", type: "資料錯誤", subject: "信銀 Motion 上限", time: "3小時前" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                        item.type === "優惠失效" ? "bg-red-100 text-red-700" : 
                        item.type === "新優惠" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                      }`}>
                        {item.type}
                      </span>
                      <span className="text-xs text-gray-500">{item.time}</span>
                    </div>
                    <p className="font-medium text-sm text-gray-900 dark:text-gray-200">{item.subject}</p>
                  </div>
                  <button className="text-sm text-blue-600 hover:underline">審核</button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

