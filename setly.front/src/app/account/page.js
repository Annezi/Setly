import AccountPageClient from "./account-page-client.jsx";
import {
  absoluteUrl,
  fetchUserOgPreview,
  getSiteOrigin,
  ogImageDescriptors,
  snippetImagePath,
  snippetPixelsIfUrlMatches,
} from "@/app/lib/og-helpers";

export async function generateMetadata({ searchParams }) {
  const sp = await searchParams;
  const uidRaw = sp?.uid ?? sp?.user;
  const uid = Array.isArray(uidRaw) ? uidRaw[0] : uidRaw;

  const origin = getSiteOrigin();
  const snippetRel = snippetImagePath();
  const snippetAbs = `${origin}${snippetRel}`;
  const baseAccountUrl = `${origin}/account`;
  const accountUrl =
    uid != null && String(uid).trim() !== ""
      ? `${baseAccountUrl}?uid=${encodeURIComponent(String(uid).trim())}`
      : baseAccountUrl;

  const fallbackTitle = "Личный кабинет";
  const fallbackDesc =
    "Ваш профиль и чек-планы в Setly — планирование путешествий без лишней суеты.";
  const snippetOg = ogImageDescriptors(
    snippetAbs,
    "Setly",
    snippetPixelsIfUrlMatches(snippetAbs)
  );

  if (uid != null && String(uid).trim() !== "") {
    const preview = await fetchUserOgPreview(uid);
    if (!preview) {
      return {
        title: fallbackTitle,
        description: fallbackDesc,
        alternates: { canonical: accountUrl },
        openGraph: {
          type: "website",
          locale: "ru_RU",
          url: accountUrl,
          siteName: "Setly",
          title: fallbackTitle,
          description: fallbackDesc,
          images: snippetOg,
        },
        twitter: {
          card: "summary_large_image",
          title: fallbackTitle,
          description: fallbackDesc,
          images: [snippetAbs],
        },
      };
    }
    const nickname = preview?.nickname?.trim() || "Пользователь";
    const title = `Профиль пользователя ${nickname} в сервисе Setly`;
    const rawPhoto =
      typeof preview?.profile_photo_url === "string"
        ? preview.profile_photo_url.trim()
        : "";
    const imageUrl =
      rawPhoto !== "" ? absoluteUrl(rawPhoto) : snippetAbs;
    const profileOg = ogImageDescriptors(
      imageUrl,
      nickname,
      snippetPixelsIfUrlMatches(imageUrl)
    );

    return {
      title,
      description: fallbackDesc,
      alternates: {
        canonical: accountUrl,
      },
      openGraph: {
        type: "website",
        locale: "ru_RU",
        url: accountUrl,
        siteName: "Setly",
        title,
        description: fallbackDesc,
        images: profileOg,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description: fallbackDesc,
        images: [imageUrl],
      },
    };
  }

  return {
    title: fallbackTitle,
    description: fallbackDesc,
    alternates: {
      canonical: baseAccountUrl,
    },
    openGraph: {
      type: "website",
      locale: "ru_RU",
      url: baseAccountUrl,
      siteName: "Setly",
      title: fallbackTitle,
      description: fallbackDesc,
      images: snippetOg,
    },
    twitter: {
      card: "summary_large_image",
      title: fallbackTitle,
      description: fallbackDesc,
      images: [snippetAbs],
    },
  };
}

export default function PersonalAccountPage() {
  return <AccountPageClient />;
}
