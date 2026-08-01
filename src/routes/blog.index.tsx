import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Media } from "@/components/site/Media";
import { breadcrumbJsonLd, pageHead } from "@/lib/site-config";
import { dataExtenso, leituraMinutos, postsRecentes } from "@/lib/blog";
import sustainImg from "@/assets/sustainability.jpg";

export const Route = createFileRoute("/blog/")({
  component: BlogIndex,
  head: () => ({
    ...pageHead({
      path: "/blog",
      title: "Blog — SS Telemática",
      description:
        "Ideias e práticas sobre gestão de frotas, IA, manutenção preditiva e transporte de pessoas e cargas. O blog da SS Telemática.",
    }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(
          breadcrumbJsonLd([
            { name: "Início", path: "/" },
            { name: "Blog", path: "/blog" },
          ]),
        ),
      },
    ],
  }),
});

const CAPA_PADRAO = sustainImg;

function BlogIndex() {
  const posts = postsRecentes();
  const [destaque, ...resto] = posts;

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <section className="bg-gradient-hero py-20 text-white">
          <div className="mx-auto max-w-7xl px-6">
            <span className="text-xs font-bold tracking-widest text-brand-green">BLOG</span>
            <h1 className="mt-4 max-w-2xl text-4xl font-bold md:text-5xl">
              Inteligência que vira decisão — em texto.
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/75">
              Gestão de frotas, IA, manutenção preditiva e o dia a dia de quem move pessoas e
              cargas.
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          {destaque && (
            <Link
              to="/blog/$slug"
              params={{ slug: destaque.slug }}
              className="group grid overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-shadow hover:shadow-elegant lg:grid-cols-2"
            >
              <div className="relative aspect-[16/9] overflow-hidden lg:aspect-auto">
                <Media
                  image={destaque.cover || CAPA_PADRAO}
                  alt={destaque.titulo}
                  className="transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-10">
                <PostMeta
                  categoria={destaque.categoria}
                  data={destaque.data}
                  min={leituraMinutos(destaque)}
                />
                <h2 className="mt-4 text-2xl font-bold md:text-3xl">{destaque.titulo}</h2>
                <p className="mt-3 text-muted-foreground">{destaque.resumo}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Ler artigo <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          )}

          {resto.length > 0 && (
            <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {resto.map((post) => (
                <Link
                  key={post.slug}
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-shadow hover:shadow-elegant"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Media
                      image={post.cover || CAPA_PADRAO}
                      alt={post.titulo}
                      className="transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <PostMeta
                      categoria={post.categoria}
                      data={post.data}
                      min={leituraMinutos(post)}
                    />
                    <h3 className="mt-3 text-lg font-bold">{post.titulo}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">{post.resumo}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      Ler artigo <ArrowRight className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

function PostMeta({ categoria, data, min }: { categoria: string; data: string; min: number }) {
  return (
    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
      <span className="rounded-full bg-brand-sky/10 px-2.5 py-1 font-semibold text-brand-sky">
        {categoria}
      </span>
      <span className="inline-flex items-center gap-1">
        <CalendarDays className="h-3.5 w-3.5" /> {dataExtenso(data)}
      </span>
      <span className="inline-flex items-center gap-1">
        <Clock className="h-3.5 w-3.5" /> {min} min de leitura
      </span>
    </div>
  );
}
