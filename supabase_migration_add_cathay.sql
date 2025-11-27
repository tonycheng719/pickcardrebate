-- Add Cathay Pacific Merchant
INSERT INTO public.merchants (id, name, "categoryIds", aliases, "accentColor", "isGeneral")
VALUES (
  'cathay-pacific', 
  '國泰航空 Cathay Pacific', 
  ARRAY['travel'], 
  ARRAY['cx', 'cathay', '國泰', 'cathay pacific'], 
  '#006564', 
  false
)
ON CONFLICT (id) DO UPDATE 
SET 
  name = EXCLUDED.name,
  "categoryIds" = EXCLUDED."categoryIds",
  aliases = EXCLUDED.aliases,
  "accentColor" = EXCLUDED."accentColor";

-- Add HK Express Merchant (Often related)
INSERT INTO public.merchants (id, name, "categoryIds", aliases, "accentColor", "isGeneral")
VALUES (
  'hk-express', 
  '香港快運 HK Express', 
  ARRAY['travel'], 
  ARRAY['uo', 'hkexpress', '快運', 'hk express'], 
  '#6a3077', 
  false
)
ON CONFLICT (id) DO UPDATE 
SET 
  name = EXCLUDED.name,
  "categoryIds" = EXCLUDED."categoryIds",
  aliases = EXCLUDED.aliases,
  "accentColor" = EXCLUDED."accentColor";

NOTIFY pgrst, 'reload schema';

