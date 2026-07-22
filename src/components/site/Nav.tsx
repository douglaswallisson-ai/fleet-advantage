import { Link } from "@tanstack/react-router";
import logo from "@/assets/ss-logo.png.asset.json";

export function Nav() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-6 px-6 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo.url} alt="SS Telemática" className="h-9 w-auto" width={180} height={40} />
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
          <Link to="/" className="transition-colors hover:text-primary [&.active]:text-primary">Início</Link>
          <a href="/#produtos" className="transition-colors hover:text-primary">Produtos</a>
          <a href="/#solucoes" className="transition-colors hover:text-primary">Soluções</a>
          <Link to="/quem-somos" className="transition-colors hover:text-primary [&.active]:text-primary">Quem Somos</Link>
          <Link to="/indicacao" className="transition-colors hover:text-primary [&.active]:text-primary">Indicação</Link>
        </nav>
        <a
          href="#contato"
          className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-card transition-transform hover:-translate-y-0.5"
        >
          Falar com especialista
        </a>
      </div>
    </header>
  );
}
