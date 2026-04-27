import {
  fetchCheckplanOg,
  getSiteOrigin,
  ogImageDescriptors,
  snippetImagePath,
  snippetPixelsIfUrlMatches,
} from "@/app/lib/og-helpers";

export async function generateMetadata({ params }) {
  const p = await params;
  const rawId = p?.id != null ? decodeURIComponent(String(p.id)) : "";
  const origin = getSiteOrigin();
  const fallbackImg = snippetImagePath();
  const canonicalPath = `/create-checkplan/${encodeURIComponent(rawId)}`;

  const og = await fetchCheckplanOg(rawId);
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

  return {
    title,
    description,
    alternates: {
      canonical: `${origin}${canonicalPath}`,
    },
    openGraph: {
      type: "website",
      locale: "ru_RU",
      url: `${origin}${canonicalPath}`,
      siteName: "Setly",
      title,
      description,
      images: ogImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default function EditCheckplanLayout({ children }) {
  return children;
}
