"use client";

import { ShareButton } from "@/components/share-button";

interface SharePromoButtonProps {
  title: string;
  description: string;
  promoId: string;
}

export function SharePromoButton({ title, description, promoId }: SharePromoButtonProps) {
  return (
    <ShareButton
      title={title}
      text={description}
      url={`https://pickcardrebate.com/promos/${promoId}`}
      variant="outline"
      size="sm"
    />
  );
}

