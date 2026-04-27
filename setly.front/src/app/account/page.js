import AccountPageClient from "./account-page-client.jsx";
import {
  generateProfileShareMetadata,
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

  const fallbackTitle = "Личный кабинет";
  const fallbackDesc =
    "Ваш профиль и чек-планы в Setly — планирование путешествий без лишней суеты.";
  const snippetOg = ogImageDescriptors(
    snippetAbs,
    "Setly",
    snippetPixelsIfUrlMatches(snippetAbs)
  );

  if (uid != null && String(uid).trim() !== "") {
    const meta = await generateProfileShareMetadata(String(uid).trim());
    return meta ?? {
      title: { absolute: fallbackTitle },
      description: fallbackDesc,
      alternates: { canonical: baseAccountUrl },
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

  return {
    title: { absolute: fallbackTitle },
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
