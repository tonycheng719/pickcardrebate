-- 確保 anon 角色有權限操作 user_cards 和 user_card_settings
-- 這是為了配合 API Route 使用 Anon Client 進行寫入 (如果沒有 Service Key)

GRANT INSERT, UPDATE, DELETE ON public.user_cards TO anon;
GRANT INSERT, UPDATE, DELETE ON public.user_card_settings TO anon;

-- 同時確保 RLS 政策允許 anon 進行寫入 (因為我們之前可能只設了 SELECT 權限給 public)
-- 這裡我們放寬限制，依賴 API Route 的 userId 校驗

DROP POLICY IF EXISTS "Allow public write user_cards" ON public.user_cards;
CREATE POLICY "Allow public write user_cards" ON public.user_cards FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update user_cards" ON public.user_cards FOR UPDATE USING (true);
CREATE POLICY "Allow public delete user_cards" ON public.user_cards FOR DELETE USING (true);

DROP POLICY IF EXISTS "Allow public write user_card_settings" ON public.user_card_settings;
CREATE POLICY "Allow public write user_card_settings" ON public.user_card_settings FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update user_card_settings" ON public.user_card_settings FOR UPDATE USING (true);
CREATE POLICY "Allow public delete user_card_settings" ON public.user_card_settings FOR DELETE USING (true);

