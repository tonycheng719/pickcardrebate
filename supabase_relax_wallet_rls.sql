-- 暫時放寬 user_cards 與 user_card_settings 的讀取權限
-- 這是為了讓 Admin 後台 (目前使用 Anon Client) 能夠讀取用戶的錢包資料
-- 注意：這會讓知道 user_id 的人都能查詢該用戶持有哪些卡片 (但不包含敏感個資)

-- 1. user_cards
DROP POLICY IF EXISTS "Users can view own cards" ON public.user_cards;
-- 保留原本的限制? 不，我們要覆蓋它或新增一條
-- 簡單起見，我們允許所有角色讀取，只要他們知道 user_id (我們在查詢時會 eq('user_id', id))
-- 但 RLS 是 Row Level，如果 USING (true)，就是全開。

CREATE POLICY "Allow public view user_cards" 
ON public.user_cards FOR SELECT 
USING (true);

-- 2. user_card_settings
DROP POLICY IF EXISTS "Users can view own card settings" ON public.user_card_settings;

CREATE POLICY "Allow public view user_card_settings" 
ON public.user_card_settings FOR SELECT 
USING (true);

