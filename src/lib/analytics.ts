/**
 * Camada de medição do site: consentimento (LGPD), Google Tag Manager / GA4 e
 * Apollo.
 *
 * Três peças, nesta ordem de dependência:
 *
 *  1. `src/lib/site-config.ts` → `ANALYTICS`: os IDs. Vazio = script não carrega.
 *  2. Este arquivo: guarda a decisão do visitante e expõe `track()`.
 *  3. `src/components/site/Analytics.tsx` e `CookieConsent.tsx`: injetam os
 *     scripts e mostram o banner.
 *
 * Regra que vale para tudo aqui: NADA de terceiro carrega antes de o visitante
 * decidir. O Google entra em Consent Mode v2 (presente desde o primeiro byte,
 * mas sem gravar cookie enquanto negado); o Apollo só é injetado depois do
 * aceite de marketing, porque ele não tem modo de consentimento próprio.
 *
 * Ver docs/ANALYTICS.md para o passo a passo de configuração.
 */

import { ANALYTICS } from "./site-config";

/** Chave no localStorage. Suba a versão para reperguntar a todo mundo. */
export const CONSENT_KEY = "ss-consent-v1";

/** Evento interno disparado quando a decisão muda (o banner e o Analytics ouvem). */
export const CONSENT_EVENT = "ss:consent-change";

/** Evento que reabre o painel de preferências (rodapé e política disparam). */
export const OPEN_CONSENT_EVENT = "ss:open-consent";

/** Quantos dias a decisão vale antes de perguntarmos de novo. */
const CONSENT_TTL_DAYS = 180;

export type ConsentValue = "granted" | "denied";

export type Consent = {
  /** GA4: audiência, páginas, origem do tráfego. */
  analytics: ConsentValue;
  /** Apollo e futuros pixels de mídia. */
  marketing: ConsentValue;
  /** ISO da decisão — usado para expirar e para prova de consentimento. */
  decidedAt: string;
};

export const CONSENT_DENIED: Consent = {
  analytics: "denied",
  marketing: "denied",
  decidedAt: "",
};

/* -------------------------------------------------------------------------- */
/* Tipagem do que o Google injeta no window                                    */
/* -------------------------------------------------------------------------- */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    /** Guarda de idempotência: impede injetar o mesmo script duas vezes. */
    __ssLoaded?: Record<string, boolean>;
  }
}

const isBrowser = () => typeof window !== "undefined";

/* -------------------------------------------------------------------------- */
/* Leitura e escrita da decisão                                                */
/* -------------------------------------------------------------------------- */

/**
 * Decisão atual. Retorna `null` quando o visitante ainda não decidiu — é esse
 * `null` que faz o banner aparecer.
 *
 * Também retorna `null` quando a decisão expirou (LGPD não fixa prazo, mas
 * consentimento eterno é frágil; 180 dias é a prática usual).
 */
export function getConsent(): Consent | null {
  if (!isBrowser()) return null;
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Partial<Consent>;
    if (parsed.analytics !== "granted" && parsed.analytics !== "denied") return null;
    if (parsed.marketing !== "granted" && parsed.marketing !== "denied") return null;

    if (parsed.decidedAt) {
      const idade = Date.now() - new Date(parsed.decidedAt).getTime();
      if (idade > CONSENT_TTL_DAYS * 24 * 60 * 60 * 1000) return null;
    }

    return {
      analytics: parsed.analytics,
      marketing: parsed.marketing,
      decidedAt: parsed.decidedAt ?? "",
    };
  } catch {
    // localStorage bloqueado (aba anônima restrita, políticas corporativas):
    // tratamos como "não decidiu" e nada de terceiro carrega.
    return null;
  }
}

/** Grava a decisão, avisa o Google e notifica os componentes da página. */
export function setConsent(escolha: { analytics: boolean; marketing: boolean }) {
  if (!isBrowser()) return;

  const consent: Consent = {
    analytics: escolha.analytics ? "granted" : "denied",
    marketing: escolha.marketing ? "granted" : "denied",
    decidedAt: new Date().toISOString(),
  };

  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  } catch {
    // Sem persistência, a decisão vale só para esta navegação. Segue o jogo.
  }

  pushConsentUpdate(consent);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: consent }));
}

/** Apaga a decisão e volta tudo para negado (usado no "revogar consentimento"). */
export function resetConsent() {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(CONSENT_KEY);
  } catch {
    /* nada a fazer */
  }
  pushConsentUpdate(CONSENT_DENIED);
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: null }));
}

/**
 * Traduz nossa decisão para o vocabulário do Consent Mode v2 do Google.
 *
 * Só o `analytics_storage` responde ao aceite de analytics; os três campos de
 * anúncio seguem o aceite de marketing. Quem recusa continua sendo contado de
 * forma agregada e sem cookie — é assim que o Consent Mode funciona.
 */
function pushConsentUpdate(consent: Consent) {
  if (!isBrowser() || typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    analytics_storage: consent.analytics,
    ad_storage: consent.marketing,
    ad_user_data: consent.marketing,
    ad_personalization: consent.marketing,
  });
}

/* -------------------------------------------------------------------------- */
/* Snippet inline que roda antes de qualquer script do Google                  */
/* -------------------------------------------------------------------------- */

