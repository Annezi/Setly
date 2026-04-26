"use client";

import { getApiUrl } from "@/app/lib/api";

/** Удаляет хвостовые запятые и лишние пробелы у URL/путей. */
export function normalizeMediaUrl(url, fallback = "") {
	if (url == null || typeof url !== "string") return fallback;
	return url.trim().replace(/,+$/, "").trim();
}

/** Превращает относительный storage-путь в абсолютный URL (если есть API base). */
export function resolveStorageMediaUrl(url, fallback = "") {
	const cleaned = normalizeMediaUrl(url, fallback);
	if (!cleaned) return cleaned;
	const base = getApiUrl();
	if (cleaned.startsWith("/storage") && base) return `${base}${cleaned}`;
	if (!cleaned.startsWith("http") && !cleaned.startsWith("/")) {
		return (base ? `${base.replace(/\/$/, "")}/storage/` : "/storage/") + cleaned;
	}
	return cleaned;
}
