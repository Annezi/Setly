import { notFound } from "next/navigation";
import TestPageClient from "./test-page-client";
import { getTestByIdOrSlug } from "@/data/tests-data";
import {
  absoluteDocumentTitle,
  absoluteUrl,
  capOgImageForTelegram,
  getSiteOrigin,
  ogImageDescriptors,
  shareMetadataBundle,
  snippetImagePath,
  snippetPixelsIfUrlMatches,
} from "@/app/lib/og-helpers";

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const raw = resolvedParams?.slug ?? "";
  const test = getTestByIdOrSlug(raw);
  if (!test) {
    return shareMetadataBundle({
      segmentTitle: "Тест не найден",
      description: "Выбранный тест не найден",
      path: `/tests/${encodeURIComponent(String(raw))}`,
    });
  }

  const origin = getSiteOrigin().replace(/\/$/, "");
  const canonicalSlug =
    typeof test.slug === "string" && test.slug.trim() !== ""
      ? test.slug.trim()
      : String(test.id ?? "");
  const pageUrl = `${origin}/tests/${encodeURIComponent(canonicalSlug)}`;
  const docTitle = absoluteDocumentTitle(test.title);
  const imageSrc =
    typeof test.imageSrc === "string" && test.imageSrc.trim()
      ? test.imageSrc.trim()
      : snippetImagePath();
  let imageUrl = absoluteUrl(imageSrc);
  imageUrl = await capOgImageForTelegram(imageUrl);
  const ogImages = ogImageDescriptors(
    imageUrl,
    test.title,
    snippetPixelsIfUrlMatches(imageUrl)
  );

  return {
    title: { absolute: docTitle },
    description: test.description,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "website",
      locale: "ru_RU",
      url: pageUrl,
      siteName: "Setly",
      title: docTitle,
      description: test.description,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: docTitle,
      description: test.description,
      images: [imageUrl],
    },
  };
}

export default async function TestPage({ params }) {
  const resolvedParams = await params;
  const raw = resolvedParams?.slug ?? "";
  const test = getTestByIdOrSlug(raw);
  if (!test) {
    notFound();
  }

  return <TestPageClient test={test} />;
}
