-- =====================================================
-- Supabase Credit Cards Sync Script
-- 將前台 cards.ts 嘅所有信用卡同步到數據庫
-- 執行方式：在 Supabase SQL Editor 執行此 script
-- =====================================================

-- 使用 UPSERT (INSERT ... ON CONFLICT) 確保不會重複
-- 只更新 name, bank, tags, selling_points, note, welcome_offer_text, fee_waiver_condition, apply_url
-- 保留現有嘅 image_url (因為可能係用戶上傳嘅自定義圖片)

-- ========== HSBC 滙豐 (7 張) ==========
INSERT INTO cards (id, name, bank, tags, selling_points, note, welcome_offer_text, fee_waiver_condition, apply_url, foreign_currency_fee)
VALUES 
  ('hsbc-vs', 'HSBC Visa Signature', 'HSBC', 
   ARRAY['餐飲神卡', '最紅自主獎賞', '6X積分', '需登記'],
   ARRAY['最紅自主獎賞 6X (2.4%)，5大類別自由分配', '首 $100,000 簽賬享額外獎賞', '首兩年免年費'],
   '⚠️ 【最紅自主獎賞 2026】需於 2026/10/31 前登記！6X = 5X額外 + 1X基本 = 2.4%。5大類別：賞滋味/賞家居/賞享受/賞購物/賞世界，可自由分配 5X 額外倍數。',
   '迎新簽 $8,000 送 $600-$800 獎賞錢 (首60日內)',
   '首兩年免年費',
   'https://www.hsbc.com.hk/zh-hk/credit-cards/products/visa-signature/',
   1.95),
   
  ('hsbc-red', 'HSBC Red Credit Card', 'HSBC',
   ARRAY['網購神卡', '永久免年費', '指定商戶8%'],
   ARRAY['指定商戶 8% (壽司郎/譚仔/GU/Decathlon/lululemon)', '網上簽賬 4% (每月首$10,000)', '永久免年費'],
   '⚠️ 【推廣期 2025/9/1-2026/3/31】指定商戶 8%：壽司郎/譚仔/GU/Decathlon/lululemon/NAMCO/TAITO。每月上限 $100 獎賞錢。網上簽賬 4% 每月上限 $400。',
   '迎新簽 $3,000 送 $300 獎賞錢 (首60日)',
   '永久免年費',
   'https://www.hsbc.com.hk/zh-hk/credit-cards/products/red/',
   1.95),
   
  ('hsbc-everymile', 'HSBC EveryMile', 'HSBC',
   ARRAY['旅遊神卡', '交通$2/里', 'Lounge'],
   ARRAY['指定日常簽賬低至 HK$2/里', '免費環亞機場貴賓室', '首兩年免年費'],
   '⚠️ 指定商戶包括：交通/網購/餐飲。不適用於電子錢包、八達通增值、繳稅、網上繳費。',
   '迎新簽 $8,000 送 $600-$800 獎賞錢 (首60日內)',
   '首兩年免年費',
   'https://www.hsbc.com.hk/zh-hk/credit-cards/products/everymile/',
   1.95),
   
  ('hsbc-pulse', 'HSBC Pulse 銀聯雙幣卡', 'HSBC',
   ARRAY['北上消費', '銀聯', '免手續費', '內地4.4%'],
   ARRAY['內地/澳門 QR Code/流動支付 4.4%', '免外幣手續費', '最紅自主獎賞'],
   '⚠️ 內地/澳門 QR Code/流動支付 4.4%，簽賬上限 $80,000。需登記最紅自主獎賞「賞世界」。',
   '迎新簽 $8,000 送 $600-$800 獎賞錢 (首60日)',
   '首兩年免年費',
   'https://www.hsbc.com.hk/zh-hk/credit-cards/products/pulse/',
   0),
   
  ('hsbc-premier', 'HSBC Premier Mastercard', 'HSBC',
   ARRAY['高端卡', 'Premier專屬'],
   ARRAY['Premier 客戶專屬', '最紅自主獎賞 6X'],
   '⚠️ Premier 客戶專屬。需登記最紅自主獎賞。',
   '迎新簽 $8,000 送 $800 獎賞錢 (首60日)',
   'Premier客戶免年費',
   'https://www.hsbc.com.hk/zh-hk/credit-cards/products/premier/',
   1.95),
   
  ('hsbc-student', '滙豐滙財金卡 - 學生卡', 'HSBC',
   ARRAY['學生卡', '交學費', '永久免年費'],
   ARRAY['指定學院學費 2.4% 回贈', '永久免年費', '最紅自主獎賞'],
   '⚠️ 學費優惠需透過滙豐 App 或網上理財繳費，每階段上限 $200 獎賞錢。',
   '迎新簽 $2,000 送 $300 獎賞錢 (首60日)',
   '永久免年費',
   'https://www.hsbc.com.hk/zh-hk/credit-cards/products/gold-student/',
   1.95),
   
  ('hsbc-easy', 'HSBC Easy Card', 'HSBC',
   ARRAY['超市折扣', '易賞錢', '百佳92折'],
   ARRAY['百佳 92折 (每月2/12/22號)', '屈臣氏 92折 (每月8/18/28號)', '豐澤 95折 (每月10號)'],
   '⚠️ 折扣優惠需綁定易賞錢。折扣是購物時直接減價，非事後回贈。',
   '迎新一年「易賞錢」VIP 會籍 (6倍積分) + 簽賬獎賞',
   '首兩年免年費',
   'https://www.hsbc.com.hk/zh-hk/credit-cards/products/easy/',
   1.95)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  bank = EXCLUDED.bank,
  tags = EXCLUDED.tags,
  selling_points = EXCLUDED.selling_points,
  note = EXCLUDED.note,
  welcome_offer_text = EXCLUDED.welcome_offer_text,
  fee_waiver_condition = EXCLUDED.fee_waiver_condition,
  apply_url = EXCLUDED.apply_url,
  foreign_currency_fee = EXCLUDED.foreign_currency_fee,
  updated_at = NOW();

