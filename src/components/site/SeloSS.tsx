import { cn } from "@/lib/utils";

/**
 * Selo Verde SS — distintivo circular da certificação ambiental da frota.
 *
 * O anel de texto gira devagar, na mesma linguagem da marca animada
 * (ver SSOrb). Respeita `prefers-reduced-motion` via .ss-orb-ring em styles.css.
 */

const C = 120;
const TEXT_R = 97;

/** Arco superior: da esquerda para a direita passando por cima (texto legível). */
const TOP_ARC = `M ${C - TEXT_R} ${C} A ${TEXT_R} ${TEXT_R} 0 0 1 ${C + TEXT_R} ${C}`;
/** Arco inferior: da esquerda para a direita passando por baixo. */
const BOTTOM_ARC = `M ${C - TEXT_R} ${C} A ${TEXT_R} ${TEXT_R} 0 0 0 ${C + TEXT_R} ${C}`;

export function SeloSS({
  size = 200,
  still = false,
  className,
}: {
  size?: number;
  /** Desliga a rotação do anel de texto. */
  still?: boolean;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 240 240"
      width={size}
      height={size}
      role="img"
      aria-label="Selo Verde SS — frota certificada"
      className={cn("shrink-0", className)}
    >
      <defs>
        <linearGradient id="selo-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--brand-green)" />
          <stop offset="100%" stopColor="var(--brand-sky)" />
        </linearGradient>
        <linearGradient id="selo-leaf" x1="0" y1="0" x2="0.6" y2="1">
          <stop offset="0%" stopColor="var(--brand-green)" />
          <stop offset="100%" stopColor="var(--brand-sky)" />
        </linearGradient>
        <path id="selo-top" d={TOP_ARC} />
        <path id="selo-bottom" d={BOTTOM_ARC} />
      </defs>

      {/* Disco de fundo + aro externo */}
      <circle cx={C} cy={C} r={118} fill="oklch(0.16 0.04 260)" />
      <circle cx={C} cy={C} r={116} fill="none" stroke="url(#selo-ring)" strokeWidth={3} />
      <circle cx={C} cy={C} r={78} fill="none" stroke="url(#selo-ring)" strokeWidth={2.5} />

      {/* Anel de texto girando */}
      <g className={still ? undefined : "selo-ss-ring"}>
        <text
          fill="url(#selo-ring)"
          fontSize={17}
          fontWeight={700}
          letterSpacing={3.4}
          fontFamily="var(--font-display)"
        >
          <textPath href="#selo-top" startOffset="50%" textAnchor="middle">
            SELO VERDE SS
          </textPath>
        </text>
        <text
          fill="url(#selo-ring)"
          fontSize={13}
          fontWeight={600}
          letterSpacing={3}
          fontFamily="var(--font-display)"
        >
          <textPath href="#selo-bottom" startOffset="50%" textAnchor="middle" dy={11}>
            FROTA CERTIFICADA
          </textPath>
        </text>
      </g>

      {/* Folha com o traço de rota no interior */}
      <g transform={`translate(${C} ${C})`}>
        <path
          d="M 34 -34 C 34 18 12 40 -22 40 C -34 40 -38 30 -38 20 C -38 -18 -8 -34 34 -34 Z"
          fill="url(#selo-leaf)"
          transform="scale(0.86) translate(-4 -2)"
        />
        <path
          d="M 20 -22 C 4 -8 -10 6 -22 22"
          fill="none"
          stroke="oklch(0.16 0.04 260)"
          strokeWidth={5}
          strokeLinecap="round"
          transform="scale(0.86) translate(-4 -2)"
        />
      </g>
    </svg>
  );
}
