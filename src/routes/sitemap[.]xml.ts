import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { SITE_URL } from "@/lib/site-config";
import { POSTS } from "@/lib/blog";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const lastmod = new Date().toISOString().slice(0, 10);
        const entries = [
          { path: "/", priority: "1.0", changefreq: "weekly", lastmod },
          { path: "/blog", priority: "0.9", changefreq: "weekly", lastmod },
          { path: "/contato", priority: "0.9", changefreq: "monthly", lastmod },
          { path: "/selo-verde", priority: "0.8", changefreq: "monthly", lastmod },
          { path: "/indicacao", priority: "0.8", changefreq: "monthly", lastmod },
          { path: "/quem-somos", priority: "0.7", changefreq: "monthly", lastmod },
          { path: "/politica-de-privacidade", priority: "0.3", changefreq: "yearly", lastmod },
          ...POSTS.map((p) => ({
            path: `/blog/${p.slug}`,
            priority: "0.6",
            changefreq: "monthly",
            lastmod: p.data,
          })),
        ];
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...entries.map(
            (e) =>
              `  <url><loc>${SITE_URL}${e.path}</loc><lastmod>${e.lastmod}</lastmod><changefreq>${e.changefreq}</changefreq><priority>${e.priority}</priority></url>`,
          ),
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
