-- Atelier CV — Supabase schema
-- Run this once in the Supabase SQL editor (or via `supabase db push`).

-- 1. Profiles ----------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Auto-create a profile row whenever a new auth user is created.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email)
  values (new.id, new.email);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- security-definer helper so admin policies don't recurse on `profiles`
create or replace function public.is_admin()
returns boolean
language sql
security definer set search_path = public
stable
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'admin'
  );
$$;

create policy "profiles: read own or admin"
  on public.profiles for select
  using (auth.uid() = id or public.is_admin());

create policy "profiles: update own"
  on public.profiles for update
  using (auth.uid() = id);

-- 2. Resumes -------------------------------------------------------------
create table if not exists public.resumes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  theme jsonb not null default '{}'::jsonb,
  locale text not null default 'en',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id)
);

alter table public.resumes enable row level security;

create policy "resumes: manage own"
  on public.resumes for all
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "resumes: admin read all"
  on public.resumes for select
  using (public.is_admin());

-- 3. Activity / IP + geolocation log -------------------------------------
create table if not exists public.user_activity (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  ip text,
  city text,
  region text,
  country text,
  isp text,
  user_agent text,
  event text not null default 'login',
  created_at timestamptz not null default now()
);

alter table public.user_activity enable row level security;

create policy "activity: insert own"
  on public.user_activity for insert
  with check (auth.uid() = user_id);

create policy "activity: read own or admin"
  on public.user_activity for select
  using (auth.uid() = user_id or public.is_admin());

create index if not exists user_activity_user_id_idx
  on public.user_activity (user_id, created_at desc);

-- 4. Promote the first admin manually, e.g.:
-- update public.profiles set role = 'admin' where email = 'you@example.com';
