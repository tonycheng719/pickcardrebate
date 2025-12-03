import { redirect } from "next/navigation";
import { PROMOS } from "@/lib/data/promos";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return PROMOS.map(p => ({ id: p.id }));
}

export default async function PromoDetailPage({ params }: PageProps) {
  const { id } = await params;
  redirect(`/discover/${id}`);
}