-- ========== Standard Chartered 渣打 (4 張) ==========
INSERT INTO cards (id, name, bank, tags, selling_points, note, welcome_offer_text, fee_waiver_condition, apply_url, foreign_currency_fee)
VALUES 
  ('sc-smart', 'SC Smart Card', 'Standard Chartered',
   ARRAY['特約商戶5%', '永久免年費', '免外幣手續費', '八達通增值', '免現金透支費'],
   ARRAY['特約商戶 5% (百佳/屈臣氏/759/Klook/Deliveroo等)', '基本回贈 0.56%-1.2% (視乎月簽)', '永久免年費', '外幣交易手續費全免'],
   '⚠️ 【階梯制回贈】月簽 < $4,000 = 0%！月簽 $4,000-$14,999 = 0.56%。月簽 $15,000+ = 1.2%。八達通自動增值計回贈！',
   '迎新簽 $3,500 送 $800 現金回贈 (首月內)',
   '永久免年費',
   'https://www.sc.com/hk/zh/credit-cards/smart/',
   0),
   
  ('sc-cathay', 'SC Cathay Mastercard', 'Standard Chartered',
   ARRAY['儲里數', '國泰', '出糧優惠', '八達通增值', '繳稅', '會籍積分'],
   ARRAY['國泰航空簽賬低至 HK$2/里', '餐飲食肆 HK$4/里', '八達通增值計里數', 'FanFest繳稅$4/里'],
   '⚠️ 基本比率 $6/里。八達通自動增值計里數！【會籍積分推廣 2025全年】每簽$100,000送20會籍積分。【FanFest禮遇】繳稅$4/里（上限20,000里）。',
   '迎新送高達 60,000 里 / FanFest繳稅$4/里(上限20,000里) / 出糧客戶額外 2,000 里',
   '首年免年費；優先理財($100萬+)/Premium理財($20萬+)/出糧客戶免年費',
   'https://www.sc.com/hk/zh/credit-cards/cathay/',
   1.95),
   
  ('sc-simply-cash', 'SC Simply Cash Visa', 'Standard Chartered',
   ARRAY['現金回贈', '海外1.5%', '免外幣手續費'],
   ARRAY['海外簽賬 2%', '本地簽賬 1.5%', '免外幣手續費'],
   '⚠️ 海外簽賬 2%，本地簽賬 1.5%。不適用於八達通/支付寶/微信支付/PayMe增值。',
   '迎新簽 $8,000 送 $600 現金回贈 (首2個月內)',
   '永久免年費',
   'https://www.sc.com/hk/zh/credit-cards/simply-cash/',
   0),
   
  ('sc-apoint', '渣打 A. Point Card', 'Standard Chartered',
   ARRAY['積分', '免年費'],
   ARRAY['簽賬賺積分', '永久免年費'],
   '⚠️ 簽賬賺積分，可兌換禮品或現金回贈。',
   NULL,
   '永久免年費',
   'https://www.sc.com/hk/zh/credit-cards/',
   1.95)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  bank = EXCLUDED.bank,
  tags = EXCLUDED.tags,
  selling_points = EXCLUDED.selling_points,
  note = EXCLUDED.note,
  welcome_offer_text = EXCLUDED.welcome_offer_text,
  fee_waiver_condition = EXCLUDED.fee_waiver_condition,
  apply_url = EXCLUDED.apply_url,
  foreign_currency_fee = EXCLUDED.foreign_currency_fee,
  updated_at = NOW();

