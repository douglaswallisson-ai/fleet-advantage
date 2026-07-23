# Welcome to your Lovable project

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Open your project in the [Lovable editor](https://lovable.dev) and keep building.

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: connect the project to GitHub and every change made in Lovable is committed straight to your repository.
- **Full ownership**: this code is yours. Push to your repository and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Configuração do site

Dados institucionais (e-mail, telefone, WhatsApp, CNPJ, endereço) ficam em um único
arquivo: `src/lib/site-config.ts`. Campos vazios simplesmente não são renderizados.

### Variáveis de ambiente

| Variável | Onde | Para quê |
| --- | --- | --- |
| `VITE_SITE_URL` | build | Base absoluta de `canonical`, `og:url`, `sitemap.xml` e JSON-LD. Padrão: `https://www.sstelematica.com.br` |
| `LEADS_WEBHOOK_URL` | servidor | Destino dos leads dos formulários. Recebe um POST JSON por envio — compatível com Zapier, Make, n8n, Slack ou endpoint próprio de CRM. |

Sem `LEADS_WEBHOOK_URL` os leads continuam sendo registrados no log do servidor
(procure por `[lead]`), mas ninguém é notificado — configure antes de divulgar o site.

## Built with

- TanStack Start
- TypeScript
- React
- Tailwind CSS
