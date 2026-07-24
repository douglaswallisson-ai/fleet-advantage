import { Globe, Leaf, PiggyBank, Users } from "lucide-react";

/**
 * Os três pilares do ESG em círculos que se cruzam, na paleta da SS:
 * econômico (navy), social (verde) e ambiental (azul-céu). No centro, o
 * ponto em que os três se encontram.
 *
 * Construído em CSS para acompanhar o tamanho do contêiner e manter os
 * rótulos como texto de verdade (legível por leitor de tela e indexável).
 */

const CIRCLES = [
  {
    label: "econômico",
    icon: PiggyBank,
    color: "var(--brand-navy)",
    position: "left-0 top-0",
    labelPos: "left-[16%] top-[26%]",
    iconPos: "left-[12%] top-[41%]",
  },
  {
    label: "social",
    icon: Users,
    color: "var(--brand-green)",
    position: "right-0 top-0",
    labelPos: "right-[13%] top-[52%]",
    iconPos: "right-[12%] top-[27%]",
  },
  {
    label: "ambiental",
    icon: Leaf,
    color: "var(--brand-sky)",
    position: "bottom-0 left-[21%]",
    labelPos: "bottom-[10%] left-[33%]",
    iconPos: "bottom-[27%] left-[19%]",
  },
] as const;

export function EsgVenn({ className }: { className?: string }) {
  return (
    <div
      className={`relative mx-auto aspect-square w-full max-w-[26rem] ${className ?? ""}`}
      role="img"
      aria-label="Os três pilares do ESG: econômico, social e ambiental, com a operação da frota no centro"
    >
      {CIRCLES.map((c) => (
        <div
          key={c.label}
          aria-hidden="true"
          className={`absolute h-[58%] w-[58%] rounded-full ${c.position}`}
          style={{ backgroundColor: c.color, opacity: 0.92 }}
        />
      ))}

      {/* Ícones e rótulos por cima dos discos */}
      {CIRCLES.map(({ label, icon: Icon, labelPos, iconPos }) => (
        <div key={`t-${label}`} aria-hidden="true">
          <Icon className={`absolute h-9 w-9 text-white/95 ${iconPos}`} strokeWidth={1.6} />
          <span
            className={`absolute text-lg font-semibold text-white drop-shadow-sm md:text-xl ${labelPos}`}
          >
            {label}
          </span>
        </div>
      ))}

      {/* Núcleo: onde os três pilares se sobrepõem */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-[45%] flex h-[22%] w-[22%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-elegant"
      >
        <Globe className="h-1/2 w-1/2 text-brand-navy" strokeWidth={1.6} />
      </div>
    </div>
  );
}
