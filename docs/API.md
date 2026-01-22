# PickCard Rebate API 文檔

## 概述

PickCard Rebate 提供 RESTful API 供前端應用程式和第三方整合使用。

**Base URL:** `https://pickcardrebate.com/api`

## 認證

大部分 API 需要用戶認證。使用 Supabase Auth 進行認證，Token 會自動包含在 Cookie 中。

## API 端點

### 信用卡相關

#### 獲取所有信用卡
```http
GET /cards
```

**回應範例：**
```json
{
  "cards": [
    {
      "id": "hsbc-vs",
      "name": "HSBC Visa Signature",
      "bank": "HSBC",
      "annualFee": 2000,
      "minIncome": 240000,
      "imageUrl": "https://...",
      "rules": [...]
    }
  ]
}
```

#### 獲取單張信用卡詳情
```http
GET /cards/[id]
```

#### 信用卡評分
```http
GET /cards/[id]/rating
POST /cards/[id]/rating
DELETE /cards/[id]/rating
```

**POST 請求範例：**
```json
{
  "rating": 5,
  "review": "非常好用的信用卡！"
}
```

---

### 用戶相關

#### 獲取用戶資料
```http
GET /user/profile
```

**需要認證**

#### 更新用戶資料
```http
PUT /user/profile
```

#### 用戶卡包
```http
GET /user/cards
POST /user/cards
DELETE /user/cards/[cardId]
```

---

### 交易記錄

#### 獲取交易記錄
```http
GET /user/transactions
```

**查詢參數：**
- `startDate` - 開始日期 (ISO 格式)
- `endDate` - 結束日期 (ISO 格式)
- `limit` - 限制筆數 (預設 50)
- `offset` - 偏移量 (預設 0)

#### 新增交易記錄
```http
POST /user/transactions
```

**請求範例：**
```json
{
  "amount": 500,
  "category": "dining",
  "merchantName": "Starbucks",
  "cardId": "hsbc-vs",
  "transactionDate": "2026-01-22"
}
```

---

### 計算歷史

#### 獲取計算歷史
```http
GET /user/calculation-history
```

**回應包含：**
- `history` - 計算記錄列表
- `stats` - 統計資訊（總計算次數、常用卡片等）

#### 新增計算記錄
```http
POST /user/calculation-history
```

#### 刪除計算記錄
```http
DELETE /user/calculation-history?id=[recordId]
DELETE /user/calculation-history?clearAll=true
```

---

### 消費追蹤

#### 獲取消費追蹤
```http
GET /user/spending-tracker
GET /user/spending-tracker?cardId=[cardId]
```

#### 新增/更新追蹤
```http
POST /user/spending-tracker
```

**請求範例：**
```json
{
  "cardId": "hsbc-vs",
  "ruleDescription": "最紅自主獎賞",
  "capAmount": 100000,
  "capType": "spending",
  "capPeriod": "yearly",
  "remindAtPercentage": 80
}
```

#### 更新追蹤金額
```http
PATCH /user/spending-tracker
```

---

### 留言評論

#### 獲取留言
```http
GET /comments?targetType=[type]&targetId=[id]
```

**參數：**
- `targetType` - `card` 或 `article`
- `targetId` - 目標 ID

#### 發表留言
```http
POST /comments
```

**請求範例：**
```json
{
  "targetType": "card",
  "targetId": "hsbc-vs",
  "content": "這張卡回贈很高！",
  "parentId": null
}
```

#### 點讚/舉報
```http
POST /comments/[id]/like
POST /comments/[id]/report
```

---

### 推送通知

#### 註冊推送 Token
```http
POST /user/push-token
```

**請求範例：**
```json
{
  "token": "ExponentPushToken[xxxx]",
  "platform": "ios"
}
```

---

### 推薦

#### 獲取個人化推薦
```http
GET /user/recommendations
```

**回應包含根據用戶卡包和消費習慣推薦的商戶列表。**

---

## 錯誤處理

所有錯誤回應使用以下格式：

```json
{
  "error": "錯誤訊息描述"
}
```

**HTTP 狀態碼：**
- `200` - 成功
- `400` - 請求參數錯誤
- `401` - 未認證
- `403` - 無權限
- `404` - 資源不存在
- `500` - 伺服器錯誤

---

## 限流

API 有請求限流保護：
- 一般用戶：每分鐘 60 次請求
- 認證用戶：每分鐘 120 次請求

超過限制會返回 `429 Too Many Requests`。

---

## 版本

目前 API 版本：`v1`

未來版本更新會通過 header 或 URL 前綴區分。