/**
 * Vai no `<head>`, antes do GTM. Não faz requisição nenhuma: só cria o
 * `dataLayer`, declara tudo como negado e reaplica a decisão já salva — para
 * que quem aceitou numa visita anterior não perca o page_view de entrada.
 *
 * `wait_for_update: 500` segura as tags por meio segundo enquanto o banner
 * decide; sem isso o GA4 dispararia como negado e só corrigiria depois.
 */
export const consentBootstrapScript = `
window.dataLayer=window.dataLayer||[];
function gtag(){window.dataLayer.push(arguments);}
window.gtag=window.gtag||gtag;
gtag('consent','default',{
  ad_storage:'denied',
  ad_user_data:'denied',
  ad_personalization:'denied',
  analytics_storage:'denied',
  functionality_storage:'granted',
  security_storage:'granted',
  wait_for_update:500
});
try{
  var raw=localStorage.getItem('${CONSENT_KEY}');
  if(raw){
    var c=JSON.parse(raw);
    gtag('consent','update',{
      analytics_storage:c.analytics==='granted'?'granted':'denied',
      ad_storage:c.marketing==='granted'?'granted':'denied',
      ad_user_data:c.marketing==='granted'?'granted':'denied',
      ad_personalization:c.marketing==='granted'?'granted':'denied'
    });
  }
}catch(e){}
`.trim();

/* -------------------------------------------------------------------------- */
/* Carregamento dos scripts                                                    */
/* -------------------------------------------------------------------------- */

function jaCarregado(chave: string) {
  if (!isBrowser()) return true;
  window.__ssLoaded = window.__ssLoaded ?? {};
  if (window.__ssLoaded[chave]) return true;
  window.__ssLoaded[chave] = true;
  return false;
}

function injetarScript(src: string, onload?: () => void) {
  const el = document.createElement("script");
  el.src = src;
  el.async = true;
  if (onload) el.onload = onload;
  document.head.appendChild(el);
}

/** Google Tag Manager. Carrega mesmo sem aceite — o Consent Mode segura as tags. */
export function loadGtm() {
  if (!ANALYTICS.gtmId || jaCarregado("gtm")) return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
  injetarScript(`https://www.googletagmanager.com/gtm.js?id=${ANALYTICS.gtmId}`);
}

/**
 * GA4 carregado pelo site.
 *
 * Fica de fora quando `ga4ViaGtm` é `true` — nesse caso quem dispara o GA4 é a
 * tag configurada no painel do GTM, e carregar aqui também faria cada pageview
 * contar duas vezes.
 */
export function loadGa4() {
  if (!ANALYTICS.ga4Id || ANALYTICS.ga4ViaGtm || jaCarregado("ga4")) return;
  injetarScript(`https://www.googletagmanager.com/gtag/js?id=${ANALYTICS.ga4Id}`, () => {
    window.gtag?.("js", new Date());
    window.gtag?.("config", ANALYTICS.ga4Id, { send_page_view: true });
  });
}

/**
 * Apollo — identificação de empresa por IP reverso.
 *
 * Só depois do aceite de marketing: diferente do Google, o Apollo não tem modo
 * de consentimento, então a única forma de respeitar a recusa é não carregar.
 */
export function loadApollo() {
  if (!ANALYTICS.apolloAppId || jaCarregado("apollo")) return;
  const nocache = Math.random().toString(36).substring(7);
  injetarScript(
    `https://assets.apollo.io/micro/website-tracker/tracker.iife.js?nocache=${nocache}`,
    () => {
      const w = window as unknown as {
        trackingFunctions?: { onLoad?: (opts: { appId: string }) => void };
      };
      w.trackingFunctions?.onLoad?.({ appId: ANALYTICS.apolloAppId });
    },
  );
}

/* -------------------------------------------------------------------------- */
/* Eventos                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * Empurra um evento para o dataLayer.
 *
 * Com GTM, aparece como trigger de "evento personalizado" — é preciso criar a
 * tag correspondente no painel do GTM (ver docs/ANALYTICS.md). Sem GTM, vai
 * direto para o GA4 via gtag.
 *
 * Chamar antes do aceite é inofensivo: o evento fica no dataLayer e as tags
 * simplesmente não disparam enquanto o consentimento estiver negado.
 */
export function track(evento: string, params: Record<string, unknown> = {}) {
  if (!isBrowser()) return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: evento, ...params });
  if (ANALYTICS.ga4Id && !ANALYTICS.ga4ViaGtm) {
    window.gtag?.("event", evento, params);
  }
}

/**
 * Pageview manual, para navegação SPA.
 *
 * O carregamento inicial já é contado pelo GTM/GA4; quem chama isto é o
 * `<Analytics />`, que ignora a primeira renderização de propósito.
 */
export function trackPageView(url: string, title?: string) {
  if (!isBrowser()) return;
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event: "page_view", page_location: url, page_title: title });
  if (ANALYTICS.ga4Id && !ANALYTICS.ga4ViaGtm) {
    window.gtag?.("config", ANALYTICS.ga4Id, { page_path: url, page_title: title });
  }
}

/** Há alguma ferramenta configurada? Sem isso, nem banner precisa aparecer. */
export const temAlgoConfigurado = () =>
  Boolean(ANALYTICS.gtmId || ANALYTICS.ga4Id || ANALYTICS.apolloAppId);
