import { useEffect, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";

import {
  CONSENT_EVENT,
  getConsent,
  loadApollo,
  loadGa4,
  loadGtm,
  track,
  trackPageView,
} from "@/lib/analytics";

/**
 * Motor de medição do site. Sem interface — monta uma vez no `__root` e cuida de
 * três coisas:
 *
 *  1. Carregar os scripts (Google sempre, sob Consent Mode; Apollo só com aceite).
 *  2. Contar pageview a cada navegação — sem isso, um site SPA registra só a
 *     primeira página que o visitante abriu.
 *  3. Capturar cliques em WhatsApp, e-mail e telefone.
 *
 * A captura de cliques é delegada no `document` em vez de espalhada pelos
 * componentes: pega qualquer CTA, inclusive os que ainda vão ser criados, sem
 * precisar lembrar de instrumentar cada um.
 */
export function Analytics() {
  const href = useRouterState({ select: (s) => s.location.href });
  const primeiraRota = useRef(true);

  /* --- Scripts ----------------------------------------------------------- */
  useEffect(() => {
    /**
     * O Google entra desde o início: o Consent Mode v2 já foi declarado como
     * negado no `<head>`, então nada é gravado no navegador enquanto o visitante
     * não aceitar.
     *
     * Se o jurídico preferir uma leitura mais restritiva da LGPD — nem carregar
     * o Google antes do aceite — basta mover estas duas linhas para dentro do
     * `if (consent?.analytics === "granted")` logo abaixo. O custo é perder a
     * medição de quem nunca clica no banner.
     */
    loadGtm();
    loadGa4();

    const aplicar = () => {
      const consent = getConsent();
      // O Apollo não tem modo de consentimento. Ou carrega, ou não carrega.
      if (consent?.marketing === "granted") loadApollo();
    };

    aplicar();
    window.addEventListener(CONSENT_EVENT, aplicar);
    return () => window.removeEventListener(CONSENT_EVENT, aplicar);
  }, []);

  /* --- Pageview por navegação -------------------------------------------- */
  useEffect(() => {
    // A primeira página já foi contada pelo próprio GTM/GA4 no carregamento.
    if (primeiraRota.current) {
      primeiraRota.current = false;
      return;
    }
    trackPageView(href, typeof document !== "undefined" ? document.title : undefined);
  }, [href]);

  /* --- Cliques em CTAs ---------------------------------------------------- */
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const alvo = (event.target as HTMLElement | null)?.closest?.("a");
      if (!alvo) return;

      const url = alvo.getAttribute("href") ?? "";
      if (!url) return;

      // Onde o visitante clicou, para separar "WhatsApp do rodapé" de
      // "WhatsApp do formulário de contato" nos relatórios.
      const origem = alvo.closest("[data-secao]")?.getAttribute("data-secao") ?? undefined;
      const rotulo = alvo.textContent?.trim().slice(0, 60) || undefined;

      if (url.includes("wa.me") || url.includes("api.whatsapp.com")) {
        track("click_whatsapp", { link_text: rotulo, secao: origem, page_path: location.pathname });
        return;
      }
      if (url.startsWith("mailto:")) {
        track("click_email", { link_text: rotulo, secao: origem });
        return;
      }
      if (url.startsWith("tel:")) {
        track("click_telefone", { link_text: rotulo, secao: origem });
      }
    }

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
