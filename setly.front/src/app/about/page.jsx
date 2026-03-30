import AboutPageClient from "./about-page-client";

export const metadata = {
  title: "О проекте Setly",
  description:
    "Узнайте больше о нашей команде, философии проекта и людях, которые делают ваши путешествия лучше.",
  alternates: {
    canonical: "https://setly.space/about",
  },
};

export default function AboutPage() {
  return <AboutPageClient />;
}