-- ========== BOC 中銀 (6 張) ==========
INSERT INTO cards (id, name, bank, tags, selling_points, note, welcome_offer_text, fee_waiver_condition, apply_url, foreign_currency_fee)
VALUES 
  ('boc-chill', 'BOC Chill World Mastercard', 'BOC',
   ARRAY['Chill商戶10%', '海外5%', '需月簽$3000'],
   ARRAY['Chill 商戶 10%', '海外及網上簽賬 5%', '永久免年費'],
   '⚠️ 需每月簽賬滿 $3,000。Chill 商戶 10%，海外及網上 5%，每月上限 $150 回贈。',
   '迎新簽 $5,000 送 $500 現金回贈 (World) / 簽 $3,000 送 $300 (Platinum)',
   '永久免年費',
   'https://www.bochk.com/tc/creditcard/products/chill.html',
   1.95),
   
  ('boc-sogo', 'BOC SOGO Visa Signature', 'BOC',
   ARRAY['崇光專屬', '週二SOGO 5%'],
   ARRAY['週二 SOGO 5%', '崇光專屬優惠'],
   '⚠️ 週二 SOGO 5%，每月上限 $100 回贈。',
   '迎新簽 $5,000 送 $500 崇光禮券 / 手機簽賬 10% (上限$300)',
   '永久免年費',
   'https://www.bochk.com/tc/creditcard/products/sogo.html',
   1.95),
   
  ('boc-cheers', 'BOC Cheers Visa Infinite', 'BOC',
   ARRAY['高端卡', '儲里數'],
   ARRAY['儲里數', 'Visa Infinite 專屬優惠'],
   '⚠️ 高端卡，適合儲里數。',
   '迎新簽 $12,000 送 225,000 積分 (私人財富客戶額外 +75,000)',
   '需年簽滿指定金額',
   'https://www.bochk.com/tc/creditcard/products/cheers.html',
   1.95),
   
  ('boc-gba', 'BOC 大灣區一卡通', 'BOC',
   ARRAY['大灣區', '銀聯', '免手續費'],
   ARRAY['大灣區消費免手續費', '銀聯雙幣'],
   '⚠️ 大灣區消費免外幣手續費。',
   '迎新手機簽賬 10% 回贈 (上限$300)',
   '永久免年費',
   'https://www.bochk.com/tc/creditcard/products/gba.html',
   0),
   
  ('boc-icard', 'BOC i-card', 'BOC',
   ARRAY['網購', '手機支付'],
   ARRAY['網購回贈', '手機支付優惠'],
   '⚠️ 網購及手機支付優惠。',
   '迎新手機簽賬 10% 回贈 (上限$300)',
   '永久免年費',
   'https://www.bochk.com/tc/creditcard/products/icard.html',
   1.95),
   
  ('boc-taobao', '中銀淘寶 World 萬事達卡', 'BOC',
   ARRAY['淘寶', '免外幣手續費', '網購'],
   ARRAY['淘寶 0% 手續費', '海外簽賬 0% 手續費', '網購回贈'],
   '⚠️ 淘寶及海外簽賬免外幣手續費。',
   '迎新手機簽賬 10% 回贈 (上限$300)',
   '永久免年費',
   'https://www.bochk.com/tc/creditcard/products/taobao.html',
   0)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  bank = EXCLUDED.bank,
  tags = EXCLUDED.tags,
  selling_points = EXCLUDED.selling_points,
  note = EXCLUDED.note,
  welcome_offer_text = EXCLUDED.welcome_offer_text,
  fee_waiver_condition = EXCLUDED.fee_waiver_condition,
  apply_url = EXCLUDED.apply_url,
  foreign_currency_fee = EXCLUDED.foreign_currency_fee,
  updated_at = NOW();

-- ========== Hang Seng 恒生 (5 張) ==========
INSERT INTO cards (id, name, bank, tags, selling_points, note, welcome_offer_text, fee_waiver_condition, apply_url, foreign_currency_fee)
VALUES 
  ('hangseng-mmpower', 'Hang Seng MMPOWER', 'Hang Seng',
   ARRAY['網購5%', '手機支付5%', '需月簽$5000'],
   ARRAY['網上簽賬 5%', '手機支付 5%', '海外簽賬 5%'],
   '⚠️ 需每月簽賬滿 $5,000。網上/手機支付/海外 5%，每月上限 $200 回贈。不適用於 Alipay/WeChat Pay。',
   '迎新簽 $5,000 送 $700 +FUN Dollars (全新) / $300 (現有) / 簽 $2,000 送 $300 (學生) (首60日)',
   '永久免年費',
   'https://www.hangseng.com/zh-hk/personal/cards/products/mmpower/',
   1.95),
   
  ('hangseng-enjoy', 'Hang Seng enJoy Card', 'Hang Seng',
   ARRAY['儲分', '食肆優惠', 'yuu積分', '折扣日', '7-Eleven 95折', '八達通增值'],
   ARRAY['7-Eleven 全年 95折 [折扣]', '惠康 92折 (3/13/23號) [折扣]', '萬寧 94折 (1/20號) [折扣]', '指定食肆 4X yuu積分 (2%)', 'yuu 積分可當現金使用 (200積分=$1)'],
   '⚠️ 【yuu積分獎賞】4X (2%)：Pizza Hut/PHD/KFC/美心中菜/西餐/m.a.x./快餐/麵包西餅/星巴克。3X (1.5%)：7-Eleven/IKEA/萬寧/惠康/Market Place。八達通自動增值計積分！需綁定 yuu App。',
   NULL,
   '永久免年費',
   'https://www.hangseng.com/zh-hk/personal/cards/products/enjoy/',
   1.95),
   
  ('hangseng-travel-plus', 'Hang Seng Travel+', 'Hang Seng',
   ARRAY['旅遊', '外幣7%', '交通5%'],
   ARRAY['指定國家外幣 7% (日韓泰星澳)', '本地交通 5%', '本地餐飲 5%'],
   '⚠️ 需每月簽賬滿 $6,000。指定國家 7%，其他外幣 5%，本地交通/餐飲 5%。每月上限 $500 回贈。',
   '迎新簽 $8,000 送 $1,000 +FUN Dollars (全新) / $500 (現有)',
   '永久免年費',
   'https://www.hangseng.com/zh-hk/personal/cards/products/travel-plus/',
   1.95),
   
  ('hangseng-muji', '恒生 MUJI Card', 'Hang Seng',
   ARRAY['MUJI', '無印良品'],
   ARRAY['MUJI 消費優惠', '無印良品專屬'],
   '⚠️ MUJI 消費專屬優惠。',
   NULL,
   '永久免年費',
   'https://www.hangseng.com/zh-hk/personal/cards/products/muji/',
   1.95),
   
  ('hangseng-platinum', '恒生白金卡', 'Hang Seng',
   ARRAY['基本卡'],
   ARRAY['基本白金卡優惠'],
   '⚠️ 基本白金卡。',
   NULL,
   '永久免年費',
   'https://www.hangseng.com/zh-hk/personal/cards/',
   1.95)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  bank = EXCLUDED.bank,
  tags = EXCLUDED.tags,
  selling_points = EXCLUDED.selling_points,
  note = EXCLUDED.note,
  welcome_offer_text = EXCLUDED.welcome_offer_text,
  fee_waiver_condition = EXCLUDED.fee_waiver_condition,
  apply_url = EXCLUDED.apply_url,
  foreign_currency_fee = EXCLUDED.foreign_currency_fee,
  updated_at = NOW();

