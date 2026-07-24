import { Bus, Truck, Users } from "lucide-react";
import { GALERIA_PENDENTE } from "@/lib/site-config";
import heroImg from "@/assets/hero-fleet.jpg";
import clubeImg from "@/assets/drivers-club.jpg";
import copilotoImg from "@/assets/driver-copilot.jpg";

/**
 * "A SS na estrada" — veículos de clientes com a marca aplicada.
 *
 * As fotos abaixo são PROVISÓRIAS (ver GALERIA_PENDENTE em site-config.ts):
 * reaproveitam imagens já existentes no projeto para a seção não ficar vazia.
 * Troque o `src` de cada item pelas fotos reais dos veículos adesivados.
 */

const VEICULOS = [
  {
    icon: Truck,
    categoria: "Carretas e rodoviários",
    desc: "Longa distância monitorada ponta a ponta, do pátio ao destino.",
    src: heroImg,
    alt: "Carreta de cliente da SS Telemática em operação rodoviária",
  },
  {
    icon: Bus,
    categoria: "Ônibus urbanos",
    desc: "Linha urbana com controle de jornada, rota e comportamento de condução.",
    src: clubeImg,
    alt: "Ônibus urbano de cliente da SS Telemática",
  },
  {
    icon: Users,
    categoria: "Fretamento",
    desc: "Transporte de colaboradores com rastreio e segurança do passageiro.",
    src: copilotoImg,
    alt: "Veículo de fretamento de cliente da SS Telemática",
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
            De carretas rodoviárias a ônibus urbanos e frotas de fretamento — cada segmento tem a
            sua operação, e a plataforma SS se ajusta a todas.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {VEICULOS.map(({ icon: Icon, categoria, desc, src, alt }) => (
            <article
              key={categoria}
              className="group overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-shadow hover:shadow-elegant"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={src}
                  alt={alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  width={1400}
                  height={1050}
                />
                {GALERIA_PENDENTE && (
                  <span className="absolute left-3 top-3 rounded-full bg-[oklch(0.15_0.03_260)]/75 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white backdrop-blur">
                    FOTO PROVISÓRIA
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[oklch(0.15_0.03_260)]/85 to-transparent p-5">
                  <div className="flex items-center gap-2 text-white">
                    <Icon className="h-5 w-5 shrink-0 text-brand-green" />
                    <h3 className="text-lg font-bold">{categoria}</h3>
                  </div>
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
