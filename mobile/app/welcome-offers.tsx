import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  ActivityIndicator,
  RefreshControl,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BankColors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { useColorScheme } from '@/components/useColorScheme';
import { api, CardItem } from '@/lib/api/client';

export default function WelcomeOffersScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  const [cards, setCards] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async (isRefresh = false) => {
    if (!isRefresh) setLoading(true);
    
    const response = await api.getCards();
    if (response.data) {
      // 過濾有迎新優惠的卡片
      const cardsWithOffers = response.data.cards.filter(
        card => card.welcomeOfferText || card.welcomeOfferReward
      );
      setCards(cardsWithOffers);
    }
    
    setLoading(false);
    if (isRefresh) setRefreshing(false);
  };

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadCards(true);
  }, []);

  const handleApply = (card: CardItem) => {
    if (card.applyUrl) {
      Linking.openURL(card.applyUrl);
    } else {
      router.push(`/card/${card.id}`);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
        <Stack.Screen options={{ title: '迎新優惠', headerBackTitle: '返回' }} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <Stack.Screen options={{ title: '迎新優惠', headerBackTitle: '返回' }} />
      
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
          <Ionicons name="gift" size={20} color={colors.primary} />
          <Text style={[styles.infoText, { color: colors.primary }]}>
            精選信用卡迎新優惠，立即申請享豐厚獎賞！
          </Text>
        </View>

        {/* 優惠列表 */}
        {cards.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="gift-outline" size={64} color={colors.textMuted} />
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>
              暫無迎新優惠資料
            </Text>
          </View>
        ) : (
          cards.map(card => {
            const bankColor = BankColors[card.bank] || BankColors.default;
            
            return (
              <View 
                key={card.id}
                style={[styles.offerCard, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}
              >
                {/* 卡片頭部 */}
                <TouchableOpacity 
                  style={styles.cardHeader}
                  onPress={() => router.push(`/card/${card.id}`)}
                >
                  {card.imageUrl ? (
                    <Image source={{ uri: card.imageUrl }} style={styles.cardImage} resizeMode="cover" />
                  ) : (
                    <View style={[styles.cardColor, { backgroundColor: bankColor.bg }]}>
                      <Text style={[styles.cardBankText, { color: bankColor.text }]}>
                        {card.bank.slice(0, 3)}
                      </Text>
                    </View>
                  )}
                  <View style={styles.cardInfo}>
                    <Text style={[styles.cardName, { color: colors.text }]} numberOfLines={1}>
                      {card.name}
                    </Text>
                    <Text style={[styles.cardBank, { color: colors.textMuted }]}>
                      {card.bank}
                    </Text>
                  </View>
                  <View style={[styles.rateBadge, { backgroundColor: colors.primaryLight }]}>
                    <Text style={[styles.rateText, { color: colors.primary }]}>
                      {card.topRate}%
                    </Text>
                  </View>
                </TouchableOpacity>

                {/* 迎新獎賞 */}
                <View style={[styles.offerSection, { borderTopColor: colors.borderLight }]}>
                  <View style={styles.offerHeader}>
                    <Ionicons name="gift" size={18} color={colors.warning} />
                    <Text style={[styles.offerLabel, { color: colors.text }]}>迎新獎賞</Text>
                  </View>
                  
                  {card.welcomeOfferReward && (
                    <Text style={[styles.offerReward, { color: colors.rewardGreen }]}>
                      {card.welcomeOfferReward}
                    </Text>
                  )}
                  
                  {card.welcomeOfferText && (
                    <Text style={[styles.offerText, { color: colors.textMuted }]} numberOfLines={3}>
                      {card.welcomeOfferText}
                    </Text>
                  )}

                  {card.welcomeOfferDeadline && (
                    <View style={styles.deadlineRow}>
                      <Ionicons name="time-outline" size={14} color={colors.error} />
                      <Text style={[styles.deadlineText, { color: colors.error }]}>
                        優惠至 {card.welcomeOfferDeadline}
                      </Text>
                    </View>
                  )}
                </View>

                {/* 申請按鈕 */}
                <TouchableOpacity 
                  style={[styles.applyBtn, { backgroundColor: colors.primary }]}
                  onPress={() => handleApply(card)}
                >
                  <Text style={styles.applyBtnText}>立即申請</Text>
                  <Ionicons name="arrow-forward" size={18} color="#FFF" />
                </TouchableOpacity>
              </View>
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
    flex: 1,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Layout.spacing['3xl'],
  },
  emptyText: {
    fontSize: Layout.fontSize.base,
    marginTop: Layout.spacing.md,
  },
  offerCard: {
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
    marginTop: Layout.spacing.lg,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacing.md,
  },
  cardImage: {
    width: 60,
    height: 38,
    borderRadius: Layout.radius.sm,
  },
  cardColor: {
    width: 60,
    height: 38,
    borderRadius: Layout.radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBankText: {
    fontSize: 12,
    fontWeight: Layout.fontWeight.bold,
  },
  cardInfo: {
    flex: 1,
    marginLeft: Layout.spacing.md,
  },
  cardName: {
    fontSize: Layout.fontSize.base,
    fontWeight: Layout.fontWeight.semibold,
  },
  cardBank: {
    fontSize: Layout.fontSize.xs,
    marginTop: 2,
  },
  rateBadge: {
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.xs,
    borderRadius: Layout.radius.full,
  },
  rateText: {
    fontSize: Layout.fontSize.sm,
    fontWeight: Layout.fontWeight.bold,
  },
  offerSection: {
    padding: Layout.spacing.md,
    borderTopWidth: 1,
  },
  offerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.xs,
    marginBottom: Layout.spacing.sm,
  },
  offerLabel: {
    fontSize: Layout.fontSize.sm,
    fontWeight: Layout.fontWeight.semibold,
  },
  offerReward: {
    fontSize: Layout.fontSize.lg,
    fontWeight: Layout.fontWeight.bold,
    marginBottom: Layout.spacing.sm,
  },
  offerText: {
    fontSize: Layout.fontSize.sm,
    lineHeight: 20,
  },
  deadlineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.xs,
    marginTop: Layout.spacing.sm,
  },
  deadlineText: {
    fontSize: Layout.fontSize.xs,
    fontWeight: Layout.fontWeight.medium,
  },
  applyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.spacing.md,
    gap: Layout.spacing.sm,
  },
  applyBtnText: {
    color: '#FFF',
    fontSize: Layout.fontSize.base,
    fontWeight: Layout.fontWeight.semibold,
  },
});

