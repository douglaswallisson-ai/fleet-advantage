import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Menu } from "lucide-react";
import logo from "@/assets/ss-logo.png.asset.json";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

type Leaf = { label: string; to?: string; href?: string; desc?: string };
type NavEntry = { label: string; to?: string; href?: string; items?: Leaf[] };

/**
 * Navegação agrupada: poucos tópicos no topo, cada um com um painel que desce
 * ao passar o mouse (ou ao focar pelo teclado). O menu mobile (Sheet) mostra os
 * grupos já expandidos, sem dropdown.
 */
const NAV: NavEntry[] = [
  { label: "Início", to: "/" },
  {
    label: "Plataforma",
    items: [
      { label: "Soluções", href: "/#solucoes", desc: "IA Fleet Manager, pneus, câmeras e EURO 6" },
      { label: "Copiloto do Motorista", href: "/#copiloto", desc: "A Selma acompanha o motorista" },
      { label: "Clube SS", href: "/#clube", desc: "Fidelidade para motoristas" },
      { label: "Selo Verde", to: "/selo-verde", desc: "Certificação de redução de CO₂" },
      { label: "Planos", href: "/#produtos", desc: "Start, Performance e Evolution" },
    ],
  },
  {
    label: "A Empresa",
    items: [
      { label: "Quem Somos", to: "/quem-somos", desc: "História, propósito e valores" },
      { label: "Blog", to: "/blog", desc: "Ideias sobre frota, IA e decisão" },
      { label: "Programa de Indicação", to: "/indicacao", desc: "Ganhe indicando a SS" },
    ],
  },
];

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const openNow = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpenGroup(label);
  };
  // Pequeno atraso ao sair: dá tempo de o mouse cruzar até o painel.
  const closeSoon = () => {
    closeTimer.current = setTimeout(() => setOpenGroup(null), 120);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-6 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo.url} alt="SS Telemática" className="h-9 w-auto" width={180} height={40} />
        </Link>

        <nav className="hidden items-center gap-2 text-sm font-medium text-muted-foreground lg:flex">
          {NAV.map((entry) =>
            entry.items ? (
              <div
                key={entry.label}
                className="relative"
                onMouseEnter={() => openNow(entry.label)}
                onMouseLeave={closeSoon}
                onFocusCapture={() => openNow(entry.label)}
                onBlurCapture={(e) => {
                  if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpenGroup(null);
                }}
              >
                <button
                  type="button"
                  aria-expanded={openGroup === entry.label}
                  aria-haspopup="true"
                  className="inline-flex items-center gap-1 rounded-full px-3 py-2 transition-colors hover:text-primary"
                >
                  {entry.label}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${openGroup === entry.label ? "rotate-180" : ""}`}
                  />
                </button>

                {openGroup === entry.label && (
                  // pt-2 forma uma "ponte" invisível: o mouse não cai num vão.
                  <div className="absolute left-0 top-full z-50 pt-2">
                    <div className="w-[300px] rounded-2xl border border-border bg-card p-2 shadow-elegant">
                      {entry.items.map((leaf) => (
                        <LeafLink
                          key={leaf.label}
                          leaf={leaf}
                          onNavigate={() => setOpenGroup(null)}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={entry.label}
                to={entry.to}
                className="rounded-full px-3 py-2 transition-colors hover:text-primary [&.active]:text-primary"
              >
                {entry.label}
              </Link>
            ),
          )}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/contato"
            className="hidden items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-card transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Falar com especialista
          </Link>

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Abrir menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] overflow-y-auto sm:w-[380px]">
              <SheetHeader>
                <SheetTitle className="text-left">Navegação</SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-6">
                {NAV.map((entry) =>
                  entry.items ? (
                    <div key={entry.label}>
                      <div className="px-3 text-xs font-bold tracking-widest text-brand-sky">
                        {entry.label.toUpperCase()}
                      </div>
                      <div className="mt-2 flex flex-col">
                        {entry.items.map((leaf) => (
                          <LeafLink
                            key={leaf.label}
                            leaf={leaf}
                            onNavigate={() => setMobileOpen(false)}
                          />
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={entry.label}
                      to={entry.to}
                      onClick={() => setMobileOpen(false)}
                      className="rounded-lg px-3 py-2.5 text-base font-semibold transition-colors hover:bg-secondary [&.active]:text-primary"
                    >
                      {entry.label}
                    </Link>
                  ),
                )}
              </nav>
              <Link
                to="/contato"
                onClick={() => setMobileOpen(false)}
                className="mt-8 inline-flex w-full items-center justify-center rounded-full bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground shadow-card"
              >
                Falar com especialista
              </Link>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

/** Item de submenu: âncora (#) ou rota interna, com título e descrição. */
function LeafLink({ leaf, onNavigate }: { leaf: Leaf; onNavigate: () => void }) {
  const className =
    "block rounded-xl px-3 py-2.5 transition-colors hover:bg-secondary [&.active]:bg-secondary";
  const inner = (
    <>
      <div className="text-sm font-semibold text-foreground">{leaf.label}</div>
      {leaf.desc && <div className="mt-0.5 text-xs text-muted-foreground">{leaf.desc}</div>}
    </>
  );

  return leaf.to ? (
    <Link to={leaf.to} onClick={onNavigate} className={className}>
      {inner}
    </Link>
  ) : (
    <a href={leaf.href} onClick={onNavigate} className={className}>
      {inner}
    </a>
  );
}
