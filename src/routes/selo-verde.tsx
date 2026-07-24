import { useState, type FormEvent } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bus,
  Cloud,
  Droplet,
  FileCheck2,
  Gauge,
  Handshake,
  Info,
  Leaf,
  Loader2,
  MapPin,
  Recycle,
  Search,
  Target,
  TrendingUp,
  Trophy,
  Truck,
} from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Backdrop } from "@/components/site/Backdrop";
import { SeloCarbono } from "@/components/site/SeloCarbono";
import { EcoRing } from "@/components/site/EcoRing";
import { EsgVenn } from "@/components/site/EsgVenn";
import { formatCnpj, isValidCnpj, onlyDigits } from "@/lib/cnpj";
import { IMAGENS, IMAGENS_PROVISORIAS, pageHead } from "@/lib/site-config";
import sustainImg from "@/assets/sustainability.jpg";

export const Route = createFileRoute("/selo-verde")({
  component: SeloVerde,
  head: () =>
    pageHead({
      path: "/selo-verde",
      title: "Selo Verde SS — Certificação ambiental da sua frota",
      description:
        "O Selo Verde SS certifica a pegada de carbono da frota com base em dados reais de telemetria, não estimativas. Consulte o selo pelo CNPJ.",
      ogTitle: "Selo Verde SS — Sustentabilidade que vira contrato",
      ogDescription:
        "Certificação ambiental medida por telemetria, com relatório ESG pronto para embarcadores. Consulte o selo da sua frota pelo CNPJ.",
    }),
});

function SeloVerde() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <OQueE />
        <Proposito />
        <EsgPilares />
        <Beneficios />
        <ComoConquistar />
        <CTAFinal />
      </main>
      <Footer />
    </div>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero text-white">
      {/* Fundo provisório — ver IMAGENS em site-config.ts */}
      <div className="absolute inset-0 opacity-35">
        <Backdrop image={IMAGENS.folha} />
        <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.16_0.05_260)] via-[oklch(0.16_0.05_260)]/85 to-transparent" />
      </div>
      {IMAGENS_PROVISORIAS && (
        <span className="absolute right-4 top-4 z-10 rounded-full bg-[oklch(0.15_0.03_260)]/80 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white backdrop-blur">
          IMAGEM PROVISÓRIA
        </span>
      )}

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-widest backdrop-blur">
            <Leaf className="h-3.5 w-3.5 text-brand-green" /> CERTIFICAÇÃO SS
          </span>
          <h1 className="mt-6 text-5xl font-bold leading-[1.05] md:text-6xl">Selo Verde SS</h1>
          <p className="mt-6 max-w-xl text-lg text-white/80">
            A certificação concedida às frotas que reduzem emissões com base em dados reais de
            telemetria — não em estimativas. Informe o CNPJ e consulte os indicadores que comprovam
            o compromisso da empresa.
          </p>
          <ConsultaSelo />
        </div>

        <div className="flex justify-center lg:justify-end">
          <CartaoCertificado />
        </div>
      </div>
    </section>
  );
}

/**
 * Cartão de certificação — mesma linguagem do selo que já aparecia na home:
 * cartão branco, disco verde com a folha e a linha "SS GREEN · ano".
 */
function CartaoCertificado() {
  return (
    <div className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-elegant">
      <div className="flex items-center gap-4">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-green">
          <Leaf className="h-10 w-10 text-white" />
        </div>
        <div>
          <div className="text-xs font-semibold tracking-widest text-muted-foreground">
            FROTA CERTIFICADA
          </div>
          <div className="mt-1 text-2xl font-bold text-[oklch(0.15_0.03_260)]">
            SS GREEN · {new Date().getFullYear()}
          </div>
        </div>
      </div>
      <div className="mt-6 border-t border-border pt-5">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Certificação digital verificável, emitida a partir dos dados de telemetria da própria
          operação.
        </p>
      </div>
    </div>
  );
}

type Indicador = { rotulo: string; valor: string };
type Registro = {
  empresa: string;
  certificadoDesde?: string;
  validade?: string;
  codigo?: string;
  indicadores?: Indicador[];
};
type Resultado =
  | { status: "certificado"; registro: Registro }
  | { status: "nao_encontrado" }
  | { status: "invalido" | "indisponivel"; mensagem: string };

