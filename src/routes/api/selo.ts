import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { isValidCnpj, onlyDigits } from "@/lib/cnpj";

/**
 * Consulta pública do Selo Verde SS.
 *
 * A base de frotas certificadas NÃO vive neste repositório — ela é a fonte
 * oficial da SS. Aponte `SELO_REGISTRY_URL` para o endpoint que devolve o
 * registro de um CNPJ; enquanto a variável não existir, a consulta responde
 * honestamente que está indisponível, em vez de dizer que a empresa não é
 * certificada (o que seria falso para um cliente que tem o selo).
 *
 * Contrato esperado de SELO_REGISTRY_URL:
 *   GET  {SELO_REGISTRY_URL}?cnpj=00000000000000
 *   200  { "empresa": "...", "certificadoDesde": "2026-03",
 *          "validade": "2027-03", "codigo": "SS-GREEN-0001",
 *          "indicadores": [{ "rotulo": "...", "valor": "..." }] }
 *   404  quando o CNPJ não tem selo ativo
 */

type Indicador = { rotulo: string; valor: string };

type RegistroSelo = {
  empresa: string;
  certificadoDesde?: string;
  validade?: string;
  codigo?: string;
  indicadores?: Indicador[];
};

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

export const Route = createFileRoute("/api/selo")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const cnpj = onlyDigits(url.searchParams.get("cnpj") ?? "");

        if (!cnpj) {
          return json({ status: "invalido", mensagem: "Informe um CNPJ." }, 400);
        }
        if (!isValidCnpj(cnpj)) {
          return json(
            { status: "invalido", mensagem: "CNPJ inválido. Confira os números digitados." },
            400,
          );
        }

        const registryUrl = readEnv("SELO_REGISTRY_URL");
        if (!registryUrl) {
          // Sem base conectada não afirmamos nada sobre a empresa.
          return json(
            {
              status: "indisponivel",
              mensagem:
                "A consulta online ainda não está disponível. Fale com nosso time para confirmar o selo da sua frota.",
            },
            200,
          );
        }

        try {
          const res = await fetch(`${registryUrl}?cnpj=${cnpj}`, {
            headers: { Accept: "application/json" },
          });

          if (res.status === 404) {
            return json({ status: "nao_encontrado" }, 200);
          }
          if (!res.ok) {
            console.error("[selo] registro respondeu", res.status);
            return json(
              {
                status: "indisponivel",
                mensagem: "Não conseguimos consultar agora. Tente de novo em instantes.",
              },
              200,
            );
          }

          const registro = (await res.json()) as RegistroSelo;
          return json({ status: "certificado", registro }, 200);
        } catch (error) {
          console.error("[selo] falha ao consultar o registro", error);
          return json(
            {
              status: "indisponivel",
              mensagem: "Não conseguimos consultar agora. Tente de novo em instantes.",
            },
            200,
          );
        }
      },
    },
  },
});
