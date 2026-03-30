import ArticlesPageClient from "./articles-page-client";

export const metadata = {
  title: "Статьи о путешествиях",
  description:
    "Полезные статьи о путешествиях: советы, лайфхаки, гиды по странам и городам, рекомендации опытных путешественников.",
  alternates: {
    canonical: "https://setly.space/articles",
  },
};

export default function ArticlesPage() {
  return <ArticlesPageClient />;
}
