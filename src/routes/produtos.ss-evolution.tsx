import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Cable, Headset, Leaf, ListChecks, Sparkles } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Backdrop } from "@/components/site/Backdrop";
import { pageHead } from "@/lib/site-config";
import managerImg from "@/assets/ai-fleet-manager.jpg";

export const Route = createFileRoute("/produtos/ss-evolution")({
  component: SSEvolution,
  head: () =>
    pageHead({
      path: "/produtos/ss-evolution",
      title: "SS Evolution — IA Fleet Manager | SS Telemática",
      description:
        "IA Fleet Manager, integrações ERP/TMS e SLA dedicado para frotas que buscam automação de decisão em escala.",
    }),
});

function SSEvolution() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <FleetManager />
        <Integracoes />
        <ParaQuemE />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero text-white">
      <div className="absolute inset-0 opacity-30">
        <Backdrop image={managerImg} eager />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.16_0.05_260)] via-[oklch(0.16_0.05_260)]/85 to-transparent" />
      </div>
      <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-widest backdrop-blur">
          <Sparkles className="h-3.5 w-3.5 text-brand-green" /> DECISÃO AUTOMATIZADA
        </span>
        <h1 className="mt-6 text-5xl font-bold leading-[1.05] md:text-6xl">SS Evolution</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
          Plano de ação pronto para a sua frota. O gestor chega e já encontra a decisão certa, não
          um painel para interpretar.
        </p>
        <Link
          to="/contato"
          search={{ plano: "SS Evolution" }}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-green px-6 py-3.5 text-sm font-semibold text-[oklch(0.15_0.03_260)] transition-transform hover:-translate-y-0.5"
        >
          Simular meu plano <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function FleetManager() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="text-xs font-bold tracking-widest text-brand-sky">IA FLEET MANAGER</span>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Uma lista do que fazer primeiro, não uma tela cheia de números
          </h2>
          <p className="mt-5 text-muted-foreground">
            O IA Fleet Manager reúne os sinais de consumo, comportamento e operação de toda a frota
            — a mesma base de dados do SS Performance — e organiza isso em um plano de ação
            priorizado. Em vez de o gestor abrir vários dashboards para descobrir onde agir, a
            plataforma já aponta a prioridade.
          </p>
          <ul className="mt-6 space-y-2.5 text-sm">
            {["Tudo do SS Performance", "IA Fleet Manager — plano de ação automatizado"].map(
              (f) => (
                <li key={f} className="flex items-start gap-2">
                  <ListChecks className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                  <span>{f}</span>
                </li>
              ),
            )}
          </ul>
        </div>
        <div className="overflow-hidden rounded-3xl shadow-elegant">
          <img
            src={managerImg}
            alt="Gestor de frota acompanhando painel de decisão do IA Fleet Manager"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function Integracoes() {
  const itens = [
    {
      icon: Cable,
      t: "Integração ERP/TMS",
      d: "Os dados de frota conversam com os sistemas de gestão que a empresa já usa, sem exportação manual de planilha entre sistemas.",
    },
    {
      icon: Headset,
      t: "SLA dedicado + CSM",
      d: "Atendimento prioritário com um gestor de contas dedicado, para quem opera em escala e não pode depender de fila de suporte genérica.",
    },
    {
      icon: Leaf,
      t: "Selo Verde ESG",
      d: "Certificação de redução de emissões calculada a partir dos dados reais de telemetria da própria operação.",
    },
  ];
  return (
    <section className="bg-secondary/40 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-6 sm:grid-cols-3">
          {itens.map(({ icon: Icon, t, d }) => (
            <div key={t} className="rounded-2xl border border-border bg-card p-6 shadow-card">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-background">
                <Icon className="h-5 w-5 text-brand-sky" />
              </div>
              <h3 className="mt-4 text-base font-bold">{t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ParaQuemE() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20 text-center">
      <span className="text-xs font-bold tracking-widest text-brand-sky">PARA QUEM É</span>
      <h2 className="mt-3 text-3xl font-bold md:text-4xl">
        Frotas que buscam automação de decisão em escala
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
        Ideal para operações com estrutura de gestão em múltiplas frentes, em que centralizar
        decisão e reduzir tempo de análise manual tem impacto direto no resultado.
      </p>
    </section>
  );
}
