import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BankColors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { useColorScheme } from '@/components/useColorScheme';
import { Button, Card, Badge, RewardBadge } from '@/components/ui';
import { API_BASE_URL } from '@/lib/api/client';

interface CardDetail {
  id: string;
  name: string;
  bank: string;
  imageUrl: string | null;
  style?: { bgColor?: string; textColor?: string };
  annualFee?: number;
  feeWaiverCondition?: string;
  minIncome?: number;
  foreignCurrencyFee?: number;
  rules: {
    description: string;
    percentage: number;
    cap?: number;
    capType?: string;
    capPeriod?: string;
    matchType: string;
  }[];
  tags: string[];
  sellingPoints: string[];
  welcomeOfferText?: string;
  promoEndDate?: string;
  promoName?: string;
  featuredMerchants: { name: string; rate: string; category: string }[];
  exclusions: string[];
  note?: string;
  officialApplyUrl?: string;
  applyUrl?: string;
}

export default function CardDetailScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const [card, setCard] = useState<CardDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) loadCard(id);
  }, [id]);

  const loadCard = async (cardId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/mobile/cards/${cardId}`);
      const data = await response.json();
      
      if (data.card) {
        setCard(data.card);
      } else {
        setError(data.error || '找不到信用卡');
      }
    } catch (e) {
      setError('無法載入信用卡詳情');
    }
    
    setLoading(false);
  };

  const handleApply = () => {
    if (card?.applyUrl) {
      Linking.openURL(card.applyUrl);
    } else if (card?.officialApplyUrl) {
      Linking.openURL(card.officialApplyUrl);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Stack.Screen options={{ title: '載入中...' }} />
        <View style={styles.centerContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (error || !card) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Stack.Screen options={{ title: '錯誤' }} />
        <View style={styles.centerContainer}>
          <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
          <Button onPress={() => router.back()} variant="outline" style={{ marginTop: 16 }}>
            返回
          </Button>
        </View>
      </SafeAreaView>
    );
  }

  const bankColor = BankColors[card.bank] || BankColors.default;
  const topRate = Math.max(...card.rules.map(r => r.percentage));

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <Stack.Screen 
        options={{ 
          title: card.name,
          headerBackTitle: '返回',
        }} 
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 卡片頭部 */}
        <View style={[styles.header, { backgroundColor: bankColor.bg }]}>
          {card.imageUrl ? (
            <Image source={{ uri: card.imageUrl }} style={styles.cardImage} resizeMode="contain" />
          ) : (
            <View style={styles.cardPlaceholder}>
              <Text style={[styles.cardBankName, { color: bankColor.text }]}>{card.bank}</Text>
              <Text style={[styles.cardNameLarge, { color: bankColor.text }]}>{card.name}</Text>
            </View>
          )}
          <RewardBadge rate={topRate} size="lg" style={styles.topRateBadge} />
        </View>

        {/* 主要內容 */}
        <View style={styles.content}>
          {/* 卡片名稱和標籤 */}
          <Text style={[styles.title, { color: colors.text }]}>{card.name}</Text>
          <Text style={[styles.bank, { color: colors.textMuted }]}>{card.bank}</Text>
          
          <View style={styles.tagsRow}>
            {card.tags.slice(0, 4).map((tag, i) => (
              <Badge key={i} variant="primary" size="sm">{tag}</Badge>
            ))}
          </View>

          {/* 迎新優惠 */}
          {card.welcomeOfferText && (
            <Card style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="gift" size={20} color={colors.success} />
                <Text style={[styles.sectionTitle, { color: colors.text }]}>迎新優惠</Text>
              </View>
              <Text style={[styles.sectionContent, { color: colors.text }]}>
                {card.welcomeOfferText}
              </Text>
            </Card>
          )}

          {/* 回贈規則 */}
          <Card style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="trending-up" size={20} color={colors.primary} />
              <Text style={[styles.sectionTitle, { color: colors.text }]}>回贈規則</Text>
            </View>
            {card.rules.slice(0, 8).map((rule, i) => (
              <View key={i} style={styles.ruleItem}>
                <RewardBadge rate={rule.percentage} size="sm" />
                <Text style={[styles.ruleDesc, { color: colors.text }]} numberOfLines={2}>
                  {rule.description}
                </Text>
              </View>
            ))}
          </Card>

          {/* 賣點 */}
          {card.sellingPoints.length > 0 && (
            <Card style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="star" size={20} color={colors.warning} />
                <Text style={[styles.sectionTitle, { color: colors.text }]}>賣點</Text>
              </View>
              {card.sellingPoints.map((point, i) => (
                <View key={i} style={styles.bulletItem}>
                  <Text style={[styles.bullet, { color: colors.primary }]}>•</Text>
                  <Text style={[styles.bulletText, { color: colors.text }]}>{point}</Text>
                </View>
              ))}
            </Card>
          )}

          {/* 基本資訊 */}
          <Card style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="information-circle" size={20} color={colors.textMuted} />
              <Text style={[styles.sectionTitle, { color: colors.text }]}>基本資訊</Text>
            </View>
            <View style={styles.infoGrid}>
              <View style={styles.infoItem}>
                <Text style={[styles.infoLabel, { color: colors.textMuted }]}>年費</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>
                  {card.annualFee === 0 ? '永久免年費' : `$${card.annualFee}`}
                </Text>
              </View>
              {card.feeWaiverCondition && (
                <View style={styles.infoItem}>
                  <Text style={[styles.infoLabel, { color: colors.textMuted }]}>豁免條件</Text>
                  <Text style={[styles.infoValue, { color: colors.text }]}>{card.feeWaiverCondition}</Text>
                </View>
              )}
              {card.minIncome && (
                <View style={styles.infoItem}>
                  <Text style={[styles.infoLabel, { color: colors.textMuted }]}>最低年薪</Text>
                  <Text style={[styles.infoValue, { color: colors.text }]}>${card.minIncome.toLocaleString()}</Text>
                </View>
              )}
              {card.foreignCurrencyFee && (
                <View style={styles.infoItem}>
                  <Text style={[styles.infoLabel, { color: colors.textMuted }]}>外幣手續費</Text>
                  <Text style={[styles.infoValue, { color: colors.text }]}>{card.foreignCurrencyFee}%</Text>
                </View>
              )}
            </View>
          </Card>

          {/* 排除項目 */}
          {card.exclusions.length > 0 && (
            <Card style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="close-circle" size={20} color={colors.error} />
                <Text style={[styles.sectionTitle, { color: colors.text }]}>不適用</Text>
              </View>
              {card.exclusions.slice(0, 6).map((item, i) => (
                <View key={i} style={styles.bulletItem}>
                  <Text style={[styles.bullet, { color: colors.error }]}>✕</Text>
                  <Text style={[styles.bulletText, { color: colors.textMuted }]}>{item}</Text>
                </View>
              ))}
            </Card>
          )}

          {/* 底部間距 */}
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* 申請按鈕 */}
      {(card.applyUrl || card.officialApplyUrl) && (
        <View style={[styles.footer, { backgroundColor: colors.backgroundCard, borderTopColor: colors.border }]}>
          <Button onPress={handleApply} fullWidth>
            立即申請
          </Button>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.spacing.xl,
  },
  errorText: {
    fontSize: Layout.fontSize.base,
    textAlign: 'center',
  },
  header: {
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cardImage: {
    width: '80%',
    height: 140,
  },
  cardPlaceholder: {
    alignItems: 'center',
  },
  cardBankName: {
    fontSize: Layout.fontSize.lg,
    fontWeight: Layout.fontWeight.bold,
    opacity: 0.8,
  },
  cardNameLarge: {
    fontSize: Layout.fontSize.xl,
    fontWeight: Layout.fontWeight.bold,
    marginTop: Layout.spacing.sm,
  },
  topRateBadge: {
    position: 'absolute',
    top: Layout.spacing.lg,
    right: Layout.spacing.lg,
  },
  content: {
    padding: Layout.spacing.lg,
  },
  title: {
    fontSize: Layout.fontSize['2xl'],
    fontWeight: Layout.fontWeight.bold,
  },
  bank: {
    fontSize: Layout.fontSize.base,
    marginTop: Layout.spacing.xs,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Layout.spacing.xs,
    marginTop: Layout.spacing.md,
  },
  section: {
    marginTop: Layout.spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.sm,
    marginBottom: Layout.spacing.md,
  },
  sectionTitle: {
    fontSize: Layout.fontSize.lg,
    fontWeight: Layout.fontWeight.bold,
  },
  sectionContent: {
    fontSize: Layout.fontSize.base,
    lineHeight: 22,
  },
  ruleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.sm,
    marginBottom: Layout.spacing.sm,
  },
  ruleDesc: {
    flex: 1,
    fontSize: Layout.fontSize.sm,
  },
  bulletItem: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.sm,
  },
  bullet: {
    fontSize: Layout.fontSize.base,
    marginRight: Layout.spacing.sm,
  },
  bulletText: {
    flex: 1,
    fontSize: Layout.fontSize.sm,
    lineHeight: 20,
  },
  infoGrid: {
    gap: Layout.spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoLabel: {
    fontSize: Layout.fontSize.sm,
  },
  infoValue: {
    fontSize: Layout.fontSize.sm,
    fontWeight: Layout.fontWeight.medium,
  },
  footer: {
    padding: Layout.spacing.lg,
    borderTopWidth: 1,
  },
});

