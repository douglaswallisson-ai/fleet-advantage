import { createFileRoute } from "@tanstack/react-router";
import { ProductPageLayout, type ProductPageContent } from "@/components/site/ProductPageLayout";
import { pageHead } from "@/lib/site-config";

const content: ProductPageContent = {
  badge: "Telemetria básica",
  name: "SS Start",
  headline: "Visibilidade e controle essencial para começar a profissionalizar a gestão da frota.",
  description:
    "O necessário para saber onde a frota está e ter registro confiável da operação, sem complexidade para configurar ou operar no dia a dia.",
  features: [
    "Rastreamento em tempo real",
    "Cerca eletrônica",
    "Relatórios operacionais",
    "App do motorista",
    "BI e relatórios inclusos",
  ],
  segment: "Operações que estão estruturando o controle da frota agora.",
};

export const Route = createFileRoute("/produtos/ss-start")({
  component: () => <ProductPageLayout content={content} />,
  head: () =>
    pageHead({
      path: "/produtos/ss-start",
      title: "SS Start — Telemetria básica para sua frota | SS Telemática",
      description: content.headline,
    }),
});
