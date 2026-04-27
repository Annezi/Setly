import TestsPageClient from "./tests-page-client";
import { shareMetadataBundle } from "@/app/lib/og-helpers";

export const metadata = shareMetadataBundle({
  segmentTitle: "Тесты о путешествиях",
  description:
    "Быстрые тесты о путешествиях: узнайте свой стиль, готовность к неожиданностям и что для вас главное в поездках.",
  path: "/tests",
});

export default function TestsPage() {
  return <TestsPageClient />;
}
