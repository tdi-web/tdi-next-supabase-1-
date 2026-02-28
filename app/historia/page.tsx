import { Header } from "@/components/Shell";

export default function HistoriaPage() {
  return (
    <>
      <Header subtitle="História" />

      <main className="mx-auto max-w-4xl px-5 py-12">
        <h1 className="text-4xl font-black">Nossa História</h1>

        <div className="mt-8 space-y-6 text-base leading-relaxed text-muted">
          <p>
            A <strong className="text-white">Tropa dos Indiozinhos Futsal</strong> é um clube
            fundado em <strong>Diamante D’Oeste/PR</strong> com o propósito de representar
            a cidade através do esporte, fortalecer a comunidade e construir,
            passo a passo, um projeto sólido dentro do futsal.
          </p>

          <p>
            Idealizado por <strong>Gabriel Macali</strong>, o clube nasceu da
            vontade de ir além dos campeonatos municipais, organizando uma equipe
            comprometida, disciplinada e focada no crescimento contínuo.
          </p>

          <p>
            Desde o início, a Tropa foi formada por atletas da própria cidade,
            jogadores que conciliam trabalho, estudos e treinos, movidos pelo
            amor ao futsal e pelo orgulho de vestir a camisa do município.
          </p>

          <div className="mt-8 rounded-2xl border border-line/60 p-6 bg-white/[0.02]">
            <h2 className="text-lg font-black text-white mb-4">
              Nossos pilares
            </h2>

            <ul className="space-y-3">
              <li>🏹 União e espírito coletivo</li>
              <li>📈 Evolução técnica e organizacional</li>
              <li>🤝 Respeito dentro e fora de quadra</li>
              <li>🚀 Objetivo de alcançar o nível profissional</li>
            </ul>
          </div>

          <p>
            A Tropa ainda está em construção. Cada treino, cada jogo e cada
            desafio fazem parte de um caminho maior: consolidar o clube no
            cenário regional e, futuramente, disputar competições oficiais de
            maior nível.
          </p>

          <p className="mt-6 text-lg font-bold text-white">
            Acreditamos que grandes histórias começam com coragem para dar o
            primeiro passo.
          </p>

          <p className="text-xl font-black text-gold2 mt-4">
            É raça. <br />
            É união. <br />
            É TDI dentro da quadra.
          </p>
        </div>
      </main>
    </>
  );
}