---
name: ss-brand-design
description: >-
  Sistema de design da SS Telemática — cores, tipografia, componentes, movimento,
  regras de imagem, a copiloto Selma, voz de marca e a metodologia de composição.
  Use sempre que for criar, revisar ou estender qualquer material da SS: páginas
  do site, e-mails, apresentações, posts, banners, mockups ou novos componentes.
  Garante que tudo saia com a mesma identidade do site fleet-advantage.
---

# Sistema de Design — SS Telemática

> Documento de referência único da marca. Todos os valores aqui são os que estão
> em produção no site (`src/styles.css` e componentes). Ao criar um material
> novo, **puxe destes tokens** — não invente cores, sombras ou fontes.

O site é **TanStack Start + React 19 + Tailwind CSS v4 + shadcn/ui**, mas este
guia é agnóstico: há um bloco de CSS puro (`:root`) que você pode colar em
qualquer projeto, e uma tabela hex para ferramentas de design.

---

## 1. Fundamento da marca

**Posicionamento:** "Da telemetria à tomada de decisão." A SS não entrega dados,
entrega decisão. Tudo comunica **inteligência que age** — não painéis passivos.

**Personalidade visual:** tecnológica, confiável, brasileira, humana. Azul
corporativo profundo como base, verde como acento de energia/positivo, muito
espaço em branco, cantos generosamente arredondados, sombras suaves e coloridas
(nunca cinza-preto), e movimento sutil e proposital.

**Três traços que definem "parece SS":**
1. Gradiente azul-marinho profundo (`gradient-hero`) nas seções de destaque.
2. Verde-lima (`brand-green`) sempre como acento — CTAs, checks, números, o anel.
3. Cantos `rounded-3xl` (24px) em cards e blocos; `rounded-full` em botões/pílulas.

---

## 2. Cores

### 2.1 Paleta de marca (fonte da verdade em oklch)

| Token | oklch | Hex aprox. | Uso |
|---|---|---|---|
| `--brand-navy` | `oklch(0.32 0.13 260)` | `#20448C` | Cor primária. Botões, títulos de ênfase, base de gradiente. |
| `--brand-blue` | `oklch(0.42 0.16 260)` | `#2651A6` | Azul médio. Fim do gradiente hero, estados. |
| `--brand-sky` | `oklch(0.68 0.14 235)` | `#32A9D9` | Azul-céu. Acento, eyebrows, foco/ring, links de destaque. |
| `--brand-green` | `oklch(0.72 0.18 138)` | `#7FBF50` | Verde-lima. **Acento de ação e positivo** (CTAs, checks, métricas). |
| `--brand-ink` | `oklch(0.15 0.01 260)` | `#0D0D0D` | Texto principal (quase preto azulado). |

### 2.2 Tokens semânticos (modo claro — o único hoje)

| Token | Valor | Papel |
|---|---|---|
| `--background` | `oklch(1 0 0)` | Fundo da página (branco). |
| `--foreground` | `--brand-ink` | Texto padrão. |
| `--card` | `oklch(1 0 0)` | Fundo de cartão. |
| `--primary` | `--brand-navy` | Ação primária. |
| `--primary-foreground` | `oklch(0.99 0 0)` | Texto sobre primária. |
| `--secondary` | `oklch(0.96 0.01 240)` | Faixas/superfícies suaves (`bg-secondary/40`). |
| `--muted` | `oklch(0.96 0.01 240)` | Superfície neutra. |
| `--muted-foreground` | `oklch(0.45 0.02 260)` | Texto secundário/apoio. |
| `--accent` | `--brand-sky` | Acento interativo. |
| `--destructive` | `oklch(0.577 0.245 27.325)` | Erro/alerta. |
| `--border` | `oklch(0.92 0.01 250)` | Bordas e divisórias. |
| `--input` | `oklch(0.92 0.01 250)` | Borda de campo. |
| `--ring` | `--brand-sky` | Anel de foco. |

### 2.3 Navais escuros ad-hoc (para fundos e texto sobre cor)

Aparecem literalmente no código; memorize estes quatro:

| Valor | Onde usar |
|---|---|
| `oklch(0.15 0.03 260)` | **Texto sobre `brand-green`** (botões verdes, pílulas). É o par de contraste do verde. |
| `oklch(0.18 0.06 260)` | Início do gradiente hero; overlays escuros. |
| `oklch(0.16 0.05 260)` | Fundo escuro de heros com foto (Selo Verde). |
| `oklch(0.14 0.03 260)` | Fundo do rodapé. |

### 2.4 Regras de cor (invioláveis)

- **Verde = ação e positivo.** Nunca use verde para texto corrido nem para erro.
- **Texto sobre verde é sempre `oklch(0.15 0.03 260)`**, nunca branco puro
  (contraste insuficiente e "estoura").
- **Sobre o gradiente escuro**, texto é `text-white` (títulos) e `text-white/75`
  ou `/70` (corpo). Apoio bem discreto: `text-white/45`.
- **Nunca sombra cinza/preta.** As sombras são coloridas com a marca (ver §4).
- Superfícies suaves usam `bg-secondary/40` (não cinza neutro).

---

## 3. Gradientes

```css
--gradient-hero:   linear-gradient(135deg, oklch(0.18 0.06 260) 0%, var(--brand-navy) 40%, var(--brand-blue) 100%);
--gradient-accent: linear-gradient(90deg, var(--brand-sky), var(--brand-green));
--gradient-green:  linear-gradient(135deg, var(--brand-green), oklch(0.62 0.18 155));
```

- **`gradient-hero`** — o gradiente-assinatura. Fundo de heros, seções de
  destaque, o painel da Selma, cabeçalho do chat. Sempre com texto branco.
- **`gradient-accent`** (sky→green) — usado em `text-gradient` (palavra em
  destaque no título) e em brilhos/halos. É a "assinatura de energia".
- **`gradient-green`** — discos/selos verdes (ex.: o disco da folha do selo).

**`text-gradient`** (palavra colorida dentro de um título escuro/branco):
```css
background: var(--gradient-accent);
-webkit-background-clip: text; background-clip: text; color: transparent;
```
Uso típico: `<h2>Sustentabilidade que <span class="text-gradient">vira contrato</span>.</h2>`

---

## 4. Sombras / elevação

```css
--shadow-elegant: 0 20px 60px -20px color-mix(in oklab, var(--brand-navy) 40%, transparent);
--shadow-glow:    0 0 60px       color-mix(in oklab, var(--brand-sky)  30%, transparent);
--shadow-card:    0 8px 24px -12px color-mix(in oklab, var(--brand-navy) 20%, transparent);
```

| Sombra | Quando |
|---|---|
| `shadow-card` | Estado de repouso de cartões, botões, campos. |
| `shadow-elegant` | Hover de cartões, elementos flutuantes (imagem do hero, chat, modais). |
| `shadow-glow` | Só em CTAs verdes de máxima ênfase (brilho azul em volta). |

Regra: repouso = `shadow-card`; ao passar o mouse num cartão, sobe para
`shadow-elegant`. A sombra é sempre **azul-marinho translúcida**, nunca preta.

---

## 5. Raios (cantos)

```css
--radius: 0.75rem; /* 12px, base */
```
Escala: `sm = radius−4`, `md = radius−2`, `lg = radius`, `xl = +4`, `2xl = +8`,
`3xl = +12` (→ **24px**).

Uso real (por frequência): `rounded-full` (botões, pílulas, avatares) >
`rounded-xl` (campos, ícones-caixa, chips) > `rounded-3xl` (cartões, blocos,
imagens grandes) > `rounded-2xl` (cartões menores, plaquinhas).

Regra prática: **bloco/cartão = `rounded-3xl`; campo/chip = `rounded-xl`;
qualquer coisa clicável em formato de pílula = `rounded-full`.**

---

## 6. Tipografia

Duas famílias, via Google Fonts:

```
Inter        — pesos 400, 500, 600, 700   → corpo (--font-sans)
Space Grotesk — pesos 500, 600, 700       → títulos h1–h4 (--font-display)
```

```css
--font-display: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
--font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
/* h1–h4 recebem font-display e letter-spacing: -0.02em */
```

### Escala e uso

