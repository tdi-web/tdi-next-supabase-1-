import Image from "next/image";
import { Header, Card, Button, Badge } from "@/components/Shell";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { deletePlayer, upsertPlayer } from "./actions";
import PlayerFormClient from "./PlayerFormClient";

export default async function AdminElenco() {
  await requireAdmin();
  const supabase = createClient();
  const { data: players } = await supabase.from("players").select("*").order("number");

  return (
    <>
      <Header subtitle="Admin • Elenco" />
      <main className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-4xl font-black">Elenco</h1>
            <p className="mt-2 text-sm text-muted">Cadastro online.</p>
          </div>
          <Button href="/admin/dashboard" variant="outline">
            Voltar
          </Button>
        </div>

        <div className="mt-8 grid gap-3 lg:grid-cols-2">
          <Card>
            <div className="text-base font-black">Adicionar</div>

            {/* Form com upload + preview */}
            <PlayerFormClient upsertPlayer={upsertPlayer} />
          </Card>

          <Card>
            <div className="text-base font-black">Cadastrados</div>
            <div className="mt-4 space-y-3">
              {(players ?? []).length ? (
                (players ?? []).map((p: any) => (
                  <div key={p.id} className="rounded-2xl border border-line/60 bg-white/[0.02] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-line/60 bg-black/30">
                          {p.photo_url ? (
                            <Image src={p.photo_url} alt={p.name} fill className="object-cover" />
                          ) : null}
                        </div>

                        <div>
                          <Badge>{String(p.position).toUpperCase()} • #{p.number}</Badge>
                          <div className="mt-2 text-base font-black">{p.name}</div>
                          <div className="text-sm text-muted">{p.is_active ? "Ativo" : "Inativo"}</div>
                        </div>
                      </div>

                      <form action={async () => { "use server"; await deletePlayer(p.id); }}>
                        <Button variant="outline" type="submit">Excluir</Button>
                      </form>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-muted">Nenhum jogador.</div>
              )}
            </div>
          </Card>
        </div>
      </main>
    </>
  );
}