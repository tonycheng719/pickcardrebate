import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput,
  Alert,
  RefreshControl,
  ActivityIndicator,
  Modal,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { useColorScheme } from '@/components/useColorScheme';
import { useAuth } from '@/lib/auth/AuthContext';
import { MERCHANT_CATEGORIES } from '@/lib/data/merchants';
import { api } from '@/lib/api/client';

const API_BASE = 'https://pickcardrebate.com';

interface Transaction {
  id: string;
  merchant_name: string;
  category_id: string;
  amount: number;
  payment_method: string;
  card_id: string;
  reward_amount: number;
  reward_currency: string;
  reward_unit: string;
  transaction_date: string;
}

const PAYMENT_METHODS = [
  { id: 'physical', name: '實體卡', icon: '💳' },
  { id: 'online', name: '網上', icon: '💻' },
  { id: 'apple_pay', name: 'Apple Pay', icon: '📱' },
  { id: 'google_pay', name: 'Google Pay', icon: '📱' },
  { id: 'octopus', name: '八達通', icon: '🔵' },
];

export default function TransactionsScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { user } = useAuth();
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  
  // 新增消費表單
  const [merchantName, setMerchantName] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('physical');
  const [cardId, setCardId] = useState('');
  const [rewardAmount, setRewardAmount] = useState('');
  const [saving, setSaving] = useState(false);
  
  // 用戶卡片
  const [userCards, setUserCards] = useState<any[]>([]);

  useEffect(() => {
    if (user?.id) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    if (!user?.id) return;
    
    try {
      // 載入消費記錄
      const txRes = await fetch(`${API_BASE}/api/user/transactions?userId=${user.id}`);
      if (txRes.ok) {
        const txData = await txRes.json();
        setTransactions(txData);
      }
      
      // 載入用戶卡片
      const walletRes = await fetch(`${API_BASE}/api/wallet/sync?userId=${user.id}`);
      if (walletRes.ok) {
        const walletData = await walletRes.json();
        const cardsRes = await api.getCards();
        if (cardsRes.data && walletData.myCardIds) {
          const myCards = cardsRes.data.cards.filter((c: any) => 
            walletData.myCardIds.includes(c.id)
          );
          setUserCards(myCards);
        }
      }
    } catch (e) {
      console.error('Load transactions error:', e);
    }
    setLoading(false);
    setRefreshing(false);
  };

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadData();
  }, [user]);

  const handleSave = async () => {
    if (!merchantName.trim() || !amount.trim() || !cardId) {
      Alert.alert('提示', '請填寫商戶、金額和選擇信用卡');
      return;
    }

    setSaving(true);
    try {
      const res = await fetch(`${API_BASE}/api/user/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user?.id,
          merchantName: merchantName.trim(),
          categoryId,
          amount: parseFloat(amount),
          paymentMethod,
          cardId,
          rewardAmount: parseFloat(rewardAmount) || 0,
          rewardCurrency: 'HKD',
          rewardUnit: 'cash',
          transactionDate: new Date().toISOString().split('T')[0],
        }),
      });

      if (res.ok) {
        Alert.alert('成功', '消費記錄已新增');
        setShowAddModal(false);
        resetForm();
        loadData();
      } else {
        const err = await res.json();
        Alert.alert('錯誤', err.error || '新增失敗');
      }
    } catch (e) {
      Alert.alert('錯誤', '網絡錯誤');
    }
    setSaving(false);
  };

  const resetForm = () => {
    setMerchantName('');
    setCategoryId('');
    setAmount('');
    setPaymentMethod('physical');
    setCardId('');
    setRewardAmount('');
  };

  // 計算統計
  const stats = transactions.reduce((acc, t) => ({
    totalSpending: acc.totalSpending + t.amount,
    totalReward: acc.totalReward + t.reward_amount,
  }), { totalSpending: 0, totalReward: 0 });

  if (!user) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Stack.Screen options={{ title: '消費記錄', headerBackTitle: '返回' }} />
        <View style={styles.emptyState}>
          <Ionicons name="lock-closed" size={48} color={colors.textMuted} />
          <Text style={[styles.emptyText, { color: colors.textMuted }]}>
            請先登入以查看消費記錄
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <Stack.Screen options={{ title: '消費記錄', headerBackTitle: '返回' }} />
      
      {/* 統計卡片 */}
      <View style={[styles.statsCard, { backgroundColor: colors.backgroundCard }]}>
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: colors.textMuted }]}>本月消費</Text>
          <Text style={[styles.statValue, { color: colors.text }]}>
            ${stats.totalSpending.toLocaleString()}
          </Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: colors.textMuted }]}>總回贈</Text>
          <Text style={[styles.statValue, { color: colors.rewardGreen }]}>
            ${stats.totalReward.toFixed(2)}
          </Text>
        </View>
      </View>

      {/* 新增按鈕 */}
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: colors.primary }]}
        onPress={() => setShowAddModal(true)}
      >
        <Ionicons name="add" size={24} color="#FFF" />
        <Text style={styles.addButtonText}>新增消費記錄</Text>
      </TouchableOpacity>

      {/* 消費列表 */}
      <ScrollView
        style={styles.list}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={colors.primary}
          />
        }
      >
        {loading ? (
          <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
        ) : transactions.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={48} color={colors.textMuted} />
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>
              尚無消費記錄
            </Text>
            <Text style={[styles.emptyHint, { color: colors.textMuted }]}>
              點擊上方按鈕新增您的消費
            </Text>
          </View>
        ) : (
          transactions.map((t) => {
            const category = MERCHANT_CATEGORIES.find(c => c.id === t.category_id);
            const card = userCards.find(c => c.id === t.card_id);
            return (
              <View 
                key={t.id} 
                style={[styles.txItem, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}
              >
                <View style={styles.txIcon}>
                  <Text style={styles.txEmoji}>{category?.icon || '💳'}</Text>
                </View>
                <View style={styles.txInfo}>
                  <Text style={[styles.txMerchant, { color: colors.text }]}>{t.merchant_name}</Text>
                  <Text style={[styles.txMeta, { color: colors.textMuted }]}>
                    {card?.name || t.card_id} · {t.transaction_date}
                  </Text>
                </View>
                <View style={styles.txAmount}>
                  <Text style={[styles.txSpend, { color: colors.text }]}>-${t.amount}</Text>
                  {t.reward_amount > 0 && (
                    <Text style={[styles.txReward, { color: colors.rewardGreen }]}>
                      +${t.reward_amount.toFixed(2)}
                    </Text>
                  )}
                </View>
              </View>
            );
          })
        )}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* 新增消費 Modal */}
      <Modal visible={showAddModal} animationType="slide" transparent>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.modalOverlay}
        >
          <View style={[styles.modalContent, { backgroundColor: colors.background }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>新增消費記錄</Text>
              <TouchableOpacity onPress={() => setShowAddModal(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.form}>
              {/* 商戶名稱 */}
              <View style={styles.field}>
                <Text style={[styles.label, { color: colors.text }]}>商戶名稱 *</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: colors.backgroundCard, color: colors.text, borderColor: colors.border }]}
                  value={merchantName}
                  onChangeText={setMerchantName}
                  placeholder="例如：惠康超市"
                  placeholderTextColor={colors.textMuted}
                />
              </View>

              {/* 消費類別 */}
              <View style={styles.field}>
                <Text style={[styles.label, { color: colors.text }]}>消費類別</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.chips}>
                    {MERCHANT_CATEGORIES.slice(0, 6).map(cat => (
                      <TouchableOpacity
                        key={cat.id}
                        style={[
                          styles.chip,
                          { backgroundColor: categoryId === cat.id ? colors.primary : colors.backgroundCard, borderColor: colors.border }
                        ]}
                        onPress={() => setCategoryId(cat.id)}
                      >
                        <Text style={{ color: categoryId === cat.id ? '#FFF' : colors.text }}>
                          {cat.icon} {cat.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>

              {/* 金額 */}
              <View style={styles.field}>
                <Text style={[styles.label, { color: colors.text }]}>消費金額 *</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: colors.backgroundCard, color: colors.text, borderColor: colors.border }]}
                  value={amount}
                  onChangeText={setAmount}
                  placeholder="0.00"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="decimal-pad"
                />
              </View>

              {/* 支付方式 */}
              <View style={styles.field}>
                <Text style={[styles.label, { color: colors.text }]}>支付方式</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.chips}>
                    {PAYMENT_METHODS.map(pm => (
                      <TouchableOpacity
                        key={pm.id}
                        style={[
                          styles.chip,
                          { backgroundColor: paymentMethod === pm.id ? colors.primary : colors.backgroundCard, borderColor: colors.border }
                        ]}
                        onPress={() => setPaymentMethod(pm.id)}
                      >
                        <Text style={{ color: paymentMethod === pm.id ? '#FFF' : colors.text }}>
                          {pm.icon} {pm.name}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>

              {/* 使用的信用卡 */}
              <View style={styles.field}>
                <Text style={[styles.label, { color: colors.text }]}>使用的信用卡 *</Text>
                {userCards.length === 0 ? (
                  <Text style={[styles.hint, { color: colors.textMuted }]}>
                    請先在卡包添加信用卡
                  </Text>
                ) : (
                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View style={styles.chips}>
                      {userCards.map(card => (
                        <TouchableOpacity
                          key={card.id}
                          style={[
                            styles.chip,
                            { backgroundColor: cardId === card.id ? colors.primary : colors.backgroundCard, borderColor: colors.border }
                          ]}
                          onPress={() => setCardId(card.id)}
                        >
                          <Text 
                            style={{ color: cardId === card.id ? '#FFF' : colors.text }}
                            numberOfLines={1}
                          >
                            {card.name}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </ScrollView>
                )}
              </View>

              {/* 回贈金額 */}
              <View style={styles.field}>
                <Text style={[styles.label, { color: colors.text }]}>回贈金額 (可選)</Text>
                <TextInput
                  style={[styles.input, { backgroundColor: colors.backgroundCard, color: colors.text, borderColor: colors.border }]}
                  value={rewardAmount}
                  onChangeText={setRewardAmount}
                  placeholder="0.00"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="decimal-pad"
                />
              </View>
            </ScrollView>

            {/* 保存按鈕 */}
            <TouchableOpacity
              style={[styles.saveButton, { backgroundColor: colors.primary }]}
              onPress={handleSave}
              disabled={saving}
            >
              {saving ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <Text style={styles.saveButtonText}>保存記錄</Text>
              )}
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  statsCard: {
    flexDirection: 'row',
    margin: Layout.spacing.md,
    padding: Layout.spacing.lg,
    borderRadius: Layout.radius.lg,
  },
  statItem: { flex: 1, alignItems: 'center' },
  statDivider: { width: 1, backgroundColor: '#E5E7EB', marginHorizontal: Layout.spacing.md },
  statLabel: { fontSize: Layout.fontSize.sm, marginBottom: 4 },
  statValue: { fontSize: Layout.fontSize.xl, fontWeight: 'bold' },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: Layout.spacing.md,
    padding: Layout.spacing.md,
    borderRadius: Layout.radius.lg,
    gap: Layout.spacing.sm,
  },
  addButtonText: { color: '#FFF', fontSize: Layout.fontSize.base, fontWeight: '600' },
  list: { flex: 1, paddingHorizontal: Layout.spacing.md, marginTop: Layout.spacing.md },
  emptyState: { alignItems: 'center', paddingVertical: Layout.spacing['3xl'] },
  emptyText: { fontSize: Layout.fontSize.base, marginTop: Layout.spacing.md },
  emptyHint: { fontSize: Layout.fontSize.sm, marginTop: Layout.spacing.xs },
  txItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacing.md,
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
    marginBottom: Layout.spacing.sm,
  },
  txIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txEmoji: { fontSize: 20 },
  txInfo: { flex: 1, marginLeft: Layout.spacing.md },
  txMerchant: { fontSize: Layout.fontSize.base, fontWeight: '600' },
  txMeta: { fontSize: Layout.fontSize.xs, marginTop: 2 },
  txAmount: { alignItems: 'flex-end' },
  txSpend: { fontSize: Layout.fontSize.base, fontWeight: '600' },
  txReward: { fontSize: Layout.fontSize.sm },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Layout.spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  modalTitle: { fontSize: Layout.fontSize.lg, fontWeight: 'bold' },
  form: { padding: Layout.spacing.lg },
  field: { marginBottom: Layout.spacing.lg },
  label: { fontSize: Layout.fontSize.sm, fontWeight: '500', marginBottom: Layout.spacing.sm },
  input: {
    borderWidth: 1,
    borderRadius: Layout.radius.md,
    padding: Layout.spacing.md,
    fontSize: Layout.fontSize.base,
  },
  chips: { flexDirection: 'row', gap: Layout.spacing.sm },
  chip: {
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
    borderRadius: Layout.radius.full,
    borderWidth: 1,
  },
  hint: { fontSize: Layout.fontSize.sm },
  saveButton: {
    margin: Layout.spacing.lg,
    padding: Layout.spacing.md,
    borderRadius: Layout.radius.lg,
    alignItems: 'center',
  },
  saveButtonText: { color: '#FFF', fontSize: Layout.fontSize.base, fontWeight: '600' },
});

