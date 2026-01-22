import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '@/constants/Colors';
import { Layout } from '@/constants/Layout';
import { useColorScheme } from './useColorScheme';
import { useAuth } from '@/lib/auth/AuthContext';
import { router } from 'expo-router';

const API_BASE = 'https://pickcardrebate.com';

interface User {
  id: string;
  name: string;
  avatar_url?: string;
}

interface Comment {
  id: string;
  user_id: string;
  content: string;
  likes_count: number;
  is_pinned: boolean;
  created_at: string;
  user: User;
  replies?: Comment[];
  isLiked?: boolean;
}

interface CommentSectionProps {
  contentType: 'card' | 'article';
  contentId: string;
}

export function CommentSection({ contentType, contentId }: CommentSectionProps) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const { user } = useAuth();
  
  const [comments, setComments] = useState<Comment[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<Comment | null>(null);
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set());
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const loadComments = useCallback(async (reset = false) => {
    try {
      const currentPage = reset ? 1 : page;
      const params = new URLSearchParams({
        contentType,
        contentId,
        sort: 'newest',
        page: currentPage.toString(),
        limit: '20',
      });
      if (user?.id) params.append('userId', user.id);

      const res = await fetch(`${API_BASE}/api/comments?${params}`);
      if (!res.ok) throw new Error('Failed to load comments');
      
      const data = await res.json();
      
      if (reset) {
        setComments(data.comments);
        setPage(1);
      } else {
        setComments(prev => [...prev, ...data.comments]);
      }
      setTotal(data.total);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error('Load comments error:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [contentType, contentId, page, user?.id]);

  useEffect(() => {
    loadComments(true);
  }, [contentType, contentId]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadComments(true);
  };

  const handleSubmit = async () => {
    if (!user) {
      Alert.alert('請先登入', '登入後即可參與討論');
      return;
    }
    if (!newComment.trim()) {
      Alert.alert('提示', '請輸入留言內容');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          contentType,
          contentId,
          parentId: replyTo?.id || null,
          content: newComment.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to post comment');
      }

      const newCommentData = await res.json();
      
      if (replyTo) {
        setComments(prev => prev.map(c => 
          c.id === replyTo.id 
            ? { ...c, replies: [...(c.replies || []), newCommentData] }
            : c
        ));
        setExpandedReplies(prev => new Set([...prev, replyTo.id]));
        setReplyTo(null);
      } else {
        setComments(prev => [newCommentData, ...prev]);
        setTotal(prev => prev + 1);
      }
      
      setNewComment('');
      Alert.alert('成功', '留言已發表');
    } catch (error: any) {
      Alert.alert('錯誤', error.message || '發表失敗');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async (commentId: string) => {
    if (!user) {
      Alert.alert('請先登入');
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/api/comments/${commentId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      });

      if (!res.ok) throw new Error('Failed to like');

      const { liked } = await res.json();
      
      setComments(prev => prev.map(c => {
        if (c.id === commentId) {
          return {
            ...c,
            isLiked: liked,
            likes_count: liked ? c.likes_count + 1 : c.likes_count - 1,
          };
        }
        if (c.replies) {
          return {
            ...c,
            replies: c.replies.map(r => 
              r.id === commentId
                ? { ...r, isLiked: liked, likes_count: liked ? r.likes_count + 1 : r.likes_count - 1 }
                : r
            ),
          };
        }
        return c;
      }));
    } catch (error) {
      Alert.alert('錯誤', '操作失敗');
    }
  };

  const handleDelete = async (commentId: string) => {
    Alert.alert(
      '確認刪除',
      '確定要刪除此留言嗎？',
      [
        { text: '取消', style: 'cancel' },
        {
          text: '刪除',
          style: 'destructive',
          onPress: async () => {
            try {
              const res = await fetch(`${API_BASE}/api/comments/${commentId}?userId=${user?.id}`, {
                method: 'DELETE',
              });

              if (!res.ok) throw new Error('Failed to delete');

              setComments(prev => prev.filter(c => {
                if (c.id === commentId) return false;
                if (c.replies) {
                  c.replies = c.replies.filter(r => r.id !== commentId);
                }
                return true;
              }));
              setTotal(prev => prev - 1);
            } catch (error) {
              Alert.alert('錯誤', '刪除失敗');
            }
          },
        },
      ]
    );
  };

  const handleReport = async (commentId: string) => {
    if (!user) {
      Alert.alert('請先登入');
      return;
    }

    Alert.alert(
      '舉報留言',
      '請選擇舉報原因',
      [
        { text: '取消', style: 'cancel' },
        { text: '垃圾廣告', onPress: () => submitReport(commentId, '垃圾廣告') },
        { text: '不實資訊', onPress: () => submitReport(commentId, '不實資訊') },
        { text: '人身攻擊', onPress: () => submitReport(commentId, '人身攻擊') },
        { text: '其他', onPress: () => submitReport(commentId, '其他') },
      ]
    );
  };

  const submitReport = async (commentId: string, reason: string) => {
    try {
      const res = await fetch(`${API_BASE}/api/comments/${commentId}/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.id, reason }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error);
      }

      Alert.alert('成功', data.message);
    } catch (error: any) {
      Alert.alert('錯誤', error.message || '舉報失敗');
    }
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return '剛剛';
    if (minutes < 60) return `${minutes} 分鐘前`;
    if (hours < 24) return `${hours} 小時前`;
    if (days < 30) return `${days} 天前`;
    return date.toLocaleDateString('zh-HK');
  };

  const renderComment = ({ item: comment, isReply = false }: { item: Comment; isReply?: boolean }) => {
    const isOwner = user?.id === comment.user_id;
    const showReplies = expandedReplies.has(comment.id);

    return (
      <View style={[styles.commentItem, isReply && styles.replyItem]}>
        <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
          <Text style={styles.avatarText}>
            {comment.user?.name?.charAt(0) || '?'}
          </Text>
        </View>
        
        <View style={styles.commentContent}>
          <View style={styles.commentHeader}>
            <Text style={[styles.userName, { color: colors.text }]}>
              {comment.user?.name || '匿名用戶'}
            </Text>
            {comment.is_pinned && (
              <View style={[styles.badge, { backgroundColor: colors.primaryLight }]}>
                <Text style={[styles.badgeText, { color: colors.primary }]}>置頂</Text>
              </View>
            )}
            <Text style={[styles.time, { color: colors.textMuted }]}>
              {formatTime(comment.created_at)}
            </Text>
          </View>
          
          <Text style={[styles.commentText, { color: colors.text }]}>
            {comment.content}
          </Text>
          
          <View style={styles.commentActions}>
            <TouchableOpacity 
              style={styles.actionBtn}
              onPress={() => handleLike(comment.id)}
            >
              <Ionicons 
                name={comment.isLiked ? 'heart' : 'heart-outline'} 
                size={16} 
                color={comment.isLiked ? '#EF4444' : colors.textMuted} 
              />
              <Text style={[styles.actionText, { color: colors.textMuted }]}>
                {comment.likes_count || 0}
              </Text>
            </TouchableOpacity>
            
            {!isReply && (
              <TouchableOpacity 
                style={styles.actionBtn}
                onPress={() => setReplyTo(replyTo?.id === comment.id ? null : comment)}
              >
                <Ionicons name="chatbubble-outline" size={16} color={colors.textMuted} />
                <Text style={[styles.actionText, { color: colors.textMuted }]}>回覆</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity 
              style={styles.actionBtn}
              onPress={() => handleReport(comment.id)}
            >
              <Ionicons name="flag-outline" size={16} color={colors.textMuted} />
            </TouchableOpacity>
            
            {isOwner && (
              <TouchableOpacity 
                style={styles.actionBtn}
                onPress={() => handleDelete(comment.id)}
              >
                <Ionicons name="trash-outline" size={16} color="#EF4444" />
              </TouchableOpacity>
            )}
          </View>

          {/* Reply input */}
          {replyTo?.id === comment.id && (
            <View style={[styles.replyInput, { backgroundColor: colors.backgroundCard }]}>
              <TextInput
                style={[styles.input, { color: colors.text, borderColor: colors.border }]}
                placeholder="輸入回覆..."
                placeholderTextColor={colors.textMuted}
                value={newComment}
                onChangeText={setNewComment}
                maxLength={500}
                multiline
              />
              <View style={styles.replyButtons}>
                <TouchableOpacity 
                  style={[styles.replyBtn, { backgroundColor: colors.primary }]}
                  onPress={handleSubmit}
                  disabled={submitting}
                >
                  {submitting ? (
                    <ActivityIndicator size="small" color="#FFF" />
                  ) : (
                    <Ionicons name="send" size={16} color="#FFF" />
                  )}
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.replyBtn, { backgroundColor: colors.borderLight }]}
                  onPress={() => { setReplyTo(null); setNewComment(''); }}
                >
                  <Ionicons name="close" size={16} color={colors.textMuted} />
                </TouchableOpacity>
              </View>
            </View>
          )}

          {/* Replies */}
          {comment.replies && comment.replies.length > 0 && (
            <View style={styles.repliesContainer}>
              <TouchableOpacity 
                style={styles.toggleReplies}
                onPress={() => {
                  setExpandedReplies(prev => {
                    const newSet = new Set(prev);
                    if (newSet.has(comment.id)) {
                      newSet.delete(comment.id);
                    } else {
                      newSet.add(comment.id);
                    }
                    return newSet;
                  });
                }}
              >
                <Ionicons 
                  name={showReplies ? 'chevron-up' : 'chevron-down'} 
                  size={14} 
                  color={colors.primary} 
                />
                <Text style={[styles.toggleText, { color: colors.primary }]}>
                  {showReplies ? '收起' : `查看 ${comment.replies.length} 條回覆`}
                </Text>
              </TouchableOpacity>
              
              {showReplies && comment.replies.map(reply => (
                <View key={reply.id}>
                  {renderComment({ item: reply, isReply: true })}
                </View>
              ))}
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={[styles.title, { color: colors.text }]}>
        💬 用戶討論 ({total})
      </Text>
    </View>
  );

  const renderInput = () => (
    <View style={[styles.inputContainer, { backgroundColor: colors.backgroundCard, borderColor: colors.border }]}>
      {user ? (
        <>
          <TextInput
            style={[styles.mainInput, { color: colors.text, borderColor: colors.border }]}
            placeholder="分享你的想法..."
            placeholderTextColor={colors.textMuted}
            value={replyTo ? '' : newComment}
            onChangeText={text => !replyTo && setNewComment(text)}
            maxLength={500}
            multiline
            editable={!replyTo}
          />
          <View style={styles.inputFooter}>
            <Text style={[styles.charCount, { color: colors.textMuted }]}>
              {newComment.length}/500
            </Text>
            <TouchableOpacity 
              style={[
                styles.submitBtn, 
                { backgroundColor: newComment.trim() && !replyTo ? colors.primary : colors.borderLight }
              ]}
              onPress={handleSubmit}
              disabled={submitting || !newComment.trim() || !!replyTo}
            >
              {submitting ? (
                <ActivityIndicator size="small" color="#FFF" />
              ) : (
                <>
                  <Ionicons name="send" size={16} color="#FFF" />
                  <Text style={styles.submitText}>發表</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <TouchableOpacity 
          style={[styles.loginPrompt, { backgroundColor: colors.backgroundCard }]}
          onPress={() => router.push('/(tabs)/wallet')}
        >
          <Text style={[styles.loginText, { color: colors.textMuted }]}>
            登入後即可參與討論
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderEmpty = () => (
    <View style={styles.empty}>
      <Ionicons name="chatbubbles-outline" size={48} color={colors.textMuted} />
      <Text style={[styles.emptyText, { color: colors.textMuted }]}>
        還沒有人留言，成為第一個吧！
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.backgroundCard }]}>
        {renderHeader()}
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 20 }} />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      style={[styles.container, { backgroundColor: colors.backgroundCard }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {renderHeader()}
      {renderInput()}
      
      <FlatList
        data={comments}
        keyExtractor={item => item.id}
        renderItem={({ item }) => renderComment({ item })}
        ListEmptyComponent={renderEmpty}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        onEndReached={() => {
          if (hasMore && !loading) {
            setPage(prev => prev + 1);
            loadComments();
          }
        }}
        onEndReachedThreshold={0.5}
        contentContainerStyle={styles.listContent}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: Layout.radius.lg,
    marginVertical: Layout.spacing.lg,
    padding: Layout.spacing.md,
  },
  header: {
    marginBottom: Layout.spacing.md,
  },
  title: {
    fontSize: Layout.fontSize.lg,
    fontWeight: 'bold' as const,
  },
  inputContainer: {
    borderRadius: Layout.radius.lg,
    padding: Layout.spacing.md,
    marginBottom: Layout.spacing.md,
    borderWidth: 1,
  },
  mainInput: {
    minHeight: 60,
    borderWidth: 1,
    borderRadius: Layout.radius.md,
    padding: Layout.spacing.sm,
    textAlignVertical: 'top',
  },
  inputFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Layout.spacing.sm,
  },
  charCount: {
    fontSize: Layout.fontSize.xs,
  },
  submitBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Layout.spacing.md,
    paddingVertical: Layout.spacing.sm,
    borderRadius: Layout.radius.md,
    gap: 4,
  },
  submitText: {
    color: '#FFF',
    fontWeight: '600' as const,
  },
  loginPrompt: {
    padding: Layout.spacing.lg,
    alignItems: 'center',
  },
  loginText: {
    fontSize: Layout.fontSize.sm,
  },
  listContent: {
    paddingBottom: Layout.spacing.xl,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: Layout.spacing.md,
  },
  replyItem: {
    marginLeft: Layout.spacing.lg,
    paddingLeft: Layout.spacing.md,
    borderLeftWidth: 2,
    borderLeftColor: '#E5E7EB',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Layout.spacing.sm,
  },
  avatarText: {
    color: '#FFF',
    fontWeight: 'bold' as const,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexWrap: 'wrap',
  },
  userName: {
    fontWeight: '600' as const,
    fontSize: Layout.fontSize.sm,
  },
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '500' as const,
  },
  time: {
    fontSize: Layout.fontSize.xs,
  },
  commentText: {
    marginTop: 4,
    fontSize: Layout.fontSize.sm,
    lineHeight: 20,
  },
  commentActions: {
    flexDirection: 'row',
    marginTop: Layout.spacing.sm,
    gap: Layout.spacing.md,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  actionText: {
    fontSize: Layout.fontSize.xs,
  },
  replyInput: {
    marginTop: Layout.spacing.sm,
    padding: Layout.spacing.sm,
    borderRadius: Layout.radius.md,
  },
  input: {
    borderWidth: 1,
    borderRadius: Layout.radius.sm,
    padding: Layout.spacing.sm,
    minHeight: 40,
  },
  replyButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: Layout.spacing.sm,
    marginTop: Layout.spacing.sm,
  },
  replyBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  repliesContainer: {
    marginTop: Layout.spacing.sm,
  },
  toggleReplies: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: Layout.spacing.sm,
  },
  toggleText: {
    fontSize: Layout.fontSize.xs,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: Layout.spacing.xl,
  },
  emptyText: {
    marginTop: Layout.spacing.sm,
    fontSize: Layout.fontSize.sm,
  },
});

