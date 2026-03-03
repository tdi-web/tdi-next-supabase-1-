import Image from "next/image";
import { Header, Card, Badge, Button } from "@/components/Shell";

type Sponsor = {
  name: string;
  type: "Master" | "Ouro" | "Prata" | "Apoio";
  logo: string; // caminho em /public
  url?: string; // opcional (site/instagram)
};

const sponsors: Sponsor[] = [
  // ✅ Troque pelos seus patrocinadores reais:
  { name: "Patrocinador 1", type: "Master", logo: "/patrocinadores/patro1.png", url: "https://instagram.com/" },
  { name: "Patrocinador 2", type: "Ouro", logo: "/patrocinadores/patro2.png" },
  { name: "Patrocinador 3", type: "Prata", logo: "/patrocinadores/patro3.png" },
  { name: "Apoio Local", type: "Apoio", logo: "/patrocinadores/patro4.png" },
];

const order = { Master: 0, Ouro: 1, Prata: 2, Apoio: 3 } as const;

export default function PatrocinadoresPage() {
  const sorted = [...sponsors].sort((a, b) => order[a.type] - order[b.type]);

  return (
    <>
      <Header subtitle="Patrocinadores" />

      <main className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-4xl font-black">Patrocinadores</h1>
            <p className="mt-2 text-sm text-muted">
              Marcas que acreditam no projeto e fazem a TDI crescer.
            </p>
          </div>

          <a
            href="https://wa.me/5545988233831?text=Ol%C3%A1!%20Quero%20saber%20sobre%20patroc%C3%ADnio%20na%20TDI."
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button type="button">Quero patrocinar</Button>
          </a>
        </div>

        <section className="mt-10">
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {sorted.map((s) => {
              const content = (
                <Card key={s.name}>
                  <div className="flex items-start gap-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-2xl border border-line/60 bg-black/30">
                      <Image src={s.logo} alt={s.name} fill className="object-contain p-2" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <Badge>{s.type.toUpperCase()}</Badge>
                      <div className="mt-2 text-base font-black">{s.name}</div>
                      {s.url ? (
                        <div className="mt-1 text-sm text-muted break-all">{s.url}</div>
                      ) : (
                        <div className="mt-1 text-sm text-muted">Parceiro oficial</div>
                      )}
                    </div>
                  </div>
                </Card>
              );

              return s.url ? (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer" className="block">
                  {content}
                </a>
              ) : (
                <div key={s.name}>{content}</div>
              );
            })}
          </div>
        </section>

        <section className="mt-12">
          <Card>
            <div className="text-lg font-black">Seja um patrocinador</div>
            <p className="mt-3 text-sm text-muted leading-relaxed">
              A TDI é um projeto em crescimento e busca parceiros que acreditam no esporte.
              Sua marca ganha visibilidade no site, redes sociais, uniformes e eventos.
            </p>

            <div className="mt-5 grid gap-2 text-sm">
              <div>✔ Exposição em uniformes e materiais oficiais</div>
              <div>✔ Divulgação no site e redes sociais</div>
              <div>✔ Presença em competições e eventos</div>
              <div>✔ Associação a um projeto sério e crescente</div>
            </div>

            <div className="mt-7">
              <a
                href="https://wa.me/5545988233831?text=Ol%C3%A1!%20Quero%20ser%20patrocinador%20da%20TDI.%20Pode%20me%20enviar%20as%20cotas%20e%20valores%3F"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button type="button">Falar sobre cotas</Button>
              </a>
            </div>
          </Card>
        </section>
      </main>
    </>
  );
}