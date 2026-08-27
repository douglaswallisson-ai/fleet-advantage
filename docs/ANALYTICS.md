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

## Como ligar

### 1. Google Tag Manager (recomendado fazer primeiro)

1. Criar conta em [tagmanager.google.com](https://tagmanager.google.com), tipo de
   container "Web".
2. Copiar o ID no formato `GTM-XXXXXXX`.
3. Colar em `src/lib/site-config.ts` → `ANALYTICS.gtmId`.

Com o GTM no ar, qualquer ferramenta futura (pixel do LinkedIn, Meta, Hotjar)
entra pelo painel, sem tocar no código de novo.

### 2. Google Analytics 4

1. Criar propriedade em [analytics.google.com](https://analytics.google.com).
2. Copiar o ID de medição, formato `G-XXXXXXXXXX`.
3. **Com GTM:** criar no GTM uma tag "Google Tag" com esse ID, disparando em
   "Todas as páginas". Deixar `ANALYTICS.ga4Id` vazio no código.
4. **Sem GTM:** colar o ID em `ANALYTICS.ga4Id`. O site carrega o GA4 direto.

> Preencher os dois campos e também configurar o GA4 dentro do GTM faz cada
> pageview contar duas vezes. O código evita isso ignorando `ga4Id` quando há
> `gtmId` — mas a duplicação volta se a tag existir nos dois lugares.

### 3. Apollo

O `appId` já está preenchido (`699eff9dee7a1c00119c7cc8`, extraído do painel do
Apollo). Para trocar de conta, editar `ANALYTICS.apolloAppId`.

Para desligar o Apollo, basta esvaziar esse campo.

### Alternativa: variáveis de ambiente

Se preferir não versionar os IDs, use `VITE_GTM_ID`, `VITE_GA4_ID` e
`VITE_APOLLO_APP_ID`. Elas têm prioridade sobre o que está no arquivo.

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

Com GTM, um evento no `dataLayer` não chega sozinho ao GA4. Para cada um:

1. GTM → Acionadores → Novo → **Evento personalizado**, nome exatamente igual ao
   da tabela acima (ex.: `generate_lead`).
2. GTM → Tags → Novo → **Google Analytics: evento do GA4**, usando esse
   acionador.
3. Marcar como conversão em GA4 → Administrador → Eventos.

Sem GTM, os eventos vão direto para o GA4 e só falta marcá-los como conversão.

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
