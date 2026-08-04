import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Mail, MessageCircle, Phone, Clock } from "lucide-react";
import { z } from "zod";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SSOrb } from "@/components/site/SSOrb";
import {
  ConsentCheckbox,
  Field,
  FleetSizeSelect,
  FormFeedback,
  Honeypot,
  SubmitButton,
  TextArea,
  useLeadForm,
} from "@/components/site/lead-form";
import { CONTACT, localBusinessJsonLd, pageHead, whatsappLink } from "@/lib/site-config";

const searchSchema = z.object({
  plano: z.string().optional(),
});

export const Route = createFileRoute("/contato")({
  component: Contato,
  validateSearch: searchSchema,
  head: () => ({
    ...pageHead({
      path: "/contato",
      title: "Fale com um especialista — SS Telemática",
      description:
        "Agende uma demonstração de 20 minutos da plataforma SS. Nosso time mostra onde estão as próximas decisões de maior impacto na sua frota.",
      ogTitle: "Fale com a SS Telemática",
      ogDescription:
        "Demonstração de 20 minutos, sem compromisso. Traga sua frota e veja a IA da SS em ação.",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(localBusinessJsonLd()),
      },
    ],
  }),
});

function Contato() {
  const { plano } = Route.useSearch();
  const { status, fieldErrors, message, onSubmit } = useLeadForm("contato");
  const wpp = whatsappLink("Olá! Gostaria de falar com um especialista da SS Telemática.");

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <section className="relative overflow-hidden bg-gradient-hero py-20 text-white">
          <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 md:flex-row md:items-center md:justify-between">
            <div>
              <span className="text-xs font-bold tracking-widest text-brand-green">CONTATO</span>
              <h1 className="mt-4 max-w-2xl text-4xl font-bold leading-tight md:text-5xl">
                20 minutos para ver onde sua frota está perdendo dinheiro.
              </h1>
              <p className="mt-5 max-w-xl text-lg text-white/75">
                Sem apresentação genérica. Nosso time entra na sua operação, roda a IA da SS sobre o
                seu cenário e mostra as próximas decisões de maior impacto.
              </p>
            </div>
            <SSOrb size={140} halo className="hidden shrink-0 text-brand-green md:block" />
          </div>
        </section>

        <section className="mx-auto grid max-w-6xl gap-12 px-6 py-20 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-elegant md:p-10">
            <h2 className="text-2xl font-bold md:text-3xl">Agende sua demonstração</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Respondemos em até 1 dia útil.
              {plano && (
                <>
                  {" "}
                  Interesse registrado: <strong className="text-foreground">{plano}</strong>.
                </>
              )}
            </p>

            <form className="relative mt-8 grid gap-5" onSubmit={onSubmit}>
              <Honeypot />
              {plano && <input type="hidden" name="plano" value={plano} />}

              <Field label="Seu nome" name="nome" autoComplete="name" error={fieldErrors.nome} />
              <Field
                label="E-mail corporativo"
                name="email"
                type="email"
                autoComplete="email"
                error={fieldErrors.email}
              />
              <Field
                label="Telefone / WhatsApp"
                name="telefone"
                type="tel"
                autoComplete="tel"
                error={fieldErrors.telefone}
              />
              <Field
                label="Empresa"
                name="empresa"
                autoComplete="organization"
                error={fieldErrors.empresa}
              />
              <FleetSizeSelect />
              <TextArea
                label="Como podemos ajudar? (opcional)"
                name="mensagem"
                error={fieldErrors.mensagem}
              />
              <ConsentCheckbox error={fieldErrors.consentimento} />
              <FormFeedback
                status={status}
                message={message}
                successTitle="Recebemos seu contato."
                successBody="Nosso time comercial responde em até 1 dia útil."
              />
              <SubmitButton status={status} idleIcon={<ArrowRight className="h-4 w-4" />}>
                Agendar demonstração
              </SubmitButton>
            </form>
          </div>

          <div className="space-y-4">
            <ContactCard
              icon={Mail}
              label="E-mail comercial"
              value={CONTACT.email}
              href={`mailto:${CONTACT.email}`}
            />
            {wpp && (
              <ContactCard
                icon={MessageCircle}
                label="WhatsApp"
                value="Falar agora com o time"
                href={wpp}
              />
            )}
            {CONTACT.phone && (
              <ContactCard
                icon={Phone}
                label="Telefone"
                value={CONTACT.phone}
                href={`tel:${CONTACT.phone.replace(/\D/g, "")}`}
              />
            )}
            <ContactCard icon={Clock} label="Suporte" value={CONTACT.supportHours} />

            <div className="rounded-2xl border border-border bg-secondary/40 p-6">
              <h3 className="text-sm font-bold">O que acontece depois do envio</h3>
              <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
                <li className="flex gap-3">
                  <span className="font-bold text-brand-sky">01</span>
                  Um especialista entra em contato para entender sua operação.
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-brand-sky">02</span>
                  Demonstração de 20 minutos com dados do seu segmento.
                </li>
                <li className="flex gap-3">
                  <span className="font-bold text-brand-sky">03</span>
                  Proposta com o plano e o retorno estimado para a sua frota.
                </li>
              </ol>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function ContactCard({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Mail;
  label: string;
  value: string;
  href?: string;
}) {
  const inner = (
    <>
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-hero text-white">
        <Icon className="h-5 w-5" />
      </div>
      <div className="min-w-0">
        <div className="text-xs font-semibold tracking-wide text-muted-foreground">
          {label.toUpperCase()}
        </div>
        <div className="mt-0.5 truncate text-sm font-semibold">{value}</div>
      </div>
    </>
  );

  const className =
    "flex items-center gap-4 rounded-2xl border border-border bg-card p-5 shadow-card transition-colors hover:bg-secondary/50";

  return href ? (
    <a
      href={href}
      className={className}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noreferrer"
    >
      {inner}
    </a>
  ) : (
    <div className={className}>{inner}</div>
  );
}
