/**
 * Conteúdo do blog — fonte única dos artigos.
 *
 * Não há CMS: cada post é um objeto neste arquivo. Para publicar um novo
 * artigo, copie um bloco de `POSTS`, troque os campos e coloque a imagem de
 * capa em `public/blog/` (aponte em `cover`). A ordem de exibição é por data
 * (mais recente primeiro), calculada automaticamente.
 *
 * O corpo (`body`) é uma lista de blocos simples — sem markdown, para manter o
 * render seguro e no estilo do site. Tipos: "h2", "p", "ul" e "img".
 */

export type Bloco =
  | { tipo: "h2"; texto: string }
  | { tipo: "p"; texto: string }
  | { tipo: "ul"; itens: string[] }
  | { tipo: "img"; src: string; alt: string };

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
  {
    slug: "euro6-chegou-e-agora",
    titulo: "Euro 6 chegou. E agora quem garante que ele funciona na estrada?",
    resumo:
      "O Proconve P8 exige emissão controlada por 6 ou 7 anos, não só no dia da fábrica. Veja onde a maioria das frotas perde esse controle — e como fechar o gap com telemetria.",
    data: "2026-08-06",
    categoria: "Sustentabilidade",
    cover: "/imagens-ss/euro-6/ss-euro6-claro.webp",
    body: [
      {
        tipo: "p",
        texto:
          "Desde 1º de janeiro de 2023, todo caminhão e ônibus novo no Brasil precisa nascer dentro do Euro 6 — aqui batizado de Proconve P8, a fase mais recente do programa de controle de emissões do Conama (Resolução nº 490/2018). Isso significa motor mais limpo, menos NOx, menos hidrocarboneto, menos material particulado saindo do escapamento.",
      },
      {
        tipo: "p",
        texto:
          "Até aqui, é assunto de fabricante de motor. O problema é que a norma não termina quando o caminhão sai de fábrica — ela continua valendo enquanto o veículo roda. E é aí que a conversa muda de motor pra frota.",
      },
      { tipo: "h2", texto: "O que a lei realmente exige" },
      {
        tipo: "p",
        texto:
          'O Proconve P8 não pede só "motor mais limpo uma vez". Ele exige que o veículo se mantenha dentro dos limites de emissão por um período determinado:',
      },
      {
        tipo: "ul",
        itens: [
          "6 anos ou 300.000 km para veículos de carga entre 3,856 e 16 toneladas.",
          "7 anos ou 700.000 km para veículos acima de 16 toneladas.",
        ],
      },
      {
        tipo: "p",
        texto:
          "Ou seja: não é homologação de bancada, é compromisso de longo prazo. E manter esse compromisso depende de como o veículo é operado e mantido no dia a dia — não só da engenharia que saiu de fábrica.",
      },
      {
        tipo: "img",
        src: "/imagens-ss/euro-6/principal.webp",
        alt: "Painel de regeneração EURO 6 em um ônibus, mostrando saturação do filtro DPF e temperatura dos gases",
      },
      { tipo: "h2", texto: "As tecnologias por trás do Euro 6" },
      {
        tipo: "p",
        texto: "Pra chegar nesses números, os motores combinam três frentes:",
      },
      {
        tipo: "ul",
        itens: [
          "SCR (Redução Catalítica Seletiva) — usa Arla 32 como agente redutor, convertendo os gases de escape em nitrogênio e vapor d'água antes de saírem pro ambiente.",
          "EGR (Recirculação dos Gases de Exaustão) — devolve parte do gás de escape pra câmara de combustão, controlando a temperatura e travando a formação de NOx.",
          "Diesel S-10 — combustível com teor reduzido de enxofre, pré-requisito pra essas tecnologias funcionarem sem entupir ou degradar os catalisadores.",
        ],
      },
      {
        tipo: "p",
        texto:
          "O ponto é: essas três frentes são sensíveis à operação real. Falta de Arla, condução que sobrecarrega o sistema, atraso de manutenção — qualquer um desses fatores tira o veículo da curva de emissão que ele foi projetado pra manter.",
      },
      { tipo: "h2", texto: "Onde a maioria das frotas perde o controle" },
      {
        tipo: "p",
        texto:
          "Na prática, poucas transportadoras têm visibilidade real sobre isso. O painel do caminhão avisa quando o Arla está baixo, mas ninguém centraliza esse dado pra frota inteira. O motorista pilota do jeito que sempre pilotou, sem saber que o padrão de condução afeta diretamente o desempenho do EGR. E a manutenção preventiva desses sistemas muitas vezes só acontece depois que o veículo entra em modo de segurança e perde potência na estrada — o que já é sintoma de emissão fora do padrão há tempo.",
      },
      {
        tipo: "p",
        texto:
          'Esse é exatamente o gap entre "meu caminhão é Euro 6" e "meu caminhão está de fato operando dentro do Euro 6".',
      },
      {
        tipo: "img",
        src: "/imagens-ss/euro-6/ss-euro6-regeneracao.webp",
        alt: "Ciclo de regeneração DPF de um veículo EURO 6 monitorado pela plataforma SS",
      },
      { tipo: "h2", texto: "Como a SS Telemática entra nessa equação" },
      {
        tipo: "p",
        texto: "É esse gap que a gente ataca com telemetria. Na prática, isso significa:",
      },
      {
        tipo: "ul",
        itens: [
          "Consumo de Arla monitorado em tempo real, com alerta antes do sistema entrar em modo de segurança e o veículo perder desempenho na estrada.",
          "Score de condução que aponta quando o padrão do motorista está sobrecarregando EGR e SCR — e permite corrigir com treinamento, não só com manutenção corretiva depois do estrago.",
          'Manutenção preditiva dos componentes ligados à emissão, trocando a lógica de "só conserto quando quebra" por "conserto antes de sair da curva de conformidade".',
          "Histórico auditável, pronto pra quando a transportadora precisar comprovar conformidade — seja pra cliente, seja pra regulação, seja pra relatório de sustentabilidade.",
        ],
      },
      {
        tipo: "p",
        texto:
          "No fim das contas, a montadora entrega o hardware certo. A telemetria é o que garante que esse hardware continua entregando o que promete durante os 6 ou 7 anos de vida útil regulatória — com motorista de carne e osso no volante, não só na bancada de homologação.",
      },
      {
        tipo: "p",
        texto:
          "Se sua frota já é Euro 6 mas ainda não tem esse tipo de visibilidade, o motor está pronto — falta o dado.",
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
    if (b.tipo === "img") return n;
    return n + b.texto.split(/\s+/).length;
  }, 0);
  return Math.max(1, Math.round(palavras / 200));
}

/** Data ISO → "1 de agosto de 2026". */
export function dataExtenso(iso: string) {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" });
}
