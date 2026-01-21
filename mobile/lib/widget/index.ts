import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WIDGET_STORAGE_KEY = '@widget_cards';

export interface WidgetCardInfo {
  id: string;
  name: string;
  bank: string;
  imageUrl?: string;
}

export interface WidgetData {
  cards: WidgetCardInfo[];
  lastUpdated: string;
}

/**
 * 更新 Widget 數據
 * 在用戶卡包變更時調用此函數
 */
export async function updateWidgetData(cards: WidgetCardInfo[]): Promise<void> {
  const widgetData: WidgetData = {
    cards: cards.slice(0, 5), // 最多顯示 5 張卡
    lastUpdated: new Date().toISOString(),
  };

  try {
    // 存儲到 AsyncStorage 作為備份
    await AsyncStorage.setItem(WIDGET_STORAGE_KEY, JSON.stringify(widgetData));

    if (Platform.OS === 'ios') {
      // iOS: 使用 App Groups 共享數據
      // 需要原生模塊支援，這裡提供接口
      try {
        const SharedGroupPreferences = require('react-native-shared-group-preferences').default;
        await SharedGroupPreferences.setItem(
          'widgetCards',
          JSON.stringify(widgetData),
          { appGroup: 'group.com.pickcardrebate.app' }
        );
        
        // 通知 WidgetKit 刷新
        const WidgetKit = require('react-native-widgetkit');
        WidgetKit.reloadAllTimelines();
      } catch (e) {
        // 原生模塊未安裝，靜默失敗
        console.log('[Widget] iOS native module not available:', e);
      }
    } else if (Platform.OS === 'android') {
      // Android: 使用 SharedPreferences
      try {
        const SharedGroupPreferences = require('react-native-shared-group-preferences').default;
        await SharedGroupPreferences.setItem(
          'widgetCards',
          JSON.stringify(widgetData),
          { appGroup: 'com.pickcardrebate.app.widget' }
        );
        
        // 通知 Android Widget 刷新
        const { AppWidgetManager } = require('react-native-android-widget');
        AppWidgetManager.updateAll('PickCardWidget');
      } catch (e) {
        console.log('[Widget] Android native module not available:', e);
      }
    }

    console.log('[Widget] Data updated:', cards.length, 'cards');
  } catch (error) {
    console.error('[Widget] Update failed:', error);
  }
}

/**
 * 獲取當前 Widget 數據
 */
export async function getWidgetData(): Promise<WidgetData | null> {
  try {
    const data = await AsyncStorage.getItem(WIDGET_STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('[Widget] Get data failed:', error);
    return null;
  }
}

/**
 * 清除 Widget 數據
 */
export async function clearWidgetData(): Promise<void> {
  try {
    await AsyncStorage.removeItem(WIDGET_STORAGE_KEY);
    
    if (Platform.OS === 'ios') {
      try {
        const SharedGroupPreferences = require('react-native-shared-group-preferences').default;
        await SharedGroupPreferences.setItem(
          'widgetCards',
          JSON.stringify({ cards: [], lastUpdated: new Date().toISOString() }),
          { appGroup: 'group.com.pickcardrebate.app' }
        );
        const WidgetKit = require('react-native-widgetkit');
        WidgetKit.reloadAllTimelines();
      } catch (e) {
        // 靜默失敗
      }
    }
  } catch (error) {
    console.error('[Widget] Clear data failed:', error);
  }
}

