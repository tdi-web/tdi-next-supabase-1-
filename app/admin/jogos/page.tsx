import { Header, Card, Button, Badge } from "@/components/Shell";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { deleteMatch, upsertMatch } from "./actions";

export default async function AdminJogos(){
  await requireAdmin();
  const supabase = createClient();
  const { data: matches } = await supabase.from("matches").select("*").order("datetime",{ascending:false});

  return (<>
    <Header subtitle="Admin • Jogos"/>
    <main className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><h1 className="text-4xl font-black">Jogos</h1><p className="mt-2 text-sm text-muted">Cadastro online.</p></div>
        <Button href="/admin/dashboard" variant="outline">Voltar</Button>
      </div>

      <div className="mt-8 grid gap-3 lg:grid-cols-2">
        <Card>
          <div className="text-base font-black">Adicionar</div>
          <form action={upsertMatch} className="mt-4 space-y-3">
            <input type="hidden" name="id" />
            <div>
              <label className="text-xs font-extrabold tracking-wide text-muted">Data e hora</label>
              <input name="datetime" type="datetime-local" className="mt-1 w-full rounded-2xl border border-line/60 bg-white/[0.02] px-4 py-3 text-sm outline-none" required />
            </div>
            <div className="grid gap-3 lg:grid-cols-2">
              <div>
                <label className="text-xs font-extrabold tracking-wide text-muted">Competição</label>
                <input name="competition" className="mt-1 w-full rounded-2xl border border-line/60 bg-white/[0.02] px-4 py-3 text-sm outline-none" />
              </div>
              <div>
                <label className="text-xs font-extrabold tracking-wide text-muted">Status</label>
                <select name="status" className="mt-1 w-full rounded-2xl border border-line/60 bg-white/[0.02] px-4 py-3 text-sm outline-none">
                  <option>PRÓXIMO</option><option>FINALIZADO</option><option>CANCELADO</option>
                </select>
              </div>
            </div>
            <div className="grid gap-3 lg:grid-cols-2">
              <div>
                <label className="text-xs font-extrabold tracking-wide text-muted">Adversário</label>
                <input name="opponent" className="mt-1 w-full rounded-2xl border border-line/60 bg-white/[0.02] px-4 py-3 text-sm outline-none" required />
              </div>
              <div>
                <label className="text-xs font-extrabold tracking-wide text-muted">Local</label>
                <input name="venue" className="mt-1 w-full rounded-2xl border border-line/60 bg-white/[0.02] px-4 py-3 text-sm outline-none" required />
              </div>
            </div>
            <div className="grid gap-3 lg:grid-cols-2">
              <div>
                <label className="text-xs font-extrabold tracking-wide text-muted">Casa/Fora</label>
                <select name="is_home" className="mt-1 w-full rounded-2xl border border-line/60 bg-white/[0.02] px-4 py-3 text-sm outline-none">
                  <option value="true">Em casa</option><option value="false">Fora</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-extrabold tracking-wide text-muted">Observações</label>
                <input name="notes" className="mt-1 w-full rounded-2xl border border-line/60 bg-white/[0.02] px-4 py-3 text-sm outline-none" />
              </div>
            </div>
            <div className="grid gap-3 lg:grid-cols-2">
              <div>
                <label className="text-xs font-extrabold tracking-wide text-muted">Placar TROPA</label>
                <input name="home_score" type="number" min="0" className="mt-1 w-full rounded-2xl border border-line/60 bg-white/[0.02] px-4 py-3 text-sm outline-none" />
              </div>
              <div>
                <label className="text-xs font-extrabold tracking-wide text-muted">Placar adversário</label>
                <input name="away_score" type="number" min="0" className="mt-1 w-full rounded-2xl border border-line/60 bg-white/[0.02] px-4 py-3 text-sm outline-none" />
              </div>
            </div>
            <Button type="submit">Salvar</Button>
          </form>
        </Card>

        <Card>
          <div className="text-base font-black">Cadastrados</div>
          <div className="mt-4 space-y-3">
            {(matches??[]).length ? (matches??[]).map((m:any)=>{
              const dt = new Date(m.datetime).toLocaleString("pt-BR");
              const shown = m.is_home ? `TROPA x ${m.opponent}` : `${m.opponent} x TROPA`;
              const score = m.status==="FINALIZADO" ? (m.is_home ? `${m.home_score} x ${m.away_score}` : `${m.away_score} x ${m.home_score}`) : "—";
              return (
                <div key={m.id} className="rounded-2xl border border-line/60 bg-white/[0.02] p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <Badge>{m.status}</Badge>
                      <div className="mt-2 text-base font-black">{shown}</div>
                      <div className="text-sm text-muted">{dt} • {m.venue}</div>
                      <div className="mt-1 text-sm text-gold">{score}</div>
                    </div>
                    <form action={async()=>{ "use server"; await deleteMatch(m.id); }}>
                      <Button variant="outline" type="submit">Excluir</Button>
                    </form>
                  </div>
                </div>
              );
            }) : <div className="text-sm text-muted">Nenhum jogo.</div>}
          </div>
        </Card>
      </div>
    </main>
  </>);
}
