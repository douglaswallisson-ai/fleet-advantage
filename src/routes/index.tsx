import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  Brain, TrendingDown, Gauge, Users, Bot, Leaf, ArrowRight, Check,
  Sparkles, Shield, Truck, BarChart3, Radio, Award
} from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import heroImg from "@/assets/hero-fleet.jpg";
import fleetImg from "@/assets/ai-fleet-manager.jpg";
import driverImg from "@/assets/driver-copilot.jpg";
import tireImg from "@/assets/tire-monitor.jpg";
import driversClubImg from "@/assets/drivers-club.jpg";
import sustainImg from "@/assets/sustainability.jpg";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "SS Telemática — Da telemetria à tomada de decisão" },
      { name: "description", content: "IA que transforma dados de frota em decisões: redução de custos, monitoramento de pneus, copiloto do motorista e clube de fidelidade. O novo padrão em gestão de frotas." },
      { property: "og:title", content: "SS Telemática — Decisão, não apenas dado." },
      { property: "og:description", content: "IA Fleet Manager, copiloto do motorista, monitoramento inteligente de pneus e clube de fidelidade. A telemática que decide junto com você." },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <Hero />
      <Positioning />
      <Features />
      <ProductTiers />
      <DriverCopilot />
      <DriversClub />
      <GreenSeal />
      <CTA />
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero text-white">
      <div className="absolute inset-0 opacity-40">
        <img src={heroImg} alt="" className="h-full w-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.18_0.06_260)]/70 via-[oklch(0.18_0.06_260)]/50 to-[oklch(0.18_0.06_260)]" />
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 pt-20 pb-28 lg:grid-cols-[1.2fr_0.8fr] lg:pt-28 lg:pb-36">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-brand-green" />
            NOVO POSICIONAMENTO SS
          </span>
          <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            Não entregamos dados.<br />
            <span className="text-gradient">Entregamos decisão.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/75 md:text-xl">
            A SS Telemática é a primeira plataforma brasileira de gestão de frotas
            movida por IA — que interpreta cada quilômetro rodado e devolve o que
            realmente importa: <strong className="text-white">a próxima decisão certa.</strong>
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a href="#produtos" className="inline-flex items-center gap-2 rounded-full bg-brand-green px-6 py-3.5 text-sm font-semibold text-[oklch(0.15_0.03_260)] shadow-glow transition-transform hover:-translate-y-0.5">
              Conhecer plataforma <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#contato" className="inline-flex items-center rounded-full border border-white/30 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/10">
              Falar com especialista
            </a>
          </div>
          <div className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {[
              { k: "−28%", v: "custo médio de frota" },
              { k: "+40%", v: "vida útil dos pneus" },
              { k: "24/7", v: "monitoramento com IA" },
            ].map((s) => (
              <div key={s.k}>
                <div className="text-2xl font-bold text-brand-green md:text-3xl">{s.k}</div>
                <div className="mt-1 text-xs text-white/60">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative hidden lg:block">
          <div className="absolute inset-0 rounded-3xl bg-gradient-accent opacity-20 blur-3xl" />
          <div className="relative rounded-3xl border border-white/15 bg-white/5 p-2 shadow-elegant backdrop-blur">
            <img src={fleetImg} alt="Painel de IA Fleet Manager" className="rounded-2xl" width={1400} height={1000} />
            <div className="absolute -bottom-6 -left-6 rounded-2xl bg-brand-green px-5 py-4 shadow-elegant">
              <div className="flex items-center gap-2 text-[oklch(0.15_0.03_260)]">
                <Brain className="h-5 w-5" />
                <span className="text-xs font-bold tracking-wide">IA FLEET MANAGER</span>
              </div>
              <p className="mt-1 text-xs text-[oklch(0.15_0.03_260)]/80">Recomendando 3 ações agora</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Positioning() {
  return (
    <section className="border-y border-border/60 bg-secondary/40 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 md:grid-cols-3">
          {[
            { icon: BarChart3, from: "Relatórios que ninguém lê", to: "Decisões priorizadas por IA" },
            { icon: Radio, from: "Alertas em massa", to: "Ações contextualizadas" },
            { icon: Award, from: "Ranking punitivo", to: "Motoristas engajados" },
          ].map(({ icon: Icon, from, to }) => (
            <div key={from} className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground line-through">{from}</p>
                <p className="mt-1 text-base font-semibold text-foreground">→ {to}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Features() {
  const features = [
    {
      icon: Brain,
      tag: "DESTAQUE",
      title: "IA Fleet Manager",
      desc: "O primeiro gestor virtual de frotas do Brasil. A IA da SS analisa milhões de eventos por dia e devolve as 3 ações que mais impactam o resultado da sua operação — hoje.",
      bullets: ["Priorização automática de ações", "Detecção preditiva de falhas", "Diagnósticos em linguagem natural"],
      image: fleetImg,
    },
    {
      icon: TrendingDown,
      title: "Redução de Custo de Frota",
      desc: "Combustível, manutenção, pneus e sinistros — em um único painel de rentabilidade por veículo. Meta clara: −28% no custo por km em 12 meses.",
      bullets: ["Custo por km em tempo real", "Simulador de economia", "Benchmark do seu segmento"],
      image: null,
    },
    {
      icon: Gauge,
      title: "Monitoramento Inteligente de Pneus",
      desc: "Sensores TPMS + IA preditiva. Pressão, temperatura e desgaste rastreados 24/7 — antes de virarem parada não programada.",
      bullets: ["Alerta preditivo de falhas", "+40% de vida útil média", "Rodízio inteligente sugerido"],
      image: tireImg,
    },
  ];

  return (
    <section id="solucoes" className="mx-auto max-w-7xl px-6 py-24">
      <div className="mb-16 max-w-2xl">
        <span className="text-xs font-bold tracking-widest text-brand-sky">O QUE MOVE A SS</span>
        <h2 className="mt-3 text-4xl font-bold md:text-5xl">Inteligência aplicada onde dói o bolso.</h2>
      </div>
      <div className="grid gap-8 lg:grid-cols-2">
        <FeatureCard {...features[0]} big />
        <div className="grid gap-8">
          <FeatureCard {...features[1]} />
          <FeatureCard {...features[2]} />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ icon: Icon, tag, title, desc, bullets, image, big }: any) {
  return (
    <article className={`group relative overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-card transition-all hover:shadow-elegant ${big ? "lg:row-span-2" : ""}`}>
      {tag && (
        <span className="absolute right-6 top-6 rounded-full bg-brand-green px-3 py-1 text-[10px] font-bold tracking-wider text-[oklch(0.15_0.03_260)]">
          {tag}
        </span>
      )}
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-hero text-white">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-6 text-2xl font-bold">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">{desc}</p>
      <ul className="mt-6 space-y-2">
        {bullets.map((b: string) => (
          <li key={b} className="flex items-start gap-2 text-sm">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      {image && big && (
        <div className="mt-8 overflow-hidden rounded-2xl">
          <img src={image} alt={title} loading="lazy" className="w-full transition-transform duration-500 group-hover:scale-105" width={1400} height={1000} />
        </div>
      )}
    </article>
  );
}

function ProductTiers() {
  const tiers = [
    {
      name: "SS Essencial",
      desc: "Rastreio, roteirização e relatórios essenciais para frotas em crescimento.",
      features: ["Rastreamento em tempo real", "Cerca eletrônica", "Relatórios operacionais", "App do motorista"],
      color: "border-border",
      cta: "Ideal para até 50 veículos",
    },
    {
      name: "SS Performance",
      badge: "MAIS ESCOLHIDO",
      desc: "Toda base + copiloto do motorista, gamificação e monitoramento de pneus.",
      features: ["Tudo do Essencial", "Copiloto do Motorista", "Clube de Fidelidade", "Monitoramento de Pneus", "Painel de rentabilidade"],
      color: "border-brand-sky ring-2 ring-brand-sky/40",
      cta: "Para operações que competem por eficiência",
    },
    {
      name: "SS Enterprise IA",
      desc: "IA Fleet Manager completo, integrações ERP/TMS e Selo Verde ESG.",
      features: ["Tudo do Performance", "IA Fleet Manager", "Integração ERP/TMS", "Selo Verde SS", "SLA dedicado + CSM"],
      color: "border-border bg-gradient-hero text-white",
      cta: "Frotas 500+ com metas ESG",
    },
  ];
  return (
    <section id="produtos" className="bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="text-xs font-bold tracking-widest text-brand-sky">3 TIERS · UMA PLATAFORMA</span>
            <h2 className="mt-3 text-4xl font-bold md:text-5xl">Escolha o nível de decisão da sua frota.</h2>
          </div>
          <p className="max-w-md text-sm text-muted-foreground">
            Do rastreio essencial à IA que gerencia sua operação por você. Migre entre planos quando quiser.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {tiers.map((t) => {
            const isDark = t.color.includes("gradient-hero");
            return (
              <article key={t.name} className={`relative flex flex-col rounded-3xl border p-8 shadow-card ${t.color}`}>
                {t.badge && (
                  <span className="absolute -top-3 left-8 rounded-full bg-brand-green px-3 py-1 text-[10px] font-bold tracking-wider text-[oklch(0.15_0.03_260)]">
                    {t.badge}
                  </span>
                )}
                <h3 className="text-2xl font-bold">{t.name}</h3>
                <p className={`mt-2 text-sm ${isDark ? "text-white/70" : "text-muted-foreground"}`}>{t.desc}</p>
                <ul className={`mt-6 space-y-2.5 text-sm ${isDark ? "text-white/90" : ""}`}>
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${isDark ? "text-brand-green" : "text-brand-green"}`} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div className={`mt-8 flex-1 border-t pt-4 text-xs ${isDark ? "border-white/10 text-white/60" : "border-border text-muted-foreground"}`}>
                  {t.cta}
                </div>
                <a href="#contato" className={`mt-6 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${isDark ? "bg-brand-green text-[oklch(0.15_0.03_260)]" : "bg-primary text-primary-foreground"}`}>
                  Simular meu plano
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function DriverCopilot() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <div className="relative order-2 lg:order-1">
          <div className="absolute -inset-6 rounded-3xl bg-gradient-accent opacity-20 blur-3xl" />
          <img src={driverImg} alt="Motorista com copiloto SS" loading="lazy" className="relative rounded-3xl shadow-elegant" width={1200} height={900} />
        </div>
        <div className="order-1 lg:order-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold tracking-widest text-primary">
            <Bot className="h-3.5 w-3.5" /> COPILOTO DO MOTORISTA
          </span>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">Uma IA no banco do lado. Sem julgamento.</h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            O Copiloto SS conversa com o motorista em tempo real — sugere rota, avisa
            sobre condução defensiva, lembra do descanso e responde perguntas por voz.
            É a virada de página: da fiscalização para o <strong className="text-foreground">acompanhamento colaborativo</strong>.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              { t: "Voz natural em PT-BR", d: "Sem tela, sem distração" },
              { t: "Coaching em tempo real", d: "Feedback amigável e imediato" },
              { t: "Integrado ao Clube", d: "Cada boa prática vira ponto" },
              { t: "Modo offline", d: "Funciona onde o sinal falha" },
            ].map((f) => (
              <div key={f.t} className="rounded-xl border border-border bg-card p-4">
                <div className="text-sm font-semibold">{f.t}</div>
                <div className="mt-1 text-xs text-muted-foreground">{f.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DriversClub() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-24 text-white">
      <div className="absolute inset-0 opacity-20">
        <img src={driversClubImg} alt="" className="h-full w-full object-cover" width={1400} height={900} />
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold tracking-widest backdrop-blur">
            <Users className="h-3.5 w-3.5 text-brand-green" /> CLUBE DE FIDELIDADE SS
          </span>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            O primeiro clube de fidelidade <span className="text-brand-green">para caminhoneiros</span> do Brasil.
          </h2>
          <p className="mt-5 text-lg text-white/75">
            Motorista feliz dirige melhor, cuida mais do veículo e fica na empresa.
            O Clube SS transforma boa direção em recompensa real — combustível, saúde,
            descontos em rede parceira e prêmios em dinheiro.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {[
            { k: "+32%", v: "de engajamento em 90 dias" },
            { k: "−45%", v: "de turnover de motoristas" },
            { k: "1200+", v: "parceiros na rede de benefícios" },
            { k: "5★", v: "avaliação média no app" },
          ].map((s) => (
            <div key={s.k} className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur">
              <div className="text-3xl font-bold text-brand-green">{s.k}</div>
              <div className="mt-2 text-sm text-white/70">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GreenSeal() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-green/15 px-3 py-1 text-xs font-bold tracking-widest text-[oklch(0.35_0.12_138)]">
            <Leaf className="h-3.5 w-3.5" /> SELO VERDE SS
          </span>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            Sustentabilidade que <span className="text-gradient">vira contrato</span>.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            O Selo Verde SS mede e certifica a pegada de carbono da sua frota com base em dados
            reais — não estimativas. É o relatório ESG que grandes embarcadores exigem para fechar
            contrato, gerado automaticamente pela sua operação.
          </p>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Inventário GHG por veículo",
              "Certificação digital verificável",
              "Metas de redução com IA",
              "Relatório ESG pronto",
            ].map((i) => (
              <li key={i} className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm">
                <Shield className="h-4 w-4 text-brand-green" /> {i}
              </li>
            ))}
          </ul>
        </div>
        <div className="relative">
          <img src={sustainImg} alt="Sustentabilidade SS" loading="lazy" className="rounded-3xl shadow-elegant" width={1600} height={900} />
          <div className="absolute -bottom-8 left-8 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-elegant">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-green">
              <Leaf className="h-7 w-7 text-white" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Frota certificada</div>
              <div className="text-lg font-bold">SS GREEN · 2026</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="bg-secondary/40 py-24">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Truck className="mx-auto h-10 w-10 text-brand-sky" />
        <h2 className="mt-6 text-4xl font-bold md:text-5xl">Pronto para decidir com a SS?</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Agende uma demonstração de 20 minutos. Traga sua frota — nossa IA mostra em tempo real onde estão as próximas decisões de maior impacto.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <a href="#contato" className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-card hover:-translate-y-0.5 transition-transform">
            Agendar demo <ArrowRight className="h-4 w-4" />
          </a>
          <Link to="/indicacao" className="inline-flex items-center rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold hover:bg-secondary">
            Ganhar indicando →
          </Link>
        </div>
      </div>
    </section>
  );
}
