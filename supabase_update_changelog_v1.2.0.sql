-- 新增更新日誌：記賬與消費分析功能
INSERT INTO public.system_changelogs (version, release_date, title, type, content)
VALUES (
    'v1.2.0',
    CURRENT_DATE,
    '推出記賬與消費分析功能 (Transaction Ledger & Analytics)',
    'feature',
    '**個人財務管理 (PFM) 核心功能上線**

**前端功能**
- 💰 **一鍵記賬 (One-Click Record)**: 在信用卡計算機的結果頁面，現在可以直接點擊「一鍵記賬」，將計算結果（商戶、金額、回贈）存入個人賬本。
- 📊 **錢包儀表板 (Wallet Dashboard)**: 「我的錢包」頁面新增數據儀表板，即時展示本月總支出 (Total Spending) 與預估總回贈 (Total Rewards)。
- 📝 **消費記錄查看**: 用戶可在錢包中查看詳細的記賬歷史。

**後台管理**
- 👤 **會員消費追蹤**: 管理員現在可以在會員詳情頁 (`/admin/users/[id]`) 查看該會員的完整消費記錄，深入了解用戶行為與偏好。

**技術優化**
- 🔄 **交易數據 API**: 建立 `/api/user/transactions`，提供穩定且安全的記賬數據存取接口。
- 📱 **UI 優化**: 優化了錢包頁面的排版，並為計算機結果添加了加載狀態與防重複提交機制。'
);

