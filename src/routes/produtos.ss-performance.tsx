import { createFileRoute } from "@tanstack/react-router";
import { ProductPageLayout, type ProductPageContent } from "@/components/site/ProductPageLayout";
import { pageHead } from "@/lib/site-config";

const content: ProductPageContent = {
  badge: "Telemetria avançada",
  name: "SS Performance",
  headline:
    "O copiloto de IA que orienta o motorista em tempo real, com feedback contínuo para reduzir consumo e sinistros.",
  description:
    "Toda a base do SS Start, mais o conjunto de ferramentas para quem compete por eficiência operacional: motorista orientado, pneu monitorado e rentabilidade visível por veículo.",
  features: [
    "Tudo do SS Start",
    "Copiloto do motorista com feedback em tempo real",
    "Monitoramento de pneus",
    "Painel de rentabilidade",
    "BI e relatórios avançados",
  ],
  segment: "Operações que competem por eficiência.",
};

export const Route = createFileRoute("/produtos/ss-performance")({
  component: () => <ProductPageLayout content={content} />,
  head: () =>
    pageHead({
      path: "/produtos/ss-performance",
      title: "SS Performance — Telemetria avançada e copiloto de IA | SS Telemática",
      description: content.headline,
    }),
});
