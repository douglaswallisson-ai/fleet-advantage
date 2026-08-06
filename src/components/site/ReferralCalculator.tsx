import { useMemo, useState } from "react";
import { Wallet } from "lucide-react";

const REWARD_PCT = 0.03;
/** Ticket médio mensal por veículo usado apenas para estimar a simulação. */
const VALOR_MEDIO_POR_VEICULO = 120;

function formatBRL(v: number) {
  return v.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

/**
 * Calculadora do programa de indicação: 3% sobre o valor de 12 meses do
 * contrato fechado pelo indicado, estimado a partir do número de veículos da
 * frota indicada (ticket médio de R$ 120/veículo/mês).
 */
export function ReferralCalculator({ compact = false }: { compact?: boolean }) {
  const [veiculos, setVeiculos] = useState(20);

  const { mensal, total12, reward } = useMemo(() => {
    const mensal = veiculos * VALOR_MEDIO_POR_VEICULO;
    const total12 = mensal * 12;
    return { mensal, total12, reward: total12 * REWARD_PCT };
  }, [veiculos]);

  return (
    <div
      className={`rounded-3xl border border-border bg-card shadow-card ${compact ? "p-6" : "p-8 md:p-10"}`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-hero text-white">
          <Wallet className="h-5 w-5" />
        </div>
        <div>
          <div className="text-sm font-bold">Simule sua indicação</div>
          <div className="text-xs text-muted-foreground">3% sobre 12 meses de contrato</div>
        </div>
      </div>

      <div className="mt-6">
        <label htmlFor="veiculos" className="text-xs font-semibold text-muted-foreground">
          Número de veículos da frota que você vai indicar
        </label>
        <div className="mt-2 flex items-center gap-4">
          <input
            id="veiculos"
            type="range"
            min={1}
            max={500}
            step={1}
            value={veiculos}
            onChange={(e) => setVeiculos(Number(e.target.value))}
            className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-secondary accent-primary"
          />
          <input
            type="number"
            min={1}
            value={veiculos}
            onChange={(e) => setVeiculos(Math.max(1, Number(e.target.value) || 1))}
            className="w-24 rounded-lg border border-border bg-background px-3 py-2 text-sm font-semibold"
            aria-label="Número de veículos"
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 border-t border-border pt-6">
        <div>
          <div className="text-xs text-muted-foreground">Valor do contrato em 12 meses</div>
          <div className="mt-1 text-xl font-bold">{formatBRL(total12)}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Sua recompensa (3%)</div>
          <div className="mt-1 text-xl font-bold text-brand-green">{formatBRL(reward)}</div>
        </div>
      </div>
      <p className="mt-4 text-xs text-muted-foreground">
        Estimativa com ticket médio de {formatBRL(VALOR_MEDIO_POR_VEICULO)}/veículo/mês (
        {formatBRL(mensal)}/mês para {veiculos} veículo{veiculos === 1 ? "" : "s"}). O valor final
        depende do contrato efetivamente assinado e ativado pela empresa indicada.
      </p>
    </div>
  );
}
