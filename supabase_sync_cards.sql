-- =====================================================
-- Supabase Credit Cards Sync Script
-- 將前台 cards.ts 嘅所有信用卡同步到數據庫
-- 執行方式：在 Supabase SQL Editor 執行此 script
-- =====================================================

-- 使用 UPSERT (INSERT ... ON CONFLICT) 確保不會重複
-- 只更新 name, bank, tags, selling_points, welcome_offer_text, fee_waiver_condition, apply_url, foreign_currency_fee
-- 保留現有嘅 image_url (因為可能係用戶上傳嘅自定義圖片)

-- ========== HSBC 滙豐 (7 張) ==========
INSERT INTO cards (id, name, bank, tags, selling_points, welcome_offer_text, fee_waiver_condition, apply_url, foreign_currency_fee)
VALUES 
  ('hsbc-vs', 'HSBC Visa Signature', 'HSBC', 
   ARRAY['餐飲神卡', '最紅自主獎賞', '6X積分', '需登記'],
   ARRAY['最紅自主獎賞 6X (2.4%)，5大類別自由分配', '首 $100,000 簽賬享額外獎賞', '首兩年免年費'],
   '迎新簽 $8,000 送 $600-$800 獎賞錢 (首60日內)',
   '首兩年免年費',
   'https://www.hsbc.com.hk/zh-hk/credit-cards/products/visa-signature/',
   1.95),
   
  ('hsbc-red', 'HSBC Red Credit Card', 'HSBC',
   ARRAY['網購神卡', '永久免年費', '指定商戶8%'],
   ARRAY['指定商戶 8% (壽司郎/譚仔/GU/Decathlon/lululemon)', '網上簽賬 4% (每月首$10,000)', '永久免年費'],
   '迎新簽 $3,000 送 $300 獎賞錢 (首60日)',
   '永久免年費',
   'https://www.hsbc.com.hk/zh-hk/credit-cards/products/red/',
   1.95),
   
  ('hsbc-everymile', 'HSBC EveryMile', 'HSBC',
   ARRAY['旅遊神卡', '交通$2/里', 'Lounge'],
   ARRAY['指定日常簽賬低至 HK$2/里', '免費環亞機場貴賓室', '首兩年免年費'],
   '迎新簽 $8,000 送 $600-$800 獎賞錢 (首60日內)',
   '首兩年免年費',
   'https://www.hsbc.com.hk/zh-hk/credit-cards/products/everymile/',
   1.95),
   
  ('hsbc-pulse', 'HSBC Pulse 銀聯雙幣卡', 'HSBC',
   ARRAY['北上消費', '銀聯', '免手續費', '內地4.4%'],
   ARRAY['內地/澳門 QR Code/流動支付 4.4%', '免外幣手續費', '最紅自主獎賞'],
   '迎新簽 $8,000 送 $600-$800 獎賞錢 (首60日)',
   '首兩年免年費',
   'https://www.hsbc.com.hk/zh-hk/credit-cards/products/pulse/',
   0),
   
  ('hsbc-premier', 'HSBC Premier Mastercard', 'HSBC',
   ARRAY['頂級卡', 'Lounge', '旅遊保險'],
   ARRAY['環球機場貴賓室', '旅遊保障', '最紅自主獎賞'],
   '迎新簽 $8,000 送 $600-$800 獎賞錢 (首60日內)',
   '首兩年免年費',
   'https://www.hsbc.com.hk/zh-hk/credit-cards/products/premier/',
   1.95),
   
  ('hsbc-student', '滙豐滙財金卡 - 學生卡', 'HSBC',
   ARRAY['學生卡', '交學費', '永久免年費'],
   ARRAY['指定學院學費 2.4% 回贈', '永久免年費', '最紅自主獎賞'],
   '迎新簽 $2,000 送 $300 獎賞錢 (首60日)',
   '永久免年費',
   'https://www.hsbc.com.hk/zh-hk/credit-cards/products/gold/',
   1.95),
   
  ('hsbc-easy', 'HSBC Easy Card', 'HSBC',
   ARRAY['百佳', '屈臣氏', '豐澤', '易賞錢', '永久免年費'],
   ARRAY['百佳 92折 (2/12/22號)', '屈臣氏 92折 (8/18/28號)', '豐澤 95折 (每月10號)', '永久免年費'],
   '迎新一年「易賞錢」VIP 會籍 (6倍積分) + 簽賬獎賞',
   '永久免年費',
   'https://www.hsbc.com.hk/zh-hk/credit-cards/products/easy/',
   1.95)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  bank = EXCLUDED.bank,
  tags = EXCLUDED.tags,
  selling_points = EXCLUDED.selling_points,
  welcome_offer_text = EXCLUDED.welcome_offer_text,
  fee_waiver_condition = EXCLUDED.fee_waiver_condition,
  apply_url = EXCLUDED.apply_url,
  foreign_currency_fee = EXCLUDED.foreign_currency_fee,
  updated_at = NOW();