| Papel | Classes Tailwind | Observações |
|---|---|---|
| H1 (hero) | `text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight` | Space Grotesk. Uma ideia por linha, `<br/>` proposital. |
| H1 (página interna) | `text-4xl md:text-6xl font-bold` | |
| H2 (seção) | `text-4xl md:text-5xl font-bold` | Quase sempre precedido de um eyebrow. |
| H3 (card) | `text-xl md:text-2xl font-bold` | |
| Eyebrow / rótulo | `text-xs font-bold tracking-widest text-brand-sky` + MAIÚSCULAS | O "selo" que abre quase toda seção. |
| Corpo grande | `text-lg text-muted-foreground` (ou `text-white/75` no escuro) | Subtítulos. |
| Corpo | `text-sm md:text-base text-muted-foreground` | |
| Apoio/nota | `text-xs` ou `text-[11px] text-muted-foreground` | Ressalvas, legendas. |
| Micro-rótulo | `text-[10px] font-bold tracking-wider` | Pílulas, plaquinhas. |

Padrão de abertura de seção (memorize — é o esqueleto de tudo):
```
<span class="text-xs font-bold tracking-widest text-brand-sky">EYEBROW</span>
<h2 class="mt-3 text-4xl md:text-5xl font-bold">Título com <span class="text-gradient">palavra</span>.</h2>
<p class="mt-5 text-lg text-muted-foreground">Subtítulo explicativo, 1–2 frases.</p>
```

---

## 7. Layout, grid e ritmo

- **Container:** `mx-auto max-w-7xl px-6` (1280px, 24px de padding lateral).
- **Largura de leitura:** títulos/textos em `max-w-2xl`/`max-w-3xl` dentro do container.
- **Ritmo vertical de seção:** `py-24` (padrão) · `py-20` (mais compacto) ·
  `py-16` (faixas). Alterna fundo claro (branco) e `bg-secondary/40` ou
  `bg-gradient-hero` para dar cadência.
- **Âncora:** seções com `id` levam `scroll-mt-24` (compensa o nav fixo).
- **Grids comuns:** `lg:grid-cols-2` (texto+imagem), `md:grid-cols-3` (cards,
  planos, passos), `gap-6`/`gap-8`/`gap-12`/`gap-16` conforme a densidade.
- **Nav:** `sticky top-0 z-50 h-18 border-b border-border/60 bg-background/85
  backdrop-blur-xl`. Menu some abaixo de `lg`; vira drawer (Sheet).

Alternância de fundo típica de uma página:
`hero (gradient-hero)` → claro → `secondary/40` → claro → `gradient-hero` → claro → rodapé (navy escuro).

---

## 8. Iconografia

- Biblioteca: **lucide-react** (contorno). Nada de ícones sólidos misturados.
- Tamanhos: `h-4 w-4` (inline/checks), `h-5 w-5` (rótulos), `h-6 w-6` (destaque
  em caixa).
- `strokeWidth={1.6}` é o padrão para ícones decorativos; `1.5` para finos;
  `2` para micro-ícones sobre cor.
- **Caixa de ícone** recorrente: `flex h-12 w-12 items-center justify-center
  rounded-xl bg-gradient-hero text-white` (ícone branco sobre gradiente) — ou
  `bg-primary/10 text-primary` em versão clara.
- Check de lista: sempre `Check` em `text-brand-green`, `h-4 w-4 mt-0.5 shrink-0`.

---

## 9. Componentes — receitas

Copie e adapte. Todas usam os tokens acima.

### Botão primário
```
inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm
font-semibold text-primary-foreground shadow-card transition-transform
hover:-translate-y-0.5
```

### CTA verde (máxima ênfase)
```
inline-flex items-center gap-2 rounded-full bg-brand-green px-6 py-3.5 text-sm
font-semibold text-[oklch(0.15_0.03_260)] shadow-glow transition-transform
hover:-translate-y-0.5
```

### Botão secundário / ghost
- Sobre claro: `rounded-full border border-border bg-card px-6 py-3.5 text-sm font-semibold hover:bg-secondary`
- Sobre escuro: `rounded-full border border-white/30 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur hover:bg-white/10`

### Cartão
```
rounded-3xl border border-border bg-card p-8 shadow-card
transition-shadow hover:shadow-elegant
```
Cartão com mídia no topo: imagem em `aspect-[16/9] overflow-hidden` +
`group-hover:scale-105 duration-700`, conteúdo em `p-8` abaixo.

