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
    content: `
> 📅 **推廣期**｜2025年12月1日 至 2026年2月28日
>
> 🛒 **合資格簽賬**｜百老滙門市或網店，單一簽賬滿 **$500**

&nbsp;

## 💰 一般 HSBC 信用卡回贈

&nbsp;

| 累積簽賬 | 回贈率 | 回贈上限 |
|:--------:|:------:|:--------:|
| $3,000+ | 3% | $100 |
| $6,000+ | 5% | $400 |
| **$10,000+** | **6%** | **$900** |

&nbsp;

## 💳 HSBC 銀聯卡回贈 🔥

> 用 **HSBC Pulse 銀聯雙幣卡** 回贈更高！

&nbsp;

| 累積簽賬 | 回贈率 | 回贈上限 |
|:--------:|:------:|:--------:|
| $3,000 - $5,999 | 3% | $100 |
| $6,000 - $9,999 | 6% | $500 |
| **$10,000+** | **8%** 🔥 | **$1,000** |

&nbsp;

## ⚠️ 必睇重點

&nbsp;

- ✅ 須透過 **Reward+ App** 登記
- ✅ **登記後**的簽賬才計算
- ✅ 指定貨品低至 **5 折**
- ❌ 附屬卡持有人如無基本卡不能享優惠

&nbsp;

## 💡 識玩攻略

&nbsp;

| 攻略 | 說明 |
|:----:|:-----|
| 🥇 | 有 HSBC Pulse 銀聯卡就用銀聯卡，8% 最高！ |
| 🎯 | 買電器前記得先登記 |
| 🎁 | 可以同時賺迎新獎賞 |
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
    content: `
> 📅 **推廣期**
>
> 🇨🇳🇲🇴🇹🇼 內地/澳門/台灣｜2025/7/1 - 2026/1/31
>
> 🇰🇷 韓國｜2025/12/1 - 2026/1/31

&nbsp;

## 💰 回贈一覽

&nbsp;

| 地區 | 回贈率 | 每月上限 | 每月可簽 |
|:----:|:------:|:--------:|:--------:|
| 🇨🇳 內地 | **6%** | $100 | $1,667 |
| 🇲🇴 澳門 | **6%** | $100 | $1,667 |
| 🇹🇼 台灣 | **6%** | $100 | $1,667 |
| 🇰🇷 韓國 | **6%** | **$200** 🔥 | **$3,333** |

&nbsp;

> 💡 **無最低簽賬要求**！買杯咖啡都有 6%！

&nbsp;

## ✅ 可以點俾錢？

&nbsp;

| 支付方式 | 可用？ |
|:--------:|:------:|
| 實體卡拍卡 | ✅ |
| Apple Pay | ✅ |
| 銀聯 QR Pay | ✅ |
| 雲閃付 App | ✅ |
| 微信支付 | ❌ |
| 支付寶/AlipayHK | ❌ |

&nbsp;

## 📱 點樣登記？

&nbsp;

1️⃣ 下載「**AEON 香港**」App

2️⃣ 登入後揀「賞」亞洲優惠

3️⃣ 每張銀聯卡要**獨立登記**

4️⃣ 登記後簽賬即享！

&nbsp;

## 💡 識玩攻略

&nbsp;

| 攻略 | 說明 |
|:----:|:-----|
| 🇰🇷 | 去韓國旅遊首選！每月上限 $200 最高 |
| 💰 | 銀聯免外幣手續費，6% 係實賺！ |
| 📅 | 積分 2026 年 2 月入賬 |
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
    content: `
> 📅 **推廣期**｜2025/12/1 - 2026/2/28
>
> 🛒 **適用商戶**｜衛訊門市（包括聯營店）及網店

&nbsp;

## 💰 一扣即享回贈

&nbsp;

| 單一簽賬 | 回贈金額 | 回贈率 |
|:--------:|:--------:|:------:|
| 滿 **$3,500** | $100 | 2.86% |
| 滿 **$8,000** | **$320** 🔥 | **4%** |

&nbsp;

> ⚠️ 每月只可享**其中一個**優惠一次
>
> 💵 全期最多賺 **$960**（3個月 x $320）

&nbsp;

## 📱 點樣拎優惠？

&nbsp;

1️⃣ 下載 **DBS Card+ App**

2️⃣ 設定 → 推送通知 → 開啟「**一扣即享**」

3️⃣ 去衛訊簽賬

4️⃣ 返 App 撳紅色「**一扣即享**」按鈕

&nbsp;

> ⏰ **死線**｜2026/3/15 23:59 前要撳掣！

&nbsp;

## ✅ 俾錢方式

&nbsp;

| 支付方式 | 可用？ |
|:--------:|:------:|
| 實體卡 | ✅ |
| Apple Pay | ✅ |
| Google Pay | ✅ |
| Samsung Pay | ✅ |
| 其他電子錢包 | ❌ |
| 現金券 | ❌ |

&nbsp;

## 🎁 額外著數

&nbsp;

- 📦 精選貨品低至 **55 折**
- 💳 分期付款可享 **$100** 手續費回贈

&nbsp;

## 💡 識玩攻略

&nbsp;

| 攻略 | 說明 |
|:----:|:-----|
| 🎯 | 簽 $8,000 最抵，4% 回贈！ |
| 🍽️ | 買完電器用 DBS Eminent 食飯，再賺 5%！ |
| ⚡ | 名額先到先得，早買早享受 |
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
    content: `