-- ========== 渣打 Standard Chartered (4 張) ==========
INSERT INTO cards (id, name, bank, tags, selling_points, welcome_offer_text, fee_waiver_condition, apply_url, foreign_currency_fee)
VALUES 
  ('sc-smart', '渣打 Smart 信用卡', '渣打',
   ARRAY['特約商戶5%', '需月簽$4000', '免外幣手續費'],
   ARRAY['特約商戶 5%', '免外幣手續費', '需月簽 $4,000'],
   '迎新簽 $3,500 送 $800 現金回贈 (首月內)',
   '首年免年費',
   'https://www.sc.com/hk/zh/credit-cards/smart/',
   0),
   
  ('sc-cathay', '渣打國泰 Mastercard', '渣打',
   ARRAY['國泰里數', '旅遊', 'Lounge'],
   ARRAY['本地簽賬 $6/里', '海外簽賬 $4/里', '免費機場貴賓室'],
   '迎新高達 60,000 里數',
   '首年免年費；優先理財/Premium理財/出糧客戶免年費',
   'https://www.sc.com/hk/zh/credit-cards/cathay/',
   1.95),
   
  ('sc-simply-cash', '渣打 Simply Cash Visa', '渣打',
   ARRAY['現金回贈', '1.5%回贈', '簡單'],
   ARRAY['本地簽賬 1.5%', '海外簽賬 2%', '永久免年費'],
   '迎新簽 $8,000 送 $600 現金回贈 (首2個月內)',
   '永久免年費',
   'https://www.sc.com/hk/zh/credit-cards/simply-cash/',
   1.95),
   
  ('sc-apoint', '渣打 A. Point Card', '渣打',
   ARRAY['Asia Miles', '積分'],
   ARRAY['簽賬賺取積分', '兌換 Asia Miles'],
   NULL,
   '首年免年費',
   'https://www.sc.com/hk/zh/credit-cards/',
   1.95)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  bank = EXCLUDED.bank,
  tags = EXCLUDED.tags,
  selling_points = EXCLUDED.selling_points,
  welcome_offer_text = EXCLUDED.welcome_offer_text,
  fee_waiver_condition = EXCLUDED.fee_waiver_condition,
  apply_url = EXCLUDED.apply_url,
  foreign_currency_fee = EXCLUDED.foreign_currency_fee,
  updated_at = NOW();

-- ========== 中銀 BOC (6 張) ==========
INSERT INTO cards (id, name, bank, tags, selling_points, welcome_offer_text, fee_waiver_condition, apply_url, foreign_currency_fee)
VALUES 
  ('boc-chill', 'BOC Chill World Mastercard', '中銀',
   ARRAY['Chill商戶10%', '網購5%', '需月簽$3000'],
   ARRAY['Chill 商戶 10%', '海外及網上簽賬 5%', '需月簽 $3,000'],
   '迎新簽 $5,000 送 $500 現金回贈 (World) / 簽 $3,000 送 $300 (Platinum)',
   '首年免年費',
   'https://www.bochk.com/tc/creditcard/products/chill.html',
   1.95),
   
  ('boc-sogo', 'BOC SOGO Visa Signature', '中銀',
   ARRAY['SOGO', '週二優惠', '百貨'],
   ARRAY['SOGO 週二 5% 回贈', 'SOGO 簽賬優惠', '迎新送崇光禮券'],
   '迎新簽 $5,000 送 $500 崇光禮券 / 手機簽賬 10% (上限$300)',
   '首年免年費',
   'https://www.bochk.com/tc/creditcard/products/sogo.html',
   1.95),
   
  ('boc-cheers', 'BOC Cheers Visa Infinite', '中銀',
   ARRAY['旅遊', '里數', 'Lounge'],
   ARRAY['海外簽賬賺里數', '免費機場貴賓室', '旅遊保障'],
   '迎新簽 $12,000 送 225,000 積分 (私人財富客戶額外 +75,000)',
   '首年免年費',
   'https://www.bochk.com/tc/creditcard/products/cheers.html',
   1.95),
   
  ('boc-gba', 'BOC 大灣區一卡通', '中銀',
   ARRAY['大灣區', '人民幣', '跨境'],
   ARRAY['大灣區消費優惠', '人民幣結算', '跨境支付'],
   '迎新手機簽賬 10% 回贈 (上限$300)',
   '首年免年費',
   'https://www.bochk.com/tc/creditcard/products/gba.html',
   0),
   
  ('boc-icard', 'BOC i-card', '中銀',
   ARRAY['網購', '娛樂', '年輕人'],
   ARRAY['網購優惠', '娛樂簽賬優惠', '年輕人首選'],
   '迎新手機簽賬 10% 回贈 (上限$300)',
   '永久免年費',
   'https://www.bochk.com/tc/creditcard/products/icard.html',
   1.95),
   
  ('boc-taobao', '中銀淘寶 World 萬事達卡', '中銀',
   ARRAY['淘寶', '免外幣手續費', '網購'],
   ARRAY['淘寶簽賬優惠', '0% 淘寶手續費', '0% 海外簽賬手續費'],
   '迎新手機簽賬 10% 回贈 (上限$300)',
   '首年免年費',
   'https://www.bochk.com/tc/creditcard/products/taobao.html',
   0)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  bank = EXCLUDED.bank,
  tags = EXCLUDED.tags,
  selling_points = EXCLUDED.selling_points,
  welcome_offer_text = EXCLUDED.welcome_offer_text,
  fee_waiver_condition = EXCLUDED.fee_waiver_condition,
  apply_url = EXCLUDED.apply_url,
  foreign_currency_fee = EXCLUDED.foreign_currency_fee,
  updated_at = NOW();

