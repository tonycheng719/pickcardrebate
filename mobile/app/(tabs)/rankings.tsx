import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, Image, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, BankColors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { useColorScheme } from '@/components/useColorScheme';
import { Card, RewardBadge } from '@/components/ui';
import { api, RankingItem, RankingsResponse } from '@/lib/api/client';
import { router } from 'expo-router';

// 排行榜類別 - 與 Web 版一致
const RANKING_CATEGORIES = [
  { id: 'dining', name: '食飯', icon: '🍽️' },
  { id: 'hkd_online', name: '港幣網購', icon: '🛒' },
  { id: 'foreign_online', name: '外幣網購', icon: '💻' },
  { id: 'supermarket', name: '超市', icon: '🛒' },
  { id: 'travel', name: '旅遊', icon: '✈️' },
  { id: 'overseas', name: '海外簽賬', icon: '✈️' },
  { id: 'mobile_payment', name: '流動支付', icon: '📱' },
  { id: 'miles', name: '換里數', icon: '✈️' },
  { id: 'all_round', name: '全能補底', icon: '💳' },
];

export default function RankingsScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [selectedCategory, setSelectedCategory] = useState('dining');
  const [rankings, setRankings] = useState<RankingItem[]>([]);
  const [categoryData, setCategoryData] = useState<Partial<RankingsResponse>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  // 載入排行榜數據
  useEffect(() => {
    loadRankings(selectedCategory);
  }, [selectedCategory]);

  const loadRankings = async (category: string, isRefresh = false) => {
    if (!isRefresh) setLoading(true);
    setError(null);
    
    const response = await api.getRankings(category, 10);
    
    if (response.data) {
      setRankings(response.data.rankings);
      setCategoryData(response.data);
    } else {
      setError(response.error || '無法載入排行榜');
    }
    
    setLoading(false);
    if (isRefresh) setRefreshing(false);
  };

  // 下拉更新
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadRankings(selectedCategory, true);
  }, [selectedCategory]);

  const handleCardPress = (cardId: string) => {
    router.push(`/card/${cardId}`);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      {/* 類別選擇 */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryContent}
      >
        {RANKING_CATEGORIES.map((category) => (
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
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text
              style={[
                styles.categoryName,
                {
                  color: selectedCategory === category.id
                    ? '#FFFFFF'
                    : colors.text,
                },
              ]}
            >
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* 排行榜 */}
      <ScrollView 
        style={styles.rankingList} 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
            colors={[colors.primary, '#10B981', '#F59E0B']}
            progressBackgroundColor={colors.backgroundCard}
            title={refreshing ? "更新中..." : "下拉更新排行榜"}
            titleColor={colors.textMuted}
          />
        }
      >
        <View style={styles.header}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>
            {RANKING_CATEGORIES.find(c => c.id === selectedCategory)?.icon}{' '}
            {RANKING_CATEGORIES.find(c => c.id === selectedCategory)?.name}類別 Top 10
          </Text>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
            <TouchableOpacity onPress={() => loadRankings(selectedCategory)}>
              <Text style={[styles.retryText, { color: colors.primary }]}>點擊重試</Text>
            </TouchableOpacity>
          </View>
        ) : rankings.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>
              此類別暫無數據
            </Text>
          </View>
        ) : (
          rankings.map((card, index) => {
            const bankColor = BankColors[card.bank] || BankColors.default;
            
            return (
              <Card 
                key={card.id} 
                style={styles.rankingCard} 
                onPress={() => handleCardPress(card.id)}
              >
                <View style={styles.rankingRow}>
                  {/* 排名 */}
                  <View style={[
                    styles.rankBadge,
                    {
                      backgroundColor: index === 0 ? '#FFD700' : 
                                       index === 1 ? '#C0C0C0' : 
                                       index === 2 ? '#CD7F32' : colors.borderLight,
                    },
                  ]}>
                    <Text style={[
                      styles.rankNumber,
                      { color: index < 3 ? '#FFFFFF' : colors.textMuted },
                    ]}>
                      {index + 1}
                    </Text>
                  </View>

                  {/* 卡片圖片或顏色 */}
                  {card.imageUrl ? (
                    <Image 
                      source={{ uri: card.imageUrl }}
                      style={styles.cardImage}
                      resizeMode="cover"
                    />
                  ) : (
                    <View style={[styles.cardColorSmall, { backgroundColor: bankColor.bg }]}>
                      <Text style={[styles.cardBankShort, { color: bankColor.text }]}>
                        {card.bank.slice(0, 3)}
                      </Text>
                    </View>
                  )}

                  {/* 卡片信息 */}
                  <View style={styles.cardInfo}>
                    <Text style={[styles.cardName, { color: colors.text }]} numberOfLines={1}>
                      {card.name}
                    </Text>
                    <Text style={[styles.bankName, { color: colors.textMuted }]}>
                      {card.bank}
                    </Text>
                    {card.ruleDescription && (
                      <Text style={[styles.ruleDesc, { color: colors.textMuted }]} numberOfLines={1}>
                        {card.ruleDescription.split('[')[0].trim()}
                      </Text>
                    )}
                  </View>

                  {/* 回贈率或里數兌換率 */}
                  {categoryData.isMilesCategory && card.dollarsPerMile ? (
                    <View style={[styles.milesBadge, { backgroundColor: colors.primaryLight }]}>
                      <Text style={[styles.milesRate, { color: colors.primary }]}>
                        {`$${card.dollarsPerMile.toFixed(2)}/里`}
                      </Text>
                      {card.milesProgram && (
                        <Text style={[styles.milesProgram, { color: colors.textMuted }]}>
                          {card.milesProgram}
                        </Text>
                      )}
                    </View>
                  ) : (
                    <RewardBadge rate={card.rate} size="lg" />
                  )}
                </View>
              </Card>
            );
          })
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
  categoryScroll: {
    maxHeight: 60,
    paddingVertical: Layout.spacing.sm,
  },
  categoryContent: {
    paddingHorizontal: Layout.spacing.md,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Layout.spacing.sm,
    paddingHorizontal: Layout.spacing.md,
    borderRadius: Layout.radius.full,
    borderWidth: 1,
    marginRight: Layout.spacing.sm,
  },
  categoryIcon: {
    fontSize: 16,
    marginRight: Layout.spacing.xs,
  },
  categoryName: {
    fontSize: Layout.fontSize.sm,
    fontWeight: Layout.fontWeight.medium,
  },
  rankingList: {
    flex: 1,
    paddingHorizontal: Layout.spacing.md,
  },
  header: {
    paddingVertical: Layout.spacing.md,
  },
  headerTitle: {
    fontSize: Layout.fontSize.xl,
    fontWeight: Layout.fontWeight.bold,
  },
  rankingCard: {
    marginBottom: Layout.spacing.md,
  },
  rankingRow: {
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
  cardInfo: {
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
  loadingContainer: {
    paddingVertical: Layout.spacing['3xl'],
    alignItems: 'center',
  },
  errorContainer: {
    paddingVertical: Layout.spacing['3xl'],
    alignItems: 'center',
  },
  errorText: {
    fontSize: Layout.fontSize.base,
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
  milesBadge: {
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.radius.md,
    alignItems: 'flex-end',
  },
  milesRate: {
    fontSize: Layout.fontSize.base,
    fontWeight: Layout.fontWeight.bold,
  },
  milesProgram: {
    fontSize: Layout.fontSize.xs,
    marginTop: 2,
  },
});
