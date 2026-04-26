"use client";

import { resolveStorageMediaUrl } from "./checkplan-media";

/** Варианты сортировки списков чек-планов (страница / личный кабинет / фильтры). */
export const CHECK_PLANS_SORT_ITEMS = ["По популярности", "По новизне"];

/** Нормализует карточку из `flatCards` ответа GET /api/check-plans для UI. */
export function mapFlatCheckPlanCardFromApi(c) {
	if (!c || typeof c !== "object") return c;
	return {
		...c,
		imageSrc: resolveStorageMediaUrl(c.imageSrc),
		avatarSrc: resolveStorageMediaUrl(c.avatarSrc) || c.avatarSrc,
	};
}

/**
 * Сортировка списка карточек по индексу в CHECK_PLANS_SORT_ITEMS.
 * @param {Array} list
 * @param {number} sortIndex
 * @param {(id: string) => number} getLikeCount
 */
export function sortCheckPlansByIndex(list, sortIndex, getLikeCount) {
	if (!Array.isArray(list)) return [];
	if (sortIndex < 0) return [...list];
	const label = CHECK_PLANS_SORT_ITEMS[sortIndex];
	if (label === "По популярности") {
		return [...list].sort(
			(a, b) =>
				(getLikeCount(b.id) ?? b.initialLikes ?? b.likes ?? 0) -
				(getLikeCount(a.id) ?? a.initialLikes ?? a.likes ?? 0)
		);
	}
	if (label === "По новизне") {
		return [...list].sort((a, b) => {
			const timeA = a.creationTime ? new Date(a.creationTime).getTime() : 0;
			const timeB = b.creationTime ? new Date(b.creationTime).getTime() : 0;
			return timeB - timeA;
		});
	}
	return [...list];
}
