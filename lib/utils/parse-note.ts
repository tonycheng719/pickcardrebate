/**
 * 解析 card.note 並提取精簡版內容
 * 
 * 目的：
 * 1. 移除與「回贈規則」重複的內容（回贈率表格等）
 * 2. 移除與「卡片資訊」重複的內容（上限、推廣期等）
 * 3. 只保留真正的警告和排除項目
 */

import { CreditCard } from '@/lib/types';

export interface ParsedNote {
  exclusions: string[];      // 不計回贈項目
  warnings: string[];        // 重要警告
  welcomeOffer?: string;     // 迎新優惠（如果獨立顯示）
  promoLinks: { text: string; url: string }[];  // 優惠連結
}

/**
 * 從 note 中提取精簡內容
 */
export function parseNote(card: CreditCard): ParsedNote {
  const result: ParsedNote = {
    exclusions: [],
    warnings: [],
    promoLinks: [],
  };
  
  // 優先使用 card.exclusions（如果已有）
  if (card.exclusions && card.exclusions.length > 0) {
    result.exclusions = card.exclusions;
  }
  
  if (!card.note) return result;
  
  const lines = card.note.split('\n');
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // 跳過空行和分隔線
    if (!trimmed || trimmed === '---') continue;
    
    // 跳過 Markdown 標題（這些通常是區塊標題，會在其他地方顯示）
    if (trimmed.startsWith('##')) continue;
    
    // 跳過表格（回贈率表格在「回贈規則」已顯示）
    if (trimmed.startsWith('|') || trimmed.startsWith('|:')) continue;
    
    // 提取不計回贈項目
    if (trimmed.includes('不計回贈') || trimmed.includes('不適用') || trimmed.includes('不包括')) {
      // 提取「不計」後面的內容
      const exclusionMatch = trimmed.match(/[：:]\s*(.+)$/);
      if (exclusionMatch) {
        result.exclusions.push(exclusionMatch[1]);
      } else {
        result.exclusions.push(trimmed.replace(/^[⚠️❌]\s*/, ''));
      }
      continue;
    }
    
    // 提取警告（以 ⚠️ 或 ❌ 開頭）
    if (trimmed.startsWith('⚠️') || trimmed.startsWith('❌')) {
      // 排除已經包含在 exclusions 中的
      if (!trimmed.includes('不計') && !trimmed.includes('不適用') && !trimmed.includes('不包括')) {
        result.warnings.push(trimmed.replace(/^[⚠️❌]\s*/, ''));
      }
      continue;
    }
    
    // 提取優惠連結
    const linkMatch = trimmed.match(/\[(.+?)\]\((.+?)\)/);
    if (linkMatch && (trimmed.includes('查看') || trimmed.includes('詳情'))) {
      result.promoLinks.push({
        text: linkMatch[1],
        url: linkMatch[2],
      });
    }
  }
  
  return result;
}

/**
 * 格式化排除項目為簡潔字符串
 */
export function formatExclusions(exclusions: string[]): string {
  if (exclusions.length === 0) return '';
  
  // 合併常見的排除項目
  const commonExclusions = [
    '八達通增值',
    '電子錢包',
    'AlipayHK',
    'WeChat Pay',
    'PayMe',
    '繳稅',
    '繳費',
    '保費',
  ];
  
  // 去重並排序
  const uniqueExclusions = [...new Set(exclusions)];
  
  return uniqueExclusions.join('、');
}

