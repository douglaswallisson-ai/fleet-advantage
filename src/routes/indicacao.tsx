import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Gift, Share2, Wallet, ArrowRight, Check } from "lucide-react";
import referralImg from "@/assets/referral.jpg";

export const Route = createFileRoute("/indicacao")({
  component: Indicacao,
  head: () => ({
    meta: [
      { title: "Programa de Indicação — SS Telemática" },
      { name: "description", content: "Indique a SS e ganhe. Até R$ 500 por veículo ativado + 3 meses de mensalidade grátis. O programa de indicação mais generoso do setor de telemetria." },
      { property: "og:title", content: "Programa de Indicação SS" },
      { property: "og:description", content: "Recompensa real para quem confia na SS: dinheiro na conta e mensalidade grátis." },
      { property: "og:url", content: "/indicacao" },
    ],
    links: [{ rel: "canonical", href: "/indicacao" }],
  }),
});

function Indicacao() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <section className="relative overflow-hidden bg-gradient-hero py-24 text-white">
        <div className="absolute inset-0 opacity-25">
          <img src={referralImg} alt="" className="h-full w-full object-cover" width={1400} height={900} />
          <div className="absolute inset-0 bg-gradient-hero opacity-80" />
        </div>
        <div className="relative mx-auto max-w-6xl px-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-widest backdrop-blur">
            <Gift className="h-3.5 w-3.5 text-brand-green" /> PROGRAMA DE INDICAÇÃO SS
          </span>
          <h1 className="mt-6 max-w-3xl text-5xl font-bold leading-[1.05] md:text-6xl">
            Indique a SS e ganhe até <span className="text-brand-green">R$ 500</span> por veículo ativado.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/80">
            O programa de indicação mais generoso do setor. Sua rede confia em você —
            transforme essa confiança em receita recorrente para o seu bolso e economia para a frota do amigo.
          </p>
          <a href="#formulario" className="mt-10 inline-flex items-center gap-2 rounded-full bg-brand-green px-7 py-4 text-sm font-semibold text-[oklch(0.15_0.03_260)] shadow-glow hover:-translate-y-0.5 transition-transform">
            Indicar agora <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <h2 className="text-center text-4xl font-bold">Como funciona</h2>
        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {[
            { icon: Share2, s: "01", t: "Indique", d: "Envie o contato de um gestor de frota pelo formulário abaixo. Leva 30 segundos." },
            { icon: Check, s: "02", t: "A SS conversa", d: "Nosso time faz a demonstração e apresenta a proposta. Você acompanha em tempo real." },
            { icon: Wallet, s: "03", t: "Você recebe", d: "Contrato assinado? R$ 100 a R$ 500 por veículo ativado — direto no PIX." },
          ].map(({ icon: Icon, s, t, d }) => (
            <div key={s} className="relative rounded-3xl border border-border bg-card p-8 shadow-card">
              <div className="text-6xl font-bold text-brand-sky/20">{s}</div>
              <div className="mt-2 flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-hero text-white">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-bold">{t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/40 py-24">
        <div className="mx-auto max-w-5xl px-6">
          <h2 className="text-center text-4xl font-bold">Quanto você ganha</h2>
          <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">Escala pelo tamanho da frota indicada. Sem teto — indique quantas empresas quiser.</p>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {[
              { size: "Até 30 veículos", value: "R$ 100", per: "por veículo ativado", bonus: "+ 1 mês de mensalidade grátis para o indicado" },
              { size: "31 a 100 veículos", value: "R$ 250", per: "por veículo ativado", bonus: "+ 2 meses de mensalidade grátis + kit SS" },
              { size: "100+ veículos", value: "R$ 500", per: "por veículo ativado", bonus: "+ 3 meses grátis + comissão recorrente" },
            ].map((p, i) => (
              <div key={p.size} className={`rounded-3xl border p-8 shadow-card ${i === 1 ? "border-brand-sky ring-2 ring-brand-sky/40 bg-card" : "border-border bg-card"}`}>
                <div className="text-sm font-semibold text-muted-foreground">{p.size}</div>
                <div className="mt-4 text-5xl font-bold text-primary">{p.value}</div>
                <div className="mt-1 text-xs text-muted-foreground">{p.per}</div>
                <div className="mt-6 rounded-xl bg-brand-green/10 px-4 py-3 text-xs text-[oklch(0.3_0.12_138)]">
                  {p.bonus}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="formulario" className="mx-auto max-w-3xl px-6 py-24">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-elegant md:p-12">
          <h2 className="text-3xl font-bold md:text-4xl">Envie sua indicação</h2>
          <p className="mt-2 text-sm text-muted-foreground">Preenchemos os detalhes com o indicado. Você não precisa fazer a apresentação.</p>
          <form className="mt-8 grid gap-5">
            {[
              { l: "Seu nome", t: "text" },
              { l: "Seu e-mail", t: "email" },
              { l: "Seu WhatsApp / PIX", t: "tel" },
              { l: "Nome da empresa indicada", t: "text" },
              { l: "Contato na empresa indicada", t: "text" },
            ].map((f) => (
              <label key={f.l} className="block">
                <span className="text-xs font-semibold tracking-wide text-muted-foreground">{f.l.toUpperCase()}</span>
                <input type={f.t} className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-brand-sky focus:ring-2 focus:ring-brand-sky/30" />
              </label>
            ))}
            <label className="block">
              <span className="text-xs font-semibold tracking-wide text-muted-foreground">TAMANHO ESTIMADO DA FROTA</span>
              <select className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm">
                <option>Até 30 veículos</option>
                <option>31 a 100 veículos</option>
                <option>Mais de 100 veículos</option>
              </select>
            </label>
            <button type="submit" className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-card hover:-translate-y-0.5 transition-transform">
              Enviar indicação <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
}
