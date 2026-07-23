import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Compass, Rocket, HeartHandshake, Target } from "lucide-react";
import { SSOrb } from "@/components/site/SSOrb";
import { pageHead } from "@/lib/site-config";
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
            Nascemos da telemetria.<br />
            <span className="text-gradient">Existimos para a decisão.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-white/75">
            Há mais de duas décadas equipamos frotas com tecnologia. Hoje, movemos o
            próximo capítulo do setor: uma plataforma que não apenas mostra o que
            aconteceu — recomenda o que fazer a seguir.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <img src={teamImg} alt="Time SS Telemática" loading="lazy" className="rounded-3xl shadow-elegant" width={1600} height={900} />
          <div>
            <h2 className="text-4xl font-bold">A virada estratégica da SS</h2>
            <p className="mt-4 text-muted-foreground">
              Por anos, o mercado de telemetria vendeu <em>relatórios</em>. Nós entendemos que o
              cliente não quer mais um dashboard — quer saber o que fazer segunda-feira de manhã.
              Reescrevemos a SS de dentro para fora, colocando a IA no centro do produto e
              construindo o primeiro Fleet Manager virtual do Brasil.
            </p>
            <p className="mt-4 text-muted-foreground">
              Também mudamos como vemos o motorista. Ele deixou de ser alvo de fiscalização
              para se tornar protagonista com o Copiloto SS e o Clube de Fidelidade.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-secondary/40 py-24">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="text-center text-4xl font-bold">O que nos move</h2>
          <div className="mt-14 grid gap-6 md:grid-cols-4">
            {[
              { icon: Compass, t: "Propósito", d: "Transformar cada quilômetro em decisão inteligente." },
              { icon: Rocket, t: "Visão", d: "Ser o Fleet Manager virtual do Brasil até 2028." },
              { icon: HeartHandshake, t: "Valores", d: "Cliente no centro. Motorista respeitado. Dado responsável." },
              { icon: Target, t: "Meta 2028", d: "1 milhão de veículos com IA embarcada." },
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
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-4xl font-bold">Linha do tempo</h2>
        <div className="mt-12 space-y-8 border-l-2 border-brand-sky/30 pl-8">
          {[
            { y: "2001", t: "Fundação da SS Telemática, primeiros clientes em transporte de cargas." },
            { y: "2010", t: "Consolidação nacional com rastreamento e roteirização em nuvem." },
            { y: "2019", t: "Lançamento do app do motorista e monitoramento de comportamento." },
            { y: "2024", t: "Nasce o Copiloto SS e o Clube de Fidelidade." },
            { y: "2026", t: "IA Fleet Manager e novo posicionamento: da telemetria à decisão." },
          ].map((m) => (
            <div key={m.y} className="relative">
              <div className="absolute -left-[41px] top-1 h-4 w-4 rounded-full bg-brand-green ring-4 ring-background" />
              <div className="text-sm font-bold text-brand-sky">{m.y}</div>
              <p className="mt-1 text-base">{m.t}</p>
            </div>
          ))}
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}
