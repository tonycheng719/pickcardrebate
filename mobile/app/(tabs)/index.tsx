import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
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
  Share,
  Platform,
  Linking,
  Modal,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Colors, BankColors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { useColorScheme } from '@/components/useColorScheme';
import { Card, RewardBadge } from '@/components/ui';
import { MERCHANT_CATEGORIES, MERCHANTS, searchMerchants } from '@/lib/data/merchants';
import { api, CalculateResult, MerchantData } from '@/lib/api/client';
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
  const scrollViewRef = useRef<ScrollView>(null);
  const amountInputRef = useRef<View>(null);

  // 狀態
  const [selectedCategory, setSelectedCategory] = useState<string>('supermarket');
  const [selectedMerchant, setSelectedMerchant] = useState<Merchant | null>(null);
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('physical_card');
  const [calculatedResults, setCalculatedResults] = useState<CalculateResult[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set(['0'])); // 第一張卡默認展開
  
  // 現金/里數偏好
  const [rewardPreference, setRewardPreference] = useState<'cash' | 'miles'>('cash');
  
  // 商戶數據（從 API 獲取）
  const [merchantsFromApi, setMerchantsFromApi] = useState<MerchantData[]>([]);
  const [isLoadingMerchants, setIsLoadingMerchants] = useState(true);
  
  // 「點解係呢張？」Modal 狀態
  const [whyModalVisible, setWhyModalVisible] = useState(false);
  const [selectedCardForWhy, setSelectedCardForWhy] = useState<CalculateResult | null>(null);
  
  // 滾動位置狀態（用於顯示/隱藏回到頂部按鈕）
  const [showScrollTop, setShowScrollTop] = useState(false);

  // 處理滾動事件
  const handleScroll = useCallback((event: any) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    setShowScrollTop(offsetY > 300);
  }, []);

  // 回到頂部
  const scrollToTop = useCallback(() => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  }, []);

  // 獲取商戶數據（包含 logo）
  useEffect(() => {
    const fetchMerchants = async () => {
      try {
        const response = await api.getMerchants();
        if (response.data) {
          setMerchantsFromApi(response.data.merchants);
        }
      } catch (error) {
        console.error('Failed to fetch merchants:', error);
      } finally {
        setIsLoadingMerchants(false);
      }
    };
    fetchMerchants();
  }, []);

  // 打開「點解係呢張？」Modal
  const handleWhyThisCard = (result: CalculateResult) => {
    setSelectedCardForWhy(result);
    setWhyModalVisible(true);
  };

  // 生成智能分析文字
  const generateWhyAnalysis = (result: CalculateResult) => {
    if (!selectedMerchant) return '';
    
    const parts: string[] = [];
    parts.push(`${result.cardName} 在 ${selectedMerchant.name} 有專屬 ${result.percentage}% 回贈優惠。`);
    
    if (result.overCapInfo) {
      parts.push(`每月回贈上限 $${result.overCapInfo.capAmount}。`);
    }
    
    if (result.dateSuggestion) {
      const days = ['日', '一', '二', '三', '四', '五', '六'];
      if (result.dateSuggestion.validDays && result.dateSuggestion.validDays.length > 0) {
        const dayNames = result.dateSuggestion.validDays.map(d => `星期${days[d]}`).join('、');
        parts.push(`建議於${dayNames}消費可享更高回贈。`);
      }
    }
    
    return parts.join(' ');
  };

  // 合併本地商戶數據和 API 數據（優先使用 API 的 logo）
  const merchantLogoMap = useMemo(() => {
    const map = new Map<string, string>();
    merchantsFromApi.forEach(m => {
      if (m.logo && (m.logo.startsWith('http') || m.logo.startsWith('/'))) {
        map.set(m.id, m.logo);
      }
    });
    return map;
  }, [merchantsFromApi]);

  // 當前類別的商戶（包含 API logo）
  const currentMerchants = useMemo(() => {
    const category = MERCHANT_CATEGORIES.find(c => c.id === selectedCategory);
    const merchants = category?.merchants || [];
    return merchants.map(m => ({
      ...m,
      logo: merchantLogoMap.get(m.id) || m.logo,
    }));
  }, [selectedCategory, merchantLogoMap]);

  // 選擇商戶 - 並自動滾動到金額輸入區域
  const handleSelectMerchant = (merchant: Merchant) => {
    setSelectedMerchant(merchant);
    // 清除之前的計算結果
    setCalculatedResults([]);
    // 延遲滾動，讓 UI 更新後再滾動
    setTimeout(() => {
      scrollViewRef.current?.scrollTo({ y: 450, animated: true });
    }, 100);
  };

  // 計算回贈 - 使用真正的 API
  const handleCalculate = useCallback(async () => {
    if (!selectedMerchant) {
      Alert.alert('提示', '請選擇商戶');
      return;
    }

    const amountNum = parseFloat(amount) || 0;
    setIsCalculating(true);
    setExpandedCards(new Set(['0'])); // 重置展開狀態

    try {
      const response = await api.calculate({
        query: selectedMerchant.name,
        amount: amountNum,
        paymentMethod: paymentMethod,
        limit: 10,
        rewardPreference: rewardPreference,
      });

      if (response.data) {
        setCalculatedResults(response.data.results);
        // 計算完成後自動滾動到結果區域
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({ y: 700, animated: true });
        }, 100);
      } else {
        Alert.alert('錯誤', response.error || '計算失敗');
      }
    } catch (error) {
      Alert.alert('錯誤', '無法連接伺服器');
    } finally {
      setIsCalculating(false);
    }
  }, [selectedMerchant, amount, paymentMethod]);

  // 切換卡片展開/收起
  const toggleCardExpand = (cardId: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  // 分享結果
  const handleShare = async () => {
    if (!selectedMerchant || calculatedResults.length === 0) return;
    
    const topCard = calculatedResults[0];
    const shareText = `在 ${selectedMerchant.name} 消費 $${amount || '0'}，最抵用 ${topCard.cardName}！可獲 ${topCard.percentage}% 回贈 ≈ $${topCard.rewardAmount.toFixed(2)}\n\n由 PickCardRebate 計算 https://pickcardrebate.com`;
    
    try {
      await Share.share({
        message: shareText,
        title: `${selectedMerchant.name} 最抵攻略`,
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

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

  // 渲染第一名卡片（推薦最抵卡）
  const renderTopCard = (result: CalculateResult) => {
    const bankColor = BankColors[result.bank] || BankColors.default;
    const isExpanded = expandedCards.has('0');
    const dateSuggestionText = formatDateSuggestion(result.dateSuggestion);

    return (
      <View style={[styles.topCardContainer, { backgroundColor: '#FEF3C7', borderColor: '#F59E0B' }]}>
        {/* 標題 */}
        <View style={styles.topCardHeader}>
          <Text style={styles.topCardLabel}>💡 如果申請新卡</Text>
          <Text style={styles.topCardTitle}>全場最抵</Text>
        </View>

        {/* 卡片資訊 */}
        <View style={[styles.topCardContent, { backgroundColor: '#FFFFFF' }]}>
          <View style={styles.topCardRow}>
            {result.imageUrl ? (
              <Image 
                source={{ uri: result.imageUrl }}
                style={styles.topCardImage}
                resizeMode="cover"
              />
            ) : (
              <View style={[styles.topCardImagePlaceholder, { backgroundColor: bankColor.bg }]}>
                <Text style={[styles.topCardBankShort, { color: bankColor.text }]}>
                  {result.bank.slice(0, 3)}
                </Text>
              </View>
            )}

            <View style={styles.topCardInfo}>
              <Text style={styles.topCardBank}>{result.bank}</Text>
              <Text style={styles.topCardName}>{result.cardName}</Text>
              <Text style={styles.topCardRule}>{result.ruleDescription}</Text>
            </View>

            <View style={styles.topCardReward}>
              {result.pointsAmount ? (
                <>
                  <Text style={styles.topCardPoints}>{`${result.pointsAmount.toLocaleString()} ${result.pointsCurrency || 'Points'}`}</Text>
                  <Text style={styles.topCardRewardText}>{`≈ $${result.rewardAmount.toFixed(1)} · ${result.percentage}%`}</Text>
                </>
              ) : (
                <>
                  <Text style={styles.topCardRewardAmount}>{`$${result.rewardAmount.toFixed(2)}`}</Text>
                  <Text style={styles.topCardRewardText}>{`${result.percentage}% 回贈`}</Text>
                </>
              )}
            </View>
          </View>

          {/* 按鈕列 */}
          <View style={styles.topCardButtons}>
            <TouchableOpacity 
              style={styles.whyButton}
              onPress={() => handleWhyThisCard(result)}
            >
              <Ionicons name="help-circle-outline" size={16} color={colors.primary} />
              <Text style={[styles.whyButtonText, { color: colors.primary }]}>點解係呢張？</Text>
            </TouchableOpacity>

            {result.applyUrl && (
              <TouchableOpacity 
                style={[styles.applyButton, { backgroundColor: colors.success }]}
                onPress={() => Linking.openURL(result.applyUrl!)}
              >
                <Text style={styles.applyButtonText}>立即申請</Text>
              </TouchableOpacity>
            )}
          </View>

          {/* 回贈組成（展開/收起） */}
          <TouchableOpacity 
            style={styles.breakdownToggle}
            onPress={() => toggleCardExpand('0')}
          >
            <Text style={[styles.breakdownToggleText, { color: colors.text }]}>回贈明細</Text>
            <Ionicons 
              name={isExpanded ? 'chevron-up' : 'chevron-down'} 
              size={18} 
              color={colors.textMuted} 
            />
          </TouchableOpacity>

          {isExpanded && (
            <View style={[styles.breakdownContent, { borderTopColor: colors.border }]}>
              <View style={styles.breakdownRow}>
                <Text style={[styles.breakdownLabel, { color: colors.textMuted }]}>基本回贈</Text>
                <Text style={[styles.breakdownValue, { color: colors.text }]}>{`${result.rewardBreakdown?.baseRate?.toFixed(2) || '0.40'}%`}</Text>
              </View>
              <View style={styles.breakdownRow}>
                <View>
                  <Text style={[styles.breakdownLabel, { color: colors.textMuted }]}>額外回贈</Text>
                  {result.rewardBreakdown?.bonusDescription && (
                    <Text style={[styles.breakdownDesc, { color: colors.primary }]}>
                      {result.rewardBreakdown.bonusDescription}
                    </Text>
                  )}
                </View>
                <Text style={[styles.breakdownValue, { color: colors.success }]}>{`+${result.rewardBreakdown?.bonusRate?.toFixed(2) || (result.percentage - 0.4).toFixed(2)}%`}</Text>
              </View>
              <View style={[styles.breakdownRow, styles.breakdownTotal]}>
                <Text style={[styles.breakdownLabelBold, { color: colors.primary }]}>總回贈</Text>
                <Text style={[styles.breakdownValueBold, { color: colors.primary }]}>{`${result.percentage.toFixed(2)}%`}</Text>
              </View>
              <View style={styles.breakdownRow}>
                <Text style={[styles.breakdownLabel, { color: colors.textMuted }]}>回贈金額</Text>
                <Text style={[styles.breakdownValue, { color: colors.text }]}>{`≈ $${result.rewardAmount.toFixed(2)}`}</Text>
              </View>
              {result.overCapInfo && (
                <View style={styles.breakdownRow}>
                  <Text style={[styles.breakdownLabel, { color: colors.warning }]}>⚠️ 上限回贈</Text>
                  <Text style={[styles.breakdownValue, { color: colors.warning }]}>{`$${result.overCapInfo.capAmount}`}</Text>
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    );
  };

  // 渲染其他卡片
  const renderOtherCard = (result: CalculateResult, index: number) => {
    const bankColor = BankColors[result.bank] || BankColors.default;
    const cardKey = index.toString();
    const isExpanded = expandedCards.has(cardKey);
    const dateSuggestionText = formatDateSuggestion(result.dateSuggestion);

    return (
      <Card 
        key={result.cardId} 
        style={styles.resultCard}
        onPress={() => router.push(`/card/${result.cardId}`)}
      >
        <View style={styles.resultRow}>
          {/* 排名 */}
          <View style={[
            styles.rankBadge,
            {
              backgroundColor: result.rank === 2 ? '#C0C0C0' : 
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
              <Text style={[styles.rewardAmount, { color: colors.rewardGreen }]}>{`$${result.rewardAmount.toFixed(2)}`}</Text>
            )}
          </View>
        </View>

        {/* 回贈組成展開 */}
        <TouchableOpacity 
          style={styles.breakdownToggleSmall}
          onPress={() => toggleCardExpand(cardKey)}
        >
          <Ionicons name="information-circle-outline" size={14} color={colors.textMuted} />
          <Text style={[styles.breakdownToggleTextSmall, { color: colors.textMuted }]}>回贈組成</Text>
          <Ionicons 
            name={isExpanded ? 'chevron-up' : 'chevron-down'} 
            size={14} 
            color={colors.textMuted} 
          />
        </TouchableOpacity>

        {isExpanded && (
          <View style={[styles.breakdownContentSmall, { borderTopColor: colors.border }]}>
            <View style={styles.breakdownRowSmall}>
              <Text style={[styles.breakdownLabelSmall, { color: colors.textMuted }]}>基本回贈</Text>
              <Text style={[styles.breakdownValueSmall, { color: colors.text }]}>{`${result.rewardBreakdown?.baseRate?.toFixed(2) || '0.40'}%`}</Text>
            </View>
            <View style={styles.breakdownRowSmall}>
              <Text style={[styles.breakdownLabelSmall, { color: colors.textMuted }]}>額外回贈</Text>
              <Text style={[styles.breakdownValueSmall, { color: colors.success }]}>{`+${result.rewardBreakdown?.bonusRate?.toFixed(2) || (result.percentage - 0.4).toFixed(2)}%`}</Text>
            </View>
            <View style={styles.breakdownRowSmall}>
              <Text style={[styles.breakdownLabelSmall, { color: colors.primary }]}>總回贈</Text>
              <Text style={[styles.breakdownValueSmall, { color: colors.primary }]}>{`${result.percentage.toFixed(2)}%`}</Text>
            </View>
          </View>
        )}

        {/* 額外提示 */}
        {result.isCapped && (
          <View style={[styles.extraInfo, { backgroundColor: colors.warningLight }]}>
            <Text style={[styles.extraInfoText, { color: colors.warning }]}>
              ⚠️ 已達回贈上限
            </Text>
          </View>
        )}

        {dateSuggestionText && (
          <View style={[styles.extraInfo, { backgroundColor: colors.primaryLight }]}>
            <Text style={[styles.extraInfoText, { color: colors.primary }]}>
              {dateSuggestionText}
            </Text>
          </View>
        )}
      </Card>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      {/* 可滾動區域 */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.scrollContent}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {/* 標題區 */}
        <View style={styles.headerSection}>
          <Text style={[styles.greeting, { color: colors.textMuted }]}>你好, 精明消費者 👋</Text>
          <Text style={[styles.title, { color: colors.text }]}>信用卡回贈計算機</Text>
          <Text style={[styles.subtitle, { color: colors.textMuted }]}>
            選擇商戶與消費方式，即刻知道哪張卡最抵。
          </Text>
        </View>

        {/* 現金/里數切換 */}
        <View style={styles.rewardToggleContainer}>
          <TouchableOpacity
            style={[
              styles.rewardToggleBtn,
              rewardPreference === 'cash' && styles.rewardToggleBtnActive,
              { 
                backgroundColor: rewardPreference === 'cash' ? '#FEF3C7' : colors.backgroundCard,
                borderColor: rewardPreference === 'cash' ? '#F59E0B' : colors.border,
              }
            ]}
            onPress={() => setRewardPreference('cash')}
          >
            <Text style={styles.rewardToggleIcon}>💰</Text>
            <Text style={[
              styles.rewardToggleText,
              { color: rewardPreference === 'cash' ? '#B45309' : colors.text }
            ]}>現金回贈</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.rewardToggleBtn,
              rewardPreference === 'miles' && styles.rewardToggleBtnActive,
              { 
                backgroundColor: rewardPreference === 'miles' ? '#E0F2FE' : colors.backgroundCard,
                borderColor: rewardPreference === 'miles' ? '#0EA5E9' : colors.border,
              }
            ]}
            onPress={() => setRewardPreference('miles')}
          >
            <Text style={styles.rewardToggleIcon}>✈️</Text>
            <Text style={[
              styles.rewardToggleText,
              { color: rewardPreference === 'miles' ? '#0369A1' : colors.text }
            ]}>飛行里數</Text>
          </TouchableOpacity>
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
            {currentMerchants.map((merchant) => {
              // 檢查 logo 是否為有效的 URL（而非 emoji）
              const hasValidLogo = merchant.logo && 
                typeof merchant.logo === 'string' && 
                (merchant.logo.startsWith('http') || merchant.logo.startsWith('/'));
              
              return (
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
                  {hasValidLogo ? (
                    <Image 
                      source={{ uri: merchant.logo }} 
                      style={styles.merchantLogo}
                      resizeMode="contain"
                    />
                  ) : (
                    <Text style={styles.merchantIcon}>
                      {merchant.logo || '🏪'}
                    </Text>
                  )}
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
              );
            })}
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

        {/* 金額輸入區域 */}
        <View style={styles.inputSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>消費金額</Text>
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
        </View>

        {/* 支付方式 */}
        <View style={styles.paymentSection}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>支付方式</Text>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.paymentContent}
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
        </View>

        {/* 計算按鈕 */}
        <View style={styles.calculateSection}>
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

        {/* 結果列表 */}
        {calculatedResults.length > 0 && (
          <View style={styles.resultsSection}>
            {/* 商戶標題 */}
            <Text style={[styles.resultsTitle, { color: colors.text }]}>
              🏆 {selectedMerchant?.name} 最抵攻略
            </Text>

            {/* 第一名卡片 - 特殊顯示 */}
            {renderTopCard(calculatedResults[0])}

            {/* 分享按鈕 */}
            <TouchableOpacity 
              style={[styles.shareButton, { backgroundColor: colors.success }]}
              onPress={handleShare}
            >
              <Ionicons name="share-social" size={18} color="#FFFFFF" />
              <Text style={styles.shareButtonText}>分享給朋友</Text>
            </TouchableOpacity>

            {/* 其他卡片標題 */}
            {calculatedResults.length > 1 && (
              <View style={styles.otherCardsHeader}>
                <Text style={[styles.otherCardsTitle, { color: colors.textMuted }]}>
                  查看其他未持有的卡 ({calculatedResults.length - 1})
                </Text>
              </View>
            )}

            {/* 其他卡片列表 */}
            {calculatedResults.slice(1).map((result, index) => 
              renderOtherCard(result, index + 1)
            )}
          </View>
        )}

      </ScrollView>

      {/* 「點解係呢張？」Modal */}
      <Modal
        visible={whyModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setWhyModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.backgroundCard }]}>
            {/* 關閉按鈕 */}
            <TouchableOpacity 
              style={styles.modalCloseBtn}
              onPress={() => setWhyModalVisible(false)}
            >
              <Ionicons name="close" size={24} color={colors.text} />
            </TouchableOpacity>

            {/* 標題 */}
            <View style={styles.modalHeader}>
              <Ionicons name="help-circle-outline" size={24} color={colors.primary} />
              <Text style={[styles.modalTitle, { color: colors.text }]}>點解係呢張？</Text>
            </View>

            {selectedCardForWhy && (
              <ScrollView showsVerticalScrollIndicator={false}>
                {/* 卡片資訊 */}
                <View style={styles.modalCardInfo}>
                  {selectedCardForWhy.imageUrl ? (
                    <Image 
                      source={{ uri: selectedCardForWhy.imageUrl }}
                      style={styles.modalCardImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={[styles.modalCardImagePlaceholder, { backgroundColor: BankColors[selectedCardForWhy.bank]?.bg || '#E5E7EB' }]}>
                      <Text style={[styles.modalCardBankShort, { color: BankColors[selectedCardForWhy.bank]?.text || '#374151' }]}>
                        {selectedCardForWhy.bank.slice(0, 3)}
                      </Text>
                    </View>
                  )}
                  <View style={styles.modalCardDetails}>
                    <Text style={[styles.modalCardName, { color: colors.text }]}>{selectedCardForWhy.cardName}</Text>
                    <Text style={[styles.modalCardBank, { color: colors.textMuted }]}>{selectedCardForWhy.bank}</Text>
                  </View>
                </View>

                {/* 智能分析 */}
                <View style={[styles.modalAnalysis, { backgroundColor: '#F0FDF4', borderColor: '#86EFAC' }]}>
                  <Text style={styles.modalAnalysisTitle}>智能分析：</Text>
                  <Text style={styles.modalAnalysisText}>
                    {generateWhyAnalysis(selectedCardForWhy)}
                  </Text>
                </View>

                {/* 回贈率和預計回贈 */}
                <View style={styles.modalStats}>
                  <View style={[styles.modalStatItem, { backgroundColor: colors.background, borderColor: colors.border }]}>
                    <Text style={[styles.modalStatLabel, { color: colors.textMuted }]}>回贈率</Text>
                    <Text style={[styles.modalStatValue, { color: colors.success }]}>{`${selectedCardForWhy.percentage}%`}</Text>
                  </View>
                  <View style={[styles.modalStatItem, { backgroundColor: colors.background, borderColor: colors.border }]}>
                    <Text style={[styles.modalStatLabel, { color: colors.textMuted }]}>預計回贈</Text>
                    <Text style={[styles.modalStatValue, { color: colors.success }]}>{`+$${selectedCardForWhy.rewardAmount.toFixed(1)}`}</Text>
                  </View>
                </View>

                {/* 詳細規則 */}
                <View style={[styles.modalRuleBox, { backgroundColor: '#FFFBEB', borderColor: '#FCD34D' }]}>
                  <View style={styles.modalRuleHeader}>
                    <Ionicons name="information-circle" size={18} color="#D97706" />
                    <Text style={styles.modalRuleTitle}>{selectedCardForWhy.ruleDescription}</Text>
                  </View>
                  
                  {/* 額外提示 */}
                  {selectedCardForWhy.overCapInfo && (
                    <Text style={styles.modalRuleText}>
                      {`⚠️ 每月回贈上限 HK$${selectedCardForWhy.overCapInfo.capAmount}`}
                    </Text>
                  )}
                  
                  {selectedCardForWhy.dateSuggestion && (
                    <Text style={styles.modalRuleText}>
                      {`📅 ${selectedCardForWhy.dateSuggestion.description}`}
                    </Text>
                  )}
                  
                  {selectedCardForWhy.spendingSuggestion && (
                    <Text style={styles.modalRuleText}>
                      {`💰 消費滿 $${selectedCardForWhy.spendingSuggestion.targetAmount} 可享 ${selectedCardForWhy.spendingSuggestion.newPercentage}% 回贈`}
                    </Text>
                  )}
                </View>

                {/* 查看卡片詳情按鈕 */}
                <TouchableOpacity
                  style={[styles.modalDetailBtn, { borderColor: colors.primary }]}
                  onPress={() => {
                    setWhyModalVisible(false);
                    router.push(`/card/${selectedCardForWhy.cardId}`);
                  }}
                >
                  <Text style={[styles.modalDetailBtnText, { color: colors.primary }]}>查看完整卡片詳情</Text>
                </TouchableOpacity>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>

      {/* 回到頂部浮動按鈕 */}
      {showScrollTop && (
        <TouchableOpacity
          style={[styles.scrollTopBtn, { backgroundColor: colors.primary }]}
          onPress={scrollToTop}
          activeOpacity={0.8}
        >
          <Ionicons name="arrow-up" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      )}
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
  scrollContent: {
    paddingBottom: Layout.spacing.xl,
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
  // 現金/里數切換樣式
  rewardToggleContainer: {
    flexDirection: 'row',
    paddingHorizontal: Layout.spacing.md,
    marginTop: Layout.spacing.md,
    gap: Layout.spacing.sm,
  },
  rewardToggleBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: Layout.radius.lg,
    borderWidth: 2,
    gap: Layout.spacing.xs,
  },
  rewardToggleBtnActive: {
    // Will be styled dynamically
  },
  rewardToggleIcon: {
    fontSize: 18,
  },
  rewardToggleText: {
    fontSize: Layout.fontSize.sm,
    fontWeight: Layout.fontWeight.bold,
  },
  // 回到頂部按鈕
  scrollTopBtn: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  merchantLogo: {
    width: 32,
    height: 32,
    borderRadius: 6,
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
  inputSection: {
    paddingHorizontal: Layout.spacing.md,
    paddingTop: Layout.spacing.lg,
  },
  sectionTitle: {
    fontSize: Layout.fontSize.base,
    fontWeight: Layout.fontWeight.semibold,
    marginBottom: Layout.spacing.sm,
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
  paymentSection: {
    paddingHorizontal: Layout.spacing.md,
    paddingTop: Layout.spacing.lg,
  },
  paymentContent: {},
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
  calculateSection: {
    paddingHorizontal: Layout.spacing.md,
    paddingTop: Layout.spacing.lg,
  },
  calculateBtn: {
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
  resultsTitle: {
    fontSize: Layout.fontSize.xl,
    fontWeight: Layout.fontWeight.bold,
    marginBottom: Layout.spacing.md,
  },
  // Top card styles
  topCardContainer: {
    borderRadius: Layout.radius.lg,
    borderWidth: 2,
    overflow: 'hidden',
    marginBottom: Layout.spacing.md,
  },
  topCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: Layout.spacing.md,
  },
  topCardLabel: {
    fontSize: Layout.fontSize.sm,
    color: '#92400E',
  },
  topCardTitle: {
    fontSize: Layout.fontSize.base,
    fontWeight: Layout.fontWeight.bold,
    color: '#92400E',
  },
  topCardContent: {
    padding: Layout.spacing.md,
  },
  topCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  topCardImage: {
    width: 60,
    height: 38,
    borderRadius: Layout.radius.sm,
    marginRight: Layout.spacing.sm,
  },
  topCardImagePlaceholder: {
    width: 60,
    height: 38,
    borderRadius: Layout.radius.sm,
    marginRight: Layout.spacing.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  topCardBankShort: {
    fontSize: Layout.fontSize.xs,
    fontWeight: Layout.fontWeight.bold,
  },
  topCardInfo: {
    flex: 1,
  },
  topCardBank: {
    fontSize: Layout.fontSize.xs,
    color: '#6B7280',
  },
  topCardName: {
    fontSize: Layout.fontSize.base,
    fontWeight: Layout.fontWeight.bold,
    color: '#111827',
  },
  topCardRule: {
    fontSize: Layout.fontSize.xs,
    color: '#6B7280',
    marginTop: 2,
  },
  topCardReward: {
    alignItems: 'flex-end',
  },
  topCardPoints: {
    fontSize: Layout.fontSize.lg,
    fontWeight: Layout.fontWeight.bold,
    color: '#EA580C',
  },
  topCardRewardAmount: {
    fontSize: Layout.fontSize.xl,
    fontWeight: Layout.fontWeight.bold,
    color: '#EA580C',
  },
  topCardRewardText: {
    fontSize: Layout.fontSize.xs,
    color: '#6B7280',
  },
  topCardButtons: {
    flexDirection: 'row',
    gap: 8,
    marginTop: Layout.spacing.md,
  },
  whyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: Layout.radius.md,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  whyButtonText: {
    fontSize: Layout.fontSize.sm,
    fontWeight: Layout.fontWeight.medium,
  },
  applyButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: Layout.radius.md,
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: Layout.fontSize.sm,
    fontWeight: Layout.fontWeight.bold,
  },
  breakdownToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Layout.spacing.md,
    marginTop: Layout.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  breakdownToggleText: {
    fontSize: Layout.fontSize.sm,
    fontWeight: Layout.fontWeight.medium,
  },
  breakdownContent: {
    paddingTop: Layout.spacing.sm,
    marginTop: Layout.spacing.sm,
    borderTopWidth: 1,
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  breakdownTotal: {
    paddingTop: 8,
    marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  breakdownLabel: {
    fontSize: Layout.fontSize.sm,
  },
  breakdownLabelBold: {
    fontSize: Layout.fontSize.sm,
    fontWeight: Layout.fontWeight.bold,
  },
  breakdownValue: {
    fontSize: Layout.fontSize.sm,
    fontWeight: Layout.fontWeight.medium,
  },
  breakdownValueBold: {
    fontSize: Layout.fontSize.base,
    fontWeight: Layout.fontWeight.bold,
  },
  breakdownDesc: {
    fontSize: Layout.fontSize.xs,
    marginTop: 2,
  },
  // Share button
  shareButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: Layout.radius.lg,
    marginBottom: Layout.spacing.lg,
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: Layout.fontSize.base,
    fontWeight: Layout.fontWeight.bold,
  },
  // Other cards
  otherCardsHeader: {
    marginBottom: Layout.spacing.md,
  },
  otherCardsTitle: {
    fontSize: Layout.fontSize.sm,
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
  breakdownToggleSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: Layout.spacing.sm,
    paddingTop: Layout.spacing.sm,
  },
  breakdownToggleTextSmall: {
    fontSize: Layout.fontSize.xs,
  },
  breakdownContentSmall: {
    paddingTop: Layout.spacing.sm,
    marginTop: Layout.spacing.sm,
    borderTopWidth: 1,
  },
  breakdownRowSmall: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  breakdownLabelSmall: {
    fontSize: Layout.fontSize.xs,
  },
  breakdownValueSmall: {
    fontSize: Layout.fontSize.xs,
    fontWeight: Layout.fontWeight.medium,
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
  // Modal 樣式
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Layout.spacing.lg,
  },
  modalContent: {
    width: '100%',
    maxHeight: '85%',
    borderRadius: Layout.radius.xl,
    padding: Layout.spacing.lg,
    position: 'relative',
  },
  modalCloseBtn: {
    position: 'absolute',
    top: Layout.spacing.md,
    right: Layout.spacing.md,
    padding: 8,
    zIndex: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.sm,
    marginBottom: Layout.spacing.lg,
  },
  modalTitle: {
    fontSize: Layout.fontSize.xl,
    fontWeight: Layout.fontWeight.bold,
  },
  modalCardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Layout.spacing.lg,
  },
  modalCardImage: {
    width: 70,
    height: 44,
    borderRadius: Layout.radius.md,
    marginRight: Layout.spacing.md,
  },
  modalCardImagePlaceholder: {
    width: 70,
    height: 44,
    borderRadius: Layout.radius.md,
    marginRight: Layout.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalCardBankShort: {
    fontSize: Layout.fontSize.sm,
    fontWeight: Layout.fontWeight.bold,
  },
  modalCardDetails: {
    flex: 1,
  },
  modalCardName: {
    fontSize: Layout.fontSize.lg,
    fontWeight: Layout.fontWeight.bold,
  },
  modalCardBank: {
    fontSize: Layout.fontSize.sm,
    marginTop: 2,
  },
  modalAnalysis: {
    padding: Layout.spacing.md,
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
    marginBottom: Layout.spacing.lg,
  },
  modalAnalysisTitle: {
    fontSize: Layout.fontSize.base,
    fontWeight: Layout.fontWeight.bold,
    color: '#166534',
    marginBottom: Layout.spacing.sm,
  },
  modalAnalysisText: {
    fontSize: Layout.fontSize.base,
    color: '#166534',
    lineHeight: 24,
  },
  modalStats: {
    flexDirection: 'row',
    gap: Layout.spacing.md,
    marginBottom: Layout.spacing.lg,
  },
  modalStatItem: {
    flex: 1,
    padding: Layout.spacing.md,
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
    alignItems: 'center',
  },
  modalStatLabel: {
    fontSize: Layout.fontSize.sm,
    marginBottom: Layout.spacing.xs,
  },
  modalStatValue: {
    fontSize: Layout.fontSize['2xl'],
    fontWeight: Layout.fontWeight.bold,
  },
  modalRuleBox: {
    padding: Layout.spacing.md,
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
    marginBottom: Layout.spacing.lg,
  },
  modalRuleHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Layout.spacing.sm,
    marginBottom: Layout.spacing.sm,
  },
  modalRuleTitle: {
    flex: 1,
    fontSize: Layout.fontSize.sm,
    color: '#92400E',
    fontWeight: Layout.fontWeight.medium,
    lineHeight: 20,
  },
  modalRuleText: {
    fontSize: Layout.fontSize.sm,
    color: '#92400E',
    marginTop: Layout.spacing.sm,
    lineHeight: 20,
  },
  modalDetailBtn: {
    paddingVertical: Layout.spacing.md,
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  modalDetailBtnText: {
    fontSize: Layout.fontSize.base,
    fontWeight: Layout.fontWeight.semibold,
  },
});
