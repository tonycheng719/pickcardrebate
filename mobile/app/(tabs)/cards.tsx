import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BankColors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { useColorScheme } from '@/components/useColorScheme';
import { SearchInput, Card, Badge, RewardBadge } from '@/components/ui';
import { api, CardData } from '@/lib/api/client';

export default function CardsScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [searchQuery, setSearchQuery] = useState('');
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // 從 API 載入信用卡資料
  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async (isRefresh = false) => {
    if (!isRefresh) setLoading(true);
    setError(null);
    
    const response = await api.getCards();
    
    if (response.data) {
      setCards(response.data.cards);
    } else {
      setError(response.error || '無法載入信用卡');
    }
    
    setLoading(false);
    if (isRefresh) setRefreshing(false);
  };

  // 下拉更新
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadCards(true);
  }, []);

  // 過濾卡片
  const filteredCards = cards.filter(card => {
    const q = searchQuery.toLowerCase();
    return card.name.toLowerCase().includes(q) || 
           card.bank.toLowerCase().includes(q) ||
           card.tags.some(t => t.toLowerCase().includes(q));
  });

  const renderCard = ({ item }: { item: CardData }) => {
    const bankColor = BankColors[item.bank] || BankColors.default;
    
    return (
      <Card style={styles.cardItem} onPress={() => router.push(`/card/${item.id}`)}>
        <View style={styles.cardRow}>
          {/* 卡片圖片或顏色標識 */}
          {item.imageUrl ? (
            <Image 
              source={{ uri: item.imageUrl }}
              style={styles.cardImage}
              resizeMode="cover"
            />
          ) : (
            <View style={[styles.cardColor, { backgroundColor: bankColor.bg }]}>
              <Text style={[styles.cardBankShort, { color: bankColor.text }]}>
                {item.bank.slice(0, 3)}
              </Text>
            </View>
          )}
          
          {/* 卡片信息 */}
          <View style={styles.cardInfo}>
            <Text style={[styles.cardName, { color: colors.text }]} numberOfLines={1}>
              {item.name}
            </Text>
            <Text style={[styles.bankName, { color: colors.textMuted }]}>
              {item.bank}
            </Text>
            
            {/* 最高回贈率 */}
            {item.topRate > 0 && (
              <View style={styles.rateRow}>
                <RewardBadge rate={item.topRate} size="sm" />
                {item.topRateCategory && (
                  <Text style={[styles.rateCategory, { color: colors.textMuted }]} numberOfLines={1}>
                    {item.topRateCategory.split('[')[0].trim()}
                  </Text>
                )}
              </View>
            )}
            
            {/* 標籤 */}
            <View style={styles.tagsRow}>
              {item.tags.slice(0, 2).map((tag, index) => (
                <Badge key={index} variant="primary" size="sm">
                  {tag}
                </Badge>
              ))}
            </View>
          </View>
        </View>
      </Card>
    );
  };

  // 載入中畫面
  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={[]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[styles.loadingText, { color: colors.textMuted }]}>
            載入信用卡資料...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // 錯誤畫面
  if (error) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={[]}>
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: colors.error }]}>
            {error}
          </Text>
          <Text 
            style={[styles.retryText, { color: colors.primary }]}
            onPress={loadCards}
          >
            點擊重試
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={[]}>
      {/* 搜尋欄和比較按鈕 */}
      <View style={styles.searchSection}>
        <View style={styles.searchRow}>
          <View style={styles.searchInputWrapper}>
            <SearchInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="搜尋信用卡或銀行..."
            />
          </View>
          <TouchableOpacity 
            style={[styles.compareBtn, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/cards/compare')}
          >
            <Ionicons name="swap-horizontal" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 卡片列表 */}
      <FlatList
        data={filteredCards}
        renderItem={renderCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
            colors={[colors.primary, '#10B981', '#F59E0B']}
            progressBackgroundColor={colors.backgroundCard}
            title={refreshing ? "更新中..." : "下拉更新信用卡"}
            titleColor={colors.textMuted}
          />
        }
        ListHeaderComponent={
          <Text style={[styles.listHeader, { color: colors.textMuted }]}>
            共 {filteredCards.length} 張信用卡
          </Text>
        }
        ListFooterComponent={<View style={{ height: 100 }} />}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>
              找不到相關信用卡
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchSection: {
    padding: Layout.spacing.lg,
  },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.sm,
  },
  searchInputWrapper: {
    flex: 1,
  },
  compareBtn: {
    width: 44,
    height: 44,
    borderRadius: Layout.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingHorizontal: Layout.spacing.lg,
  },
  listHeader: {
    fontSize: Layout.fontSize.sm,
    marginBottom: Layout.spacing.md,
  },
  cardItem: {
    marginBottom: Layout.spacing.md,
  },
  cardRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    width: 80,
    height: 50,
    borderRadius: Layout.radius.md,
    marginRight: Layout.spacing.md,
  },
  cardColor: {
    width: 80,
    height: 50,
    borderRadius: Layout.radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Layout.spacing.md,
  },
  cardBankShort: {
    fontSize: Layout.fontSize.sm,
    fontWeight: Layout.fontWeight.bold,
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: Layout.fontSize.base,
    fontWeight: Layout.fontWeight.semibold,
  },
  bankName: {
    fontSize: Layout.fontSize.sm,
    marginTop: 2,
  },
  rateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Layout.spacing.xs,
    gap: Layout.spacing.xs,
  },
  rateCategory: {
    fontSize: Layout.fontSize.xs,
    flex: 1,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Layout.spacing.xs,
    marginTop: Layout.spacing.sm,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: Layout.spacing.md,
    fontSize: Layout.fontSize.base,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.spacing.xl,
  },
  errorText: {
    fontSize: Layout.fontSize.base,
    textAlign: 'center',
  },
  retryText: {
    marginTop: Layout.spacing.md,
    fontSize: Layout.fontSize.base,
    fontWeight: Layout.fontWeight.semibold,
  },
  emptyContainer: {
    paddingVertical: Layout.spacing['3xl'],
    alignItems: 'center',
  },
  emptyText: {
    fontSize: Layout.fontSize.base,
  },
});
