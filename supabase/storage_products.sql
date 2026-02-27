-- Storage: bucket "produtos" (público) + policies de upload
-- 1) Crie o bucket "produtos" em Storage (marque como PUBLIC)
-- 2) Rode este SQL no Supabase (SQL Editor)

-- Permite upload (INSERT) apenas para usuários logados
create policy "upload_produtos_auth"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'produtos');

-- (Opcional) Permite update/remover apenas para usuários logados
create policy "update_produtos_auth"
on storage.objects
for update
to authenticated
using (bucket_id = 'produtos')
with check (bucket_id = 'produtos');

create policy "delete_produtos_auth"
on storage.objects
for delete
to authenticated
using (bucket_id = 'produtos');
