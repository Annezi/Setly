export const CAROUSEL_CARD_GAP_PX = 20;
export const CAROUSEL_MIN_CARD_WIDTH_PX = 280;
export const CAROUSEL_MAX_CARD_WIDTH_PX = 335;

/**
 * Подбирает ширину карточки и число видимых карточек (3/2/1) под ширину viewport.
 * Возвращает также смещение для центрирования ряда.
 */
export function computeCarouselLayout(viewportWidth) {
	const W = viewportWidth;
	if (W <= 0) {
		return {
			visibleCount: 1,
			cardWidth: CAROUSEL_MIN_CARD_WIDTH_PX,
			centerOffset: 0,
		};
	}

	const raw3 = (W - 2 * CAROUSEL_CARD_GAP_PX) / 3;
	if (raw3 >= CAROUSEL_MIN_CARD_WIDTH_PX) {
		const cardWidth = Math.min(CAROUSEL_MAX_CARD_WIDTH_PX, raw3);
		const rowWidth = 3 * cardWidth + 2 * CAROUSEL_CARD_GAP_PX;
		const centerOffset = Math.max(0, (W - rowWidth) / 2);
		return { visibleCount: 3, cardWidth, centerOffset };
	}

	const raw2 = (W - CAROUSEL_CARD_GAP_PX) / 2;
	if (raw2 >= CAROUSEL_MIN_CARD_WIDTH_PX) {
		const cardWidth = Math.min(CAROUSEL_MAX_CARD_WIDTH_PX, raw2);
		const rowWidth = 2 * cardWidth + CAROUSEL_CARD_GAP_PX;
		const centerOffset = Math.max(0, (W - rowWidth) / 2);
		return { visibleCount: 2, cardWidth, centerOffset };
	}

	const cardWidth = Math.min(
		CAROUSEL_MAX_CARD_WIDTH_PX,
		Math.max(CAROUSEL_MIN_CARD_WIDTH_PX, W),
	);
	const centerOffset = Math.max(0, (W - cardWidth) / 2);
	return { visibleCount: 1, cardWidth, centerOffset };
}
