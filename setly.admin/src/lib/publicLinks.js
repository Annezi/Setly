/**
 * Ссылки на публичный фронт (профиль, превью чек-плана).
 * По умолчанию https://setly.space — чтобы ссылки с admin.* открывали основной сайт.
 * Переопределение: NEXT_PUBLIC_SITE_URL (например staging URL).
 */

const DEFAULT_PUBLIC_SITE = "https://setly.space";

const RU_LATIN = {
  а: "a",
  б: "b",
  в: "v",
  г: "g",
  д: "d",
  е: "e",
  ё: "e",
  ж: "zh",
  з: "z",
  и: "i",
  й: "y",
  к: "k",
  л: "l",
  м: "m",
  н: "n",
  о: "o",
  п: "p",
  р: "r",
  с: "s",
  т: "t",
  у: "u",
  ф: "f",
  х: "h",
  ц: "ts",
  ч: "ch",
  ш: "sh",
  щ: "sch",
  ъ: "",
  ы: "y",
  ь: "",
  э: "e",
  ю: "yu",
  я: "ya",
};

function transliterateRuToLatin(input) {
  if (input == null || typeof input !== "string") return "";
  let out = "";
  for (let i = 0; i < input.length; i += 1) {
    const ch = input[i];
    const lower = ch.toLowerCase();
    if (RU_LATIN[lower] !== undefined) {
      out += RU_LATIN[lower];
      continue;
    }
    if (/[a-z0-9]/.test(lower)) {
      out += lower;
      continue;
    }
    if (/[\s_.]/u.test(ch)) {
      out += "-";
    }
  }
  return out.replace(/-+/g, "-").replace(/^-|-$/g, "");
}

function slugifyLatin(input, maxLen = 64) {
  let s = transliterateRuToLatin(input);
  s = s.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  if (s.length > maxLen) s = s.slice(0, maxLen).replace(/-+$/g, "");
  return s || "item";
}

export function publicSiteBase() {
  const b = typeof process !== "undefined" ? process.env.NEXT_PUBLIC_SITE_URL : "";
  return (b || DEFAULT_PUBLIC_SITE).replace(/\/$/, "");
}

export function absolutePublicUrl(path) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${publicSiteBase()}${p}`;
}

/** Путь профиля: /u/{slug}-{userId} */
export function buildProfilePath(userId, nickname) {
  const id = Number(userId);
  if (!Number.isInteger(id) || id < 1) return null;
  const slug = slugifyLatin(nickname || "", 48);
  return `/u/${slug}-${id}`;
}

function coerceCheckplanNumericId(plan) {
  if (plan == null || typeof plan !== "object") return null;
  const keys = ["planDbId", "plan_id", "planId", "id"];
  for (const k of keys) {
    const v = plan[k];
    const n = Number(v);
    if (Number.isInteger(n) && n > 0) return n;
  }
  return null;
}

/** Сегмент URL превью чек-плана (как на основном сайте). */
export function buildCheckplanPreviewSegment(plan) {
  const title = typeof plan?.title === "string" ? plan.title : "";
  const slug = slugifyLatin(title, 56);
  const nid = coerceCheckplanNumericId(plan);
  if (nid != null) return `${slug}-${nid}`;
  const idStr = plan?.id_str != null ? String(plan.id_str) : "";
  return idStr || slug || "plan";
}

export function buildCheckplanPreviewPath(plan) {
  const seg = buildCheckplanPreviewSegment(plan);
  return `/preview-checkplan/${encodeURIComponent(seg)}`;
}
