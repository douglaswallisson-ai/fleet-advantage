import { ArrowUpRight, Building2 } from "lucide-react";
import { FOTOS, GRUPO } from "@/lib/site-config";

/**
 * A SS faz parte do Grupo Modaxo, da Constellation Software.
 * Compartilhado entre a home e a página Quem Somos.
 */
export function GrupoModaxo() {
  return (
    <section className="bg-secondary/40 py-24">
      <img
        src={FOTOS.grupoModaxoBanner}
        alt="SS Telemática — empresa do Grupo Modaxo"
        loading="lazy"
        className="h-auto w-full object-cover"
      />
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl pt-16 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-bold tracking-widest text-muted-foreground">
            <Building2 className="h-3.5 w-3.5 text-brand-green" /> PARTE DE ALGO MAIOR
          </span>
          <h2 className="mt-5 text-4xl font-bold md:text-5xl">
            A SS é parte do <span className="text-brand-green">Grupo Modaxo</span>.
          </h2>
          <p className="mt-5 text-lg text-muted-foreground">
            Integramos a Modaxo, o portfólio global de tecnologia para o transporte de pessoas —
            que, por sua vez, faz parte da Constellation Software, uma das maiores companhias de
            software do mundo. Isso nos dá solidez, alcance internacional e a garantia de
            continuidade de longo prazo para os nossos clientes.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {GRUPO.parceiros.map((p) => (
            <a
              key={p.nome}
              href={p.site}
              target="_blank"
              rel="noreferrer"
              className="group flex flex-col rounded-3xl border border-border bg-card p-8 transition-colors hover:bg-secondary/60"
            >
              <div className="flex h-16 items-center">
                {p.logo ? (
                  <span className="inline-flex h-14 items-center rounded-xl bg-white px-4">
                    <img src={p.logo} alt={p.nome} className="max-h-9 w-auto" />
                  </span>
                ) : (
                  <span className="text-2xl font-bold tracking-tight">{p.nome}</span>
                )}
              </div>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                {p.descricao}
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-sky">
                Visitar site
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
