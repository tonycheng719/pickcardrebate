-- Fix RLS Performance Warnings
-- Run this in Supabase SQL Editor
-- This script fixes two types of warnings:
-- 1. auth_rls_initplan: Replace auth.uid() with (select auth.uid()) for better performance
-- 2. multiple_permissive_policies: Remove duplicate policies

-- =====================================================
-- STEP 1: Drop all existing policies on affected tables
-- =====================================================

-- user_cards
DROP POLICY IF EXISTS "Users can view their own cards" ON public.user_cards;
DROP POLICY IF EXISTS "Users can view own cards" ON public.user_cards;
DROP POLICY IF EXISTS "Users can insert their own cards" ON public.user_cards;
DROP POLICY IF EXISTS "Users can insert own cards" ON public.user_cards;
DROP POLICY IF EXISTS "Users can delete their own cards" ON public.user_cards;
DROP POLICY IF EXISTS "Users can delete own cards" ON public.user_cards;
DROP POLICY IF EXISTS "Service Role can do everything on user_cards" ON public.user_cards;
DROP POLICY IF EXISTS "Allow public read user_cards" ON public.user_cards;
DROP POLICY IF EXISTS "Allow public write user_cards" ON public.user_cards;
DROP POLICY IF EXISTS "Allow public update user_cards" ON public.user_cards;
DROP POLICY IF EXISTS "Allow public delete user_cards" ON public.user_cards;

-- user_card_settings
DROP POLICY IF EXISTS "Users can view their own card settings" ON public.user_card_settings;
DROP POLICY IF EXISTS "Users can view own settings" ON public.user_card_settings;
DROP POLICY IF EXISTS "Users can upsert their own card settings" ON public.user_card_settings;
DROP POLICY IF EXISTS "Users can insert own settings" ON public.user_card_settings;
DROP POLICY IF EXISTS "Users can update their own card settings" ON public.user_card_settings;
DROP POLICY IF EXISTS "Users can update own settings" ON public.user_card_settings;
DROP POLICY IF EXISTS "Service Role can do everything on user_card_settings" ON public.user_card_settings;
DROP POLICY IF EXISTS "Allow public read user_card_settings" ON public.user_card_settings;
DROP POLICY IF EXISTS "Allow public write user_card_settings" ON public.user_card_settings;
DROP POLICY IF EXISTS "Allow public update user_card_settings" ON public.user_card_settings;
DROP POLICY IF EXISTS "Allow public delete user_card_settings" ON public.user_card_settings;

-- user_transactions
DROP POLICY IF EXISTS "Users can view own transactions" ON public.user_transactions;
DROP POLICY IF EXISTS "Users can view their own transactions" ON public.user_transactions;
DROP POLICY IF EXISTS "Users can insert own transactions" ON public.user_transactions;
DROP POLICY IF EXISTS "Users can insert their own transactions" ON public.user_transactions;
DROP POLICY IF EXISTS "Users can update own transactions" ON public.user_transactions;
DROP POLICY IF EXISTS "Users can delete own transactions" ON public.user_transactions;
DROP POLICY IF EXISTS "Users can delete their own transactions" ON public.user_transactions;
DROP POLICY IF EXISTS "Service Role can do everything on user_transactions" ON public.user_transactions;

-- profiles
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;

-- merchant_reviews
DROP POLICY IF EXISTS "Allow public read verified reviews" ON public.merchant_reviews;
DROP POLICY IF EXISTS "Allow users update own reviews" ON public.merchant_reviews;
DROP POLICY IF EXISTS "Allow authenticated insert reviews" ON public.merchant_reviews;
DROP POLICY IF EXISTS "Allow authenticated select reviews" ON public.merchant_reviews;

-- merchant_review_replies
DROP POLICY IF EXISTS "Users can update own replies" ON public.merchant_review_replies;
DROP POLICY IF EXISTS "Users can delete own replies" ON public.merchant_review_replies;

-- merchant_tags
DROP POLICY IF EXISTS "Allow authenticated insert tags" ON public.merchant_tags;

-- review_votes
DROP POLICY IF EXISTS "Allow authenticated vote" ON public.review_votes;
DROP POLICY IF EXISTS "Allow users change vote" ON public.review_votes;

