import { Header, Card, Button, Badge } from "@/components/Shell";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { deletePlayer, upsertPlayer } from "./actions";

export default async function AdminElenco(){
  await requireAdmin();
  const supabase = createClient();
  const { data: players } = await supabase.from("players").select("*").order("number");

  return (<>
    <Header subtitle="Admin • Elenco"/>
    <main className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="text-4xl font-black">Elenco</h1><p className="mt-2 text-sm text-muted">Cadastro online.</p></div>
        <Button href="/admin/dashboard" variant="outline">Voltar</Button>
      </div>

      <div className="mt-8 grid gap-3 lg:grid-cols-2">
        <Card>
          <div className="text-base font-black">Adicionar</div>
          <form action={upsertPlayer} className="mt-4 space-y-3">
            <input type="hidden" name="id" />
            <div className="grid gap-3 lg:grid-cols-2">
              <div>
                <label className="text-xs font-extrabold tracking-wide text-muted">Nome</label>
                <input name="name" className="mt-1 w-full rounded-2xl border border-line/60 bg-white/[0.02] px-4 py-3 text-sm outline-none" required />
              </div>
              <div>
                <label className="text-xs font-extrabold tracking-wide text-muted">Número</label>
                <input name="number" type="number" min="0" className="mt-1 w-full rounded-2xl border border-line/60 bg-white/[0.02] px-4 py-3 text-sm outline-none" required />
              </div>
            </div>
            <div className="grid gap-3 lg:grid-cols-2">
              <div>
                <label className="text-xs font-extrabold tracking-wide text-muted">Posição</label>
                <select name="position" className="mt-1 w-full rounded-2xl border border-line/60 bg-white/[0.02] px-4 py-3 text-sm outline-none">
                  <option>Goleiro</option><option>Fixo</option><option>Ala</option><option>Pivô</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-extrabold tracking-wide text-muted">Status</label>
                <select name="is_active" className="mt-1 w-full rounded-2xl border border-line/60 bg-white/[0.02] px-4 py-3 text-sm outline-none">
                  <option value="true">Ativo</option><option value="false">Inativo</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-xs font-extrabold tracking-wide text-muted">Bio</label>
              <textarea name="bio" rows={3} className="mt-1 w-full rounded-2xl border border-line/60 bg-white/[0.02] px-4 py-3 text-sm outline-none" />
            </div>
            <div>
              <label className="text-xs font-extrabold tracking-wide text-muted">Foto URL (opcional)</label>
              <input name="photo_url" className="mt-1 w-full rounded-2xl border border-line/60 bg-white/[0.02] px-4 py-3 text-sm outline-none" placeholder="https://..." />
            </div>
            <Button type="submit">Salvar</Button>
          </form>
        </Card>

        <Card>
          <div className="text-base font-black">Cadastrados</div>
          <div className="mt-4 space-y-3">
            {(players??[]).length ? (players??[]).map((p:any)=>(
              <div key={p.id} className="rounded-2xl border border-line/60 bg-white/[0.02] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <Badge>{String(p.position).toUpperCase()} • #{p.number}</Badge>
                    <div className="mt-2 text-base font-black">{p.name}</div>
                    <div className="text-sm text-muted">{p.is_active?"Ativo":"Inativo"}</div>
                  </div>
                  <form action={async()=>{ "use server"; await deletePlayer(p.id); }}>
                    <Button variant="outline" type="submit">Excluir</Button>
                  </form>
                </div>
              </div>
            )) : <div className="text-sm text-muted">Nenhum jogador.</div>}
          </div>
        </Card>
      </div>
    </main>
  </>);
}
