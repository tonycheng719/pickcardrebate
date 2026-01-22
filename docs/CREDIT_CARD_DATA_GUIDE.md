# 信用卡資料更新指南

## ⚠️ 重要：兩個系統的分別

當你提供信用卡優惠資料時，需要分開處理**兩種不同的數據**：

### 1️⃣ 銀行迎新優惠 → `cards.ts`

**位置**: `lib/data/cards.ts`

**包含內容**:
- 卡片基本資料（回贈規則、年費等）
- **銀行官方迎新優惠**（`welcomeOfferText`）
- 卡片備註（`note`）
- 標籤、賣點等

**管理方式**: 代碼更新 → Git Push → 自動部署

**範例**:
```typescript
{
  id: "hsbc-vs",
  name: "滙豐 Visa Signature",
  welcomeOfferText: "全新客戶：$800獎賞錢（簽$8,000）",  // 銀行迎新
  note: "銀行迎新：發卡後60日內簽$8,000可獲$800獎賞錢"
}
```

---

### 2️⃣ MoneyHero 獨家優惠 → Seed 檔案 + Admin 後台

**位置**: `app/api/admin/partner-offers/seed/route.ts`

**包含內容**:
- MoneyHero 限時獨家優惠
- 獎品選項
- 有效期限
- 簽賬要求
- 申請連結

**管理方式**:
1. 更新 Seed 檔案 → Git Push
2. 去 `/admin/partner-offers` 按「導入 MoneyHero 資料」
3. 確保「前台顯示」已啟用

**範例**:
```typescript
{
  cardId: "hsbc-vs",
  partnerOffer: {
    enabled: true,
    applyUrl: "https://apply.creatory.moneyhero.com.hk/...",
    bonusValue: 5980,
    bonusDescription: "獎品8選1：...",
    bonusItems: ["HK$1,300 HKTVmall", "..."],
    validFrom: "2026-01-01",
    validTo: "2026-01-30",
    requirements: ["全新客戶", "..."],
    minSpend: 0,
    minSpendDays: 0,
    notes: "⚠️ 注意事項..."
  }
}
```

---

## 📋 更新流程 Checklist

當收到新的信用卡優惠資料時：

### ✅ 識別資料類型

1. **銀行迎新** = 銀行官方提供的歡迎禮遇
   - 例如：「全新客戶簽$8,000獲$800獎賞錢」
   - 更新 → `cards.ts` 的 `welcomeOfferText` 和 `note`

2. **MoneyHero 獨家優惠** = 經 MoneyHero 申請才有的額外獎品
   - 例如：「經MoneyHero申請可獲 Dyson 耳機/Apple禮品卡」
   - 更新 → `seed/route.ts` 的 `MONEYHERO_PARTNER_OFFERS`

### ✅ 更新步驟

**銀行迎新**:
```
1. 編輯 lib/data/cards.ts
2. 找到對應卡片 ID
3. 更新 welcomeOfferText 和 note
4. git add -A && git commit -m "feat: 更新XXX銀行迎新" && git push
```

**MoneyHero 獨家優惠**:
```
1. 編輯 app/api/admin/partner-offers/seed/route.ts
2. 找到對應 cardId（或新增）
3. 更新 partnerOffer 內容
4. git add -A && git commit -m "feat: 更新XXX MoneyHero優惠" && git push
5. 通知用戶去 /admin/partner-offers 按「導入 MoneyHero 資料」
```

---

## 🔍 如何識別 MoneyHero 優惠

關鍵詞：
- 「經 MoneyHero 申請」
- 「MoneyHero 獨家」
- 「MoneyHero 限時獨家優惠」
- 「獎品 X 選 1」（通常有多款禮品選擇）
- 有效期格式：「2026年01月19日下午6時至2026年01月30日下午6時」

---

## ⚠️ 常見錯誤

❌ **錯誤**: 將 MoneyHero 優惠寫入 `cards.ts`
✅ **正確**: MoneyHero 優惠應寫入 `seed/route.ts`

❌ **錯誤**: 只更新 `cards.ts` 就認為完成
✅ **正確**: 如有 MoneyHero 優惠，需同時更新兩個檔案

❌ **錯誤**: 更新 seed 檔案後沒有通知用戶導入
✅ **正確**: 提醒用戶去 `/admin/partner-offers` 按「導入 MoneyHero 資料」

---

## 📅 最後更新日期

- **Seed 檔案最後更新**: 2026-01-22
- **更新的卡片**:
  - 渣打國泰Mastercard
  - 信銀國際Motion/大灣區/香港航空
  - sim Credit Card / sim World Mastercard
  - 大新ONE+/MyAuto/ANA/聯合航空/英國航空
  - 恒生MMPOWER/Travel+/enJoy
  - 中銀Chill/Cheers/Go系列
  - 安信WeWa/EarnMORE

