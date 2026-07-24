import { Link } from "@tanstack/react-router";
import logo from "@/assets/ss-logo.png.asset.json";
import { CONTACT, SITE } from "@/lib/site-config";

const PRODUTOS = [
  { label: "IA Fleet Manager", href: "/#solucoes" },
  { label: "Monitoramento de Pneus", href: "/#solucoes" },
  { label: "Câmeras com IA", href: "/#solucoes" },
  { label: "Copiloto do Motorista", href: "/#copiloto" },
  { label: "Clube de Fidelidade", href: "/#clube" },
  { label: "Selo Verde SS", href: "/selo-verde" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-[oklch(0.14_0.03_260)] text-[oklch(0.9_0.01_240)]">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="inline-block rounded-lg bg-white/95 p-3">
              <img
                src={logo.url}
                alt="SS Telemática"
                className="h-8 w-auto"
                width={160}
                height={32}
              />
            </div>
            <p className="mt-4 max-w-xs text-sm text-white/70">
              {SITE.tagline}. Inteligência que move sua frota.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Produtos</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              {PRODUTOS.map((p) => (
                <li key={p.label}>
                  <a href={p.href} className="transition-colors hover:text-white">
                    {p.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Empresa</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>
                <Link to="/quem-somos" className="transition-colors hover:text-white">
                  Quem Somos
                </Link>
              </li>
              <li>
                <Link to="/indicacao" className="transition-colors hover:text-white">
                  Programa de Indicação
                </Link>
              </li>
              <li>
                <Link to="/contato" className="transition-colors hover:text-white">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/politica-de-privacidade" className="transition-colors hover:text-white">
                  Política de Privacidade
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">Contato</h4>
            <ul className="mt-4 space-y-2 text-sm text-white/70">
              <li>
                <a href={`mailto:${CONTACT.email}`} className="transition-colors hover:text-white">
                  {CONTACT.email}
                </a>
              </li>
              {CONTACT.phone && (
                <li>
                  <a
                    href={`tel:${CONTACT.phone.replace(/\D/g, "")}`}
                    className="transition-colors hover:text-white"
                  >
                    {CONTACT.phone}
                  </a>
                </li>
              )}
              {CONTACT.address && <li>{CONTACT.address}</li>}
              <li>{CONTACT.supportHours}</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/60 md:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. Todos os direitos reservados.
            {CONTACT.cnpj && ` · CNPJ ${CONTACT.cnpj}`}
          </p>
          <Link to="/politica-de-privacidade" className="hover:text-white">
            Política de Privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}
