import { Cloud, Droplet, Gauge, Leaf, Recycle, Route, Timer } from "lucide-react";

/**
 * Anel de impacto: a folha no centro e, em volta, os pontos da operação em que
 * a frota reduz emissão. Substitui uma foto de banco de imagens — é gráfico
 * próprio, sem dependência de licença de terceiros.
 */

const ITENS = [
  { icon: Droplet, label: "Combustível" },
  { icon: Route, label: "Rota" },
  { icon: Gauge, label: "Condução" },
  { icon: Cloud, label: "Emissões" },
  { icon: Recycle, label: "Pneus" },
  // A SS certifica REDUÇÃO de emissão, não neutralização — nada de
  // "compensação" aqui, que remeteria a offset de carbono.
  { icon: Timer, label: "Marcha lenta" },
];

/** Distribui os itens em círculo, começando no topo. */
const RAIO = 40;
const posicao = (i: number) => {
  const ang = ((-90 + i * (360 / ITENS.length)) * Math.PI) / 180;
  return {
    left: `${50 + RAIO * Math.cos(ang)}%`,
    top: `${50 + RAIO * Math.sin(ang)}%`,
  };
};

export function EcoRing({ className }: { className?: string }) {
  return (
    <div
      className={`relative mx-auto aspect-square w-full max-w-[26rem] ${className ?? ""}`}
      role="img"
      aria-label="Pontos da operação em que a frota reduz emissões: combustível, rota, condução, emissões, pneus e compensação"
    >
      {/* Anel que conecta os pontos */}
      <div
        aria-hidden="true"
        className="absolute inset-[10%] rounded-full border-2 border-dashed border-brand-sky/35"
      />

      {/* Núcleo com a folha */}
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 flex h-[38%] w-[38%] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-green shadow-elegant"
      >
        <Leaf className="h-1/2 w-1/2 text-white" strokeWidth={1.5} />
      </div>

      {ITENS.map(({ icon: Icon, label }, i) => (
        <div
          key={label}
          aria-hidden="true"
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
          style={posicao(i)}
        >
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-border bg-card shadow-card">
            <Icon className="h-6 w-6 text-primary" strokeWidth={1.6} />
          </span>
          <span className="text-[11px] font-medium text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  );
}
