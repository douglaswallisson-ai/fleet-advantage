import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { ArrowUpRight, Building2, Compass, HeartHandshake, Rocket, Target } from "lucide-react";
import { SSOrb } from "@/components/site/SSOrb";
import { GRUPO, pageHead } from "@/lib/site-config";
import teamImg from "@/assets/team-about.jpg";

export const Route = createFileRoute("/quem-somos")({
  component: QuemSomos,
  head: () =>
    pageHead({
      path: "/quem-somos",
      title: "Quem Somos — SS Telemática",
      description:
        "Somos a SS Telemática: a nova geração de gestão de frotas no Brasil, movida por inteligência artificial e feita para quem decide.",
      ogDescription:
        "Da telemetria à tomada de decisão. Conheça a história, o time e o propósito da SS.",
    }),
});

function QuemSomos() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <section className="bg-gradient-hero py-24 text-white">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <SSOrb size={104} halo className="mx-auto mb-8 text-brand-green" />
            <span className="text-xs font-bold tracking-widest text-brand-green">QUEM SOMOS</span>
            <h1 className="mt-4 text-5xl font-bold md:text-6xl">
              Nascemos da telemetria.
              <br />
              <span className="text-gradient">Existimos para a decisão.</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/75">
              Há mais de duas décadas equipamos frotas com tecnologia. Hoje, movemos o próximo
              capítulo do setor: uma plataforma que não apenas mostra o que aconteceu — recomenda o
              que fazer a seguir.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-24">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <img
              src={teamImg}
              alt="Time SS Telemática"
              loading="lazy"
              className="rounded-3xl shadow-elegant"
              width={1600}
              height={900}
            />
            <div>
              <h2 className="text-4xl font-bold">A virada estratégica da SS</h2>
              <p className="mt-4 text-muted-foreground">
                Por anos, o mercado de telemetria vendeu <em>relatórios</em>. Nós entendemos que o
                cliente não quer mais um dashboard — quer saber o que fazer segunda-feira de manhã.
                Reescrevemos a SS de dentro para fora, colocando a IA no centro do produto e
                construindo o primeiro Fleet Manager virtual do Brasil.
              </p>
              <p className="mt-4 text-muted-foreground">
                Também mudamos como vemos o motorista. Ele deixou de ser alvo de fiscalização para
                se tornar protagonista com o Copiloto SS e o Clube de Fidelidade.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-secondary/40 py-24">
          <div className="mx-auto max-w-7xl px-6">
            <h2 className="text-center text-4xl font-bold">O que nos move</h2>

            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {[
                {
                  icon: Compass,
                  t: "Propósito",
                  d: "Transformar cada quilômetro em decisão inteligente.",
                },
                {
                  icon: Rocket,
                  t: "Missão",
                  d: "Transformar dados operacionais em decisões que geram segurança, eficiência e resultados para nossos clientes.",
                },
                {
                  icon: Target,
                  t: "Visão",
                  d: "Ser a parceira indispensável das operadoras de transporte de pessoas até 2028.",
                },
              ].map(({ icon: Icon, t, d }) => (
                <div key={t} className="rounded-2xl border border-border bg-card p-6 shadow-card">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-hero text-white">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold">{t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{d}</p>
                </div>
              ))}
            </div>

            <div className="mt-16">
              <div className="flex items-center justify-center gap-3">
                <HeartHandshake className="h-6 w-6 text-brand-green" />
                <h3 className="text-2xl font-bold">Nossos valores</h3>
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                  {
                    t: "Cliente em primeiro lugar",
                    d: "Cada decisão deve gerar valor real para quem opera o transporte.",
                  },
                  {
                    t: "Valor acima da tecnologia",
                    d: "Não vendemos funcionalidades. Resolvemos problemas.",
                  },
                  {
                    t: "Inteligência orientada por dados",
                    d: "Não entregamos dados. Entregamos decisões.",
                  },
                  {
                    t: "Eficiência com responsabilidade",
                    d: "Buscamos reduzir custos operacionais sem abrir mão da segurança e da sustentabilidade.",
                  },
                  {
                    t: "Confiança",
                    d: "Cumprimos o que prometemos e construímos relações de longo prazo.",
                  },
                  {
                    t: "Evolução contínua",
                    d: "Questionamos o que pode ser melhor e buscamos inovação com resultado.",
                  },
                ].map((v, i) => (
                  <div
                    key={v.t}
                    className="flex gap-4 rounded-2xl border border-border bg-card p-6 shadow-card"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-green text-sm font-bold text-[oklch(0.15_0.03_260)]">
                      {i + 1}
                    </span>
                    <div>
                      <h4 className="text-base font-bold">{v.t}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">{v.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <GrupoModaxo />
      </main>
      <Footer />
    </div>
  );
}

/** A SS faz parte do Grupo Modaxo, da Constellation Software. */
function GrupoModaxo() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-widest backdrop-blur">
            <Building2 className="h-3.5 w-3.5 text-brand-green" /> PARTE DE ALGO MAIOR
          </span>
          <h2 className="mt-5 text-4xl font-bold md:text-5xl">
            A SS é parte do <span className="text-brand-green">Grupo Modaxo</span>.
          </h2>
          <p className="mt-5 text-lg text-white/75">
            Integramos a Modaxo, o portfólio global de tecnologia para o transporte de pessoas —
            que, por sua vez, faz parte da Constellation Software, uma das maiores companhias de
            software do mundo. Isso nos dá solidez, alcance internacional e a garantia de
            continuidade de longo prazo para os nossos clientes.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {GRUPO.parceiros.map((p) => (
            <a
              key={p.nome}
              href={p.site}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col rounded-3xl border border-white/15 bg-white/5 p-8 backdrop-blur transition-colors hover:bg-white/10"
            >
              <div className="flex h-16 items-center">
                {p.logo ? (
                  <img src={p.logo} alt={p.nome} className="max-h-12 w-auto" />
                ) : (
                  <span className="text-2xl font-bold tracking-tight">{p.nome}</span>
                )}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-white/70">{p.descricao}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-green">
                Visitar site
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
