import AboutPageClient from "./about-page-client";
import { shareMetadataBundle } from "@/app/lib/og-helpers";

export const metadata = shareMetadataBundle({
  segmentTitle: "О проекте Setly",
  description:
    "Узнайте больше о нашей команде, философии проекта и людях, которые делают ваши путешествия лучше.",
  path: "/about",
});

export default function AboutPage() {
  return <AboutPageClient />;
}
