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
            Conhece uma frota que precisa disso?{" "}
            <span className="text-gradient">Indique e ganhe.</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            R$ 30 por veículo ativado da frota que você indicar, sem teto. Uma frota de 100 veículos
            são R$ 3.000. Simule ao lado.
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
