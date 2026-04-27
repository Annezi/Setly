import {
  absoluteDocumentTitle,
  fetchCheckplanOg,
  getSiteOrigin,
  ogImageDescriptors,
  snippetImagePath,
  snippetPixelsIfUrlMatches,
} from "@/app/lib/og-helpers";

export async function generateMetadata({ params }) {
  const p = await params;
  const rawId = p?.ref != null ? decodeURIComponent(String(p.ref)) : "";
  const origin = getSiteOrigin();
  const fallbackImg = snippetImagePath();

  const og = await fetchCheckplanOg(rawId);
  const canonicalSeg = og?.canonicalSegment ?? rawId;
  const canonicalPath = `/preview-checkplan/${encodeURIComponent(canonicalSeg)}`;
  const title = og?.title ?? "Чек-план";
  const description =
    og?.description ??
    "Чек-план в Setly: сборы, маршрут и полезные детали поездки в одном документе.";
  const imageUrl = og?.image ?? `${origin}${fallbackImg}`;
  const ogImages = ogImageDescriptors(
    imageUrl,
    title,
    snippetPixelsIfUrlMatches(imageUrl)
  );
  const docTitle = absoluteDocumentTitle(title);

  return {
    title: { absolute: docTitle },
    description,
    alternates: {
      canonical: `${origin}${canonicalPath}`,
    },
    openGraph: {
      type: "website",
      locale: "ru_RU",
      url: `${origin}${canonicalPath}`,
      siteName: "Setly",
      title: docTitle,
      description,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title: docTitle,
      description,
      images: [imageUrl],
    },
  };
}

export default function PreviewCheckplanLayout({ children }) {
  return children;
}