-- ========== 恒生 Hang Seng (5 張) ==========
INSERT INTO cards (id, name, bank, tags, selling_points, welcome_offer_text, fee_waiver_condition, apply_url, foreign_currency_fee)
VALUES 
  ('hangseng-mmpower', '恒生 MMPOWER World Mastercard', '恒生',
   ARRAY['網購5%', '外幣5%', '需月簽$5000'],
   ARRAY['網上簽賬 5%', '外幣簽賬 5%', '需月簽 $5,000'],
   '迎新簽 $5,000 送 $700 +FUN Dollars (全新) / $300 (現有) / 簽 $2,000 送 $300 (學生) (首60日)',
   '首年免年費',
   'https://www.hangseng.com/zh-hk/personal/cards/credit-cards/mmpower/',
   1.95),
   
  ('hangseng-enjoy', '恒生 enJoy 卡', '恒生',
   ARRAY['yuu積分', '超市', '7-Eleven'],
   ARRAY['指定食肆 4X yuu積分', '惠康/萬寧/7-Eleven 3X yuu積分', '7-Eleven 95折'],
   NULL,
   '永久免年費',
   'https://www.hangseng.com/zh-hk/personal/cards/credit-cards/enjoy/',
   1.95),
   
  ('hangseng-travel-plus', '恒生 Travel+ Visa Signature', '恒生',
   ARRAY['旅遊', '外幣5%', '交通5%'],
   ARRAY['指定國家外幣簽賬 7%', '本地交通/餐飲 5%', '需月簽 $5,000'],
   NULL,
   '首年免年費',
   'https://www.hangseng.com/zh-hk/personal/cards/credit-cards/travel-plus/',
   1.95),
   
  ('hangseng-muji', '恒生 MUJI Card', '恒生',
   ARRAY['MUJI', '無印良品', '生活品味'],
   ARRAY['MUJI 簽賬優惠', '會員專屬折扣', '永久免年費'],
   NULL,
   '永久免年費',
   'https://www.hangseng.com/zh-hk/personal/cards/credit-cards/muji/',
   1.95),
   
  ('hangseng-platinum', '恒生白金卡', '恒生',
   ARRAY['基本卡', '入門'],
   ARRAY['基本回贈', '入門信用卡'],
   NULL,
   '首年免年費',
   'https://www.hangseng.com/zh-hk/personal/cards/credit-cards/',
   1.95)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  bank = EXCLUDED.bank,
  tags = EXCLUDED.tags,
  selling_points = EXCLUDED.selling_points,
  welcome_offer_text = EXCLUDED.welcome_offer_text,
  fee_waiver_condition = EXCLUDED.fee_waiver_condition,
  apply_url = EXCLUDED.apply_url,
  foreign_currency_fee = EXCLUDED.foreign_currency_fee,
  updated_at = NOW();

