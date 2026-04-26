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

const websiteJsonLdHtml = JSON.stringify(websiteJsonLd)
  .replace(/</g, "\\u003c")
  .replace(/\u2028/g, "\\u2028")
  .replace(/\u2029/g, "\\u2029");

const yandexMetrikaInitScript = `(function(m,e,t,r,i,k,a){
    m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
    m[i].l=1*new Date();
    for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
    k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=108769675', 'ym');
ym(108769675, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});`;

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: websiteJsonLdHtml }}
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{ __html: yandexMetrikaInitScript }}
        />
      </head>
      <body>
        <noscript>
          <div>
            <img
              src="https://mc.yandex.ru/watch/108769675"
              style={{ position: "absolute", left: "-9999px" }}
              alt=""
            />
          </div>
        </noscript>
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