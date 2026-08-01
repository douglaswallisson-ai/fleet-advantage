/**
 * Conteúdo do blog — fonte única dos artigos.
 *
 * Não há CMS: cada post é um objeto neste arquivo. Para publicar um novo
 * artigo, copie um bloco de `POSTS`, troque os campos e coloque a imagem de
 * capa em `public/blog/` (aponte em `cover`). A ordem de exibição é por data
 * (mais recente primeiro), calculada automaticamente.
 *
 * O corpo (`body`) é uma lista de blocos simples — sem markdown, para manter o
 * render seguro e no estilo do site. Tipos: "h2", "p" e "ul".
 */

export type Bloco =
  { tipo: "h2"; texto: string } | { tipo: "p"; texto: string } | { tipo: "ul"; itens: string[] };

export type Post = {
  slug: string;
  titulo: string;
  resumo: string;
  /** ISO: "2026-08-01". */
  data: string;
  autor?: string;
  categoria: string;
  /** Capa em public/blog/… (1200×630). Vazio usa a capa padrão do site. */
  cover?: string;
  /** Minutos de leitura (opcional; calculado se ausente). */
  leituraMin?: number;
  body: Bloco[];
};

export const POSTS: Post[] = [
  {
    slug: "da-telemetria-a-decisao",
    titulo: "Da telemetria à decisão: por que dado não basta",
    resumo:
      "Frotas nunca tiveram tantos dados — e ainda assim decidem no escuro. Veja como a IA transforma telemetria em ação priorizada.",
    data: "2026-08-01",
    categoria: "Gestão de frotas",
    cover: "",
    body: [
      {
        tipo: "p",
        texto:
          "Toda operação de transporte hoje gera um oceano de dados: posição, consumo, temperatura de pneus, comportamento de condução, eventos de câmera. O problema deixou de ser coletar — passou a ser decidir o que fazer com tudo isso antes que vire custo.",
      },
      { tipo: "h2", texto: "O relatório que ninguém lê" },
      {
        tipo: "p",
        texto:
          "O modelo antigo entregava relatórios. Muitos. E quanto mais gráfico, menos clareza sobre a próxima ação. O gestor abre a segunda-feira com dezenas de alertas e nenhuma prioridade — e o que era para ajudar vira ruído.",
      },
      { tipo: "h2", texto: "Decisão priorizada por IA" },
      {
        tipo: "p",
        texto:
          "A virada é simples de enunciar e difícil de executar: em vez de mostrar tudo, mostrar as poucas ações que mais movem o resultado hoje. É o que faz o IA Fleet Manager da SS — lê milhões de eventos e devolve as três decisões de maior impacto.",
      },
      {
        tipo: "ul",
        itens: [
          "Menos alertas, mais ações priorizadas.",
          "Diagnóstico em linguagem natural, não em planilha.",
          "Foco no que reduz custo e aumenta segurança agora.",
        ],
      },
      {
        tipo: "p",
        texto:
          "Dado é matéria-prima. Decisão é entrega. É essa diferença que separa uma operação que reage de uma que antecipa.",
      },
    ],
  },
  {
    slug: "manutencao-preditiva-na-pratica",
    titulo: "Manutenção preditiva na prática: parar antes da parada",
    resumo:
      "Trocar a manutenção corretiva pela preditiva é o caminho mais direto para cortar paradas não programadas. Como começar.",
    data: "2026-07-20",
    categoria: "Manutenção",
    cover: "",
    body: [
      {
        tipo: "p",
        texto:
          "Parada não programada é o custo mais caro de uma frota — não pela peça, mas pela operação que trava junto. A manutenção preditiva existe para transformar a surpresa em agendamento.",
      },
      { tipo: "h2", texto: "Do calendário ao sensor" },
      {
        tipo: "p",
        texto:
          "A manutenção preventiva segue o calendário; a preditiva segue o veículo. Sensores de pneu, dados de motor e padrões de condução indicam quando algo vai falhar — e a IA sugere a intervenção antes do sintoma virar problema.",
      },
      { tipo: "h2", texto: "Por onde começar" },
      {
        tipo: "ul",
        itens: [
          "Monitore pressão e temperatura de pneus em tempo real.",
          "Acompanhe DPF, AdBlue e ciclos de regeneração na frota EURO 6.",
          "Deixe a IA priorizar quais veículos inspecionar primeiro.",
        ],
      },
      {
        tipo: "p",
        texto:
          "O ganho não é só financeiro: cada parada evitada é uma viagem cumprida, um passageiro atendido, uma entrega no prazo.",
      },
    ],
  },
];

/** Posts ordenados do mais recente para o mais antigo. */
export const postsRecentes = () => [...POSTS].sort((a, b) => (a.data < b.data ? 1 : -1));

export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug);

/** Estima minutos de leitura a partir do corpo. */
export function leituraMinutos(post: Post) {
  if (post.leituraMin) return post.leituraMin;
  const palavras = post.body.reduce((n, b) => {
    if (b.tipo === "ul") return n + b.itens.join(" ").split(/\s+/).length;
    return n + b.texto.split(/\s+/).length;
  }, 0);
  return Math.max(1, Math.round(palavras / 200));
}

/** Data ISO → "1 de agosto de 2026". */
export function dataExtenso(iso: string) {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
}
