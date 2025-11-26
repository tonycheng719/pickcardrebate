-- 更新更多信用卡圖片
-- 圖片來源主要參考 MoneyHero 的公開資源，請注意版權

-- HSBC Red
UPDATE public.cards SET "imageUrl" = 'https://www.hsbc.com.hk/content/dam/hsbc/hk/images/credit-cards/red-credit-card-en.png' WHERE id = 'hsbc-red';
-- (備用) UPDATE public.cards SET "imageUrl" = 'https://mhgprod.blob.core.windows.net/moneyhero/strapi-uploads/blt01c6ac63487924bd_21cb85603d.png' WHERE id = 'hsbc-red';

-- HSBC EveryMile
UPDATE public.cards SET "imageUrl" = 'https://www.hsbc.com.hk/content/dam/hsbc/hk/images/credit-cards/everymile-credit-card-en.png' WHERE id = 'hsbc-everymile';
-- (備用) UPDATE public.cards SET "imageUrl" = 'https://mhgprod.blob.core.windows.net/moneyhero/strapi-uploads/blt9b8547ce5695eb36_5674128ef6.png' WHERE id = 'hsbc-everymile';

-- Hang Seng MMPOWER
UPDATE public.cards SET "imageUrl" = 'https://www.hangseng.com/content/dam/hase/config/personal/cards/products/images/mmpower-card-face.png' WHERE id = 'hangseng-mmpower';

-- SC Smart
UPDATE public.cards SET "imageUrl" = 'https://www.sc.com/hk/zh/credit-cards/smart/smart-card-face.png' WHERE id = 'sc-smart';

-- BOC Chill
UPDATE public.cards SET "imageUrl" = 'https://www.bochk.com/dam/boccreditcard/chillcard/images/card_face.png' WHERE id = 'boc-chill';

-- DBS Eminent (Visa Signature)
UPDATE public.cards SET "imageUrl" = 'https://www.dbs.com.hk/personal/credit-cards/eminent-card/images/card_face_vs.png' WHERE id = 'dbs-eminent';

-- DBS Black World Mastercard
UPDATE public.cards SET "imageUrl" = 'https://www.dbs.com.hk/personal/credit-cards/black-card/images/card_face_black.png' WHERE id = 'dbs-black';

-- Citi Rewards
UPDATE public.cards SET "imageUrl" = 'https://www.citibank.com.hk/chinese/credit-cards/images/rewards-card.png' WHERE id = 'citi-rewards';

-- Citi Cash Back
UPDATE public.cards SET "imageUrl" = 'https://www.citibank.com.hk/chinese/credit-cards/images/cash-back-card.png' WHERE id = 'citi-cashback';

-- AEON Wakuwaku
UPDATE public.cards SET "imageUrl" = 'https://www.aeon.com.hk/r/creditcard/cardface/wakuwaku_cardface.png' WHERE id = 'aeon-wakuwaku';

-- EarnMORE
UPDATE public.cards SET "imageUrl" = 'https://www.wewacard.com/contents/uploads/2016/07/EM_cardface_v2.png' WHERE id = 'earnmore';

-- WeWa
UPDATE public.cards SET "imageUrl" = 'https://www.wewacard.com/contents/uploads/2016/07/WeWa_cardface_v2.png' WHERE id = 'wewa-unionpay';

-- Mox
UPDATE public.cards SET "imageUrl" = 'https://mox.com/images/cards/mox-card-black-front.png' WHERE id = 'mox-credit';

-- 刷新 Schema Cache
NOTIFY pgrst, 'reload schema';

