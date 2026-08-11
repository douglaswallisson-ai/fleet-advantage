import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { z } from "zod";

/**
 * Recebe os formulários do site (contato, indicação e cadastro de evento).
 *
 * Entrega do lead:
 *  - sempre grava um log estruturado no servidor (visível nos logs do deploy);
 *  - se `LEADS_WEBHOOK_URL` estiver definida, faz POST do JSON para lá
 *    (compatível com Zapier / Make / n8n / Slack / endpoint próprio de CRM);
 *  - se `RESEND_API_KEY` estiver definida, envia um e-mail com o lead via
 *    Resend (https://resend.com) para `LEADS_TO_EMAIL`.
 *
 * Nenhum desses dois canais é obrigatório — o lead nunca se perde no
 * navegador, ele fica no log do servidor mesmo sem nenhuma variável setada.
 * Ambos falham "em silêncio" (não derrubam a resposta pro usuário): um erro
 * de e-mail não pode fazer o formulário parecer que falhou pro visitante.
 */

const baseFields = {
  nome: z.string().trim().min(2, "Informe seu nome.").max(120),
  email: z.string().trim().email("E-mail inválido.").max(160),
  telefone: z.string().trim().min(8, "Informe um telefone válido.").max(40),
  consentimento: z.literal(true, {
    errorMap: () => ({ message: "É preciso aceitar o uso dos dados." }),
  }),
  // honeypot: bots preenchem, humanos não veem
  website: z.string().max(0).optional(),
};

const contatoSchema = z.object({
  tipo: z.literal("contato"),
  empresa: z.string().trim().min(2, "Informe a empresa.").max(160),
  frota: z.string().trim().max(60).optional().default(""),
  plano: z.string().trim().max(60).optional().default(""),
  mensagem: z.string().trim().max(2000).optional().default(""),
  ...baseFields,
});

const indicacaoSchema = z.object({
  tipo: z.literal("indicacao"),
  empresaIndicada: z.string().trim().min(2, "Informe a empresa indicada.").max(160),
  contatoIndicado: z.string().trim().min(2, "Informe o contato na empresa.").max(160),
  frota: z.string().trim().max(60).optional().default(""),
  ...baseFields,
});

/**
 * Cadastro presencial em stand de evento (ex.: FIT Latinbus 2026). Sem
 * honeypot — preenchido por vendedor/hostess no tablet do stand, não por
 * visitante anônimo sujeito a spam de bot.
 */
const eventoSchema = z.object({
  tipo: z.literal("evento"),
  evento: z.string().trim().max(120).optional().default(""),
  empresa: z.string().trim().min(2, "Informe a empresa.").max(160),
  cargo: z.string().trim().max(60).optional().default(""),
  portfolio_Telemetria: z.string().trim().max(10).optional().default(""),
  portfolio_Videotelemetria: z.string().trim().max(10).optional().default(""),
  responsavelSS: z.string().trim().max(60).optional().default(""),
  observacao: z.string().trim().max(2000).optional().default(""),
  nome: baseFields.nome,
  email: baseFields.email,
  telefone: baseFields.telefone,
  consentimento: baseFields.consentimento,
  website: baseFields.website,
});

/**
 * Mensagem enviada pelo chat flutuante. Formulário curto de propósito: o
 * visitante já está em modo conversa, pedir empresa e porte de frota afugenta.
 * Um campo só de contato aceita e-mail OU telefone.
 */
const chatSchema = z.object({
  tipo: z.literal("chat"),
  nome: z.string().trim().min(2, "Informe seu nome.").max(120),
  contato: z
    .string()
    .trim()
    .min(6, "Informe um e-mail ou telefone.")
    .max(160)
    .refine((v) => v.includes("@") || v.replace(/\D/g, "").length >= 8, {
      message: "Informe um e-mail válido ou um telefone com DDD.",
    }),
  mensagem: z.string().trim().min(2, "Escreva sua mensagem.").max(2000),
  pagina: z.string().trim().max(200).optional().default(""),
  consentimento: z.literal(true, {
    errorMap: () => ({ message: "É preciso aceitar o uso dos dados." }),
  }),
  website: z.string().max(0).optional(),
});

const leadSchema = z.discriminatedUnion("tipo", [
  contatoSchema,
  indicacaoSchema,
  chatSchema,
  eventoSchema,
]);

