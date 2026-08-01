import { cn } from "@/lib/utils";

/**
 * Imagem que vira vídeo quando há um arquivo de vídeo.
 *
 * Use no lugar de um `<img>` de produto/conteúdo. Passe sempre a imagem (serve
 * de poster e de fallback) e, opcionalmente, o caminho do vídeo. Quando `video`
 * estiver preenchido (ver MEDIA em src/lib/site-config.ts), renderiza um
 * `<video>` mudo, em loop e com autoplay; senão, a imagem.
 *
 * Respeita `prefers-reduced-motion`: o vídeo entra com autoplay, mas o usuário
 * pode pausá-lo pelos controles do sistema; para fundos decorativos use o
 * <Backdrop>, que já desliga o Ken Burns nesse modo.
 */
export function Media({
  image,
  video,
  alt = "",
  className,
  style,
  width,
  height,
}: {
  image: string;
  video?: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  width?: number;
  height?: number;
}) {
  if (video) {
    return (
      <video
        className={cn("h-full w-full object-cover", className)}
        style={style}
        poster={image}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={alt || undefined}
      >
        <source src={video} type={video.endsWith(".webm") ? "video/webm" : "video/mp4"} />
      </video>
    );
  }

  return (
    <img
      src={image}
      alt={alt}
      loading="lazy"
      className={cn("h-full w-full object-cover", className)}
      style={style}
      width={width}
      height={height}
    />
  );
}
