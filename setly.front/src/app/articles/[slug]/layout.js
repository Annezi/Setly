import {
  absoluteDocumentTitle,
  capOgImageForTelegram,
  getArticleOgImagePaths,
  getSiteOrigin,
  ogImageDescriptors,
  snippetImagePath,
  absoluteUrl,
  snippetPixelsIfUrlMatches,
} from "@/app/lib/og-helpers";
import {
  getArticleByIdOrSlug,
  getArticleCanonicalSlug,
} from "@/data/articles-data";

export async function generateMetadata({ params }) {
  const p = await params;
  const slugParam = p?.slug != null ? String(p.slug) : "";
  const article = getArticleByIdOrSlug(slugParam);
  const origin = getSiteOrigin();
  const fallbackImg = snippetImagePath();

  const canonicalSegment =
    article && /^\d+$/.test(slugParam)
      ? getArticleCanonicalSlug(Number(slugParam)) || slugParam
      : slugParam;

  if (!article) {
    const nfUrl = `${origin}${fallbackImg}`;
    const nfImages = ogImageDescriptors(
      nfUrl,
      "Setly",
      snippetPixelsIfUrlMatches(nfUrl)
    );
    const nfTitle = absoluteDocumentTitle("Статья не найдена");
    return {
      title: { absolute: nfTitle },
      description: "Статья не найдена или удалена.",
      openGraph: {
        type: "website",
        locale: "ru_RU",
        url: `${origin}/articles/${encodeURIComponent(slugParam)}`,
        siteName: "Setly",
        title: nfTitle,
        description: "Статья не найдена или удалена.",
        images: nfImages,
      },
      twitter: {
        card: "summary_large_image",
        title: nfTitle,
        description: "Статья не найдена или удалена.",
        images: [nfUrl],
      },
    };
  }

  const articleTitle = article.title || "";
  const title = `Статья «${articleTitle}»`;
  const description =
    typeof article.description === "string" && article.description.trim()
      ? article.description.trim()
      : article.preamble && typeof article.preamble === "string"
        ? article.preamble.slice(0, 200)
        : "Статья о путешествиях в Setly";

  const imgPaths = getArticleOgImagePaths(article);
  let imageUrl = imgPaths.length ? absoluteUrl(imgPaths[0]) : `${origin}${fallbackImg}`;
  imageUrl = await capOgImageForTelegram(imageUrl);
  const articleOgImages = ogImageDescriptors(
    imageUrl,
    articleTitle,
    snippetPixelsIfUrlMatches(imageUrl)
  );

  const canonicalPath = `/articles/${encodeURIComponent(canonicalSegment)}`;
  const docTitle = absoluteDocumentTitle(title);

  return {
    title: { absolute: docTitle },
    description,
    alternates: {
      canonical: `${origin}${canonicalPath}`,
    },
    openGraph: {
      type: "article",
      locale: "ru_RU",
      url: `${origin}${canonicalPath}`,
      siteName: "Setly",
      title: docTitle,
      description,
      images: articleOgImages,
    },
    twitter: {
      card: "summary_large_image",
      title: docTitle,
      description,
      images: [imageUrl],
    },
  };
}

export default function ArticleSegmentLayout({ children }) {
  return children;
}
