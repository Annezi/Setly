/**
 * Парсинг активных тегов фильтров для сопоставления с карточками.
 * Соответствует тегам из DropdownFilterMenu.
 */

export const CATEGORY_FILTER_TAGS = [
    "В горы",
    "По городам",
    "На пляж",
    "С семьёй или детьми",
    "Долго / Кочёвка",
];

export const REGION_FILTER_TAGS = [
    "Европа",
    "Азия",
    "Кавказ",
    "Россия и СНГ",
    "Ближнее Зарубежье (Турция, Египет, ОАЭ)",
    "Америка",
    "Африка и Океания",
];

export const TRAVELER_FILTER_TAGS = ["Один", "Вдвоём", "Компания", "С детьми"];
export const SEASON_FILTER_TAGS = ["Зима", "Весна", "Лето", "Осень"];

/**
 * Парсит тег длительности в диапазон дней.
 * @param {string} tag — "4 дня", "7-14 дней", "30+ дней"
 * @returns {{ minDays: number, maxDays: number } | null}
 */
export function parseDurationTag(tag) {
    if (!tag || typeof tag !== "string") return null;
    const rangeMatch = tag.match(/^(\d+)-(\d+|\d+\+) дней$/);
    const singleMatch = tag.match(/^(\d+) (день|дня|дней)$/);
    if (rangeMatch) {
        const minDays = parseInt(rangeMatch[1], 10);
        const maxDays = rangeMatch[2] === "30+" ? 30 : parseInt(rangeMatch[2], 10);
        return { minDays, maxDays };
    }
    if (singleMatch) {
        const n = parseInt(singleMatch[1], 10);
        return { minDays: n, maxDays: n };
    }
    if (tag === "30+ дней") return { minDays: 30, maxDays: 30 };
    return null;
}

/**
 * Разбивает массив применённых тегов по типам фильтров + диапазон длительности.
 * @param {string[]} appliedFilterTags
 * @returns {{
 *   categories: string[],
 *   regions: string[],
 *   travelers: string[],
 *   seasons: string[],
 *   duration: { minDays: number, maxDays: number } | null
 * }}
 */
export function parseAppliedFilters(appliedFilterTags) {
    const categories = [];
    const regions = [];
    const travelers = [];
    const seasons = [];
    let duration = null;

    if (!appliedFilterTags || appliedFilterTags.length === 0) {
        return { categories, regions, travelers, seasons, duration };
    }

    for (const tag of appliedFilterTags) {
        if (CATEGORY_FILTER_TAGS.includes(tag)) categories.push(tag);
        else if (REGION_FILTER_TAGS.includes(tag)) regions.push(tag);
        else if (TRAVELER_FILTER_TAGS.includes(tag)) travelers.push(tag);
        else if (SEASON_FILTER_TAGS.includes(tag)) seasons.push(tag);
        else {
            const d = parseDurationTag(tag);
            if (d) duration = d;
        }
    }

    return { categories, regions, travelers, seasons, duration };
}
