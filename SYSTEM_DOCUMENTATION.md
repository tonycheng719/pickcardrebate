# PickCardRebate 系統說明書

> 香港信用卡回贈比較平台 - 系統技術文檔

**最後更新**: 2025-11-29

---

## 目錄

1. [系統概覽](#系統概覽)
2. [技術架構](#技術架構)
3. [環境變數配置](#環境變數配置)
4. [資料庫結構](#資料庫結構)
5. [認證系統](#認證系統)
6. [後台管理功能](#後台管理功能)
7. [SEO 配置](#seo-配置)
8. [常用 SQL 腳本](#常用-sql-腳本)
9. [部署指南](#部署指南)
10. [故障排除](#故障排除)

---

## 系統概覽

PickCardRebate 是一個香港信用卡回贈比較平台，主要功能包括：

- **信用卡回贈計算機**: 根據商戶和消費方式，計算最高回贈信用卡
- **信用卡錢包**: 用戶可管理持有的信用卡
- **優惠資訊**: 最新信用卡優惠活動
- **用戶評價系統**: 社群驗證回贈真偽
- **後台管理**: 信用卡、商戶、優惠、用戶管理

### 網站 URL
- **主站**: https://pickcardrebate.com
- **Supabase API**: https://pickcardrebate-supabase-kong.zeabur.app

---

## 技術架構

### 前端
- **框架**: Next.js 16 (App Router)
- **UI 庫**: Tailwind CSS, shadcn/ui
- **狀態管理**: React Context (WalletContext, AdminDataStore)
- **動畫**: Framer Motion
- **主題**: next-themes (Light/Dark Mode)

### 後端
- **API Routes**: Next.js API Routes
- **資料庫**: Supabase (PostgreSQL)
- **認證**: Supabase Auth (Google OAuth)
- **儲存**: Supabase Storage (圖片上傳)

### 部署
- **平台**: Zeabur
- **域名**: Cloudflare DNS
- **域名配置**:
  - `pickcardrebate.com` → `pickcardrebate-web.zeabur.app` (CNAME)
  - `api.pickcardrebate.com` → `pickcardrebate-supabase-kong.zeabur.app` (CNAME)

---

## 環境變數配置

### Zeabur 環境變數

| 變數名稱 | 說明 | 範例值 |
|---------|------|--------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase API URL | `https://pickcardrebate-supabase-kong.zeabur.app` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 匿名金鑰 | `eyJhbGci...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Service Role 金鑰 (後台操作用) | `eyJhbGci...` |
| `SERVICE_ROLE_KEY` | 備用 Service Role 金鑰 | 同上 |

### Supabase Auth 配置

在 Supabase Dashboard → Authentication → URL Configuration:

| 設定 | 值 |
|-----|-----|
| Site URL | `https://pickcardrebate.com` |
| Redirect URLs | `https://pickcardrebate.com/auth/callback`, `http://localhost:3000/auth/callback` |

### Google OAuth 配置

在 Google Cloud Console → APIs & Services → Credentials:

| 設定 | 值 |
|-----|-----|
| Authorized JavaScript origins | `https://pickcardrebate.com`, `http://localhost:3000` |
| Authorized redirect URIs | `https://pickcardrebate-supabase-kong.zeabur.app/auth/v1/callback` |

---

## 資料庫結構

### 主要表格

#### `profiles` - 用戶資料
```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  email TEXT,
  name TEXT,
  avatar_url TEXT,
  gender TEXT,                    -- 'male', 'female', 'other'
  district TEXT,                  -- 香港十八區
  birth_year INTEGER,
  birth_month INTEGER,
  reward_preference TEXT DEFAULT 'cash',  -- 'cash' or 'miles'
  is_banned BOOLEAN DEFAULT FALSE,
  is_banned_comment BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### `user_cards` - 用戶持有信用卡
```sql
CREATE TABLE user_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  card_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### `cards` - 信用卡資料
```sql
CREATE TABLE cards (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  bank TEXT NOT NULL,
  image_url TEXT,
  style JSONB,
  rules JSONB,
  tags TEXT[],
  annual_fee INTEGER,
  -- 其他欄位...
);
```

#### `promos` - 優惠活動
```sql
CREATE TABLE promos (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  merchant TEXT,
  description TEXT,
  content TEXT,           -- Markdown 內容
  image_url TEXT,
  expiry_date DATE,
  tags TEXT[],
  url TEXT,
  seo_title TEXT,         -- SEO 標題
  seo_description TEXT,   -- SEO 描述
  faqs JSONB DEFAULT '[]' -- FAQ 結構化資料
);
```

#### `merchants` - 商戶資料
```sql
CREATE TABLE merchants (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  category_ids TEXT[],
  aliases TEXT[],
  logo TEXT,
  is_online_only BOOLEAN DEFAULT FALSE
);
```

---

## 認證系統

### 登入流程

1. 用戶點擊「Google 登入」
2. 重定向到 Google OAuth
3. Google 回調到 Supabase Auth (`/auth/v1/callback`)
4. Supabase 回調到應用 (`/auth/callback`)
5. 應用交換 code 為 session (`/auth/success`)
6. 創建/更新用戶 profile (`/api/auth/ensure-profile`)
7. 重定向到首頁或 Onboarding

### Session 持久化

由於跨域 cookie 問題，系統使用 **localStorage 備份**：

```javascript
// 儲存的 key
sb-pickcardrebate-supabase-kong-auth-token
sb-auth-token
supabase.auth.token
```

### 相關檔案
- `app/auth/callback/route.ts` - OAuth 回調處理
- `app/auth/success/page.tsx` - Session 交換
- `lib/store/wallet-context.tsx` - 用戶狀態管理
- `app/api/auth/ensure-profile/route.ts` - Profile 創建/更新

---

## 後台管理功能

### 訪問路徑
- **後台首頁**: `/admin`
- **信用卡管理**: `/admin/cards`
- **商戶管理**: `/admin/merchants`
- **優惠管理**: `/admin/promos`
- **用戶管理**: `/admin/users`
- **內容審核**: `/admin/moderation` - 管理用戶提交的回報和評論
- **操作日誌**: `/admin/logs` - 追蹤管理員操作記錄
- **更新日誌**: `/admin/changelog` - 發佈系統更新通知
- **系統設定**: `/admin/settings`

### 用戶管理功能
- 查看用戶資料（性別、地區、出生年月）
- 查看用戶持有信用卡
- 查看用戶消費記錄
- **封鎖用戶** (`is_banned`) - 被封鎖用戶登入時會自動登出並顯示錯誤訊息
- **禁止用戶評論** (`is_banned_comment`) - 被禁言用戶無法提交評論/回報
- 查看註冊日期和最後登入時間

### 優惠管理功能
- 新增/編輯優惠
- Markdown 內容編輯
- **FAQ 管理** (常見問題)
- **SEO 設定** (自訂標題和描述)
- 圖片上傳

---

## SEO 配置

### 全站 SEO (`app/layout.tsx`)
- 預設標題和描述
- Open Graph 和 Twitter Cards
- 關鍵字設定
- 規範化 URL

### Sitemap (`app/sitemap.ts`)
自動生成包含：
- 靜態頁面 (首頁、信用卡列表、優惠列表等)
- 所有信用卡詳情頁
- 所有優惠詳情頁

訪問: `https://pickcardrebate.com/sitemap.xml`

### Robots.txt (`app/robots.ts`)
禁止爬取：
- `/admin/`
- `/api/`
- `/auth/`
- `/onboarding`
- `/settings`

訪問: `https://pickcardrebate.com/robots.txt`

### 結構化資料 (JSON-LD)
優惠頁面自動生成：
- `Offer` Schema
- `BreadcrumbList` Schema
- `FAQPage` Schema (當有 FAQ 時)

---

## 常用 SQL 腳本

### 添加用戶管理欄位
```sql
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_banned BOOLEAN DEFAULT FALSE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS is_banned_comment BOOLEAN DEFAULT FALSE;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS last_login TIMESTAMPTZ;
```

### 添加優惠 SEO 欄位
```sql
ALTER TABLE promos ADD COLUMN IF NOT EXISTS seo_title TEXT;
ALTER TABLE promos ADD COLUMN IF NOT EXISTS seo_description TEXT;
ALTER TABLE promos ADD COLUMN IF NOT EXISTS faqs JSONB DEFAULT '[]'::jsonb;
```

### 修復 RLS 權限
```sql
-- 確保 profiles 表 RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
ON profiles FOR SELECT
TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
TO authenticated
USING (auth.uid() = id);

-- 確保 user_cards 表 RLS
ALTER TABLE user_cards ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own cards"
ON user_cards FOR ALL
TO authenticated
USING (auth.uid() = user_id);
```

### 重新同步卡片資料
在後台 `/admin/settings` 點擊「重置並更新卡片資料 (Re-seed)」按鈕，或直接調用：
```
POST /api/admin/seed-cards
```

---

## 部署指南

### 本地開發
```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 訪問 http://localhost:3000
```

### Zeabur 部署
1. 連接 GitHub 儲存庫
2. 設定環境變數
3. 自動部署 (push to main)

### 手動重新部署
在 Zeabur Dashboard 點擊「Redeploy」

---

## 故障排除

### 登入後顯示「登入」按鈕
**原因**: Session 未正確設置
**解決**:
1. 檢查 `NEXT_PUBLIC_SUPABASE_URL` 環境變數
2. 清除 localStorage 後重新登入
3. 檢查 Supabase Auth 日誌

### 錢包資料不同步
**原因**: RLS 權限問題
**解決**:
1. 執行 `supabase_fix_data_sync_final.sql`
2. 確認 Service Role Key 已設定

### 圖片上傳失敗
**原因**: Supabase Storage 權限
**解決**:
1. 確認 `images` bucket 已設為 public
2. 檢查 Service Role Key

### Server Action 錯誤
**原因**: 部署版本不匹配
**解決**:
1. 強制重新部署
2. 清除瀏覽器快取

### DNS Error 1016
**原因**: Cloudflare DNS 未正確解析
**解決**:
1. 檢查 CNAME 記錄
2. 確認 Cloudflare Proxy 狀態
3. 等待 DNS 傳播 (最多 24 小時)

---

## 檔案結構

```
├── app/
│   ├── admin/           # 後台管理頁面
│   ├── api/             # API Routes
│   ├── auth/            # 認證相關頁面
│   ├── cards/           # 信用卡頁面
│   ├── promos/          # 優惠頁面
│   ├── wallet/          # 錢包頁面
│   ├── layout.tsx       # 全站佈局
│   ├── sitemap.ts       # Sitemap 生成
│   └── robots.ts        # Robots.txt 生成
├── components/          # React 組件
├── lib/
│   ├── data/            # 靜態資料 (cards, promos, merchants)
│   ├── store/           # Context 狀態管理
│   ├── supabase/        # Supabase 客戶端配置
│   └── types.ts         # TypeScript 類型定義
├── public/              # 靜態資源
└── supabase_*.sql       # SQL 腳本
```

---

## 聯絡資訊

如有技術問題，請聯繫開發團隊。

