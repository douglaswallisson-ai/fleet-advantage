import { Globe, Leaf, PiggyBank, Users } from "lucide-react";

/**
 * Os três pilares do ESG em círculos que se cruzam, na paleta da SS:
 * econômico (navy), social (verde) e ambiental (azul-céu). No centro, o
 * ponto em que os três se encontram.
 *
 * Construído em CSS para acompanhar o tamanho do contêiner e manter os
 * rótulos como texto de verdade (legível por leitor de tela e indexável).
 */

/**
 * Cada rótulo/ícone é ancorado por um PONTO dentro do lobo exclusivo do seu
 * círculo (a parte que não se sobrepõe às outras) e centralizado nele com
 * translate — assim o texto cresce para os dois lados a partir do ponto e nunca
 * vaza pela borda arredondada, que era o defeito do "social".
 */
const CIRCLES = [
  {
    label: "econômico",
    icon: PiggyBank,
    color: "var(--brand-navy)",
    position: "left-0 top-0",
    labelPos: "left-[26%] top-[30%]",
    iconPos: "left-[21%] top-[47%]",
  },
  {
    label: "social",
    icon: Users,
    color: "var(--brand-green)",
    position: "right-0 top-0",
    labelPos: "left-[74%] top-[30%]",
    iconPos: "left-[79%] top-[47%]",
  },
  {
    label: "ambiental",
    icon: Leaf,
    color: "var(--brand-sky)",
    position: "bottom-0 left-[21%]",
    labelPos: "left-[50%] top-[84%]",
    iconPos: "left-[39%] top-[70%]",
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

      {/* Ícones e rótulos por cima dos discos, centrados no ponto de ancoragem */}
      {CIRCLES.map(({ label, icon: Icon, labelPos, iconPos }) => (
        <div key={`t-${label}`} aria-hidden="true">
          <Icon
            className={`absolute h-9 w-9 -translate-x-1/2 -translate-y-1/2 text-white/95 ${iconPos}`}
            strokeWidth={1.6}
          />
          <span
            className={`absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-lg font-semibold text-white drop-shadow-sm md:text-xl ${labelPos}`}
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
