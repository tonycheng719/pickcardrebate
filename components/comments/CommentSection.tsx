'use client';

import { useState, useEffect, useCallback } from 'react';
import { useWallet } from '@/lib/store/wallet-context';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  MessageCircle, 
  ThumbsUp, 
  Flag, 
  Trash2, 
  ChevronDown, 
  ChevronUp,
  Send,
  Loader2
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';

interface Comment {
  id: string;
  user_id: string;
  content: string;
  likes_count: number;
  is_pinned: boolean;
  created_at: string;
  user: {
    id: string;
    name: string;
    avatar_url?: string;
  };
  replies?: Comment[];
  isLiked?: boolean;
}

interface CommentSectionProps {
  contentType: 'card' | 'article';
  contentId: string;
  contentName?: string; // 用於顯示「持有此卡」徽章
}

export function CommentSection({ contentType, contentId, contentName }: CommentSectionProps) {
  const { user, myCardIds } = useWallet();
  const [comments, setComments] = useState<Comment[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<Comment | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [expandedReplies, setExpandedReplies] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState<'newest' | 'popular' | 'likes'>('newest');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);

  const loadComments = useCallback(async (reset = false) => {
    try {
      const currentPage = reset ? 1 : page;
      const params = new URLSearchParams({
        contentType,
        contentId,
        sort,
        page: currentPage.toString(),
        limit: '20',
      });
      if (user?.id) params.append('userId', user.id);

      const res = await fetch(`/api/comments?${params}`);
      if (!res.ok) throw new Error('Failed to load comments');
      
      const data = await res.json();
      
      if (reset) {
        setComments(data.comments);
      } else {
        setComments(prev => [...prev, ...data.comments]);
      }
      setTotal(data.total);
      setHasMore(data.hasMore);
      if (reset) setPage(1);
    } catch (error) {
      console.error('Load comments error:', error);
    } finally {
      setLoading(false);
    }
  }, [contentType, contentId, sort, page, user?.id]);

  useEffect(() => {
    loadComments(true);
  }, [contentType, contentId, sort]);

  const handleSubmit = async () => {
    if (!user) {
      toast.error('請先登入');
      return;
    }
    if (!newComment.trim()) {
      toast.error('請輸入留言內容');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          contentType,
          contentId,
          content: newComment.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to post comment');
      }

      const newCommentData = await res.json();
      setComments(prev => [newCommentData, ...prev]);
      setTotal(prev => prev + 1);
      setNewComment('');
      toast.success('留言已發表');
    } catch (error: any) {
      toast.error(error.message || '發表失敗');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReply = async (parentId: string) => {
    if (!user) {
      toast.error('請先登入');
      return;
    }
    if (!replyContent.trim()) {
      toast.error('請輸入回覆內容');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          contentType,
          contentId,
          parentId,
          content: replyContent.trim(),
        }),
      });

      if (!res.ok) throw new Error('Failed to post reply');

      const newReply = await res.json();
      setComments(prev => prev.map(c => 
        c.id === parentId 
          ? { ...c, replies: [...(c.replies || []), newReply] }
          : c
      ));
      setReplyTo(null);
      setReplyContent('');
      setExpandedReplies(prev => new Set([...prev, parentId]));
      toast.success('回覆已發表');
    } catch (error) {
      toast.error('回覆失敗');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLike = async (commentId: string) => {
    if (!user) {
      toast.error('請先登入');
      return;
    }

    try {
      const res = await fetch(`/api/comments/${commentId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id }),
      });

      if (!res.ok) throw new Error('Failed to like');

      const { liked } = await res.json();
      
      // 更新留言狀態
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
      toast.error('操作失敗');
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm('確定要刪除此留言嗎？')) return;

    try {
      const res = await fetch(`/api/comments/${commentId}?userId=${user?.id}`, {
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
      toast.success('留言已刪除');
    } catch (error) {
      toast.error('刪除失敗');
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

  const renderComment = (comment: Comment, isReply = false) => {
    const isOwner = user?.id === comment.user_id;
    const ownsCard = contentType === 'card' && myCardIds?.includes(contentId);
    const showReplies = expandedReplies.has(comment.id);

    return (
      <div key={comment.id} className={cn("py-4", isReply && "pl-12 border-l-2 border-gray-100 dark:border-gray-800")}>
        <div className="flex gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={comment.user?.avatar_url} />
            <AvatarFallback>{comment.user?.name?.charAt(0) || '?'}</AvatarFallback>
          </Avatar>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {comment.user?.name || '匿名用戶'}
              </span>
              {comment.is_pinned && (
                <Badge variant="secondary" className="text-xs">置頂</Badge>
              )}
              {ownsCard && comment.user_id === user?.id && (
                <Badge variant="outline" className="text-xs text-green-600 border-green-300">
                  持有此卡
                </Badge>
              )}
              <span className="text-xs text-gray-500">
                {formatTime(comment.created_at)}
              </span>
            </div>
            
            <p className="mt-1 text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">
              {comment.content}
            </p>
            
            <div className="flex items-center gap-4 mt-2">
              <button
                onClick={() => handleLike(comment.id)}
                className={cn(
                  "flex items-center gap-1 text-sm transition-colors",
                  comment.isLiked 
                    ? "text-blue-600" 
                    : "text-gray-500 hover:text-blue-600"
                )}
              >
                <ThumbsUp className="h-4 w-4" />
                <span>{comment.likes_count || 0}</span>
              </button>
              
              {!isReply && (
                <button
                  onClick={() => setReplyTo(replyTo?.id === comment.id ? null : comment)}
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>回覆</span>
                </button>
              )}
              
              <ReportDialog commentId={comment.id} userId={user?.id} />
              
              {isOwner && (
                <button
                  onClick={() => handleDelete(comment.id)}
                  className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>

            {/* 回覆輸入框 */}
            {replyTo?.id === comment.id && (
              <div className="mt-3 flex gap-2">
                <Textarea
                  placeholder="輸入你的回覆..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="min-h-[60px] resize-none"
                  maxLength={500}
                />
                <div className="flex flex-col gap-1">
                  <Button 
                    size="sm" 
                    onClick={() => handleReply(comment.id)}
                    disabled={submitting}
                  >
                    {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => { setReplyTo(null); setReplyContent(''); }}
                  >
                    取消
                  </Button>
                </div>
              </div>
            )}

            {/* 回覆列表 */}
            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-2">
                <button
                  onClick={() => setExpandedReplies(prev => {
                    const newSet = new Set(prev);
                    if (newSet.has(comment.id)) {
                      newSet.delete(comment.id);
                    } else {
                      newSet.add(comment.id);
                    }
                    return newSet;
                  })}
                  className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                >
                  {showReplies ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  {showReplies ? '收起' : `查看 ${comment.replies.length} 條回覆`}
                </button>
                
                {showReplies && (
                  <div className="mt-2 space-y-0 divide-y dark:divide-gray-800">
                    {comment.replies.map(reply => renderComment(reply, true))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl border dark:border-gray-800 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          用戶討論 ({total})
        </h3>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              排序: {sort === 'newest' ? '最新' : sort === 'popular' ? '最熱門' : '最多讚'}
              <ChevronDown className="ml-1 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => setSort('newest')}>最新</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSort('popular')}>最熱門</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setSort('likes')}>最多讚</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 發表留言 */}
      <div className="mb-6 pb-6 border-b dark:border-gray-800">
        {user ? (
          <div className="flex gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={user.user_metadata?.avatar_url} />
              <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="分享你的想法..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="min-h-[80px] resize-none"
                maxLength={500}
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">{newComment.length}/500</span>
                <Button onClick={handleSubmit} disabled={submitting || !newComment.trim()}>
                  {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                  發表留言
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <p className="text-gray-500 mb-2">登入後即可參與討論</p>
            <Button variant="outline" onClick={() => window.location.href = '/login'}>
              立即登入
            </Button>
          </div>
        )}
      </div>

      {/* 留言列表 */}
      {loading ? (
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <MessageCircle className="h-12 w-12 mx-auto mb-2 opacity-30" />
          <p>還沒有人留言，成為第一個吧！</p>
        </div>
      ) : (
        <>
          <div className="divide-y dark:divide-gray-800">
            {comments.map(comment => renderComment(comment))}
          </div>
          
          {hasMore && (
            <div className="text-center mt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setPage(prev => prev + 1);
                  loadComments();
                }}
              >
                載入更多
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// 舉報對話框
function ReportDialog({ commentId, userId }: { commentId: string; userId?: string }) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleReport = async () => {
    if (!userId) {
      toast.error('請先登入');
      return;
    }
    if (!reason.trim()) {
      toast.error('請選擇舉報原因');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`/api/comments/${commentId}/report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, reason }),
      });

      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.error);
      }

      toast.success(data.message);
      setOpen(false);
      setReason('');
    } catch (error: any) {
      toast.error(error.message || '舉報失敗');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-orange-600">
          <Flag className="h-4 w-4" />
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>舉報留言</DialogTitle>
          <DialogDescription>請選擇舉報原因</DialogDescription>
        </DialogHeader>
        <div className="space-y-2 py-4">
          {['垃圾廣告', '不實資訊', '人身攻擊', '色情內容', '其他'].map(r => (
            <button
              key={r}
              onClick={() => setReason(r)}
              className={cn(
                "w-full text-left px-4 py-2 rounded-lg border transition-colors",
                reason === r 
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                  : "border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              )}
            >
              {r}
            </button>
          ))}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>取消</Button>
          <Button onClick={handleReport} disabled={submitting || !reason}>
            {submitting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            提交舉報
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

