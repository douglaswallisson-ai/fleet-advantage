import { useState } from "react";
import { Wallet } from "lucide-react";

/** Recompensa por veículo ativado da frota indicada. Pagamento único. */
export const VALOR_POR_VEICULO = 30;

function formatBRL(v: number) {
  return v.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  });
}

/**
 * Calculadora do programa de indicação: R$ 30 por veículo ativado da frota
 * indicada, pagos uma única vez.
 *
 * O modelo anterior era 3% sobre 12 meses de contrato, o que dependia de
 * estimar ticket médio para mostrar qualquer número. Agora a conta é direta —
 * frota × R$ 30 — e o indicador consegue fazer de cabeça.
 */
export function ReferralCalculator({ compact = false }: { compact?: boolean }) {
  const [veiculos, setVeiculos] = useState(20);
  const recompensa = veiculos * VALOR_POR_VEICULO;

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
          <div className="text-xs text-muted-foreground">
            {formatBRL(VALOR_POR_VEICULO)} por veículo ativado
          </div>
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

      <div className="mt-6 border-t border-border pt-6">
        <div className="text-xs text-muted-foreground">Sua recompensa</div>
        <div className="mt-1 text-4xl font-bold text-brand-green">{formatBRL(recompensa)}</div>
        <div className="mt-1.5 text-xs text-muted-foreground">
          {veiculos} veículo{veiculos === 1 ? "" : "s"} × {formatBRL(VALOR_POR_VEICULO)}
        </div>
      </div>

      <p className="mt-4 text-xs text-muted-foreground">
        Pagamento único, feito após a assinatura do contrato e a ativação efetiva dos veículos. O
        valor final acompanha a quantidade de veículos realmente ativados.
      </p>
    </div>
  );
}
