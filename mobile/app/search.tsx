import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  Image,
  TextInput,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, BankColors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { useColorScheme } from '@/components/useColorScheme';
import { api, CardItem, PromoItem } from '@/lib/api/client';
import { MERCHANT_CATEGORIES, POPULAR_MERCHANTS, Merchant } from '@/lib/data/merchants';

type SearchTab = 'all' | 'cards' | 'merchants' | 'articles';

export default function SearchScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<SearchTab>('all');
  const [loading, setLoading] = useState(false);
  
  // 搜索結果
  const [cards, setCards] = useState<CardItem[]>([]);
  const [articles, setArticles] = useState<PromoItem[]>([]);
  const [allCards, setAllCards] = useState<CardItem[]>([]);
  const [allArticles, setAllArticles] = useState<PromoItem[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [cardsRes, articlesRes] = await Promise.all([
      api.getCards(),
      api.getPromos(),
    ]);
    
    if (cardsRes.data) setAllCards(cardsRes.data.cards);
    if (articlesRes.data) setAllArticles(articlesRes.data.promos);
  };

  // 搜索
  const handleSearch = useCallback((text: string) => {
    setQuery(text);
    
    if (!text.trim()) {
      setCards([]);
      setArticles([]);
      return;
    }

    const q = text.toLowerCase();
    
    // 搜索信用卡
    const filteredCards = allCards.filter(card => 
      card.name.toLowerCase().includes(q) ||
      card.bank.toLowerCase().includes(q) ||
      card.tags?.some(t => t.toLowerCase().includes(q))
    );
    setCards(filteredCards.slice(0, 10));
    
    // 搜索文章
    const filteredArticles = allArticles.filter(article =>
      article.title.toLowerCase().includes(q) ||
      article.description?.toLowerCase().includes(q)
    );
    setArticles(filteredArticles.slice(0, 10));
  }, [allCards, allArticles]);

  // 搜索商戶
  const filteredMerchants = query.trim() 
    ? POPULAR_MERCHANTS.filter(m => 
        m.name.toLowerCase().includes(query.toLowerCase()) ||
        m.category.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 10)
    : [];

  const tabs: { id: SearchTab; name: string }[] = [
    { id: 'all', name: '全部' },
    { id: 'cards', name: '信用卡' },
    { id: 'merchants', name: '商戶' },
    { id: 'articles', name: '文章' },
  ];

  const hasResults = cards.length > 0 || filteredMerchants.length > 0 || articles.length > 0;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['top']}>
      <Stack.Screen options={{ headerShown: false }} />
      
      {/* 搜索欄 */}
      <View style={[styles.searchHeader, { backgroundColor: colors.background, borderBottomColor: colors.border }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        
        <View style={[styles.searchInput, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}>
          <Ionicons name="search" size={20} color={colors.textMuted} />
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="搜索信用卡、商戶、文章..."
            placeholderTextColor={colors.textMuted}
            value={query}
            onChangeText={handleSearch}
            autoFocus
            returnKeyType="search"
          />
          {query.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Ionicons name="close-circle" size={20} color={colors.textMuted} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* 分類標籤 */}
      {query.length > 0 && (
        <View style={[styles.tabsContainer, { borderBottomColor: colors.border }]}>
          {tabs.map(tab => (
            <TouchableOpacity
              key={tab.id}
              style={[
                styles.tab,
                activeTab === tab.id && { borderBottomColor: colors.primary, borderBottomWidth: 2 }
              ]}
              onPress={() => setActiveTab(tab.id)}
            >
              <Text style={[
                styles.tabText,
                { color: activeTab === tab.id ? colors.primary : colors.textMuted }
              ]}>
                {tab.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      <ScrollView 
        style={styles.results}
        keyboardShouldPersistTaps="handled"
        onScrollBeginDrag={Keyboard.dismiss}
      >
        {/* 無搜索時顯示熱門 */}
        {!query.trim() && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>🔥 熱門搜索</Text>
            <View style={styles.hotTags}>
              {['超市', '網購', '食飯', '旅遊', '免年費', '高回贈'].map(tag => (
                <TouchableOpacity 
                  key={tag}
                  style={[styles.hotTag, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}
                  onPress={() => handleSearch(tag)}
                >
                  <Text style={[styles.hotTagText, { color: colors.text }]}>{tag}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* 搜索結果 */}
        {query.trim() && !hasResults && (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={48} color={colors.textMuted} />
            <Text style={[styles.emptyText, { color: colors.textMuted }]}>
              找不到「{query}」的相關結果
            </Text>
          </View>
        )}

        {/* 信用卡結果 */}
        {(activeTab === 'all' || activeTab === 'cards') && cards.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>💳 信用卡</Text>
            {cards.map(card => {
              const bankColor = BankColors[card.bank] || BankColors.default;
              return (
                <TouchableOpacity
                  key={card.id}
                  style={[styles.resultItem, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}
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
                  <View style={styles.resultInfo}>
                    <Text style={[styles.resultTitle, { color: colors.text }]} numberOfLines={1}>
                      {card.name}
                    </Text>
                    <Text style={[styles.resultSubtitle, { color: colors.textMuted }]}>
                      {card.bank} · 最高 {card.topRate}%
                    </Text>
                  </View>
                  <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
                </TouchableOpacity>
              );
            })}
          </View>
        )}

        {/* 商戶結果 */}
        {(activeTab === 'all' || activeTab === 'merchants') && filteredMerchants.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>🏪 商戶</Text>
            {filteredMerchants.map(merchant => (
              <TouchableOpacity
                key={merchant.id}
                style={[styles.resultItem, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}
                onPress={() => {
                  // 導航到計算頁面並選擇該商戶
                  router.push({ pathname: '/', params: { merchant: merchant.id } });
                }}
              >
                <View style={styles.merchantIcon}>
                  {merchant.logo && merchant.logo.startsWith('http') ? (
                    <Image source={{ uri: merchant.logo }} style={styles.merchantLogo} />
                  ) : (
                    <Text style={styles.merchantEmoji}>
                      {MERCHANT_CATEGORIES.find(c => c.id === merchant.category)?.icon || '🏪'}
                    </Text>
                  )}
                </View>
                <View style={styles.resultInfo}>
                  <Text style={[styles.resultTitle, { color: colors.text }]} numberOfLines={1}>
                    {merchant.name}
                  </Text>
                  <Text style={[styles.resultSubtitle, { color: colors.textMuted }]}>
                    {MERCHANT_CATEGORIES.find(c => c.id === merchant.category)?.name || merchant.category}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* 文章結果 */}
        {(activeTab === 'all' || activeTab === 'articles') && articles.length > 0 && (
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>📄 文章</Text>
            {articles.map(article => (
              <TouchableOpacity
                key={article.id}
                style={[styles.resultItem, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}
                onPress={() => router.push(`/article/${article.id}`)}
              >
                {article.imageUrl ? (
                  <Image source={{ uri: article.imageUrl }} style={styles.articleImage} resizeMode="cover" />
                ) : (
                  <View style={[styles.articlePlaceholder, { backgroundColor: colors.primaryLight }]}>
                    <Ionicons name="document-text" size={20} color={colors.primary} />
                  </View>
                )}
                <View style={styles.resultInfo}>
                  <Text style={[styles.resultTitle, { color: colors.text }]} numberOfLines={2}>
                    {article.title}
                  </Text>
                  <Text style={[styles.resultSubtitle, { color: colors.textMuted }]} numberOfLines={1}>
                    {article.description}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.textMuted} />
              </TouchableOpacity>
            ))}
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
  searchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
    borderBottomWidth: 1,
  },
  backBtn: {
    padding: Layout.spacing.sm,
    marginRight: Layout.spacing.sm,
  },
  searchInput: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
    gap: Layout.spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: Layout.fontSize.base,
    paddingVertical: 4,
  },
  tabsContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingHorizontal: Layout.spacing.md,
  },
  tab: {
    paddingVertical: Layout.spacing.md,
    paddingHorizontal: Layout.spacing.lg,
  },
  tabText: {
    fontSize: Layout.fontSize.sm,
    fontWeight: Layout.fontWeight.medium,
  },
  results: {
    flex: 1,
    paddingHorizontal: Layout.spacing.md,
  },
  section: {
    marginTop: Layout.spacing.lg,
  },
  sectionTitle: {
    fontSize: Layout.fontSize.lg,
    fontWeight: Layout.fontWeight.bold,
    marginBottom: Layout.spacing.md,
  },
  hotTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Layout.spacing.sm,
  },
  hotTag: {
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
    borderRadius: Layout.radius.full,
    borderWidth: 1,
  },
  hotTagText: {
    fontSize: Layout.fontSize.sm,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: Layout.spacing['3xl'],
  },
  emptyText: {
    fontSize: Layout.fontSize.base,
    marginTop: Layout.spacing.md,
  },
  resultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Layout.spacing.md,
    borderRadius: Layout.radius.lg,
    borderWidth: 1,
    marginBottom: Layout.spacing.sm,
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
  merchantIcon: {
    width: 40,
    height: 40,
    borderRadius: Layout.radius.md,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
  },
  merchantLogo: {
    width: 32,
    height: 32,
    borderRadius: 4,
  },
  merchantEmoji: {
    fontSize: 20,
  },
  articleImage: {
    width: 60,
    height: 40,
    borderRadius: Layout.radius.sm,
  },
  articlePlaceholder: {
    width: 60,
    height: 40,
    borderRadius: Layout.radius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultInfo: {
    flex: 1,
    marginLeft: Layout.spacing.md,
  },
  resultTitle: {
    fontSize: Layout.fontSize.sm,
    fontWeight: Layout.fontWeight.semibold,
  },
  resultSubtitle: {
    fontSize: Layout.fontSize.xs,
    marginTop: 2,
  },
});