### Pílula / tag
```
rounded-full bg-brand-green px-3 py-1 text-[10px] font-bold tracking-wider
text-[oklch(0.15_0.03_260)]
```
Variante "eyebrow com ícone" sobre escuro:
`rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-widest backdrop-blur`

### Campo de formulário
```
w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none
transition focus:border-brand-sky focus:ring-2 focus:ring-brand-sky/30
```
Estado de erro: troca a borda por `border-destructive` e o ring por `focus:ring-destructive/30`; mensagem em `text-xs text-destructive`.

### Faixa de destaque (call-out escuro no meio da página)
```
rounded-3xl bg-gradient-hero px-6 md:px-14 py-14 text-center text-white
```

### Estatística / número
Número grande em `brand-green`: `text-3xl md:text-5xl font-bold text-brand-green`,
com rótulo em `text-xs`/`text-sm text-muted-foreground` (ou `text-white/60/70` no escuro).

### Plano/tier em destaque
Anel de seleção: `border-brand-sky ring-2 ring-brand-sky/40`. Badge "MAIS
ESCOLHIDO" flutuante: pílula verde `-top-3 left-8`.

---

## 10. Movimento e animação

Sutil, lento, proposital. Tudo respeita `prefers-reduced-motion` (desliga).

| Animação | Definição | Onde |
|---|---|---|
| Hover de botão | `transition-transform hover:-translate-y-0.5` | Todos os botões/CTAs. |
| Hover de imagem em card | `transition-transform duration-500/700 group-hover:scale-105` | Fotos em cartões. |
| Anel do orb | `@keyframes ss-orb-spin` — 360° em **11s** linear infinito | Marca SSOrb. |
| Halo do orb | contrário, **34s** | Halo pontilhado do orb. |
| Ken Burns | zoom `scale(1.04)→(1.18)` + leve pan, **28s** ease-in-out alternate | Imagens de fundo (efeito "vídeo"). |

Bloco de reduced-motion (obrigatório em qualquer material animado):
```css
@media (prefers-reduced-motion: reduce) {
  .ss-orb-ring, .ss-orb-halo, .animate-ken-burns { animation: none; }
  html { scroll-behavior: auto; }
}
```

---

## 11. Imagens e mídia

- **Tratamento:** cantos `rounded-3xl` + `shadow-elegant`. Fotos de fundo de
  hero ficam em `opacity-20`–`opacity-40` sob um overlay do `gradient-hero` ou
  um `bg-gradient-to-b/r` escuro, para o texto branco ler.
- **Movimento tipo vídeo:** componente `Backdrop` aplica Ken Burns na foto; se
  houver um `.mp4/.webm`, troca para `<video>` (autoplay, muted, loop, playsInline)
  usando a foto como `poster`.
- **Enquadramento:** `object-cover` + `object-position` ajustado por foto para
  manter o assunto no recorte (`aspect-[4/3]` ou `[16/9]`).
- **Selma sobre painel azul:** PNG com **fundo removido/transparente** (nunca a
  caixa branca original). Recorte de rosto separado para círculos pequenos.

### Regra de licença (INVIOLÁVEL)
Nunca usar imagem de terceiro sem licença. Fotos vêm de **Pexels/Unsplash/Pixabay**
(licença livre para uso comercial) **ou** são produzidas pela SS. Imagens
provisórias ficam marcadas com tarja "FOTO/IMAGEM PROVISÓRIA" e listadas em
`site-config.ts` (`IMAGENS_PROVISORIAS = true`) até a troca por material próprio
com autorização de uso de imagem por escrito.

---

## 12. A marca animada (SSOrb) e selos

- **SSOrb:** a esfera "SS" do logotipo fica **parada**; o **anel** em volta gira.
  O anel é reconstruído em SVG: arco azul quebrado em **dois trechos desiguais**
  (para a rotação ser perceptível) + traços verdes preenchendo a abertura. Um
  gradiente único `userSpaceOnUse` percorre o anel e nenhum tom desce abaixo de
  ~0.55 de luminosidade (senão o azul some sobre fundo escuro).
- **Onde usar o orb:** heros, CTA final, cabeçalhos institucionais, e como
  ícone do chat (fallback quando não há a Selma).
