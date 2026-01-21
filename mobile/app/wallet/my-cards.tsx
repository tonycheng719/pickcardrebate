import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  ActivityIndicator,
  Alert,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BankColors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { useColorScheme } from '@/components/useColorScheme';
import { api, CardItem } from '@/lib/api/client';
import { useAuth } from '@/lib/auth/AuthContext';
import { 
  MyCard, 
  getMyCards, 
  addCardToWallet, 
  removeCardFromWallet,
  syncWalletFromCloud,
  addCardToCloud,
  removeCardFromCloud,
} from '@/lib/storage/myCards';

export default function MyCardsScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { user } = useAuth();
  
  const [myCards, setMyCards] = useState<MyCard[]>([]);
  const [allCards, setAllCards] = useState<CardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showAddCard, setShowAddCard] = useState(false);

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async (isRefresh = false) => {
    if (!isRefresh) setLoading(true);
    
    // 載入所有卡片
    const response = await api.getCards();
    if (response.data) {
      setAllCards(response.data.cards);
    }
    
    // 載入用戶卡包（已登入：從雲端同步，未登入：本地）
    if (user?.id) {
      const cloudCards = await syncWalletFromCloud(user.id);
      setMyCards(cloudCards);
    } else {
      const savedCards = await getMyCards();
      setMyCards(savedCards);
    }
    
    setLoading(false);
    if (isRefresh) setRefreshing(false);
  };

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadData(true);
  }, [user]);

  const handleAddCard = async (card: CardItem) => {
    // 已登入：同步到雲端
    if (user?.id) {
      const cloudSuccess = await addCardToCloud(user.id, card.id);
      if (cloudSuccess) {
        // 重新同步
        const updatedCards = await syncWalletFromCloud(user.id);
        setMyCards(updatedCards);
        setShowAddCard(false);
      } else {
        Alert.alert('錯誤', '添加卡片失敗，請重試');
      }
    } else {
      // 未登入：本地存儲
      const success = await addCardToWallet({
        id: card.id,
        name: card.name,
        bank: card.bank,
        imageUrl: card.imageUrl || undefined,
      });
      
      if (success) {
        setMyCards(await getMyCards());
        setShowAddCard(false);
      } else {
        Alert.alert('提示', '此卡已在您的卡包中');
      }
    }
  };

  const handleRemoveCard = (card: MyCard) => {
    Alert.alert(
      '移除卡片',
      `確定要從卡包移除 ${card.name} 嗎？`,
      [
        { text: '取消', style: 'cancel' },
        { 
          text: '移除', 
          style: 'destructive',
          onPress: async () => {
            if (user?.id) {
              // 已登入：從雲端移除
              const cloudSuccess = await removeCardFromCloud(user.id, card.id);
              if (cloudSuccess) {
                const updatedCards = await syncWalletFromCloud(user.id);
                setMyCards(updatedCards);
              } else {
                Alert.alert('錯誤', '移除卡片失敗，請重試');
              }
            } else {
              // 未登入：本地移除
              await removeCardFromWallet(card.id);
              setMyCards(await getMyCards());
            }
          }
        },
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
        <Stack.Screen options={{ title: '我的卡包', headerBackTitle: '返回' }} />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  // 添加卡片頁面
  if (showAddCard) {
    const availableCards = allCards.filter(card => !myCards.some(mc => mc.id === card.id));
    
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
        <Stack.Screen options={{ headerShown: false }} />
        
        {/* 自定義頭部 */}
        <View style={[styles.customHeader, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
          <TouchableOpacity 
            onPress={() => setShowAddCard(false)}
            style={styles.headerButton}
          >
            <Text style={{ color: colors.primary, fontSize: 17 }}>取消</Text>
          </TouchableOpacity>
          <Text style={[styles.headerTitle, { color: colors.text }]}>添加信用卡</Text>
          <View style={styles.headerButton} />
        </View>
        
        <ScrollView style={styles.cardList}>
          {availableCards.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={[styles.emptyText, { color: colors.textMuted }]}>
                所有卡片都已在您的卡包中
              </Text>
            </View>
          ) : (
            availableCards.map(card => {
              const bankColor = BankColors[card.bank] || BankColors.default;
              return (
                <TouchableOpacity
                  key={card.id}
                  style={[styles.cardItem, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}
                  onPress={() => handleAddCard(card)}
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
                  <Ionicons name="add-circle" size={24} color={colors.primary} />
                </TouchableOpacity>
              );
            })
          )}
          <View style={{ height: 100 }} />
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <Stack.Screen options={{ title: '我的卡包', headerBackTitle: '返回' }} />
      
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
            添加您持有的信用卡，計算回贈時會優先顯示這些卡
          </Text>
        </View>

        {/* 添加按鈕 */}
        <TouchableOpacity 
          style={[styles.addButton, { backgroundColor: colors.primary }]}
          onPress={() => setShowAddCard(true)}
        >
          <Ionicons name="add" size={24} color="#FFF" />
          <Text style={styles.addButtonText}>添加信用卡</Text>
        </TouchableOpacity>

        {/* 卡包列表 */}
        {myCards.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="wallet-outline" size={64} color={colors.textMuted} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              您的卡包還是空的
            </Text>
            <Text style={[styles.emptyDesc, { color: colors.textMuted }]}>
              添加您持有的信用卡，我們會優先推薦這些卡
            </Text>
          </View>
        ) : (
          <View style={styles.cardGrid}>
            {myCards.map(card => {
              const bankColor = BankColors[card.bank] || BankColors.default;
              return (
                <View 
                  key={card.id}
                  style={[styles.myCardItem, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}
                >
                  <TouchableOpacity 
                    style={styles.removeBtn}
                    onPress={() => handleRemoveCard(card)}
                  >
                    <Ionicons name="close-circle" size={22} color={colors.error} />
                  </TouchableOpacity>
                  
                  <TouchableOpacity onPress={() => router.push(`/card/${card.id}`)}>
                    {card.imageUrl ? (
                      <Image source={{ uri: card.imageUrl }} style={styles.myCardImage} resizeMode="cover" />
                    ) : (
                      <View style={[styles.myCardColor, { backgroundColor: bankColor.bg }]}>
                        <Text style={[styles.myCardBankText, { color: bankColor.text }]}>
                          {card.bank.slice(0, 3)}
                        </Text>
                      </View>
                    )}
                    <Text style={[styles.myCardName, { color: colors.text }]} numberOfLines={2}>
                      {card.name}
                    </Text>
                    <Text style={[styles.myCardBank, { color: colors.textMuted }]}>
                      {card.bank}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}
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
  customHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.md,
    borderBottomWidth: 1,
  },
  headerButton: {
    width: 60,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: Layout.spacing.md,
    borderRadius: Layout.radius.lg,
    marginTop: Layout.spacing.lg,
    gap: Layout.spacing.sm,
  },
  addButtonText: {
    color: '#FFF',
    fontSize: Layout.fontSize.base,
    fontWeight: Layout.fontWeight.semibold,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Layout.spacing['3xl'],
  },
  emptyTitle: {
    fontSize: Layout.fontSize.lg,
    fontWeight: Layout.fontWeight.bold,
    marginTop: Layout.spacing.lg,
  },
  emptyDesc: {
    fontSize: Layout.fontSize.sm,
    marginTop: Layout.spacing.sm,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: Layout.fontSize.base,
    textAlign: 'center',
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Layout.spacing.md,
    marginTop: Layout.spacing.lg,
  },
  myCardItem: {
    width: '47%',
    padding: Layout.spacing.md,
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
    position: 'relative',
  },
  removeBtn: {
    position: 'absolute',
    top: 4,
    right: 4,
    zIndex: 1,
  },
  myCardImage: {
    width: '100%',
    height: 60,
    borderRadius: Layout.radius.sm,
    marginBottom: Layout.spacing.sm,
  },
  myCardColor: {
    width: '100%',
    height: 60,
    borderRadius: Layout.radius.sm,
    marginBottom: Layout.spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  myCardBankText: {
    fontSize: 14,
    fontWeight: Layout.fontWeight.bold,
  },
  myCardName: {
    fontSize: Layout.fontSize.sm,
    fontWeight: Layout.fontWeight.semibold,
  },
  myCardBank: {
    fontSize: Layout.fontSize.xs,
    marginTop: 2,
  },
  cardList: {
    flex: 1,
    paddingHorizontal: Layout.spacing.md,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacing.md,
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
    marginTop: Layout.spacing.sm,
  },
  cardImage: {
    width: 50,
    height: 32,
    borderRadius: Layout.radius.sm,
  },
  cardColor: {
    width: 50,
    height: 32,
    borderRadius: Layout.radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBankText: {
    fontSize: 10,
    fontWeight: Layout.fontWeight.bold,
  },
  cardInfo: {
    flex: 1,
    marginLeft: Layout.spacing.md,
  },
  cardName: {
    fontSize: Layout.fontSize.sm,
    fontWeight: Layout.fontWeight.semibold,
  },
  cardBank: {
    fontSize: Layout.fontSize.xs,
    marginTop: 2,
  },
});