export type LeadPayload = z.infer<typeof leadSchema>;

const json = (body: unknown, status: number) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  });

function readEnv(key: string): string | undefined {
  try {
    return typeof process !== "undefined" ? process.env?.[key] : undefined;
  } catch {
    return undefined;
  }
}

/** Rótulos amigáveis para exibir no corpo do e-mail (em vez do nome do campo). */
const FIELD_LABELS: Record<string, string> = {
  tipo: "Formulário",
  nome: "Nome",
  empresa: "Empresa",
  email: "E-mail",
  telefone: "Telefone",
  cargo: "Cargo",
  responsavelSS: "Responsável SS",
  observacao: "Observação",
  evento: "Evento",
  mensagem: "Mensagem",
  plano: "Plano de interesse",
  frota: "Tamanho da frota",
  empresaIndicada: "Empresa indicada",
  contatoIndicado: "Contato na empresa indicada",
  portfolio_Telemetria: "Interesse — Telemetria",
  portfolio_Videotelemetria: "Interesse — Videotelemetria",
  recebidoEm: "Recebido em",
};

function leadToHtml(record: Record<string, unknown>): string {
  const rows = Object.entries(record)
    .filter(([, v]) => v !== "" && v !== undefined && v !== null)
    .map(([k, v]) => {
      const label = FIELD_LABELS[k] ?? k;
      const value = k.startsWith("portfolio_") ? (v ? "Sim" : "Não") : String(v);
      return `<tr><td style="padding:4px 12px;color:#667;font-weight:600">${label}</td><td style="padding:4px 12px">${value}</td></tr>`;
    })
    .join("");
  return `<table cellpadding="0" cellspacing="0">${rows}</table>`;
}

async function sendLeadEmail(record: Record<string, unknown>) {
  const apiKey = readEnv("RESEND_API_KEY");
  if (!apiKey) return;

  const to = readEnv("LEADS_TO_EMAIL") || "sales@sstelematica.com.br";
  // resend.dev é o domínio de teste da Resend — funciona sem verificação, mas
  // só entrega para o próprio e-mail cadastrado na conta Resend. Assim que a
  // SS verificar um domínio próprio (ex.: sstelematica.com.br) na Resend,
  // troque LEADS_FROM_EMAIL para algo como "leads@sstelematica.com.br".
  const from = readEnv("LEADS_FROM_EMAIL") || "SS Telemática <onboarding@resend.dev>";

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject: `Novo lead (${record.tipo}) — ${record.nome ?? "sem nome"}`,
        html: leadToHtml(record),
      }),
    });
    if (!res.ok) {
      console.error("[lead] Resend respondeu", res.status, await res.text());
    }
  } catch (error) {
    console.error("[lead] falha ao enviar e-mail via Resend", error);
  }
}

export const Route = createFileRoute("/api/leads")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let raw: unknown;
        try {
          raw = await request.json();
        } catch {
          return json({ ok: false, error: "Corpo da requisição inválido." }, 400);
        }

        const parsed = leadSchema.safeParse(raw);
        if (!parsed.success) {
          const fieldErrors: Record<string, string> = {};
          for (const issue of parsed.error.issues) {
            const key = String(issue.path[0] ?? "form");
            fieldErrors[key] ??= issue.message;
          }
          return json({ ok: false, fieldErrors }, 422);
        }

        const lead = parsed.data;

        // Honeypot preenchido: responde 200 para não dar pista ao bot, mas descarta.
        if (lead.website) return json({ ok: true }, 200);

        const { website: _honeypot, ...payload } = lead;
        const record = { ...payload, recebidoEm: new Date().toISOString() };

        console.info("[lead]", JSON.stringify(record));

        const webhook = readEnv("LEADS_WEBHOOK_URL");
        if (webhook) {
          try {
            const res = await fetch(webhook, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(record),
            });
            if (!res.ok) {
              console.error("[lead] webhook respondeu", res.status, await res.text());
            }
          } catch (error) {
            // O lead já está no log — não falhamos a requisição do usuário por isso.
            console.error("[lead] falha ao enviar para o webhook", error);
          }
        }

        await sendLeadEmail(record);

        return json({ ok: true }, 200);
      },
    },
  },
});
