export const DEFAULT_COVER_IMAGE = "/img/main/japan2025.png";
export const DEFAULT_AVATAR = "/img/main/setlypic.png?v=2";

/** Загрузка обложки через бэкенд POST /api/user/me/save-image/checklist-covers/ */
export const UPLOAD_COVER_API = "/api/user/me/save-image/checklist-covers/";

/** Парсит строку даты "YYYY-MM-DD" или ISO в Date, иначе null */
export function parseDateStr(str) {
	if (!str || typeof str !== "string") return null;
	const trimmed = str.trim();
	if (!trimmed) return null;
	const normalized = trimmed.includes("T") ? trimmed : `${trimmed}T12:00:00`;
	const d = new Date(normalized);
	return Number.isNaN(d.getTime()) ? null : d;
}

/** Форматирует Date в "YYYY-MM-DD" для API */
export function formatDateToYYYYMMDD(date) {
	if (!date || !(date instanceof Date) || Number.isNaN(date.getTime())) return "";
	const y = date.getFullYear();
	const m = String(date.getMonth() + 1).padStart(2, "0");
	const d = String(date.getDate()).padStart(2, "0");
	return `${y}-${m}-${d}`;
}

export function formatLikesCompact(n) {
	if (n >= 1000) return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K`;
	return String(n);
}

export function resolveAvatarSrc(src) {
	if (!src || typeof src !== "string") return DEFAULT_AVATAR;
	if (src.startsWith("http") || src.startsWith("/")) return src;
	return `/storage/${src}`;
}

export const emptyCount = (items) => items.filter((i) => !(i.text || "").trim()).length;
export const canAddItem = (items) => emptyCount(items) < 3;
