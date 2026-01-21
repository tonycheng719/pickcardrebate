import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  Alert,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { useColorScheme } from '@/components/useColorScheme';
import { 
  getCalculationHistory, 
  deleteCalculationRecord, 
  clearCalculationHistory,
  getCalculationStats,
  CalculationRecord 
} from '@/lib/storage/calculationHistory';

export default function HistoryScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  const [history, setHistory] = useState<CalculationRecord[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [historyData, statsData] = await Promise.all([
      getCalculationHistory(),
      getCalculationStats(),
    ]);
    setHistory(historyData);
    setStats(statsData);
  };

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  }, []);

  const handleDelete = (record: CalculationRecord) => {
    Alert.alert(
      '刪除記錄',
      `確定要刪除這筆計算記錄嗎？`,
      [
        { text: '取消', style: 'cancel' },
        {
          text: '刪除',
          style: 'destructive',
          onPress: async () => {
            await deleteCalculationRecord(record.id);
            loadData();
          },
        },
      ]
    );
  };

  const handleClearAll = () => {
    Alert.alert(
      '清空歷史',
      '確定要清空所有計算記錄嗎？此操作無法撤銷。',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '清空',
          style: 'destructive',
          onPress: async () => {
            await clearCalculationHistory();
            loadData();
          },
        },
      ]
    );
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('zh-HK', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  // 按日期分組
  const groupedHistory = history.reduce((groups, record) => {
    const date = new Date(record.timestamp).toLocaleDateString('zh-HK');
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(record);
    return groups;
  }, {} as Record<string, CalculationRecord[]>);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <Stack.Screen 
        options={{ 
          title: '計算記錄', 
          headerBackTitle: '返回',
          headerRight: () => history.length > 0 ? (
            <TouchableOpacity onPress={handleClearAll}>
              <Text style={{ color: colors.error, fontSize: 15 }}>清空</Text>
            </TouchableOpacity>
          ) : null,
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
        {/* 統計卡片 */}
        {stats && stats.totalCalculations > 0 && (
          <View style={[styles.statsCard, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}>
            <View style={styles.statRow}>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: colors.primary }]}>
                  {stats.totalCalculations}
                </Text>
                <Text style={[styles.statLabel, { color: colors.textMuted }]}>總計算次數</Text>
              </View>
              <View style={styles.statItem}>
                <Text style={[styles.statValue, { color: colors.rewardGreen }]}>
                  ${stats.totalReward.toFixed(0)}
                </Text>
                <Text style={[styles.statLabel, { color: colors.textMuted }]}>累計回贈</Text>
              </View>
            </View>
            {stats.favoriteCard && (
              <View style={[styles.favoriteRow, { borderTopColor: colors.borderLight }]}>
                <Ionicons name="heart" size={16} color={colors.error} />
                <Text style={[styles.favoriteText, { color: colors.textMuted }]}>
                  最常用：{stats.favoriteCard}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* 歷史記錄 */}
        {history.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="time-outline" size={64} color={colors.textMuted} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              還沒有計算記錄
            </Text>
            <Text style={[styles.emptyDesc, { color: colors.textMuted }]}>
              使用回贈計算機後，記錄會顯示在這裡
            </Text>
            <TouchableOpacity 
              style={[styles.goCalculateBtn, { backgroundColor: colors.primary }]}
              onPress={() => router.push('/')}
            >
              <Text style={styles.goCalculateBtnText}>開始計算</Text>
            </TouchableOpacity>
          </View>
        ) : (
          Object.entries(groupedHistory).map(([date, records]) => (
            <View key={date} style={styles.dayGroup}>
              <Text style={[styles.dayTitle, { color: colors.textMuted }]}>{date}</Text>
              
              {records.map(record => (
                <View 
                  key={record.id}
                  style={[styles.recordItem, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}
                >
                  <View style={styles.recordHeader}>
                    <View style={styles.recordLeft}>
                      <Text style={[styles.merchantName, { color: colors.text }]}>
                        {record.merchantName}
                      </Text>
                      <Text style={[styles.recordTime, { color: colors.textMuted }]}>
                        {formatDate(record.timestamp)}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => handleDelete(record)}>
                      <Ionicons name="trash-outline" size={18} color={colors.textMuted} />
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.recordDetails}>
                    <View style={styles.detailRow}>
                      <Text style={[styles.detailLabel, { color: colors.textMuted }]}>消費金額</Text>
                      <Text style={[styles.detailValue, { color: colors.text }]}>
                        ${record.amount.toLocaleString()}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={[styles.detailLabel, { color: colors.textMuted }]}>推薦信用卡</Text>
                      <Text style={[styles.detailValue, { color: colors.text }]} numberOfLines={1}>
                        {record.cardName}
                      </Text>
                    </View>
                    <View style={styles.detailRow}>
                      <Text style={[styles.detailLabel, { color: colors.textMuted }]}>回贈</Text>
                      <Text style={[styles.detailValue, { color: colors.rewardGreen }]}>
                        {record.percentage}% ≈ ${record.rewardAmount.toFixed(2)}
                      </Text>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ))
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
  scrollView: {
    flex: 1,
    paddingHorizontal: Layout.spacing.md,
  },
  statsCard: {
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
    marginTop: Layout.spacing.md,
    padding: Layout.spacing.md,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: Layout.fontWeight.bold,
  },
  statLabel: {
    fontSize: Layout.fontSize.xs,
    marginTop: 4,
  },
  favoriteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Layout.spacing.xs,
    marginTop: Layout.spacing.md,
    paddingTop: Layout.spacing.md,
    borderTopWidth: 1,
  },
  favoriteText: {
    fontSize: Layout.fontSize.sm,
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
  goCalculateBtn: {
    marginTop: Layout.spacing.lg,
    paddingHorizontal: Layout.spacing.xl,
    paddingVertical: Layout.spacing.md,
    borderRadius: Layout.radius.full,
  },
  goCalculateBtnText: {
    color: '#FFF',
    fontSize: Layout.fontSize.base,
    fontWeight: Layout.fontWeight.semibold,
  },
  dayGroup: {
    marginTop: Layout.spacing.lg,
  },
  dayTitle: {
    fontSize: Layout.fontSize.sm,
    fontWeight: Layout.fontWeight.semibold,
    marginBottom: Layout.spacing.sm,
  },
  recordItem: {
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
    padding: Layout.spacing.md,
    marginBottom: Layout.spacing.sm,
  },
  recordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Layout.spacing.sm,
  },
  recordLeft: {
    flex: 1,
  },
  merchantName: {
    fontSize: Layout.fontSize.base,
    fontWeight: Layout.fontWeight.semibold,
  },
  recordTime: {
    fontSize: Layout.fontSize.xs,
    marginTop: 2,
  },
  recordDetails: {
    gap: Layout.spacing.xs,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailLabel: {
    fontSize: Layout.fontSize.sm,
  },
  detailValue: {
    fontSize: Layout.fontSize.sm,
    fontWeight: Layout.fontWeight.medium,
    maxWidth: '60%',
    textAlign: 'right',
  },
});

