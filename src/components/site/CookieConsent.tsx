import { useCallback, useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { BarChart3, Cookie, ShieldCheck, X } from "lucide-react";

import {
  OPEN_CONSENT_EVENT,
  getConsent,
  setConsent,
  temAlgoConfigurado,
  type Consent,
} from "@/lib/analytics";

type Tela = "oculto" | "banner" | "preferencias";

/**
 * Banner de consentimento (LGPD, art. 8º).
 *
 * Aparece na primeira visita e some assim que o visitante decide. Recusar é tão
 * fácil quanto aceitar — os dois botões têm o mesmo peso visual, que é o que
 * separa um banner honesto de um que empurra o aceite.
 *
 * Enquanto nenhum ID estiver configurado em `ANALYTICS`, o banner nem aparece:
 * não há nada para consentir.
 */
export function CookieConsent() {
  const [tela, setTela] = useState<Tela>("oculto");
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(true);

  const sincronizar = useCallback((consent: Consent | null) => {
    if (consent) {
      setAnalytics(consent.analytics === "granted");
      setMarketing(consent.marketing === "granted");
    }
  }, []);

  useEffect(() => {
    if (!temAlgoConfigurado()) return;

    const consent = getConsent();
    sincronizar(consent);
    // Sem decisão salva (primeira visita ou consentimento expirado): pergunta.
    if (!consent) setTela("banner");

    const abrir = () => {
      sincronizar(getConsent());
      setTela("preferencias");
    };
    window.addEventListener(OPEN_CONSENT_EVENT, abrir);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, abrir);
  }, [sincronizar]);

  function decidir(escolha: { analytics: boolean; marketing: boolean }) {
    setConsent(escolha);
    setAnalytics(escolha.analytics);
    setMarketing(escolha.marketing);
    setTela("oculto");
  }

  if (tela === "oculto") return null;

  const ehPreferencias = tela === "preferencias";

  return (
    <div
      role="dialog"
      aria-modal={ehPreferencias}
      aria-label="Preferências de cookies"
      className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4 sm:px-6 sm:pb-6"
    >
      <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-border bg-background shadow-card">
        <div className="flex items-start gap-4 p-5 sm:p-6">
          <span className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-sky/10 text-brand-sky sm:flex">
            <Cookie className="h-5 w-5" />
          </span>

          <div className="min-w-0 flex-1">
            <h2 className="text-sm font-semibold text-foreground">
              {ehPreferencias ? "Suas preferências de cookies" : "Este site usa cookies"}
            </h2>

            {!ehPreferencias && (
              <p className="mt-1.5 text-sm text-muted-foreground">
                Usamos cookies para entender como o site é usado e para identificar empresas
                interessadas nas nossas soluções. Você escolhe o que aceitar — nada é carregado
                antes disso. Detalhes na{" "}
                <Link to="/politica-de-privacidade" className="underline hover:text-primary">
                  Política de Privacidade
                </Link>
                .
              </p>
            )}

            {ehPreferencias && (
              <div className="mt-4 space-y-3">
                <Categoria
                  icone={<ShieldCheck className="h-4 w-4" />}
                  titulo="Essenciais"
                  descricao="Necessários para o site funcionar e para registrar sua escolha aqui. Não dá para desligar."
                  ligado
                  travado
                />
                <Categoria
                  icone={<BarChart3 className="h-4 w-4" />}
                  titulo="Medição de audiência"
                  descricao="Google Analytics: quantas visitas, de onde vêm e quais páginas são vistas. Dados agregados, sem identificar você."
                  ligado={analytics}
                  onChange={setAnalytics}
                />
                <Categoria
                  icone={<Cookie className="h-4 w-4" />}
                  titulo="Prospecção comercial"
                  descricao="Apollo: identifica a empresa do visitante pelo IP corporativo, para que nosso time comercial saiba quem se interessou."
                  ligado={marketing}
                  onChange={setMarketing}
                />
              </div>
            )}

            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center">
              {ehPreferencias ? (
                <>
                  <Botao onClick={() => decidir({ analytics, marketing })} variante="primario">
                    Salvar preferências
                  </Botao>
                  <Botao onClick={() => decidir({ analytics: true, marketing: true })}>
                    Aceitar todos
                  </Botao>
                  <Botao onClick={() => decidir({ analytics: false, marketing: false })}>
                    Recusar todos
                  </Botao>
                </>
              ) : (
                <>
                  <Botao
                    onClick={() => decidir({ analytics: true, marketing: true })}
                    variante="primario"
                  >
                    Aceitar todos
                  </Botao>
                  <Botao onClick={() => decidir({ analytics: false, marketing: false })}>
                    Recusar todos
                  </Botao>
                  <button
                    onClick={() => setTela("preferencias")}
                    className="text-sm font-medium text-muted-foreground underline underline-offset-4 transition-colors hover:text-foreground sm:ml-1"
                  >
                    Personalizar
                  </button>
                </>
              )}
            </div>
          </div>

          {ehPreferencias && (
            <button
              onClick={() => setTela("oculto")}
              aria-label="Fechar preferências"
              className="shrink-0 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function Botao({
  children,
  onClick,
  variante = "secundario",
}: {
  children: React.ReactNode;
  onClick: () => void;
  variante?: "primario" | "secundario";
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-transform hover:-translate-y-0.5";
  const estilo =
    variante === "primario"
      ? "bg-primary text-primary-foreground shadow-card"
      : "border border-input bg-background text-foreground hover:bg-accent";
  return (
    <button onClick={onClick} className={`${base} ${estilo}`}>
      {children}
    </button>
  );
}

function Categoria({
  icone,
  titulo,
  descricao,
  ligado,
  travado = false,
  onChange,
}: {
  icone: React.ReactNode;
  titulo: string;
  descricao: string;
  ligado: boolean;
  travado?: boolean;
  onChange?: (v: boolean) => void;
}) {
  return (
    <label
      className={`flex items-start gap-3 rounded-xl border border-border/70 p-3 ${
        travado ? "opacity-70" : "cursor-pointer hover:border-brand-sky/50"
      }`}
    >
      <input
        type="checkbox"
        checked={ligado}
        disabled={travado}
        onChange={(e) => onChange?.(e.target.checked)}
        className="mt-0.5 h-4 w-4 shrink-0 rounded border-input accent-[oklch(0.32_0.13_260)]"
      />
      <span className="min-w-0">
        <span className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
          <span className="text-brand-sky">{icone}</span>
          {titulo}
        </span>
        <span className="mt-0.5 block text-xs text-muted-foreground">{descricao}</span>
      </span>
    </label>
  );
}
