-- Crear el grupo General con ID fijo
insert into groups (id, name, invite_code)
values ('00000000-0000-0000-0000-000000000001', 'General', 'GENERAL')
on conflict (id) do nothing;

-- Actualizar el trigger para auto-agregar al grupo General al registrarse
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  );

  insert into public.group_members (group_id, user_id)
  values ('00000000-0000-0000-0000-000000000001', new.id);

  return new;
end;
$$;
