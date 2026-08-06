import { ShieldCheck, TrendingUp } from "lucide-react";

/**
 * Protótipo: claims de ROI/payback ainda sem metodologia formal por trás.
 * Antes de ir para o site em produção, substituir a nota de rodapé por texto
 * validado (prazo real, condições, o que conta como "payback") e confirmar
 * juridicamente o uso da palavra "garantido".
 */
export function RoiTrustBar() {
  return (
    <div className="border-b border-border bg-secondary/40 py-4">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-3 px-6 text-center sm:flex-row sm:justify-center sm:gap-8">
        <span className="inline-flex items-center gap-2 text-sm font-semibold">
          <ShieldCheck className="h-4 w-4 text-brand-green" /> ROI garantido
        </span>
        <span className="inline-flex items-center gap-2 text-sm font-semibold">
          <TrendingUp className="h-4 w-4 text-brand-green" /> Payback em menos de 6 meses*
        </span>
      </div>
      <p className="mx-auto mt-2 max-w-2xl px-6 text-center text-[11px] text-muted-foreground">
        *Estimativa sujeita à análise da operação da sua frota. Condições detalhadas no fechamento
        do contrato.
      </p>
    </div>
  );
}
