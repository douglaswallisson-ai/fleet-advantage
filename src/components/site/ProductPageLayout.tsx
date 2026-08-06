import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

export type ProductPageContent = {
  badge: string;
  name: string;
  headline: string;
  description: string;
  features: string[];
  segment: string;
  dark?: boolean;
  ctaLabel?: string;
};

export function ProductPageLayout({ content }: { content: ProductPageContent }) {
  const {
    badge,
    name,
    headline,
    description,
    features,
    segment,
    dark = false,
    ctaLabel = "Simular meu plano",
  } = content;

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <section className={`py-24 ${dark ? "bg-gradient-hero text-white" : "bg-secondary/40"}`}>
          <div className="mx-auto max-w-4xl px-6 text-center">
            <span
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold tracking-widest ${
                dark
                  ? "border-white/20 bg-white/10 text-brand-green"
                  : "border-border bg-card text-brand-sky"
              }`}
            >
              {badge}
            </span>
            <h1 className="mt-6 text-5xl font-bold leading-[1.05] md:text-6xl">{name}</h1>
            <p
              className={`mx-auto mt-6 max-w-2xl text-lg ${dark ? "text-white/80" : "text-muted-foreground"}`}
            >
              {headline}
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-5xl px-6 py-20">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <h2 className="text-2xl font-bold md:text-3xl">O que está incluso</h2>
              <p className="mt-3 text-muted-foreground">{description}</p>
              <ul className="mt-8 space-y-3">
                {features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 shadow-card"
                  >
                    <Check className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
                    <span className="text-sm">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="rounded-3xl border border-border bg-card p-8 shadow-card">
              <div className="text-xs font-semibold tracking-widest text-muted-foreground">
                IDEAL PARA
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{segment}</p>
              <Link
                to="/contato"
                search={{ plano: name }}
                className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-card transition-transform hover:-translate-y-0.5"
              >
                {ctaLabel} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/"
                hash="produtos"
                className="mt-4 block text-center text-xs font-semibold text-muted-foreground underline-offset-4 hover:underline"
              >
                Comparar os 3 planos
              </Link>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export function ProductPageSectionDivider(): ReactNode {
  return null;
}
