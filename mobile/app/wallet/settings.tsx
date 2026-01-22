import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  Switch,
  Alert,
  Linking,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { useColorScheme } from '@/components/useColorScheme';
import { clearWallet } from '@/lib/storage/myCards';
import { useTranslation } from '@/lib/i18n/context';
import { Locale, localeNames, localeFlags } from '@/lib/i18n/translations';
import { useAuth } from '@/lib/auth/AuthContext';

const THEME_KEY = '@theme_preference';
const NOTIFICATIONS_KEY = '@notifications_enabled';

type ThemePreference = 'system' | 'light' | 'dark';

const LOCALES: Locale[] = ['zh-HK', 'zh-CN', 'en'];

// Simple debounce utility
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return ((...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
}

export default function SettingsScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { locale, setLocale, t } = useTranslation();
  const { user, profile, refreshProfile } = useAuth();
  
  const [themePreference, setThemePreference] = useState<ThemePreference>('system');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  // Username state
  const [usernameInput, setUsernameInput] = useState('');
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'available' | 'taken' | 'invalid'>('idle');
  const [usernameError, setUsernameError] = useState('');
  const [isSavingUsername, setIsSavingUsername] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  // 驗證用戶名
  const checkUsernameDebounced = useCallback(
    debounce(async (value: string) => {
      if (!value || value.length < 3) {
        setUsernameStatus('idle');
        return;
      }

      setUsernameStatus('checking');
      try {
        const res = await fetch(`https://pickcardrebate.com/api/user/check-username?username=${encodeURIComponent(value)}`);
        const data = await res.json();
        
        if (data.available) {
          setUsernameStatus('available');
          setUsernameError('');
        } else {
          setUsernameStatus(data.error?.includes('格式') || data.error?.includes('字符') ? 'invalid' : 'taken');
          setUsernameError(data.error || '用戶名不可用');
        }
      } catch {
        setUsernameStatus('idle');
      }
    }, 500),
    []
  );

  const handleUsernameInputChange = (value: string) => {
    const sanitized = value.replace(/[^a-zA-Z0-9_]/g, '').slice(0, 20);
    setUsernameInput(sanitized);
    setUsernameStatus('idle');
    setUsernameError('');
    
    if (sanitized.length >= 3) {
      checkUsernameDebounced(sanitized);
    }
  };

  const handleSaveUsername = async () => {
    if (!user || usernameStatus !== 'available' || !usernameInput) return;
    
    setIsSavingUsername(true);
    try {
      const res = await fetch('https://pickcardrebate.com/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          username: usernameInput,
        }),
      });
      
      if (res.ok) {
        await refreshProfile();
        setUsernameInput('');
        setUsernameStatus('idle');
        Alert.alert('成功', '用戶名設定成功！');
      } else {
        const data = await res.json();
        Alert.alert('錯誤', data.error || '儲存失敗');
      }
    } catch (error) {
      Alert.alert('錯誤', '儲存失敗，請稍後再試');
    } finally {
      setIsSavingUsername(false);
    }
  };

  const loadSettings = async () => {
    try {
      const theme = await AsyncStorage.getItem(THEME_KEY);
      if (theme) setThemePreference(theme as ThemePreference);
      
      const notifications = await AsyncStorage.getItem(NOTIFICATIONS_KEY);
      if (notifications !== null) setNotificationsEnabled(notifications === 'true');
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  };

  const handleThemeChange = async (theme: ThemePreference) => {
    setThemePreference(theme);
    await AsyncStorage.setItem(THEME_KEY, theme);
    Alert.alert('主題已更改', '請重新啟動 App 以套用新主題');
  };

  const handleNotificationsToggle = async (value: boolean) => {
    setNotificationsEnabled(value);
    await AsyncStorage.setItem(NOTIFICATIONS_KEY, value.toString());
  };

  const handleClearCache = () => {
    Alert.alert(
      '清除快取',
      '確定要清除所有快取數據嗎？這不會影響您的卡包和收藏。',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '清除',
          style: 'destructive',
          onPress: async () => {
            // 這裡可以清除各種快取
            Alert.alert('完成', '快取已清除');
          },
        },
      ]
    );
  };

  const handleClearWallet = () => {
    Alert.alert(
      '清空卡包',
      '確定要清空所有已添加的信用卡嗎？',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '清空',
          style: 'destructive',
          onPress: async () => {
            await clearWallet();
            Alert.alert('完成', '卡包已清空');
          },
        },
      ]
    );
  };

  const themeOptions: { id: ThemePreference; name: string; icon: string }[] = [
    { id: 'system', name: '跟隨系統', icon: 'phone-portrait-outline' },
    { id: 'light', name: '淺色模式', icon: 'sunny-outline' },
    { id: 'dark', name: '深色模式', icon: 'moon-outline' },
  ];

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <Stack.Screen options={{ title: '設定', headerBackTitle: '返回' }} />
      
      <ScrollView style={styles.scrollView}>
        {/* 外觀設定 */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>外觀</Text>
          <View style={[styles.card, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}>
            {themeOptions.map((option, index) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.row,
                  index < themeOptions.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.borderLight }
                ]}
                onPress={() => handleThemeChange(option.id)}
              >
                <View style={styles.rowLeft}>
                  <Ionicons name={option.icon as any} size={22} color={colors.text} />
                  <Text style={[styles.rowText, { color: colors.text }]}>{option.name}</Text>
                </View>
                {themePreference === option.id && (
                  <Ionicons name="checkmark" size={22} color={colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 語言設定 */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>{t.settings.language}</Text>
          <View style={[styles.card, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}>
            {LOCALES.map((loc, index) => (
              <TouchableOpacity
                key={loc}
                style={[
                  styles.row,
                  index < LOCALES.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.borderLight }
                ]}
                onPress={() => setLocale(loc)}
              >
                <View style={styles.rowLeft}>
                  <Text style={{ fontSize: 20 }}>{localeFlags[loc]}</Text>
                  <Text style={[styles.rowText, { color: colors.text }]}>{localeNames[loc]}</Text>
                </View>
                {locale === loc && (
                  <Ionicons name="checkmark" size={22} color={colors.primary} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 用戶名設定 */}
        {user && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>用戶名</Text>
            <View style={[styles.card, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}>
              {profile?.username ? (
                <View style={styles.row}>
                  <View style={styles.rowLeft}>
                    <Ionicons name="at" size={22} color={colors.text} />
                    <View style={styles.rowTextContainer}>
                      <Text style={[styles.rowText, { color: colors.text }]}>@{profile.username}</Text>
                      <Text style={[styles.rowSubtext, { color: colors.textMuted }]}>
                        用戶名已設定，無法更改
                      </Text>
                    </View>
                  </View>
                </View>
              ) : (
                <View style={styles.usernameSection}>
                  <View style={styles.usernameInputContainer}>
                    <TextInput
                      style={[
                        styles.usernameInput,
                        { 
                          backgroundColor: colors.background, 
                          borderColor: usernameStatus === 'available' ? '#22c55e' :
                            usernameStatus === 'taken' || usernameStatus === 'invalid' ? '#ef4444' : colors.border,
                          color: colors.text,
                        }
                      ]}
                      placeholder="輸入用戶名（英文、數字或底線）"
                      placeholderTextColor={colors.textMuted}
                      value={usernameInput}
                      onChangeText={handleUsernameInputChange}
                      autoCapitalize="none"
                      autoCorrect={false}
                      maxLength={20}
                    />
                    <View style={styles.usernameStatusIcon}>
                      {usernameStatus === 'checking' && <ActivityIndicator size="small" color={colors.textMuted} />}
                      {usernameStatus === 'available' && <Ionicons name="checkmark-circle" size={24} color="#22c55e" />}
                      {(usernameStatus === 'taken' || usernameStatus === 'invalid') && <Ionicons name="close-circle" size={24} color="#ef4444" />}
                    </View>
                  </View>
                  {usernameError ? (
                    <Text style={styles.usernameError}>{usernameError}</Text>
                  ) : usernameStatus === 'available' ? (
                    <View style={styles.usernameSuccessRow}>
                      <Text style={styles.usernameSuccess}>✓ 此用戶名可以使用</Text>
                      <TouchableOpacity
                        style={[styles.saveUsernameBtn, { backgroundColor: colors.primary }]}
                        onPress={handleSaveUsername}
                        disabled={isSavingUsername}
                      >
                        {isSavingUsername ? (
                          <ActivityIndicator size="small" color="#fff" />
                        ) : (
                          <Text style={styles.saveUsernameBtnText}>確認設定</Text>
                        )}
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <Text style={[styles.usernameHint, { color: colors.textMuted }]}>
                      用戶名將用於留言等公開場合，設定後無法更改
                    </Text>
                  )}
                </View>
              )}
            </View>
          </View>
        )}

        {/* 通知設定 */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>{t.settings.notifications}</Text>
          <View style={[styles.card, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}>
            <View style={styles.row}>
              <View style={styles.rowLeft}>
                <Ionicons name="notifications-outline" size={22} color={colors.text} />
                <View style={styles.rowTextContainer}>
                  <Text style={[styles.rowText, { color: colors.text }]}>推送通知</Text>
                  <Text style={[styles.rowSubtext, { color: colors.textMuted }]}>
                    接收新優惠和活動提醒
                  </Text>
                </View>
              </View>
              <Switch
                value={notificationsEnabled}
                onValueChange={handleNotificationsToggle}
                trackColor={{ false: colors.borderLight, true: colors.primaryLight }}
                thumbColor={notificationsEnabled ? colors.primary : '#f4f3f4'}
              />
            </View>
          </View>
        </View>

        {/* 數據管理 */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>數據管理</Text>
          <View style={[styles.card, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}>
            <TouchableOpacity
              style={[styles.row, { borderBottomWidth: 1, borderBottomColor: colors.borderLight }]}
              onPress={handleClearCache}
            >
              <View style={styles.rowLeft}>
                <Ionicons name="trash-outline" size={22} color={colors.text} />
                <Text style={[styles.rowText, { color: colors.text }]}>清除快取</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.row} onPress={handleClearWallet}>
              <View style={styles.rowLeft}>
                <Ionicons name="card-outline" size={22} color={colors.error} />
                <Text style={[styles.rowText, { color: colors.error }]}>清空卡包</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 關於 */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textMuted }]}>關於</Text>
          <View style={[styles.card, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}>
            <TouchableOpacity
              style={[styles.row, { borderBottomWidth: 1, borderBottomColor: colors.borderLight }]}
              onPress={() => Linking.openURL('https://pickcardrebate.com/about')}
            >
              <View style={styles.rowLeft}>
                <Ionicons name="information-circle-outline" size={22} color={colors.text} />
                <Text style={[styles.rowText, { color: colors.text }]}>關於我們</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.row, { borderBottomWidth: 1, borderBottomColor: colors.borderLight }]}
              onPress={() => Linking.openURL('https://pickcardrebate.com/terms')}
            >
              <View style={styles.rowLeft}>
                <Ionicons name="document-text-outline" size={22} color={colors.text} />
                <Text style={[styles.rowText, { color: colors.text }]}>服務條款</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.row}
              onPress={() => Linking.openURL('https://pickcardrebate.com/privacy')}
            >
              <View style={styles.rowLeft}>
                <Ionicons name="shield-checkmark-outline" size={22} color={colors.text} />
                <Text style={[styles.rowText, { color: colors.text }]}>私隱政策</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
        </View>

        {/* 版本 */}
        <View style={styles.versionSection}>
          <Text style={[styles.versionText, { color: colors.textMuted }]}>
            PickCardRebate v1.0.0
          </Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginTop: Layout.spacing.lg,
    paddingHorizontal: Layout.spacing.md,
  },
  sectionTitle: {
    fontSize: Layout.fontSize.xs,
    fontWeight: Layout.fontWeight.semibold,
    textTransform: 'uppercase',
    marginBottom: Layout.spacing.sm,
    marginLeft: Layout.spacing.sm,
  },
  card: {
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Layout.spacing.md,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.md,
    flex: 1,
  },
  rowTextContainer: {
    flex: 1,
  },
  rowText: {
    fontSize: Layout.fontSize.base,
  },
  rowSubtext: {
    fontSize: Layout.fontSize.xs,
    marginTop: 2,
  },
  versionSection: {
    alignItems: 'center',
    paddingVertical: Layout.spacing.xl,
  },
  versionText: {
    fontSize: Layout.fontSize.sm,
  },
  usernameSection: {
    padding: Layout.spacing.md,
  },
  usernameInputContainer: {
    position: 'relative',
  },
  usernameInput: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    paddingRight: 48,
    borderRadius: 8,
    borderWidth: 1,
    fontSize: 16,
  },
  usernameStatusIcon: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  usernameError: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 8,
  },
  usernameSuccess: {
    color: '#22c55e',
    fontSize: 12,
  },
  usernameSuccessRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  saveUsernameBtn: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveUsernameBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  usernameHint: {
    fontSize: 12,
    marginTop: 8,
  },
});

