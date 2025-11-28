-- 更新信用卡圖片 (以 HSBC Visa Signature 為例)
-- 由於大部分銀行官網圖片網址不穩定，建議使用穩定的圖床或手動上傳
-- MoneyHero 圖片網址 (驗證有效)

UPDATE public.cards 
SET "imageUrl" = 'https://mhgprod.blob.core.windows.net/moneyhero/strapi-uploads/HSBC_Visa_Signature_Card_774a722fef.jpg'
WHERE id = 'hsbc-visa-signature';

-- 這裡預留其他常見卡的更新語句，您可以自行填入找到的網址
-- UPDATE public.cards SET "imageUrl" = '...' WHERE id = 'hsbc-everymile';
-- UPDATE public.cards SET "imageUrl" = '...' WHERE id = 'hsbc-red';
-- UPDATE public.cards SET "imageUrl" = '...' WHERE id = 'mmpower';
-- UPDATE public.cards SET "imageUrl" = '...' WHERE id = 'wakuwaku';
-- UPDATE public.cards SET "imageUrl" = '...' WHERE id = 'earnmore';
-- UPDATE public.cards SET "imageUrl" = '...' WHERE id = 'sc-smart';
-- UPDATE public.cards SET "imageUrl" = '...' WHERE id = 'dbs-eminent';
-- UPDATE public.cards SET "imageUrl" = '...' WHERE id = 'boc-chill';
-- UPDATE public.cards SET "imageUrl" = '...' WHERE id = 'citi-rewards';

-- 刷新 Schema Cache 以確保前台立即更新
NOTIFY pgrst, 'reload schema';



