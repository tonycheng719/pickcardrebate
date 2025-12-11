-- v1.5.0 更新日誌 (2025-12-11)

-- 新功能：合作夥伴模式開關
INSERT INTO system_changelogs (version, title, type, content, release_date)
VALUES (
  'v1.5.0',
  '合作夥伴模式開關',
  'feature',
  '新增全局配置 `PARTNER_MODE_ENABLED`，可切換使用官方銀行連結或合作夥伴連結。

主要更新：
- 分開 `officialApplyUrl`（官方）和 `applyUrl`（合作夥伴）
- 為 70 張信用卡添加官方銀行申請連結
- 分開統計 `click_apply_official` / `click_apply_partner` 事件

配置方式：
修改 `lib/config.ts` 中的 `PARTNER_MODE_ENABLED`：
- `false`：使用官方銀行連結
- `true`：使用合作夥伴連結（如 MoneyHero）',
  '2025-12-11'
);

-- 改進：優化排行榜布局
INSERT INTO system_changelogs (version, title, type, content, release_date)
VALUES (
  'v1.5.0',
  '優化排行榜卡片布局',
  'improvement',
  '排行榜詳細分析區域的卡片布局更加緊湊，高度減少約 50%。

改進內容：
- 減少 padding 和間距
- 統計數據整合成一行
- 條件和注意事項合併為 tags
- 按鈕文字精簡',
  '2025-12-11'
);

-- 改進：旅遊排行榜支援更多卡片
INSERT INTO system_changelogs (version, title, type, content, release_date)
VALUES (
  'v1.5.0',
  '旅遊排行榜擴展',
  'improvement',
  '旅遊信用卡排行榜現在支援更多卡片（從 3 張增加到 10+ 張）。

新增卡片：
- BOC Cheers: 酒店/旅遊 4%
- SC Cathay: 酒店/旅遊 $4/里
- Hang Seng Travel+: 旅遊 5%
- Citi PremierMiles/Prestige: 旅遊 2.25-2.5%
- DBS Black: 旅遊 2.5%',
  '2025-12-11'
);

