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
  | { tipo: "ol"; itens: string[] }
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
          "A virada é simples de enunciar e difícil de executar: em vez de mostrar tudo, mostrar as poucas ações que mais movem o resultado hoje. É o que faz o AI Fleet Manager da SS — lê milhões de eventos e devolve as três decisões de maior impacto.",
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
  {
    slug: "obd-ii-ou-can-bus-diferenca-diesel",
    titulo: "OBD-II ou barramento CAN? A diferença aparece no diesel",
    resumo:
      "Duas propostas de telemetria podem parecer iguais na apresentação e entregar coisas completamente diferentes na operação. A diferença está em quantos dados o equipamento consegue ler de dentro do veículo.",
    data: "2026-08-27",
    categoria: "Tecnologia",
    cover: "",
    body: [
      {
        tipo: "p",
        texto:
          "Se você já pediu orçamento de telemetria para a sua frota, provavelmente reparou numa coisa estranha: os preços variam muito mais do que as descrições. Duas propostas dizem quase a mesma coisa — rastreamento em tempo real, relatórios, alertas, telemetria — e uma custa uma fração da outra.",
      },
      {
        tipo: "p",
        texto:
          "Não é margem. Na maioria das vezes, é tecnologia diferente sendo chamada pelo mesmo nome.",
      },
      { tipo: "h2", texto: "Duas formas de ler um veículo" },
      {
        tipo: "p",
        texto:
          "Todo veículo moderno tem uma rede interna de comunicação. É por ela que o computador do motor avisa o câmbio qual é a rotação, e o freio avisa quanto o veículo está andando. Essa rede se chama barramento CAN, e é por ali que passa tudo que o veículo sabe sobre si mesmo.",
      },
      { tipo: "p", texto: "Existem duas maneiras de tirar informação de lá." },
      {
        tipo: "p",
        texto:
          "A primeira é pela porta OBD-II. É aquele conector de 16 pinos que fica embaixo do painel dos carros. Ele foi criado por lei, nos anos 90, com um objetivo específico: permitir que qualquer oficina verifique se o sistema de controle de poluição do carro está funcionando. Não foi feito para gestão de frota — foi feito para teste de emissões.",
      },
      {
        tipo: "p",
        texto:
          "Um aparelho plugado nessa porta funciona por pergunta e resposta. Ele envia uma requisição pedindo um dado, espera o computador do motor responder, recebe, e só então pode pedir o próximo. É como ligar para a portaria para perguntar uma coisa, desligar, e ligar de novo para perguntar outra. Quanto mais informações você quer acompanhar, mais devagar cada uma delas é atualizada.",
      },
      {
        tipo: "p",
        texto:
          "A segunda é lendo o barramento diretamente. Aqui não há pergunta nenhuma. As centrais eletrônicas do veículo já estão transmitindo tudo continuamente — elas precisam fazer isso para o veículo funcionar. O equipamento apenas escuta. A rotação do motor é atualizada cinquenta vezes por segundo. O consumo de combustível, dez vezes por segundo.",
      },
      { tipo: "h2", texto: "O ponto que confunde quase todo mundo: e os pesados?" },
      {
        tipo: "p",
        texto: "Aqui mora a confusão mais comum do setor, e vale desfazer com cuidado.",
      },
      {
        tipo: "p",
        texto:
          "Ônibus e caminhões têm, sim, um sistema de autodiagnóstico obrigatório. O Proconve P7 exige isso desde 2012, e o Proconve P8 — equivalente brasileiro do Euro 6, obrigatório em veículos novos desde janeiro de 2023 — ampliou bastante essa exigência.",
      },
      {
        tipo: "p",
        texto:
          "Só que esse sistema serve para uma coisa só: verificar se o controle de poluição está funcionando. Nível de ARLA 32, estado do filtro de particulado, sensores de emissões. É diagnóstico ambiental, não gestão de frota.",
      },
      {
        tipo: "p",
        texto:
          "E ele não fica na porta de 16 pinos do carro de passeio. Veículos pesados usam um conector diferente e um protocolo diferente, chamado J1939, que é o idioma que ônibus e caminhões falam dentro do barramento CAN.",
      },
      {
        tipo: "p",
        texto:
          "Então a frase correta é esta: veículos pesados têm OBD, mas é OBD de emissões — e os dados que interessam para economia de combustível estão em outro lugar da rede.",
      },
      { tipo: "h2", texto: "O que isso muda na prática" },
      {
        tipo: "p",
        texto: "A diferença não é acadêmica. Ela define quais decisões você consegue tomar.",
      },
      {
        tipo: "p",
        texto:
          "Lendo apenas o que a porta de diagnóstico oferece, você acompanha rotação, velocidade, quilometragem e códigos de falha genéricos. Dá para saber que o veículo rodou, por onde andou e quanto tempo ficou parado.",
      },
      {
        tipo: "p",
        texto:
          "Lendo o barramento diretamente, entram informações que simplesmente não existem do outro lado:",
      },
      {
        tipo: "ul",
        itens: [
          "Consumo instantâneo medido pelo próprio motor, em litros por hora — não estimado por cálculo indireto.",
          "Consumo acumulado, o total real gasto no período.",
          "Marcha engatada, que mostra quem está rodando na faixa errada de rotação.",
          "Uso do freio motor, que separa condução econômica de condução que só desgasta freio.",
          "Torque e carga real do motor, que mostram quem está forçando a máquina.",
          "Nível e consumo de ARLA 32 e estado da regeneração do filtro.",
          "Horímetro, peso por eixo, dados de freio e de tacógrafo.",
        ],
      },
      {
        tipo: "p",
        texto:
          "Repare no fio que une essa lista. É tudo aquilo que responde como o veículo rodou — não apenas que ele rodou.",
      },
      {
        tipo: "p",
        texto:
          "E é aí que está o dinheiro. Combustível é a segunda maior despesa de uma operação de transporte, atrás apenas da folha. Qualquer programa de economia de diesel depende de uma coisa antes de qualquer outra: medir o consumo, não estimá-lo. Um sistema que calcula o gasto por dedução tem margem de erro de vários pontos percentuais — o suficiente para inviabilizar a conta que justificou a contratação.",
      },
      { tipo: "h2", texto: "Cinco perguntas para fazer ao seu fornecedor" },
      {
        tipo: "p",
        texto:
          "Você não precisa entender de protocolo para separar uma coisa da outra. Precisa fazer as perguntas certas. Estas cinco resolvem em cinco minutos:",
      },
      {
        tipo: "ol",
        itens: [
          "O sistema mostra o consumo instantâneo, em litros por hora, medido pela central eletrônica do motor?",
          "Consigo ver a marcha engatada e o uso do freio motor por trecho da rota?",
          "O equipamento acompanha o nível e o consumo de ARLA 32?",
          "Como o equipamento é instalado — plugado numa porta acessível ou fixo, ligado ao barramento?",
          "Quantos parâmetros ele lê nos modelos de veículo que eu tenho na frota, especificamente?",
        ],
      },
      {
        tipo: "p",
        texto:
          "A última é a mais reveladora. Cada montadora organiza seus dados de um jeito, e cobrir Mercedes-Benz, Volvo, Scania, Volkswagen, Iveco e DAF exige um trabalho de mapeamento que leva anos. A resposta a essa pergunta costuma separar quem lê o barramento de verdade de quem lê um pouco.",
      },
      { tipo: "h2", texto: "Onde a SS Telemática está nessa história" },
      {
        tipo: "p",
        texto:
          "A leitura direta do barramento CAN é o que a SS faz desde sempre, em frota pesada de transporte de passageiros e de carga. Não é um módulo adicional nem um pacote premium — é o ponto de partida do produto.",
      },
      {
        tipo: "p",
        texto:
          "E vale dizer com todas as letras: não estamos pedindo que você acredite na nossa palavra. Estamos sugerindo que você faça as cinco perguntas acima para todos os fornecedores que estiver avaliando, inclusive para nós. Se a resposta de alguém for melhor que a nossa, é o fornecedor certo.",
      },
      {
        tipo: "p",
        texto:
          "O que não recomendamos é comparar apenas a mensalidade. Ela é a parte mais fácil de comparar e a menos importante da conta.",
      },
      {
        tipo: "p",
        texto:
          "Quer testar na sua frota? Podemos rodar um diagnóstico nos modelos que você tem hoje e mostrar exatamente quais parâmetros conseguimos ler em cada um. Sem compromisso.",
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
    if (b.tipo === "ul" || b.tipo === "ol") return n + b.itens.join(" ").split(/\s+/).length;
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