-- ========== Citi 花旗 (8 張) ==========
INSERT INTO cards (id, name, bank, tags, selling_points, welcome_offer_text, fee_waiver_condition, apply_url, foreign_currency_fee)
VALUES 
  ('citi-cashback', 'Citi Cash Back Card', 'Citi',
   ARRAY['餐飲2%', '現金回贈', '酒店2%'],
   ARRAY['本地餐飲 2%', '酒店簽賬 2%', '其他簽賬 1%'],
   '迎新簽 $5,000 送 $1,200 現金回贈 (首2個月內)',
   '首年免年費',
   'https://www.citibank.com.hk/chinese/credit-cards/citi-cash-back-card.html',
   1.95),
   
  ('citi-rewards', 'Citi Rewards 銀聯信用卡', 'Citi',
   ARRAY['超市', '百貨', '銀聯'],
   ARRAY['超市/百貨 3X積分', '銀聯免外幣手續費', '流動支付優惠'],
   NULL,
   '首年免年費',
   'https://www.citibank.com.hk/chinese/credit-cards/citi-rewards-card.html',
   0),
   
  ('citi-premiermiles', 'Citi PremierMiles', 'Citi',
   ARRAY['里數', '旅遊', 'Lounge'],
   ARRAY['海外簽賬 $3/里', '本地簽賬 $8/里', '免費機場貴賓室'],
   '迎新簽 $5,000 送 240,000積分 (20,000里) (首2個月內)',
   '首年免年費',
   'https://www.citibank.com.hk/chinese/credit-cards/citi-premiermiles-card.html',
   1.95),
   
  ('citi-prestige', 'Citi Prestige Card', 'Citi',
   ARRAY['頂級卡', 'Lounge', '旅遊'],
   ARRAY['無限次機場貴賓室', '第4晚免費住宿', '旅遊保障'],
   '迎新繳年費 $3,800 送 360,000積分 (30,000里)',
   '年費 $3,800',
   'https://www.citibank.com.hk/chinese/credit-cards/citi-prestige-card.html',
   1.95),
   
  ('citi-octopus', 'Citi 八達通白金卡', 'Citi',
   ARRAY['八達通', '交通', '自動增值'],
   ARRAY['八達通自動增值 15%', '交通 15% (需登記)', '隧道/泊車 5%'],
   '迎新簽 $5,000 + 1次$500自動增值 送 $2,500 現金回贈 (首2個月內)',
   '首年免年費',
   'https://www.citibank.com.hk/chinese/credit-cards/citi-octopus-card.html',
   1.95),
   
  ('citi-hktvmall', 'Citi HKTVmall 信用卡', 'Citi',
   ARRAY['HKTVmall', '網購', '5%回贈'],
   ARRAY['HKTVmall 5% 回贈', '其他網購優惠', '永久免年費'],
   '迎新簽 $5,000 送 $1,000 現金回贈 (首2個月內)',
   '永久免年費',
   'https://www.citibank.com.hk/chinese/credit-cards/citi-hktvmall-card.html',
   1.95),
   
  ('citi-the-club', 'Citi The Club 信用卡', 'Citi',
   ARRAY['The Club', '電訊', '網購'],
   ARRAY['指定商戶高達 4% Club積分', 'Club Shopping 高達 4% Club積分', '永久免年費'],
   '迎新簽 $5,000 送 5,000 Club積分 + $1,000 現金回贈 (首2個月內)',
   '永久免年費',
   'https://www.citibank.com.hk/chinese/credit-cards/citi-the-club-card.html',
   1.95)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  bank = EXCLUDED.bank,
  tags = EXCLUDED.tags,
  selling_points = EXCLUDED.selling_points,
  welcome_offer_text = EXCLUDED.welcome_offer_text,
  fee_waiver_condition = EXCLUDED.fee_waiver_condition,
  apply_url = EXCLUDED.apply_url,
  foreign_currency_fee = EXCLUDED.foreign_currency_fee,
  updated_at = NOW();

-- ========== DBS 星展 (4 張) ==========
INSERT INTO cards (id, name, bank, tags, selling_points, welcome_offer_text, fee_waiver_condition, apply_url, foreign_currency_fee)
VALUES 
  ('dbs-eminent', 'DBS Eminent Card', 'DBS',
   ARRAY['餐飲5%', '運動服飾5%', '需登記'],
   ARRAY['餐飲/百貨/運動服飾 5%', '需每月登記', '迎新優惠'],
   NULL,
   '首年免年費',
   'https://www.dbs.com.hk/personal-zh/cards/credit-cards/dbs-eminent-card',
   1.95),
   
  ('dbs-black', 'DBS Black World Mastercard', 'DBS',
   ARRAY['里數', '旅遊', 'Lounge'],
   ARRAY['海外簽賬 $4/里', '本地簽賬 $6/里', '免費機場貴賓室'],
   NULL,
   '首年免年費',
   'https://www.dbs.com.hk/personal-zh/cards/credit-cards/dbs-black-world-mastercard',
   1.95),
   
  ('dbs-live-fresh', 'DBS Live Fresh', 'DBS',
   ARRAY['自選類別5%', '網購', '需登記'],
   ARRAY['自選類別 5%', '需每月登記', '年輕人首選'],
   NULL,
   '首年免年費',
   'https://www.dbs.com.hk/personal-zh/cards/credit-cards/dbs-live-fresh-card',
   1.95),
   
  ('dbs-compass', 'DBS COMPASS VISA', 'DBS',
   ARRAY['週三超市8%', '四圍簽2%', '需登記'],
   ARRAY['週三超市 8%', '四圍簽好COM賺 2%', '需登記'],
   NULL,
   '首年免年費',
   'https://www.dbs.com.hk/personal-zh/cards/credit-cards/dbs-compass-visa',
   1.95)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  bank = EXCLUDED.bank,
  tags = EXCLUDED.tags,
  selling_points = EXCLUDED.selling_points,
  welcome_offer_text = EXCLUDED.welcome_offer_text,
  fee_waiver_condition = EXCLUDED.fee_waiver_condition,
  apply_url = EXCLUDED.apply_url,
  foreign_currency_fee = EXCLUDED.foreign_currency_fee,
  updated_at = NOW();

