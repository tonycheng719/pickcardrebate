/**
 * Admin Audit Log Helper
 * 用於記錄管理員在後台的操作
 */

interface AuditLogParams {
  adminEmail: string;
  action: 'create' | 'update' | 'delete' | 'ban' | 'unban' | 'approve' | 'reject' | 'reply' | string;
  targetType: 'card' | 'promo' | 'merchant' | 'user' | 'setting' | 'review' | 'comment' | string;
  targetId?: string;
  targetName?: string;
  details?: Record<string, any>;
}

/**
 * Log an admin action
 * This function is fire-and-forget - it won't throw errors
 */
export async function logAdminAction(params: AuditLogParams): Promise<void> {
  try {
    await fetch('/api/admin/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
  } catch (e) {
    // Silently fail - logging should never break the main operation
    console.warn('Failed to log admin action:', e);
  }
}

/**
 * Action type display names (for UI)
 */
export const ACTION_LABELS: Record<string, string> = {
  create: '新增',
  update: '更新',
  delete: '刪除',
  ban: '封鎖',
  unban: '解除封鎖',
  approve: '審核通過',
  reject: '審核拒絕',
  reply: '回覆',
};

/**
 * Target type display names (for UI)
 */
export const TARGET_TYPE_LABELS: Record<string, string> = {
  card: '信用卡',
  promo: '優惠',
  merchant: '商戶',
  user: '用戶',
  setting: '設定',
  review: '評價',
  comment: '留言',
};

