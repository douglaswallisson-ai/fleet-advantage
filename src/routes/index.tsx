import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Brain,
  TrendingDown,
  Gauge,
  Users,
  Bot,
  Leaf,
  ArrowRight,
  Check,
  Sparkles,
  Shield,
  BarChart3,
  Radio,
  Award,
  Camera,
  Wind,
  type LucideIcon,
} from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SSOrb } from "@/components/site/SSOrb";
import { Backdrop } from "@/components/site/Backdrop";
import { Media } from "@/components/site/Media";
import { Carrossel } from "@/components/site/Carrossel";
import { GaleriaFrota } from "@/components/site/GaleriaFrota";
import { TiersRecap } from "@/components/site/TiersRecap";
import {
  FOTOS,
  MEDIA,
  SELMA,
  especialistaHref,
  localBusinessJsonLd,
  pageHead,
  softwareApplicationJsonLd,
} from "@/lib/site-config";
import driverImg from "@/assets/driver-copilot.webp";
import sustainImg from "@/assets/sustainability.webp";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    ...pageHead({
      path: "/",
      title: "SS Telemática — Decisão, não apenas dado.",
      description:
        "IA que transforma dados de frota em decisões: redução de custos, monitoramento de pneus, copiloto do motorista e clube de fidelidade. O novo padrão em gestão de frotas.",
      ogDescription:
        "IA Fleet Manager, copiloto do motorista, monitoramento inteligente de pneus e clube de fidelidade. A telemática que decide junto com você.",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(softwareApplicationJsonLd()),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(localBusinessJsonLd()),
      },
    ],
  }),
});

/**
 * Ordem das seções: dor → capacidades → produtos → prova → empacotamento → ação.
 * Os planos vêm DEPOIS de Copiloto, Clube e Selo Verde porque os citam como
 * benefícios — o leitor precisa saber o que são antes de comparar tiers.
 */
function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <Positioning />
        <Features />
        <GaleriaFrota />
        <DriverCopilot />
        <DriversClub />
        <GreenSeal />
        <TiersRecap />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero text-white">
      <div className="absolute inset-0 opacity-40">
        <Backdrop image="/og-cover.jpg" video={MEDIA.heroVideo} eager />
        <div className="absolute inset-0 bg-gradient-to-b from-[oklch(0.18_0.06_260)]/70 via-[oklch(0.18_0.06_260)]/50 to-[oklch(0.18_0.06_260)]" />
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-16 px-6 pt-20 pb-28 lg:grid-cols-[1.2fr_0.8fr] lg:pt-28 lg:pb-36">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium tracking-wide backdrop-blur">
            <Sparkles className="h-3.5 w-3.5 text-brand-green" />
            DA TELEMETRIA À DECISÃO
          </span>
          <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
            Não entregamos dados.
            <br />
            <span className="text-gradient">Entregamos decisão.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/75 md:text-xl">
            A SS Telemática é a primeira plataforma brasileira de gestão de frotas movida por IA —
            que interpreta cada quilômetro rodado e devolve o que realmente importa:{" "}
            <strong className="text-white">a próxima decisão certa.</strong>
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#solucoes"
              className="inline-flex items-center gap-2 rounded-full bg-brand-green px-6 py-3.5 text-sm font-semibold text-[oklch(0.15_0.03_260)] shadow-glow transition-transform hover:-translate-y-0.5"
            >
              Conhecer plataforma <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href={especialistaHref()}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center rounded-full border border-white/30 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/10"
            >
              Falar com especialista
            </a>
          </div>

          {/*
            A marca fica na coluna de texto, sobre o gradiente limpo do hero —
            e não por cima da foto do painel, onde o azul do anel se dissolvia
            no fundo claro e cheio de detalhe.
          */}
          <div className="mt-12 flex items-center gap-5">
            <SSOrb size={96} halo className="text-brand-green" />
            <p className="text-sm text-white/60">
              A inteligência da SS acompanhando a sua operação.
            </p>
          </div>

          <div className="mt-12 grid max-w-lg grid-cols-3 gap-6 border-t border-white/10 pt-8">
            {[
              { k: "−28%", v: "meta de custo por km" },
              { k: "+40%", v: "meta de vida útil dos pneus" },
              { k: "100%", v: "dado direto do CAN do veículo" },
            ].map((s) => (
              <div key={s.k}>
                <div className="text-2xl font-bold text-brand-green md:text-3xl">{s.k}</div>
                <div className="mt-1 text-xs text-white/60">{s.v}</div>
              </div>
            ))}
          </div>
          <p className="mt-4 max-w-lg text-[11px] leading-relaxed text-white/45">
            Metas de referência da plataforma em 12 meses. Resultados variam conforme perfil da
            frota, rota e nível de adoção.
          </p>
        </div>

        <div className="relative hidden lg:block">
          <div className="absolute inset-0 rounded-3xl bg-gradient-accent opacity-20 blur-3xl" />
          <div className="relative rounded-3xl border border-white/15 bg-white/5 p-2 shadow-elegant backdrop-blur">
            <img
              src={FOTOS.heroFundo}
              alt="Gestão de frota com a SS Telemática"
              className="rounded-2xl"
              width={1400}
              height={1000}
            />
          </div>
          <div className="relative mt-6 overflow-hidden rounded-3xl border border-white/15 shadow-elegant">
            <img
              src={FOTOS.heroTelemetria}
              alt="Videotelemetria com IA da SS"
              loading="lazy"
              className="w-full"
              width={1600}
              height={1600}
            />
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
            {
              icon: BarChart3,
              from: "Relatórios que ninguém lê",
              to: "Decisões priorizadas por IA",
            },
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

