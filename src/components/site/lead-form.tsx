import { useState, type FormEvent, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

type Status = "idle" | "sending" | "ok" | "error";

/**
 * Estado e envio compartilhados pelos formulários de contato e de indicação.
 * Lê os campos via FormData (por isso todo input precisa de `name`) e envia
 * para /api/leads.
 */
export function useLeadForm(tipo: "contato" | "indicacao" | "evento") {
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setFieldErrors({});
    setMessage("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, tipo, consentimento: data.consentimento === "on" }),
      });
      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        fieldErrors?: Record<string, string>;
        error?: string;
      };

      if (!res.ok || !body.ok) {
        setFieldErrors(body.fieldErrors ?? {});
        setStatus("error");
        setMessage(
          body.fieldErrors
            ? "Confira os campos destacados."
            : (body.error ?? "Não conseguimos enviar agora. Tente de novo em instantes."),
        );
        return;
      }

      form.reset();
      setStatus("ok");
    } catch {
      setStatus("error");
      setMessage("Sem conexão com o servidor. Tente de novo em instantes.");
    }
  }

  return { status, fieldErrors, message, onSubmit };
}

export function Field({
  label,
  name,
  type = "text",
  error,
  required = true,
  autoComplete,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  required?: boolean;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <label className="block" htmlFor={name}>
      <span className="text-xs font-semibold tracking-wide text-muted-foreground">
        {label.toUpperCase()}
      </span>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`mt-1.5 w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 ${
          error
            ? "border-destructive focus:border-destructive focus:ring-destructive/30"
            : "border-input focus:border-brand-sky focus:ring-brand-sky/30"
        }`}
      />
      {error && (
        <span id={`${name}-error`} className="mt-1.5 block text-xs text-destructive">
          {error}
        </span>
      )}
    </label>
  );
}

export function TextArea({
  label,
  name,
  error,
  rows = 4,
}: {
  label: string;
  name: string;
  error?: string;
  rows?: number;
}) {
  return (
    <label className="block" htmlFor={name}>
      <span className="text-xs font-semibold tracking-wide text-muted-foreground">
        {label.toUpperCase()}
      </span>
      <textarea
        id={name}
        name={name}
        rows={rows}
        aria-invalid={error ? true : undefined}
        className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-brand-sky focus:ring-2 focus:ring-brand-sky/30"
      />
      {error && <span className="mt-1.5 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

export function FleetSizeSelect({ name = "frota" }: { name?: string }) {
  return (
    <label className="block" htmlFor={name}>
      <span className="text-xs font-semibold tracking-wide text-muted-foreground">
        TAMANHO DA FROTA
      </span>
      <select
        id={name}
        name={name}
        className="mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-brand-sky focus:ring-2 focus:ring-brand-sky/30"
      >
        <option value="Até 30 veículos">Até 30 veículos</option>
        <option value="31 a 100 veículos">31 a 100 veículos</option>
        <option value="Mais de 100 veículos">Mais de 100 veículos</option>
      </select>
    </label>
  );
}

export function Select({
  label,
  name,
  options,
  error,
  required = true,
  placeholder = "Selecione",
}: {
  label: string;
  name: string;
  options: string[];
  error?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <label className="block" htmlFor={name}>
      <span className="text-xs font-semibold tracking-wide text-muted-foreground">
        {label.toUpperCase()}
      </span>
      <select
        id={name}
        name={name}
        required={required}
        defaultValue=""
        aria-invalid={error ? true : undefined}
        className={`mt-1.5 w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none transition focus:ring-2 ${
          error
            ? "border-destructive focus:border-destructive focus:ring-destructive/30"
            : "border-input focus:border-brand-sky focus:ring-brand-sky/30"
        }`}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {error && <span className="mt-1.5 block text-xs text-destructive">{error}</span>}
    </label>
  );
}

/**
 * Grupo de checkboxes independentes (cada opção é um campo próprio no
 * FormData, ex.: name="portfolio_Telemetria"), para não colidir com o
 * `Object.fromEntries` simples do `useLeadForm` — que perderia valores
 * repetidos se todas as opções usassem o mesmo `name`.
 */
export function CheckboxGroup({
  label,
  namePrefix,
  options,
}: {
  label: string;
  namePrefix: string;
  options: string[];
}) {
  return (
    <fieldset>
      <span className="text-xs font-semibold tracking-wide text-muted-foreground">
        {label.toUpperCase()}
      </span>
      <div className="mt-2 flex flex-wrap gap-4">
        {options.map((o) => (
          <label key={o} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              name={`${namePrefix}_${o}`}
              className="h-4 w-4 rounded border-input accent-[oklch(0.32_0.13_260)]"
            />
            {o}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** Campo-armadilha invisível para bots. Humanos nunca o preenchem. */
export function Honeypot() {
  return (
    <div className="absolute left-[-9999px]" aria-hidden="true">
      <label htmlFor="website">Não preencha este campo</label>
      <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
    </div>
  );
}

export function ConsentCheckbox({ error }: { error?: string }) {
  return (
    <div>
      <label className="flex items-start gap-3 text-xs text-muted-foreground">
        <input
          name="consentimento"
          type="checkbox"
          required
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-input accent-[oklch(0.32_0.13_260)]"
        />
        <span>
          Autorizo a SS Telemática a usar meus dados para responder a este contato, conforme a{" "}
          <Link to="/politica-de-privacidade" className="underline hover:text-primary">
            Política de Privacidade
          </Link>
          .
        </span>
      </label>
      {error && <span className="mt-1.5 block text-xs text-destructive">{error}</span>}
    </div>
  );
}

export function SubmitButton({
  status,
  children,
  idleIcon,
}: {
  status: Status;
  children: ReactNode;
  idleIcon?: ReactNode;
}) {
  return (
    <button
      type="submit"
      disabled={status === "sending"}
      className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-card transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
    >
      {status === "sending" ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" /> Enviando…
        </>
      ) : (
        <>
          {children} {idleIcon}
        </>
      )}
    </button>
  );
}

export function FormFeedback({
  status,
  message,
  successTitle,
  successBody,
}: {
  status: Status;
  message: string;
  successTitle: string;
  successBody: string;
}) {
  if (status === "ok") {
    return (
      <div
        role="status"
        className="flex items-start gap-3 rounded-xl border border-brand-green/40 bg-brand-green/10 px-4 py-3 text-sm"
      >
        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[oklch(0.45_0.15_138)]" />
        <span>
          <strong className="block">{successTitle}</strong>
          {successBody}
        </span>
      </div>
    );
  }
  if (status === "error" && message) {
    return (
      <div
        role="alert"
        className="flex items-start gap-3 rounded-xl border border-destructive/40 bg-destructive/10 px-4 py-3 text-sm text-destructive"
      >
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
        <span>{message}</span>
      </div>
    );
  }
  return null;
}
