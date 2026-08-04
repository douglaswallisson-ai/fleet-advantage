import { cn } from "@/lib/utils";

/**
 * Marca SS animada: a esfera "SS" fica parada e o anel segmentado
 * (arco azul + 3 traços verdes, como no logo) gira em volta dela.
 *
 * A esfera é o recorte fiel do logo oficial (`/ss-orb.png`); o anel é
 * reconstruído em SVG para poder girar de forma independente.
 * Respeita `prefers-reduced-motion` (ver src/styles.css).
 */

const CX = 100;
const CY = 100;
const RING_R = 86;

const polar = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)] as const;
};

/** Arco no sentido horário, de `start` até `end` (graus, 0° = 3h). */
const arc = (r: number, start: number, end: number) => {
  const [x1, y1] = polar(r, start);
  const [x2, y2] = polar(r, end);
  const largeArc = Math.abs(end - start) % 360 > 180 ? 1 : 0;
  return `M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 ${largeArc} 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`;
};

/**
 * O arco azul é quebrado em dois trechos de tamanhos diferentes. Um arco único
 * de 240° é quase simétrico e, girando, parece parado — só os traços verdes
 * davam a sensação de movimento. Com a assimetria, o azul gira visivelmente.
 */
const BLUE_SEGMENTS: Array<[number, number]> = [
  [58, 200],
  [216, 302],
];

/** Traços verdes que preenchem a abertura do anel, à direita. */
const GREEN_SEGMENTS: Array<[number, number]> = [
  [308, 326],
  [346, 374],
  [34, 52],
];

export type SSOrbProps = {
  /** Lado do quadrado, em px. */
  size?: number;
  /** Anel externo pontilhado girando ao contrário — só no hero. */
  halo?: boolean;
  /** Desliga a animação (útil em contextos estáticos). */
  still?: boolean;
  className?: string;
};

export function SSOrb({ size = 96, halo = false, still = false, className }: SSOrbProps) {
  return (
    <div
      className={cn("relative shrink-0", className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full overflow-visible">
        <defs>
          {/*
            `userSpaceOnUse` faz os arcos compartilharem UM gradiente que cobre o
            anel inteiro. No padrão (objectBoundingBox) cada arco recebia a faixa
            completa dentro da própria caixa, e o trecho curto saía todo escuro.

            Os tons também não descem abaixo de ~0.55 de luminosidade: mais
            escuro que isso, o azul se confunde com o navy do fundo e some — daí
            a impressão de que só o verde girava.
          */}
          <linearGradient
            id="ss-orb-ring-grad"
            gradientUnits="userSpaceOnUse"
            x1="18"
            y1="18"
            x2="182"
            y2="182"
          >
            <stop offset="0%" stopColor="oklch(0.74 0.13 228)" />
            <stop offset="50%" stopColor="oklch(0.58 0.17 255)" />
            <stop offset="100%" stopColor="oklch(0.7 0.14 240)" />
          </linearGradient>
        </defs>

        {halo && (
          <g className={still ? undefined : "ss-orb-halo"}>
            <circle
              cx={CX}
              cy={CY}
              r={97}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeDasharray="2 14"
              strokeLinecap="round"
              className="opacity-40"
            />
          </g>
        )}

        <g className={still ? undefined : "ss-orb-ring"}>
          {BLUE_SEGMENTS.map(([from, to]) => (
            <path
              key={from}
              d={arc(RING_R, from, to)}
              fill="none"
              stroke="url(#ss-orb-ring-grad)"
              strokeWidth={13}
              strokeLinecap="round"
            />
          ))}
          {GREEN_SEGMENTS.map(([from, to]) => (
            <path
              key={from}
              d={arc(RING_R, from, to)}
              fill="none"
              stroke="var(--brand-green)"
              strokeWidth={13}
              strokeLinecap="round"
            />
          ))}
        </g>
      </svg>

      <img
        src="/ss-orb.png"
        alt=""
        role="presentation"
        width={256}
        height={256}
        decoding="async"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{ width: "62%", height: "62%" }}
      />
    </div>
  );
}
