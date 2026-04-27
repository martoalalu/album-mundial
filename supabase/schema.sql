-- profiles (se crea automáticamente al registrarse)
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  created_at timestamptz default now()
);

-- groups
create table groups (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  invite_code text unique not null,
  created_by uuid references profiles(id),
  created_at timestamptz default now()
);

-- group_members
create table group_members (
  group_id uuid references groups(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  joined_at timestamptz default now(),
  primary key (group_id, user_id)
);

-- collections
create table collections (
  user_id uuid references profiles(id) on delete cascade,
  sticker_n int not null check (sticker_n >= 1 and sticker_n <= 980),
  count int not null default 0 check (count >= 0),
  updated_at timestamptz default now(),
  primary key (user_id, sticker_n)
);

create index on collections (user_id);
create index on group_members (user_id);
create index on group_members (group_id);

-- RLS
alter table profiles enable row level security;
alter table groups enable row level security;
alter table group_members enable row level security;
alter table collections enable row level security;

-- profiles
create policy "profiles_select" on profiles for select using (true);
create policy "profiles_insert" on profiles for insert with check (auth.uid() = id);
create policy "profiles_update" on profiles for update using (auth.uid() = id);

-- groups (lectura pública para poder unirse por código)
create policy "groups_select" on groups for select using (true);
create policy "groups_insert" on groups for insert with check (auth.uid() = created_by);

-- group_members
create policy "group_members_select" on group_members for select using (
  auth.uid() = user_id or
  group_id in (select group_id from group_members where user_id = auth.uid())
);
create policy "group_members_insert" on group_members for insert with check (auth.uid() = user_id);
create policy "group_members_delete" on group_members for delete using (auth.uid() = user_id);

-- collections
create policy "collections_select" on collections for select using (
  user_id = auth.uid() or
  user_id in (
    select gm2.user_id from group_members gm1
    join group_members gm2 on gm1.group_id = gm2.group_id
    where gm1.user_id = auth.uid()
  )
);
create policy "collections_insert" on collections for insert with check (auth.uid() = user_id);
create policy "collections_update" on collections for update using (auth.uid() = user_id);
create policy "collections_delete" on collections for delete using (auth.uid() = user_id);

-- trigger: crear perfil automáticamente al registrarse
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
