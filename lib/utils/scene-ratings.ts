/**
 * 適用場景評分工具
 * 
 * 根據卡片的回贈規則計算不同場景的適用評分
 */

import { CreditCard, RewardRule } from '@/lib/types';

export interface SceneRating {
  scene: string;
  icon: string;
  rating: number; // 1-5
  rate: number;
  note?: string;
}

/**
 * 計算卡片在各場景的評分
 */
export function getSceneRatings(card: CreditCard): SceneRating[] {
  const ratings: SceneRating[] = [];
  
  // 定義場景和對應的規則匹配
  const scenes: {
    scene: string;
    icon: string;
    matchTypes: string[];
    matchValues: string[];
    isForeignCurrency?: boolean;
  }[] = [
    { scene: '海外簽賬', icon: '🌏', matchTypes: ['category'], matchValues: ['overseas', 'foreign'], isForeignCurrency: true },
    { scene: '網上購物', icon: '🛒', matchTypes: ['category'], matchValues: ['online', 'ecommerce'] },
    { scene: '餐飲消費', icon: '🍽️', matchTypes: ['category'], matchValues: ['dining', 'restaurant', 'food'] },
    { scene: '交通出行', icon: '🚌', matchTypes: ['category'], matchValues: ['transport', 'transit', 'octopus'] },
    { scene: '超市購物', icon: '🛍️', matchTypes: ['category', 'merchant'], matchValues: ['supermarket', 'grocery'] },
    { scene: '日本消費', icon: '🇯🇵', matchTypes: ['category'], matchValues: ['japan'] },
  ];
  
  // 找出基本回贈率
  const baseRule = card.rules.find(r => r.matchType === 'base' && !r.isForeignCurrency);
  const baseRate = baseRule?.percentage || 0.4;
  
  for (const scene of scenes) {
    // 找出該場景的最高回贈率規則
    let bestRule: RewardRule | undefined;
    let bestRate = baseRate;
    
    for (const rule of card.rules) {
      // 檢查是否匹配該場景
      const matchesType = scene.matchTypes.includes(rule.matchType);
      
      // matchValue 可能是字符串或陣列
      const matchValues = rule.matchValue 
        ? (Array.isArray(rule.matchValue) ? rule.matchValue : [rule.matchValue])
        : [];
      const matchesValue = matchValues.some(v => 
        scene.matchValues.some(sv => v.toLowerCase().includes(sv) || sv.includes(v.toLowerCase()))
      );
      const matchesForeignCurrency = scene.isForeignCurrency ? rule.isForeignCurrency : true;
      
      // 特殊處理：海外場景也匹配 isForeignCurrency 規則
      const isOverseasMatch = scene.scene === '海外簽賬' && rule.isForeignCurrency;
      
      if ((matchesType && matchesValue && matchesForeignCurrency) || isOverseasMatch) {
        if (rule.percentage > bestRate) {
          bestRate = rule.percentage;
          bestRule = rule;
        }
      }
    }
    
    // 計算淨回贈（海外場景扣除手續費）
    let netRate = bestRate;
    if (scene.isForeignCurrency && card.foreignCurrencyFee) {
      netRate = bestRate - card.foreignCurrencyFee;
    }
    
    // 計算評分（1-5星）
    let rating: number;
    if (netRate >= 5) {
      rating = 5;
    } else if (netRate >= 3) {
      rating = 4;
    } else if (netRate >= 1.5) {
      rating = 3;
    } else if (netRate >= 0.5) {
      rating = 2;
    } else {
      rating = 1;
    }
    
    // 只添加有實際意義的場景（至少有基本回贈）
    let note: string | undefined;
    if (scene.isForeignCurrency && card.foreignCurrencyFee) {
      note = `${bestRate}% - ${card.foreignCurrencyFee}% 手續費 = ${netRate.toFixed(1)}% 淨回贈`;
    } else if (bestRule?.monthlyMinSpend) {
      note = `需月簽 $${bestRule.monthlyMinSpend.toLocaleString()}`;
    } else if (bestRule?.cap) {
      note = bestRule.capType === 'reward' 
        ? `回贈上限 $${bestRule.cap.toLocaleString()}`
        : `簽賬上限 $${bestRule.cap.toLocaleString()}`;
    }
    
    ratings.push({
      scene: scene.scene,
      icon: scene.icon,
      rating,
      rate: netRate,
      note,
    });
  }
  
  // 按評分排序（高到低）
  ratings.sort((a, b) => b.rating - a.rating);
  
  // 只返回前 4 個場景
  return ratings.slice(0, 4);
}

/**
 * 渲染星級評分
 */
export function renderStars(rating: number): string {
  const fullStar = '★';
  const emptyStar = '☆';
  return fullStar.repeat(rating) + emptyStar.repeat(5 - rating);
}

