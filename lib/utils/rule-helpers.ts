/**
 * 規則輔助函數
 * 
 * 統一處理回贈規則與折扣規則的區分
 * 
 * 重要區別：
 * - 回贈 (Rebate): 付全額後拿回一定百分比（如 5% 回贈 = 付 $100，拿回 $5）
 * - 折扣 (Discount): 直接少付（如 92折 = 付 $92，節省 $8）
 * 
 * 折扣規則標記為 isDiscount: true，在計算回贈率時必須排除！
 */

import { RewardRule } from '@/lib/types';

/**
 * 獲取回贈規則（排除折扣）
 * 
 * ⚠️ 重要：任何需要計算回贈率的地方都應該使用這個函數！
 * 
 * @param rules - 所有規則
 * @returns 只包含回贈規則（排除 isDiscount: true 的規則）
 */
export function getRebateRules(rules: RewardRule[]): RewardRule[] {
  return rules.filter(rule => !rule.isDiscount);
}

/**
 * 獲取折扣規則
 * 
 * @param rules - 所有規則
 * @returns 只包含折扣規則（isDiscount: true）
 */
export function getDiscountRules(rules: RewardRule[]): RewardRule[] {
  return rules.filter(rule => rule.isDiscount);
}

/**
 * 獲取有上限的回贈規則（排除折扣）
 * 
 * @param rules - 所有規則
 * @returns 有 cap 屬性的回贈規則
 */
export function getRebateRulesWithCap(rules: RewardRule[]): RewardRule[] {
  return rules.filter(rule => rule.cap !== undefined && !rule.isDiscount);
}

/**
 * 獲取有最低簽賬的回贈規則（排除折扣）
 * 
 * @param rules - 所有規則
 * @returns 有 monthlyMinSpend 屬性的回贈規則
 */
export function getRebateRulesWithMinSpend(rules: RewardRule[]): RewardRule[] {
  return rules.filter(rule => rule.monthlyMinSpend !== undefined && !rule.isDiscount);
}

/**
 * 找出某場景的最高回贈率（排除折扣）
 * 
 * @param rules - 所有規則
 * @param baseRate - 基本回贈率
 * @returns 最高回贈率
 */
export function getHighestRebateRate(rules: RewardRule[], baseRate: number = 0.4): number {
  const rebateRules = getRebateRules(rules);
  if (rebateRules.length === 0) return baseRate;
  
  const maxRate = Math.max(...rebateRules.map(r => r.percentage));
  return Math.max(maxRate, baseRate);
}

/**
 * 檢查規則是否為回贈（非折扣）
 * 
 * @param rule - 規則
 * @returns true 如果是回贈，false 如果是折扣
 */
export function isRebateRule(rule: RewardRule): boolean {
  return !rule.isDiscount;
}

/**
 * 檢查規則是否為折扣
 * 
 * @param rule - 規則
 * @returns true 如果是折扣
 */
export function isDiscountRule(rule: RewardRule): boolean {
  return !!rule.isDiscount;
}

