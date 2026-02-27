import { Header, Card, Button } from "@/components/Shell";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function Dashboard(){
  await requireAdmin();

  async function signOut(){
    "use server";
    const supabase = createClient();
    await supabase.auth.signOut();
    redirect("/admin/login");
  }

  return (<>
    <Header subtitle="Admin"/>
    <main className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-4xl font-black">Painel</h1>
          <p className="mt-2 text-sm text-muted">Login real + banco online.</p>
        </div>
        <form action={signOut}><Button variant="outline" type="submit">Sair</Button></form>
      </div>

      <div className="mt-8 grid gap-3 lg:grid-cols-2">
        <Card>
          <div className="text-base font-black">Gerenciar</div>
          <div className="mt-4 flex flex-wrap gap-3">
            <Button href="/admin/elenco">Elenco</Button>
            <Button href="/admin/jogos" variant="outline">Jogos</Button>
          </div>
        </Card>
        <Card>
          <div className="text-base font-black">Segurança</div>
          <div className="mt-3 text-sm text-muted">Somente e-mails na tabela <b className="text-text">admins</b> podem editar (RLS).</div>
        </Card>
      </div>
    </main>
  </>);
}
