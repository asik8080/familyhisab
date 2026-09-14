begin;

create or replace function public.current_user_role()
returns text
language sql
stable
security definer
set search_path = public, pg_temp
set row_security = off
as $$
  select role from public.users where id = auth.uid();
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
set row_security = off
as $$
  select coalesce(public.current_user_role() = 'Admin', false);
$$;

alter table public.users enable row level security;
alter table public.expenses enable row level security;
alter table public.incomes enable row level security;
alter table public.expense_categories enable row level security;
alter table public.income_categories enable row level security;
alter table public.users alter column role set default 'Member';

drop policy if exists users_select_own_or_admin on public.users;
drop policy if exists users_insert_self_or_admin on public.users;
drop policy if exists users_update_own_or_admin on public.users;
drop policy if exists users_delete_admin on public.users;

create policy users_select_own_or_admin on public.users
for select using (id = auth.uid() or public.is_admin());

create policy users_insert_self_or_admin on public.users
for insert with check ((id = auth.uid() and coalesce(role, 'Member') = 'Member') or public.is_admin());

create policy users_update_own_or_admin on public.users
for update
using (id = auth.uid() or public.is_admin())
with check ((id = auth.uid() and role = public.current_user_role()) or public.is_admin());

create policy users_delete_admin on public.users
for delete using (public.is_admin());

drop policy if exists expenses_select_own on public.expenses;
drop policy if exists expenses_insert_own on public.expenses;
drop policy if exists expenses_update_own on public.expenses;
drop policy if exists expenses_delete_own on public.expenses;

create policy expenses_select_own on public.expenses
for select using (user_id = auth.uid());

create policy expenses_insert_own on public.expenses
for insert with check (user_id = auth.uid());

create policy expenses_update_own on public.expenses
for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy expenses_delete_own on public.expenses
for delete using (user_id = auth.uid());

drop policy if exists incomes_select_own on public.incomes;
drop policy if exists incomes_insert_own on public.incomes;
drop policy if exists incomes_update_own on public.incomes;
drop policy if exists incomes_delete_own on public.incomes;

create policy incomes_select_own on public.incomes
for select using (user_id = auth.uid());

create policy incomes_insert_own on public.incomes
for insert with check (user_id = auth.uid());

create policy incomes_update_own on public.incomes
for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy incomes_delete_own on public.incomes
for delete using (user_id = auth.uid());

drop policy if exists expense_categories_select_own on public.expense_categories;
drop policy if exists expense_categories_insert_own on public.expense_categories;
drop policy if exists expense_categories_update_own on public.expense_categories;
drop policy if exists expense_categories_delete_own on public.expense_categories;

create policy expense_categories_select_own on public.expense_categories
for select using (family_id = auth.uid());

create policy expense_categories_insert_own on public.expense_categories
for insert with check (family_id = auth.uid());

create policy expense_categories_update_own on public.expense_categories
for update using (family_id = auth.uid()) with check (family_id = auth.uid());

create policy expense_categories_delete_own on public.expense_categories
for delete using (family_id = auth.uid());

drop policy if exists income_categories_select_own on public.income_categories;
drop policy if exists income_categories_insert_own on public.income_categories;
drop policy if exists income_categories_update_own on public.income_categories;
drop policy if exists income_categories_delete_own on public.income_categories;

create policy income_categories_select_own on public.income_categories
for select using (user_id = auth.uid());

create policy income_categories_insert_own on public.income_categories
for insert with check (user_id = auth.uid());

create policy income_categories_update_own on public.income_categories
for update using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy income_categories_delete_own on public.income_categories
for delete using (user_id = auth.uid());

update storage.buckets
set public = false
where id = 'avatars';

drop policy if exists avatars_select_own on storage.objects;
drop policy if exists avatars_insert_own on storage.objects;
drop policy if exists avatars_update_own on storage.objects;
drop policy if exists avatars_delete_own on storage.objects;

create policy avatars_select_own on storage.objects
for select using (bucket_id = 'avatars' and split_part(name, '/', 1) = auth.uid()::text);

create policy avatars_insert_own on storage.objects
for insert with check (bucket_id = 'avatars' and split_part(name, '/', 1) = auth.uid()::text);

create policy avatars_update_own on storage.objects
for update using (bucket_id = 'avatars' and split_part(name, '/', 1) = auth.uid()::text)
with check (bucket_id = 'avatars' and split_part(name, '/', 1) = auth.uid()::text);

create policy avatars_delete_own on storage.objects
for delete using (bucket_id = 'avatars' and split_part(name, '/', 1) = auth.uid()::text);

commit;
