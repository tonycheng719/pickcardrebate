/**
 * App Analytics Module
 * 
 * 使用 Firebase Analytics 追蹤 App 使用數據，與 GA4 整合
 * 
 * 設定步驟：
 * 1. 在 Firebase Console 創建項目並添加 iOS/Android App
 * 2. 下載 google-services.json (Android) 和 GoogleService-Info.plist (iOS)
 * 3. 將配置文件放到正確位置
 * 4. 在 GA4 中連結 Firebase 項目
 */

import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Analytics 事件類型（與 Web 版保持一致）
export type AnalyticsEvent =
  | 'screen_view'
  | 'search'
  | 'calculate_rebate'
  | 'select_category'
  | 'view_card'
  | 'click_apply'
  | 'click_apply_official'
  | 'click_apply_partner'
  | 'compare_cards'
  | 'sign_up'
  | 'login'
  | 'logout'
  | 'add_to_wallet'
  | 'remove_from_wallet'
  | 'view_article'
  | 'share'
  | 'add_transaction'
  | 'view_recommendations';

// 事件參數接口
export interface EventParams {
  screen_name?: string;
  screen_class?: string;
  search_term?: string;
  category_name?: string;
  card_id?: string;
  card_name?: string;
  card_bank?: string;
  amount?: number;
  payment_method?: string;
  merchant?: string;
  article_slug?: string;
  article_title?: string;
  content_type?: string;
  item_id?: string;
  method?: string;
  value?: number;
  currency?: string;
  [key: string]: unknown;
}

// Firebase Analytics 實例
let analytics: any = null;
let isInitialized = false;

// 檢查是否在 Expo Go 環境中
function isExpoGo(): boolean {
  try {
    // @ts-ignore
    const Constants = require('expo-constants').default;
    return Constants.appOwnership === 'expo';
  } catch {
    return false;
  }
}

// 初始化 Analytics
export async function initializeAnalytics(): Promise<void> {
  if (isInitialized) return;
  
  // Expo Go 不支援 Firebase Native Modules
  if (isExpoGo()) {
    console.log('[Analytics] Running in Expo Go, using fallback analytics');
    isInitialized = true;
    return;
  }
  
  try {
    // 動態導入 Firebase Analytics（只在非 Expo Go 環境）
    const firebaseAnalytics = require('@react-native-firebase/analytics').default;
    analytics = firebaseAnalytics();
    isInitialized = true;
    
    // 啟用 Analytics 收集
    await analytics.setAnalyticsCollectionEnabled(true);
    console.log('[Analytics] Firebase Analytics initialized successfully');
  } catch (error) {
    // Firebase 未正確配置時使用 fallback
    console.log('[Analytics] Firebase not available, using fallback');
    isInitialized = true;
  }
}

// 設置用戶 ID
export async function setUserId(userId: string | null): Promise<void> {
  if (!isInitialized) await initializeAnalytics();
  
  try {
    if (analytics) {
      await analytics.setUserId(userId);
      console.log('[Analytics] User ID set:', userId);
    }
    
    // 也保存到本地用於 fallback 追蹤
    if (userId) {
      await AsyncStorage.setItem('@analytics_user_id', userId);
    } else {
      await AsyncStorage.removeItem('@analytics_user_id');
    }
  } catch (error) {
    console.log('[Analytics] setUserId error:', error);
  }
}

// 設置用戶屬性
export async function setUserProperties(properties: Record<string, string>): Promise<void> {
  if (!isInitialized) await initializeAnalytics();
  
  try {
    if (analytics) {
      for (const [key, value] of Object.entries(properties)) {
        await analytics.setUserProperty(key, value);
      }
    }
  } catch (error) {
    console.log('[Analytics] setUserProperties error:', error);
  }
}

// 記錄事件
export async function logEvent(event: AnalyticsEvent, params?: EventParams): Promise<void> {
  if (!isInitialized) await initializeAnalytics();
  
  try {
    const eventParams = {
      ...params,
      platform: Platform.OS,
      timestamp: new Date().toISOString(),
    };
    
    if (analytics) {
      await analytics.logEvent(event, eventParams);
    }
    
    // 開發環境下打印日誌
    if (__DEV__) {
      console.log('[Analytics] Event:', event, eventParams);
    }
    
    // Fallback: 發送到自己的 API（可選）
    await sendToBackend(event, eventParams);
  } catch (error) {
    console.log('[Analytics] logEvent error:', error);
  }
}

