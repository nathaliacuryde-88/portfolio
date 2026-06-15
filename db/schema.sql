-- =====================================================================
-- Nathalia Cury — Portfolio CMS schema (Supabase / Postgres)
-- Run this once in the Supabase SQL editor (or I apply it via MCP).
-- =====================================================================

-- ---- SITE (single row): profile, statement, hero slides, about, cv, contact
create table if not exists public.site (
  id          int primary key default 1,
  data        jsonb not null default '{}'::jsonb,
  updated_at  timestamptz not null default now(),
  constraint site_single_row check (id = 1)
);

-- ---- PROJECTS
create table if not exists public.projects (
  id                text primary key,            -- slug, e.g. "x1f"
  position          int  not null default 0,     -- order in the Work grid
  featured_position int,                          -- null = not featured; else order in Featured
  category          text not null default 'Branding',
  published         boolean not null default true,
  data              jsonb not null default '{}'::jsonb,  -- title, client, year, accent, bg,
                                                          -- summary, description, role, team[],
                                                          -- stats[], hero{src,focalX,focalY},
                                                          -- blocks[] (ordered modules)
  updated_at        timestamptz not null default now()
);
create index if not exists projects_position_idx on public.projects (position);
create index if not exists projects_featured_idx on public.projects (featured_position);

-- ---- updated_at trigger
create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists site_touch on public.site;
create trigger site_touch before update on public.site
  for each row execute function public.touch_updated_at();
drop trigger if exists projects_touch on public.projects;
create trigger projects_touch before update on public.projects
  for each row execute function public.touch_updated_at();

-- =====================================================================
-- Row Level Security: public can READ, only the owner email can WRITE
-- =====================================================================
alter table public.site     enable row level security;
alter table public.projects enable row level security;

-- public read
drop policy if exists site_read on public.site;
create policy site_read on public.site for select using (true);
drop policy if exists projects_read on public.projects;
create policy projects_read on public.projects for select using (true);

-- owner write (replace the email if needed)
drop policy if exists site_write on public.site;
create policy site_write on public.site for all
  using (auth.jwt() ->> 'email' = 'nathaliacuryde@gmail.com')
  with check (auth.jwt() ->> 'email' = 'nathaliacuryde@gmail.com');
drop policy if exists projects_write on public.projects;
create policy projects_write on public.projects for all
  using (auth.jwt() ->> 'email' = 'nathaliacuryde@gmail.com')
  with check (auth.jwt() ->> 'email' = 'nathaliacuryde@gmail.com');

-- =====================================================================
-- Storage bucket for uploads (images + video), public read
-- =====================================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists media_read on storage.objects;
create policy media_read on storage.objects for select using (bucket_id = 'media');

drop policy if exists media_write on storage.objects;
create policy media_write on storage.objects for all
  using (bucket_id = 'media' and auth.jwt() ->> 'email' = 'nathaliacuryde@gmail.com')
  with check (bucket_id = 'media' and auth.jwt() ->> 'email' = 'nathaliacuryde@gmail.com');
