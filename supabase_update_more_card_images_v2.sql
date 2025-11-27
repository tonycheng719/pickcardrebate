-- 更新更多信用卡圖片
-- 請在 Supabase SQL Editor 中執行此腳本

UPDATE public.cards SET image_url = CASE id
    -- DBS
    WHEN 'dbs-eminent-visa' THEN 'https://www.dbs.com.hk/personal/credit-cards/credit-cards/eminent-card/images/card_face_eminent_visa_signature.png'
    WHEN 'dbs-black' THEN 'https://www.dbs.com.hk/personal/credit-cards/credit-cards/black-card/images/card_face_black_world_master.png'
    WHEN 'dbs-live-fresh' THEN 'https://www.dbs.com.hk/personal/credit-cards/credit-cards/live-fresh-card/images/card_face_live_fresh.png'
    WHEN 'dbs-compass-visa' THEN 'https://www.dbs.com.hk/personal/credit-cards/credit-cards/compass-visa/images/card_face_compass_visa.png'
    
    -- Citi
    WHEN 'citi-premiermiles' THEN 'https://www.citibank.com.hk/chinese/credit-cards/images/premiermiles-card.png'
    WHEN 'citi-rewards' THEN 'https://www.citibank.com.hk/chinese/credit-cards/images/rewards-card.png'
    WHEN 'citi-cashback' THEN 'https://www.citibank.com.hk/chinese/credit-cards/images/cash-back-card.png'
    WHEN 'citi-octopus' THEN 'https://www.citibank.com.hk/chinese/credit-cards/images/octopus-card.png'
    WHEN 'citi-prestige' THEN 'https://www.citibank.com.hk/chinese/credit-cards/images/prestige-card.png'
    
    -- SC
    WHEN 'sc-smart' THEN 'https://av.sc.com/hk/content/images/hk-smart-card-masthead-400x255.png'
    WHEN 'sc-cathay' THEN 'https://av.sc.com/hk/content/images/hk-cathay-mastercard-masthead-400x255.png'
    WHEN 'sc-simply-cash' THEN 'https://av.sc.com/hk/content/images/hk-simply-cash-visa-card-masthead-400x255.png'
    
    -- Hang Seng
    WHEN 'hang-seng-mmpower' THEN 'https://www.hangseng.com/content/dam/hase/config/personal/credit-cards/mmpower-card/images/mmpower-card-face.png'
    WHEN 'hang-seng-enjoy' THEN 'https://www.hangseng.com/content/dam/hase/config/personal/credit-cards/enjoy-card/images/enjoy-card-face.png'
    WHEN 'hang-seng-travel-plus' THEN 'https://www.hangseng.com/content/dam/hase/config/personal/credit-cards/travel-plus-card/images/travel-plus-card-face.png'
    
    -- BOC
    WHEN 'boc-chill' THEN 'https://www.bochk.com/dam/more/creditcard/chill/chill_card_face.png'
    WHEN 'boc-sogo' THEN 'https://www.bochk.com/dam/more/creditcard/sogo/sogo_visa_signature_card_face.png'
    WHEN 'boc-cheers' THEN 'https://www.bochk.com/dam/more/creditcard/cheers/cheers_visa_infinite_card_face.png'
    WHEN 'boc-gba' THEN 'https://www.bochk.com/dam/more/creditcard/gba/gba_diamond_card_face.png'
    WHEN 'boc-icard' THEN 'https://www.bochk.com/dam/more/creditcard/icard/icard_card_face.png'
    
    -- AEON
    WHEN 'aeon-wakuwaku' THEN 'https://www.aeon.com.hk/wakuwaku/images/card_face.png'
    WHEN 'aeon-card-jal' THEN 'https://www.aeon.com.hk/tc/privileges/promotion_images/jal_mastercard_card_face.png'
    
    -- PrimeCredit
    WHEN 'wewa-unionpay' THEN 'https://www.wewacard.com/images/card_face.png'
    WHEN 'earnmore-unionpay' THEN 'https://www.primecredit.com/credit-card/images/earnmore_card_face.png'
    
    -- Fubon
    WHEN 'fubon-platinum' THEN 'https://www.fubonbank.com.hk/web/html/cc_platinum_card_face.png'
    
    ELSE image_url
END
WHERE id IN (
    'dbs-eminent-visa', 'dbs-black', 'dbs-live-fresh', 'dbs-compass-visa',
    'citi-premiermiles', 'citi-rewards', 'citi-cashback', 'citi-octopus', 'citi-prestige',
    'sc-smart', 'sc-cathay', 'sc-simply-cash',
    'hang-seng-mmpower', 'hang-seng-enjoy', 'hang-seng-travel-plus',
    'boc-chill', 'boc-sogo', 'boc-cheers', 'boc-gba', 'boc-icard',
    'aeon-wakuwaku', 'aeon-card-jal',
    'wewa-unionpay', 'earnmore-unionpay',
    'fubon-platinum'
);

