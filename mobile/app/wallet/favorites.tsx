import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  Alert,
  RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { useColorScheme } from '@/components/useColorScheme';
import { getFavorites, removeFavorite, FavoriteItem } from '@/lib/storage/favorites';

export default function FavoritesScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    const data = await getFavorites();
    setFavorites(data);
  };

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    await loadFavorites();
    setRefreshing(false);
  }, []);

  const handleRemove = (item: FavoriteItem) => {
    Alert.alert(
      '移除收藏',
      `確定要移除「${item.title}」嗎？`,
      [
        { text: '取消', style: 'cancel' },
        {
          text: '移除',
          style: 'destructive',
          onPress: async () => {
            await removeFavorite(item.id, item.type);
            loadFavorites();
          },
        },
      ]
    );
  };

  const handlePress = (item: FavoriteItem) => {
    if (item.type === 'article') {
      router.push(`/article/${item.id}`);
    } else {
      router.push(`/card/${item.id}`);
    }
  };

  const articles = favorites.filter(f => f.type === 'article');
  const cards = favorites.filter(f => f.type === 'card');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <Stack.Screen options={{ title: '我的收藏', headerBackTitle: '返回' }} />
      
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
        {favorites.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="bookmark-outline" size={64} color={colors.textMuted} />
            <Text style={[styles.emptyTitle, { color: colors.text }]}>
              還沒有收藏
            </Text>
            <Text style={[styles.emptyDesc, { color: colors.textMuted }]}>
              瀏覽文章或信用卡時，點擊收藏按鈕即可添加到這裡
            </Text>
          </View>
        ) : (
          <>
            {/* 收藏的文章 */}
            {articles.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>📄 文章 ({articles.length})</Text>
                {articles.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.item, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}
                    onPress={() => handlePress(item)}
                  >
                    {item.imageUrl ? (
                      <Image source={{ uri: item.imageUrl }} style={styles.itemImage} resizeMode="cover" />
                    ) : (
                      <View style={[styles.itemPlaceholder, { backgroundColor: colors.primaryLight }]}>
                        <Ionicons name="document-text" size={20} color={colors.primary} />
                      </View>
                    )}
                    <View style={styles.itemInfo}>
                      <Text style={[styles.itemTitle, { color: colors.text }]} numberOfLines={2}>
                        {item.title}
                      </Text>
                      <Text style={[styles.itemDate, { color: colors.textMuted }]}>
                        {new Date(item.addedAt).toLocaleDateString('zh-HK')}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => handleRemove(item)} style={styles.removeBtn}>
                      <Ionicons name="close-circle" size={22} color={colors.error} />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* 收藏的信用卡 */}
            {cards.length > 0 && (
              <View style={styles.section}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>💳 信用卡 ({cards.length})</Text>
                {cards.map(item => (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.item, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}
                    onPress={() => handlePress(item)}
                  >
                    {item.imageUrl ? (
                      <Image source={{ uri: item.imageUrl }} style={styles.cardImage} resizeMode="cover" />
                    ) : (
                      <View style={[styles.cardPlaceholder, { backgroundColor: colors.primaryLight }]}>
                        <Ionicons name="card" size={20} color={colors.primary} />
                      </View>
                    )}
                    <View style={styles.itemInfo}>
                      <Text style={[styles.itemTitle, { color: colors.text }]} numberOfLines={1}>
                        {item.title}
                      </Text>
                      <Text style={[styles.itemDate, { color: colors.textMuted }]}>
                        {new Date(item.addedAt).toLocaleDateString('zh-HK')}
                      </Text>
                    </View>
                    <TouchableOpacity onPress={() => handleRemove(item)} style={styles.removeBtn}>
                      <Ionicons name="close-circle" size={22} color={colors.error} />
                    </TouchableOpacity>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </>
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
    paddingHorizontal: Layout.spacing.xl,
  },
  section: {
    marginTop: Layout.spacing.lg,
  },
  sectionTitle: {
    fontSize: Layout.fontSize.lg,
    fontWeight: Layout.fontWeight.bold,
    marginBottom: Layout.spacing.md,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacing.md,
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
    marginBottom: Layout.spacing.sm,
  },
  itemImage: {
    width: 60,
    height: 40,
    borderRadius: Layout.radius.sm,
  },
  itemPlaceholder: {
    width: 60,
    height: 40,
    borderRadius: Layout.radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardImage: {
    width: 50,
    height: 32,
    borderRadius: Layout.radius.sm,
  },
  cardPlaceholder: {
    width: 50,
    height: 32,
    borderRadius: Layout.radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemInfo: {
    flex: 1,
    marginLeft: Layout.spacing.md,
  },
  itemTitle: {
    fontSize: Layout.fontSize.sm,
    fontWeight: Layout.fontWeight.semibold,
  },
  itemDate: {
    fontSize: Layout.fontSize.xs,
    marginTop: 2,
  },
  removeBtn: {
    padding: Layout.spacing.sm,
  },
});

