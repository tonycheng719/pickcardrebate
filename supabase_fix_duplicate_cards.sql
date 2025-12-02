-- Fix duplicate cards in database
-- Run this in Supabase SQL Editor

-- Delete the duplicate 'bea-world' card (keep 'bea-world-master' which is BEA Flyer World Mastercard)
-- The 'bea-world' was incorrectly added as "東亞 World Mastercard" but we already have 'bea-world-mastercard' with same data
DELETE FROM public.cards WHERE id = 'bea-world';

-- Also clean up any user_cards referencing deleted card
DELETE FROM public.user_cards WHERE card_id = 'bea-world';

-- Check if there are other duplicates with similar names
-- SELECT id, name, bank FROM public.cards WHERE name LIKE '%東亞%World%' OR name LIKE '%BEA%World%';

-- Notify PostgREST to reload schema
NOTIFY pgrst, 'reload schema';

