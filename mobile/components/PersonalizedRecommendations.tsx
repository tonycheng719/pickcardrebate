import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { useColorScheme } from '@/components/useColorScheme';
import { useAuth } from '@/lib/auth/AuthContext';

const API_BASE = 'https://pickcardrebate.com';

interface Recommendation {
  type: string;
  merchant: {
    id: string;
    name: string;
    icon: string;
    category: string;
  };
  bestCard: {
    id: string;
    name: string;
    bank: string;
    imageUrl?: string;
  };
  rebate: number;
  rebateType: string;
  reason: string;
}

export function PersonalizedRecommendations() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const router = useRouter();
  const { user } = useAuth();
  
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.id) {
      loadRecommendations();
    } else {
      setLoading(false);
    }
  }, [user]);

  const loadRecommendations = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/user/recommendations?userId=${user?.id}`);
      if (res.ok) {
        const data = await res.json();
        setRecommendations(data.recommendations || []);
      }
    } catch (e) {
      console.error('Load recommendations error:', e);
      setError('載入推薦失敗');
    }
    setLoading(false);
  };

  // 未登入用戶顯示登入提示
  if (!user) {
    return (
      <View style={[styles.container, { backgroundColor: colors.backgroundCard }]}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Ionicons name="sparkles" size={20} color={colors.primary} />
            <Text style={[styles.title, { color: colors.text }]}>為你推薦</Text>
          </View>
        </View>
        <View style={styles.loginPrompt}>
          <Ionicons name="person-circle-outline" size={40} color={colors.textMuted} />
          <Text style={[styles.loginText, { color: colors.textMuted }]}>
            登入後根據你的卡包獲取個人化推薦
          </Text>
          <TouchableOpacity 
            style={[styles.loginButton, { backgroundColor: colors.primary }]}
            onPress={() => router.push('/wallet')}
          >
            <Text style={styles.loginButtonText}>前往登入</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.backgroundCard }]}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Ionicons name="sparkles" size={20} color={colors.primary} />
            <Text style={[styles.title, { color: colors.text }]}>為你推薦</Text>
          </View>
        </View>
        <ActivityIndicator size="small" color={colors.primary} style={{ padding: 20 }} />
      </View>
    );
  }

  if (recommendations.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: colors.backgroundCard }]}>
        <View style={styles.header}>
          <View style={styles.titleRow}>
            <Ionicons name="sparkles" size={20} color={colors.primary} />
            <Text style={[styles.title, { color: colors.text }]}>為你推薦</Text>
          </View>
        </View>
        <View style={styles.emptyState}>
          <Ionicons name="wallet-outline" size={32} color={colors.textMuted} />
          <Text style={[styles.emptyText, { color: colors.textMuted }]}>
            添加信用卡到卡包以獲取個人化推薦
          </Text>
          <TouchableOpacity 
            style={[styles.addCardButton, { borderColor: colors.primary }]}
            onPress={() => router.push('/wallet/my-cards')}
          >
            <Ionicons name="add" size={16} color={colors.primary} />
            <Text style={[styles.addCardText, { color: colors.primary }]}>添加信用卡</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.backgroundCard }]}>
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Ionicons name="sparkles" size={20} color={colors.primary} />
          <Text style={[styles.title, { color: colors.text }]}>為你推薦</Text>
        </View>
        <Text style={[styles.subtitle, { color: colors.textMuted }]}>
          根據你的卡包計算最佳回贈
        </Text>
      </View>

      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {recommendations.map((rec, index) => (
          <TouchableOpacity
            key={`${rec.merchant.id}-${index}`}
            style={[styles.card, { backgroundColor: colors.background, borderColor: colors.border }]}
            onPress={() => router.push(`/cards/${rec.bestCard.id}`)}
            activeOpacity={0.7}
          >
            {/* 商戶圖標 */}
            <View style={[styles.merchantIcon, { backgroundColor: colors.primaryLight }]}>
              <Text style={styles.merchantEmoji}>{rec.merchant.icon || '🏪'}</Text>
            </View>
            
            {/* 商戶名稱 */}
            <Text style={[styles.merchantName, { color: colors.text }]} numberOfLines={1}>
              {rec.merchant.name}
            </Text>

            {/* 回贈率 */}
            <View style={[styles.rebateBadge, { backgroundColor: colors.rewardGreen + '20' }]}>
              <Text style={[styles.rebateText, { color: colors.rewardGreen }]}>
                {rec.rebate}% 回贈
              </Text>
            </View>

            {/* 推薦卡片 */}
            <View style={styles.cardInfo}>
              <Text style={[styles.cardLabel, { color: colors.textMuted }]}>推薦使用</Text>
              <Text style={[styles.cardName, { color: colors.text }]} numberOfLines={2}>
                {rec.bestCard.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Layout.radius.xl,
    marginHorizontal: Layout.spacing.md,
    marginVertical: Layout.spacing.sm,
    overflow: 'hidden',
  },
  header: {
    padding: Layout.spacing.md,
    paddingBottom: Layout.spacing.sm,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.sm,
  },
  title: {
    fontSize: Layout.fontSize.lg,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: Layout.fontSize.sm,
    marginTop: 4,
    marginLeft: 28,
  },
  scrollContent: {
    paddingHorizontal: Layout.spacing.md,
    paddingBottom: Layout.spacing.md,
    gap: Layout.spacing.sm,
  },
  card: {
    width: 140,
    padding: Layout.spacing.md,
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
  },
  merchantIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Layout.spacing.sm,
  },
  merchantEmoji: {
    fontSize: 22,
  },
  merchantName: {
    fontSize: Layout.fontSize.base,
    fontWeight: '600',
    marginBottom: Layout.spacing.xs,
  },
  rebateBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: Layout.spacing.sm,
    paddingVertical: 2,
    borderRadius: Layout.radius.full,
    marginBottom: Layout.spacing.sm,
  },
  rebateText: {
    fontSize: Layout.fontSize.xs,
    fontWeight: '600',
  },
  cardInfo: {
    marginTop: 'auto',
  },
  cardLabel: {
    fontSize: Layout.fontSize.xs,
    marginBottom: 2,
  },
  cardName: {
    fontSize: Layout.fontSize.sm,
    fontWeight: '500',
  },
  loginPrompt: {
    alignItems: 'center',
    padding: Layout.spacing.xl,
    gap: Layout.spacing.sm,
  },
  loginText: {
    fontSize: Layout.fontSize.sm,
    textAlign: 'center',
  },
  loginButton: {
    paddingHorizontal: Layout.spacing.lg,
    paddingVertical: Layout.spacing.sm,
    borderRadius: Layout.radius.full,
    marginTop: Layout.spacing.sm,
  },
  loginButtonText: {
    color: '#FFF',
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    padding: Layout.spacing.xl,
    gap: Layout.spacing.sm,
  },
  emptyText: {
    fontSize: Layout.fontSize.sm,
    textAlign: 'center',
  },
  addCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
    borderRadius: Layout.radius.full,
    borderWidth: 1,
    marginTop: Layout.spacing.sm,
  },
  addCardText: {
    fontWeight: '600',
  },
});