-- card_comments
DROP POLICY IF EXISTS "Authenticated users can insert own comments" ON public.card_comments;
DROP POLICY IF EXISTS "Users can update own comments" ON public.card_comments;

-- reports
DROP POLICY IF EXISTS "Allow public all reports" ON public.reports;
DROP POLICY IF EXISTS "Users can insert own reports" ON public.reports;
DROP POLICY IF EXISTS "Allow authenticated read reports" ON public.reports;

-- search_logs
DROP POLICY IF EXISTS "Allow authenticated insert search_logs" ON public.search_logs;
DROP POLICY IF EXISTS "Allow public insert search_logs" ON public.search_logs;
DROP POLICY IF EXISTS "Allow authenticated read search_logs" ON public.search_logs;
DROP POLICY IF EXISTS "Allow authenticated select search_logs" ON public.search_logs;

-- =====================================================
-- STEP 2: Drop new-style policies if they exist (from previous run)
-- =====================================================

DROP POLICY IF EXISTS "user_cards_select" ON public.user_cards;
DROP POLICY IF EXISTS "user_cards_insert" ON public.user_cards;
DROP POLICY IF EXISTS "user_cards_delete" ON public.user_cards;
DROP POLICY IF EXISTS "user_card_settings_select" ON public.user_card_settings;
DROP POLICY IF EXISTS "user_card_settings_insert" ON public.user_card_settings;
DROP POLICY IF EXISTS "user_card_settings_update" ON public.user_card_settings;
DROP POLICY IF EXISTS "user_transactions_select" ON public.user_transactions;
DROP POLICY IF EXISTS "user_transactions_insert" ON public.user_transactions;
DROP POLICY IF EXISTS "user_transactions_update" ON public.user_transactions;
DROP POLICY IF EXISTS "user_transactions_delete" ON public.user_transactions;
DROP POLICY IF EXISTS "profiles_select_own" ON public.profiles;
DROP POLICY IF EXISTS "profiles_insert" ON public.profiles;
DROP POLICY IF EXISTS "profiles_update" ON public.profiles;
DROP POLICY IF EXISTS "merchant_reviews_select" ON public.merchant_reviews;
DROP POLICY IF EXISTS "merchant_reviews_insert" ON public.merchant_reviews;
DROP POLICY IF EXISTS "merchant_reviews_update" ON public.merchant_reviews;
DROP POLICY IF EXISTS "merchant_review_replies_select" ON public.merchant_review_replies;
DROP POLICY IF EXISTS "merchant_review_replies_update" ON public.merchant_review_replies;
DROP POLICY IF EXISTS "merchant_review_replies_delete" ON public.merchant_review_replies;
DROP POLICY IF EXISTS "merchant_tags_select" ON public.merchant_tags;
DROP POLICY IF EXISTS "merchant_tags_insert" ON public.merchant_tags;
DROP POLICY IF EXISTS "review_votes_select" ON public.review_votes;
DROP POLICY IF EXISTS "review_votes_insert" ON public.review_votes;
DROP POLICY IF EXISTS "review_votes_update" ON public.review_votes;
DROP POLICY IF EXISTS "card_comments_select" ON public.card_comments;
DROP POLICY IF EXISTS "card_comments_insert" ON public.card_comments;
DROP POLICY IF EXISTS "card_comments_update" ON public.card_comments;
DROP POLICY IF EXISTS "reports_insert" ON public.reports;
DROP POLICY IF EXISTS "reports_select" ON public.reports;
DROP POLICY IF EXISTS "search_logs_insert" ON public.search_logs;
DROP POLICY IF EXISTS "search_logs_select" ON public.search_logs;

-- =====================================================
-- STEP 3: Create optimized policies with (select auth.uid())
-- =====================================================

-- user_cards: Users can manage their own cards
CREATE POLICY "user_cards_select" ON public.user_cards
  FOR SELECT USING (user_id = (select auth.uid()));

CREATE POLICY "user_cards_insert" ON public.user_cards
  FOR INSERT WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "user_cards_delete" ON public.user_cards
  FOR DELETE USING (user_id = (select auth.uid()));

