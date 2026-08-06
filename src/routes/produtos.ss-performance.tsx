import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BarChart3, Check, Gauge, ShieldCheck, Sparkles } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Backdrop } from "@/components/site/Backdrop";
import { TiersRecap } from "@/components/site/TiersRecap";
import { ReferralTeaser } from "@/components/site/ReferralTeaser";
import { RoiTrustBar } from "@/components/site/RoiTrustBar";
import { pageHead } from "@/lib/site-config";
import cameraImg from "@/assets/ai-camera-monitor.jpg";
import tireImg from "@/assets/tire-monitor.jpg";

export const Route = createFileRoute("/produtos/ss-performance")({
  component: SSPerformance,
  head: () =>
    pageHead({
      path: "/produtos/ss-performance",
      title: "SS Performance — Telemetria avançada e copiloto de IA | SS Telemática",
      description:
        "Copiloto do motorista com feedback em tempo real, monitoramento de pneus e painel de rentabilidade para operações que competem por eficiência.",
    }),
});

function SSPerformance() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <RoiTrustBar />
        <Copiloto />
        <Pneus />
        <Euro6 />
        <Rentabilidade />
        <ParaQuemE />
        <ReferralTeaser />
        <TiersRecap compact activeName="SS Performance" />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero text-white">
      <div className="absolute inset-0 opacity-30">
        <Backdrop image={cameraImg} eager />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.16_0.05_260)] via-[oklch(0.16_0.05_260)]/85 to-transparent" />
      </div>
      <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-widest backdrop-blur">
          <Gauge className="h-3.5 w-3.5 text-brand-green" /> TELEMETRIA AVANÇADA
        </span>
        <h1 className="mt-6 text-5xl font-bold leading-[1.05] md:text-6xl">SS Performance</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
          O copiloto de IA que orienta o motorista em tempo real, com feedback contínuo para reduzir
          consumo e sinistros.
        </p>
        <Link
          to="/contato"
          search={{ plano: "SS Performance" }}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-green px-6 py-3.5 text-sm font-semibold text-[oklch(0.15_0.03_260)] transition-transform hover:-translate-y-0.5"
        >
          Simular meu plano <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function Copiloto() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="text-xs font-bold tracking-widest text-brand-sky">
            COPILOTO DO MOTORISTA
          </span>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Orientação em tempo real, não punição depois do fato
          </h2>
          <p className="mt-5 text-muted-foreground">
            O Copiloto acompanha sinais de comportamento de condução — frenagem brusca, aceleração e
            curvas — e devolve feedback ao motorista enquanto ele ainda está na estrada, no momento
            em que o ajuste faz diferença.
          </p>
          <p className="mt-4 text-muted-foreground">
            Toda a base do SS Start continua incluída: rastreamento, cerca eletrônica, relatórios e
            app do motorista.
          </p>
        </div>
        <div className="overflow-hidden rounded-3xl shadow-elegant">
          <img
            src={cameraImg}
            alt="Painel do copiloto de IA identificando sinais de atenção do motorista durante a condução"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function Pneus() {
  return (
    <section className="bg-secondary/40 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 overflow-hidden rounded-3xl shadow-elegant lg:order-1">
            <img
              src={tireImg}
              alt="Sensor lendo pressão e desgaste do pneu diretamente do CAN do veículo"
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-xs font-bold tracking-widest text-brand-sky">
              MONITORAMENTO DE PNEUS
            </span>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              O pneu não estoura — ele é estourado
            </h2>
            <p className="mt-5 text-muted-foreground">
              O SS Performance lê os sinais de pressão direto do CAN do veículo — disponíveis a
              partir do hardware VL08 — e avisa quando algo sai do padrão, antes que se torne um
              estouro. Uma carcaça recapada rende até três vidas de uso; perder uma por
              comportamento evitável custa a carcaça inteira, não um pneu.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Euro6() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="text-xs font-bold tracking-widest text-brand-sky">
            REGENERAÇÃO EURO 6
          </span>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            DPF e AdBlue sob controle, não sob surpresa
          </h2>
          <p className="mt-5 text-muted-foreground">
            DPF, AdBlue e ciclos de regeneração de toda a frota EURO 6 em um só painel. Evite
            derating, multas ambientais e paradas não programadas.
          </p>
          <ul className="mt-6 space-y-2.5 text-sm">
            {[
              "Regeneração em tempo real",
              "Alerta preventivo de derating",
              "Histórico completo por veículo",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="overflow-hidden rounded-3xl shadow-elegant">
          <img
            src="/imagens-ss/euro-6/principal.jpg"
            alt="Painel de regeneração EURO 6 mostrando saturação do filtro DPF, temperatura e status do sistema"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function Rentabilidade() {
  const itens = [
    {
      icon: BarChart3,
      t: "Painel de rentabilidade",
      d: "Custo operacional consolidado por veículo, para saber onde a operação está performando bem e onde está sangrando margem.",
    },
    {
      icon: ShieldCheck,
      t: "Redução de sinistro",
      d: "Comportamento de condução monitorado continuamente reduz a exposição a eventos que geram sinistro e custo de manutenção não planejado.",
    },
    {
      icon: Sparkles,
      t: "BI e relatórios avançados",
      d: "Mesma base de BI do SS Start, com o detalhamento adicional que os dados de comportamento e pneus trazem para a análise.",
    },
  ];
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid gap-6 sm:grid-cols-3">
        {itens.map(({ icon: Icon, t, d }) => (
          <div key={t} className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary">
              <Icon className="h-5 w-5 text-brand-sky" />
            </div>
            <h3 className="mt-4 text-base font-bold">{t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ParaQuemE() {
  return (
    <section className="bg-secondary/40 py-20">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <span className="text-xs font-bold tracking-widest text-brand-sky">PARA QUEM É</span>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">
          Para operações que competem por eficiência
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Ideal para frotas em que consumo, sinistro e desgaste de pneu já pesam na conta e precisam
          de intervenção no momento em que acontecem, não só de relatório no fim do mês.
        </p>
      </div>
    </section>
  );
}