- **Selo/certificação:** hexágono (vértice no topo) com `gradient` azul→verde;
  microtexto segue as **arestas** do hexágono (polylines), nunca um arco
  circular sobre o hexágono. Texto central curto ("CO₂ REDUZIDO" — **redução**,
  não neutralidade). Cartão-alternativa: disco `gradient-green` com folha +
  "FROTA CERTIFICADA · SS GREEN · ano".

---

## 13. Selma — a copiloto (persona)

- **Quem é:** Selma, a **Copiloto SS**. Ajuda no dia a dia: dúvidas, saúde da
  frota, condução, manutenção preditiva, alertas. Tom acolhedor, "no banco do
  lado, sem julgamento" — colaboração, não fiscalização.
- **Onde aparece:** botão flutuante e cabeçalho do **chat** (recorte do rosto em
  círculo, com pontinho verde de disponibilidade) e na seção "Copiloto do
  Motorista" da home (corpo inteiro sobre painel `gradient-hero`, com plaquinha
  branca "COPILOTO SS / Selma").
- **Assets:** `selma.png` (corpo inteiro, fundo transparente) e
  `selma-rosto.png` (rosto+ombros para círculos). Controlados por `SELMA` em
  `site-config.ts`; a fiação é *gated* (sem arquivo, cai no orb).
- **Voz da Selma (1ª pessoa):** "Oi! Eu sou a Selma, a copiloto da SS…".

---

## 14. Voz e tom (copy)

- **Idioma:** português do Brasil. Direto, confiante, sem jargão vazio.
- **Tese central:** decisão, não dado. "Não entregamos dados. Entregamos decisão."
- **Frases-assinatura:** "Da telemetria à decisão"; "Tecnologia que decide junto";
  "acompanhamento colaborativo" (motorista respeitado, não vigiado).
- **Números com honestidade:** métricas de resultado (−28%, +40%, +32% …) são
  rotuladas como **meta/referência**, com nota de que variam por operação.
  Nunca apresentar projeção como resultado garantido.
- **Sem neutralidade de carbono:** a SS certifica **redução** medida por
  telemetria. Não dizer "neutro/zero" sem compensação auditada.
