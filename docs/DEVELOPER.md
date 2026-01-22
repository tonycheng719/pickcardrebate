# PickCard Rebate 開發者指南

## 專案架構

```
jetsobuy/
├── app/                    # Next.js App Router 頁面
│   ├── api/               # API 路由
│   ├── admin/             # 管理後台
│   ├── cards/             # 信用卡頁面
│   ├── discover/          # 探索文章
│   ├── wallet/            # 用戶錢包
│   └── auth/              # 認證相關
├── components/            # React 組件
│   ├── ui/               # 基礎 UI 組件 (shadcn/ui)
│   ├── cards/            # 信用卡相關組件
│   └── admin/            # 管理後台組件
├── lib/                   # 工具函數和邏輯
│   ├── data/             # 靜態數據
│   ├── logic/            # 計算邏輯
│   ├── store/            # 狀態管理 (Context)
│   ├── supabase/         # Supabase 客戶端
│   ├── i18n/             # 多語言
│   ├── cache/            # 快取
│   └── monitoring/       # 監控
├── mobile/               # React Native/Expo 手機 App
├── supabase/             # Supabase 設定和遷移
├── docs/                 # 文檔
└── __tests__/            # 測試
```

## 技術棧

### 前端
- **Next.js 14** - React 框架，App Router
- **TypeScript** - 類型安全
- **Tailwind CSS** - 樣式
- **shadcn/ui** - UI 組件庫
- **Framer Motion** - 動畫

### 後端
- **Supabase** - 資料庫、認證、儲存
- **PostgreSQL** - 資料庫
- **Edge Functions** - Serverless 函數

### 手機 App
- **React Native** - 跨平台框架
- **Expo** - 開發工具鏈
- **Expo Router** - 檔案路由

## 開發環境設定

### 1. 安裝依賴

```bash
# Web
npm install

# Mobile
cd mobile
npm install
```

### 2. 環境變數

複製 `.env.example` 到 `.env.local`：

```bash
cp .env.example .env.local
```

必要的環境變數：
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key
```

### 3. 資料庫設定

執行 Supabase 遷移：

```bash
# 連接到 Supabase
supabase link --project-ref your_project_ref

# 執行遷移
supabase db push
```

### 4. 啟動開發伺服器

```bash
# Web
npm run dev

# Mobile
cd mobile
npx expo start
```

## 核心邏輯

### 回贈計算機

位於 `lib/logic/calculator.ts`，主要函數：

```typescript
calculateRebate({
  cards: CreditCard[],
  merchant: Merchant,
  amount: number,
  paymentMethod: PaymentMethod,
  rewardPreference: 'cash' | 'miles',
}): CalculationResult[]
```

### 信用卡規則

每張卡片有 `rules` 陣列定義回贈規則：

```typescript
interface RebateRule {
  description: string;
  matchType: 'base' | 'category' | 'merchant' | 'paymentMethod';
  matchValue?: string | string[];
  percentage: number;
  cap?: number;
  capType?: 'spending' | 'reward';
  capPeriod?: 'monthly' | 'yearly' | 'quarterly';
  // ...
}
```

## 狀態管理

使用 React Context 進行狀態管理：

- `WalletProvider` - 用戶錢包和認證狀態
- `SettingsProvider` - 系統設定
- `ReviewsProvider` - 評論和回報

## 測試

```bash
# 執行所有測試
npm test

# 執行特定測試
npm test -- --testPathPattern=calculator

# 測試覆蓋率
npm test -- --coverage
```

## 部署

### Web (Vercel)

```bash
npm run build
vercel deploy --prod
```

### Mobile (EAS)

```bash
cd mobile
eas build --platform all
eas submit
```

## 程式碼風格

- ESLint + Prettier
- TypeScript strict mode
- 使用 conventional commits

```bash
# 格式化
npm run format

# Lint
npm run lint
```

## 常見問題

### Q: 如何新增信用卡？

編輯 `lib/data/cards.ts`，按照現有格式新增卡片資料。

### Q: 如何新增商戶？

編輯 `lib/data/merchants.ts`，新增商戶資料。

### Q: 如何修改計算邏輯？

修改 `lib/logic/calculator.ts` 中的相關函數。

## 聯繫

如有問題，請提交 GitHub Issue 或聯繫開發團隊。

