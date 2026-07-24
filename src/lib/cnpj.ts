/** Utilidades de CNPJ compartilhadas entre o formulário e o endpoint. */

export const onlyDigits = (value: string) => value.replace(/\D/g, "");

/** Formata progressivamente enquanto a pessoa digita: 00.000.000/0000-00 */
export function formatCnpj(value: string) {
  const d = onlyDigits(value).slice(0, 14);
  if (d.length <= 2) return d;
  if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`;
  if (d.length <= 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`;
  if (d.length <= 12) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`;
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
}

/**
 * Valida os dois dígitos verificadores do CNPJ (módulo 11).
 * Rejeita também os casos de todos os dígitos iguais (11.111.111/1111-11),
 * que passam no cálculo mas não existem na Receita.
 */
export function isValidCnpj(value: string) {
  const d = onlyDigits(value);
  if (d.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(d)) return false;

  const digitAt = (length: number) => {
    let sum = 0;
    let weight = length - 7;
    for (let i = 0; i < length; i++) {
      sum += Number(d[i]) * weight;
      weight = weight - 1 < 2 ? 9 : weight - 1;
    }
    const rest = sum % 11;
    return rest < 2 ? 0 : 11 - rest;
  };

  return digitAt(12) === Number(d[12]) && digitAt(13) === Number(d[13]);
}
