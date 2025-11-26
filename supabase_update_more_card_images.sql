-- 更新其他信用卡圖片
-- SC Smart Card
UPDATE public.cards 
SET "imageUrl" = 'https://av.sc.com/hk/content/images/hk-smart-card-masthead-400x255.png'
WHERE id = 'sc-smart';

-- Hang Seng MMPOWER (MoneyHero 連結)
UPDATE public.cards 
SET "imageUrl" = 'https://mhgprod.blob.core.windows.net/moneyhero/strapi-uploads/blt01c6ac63487924bd_21cb85603d.png'
WHERE id = 'hangseng-mmpower';

-- EarnMORE (MoneyHero 連結)
UPDATE public.cards 
SET "imageUrl" = 'https://mhgprod.blob.core.windows.net/moneyhero/strapi-uploads/68_01_JNHYA_6_PDHB_9_F53_EJCHWHCTDH_16a90fe0a8.png'
WHERE id = 'earnmore';

-- AEON WAKUWAKU (MoneyHero 連結)
UPDATE public.cards 
SET "imageUrl" = 'https://mhgprod.blob.core.windows.net/moneyhero/strapi-uploads/blt6404429f0179dbba_0bc13b65f2.png'
WHERE id = 'aeon-wakuwaku';

-- 刷新 Schema Cache
NOTIFY pgrst, 'reload schema';

