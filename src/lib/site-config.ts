/**
 * Fonte única de verdade para dados institucionais do site.
 * Campos vazios simplesmente não são renderizados — preencha e eles aparecem.
 */

const FALLBACK_URL = "https://sstelematica.com.br";

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
  /**
   * Perfis oficiais da SS — entram no `sameAs` do JSON-LD (ajuda o Google a
   * ligar o site às redes). Preencha as URLs reais; vazias não aparecem.
   */
  social: {
    instagram: "https://www.instagram.com/sstelematica/",
    linkedin: "https://www.linkedin.com/company/ss-telematica/",
    youtube: "",
    facebook: "",
  },
};

/** Endereço da sede (Cartão CNPJ) — usado no LocalBusiness e no rodapé. */
export const ENDERECO = {
  rua: "R. Alvarenga Peixoto, 295, Andar 4",
  bairro: "Lourdes",
  cidade: "Belo Horizonte",
  estado: "MG",
  cep: "30.180-120",
  pais: "BR",
};

/**
 * Grupo empresarial — a SS faz parte do Grupo Modaxo, da Constellation Software.
 * Renderizado na página Quem Somos. Os logos ficam gated: sem o arquivo, o card
 * mostra só o nome; com o arquivo em `public/logos/`, mostra o logo.
 * Ver public/logos/LEIA-ME.txt.
 */
export const GRUPO = {
  parceiros: [
    {
      nome: "Modaxo",
      logo: "", // ex.: "/logos/modaxo.svg"
      site: "https://www.modaxo.com",
      descricao:
        "Portfólio global de tecnologias para o transporte de pessoas. A Modaxo reúne empresas que movem cidades e operações de transporte no mundo todo.",
    },
    {
      nome: "Constellation Software",
      logo: "", // ex.: "/logos/constellation.svg"
      site: "https://www.csisoftware.com",
      descricao:
        "Uma das maiores companhias de software do mundo (TSX: CSU), que adquire e faz crescer negócios de software verticais de excelência.",
    },
  ],
};

/**
 * Vídeos de fundo das seções. Enquanto vazios, a foto correspondente roda com
 * zoom lento (efeito Ken Burns). Coloque o arquivo em `public/videos/` e aponte
 * aqui — ex.: "/videos/hero.mp4" — que o <Backdrop /> troca para vídeo sozinho.
 *
 * Recomendado: MP4 (H.264) sem áudio, até ~8 s em loop, 1920×1080, abaixo de 3 MB.
 */
export const MEDIA = {
  // Fundos de seção (efeito Ken Burns na imagem enquanto não há vídeo).
  heroVideo: "",
  clubeVideo: "",
  indicacaoVideo: "",
  seloHeroVideo: "",

  // Vídeos dos cards/blocos de produto na home. Cada um substitui a imagem
  // correspondente. Coloque o arquivo em public/videos/ e aponte o caminho.
  // O <Media> usa a imagem atual como "poster" enquanto o vídeo carrega.
  iaFleetManager: "", // card de destaque (IA Fleet Manager)
  pneus: "", // card "Monitoramento de Pneus"
  cameras: "", // card "Câmeras com IA a bordo"
  euro6: "", // card "Regeneração EURO 6"
  copiloto: "", // seção "Copiloto do Motorista" (quando não usar a Selma)
  seloVerde: "", // imagem da seção Selo Verde na home
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
  greeting:
    "Oi! Eu sou a Selma, a copiloto da SS. Posso ajudar com dúvidas do dia a dia, saúde da frota, condução, manutenção preditiva e alertas. Como posso ajudar?",
  availability: "Copiloto SS · sempre por perto",
  whatsappMessage: "Olá! Vim pelo site da SS Telemática e gostaria de falar com um atendente.",
};

/**
 * Selma — a copiloto/assistente da SS, presente no chat e na seção do Copiloto.
 *
 * `avatar` fica vazio até o arquivo existir: sem ele, o chat usa o orb da marca
 * e a seção do Copiloto usa a foto atual — nada quebra. Assim que a imagem for
 * salva em `public/` e o caminho apontado aqui, a Selma aparece em todo lugar.
 *
 * Sugestão de arquivo: PNG de fundo transparente ou branco, corpo inteiro,
 * ~800px de largura. O recorte para o círculo do chat é feito por CSS.
 */
export const SELMA = {
  nome: "Selma",
  papel: "Copiloto SS",
  /** Alt text descritivo para as imagens da Selma. */
  alt: "Selma, copiloto de IA para motoristas da SS Telemática",
  /** Corpo inteiro — usado na seção do Copiloto na home. */
  avatar: "/selma.webp",
  /** Recorte do rosto — usado no círculo do chat. Cai para `avatar` se vazio. */
  avatarRosto: "/selma-rosto.png",
};

