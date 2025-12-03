import { Metadata } from "next";
import { HK_CARDS } from "@/lib/data/cards";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const card = HK_CARDS.find(c => c.id === id);

  if (!card) {
    return {
      title: "找不到信用卡 | PickCardRebate",
      description: "該信用卡不存在或已被移除",
    };
  }

  const description = card.sellingPoints?.slice(0, 2).join("。") || 
    `${card.bank} ${card.name} 信用卡回贈詳情`;

  return {
    title: `${card.name} | ${card.bank} | PickCardRebate`,
    description: `${card.name} - ${description}。立即比較回贈率！`,
    keywords: [card.name, card.bank, "信用卡", "回贈", "香港", ...(card.tags || [])],
    openGraph: {
      title: `${card.name} - ${card.bank}`,
      description: description,
      images: card.imageUrl ? [card.imageUrl] : [],
      type: "website",
      siteName: "PickCardRebate",
    },
    twitter: {
      card: "summary_large_image",
      title: `${card.name} - ${card.bank}`,
      description: description,
      images: card.imageUrl ? [card.imageUrl] : [],
    },
  };
}

export async function generateStaticParams() {
  return HK_CARDS.map((card) => ({
    id: card.id,
  }));
}

export default function CardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

