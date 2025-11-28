-- Migration to configure Miles rewards for more cards

-- 1. SC Cathay Mastercard
-- Strategy: Keep percentage relatively high for display, use ratio ~16.666
-- $4/Mile (1.5%) -> 1.5 * 16.666 = 25 Miles / $100 = 0.25 Miles/$ -> $4/Mile.
-- $6/Mile (1.0%) -> 1.0 * 16.666 = 16.66 Miles / $100 -> $6/Mile.
-- $2/Mile (3.0%) -> 3.0 * 16.666 = 50 Miles / $100 -> $2/Mile.
UPDATE public.cards
SET 
  reward_config = '{"method": "conversion", "ratio": 16.6666, "currency": "AM"}',
  rules = jsonb_build_array(
    jsonb_build_object('description', '國泰/HK Express 簽賬 $2/里', 'matchType', 'merchant', 'matchValue', jsonb_build_array('cathay', 'hkexpress'), 'percentage', 3.0),
    jsonb_build_object('description', '餐飲/外賣/網上 $4/里', 'matchType', 'category', 'matchValue', jsonb_build_array('dining', 'online'), 'percentage', 1.5),
    jsonb_build_object('description', '基本回饋 $6/里', 'matchType', 'base', 'percentage', 1.0, 'excludeCategories', jsonb_build_array('tax', 'utilities', 'government', 'insurance'), 'excludePaymentMethods', jsonb_build_array('fps'))
  )
WHERE id = 'sc-cathay';

-- 2. DBS Black World Mastercard
-- Strategy: Use real DBS$ rates (0.8% and 1.2%) and accurate ratio (20.833)
-- Local 0.8% * 20.833 = 16.66 Miles/$100 = $6/Mile
-- Overseas 1.2% * 20.833 = 25 Miles/$100 = $4/Mile
UPDATE public.cards
SET 
  reward_config = '{"method": "conversion", "ratio": 20.8333, "currency": "DBS$"}',
  rules = jsonb_build_array(
    jsonb_build_object('description', '外幣簽賬 $4/里', 'matchType', 'base', 'percentage', 1.2, 'isForeignCurrency', true),
    jsonb_build_object('description', '本地簽賬 $6/里', 'matchType', 'base', 'percentage', 0.8, 'excludeCategories', jsonb_build_array('tax', 'utilities', 'government', 'insurance'), 'excludePaymentMethods', jsonb_build_array('fps'))
  )
WHERE id = 'dbs-black';

-- 3. Citi PremierMiles
-- Strategy: Ratio 10. 
-- $3/Mile -> 3.33%
-- $4/Mile -> 2.5%
-- $8/Mile -> 1.25%
UPDATE public.cards
SET 
  reward_config = '{"method": "conversion", "ratio": 10, "currency": "Points"}',
  rules = jsonb_build_array(
    jsonb_build_object('description', '外幣簽賬 $4/里', 'matchType', 'base', 'percentage', 2.5, 'isForeignCurrency', true),
    jsonb_build_object('description', '本地簽賬 $8/里', 'matchType', 'base', 'percentage', 1.25, 'excludeCategories', jsonb_build_array('tax', 'utilities', 'government', 'insurance'), 'excludePaymentMethods', jsonb_build_array('fps'))
  )
WHERE id = 'citi-premiermiles';

-- 4. Citi Prestige (Confirming Update)
-- $6/Mile -> 1.67% (Ratio 10 -> 16.7 Miles/$100 -> $5.98/Mile)
-- $4/Mile -> 2.5% (Ratio 10 -> 25 Miles/$100 -> $4/Mile)
UPDATE public.cards
SET 
  reward_config = '{"method": "conversion", "ratio": 10, "currency": "Points"}',
  rules = jsonb_build_array(
    jsonb_build_object('description', '海外簽賬 $4/里', 'matchType', 'base', 'percentage', 2.5, 'isForeignCurrency', true),
    jsonb_build_object('description', '本地簽賬 $6/里', 'matchType', 'base', 'percentage', 1.67, 'excludeCategories', jsonb_build_array('tax', 'utilities', 'government', 'insurance'), 'excludePaymentMethods', jsonb_build_array('fps'))
  )
WHERE id = 'citi-prestige';

-- 5. AEON Card JAL
-- Strategy: Ratio 12.5
-- $6/Mile -> 1.33% (1.33 * 12.5 = 16.625 -> $6.01)
-- $8/Mile -> 1.0% (1.0 * 12.5 = 12.5 -> $8)
UPDATE public.cards
SET 
  reward_config = '{"method": "conversion", "ratio": 12.5, "currency": "JAL"}',
  rules = jsonb_build_array(
    jsonb_build_object('description', '日本簽賬 $6/里', 'matchType', 'base', 'percentage', 1.33, 'isForeignCurrency', true),
    jsonb_build_object('description', '本地餐飲/海外 $8/里', 'matchType', 'category', 'matchValue', jsonb_build_array('dining'), 'percentage', 1.0),
    jsonb_build_object('description', '基本回饋 $8/里', 'matchType', 'base', 'percentage', 1.0, 'excludeCategories', jsonb_build_array('tax', 'utilities', 'government', 'insurance'), 'excludePaymentMethods', jsonb_build_array('fps'))
  )
WHERE id = 'aeon-card-jal';

-- 6. Amex Explorer
-- Strategy: Ratio 20 (Assumes 1% cash = 20 Miles)
-- $3/Mile -> 1.67%
-- $4/Mile -> 1.25% (Assuming new standard is $4 not $3.6 for generic foreign)
-- $5/Mile -> 1.0%
UPDATE public.cards
SET 
  reward_config = '{"method": "conversion", "ratio": 20, "currency": "Points"}',
  rules = jsonb_build_array(
    jsonb_build_object('description', '指定簽賬 $3/里', 'matchType', 'category', 'matchValue', jsonb_build_array('online', 'travel', 'airline'), 'percentage', 1.67, 'excludeCategories', jsonb_build_array('ewallet')),
    jsonb_build_object('description', '外幣簽賬 $4/里', 'matchType', 'base', 'percentage', 1.25, 'isForeignCurrency', true),
    jsonb_build_object('description', '本地簽賬 $5/里', 'matchType', 'base', 'percentage', 1.0, 'excludeCategories', jsonb_build_array('tax', 'utilities', 'government', 'insurance'), 'excludePaymentMethods', jsonb_build_array('fps'))
  )
WHERE id = 'amex-explorer';

-- 7. Dah Sing BA (British Airways)
-- Strategy: Direct Avios. 
-- $6/Avios (1.5% in old) -> 1.5 * X = 16.66 (100/6) -> X = 11.11
-- $4/Avios (2.5% in old) -> 2.5 * 11.11 = 27.77 (100/3.6) -> Close to $4
-- Let's use Ratio 11.1111
-- $6/Mile -> 1.5% -> 16.66 Miles -> $6
-- $4/Mile -> 2.25% -> 25 Miles -> $4
UPDATE public.cards
SET 
  reward_config = '{"method": "conversion", "ratio": 11.1111, "currency": "Avios"}',
  rules = jsonb_build_array(
    jsonb_build_object('description', '本地簽賬 $6/Avios', 'matchType', 'base', 'percentage', 1.5, 'excludeCategories', jsonb_build_array('tax', 'utilities', 'government', 'insurance'), 'excludePaymentMethods', jsonb_build_array('fps')),
    jsonb_build_object('description', '海外簽賬 $4/Avios', 'matchType', 'base', 'percentage', 2.25, 'isForeignCurrency', true)
  )
WHERE id = 'dahsing-ba';

NOTIFY pgrst, 'reload schema';



