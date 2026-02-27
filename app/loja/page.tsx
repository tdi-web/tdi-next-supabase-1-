import Image from "next/image";
import { Header, Card, Button, Badge } from "@/components/Shell";
import CopyPixButton from "@/components/CopyPixButton";
import { createClient } from "@/lib/supabase/server";

const money = (c: number) =>
  (c / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default async function LojaPage() {
  const supabase = createClient();

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: false });

  const pix = process.env.NEXT_PUBLIC_PIX_KEY || "";
  const whatsapp = (process.env.NEXT_PUBLIC_WHATSAPP_E164 || "").replace(/\D/g, "");

  return (
    <>
      <Header subtitle="Loja" />
      <main className="mx-auto max-w-6xl px-5 py-10">
        <h1 className="text-4xl font-black">Loja oficial</h1>
        <p className="mt-2 text-sm text-muted">PIX + pedido no WhatsApp.</p>

        <div className="mt-6 grid gap-3 lg:grid-cols-2">
          <Card>
            <div className="text-xs font-extrabold uppercase tracking-[.14em] text-gold2">
              PIX
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <Badge>Chave: {pix}</Badge>
              <CopyPixButton pix={pix} />
            </div>
            <p className="mt-3 text-sm text-muted">
              Após pagar, envie o comprovante no WhatsApp.
            </p>
          </Card>

          <Card>
            <div className="text-xs font-extrabold uppercase tracking-[.14em] text-gold2">
              WhatsApp
            </div>
            <p className="mt-3 text-sm text-muted">
              O botão de compra já vai com mensagem pronta.
            </p>

            <a
              href={whatsapp ? `https://wa.me/${whatsapp}` : "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button type="button">Abrir WhatsApp</Button>
            </a>
          </Card>
        </div>

        <section className="mt-10">
          <h2 className="text-lg font-black">Produtos</h2>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(products ?? []).map((p: any) => {
              const msg = `Olá! Quero comprar ${p.name} da TROPA DOS INDIOZINHOS. Valor: ${money(
                p.price_cents
              )}. Vou pagar no PIX e mandar o comprovante.`;

              const waLink = whatsapp
                ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`
                : "#";

              return (
                <Card key={p.id}>
                  <div className="flex gap-4">
                    <div className="relative h-24 w-24 flex-none overflow-hidden rounded-2xl border border-line/60 bg-black/30">
                      {p.image_url ? (
                        <Image
                          src={p.image_url}
                          alt={p.name}
                          fill
                          className="object-cover"
                        />
                      ) : null}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="text-base font-black break-words">
                        {p.name}
                      </div>
                      <div className="mt-1 text-sm text-muted">
                        {money(p.price_cents)}
                      </div>

                      <div className="mt-4">
                        <a
                          href={waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block w-full"
                        >
                          <Button type="button" className="w-full">
                            Comprar no WhatsApp
                          </Button>
                        </a>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </section>
      </main>
    </>
  );
}