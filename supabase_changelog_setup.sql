-- 建立系統更新日誌表
CREATE TABLE IF NOT EXISTS public.system_changelogs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    version TEXT NOT NULL, -- e.g. "v1.2.0"
    release_date DATE NOT NULL DEFAULT CURRENT_DATE,
    title TEXT NOT NULL, -- e.g. "修復回報系統與後台權限"
    content TEXT, -- 詳細內容 (支援 Markdown 或換行)
    type TEXT CHECK (type IN ('feature', 'fix', 'improvement', 'maintenance')) DEFAULT 'feature',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    created_by UUID REFERENCES auth.users(id)
);

-- 禁用 RLS 以配合 API Route 模式 (最穩妥)
ALTER TABLE public.system_changelogs DISABLE ROW LEVEL SECURITY;

-- 賦予權限
GRANT ALL ON public.system_changelogs TO anon, authenticated, service_role;



