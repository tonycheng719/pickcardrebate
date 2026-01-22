import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Image, ActivityIndicator, Linking, useWindowDimensions, Share, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { useColorScheme } from '@/components/useColorScheme';
import { Button, Card, Badge } from '@/components/ui';
import { API_BASE_URL } from '@/lib/api/client';
import { CommentSection } from '@/components/CommentSection';

interface ArticleDetail {
  id: string;
  title: string;
  description: string;
  content: string;
  merchant: string;
  imageUrl: string | null;
  expiryDate: string | null;
  tags: string[];
  isPinned: boolean;
  isNew: boolean;
  contentType: string;
  url?: string;
  faqs?: { question: string; answer: string }[];
  updatedAt: string;
}

export default function ArticleDetailScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { width } = useWindowDimensions();
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const [article, setArticle] = useState<ArticleDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) loadArticle(id);
  }, [id]);

  // 分享文章
  const handleShare = async () => {
    if (!article) return;
    
    try {
      const shareUrl = `https://pickcardrebate.com/discover/${id}`;
      await Share.share({
        title: article.title,
        message: Platform.OS === 'ios' 
          ? article.title 
          : `${article.title}\n\n${article.description}\n\n${shareUrl}`,
        url: Platform.OS === 'ios' ? shareUrl : undefined,
      });
    } catch (error) {
      console.log('Share error:', error);
    }
  };

  const loadArticle = async (articleId: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/mobile/promos/${articleId}`);
      const data = await response.json();
      
      if (data.promo) {
        setArticle(data.promo);
      } else {
        setError(data.error || '找不到文章');
      }
    } catch (e) {
      setError('無法載入文章');
    }
    
    setLoading(false);
  };

  const handleOpenUrl = () => {
    if (article?.url) {
      Linking.openURL(article.url);
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

  if (error || !article) {
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

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]} edges={['bottom']}>
      <Stack.Screen 
        options={{ 
          title: article.contentType === 'guide' ? '攻略' : '優惠',
          headerBackTitle: '返回',
          headerRight: () => (
            <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
              <Ionicons name="share-outline" size={24} color="#3B82F6" />
            </TouchableOpacity>
          ),
        }} 
      />
      
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* 封面圖 */}
        {article.imageUrl ? (
          <Image 
            source={{ uri: article.imageUrl }} 
            style={[styles.heroImage, { width }]} 
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.heroPlaceholder, { backgroundColor: colors.borderLight }]}>
            <Ionicons name="image-outline" size={48} color={colors.textMuted} />
          </View>
        )}

        {/* 內容 */}
        <View style={styles.content}>
          {/* 標籤和狀態 */}
          <View style={styles.metaRow}>
            {article.isPinned && (
              <Badge variant="primary" size="sm">
                📌 置頂
              </Badge>
            )}
            {article.isNew && (
              <Badge variant="success" size="sm">
                NEW
              </Badge>
            )}
            {article.merchant && (
              <Badge variant="default" size="sm">
                {article.merchant}
              </Badge>
            )}
          </View>

          {/* 標題 */}
          <Text style={[styles.title, { color: colors.text }]}>{article.title}</Text>
          
          {/* 到期日 */}
          {article.expiryDate && (
            <View style={styles.expiryRow}>
              <Ionicons name="time-outline" size={16} color={colors.textMuted} />
              <Text style={[styles.expiryText, { color: colors.textMuted }]}>
                有效至 {article.expiryDate}
              </Text>
            </View>
          )}

          {/* 描述 */}
          <Text style={[styles.description, { color: colors.text }]}>
            {article.description}
          </Text>

          {/* 標籤 */}
          <View style={styles.tagsRow}>
            {article.tags.map((tag, i) => (
              <Badge key={i} variant="outline" size="sm">{tag}</Badge>
            ))}
          </View>

          {/* 內容 - 簡化顯示 */}
          {article.content && (
            <Card style={styles.contentCard}>
              <Text style={[styles.contentText, { color: colors.text }]}>
                {article.content.replace(/[#*`\[\]]/g, '').substring(0, 1000)}
                {article.content.length > 1000 && '...'}
              </Text>
            </Card>
          )}

          {/* FAQ */}
          {article.faqs && article.faqs.length > 0 && (
            <View style={styles.faqSection}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>常見問題</Text>
              {article.faqs.map((faq, i) => (
                <Card key={i} style={styles.faqCard}>
                  <Text style={[styles.faqQuestion, { color: colors.text }]}>
                    Q: {faq.question}
                  </Text>
                  <Text style={[styles.faqAnswer, { color: colors.textMuted }]}>
                    A: {faq.answer}
                  </Text>
                </Card>
              ))}
            </View>
          )}

          {/* 更新時間 */}
          <Text style={[styles.updatedAt, { color: colors.textMuted }]}>
            更新於 {new Date(article.updatedAt).toLocaleDateString('zh-HK')}
          </Text>

          {/* 留言討論 */}
          <CommentSection contentType="article" contentId={id || ''} />

          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* 底部按鈕 */}
      {article.url && (
        <View style={[styles.footer, { backgroundColor: colors.backgroundCard, borderTopColor: colors.border }]}>
          <Button onPress={handleOpenUrl} fullWidth>
            查看完整條款
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
  shareButton: {
    padding: 8,
    marginRight: 4,
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
  heroImage: {
    height: 220,
  },
  heroPlaceholder: {
    height: 220,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: Layout.spacing.lg,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Layout.spacing.xs,
    marginBottom: Layout.spacing.md,
  },
  title: {
    fontSize: Layout.fontSize['2xl'],
    fontWeight: Layout.fontWeight.bold,
    lineHeight: 32,
  },
  expiryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Layout.spacing.xs,
    marginTop: Layout.spacing.sm,
  },
  expiryText: {
    fontSize: Layout.fontSize.sm,
  },
  description: {
    fontSize: Layout.fontSize.base,
    lineHeight: 24,
    marginTop: Layout.spacing.lg,
  },
  tagsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Layout.spacing.xs,
    marginTop: Layout.spacing.lg,
  },
  contentCard: {
    marginTop: Layout.spacing.lg,
  },
  contentText: {
    fontSize: Layout.fontSize.sm,
    lineHeight: 22,
  },
  faqSection: {
    marginTop: Layout.spacing.xl,
  },
  sectionTitle: {
    fontSize: Layout.fontSize.lg,
    fontWeight: Layout.fontWeight.bold,
    marginBottom: Layout.spacing.md,
  },
  faqCard: {
    marginBottom: Layout.spacing.md,
  },
  faqQuestion: {
    fontSize: Layout.fontSize.base,
    fontWeight: Layout.fontWeight.semibold,
    marginBottom: Layout.spacing.sm,
  },
  faqAnswer: {
    fontSize: Layout.fontSize.sm,
    lineHeight: 20,
  },
  updatedAt: {
    fontSize: Layout.fontSize.xs,
    textAlign: 'center',
    marginTop: Layout.spacing.xl,
  },
  footer: {
    padding: Layout.spacing.lg,
    borderTopWidth: 1,
  },
});