// 記錄頁面瀏覽
export async function logScreenView(screenName: string, screenClass?: string): Promise<void> {
  await logEvent('screen_view', {
    screen_name: screenName,
    screen_class: screenClass || screenName,
  });
}

// Fallback: 發送事件到後端 API
async function sendToBackend(event: string, params: any): Promise<void> {
  try {
    const userId = await AsyncStorage.getItem('@analytics_user_id');
    
    await fetch('https://pickcardrebate.com/api/stats/app-event', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event,
        params,
        userId,
        platform: Platform.OS,
        timestamp: new Date().toISOString(),
      }),
    });
  } catch {
    // 靜默失敗，不影響用戶體驗
  }
}

// ============ 便捷追蹤函數 ============

// 搜索
export function trackSearch(searchTerm: string): Promise<void> {
  return logEvent('search', { search_term: searchTerm });
}

// 計算回贈
export function trackCalculateRebate(params: {
  amount: number;
  paymentMethod: string;
  merchant?: string;
  category?: string;
}): Promise<void> {
  return logEvent('calculate_rebate', {
    amount: params.amount,
    payment_method: params.paymentMethod,
    merchant: params.merchant,
    category_name: params.category,
    value: params.amount,
    currency: 'HKD',
  });
}

// 選擇類別
export function trackSelectCategory(categoryName: string): Promise<void> {
  return logEvent('select_category', {
    category_name: categoryName,
    content_type: 'category',
  });
}

// 查看卡片
export function trackViewCard(params: {
  cardId: string;
  cardName: string;
  cardBank: string;
}): Promise<void> {
  return logEvent('view_card', {
    card_id: params.cardId,
    card_name: params.cardName,
    card_bank: params.cardBank,
    content_type: 'credit_card',
    item_id: params.cardId,
  });
}

// 點擊申請
export function trackClickApply(params: {
  cardId: string;
  cardName: string;
  cardBank: string;
  isPartner?: boolean;
}): Promise<void> {
  const eventName = params.isPartner ? 'click_apply_partner' : 'click_apply_official';
  return logEvent(eventName, {
    card_id: params.cardId,
    card_name: params.cardName,
    card_bank: params.cardBank,
    content_type: 'credit_card_application',
    apply_type: params.isPartner ? 'partner' : 'official',
  });
}

// 登入
export function trackLogin(method: string = 'google'): Promise<void> {
  return logEvent('login', { method });
}

// 註冊
export function trackSignUp(method: string = 'google'): Promise<void> {
  return logEvent('sign_up', { method });
}

// 登出
export function trackLogout(): Promise<void> {
  return logEvent('logout', {});
}

// 添加到錢包
export function trackAddToWallet(params: {
  cardId: string;
  cardName: string;
}): Promise<void> {
  return logEvent('add_to_wallet', {
    card_id: params.cardId,
    card_name: params.cardName,
    content_type: 'credit_card',
    item_id: params.cardId,
  });
}

// 從錢包移除
export function trackRemoveFromWallet(params: {
  cardId: string;
  cardName: string;
}): Promise<void> {
  return logEvent('remove_from_wallet', {
    card_id: params.cardId,
    card_name: params.cardName,
  });
}

// 查看文章
export function trackViewArticle(params: {
  articleSlug: string;
  articleTitle: string;
}): Promise<void> {
  return logEvent('view_article', {
    article_slug: params.articleSlug,
    article_title: params.articleTitle,
    content_type: 'article',
    item_id: params.articleSlug,
  });
}

// 分享
export function trackShare(params: {
  contentType: string;
  itemId: string;
  method?: string;
}): Promise<void> {
  return logEvent('share', {
    content_type: params.contentType,
    item_id: params.itemId,
    method: params.method,
  });
}

// 新增消費記錄
export function trackAddTransaction(params: {
  amount: number;
  merchant: string;
  cardId: string;
}): Promise<void> {
  return logEvent('add_transaction', {
    amount: params.amount,
    merchant: params.merchant,
    card_id: params.cardId,
    value: params.amount,
    currency: 'HKD',
  });
}

// 查看推薦
export function trackViewRecommendations(): Promise<void> {
  return logEvent('view_recommendations', {});
}

