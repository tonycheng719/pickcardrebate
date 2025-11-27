-- 修正後的更新信用卡圖片 SQL
-- 欄位名稱必須是 image_url (snake_case)

-- SC Smart Card
UPDATE public.cards 
SET image_url = 'https://av.sc.com/hk/content/images/hk-smart-card-masthead-400x255.png'
WHERE id = 'sc-smart';

-- Hang Seng MMPOWER
UPDATE public.cards 
SET image_url = 'https://mhgprod.blob.core.windows.net/moneyhero/strapi-uploads/blt01c6ac63487924bd_21cb85603d.png'
WHERE id = 'hangseng-mmpower';

-- EarnMORE
UPDATE public.cards 
SET image_url = 'https://mhgprod.blob.core.windows.net/moneyhero/strapi-uploads/68_01_JNHYA_6_PDHB_9_F53_EJCHWHCTDH_16a90fe0a8.png'
WHERE id = 'earnmore';

-- AEON WAKUWAKU
UPDATE public.cards 
SET image_url = 'https://mhgprod.blob.core.windows.net/moneyhero/strapi-uploads/blt6404429f0179dbba_0bc13b65f2.png'
WHERE id = 'aeon-wakuwaku';

-- HSBC Visa Signature (以防您還沒更新成功)
UPDATE public.cards 
SET image_url = 'https://mhgprod.blob.core.windows.net/moneyhero/strapi-uploads/HSBC_Visa_Signature_Card_774a722fef.jpg'
WHERE id = 'hsbc-vs';

-- 刷新 Schema Cache
NOTIFY pgrst, 'reload schema';