-- ========== AEON (6 張) ==========
INSERT INTO cards (id, name, bank, tags, selling_points, welcome_offer_text, fee_waiver_condition, apply_url, foreign_currency_fee)
VALUES 
  ('aeon-wakuwaku', 'AEON CARD WAKUWAKU', 'AEON',
   ARRAY['日本6%', '網購6%', '永久免年費'],
   ARRAY['日本簽賬 6%', '網上簽賬 6%', '永久免年費'],
   '迎新高達 $900 回贈 (Apple Pay/Google Pay 10%上限$500 + 指定類別$200 + App申請$200)',
   '永久免年費',
   'https://www.aeon.com.hk/tc/credit-card/wakuwaku.html',
   1.95),
   
  ('aeon-card-jal', 'AEON Card JAL', 'AEON',
   ARRAY['JAL里數', '日本', '旅遊'],
   ARRAY['簽賬賺 JAL 里數', '日本消費優惠', '永久免年費'],
   NULL,
   '永久免年費',
   'https://www.aeon.com.hk/tc/credit-card/jal.html',
   1.95),
   
  ('aeon-visa', 'AEON Visa 信用卡', 'AEON',
   ARRAY['AEON', '超市', '永久免年費'],
   ARRAY['AEON 每月20日 95折', '永久免年費', '基本回贈 0.4%'],
   '迎新高達 $700 現金回贈 (簽$6,000送$400 + 手機支付$1,000額外$100 + App申請額外$200)',
   '永久免年費',
   'https://www.aeon.com.hk/tc/credit-card/',
   1.95),
   
  ('aeon-mastercard', 'AEON 萬事達信用卡', 'AEON',
   ARRAY['AEON', '超市', '永久免年費'],
   ARRAY['AEON 每月20日 95折', '永久免年費', '基本回贈 0.4%'],
   '迎新高達 $700 現金回贈 (簽$6,000送$400 + 手機支付$1,000額外$100 + App申請額外$200)',
   '永久免年費',
   'https://www.aeon.com.hk/tc/credit-card/',
   1.95),
   
  ('aeon-unionpay', 'AEON 銀聯信用卡', 'AEON',
   ARRAY['AEON', '銀聯', '免外幣手續費'],
   ARRAY['AEON 每月20日 95折', '免外幣手續費', '基本回贈 0.4%'],
   '迎新高達 $700 現金回贈 (簽$6,000送$400 + 手機支付$1,000額外$100 + App申請額外$200)',
   '永久免年費',
   'https://www.aeon.com.hk/tc/credit-card/',
   0),
   
  ('aeon-jcb', 'AEON JCB 信用卡', 'AEON',
   ARRAY['AEON', 'JCB', '日本'],
   ARRAY['AEON 每月20日 95折', 'JCB 日本優惠', '基本回贈 0.4%'],
   '迎新高達 $600 現金回贈 (簽$6,000送$400 + App申請額外$200)',
   '永久免年費',
   'https://www.aeon.com.hk/tc/credit-card/',
   1.95)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  bank = EXCLUDED.bank,
  tags = EXCLUDED.tags,
  selling_points = EXCLUDED.selling_points,
  welcome_offer_text = EXCLUDED.welcome_offer_text,
  fee_waiver_condition = EXCLUDED.fee_waiver_condition,
  apply_url = EXCLUDED.apply_url,
  foreign_currency_fee = EXCLUDED.foreign_currency_fee,
  updated_at = NOW();

