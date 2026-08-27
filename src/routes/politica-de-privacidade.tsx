import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { CONTACT, SITE, pageHead } from "@/lib/site-config";
import { OPEN_CONSENT_EVENT } from "@/lib/analytics";

export const Route = createFileRoute("/politica-de-privacidade")({
  component: Privacidade,
  head: () =>
    pageHead({
      path: "/politica-de-privacidade",
      title: "Política de Privacidade — SS Telemática",
      description:
        "Como a SS Telemática coleta, usa, armazena e protege os dados pessoais informados neste site, conforme a LGPD (Lei 13.709/2018).",
    }),
});

const UPDATED_AT = "27 de agosto de 2026";

function Privacidade() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <section className="bg-gradient-hero py-20 text-white">
          <div className="mx-auto max-w-3xl px-6">
            <span className="text-xs font-bold tracking-widest text-brand-green">LGPD</span>
            <h1 className="mt-4 text-4xl font-bold md:text-5xl">Política de Privacidade</h1>
            <p className="mt-4 text-sm text-white/70">Última atualização: {UPDATED_AT}</p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-16">
          <div className="mb-10 rounded-xl border border-brand-sky/40 bg-brand-sky/5 p-4 text-xs text-muted-foreground">
            <strong className="text-foreground">Antes de publicar:</strong> este texto cobre o que o
            site efetivamente coleta hoje, mas precisa de revisão jurídica e do preenchimento dos
            dados do controlador (razão social, CNPJ, endereço e canal do encarregado) em{" "}
            <code>src/lib/site-config.ts</code>.
          </div>

          <Block title="1. Quem é o controlador">
            <p>
              {SITE.legalName}
              {CONTACT.cnpj ? `, inscrita no CNPJ ${CONTACT.cnpj}` : ""}
              {CONTACT.address ? `, com sede em ${CONTACT.address}` : ""}, é a controladora dos
              dados pessoais coletados neste site, nos termos da Lei 13.709/2018 (LGPD).
            </p>
          </Block>

          <Block title="2. Quais dados coletamos">
            <p>Coletamos apenas o que você informa voluntariamente nos formulários do site:</p>
            <ul>
              <li>
                <strong>Formulário de contato:</strong> nome, e-mail, telefone/WhatsApp, empresa,
                porte da frota e a mensagem que você escrever.
              </li>
              <li>
                <strong>Formulário de indicação:</strong> seus dados de contato e os dados de
                contato da empresa que você indica.
              </li>
              <li>
                <strong>Dados técnicos:</strong> registros de acesso ao servidor (endereço IP,
                data/hora e página acessada), gerados automaticamente e mantidos por obrigação
                legal.
              </li>
            </ul>
            <p>
              Também usamos cookies e ferramentas de medição, detalhados na seção 3. Não coletamos
              dados sensíveis nem dados bancários por meio deste site — a chave PIX do Programa de
              Indicação é solicitada em canal próprio, após a ativação do contrato.
            </p>
          </Block>

          <Block title="3. Cookies e ferramentas de medição">
            <p>
              Além dos cookies essenciais — que só fazem o site funcionar e guardar a sua escolha
              aqui —, usamos duas ferramentas de terceiros. Nenhuma delas carrega antes de você
              decidir no banner de cookies.
            </p>
            <ul>
              <li>
                <strong>Google Analytics (GA4):</strong> mede audiência de forma agregada — número
                de visitas, origem do tráfego, páginas acessadas e tempo de permanência. Não
                identifica você individualmente e não recebe seu nome, e-mail ou telefone.
              </li>
              <li>
                <strong>Apollo:</strong> tenta identificar a <em>empresa</em> do visitante a partir
                do endereço IP de rede corporativa, para que nosso time comercial saiba quais
                organizações demonstraram interesse. Não identifica pessoas físicas.
              </li>
            </ul>
            <p>
              Base legal: consentimento (art. 7º, I) para as duas ferramentas, e legítimo interesse
              (art. 7º, IX) para os cookies essenciais. Os dados podem ser tratados em servidores
              fora do Brasil, conforme os contratos e cláusulas-padrão de cada fornecedor.
            </p>
            <p>Você pode mudar de ideia quando quiser, sem prejuízo nenhum ao uso do site:</p>
            <p>
              <button
                onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))}
                className="rounded-full border border-input px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
              >
                Revisar minhas preferências de cookies
              </button>
            </p>
          </Block>

          <Block title="4. Para que usamos">
            <ul>
              <li>Responder à sua solicitação e conduzir a negociação comercial.</li>
              <li>Entrar em contato com a empresa indicada e apurar a recompensa do programa.</li>
              <li>Cumprir obrigações legais e regulatórias.</li>
            </ul>
            <p>
              Base legal: consentimento (art. 7º, I), execução de contrato ou diligências
              preliminares (art. 7º, V) e legítimo interesse para prospecção B2B (art. 7º, IX).
            </p>
          </Block>

          <Block title="5. Se você indicou alguém">
            <p>
              Ao indicar um contato, você declara ter autorização dessa pessoa para compartilhar os
              dados dela conosco. Ao primeiro contato, informamos ao indicado quem fez a indicação e
              como ele pode solicitar a exclusão dos dados.
            </p>
          </Block>

          <Block title="6. Com quem compartilhamos">
            <p>
              Com fornecedores de infraestrutura, e-mail e CRM estritamente necessários para operar
              o atendimento, sempre sob obrigação contratual de confidencialidade — e, mediante seu
              consentimento, com os provedores de medição citados na seção 3 (Google e Apollo). Não
              vendemos dados pessoais.
            </p>
          </Block>

          <Block title="7. Por quanto tempo guardamos">
            <p>
              Dados de contato comercial: até 24 meses após a última interação, ou até que você peça
              a exclusão. Registros de acesso: 6 meses, conforme o Marco Civil da Internet. Dados
              vinculados a contrato: pelo prazo legal aplicável.
            </p>
          </Block>

          <Block title="8. Seus direitos">
            <p>
              Você pode solicitar confirmação de tratamento, acesso, correção, anonimização,
              portabilidade, exclusão e revogação do consentimento a qualquer momento, escrevendo
              para{" "}
              <a href={`mailto:${CONTACT.email}`} className="underline hover:text-primary">
                {CONTACT.email}
              </a>
              . Respondemos em até 15 dias.
            </p>
          </Block>

          <Block title="9. Segurança">
            <p>
              Adotamos medidas técnicas e administrativas para proteger os dados contra acessos não
              autorizados, perda ou alteração indevida. Em caso de incidente com risco relevante,
              comunicamos os titulares e a ANPD nos prazos legais.
            </p>
          </Block>

          <Block title="10. Alterações desta política">
            <p>
              Podemos atualizar este documento. A data de última atualização no topo da página
              indica a versão vigente.
            </p>
          </Block>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
        {children}
      </div>
    </section>
  );
}
