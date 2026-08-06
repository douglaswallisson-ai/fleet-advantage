import { createFileRoute } from "@tanstack/react-router";
import { ProductPageLayout, type ProductPageContent } from "@/components/site/ProductPageLayout";
import { pageHead } from "@/lib/site-config";

const content: ProductPageContent = {
  badge: "Decisão automatizada",
  name: "SS Evolution",
  headline:
    "Plano de ação pronto para a sua frota. O gestor chega e já encontra a decisão certa, não um painel para interpretar.",
  description:
    "Toda a base do SS Performance, mais o IA Fleet Manager: a plataforma organiza os dados da frota em um plano de ação, com as integrações e o suporte que uma operação em escala precisa.",
  features: [
    "Tudo do SS Performance",
    "IA Fleet Manager — plano de ação automatizado",
    "Integração ERP/TMS",
    "SLA dedicado + CSM",
    "Selo Verde ESG",
  ],
  segment: "Frotas que buscam automação de decisão em escala.",
  dark: true,
};

export const Route = createFileRoute("/produtos/ss-evolution")({
  component: () => <ProductPageLayout content={content} />,
  head: () =>
    pageHead({
      path: "/produtos/ss-evolution",
      title: "SS Evolution — IA Fleet Manager | SS Telemática",
      description: content.headline,
    }),
});
