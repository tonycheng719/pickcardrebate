-- 批量插入或更新所有常用商戶
-- 請在 Supabase SQL Editor 中執行此腳本以修復商戶消失的問題

INSERT INTO public.merchants (id, name, category_ids, aliases, logo, accent_color, is_general, is_online_only)
VALUES
-- 一般商戶
('general-dining', '一般餐廳 / 食肆', '{"dining"}', '{"餐廳", "食肆", "restaurant"}', '🍽️', '#f59e0b', TRUE, FALSE),
('general-supermarket', '一般超市', '{"supermarket"}', '{"超市", "supermarket"}', '🛒', '#16a34a', TRUE, FALSE),
('general-online', '一般網上簽賬', '{"online"}', '{"網購", "online"}', '🌐', '#3b82f6', TRUE, TRUE),
('general-travel', '一般旅遊 / 外幣', '{"travel"}', '{"旅遊", "travel", "外幣"}', '✈️', '#8b5cf6', TRUE, FALSE),
('general-other', '其他商戶 / 實體店', '{"other"}', '{"其他"}', '🏪', '#6b7280', TRUE, FALSE),

-- 具體商戶 (實體/混合)
('wellcome', 'Wellcome 惠康', '{"supermarket"}', '{"wellcome", "惠康", "marketplace", "3hreesixty"}', '🛒', '#f97316', FALSE, FALSE),
('parknshop', 'PARKnSHOP 百佳', '{"supermarket"}', '{"pns", "百佳", "fusion", "taste", "international"}', '🅿️', '#2563eb', FALSE, FALSE),
('yata', 'YATA 一田', '{"supermarket", "department_store"}', '{"yata", "一田"}', '🥬', '#16a34a', FALSE, FALSE),
('759', '759 阿信屋', '{"supermarket"}', '{"759", "阿信屋"}', '7️⃣', '#f43f5e', FALSE, FALSE),
('donki', 'Don Don Donki', '{"supermarket"}', '{"donki", "唐吉訶德"}', '🐧', '#facc15', FALSE, FALSE),
('mannings', 'Mannings 萬寧', '{"personal_care", "supermarket"}', '{"mannings", "萬寧"}', '🧴', '#fb923c', FALSE, FALSE),
('watsons', 'Watsons 屈臣氏', '{"personal_care", "supermarket"}', '{"watsons", "屈臣氏"}', '💊', '#0ea5e9', FALSE, FALSE),
('maxims', 'Maxim''s Group 美心集團', '{"dining"}', '{"美心", "maxims", "翠園", "美心皇宮", "潮江春", "北京樓", "美心MX", "can.teen"}', '🍱', '#f59e0b', FALSE, FALSE),
('mcdonalds', 'McDonald''s 麥當勞', '{"dining"}', '{"mcd", "麥記", "老麥", "mcdonald"}', '🍔', '#fbbf24', FALSE, FALSE),
('kmb', 'KMB 九巴', '{"transport"}', '{"bus", "巴士", "kmb"}', '🚌', '#dc2626', FALSE, FALSE),
('apple', 'Apple Store', '{"electronics", "online"}', '{"iphone", "macbook", "apple", "ipad"}', '🍎', '#111827', FALSE, FALSE),
('sogo', 'SOGO 崇光', '{"department_store"}', '{"sogo", "崇光"}', '🛍️', '#2563eb', FALSE, FALSE),

-- 純網上商戶
('hktvmall', 'HKTVmall', '{"online", "supermarket"}', '{"hktv", "王維基"}', '📺', '#65a30d', FALSE, TRUE),
('deliveroo', 'Deliveroo 戶戶送', '{"dining", "online"}', '{"外賣", "deliveroo"}', '🛵', '#06b6d4', FALSE, TRUE),
('foodpanda', 'foodpanda', '{"dining", "online"}', '{"熊貓", "foodpanda"}', '🐼', '#ec4899', FALSE, TRUE),
('keeta', 'KeeTa', '{"dining", "online"}', '{"keeta", "美團"}', '🦅', '#facc15', FALSE, TRUE),
('ird', 'Inland Revenue Department 稅務局', '{"tax", "government"}', '{"稅", "交稅", "ird", "tax"}', '📄', '#4b5563', FALSE, TRUE),
('clp', 'CLP 中電', '{"utilities"}', '{"電費", "中電", "clp"}', '⚡️', '#2563eb', FALSE, TRUE),
('payme', 'PayMe', '{"ewallet"}', '{"payme", "增值"}', '💖', '#ec4899', FALSE, TRUE),
('alipayhk', 'AlipayHK', '{"ewallet"}', '{"支付寶", "alipay"}', '💠', '#0284c7', FALSE, TRUE),
('klook', 'Klook', '{"travel", "online"}', '{"klook"}', '🎟️', '#ff5b00', FALSE, TRUE),
('cathay-pacific', '國泰航空 Cathay Pacific', '{"travel"}', '{"cx", "cathay", "國泰", "cathay pacific"}', '✈️', '#006564', FALSE, TRUE),
('hk-express', '香港快運 HK Express', '{"travel"}', '{"uo", "hkexpress", "快運", "hk express"}', '✈️', '#6a3077', FALSE, TRUE),
('kkday', 'KKday', '{"travel", "online"}', '{"kkday"}', '🎫', '#22d3ee', FALSE, TRUE),
('trip-com', 'Trip.com', '{"travel", "online"}', '{"trip", "携程"}', '✈️', '#2563eb', FALSE, TRUE),
('agoda', 'Agoda', '{"travel", "online"}', '{"agoda"}', '🏨', '#14b8a6', FALSE, TRUE),
('booking-com', 'Booking.com', '{"travel", "online"}', '{"booking", "booking.com"}', '🏨', '#1d4ed8', FALSE, TRUE),
('uber', 'Uber', '{"transport", "online"}', '{"uber", "的士"}', '🚗', '#000000', FALSE, TRUE),
('netflix', 'Netflix', '{"entertainment", "online"}', '{"netflix", "網飛"}', '🎬', '#dc2626', FALSE, TRUE),
('spotify', 'Spotify', '{"entertainment", "online"}', '{"spotify"}', '🎵', '#16a34a', FALSE, TRUE),
('disney-plus', 'Disney+', '{"entertainment", "online"}', '{"disney", "disney+"}', '🏰', '#2563eb', FALSE, TRUE),
('towngas', 'Towngas 煤氣', '{"utilities", "online"}', '{"煤氣", "towngas"}', '🔥', '#ea580c', FALSE, TRUE),
('wechat-pay-hk', 'WeChat Pay HK', '{"ewallet", "online"}', '{"wechat", "微信支付"}', '💬', '#16a34a', FALSE, TRUE)

ON CONFLICT (id) DO UPDATE SET
    name = EXCLUDED.name,
    category_ids = EXCLUDED.category_ids,
    aliases = EXCLUDED.aliases,
    logo = EXCLUDED.logo,
    accent_color = EXCLUDED.accent_color,
    is_general = EXCLUDED.is_general,
    is_online_only = EXCLUDED.is_online_only;

