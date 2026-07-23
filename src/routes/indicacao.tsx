import { createFileRoute } from "@tanstack/react-router";
import { Gift, Share2, Wallet, ArrowRight, Check, FileText } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import {
  ConsentCheckbox,
  Field,
  FleetSizeSelect,
  FormFeedback,
  Honeypot,
  SubmitButton,
  useLeadForm,
} from "@/components/site/lead-form";
import { Backdrop } from "@/components/site/Backdrop";
import { CONTACT, MEDIA, pageHead } from "@/lib/site-config";
import referralImg from "@/assets/referral.jpg";

export const Route = createFileRoute("/indicacao")({
  component: Indicacao,
  head: () =>
    pageHead({
      path: "/indicacao",
      title: "Programa de Indicação — SS Telemática",
      description:
        "Indique a SS e ganhe. Até R$ 500 por veículo ativado + meses de mensalidade grátis para o indicado. Veja as regras do programa.",
      ogTitle: "Programa de Indicação SS",
      ogDescription:
        "Recompensa real para quem confia na SS: dinheiro na conta e mensalidade grátis para o indicado.",
    }),
});

function Indicacao() {
  const { status, fieldErrors, message, onSubmit } = useLeadForm("indicacao");

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <section className="relative overflow-hidden bg-gradient-hero py-24 text-white">
          <div className="absolute inset-0 opacity-25">
            <Backdrop image={referralImg} video={MEDIA.indicacaoVideo} />
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
            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#formulario" className="inline-flex items-center gap-2 rounded-full bg-brand-green px-7 py-4 text-sm font-semibold text-[oklch(0.15_0.03_260)] shadow-glow transition-transform hover:-translate-y-0.5">
                Indicar agora <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#regulamento" className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-4 text-sm font-semibold backdrop-blur hover:bg-white/10">
                <FileText className="h-4 w-4" /> Ver o regulamento
              </a>
            </div>
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
            <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground">
              Escala pelo tamanho da frota indicada. Sem teto — indique quantas empresas quiser.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {[
                { size: "Até 30 veículos", value: "R$ 100", per: "por veículo ativado", bonus: "+ 1 mês de mensalidade grátis para o indicado" },
                { size: "31 a 100 veículos", value: "R$ 250", per: "por veículo ativado", bonus: "+ 2 meses de mensalidade grátis + kit SS" },
                { size: "100+ veículos", value: "R$ 500", per: "por veículo ativado", bonus: "+ 3 meses grátis + comissão recorrente" },
              ].map((p, i) => (
                <div key={p.size} className={`rounded-3xl border bg-card p-8 shadow-card ${i === 1 ? "border-brand-sky ring-2 ring-brand-sky/40" : "border-border"}`}>
                  <div className="text-sm font-semibold text-muted-foreground">{p.size}</div>
                  <div className="mt-4 text-5xl font-bold text-primary">{p.value}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{p.per}</div>
                  <div className="mt-6 rounded-xl bg-brand-green/10 px-4 py-3 text-xs text-[oklch(0.3_0.12_138)]">
                    {p.bonus}
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-8 text-center text-xs text-muted-foreground">
              Valores válidos para contratos assinados e veículos efetivamente ativados.{" "}
              <a href="#regulamento" className="underline hover:text-primary">
                Consulte o regulamento
              </a>
              .
            </p>
          </div>
        </section>

        <section id="formulario" className="mx-auto max-w-3xl scroll-mt-24 px-6 py-24">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-elegant md:p-12">
            <h2 className="text-3xl font-bold md:text-4xl">Envie sua indicação</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Nós cuidamos da apresentação com o indicado. Você não precisa vender nada.
            </p>
            <form className="relative mt-8 grid gap-5" onSubmit={onSubmit}>
              <Honeypot />
              <Field label="Seu nome" name="nome" autoComplete="name" error={fieldErrors.nome} />
              <Field
                label="Seu e-mail"
                name="email"
                type="email"
                autoComplete="email"
                error={fieldErrors.email}
              />
              <Field
                label="Seu WhatsApp"
                name="telefone"
                type="tel"
                autoComplete="tel"
                error={fieldErrors.telefone}
                placeholder="(00) 00000-0000"
              />
              <Field
                label="Nome da empresa indicada"
                name="empresaIndicada"
                error={fieldErrors.empresaIndicada}
              />
              <Field
                label="Contato na empresa indicada"
                name="contatoIndicado"
                error={fieldErrors.contatoIndicado}
                placeholder="Nome e telefone ou e-mail"
              />
              <FleetSizeSelect />
              <ConsentCheckbox error={fieldErrors.consentimento} />
              <p className="text-xs text-muted-foreground">
                A chave PIX para pagamento é solicitada só depois da ativação do contrato —
                nunca peça nem envie dados bancários por este formulário.
              </p>
              <FormFeedback
                status={status}
                message={message}
                successTitle="Indicação enviada!"
                successBody="Nosso time entra em contato com o indicado e te mantém informado por e-mail."
              />
              <SubmitButton status={status} idleIcon={<ArrowRight className="h-4 w-4" />}>
                Enviar indicação
              </SubmitButton>
            </form>
          </div>
        </section>

        <section id="regulamento" className="mx-auto max-w-3xl scroll-mt-24 px-6 pb-24">
          <h2 className="text-2xl font-bold md:text-3xl">Regulamento do programa</h2>
          <ol className="mt-6 space-y-4 text-sm leading-relaxed text-muted-foreground">
            <li>
              <strong className="text-foreground">1. Quem pode participar.</strong> Pessoas
              físicas ou jurídicas maiores de 18 anos. Colaboradores da SS Telemática e de suas
              controladas não são elegíveis à recompensa.
            </li>
            <li>
              <strong className="text-foreground">2. Validade da indicação.</strong> A empresa
              indicada não pode ter negociação em andamento com a SS nos 90 dias anteriores à
              indicação. Vale a primeira indicação registrada para cada empresa.
            </li>
            <li>
              <strong className="text-foreground">3. Quando a recompensa é devida.</strong> Após
              a assinatura do contrato pela empresa indicada e a ativação efetiva dos veículos,
              considerando a faixa de frota contratada.
            </li>
            <li>
              <strong className="text-foreground">4. Pagamento.</strong> Via PIX, em até 30 dias
              corridos após a ativação, mediante confirmação dos dados do indicador. A chave PIX
              é solicitada em canal próprio — nunca por este formulário.
            </li>
            <li>
              <strong className="text-foreground">5. Cancelamento.</strong> Contratos cancelados
              ou veículos desativados dentro de 90 dias da ativação podem gerar estorno
              proporcional da recompensa.
            </li>
            <li>
              <strong className="text-foreground">6. Tributos.</strong> Os valores recebidos podem
              estar sujeitos a tributação conforme a legislação aplicável ao indicador.
            </li>
            <li>
              <strong className="text-foreground">7. Alterações.</strong> A SS pode alterar ou
              encerrar o programa a qualquer momento, preservando as indicações já registradas.
            </li>
          </ol>
          <p className="mt-8 rounded-xl border border-border bg-secondary/40 p-4 text-xs text-muted-foreground">
            Dúvidas sobre o programa:{" "}
            <a href={`mailto:${CONTACT.email}`} className="underline hover:text-primary">
              {CONTACT.email}
            </a>
            .{" "}
            <strong className="text-foreground">Antes de publicar:</strong> submeta este
            regulamento à validação jurídica da SS e ajuste prazos e condições ao contrato real.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