-- ========== Citi 花旗 (7 張) ==========
INSERT INTO cards (id, name, bank, tags, selling_points, note, welcome_offer_text, fee_waiver_condition, apply_url, foreign_currency_fee)
VALUES 
  ('citi-cashback', 'Citi Cash Back Card', 'Citi',
   ARRAY['現金回贈', '餐飲2%', '酒店2%'],
   ARRAY['餐飲 2%', '酒店 2%', '其他 1%'],
   '⚠️ 餐飲及酒店 2%，其他簽賬 1%。',
   '迎新簽 $5,000 送 $1,200 現金回贈 (首2個月內)',
   '永久免年費',
   'https://www.citibank.com.hk/zh-hk/credit-cards/citi-cash-back-card.html',
   1.95),
   
  ('citi-rewards', 'Citi Rewards', 'Citi',
   ARRAY['儲積分', '超市5X', '百貨5X'],
   ARRAY['超市/百貨 5X 積分', '基本 1X 積分'],
   '⚠️ 超市及百貨公司 5X 積分。',
   '迎新簽 $5,000 送 $1,000 現金回贈 (首2個月內)',
   '永久免年費',
   'https://www.citibank.com.hk/zh-hk/credit-cards/citi-rewards-card.html',
   1.95),
   
  ('citi-premiermiles', 'Citi PremierMiles', 'Citi',
   ARRAY['儲里數', '海外$3/里'],
   ARRAY['海外簽賬 $3/里', '本地簽賬 $8/里'],
   '⚠️ 海外簽賬 $3/里，本地簽賬 $8/里。',
   '迎新簽 $5,000 送 240,000積分 (20,000里) (首2個月內)',
   '首年免年費',
   'https://www.citibank.com.hk/zh-hk/credit-cards/citi-premiermiles-card.html',
   1.95),
   
  ('citi-prestige', 'Citi Prestige Card', 'Citi',
   ARRAY['高端卡', '儲里數', 'Lounge'],
   ARRAY['海外簽賬 $3/里', '機場貴賓室', '酒店第4晚免費'],
   '⚠️ 高端卡，適合經常旅遊人士。年費 $3,800。',
   '迎新繳年費 $3,800 送 360,000積分 (30,000里)',
   '需繳年費 $3,800',
   'https://www.citibank.com.hk/zh-hk/credit-cards/citi-prestige-card.html',
   1.95),
   
  ('citi-octopus', 'Citi 八達通白金卡', 'Citi',
   ARRAY['八達通', '交通15%', '自動增值'],
   ARRAY['交通 15% (需登記)', '八達通自動增值 1%'],
   '⚠️ 【交通推廣】需登記，月簽 $4,000 享交通 15%，每月上限 $300 回贈。',
   '迎新簽 $5,000 + 1次$500自動增值 送 $2,500 現金回贈 (首2個月內)',
   '永久免年費',
   'https://www.citibank.com.hk/zh-hk/credit-cards/citi-octopus-card.html',
   1.95),
   
  ('citi-hktvmall', 'Citi HKTVmall 信用卡', 'Citi',
   ARRAY['HKTVmall', '網購'],
   ARRAY['HKTVmall 5% 回贈', '網購優惠'],
   '⚠️ HKTVmall 5% 回贈。',
   '迎新簽 $5,000 送 $1,000 現金回贈 (首2個月內)',
   '永久免年費',
   'https://www.citibank.com.hk/zh-hk/credit-cards/citi-hktvmall-card.html',
   1.95),
   
  ('citi-the-club', 'Citi The Club 信用卡', 'Citi',
   ARRAY['The Club', '電訊', '網購'],
   ARRAY['指定商戶 4% Club積分', 'Club Shopping 4%', '永久免年費'],
   '⚠️ 指定商戶（csl/1010/Now TV/網上行/HKT/PCCW）4% Club積分，每月上限 1,500 積分。',
   '迎新簽 $5,000 送 5,000 Club積分 + $1,000 現金回贈 (首2個月內)',
   '永久免年費',
   'https://www.citibank.com.hk/zh-hk/credit-cards/citi-the-club-card.html',
   1.95)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  bank = EXCLUDED.bank,
  tags = EXCLUDED.tags,
  selling_points = EXCLUDED.selling_points,
  note = EXCLUDED.note,
  welcome_offer_text = EXCLUDED.welcome_offer_text,
  fee_waiver_condition = EXCLUDED.fee_waiver_condition,
  apply_url = EXCLUDED.apply_url,
  foreign_currency_fee = EXCLUDED.foreign_currency_fee,
  updated_at = NOW();

