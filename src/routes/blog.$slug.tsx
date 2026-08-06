import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, CalendarDays, Clock } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Media } from "@/components/site/Media";
import { articleJsonLd, breadcrumbJsonLd, especialistaHref, pageHead } from "@/lib/site-config";
import { dataExtenso, getPost, leituraMinutos, postsRecentes, type Post } from "@/lib/blog";
import sustainImg from "@/assets/sustainability.webp";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const post = loaderData?.post;
    if (!post) return {};
    const path = `/blog/${post.slug}`;
    return {
      ...pageHead({
        path,
        title: `${post.titulo} — Blog SS Telemática`,
        description: post.resumo,
        image: post.cover || undefined,
        type: "article",
      }),
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify(
            articleJsonLd({
              title: post.titulo,
              description: post.resumo,
              path,
              image: post.cover || undefined,
              datePublished: post.data,
              author: post.autor,
            }),
          ),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Início", path: "/" },
              { name: "Blog", path: "/blog" },
              { name: post.titulo, path },
            ]),
          ),
        },
      ],
    };
  },
  component: PostPage,
});

const CAPA_PADRAO = sustainImg;

function PostPage() {
  const { post } = Route.useLoaderData();
  const outros = postsRecentes()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main>
        <article>
          <header className="bg-gradient-hero py-16 text-white">
            <div className="mx-auto max-w-3xl px-6">
              <Link
                to="/blog"
                className="inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-white"
              >
                <ArrowLeft className="h-4 w-4" /> Blog
              </Link>
              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs text-white/70">
                <span className="rounded-full bg-brand-green/20 px-2.5 py-1 font-semibold text-brand-green">
                  {post.categoria}
                </span>
                <span className="inline-flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5" /> {dataExtenso(post.data)}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" /> {leituraMinutos(post)} min de leitura
                </span>
              </div>
              <h1 className="mt-4 text-3xl font-bold leading-tight md:text-5xl">{post.titulo}</h1>
              <p className="mt-4 text-lg text-white/75">{post.resumo}</p>
            </div>
          </header>

          <div className="mx-auto max-w-4xl px-6">
            <div className="-mt-10 overflow-hidden rounded-3xl shadow-elegant md:-mt-14">
              <Media
                image={post.cover || CAPA_PADRAO}
                alt={post.titulo}
                className="aspect-[16/9]"
              />
            </div>
          </div>

          <div className="mx-auto max-w-3xl px-6 py-14">
            <PostBody post={post} />
          </div>
        </article>

        <section className="border-t border-border/60 bg-secondary/40 py-16">
          <div className="mx-auto max-w-3xl px-6 text-center">
            <h2 className="text-2xl font-bold">Pronto para decidir com a SS?</h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Agende uma demonstração e veja a IA da SS transformar os dados da sua frota em ação.
            </p>
            <a
              href={especialistaHref()}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground shadow-card transition-transform hover:-translate-y-0.5"
            >
              Falar com especialista <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </section>

        {outros.length > 0 && (
          <section className="mx-auto max-w-7xl px-6 py-16">
            <h2 className="text-2xl font-bold">Continue lendo</h2>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              {outros.map((p) => (
                <Link
                  key={p.slug}
                  to="/blog/$slug"
                  params={{ slug: p.slug }}
                  className="group flex gap-5 rounded-3xl border border-border bg-card p-5 shadow-card transition-shadow hover:shadow-elegant"
                >
                  <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-2xl">
                    <Media image={p.cover || CAPA_PADRAO} alt={p.titulo} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-brand-sky">{p.categoria}</span>
                    <h3 className="mt-1 font-bold leading-snug">{p.titulo}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
}

function PostBody({ post }: { post: Post }) {
  return (
    <div className="space-y-6">
      {post.body.map((b, i) => {
        if (b.tipo === "h2") {
          return (
            <h2 key={i} className="pt-4 text-2xl font-bold md:text-3xl">
              {b.texto}
            </h2>
          );
        }
        if (b.tipo === "ul") {
          return (
            <ul key={i} className="space-y-2">
              {b.itens.map((item) => (
                <li key={item} className="flex items-start gap-2 text-base text-muted-foreground">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-green" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (b.tipo === "img") {
          return (
            <div key={i} className="overflow-hidden rounded-2xl shadow-card">
              <img src={b.src} alt={b.alt} loading="lazy" className="h-full w-full object-cover" />
            </div>
          );
        }
        return (
          <p key={i} className="text-base leading-relaxed text-muted-foreground md:text-lg">
            {b.texto}
          </p>
        );
      })}
    </div>
  );
}
