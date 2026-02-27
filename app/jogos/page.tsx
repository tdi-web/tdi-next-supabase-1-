import { Header, Card, Badge } from "@/components/Shell";
import { createClient } from "@/lib/supabase/server";

export default async function JogosPage(){
  const supabase = createClient();
  const { data: matches } = await supabase.from("matches").select("*").order("datetime",{ascending:false});
  const upcoming = (matches??[]).filter((m:any)=>m.status==="PRÓXIMO").sort((a:any,b:any)=>+new Date(a.datetime)-+new Date(b.datetime));
  const finished = (matches??[]).filter((m:any)=>m.status==="FINALIZADO").sort((a:any,b:any)=>+new Date(b.datetime)-+new Date(a.datetime));

  return (<>
    <Header subtitle="Jogos"/>
    <main className="mx-auto max-w-6xl px-5 py-10">
      <h1 className="text-4xl font-black">Jogos</h1>
      <p className="mt-2 text-sm text-muted">Próximos e resultados.</p>

      <section className="mt-8">
        <h2 className="text-lg font-black">Próximos</h2>
        <div className="mt-3 grid gap-3 lg:grid-cols-3">
          {upcoming.length ? upcoming.map((m:any)=>(
            <Card key={m.id}>
              <div className="text-xs font-extrabold uppercase tracking-[.14em] text-gold2">Próximo jogo</div>
              <div className="mt-2 text-base font-black">TROPA {m.is_home?"x":"vs"} {m.opponent}</div>
              <div className="mt-2 text-sm text-muted">{new Date(m.datetime).toLocaleString("pt-BR")} • {m.venue}</div>
              <div className="mt-2 text-sm text-muted">{m.competition ?? "—"}</div>
              <div className="mt-4"><Badge>{m.is_home?"EM CASA":"FORA"} • {m.status}</Badge></div>
            </Card>
          )) : <Card><div className="text-sm text-muted">Sem próximos jogos.</div></Card>}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-lg font-black">Resultados</h2>
        <div className="mt-3 grid gap-3 lg:grid-cols-3">
          {finished.length ? finished.map((m:any)=>{
            const dt = new Date(m.datetime).toLocaleDateString("pt-BR");
            const shownScore = m.is_home ? `${m.home_score} x ${m.away_score}` : `${m.away_score} x ${m.home_score}`;
            const left = m.is_home ? "TROPA" : m.opponent;
            const right = m.is_home ? m.opponent : "TROPA";
            return (
              <Card key={m.id}>
                <div className="text-sm text-muted">{dt} • {m.competition ?? "—"}</div>
                <div className="mt-2 flex items-center justify-between text-base font-black">
                  <span>{left}</span><span className="text-gold">{shownScore}</span><span>{right}</span>
                </div>
                <div className="mt-2 text-sm text-muted">{m.venue}</div>
              </Card>
            );
          }) : <Card><div className="text-sm text-muted">Sem resultados.</div></Card>}
        </div>
      </section>
    </main>
  </>);
}
