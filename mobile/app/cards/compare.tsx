import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  ActivityIndicator,
  RefreshControl,
  AppState,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BankColors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { useColorScheme } from '@/components/useColorScheme';
import { api, CardItem } from '@/lib/api/client';
import { trackCompareCards } from '@/lib/analytics';

// 比較項目
const COMPARE_CATEGORIES = [
  { id: 'dining', name: '食飯', icon: '🍽️' },
  { id: 'online', name: '網購', icon: '💻' },
  { id: 'supermarket', name: '超市', icon: '🛒' },
  { id: 'travel', name: '旅遊', icon: '✈️' },
  { id: 'mobile_payment', name: '流動支付', icon: '📱' },
  { id: 'base', name: '基本回贈', icon: '💳' },
];

export default function CompareCardsScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  const [allCards, setAllCards] = useState<CardItem[]>([]);
  const [selectedCards, setSelectedCards] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showCardPicker, setShowCardPicker] = useState(false);
  const [pickingSlot, setPickingSlot] = useState<number>(0);
  
  // 追蹤用 refs
  const lastLoggedRef = useRef<string>('');
  const selectedCardsRef = useRef<CardItem[]>([]);

  // Keep ref in sync with state
  useEffect(() => {
    selectedCardsRef.current = selectedCards;
  }, [selectedCards]);

  // 當用戶離開頁面時記錄比較事件
  useEffect(() => {
    const logComparison = () => {
      const cards = selectedCardsRef.current;
      if (cards.length >= 2) {
        const sortedIds = cards.map(c => c.id).sort().join(',');
        // 只在新組合時記錄（避免重複）
        if (sortedIds !== lastLoggedRef.current) {
          lastLoggedRef.current = sortedIds;
          trackCompareCards({
            cardIds: cards.map(c => c.id),
            cardNames: cards.map(c => c.name),
          });
        }
      }
    };

    // 監聽 App 狀態變化（背景/前台）
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (nextAppState === 'background' || nextAppState === 'inactive') {
        logComparison();
      }
    });

    return () => {
      // Component unmount 時也記錄
      logComparison();
      subscription.remove();
    };
  }, []);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async (isRefresh = false) => {
    if (!isRefresh) setLoading(true);
    const response = await api.getCards();
    if (response.data) {
      setAllCards(response.data.cards);
    }
    setLoading(false);
    if (isRefresh) setRefreshing(false);
  };

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadCards(true);
  }, []);

  const handleSelectCard = (card: CardItem) => {
    const newSelected = [...selectedCards];
    newSelected[pickingSlot] = card;
    setSelectedCards(newSelected);
    setShowCardPicker(false);
  };

  const handleRemoveCard = (index: number) => {
    const newSelected = selectedCards.filter((_, i) => i !== index);
    setSelectedCards(newSelected);
  };

  const openCardPicker = (slot: number) => {
    setPickingSlot(slot);
    setShowCardPicker(true);
  };

  // 獲取卡片在某類別的回贈率
  const getCardRate = (card: CardItem, category: string): string => {
    // 簡化版：顯示最高回贈率
    // 實際應該根據類別計算
    if (category === 'base') {
      return `${(card.topRate * 0.1).toFixed(1)}%`;
    }
    return `${card.topRate.toFixed(1)}%`;
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
        <Stack.Screen options={{ title: '信用卡比較', headerBackTitle: '返回' }} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  // 卡片選擇器
  if (showCardPicker) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
        <Stack.Screen 
          options={{ 
            title: '選擇信用卡', 
            headerBackTitle: '取消',
            headerLeft: () => (
              <TouchableOpacity onPress={() => setShowCardPicker(false)}>
                <Text style={{ color: colors.primary, fontSize: 17 }}>取消</Text>
              </TouchableOpacity>
            ),
          }} 
        />
        <ScrollView 
          style={styles.cardList}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={colors.primary}
            />
          }
        >
          {allCards
            .filter(card => !selectedCards.find(s => s.id === card.id))
            .map(card => {
              const bankColor = BankColors[card.bank] || BankColors.default;
              return (
                <TouchableOpacity
                  key={card.id}
                  style={[styles.cardPickerItem, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}
                  onPress={() => handleSelectCard(card)}
                >
                  {card.imageUrl ? (
                    <Image source={{ uri: card.imageUrl }} style={styles.cardPickerImage} resizeMode="cover" />
                  ) : (
                    <View style={[styles.cardPickerColor, { backgroundColor: bankColor.bg }]}>
                      <Text style={[styles.cardPickerBankText, { color: bankColor.text }]}>
                        {card.bank.slice(0, 3)}
                      </Text>
                    </View>
                  )}
                  <View style={styles.cardPickerInfo}>
                    <Text style={[styles.cardPickerName, { color: colors.text }]} numberOfLines={1}>
                      {card.name}
                    </Text>
                    <Text style={[styles.cardPickerBank, { color: colors.textMuted }]}>
                      {card.bank}
                    </Text>
                  </View>
                  <View style={[styles.cardPickerRate, { backgroundColor: colors.primaryLight }]}>
                    <Text style={[styles.cardPickerRateText, { color: colors.primary }]}>
                      {card.topRate}%
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })}
          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <Stack.Screen 
        options={{ 
          title: '信用卡比較',
          headerLeft: () => (
            <TouchableOpacity onPress={() => router.back()} style={{ paddingRight: 16 }}>
              <Text style={{ color: colors.primary, fontSize: 17 }}>取消</Text>
            </TouchableOpacity>
          ),
        }} 
      />
      
      <ScrollView 
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
      >
        {/* 說明 */}
        <View style={[styles.infoBox, { backgroundColor: colors.primaryLight }]}>
          <Ionicons name="information-circle" size={20} color={colors.primary} />
          <Text style={[styles.infoText, { color: colors.primary }]}>
            選擇最多 4 張信用卡進行比較
          </Text>
        </View>

        {/* 選擇的卡片 */}
        <View style={styles.selectedCards}>
          {[0, 1, 2, 3].map(slot => {
            const card = selectedCards[slot];
            if (card) {
              const bankColor = BankColors[card.bank] || BankColors.default;
              return (
                <View key={slot} style={[styles.selectedCard, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}>
                  <TouchableOpacity 
                    style={styles.removeBtn}
                    onPress={() => handleRemoveCard(slot)}
                  >
                    <Ionicons name="close-circle" size={20} color={colors.error} />
                  </TouchableOpacity>
                  {card.imageUrl ? (
                    <Image source={{ uri: card.imageUrl }} style={styles.selectedCardImage} resizeMode="cover" />
                  ) : (
                    <View style={[styles.selectedCardColor, { backgroundColor: bankColor.bg }]}>
                      <Text style={[styles.selectedCardBankText, { color: bankColor.text }]}>
                        {card.bank.slice(0, 2)}
                      </Text>
                    </View>
                  )}
                  <Text style={[styles.selectedCardName, { color: colors.text }]} numberOfLines={2}>
                    {card.name}
                  </Text>
                </View>
              );
            }
            return (
              <TouchableOpacity 
                key={slot}
                style={[styles.addCardSlot, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}
                onPress={() => openCardPicker(slot)}
              >
                <Ionicons name="add-circle-outline" size={32} color={colors.textMuted} />
                <Text style={[styles.addCardText, { color: colors.textMuted }]}>添加</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 比較表格 */}
        {selectedCards.length >= 2 && (
          <View style={[styles.compareTable, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}>
            <Text style={[styles.compareTitle, { color: colors.text }]}>
              📊 回贈率比較
            </Text>
            
            {COMPARE_CATEGORIES.map(category => (
              <View key={category.id} style={[styles.compareRow, { borderBottomColor: colors.borderLight }]}>
                <View style={styles.compareCategoryCell}>
                  <Text style={styles.compareCategoryIcon}>{category.icon}</Text>
                  <Text style={[styles.compareCategoryName, { color: colors.text }]}>
                    {category.name}
                  </Text>
                </View>
                {selectedCards.map((card, index) => (
                  <View key={card.id} style={styles.compareRateCell}>
                    <Text style={[
                      styles.compareRate,
                      { color: index === 0 ? colors.primary : colors.text }
                    ]}>
                      {getCardRate(card, category.id)}
                    </Text>
                  </View>
                ))}
                {/* 填充空位 */}
                {Array(4 - selectedCards.length).fill(null).map((_, i) => (
                  <View key={`empty-${i}`} style={styles.compareRateCell}>
                    <Text style={[styles.compareRate, { color: colors.textMuted }]}>-</Text>
                  </View>
                ))}
              </View>
            ))}

            {/* 年費 */}
            <View style={[styles.compareRow, { borderBottomColor: colors.borderLight }]}>
              <View style={styles.compareCategoryCell}>
                <Text style={styles.compareCategoryIcon}>💰</Text>
                <Text style={[styles.compareCategoryName, { color: colors.text }]}>年費</Text>
              </View>
              {selectedCards.map((card) => (
                <View key={card.id} style={styles.compareRateCell}>
                  <Text style={[styles.compareRate, { color: colors.text }]}>
                    {card.annualFee === 0 ? '免年費' : `$${card.annualFee}`}
                  </Text>
                </View>
              ))}
              {Array(4 - selectedCards.length).fill(null).map((_, i) => (
                <View key={`empty-fee-${i}`} style={styles.compareRateCell}>
                  <Text style={[styles.compareRate, { color: colors.textMuted }]}>-</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {selectedCards.length < 2 && (
          <View style={styles.emptyPrompt}>
            <Ionicons name="swap-horizontal" size={48} color={colors.textMuted} />
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>
              請選擇至少 2 張信用卡進行比較
            </Text>
          </View>
        )}

        <View style={{ height: 100 }} />
      </ScrollView>
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
  scrollView: {
    flex: 1,
    paddingHorizontal: Layout.spacing.md,
  },
  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacing.md,
    borderRadius: Layout.radius.md,
    marginTop: Layout.spacing.md,
    gap: Layout.spacing.sm,
  },
  infoText: {
    fontSize: Layout.fontSize.sm,
    fontWeight: Layout.fontWeight.medium,
  },
  selectedCards: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Layout.spacing.sm,
    marginTop: Layout.spacing.lg,
  },
  selectedCard: {
    width: '48%',
    padding: Layout.spacing.md,
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
    alignItems: 'center',
    position: 'relative',
  },
  removeBtn: {
    position: 'absolute',
    top: 4,
    right: 4,
    zIndex: 1,
  },
  selectedCardImage: {
    width: 60,
    height: 38,
    borderRadius: Layout.radius.sm,
    marginBottom: Layout.spacing.sm,
  },
  selectedCardColor: {
    width: 60,
    height: 38,
    borderRadius: Layout.radius.sm,
    marginBottom: Layout.spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCardBankText: {
    fontSize: 10,
    fontWeight: Layout.fontWeight.bold,
  },
  selectedCardName: {
    fontSize: Layout.fontSize.xs,
    fontWeight: Layout.fontWeight.medium,
    textAlign: 'center',
  },
  addCardSlot: {
    width: '48%',
    padding: Layout.spacing.lg,
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  addCardText: {
    fontSize: Layout.fontSize.sm,
    marginTop: Layout.spacing.xs,
  },
  compareTable: {
    marginTop: Layout.spacing.xl,
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  compareTitle: {
    fontSize: Layout.fontSize.lg,
    fontWeight: Layout.fontWeight.bold,
    padding: Layout.spacing.md,
  },
  compareRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    minHeight: 50,
  },
  compareCategoryCell: {
    flex: 1.2,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.sm,
    gap: Layout.spacing.xs,
  },
  compareCategoryIcon: {
    fontSize: 16,
  },
  compareCategoryName: {
    fontSize: Layout.fontSize.sm,
    fontWeight: Layout.fontWeight.medium,
  },
  compareRateCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: Layout.spacing.sm,
  },
  compareRate: {
    fontSize: Layout.fontSize.sm,
    fontWeight: Layout.fontWeight.semibold,
  },
  emptyPrompt: {
    alignItems: 'center',
    paddingVertical: Layout.spacing['3xl'],
  },
  emptyText: {
    fontSize: Layout.fontSize.base,
    marginTop: Layout.spacing.md,
    textAlign: 'center',
  },
  cardList: {
    flex: 1,
    paddingHorizontal: Layout.spacing.md,
  },
  cardPickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacing.md,
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
    marginTop: Layout.spacing.sm,
  },
  cardPickerImage: {
    width: 50,
    height: 32,
    borderRadius: Layout.radius.sm,
  },
  cardPickerColor: {
    width: 50,
    height: 32,
    borderRadius: Layout.radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardPickerBankText: {
    fontSize: 10,
    fontWeight: Layout.fontWeight.bold,
  },
  cardPickerInfo: {
    flex: 1,
    marginLeft: Layout.spacing.md,
  },
  cardPickerName: {
    fontSize: Layout.fontSize.sm,
    fontWeight: Layout.fontWeight.semibold,
  },
  cardPickerBank: {
    fontSize: Layout.fontSize.xs,
    marginTop: 2,
  },
  cardPickerRate: {
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.radius.full,
  },
  cardPickerRateText: {
    fontSize: Layout.fontSize.sm,
    fontWeight: Layout.fontWeight.bold,
  },
});

