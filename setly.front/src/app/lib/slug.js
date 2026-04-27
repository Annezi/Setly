/** Транслитерация кириллицы (RU) и slug для человекочитаемых URL. */

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

/**
 * Грубая транслитерация русской строки в латиницу (нижний регистр).
 * Подходит для slug; не замена ICU-транслитерации для имён собственных.
 */
export function transliterateRuToLatin(input) {
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

/**
 * Человекочитаемый сегмент URL: только [a-z0-9], без двойных дефисов.
 */
export function slugifyLatin(input, maxLen = 64) {
  let s = transliterateRuToLatin(input);
  s = s.replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  if (s.length > maxLen) s = s.slice(0, maxLen).replace(/-+$/g, "");
  return s || "item";
}

/**
 * Публичный путь профиля: /u/{slug}-{userId}. userId в конце гарантирует уникальность.
 */
export function buildProfilePublicPath(userId, nickname) {
  const id = Number(userId);
  if (!Number.isInteger(id) || id < 1) return "/account";
  const slug = slugifyLatin(nickname || "", 48);
  return `/u/${slug}-${id}`;
}

/**
 * Разбор сегмента /u/{userRef}: ожидается …-{positiveInt} в конце.
 */
export function parseProfilePublicRef(userRef) {
  const raw = decodeURIComponent(String(userRef ?? "").trim());
  if (!raw) return { userId: null };
  const m = raw.match(/^(.+)-(\d+)$/);
  if (!m) return { userId: null };
  const userId = Number(m[2]);
  if (!Number.isInteger(userId) || userId < 1) return { userId: null };
  return { userId, slugHint: m[1] };
}

/**
 * Числовой PK чек-плана из ответа API / карточки (для короткого URL slug-id).
 */
function coerceCheckplanNumericId(plan) {
  if (plan == null || typeof plan !== "object") return null;
  const keys = ["planDbId", "plan_id", "planId"];
  for (const k of keys) {
    const v = plan[k];
    const n = Number(v);
    if (Number.isInteger(n) && n > 0) return n;
  }
  if (typeof plan.id === "number" && Number.isInteger(plan.id) && plan.id > 0) {
    return plan.id;
  }
  return null;
}

/**
 * Сегмент URL чек-плана: «транслит-названия-{plan_pk}», как у профиля /u/nick-user_id.
 * PK из БД однозначен; без него — fallback на legacy id_str (старые каталоговые slug).
 */
export function buildCheckplanPublicSegment(plan) {
  const title = typeof plan?.title === "string" ? plan.title : "";
  const slug = slugifyLatin(title, 56);
  const nid = coerceCheckplanNumericId(plan);
  if (nid != null) return `${slug}-${nid}`;
  const idStr =
    plan?.id_str != null ? String(plan.id_str) : "";
  return idStr || slug || "plan";
}

/**
 * Сегмент из пути как есть — разбор делает GET /api/check-plans/{ref}.
 */
export function parseCheckplanUrlSegment(segment) {
  return decodeURIComponent(String(segment ?? "").trim());
}
