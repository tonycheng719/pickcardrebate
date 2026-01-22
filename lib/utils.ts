import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 格式化貨幣金額
 * @param amount 金額
 * @param currency 貨幣代碼，預設為 HKD
 * @param locale 語言區域，預設為 zh-HK
 * @returns 格式化後的貨幣字串
 */
export function formatCurrency(
  amount: number,
  currency: string = 'HKD',
  locale: string = 'zh-HK'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