- **CTAs:** verbo + benefício ("Agendar demo", "Conhecer plataforma", "Simular
  meu plano", "Consultar meu selo").

---

## 15. Acessibilidade e conformidade

- `lang="pt-BR"`; contraste AA (texto sobre verde usa o navy escuro).
- Imagens decorativas com `alt=""`; funcionais com `alt` descritivo; ícones
  puramente visuais com `aria-hidden`.
- Formulários: `label` real (ou `aria-label`), `aria-invalid` + mensagem de erro
  vinculada, consentimento LGPD com link para a Política de Privacidade.
- Honeypot anti-bot invisível em todo formulário público.
- Foco visível: `focus-visible:outline-2 focus-visible:outline-brand-sky`.
- `prefers-reduced-motion` desliga todas as animações.

---

## 16. Como eu construo uma seção (metodologia)

Roteiro que produz "cara de SS" de forma repetível:

1. **Defina o trabalho da seção** numa frase (dor, capacidade, prova, ação).
   A ordem da página é: dor → capacidades → produto → prova → empacotamento → ação.
2. **Escolha o fundo** pela cadência: claro por padrão; `bg-secondary/40` para
   agrupar; `bg-gradient-hero` (texto branco) para os 1–2 momentos de maior peso.
3. **Abra com o trio**: eyebrow (`text-brand-sky`, MAIÚSCULAS) → H2
   (`text-4xl md:text-5xl`, com uma palavra em `text-gradient`) → subtítulo
   (`text-lg text-muted-foreground`).
4. **Estruture o conteúdo** num grid (`lg:grid-cols-2` texto+visual, ou
   `md:grid-cols-3` para 3 itens). `gap-8`/`gap-12`/`gap-16`.
5. **Componha com as receitas** do §9 (cartões `rounded-3xl` + `shadow-card`,
   listas com `Check` verde, pílulas, números em verde).
6. **Um acento verde por seção**, no mínimo: o CTA, um número, ou os checks.
7. **Container e ritmo**: `mx-auto max-w-7xl px-6 py-24`, `scroll-mt-24` se tiver
   âncora.
8. **Movimento comedido**: hover-lift nos botões, `scale-105` nas fotos, e nada
   que não respeite reduced-motion.
9. **CTA ao fim** com verbo + benefício, levando a `/contato` ou à ação da seção.
10. **Revise contra as regras invioláveis** (§17).

---

## 17. Regras invioláveis (checklist final)

- [ ] Cores só dos tokens; verde é acento/positivo; texto sobre verde = `oklch(0.15 0.03 260)`.
- [ ] Sombras coloridas (navy/sky), nunca preto/cinza.
- [ ] Cartão/bloco `rounded-3xl`; pílula/botão `rounded-full`; campo `rounded-xl`.
- [ ] Títulos em Space Grotesk; corpo em Inter; eyebrow abre a seção.
- [ ] Animação sutil + `prefers-reduced-motion`.
- [ ] Imagem só com licença livre ou própria; provisórias com tarja.
- [ ] Métricas como meta, com ressalva; "redução", nunca "neutro".
- [ ] PT-BR; CTA = verbo + benefício.
- [ ] Formulário com label, erro acessível, consentimento LGPD e honeypot.
- [ ] Selma = copiloto acolhedora; fundo do PNG sempre transparente sobre painel.

---

## 18. Bloco de tokens para colar (CSS puro)

Independente de framework — cole num `:root` e use as variáveis.

```css
:root {
  /* Marca */
  --brand-navy:  oklch(0.32 0.13 260);  /* #20448C */
  --brand-blue:  oklch(0.42 0.16 260);  /* #2651A6 */
  --brand-sky:   oklch(0.68 0.14 235);  /* #32A9D9 */
  --brand-green: oklch(0.72 0.18 138);  /* #7FBF50 */
  --brand-ink:   oklch(0.15 0.01 260);  /* #0D0D0D */

  /* Semânticos */
  --background: oklch(1 0 0);
  --foreground: var(--brand-ink);
  --card: oklch(1 0 0);
  --primary: var(--brand-navy);
  --primary-foreground: oklch(0.99 0 0);
  --secondary: oklch(0.96 0.01 240);
  --muted-foreground: oklch(0.45 0.02 260);
  --accent: var(--brand-sky);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.92 0.01 250);
  --ring: var(--brand-sky);
  --on-green: oklch(0.15 0.03 260); /* texto sobre verde */

  /* Gradientes */
  --gradient-hero:   linear-gradient(135deg, oklch(0.18 0.06 260) 0%, var(--brand-navy) 40%, var(--brand-blue) 100%);
  --gradient-accent: linear-gradient(90deg, var(--brand-sky), var(--brand-green));
  --gradient-green:  linear-gradient(135deg, var(--brand-green), oklch(0.62 0.18 155));

  /* Sombras (coloridas) */
  --shadow-elegant: 0 20px 60px -20px color-mix(in oklab, var(--brand-navy) 40%, transparent);
  --shadow-glow:    0 0 60px       color-mix(in oklab, var(--brand-sky)  30%, transparent);
  --shadow-card:    0 8px 24px -12px color-mix(in oklab, var(--brand-navy) 20%, transparent);

  /* Raio base */
  --radius: 0.75rem;

  /* Fontes */
  --font-display: "Space Grotesk", ui-sans-serif, system-ui, sans-serif;
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
}
```

Import das fontes:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap">
```

### Tabela hex (para ferramentas de design que não aceitam oklch)

| Nome | Hex |
|---|---|
| Navy (primária) | `#20448C` |
| Azul médio | `#2651A6` |
| Azul-céu (acento) | `#32A9D9` |
| Verde-lima (ação) | `#7FBF50` |
| Tinta/texto | `#0D0D0D` |
| Texto sobre verde | `#141F3D` (aprox. de `oklch(0.15 0.03 260)`) |
| Fundo | `#FFFFFF` |
| Superfície suave | `#F3F5F9` (aprox. de `oklch(0.96 0.01 240)`) |
| Borda | `#E6E9EE` (aprox. de `oklch(0.92 0.01 250)`) |
| Texto de apoio | `#6B6E78` (aprox. de `oklch(0.45 0.02 260)`) |
| Navy do rodapé | `#0E1626` (aprox. de `oklch(0.14 0.03 260)`) |

> Os hex são aproximações para conveniência. A **fonte da verdade é o oklch** —
> em telas wide-gamut o oklch é mais vivo que o hex sRGB.