-- ========== 東亞 BEA (3 張) ==========
INSERT INTO cards (id, name, bank, tags, selling_points, welcome_offer_text, fee_waiver_condition, apply_url, foreign_currency_fee)
VALUES 
  ('bea-goal', 'BEA GOAL Credit Card', '東亞',
   ARRAY['4.4%回贈', '需月簽$2000', '運動'],
   ARRAY['每月消費 $2,000-$5,000 享 4.4%', '運動/健身優惠', '迎新送現金回贈'],
   '迎新簽 $3,000 送 $300 現金回贈 (首2個月)',
   '首年免年費',
   'https://www.hkbea.com/html/tc/bea-goal-credit-card.html',
   1.95),
   
  ('bea-world-master', '東亞 World Mastercard', '東亞',
   ARRAY['里數', '旅遊', '海外'],
   ARRAY['海外簽賬 4X (1.6%)', '本地食肆 6X (2.4%)', '旅遊保障'],
   '迎新簽 $4,000 送 $400 現金回贈 (全新) / $200 (現有) / 簽 $2,000 送 $200 (學生) (首3個月內)',
   '首年免年費',
   'https://www.hkbea.com/html/tc/bea-world-mastercard.html',
   1.95),
   
  ('bea-i-titanium', '東亞 i-Titanium 卡', '東亞',
   ARRAY['網購', '年輕人', '5X積分'],
   ARRAY['網上簽賬 5X (2%)', '年輕人首選', '永久免年費'],
   NULL,
   '永久免年費',
   'https://www.hkbea.com/html/tc/bea-i-titanium-card.html',
   1.95)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  bank = EXCLUDED.bank,
  tags = EXCLUDED.tags,
  selling_points = EXCLUDED.selling_points,
  welcome_offer_text = EXCLUDED.welcome_offer_text,
  fee_waiver_condition = EXCLUDED.fee_waiver_condition,
  apply_url = EXCLUDED.apply_url,
  foreign_currency_fee = EXCLUDED.foreign_currency_fee,
  updated_at = NOW();

-- ========== 安信 (2 張) ==========
INSERT INTO cards (id, name, bank, tags, selling_points, welcome_offer_text, fee_waiver_condition, apply_url, foreign_currency_fee)
VALUES 
  ('earnmore', 'EarnMORE 銀聯卡', '安信',
   ARRAY['全方位2%', '銀聯', '免外幣手續費'],
   ARRAY['全方位簽賬 2%', '銀聯免外幣手續費', '每月回贈上限 $1,500'],
   '迎新簽 $8,500 送 $500 現金回贈 (首90天內)',
   '永久免年費',
   'https://www.earnmore.hk/',
   0),
   
  ('wewa-unionpay', 'WeWa 銀聯卡', '安信',
   ARRAY['玩樂4%', '銀聯', '需月簽$1500'],
   ARRAY['玩樂類別 4選1 4%', '需月簽 $1,500', '迎新多款禮品'],
   '迎新多款禮品選擇 (簽$8,800送LG顯示器/Marshall喇叭, 簽$8,500送$500現金, 學生簽$2,000送$200現金, 或高達$90,000免息現金分期)',
   '永久免年費',
   'https://www.wewa.hk/',
   0)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  bank = EXCLUDED.bank,
  tags = EXCLUDED.tags,
  selling_points = EXCLUDED.selling_points,
  welcome_offer_text = EXCLUDED.welcome_offer_text,
  fee_waiver_condition = EXCLUDED.fee_waiver_condition,
  apply_url = EXCLUDED.apply_url,
  foreign_currency_fee = EXCLUDED.foreign_currency_fee,
  updated_at = NOW();

-- ========== 大新 Dah Sing (3 張) ==========
INSERT INTO cards (id, name, bank, tags, selling_points, welcome_offer_text, fee_waiver_condition, apply_url, foreign_currency_fee)
VALUES 
  ('dahsing-one', '大新 ONE+ 白金卡', '大新',
   ARRAY['1%回贈', '簡單', '入門'],
   ARRAY['全方位 1% 回贈', '簡單易用', '永久免年費'],
   NULL,
   '永久免年費',
   'https://www.dahsing.com/html/tc/credit_card/one_plus_card.html',
   1.95),
   
  ('dahsing-ba', '大新 British Airways Visa', '大新',
   ARRAY['BA里數', '旅遊', 'Avios'],
   ARRAY['簽賬賺 Avios', '英航優惠', '旅遊保障'],
   NULL,
   '首年免年費',
   'https://www.dahsing.com/html/tc/credit_card/ba_visa.html',
   1.95),
   
  ('dahsing-myauto', '大新 MyAuto 車主信用卡', '大新',
   ARRAY['汽車4%', '油站', '易通行'],
   ARRAY['汽車相關簽賬 4%', '油站優惠', '易通行自動繳費'],
   NULL,
   '首年免年費',
   'https://www.dahsing.com/html/tc/credit_card/myauto.html',
   1.95)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  bank = EXCLUDED.bank,
  tags = EXCLUDED.tags,
  selling_points = EXCLUDED.selling_points,
  welcome_offer_text = EXCLUDED.welcome_offer_text,
  fee_waiver_condition = EXCLUDED.fee_waiver_condition,
  apply_url = EXCLUDED.apply_url,
  foreign_currency_fee = EXCLUDED.foreign_currency_fee,
  updated_at = NOW();

