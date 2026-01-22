import { NextRequest, NextResponse } from 'next/server';
import { adminAuthClient } from '@/lib/supabase/admin-client';

// 保留用戶名列表
const RESERVED_USERNAMES = [
  'admin', 'administrator', 'support', 'system', 'moderator', 
  'staff', 'help', 'info', 'contact', 'official', 'pickcardrebate',
  'jetso', 'root', 'null', 'undefined', 'api', 'www', 'mail',
];

// 驗證用戶名格式
function validateUsernameFormat(username: string): { valid: boolean; error?: string } {
  if (!username || username.length < 3) {
    return { valid: false, error: '用戶名至少需要 3 個字符' };
  }
  if (username.length > 20) {
    return { valid: false, error: '用戶名最多 20 個字符' };
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { valid: false, error: '用戶名只能包含英文字母、數字和底線' };
  }
  if (/^[0-9_]/.test(username)) {
    return { valid: false, error: '用戶名必須以英文字母開頭' };
  }
  if (RESERVED_USERNAMES.includes(username.toLowerCase())) {
    return { valid: false, error: '此用戶名已被保留' };
  }
  return { valid: true };
}

// GET: 檢查用戶名是否可用
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (!username) {
      return NextResponse.json({ error: '請提供用戶名' }, { status: 400 });
    }

    // 驗證格式
    const formatCheck = validateUsernameFormat(username);
    if (!formatCheck.valid) {
      return NextResponse.json({ 
        available: false, 
        error: formatCheck.error 
      });
    }

    // 檢查唯一性（不區分大小寫）
    const { data, error } = await adminAuthClient
      .from('profiles')
      .select('id')
      .ilike('username', username)
      .single();

    if (error && error.code !== 'PGRST116') {
      throw error;
    }

    if (data) {
      return NextResponse.json({ 
        available: false, 
        error: '此用戶名已被使用' 
      });
    }

    return NextResponse.json({ available: true });
  } catch (error: any) {
    console.error('Check username error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

