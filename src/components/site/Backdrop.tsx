import { cn } from "@/lib/utils";

/**
 * Fundo de seção com movimento.
 *
 * Sem arquivo de vídeo, aplica um zoom/pan lento sobre a foto (efeito Ken Burns)
 * — dá sensação de vídeo sem custo de banda. Assim que existir um MP4/WebM,
 * basta preencher a chave correspondente em `MEDIA` (src/lib/site-config.ts):
 * o componente troca para `<video>` sozinho, usando a foto como poster.
 *
 * Respeita `prefers-reduced-motion` (ver src/styles.css).
 */
export function Backdrop({
  image,
  video,
  className,
  alt = "",
  eager = false,
}: {
  image: string;
  video?: string;
  className?: string;
  alt?: string;
  /** true = carrega imediatamente (fundos acima da dobra, ex.: hero). */
  eager?: boolean;
}) {
  if (video) {
    return (
      <video
        className={cn("h-full w-full object-cover", className)}
        poster={image}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      >
        <source src={video} type={video.endsWith(".webm") ? "video/webm" : "video/mp4"} />
      </video>
    );
  }

  return (
    <img
      src={image}
      alt={alt}
      role={alt ? undefined : "presentation"}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      className={cn("h-full w-full object-cover animate-ken-burns", className)}
      width={1920}
      height={1080}
    />
  );
}
