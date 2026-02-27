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
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_E164 || "";

  // Link geral do WhatsApp (card do topo)
  const msgGeral = `Olá! Quero fazer um pedido da loja da TROPA DOS INDIOZINHOS.`;
  const waGeral =
    whatsapp.length > 0
      ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(msgGeral)}`
      : "#";

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
              <Badge>Chave: {pix || "—"}</Badge>
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

            <a href={waGeral} target="_blank" rel="noopener noreferrer" className="inline-block">
              <Button type="button">Abrir WhatsApp</Button>
            </a>

            {whatsapp.length === 0 ? (
              <p className="mt-2 text-xs text-muted">
                Configure a variável <b>NEXT_PUBLIC_WHATSAPP_E164</b> na Vercel (ex: 5545988233831).
              </p>
            ) : null}
          </Card>
        </div>

        <section className="mt-10">
  <h2 className="text-lg font-black">Produtos</h2>

  <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {(products ?? []).map((p: any) => {
      const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_E164 || "";
      const msg = `Quero comprar ${p.name} da TROPA DOS INDIOZINHOS. Valor: ${money(
        p.price_cents
      )}. Vou pagar no PIX e mandar o comprovante.`;

      const wa =
        whatsapp && whatsapp.length > 0
          ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(msg)}`
          : "#";

      return (
        <Card key={p.id} className="overflow-hidden">
          {/* IMAGEM */}
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-line/60 bg-black/30">
            {p.image_url ? (
              // Se você estiver usando <Image /> do Next, pode trocar por <Image fill ... />
              <img
                src={p.image_url}
                alt={p.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="grid h-full w-full place-items-center text-xs text-muted">
                Sem foto
              </div>
            )}
          </div>

          {/* CONTEÚDO */}
          <div className="mt-4 space-y-3">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="truncate text-base font-black">{p.name}</div>
                <div className="mt-1 text-sm text-muted">
                  {money(p.price_cents)}
                </div>
              </div>

              <Badge>PIX</Badge>
            </div>

            {/* BOTÃO */}
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <Button type="button" className="w-full">
                Comprar no WhatsApp
              </Button>
            </a>
          </div>
        </Card>
      );
    })}
  </div>
</section>