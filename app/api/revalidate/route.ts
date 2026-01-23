import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const { path, secret } = await request.json();
    
    // 簡單的安全檢查（可以從環境變數獲取 secret）
    const validSecret = process.env.REVALIDATE_SECRET || 'admin-revalidate';
    if (secret !== validSecret) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
    }
    
    if (!path) {
      return NextResponse.json({ error: 'Path is required' }, { status: 400 });
    }
    
    revalidatePath(path);
    
    return NextResponse.json({ 
      success: true, 
      revalidated: true, 
      path,
      now: Date.now() 
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path');
  const secret = request.nextUrl.searchParams.get('secret');
  
  const validSecret = process.env.REVALIDATE_SECRET || 'admin-revalidate';
  if (secret !== validSecret) {
    return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
  }
  
  if (!path) {
    return NextResponse.json({ error: 'Path is required' }, { status: 400 });
  }
  
  revalidatePath(path);
  
  return NextResponse.json({ 
    success: true, 
    revalidated: true, 
    path,
    now: Date.now() 
  });
}

