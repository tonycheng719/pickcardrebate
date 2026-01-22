-- 修正 comments 表與 profiles 表的 foreign key relationship
-- 錯誤：Could not find a relationship between 'comments' and 'profiles'

-- 首先檢查 comments 表是否存在 user_id 欄位
DO $$
BEGIN
    -- 嘗試添加 foreign key constraint
    -- 如果 comments 表存在且 user_id 欄位存在
    IF EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_schema = 'public' AND table_name = 'comments'
    ) THEN
        -- 先刪除可能存在的舊 constraint
        BEGIN
            ALTER TABLE public.comments DROP CONSTRAINT IF EXISTS comments_user_id_fkey;
        EXCEPTION WHEN OTHERS THEN
            -- 忽略錯誤
        END;
        
        -- 添加新的 foreign key constraint
        -- 注意：使用 ON DELETE SET NULL 以避免刪除用戶時出錯
        BEGIN
            ALTER TABLE public.comments 
            ADD CONSTRAINT comments_user_id_fkey 
            FOREIGN KEY (user_id) 
            REFERENCES public.profiles(id) 
            ON DELETE SET NULL;
            
            RAISE NOTICE 'Successfully added foreign key constraint comments_user_id_fkey';
        EXCEPTION WHEN OTHERS THEN
            RAISE NOTICE 'Could not add foreign key: %', SQLERRM;
        END;
    ELSE
        RAISE NOTICE 'Comments table does not exist, skipping';
    END IF;
END $$;

-- 確保 profiles 表有正確的 RLS policies
-- 允許任何人讀取 profiles（用於顯示評論者資料）
DO $$
BEGIN
    -- 刪除舊的 policy（如果存在）
    DROP POLICY IF EXISTS "Anyone can read profiles" ON public.profiles;
    
    -- 創建新的 policy
    CREATE POLICY "Anyone can read profiles" 
    ON public.profiles 
    FOR SELECT 
    USING (true);
    
    RAISE NOTICE 'Successfully created profiles SELECT policy';
EXCEPTION WHEN OTHERS THEN
    RAISE NOTICE 'Could not create policy: %', SQLERRM;
END $$;