/**
 * Imagens de protótipo, servidas por URL externa.
 *
 * NENHUMA delas é definitiva. Enquanto `IMAGENS_PROVISORIAS` for true, o site
 * mostra uma tarja sobre cada uma para que ninguém publique por engano.
 *
 * Procedência:
 *  - `frota*`: Pexels, licença livre para uso comercial, sem atribuição
 *    obrigatória. Servem como ilustração de segmento — não são veículos de
 *    clientes da SS nem têm os adesivos da marca.
 *  - `folha`: hospedada em site de terceiro e provavelmente licenciada para
 *    uso exclusivo dele. Entrou a pedido, só para o protótipo — TROCAR antes
 *    de qualquer publicação. Ver nota no README.
 *
 * Para o site definitivo: fotografar veículos reais de clientes já adesivados
 * (com autorização de uso de imagem por escrito), colocar os arquivos em
 * `src/assets/` e importá-los em `GaleriaFrota.tsx`.
 */
/**
 * Fotos oficiais da SS (pasta `public/imagens-ss/`, com a marca aplicada).
 *
 * Convenção do cliente: cada seção é uma subpasta; onde há "principal" + outras,
 * vira carrossel (principal primeiro). Onde há uma foto só, é imagem única.
 *
 * Caminhos em kebab-case, sem espaço nem acento (bom para SEO/URLs). Para
 * trocar/atualizar, substitua o arquivo em `public/imagens-ss/` mantendo o nome.
 */
const ssImg = (p: string) => `/imagens-ss/${p}`;

export const FOTOS = {
  heroFundo: ssImg("ss-gestao-frota.jpg"),
  heroPainel: ssImg("ss-central-monitoramento-v3-logo-corrigido.jpg"),
  heroTelemetria: ssImg("telemetria.webp"),
  fleetManager: [
    ssImg("fleet-manager/principal.jpg"),
    ssImg("fleet-manager/ss-ia-priorizacao.jpg"),
  ],
  reducaoCusto: ssImg("reducao-de-custo/ss-reducao-custo-frota-logo-corrigido.jpg"),
  pneus: ssImg("ss-monitoramento-pneus-logo-corrigido.jpg"),
  cameras: [ssImg("videotelemetria/ss-videotelemetria-v3-logo-corrigido.jpg")],
  euro6: [ssImg("euro-6/principal.jpg"), ssImg("euro-6/ss-euro6-regeneracao.jpg")],
  urbano: [ssImg("urbano/principal.jpg"), ssImg("urbano/ss-onibus-urbano.jpg")],
  fretamento: [
    ssImg("fretamento/principal.jpg"),
    ssImg("fretamento/ss-onibus-dd-v3-logo-corrigido.jpg"),
  ],
  carga: [ssImg("carga/principal.jpg"), ssImg("carga/ss-caminhao-v3-logo-corrigido.jpg")],
  clube: ssImg("ss-clube-fidelidade-motorista.jpg"),
  indicacao: ssImg("ss-programa-indicacao.jpg"),
  grupoModaxoBanner: ssImg("ss-banner-modaxo.jpg"),
};

/**
 * A folha do Selo Verde ainda é imagem de terceiro (provisória). As demais fotos
 * já são oficiais da SS, então a tarja só se aplica a ela.
 */
export const IMAGENS_PROVISORIAS = true;

export const IMAGENS = {
  frotaCarreta:
    "https://images.pexels.com/photos/8994766/pexels-photo-8994766.jpeg?auto=compress&cs=tinysrgb&w=1400",
  frotaOnibus:
    "https://images.pexels.com/photos/13012408/pexels-photo-13012408.jpeg?auto=compress&cs=tinysrgb&w=1400",
  frotaFretamento:
    "https://images.pexels.com/photos/18029613/pexels-photo-18029613.jpeg?auto=compress&cs=tinysrgb&w=1400",
  folha:
    "https://forbes.com.br/wp-content/uploads/2022/02/Agro_Estados-Unidos-terao-US-1-bilhao-para-promover-agricultura-mais-sustentavel.jpg",
};

export const CONTACT = {
  email: "sales@sstelematica.com.br",
  phone: "+55 31 98403-3906",
  whatsapp: "5531984033906", // dígitos com DDI (55) + DDD (31) + número
  cnpj: "01.862.295/0005-00", // com pontuação (formato aceito para taxID)
  address: "R. Alvarenga Peixoto, 295, Andar 4 — Lourdes, Belo Horizonte/MG — CEP 30.180-120",
  supportHours: "Suporte via chat, e-mail e WhatsApp",
};

