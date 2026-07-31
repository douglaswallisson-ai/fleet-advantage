import { Bus, Truck, Users } from "lucide-react";
import { IMAGENS, IMAGENS_PROVISORIAS } from "@/lib/site-config";

/**
 * "A SS na estrada" — os segmentos atendidos pela plataforma.
 *
 * As fotos são PROVISÓRIAS (ver IMAGENS_PROVISORIAS em site-config.ts): são
 * ilustrações de segmento vindas de banco de imagens livre, NÃO são veículos de
 * clientes da SS nem trazem os adesivos da marca. Trocar pelas fotos reais
 * antes de publicar.
 *
 * `objectPosition` existe porque as fotos têm enquadramentos diferentes; ele
 * mantém o veículo visível dentro do recorte 4:3 do card.
 */

// Passageiros primeiro (foco atual da SS); carga fecha a lista.
const VEICULOS = [
  {
    icon: Bus,
    categoria: "Ônibus urbanos",
    desc: "Linha urbana com controle de jornada, rota e comportamento de condução.",
    src: IMAGENS.frotaOnibus,
    objectPosition: "28% 72%",
    alt: "Ônibus urbano em via de cidade",
  },
  {
    icon: Users,
    categoria: "Fretamento",
    desc: "Transporte de colaboradores e passageiros com rastreio e segurança a bordo.",
    src: IMAGENS.frotaFretamento,
    objectPosition: "50% 50%",
    alt: "Ônibus de fretamento estacionado",
  },
  {
    icon: Truck,
    categoria: "Cargas e rodoviários",
    desc: "Longa distância monitorada ponta a ponta, do pátio ao destino.",
    src: IMAGENS.frotaCarreta,
    objectPosition: "50% 55%",
    alt: "Carreta em operação rodoviária",
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
          {VEICULOS.map(({ icon: Icon, categoria, desc, src, alt, objectPosition }) => (
            <article
              key={categoria}
              className="group overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-shadow hover:shadow-elegant"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                <img
                  src={src}
                  alt={alt}
                  loading="lazy"
                  style={{ objectPosition }}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  width={1400}
                  height={1050}
                />
                {IMAGENS_PROVISORIAS && (
                  <span className="absolute left-3 top-3 rounded-full bg-[oklch(0.15_0.03_260)]/80 px-2.5 py-1 text-[10px] font-semibold tracking-wide text-white backdrop-blur">
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