-- ========== DBS 星展 (4 張) ==========
INSERT INTO cards (id, name, bank, tags, selling_points, note, welcome_offer_text, fee_waiver_condition, apply_url, foreign_currency_fee)
VALUES 
  ('dbs-eminent', 'DBS Eminent Card', 'DBS',
   ARRAY['自選5%', '餐飲', '運動服飾'],
   ARRAY['自選類別 5% (餐飲/百貨/運動服飾)', '基本 1%'],
   '⚠️ 自選類別 5%：餐飲/百貨/運動服飾/電訊。需每月登記。',
   '迎新簽 $5,000 送 $500 現金回贈 (首2個月內)',
   '永久免年費',
   'https://www.dbs.com.hk/personal-zh/cards/credit-cards/dbs-eminent-card',
   1.95),
   
  ('dbs-black', 'DBS Black World Mastercard', 'DBS',
   ARRAY['儲里數', '海外$4/里'],
   ARRAY['海外簽賬 $4/里', '本地簽賬 $6/里'],
   '⚠️ 海外簽賬 $4/里，本地簽賬 $6/里。',
   '迎新簽 $5,000 送 10,000 里 (首2個月內)',
   '首年免年費',
   'https://www.dbs.com.hk/personal-zh/cards/credit-cards/dbs-black-world-mastercard',
   1.95),
   
  ('dbs-live-fresh', 'DBS Live Fresh', 'DBS',
   ARRAY['自選5%', '網購', '娛樂'],
   ARRAY['自選類別 5% (網購/娛樂/旅遊等)', '基本 1%'],
   '⚠️ 自選類別 5%：網購/娛樂/旅遊/美容/時裝。需每月登記。一扣即享。',
   '迎新簽 $5,000 送 $500 現金回贈 (首2個月內)',
   '永久免年費',
   'https://www.dbs.com.hk/personal-zh/cards/credit-cards/dbs-live-fresh-card',
   1.95),
   
  ('dbs-compass', 'DBS COMPASS VISA', 'DBS',
   ARRAY['超市8%', '週三大折日', '需登記'],
   ARRAY['週三超市 8%', '四圍簽 2%', '基本 0.4%'],
   '⚠️ 【週三大折日】超市 8%，單筆滿 $300，每月上限 $2,000 簽賬。【四圍簽】AliPay/WeChat Pay/百貨/家居/油站 2%，需登記。',
   '迎新簽 $5,000 送 $500 現金回贈 (首2個月內)',
   '永久免年費',
   'https://www.dbs.com.hk/personal-zh/cards/credit-cards/dbs-compass-visa',
   1.95)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  bank = EXCLUDED.bank,
  tags = EXCLUDED.tags,
  selling_points = EXCLUDED.selling_points,
  note = EXCLUDED.note,
  welcome_offer_text = EXCLUDED.welcome_offer_text,
  fee_waiver_condition = EXCLUDED.fee_waiver_condition,
  apply_url = EXCLUDED.apply_url,
  foreign_currency_fee = EXCLUDED.foreign_currency_fee,
  updated_at = NOW();

-- ========== AEON (6 張) ==========
INSERT INTO cards (id, name, bank, tags, selling_points, note, welcome_offer_text, fee_waiver_condition, apply_url, foreign_currency_fee)
VALUES 
  ('aeon-wakuwaku', 'AEON CARD WAKUWAKU', 'AEON',
   ARRAY['網購6%', '日本3%', '永久免年費'],
   ARRAY['網上簽賬 6%', '日本簽賬 3%', '永久免年費'],
   '⚠️ 網上簽賬 6%（每月上限 $200），日本簽賬 3%（每月上限 $200）。AEON 20日 95折是折扣，非回贈。',
   '迎新高達 $900 回贈 (Apple Pay/Google Pay 10%上限$500 + 指定類別$200 + App申請$200)',
   '永久免年費',
   'https://www.aeon.com.hk/tc/credit-card/wakuwaku.html',
   1.95),
   
  ('aeon-card-jal', 'AEON Card JAL', 'AEON',
   ARRAY['儲JAL里數', '日本'],
   ARRAY['儲 JAL 里數', '日本消費優惠'],
   '⚠️ 儲 JAL 里數。',
   NULL,
   '永久免年費',
   'https://www.aeon.com.hk/tc/credit-card/jal.html',
   1.95),
   
  ('aeon-visa', 'AEON Visa 信用卡', 'AEON',
   ARRAY['AEON', '永久免年費'],
   ARRAY['AEON 20日 95折', '永久免年費'],
   '⚠️ AEON 20日 95折是折扣，非回贈。',
   '迎新高達 $700 現金回贈 (簽$6,000送$400 + 手機支付$1,000額外$100 + App申請額外$200)',
   '永久免年費',
   'https://www.aeon.com.hk/tc/credit-card/',
   1.95),
   
  ('aeon-mastercard', 'AEON 萬事達信用卡', 'AEON',
   ARRAY['AEON', '永久免年費'],
   ARRAY['AEON 20日 95折', '永久免年費'],
   '⚠️ AEON 20日 95折是折扣，非回贈。',
   '迎新高達 $700 現金回贈',
   '永久免年費',
   'https://www.aeon.com.hk/tc/credit-card/',
   1.95),
   
  ('aeon-unionpay', 'AEON 銀聯信用卡', 'AEON',
   ARRAY['AEON', '銀聯', '免外幣手續費'],
   ARRAY['AEON 20日 95折', '銀聯免外幣手續費', '永久免年費'],
   '⚠️ AEON 20日 95折是折扣，非回贈。銀聯免外幣手續費。',
   '迎新高達 $700 現金回贈',
   '永久免年費',
   'https://www.aeon.com.hk/tc/credit-card/',
   0),
   
  ('aeon-jcb', 'AEON JCB 信用卡', 'AEON',
   ARRAY['AEON', 'JCB', '日本'],
   ARRAY['AEON 20日 95折', 'JCB 日本優惠', '永久免年費'],
   '⚠️ AEON 20日 95折是折扣，非回贈。JCB 日本消費優惠。',
   '迎新高達 $600 現金回贈 (無手機支付獎賞)',
   '永久免年費',
   'https://www.aeon.com.hk/tc/credit-card/',
   1.95)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  bank = EXCLUDED.bank,
  tags = EXCLUDED.tags,
  selling_points = EXCLUDED.selling_points,
  note = EXCLUDED.note,
  welcome_offer_text = EXCLUDED.welcome_offer_text,
  fee_waiver_condition = EXCLUDED.fee_waiver_condition,
  apply_url = EXCLUDED.apply_url,
  foreign_currency_fee = EXCLUDED.foreign_currency_fee,
  updated_at = NOW();

