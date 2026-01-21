import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert, ActivityIndicator, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BankColors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { useColorScheme } from '@/components/useColorScheme';
import { Button, Card } from '@/components/ui';
import { useAuth } from '@/lib/auth/AuthContext';
import { getMyCards, MyCard } from '@/lib/storage/myCards';

export default function WalletScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { user, loading, signInWithGoogle, signInWithApple, signOut } = useAuth();
  const [signingIn, setSigningIn] = useState(false);
  const [myCards, setMyCards] = useState<MyCard[]>([]);

  // 載入用戶卡包
  useEffect(() => {
    loadMyCards();
  }, []);

  const loadMyCards = async () => {
    const cards = await getMyCards();
    setMyCards(cards);
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
      <ScrollView showsVerticalScrollIndicator={false}>
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

        {/* 回贈統計 */}
        <Card style={styles.statsCard}>
          <Text style={[styles.statsTitle, { color: colors.textMuted }]}>本月回贈</Text>
          <Text style={[styles.statsValue, { color: colors.rewardGreen }]}>$0.00</Text>
          <Text style={[styles.statsHint, { color: colors.textMuted }]}>開始記錄消費以追蹤回贈</Text>
        </Card>

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
            <TouchableOpacity onPress={() => router.push('/wallet/my-cards')}>
              <Text style={[styles.sectionAction, { color: colors.primary }]}>管理</Text>
            </TouchableOpacity>
          </View>
          
          {myCards.length === 0 ? (
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
            <TouchableOpacity>
              <Text style={[styles.sectionAction, { color: colors.primary }]}>查看全部</Text>
            </TouchableOpacity>
          </View>
          
          <Card style={styles.emptyCard}>
            <Ionicons name="receipt-outline" size={40} color={colors.textMuted} />
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>
              尚無消費記錄
            </Text>
          </Card>
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
  statsCard: {
    marginHorizontal: Layout.spacing.lg,
    alignItems: 'center',
    paddingVertical: Layout.spacing.xl,
  },
  statsTitle: {
    fontSize: Layout.fontSize.sm,
    marginBottom: Layout.spacing.xs,
  },
  statsValue: {
    fontSize: Layout.fontSize['3xl'],
    fontWeight: Layout.fontWeight.bold,
  },
  statsHint: {
    fontSize: Layout.fontSize.xs,
    marginTop: Layout.spacing.sm,
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
});
