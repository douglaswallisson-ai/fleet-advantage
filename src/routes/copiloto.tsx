import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Bot, Check, MessageCircle, Mic, Wifi } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SELMA, pageHead } from "@/lib/site-config";

export const Route = createFileRoute("/copiloto")({
  component: Copiloto,
  head: () =>
    pageHead({
      path: "/copiloto",
      title: "Copiloto SS — Feedback em tempo real para o motorista | SS Telemática",
      description:
        "A Selma acompanha o motorista em tempo real e envia o resumo da viagem por WhatsApp, mostrando o que foi bom e o que precisa de atenção.",
    }),
});

function Copiloto() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <FeedbackTempoReal />
        <ResumoWhatsapp />
        <Recursos />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-20 lg:grid-cols-[1fr_auto] lg:text-left">
        <div className="text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-widest backdrop-blur">
            <Bot className="h-3.5 w-3.5 text-brand-green" /> COPILOTO DO MOTORISTA
          </span>
          <h1 className="mt-6 text-5xl font-bold leading-[1.05] md:text-6xl">
            Conheça a {SELMA.nome}, sua copiloto.
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg text-white/80 lg:mx-0">
            Orienta o motorista em tempo real durante a viagem e manda o resumo do que foi bom e do
            que precisa de atenção — direto no WhatsApp, depois que a viagem termina.
          </p>
          <Link
            to="/contato"
            search={{ plano: "Copiloto SS" }}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-brand-green px-6 py-3.5 text-sm font-semibold text-[oklch(0.15_0.03_260)] transition-transform hover:-translate-y-0.5"
          >
            Simular meu plano <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <img
          src="/imagens-ss/selma/selma-ajudando.webp"
          alt={SELMA.alt}
          loading="eager"
          className="mx-auto max-h-[420px] w-auto object-contain drop-shadow-2xl"
        />
      </div>
    </section>
  );
}

function ChatMockup() {
  return (
    <div className="mx-auto max-w-sm rounded-3xl border border-border bg-card p-4 shadow-elegant">
      <div className="flex items-center gap-3 border-b border-border pb-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-hero text-sm font-bold text-white">
          {SELMA.nome.charAt(0)}
        </div>
        <div>
          <div className="text-sm font-bold">{SELMA.nome}</div>
          <div className="text-[11px] text-muted-foreground">Resumo da viagem · agora</div>
        </div>
      </div>
      <div className="mt-4 rounded-2xl rounded-tl-sm bg-secondary/70 p-4 text-sm">
        <p className="font-semibold">Viagem finalizada 🚌</p>
        <p className="mt-2 text-muted-foreground">Aqui está o resumo de hoje:</p>
        <div className="mt-3 space-y-2">
          <div className="flex items-start gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
            <span>Frenagem suave e boa condução na maior parte do trajeto</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="mt-0.5 text-amber-500">⚠️</span>
            <span>Atenção: 2 momentos de aceleração brusca na BR-116</span>
          </div>
        </div>
        <p className="mt-3 flex items-center justify-end gap-1 text-[10px] text-muted-foreground">
          14:52 <Check className="h-3 w-3 text-brand-sky" />
          <Check className="-ml-2 h-3 w-3 text-brand-sky" />
        </p>
      </div>
    </div>
  );
}

function FeedbackTempoReal() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="text-xs font-bold tracking-widest text-brand-sky">
            FEEDBACK EM TEMPO REAL
          </span>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            O ajuste acontece na hora, não no relatório do mês seguinte
          </h2>
          <p className="mt-5 text-muted-foreground">
            A {SELMA.nome} acompanha frenagem, aceleração e distância enquanto o motorista está na
            estrada, e avisa no momento em que o ajuste ainda faz diferença — em vez de uma nota
            fria que só aparece dias depois.
          </p>
        </div>
        <div className="overflow-hidden rounded-3xl shadow-elegant">
          <img
            src="/imagens-ss/copiloto/ss-copiloto-ia-v2-sem-fundo.webp"
            alt="Motorista recebendo orientação em tempo real: atenção à distância curta, aceleração brusca e feedback positivo"
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function ResumoWhatsapp() {
  return (
    <section className="bg-secondary/40 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="order-2 lg:order-1">
            <ChatMockup />
          </div>
          <div className="order-1 lg:order-2">
            <span className="text-xs font-bold tracking-widest text-brand-sky">
              RESUMO DA VIAGEM NO WHATSAPP
            </span>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Depois da viagem, a análise chega sozinha
            </h2>
            <p className="mt-5 text-muted-foreground">
              Terminada a viagem, a {SELMA.nome} envia um resumo direto no WhatsApp: o que foi bom
              na condução e o que precisa de atenção ou correção — para o motorista evoluir viagem
              após viagem, sem precisar abrir painel nenhum.
            </p>
            <ul className="mt-6 space-y-2.5 text-sm">
              {[
                "Pontos fortes da viagem",
                "O que precisa de atenção ou correção",
                "Enviado automaticamente, sem app extra",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2">
                  <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Recursos() {
  const itens = [
    {
      icon: Mic,
      t: "Voz natural em PT-BR",
      d: "Sem tela, sem distração — o motorista ouve, não precisa ler nada dirigindo.",
    },
    {
      icon: Check,
      t: "Coaching em tempo real",
      d: "Feedback amigável e imediato, focado em orientar — não em punir.",
    },
    {
      icon: Wifi,
      t: "Modo offline",
      d: "Continua funcionando nos trechos onde o sinal falha, e sincroniza depois.",
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

function CTA() {
  return (
    <section className="bg-secondary/40 py-20">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-3xl font-bold md:text-4xl">Disponível a partir do SS Performance</h2>
        <p className="mt-4 text-muted-foreground">
          O Copiloto usa os sinais de comportamento de condução do hardware VL08.
        </p>
        <Link
          to="/produtos/ss-performance"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
        >
          Conhecer o SS Performance <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
