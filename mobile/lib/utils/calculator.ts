/**
 * 回贈計算邏輯 - 簡化版
 * 完整版本請參考 Web 端
 */

import { CreditCard, CreditCardRule, CalculationResult, PaymentMethod } from '../types';

interface CalculateOptions {
  merchantId: string;
  category: string;
  amount: number;
  paymentMethod: PaymentMethod;
  isForeignCurrency?: boolean;
}

/**
 * 計算單張卡的回贈
 */
export function calculateCardReward(
  card: CreditCard,
  options: CalculateOptions
): CalculationResult {
  const { merchantId, category, amount, paymentMethod, isForeignCurrency } = options;
  
  let bestRate = 0;
  let matchedRule: CreditCardRule | undefined;
  const notes: string[] = [];

  // 遍歷所有規則，找出最高回贈
  for (const rule of card.rules) {
    // 檢查是否符合規則條件
    if (!matchesRule(rule, options)) continue;
    
    // 計算有效回贈率
    let effectiveRate = rule.percentage;
    
    // 檢查上限
    if (rule.cap && rule.capType === 'reward') {
      const maxSpendForCap = (rule.cap / rule.percentage) * 100;
      if (amount > maxSpendForCap) {
        effectiveRate = (rule.cap / amount) * 100;
        notes.push(`⚠️ 已達回贈上限 $${rule.cap}`);
      }
    }
    
    // 檢查最低簽賬門檻
    if (rule.monthlyMinSpend && amount < rule.monthlyMinSpend) {
      notes.push(`⚠️ 需月簽滿 $${rule.monthlyMinSpend}`);
    }
    
    if (effectiveRate > bestRate) {
      bestRate = effectiveRate;
      matchedRule = rule;
    }
  }

  // 如果沒有匹配的規則，使用基本回贈（假設 0.4%）
  if (!matchedRule) {
    const baseRule = card.rules.find(r => r.matchType === 'base');
    if (baseRule) {
      bestRate = baseRule.percentage;
      matchedRule = baseRule;
    }
  }

  const reward = (amount * bestRate) / 100;

  return {
    card,
    rate: bestRate,
    reward: Math.round(reward * 100) / 100, // 四捨五入到小數點後兩位
    matchedRule,
    notes: notes.length > 0 ? notes : undefined,
  };
}

/**
 * 檢查規則是否符合條件
 */
function matchesRule(rule: CreditCardRule, options: CalculateOptions): boolean {
  const { merchantId, category, paymentMethod, isForeignCurrency } = options;

  // 基本規則始終匹配（除非有排除）
  if (rule.matchType === 'base') {
    // 檢查排除類別
    if (rule.excludeCategories?.includes(category)) return false;
    // 檢查排除支付方式
    if (rule.excludePaymentMethods?.includes(paymentMethod)) return false;
    // 檢查外幣條件
    if (rule.isForeignCurrency !== undefined && rule.isForeignCurrency !== isForeignCurrency) return false;
    return true;
  }

  // 類別匹配
  if (rule.matchType === 'category') {
    if (!rule.matchValue?.includes(category)) return false;
  }

  // 商戶匹配
  if (rule.matchType === 'merchant') {
    if (!rule.matchValue?.includes(merchantId)) return false;
  }

  // 支付方式匹配
  if (rule.matchType === 'paymentMethod') {
    if (!rule.matchValue?.includes(paymentMethod)) return false;
  }

  // 檢查實體店限制
  if (rule.isPhysicalStore && !['physical', 'apple_pay', 'google_pay'].includes(paymentMethod)) {
    return false;
  }

  // 檢查排除支付方式
  if (rule.excludePaymentMethods?.includes(paymentMethod)) {
    return false;
  }

  return true;
}

/**
 * 對多張卡排序（按回贈率高低）
 */
export function sortByReward(results: CalculationResult[]): CalculationResult[] {
  return [...results].sort((a, b) => b.rate - a.rate);
}

/**
 * 格式化回贈率顯示
 */
export function formatRate(rate: number): string {
  if (rate >= 10) return `${rate.toFixed(0)}%`;
  if (rate >= 1) return `${rate.toFixed(1)}%`;
  return `${rate.toFixed(2)}%`;
}

/**
 * 格式化金額顯示
 */
export function formatAmount(amount: number): string {
  if (amount >= 1000) {
    return `$${(amount / 1000).toFixed(1)}K`;
  }
  return `$${amount.toFixed(0)}`;
}

