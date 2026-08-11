import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import {
  CheckboxGroup,
  ConsentCheckbox,
  Field,
  FormFeedback,
  Honeypot,
  Select,
  SubmitButton,
  TextArea,
  useLeadForm,
} from "@/components/site/lead-form";
import { pageHead } from "@/lib/site-config";
import heroImg from "@/assets/hero-fleet.webp";

export const Route = createFileRoute("/latbus-2026")({
  component: LatBus2026,
  head: () =>
    pageHead({
      path: "/latbus-2026",
      title: "Cadastro Lat.Bus 2026 — SS Telemática",
      description: "Deixe seus dados no stand da SS Telemática na Lat.Bus 2026.",
      noindex: true,
    }),
});

function LatBus2026() {
  const { status, fieldErrors, message, onSubmit } = useLeadForm("evento");

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <section className="relative overflow-hidden bg-gradient-hero text-white">
          <div className="mx-auto grid max-w-5xl items-center gap-10 px-6 py-16 md:grid-cols-2">
            <div className="text-center md:text-left">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-widest backdrop-blur">
                LAT.BUS 2026
              </span>
              <h1 className="mt-5 text-3xl font-bold leading-tight md:text-4xl">
                Cadastre-se com a <span className="text-gradient">SS</span>
              </h1>
              <p className="mx-auto mt-4 max-w-md text-white/80 md:mx-0">
                Preencha as informações para garantir o direcionamento e o acompanhamento adequado
                de cada contato.
              </p>
            </div>
            <div className="overflow-hidden rounded-3xl shadow-elegant">
              <img
                src={heroImg}
                alt="Frota monitorada pela telemetria da SS Telemática"
                loading="eager"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-2xl px-6 py-16">
          <form onSubmit={onSubmit} className="space-y-5">
            <input type="hidden" name="evento" value="Lat.Bus 2026" />
            <Honeypot />

            <Field label="Nome" name="nome" autoComplete="name" error={fieldErrors.nome} />
            <Field label="Empresa" name="empresa" error={fieldErrors.empresa} />
            <div className="grid gap-5 sm:grid-cols-2">
              <Field
                label="E-mail"
                name="email"
                type="email"
                autoComplete="email"
                error={fieldErrors.email}
              />
              <Field
                label="Telefone"
                name="telefone"
                type="tel"
                autoComplete="tel"
                error={fieldErrors.telefone}
              />
            </div>

            <Select
              label="Cargo"
              name="cargo"
              required={false}
              options={["Proprietário", "C-level / Diretor", "Coordenador(a)", "Analista", "Outro"]}
            />

            <CheckboxGroup
              label="Portfólio SS"
              namePrefix="portfolio"
              options={["Telemetria", "Videotelemetria"]}
            />

            <Select
              label="Responsável SS"
              name="responsavelSS"
              required={false}
              options={["Cleicimar", "Pedro", "Hortência"]}
            />

            <TextArea label="Observação" name="observacao" rows={3} />

            <ConsentCheckbox error={fieldErrors.consentimento} />

            <SubmitButton status={status}>Cadastrar</SubmitButton>
            <FormFeedback
              status={status}
              message={message}
              successTitle="Cadastro recebido!"
              successBody="Obrigado — nosso time vai dar continuidade ao contato."
            />
          </form>
        </section>
      </main>
      <Footer />
    </div>
  );
}
