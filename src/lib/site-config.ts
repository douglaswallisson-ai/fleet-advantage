/**
 * Fonte única de verdade para dados institucionais do site.
 * Campos vazios simplesmente não são renderizados — preencha e eles aparecem.
 */

const FALLBACK_URL = "https://www.sstelematica.com.br";

/** Base absoluta usada em canonical, og:url, sitemap e JSON-LD. */
export const SITE_URL = (
  (import.meta.env?.VITE_SITE_URL as string | undefined) ?? FALLBACK_URL
).replace(/\/$/, "");

export const SITE = {
  name: "SS Telemática",
  legalName: "SS Telemática",
  tagline: "Da telemetria à tomada de decisão",
  description:
    "IA que transforma dados de frota em decisões: redução de custos, monitoramento de pneus, copiloto do motorista e clube de fidelidade.",
  foundingYear: "2001",
  ogImage: "/og-cover.jpg",
};

/**
 * Vídeos de fundo das seções. Enquanto vazios, a foto correspondente roda com
 * zoom lento (efeito Ken Burns). Coloque o arquivo em `public/videos/` e aponte
 * aqui — ex.: "/videos/hero.mp4" — que o <Backdrop /> troca para vídeo sozinho.
 *
 * Recomendado: MP4 (H.264) sem áudio, até ~8 s em loop, 1920×1080, abaixo de 3 MB.
 */
export const MEDIA = {
  heroVideo: "",
  clubeVideo: "",
  indicacaoVideo: "",
};

/**
 * Textos do chat flutuante (src/components/site/ChatWidget.tsx).
 *
 * O botão do WhatsApp só aparece depois que `CONTACT.whatsapp` for preenchido;
 * sem ele, o widget funciona apenas como recado assíncrono.
 *
 * Para um chat ao vivo de verdade (Chatwoot, Crisp, Tawk.to, Zendesk…), o
 * caminho é substituir o conteúdo do painel pelo script do provedor — a bolinha
 * e o posicionamento já estão prontos e seguem a identidade da SS.
 */
export const CHAT = {
  greeting: "Olá! Somos o time da SS. Como podemos ajudar com a sua frota?",
  availability: "Respondemos em horário comercial",
  whatsappMessage: "Olá! Vim pelo site da SS Telemática e gostaria de falar com um atendente.",
};

export const CONTACT = {
  email: "comercial@sstelematica.com.br",
  // TODO(SS): preencher com os dados reais — enquanto vazios, não são exibidos.
  phone: "", // ex.: "0800 123 4567"
  whatsapp: "", // apenas dígitos com DDI, ex.: "5511999999999"
  cnpj: "", // ex.: "12.345.678/0001-90"
  address: "", // ex.: "Av. Exemplo, 1000 — São Paulo/SP"
  supportHours: "Suporte 24/7",
};

export const whatsappLink = (message: string) =>
  CONTACT.whatsapp ? `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}` : null;

export const absoluteUrl = (path: string) =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/**
 * Metadados de página em um único lugar: devolve title/description/canonical/og
 * já absolutos. Usado por todas as rotas no `head()`.
 */
export function pageHead(opts: {
  title: string;
  description: string;
  path: string;
  ogTitle?: string;
  ogDescription?: string;
}) {
  const url = absoluteUrl(opts.path);
  return {
    meta: [
      { title: opts.title },
      { name: "description", content: opts.description },
      { property: "og:title", content: opts.ogTitle ?? opts.title },
      { property: "og:description", content: opts.ogDescription ?? opts.description },
      { property: "og:url", content: url },
      { property: "og:image", content: absoluteUrl(SITE.ogImage) },
      { name: "twitter:image", content: absoluteUrl(SITE.ogImage) },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
