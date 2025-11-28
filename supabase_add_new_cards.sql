-- Add new cards to the cards table
-- Run this in Supabase SQL Editor

INSERT INTO public.cards (id, name, bank, style, foreign_currency_fee, reward_config, rules, tags, selling_points, updated_at)
VALUES 
  -- Citi 八達通白金卡
  (
    'citi-octopus',
    'Citi 八達通白金卡',
    'Citi',
    '{"bgColor": "bg-gradient-to-br from-orange-500 to-orange-700", "textColor": "text-white"}'::jsonb,
    1.95,
    NULL,
    '[{"description": "八達通自動增值 0.5%", "matchType": "paymentMethod", "matchValue": ["octopus"], "percentage": 0.5}, {"description": "基本回饋 0.4%", "matchType": "base", "percentage": 0.4}]'::jsonb,
    ARRAY['八達通', '交通'],
    ARRAY['內置八達通功能', '自動增值 0.5% 回贈', '方便日常交通消費'],
    NOW()
  ),
  -- 建行(亞洲) TRAVO Mastercard
  (
    'ccb-travo',
    '建行(亞洲) TRAVO Mastercard',
    '建行(亞洲)',
    '{"bgColor": "bg-gradient-to-br from-sky-600 to-blue-800", "textColor": "text-white"}'::jsonb,
    0,
    '{"method": "direct_rate", "baseRate": 6, "currency": "AM"}'::jsonb,
    '[{"description": "海外/內地簽賬 4%", "matchType": "category", "matchValue": ["foreign"], "percentage": 4.0, "isForeignCurrency": true}, {"description": "本地餐飲 2%", "matchType": "category", "matchValue": ["dining"], "percentage": 2.0}, {"description": "基本回饋 0.4%", "matchType": "base", "percentage": 0.4}]'::jsonb,
    ARRAY['旅遊4%', '餐飲2%', '免外幣手續費'],
    ARRAY['海外及內地簽賬 4% 回贈 (或 $1.5=1里)', '本地餐飲 2% 回贈 (或 $3=1里)', '免外幣手續費', '送旅遊保險'],
    NOW()
  ),
  -- 東亞 World Mastercard
  (
    'bea-world',
    '東亞 World Mastercard',
    '東亞銀行',
    '{"bgColor": "bg-gradient-to-br from-slate-800 to-slate-950", "textColor": "text-white"}'::jsonb,
    1.95,
    '{"method": "direct_rate", "baseRate": 5, "currency": "Miles"}'::jsonb,
    '[{"description": "海外簽賬 $5=1里", "matchType": "category", "matchValue": ["foreign"], "percentage": 2.0, "isForeignCurrency": true}, {"description": "本地簽賬 $5=1里", "matchType": "base", "percentage": 2.0}]'::jsonb,
    ARRAY['里數卡', '高端卡'],
    ARRAY['本地及海外簽賬 $5=1里', '機場貴賓室', '旅遊保險'],
    NOW()
  ),
  -- 大新 My Auto 信用卡
  (
    'dahsing-myauto',
    '大新 My Auto 信用卡',
    '大新銀行',
    '{"bgColor": "bg-gradient-to-br from-blue-600 to-blue-800", "textColor": "text-white"}'::jsonb,
    1.95,
    NULL,
    '[{"description": "油站 4%", "matchType": "category", "matchValue": ["petrol"], "percentage": 4.0}, {"description": "汽車相關 4%", "matchType": "merchant", "matchValue": ["shell", "esso", "caltex", "sinopec"], "percentage": 4.0}, {"description": "基本回饋 0.4%", "matchType": "base", "percentage": 0.4}]'::jsonb,
    ARRAY['油站4%', '汽車'],
    ARRAY['油站簽賬 4% 回贈', '汽車相關消費優惠', '專為車主而設'],
    NOW()
  ),
  -- 大新 ONE+ 白金卡
  (
    'dahsing-one-plus',
    '大新 ONE+ 白金卡',
    '大新銀行',
    '{"bgColor": "bg-gradient-to-br from-red-600 to-red-800", "textColor": "text-white"}'::jsonb,
    1.95,
    NULL,
    '[{"description": "所有簽賬 1%", "matchType": "base", "percentage": 1.0}]'::jsonb,
    ARRAY['全方位1%', '簡單'],
    ARRAY['所有簽賬 1% 現金回贈', '無上限', '簡單易用'],
    NOW()
  )
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  bank = EXCLUDED.bank,
  style = EXCLUDED.style,
  foreign_currency_fee = EXCLUDED.foreign_currency_fee,
  reward_config = EXCLUDED.reward_config,
  rules = EXCLUDED.rules,
  tags = EXCLUDED.tags,
  selling_points = EXCLUDED.selling_points,
  updated_at = NOW();

-- Notify PostgREST to reload schema
NOTIFY pgrst, 'reload schema';