/** Mensagem padrão ao abrir o WhatsApp pelos botões de "Falar com especialista". */
export const WHATSAPP_ESPECIALISTA =
  "Olá! Vim pelo site da SS Telemática e gostaria de falar com um especialista.";

export const whatsappLink = (message: string) =>
  CONTACT.whatsapp ? `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}` : null;

/**
 * Destino dos botões "Falar com especialista": abre o WhatsApp quando há número;
 * senão, cai na página de contato. Sempre retorna um href válido.
 */
export const especialistaHref = () => whatsappLink(WHATSAPP_ESPECIALISTA) ?? "/contato";
export const especialistaAbreWhatsapp = () => Boolean(CONTACT.whatsapp);

export const absoluteUrl = (path: string) =>
  `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/** URLs de redes sociais preenchidas — usadas em `sameAs` do JSON-LD. */
export const socialUrls = () => Object.values(SITE.social).filter(Boolean) as string[];

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
  /** Imagem social específica da página (ex.: capa de post). Absoluta ou "/...". */
  image?: string;
  /** "website" (padrão) ou "article" para posts do blog. */
  type?: "website" | "article";
  /** Bloqueia indexação (ex.: páginas utilitárias). */
  noindex?: boolean;
}) {
  const url = absoluteUrl(opts.path);
  const image = absoluteUrl(opts.image ?? SITE.ogImage);
  const ogTitle = opts.ogTitle ?? opts.title;
  const ogDescription = opts.ogDescription ?? opts.description;
  const meta = [
    { title: opts.title },
    { name: "description", content: opts.description },
    { property: "og:type", content: opts.type ?? "website" },
    { property: "og:title", content: ogTitle },
    { property: "og:description", content: ogDescription },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { name: "twitter:title", content: ogTitle },
    { name: "twitter:description", content: ogDescription },
    { name: "twitter:image", content: image },
  ];
  if (opts.noindex) meta.push({ name: "robots", content: "noindex, nofollow" });
  return { meta, links: [{ rel: "canonical", href: url }] };
}

/**
 * JSON-LD da plataforma SS como SoftwareApplication, com os três planos como
 * offers. Sem preço (o site não publica valores) — os offers trazem só nome e
 * categoria, para não inventar dados.
 */
export function softwareApplicationJsonLd() {
  const planos = ["SS Start", "SS Performance", "SS Evolution"];
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Plataforma SS Telemática",
    description: SITE.description,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web, Android, iOS",
    url: SITE_URL,
    inLanguage: "pt-BR",
    provider: { "@type": "Organization", name: SITE.name, url: SITE_URL },
    offers: planos.map((nome) => ({
      "@type": "Offer",
      name: nome,
      category: "Gestão de frotas",
      availability: "https://schema.org/InStock",
      url: absoluteUrl("/#produtos"),
    })),
  };
}

/**
 * JSON-LD LocalBusiness (subtipo ProfessionalService) com os dados da sede —
 * CNPJ (taxID), telefone, e-mail, endereço e redes. Usado só na home e na
 * página de contato. Separado do Organization.
 */
export function localBusinessJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE.name,
    url: SITE_URL,
    image: absoluteUrl(SITE.ogImage),
    taxID: CONTACT.cnpj,
    email: CONTACT.email,
    telephone: CONTACT.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: `${ENDERECO.rua} — ${ENDERECO.bairro}`,
      addressLocality: ENDERECO.cidade,
      addressRegion: ENDERECO.estado,
      postalCode: ENDERECO.cep,
      addressCountry: ENDERECO.pais,
    },
    ...(socialUrls().length ? { sameAs: socialUrls() } : {}),
  };
}

/** JSON-LD de artigo (blog). Retorna um objeto pronto para `JSON.stringify`. */
export function articleJsonLd(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: opts.title,
    description: opts.description,
    image: absoluteUrl(opts.image ?? SITE.ogImage),
    datePublished: opts.datePublished,
    dateModified: opts.dateModified ?? opts.datePublished,
    author: { "@type": "Organization", name: opts.author ?? SITE.name },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: { "@type": "ImageObject", url: absoluteUrl("/ss-orb.png") },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(opts.path) },
  };
}

/** JSON-LD de trilha de navegação (breadcrumbs) — bom para SEO de subpáginas. */
export function breadcrumbJsonLd(trail: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: absoluteUrl(t.path),
    })),
  };
}
