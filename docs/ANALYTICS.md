# Medição do site: GA4, GTM e Apollo

O código já está pronto e desligado. Enquanto os IDs não forem preenchidos, nada
carrega, nem o banner de cookies aparece — o site funciona exatamente como antes.

## O que cada ferramenta responde

As duas fazem coisas diferentes. Não é escolher uma.

| | Google Analytics (GA4) | Apollo |
|---|---|---|
| Pergunta | O site funciona? | Quem entrou? |
| Entrega | Visitas, origem do tráfego, páginas, tempo, conversões | Nome da empresa, setor, porte, contatos |
| Identifica pessoa | Nunca (proibido pelos termos) | Só nos EUA |
| Identifica empresa | Não | Sim, quando dá match |

**Duas expectativas a calibrar com o time comercial antes de ligar o Apollo:**

1. Identificação em nível de pessoa (nome, e-mail) não funciona no Brasil. Está
   na própria documentação do Apollo. Aqui teremos empresa, nunca pessoa.
2. O IP reverso só acerta quando o visitante está em rede corporativa com IP
   mapeado. Quem acessa por celular, 4G ou link residencial não aparece. No B2B
   brasileiro a taxa de match costuma ficar bem abaixo do que o material de
   vendas promete.

Quem realmente entrega nome e e-mail é o formulário. O papel do Apollo é
enriquecer o que o formulário captura.

## Estado atual

Tudo já está ligado com os IDs reais:

| | ID | Situação |
|---|---|---|
| GTM | `GTM-PTNCCVB9` | Carregando, sem tags configuradas ainda |
| GA4 | `G-RSDMNS5KE5` | Carregando direto pelo site |
| Apollo | `699eff9dee7a1c00119c7cc8` | Carrega após aceite de marketing |

O GA4 é disparado **pelo site**, não pelo GTM (`ANALYTICS.ga4ViaGtm: false`).
Foi a escolha para não ficar sem medição enquanto o painel do GTM não é montado.
O GTM carrega junto e fica pronto para receber outras tags.

### Quando migrar o GA4 para dentro do GTM

Faz sentido quando o GTM já for o lugar onde as tags são gerenciadas — aí tudo
fica num painel só. A ordem importa:

1. No GTM, criar tag **Google Tag** com o ID `G-RSDMNS5KE5`, acionador "Todas as
   páginas". Publicar.
2. Só então virar `ANALYTICS.ga4ViaGtm` para `true` em `src/lib/site-config.ts`.

Inverter a ordem faz cada pageview contar duas vezes durante a janela em que os
dois estiverem ativos.

### Trocar de conta ou desligar

Editar `ANALYTICS` em `src/lib/site-config.ts`. Campo vazio = script não carrega.
Para desligar o Apollo, por exemplo, basta esvaziar `apolloAppId`.

Se preferir não versionar os IDs, as variáveis `VITE_GTM_ID`, `VITE_GA4_ID` e
`VITE_APOLLO_APP_ID` têm prioridade sobre o arquivo.

### Nunca colar os snippets que o Google entrega

Tanto o GA4 quanto o GTM entregam um bloco `<script>` pronto na tela de
instalação. **Nenhum dos dois deve ser colado neste projeto.**

O código já carrega os dois, com esses mesmos IDs e sob consentimento. Colar os
snippets duplicaria a contagem e furaria o banner de cookies — os snippets do
Google não conhecem o Consent Mode declarado aqui e disparam antes de o
visitante decidir.

Dos snippets, o que importa é só o ID.

**O `<noscript>` do GTM também fica de fora.** Ele existe para visitantes sem
JavaScript, e é justamente aí que o problema aparece: o banner de consentimento
é React, então sem JavaScript ele não roda. O iframe rastrearia essas visitas
sem consentimento nenhum. Como o site é uma aplicação React que também não
funciona sem JavaScript, a perda de medição é irrelevante.

## Consentimento (LGPD)

O banner aparece na primeira visita. Recusar tem o mesmo peso visual que aceitar
— banner que esconde a recusa é vício de consentimento sob o art. 8º.

Duas categorias, escolhidas separadamente:

- **Medição de audiência** → GA4
- **Prospecção comercial** → Apollo

A decisão fica no `localStorage` (`ss-consent-v1`) e vale 180 dias. Depois
disso, perguntamos de novo. Para reperguntar a todo mundo antes do prazo, subir
a versão da chave em `src/lib/analytics.ts`.

Revogar é possível a qualquer momento pelo link **Preferências de cookies** no
rodapé e pelo botão dentro da Política de Privacidade.

### Uma decisão que vale revisar com o jurídico

O Google carrega desde o início da visita, em **Consent Mode v2**: presente,
mas sem gravar cookie enquanto o consentimento estiver negado. É o padrão da
indústria e aceito sob o GDPR, que é mais rigoroso que a LGPD. A vantagem é
medir tráfego agregado inclusive de quem ignora o banner.

Se o jurídico preferir leitura mais restritiva — não carregar nada do Google
antes do aceite —, mover as chamadas `loadGtm()` e `loadGa4()` para dentro do
bloco condicional em `src/components/site/Analytics.tsx`. O comentário no
arquivo marca o ponto exato.

O Apollo **nunca** carrega antes do aceite: ele não tem modo de consentimento,
então a única forma de respeitar a recusa é não injetar o script.

## Eventos já instrumentados

| Evento | Quando dispara | Parâmetros |
|---|---|---|
| `page_view` | Cada navegação (SPA) | `page_location`, `page_title` |
| `generate_lead` | Formulário enviado com sucesso | `form_tipo`, `frota`, `segmento`, `page_path` |
| `form_erro` | Falha de validação, servidor ou rede | `form_tipo`, `motivo`, `campos` |
| `click_whatsapp` | Qualquer link `wa.me` | `link_text`, `secao`, `page_path` |
| `click_email` | Qualquer link `mailto:` | `link_text`, `secao` |
| `click_telefone` | Qualquer link `tel:` | `link_text`, `secao` |

Os cliques são capturados por listener delegado no `document`. Vale para
qualquer CTA do site, inclusive os que ainda vão ser criados — não precisa
instrumentar componente por componente.

Para separar "WhatsApp do rodapé" de "WhatsApp da página de produto" nos
relatórios, colocar `data-secao="rodape"` em qualquer elemento acima do link.

### Fazer os eventos aparecerem no GA4

Na configuração atual (`ga4ViaGtm: false`), os eventos vão **direto** para o
GA4. Só falta marcá-los como conversão em GA4 → Administrador → Eventos →
"Marcar como evento principal". Vale marcar `generate_lead`.

Depois de migrar o GA4 para dentro do GTM, um evento no `dataLayer` deixa de
chegar sozinho e passa a exigir, para cada um:

1. GTM → Acionadores → Novo → **Evento personalizado**, nome exatamente igual ao
   da tabela acima (ex.: `generate_lead`).
2. GTM → Tags → Novo → **Google Analytics: evento do GA4**, usando esse
   acionador.

Nenhum evento envia nome, e-mail ou telefone. Além de proibido pelos termos do
Google, é desnecessário: o lead já chega pela rota `/api/leads`.

## Como testar

1. **Banner:** abrir o site em aba anônima. Deve aparecer. Escolher, recarregar,
   e ele não volta.
2. **Recusa funciona:** recusar tudo, abrir DevTools → Network, filtrar por
   `apollo`. Não pode haver requisição nenhuma.
3. **GA4:** GA4 → Administrador → DebugView, ou o relatório de Tempo real.
4. **GTM:** botão "Visualizar" no painel do GTM abre o Tag Assistant.
5. **Eventos:** no DevTools → Console, rodar `window.dataLayer` e conferir se os
   eventos aparecem ao enviar um formulário ou clicar no WhatsApp.

## Arquivos

```
src/lib/site-config.ts              → ANALYTICS: os IDs
src/lib/analytics.ts                → consentimento, carga dos scripts, track()
src/components/site/Analytics.tsx   → injeta scripts, pageview SPA, cliques
src/components/site/CookieConsent.tsx → banner e painel de preferências
src/routes/__root.tsx               → Consent Mode no <head>
src/routes/politica-de-privacidade.tsx → seção 3
```