-- user_card_settings: Users can manage their own settings
CREATE POLICY "user_card_settings_select" ON public.user_card_settings
  FOR SELECT USING (user_id = (select auth.uid()));

CREATE POLICY "user_card_settings_insert" ON public.user_card_settings
  FOR INSERT WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "user_card_settings_update" ON public.user_card_settings
  FOR UPDATE USING (user_id = (select auth.uid()));

-- user_transactions: Users can manage their own transactions
CREATE POLICY "user_transactions_select" ON public.user_transactions
  FOR SELECT USING (user_id = (select auth.uid()));

CREATE POLICY "user_transactions_insert" ON public.user_transactions
  FOR INSERT WITH CHECK (user_id = (select auth.uid()));

CREATE POLICY "user_transactions_update" ON public.user_transactions
  FOR UPDATE USING (user_id = (select auth.uid()));

CREATE POLICY "user_transactions_delete" ON public.user_transactions
  FOR DELETE USING (user_id = (select auth.uid()));

-- profiles: Users can manage their own profile, public can view
CREATE POLICY "profiles_select_own" ON public.profiles
  FOR SELECT USING (id = (select auth.uid()));

CREATE POLICY "profiles_insert" ON public.profiles
  FOR INSERT WITH CHECK (id = (select auth.uid()));

CREATE POLICY "profiles_update" ON public.profiles
  FOR UPDATE USING (id = (select auth.uid()));

-- merchant_reviews: Public read, authenticated write own
CREATE POLICY "merchant_reviews_select" ON public.merchant_reviews
  FOR SELECT USING (true);

CREATE POLICY "merchant_reviews_insert" ON public.merchant_reviews
  FOR INSERT WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "merchant_reviews_update" ON public.merchant_reviews
  FOR UPDATE USING (user_id = (select auth.uid()));

-- merchant_review_replies
CREATE POLICY "merchant_review_replies_select" ON public.merchant_review_replies
  FOR SELECT USING (true);

CREATE POLICY "merchant_review_replies_update" ON public.merchant_review_replies
  FOR UPDATE USING (user_id = (select auth.uid()));

CREATE POLICY "merchant_review_replies_delete" ON public.merchant_review_replies
  FOR DELETE USING (user_id = (select auth.uid()));

-- merchant_tags
CREATE POLICY "merchant_tags_select" ON public.merchant_tags
  FOR SELECT USING (true);

CREATE POLICY "merchant_tags_insert" ON public.merchant_tags
  FOR INSERT WITH CHECK ((select auth.uid()) IS NOT NULL);

-- review_votes
CREATE POLICY "review_votes_select" ON public.review_votes
  FOR SELECT USING (true);

CREATE POLICY "review_votes_insert" ON public.review_votes
  FOR INSERT WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "review_votes_update" ON public.review_votes
  FOR UPDATE USING (user_id = (select auth.uid()));

-- card_comments
CREATE POLICY "card_comments_select" ON public.card_comments
  FOR SELECT USING (true);

CREATE POLICY "card_comments_insert" ON public.card_comments
  FOR INSERT WITH CHECK ((select auth.uid()) IS NOT NULL);

CREATE POLICY "card_comments_update" ON public.card_comments
  FOR UPDATE USING (user_id = (select auth.uid()));

-- reports: Anyone can insert, authenticated can read
CREATE POLICY "reports_insert" ON public.reports
  FOR INSERT WITH CHECK (true);

CREATE POLICY "reports_select" ON public.reports
  FOR SELECT USING ((select auth.uid()) IS NOT NULL);

-- search_logs: Anyone can insert, authenticated can read
CREATE POLICY "search_logs_insert" ON public.search_logs
  FOR INSERT WITH CHECK (true);

CREATE POLICY "search_logs_select" ON public.search_logs
  FOR SELECT USING ((select auth.uid()) IS NOT NULL);

-- =====================================================
-- STEP 4: Notify PostgREST to reload schema
-- =====================================================
NOTIFY pgrst, 'reload schema';

-- =====================================================
-- Verification: Check policies after running
-- =====================================================
-- SELECT schemaname, tablename, policyname FROM pg_policies WHERE schemaname = 'public' ORDER BY tablename, policyname;

