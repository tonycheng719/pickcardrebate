-- 1. Add reward_config column to cards table
ALTER TABLE public.cards 
ADD COLUMN IF NOT EXISTS reward_config JSONB DEFAULT '{}'::jsonb;

-- 2. Update data for popular miles cards

-- HSBC Visa Signature
-- System: RewardCash (RC)
-- Conversion: 1 RC = 10 Miles (Avios/Asia Miles)
UPDATE public.cards
SET reward_config = '{
    "currency": "RC",
    "ratio": 10,
    "method": "conversion"
}'::jsonb
WHERE id = 'hsbc-vs';

-- HSBC EveryMile
-- System: RewardCash (RC)
-- Conversion: 1 RC = 20 Miles (Special rate for EveryMile)
UPDATE public.cards
SET reward_config = '{
    "currency": "RC",
    "ratio": 20,
    "method": "conversion"
}'::jsonb
WHERE id = 'hsbc-everymile';

-- Standard Chartered Cathay Mastercard
-- System: Asia Miles (Direct)
-- Note: Since this card earns miles directly, we might need to adjust how rules are stored later.
-- But for now, we can set a "virtual" ratio if we convert % to equivalent value, or just mark it as direct.
-- Let's assume we will add "miles_rate" to rules later. For now, just config.
UPDATE public.cards
SET reward_config = '{
    "currency": "AM",
    "method": "direct"
}'::jsonb
WHERE id = 'sc-cathay';

-- DBS Black World Mastercard
-- System: DBS$
-- Conversion: DBS$48 = 1000 Miles => $1 = 20.83 Miles? No, usually DBS$1 = 1 Mile for Black card?
-- Wait, DBS Black is DBS$48 = 1000 miles. So 1 DBS$ = 20.83 Miles.
UPDATE public.cards
SET reward_config = '{
    "currency": "DBS$",
    "ratio": 20.83, 
    "method": "conversion"
}'::jsonb
WHERE id = 'dbs-black';

-- Citi Prestige
-- System: Citi Points
-- Conversion: 12 Points = 1 Mile
UPDATE public.cards
SET reward_config = '{
    "currency": "Points",
    "ratio": 0.0833, 
    "method": "conversion"
}'::jsonb
WHERE id = 'citi-prestige';

-- Notify to reload schema
NOTIFY pgrst, 'reload schema';