-- ========== BEA 東亞 (3 張) ==========
INSERT INTO cards (id, name, bank, tags, selling_points, note, welcome_offer_text, fee_waiver_condition, apply_url, foreign_currency_fee)
VALUES 
  ('bea-goal', 'BEA GOAL Credit Card', 'BEA',
   ARRAY['現金回贈', '4.4%', '需月簽$2000'],
   ARRAY['每月消費 $2,000-$5,000 享 4.4%', '基本 0.4%'],
   '⚠️ 每月消費 $2,000-$5,000 享 4.4%，未滿或超過部分為 0.4%。',
   '迎新簽 $3,000 送 $300 現金回贈 (首2個月)',
   '永久免年費',
   'https://www.hkbea.com/html/tc/bea-goal-credit-card.html',
   1.95),
   
  ('bea-world-master', 'BEA World Mastercard', 'BEA',
   ARRAY['儲里數', '本地餐飲2.4%'],
   ARRAY['本地食肆 2.4%', '海外簽賬 1.6%', '基本 0.4%'],
   '⚠️ 本地食肆 6X (2.4%)，海外簽賬 4X (1.6%)。',
   '迎新簽 $4,000 送 $400 現金回贈 (全新) / $200 (現有) / 簽 $2,000 送 $200 (學生)',
   '首年免年費',
   'https://www.hkbea.com/html/tc/bea-world-mastercard.html',
   1.95),
   
  ('bea-i-titanium', 'BEA i-Titanium Card', 'BEA',
   ARRAY['網購2%', '學生卡'],
   ARRAY['網上簽賬 2%', '基本 0.4%'],
   '⚠️ 網上簽賬 5X (2%)，每月上限 $20,000 獎賞。',
   '迎新簽 $2,000 送 $200 現金回贈 (學生)',
   '永久免年費',
   'https://www.hkbea.com/html/tc/bea-i-titanium-card.html',
   1.95)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  bank = EXCLUDED.bank,
  tags = EXCLUDED.tags,
  selling_points = EXCLUDED.selling_points,
  note = EXCLUDED.note,
  welcome_offer_text = EXCLUDED.welcome_offer_text,
  fee_waiver_condition = EXCLUDED.fee_waiver_condition,
  apply_url = EXCLUDED.apply_url,
  foreign_currency_fee = EXCLUDED.foreign_currency_fee,
  updated_at = NOW();

-- ========== 安信 (2 張) ==========
INSERT INTO cards (id, name, bank, tags, selling_points, note, welcome_offer_text, fee_waiver_condition, apply_url, foreign_currency_fee)
VALUES 
  ('earnmore', 'EarnMORE 銀聯卡', '安信',
   ARRAY['全方位2%', '銀聯', '免外幣手續費'],
   ARRAY['全方位 2%', '銀聯免外幣手續費', '永久免年費'],
   '⚠️ 全方位 2%，每月上限 $1,500 回贈。現金回贈下期月結單入賬。',
   '迎新簽 $8,500 送 $500 現金回贈 (首90天內)',
   '永久免年費',
   'https://www.earnmore.hk/',
   0),
   
  ('wewa-unionpay', 'WeWa 銀聯卡', '安信',
   ARRAY['玩樂4%', '銀聯', '免外幣手續費'],
   ARRAY['玩樂類別 4% (手機支付/旅遊/海外/線上娛樂)', '銀聯免外幣手續費', '永久免年費'],
   '⚠️ 玩樂類別 4 選 1：手機支付/旅遊簽賬/海外簽賬/線上娛樂。需月簽 $1,500，每月上限 $200 回贈。',
   '迎新多款禮品選擇 (簽$8,800送LG顯示器/Marshall喇叭, 簽$8,500送$500現金, 學生簽$2,000送$200現金)',
   '永久免年費',
   'https://www.wewa.hk/',
   0)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  bank = EXCLUDED.bank,
  tags = EXCLUDED.tags,
  selling_points = EXCLUDED.selling_points,
  note = EXCLUDED.note,
  welcome_offer_text = EXCLUDED.welcome_offer_text,
  fee_waiver_condition = EXCLUDED.fee_waiver_condition,
  apply_url = EXCLUDED.apply_url,
  foreign_currency_fee = EXCLUDED.foreign_currency_fee,
  updated_at = NOW();

-- ========== 大新 (3 張) ==========
INSERT INTO cards (id, name, bank, tags, selling_points, note, welcome_offer_text, fee_waiver_condition, apply_url, foreign_currency_fee)
VALUES 
  ('dahsing-one', '大新 ONE+ 信用卡', '大新',
   ARRAY['現金回贈', '1%'],
   ARRAY['全方位 1%', '永久免年費'],
   '⚠️ 全方位 1% 現金回贈。',
   NULL,
   '永久免年費',
   'https://www.dahsing.com/html/tc/credit_card/one_plus.html',
   1.95),
   
  ('dahsing-ba', '大新 BA 信用卡', '大新',
   ARRAY['儲里數', 'BA'],
   ARRAY['儲 BA 里數', 'Avios 里數'],
   '⚠️ 儲 British Airways Avios 里數。',
   NULL,
   '首年免年費',
   'https://www.dahsing.com/html/tc/credit_card/ba.html',
   1.95),
   
  ('dahsing-myauto', '大新 MyAuto 車主信用卡', '大新',
   ARRAY['車主', '油站4%', '隧道費'],
   ARRAY['汽車相關 4% (油站/隧道費/停車場)', '基本 0.4%'],
   '⚠️ 汽車相關消費 4%：油站/隧道費 (易通行)/停車場/汽車維修。',
   NULL,
   '永久免年費',
   'https://www.dahsing.com/html/tc/credit_card/myauto.html',
   1.95)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  bank = EXCLUDED.bank,
  tags = EXCLUDED.tags,
  selling_points = EXCLUDED.selling_points,
  note = EXCLUDED.note,
  welcome_offer_text = EXCLUDED.welcome_offer_text,
  fee_waiver_condition = EXCLUDED.fee_waiver_condition,
  apply_url = EXCLUDED.apply_url,
  foreign_currency_fee = EXCLUDED.foreign_currency_fee,
  updated_at = NOW();

