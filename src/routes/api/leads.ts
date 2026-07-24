import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { z } from "zod";

/**
 * Recebe os formulários do site (contato e indicação).
 *
 * Entrega do lead:
 *  - sempre grava um log estruturado no servidor (visível nos logs do deploy);
 *  - se `LEADS_WEBHOOK_URL` estiver definida, faz POST do JSON para lá
 *    (compatível com Zapier / Make / n8n / Slack / endpoint próprio de CRM).
 *
 * Enquanto a variável não existir, nenhum lead se perde no navegador: ele fica
 * registrado no log do servidor.
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

const leadSchema = z.discriminatedUnion("tipo", [contatoSchema, indicacaoSchema, chatSchema]);

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

        return json({ ok: true }, 200);
      },
    },
  },
});
