-- Add is_online_only column to merchants table
ALTER TABLE public.merchants 
ADD COLUMN IF NOT EXISTS is_online_only BOOLEAN DEFAULT FALSE;

-- Update popular online merchants
UPDATE public.merchants
SET is_online_only = TRUE
WHERE id IN (
  'general-online',
  'hktvmall',
  'deliveroo',
  'foodpanda',
  'keeta',
  'klook',
  'cathay-pacific',
  'hk-express',
  'apple',
  'ird', -- Tax is usually online
  'clp', -- Utilities usually online/autopay
  'payme',
  'alipayhk'
);



