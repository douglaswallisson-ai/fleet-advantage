import { cn } from "@/lib/utils";

/**
 * Selo hexagonal de carbono — inspirado na referência escolhida pela SS.
 * Hexágono com gradiente azul→verde, contorno interno, microtexto circular e
 * o indicador em destaque no centro.
 *
 * Sobre o texto central: a referência trazia "CO₂ NEUTRO". O programa da SS
 * certifica REDUÇÃO de emissões medida por telemetria, não neutralização —
 * declarar neutralidade sem compensação auditada seria afirmação indevida.
 * Por isso o padrão é "CO₂ REDUZIDO"; troque `titulo`/`subtitulo` quando (e se)
 * a SS passar a certificar neutralidade de fato.
 */

const C = 120;

/** Hexágono com vértice no topo e na base. */
const hexPath = (r: number) =>
  [-90, -30, 30, 90, 150, 210]
    .map((deg, i) => {
      const a = (deg * Math.PI) / 180;
      const x = (C + r * Math.cos(a)).toFixed(1);
      const y = (C + r * Math.sin(a)).toFixed(1);
      return `${i === 0 ? "M" : "L"} ${x} ${y}`;
    })
    .join(" ") + " Z";

/**
 * O texto acompanha as ARESTAS do hexágono, não um círculo. Um arco circular
 * sobre um hexágono não encosta nas bordas: as pontas do texto escorregam para
 * as laterais e desalinham. Estas polylines seguem as duas arestas superiores
 * (sobe até o vértice de topo e desce) e as duas inferiores, mantendo o texto
 * paralelo à borda em todo o trajeto.
 */
const TEXT_R = 88;
const vtx = (deg: number) => {
  const a = (deg * Math.PI) / 180;
  return `${(C + TEXT_R * Math.cos(a)).toFixed(1)} ${(C + TEXT_R * Math.sin(a)).toFixed(1)}`;
};
// Esquerda→topo→direita (texto de cima, lido da esquerda para a direita).
const TOP_ARC = `M ${vtx(210)} L ${vtx(-90)} L ${vtx(-30)}`;
// Esquerda→base→direita (texto de baixo, também da esquerda para a direita).
const BOTTOM_ARC = `M ${vtx(150)} L ${vtx(90)} L ${vtx(30)}`;

export function SeloCarbono({
  size = 220,
  titulo = "CO₂",
  subtitulo = "REDUZIDO",
  textoSuperior = "TELEMETRIA VERIFICADA",
  textoInferior = "SELO VERDE SS",
  className,
}: {
  size?: number;
  titulo?: string;
  subtitulo?: string;
  textoSuperior?: string;
  textoInferior?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 240 240"
      width={size}
      height={size}
      role="img"
      aria-label={`${titulo} ${subtitulo} — ${textoInferior}, ${textoSuperior.toLowerCase()}`}
      className={cn("shrink-0", className)}
    >
      <defs>
        <linearGradient id="selo-co2-fill" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="oklch(0.5 0.16 258)" />
          <stop offset="50%" stopColor="oklch(0.66 0.14 210)" />
          <stop offset="100%" stopColor="oklch(0.74 0.18 140)" />
        </linearGradient>
        <path id="selo-co2-top" d={TOP_ARC} />
        <path id="selo-co2-bottom" d={BOTTOM_ARC} />
      </defs>

      <path d={hexPath(115)} fill="url(#selo-co2-fill)" />
      <path
        d={hexPath(101)}
        fill="none"
        stroke="oklch(1 0 0 / 0.55)"
        strokeWidth={1.6}
        strokeLinejoin="round"
      />

      <text
        fill="oklch(1 0 0 / 0.9)"
        fontSize={9}
        fontWeight={600}
        letterSpacing={2.2}
        fontFamily="var(--font-sans)"
      >
        <textPath href="#selo-co2-top" startOffset="50%" textAnchor="middle">
          {textoSuperior}
        </textPath>
      </text>
      <text
        fill="oklch(1 0 0 / 0.9)"
        fontSize={9}
        fontWeight={600}
        letterSpacing={2.2}
        fontFamily="var(--font-sans)"
      >
        <textPath href="#selo-co2-bottom" startOffset="50%" textAnchor="middle">
          {textoInferior}
        </textPath>
      </text>

      <text
        x={C}
        y={112}
        textAnchor="middle"
        fill="oklch(1 0 0)"
        fontSize={54}
        fontWeight={700}
        fontFamily="var(--font-display)"
        letterSpacing={-1}
      >
        {titulo}
      </text>
      <text
        x={C}
        y={142}
        textAnchor="middle"
        fill="oklch(1 0 0)"
        fontSize={25}
        fontWeight={600}
        fontFamily="var(--font-display)"
        letterSpacing={2.4}
      >
        {subtitulo}
      </text>

      <line
        x1={C - 34}
        y1={155}
        x2={C + 34}
        y2={155}
        stroke="oklch(1 0 0 / 0.5)"
        strokeWidth={1.2}
      />

      {/* Folha + confirmação */}
      <g transform={`translate(${C} 176)`} stroke="oklch(1 0 0)" fill="none" strokeWidth={1.6}>
        <circle cx={0} cy={0} r={13} />
        <path d="M -5 0 L -1.5 3.5 L 5.5 -3.5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}
