"use client";

import Image from "next/image";
import { Header, Card, Button } from "@/components/Shell";
import FadeInOnScroll from "@/components/FadeInOnScroll";

export default function Home() {
  return (
    <>
      <Header subtitle="História Oficial" />

      <main className="relative min-h-[calc(100vh-64px)] overflow-hidden">

        <div className="absolute inset-0 -z-10">
          <Image
            src="/quadra.jpg"
            alt="Quadra"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/75" />
        </div>

        <div className="mx-auto max-w-6xl px-5 py-16">

          <FadeInOnScroll>
            <div className="flex flex-col items-center text-center">
              <div className="w-[200px] mb-6">
                <Image
                  src="/tdi.png"
                  alt="Escudo TROPA DOS INDIOZINHOS"
                  width={800}
                  height={800}
                  className="w-full h-auto"
                />
              </div>

              <h1 className="text-4xl lg:text-5xl font-black text-gold">
                TROPA DOS INDIOZINHOS
              </h1>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll delay={200}>
            <div className="mt-10">
              <p className="max-w-4xl mx-auto text-lg text-muted leading-relaxed text-center">
                A TROPA DOS INDIOZINHOS nasceu no Oeste do Paraná a partir da visão
                do CEO Gabriel Macali, que enxergou potencial em atletas que
                jogavam por diversão, mas possuíam talento para ir muito além das
                competições municipais.
                <br /><br />
                Com organização, disciplina e mentalidade de crescimento, o que
                era apenas um grupo de amigos se transformou em um projeto
                esportivo estruturado, focado no desenvolvimento dos jogadores e
                na construção de uma identidade forte dentro e fora das quadras.
                <br /><br />
                A TROPA tem como pilares a união, a raça e o compromisso coletivo.
                Cada treino é preparação. Cada jogo é uma batalha. Cada passo é
                parte de um plano maior.
                <br /><br />
                O objetivo é claro: evoluir no cenário regional e construir, no
                futuro, uma equipe profissional reconhecida no Paraná, no Brasil e
                além.
                <br /><br />
                <strong>Mais do que um time, somos um projeto em ascensão.</strong>
                <br />
                <strong>Mais do que jogadores, somos uma família.</strong>
                <br /><br />
                <span className="text-gold font-bold">
                  TROPA DOS INDIOZINHOS — Unidos na raça. Destinados à grandeza.
                </span>
              </p>
            </div>
          </FadeInOnScroll>

          <FadeInOnScroll delay={400}>
            <div className="mt-12 flex justify-center gap-4">
              <Button href="/jogos">Ver Jogos</Button>
              <Button href="/elenco" variant="outline">
                Conhecer Elenco
              </Button>
              <Button href="/loja" variant="outline">
                Loja Oficial
              </Button>
            </div>
          </FadeInOnScroll>

        </div>
      </main>
    </>
  );
}