-- ========== 建行 CCB (2 張) ==========
INSERT INTO cards (id, name, bank, tags, selling_points, welcome_offer_text, fee_waiver_condition, apply_url, foreign_currency_fee)
VALUES 
  ('ccb-eye', 'CCB (Asia) eye Card', '建行亞洲',
   ARRAY['網購', '感應支付', '交通'],
   ARRAY['網購/感應支付優惠', '本地餐飲及外賣 9%', '本地交通 2%'],
   '迎新簽 $6,000 送 $600 現金回贈 (首2個月) / Chill分期$15,000送$800 (首3個月)',
   '首年免年費',
   'https://www.asia.ccb.com/hongkong_tc/personal/credit_cards/eye_card.html',
   1.95),
   
  ('ccb-travo', '建行(亞洲) TRAVO World Mastercard', '建行亞洲',
   ARRAY['旅遊', '海外10X', '餐飲5X'],
   ARRAY['海外簽賬 10X積分 (4%)', '本地餐飲 5X積分 (2%)', '海外商戶 15% 回贈'],
   NULL,
   '首年免年費',
   'https://www.asia.ccb.com/hongkong_tc/personal/credit_cards/travo.html',
   1.95)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  bank = EXCLUDED.bank,
  tags = EXCLUDED.tags,
  selling_points = EXCLUDED.selling_points,
  welcome_offer_text = EXCLUDED.welcome_offer_text,
  fee_waiver_condition = EXCLUDED.fee_waiver_condition,
  apply_url = EXCLUDED.apply_url,
  foreign_currency_fee = EXCLUDED.foreign_currency_fee,
  updated_at = NOW();

-- ========== 工銀 ICBC (1 張) ==========
INSERT INTO cards (id, name, bank, tags, selling_points, welcome_offer_text, fee_waiver_condition, apply_url, foreign_currency_fee)
VALUES 
  ('icbc-horoscope', 'ICBC 宇宙星座 Visa Signature', '工銀亞洲',
   ARRAY['積分', '旅遊', '里數'],
   ARRAY['簽賬賺積分', '兌換里數/現金', '迎新優惠'],
   '迎新簽 $3,000 送 $700 免找數簽賬額 (首2個月)',
   '首年免年費',
   'https://www.icbcasia.com/tc/personal/cards/credit-cards/horoscope.html',
   1.95)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  bank = EXCLUDED.bank,
  tags = EXCLUDED.tags,
  selling_points = EXCLUDED.selling_points,
  welcome_offer_text = EXCLUDED.welcome_offer_text,
  fee_waiver_condition = EXCLUDED.fee_waiver_condition,
  apply_url = EXCLUDED.apply_url,
  foreign_currency_fee = EXCLUDED.foreign_currency_fee,
  updated_at = NOW();

-- ========== 信銀國際 CNCBI (2 張) ==========
INSERT INTO cards (id, name, bank, tags, selling_points, welcome_offer_text, fee_waiver_condition, apply_url, foreign_currency_fee)
VALUES 
  ('cncbi-motion', 'CNCBI Motion Credit Card', '信銀國際',
   ARRAY['餐飲6%', '網上6%', '需月簽$3800'],
   ARRAY['餐飲/網上 6%', '需月簽 $3,800', '迎新優惠'],
   NULL,
   '首年免年費',
   'https://www.cncbinternational.com/personal/credit-cards/motion/tc/index.html',
   1.95),
   
  ('cncbi-gba', '信銀國際大灣區雙幣信用卡', '信銀國際',
   ARRAY['大灣區', '人民幣10%', '雲閃付'],
   ARRAY['人民幣/雲閃付 高達 10%', '免外幣手續費', '大灣區消費優惠'],
   NULL,
   '首年免年費',
   'https://www.cncbinternational.com/personal/credit-cards/gba/tc/index.html',
   0)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  bank = EXCLUDED.bank,
  tags = EXCLUDED.tags,
  selling_points = EXCLUDED.selling_points,
  welcome_offer_text = EXCLUDED.welcome_offer_text,
  fee_waiver_condition = EXCLUDED.fee_waiver_condition,
  apply_url = EXCLUDED.apply_url,
  foreign_currency_fee = EXCLUDED.foreign_currency_fee,
  updated_at = NOW();

