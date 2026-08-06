import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { ReferralCalculator } from "@/components/site/ReferralCalculator";

export function ReferralTeaser() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1fr]">
        <div>
          <span className="text-xs font-bold tracking-widest text-brand-sky">
            PROGRAMA DE INDICAÇÃO
          </span>
          <h2 className="mt-3 text-3xl font-bold md:text-4xl">
            Conhece uma frota que precisa disso? Indique e ganhe.
          </h2>
          <p className="mt-4 text-muted-foreground">
            3% sobre o valor de 12 meses do contrato fechado pelo indicado, sem teto. Simule ao lado
            quanto você recebe.
          </p>
          <Link
            to="/indicacao"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5"
          >
            Ver o programa completo <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <ReferralCalculator compact />
      </div>
    </section>
  );
}
