import { Bus, Truck, Users } from "lucide-react";
import { Carrossel } from "@/components/site/Carrossel";
import { FOTOS } from "@/lib/site-config";

/**
 * "A SS na estrada" — os segmentos atendidos pela plataforma, com as fotos
 * oficiais da SS. Cada segmento é um carrossel (foto principal + secundárias),
 * vindo de `public/imagens-ss/` via FOTOS em site-config.
 */

// Passageiros primeiro (foco atual da SS); carga fecha a lista.
const VEICULOS = [
  {
    icon: Bus,
    categoria: "Ônibus urbanos",
    desc: "Linha urbana com controle de jornada, rota e comportamento de condução.",
    imagens: FOTOS.urbano,
    alt: "Ônibus urbano da SS Telemática",
  },
  {
    icon: Users,
    categoria: "Fretamento",
    desc: "Transporte de colaboradores e passageiros com rastreio e segurança a bordo.",
    imagens: FOTOS.fretamento,
    alt: "Ônibus de fretamento da SS Telemática",
  },
  {
    icon: Truck,
    categoria: "Cargas e rodoviários",
    desc: "Longa distância monitorada ponta a ponta, do pátio ao destino.",
    imagens: FOTOS.carga,
    alt: "Caminhão de carga da SS Telemática",
  },
];

export function GaleriaFrota() {
  return (
    <section className="bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-14 max-w-2xl">
          <span className="text-xs font-bold tracking-widest text-brand-sky">A SS NA ESTRADA</span>
          <h2 className="mt-3 text-4xl font-bold md:text-5xl">
            Nossa tecnologia anda com quem move o Brasil.
          </h2>
          <p className="mt-4 text-muted-foreground">
            De ônibus urbanos e fretamento ao transporte rodoviário de cargas — cada segmento tem a
            sua operação, e a plataforma SS se ajusta a todas.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {VEICULOS.map(({ icon: Icon, categoria, desc, imagens, alt }) => (
            <article
              key={categoria}
              className="group overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-shadow hover:shadow-elegant"
            >
              <div className="relative bg-secondary">
                <Carrossel imagens={imagens} alt={alt} aspect="aspect-[4/3]" fit="contain" />
                <div className="pointer-events-none absolute left-4 top-4 z-10 inline-flex items-center gap-2 rounded-full bg-[oklch(0.15_0.03_260)]/70 px-3 py-1.5 text-white backdrop-blur">
                  <Icon className="h-4 w-4 shrink-0 text-brand-green" />
                  <h3 className="text-sm font-bold">{categoria}</h3>
                </div>
              </div>
              <p className="p-6 text-sm leading-relaxed text-muted-foreground">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
