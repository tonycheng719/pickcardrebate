import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { useColorScheme } from '@/components/useColorScheme';
import { Card, Badge } from '@/components/ui';
import { api, PromoData } from '@/lib/api/client';
import { router } from 'expo-router';

// Tab 選項
const TABS = [
  { id: 'all', name: '全部', type: undefined },
  { id: 'promo', name: '優惠', type: 'promo' as const },
  { id: 'guide', name: '攻略', type: 'guide' as const },
];

export default function DiscoverScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const [selectedTab, setSelectedTab] = useState('all');
  const [promos, setPromos] = useState<PromoData[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 載入文章
  useEffect(() => {
    loadPromos();
  }, [selectedTab]);

  const loadPromos = async (isRefresh = false) => {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }
    setError(null);
    
    const currentTab = TABS.find(t => t.id === selectedTab);
    const response = await api.getPromos({ 
      type: currentTab?.type,
      limit: 50 
    });
    
    if (response.data) {
      setPromos(response.data.promos);
    } else {
      setError(response.error || '無法載入文章');
    }
    
    setLoading(false);
    setRefreshing(false);
  };

  const handleArticlePress = (id: string) => {
    router.push(`/article/${id}`);
  };

  const renderArticle = ({ item }: { item: PromoData }) => (
    <Card style={styles.articleCard} onPress={() => handleArticlePress(item.id)}>
      {/* 圖片 */}
      <View style={styles.imageContainer}>
        {item.imageUrl ? (
          <Image
            source={{ uri: item.imageUrl }}
            style={styles.articleImage}
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.articleImagePlaceholder, { backgroundColor: colors.borderLight }]}>
            <Ionicons name="image-outline" size={32} color={colors.textMuted} />
          </View>
        )}
        {item.isPinned && (
          <View style={[styles.pinnedBadge, { backgroundColor: colors.primary }]}>
            <Ionicons name="pin" size={12} color="#FFF" />
            <Text style={styles.pinnedText}>置頂</Text>
          </View>
        )}
        {item.isNew && (
          <View style={[styles.newBadge, { backgroundColor: colors.success }]}>
            <Text style={styles.newText}>NEW</Text>
          </View>
        )}
      </View>

      {/* 內容 */}
      <View style={styles.articleContent}>
        <Text style={[styles.articleTitle, { color: colors.text }]} numberOfLines={2}>
          {item.title}
        </Text>
        <Text style={[styles.articleDesc, { color: colors.textMuted }]} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.metaRow}>
          {item.merchant && (
            <Badge variant="default" size="sm">
              {item.merchant}
            </Badge>
          )}
          {item.expiryDate && (
            <Text style={[styles.expiryText, { color: colors.textMuted }]}>
              至 {item.expiryDate}
            </Text>
          )}
        </View>
        <View style={styles.tagsRow}>
          {item.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="primary" size="sm">
              {tag}
            </Badge>
          ))}
        </View>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      {/* Tab 選擇 */}
      <View style={[styles.tabBar, { borderBottomColor: colors.border }]}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab.id}
            style={[
              styles.tab,
              selectedTab === tab.id && { borderBottomColor: colors.primary, borderBottomWidth: 2 },
            ]}
            onPress={() => setSelectedTab(tab.id)}
          >
            <Text
              style={[
                styles.tabText,
                { color: selectedTab === tab.id ? colors.primary : colors.textMuted },
              ]}
            >
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* 文章列表 */}
      {loading && !refreshing ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : error ? (
        <View style={styles.errorContainer}>
          <Text style={[styles.errorText, { color: colors.error }]}>{error}</Text>
          <TouchableOpacity onPress={() => loadPromos()}>
            <Text style={[styles.retryText, { color: colors.primary }]}>點擊重試</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={promos}
          renderItem={renderArticle}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => loadPromos(true)}
              tintColor={colors.primary}
              colors={[colors.primary, '#10B981', '#F59E0B']}
              progressBackgroundColor={colors.backgroundCard}
              title="下拉更新..."
              titleColor={colors.textMuted}
            />
          }
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={[styles.emptyText, { color: colors.textMuted }]}>
                暫無文章
              </Text>
            </View>
          }
          ListFooterComponent={<View style={{ height: 100 }} />}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingHorizontal: Layout.spacing.md,
  },
  tab: {
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.md,
    marginRight: Layout.spacing.xs,
  },
  tabText: {
    fontSize: Layout.fontSize.base,
    fontWeight: Layout.fontWeight.semibold,
  },
  listContent: {
    padding: Layout.spacing.md,
  },
  articleCard: {
    marginBottom: Layout.spacing.lg,
    padding: 0,
    overflow: 'hidden',
  },
  imageContainer: {
    position: 'relative',
  },
  articleImage: {
    width: '100%',
    height: 160,
  },
  articleImagePlaceholder: {
    width: '100%',
    height: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pinnedBadge: {
    position: 'absolute',
    top: Layout.spacing.sm,
    right: Layout.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: Layout.radius.full,
    gap: 4,
  },
  pinnedText: {
    color: '#FFF',
    fontSize: Layout.fontSize.xs,
    fontWeight: Layout.fontWeight.semibold,
  },
  newBadge: {
    position: 'absolute',
    top: Layout.spacing.sm,
    left: Layout.spacing.sm,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: Layout.radius.full,
  },
  newText: {
    color: '#FFF',
    fontSize: Layout.fontSize.xs,
    fontWeight: Layout.fontWeight.bold,
  },
  articleContent: {
    padding: Layout.spacing.md,
  },
  articleTitle: {
    fontSize: Layout.fontSize.md,
    fontWeight: Layout.fontWeight.bold,
    marginBottom: Layout.spacing.xs,
  },
  articleDesc: {
    fontSize: Layout.fontSize.sm,
    marginBottom: Layout.spacing.sm,
    lineHeight: 20,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.sm,
    marginBottom: Layout.spacing.sm,
  },
  expiryText: {
    fontSize: Layout.fontSize.xs,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Layout.spacing.xs,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
