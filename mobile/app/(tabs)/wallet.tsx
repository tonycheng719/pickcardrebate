import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Image, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BankColors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { useColorScheme } from '@/components/useColorScheme';
import { Button, Card } from '@/components/ui';
import { useAuth } from '@/lib/auth/AuthContext';
import { getMyCards, syncWalletFromCloud, MyCard } from '@/lib/storage/myCards';
import { useFocusEffect } from '@react-navigation/native';

const API_BASE = 'https://pickcardrebate.com';

interface Transaction {
  id: string;
  merchant_name: string;
  amount: number;
  reward_amount: number;
  payment_method: string;
  transaction_date: string;
  card_id?: string;
}

export default function WalletScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { user, loading, signInWithGoogle, signInWithApple, signOut, needsOnboarding, refreshProfile } = useAuth();
  const [signingIn, setSigningIn] = useState(false);
  const [myCards, setMyCards] = useState<MyCard[]>([]);
  const [syncing, setSyncing] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Check for onboarding needs when screen is focused
  useFocusEffect(
    useCallback(() => {
      if (user && needsOnboarding) {
        router.replace('/onboarding');
      }
    }, [user, needsOnboarding])
  );
  
  // 交易統計
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [monthlySpending, setMonthlySpending] = useState(0);
  const [monthlyReward, setMonthlyReward] = useState(0);
  const [transactionCount, setTransactionCount] = useState(0);

  // 載入數據
  const loadData = useCallback(async () => {
    if (user?.id) {
      await Promise.all([loadMyCards(), loadTransactions()]);
    } else {
      const cards = await getMyCards();
      setMyCards(cards);
    }
  }, [user?.id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // 下拉刷新
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, [loadData]);

  const loadMyCards = async () => {
    if (user?.id) {
      setSyncing(true);
      try {
        const cards = await syncWalletFromCloud(user.id);
        setMyCards(cards);
      } catch (error) {
        console.error('Sync failed:', error);
        const localCards = await getMyCards();
        setMyCards(localCards);
      }
      setSyncing(false);
    }
  };

  // 載入交易記錄
  const loadTransactions = async () => {
    if (!user?.id) return;
    
    try {
      const res = await fetch(`${API_BASE}/api/user/transactions?userId=${user.id}`);
      if (res.ok) {
        const data: Transaction[] = await res.json();
        setTransactions(data);
        
        // 計算本月統計
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();
        
        const thisMonthTx = data.filter(tx => {
          const txDate = new Date(tx.transaction_date);
          return txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear;
        });
        
        const spending = thisMonthTx.reduce((sum, tx) => sum + (tx.amount || 0), 0);
        const reward = thisMonthTx.reduce((sum, tx) => sum + (tx.reward_amount || 0), 0);
        
        setMonthlySpending(spending);
        setMonthlyReward(reward);
        setTransactionCount(data.length);
      }
    } catch (error) {
      console.error('Load transactions failed:', error);
    }
  };

  const handleGoogleSignIn = async () => {
    setSigningIn(true);
    try {
      await signInWithGoogle();
    } catch (error) {
      Alert.alert('登入失敗', '請稍後再試');
    }
    setSigningIn(false);
  };

  const handleAppleSignIn = async () => {
    setSigningIn(true);
    try {
      await signInWithApple();
    } catch (error) {
      Alert.alert('登入失敗', '請稍後再試');
    }
    setSigningIn(false);
  };

  const handleSignOut = async () => {
    Alert.alert(
      '登出',
      '確定要登出嗎？',
      [
        { text: '取消', style: 'cancel' },
        { 
          text: '登出', 
          style: 'destructive',
          onPress: async () => {
            try {
              await signOut();
            } catch (error) {
              Alert.alert('錯誤', '登出失敗');
            }
          }
        },
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  // 未登入狀態
  if (!user) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
        <View style={styles.loginPrompt}>
          <View style={[styles.iconContainer, { backgroundColor: colors.primaryLight }]}>
            <Ionicons name="wallet" size={48} color={colors.primary} />
          </View>
          <Text style={[styles.loginTitle, { color: colors.text }]}>
            登入以使用錢包功能
          </Text>
          <Text style={[styles.loginDesc, { color: colors.textMuted }]}>
            登入後可以儲存您的信用卡、追蹤回贈記錄、收藏優惠文章
          </Text>
          
          <View style={styles.loginButtons}>
            <TouchableOpacity
              style={[styles.oauthButton, styles.googleButton]}
              onPress={handleGoogleSignIn}
              disabled={signingIn}
            >
              {signingIn ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <>
                  <Ionicons name="logo-google" size={20} color="#FFF" style={{ marginRight: 8 }} />
                  <Text style={styles.oauthButtonText}>使用 Google 登入</Text>
                </>
              )}
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[styles.oauthButton, styles.appleButton, { borderColor: colors.border }]}
              onPress={handleAppleSignIn}
              disabled={signingIn}
            >
              <Ionicons name="logo-apple" size={20} color={colors.text} style={{ marginRight: 8 }} />
              <Text style={[styles.oauthButtonText, { color: colors.text }]}>使用 Apple 登入</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // 已登入狀態
  const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || '用戶';
  const avatarLetter = displayName.charAt(0).toUpperCase();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* 用戶信息 */}
        <View style={styles.userSection}>
          <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
            <Text style={styles.avatarText}>{avatarLetter}</Text>
          </View>
          <View style={styles.userInfo}>
            <Text style={[styles.userName, { color: colors.text }]}>{displayName}</Text>
            <Text style={[styles.userEmail, { color: colors.textMuted }]}>{user.email}</Text>
          </View>
          <TouchableOpacity onPress={handleSignOut}>
            <Ionicons name="log-out-outline" size={24} color={colors.textMuted} />
          </TouchableOpacity>
        </View>

        {/* 統計卡片 - 與 Web 版一致 */}
        <View style={styles.statsRow}>
          <Card style={[styles.statCard, { flex: 1 }]}>
            <Ionicons name="trending-down" size={20} color="#EF4444" />
            <Text style={[styles.statLabel, { color: colors.textMuted }]}>本月支出</Text>
            <Text style={[styles.statValue, { color: colors.text }]}>
              ${monthlySpending.toFixed(0)}
            </Text>
          </Card>
          <Card style={[styles.statCard, { flex: 1 }]}>
            <Ionicons name="gift" size={20} color="#10B981" />
            <Text style={[styles.statLabel, { color: colors.textMuted }]}>本月回贈</Text>
            <Text style={[styles.statValue, { color: colors.rewardGreen }]}>
              ${monthlyReward.toFixed(2)}
            </Text>
          </Card>
          <Card style={[styles.statCard, { flex: 1 }]}>
            <Ionicons name="receipt" size={20} color="#6366F1" />
            <Text style={[styles.statLabel, { color: colors.textMuted }]}>記賬記錄</Text>
            <Text style={[styles.statValue, { color: colors.text }]}>
              {transactionCount} 筆
            </Text>
          </Card>
        </View>

        {/* 快捷功能 */}
        <View style={styles.quickActions}>
          <TouchableOpacity 
            style={[styles.actionItem, { backgroundColor: colors.backgroundCard }]}
            onPress={() => router.push('/wallet/my-cards')}
          >
            <View style={[styles.actionIcon, { backgroundColor: colors.primaryLight }]}>
              <Ionicons name="card" size={24} color={colors.primary} />
            </View>
            <Text style={[styles.actionText, { color: colors.text }]}>我的卡包</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionItem, { backgroundColor: colors.backgroundCard }]}
            onPress={() => router.push('/wallet/history')}
          >
            <View style={[styles.actionIcon, { backgroundColor: colors.successLight }]}>
              <Ionicons name="receipt" size={24} color={colors.success} />
            </View>
            <Text style={[styles.actionText, { color: colors.text }]}>計算記錄</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionItem, { backgroundColor: colors.backgroundCard }]}
            onPress={() => router.push('/wallet/favorites')}
          >
            <View style={[styles.actionIcon, { backgroundColor: colors.warningLight }]}>
              <Ionicons name="bookmark" size={24} color={colors.warning} />
            </View>
            <Text style={[styles.actionText, { color: colors.text }]}>收藏</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionItem, { backgroundColor: colors.backgroundCard }]}
            onPress={() => router.push('/wallet/settings')}
          >
            <View style={[styles.actionIcon, { backgroundColor: colors.borderLight }]}>
              <Ionicons name="settings" size={24} color={colors.textMuted} />
            </View>
            <Text style={[styles.actionText, { color: colors.text }]}>設定</Text>
          </TouchableOpacity>
        </View>

        {/* 我的信用卡 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>我的信用卡</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              {syncing && <ActivityIndicator size="small" color={colors.primary} />}
              <TouchableOpacity onPress={() => router.push('/wallet/my-cards')}>
                <Text style={[styles.sectionAction, { color: colors.primary }]}>管理</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {syncing ? (
            <Card style={styles.emptyCard}>
              <ActivityIndicator size="large" color={colors.primary} />
              <Text style={[styles.emptyText, { color: colors.textMuted, marginTop: 12 }]}>
                正在同步雲端資料...
              </Text>
            </Card>
          ) : myCards.length === 0 ? (
            <Card style={styles.emptyCard}>
              <Ionicons name="add-circle-outline" size={40} color={colors.textMuted} />
              <Text style={[styles.emptyText, { color: colors.textMuted }]}>
                尚未添加信用卡
              </Text>
              <Button onPress={() => router.push('/wallet/my-cards')} variant="outline" size="sm" style={{ marginTop: 12 }}>
                + 添加信用卡
              </Button>
            </Card>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.myCardsScroll}>
              {myCards.slice(0, 5).map(card => {
                const bankColor = BankColors[card.bank] || BankColors.default;
                return (
                  <TouchableOpacity 
                    key={card.id}
                    style={[styles.myCardItem, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}
                    onPress={() => router.push(`/card/${card.id}`)}
                  >
                    {card.imageUrl ? (
                      <Image source={{ uri: card.imageUrl }} style={styles.myCardImage} resizeMode="cover" />
                    ) : (
                      <View style={[styles.myCardColor, { backgroundColor: bankColor.bg }]}>
                        <Text style={[styles.myCardBankText, { color: bankColor.text }]}>
                          {card.bank.slice(0, 3)}
                        </Text>
                      </View>
                    )}
                    <Text style={[styles.myCardName, { color: colors.text }]} numberOfLines={1}>
                      {card.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
              {myCards.length > 5 && (
                <TouchableOpacity 
                  style={[styles.moreCardsBtn, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}
                  onPress={() => router.push('/wallet/my-cards')}
                >
                  <Text style={[styles.moreCardsText, { color: colors.primary }]}>+{myCards.length - 5}</Text>
                </TouchableOpacity>
              )}
            </ScrollView>
          )}
        </View>

        {/* 最近消費 */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>最近消費</Text>
            <TouchableOpacity onPress={() => router.push('/wallet/transactions')}>
              <Text style={[styles.sectionAction, { color: colors.primary }]}>查看全部</Text>
            </TouchableOpacity>
          </View>
          
          {transactions.length === 0 ? (
            <Card style={styles.emptyCard}>
              <Ionicons name="receipt-outline" size={40} color={colors.textMuted} />
              <Text style={[styles.emptyText, { color: colors.textMuted }]}>
                尚無消費記錄
              </Text>
              <Button 
                onPress={() => router.push('/wallet/transactions')} 
                variant="outline" 
                size="sm" 
                style={{ marginTop: 12 }}
              >
                + 新增記賬
              </Button>
            </Card>
          ) : (
            <View style={styles.transactionList}>
              {transactions.slice(0, 5).map((tx) => (
                <TouchableOpacity 
                  key={tx.id}
                  style={[styles.transactionItem, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}
                  onPress={() => router.push('/wallet/transactions')}
                >
                  <View style={styles.transactionLeft}>
                    <Text style={[styles.transactionMerchant, { color: colors.text }]} numberOfLines={1}>
                      {tx.merchant_name}
                    </Text>
                    <Text style={[styles.transactionMeta, { color: colors.textMuted }]}>
                      {tx.transaction_date} • {tx.payment_method || '實體卡'}
                    </Text>
                  </View>
                  <View style={styles.transactionRight}>
                    <Text style={[styles.transactionAmount, { color: colors.text }]}>
                      -${tx.amount.toFixed(0)}
                    </Text>
                    {tx.reward_amount > 0 && (
                      <Text style={[styles.transactionReward, { color: colors.rewardGreen }]}>
                        +${tx.reward_amount.toFixed(2)}
                      </Text>
                    )}
                  </View>
                </TouchableOpacity>
              ))}
              {transactions.length > 5 && (
                <TouchableOpacity 
                  style={[styles.viewMoreBtn, { borderColor: colors.border }]}
                  onPress={() => router.push('/wallet/transactions')}
                >
                  <Text style={[styles.viewMoreText, { color: colors.primary }]}>
                    查看更多 ({transactions.length - 5} 筆)
                  </Text>
                  <Ionicons name="chevron-forward" size={16} color={colors.primary} />
                </TouchableOpacity>
              )}
            </View>
          )}
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
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // 未登入狀態
  loginPrompt: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.spacing.xl,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: Layout.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Layout.spacing.xl,
  },
  loginTitle: {
    fontSize: Layout.fontSize.xl,
    fontWeight: Layout.fontWeight.bold,
    marginBottom: Layout.spacing.md,
    textAlign: 'center',
  },
  loginDesc: {
    fontSize: Layout.fontSize.base,
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Layout.spacing['2xl'],
  },
  loginButtons: {
    width: '100%',
    gap: Layout.spacing.md,
  },
  oauthButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.spacing.md,
    borderRadius: Layout.radius.lg,
    height: 50,
  },
  googleButton: {
    backgroundColor: '#4285F4',
  },
  appleButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  oauthButtonText: {
    color: '#FFF',
    fontSize: Layout.fontSize.base,
    fontWeight: Layout.fontWeight.semibold,
  },
  // 已登入狀態
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacing.lg,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: Layout.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Layout.spacing.md,
  },
  avatarText: {
    color: '#FFF',
    fontSize: Layout.fontSize.xl,
    fontWeight: Layout.fontWeight.bold,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: Layout.fontSize.lg,
    fontWeight: Layout.fontWeight.bold,
  },
  userEmail: {
    fontSize: Layout.fontSize.sm,
    marginTop: 2,
  },
  statsRow: {
    flexDirection: 'row',
    paddingHorizontal: Layout.spacing.lg,
    gap: Layout.spacing.sm,
    marginBottom: Layout.spacing.md,
  },
  statCard: {
    alignItems: 'center',
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.sm,
  },
  statLabel: {
    fontSize: Layout.fontSize.xs,
    marginTop: Layout.spacing.xs,
  },
  statValue: {
    fontSize: Layout.fontSize.lg,
    fontWeight: Layout.fontWeight.bold,
    marginTop: 2,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: Layout.spacing.lg,
    gap: Layout.spacing.md,
  },
  actionItem: {
    width: '47%',
    padding: Layout.spacing.lg,
    borderRadius: Layout.radius.lg,
    alignItems: 'center',
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: Layout.radius.full,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Layout.spacing.sm,
  },
  actionText: {
    fontSize: Layout.fontSize.sm,
    fontWeight: Layout.fontWeight.medium,
  },
  section: {
    padding: Layout.spacing.lg,
    paddingTop: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Layout.spacing.md,
  },
  sectionTitle: {
    fontSize: Layout.fontSize.lg,
    fontWeight: Layout.fontWeight.bold,
  },
  sectionAction: {
    fontSize: Layout.fontSize.sm,
    fontWeight: Layout.fontWeight.medium,
  },
  emptyCard: {
    alignItems: 'center',
    paddingVertical: Layout.spacing.xl,
  },
  emptyText: {
    marginTop: Layout.spacing.sm,
    fontSize: Layout.fontSize.sm,
  },
  myCardsScroll: {
    marginTop: Layout.spacing.sm,
  },
  myCardItem: {
    width: 100,
    padding: Layout.spacing.sm,
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
    marginRight: Layout.spacing.sm,
    alignItems: 'center',
  },
  myCardImage: {
    width: 70,
    height: 44,
    borderRadius: Layout.radius.sm,
    marginBottom: Layout.spacing.xs,
  },
  myCardColor: {
    width: 70,
    height: 44,
    borderRadius: Layout.radius.sm,
    marginBottom: Layout.spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
  },
  myCardBankText: {
    fontSize: 10,
    fontWeight: Layout.fontWeight.bold,
  },
  myCardName: {
    fontSize: Layout.fontSize.xs,
    fontWeight: Layout.fontWeight.medium,
    textAlign: 'center',
  },
  moreCardsBtn: {
    width: 60,
    height: 80,
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  moreCardsText: {
    fontSize: Layout.fontSize.base,
    fontWeight: Layout.fontWeight.bold,
  },
  // 交易列表樣式
  transactionList: {
    gap: Layout.spacing.sm,
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Layout.spacing.md,
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
  },
  transactionLeft: {
    flex: 1,
    marginRight: Layout.spacing.md,
  },
  transactionMerchant: {
    fontSize: Layout.fontSize.base,
    fontWeight: Layout.fontWeight.semibold,
  },
  transactionMeta: {
    fontSize: Layout.fontSize.xs,
    marginTop: 2,
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: Layout.fontSize.base,
    fontWeight: Layout.fontWeight.bold,
  },
  transactionReward: {
    fontSize: Layout.fontSize.xs,
    fontWeight: Layout.fontWeight.medium,
  },
  viewMoreBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Layout.spacing.md,
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  viewMoreText: {
    fontSize: Layout.fontSize.sm,
    fontWeight: Layout.fontWeight.medium,
    marginRight: 4,
  },
});
