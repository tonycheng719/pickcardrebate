-- Migration to add Miles configuration for more point-based cards

-- 1. HSBC Red
-- $1 RC = 10 Miles (Standard rate without Premier/EveryMile/VS privilege usually)
-- Actually, VS/Premier have better rates or allow transfer to more partners. 
-- Red users can transfer to Avios/Asia Miles at 1 RC = 10 Miles standard rate.
-- Reward Rate: 4% = $4 RC = 40 Miles / $100 = $2.5/Mile.
UPDATE public.cards
SET reward_config = '{"method": "conversion", "ratio": 10, "currency": "RC"}'
WHERE id = 'hsbc-red';

-- 2. HSBC Pulse (RC)
UPDATE public.cards
SET reward_config = '{"method": "conversion", "ratio": 10, "currency": "RC"}'
WHERE id = 'hsbc-pulse';

-- 3. HSBC Premier (RC)
-- Premier often allows 1 RC = 15 Miles or better for Avios? Or same 1:10?
-- Let's stick to 1:10 safe default, user can override if we build that feature.
UPDATE public.cards
SET reward_config = '{"method": "conversion", "ratio": 10, "currency": "RC"}'
WHERE id = 'hsbc-premier';

-- 4. BOC Chill (Points)
-- Standard BOC: 15 Points = 1 Mile.
-- Chill: 5% = 50X? No, Chill rules usually say "up to 5% cash rebate equivalent".
-- But underlying it is points? Actually Chill is marketed as Cash Rebate often.
-- But if it earns points: 1 Point = ?
-- Let's check: BOC Chill earns Gift Points.
-- Rate: $1 = 1 Point. 
-- 5% category = Extra points? Or direct cash?
-- "Chill Card entitles you to... 5% Cash Rebate". It might be direct cash.
-- If it's direct cash, we CANNOT convert to miles easily unless they allow Cash->Miles.
-- BOC allows Points->Miles. 
-- Wait, BOC Chill is "Cash Rebate" centered. 
-- If user insists on seeing Miles for a Cash card, we can simulate: "$1 Cash = 10 Miles" (market rate)?
-- No, that's misleading.
-- Let's assume ONLY cards that natively support Miles redemption should show Miles.
-- BOC Cheers IS a Miles card (10X Points).
-- BOC i-card (10X Points).

-- 5. BOC Cheers
-- 10X Points = 4%. $1 = 10 Points.
-- Conversion: 15 Points = 1 Mile (Standard) or 12 Points = 1 Mile (Infinite)?
-- Cheers VI: 8 Points = 1 Mile.
-- 10X = 10 Points / $1.
-- Miles = 10 / 8 = 1.25 Miles / $1.
-- $/Mile = 1 / 1.25 = $0.8/Mile.
-- 4% Cash equivalent.
UPDATE public.cards
SET reward_config = '{"method": "conversion", "ratio": 0.125, "currency": "Points"}' 
-- Ratio logic: Miles = RewardAmount * Ratio.
-- Here RewardAmount is calculated as "Percentage" (4.0).
-- If 4.0 means 4000 Points? No, 4.0 means $4 value.
-- If 4% = $4. How many miles is $4 value of points?
-- 4% = 10X Points. $100 -> 1000 Points.
-- 1000 Points / 8 = 125 Miles.
-- RewardAmount (4.0) * X = 125.
-- X = 31.25.
-- So Ratio should be 31.25.
-- Let's re-verify.
-- Spend $100. Reward = $4 (4%). 
-- Real Reward = 1000 Points.
-- Miles = 125.
-- 125 Miles / $100 = 1.25 Miles/$.
-- $0.8/Mile.
-- Calculator: rewardAmount = 4.
-- milesReturn = amount / (rewardAmount * ratio).
-- milesReturn = 100 / (4 * ratio) = 0.8.
-- 4 * ratio = 125.
-- ratio = 31.25.
WHERE id = 'boc-cheers';

-- 6. BOC i-card
-- 10X Points = 4%. 15 Points = 1 Mile.
-- $100 -> 1000 Points -> 1000/15 = 66.66 Miles.
-- $/Mile = 100 / 66.66 = $1.5/Mile.
-- Calculator: rewardAmount = 4.
-- Target milesReturn = 1.5.
-- 1.5 = 100 / (4 * ratio).
-- 6 * ratio = 100.
-- ratio = 16.66.
UPDATE public.cards
SET reward_config = '{"method": "conversion", "ratio": 16.6666, "currency": "Points"}'
WHERE id = 'boc-icard';

-- 7. Citi Rewards
-- 5X Points = 2%. (Standard 1X, Bonus 4X).
-- $100 -> 500 Points.
-- Conversion: Varies. 15 Points = 1 Mile? Or worse for Rewards?
-- It says "Points never expire".
-- Let's assume 15 Points = 1 Mile.
-- 500 / 15 = 33.33 Miles.
-- $/Mile = 100 / 33.33 = $3/Mile.
-- Calculator: rewardAmount = 2.
-- Target 3.
-- 3 = 100 / (2 * ratio).
-- 6 * ratio = 100.
-- ratio = 16.66.
UPDATE public.cards
SET reward_config = '{"method": "conversion", "ratio": 16.6666, "currency": "Points"}'
WHERE id = 'citi-rewards';

-- 8. Citi Cash Back
-- Pure Cash. Keep as is.

-- 9. SC Smart
-- Pure Cash. Keep as is.

NOTIFY pgrst, 'reload schema';

