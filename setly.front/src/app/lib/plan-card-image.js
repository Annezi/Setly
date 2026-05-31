/** Круглая обложка на карточках чек-планов (max-width в CSS — 264px). */
export const PLAN_CARD_COVER_SIZE = 264;

/** Через next/image на карточках запрашиваем до ~1400px (не оригинал). */
export const PLAN_CARD_COVER_MAX_PX = 1400;
export const PLAN_CARD_COVER_SIZES = `${PLAN_CARD_COVER_MAX_PX}px`;
export const PLAN_CARD_COVER_QUALITY = 90;

/** Маска обложки на странице плана (464:270). Сохраняем в высоком разрешении. */
export const CHECKPLAN_COVER_ASPECT_RATIO = 464 / 270;
export const CHECKPLAN_COVER_CROP_OUTPUT_WIDTH = 3840;
export const CHECKPLAN_COVER_CROP_OUTPUT_HEIGHT = Math.round(
	CHECKPLAN_COVER_CROP_OUTPUT_WIDTH / CHECKPLAN_COVER_ASPECT_RATIO
);
