import { Header, Card, Badge } from "@/components/Shell";
import { createClient } from "@/lib/supabase/server";
import Image from "next/image";

export default async function ElencoPage(){
  const supabase = createClient();
  const { data: players } = await supabase.from("players").select("*").eq("is_active",true).order("position").order("number");
  return (<>
    <Header subtitle="Elenco"/>
    <main className="mx-auto max-w-6xl px-5 py-10">
      <h1 className="text-4xl font-black">Elenco</h1>
      <p className="mt-2 text-sm text-muted">Atualizado pelo painel.</p>
      <div className="mt-6 grid gap-3 lg:grid-cols-3">
        {(players??[]).length ? (players??[]).map((p:any)=>(
          <Card key={p.id}>
            <Badge>{String(p.position).toUpperCase()} • #{p.number}</Badge>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-14 w-14 overflow-hidden rounded-2xl border border-line/60 bg-white/[0.02]">
                {p.photo_url ? <Image src={p.photo_url} alt={p.name} width={56} height={56} className="h-full w-full object-cover" /> : null}
              </div>
              <div>
                <div className="text-base font-black">{p.name}</div>
                <div className="text-sm text-muted">{p.bio ?? "Atleta da TROPA DOS INDIOZINHOS."}</div>
              </div>
            </div>
          </Card>
        )) : <Card><div className="text-sm text-muted">Sem jogadores cadastrados.</div></Card>}
      </div>
    </main>
  </>);
}
