create extension if not exists "uuid-ossp";

create table if not exists public.admins (
  email text primary key,
  created_at timestamptz not null default now()
);

create table if not exists public.players (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  number int not null,
  position text not null check (position in ('Goleiro','Fixo','Ala','Pivô')),
  bio text,
  photo_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.matches (
  id uuid primary key default uuid_generate_v4(),
  datetime timestamptz not null,
  competition text,
  opponent text not null,
  venue text not null,
  is_home boolean not null default true,
  status text not null check (status in ('PRÓXIMO','FINALIZADO','CANCELADO')),
  home_score int,
  away_score int,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  price_cents int not null,
  image_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end $$;

drop trigger if exists t_players_updated_at on public.players;
create trigger t_players_updated_at before update on public.players for each row execute function public.set_updated_at();
drop trigger if exists t_matches_updated_at on public.matches;
create trigger t_matches_updated_at before update on public.matches for each row execute function public.set_updated_at();
drop trigger if exists t_products_updated_at on public.products;
create trigger t_products_updated_at before update on public.products for each row execute function public.set_updated_at();

alter table public.admins enable row level security;
alter table public.players enable row level security;
alter table public.matches enable row level security;
alter table public.products enable row level security;

create or replace function public.is_admin()
returns boolean language sql stable as $$
  select exists (select 1 from public.admins a where a.email = (auth.jwt() ->> 'email'));
$$;

drop policy if exists "admins_read" on public.admins;
create policy "admins_read" on public.admins for select to authenticated using (public.is_admin());

drop policy if exists "players_read_public" on public.players;
create policy "players_read_public" on public.players for select to anon, authenticated using (true);
drop policy if exists "players_write_admin" on public.players;
create policy "players_write_admin" on public.players for insert to authenticated with check (public.is_admin());
drop policy if exists "players_update_admin" on public.players;
create policy "players_update_admin" on public.players for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "players_delete_admin" on public.players;
create policy "players_delete_admin" on public.players for delete to authenticated using (public.is_admin());

drop policy if exists "matches_read_public" on public.matches;
create policy "matches_read_public" on public.matches for select to anon, authenticated using (true);
drop policy if exists "matches_write_admin" on public.matches;
create policy "matches_write_admin" on public.matches for insert to authenticated with check (public.is_admin());
drop policy if exists "matches_update_admin" on public.matches;
create policy "matches_update_admin" on public.matches for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "matches_delete_admin" on public.matches;
create policy "matches_delete_admin" on public.matches for delete to authenticated using (public.is_admin());

drop policy if exists "products_read_public" on public.products;
create policy "products_read_public" on public.products for select to anon, authenticated using (true);
drop policy if exists "products_write_admin" on public.products;
create policy "products_write_admin" on public.products for insert to authenticated with check (public.is_admin());
drop policy if exists "products_update_admin" on public.products;
create policy "products_update_admin" on public.products for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "products_delete_admin" on public.products;
create policy "products_delete_admin" on public.products for delete to authenticated using (public.is_admin());

insert into public.admins(email) values ('bielmacali44@gmail.com') on conflict do nothing;
insert into public.products(name, price_cents, is_active)
values ('Camisa Oficial 2025',14990,true),('Agasalho Preto & Dourado',21990,true),('Caneca Oficial',3990,true)
on conflict do nothing;
