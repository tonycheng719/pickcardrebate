import { Promo } from "../types";

export const PROMOS: Promo[] = [
  {
    id: "hsbc-red-promo-2025",
    title: "HSBC Red 卡指定商戶 8% 回贈",
    merchant: "HSBC",
    description: "於指定商戶（壽司郎、譚仔、GU、Decathlon、lululemon 等）簽賬可享 8% 獎賞錢回贈。",
    imageUrl: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=2070&auto=format&fit=crop",
    expiryDate: "2026-03-31",
    relatedCardIds: ["hsbc-red"],
    tags: ["餐飲", "購物", "限時優惠"],
    url: "https://www.hsbc.com.hk",
  },
  {
    id: "hsbc-visa-signature-promo-2025",
    title: "HSBC Visa Signature 迎新優惠",
    merchant: "HSBC",
    description: "迎新簽賬 $8,000 可獲 $600-$800 獎賞錢，首 60 日內完成。",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
    expiryDate: "2025-12-31",
    relatedCardIds: ["hsbc-visa-signature"],
    tags: ["迎新", "高回贈"],
    url: "https://www.hsbc.com.hk",
  },
  {
    id: "sc-cathay-promo-2025",
    title: "渣打國泰 Mastercard 迎新高達 60,000 里",
    merchant: "渣打銀行",
    description: "迎新可獲高達 60,000 里數，出糧客戶額外 2,000 里。",
    imageUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop",
    expiryDate: "2026-04-30",
    relatedCardIds: ["sc-cathay"],
    tags: ["迎新", "里數"],
    url: "https://www.sc.com/hk",
  },
  {
    id: "citi-octopus-transport-2025",
    title: "Citi 八達通卡交通 15% 回贈",
    merchant: "Citi",
    description: "登記後，港鐵、巴士、渡輪、電車、的士車費可享 15% 回贈（月簽 $4,000，上限 $300）。",
    imageUrl: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069&auto=format&fit=crop",
    expiryDate: "2026-03-31",
    relatedCardIds: ["citi-octopus"],
    tags: ["交通", "八達通", "需登記"],
    url: "https://www.citibank.com.hk",
  },
  {
    id: "hangseng-enjoy-wellcome-2025",
    title: "恒生 enJoy 卡惠康 92 折",
    merchant: "惠康",
    description: "每月 3、13、23 號於惠康/Market Place 消費滿 $100 即享 92 折優惠。",
    imageUrl: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=2074&auto=format&fit=crop",
    expiryDate: "2025-12-31",
    relatedCardIds: ["hangseng-enjoy"],
    tags: ["超市", "折扣", "yuu積分"],
    url: "https://www.hangseng.com",
  },
  {
    id: "dbs-compass-wed-2025",
    title: "DBS COMPASS VISA 星期三超市 8%",
    merchant: "DBS",
    description: "逢星期三於超市簽賬滿 $300，可享 8% 回贈（每月上限 $2,000 簽賬額）。",
    imageUrl: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=2074&auto=format&fit=crop",
    expiryDate: "2025-12-31",
    relatedCardIds: ["dbs-compass"],
    tags: ["超市", "星期三", "需登記"],
    url: "https://www.dbs.com.hk",
  },
  {
    id: "fubon-yata-monday-2025",
    title: "富邦一田卡 星期一超市 95折",
    merchant: "一田",
    description: "逢星期一於一田超市購物可享 95 折優惠，正價及減價貨品均適用。",
    imageUrl: "https://images.unsplash.com/photo-1604719312566-8912e9227c6a?q=80&w=2074&auto=format&fit=crop",
    expiryDate: "2025-12-31",
    relatedCardIds: ["fubon-yata"],
    tags: ["超市", "星期一", "折扣", "一田"],
    url: "https://www.fubonbank.com.hk/tc/cards/bonus-points-program/yata-credit-card.html",
  },
  {
    id: "hsbc-broadway-winter-2025",
    title: "HSBC 最紅冬日賞 - 百老滙高達 8% 回贈",
    merchant: "百老滙",
    description: "憑 HSBC 信用卡於百老滙簽賬，累積滿 $10,000 可享高達 6%「獎賞錢」回贈（上限 $900）；銀聯卡更可享 8%（上限 $1,000）！單一簽賬需滿 $500，須透過 Reward+ 登記。",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
    expiryDate: "2026-02-28",
    relatedCardIds: ["hsbc-vs", "hsbc-red", "hsbc-everymile", "hsbc-pulse"],
    tags: ["購物", "電器", "HSBC", "需登記"],
    url: "https://www.hsbc.com.hk/zh-hk/credit-cards/rewards/red-hot/",
    content: `## 📅 推廣期
**2025年12月1日 至 2026年2月28日**

---

## 🛒 合資格簽賬
於**百老滙**以合資格信用卡**單一簽賬淨額滿 HK$500** 的交易

---

## 💰 HSBC 信用卡回贈

**累積簽賬滿 HK$3,000 或以上**
- 額外 3%「獎賞錢」回贈
- 上限 **$100**

**累積簽賬滿 HK$6,000 或以上**
- 額外 5%「獎賞錢」回贈
- 上限 **$400**

**累積簽賬滿 HK$10,000 或以上**
- 額外 6%「獎賞錢」回贈
- 上限 **$900**

---

## 💳 HSBC 銀聯信用卡回贈（更高！）

**累積簽賬 HK$3,000 至 $5,999**
- 額外 3%「獎賞錢」回贈
- 上限 **$100**

**累積簽賬 HK$6,000 至 $9,999**
- 額外 6%「獎賞錢」回贈
- 上限 **$500**

**累積簽賬滿 HK$10,000 或以上**
- 額外 **8%**「獎賞錢」回贈
- 上限 **$1,000** 🔥

---

## ⚠️ 重要條款

1. **登記須於簽賬前進行**，登記前之合資格簽賬將不獲計算
2. 須透過**滙豐 Reward+ 應用程式**登記
3. 「最紅冬日賞 – 專有簽賬獎賞」只適用於**特選信用卡持卡人**，須登入 Reward+ 查看是否符合資格
4. 指定貨品低至 **5 折**優惠
5. 若您只持有附屬卡而未持有任何個人基本卡，該附屬卡將不可獲享優惠

---

## 💡 攻略提示

- 銀聯卡回贈更高，如有 HSBC Pulse 銀聯雙幣卡可優先使用
- 買電器前先登記，確保簽賬計入優惠
- 可配合迎新優惠同時使用，最大化回贈
`,
  },
  {
    id: "aeon-unionpay-asia-2025",
    title: "AEON 銀聯卡「賞」亞洲 - 內地/澳門/台灣/韓國 6% 回贈",
    merchant: "AEON",
    description: "憑 AEON 銀聯信用卡於內地/澳門/台灣/韓國簽賬（包括網購及實體店），登記後可享 15X 積分 = 6% 回贈！無最低簽賬要求，韓國每月上限高達 $200 回贈！",
    imageUrl: "https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=2070&auto=format&fit=crop",
    expiryDate: "2026-01-31",
    relatedCardIds: ["aeon-unionpay"],
    tags: ["北上", "內地", "韓國", "台灣", "澳門", "AEON", "銀聯", "需登記"],
    url: "https://www.aeon.com.hk/tc/privilege/promotion_upi_0725.html",
    content: `## 📅 推廣期

**內地/澳門/台灣**：2025年7月1日 至 2026年1月31日
**韓國**：2025年12月1日 至 2026年1月31日

---

## 💰 內地/澳門/台灣回贈

**合計 15X 積分 = 6% 回贈**

- AEON Premium UnionPay：每月上限 $100 回贈
- AEON 銀聯信用卡：每月上限 $100 回贈

每月上限 $100 回贈 = 每月首 **$1,667** 簽賬享 6%

---

## 🇰🇷 韓國回贈

**合計 15X 積分 = 6% 回贈**

- AEON Premium UnionPay：每月上限 $200 回贈
- AEON 銀聯信用卡：每月上限 $200 回贈

每月上限 $200 回贈 = 每月首 **$3,333** 簽賬享 6%

---

## ✅ 合資格簽賬方式

- 實體卡簽賬
- Apple Pay
- AEON 銀聯 QR Pay
- 雲閃付 App

---

## ❌ 不合資格簽賬

- 電子錢包（微信支付/支付寶/WeChat Pay HK/AlipayHK）
- 電子錢包增值/轉賬
- 保險繳費
- 八達通自動增值
- AEON 網上繳費

---

## 📝 登記方法

1. 下載「AEON 香港」手機 App
2. 登入後選擇「賞」亞洲優惠
3. 為每張銀聯卡獨立登記
4. 登記後簽賬即可享優惠

---

## 💡 攻略提示

- **無最低簽賬要求**！小額消費也計
- 韓國上限較高（$200/月），去韓國旅遊必備
- 配合銀聯的免外幣手續費，實際回贈更高
- 積分將於 2026 年 2 月入賬
`,
  },
  {
    id: "dbs-wilson-2025",
    title: "DBS 信用卡 x 衛訊優惠 - 單一簽賬高達 $320 回贈",
    merchant: "衛訊",
    description: "憑 DBS 信用卡於衛訊門市或網店簽賬，單一簽賬滿 $8,000 即享 $320 一扣即享！精選貨品更低至 55 折！每月可享優惠一次。",
    imageUrl: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?q=80&w=2070&auto=format&fit=crop",
    expiryDate: "2026-02-28",
    relatedCardIds: ["dbs-eminent", "dbs-black", "dbs-live-fresh", "dbs-compass"],
    tags: ["電器", "衛訊", "DBS", "一扣即享"],
    url: "https://www.wilsoncomm.com.hk/",
    content: `## 📅 推廣期

**2025年12月1日 至 2026年2月28日**

---

## 💰 一扣即享優惠

| 優惠 | 單一簽賬金額 | 回贈金額 | 回贈率 |
|------|-------------|---------|--------|
| **優惠一** | 滿 $3,500 | $100 | 2.86% |
| **優惠二** | 滿 $8,000 | $320 | **4%** |

---

## 📊 每月限制

- 每個 DBS Card+ 用戶每月只可享**其中一個**優惠一次
- 每月最多享 **$320** 回贈
- 推廣期內合共最多 **$960** 回贈
- 名額先到先得，額滿即止

---

## 🛒 合資格消費

- 衛訊**門市**（包括聯營店）
- 衛訊**網店**（wilsoncomm.com.hk）
- ✅ Apple Pay / Google Pay / Samsung Pay 可以

---

## ❌ 不合資格簽賬

- 電子錢包付款（Apple Pay/Google Pay/Samsung Pay **除外**）
- 購買現金券
- 透過 DBS iBanking/繳費易/DBS Card+ 繳款的交易

---

## 📱 如何獲取優惠

1. 下載並登入 **DBS Card+ App**
2. 進入「更多」>「程式和安全設定」>「推送通知」
3. 開啟「**一扣即享**」優惠通知
4. 完成合資格簽賬後，於 DBS Card+ App 的「簽賬」版面
5. 點按紅色「**一扣即享**」按鈕扣減應付金額

⚠️ 必須於 **2026年3月15日 23:59** 前點按「一扣即享」按鈕，否則視作放棄

---

## 🎁 額外優惠

- 精選貨品低至 **55 折**
- 單一簽賬滿 $500 並成功申請 Flex Shopping 3/6/12 個月分期
- 可享高達 **$100** 一次性手續費回贈

---

## 💡 攻略提示

- 買電器前記得開啟 DBS Card+ 的「一扣即享」通知
- 選擇 $8,000 門檻可享最高 4% 回贈
- 配合 DBS Eminent Card 餐飲 5% 回贈，買完電器去食飯更抵！
`,
  },
  {
    id: "hangseng-winter-2025",
    title: "恒生信用卡冬日簽賬賞 - 高達額外 $2,800 +FUN Dollars",
    merchant: "恒生銀行",
    description: "憑恒生 Visa 卡累積簽賬滿 $15,000，每階段可享高達 $700 +FUN Dollars！網上或外幣簽賬滿 $5,000 再有額外 $200！全期最高 $2,800 回贈！",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop",
    expiryDate: "2026-02-28",
    relatedCardIds: ["hangseng-mmpower", "hangseng-travel-plus", "hangseng-enjoy", "hangseng-muji", "hangseng-platinum"],
    tags: ["恒生", "Visa", "累積簽賬", "需登記", "外幣", "網購"],
    url: "https://www.hangseng.com/",
    content: `## 📅 推廣期

**階段1**：2025年12月1日 至 2026年1月14日
**階段2**：2026年1月15日 至 2026年2月28日

---

## 💰 獎賞一：累積簽賬獎賞（每階段）

| 累積簽賬 | 一般回贈 | Visa卡額外 | **合計** |
|---------|---------|-----------|----------|
| 滿 $8,000 | $150 | $100 | **$250** |
| 滿 $15,000 | $500 | $200 | **$700** |

每階段最高 **$700**，兩階段合共 **$1,400**

---

## 🌏 獎賞二：網上/外幣簽賬獎賞（每階段）

需先符合獎賞一要求（累積簽賬滿 $8,000）

| 累積網上/外幣簽賬 | 一般回贈 | Visa卡額外 | **合計** |
|-----------------|---------|-----------|----------|
| 滿 $5,000 | $100 | $100 | **$200** |

每階段最高 **$200**，兩階段合共 **$400**

---

## 🎯 獎賞三：全期累積獎賞

| 全期累積簽賬 | 一般回贈 | Visa卡額外 | **合計** |
|-------------|---------|-----------|----------|
| 滿 $60,000 | $600 | $400 | **$1,000** |

---

## 📊 最高回贈計算

| 獎賞 | 金額 |
|------|------|
| 獎賞一（兩階段） | $1,400 |
| 獎賞二（兩階段） | $400 |
| 獎賞三 | $1,000 |
| **合計** | **$2,800** |

---

## 💡 攻略提示（以 Travel+ 卡去日本為例）

同一階段同一個月內簽 $8,000 日元：

| 項目 | 回贈 |
|------|------|
| 冬日簽賬賞（Visa卡$8k） | $250 |
| 網上/外幣額外（$5k） | $200 |
| Travel+ 本身 7% 回贈 | $560 |
| **合計** | **$1,010** |

即 **12.6%** 回贈！

---

## ❌ 不合資格簽賬

- 恒生 e-Banking 網上繳費
- 交稅
- 所有保險公司簽賬
- **Alipay 及 WeChat Pay 簽賬**
- 八達通自動增值
- 電子錢包簽賬/增值
- 購買禮券
- 分期付款

---

## ⚠️ 特別注意

- 一經登記「豐澤購物激賞」，2025年12月1日至31日於**豐澤**的簽賬將**不計入**本推廣
- 回贈將於 **2026年5月** 入賬
- 必須透過恒生 App **+FUN Centre** 登記

---

## 📝 登記方法

1. 下載恒生個人流動理財 App
2. 進入 +FUN Centre
3. 選擇「冬日簽賬賞」優惠
4. 完成登記
`,
  },
  {
    id: "wewa-dining-2025",
    title: "WeWa 卡本地餐飲優惠 - 全港食肆高達 10% 現金回贈",
    merchant: "全港食肆",
    description: "12月限定！憑 WeWa 卡實體卡於全港食肆簽賬，單一簽賬滿 $100 即享 10% 現金回贈！全期額外回贈上限 $500，即可簽約 $5,200！",
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop",
    expiryDate: "2025-12-31",
    relatedCardIds: ["wewa-unionpay"],
    tags: ["餐飲", "WeWa", "安信", "10%回贈", "需登記"],
    url: "https://www.primecredit.com/",
    content: \`## 📅 推廣期

**2025年12月1日 至 2025年12月31日**

---

## 💰 回贈詳情

| 支付方式 | 優惠回贈 | 玩樂類別 | 基本回贈 | **合計** |
|---------|---------|---------|---------|----------|
| **實體卡** | 9.6% | 0% | 0.4% | **10%** |
| **指定手機支付** | 6% | 高達 3.6% | 0.4% | **高達 10%** |

---

## 📊 回贈上限

- 全期額外回贈上限：**$500**
- 即可簽約 **$5,209**（實體卡 9.6% 計）
- 單一簽賬需滿 **$100**

---

## ✅ 指定手機支付

- Apple Pay
- 銀聯手機閃付（OmyCard App）
- 銀聯二維碼支付（OmyCard App）

---

## ❌ 不合資格簽賬

- 酒席宴會、私人宴會、筵席、包場派對、私房菜
- 蛋糕/麵包店
- 酒店/美食廣場/超級市場/百貨公司/俱樂部及會所內之食肆
- 酒吧、飲食專櫃
- **網上美食平台、外賣平台**
- 購買現金券、繳交按金

---

## 📱 登記方法

1. 下載 **OmyCard App**
2. 登入後選擇本優惠
3. 完成登記
4. 用實體卡或指定手機支付消費即享優惠

---

## 💡 攻略提示

- **實體卡回贈最高**！用實體卡比手機支付多 3.6%
- 單筆滿 $100 即可，小額消費也計
- 配合 WeWa 玩樂類別「手機支付」自選，手機支付也能達 10%
- 回贈將於 **2026年3月31日前**入賬
- 如持有多張 WeWa 卡，簽賬會合併計算
\`,
  },
];
