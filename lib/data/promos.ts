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
    description: "憑 HSBC 信用卡於百老滙簽賬，累積滿 $10,000 可享高達 6% 回贈（上限 $900）；銀聯卡更可享 8%（上限 $1,000）！單一簽賬需滿 $500。",
    imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
    expiryDate: "2026-02-28",
    relatedCardIds: ["hsbc-vs", "hsbc-red", "hsbc-everymile", "hsbc-pulse"],
    tags: ["購物", "電器", "HSBC", "需登記"],
    url: "https://www.hsbc.com.hk/zh-hk/credit-cards/rewards/red-hot/",
    content: `## 優惠詳情

### 推廣期
2025年12月1日至2026年2月28日

### 合資格簽賬
於百老滙以合資格信用卡單一簽賬淨額滿港幣 $500 的交易

### 回贈比率

#### HSBC 信用卡
| 累積合資格簽賬 | 額外「獎賞錢」回贈 | 上限 |
|---------------|-------------------|------|
| 滿 $3,000 或以上 | 3% | $100 |
| 滿 $6,000 或以上 | 5% | $400 |
| 滿 $10,000 或以上 | 6% | $900 |

#### HSBC 銀聯信用卡
| 累積合資格簽賬 | 額外「獎賞錢」回贈 | 上限 |
|---------------|-------------------|------|
| 滿 $3,000 至 $5,999 | 3% | $100 |
| 滿 $6,000 至 $9,999 | 6% | $500 |
| 滿 $10,000 或以上 | 8% | $1,000 |

### 重要條款
- 登記須於簽賬前進行，而登記前之合資格簽賬將不獲計算
- 須透過滙豐 Reward+ 應用程式登記
- 最紅冬日賞 – 專有簽賬獎賞只適用於特選信用卡持卡人
- 指定貨品低至 5 折優惠
`,
  },
];
