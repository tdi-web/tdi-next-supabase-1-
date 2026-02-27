import Image from "next/image";
import { Header, Card, Button, Badge } from "@/components/Shell";
import { requireAdmin } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";
import { deleteProduct, upsertProduct } from "./actions";
import ProductFormClient from "./ProductFormClient";

const money = (c:number)=> (c/100).toLocaleString("pt-BR",{style:"currency",currency:"BRL"});

export default async function AdminLoja(){
  await requireAdmin();
  const supabase = createClient();
  const { data: products } = await supabase.from("products").select("*").order("created_at", { ascending: false });

  return (<>
    <Header subtitle="Admin • Loja"/>
    <main className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-4xl font-black">Loja</h1>
          <p className="mt-2 text-sm text-muted">Cadastre produtos com foto (upload direto).</p>
        </div>
        <Button href="/admin/dashboard" variant="outline">Voltar</Button>
      </div>

      <div className="mt-8 grid gap-3 lg:grid-cols-2">
        <Card>
          <div className="text-base font-black">Adicionar</div>
          <ProductFormClient upsertProduct={upsertProduct} />
          <div className="mt-4 text-xs text-muted">
            Dica: crie o bucket <b className="text-text">produtos</b> no Supabase Storage (público) e aplique as policies de upload (arquivo <b className="text-text">supabase/storage_products.sql</b>).
          </div>
        </Card>

        <Card>
          <div className="text-base font-black">Cadastrados</div>
          <div className="mt-4 space-y-3">
            {(products??[]).length ? (products??[]).map((p:any)=>(
              <div key={p.id} className="rounded-2xl border border-line/60 bg-white/[0.02] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-14 w-14 overflow-hidden rounded-2xl border border-line/60 bg-black/30">
                      {p.image_url ? <Image src={p.image_url} alt={p.name} fill className="object-cover" /> : null}
                    </div>
                    <div>
                      <Badge>{p.is_active ? "ATIVO" : "INATIVO"}</Badge>
                      <div className="mt-2 text-base font-black">{p.name}</div>
                      <div className="text-sm text-muted">{money(p.price_cents)}</div>
                    </div>
                  </div>

                  <form action={async()=>{ "use server"; await deleteProduct(p.id); }}>
                    <Button variant="outline" type="submit">Excluir</Button>
                  </form>
                </div>
              </div>
            )) : <div className="text-sm text-muted">Nenhum produto.</div>}
          </div>
        </Card>
      </div>
    </main>
  </>);
}