-- ========== CCB 建行 (2 張) ==========
INSERT INTO cards (id, name, bank, tags, selling_points, note, welcome_offer_text, fee_waiver_condition, apply_url, foreign_currency_fee)
VALUES 
  ('ccb-eye', 'CCB (Asia) eye Card', 'CCB',
   ARRAY['網購', '感應式支付', '餐飲9%'],
   ARRAY['本地餐飲及外賣平台 9%', '網購 4%', '感應式支付 4%'],
   '⚠️ 【餐飲/交通推廣】本地餐飲及外賣平台 9%，本地交通 2%，需登記。',
   '迎新簽 $6,000 送 $600 現金回贈 (首2個月) / Chill分期$15,000送$800 (首3個月)',
   '永久免年費',
   'https://www.asia.ccb.com/hongkong/personal/credit-cards/eye-card.html',
   1.95),
   
  ('ccb-travo', '建行(亞洲) TRAVO World Mastercard', 'CCB',
   ARRAY['旅遊', '海外10X', '餐飲5X'],
   ARRAY['海外簽賬 10X積分 (4%)', '本地餐飲 5X積分 (2%)', '海外商戶 15% 回贈'],
   '⚠️ 【TRAVO Rewards】海外 10X (4%)，本地餐飲 5X (2%)，需登記。【海外商戶回贈】指定商戶 15%。',
   NULL,
   '首年免年費',
   'https://www.asia.ccb.com/hongkong/personal/credit-cards/travo.html',
   1.95)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  bank = EXCLUDED.bank,
  tags = EXCLUDED.tags,
  selling_points = EXCLUDED.selling_points,
  note = EXCLUDED.note,
  welcome_offer_text = EXCLUDED.welcome_offer_text,
  fee_waiver_condition = EXCLUDED.fee_waiver_condition,
  apply_url = EXCLUDED.apply_url,
  foreign_currency_fee = EXCLUDED.foreign_currency_fee,
  updated_at = NOW();

-- ========== ICBC 工銀 (1 張) ==========
INSERT INTO cards (id, name, bank, tags, selling_points, note, welcome_offer_text, fee_waiver_condition, apply_url, foreign_currency_fee)
VALUES 
  ('icbc-horoscope', 'ICBC 宇宙星座 Visa Signature', 'ICBC',
   ARRAY['儲積分', '高端卡'],
   ARRAY['簽賬賺積分', 'Visa Signature 優惠'],
   '⚠️ 簽賬賺積分，可兌換里數或禮品。',
   '迎新簽 $3,000 送 $700 免找數簽賬額 (首2個月)',
   '首年免年費',
   'https://www.icbcasia.com/tc/personal/cards/credit-cards/',
   1.95)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  bank = EXCLUDED.bank,
  tags = EXCLUDED.tags,
  selling_points = EXCLUDED.selling_points,
  note = EXCLUDED.note,
  welcome_offer_text = EXCLUDED.welcome_offer_text,
  fee_waiver_condition = EXCLUDED.fee_waiver_condition,
  apply_url = EXCLUDED.apply_url,
  foreign_currency_fee = EXCLUDED.foreign_currency_fee,
  updated_at = NOW();

-- ========== CNCBI 信銀國際 (2 張) ==========
INSERT INTO cards (id, name, bank, tags, selling_points, note, welcome_offer_text, fee_waiver_condition, apply_url, foreign_currency_fee)
VALUES 
  ('cncbi-motion', 'CNCBI Motion Credit Card', 'CNCBI',
   ARRAY['餐飲6%', '網上6%', '需月簽$3800'],
   ARRAY['餐飲/網上 6%', '基本 0.55%'],
   '⚠️ 餐飲/網上 6%，需月簽 $3,800，每月上限 $200 回贈。',
   NULL,
   '永久免年費',
   'https://www.cncbinternational.com/personal/credit-cards/motion.html',
   1.95),
   
  ('cncbi-gba', '信銀國際大灣區雙幣信用卡', 'CNCBI',
   ARRAY['大灣區', '人民幣10%', '銀聯'],
   ARRAY['人民幣/雲閃付App 高達 10%', '銀聯免外幣手續費'],
   '⚠️ 【推廣】人民幣/雲閃付App簽賬：4% + 單筆滿CNY 4,000額外6% = 10%。每月上限 $150+$250 回贈。',
   NULL,
   '永久免年費',
   'https://www.cncbinternational.com/personal/credit-cards/gba.html',
   0)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  bank = EXCLUDED.bank,
  tags = EXCLUDED.tags,
  selling_points = EXCLUDED.selling_points,
  note = EXCLUDED.note,
  welcome_offer_text = EXCLUDED.welcome_offer_text,
  fee_waiver_condition = EXCLUDED.fee_waiver_condition,
  apply_url = EXCLUDED.apply_url,
  foreign_currency_fee = EXCLUDED.foreign_currency_fee,
  updated_at = NOW();