> 📅 **推廣期**
>
> 📍 **階段1**｜2025/12/1 - 2026/1/14
>
> 📍 **階段2**｜2026/1/15 - 2026/2/28

&nbsp;

## 💰 獎賞一：累積簽賬（每階段）

&nbsp;

| 累積簽賬 | 一般 | Visa卡額外 | 合計 |
|:--------:|:----:|:----------:|:----:|
| $8,000+ | $150 | $100 | **$250** |
| $15,000+ | $500 | $200 | **$700** 🔥 |

&nbsp;

> 💵 兩階段合共最高 **$1,400**

&nbsp;

## 🌏 獎賞二：網上/外幣（每階段）

&nbsp;

> ⚠️ 要先達到獎賞一門檻（簽夠 $8,000）

&nbsp;

| 網上/外幣簽賬 | 一般 | Visa卡額外 | 合計 |
|:------------:|:----:|:----------:|:----:|
| $5,000+ | $100 | $100 | **$200** |

&nbsp;

> 💵 兩階段合共最高 **$400**

&nbsp;

## 🎯 獎賞三：全期終極獎

&nbsp;

| 全期累積 | 一般 | Visa卡額外 | 合計 |
|:--------:|:----:|:----------:|:----:|
| $60,000+ | $600 | $400 | **$1,000** 🔥 |

&nbsp;

## 📊 最高回贈

&nbsp;

| 獎賞 | 金額 |
|:----:|:----:|
| 獎賞一 x 2 | $1,400 |
| 獎賞二 x 2 | $400 |
| 獎賞三 | $1,000 |
| **總計** | **$2,800** 🎉 |

&nbsp;

## 💡 實戰例子：Travel+ 去日本

&nbsp;

> 同一階段簽 $8,000 日元

&nbsp;

| 項目 | 回贈 |
|:-----|:----:|
| 冬日簽賬賞（$8k） | $250 |
| 網上/外幣額外（$5k） | $200 |
| Travel+ 本身 7% | $560 |
| **總計** | **$1,010** |

&nbsp;

> 🔥 即係 **12.6%** 回贈！

&nbsp;

## ❌ 唔計邊啲？

&nbsp;

- 網上繳費、交稅、保險
- **Alipay / WeChat Pay**
- 八達通增值、電子錢包
- 購買禮券、分期

&nbsp;

## ⚠️ 注意事項

&nbsp;

- 📱 須透過恒生 App **+FUN Centre** 登記
- 🎁 回贈 **2026年5月** 入賬
- 🏪 登記咗「豐澤購物激賞」，12月豐澤簽賬唔計！
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
    content: `
> 📅 **推廣期**｜2025/12/1 - 12/31（只限12月！）
>
> 🍽️ **適用商戶**｜全港食肆（單筆滿 $100）

&nbsp;

## 💰 回贈一覽

&nbsp;

| 支付方式 | 優惠 | 玩樂 | 基本 | 合計 |
|:--------:|:----:|:----:|:----:|:----:|
| 🪪 **實體卡** | 9.6% | 0% | 0.4% | **10%** 🔥 |
| 📱 **手機支付** | 6% | 3.6% | 0.4% | **10%** |

&nbsp;

> 💡 **實體卡拍卡最著數**！唔使揀玩樂類別都有 10%！

&nbsp;

## 📊 回贈上限

&nbsp;

| 上限 | 金額 |
|:----:|:----:|
| 額外回贈上限 | **$500** |
| 即可簽 | **$5,209** |
| 單筆最低 | $100 |

&nbsp;

## ✅ 手機支付方式

&nbsp;

| 支付方式 | 可用？ |
|:--------:|:------:|
| Apple Pay | ✅ |
| 銀聯手機閃付 | ✅ |
| 銀聯 QR Code | ✅ |

&nbsp;

## ❌ 唔計邊啲餐廳？

&nbsp;

- 🍰 蛋糕/麵包店
- 🏨 酒店/美食廣場/百貨內食肆
- 🍺 酒吧
- 🎉 酒席宴會/包場派對
- 📱 **外賣平台（Deliveroo/foodpanda 等）**

&nbsp;

## 📱 點登記？

&nbsp;

1️⃣ 下載 **OmyCard App**

2️⃣ 揀本優惠登記

3️⃣ 用實體卡或手機支付俾錢

&nbsp;

## 💡 識玩攻略

&nbsp;

| 攻略 | 說明 |
|:----:|:-----|
| 🪪 | 帶實體卡出街食飯，10% 最實際！ |
| 💰 | 12 月限定，把握機會！ |
| 📅 | 回贈 2026/3/31 前入賬 |
`,
  },
];
