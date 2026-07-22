import { Link } from "@tanstack/react-router";
import logo from "@/assets/ss-logo.png.asset.json";

export function Footer() {
  return (
    <footer id="contato" className="border-t border-border/60 bg-[oklch(0.14_0.03_260)] text-[oklch(0.9_0.01_240)]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="rounded-lg bg-white/95 p-3 inline-block">
              <img src={logo.url} alt="SS Telemática" className="h-8 w-auto" width={160} height={32} />
            </div>
            <p className="mt-4 text-sm text-white/70 max-w-xs">
              Da telemetria à tomada de decisão. Inteligência que move sua frota.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Produtos</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>SS Essencial</li>
              <li>SS Performance</li>
              <li>SS Enterprise IA</li>
              <li>Monitoramento de Pneus</li>
              <li>Copiloto do Motorista</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Empresa</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li><Link to="/quem-somos">Quem Somos</Link></li>
              <li><Link to="/indicacao">Programa de Indicação</Link></li>
              <li>Selo Verde</li>
              <li>Blog</li>
              <li>Carreiras</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white">Contato</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>comercial@sstelematica.com.br</li>
              <li>0800 000 0000</li>
              <li>Suporte 24/7</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 md:flex-row">
          <p>© {new Date().getFullYear()} SS Telemática. Todos os direitos reservados.</p>
          <p>CNPJ 00.000.000/0001-00 · Política de Privacidade</p>
        </div>
      </div>
    </footer>
  );
}
