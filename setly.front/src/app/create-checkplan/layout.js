import {
  SNIPPET_IMAGE_PIXELS,
  getSiteOrigin,
  ogImageDescriptors,
} from "@/app/lib/og-helpers";

const snippetPath = "/img/main/snippet.jpg";

const snippetOgImages = ogImageDescriptors(
  `${getSiteOrigin()}${snippetPath}`,
  "Setly",
  SNIPPET_IMAGE_PIXELS
);

export const metadata = {
  title: "Создание чек-плана",
  description:
    "Создайте свой чек-план путешествия: что взять, куда сходить и бюджет — в одном месте.",
  alternates: {
    canonical: `${getSiteOrigin()}/create-checkplan`,
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: `${getSiteOrigin()}/create-checkplan`,
    siteName: "Setly",
    title: "Создание чек-плана",
    description:
      "Создайте свой чек-план путешествия: что взять, куда сходить и бюджет — в одном месте.",
    images: snippetOgImages.length ? snippetOgImages : [{ url: snippetPath, alt: "Setly" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Создание чек-плана",
    description:
      "Создайте свой чек-план путешествия: что взять, куда сходить и бюджет — в одном месте.",
    images: [snippetPath],
  },
};

export default function CreateCheckplanSegmentLayout({ children }) {
  return children;
}
