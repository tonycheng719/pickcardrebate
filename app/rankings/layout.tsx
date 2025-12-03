import { Metadata } from "next";

export const metadata: Metadata = {
  title: "🏆 2025 信用卡回贈排行榜 | PickCardRebate",
  description: "2025年最新信用卡回贈排行榜。食飯、網購、超市、旅遊、海外簽賬、流動支付各類別 Top 10。根據官方條款自動計算，每日更新。",
  keywords: [
    "信用卡排行榜",
    "最抵信用卡",
    "信用卡回贈比較",
    "食飯信用卡",
    "網購信用卡",
    "超市信用卡",
    "旅遊信用卡",
    "海外簽賬信用卡",
    "Apple Pay 信用卡",
    "2025 信用卡",
  ],
  openGraph: {
    title: "🏆 2025 信用卡回贈排行榜",
    description: "食飯、網購、超市、旅遊各類別最抵信用卡 Top 10",
    type: "website",
  },
};

export default function RankingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

