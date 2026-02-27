# TROPA DOS INDIOZINHOS — Next.js + Supabase

✅ Site público + painel admin com **login real** e **banco online**.

## Rodar local
1) Copie `.env.example` para `.env.local` e preencha com as chaves do Supabase
2) Rode:
```bash
npm install
npm run dev
```

## Configurar Supabase
1) Crie um projeto no Supabase
2) SQL Editor: rode `supabase/schema.sql`
3) Auth > URL Configuration:
- Site URL: `http://localhost:3000`
- Redirect URLs:
  - `http://localhost:3000/auth/callback`
  - `https://SEUAPP.vercel.app/auth/callback` (quando publicar)

## Admin
Apenas e-mails na tabela `public.admins` podem editar (RLS). Já vem com:
- `bielmacali44@gmail.com`


## Troubleshooting (Login por e-mail)
- Supabase > Authentication > URL Configuration: Site URL `http://localhost:3000` e Redirect `http://localhost:3000/auth/callback`.
- Verifique spam/lixo eletrônico.
- Em Authentication > Users você pode criar um usuário com senha para testar.
