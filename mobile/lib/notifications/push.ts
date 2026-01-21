import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

const API_BASE = 'https://pickcardrebate.com';
const PUSH_TOKEN_KEY = '@push_token';

// 設置通知處理
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

// 註冊推送通知
export async function registerForPushNotifications(userId?: string): Promise<string | null> {
  if (!Device.isDevice) {
    console.log('[Push] Must use physical device for Push Notifications');
    return null;
  }

  try {
    // 檢查權限
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      console.log('[Push] Permission not granted');
      return null;
    }

    // 獲取 Expo Push Token
    const projectId = Constants.expoConfig?.extra?.eas?.projectId;
    const token = await Notifications.getExpoPushTokenAsync({
      projectId,
    });

    console.log('[Push] Token:', token.data);

    // 存儲到本地
    await AsyncStorage.setItem(PUSH_TOKEN_KEY, token.data);

    // 如果有用戶 ID，註冊到服務器
    if (userId) {
      await registerTokenToServer(userId, token.data);
    }

    // Android 需要設置通知頻道
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#3B82F6',
      });
    }

    return token.data;
  } catch (error) {
    console.error('[Push] Registration error:', error);
    return null;
  }
}

// 註冊 Token 到服務器
export async function registerTokenToServer(userId: string, token: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/api/user/push-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId,
        token,
        platform: Platform.OS,
      }),
    });

    if (response.ok) {
      console.log('[Push] Token registered to server');
      return true;
    }
    return false;
  } catch (error) {
    console.error('[Push] Server registration error:', error);
    return false;
  }
}

// 移除服務器上的 Token
export async function unregisterToken(userId: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE}/api/user/push-token?userId=${userId}`, {
      method: 'DELETE',
    });
    return response.ok;
  } catch (error) {
    console.error('[Push] Unregister error:', error);
    return false;
  }
}

// 獲取本地存儲的 Token
export async function getStoredToken(): Promise<string | null> {
  try {
    return await AsyncStorage.getItem(PUSH_TOKEN_KEY);
  } catch {
    return null;
  }
}

// 添加通知監聽器
export function addNotificationListener(
  onReceive: (notification: Notifications.Notification) => void,
  onResponse: (response: Notifications.NotificationResponse) => void
) {
  const receiveSubscription = Notifications.addNotificationReceivedListener(onReceive);
  const responseSubscription = Notifications.addNotificationResponseReceivedListener(onResponse);

  return () => {
    receiveSubscription.remove();
    responseSubscription.remove();
  };
}
