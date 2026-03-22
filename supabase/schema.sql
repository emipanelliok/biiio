-- ============================================
-- Biiio Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Profiles table (extends auth.users)
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique not null,
  display_name text,
  bio text,
  avatar_url text,
  category text,
  theme text default 'pastel-dream',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Username index for fast public profile lookups
create unique index profiles_username_idx on public.profiles (username);

-- Links table
create table public.links (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  url text not null,
  description text,
  emoji text,
  type text default 'link' check (type in ('link', 'hero')),
  active boolean default true,
  sort_order integer default 0,
  clicks integer default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index links_user_id_idx on public.links (user_id);
create index links_sort_order_idx on public.links (user_id, sort_order);

-- Socials table
create table public.socials (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  platform text not null,
  url text not null
);

create index socials_user_id_idx on public.socials (user_id);

-- Analytics events
create table public.analytics_events (
  id uuid default gen_random_uuid() primary key,
  link_id uuid references public.links(id) on delete cascade,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  event_type text not null check (event_type in ('view', 'click')),
  referrer text,
  country text,
  device text,
  created_at timestamptz default now()
);

create index analytics_profile_idx on public.analytics_events (profile_id, created_at);
create index analytics_link_idx on public.analytics_events (link_id, created_at);

-- ============================================
-- Row Level Security (RLS)
-- ============================================

alter table public.profiles enable row level security;
alter table public.links enable row level security;
alter table public.socials enable row level security;
alter table public.analytics_events enable row level security;

-- Profiles: anyone can read, only owner can update
create policy "Public profiles are viewable by everyone"
  on public.profiles for select using (true);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

-- Links: anyone can read active links, owner can CRUD
create policy "Active links are viewable by everyone"
  on public.links for select using (active = true or auth.uid() = user_id);

create policy "Users can insert own links"
  on public.links for insert with check (auth.uid() = user_id);

create policy "Users can update own links"
  on public.links for update using (auth.uid() = user_id);

create policy "Users can delete own links"
  on public.links for delete using (auth.uid() = user_id);

-- Socials: anyone can read, owner can CRUD
create policy "Socials are viewable by everyone"
  on public.socials for select using (true);

create policy "Users can manage own socials"
  on public.socials for all using (auth.uid() = user_id);

-- Analytics: anyone can insert (for tracking), only owner can read
create policy "Anyone can insert analytics"
  on public.analytics_events for insert with check (true);

create policy "Users can read own analytics"
  on public.analytics_events for select using (auth.uid() = profile_id);

-- ============================================
-- Auto-create profile on signup
-- ============================================

create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, username, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)),
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
