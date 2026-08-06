import { Link } from "@tanstack/react-router";
import { Check } from "lucide-react";

export const TIERS = [
  {
    name: "SS Start",
    badgeCategoria: "Telemetria básica",
    desc: "Visibilidade e controle essencial para começar a profissionalizar a gestão da frota.",
    features: [
      "Rastreamento em tempo real",
      "Cerca eletrônica",
      "Relatórios operacionais",
      "App do motorista",
    ],
    color: "border-border",
    cta: "Operações que estão estruturando o controle da frota agora",
    href: "/produtos/ss-start",
  },
  {
    name: "SS Performance",
    badge: "MAIS ESCOLHIDO",
    badgeCategoria: "Telemetria avançada",
    desc: "O copiloto de IA que orienta o motorista em tempo real, com feedback contínuo para reduzir consumo e sinistros.",
    features: [
      "Tudo do SS Start",
      "Copiloto do Motorista com feedback em tempo real",
      "Monitoramento de Pneus",
      "Painel de rentabilidade",
    ],
    color: "border-brand-sky ring-2 ring-brand-sky/40",
    cta: "Para operações que competem por eficiência",
    href: "/produtos/ss-performance",
  },
  {
    name: "SS Evolution",
    badgeCategoria: "Decisão automatizada",
    desc: "Plano de ação pronto para a sua frota. O gestor chega e já encontra a decisão certa, não um painel para interpretar.",
    features: [
      "Tudo do SS Performance",
      "IA Fleet Manager — plano de ação automatizado",
      "Integração ERP/TMS",
      "SLA dedicado + CSM",
      "Selo Verde ESG",
    ],
    color: "border-border bg-gradient-hero text-white",
    cta: "Para frotas que buscam automação de decisão em escala",
    href: "/produtos/ss-evolution",
  },
] as const;

/**
 * Recap dos 3 tiers — usado na home (seção completa) e repetido no rodapé de
 * cada página de produto, para quem chegou direto por busca/link comparar
 * antes de sair da página.
 */
export function TiersRecap({
  compact = false,
  activeName,
}: {
  /** Versão mais curta, sem cabeçalho de seção — usada no fim das páginas de produto. */
  compact?: boolean;
  /** Nome do tier da própria página, para marcar visualmente "você está aqui". */
  activeName?: string;
}) {
  return (
    <section id="produtos" className="scroll-mt-24 bg-secondary/40 py-24">
      <div className="mx-auto max-w-7xl px-6">
        {compact ? (
          <div className="mb-14 text-center">
            <span className="text-xs font-bold tracking-widest text-brand-sky">
              3 TIERS · UMA PLATAFORMA
            </span>
            <h2 className="mt-3 text-3xl font-bold md:text-4xl">Compare os planos</h2>
          </div>
        ) : (
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="text-xs font-bold tracking-widest text-brand-sky">
                3 TIERS · UMA PLATAFORMA
              </span>
              <h2 className="mt-3 text-4xl font-bold md:text-5xl">
                Escolha o nível de decisão da sua frota.
              </h2>
            </div>
            <p className="max-w-md text-sm text-muted-foreground">
              Do rastreio essencial à IA que gerencia sua operação por você. Migre entre planos
              quando quiser.
            </p>
          </div>
        )}
        <div className="grid gap-6 md:grid-cols-3">
          {TIERS.map((t) => {
            const isDark = t.color.includes("gradient-hero");
            const isActive = t.name === activeName;
            return (
              <article
                key={t.name}
                className={`relative flex flex-col rounded-3xl border p-8 shadow-card ${t.color} ${
                  isActive ? "ring-2 ring-offset-2 ring-offset-background" : ""
                }`}
              >
                {t.badge && (
                  <span className="absolute -top-3 left-8 rounded-full bg-brand-green px-3 py-1 text-[10px] font-bold tracking-wider text-[oklch(0.15_0.03_260)]">
                    {t.badge}
                  </span>
                )}
                <span
                  className={`inline-flex w-fit items-center rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide ${
                    isDark ? "bg-white/10 text-white/80" : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {t.badgeCategoria}
                </span>
                <h3 className="mt-3 text-2xl font-bold">{t.name}</h3>
                <p className={`mt-2 text-sm ${isDark ? "text-white/70" : "text-muted-foreground"}`}>
                  {t.desc}
                </p>
                <ul className={`mt-6 space-y-2.5 text-sm ${isDark ? "text-white/90" : ""}`}>
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand-green" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <div
                  className={`mt-8 flex-1 border-t pt-4 text-xs ${isDark ? "border-white/10 text-white/60" : "border-border text-muted-foreground"}`}
                >
                  {t.cta}
                </div>
                {isActive ? (
                  <span
                    className={`mt-6 inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold ${isDark ? "border-white/30 text-white/80" : "border-border text-muted-foreground"}`}
                  >
                    Você está aqui
                  </span>
                ) : (
                  <Link
                    to={t.href}
                    className={`mt-6 inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5 ${isDark ? "bg-brand-green text-[oklch(0.15_0.03_260)]" : "bg-primary text-primary-foreground"}`}
                  >
                    Ver mais
                  </Link>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
