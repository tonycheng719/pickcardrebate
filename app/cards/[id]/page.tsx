import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { HK_CARDS } from "@/lib/data/cards";
import { CardDetailClient } from "./card-detail-client";

export const revalidate = 3600;
export const dynamicParams = true;

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return HK_CARDS.map((card) => ({
    id: card.id,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const card = HK_CARDS.find((c) => c.id === id);

  if (!card) {
    return { title: "信用卡未找到" };
  }

  return {
    title: `${card.name} - ${card.bank}`,
    description: `${card.bank} ${card.name} 信用卡詳情、回贈規則、用戶評價。${card.sellingPoints?.slice(0, 2).join('。') || ''}`,
    openGraph: {
      title: `${card.name} | PickCardRebate`,
      description: `${card.bank} ${card.name} 信用卡詳情和用戶評價`,
      images: card.imageUrl ? [{ url: card.imageUrl }] : [],
    },
  };
}

export default async function CardDetailPage({ params }: PageProps) {
  const { id } = await params;
  const card = HK_CARDS.find((c) => c.id === id);

  if (!card) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors pb-24 md:pb-0">
      <Navbar />
      <CardDetailClient card={card} />
    </div>
  );
}

