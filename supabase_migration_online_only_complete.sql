-- 1. 確保 is_online_only 欄位存在
ALTER TABLE public.merchants ADD COLUMN IF NOT EXISTS is_online_only BOOLEAN DEFAULT FALSE;

-- 2. 批量更新現有商戶為纯網上
UPDATE public.merchants 
SET is_online_only = TRUE 
WHERE id IN (
    'general-online',
    'hktvmall',
    'deliveroo',
    'foodpanda',
    'keeta',
    'klook',
    'kkday',
    'trip-com',
    'agoda',
    'booking-com',
    'uber',
    'netflix',
    'spotify',
    'disney-plus',
    'cathay-pacific',
    'hk-express',
    'ird',
    'clp',
    'towngas',
    'payme',
    'alipayhk',
    'wechat-pay-hk'
);

-- 3. 插入常用的純網上商戶 (如果不存在)
-- 這些商戶在前端可能還未定義 logo/color，但在後端先準備好
INSERT INTO public.merchants (id, name, category_ids, aliases, logo, accent_color, is_online_only)
VALUES
('kkday', 'KKday', '{"travel", "online"}', '{"kkday"}', '🎫', '#22d3ee', TRUE),
('trip-com', 'Trip.com', '{"travel", "online"}', '{"trip", "携程"}', '✈️', '#2563eb', TRUE),
('agoda', 'Agoda', '{"travel", "online"}', '{"agoda"}', '🏨', '#14b8a6', TRUE),
('booking-com', 'Booking.com', '{"travel", "online"}', '{"booking", "booking.com"}', '🏨', '#1d4ed8', TRUE),
('uber', 'Uber', '{"transport", "online"}', '{"uber", "的士"}', '🚗', '#000000', TRUE),
('netflix', 'Netflix', '{"entertainment", "online"}', '{"netflix", "網飛"}', '🎬', '#dc2626', TRUE),
('spotify', 'Spotify', '{"entertainment", "online"}', '{"spotify"}', '🎵', '#16a34a', TRUE),
('disney-plus', 'Disney+', '{"entertainment", "online"}', '{"disney", "disney+"}', '🏰', '#2563eb', TRUE),
('towngas', 'Towngas 煤氣', '{"utilities", "online"}', '{"煤氣", "towngas"}', '🔥', '#ea580c', TRUE),
('wechat-pay-hk', 'WeChat Pay HK', '{"ewallet", "online"}', '{"wechat", "微信支付"}', '💬', '#16a34a', TRUE)
ON CONFLICT (id) DO UPDATE 
SET is_online_only = TRUE;