function ConsultaSelo() {
  const [cnpj, setCnpj] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [resultado, setResultado] = useState<Resultado | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (carregando) return;

    if (!isValidCnpj(cnpj)) {
      setResultado({
        status: "invalido",
        mensagem: "CNPJ inválido. Confira os números digitados.",
      });
      return;
    }

    setCarregando(true);
    setResultado(null);
    try {
      const res = await fetch(`/api/selo?cnpj=${onlyDigits(cnpj)}`);
      setResultado((await res.json()) as Resultado);
    } catch {
      setResultado({
        status: "indisponivel",
        mensagem: "Sem conexão com o servidor. Tente de novo em instantes.",
      });
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className="mt-10 max-w-xl">
      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor="cnpj">
          CNPJ da empresa
        </label>
        <input
          id="cnpj"
          name="cnpj"
          inputMode="numeric"
          autoComplete="off"
          placeholder="Insira aqui o CNPJ"
          value={cnpj}
          onChange={(e) => setCnpj(formatCnpj(e.target.value))}
          className="min-w-0 flex-1 rounded-xl border border-white/25 bg-white/95 px-4 py-3.5 text-sm text-[oklch(0.15_0.03_260)] outline-none transition placeholder:text-[oklch(0.5_0.02_260)] focus:ring-2 focus:ring-brand-green/60"
        />
        <button
          type="submit"
          disabled={carregando}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-green px-6 py-3.5 text-sm font-semibold text-[oklch(0.15_0.03_260)] transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
        >
          {carregando ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Consultando…
            </>
          ) : (
            <>
              Consultar meu selo <Search className="h-4 w-4" />
            </>
          )}
        </button>
      </form>

      {resultado && <ResultadoConsulta resultado={resultado} />}
    </div>
  );
}

