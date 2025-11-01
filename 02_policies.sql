-- Habilitar RLS si quieres controlar accesos (opcional)
alter table if exists public.productos enable row level security;

-- Tabla de administradores (vinculada a auth.users)
create table if not exists public.admins (
  id uuid references auth.users(id) primary key,
  created_at timestamptz default now()
);

-- Policy: permitir lectura pública (si quieres que la tienda sea pública)
create policy "Public read" on public.productos
  for select
  using (true);

-- Policy: permitir insert/update/delete solo a usuarios que estén en admins
create policy "Admins can modify" on public.productos
  for all
  using ( auth.uid() in (select id from public.admins) )
  with check ( auth.uid() in (select id from public.admins) );

-- Nota: añade tu user auth UUID a public.admins para habilitar permisos:
-- insert into public.admins (id) values ('<tu-uuid-de-auth-user>');