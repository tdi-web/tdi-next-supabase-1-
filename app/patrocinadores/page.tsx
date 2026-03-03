import Image from "next/image";
import { Header, Card } from "@/components/Shell";
import { createClient } from "@/lib/supabase/server";

export default async function PatrocinadoresPage() {
  const supabase = createClient();
  const { data } = await supabase
    .from("sponsors")
    .select("*")
    .eq("is_active", true)
    .order("sort", { ascending: true })
    .order("created_at", { ascending: false });

  const sponsors = data ?? [];

  return (
    <>
      <Header subtitle="Patrocinadores" />
      <main className="mx-auto max-w-6xl px-5 py-10">
        <h1 className="text-4xl font-black">Patrocinadores</h1>
        <p className="mt-2 text-sm text-muted">Quem fortalece a TDI.</p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sponsors.length ? (
            sponsors.map((s: any) => {
              const content = (
                <Card key={s.id}>
                  <div className="flex items-center gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-line/60 bg-black/30">
                      <Image src={s.logo_url} alt={s.name} fill className="object-contain p-2" />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-base font-black">{s.name}</div>
                      {s.website_url ? (
                        <div className="mt-1 text-xs text-muted truncate">{s.website_url}</div>
                      ) : null}
                    </div>
                  </div>
                </Card>
              );

              return s.website_url ? (
                <a key={s.id} href={s.website_url} target="_blank" rel="noopener noreferrer">
                  {content}
                </a>
              ) : (
                content
              );
            })
          ) : (
            <div className="text-sm text-muted">Sem patrocinadores cadastrados.</div>
          )}
        </div>
      </main>
    </>
  );
}