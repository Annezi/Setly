import ArticlesPageClient from "./articles-page-client";
import { shareMetadataBundle } from "@/app/lib/og-helpers";

export const metadata = shareMetadataBundle({
  segmentTitle: "Статьи о путешествиях",
  description:
    "Полезные статьи о путешествиях: советы, лайфхаки, гиды по странам и городам, рекомендации опытных путешественников.",
  path: "/articles",
});

export default function ArticlesPage() {
  return <ArticlesPageClient />;
}
