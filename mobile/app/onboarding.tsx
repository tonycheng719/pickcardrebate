'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Alert,
  ActivityIndicator,
  TextInput,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/lib/auth/AuthContext';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';

const HK_DISTRICTS = [
  {
    region: "香港島",
    districts: ["中西區", "東區", "南區", "灣仔區"]
  },
  {
    region: "九龍",
    districts: ["九龍城區", "觀塘區", "深水埗區", "黃大仙區", "油尖旺區"]
  },
  {
    region: "新界",
    districts: ["離島區", "葵青區", "北區", "西貢區", "沙田區", "大埔區", "荃灣區", "屯門區", "元朗區"]
  }
];

const GENDERS = [
  { id: 'male', label: '男' },
  { id: 'female', label: '女' },
  { id: 'other', label: '其他' },
];

// Simple debounce utility
function debounce<T extends (...args: any[]) => any>(func: T, wait: number): T {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  return ((...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  }) as T;
}

export default function OnboardingScreen() {
  const router = useRouter();
  const { user, refreshProfile } = useAuth();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  const [username, setUsername] = useState('');
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'available' | 'taken' | 'invalid'>('idle');
  const [usernameError, setUsernameError] = useState('');
  const [gender, setGender] = useState<string>('');
  const [district, setDistrict] = useState<string>('');
  const [birthYear, setBirthYear] = useState<string>('');
  const [birthMonth, setBirthMonth] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDistrictPicker, setShowDistrictPicker] = useState(false);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 80 }, (_, i) => currentYear - 18 - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

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

  const handleUsernameChange = (value: string) => {
    // 只允許英文、數字、底線
    const sanitized = value.replace(/[^a-zA-Z0-9_]/g, '').slice(0, 20);
    setUsername(sanitized);
    setUsernameStatus('idle');
    setUsernameError('');
    
    if (sanitized.length >= 3) {
      checkUsernameDebounced(sanitized);
    }
  };

  const isFormValid = username && usernameStatus === 'available' && gender && district && birthYear && birthMonth;

  const handleSubmit = async () => {
    if (!isFormValid || !user) return;

    setIsLoading(true);
    try {
      const response = await fetch('https://pickcardrebate.com/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          username,
          gender,
          district,
          birthYear: parseInt(birthYear),
          birthMonth: parseInt(birthMonth),
        }),
      });

      if (response.ok) {
        // Refresh profile to update needsOnboarding state
        await refreshProfile();
        Alert.alert('設定完成！', '歡迎使用 PickCardRebate', [
          { text: '開始使用', onPress: () => router.replace('/(tabs)') }
        ]);
      } else {
        const data = await response.json();
        Alert.alert('儲存失敗', data.error || '請稍後再試');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      Alert.alert('儲存失敗', '網絡錯誤，請稍後再試');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    Alert.alert(
      '確定跳過？',
      '填寫資料可以幫助我們提供更準確的信用卡建議',
      [
        { text: '繼續填寫', style: 'cancel' },
        { text: '跳過', onPress: () => router.replace('/(tabs)') }
      ]
    );
  };

  if (!user) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.emoji}>👋</Text>
          <Text style={[styles.title, { color: colors.text }]}>
            歡迎加入 PickCardRebate
          </Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>
            為了提供更精準的信用卡優惠資訊，請填寫以下基本資料
          </Text>
        </View>

        {/* Username */}
        <View style={styles.section}>
          <Text style={[styles.label, { color: colors.text }]}>用戶名 *</Text>
          <View style={styles.usernameContainer}>
            <TextInput
              style={[
                styles.usernameInput,
                { 
                  backgroundColor: colors.backgroundCard, 
                  borderColor: usernameStatus === 'available' ? '#22c55e' :
                    usernameStatus === 'taken' || usernameStatus === 'invalid' ? '#ef4444' : colors.border,
                  color: colors.text,
                }
              ]}
              placeholder="輸入用戶名（英文、數字或底線）"
              placeholderTextColor={colors.textMuted}
              value={username}
              onChangeText={handleUsernameChange}
              autoCapitalize="none"
              autoCorrect={false}
              maxLength={20}
            />
            <View style={styles.usernameStatus}>
              {usernameStatus === 'checking' && <ActivityIndicator size="small" color={colors.textMuted} />}
              {usernameStatus === 'available' && <Ionicons name="checkmark-circle" size={24} color="#22c55e" />}
              {(usernameStatus === 'taken' || usernameStatus === 'invalid') && <Ionicons name="close-circle" size={24} color="#ef4444" />}
            </View>
          </View>
          {usernameError ? (
            <Text style={styles.errorText}>{usernameError}</Text>
          ) : usernameStatus === 'available' ? (
            <Text style={styles.successText}>✓ 此用戶名可以使用</Text>
          ) : (
            <Text style={[styles.hintText, { color: colors.textMuted }]}>
              用戶名將用於留言等公開場合，無法更改
            </Text>
          )}
        </View>

        {/* Gender Selection */}
        <View style={styles.section}>
          <Text style={[styles.label, { color: colors.text }]}>性別</Text>
          <View style={styles.genderContainer}>
            {GENDERS.map((g) => (
              <TouchableOpacity
                key={g.id}
                style={[
                  styles.genderButton,
                  { 
                    backgroundColor: gender === g.id ? colors.primary : colors.backgroundCard,
                    borderColor: gender === g.id ? colors.primary : colors.border,
                  }
                ]}
                onPress={() => setGender(g.id)}
              >
                <Text style={[
                  styles.genderText,
                  { color: gender === g.id ? '#fff' : colors.text }
                ]}>
                  {g.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* District Selection */}
        <View style={styles.section}>
          <Text style={[styles.label, { color: colors.text }]}>居住地區</Text>
          <TouchableOpacity
            style={[styles.picker, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}
            onPress={() => setShowDistrictPicker(true)}
          >
            <Text style={[styles.pickerText, { color: district ? colors.text : colors.textMuted }]}>
              {district || '選擇地區'}
            </Text>
            <Ionicons name="chevron-down" size={20} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* Birth Year & Month */}
        <View style={styles.section}>
          <Text style={[styles.label, { color: colors.text }]}>出生年月</Text>
          <View style={styles.birthRow}>
            <TouchableOpacity
              style={[styles.picker, styles.halfPicker, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}
              onPress={() => setShowYearPicker(true)}
            >
              <Text style={[styles.pickerText, { color: birthYear ? colors.text : colors.textMuted }]}>
                {birthYear ? `${birthYear}年` : '年份'}
              </Text>
              <Ionicons name="chevron-down" size={20} color={colors.textMuted} />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.picker, styles.halfPicker, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}
              onPress={() => setShowMonthPicker(true)}
            >
              <Text style={[styles.pickerText, { color: birthMonth ? colors.text : colors.textMuted }]}>
                {birthMonth ? `${birthMonth}月` : '月份'}
              </Text>
              <Ionicons name="chevron-down" size={20} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity
          style={[
            styles.submitButton,
            { backgroundColor: isFormValid ? colors.primary : colors.border }
          ]}
          onPress={handleSubmit}
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitText}>完成設定</Text>
          )}
        </TouchableOpacity>

        {/* Skip Button */}
        <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
          <Text style={[styles.skipText, { color: colors.textMuted }]}>
            稍後再說
          </Text>
        </TouchableOpacity>
      </ScrollView>

      {/* District Picker Modal */}
      {showDistrictPicker && (
        <View style={[styles.modalOverlay]}>
          <View style={[styles.modal, { backgroundColor: colors.background }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>選擇地區</Text>
              <TouchableOpacity onPress={() => setShowDistrictPicker(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalScroll}>
              {HK_DISTRICTS.map((region) => (
                <View key={region.region}>
                  <Text style={[styles.regionTitle, { color: colors.textMuted }]}>{region.region}</Text>
                  {region.districts.map((d) => (
                    <TouchableOpacity
                      key={d}
                      style={[styles.optionItem, { borderBottomColor: colors.border }]}
                      onPress={() => {
                        setDistrict(d);
                        setShowDistrictPicker(false);
                      }}
                    >
                      <Text style={[styles.optionText, { color: colors.text }]}>{d}</Text>
                      {district === d && <Ionicons name="checkmark" size={20} color={colors.primary} />}
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      )}

      {/* Year Picker Modal */}
      {showYearPicker && (
        <View style={[styles.modalOverlay]}>
          <View style={[styles.modal, { backgroundColor: colors.background }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>選擇年份</Text>
              <TouchableOpacity onPress={() => setShowYearPicker(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalScroll}>
              {years.map((y) => (
                <TouchableOpacity
                  key={y}
                  style={[styles.optionItem, { borderBottomColor: colors.border }]}
                  onPress={() => {
                    setBirthYear(y.toString());
                    setShowYearPicker(false);
                  }}
                >
                  <Text style={[styles.optionText, { color: colors.text }]}>{y}年</Text>
                  {birthYear === y.toString() && <Ionicons name="checkmark" size={20} color={colors.primary} />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      )}

      {/* Month Picker Modal */}
      {showMonthPicker && (
        <View style={[styles.modalOverlay]}>
          <View style={[styles.modal, { backgroundColor: colors.background }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>選擇月份</Text>
              <TouchableOpacity onPress={() => setShowMonthPicker(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalScroll}>
              {months.map((m) => (
                <TouchableOpacity
                  key={m}
                  style={[styles.optionItem, { borderBottomColor: colors.border }]}
                  onPress={() => {
                    setBirthMonth(m.toString());
                    setShowMonthPicker(false);
                  }}
                >
                  <Text style={[styles.optionText, { color: colors.text }]}>{m}月</Text>
                  {birthMonth === m.toString() && <Ionicons name="checkmark" size={20} color={colors.primary} />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  genderContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  genderButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  genderText: {
    fontSize: 16,
    fontWeight: '500',
  },
  picker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 8,
    borderWidth: 1,
  },
  halfPicker: {
    flex: 1,
  },
  pickerText: {
    fontSize: 16,
  },
  birthRow: {
    flexDirection: 'row',
    gap: 12,
  },
  submitButton: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  skipButton: {
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 12,
  },
  skipText: {
    fontSize: 14,
  },
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modal: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  modalScroll: {
    paddingHorizontal: 16,
  },
  regionTitle: {
    fontSize: 12,
    fontWeight: '600',
    paddingVertical: 12,
    paddingTop: 16,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
  },
  optionText: {
    fontSize: 16,
  },
  usernameContainer: {
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
  usernameStatus: {
    position: 'absolute',
    right: 12,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  errorText: {
    color: '#ef4444',
    fontSize: 12,
    marginTop: 4,
  },
  successText: {
    color: '#22c55e',
    fontSize: 12,
    marginTop: 4,
  },
  hintText: {
    fontSize: 12,
    marginTop: 4,
  },
});

