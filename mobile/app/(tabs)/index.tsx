import React, { useState, useMemo, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TextInput,
  ActivityIndicator,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BankColors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { useColorScheme } from '@/components/useColorScheme';
import { Card, RewardBadge } from '@/components/ui';
import { MERCHANT_CATEGORIES, MERCHANTS, searchMerchants } from '@/lib/data/merchants';
import { api, CalculateResult } from '@/lib/api/client';
import type { Merchant } from '@/lib/types';

// 支付方式選項（與網站一致）
const PAYMENT_METHODS = [
  { id: 'physical_card', name: '實體卡', icon: 'card' },
  { id: 'online', name: '網上', icon: 'globe' },
  { id: 'apple_pay', name: 'Apple Pay', icon: 'logo-apple' },
  { id: 'google_pay', name: 'Google Pay', icon: 'logo-google' },
  { id: 'alipay', name: 'AlipayHK', icon: 'wallet' },
  { id: 'wechat_pay', name: 'WeChat Pay', icon: 'chatbubble' },
  { id: 'unionpay', name: '雲閃付', icon: 'card' },
  { id: 'boc_pay', name: 'BoC Pay', icon: 'card' },
] as const;

export default function CalculatorScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  // 狀態
  const [selectedCategory, setSelectedCategory] = useState<string>('supermarket');
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('physical_card');
  const [calculatedResults, setCalculatedResults] = useState<CalculateResult[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);

  // 當前類別的商戶
  const currentMerchants = useMemo(() => {
    const category = MERCHANT_CATEGORIES.find(c => c.id === selectedCategory);
    return category?.merchants || [];
  }, [selectedCategory]);

  // 選擇商戶
  const handleSelectMerchant = (merchant: Merchant) => {
    setSelectedMerchant(merchant);
  };

  // 計算回贈 - 使用真正的 API
  const handleCalculate = useCallback(async () => {
    if (!selectedMerchant) {
      Alert.alert('提示', '請選擇商戶');
      return;
    }

    const amountNum = parseFloat(amount) || 0;
    setIsCalculating(true);

    try {
      const response = await api.calculate({
        query: selectedMerchant.name,
        amount: amountNum,
        paymentMethod: paymentMethod,
        limit: 10,
      });

      if (response.data) {
        setCalculatedResults(response.data.results);
      } else {
        Alert.alert('錯誤', response.error || '計算失敗');
      }
    } catch (error) {
      Alert.alert('錯誤', '無法連接伺服器');
    } finally {
      setIsCalculating(false);
    }
  }, [selectedMerchant, amount, paymentMethod]);

  // 格式化日期建議
  const formatDateSuggestion = (suggestion: CalculateResult['dateSuggestion']) => {
    if (!suggestion) return null;
    
    const days = ['日', '一', '二', '三', '四', '五', '六'];
    if (suggestion.validDays && suggestion.validDays.length > 0) {
      const dayNames = suggestion.validDays.map(d => `星期${days[d]}`).join('、');
      return `💡 ${dayNames}消費可享 ${suggestion.newPercentage}%`;
    }
    if (suggestion.validDates && suggestion.validDates.length > 0) {
      return `💡 每月 ${suggestion.validDates.join('、')} 號消費可享 ${suggestion.newPercentage}%`;
    }
    return null;
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      {/* 可滾動區域 */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 180 }}
      >
        {/* 標題區 */}
        <View style={styles.headerSection}>
          <Text style={[styles.greeting, { color: colors.textMuted }]}>你好, 精明消費者 👋</Text>
          <Text style={[styles.title, { color: colors.text }]}>信用卡回贈計算機</Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>
            選擇商戶與消費方式，即刻知道哪張卡最抵。
          </Text>
        </View>

        {/* 類別選擇 */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.categoryScroll}
          contentContainerStyle={styles.categoryContent}
        >
          {MERCHANT_CATEGORIES.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryChip,
                {
                  backgroundColor: selectedCategory === category.id 
                    ? colors.primary 
                    : colors.backgroundCard,
                  borderColor: selectedCategory === category.id 
                    ? colors.primary 
                    : colors.border,
                },
              ]}
              onPress={() => {
                setSelectedCategory(category.id);
                setSelectedMerchant(null);
                setCalculatedResults([]);
              }}
            >
              <Text style={styles.categoryIcon}>{category.icon}</Text>
              <Text 
                style={[
                  styles.categoryName,
                  { 
                    color: selectedCategory === category.id 
                      ? '#FFFFFF' 
                      : colors.text 
                  },
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 商戶列表 */}
        <View style={styles.merchantSection}>
          <View style={styles.merchantGrid}>
            {currentMerchants.map((merchant) => (
              <TouchableOpacity
                key={merchant.id}
                style={[
                  styles.merchantCard,
                  {
                    backgroundColor: selectedMerchant?.id === merchant.id 
                      ? colors.primaryLight 
                      : colors.backgroundCard,
                    borderColor: selectedMerchant?.id === merchant.id 
                      ? colors.primary 
                      : colors.border,
                  },
                ]}
                onPress={() => handleSelectMerchant(merchant)}
              >
                <Text style={styles.merchantIcon}>
                  {MERCHANT_CATEGORIES.find(c => c.id === merchant.category)?.icon || '🏪'}
                </Text>
                <Text 
                  style={[
                    styles.merchantName, 
                    { color: colors.text }
                  ]}
                  numberOfLines={2}
                >
                  {merchant.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* 已選商戶顯示 */}
        {selectedMerchant && (
          <View style={[styles.selectedSection, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}>
            <Text style={[styles.selectedLabel, { color: colors.textMuted }]}>在</Text>
            <Text style={[styles.selectedMerchant, { color: colors.primary }]}>
              {selectedMerchant.name}
            </Text>
            <Text style={[styles.selectedLabel, { color: colors.textMuted }]}>消費</Text>
          </View>
        )}

        {/* 結果列表 */}
        {calculatedResults.length > 0 && (
          <View style={styles.resultsSection}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              🏆 回贈排名
            </Text>
            {calculatedResults.map((result) => {
              const bankColor = BankColors[result.bank] || BankColors.default;
              const dateSuggestionText = formatDateSuggestion(result.dateSuggestion);
              
              return (
                <Card 
                  key={result.cardId} 
                  style={styles.resultCard}
                  onPress={() => {}}
                >
                  <View style={styles.resultRow}>
                    {/* 排名 */}
                    <View style={[
                      styles.rankBadge,
                      {
                        backgroundColor: result.rank === 1 ? '#FFD700' : 
                                         result.rank === 2 ? '#C0C0C0' : 
                                         result.rank === 3 ? '#CD7F32' : colors.borderLight,
                      },
                    ]}>
                      <Text style={[
                        styles.rankNumber,
                        { color: result.rank <= 3 ? '#FFFFFF' : colors.textMuted }
                      ]}>
                        {result.rank}
                      </Text>
                    </View>

                    {/* 卡片圖片或顏色 */}
                    {result.imageUrl ? (
                      <Image 
                        source={{ uri: result.imageUrl }}
                        style={styles.cardImage}
                        resizeMode="cover"
                      />
                    ) : (
                      <View style={[styles.cardColorSmall, { backgroundColor: bankColor.bg }]}>
                        <Text style={[styles.cardBankShort, { color: bankColor.text }]}>
                          {result.bank.slice(0, 3)}
                        </Text>
                      </View>
                    )}

                    {/* 卡片信息 */}
                    <View style={styles.resultInfo}>
                      <Text style={[styles.cardName, { color: colors.text }]} numberOfLines={1}>
                        {result.cardName}
                      </Text>
                      <Text style={[styles.bankName, { color: colors.textMuted }]}>
                        {result.bank}
                      </Text>
                      <Text style={[styles.ruleDesc, { color: colors.textMuted }]} numberOfLines={1}>
                        {result.ruleDescription}
                      </Text>
                    </View>

                    {/* 回贈率和金額 */}
                    <View style={styles.resultReward}>
                      <RewardBadge rate={result.percentage} size="md" />
                      {parseFloat(amount) > 0 && (
                        <Text style={[styles.rewardAmount, { color: colors.rewardGreen }]}>
                          ${result.rewardAmount.toFixed(2)}
                        </Text>
                      )}
                    </View>
                  </View>

                  {/* 額外資訊 */}
                  {result.isCapped && (
                    <View style={[styles.extraInfo, { backgroundColor: colors.warningLight }]}>
                      <Text style={[styles.extraInfoText, { color: colors.warning }]}>
                        ⚠️ 已達回贈上限
                      </Text>
                    </View>
                  )}

                  {/* 折扣資訊 */}
                  {result.discountPercentage && result.discountPercentage > 0 && (
                    <View style={[styles.extraInfo, { backgroundColor: colors.successLight }]}>
                      <Text style={[styles.extraInfoText, { color: colors.success }]}>
                        🏷️ 另享 {result.discountPercentage}% 折扣，節省 ${result.discountAmount?.toFixed(2)}
                      </Text>
                    </View>
                  )}

                  {/* 日期建議 */}
                  {dateSuggestionText && (
                    <View style={[styles.extraInfo, { backgroundColor: colors.primaryLight }]}>
                      <Text style={[styles.extraInfoText, { color: colors.primary }]}>
                        {dateSuggestionText}
                      </Text>
                    </View>
                  )}

                  {/* 消費建議 */}
                  {result.spendingSuggestion && (
                    <View style={[styles.extraInfo, { backgroundColor: colors.primaryLight }]}>
                      <Text style={[styles.extraInfoText, { color: colors.primary }]}>
                        💰 消費滿 ${result.spendingSuggestion.targetAmount} 可享 {result.spendingSuggestion.newPercentage}%
                      </Text>
                    </View>
                  )}

                  {/* 支付方式建議 */}
                  {result.suggestedPaymentMethod && (
                    <View style={[styles.extraInfo, { backgroundColor: colors.primaryLight }]}>
                      <Text style={[styles.extraInfoText, { color: colors.primary }]}>
                        📱 改用 {PAYMENT_METHODS.find(m => m.id === result.suggestedPaymentMethod)?.name || result.suggestedPaymentMethod} 可獲更高回贈
                      </Text>
                    </View>
                  )}
                </Card>
              );
            })}
          </View>
        )}

      </ScrollView>

      {/* 固定底部區域 */}
      <View style={[styles.fixedBottom, { backgroundColor: colors.background, borderTopColor: colors.border }]}>
        {/* 金額輸入 */}
        <View style={[styles.amountInputContainer, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}>
          <Text style={[styles.currencySymbol, { color: colors.textMuted }]}>$</Text>
          <TextInput
            style={[styles.amountInput, { color: colors.text }]}
            placeholder="輸入金額"
            placeholderTextColor={colors.textMuted}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
          />
        </View>

        {/* 支付方式 */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.paymentScroll}
        >
          {PAYMENT_METHODS.map((method) => (
            <TouchableOpacity
              key={method.id}
              style={[
                styles.paymentChip,
                {
                  backgroundColor: paymentMethod === method.id 
                    ? colors.primaryLight 
                    : colors.backgroundCard,
                  borderColor: paymentMethod === method.id 
                    ? colors.primary 
                    : colors.border,
                },
              ]}
              onPress={() => setPaymentMethod(method.id)}
            >
              <Ionicons 
                name={method.icon as any} 
                size={16} 
                color={paymentMethod === method.id ? colors.primary : colors.textMuted}
              />
              <Text 
                style={[
                  styles.paymentName,
                  { 
                    color: paymentMethod === method.id 
                      ? colors.primary 
                      : colors.text 
                  },
                ]}
              >
                {method.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* 計算按鈕 */}
        <TouchableOpacity
          style={[
            styles.calculateBtn,
            { 
              backgroundColor: selectedMerchant ? colors.primary : colors.borderLight,
            }
          ]}
          onPress={handleCalculate}
          disabled={!selectedMerchant || isCalculating}
        >
          {isCalculating ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Text style={styles.calculateBtnText}>即刻計回贈</Text>
          )}
        </TouchableOpacity>
    </View>
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
  headerSection: {
    paddingHorizontal: Layout.spacing.md,
    paddingTop: Layout.spacing.md,
    paddingBottom: Layout.spacing.sm,
  },
  greeting: {
    fontSize: Layout.fontSize.sm,
    marginBottom: 4,
  },
  title: {
    fontSize: Layout.fontSize['2xl'],
    fontWeight: Layout.fontWeight.bold,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: Layout.fontSize.sm,
    lineHeight: 20,
  },
  categoryScroll: {
    marginTop: Layout.spacing.md,
  },
  categoryContent: {
    paddingHorizontal: Layout.spacing.md,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: Layout.radius.full,
    borderWidth: 1,
    marginRight: 8,
  },
  categoryIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  categoryName: {
    fontSize: Layout.fontSize.xs,
    fontWeight: Layout.fontWeight.medium,
  },
  merchantSection: {
    paddingHorizontal: Layout.spacing.md,
    paddingTop: Layout.spacing.md,
  },
  merchantGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  merchantCard: {
    width: '31%',
    aspectRatio: 1,
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  merchantIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  merchantName: {
    fontSize: Layout.fontSize.xs,
    textAlign: 'center',
    fontWeight: Layout.fontWeight.medium,
  },
  selectedSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Layout.spacing.md,
    marginTop: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.md,
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
    gap: 6,
  },
  selectedLabel: {
    fontSize: Layout.fontSize.sm,
  },
  selectedMerchant: {
    fontSize: Layout.fontSize.base,
    fontWeight: Layout.fontWeight.bold,
  },
  fixedBottom: {
    position: 'absolute',
    bottom: 85,
    left: 0,
    right: 0,
    paddingHorizontal: Layout.spacing.md,
    paddingTop: Layout.spacing.sm,
    paddingBottom: Layout.spacing.sm,
    borderTopWidth: 1,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
    paddingHorizontal: Layout.spacing.md,
    height: 48,
  },
  currencySymbol: {
    fontSize: Layout.fontSize.lg,
    fontWeight: Layout.fontWeight.bold,
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: Layout.fontSize.lg,
    fontWeight: Layout.fontWeight.semibold,
  },
  paymentScroll: {
    marginTop: Layout.spacing.sm,
  },
  paymentChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
    marginRight: 8,
    gap: 4,
  },
  paymentName: {
    fontSize: Layout.fontSize.xs,
    fontWeight: Layout.fontWeight.medium,
  },
  calculateBtn: {
    marginTop: Layout.spacing.md,
    paddingVertical: 14,
    borderRadius: Layout.radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calculateBtnText: {
    color: '#FFFFFF',
    fontSize: Layout.fontSize.base,
    fontWeight: Layout.fontWeight.bold,
  },
  resultsSection: {
    paddingHorizontal: Layout.spacing.md,
    paddingTop: Layout.spacing.lg,
  },
  sectionTitle: {
    fontSize: Layout.fontSize.lg,
    fontWeight: Layout.fontWeight.bold,
    marginBottom: Layout.spacing.md,
  },
  resultCard: {
    marginBottom: Layout.spacing.sm,
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rankBadge: {
    width: 28,
    height: 28,
    borderRadius: Layout.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Layout.spacing.sm,
  },
  rankNumber: {
    fontSize: Layout.fontSize.sm,
    fontWeight: Layout.fontWeight.bold,
  },
  cardImage: {
    width: 50,
    height: 32,
    borderRadius: Layout.radius.sm,
    marginRight: Layout.spacing.sm,
  },
  cardColorSmall: {
    width: 50,
    height: 32,
    borderRadius: Layout.radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Layout.spacing.sm,
  },
  cardBankShort: {
    fontSize: Layout.fontSize.xs,
    fontWeight: Layout.fontWeight.bold,
  },
  resultInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: Layout.fontSize.sm,
    fontWeight: Layout.fontWeight.semibold,
  },
  bankName: {
    fontSize: Layout.fontSize.xs,
    marginTop: 1,
  },
  ruleDesc: {
    fontSize: Layout.fontSize.xs,
    marginTop: 2,
  },
  resultReward: {
    alignItems: 'flex-end',
  },
  rewardAmount: {
    fontSize: Layout.fontSize.sm,
    fontWeight: Layout.fontWeight.bold,
    marginTop: 4,
  },
  extraInfo: {
    marginTop: Layout.spacing.sm,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: Layout.radius.md,
  },
  extraInfoText: {
    fontSize: Layout.fontSize.xs,
    fontWeight: Layout.fontWeight.medium,
  },
});