-- ========== Fubon 富邦 (5 張) ==========
INSERT INTO cards (id, name, bank, tags, selling_points, note, welcome_offer_text, fee_waiver_condition, apply_url, foreign_currency_fee)
VALUES 
  ('fubon-titanium', 'Fubon Titanium Card', '富邦',
   ARRAY['台灣8%', '日韓4%', '網購4%'],
   ARRAY['新台幣簽賬 8%', '日圓/韓圜簽賬 4%', '本地網上 4%'],
   '⚠️ 新台幣 8%，日圓/韓圜 4%，本地網上 4% (需登記)。',
   NULL,
   '永久免年費',
   'https://www.fubonbank.com.hk/tc/cards/credit-card-products/titanium.html',
   1.95),
   
  ('fubon-yata', '富邦一田 Visa 白金卡', '富邦',
   ARRAY['一田', 'VIP Day 95折'],
   ARRAY['一田 VIP Day 95折', '一田消費優惠'],
   '⚠️ 一田 VIP Day 95折是折扣，非回贈。',
   NULL,
   '永久免年費',
   'https://www.fubonbank.com.hk/tc/cards/credit-card-products/yata.html',
   1.95),
   
  ('fubon-platinum', '富邦白金卡', '富邦',
   ARRAY['台灣8%', '日韓4%', '網購4%'],
   ARRAY['新台幣簽賬 8%', '日圓/韓圜簽賬 4%', '本地網上 4%'],
   '⚠️ 新台幣 8%，日圓/韓圜 4%，本地網上 4% (需登記)。',
   NULL,
   '永久免年費',
   'https://www.fubonbank.com.hk/tc/cards/credit-card-products/platinum.html',
   1.95),
   
  ('fubon-visa-infinite', '富邦 Visa Infinite 卡', '富邦',
   ARRAY['台灣10%', '日韓5%', '網購5%', '高端卡'],
   ARRAY['新台幣簽賬 10%', '日圓/韓圜簽賬 5%', '本地網上 5%'],
   '⚠️ 新台幣 10%，日圓/韓圜 5%，本地網上 5% (需登記)。高端卡。',
   NULL,
   '需年簽滿指定金額',
   'https://www.fubonbank.com.hk/tc/cards/credit-card-products/visa-infinite.html',
   1.95),
   
  ('fubon-incard', 'Fubon iN VISA 白金卡', '富邦',
   ARRAY['網購8%', '永久免年費'],
   ARRAY['網上簽賬 8%', '永久免年費'],
   '⚠️ 網上簽賬 8%，每月上限 $300 回贈（首 $3,750 簽賬）。',
   '迎新簽 $5,000 送 $150 現金回贈 (首3個月內)',
   '永久免年費',
   'https://www.fubonbank.com.hk/tc/cards/credit-card-products/incard.html',
   1.95)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  bank = EXCLUDED.bank,
  tags = EXCLUDED.tags,
  selling_points = EXCLUDED.selling_points,
  note = EXCLUDED.note,
  welcome_offer_text = EXCLUDED.welcome_offer_text,
  fee_waiver_condition = EXCLUDED.fee_waiver_condition,
  apply_url = EXCLUDED.apply_url,
  foreign_currency_fee = EXCLUDED.foreign_currency_fee,
  updated_at = NOW();

-- ========== 其他 (4 張) ==========
INSERT INTO cards (id, name, bank, tags, selling_points, note, welcome_offer_text, fee_waiver_condition, apply_url, foreign_currency_fee)
VALUES 
  ('amex-explorer', 'AMEX Explorer', 'American Express',
   ARRAY['儲里數', 'Lounge', '高端卡'],
   ARRAY['簽賬賺積分', '機場貴賓室', 'AMEX 專屬優惠'],
   '⚠️ 簽賬賺積分，可兌換多個航空公司里數。',
   NULL,
   '首年免年費',
   'https://www.americanexpress.com/hk/credit-cards/explorer-credit-card/',
   2.0),
   
  ('mox-credit', 'Mox Credit', 'Mox',
   ARRAY['現金回贈', '無限1%'],
   ARRAY['全方位 1%', '無上限', '永久免年費'],
   '⚠️ 全方位 1% 無上限現金回贈。',
   NULL,
   '永久免年費',
   'https://mox.com/hk/zh/products/mox-credit/',
   0),
   
  ('sim-credit-card', 'sim Credit Card', 'sim',
   ARRAY['網購8%', '交通8%', '需月簽$1000'],
   ARRAY['網上簽賬 8% (單筆滿$500)', '交通 8%', '基本 0.4%'],
   '⚠️ 網上/交通 8%，需月簽 $1,000，每月上限 $200 回贈。',
   NULL,
   '永久免年費',
   'https://www.simcard.com.hk/',
   1.95),
   
  ('sim-world-mastercard', 'sim World Mastercard', 'sim',
   ARRAY['網購8%', '海外8%', '需月簽$1000'],
   ARRAY['網購 8% (單筆滿$500)', '海外 8%', '指定商戶 3%'],
   '⚠️ 網購/海外 8%，需月簽 $1,000，每月上限 $200 回贈。',
   NULL,
   '永久免年費',
   'https://www.simcard.com.hk/',
   1.95)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  bank = EXCLUDED.bank,
  tags = EXCLUDED.tags,
  selling_points = EXCLUDED.selling_points,
  note = EXCLUDED.note,
  welcome_offer_text = EXCLUDED.welcome_offer_text,
  fee_waiver_condition = EXCLUDED.fee_waiver_condition,
  apply_url = EXCLUDED.apply_url,
  foreign_currency_fee = EXCLUDED.foreign_currency_fee,
  updated_at = NOW();

-- =====================================================
-- 完成！共同步 61 張信用卡
-- =====================================================
SELECT 'Successfully synced ' || COUNT(*) || ' cards!' AS result FROM cards;

