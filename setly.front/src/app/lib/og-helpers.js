/**
 * Абсолютные URL и данные для Open Graph / Twitter Card (превью ссылок).
 *
 * Совместимость превью: Telegram, ВКонтакте и мессенджер MAX опираются на протокол Open Graph
 * (как Facebook/Meta): og:title, og:description, og:url, og:image, при необходимости secure_url,
 * width/height. Дополнительно twitter:card=summary_large_image улучшает крупную карточку в TG.
 *
 * Переменные окружения (приоритет сверху вниз):
 * — NEXT_PUBLIC_SITE_URL — канонический origin сайта (https://setly.space).
 * — NEXT_PUBLIC_API_URL — публичный URL API (для og:image и браузера).
 * — На сервере Node (generateMetadata): METADATA_API_URL или API_INTERNAL_URL —
 *   прямой запрос к API (например http://setly-api:8000 в Docker); на клиенте не используется.
 */

const DEFAULT_SITE = "https://setly.space";
const DEFAULT_PUBLIC_API = "https://api.setly.space";

function trimUrl(s) {
  if (typeof s !== "string") return "";
  return s.trim().replace(/\/$/, "");
}

/**
 * Публичный origin сайта (canonical, og:url).
 */
export function getSiteOrigin() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL || process.env.VERCEL_URL;
  if (fromEnv && typeof fromEnv === "string") {
    const u = fromEnv.trim();
    if (u.startsWith("http")) return u.replace(/\/$/, "");
    return `https://${u.replace(/\/$/, "")}`;
  }
  return DEFAULT_SITE.replace(/\/$/, "");
}

/**
 * Публичный базовый URL API — для ссылок в разметке (og:image с /storage), всегда доступен с интернета.
 */
export function getPublicApiOrigin() {
  const explicit = trimUrl(process.env.NEXT_PUBLIC_API_URL);
  if (explicit) return explicit;

  const site = trimUrl(process.env.NEXT_PUBLIC_SITE_URL);
  if (site) {
    try {
      const normalized = site.startsWith("http") ? site : `https://${site}`;
      const u = new URL(normalized);
      const host = u.hostname.replace(/^www\./, "");
      if (!host) return DEFAULT_PUBLIC_API;
      return `${u.protocol}//api.${host}`;
    } catch (_) {
      /* fall through */
    }
  }

  return DEFAULT_PUBLIC_API;
}

/**
 * Базовый URL для HTTP-запросов к API из серверных layout/metadata.
 * В Docker может указывать на сервис по имени (http://setly-api:8000).
 */
export function getMetadataFetchApiUrl() {
  if (typeof window !== "undefined") {
    return getPublicApiOrigin();
  }

  const internal = trimUrl(
    process.env.METADATA_API_URL || process.env.API_INTERNAL_URL
  );
  if (internal) return internal;

  return getPublicApiOrigin();
}

export function snippetImagePath() {
  return "/img/main/snippet.jpg";
}

/** Реальные пиксели файла `public/img/main/snippet.jpg` (для og:image:width / height). */
export const SNIPPET_IMAGE_PIXELS = { width: 1920, height: 1400 };

/**
 * Один объект для Next.js `metadata.openGraph.images` — то же увидят парсеры TG / VK / MAX.
 * @param {string} absoluteUrl
 * @param {string} [alt]
 * @param {{ width?: number; height?: number } | null} [pixels] — только если известны точные размеры файла.
 */
export function ogImageDescriptors(absoluteUrl, alt, pixels = null) {
  const u = typeof absoluteUrl === "string" ? absoluteUrl.trim() : "";
  if (!u) return [];
  const entry = {
    url: u,
    alt: alt || "Setly",
  };
  if (u.startsWith("https://")) {
    entry.secureUrl = u;
  }
  if (pixels && pixels.width > 0 && pixels.height > 0) {
    entry.width = pixels.width;
    entry.height = pixels.height;
  }
  return [entry];
}

/** Подставить размеры только для дефолтного snippet (известный файл). */
export function snippetPixelsIfUrlMatches(absoluteUrl) {
  const u = typeof absoluteUrl === "string" ? absoluteUrl.trim() : "";
  if (!u) return null;
  const origin = getSiteOrigin();
  const snippetAbs = `${origin}${snippetImagePath()}`;
  if (u === snippetAbs || u.endsWith(snippetImagePath())) {
    return SNIPPET_IMAGE_PIXELS;
  }
  return null;
}

export function absoluteUrl(pathOrUrl) {
  if (!pathOrUrl || typeof pathOrUrl !== "string") {
    return `${getSiteOrigin()}${snippetImagePath()}`;
  }
  const t = pathOrUrl.trim();
  if (!t) return `${getSiteOrigin()}${snippetImagePath()}`;
  if (t.startsWith("http://") || t.startsWith("https://")) return t;
  if (t.startsWith("//")) return `https:${t}`;
  const path = t.startsWith("/") ? t : `/${t}`;
  return `${getSiteOrigin()}${path}`;
}

/** Обложка чек-плана из API (относительный путь или полный URL). */
export function absoluteCheckplanImage(imageSrc) {
  if (!imageSrc || typeof imageSrc !== "string") {
    return `${getSiteOrigin()}${snippetImagePath()}`;
  }
  const t = imageSrc.trim();
  if (!t) return `${getSiteOrigin()}${snippetImagePath()}`;
  if (t.startsWith("http://") || t.startsWith("https://")) return t;
  const site = getSiteOrigin();
  /** Статика из `public/` фронта (обложки в /img/…), не с API-хоста. */
  if (t.startsWith("/img/") || t.startsWith("/icons/")) {
    return `${site}${t}`;
  }
  const api = getPublicApiOrigin();
  if (t.startsWith("/storage/")) return `${api}${t}`;
  if (t.startsWith("/")) return `${api}${t}`;
  return `${api}/storage/${t}`;
}

/**
 * @param {string | undefined} idStr
 * @returns {Promise<{ title: string; description?: string; image: string } | null>}
 */
export async function fetchCheckplanOg(idStr) {
  if (!idStr || typeof idStr !== "string") return null;
  const api = getMetadataFetchApiUrl();
  try {
    const res = await fetch(`${api}/api/check-plans/${encodeURIComponent(idStr)}`, {
      next: { revalidate: 120 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    const plan = await res.json();
    const title = typeof plan.title === "string" ? plan.title.trim() : "";
    const description =
      typeof plan.description === "string" && plan.description.trim()
        ? plan.description.trim()
        : undefined;
    const image = absoluteCheckplanImage(plan.image_src || "");
    return {
      title: title || "Чек-план",
      description,
      image,
    };
  } catch {
    return null;
  }
}

/**
 * @param {string | undefined} uid
 * @returns {Promise<{ nickname: string; profile_photo_url: string } | null>}
 */
export async function fetchUserOgPreview(uid) {
  const n = Number(uid);
  if (!Number.isInteger(n) || n < 1) return null;
  const api = getMetadataFetchApiUrl();
  try {
    const res = await fetch(`${api}/api/user/public-profile/${n}`, {
      next: { revalidate: 120 },
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/** Первое «тело» статьи — блок figureImage в вёрстке (image1). */
export function getArticleOgImagePaths(article) {
  if (!article) return [];
  const paths = [];
  if (article.image1 && typeof article.image1 === "string") paths.push(article.image1.trim());
  if (article.heroImage && typeof article.heroImage === "string") paths.push(article.heroImage.trim());
  return paths.filter(Boolean);
}
