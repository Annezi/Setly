import "./globals.css";
import DisableImageDrag from "./components/globals/DisableImageDrag";
import ScrollToTop from "./components/globals/ScrollToTop";
import RoutePrefetcher from "./components/globals/RoutePrefetcher";
import { LikedChecklistsProvider } from "./lib/liked-checklists-context";

const siteDescription =
  "Мы разработали чек-планы, которые позволяют быстро спланировать путешествие и сосредоточиться на том, что действительно важно. Скажи «пока» тревоге при планировании путешествий.";
const siteTitle = "Setly - чекпланы для планирования путешествий";
const siteUrl = "https://setly.space";
const previewImageUrl = `${siteUrl}/img/main/setlyPreview.png`;

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Setly",
  url: siteUrl,
  inLanguage: "ru-RU",
  description: siteDescription,
  hasPart: [
    {
      "@type": "SiteNavigationElement",
      name: "Чек-планы",
      description:
        "Чек-листы для путешественников: что взять с собой и к чему быть готовым по приезду в любую страну или город.",
      url: `${siteUrl}/check-plans`,
    },
    {
      "@type": "SiteNavigationElement",
      name: "Статьи",
      description:
        "Полезные статьи о путешествиях: советы, лайфхаки, гиды по странам и городам, рекомендации опытных путешественников.",
      url: `${siteUrl}/articles`,
    },
    {
      "@type": "SiteNavigationElement",
      name: "Тесты",
      description:
        "Интерактивные тесты помогут определить ваш стиль путешествий и подобрать идеальное направление для отдыха.",
      url: `${siteUrl}/tests`,
    },
    {
      "@type": "SiteNavigationElement",
      name: "О нас",
      description:
        "Узнайте больше о нашей команде, философии проекта и людях, которые делают ваши путешествия лучше.",
      url: `${siteUrl}/about`,
    },
  ],
};

export const metadata = {
  title: {
    default: siteTitle,
    template: "%s | Setly",
  },
  metadataBase: new URL(siteUrl),
  description: siteDescription,
  applicationName: "Setly",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    siteName: "Setly",
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: previewImageUrl,
        alt: "Setly — чекпланы для планирования путешествий",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [previewImageUrl],
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: ["/icon.svg"],
    apple: [{ url: "/icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({ children }) {
    return (
        <html lang="ru">
            <head>
              <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
              />
            </head>
            <body>
                <LikedChecklistsProvider>
                    <DisableImageDrag />
                    <ScrollToTop />
                    <RoutePrefetcher />
                    {children}
                </LikedChecklistsProvider>
            </body>
        </html>
    );
}