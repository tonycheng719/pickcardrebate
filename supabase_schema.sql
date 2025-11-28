-- 1. Enable necessary extensions
create extension if not exists "uuid-ossp";

-- 2. Create Tables

-- Profiles (Extends Supabase Auth)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  name text,
  avatar_url text,
  reward_preference text default 'cash',
  notifications jsonb default '{"promos": true, "bills": true, "community": true}'::jsonb,
  followed_promo_ids text[] default array[]::text[],
  role text default 'user', -- 'user' or 'admin'
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Cards
create table public.cards (
  id text primary key, -- We keep string id like 'hsbc-red' for readable URLs/logic, or use uuid
  name text not null,
  bank text not null,
  image_url text,
  style jsonb, -- { bgColor: "...", textColor: "..." }
  tags text[],
  base_reward jsonb, -- Store base rule simplified
  foreign_currency_fee numeric,
  reward_timeline text,
  welcome_offer_text text,
  welcome_offer_reward text,
  welcome_offer_deadline text,
  apply_url text,
  selling_points text[],
  fee_waiver_condition text,
  waiver_method text,
  rules jsonb, -- Store the complex array of RewardRule as JSONB for flexibility
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Merchants
create table public.merchants (
  id text primary key,
  name text not null,
  category_ids text[],
  logo text,
  accent_color text,
  is_general boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Promos
create table public.promos (
  id text primary key,
  title text not null,
  description text,
  merchant text,
  tags text[],
  image_url text,
  url text,
  expiry_date text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Reviews
create table public.reviews (
  id uuid default uuid_generate_v4() primary key,
  card_id text references public.cards(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  user_name text,
  rating integer check (rating >= 1 and rating <= 5),
  content text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.cards enable row level security;
alter table public.merchants enable row level security;
alter table public.promos enable row level security;
alter table public.reviews enable row level security;

-- 4. Create Policies

-- Profiles: Public read, Self update
create policy "Public profiles are viewable by everyone." on public.profiles for select using (true);
create policy "Users can insert their own profile." on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update own profile." on public.profiles for update using (auth.uid() = id);

-- Cards/Merchants/Promos: Public read, Admin write (Simplified for now: everyone read)
create policy "Cards are viewable by everyone." on public.cards for select using (true);
create policy "Merchants are viewable by everyone." on public.merchants for select using (true);
create policy "Promos are viewable by everyone." on public.promos for select using (true);

-- Reviews: Public read, Authenticated create
create policy "Reviews are viewable by everyone." on public.reviews for select using (true);
create policy "Authenticated users can create reviews." on public.reviews for insert with check (auth.role() = 'authenticated');

-- 5. Create a function to handle new user sign up (Triggers)
create or replace function public.handle_new_user() 
returns trigger as $$
begin
  insert into public.profiles (id, email, name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();