-- ========== 富邦 Fubon (4 張) ==========
INSERT INTO cards (id, name, bank, tags, selling_points, welcome_offer_text, fee_waiver_condition, apply_url, foreign_currency_fee)
VALUES 
  ('fubon-titanium', '富邦 Titanium 卡', '富邦',
   ARRAY['台灣8%', '日韓4%', '網購4%'],
   ARRAY['新台幣簽賬 8% (20X)', '日圓/韓圜 4% (10X)', '本地網上 4% (需登記)'],
   NULL,
   '首年免年費',
   'https://www.fubonbank.com.hk/tc/cards/credit-card-products/titanium.html',
   1.95),
   
  ('fubon-platinum', '富邦白金卡', '富邦',
   ARRAY['台灣8%', '日韓4%', '網購4%'],
   ARRAY['新台幣簽賬 8% (20X)', '日圓/韓圜 4% (10X)', '本地網上 4% (需登記)'],
   NULL,
   '首年免年費',
   'https://www.fubonbank.com.hk/tc/cards/credit-card-products/platinum.html',
   1.95),
   
  ('fubon-visa-infinite', '富邦 Visa Infinite 卡', '富邦',
   ARRAY['台灣10%', '日韓5%', '網購5%', '頂級卡'],
   ARRAY['新台幣簽賬 10% (20X)', '日圓/韓圜 5% (10X)', '本地網上 5% (需登記)'],
   NULL,
   '年費 $2,000',
   'https://www.fubonbank.com.hk/tc/cards/credit-card-products/visa-infinite.html',
   1.95),
   
  ('fubon-incard', '富邦 iN VISA 白金卡', '富邦',
   ARRAY['網購8%', '永久免年費'],
   ARRAY['網上簽賬 8%', '每月回贈上限 $300', '永久免年費'],
   '迎新簽 $5,000 送 $150 現金回贈 (首3個月內)',
   '永久免年費',
   'https://www.fubonbank.com.hk/tc/cards/credit-card-products/incard.html',
   1.95),
   
  ('fubon-yata', '富邦一田 Visa 白金卡', '富邦',
   ARRAY['一田', '百貨', 'VIP Day'],
   ARRAY['一田 VIP Day 95折', '一田簽賬優惠', '永久免年費'],
   NULL,
   '永久免年費',
   'https://www.fubonbank.com.hk/tc/cards/credit-card-products/yata.html',
   1.95)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  bank = EXCLUDED.bank,
  tags = EXCLUDED.tags,
  selling_points = EXCLUDED.selling_points,
  welcome_offer_text = EXCLUDED.welcome_offer_text,
  fee_waiver_condition = EXCLUDED.fee_waiver_condition,
  apply_url = EXCLUDED.apply_url,
  foreign_currency_fee = EXCLUDED.foreign_currency_fee,
  updated_at = NOW();

-- ========== 其他銀行 (4 張) ==========
INSERT INTO cards (id, name, bank, tags, selling_points, welcome_offer_text, fee_waiver_condition, apply_url, foreign_currency_fee)
VALUES 
  ('amex-explorer', 'American Express Explorer', 'American Express',
   ARRAY['旅遊', '里數', 'Lounge'],
   ARRAY['靈活兌換多個里數計劃', '免費機場貴賓室', '旅遊保障'],
   NULL,
   '首年免年費',
   'https://www.americanexpress.com/hk/credit-cards/explorer-credit-card/',
   2.0),
   
  ('mox-credit', 'Mox Credit', 'Mox',
   ARRAY['無限1%', '虛擬銀行', '即時回贈'],
   ARRAY['無上限 1% 現金回贈', '即時回贈', '無年費'],
   NULL,
   '永久免年費',
   'https://mox.com/credit/',
   1.95),
   
  ('sim-credit-card', 'sim Credit Card', 'WeLab Bank',
   ARRAY['網購8%', '交通8%', '需月簽$1000'],
   ARRAY['網上簽賬 8% (單筆滿$500)', '交通 8%', '需月簽 $1,000'],
   NULL,
   '永久免年費',
   'https://www.welab.bank/sim-credit-card/',
   1.95),
   
  ('sim-world-mastercard', 'sim World Mastercard', 'WeLab Bank',
   ARRAY['網購8%', '海外8%', '需月簽$1000'],
   ARRAY['網上簽賬 8% (單筆滿$500)', '海外簽賬 8%', '需月簽 $1,000'],
   NULL,
   '永久免年費',
   'https://www.welab.bank/sim-world-mastercard/',
   1.95)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  bank = EXCLUDED.bank,
  tags = EXCLUDED.tags,
  selling_points = EXCLUDED.selling_points,
  welcome_offer_text = EXCLUDED.welcome_offer_text,
  fee_waiver_condition = EXCLUDED.fee_waiver_condition,
  apply_url = EXCLUDED.apply_url,
  foreign_currency_fee = EXCLUDED.foreign_currency_fee,
  updated_at = NOW();

-- =====================================================
-- 完成！共 61 張信用卡
-- =====================================================
