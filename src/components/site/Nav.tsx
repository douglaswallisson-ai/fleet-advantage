import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import logo from "@/assets/ss-logo.png.asset.json";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

type NavItem = { label: string; to?: string; href?: string };

const NAV_ITEMS: NavItem[] = [
  { label: "Início", to: "/" },
  { label: "Soluções", href: "/#solucoes" },
  { label: "Copiloto", href: "/#copiloto" },
  { label: "Clube SS", href: "/#clube" },
  { label: "Selo Verde", to: "/selo-verde" },
  { label: "Planos", href: "/#produtos" },
  { label: "Quem Somos", to: "/quem-somos" },
  { label: "Indicação", to: "/indicacao" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-6 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo.url} alt="SS Telemática" className="h-9 w-auto" width={180} height={40} />
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground lg:flex">
          {NAV_ITEMS.map((item) =>
            item.to ? (
              <Link
                key={item.label}
                to={item.to}
                className="transition-colors hover:text-primary [&.active]:text-primary"
              >
                {item.label}
              </Link>
            ) : (
              <a key={item.label} href={item.href} className="transition-colors hover:text-primary">
                {item.label}
              </a>
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

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                aria-label="Abrir menu"
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground lg:hidden"
              >
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[360px]">
              <SheetHeader>
                <SheetTitle className="text-left">Navegação</SheetTitle>
              </SheetHeader>
              <nav className="mt-8 flex flex-col gap-1">
                {NAV_ITEMS.map((item) =>
                  item.to ? (
                    <Link
                      key={item.label}
                      to={item.to}
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-secondary [&.active]:text-primary"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="rounded-lg px-3 py-3 text-base font-medium transition-colors hover:bg-secondary"
                    >
                      {item.label}
                    </a>
                  ),
                )}
              </nav>
              <Link
                to="/contato"
                onClick={() => setOpen(false)}
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
