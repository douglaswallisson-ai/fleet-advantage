import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Carrossel de imagens. A primeira imagem é a principal. Com uma imagem só,
 * renderiza estático (sem setas nem pontos). Avança sozinho a cada 5s, pausa no
 * hover, e é navegável por setas, pontos e teclado.
 */
export function Carrossel({
  imagens,
  alt,
  className,
  aspect = "aspect-[16/9]",
  autoPlay = true,
  fit = "cover",
}: {
  imagens: string[];
  alt: string;
  className?: string;
  aspect?: string;
  autoPlay?: boolean;
  /** "cover" preenche (pode cortar); "contain" mostra a imagem inteira. */
  fit?: "cover" | "contain";
}) {
  const [i, setI] = useState(0);
  const [pausado, setPausado] = useState(false);
  const total = imagens.length;
  const timer = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const objeto = fit === "contain" ? "object-contain" : "object-cover";

  const ir = (n: number) => setI((n + total) % total);

  useEffect(() => {
    if (!autoPlay || total < 2 || pausado) return;
    timer.current = setInterval(() => setI((v) => (v + 1) % total), 5000);
    return () => clearInterval(timer.current);
  }, [autoPlay, total, pausado]);

  if (total <= 1) {
    return (
      <div className={cn("relative overflow-hidden", aspect, className)}>
        <img src={imagens[0]} alt={alt} loading="lazy" className={cn("h-full w-full", objeto)} />
      </div>
    );
  }

  return (
    <div
      className={cn("group/car relative overflow-hidden", aspect, className)}
      onMouseEnter={() => setPausado(true)}
      onMouseLeave={() => setPausado(false)}
      role="group"
      aria-roledescription="carrossel"
      aria-label={alt}
    >
      {imagens.map((src, n) => (
        <img
          key={src}
          src={src}
          alt={n === 0 ? alt : `${alt} — imagem ${n + 1}`}
          loading={n === 0 ? "eager" : "lazy"}
          className={cn(
            "absolute inset-0 h-full w-full transition-opacity duration-500",
            objeto,
            n === i ? "opacity-100" : "opacity-0",
          )}
        />
      ))}

      {/* Setas */}
      <button
        type="button"
        aria-label="Imagem anterior"
        onClick={() => ir(i - 1)}
        className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[oklch(0.15_0.03_260)]/50 text-white opacity-0 backdrop-blur transition-opacity hover:bg-[oklch(0.15_0.03_260)]/70 focus-visible:opacity-100 group-hover/car:opacity-100"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        type="button"
        aria-label="Próxima imagem"
        onClick={() => ir(i + 1)}
        className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-[oklch(0.15_0.03_260)]/50 text-white opacity-0 backdrop-blur transition-opacity hover:bg-[oklch(0.15_0.03_260)]/70 focus-visible:opacity-100 group-hover/car:opacity-100"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Pontos */}
      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
        {imagens.map((_, n) => (
          <button
            key={n}
            type="button"
            aria-label={`Ir para a imagem ${n + 1}`}
            aria-current={n === i}
            onClick={() => setI(n)}
            className={cn(
              "h-2 rounded-full transition-all",
              n === i ? "w-5 bg-white" : "w-2 bg-white/50 hover:bg-white/80",
            )}
          />
        ))}
      </div>
    </div>
  );
}