type Feature = {
  icon: LucideIcon;
  title: string;
  desc: string;
  bullets: string[];
  /** Fotos do card (principal + secundárias = carrossel). Sem fotos, usa `metric`. */
  imagens?: string[];
  metric?: { value: string; label: string };
};

/**
 * Um card de destaque em largura total + grade uniforme 2×2. Antes era um card
 * alto ao lado de dois baixos e mais uma linha solta, o que deixava alturas
 * desencontradas e a seção com cara de bagunça.
 */
function Features() {
  const cards: Feature[] = [
    {
      icon: TrendingDown,
      title: "Redução de Custo de Frota",
      desc: "Combustível, manutenção, pneus e sinistros — em um único painel de rentabilidade por veículo.",
      bullets: ["Custo por km em tempo real", "Simulador de economia", "Benchmark do seu segmento"],
      imagens: [FOTOS.reducaoCusto],
    },
    {
      icon: Gauge,
      title: "Monitoramento de Pneus",
      desc: "Sensores TPMS + IA preditiva. Pressão, temperatura e desgaste rastreados continuamente — antes de virarem parada não programada.",
      bullets: [
        "Alerta preditivo de falhas",
        "Meta de +40% de vida útil",
        "Rodízio inteligente sugerido",
      ],
      imagens: [FOTOS.pneus],
    },
    {
      icon: Camera,
      title: "Câmeras com IA a bordo",
      desc: "Visão computacional dentro e fora da cabine. Detecta fadiga e distração em tempo real — e guarda a prova em vídeo de cada evento crítico.",
      bullets: [
        "Prova de acidente em vídeo (DVR)",
        "Alerta de fadiga e microssono",
        "Detecção de desatenção",
      ],
      imagens: FOTOS.cameras,
    },
    {
      icon: Wind,
      title: "Regeneração EURO 6",
      desc: "DPF, AdBlue e ciclos de regeneração de toda a frota EURO 6 em um só painel. Evite derating, multas ambientais e paradas não programadas.",
      bullets: [
        "Regeneração em tempo real",
        "Alerta preventivo de derating",
        "Histórico completo por veículo",
      ],
      imagens: FOTOS.euro6,
    },
  ];

  return (
    <section id="solucoes" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24">
      <div className="mb-14 max-w-2xl">
        <span className="text-xs font-bold tracking-widest text-brand-sky">A PLATAFORMA SS</span>
        <h2 className="mt-3 text-4xl font-bold md:text-5xl">
          Tecnologia que decide junto — e paga a própria conta.
        </h2>
      </div>

      <article className="group grid items-stretch overflow-hidden rounded-3xl bg-gradient-hero text-white shadow-elegant lg:grid-cols-[5fr_7fr]">
        <div className="flex flex-col justify-center p-8 md:p-10">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-brand-green px-3 py-1 text-[10px] font-bold tracking-wider text-[oklch(0.15_0.03_260)]">
            <Brain className="h-3 w-3" /> DESTAQUE
          </span>
          <h3 className="mt-5 text-3xl font-bold md:text-4xl">IA Fleet Manager</h3>
          <p className="mt-3 text-base leading-relaxed text-white/75">
            O primeiro gestor virtual de frotas do Brasil. A IA da SS analisa milhões de eventos por
            dia e devolve as 3 ações que mais impactam o resultado da sua operação — hoje.
          </p>
          <ul className="mt-5 space-y-2">
            {[
              "Priorização automática de ações",
              "Detecção preditiva de falhas",
              "Diagnósticos em linguagem natural",
            ].map((b) => (
              <li key={b} className="flex items-start gap-2 text-sm text-white/90">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative overflow-hidden">
          <Carrossel
            imagens={FOTOS.fleetManager}
            alt="IA Fleet Manager da SS"
            aspect="aspect-[16/9] h-full"
            fit="cover"
          />
        </div>
      </article>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        {cards.map((card) => (
          <FeatureCard key={card.title} {...card} />
        ))}
      </div>
    </section>
  );
}

/** Card uniforme: mídia no topo (carrossel de fotos ou painel de número) + conteúdo. */
function FeatureCard({ icon: Icon, title, desc, bullets, imagens, metric }: Feature) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-shadow hover:shadow-elegant">
      {imagens && imagens.length > 0 ? (
        <Carrossel
          imagens={imagens}
          alt={title}
          aspect="aspect-[16/9]"
          fit="contain"
          className="bg-secondary"
        />
      ) : (
        <div className="flex aspect-[16/9] w-full flex-col items-center justify-center bg-gradient-hero text-center">
          <div className="text-6xl font-bold text-brand-green md:text-7xl">{metric?.value}</div>
          <div className="mt-3 max-w-[16rem] text-[10px] font-semibold tracking-widest text-white/60">
            {metric?.label}
          </div>
        </div>
      )}
      <div className="flex flex-1 flex-col p-8">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-hero text-white">
            <Icon className="h-5 w-5" />
          </span>
          <h3 className="text-xl font-bold md:text-2xl">{title}</h3>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{desc}</p>
        <ul className="mt-6 space-y-2">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-2 text-sm">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

function DriverCopilot() {
  return (
    <section id="copiloto" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <div className="relative order-2 lg:order-1">
          <div className="absolute -inset-6 rounded-3xl bg-gradient-accent opacity-20 blur-3xl" />
          {SELMA.avatar ? (
            <div className="relative flex items-end justify-center overflow-hidden rounded-3xl bg-gradient-hero shadow-elegant">
              <img
                src={SELMA.avatar}
                alt={SELMA.alt}
                loading="lazy"
                className="relative max-h-[460px] w-auto object-contain"
              />
              <div className="absolute bottom-5 left-5 rounded-2xl bg-white/95 px-4 py-2.5 shadow-card">
                <div className="text-xs font-semibold tracking-widest text-brand-sky">
                  {SELMA.papel.toUpperCase()}
                </div>
                <div className="text-lg font-bold text-[oklch(0.15_0.03_260)]">{SELMA.nome}</div>
              </div>
            </div>
          ) : (
            <img
              src={driverImg}
              alt="Motorista com copiloto SS"
              loading="lazy"
              className="relative rounded-3xl shadow-elegant"
              width={1200}
              height={900}
            />
          )}
        </div>
        <div className="order-1 lg:order-2">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold tracking-widest text-primary">
            <Bot className="h-3.5 w-3.5" /> COPILOTO DO MOTORISTA
          </span>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            {SELMA.avatar ? (
              <>
                Conheça a {SELMA.nome}, sua <span className="text-gradient">copiloto</span>.
              </>
            ) : (
              "Uma IA no banco do lado. Sem julgamento."
            )}
          </h2>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            {SELMA.avatar ? (
              <>
                A {SELMA.nome} acompanha o motorista em tempo real — tira dúvidas do dia a dia,
                avisa sobre a saúde da frota, orienta a condução, antecipa manutenção e dispara
                alertas. É a virada de página: da fiscalização para o{" "}
                <strong className="text-foreground">acompanhamento colaborativo</strong>.
              </>
            ) : (
              <>
                O Copiloto SS conversa com o motorista em tempo real — sugere rota, avisa sobre
                condução defensiva, lembra do descanso e responde perguntas por voz. É a virada de
                página: da fiscalização para o{" "}
                <strong className="text-foreground">acompanhamento colaborativo</strong>.
              </>
            )}
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
    <section
      id="clube"
      className="relative scroll-mt-24 overflow-hidden bg-gradient-hero py-24 text-white"
    >
      <div className="absolute inset-0 opacity-20">
        <Backdrop image={FOTOS.clube} video={MEDIA.clubeVideo} />
        <div className="absolute inset-0 bg-gradient-hero opacity-90" />
      </div>
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-[1fr_1fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-bold tracking-widest backdrop-blur">
            <Users className="h-3.5 w-3.5 text-brand-green" /> CLUBE DE FIDELIDADE SS
          </span>
          <h2 className="mt-4 text-4xl font-bold md:text-5xl">
            O primeiro clube de fidelidade <span className="text-brand-green">para motoristas</span>{" "}
            do Brasil.
          </h2>
          <p className="mt-5 text-lg text-white/75">
            Motorista feliz dirige melhor, cuida mais do veículo e fica na empresa. O Clube SS
            transforma boa direção em recompensa real — combustível, saúde, descontos em rede
            parceira e prêmios em dinheiro.
          </p>
        </div>
        <div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { k: "+32%", v: "de engajamento em 90 dias" },
              { k: "−45%", v: "de turnover de motoristas" },
              { k: "1200+", v: "parceiros na rede de benefícios" },
              { k: "5★", v: "avaliação média no app" },
            ].map((s) => (
              <div
                key={s.k}
                className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur"
              >
                <div className="text-3xl font-bold text-brand-green">{s.k}</div>
                <div className="mt-2 text-sm text-white/70">{s.v}</div>
              </div>
            ))}
          </div>
          <p className="mt-5 text-[11px] leading-relaxed text-white/45">
            Indicadores de referência do Clube SS. Resultados variam conforme o perfil da operação e
            o nível de adesão dos motoristas.
          </p>
        </div>
      </div>
    </section>
  );
}

/**
 * Os três pilares do ESG e como a telemetria toca cada um deles. Prepara o
 * terreno para a seção do Selo Verde, logo abaixo.
 */
function GreenSeal() {
  return (
    <section id="selo-verde" className="mx-auto max-w-7xl scroll-mt-24 px-6 py-24">
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
              <li
                key={i}
                className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-sm"
              >
                <Shield className="h-4 w-4 shrink-0 text-brand-green" /> {i}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/selo-verde"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-card transition-transform hover:-translate-y-0.5"
            >
              Conhecer o Selo Verde <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/selo-verde"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold hover:bg-secondary"
            >
              Consultar meu selo
            </Link>
          </div>
        </div>
        <div className="relative">
          <div className="overflow-hidden rounded-3xl shadow-elegant">
            <Media
              image={sustainImg}
              video={MEDIA.seloVerde}
              alt="Sustentabilidade SS"
              className="aspect-[16/9]"
              width={1600}
              height={900}
            />
          </div>
          <div className="absolute -bottom-8 left-8 flex items-center gap-3 rounded-2xl bg-white p-4 shadow-elegant">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-green">
              <Leaf className="h-7 w-7 text-white" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Frota certificada</div>
              <div className="text-lg font-bold">SS GREEN · {new Date().getFullYear()}</div>
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
        <SSOrb size={112} halo className="mx-auto text-brand-green" />
        <h2 className="mt-8 text-4xl font-bold md:text-5xl">Pronto para decidir com a SS?</h2>
        <p className="mt-4 text-lg text-muted-foreground">
          Agende uma demonstração de 20 minutos. Traga sua frota — nossa IA mostra em tempo real
          onde estão as próximas decisões de maior impacto.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/contato"
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-card transition-transform hover:-translate-y-0.5"
          >
            Agendar demo <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/indicacao"
            className="inline-flex items-center rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold hover:bg-secondary"
          >
            Ganhar indicando →
          </Link>
        </div>
      </div>
    </section>
  );
}
