import {
  getArticleOgImagePaths,
  getSiteOrigin,
  ogImageDescriptors,
  snippetImagePath,
  absoluteUrl,
  snippetPixelsIfUrlMatches,
} from "@/app/lib/og-helpers";
import { getArticleById } from "@/data/articles-data";

export async function generateMetadata({ params }) {
  const p = await params;
  const id = p?.id != null ? String(p.id) : "";
  const article = getArticleById(id);
  const origin = getSiteOrigin();
  const fallbackImg = snippetImagePath();

  if (!article) {
    const nfUrl = `${origin}${fallbackImg}`;
    const nfImages = ogImageDescriptors(
      nfUrl,
      "Setly",
      snippetPixelsIfUrlMatches(nfUrl)
    );
    return {
      title: "Статья не найдена",
      description: "Статья не найдена или удалена.",
      openGraph: {
        type: "website",
        locale: "ru_RU",
        url: `${origin}/articles/${encodeURIComponent(id)}`,
        siteName: "Setly",
        title: "Статья не найдена",
        description: "Статья не найдена или удалена.",
        images: nfImages,
      },
      twitter: {
        card: "summary_large_image",
        title: "Статья не найдена",
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
  const imageUrl = imgPaths.length ? absoluteUrl(imgPaths[0]) : `${origin}${fallbackImg}`;
  const articleOgImages = ogImageDescriptors(
    imageUrl,
    articleTitle,
    snippetPixelsIfUrlMatches(imageUrl)
  );

  const canonicalPath = `/articles/${encodeURIComponent(id)}`;

  return {
    title,
    description,
    alternates: {
      canonical: `${origin}${canonicalPath}`,
    },
    openGraph: {
      type: "article",
      locale: "ru_RU",
      url: `${origin}${canonicalPath}`,
      siteName: "Setly",
      title,
      description,
      images: articleOgImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default function ArticleSegmentLayout({ children }) {
  return children;
}
