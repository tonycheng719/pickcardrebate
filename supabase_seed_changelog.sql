-- 1. 確保表存在 (如果尚未執行 setup 腳本)
CREATE TABLE IF NOT EXISTS public.system_changelogs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    version TEXT NOT NULL,
    release_date DATE NOT NULL DEFAULT CURRENT_DATE,
    title TEXT NOT NULL,
    content TEXT,
    type TEXT CHECK (type IN ('feature', 'fix', 'improvement', 'maintenance')) DEFAULT 'feature',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    created_by UUID REFERENCES auth.users(id)
);

ALTER TABLE public.system_changelogs DISABLE ROW LEVEL SECURITY;
GRANT ALL ON public.system_changelogs TO anon, authenticated, service_role;

-- 2. 插入第一篇更新日誌 (v1.1.0)
INSERT INTO public.system_changelogs (version, release_date, title, type, content)
VALUES (
    'v1.1.0',
    CURRENT_DATE,
    '系統全面修復與里數功能升級 (System Overhaul & Miles Upgrade)',
    'feature',
    '**核心架構修復**
- 🚀 **API Route 升級**: 後台管理系統 (Dashboard, Analytics, Moderation) 全面改用 Server-side API，徹底解決 RLS 權限導致的「無限載入」與數據讀取失敗問題。
- 🛡️ **權限優化**: 實施 Service Role 存取模式，確保管理員操作不受前端權限限制干擾。

**里數與信用卡數據**
- ✈️ **里數計算升級**: 修正 SC Cathay, Citi Prestige, Amex Explorer 等卡片的里數兌換率 (Reward Config)，現在能準確顯示「$2/里」、「$4/里」等直接回贈。
- 💳 **數據庫擴充**: 更新大量信用卡 (BEA, EarnMORE, WeWa) 的回贈規則與圖片，並修正現金與里數的轉換邏輯。

**功能與體驗**
- 🖼️ **圖片上傳系統**: 啟用 Supabase Storage，管理員現可直接在後台上傳信用卡與商戶圖片，解決外部連結失效問題。
- 📝 **回報系統修復**: 修復前端「回報錯誤」功能，新增 `rating` 欄位支援，並加入「里數錯誤」回報類型。
- 🛒 **網上商戶優化**: 新增 `is_online_only` 標記，針對 Klook, Deliveroo 等純網上商戶自動鎖定網購場景。
- 📜 **更新日誌**: 新增此系統日誌功能，追蹤版本迭代。'
);

