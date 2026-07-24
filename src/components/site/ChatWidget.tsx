import { useEffect, useRef, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, Loader2, MessageCircle, Send, X } from "lucide-react";
import { SSOrb } from "@/components/site/SSOrb";
import { CHAT, CONTACT, whatsappLink } from "@/lib/site-config";

type Status = "idle" | "sending" | "ok" | "error";

/**
 * Bolinha de atendimento fixa no canto inferior direito, presente em todas as
 * páginas (montada no __root).
 *
 * Oferece dois caminhos, na ordem em que resolvem mais rápido:
 *  1. WhatsApp — conversa com um atendente de verdade. Só aparece quando
 *     CONTACT.whatsapp está preenchido em src/lib/site-config.ts.
 *  2. Recado — formulário curto que cai no mesmo /api/leads dos outros
 *     formulários, para quando ninguém está online.
 *
 * Para trocar por um chat ao vivo de terceiros (Chatwoot, Crisp, Tawk.to…),
 * veja a nota em CHAT dentro de src/lib/site-config.ts.
 */
export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const wpp = whatsappLink(CHAT.whatsappMessage);

  // Fecha com Esc e devolve o foco ao painel ao abrir.
  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    setFieldErrors({});
    setErrorMessage("");

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          tipo: "chat",
          consentimento: data.consentimento === "on",
          pagina: window.location.pathname,
        }),
      });
      const body = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        fieldErrors?: Record<string, string>;
      };

      if (!res.ok || !body.ok) {
        setFieldErrors(body.fieldErrors ?? {});
        setStatus("error");
        setErrorMessage(
          body.fieldErrors ? "Confira os campos destacados." : "Não conseguimos enviar agora.",
        );
        return;
      }

      form.reset();
      setStatus("ok");
    } catch {
      setStatus("error");
      setErrorMessage("Sem conexão. Tente de novo em instantes.");
    }
  }

  return (
    <>
      {/* Fundo clicável — no mobile o painel ocupa quase a tela inteira. */}
      {open && (
        <button
          type="button"
          aria-hidden="true"
          tabIndex={-1}
          onClick={() => setOpen(false)}
          className="fixed inset-0 z-40 bg-[oklch(0.15_0.03_260)]/40 backdrop-blur-[2px] sm:bg-transparent sm:backdrop-blur-none"
        />
      )}

      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
        {open && (
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="false"
            aria-label="Atendimento SS Telemática"
            className="w-[min(22rem,calc(100vw-2.5rem))] overflow-hidden rounded-3xl border border-border bg-card shadow-elegant"
          >
            <div className="relative flex items-center gap-3 bg-gradient-hero px-5 py-4 text-white">
              <SSOrb size={44} />
              <div className="min-w-0 flex-1">
                <div className="text-sm font-bold">Atendimento SS</div>
                <div className="text-xs text-white/70">{CHAT.availability}</div>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Fechar atendimento"
                className="rounded-full p-1.5 text-white/80 transition-colors hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[min(28rem,calc(100vh-11rem))] overflow-y-auto p-5">
              {status === "ok" ? (
                <div className="py-4 text-center">
                  <CheckCircle2 className="mx-auto h-10 w-10 text-[oklch(0.55_0.15_138)]" />
                  <p className="mt-4 text-sm font-semibold">Mensagem enviada!</p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Nosso time responde no contato que você informou.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="mt-5 text-xs font-semibold text-primary underline"
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <>
                  <p className="text-sm text-muted-foreground">{CHAT.greeting}</p>

                  {wpp && (
                    <>
                      <a
                        href={wpp}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-[oklch(0.6_0.16_145)] px-4 py-3.5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5"
                      >
                        <MessageCircle className="h-4 w-4" /> Conversar no WhatsApp
                      </a>
                      <div className="my-4 flex items-center gap-3 text-[10px] font-semibold tracking-widest text-muted-foreground">
                        <span className="h-px flex-1 bg-border" /> OU DEIXE UM RECADO
                        <span className="h-px flex-1 bg-border" />
                      </div>
                    </>
                  )}

                  <form className={`relative grid gap-3 ${wpp ? "" : "mt-4"}`} onSubmit={onSubmit}>
                    <div className="absolute left-[-9999px]" aria-hidden="true">
                      <input name="website" tabIndex={-1} autoComplete="off" />
                    </div>

                    <ChatField
                      name="nome"
                      placeholder="Seu nome"
                      autoComplete="name"
                      error={fieldErrors.nome}
                    />
                    <ChatField
                      name="contato"
                      placeholder="E-mail ou WhatsApp"
                      autoComplete="email"
                      error={fieldErrors.contato}
                    />
                    <div>
                      <textarea
                        name="mensagem"
                        rows={3}
                        required
                        placeholder="Como podemos ajudar?"
                        aria-label="Mensagem"
                        aria-invalid={fieldErrors.mensagem ? true : undefined}
                        className={`w-full rounded-xl border bg-background px-3.5 py-2.5 text-sm outline-none transition focus:ring-2 ${
                          fieldErrors.mensagem
                            ? "border-destructive focus:ring-destructive/30"
                            : "border-input focus:border-brand-sky focus:ring-brand-sky/30"
                        }`}
                      />
                      {fieldErrors.mensagem && (
                        <span className="mt-1 block text-xs text-destructive">
                          {fieldErrors.mensagem}
                        </span>
                      )}
                    </div>

                    <label className="flex items-start gap-2.5 text-[11px] leading-relaxed text-muted-foreground">
                      <input
                        name="consentimento"
                        type="checkbox"
                        required
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 rounded border-input accent-[oklch(0.32_0.13_260)]"
                      />
                      <span>
                        Autorizo o uso dos meus dados para responder a este contato, conforme a{" "}
                        <Link
                          to="/politica-de-privacidade"
                          onClick={() => setOpen(false)}
                          className="underline hover:text-primary"
                        >
                          Política de Privacidade
                        </Link>
                        .
                      </span>
                    </label>
                    {fieldErrors.consentimento && (
                      <span className="-mt-1 text-xs text-destructive">
                        {fieldErrors.consentimento}
                      </span>
                    )}

                    {status === "error" && errorMessage && (
                      <p role="alert" className="text-xs text-destructive">
                        {errorMessage}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
                    >
                      {status === "sending" ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" /> Enviando…
                        </>
                      ) : (
                        <>
                          Enviar mensagem <Send className="h-4 w-4" />
                        </>
                      )}
                    </button>
                  </form>

                  <p className="mt-4 text-center text-[11px] text-muted-foreground">
                    ou escreva para{" "}
                    <a href={`mailto:${CONTACT.email}`} className="underline hover:text-primary">
                      {CONTACT.email}
                    </a>
                  </p>
                </>
              )}
            </div>
          </div>
        )}

        {/*
          Sem círculo de fundo: a própria marca é o botão. Um disco atrás
          competia com o anel e embaralhava a leitura do ícone.
        */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Fechar atendimento" : "Abrir atendimento"}
          className="relative flex h-16 w-16 items-center justify-center rounded-full transition-transform hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-sky"
        >
          {open ? (
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-hero shadow-elegant">
              <X className="h-6 w-6 text-white" />
            </span>
          ) : (
            <>
              <SSOrb
                size={64}
                className="text-brand-green drop-shadow-[0_6px_16px_oklch(0.18_0.06_260/0.45)]"
              />
              <span className="absolute right-0 top-0 h-3.5 w-3.5 rounded-full bg-brand-green ring-2 ring-background" />
            </>
          )}
        </button>
      </div>
    </>
  );
}

function ChatField({
  name,
  placeholder,
  autoComplete,
  error,
}: {
  name: string;
  placeholder: string;
  autoComplete?: string;
  error?: string;
}) {
  return (
    <div>
      <input
        name={name}
        required
        placeholder={placeholder}
        aria-label={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        className={`w-full rounded-xl border bg-background px-3.5 py-2.5 text-sm outline-none transition focus:ring-2 ${
          error
            ? "border-destructive focus:ring-destructive/30"
            : "border-input focus:border-brand-sky focus:ring-brand-sky/30"
        }`}
      />
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </div>
  );
}