function ResultadoConsulta({ resultado }: { resultado: Resultado }) {
  if (resultado.status === "certificado") {
    const r = resultado.registro;
    return (
      <div
        role="status"
        className="mt-5 rounded-2xl border border-brand-green/50 bg-brand-green/10 p-5 backdrop-blur"
      >
        <div className="flex items-start gap-3">
          <BadgeCheck className="mt-0.5 h-6 w-6 shrink-0 text-brand-green" />
          <div className="min-w-0">
            <p className="text-sm font-bold">Frota certificada</p>
            <p className="mt-0.5 text-base font-semibold">{r.empresa}</p>
            <p className="mt-1 text-xs text-white/70">
              {r.codigo && <>Código {r.codigo} · </>}
              {r.certificadoDesde && <>Certificada desde {r.certificadoDesde}</>}
              {r.validade && <> · Válido até {r.validade}</>}
            </p>
          </div>
        </div>
        {r.indicadores && r.indicadores.length > 0 && (
          <dl className="mt-5 grid gap-3 sm:grid-cols-2">
            {r.indicadores.map((i) => (
              <div key={i.rotulo} className="rounded-xl border border-white/15 bg-white/5 p-3">
                <dt className="text-[10px] font-semibold tracking-widest text-white/60">
                  {i.rotulo.toUpperCase()}
                </dt>
                <dd className="mt-1 text-lg font-bold text-brand-green">{i.valor}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    );
  }

  if (resultado.status === "nao_encontrado") {
    return (
      <div
        role="status"
        className="mt-5 flex items-start gap-3 rounded-2xl border border-white/20 bg-white/5 p-5 backdrop-blur"
      >
        <Info className="mt-0.5 h-5 w-5 shrink-0 text-brand-sky" />
        <div>
          <p className="text-sm font-semibold">Não encontramos um selo ativo para este CNPJ.</p>
          <p className="mt-1 text-xs text-white/70">
            A empresa pode ainda não ter aderido ao programa.{" "}
            <Link to="/contato" className="underline hover:text-white">
              Fale com nosso time
            </Link>{" "}
            para conquistar o Selo Verde SS.
          </p>
        </div>
      </div>
    );
  }

  const alerta = resultado.status === "invalido";
  return (
    <div
      role="alert"
      className={`mt-5 flex items-start gap-3 rounded-2xl border p-5 backdrop-blur ${
        alerta ? "border-white/30 bg-white/10" : "border-brand-sky/40 bg-brand-sky/10"
      }`}
    >
      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-brand-sky" />
      <div>
        <p className="text-sm">{resultado.mensagem}</p>
        {!alerta && (
          <Link
            to="/contato"
            className="mt-2 inline-block text-xs font-semibold underline hover:text-white"
          >
            Falar com o time da SS
          </Link>
        )}
      </div>
    </div>
  );
}

function OQueE() {
  const chips = [
    { icon: BarChart3, t: "Medição por telemetria" },
    { icon: Recycle, t: "Redução de CO₂" },
    { icon: FileCheck2, t: "Relatório ESG pronto" },
    { icon: Target, t: "Metas com IA" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <EcoRing />
        <div>
          <h2 className="text-3xl font-bold md:text-4xl">Conheça o Selo Verde SS</h2>
          <p className="mt-5 text-muted-foreground">
            O Selo Verde SS é a certificação concedida às frotas que operam na plataforma SS e
            comprovam redução de emissões. O cálculo parte dos dados que já trafegam na telemetria —
            consumo real, rota percorrida e comportamento de condução — e não de médias de mercado.
          </p>
          <p className="mt-4 text-muted-foreground">
            Transforme essa medição em diferencial competitivo: visível para o mercado, verificável
            por terceiros e alinhado aos critérios ESG que grandes embarcadores exigem em
            concorrência.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {chips.map(({ icon: Icon, t }) => (
              <div
                key={t}
                className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3.5 text-sm font-medium shadow-card"
              >
                <Icon className="h-5 w-5 shrink-0 text-brand-green" /> {t}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Proposito() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-20">
      <div className="rounded-3xl bg-gradient-hero px-6 py-14 text-center text-white md:px-14">
        <h2 className="mx-auto max-w-3xl text-2xl font-bold leading-snug md:text-3xl">
          O Selo Verde SS existe para reconhecer — e dar visibilidade — a quem já escolheu o caminho
          mais eficiente.
        </h2>
        <SeloCarbono size={200} className="mx-auto mt-10" />
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-2">
          {[
            {
              icon: TrendingUp,
              t: "Eficiência que já acontece",
              d: "Cada litro economizado por uma condução melhor é menos carbono na atmosfera. O selo torna esse resultado mensurável.",
            },
            {
              icon: Leaf,
              t: "Impacto ambiental comprovado",
              d: "Inventário de emissões por veículo, com metodologia auditável e histórico completo da operação.",
            },
          ].map(({ icon: Icon, t, d }) => (
            <div
              key={t}
              className="flex gap-4 rounded-2xl border border-white/15 bg-white/5 p-5 text-left backdrop-blur"
            >
              <Icon className="mt-0.5 h-6 w-6 shrink-0 text-brand-green" />
              <div>
                <div className="text-sm font-bold">{t}</div>
                <p className="mt-1 text-xs leading-relaxed text-white/70">{d}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-sm text-white/70">
          Se a sua frota já opera na SS, você tem acesso ao selo e aos indicadores que comprovam o
          seu impacto positivo.
        </p>
      </div>
    </section>
  );
}

function EsgPilares() {
  const impactos = [
    { icon: Truck, t: "Carretas" },
    { icon: Bus, t: "Ônibus" },
    { icon: Cloud, t: "Emissões" },
    { icon: MapPin, t: "Rotas" },
    { icon: Droplet, t: "Combustível" },
    { icon: Gauge, t: "Condução" },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <div className="grid items-center gap-16 lg:grid-cols-2">
        <div>
          <span className="text-xs font-bold tracking-widest text-brand-sky">ESG NA PRÁTICA</span>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Eficiência não escolhe um lado — <span className="text-gradient">ganha nos três</span>.
          </h2>
          <p className="mt-5 text-muted-foreground">
            Cada litro economizado por uma condução melhor reduz custo, protege o motorista e corta
            emissão. Na gestão de frotas, os pilares econômico, social e ambiental não competem:
            avançam juntos.
          </p>

          <dl className="mt-8 space-y-4">
            {[
              {
                t: "Econômico",
                d: "Custo por km, consumo e manutenção sob controle, com rentabilidade por veículo.",
              },
              {
                t: "Social",
                d: "Motorista acompanhado, não vigiado — com copiloto, coaching e recompensa por boa prática.",
              },
              {
                t: "Ambiental",
                d: "Pegada de carbono medida por dado real de telemetria, com meta de redução por IA.",
              },
            ].map((p) => (
              <div key={p.t} className="border-l-2 border-brand-green/50 pl-4">
                <dt className="text-sm font-bold">{p.t}</dt>
                <dd className="mt-1 text-sm text-muted-foreground">{p.d}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-8 sm:grid-cols-6">
            {impactos.map(({ icon: Icon, t }) => (
              <div key={t} className="flex flex-col items-center gap-2 text-center">
                <span className="relative flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-card">
                  <Icon className="h-6 w-6 text-primary" strokeWidth={1.6} />
                  <Leaf
                    className="absolute -bottom-1 -right-1 h-4 w-4 text-brand-green"
                    strokeWidth={2}
                  />
                </span>
                <span className="text-[11px] font-medium text-muted-foreground">{t}</span>
              </div>
            ))}
          </div>
        </div>

        <EsgVenn />
      </div>
    </section>
  );
}

function Beneficios() {
  const itens = [
    {
      t: "Visibilidade de marca",
      d: "Use o selo em propostas, site e redes sociais. Mostre ao mercado o compromisso da sua operação.",
    },
    {
      t: "Diferencial em concorrências",
      d: "Embarcadores com meta ESG priorizam transportadoras que comprovam pegada de carbono com dado auditável.",
    },
    {
      t: "Relatório de impacto",
      d: "Inventário GHG por veículo e por rota, gerado automaticamente pela operação — sem planilha manual.",
    },
    {
      t: "Metas orientadas por IA",
      d: "A plataforma aponta onde há mais emissão evitável e qual ação reduz mais, na ordem certa.",
    },
    {
      t: "Reconhecimento público",
      d: "Sua empresa entra na lista de frotas certificadas, consultável por qualquer pessoa pelo CNPJ.",
    },
  ];

  return (
    <section className="bg-secondary/40 py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2">
        <img
          src={sustainImg}
          alt="Frota com operação sustentável certificada pela SS"
          loading="lazy"
          className="order-2 rounded-3xl shadow-elegant lg:order-1"
          width={1600}
          height={900}
        />
        <div className="order-1 lg:order-2">
          <h2 className="text-3xl font-bold md:text-4xl">
            O que sua frota ganha com o Selo Verde SS
          </h2>
          <ul className="mt-8 space-y-3">
            {itens.map((i) => (
              <li
                key={i.t}
                className="flex gap-3 rounded-xl border border-border bg-card p-4 shadow-card"
              >
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
                <div>
                  <div className="text-sm font-bold">{i.t}</div>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{i.d}</p>
                </div>
              </li>
            ))}
          </ul>
          <Link
            to="/contato"
            search={{ plano: "Selo Verde SS" }}
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-card transition-transform hover:-translate-y-0.5"
          >
            Conquistar o Selo Verde SS <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ComoConquistar() {
  const passos = [
    {
      icon: Handshake,
      n: "1",
      t: "Opere na plataforma SS",
      d: "A telemetria da frota alimenta o cálculo de emissões. Sem instalar nada além do que já roda nos veículos.",
    },
    {
      icon: Trophy,
      n: "2",
      t: "Alcance a meta de redução",
      d: "A IA define a meta a partir do seu perfil de operação e acompanha o progresso mês a mês.",
    },
    {
      icon: BadgeCheck,
      n: "3",
      t: "Receba e use o selo",
      d: "Certificação digital verificável, com relatório ESG pronto para anexar em propostas comerciais.",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <h2 className="text-center text-3xl font-bold md:text-4xl">
        Como conquistar o Selo Verde SS
      </h2>
      <div className="relative mt-14 grid gap-8 md:grid-cols-3">
        {/* Linha que conecta os três passos no desktop */}
        <div
          aria-hidden="true"
          className="absolute left-[16.6%] right-[16.6%] top-9 hidden h-px bg-border md:block"
        />
        {passos.map(({ icon: Icon, n, t, d }) => (
          <div key={n} className="relative text-center">
            <div className="mx-auto flex h-18 w-18 items-center justify-center rounded-full border-2 border-brand-green bg-background">
              <Icon className="h-7 w-7 text-brand-green" />
            </div>
            <h3 className="mt-5 text-base font-bold">
              {n}. {t}
            </h3>
            <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function CTAFinal() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl bg-gradient-hero p-8 text-white md:p-10">
          <h3 className="text-2xl font-bold">Sua frota já tem o Selo Verde SS?</h3>
          <p className="mt-3 text-sm text-white/75">
            Consulte pelo CNPJ e veja os indicadores de impacto que a sua operação já gera hoje.
          </p>
          <a
            href="#topo"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold backdrop-blur transition-colors hover:bg-white/20"
          >
            Consultar meu selo <Search className="h-4 w-4" />
          </a>
        </div>
        <div className="rounded-3xl border border-border bg-card p-8 shadow-card md:p-10">
          <h3 className="text-2xl font-bold">Ainda não faz parte?</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Comece a medir a pegada de carbono da frota com dado real e transforme eficiência
            operacional em vantagem comercial.
          </p>
          <Link
            to="/contato"
            search={{ plano: "Selo Verde SS" }}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-card transition-transform hover:-translate-y-0.5"
          >
            Quero o Selo Verde SS <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
