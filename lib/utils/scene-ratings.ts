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
    isLocal?: boolean; // 只匹配本地（港幣）交易
  }[] = [
    { scene: '海外當地簽賬', icon: '🌏', matchTypes: ['category', 'base'], matchValues: ['overseas', 'foreign'], isForeignCurrency: true },
    { scene: '港幣網購', icon: '🛒', matchTypes: ['category'], matchValues: ['online', 'ecommerce'], isLocal: true },
    { scene: '外幣網購', icon: '🌐', matchTypes: ['category'], matchValues: ['online', 'ecommerce'], isForeignCurrency: true },
    { scene: '餐飲消費', icon: '🍽️', matchTypes: ['category'], matchValues: ['dining', 'restaurant', 'food'] },
    { scene: '超市購物', icon: '🛒', matchTypes: ['category', 'merchant'], matchValues: ['supermarket', 'grocery', 'wellcome', 'parknshop', 'market_place', 'aeon'] },
    { scene: '交通出行', icon: '🚌', matchTypes: ['category', 'paymentMethod'], matchValues: ['transport', 'transit', 'octopus'] },
    { scene: '日本消費', icon: '🇯🇵', matchTypes: ['category'], matchValues: ['japan'], isForeignCurrency: true },
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
      
      // 貨幣匹配邏輯
      let currencyMatch = true;
      if (scene.isForeignCurrency) {
        // 外幣場景：規則需要是外幣規則
        currencyMatch = !!rule.isForeignCurrency;
      } else if (scene.isLocal) {
        // 港幣本地場景：規則不能是外幣規則
        currencyMatch = !rule.isForeignCurrency;
      }
      
      // 特殊處理：海外當地簽賬也匹配 isForeignCurrency 規則
      const isOverseasMatch = scene.scene === '海外當地簽賬' && rule.isForeignCurrency;
      
      // 特殊處理：外幣網購匹配網上 + 外幣
      const isForeignOnlineMatch = scene.scene === '外幣網購' && 
        matchValues.some(v => v.toLowerCase().includes('online')) && 
        rule.isForeignCurrency;
      
      if ((matchesType && matchesValue && currencyMatch) || isOverseasMatch || isForeignOnlineMatch) {
        if (rule.percentage > bestRate) {
          bestRate = rule.percentage;
          bestRule = rule;
        }
      }
    }
    
    // 計算淨回贈（外幣場景扣除手續費）
    let netRate = bestRate;
    if (scene.isForeignCurrency && card.foreignCurrencyFee) {
      netRate = bestRate - card.foreignCurrencyFee;
    }
    
    // 如果淨回贈為負或太低，跳過這個場景（不推薦）
    // 但仍然顯示以提供完整資訊
    
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
      note = `${bestRate}% - ${card.foreignCurrencyFee}% 手續費 = ${netRate.toFixed(2)}% 淨回贈`;
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
  
  // 按評分排序（高到低），同分則按回贈率排序
  ratings.sort((a, b) => {
    if (b.rating !== a.rating) return b.rating - a.rating;
    return b.rate - a.rate;
  });
  
  // 返回前 5 個場景（增加顯示更多）
  return ratings.slice(0, 5);
}

/**
 * 渲染星級評分
 */
export function renderStars(rating: number): string {
  const fullStar = '★';
  const emptyStar = '☆';
  return fullStar.repeat(rating) + emptyStar.repeat(5 - rating);
}

