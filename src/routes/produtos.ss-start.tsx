import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bell, ClipboardList, MapPin, Radar, Smartphone } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Backdrop } from "@/components/site/Backdrop";
import { TiersRecap } from "@/components/site/TiersRecap";
import { ReferralTeaser } from "@/components/site/ReferralTeaser";
import { RoiTrustBar } from "@/components/site/RoiTrustBar";
import { pageHead } from "@/lib/site-config";
import heroImg from "@/assets/hero-fleet.jpg";

export const Route = createFileRoute("/produtos/ss-start")({
  component: SSStart,
  head: () =>
    pageHead({
      path: "/produtos/ss-start",
      title: "SS Start — Telemetria básica para sua frota | SS Telemática",
      description:
        "Rastreamento em tempo real, cerca eletrônica e relatórios operacionais para começar a profissionalizar a gestão da frota.",
    }),
});

function SSStart() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <RoiTrustBar />
        <ComoFunciona />
        <ParaQuemE />
        <ReferralTeaser />
        <TiersRecap compact activeName="SS Start" />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero text-white">
      <div className="absolute inset-0 opacity-30">
        <Backdrop image={heroImg} eager />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.16_0.05_260)] via-[oklch(0.16_0.05_260)]/85 to-transparent" />
      </div>
      <div className="relative mx-auto max-w-4xl px-6 py-24 text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-widest backdrop-blur">
          <Radar className="h-3.5 w-3.5 text-brand-green" /> TELEMETRIA BÁSICA
        </span>
        <h1 className="mt-6 text-5xl font-bold leading-[1.05] md:text-6xl">SS Start</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/80">
          Visibilidade e controle essencial para começar a profissionalizar a gestão da frota — sem
          complexidade para configurar ou operar no dia a dia.
        </p>
        <Link
          to="/contato"
          search={{ plano: "SS Start" }}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-green px-6 py-3.5 text-sm font-semibold text-[oklch(0.15_0.03_260)] transition-transform hover:-translate-y-0.5"
        >
          Simular meu plano <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}

function ComoFunciona() {
  const itens = [
    {
      icon: MapPin,
      t: "Rastreamento em tempo real",
      d: "Posição atualizada da frota direto do GPS embarcado, com histórico de rota disponível para consulta — sem depender de ligação para saber onde o veículo está.",
    },
    {
      icon: Bell,
      t: "Cerca eletrônica",
      d: "Defina uma área de operação e receba alerta automático sempre que um veículo entrar ou saltar para fora dela. Útil para desvio de rota e controle de área de circulação.",
    },
    {
      icon: ClipboardList,
      t: "Relatórios operacionais",
      d: "A plataforma organiza automaticamente km rodado, tempo em movimento e tempo parado por veículo, prontos para exportar — sem planilha manual.",
    },
    {
      icon: Smartphone,
      t: "App do motorista",
      d: "O motorista acessa checklist de viagem, registra ocorrências e consulta informações do veículo direto do celular, sem depender do rádio ou de ligação para a base.",
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <span className="text-xs font-bold tracking-widest text-brand-sky">COMO FUNCIONA</span>
        <h2 className="mt-3 text-3xl font-bold md:text-4xl">O que o SS Start entrega</h2>
        <p className="mt-4 text-muted-foreground">
          Leitura direta do equipamento embarcado no veículo, com os dados organizados em quatro
          frentes essenciais para quem está estruturando o controle da frota.
        </p>
      </div>
      <div className="mt-14 grid gap-6 sm:grid-cols-2">
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
          Operações que estão estruturando o controle da frota agora
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
          Ideal para quem precisa sair da planilha e da ligação para o motorista e passar a ter
          visibilidade confiável da operação, com uma curva de adoção rápida para o time.
        </p>
      </div>
    </section>
  );
}
