import { Header, Card } from "@/components/Shell";
export default function HistoriaPage(){
  return (<>
    <Header subtitle="História"/>
    <main className="mx-auto max-w-6xl px-5 py-10">
      <h1 className="text-4xl font-black">História</h1>
      <p className="mt-2 text-sm text-muted">A TROPA representa Diamante d’Oeste dentro e fora da quadra.</p>
      <div className="mt-6 grid gap-3 lg:grid-cols-2">
        <Card>
          <div className="text-xs font-extrabold uppercase tracking-[.14em] text-gold2">Nossa missão</div>
          <p className="mt-3 text-sm text-muted">Competir em alto nível e honrar o Preto & Dourado com disciplina e união.</p>
        </Card>
        <Card>
          <div className="text-xs font-extrabold uppercase tracking-[.14em] text-gold2">Linha do tempo</div>
          <ul className="mt-3 space-y-3 text-sm text-muted">
            <li><b className="text-text">2025</b> — escudo e consolidação do projeto.</li>
            <li><b className="text-text">+</b> — adicione títulos, fotos e marcos.</li>
          </ul>
        </Card>
      </div>
    </main>
  </>);
}
