import Image from "next/image";
import { Header, Card, Button, Badge } from "@/components/Shell";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import SponsorFormClient from "./SponsorFormClient";
import { deleteSponsor, upsertSponsor } from "./actions";

export default async function AdminPatrocinadores() {
  await requireAdmin();
  const supabase = createClient();

  const { data: sponsors } = await supabase
    .from("sponsors")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });

  return (
    <>
      <Header subtitle="Admin • Patrocinadores" />
      <main className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-4xl font-black">Patrocinadores</h1>
            <p className="mt-2 text-sm text-muted">Cadastre logos com upload direto.</p>
          </div>
          <Button href="/admin/dashboard" variant="outline">Voltar</Button>
        </div>

        <div className="mt-8 grid gap-3 lg:grid-cols-2">
          <Card>
            <div className="text-base font-black">Adicionar</div>
            <SponsorFormClient upsertSponsor={upsertSponsor} />
          </Card>

          <Card>
            <div className="text-base font-black">Cadastrados</div>

            <div className="mt-4 space-y-3">
              {(sponsors ?? []).length ? (
                (sponsors ?? []).map((s: any) => (
                  <div key={s.id} className="rounded-2xl border border-line/60 bg-white/[0.02] p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-14 w-20 overflow-hidden rounded-2xl border border-line/60 bg-black/30">
                          {s.logo_url ? (
                            <Image src={s.logo_url} alt={s.name} fill className="object-contain p-2" />
                          ) : null}
                        </div>

                        <div className="min-w-0">
                          <Badge>{s.is_active ? "ATIVO" : "INATIVO"}</Badge>
                          <div className="mt-2 text-base font-black">{s.name}</div>
                          {s.website ? (
                            <div className="text-sm text-muted break-all">{s.website}</div>
                          ) : (
                            <div className="text-sm text-muted">Sem site</div>
                          )}
                        </div>
                      </div>

                      <form action={async () => { "use server"; await deleteSponsor(s.id); }}>
                        <Button variant="outline" type="submit">Excluir</Button>
                      </form>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-sm text-muted">Nenhum patrocinador.</div>
              )}
            </div>
          </Card>
        </div>
      </main>
    </>
  );
}