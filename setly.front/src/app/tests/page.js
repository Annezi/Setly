import TestsPageClient from "./tests-page-client";

export const metadata = {
  title: "Тесты о путешествиях",
  description:
    "Быстрые тесты о путешествиях: узнайте свой стиль, готовность к неожиданностям и что для вас главное в поездках.",
  alternates: {
    canonical: "https://setly.space/tests",
  },
};

export default function TestsPage() {
  return <TestsPageClient />;
}
