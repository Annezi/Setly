/**
 * Локации (страна и/или город) с привязкой к региону/направлению из DropdownFilterMenu.
 * Используется для дропдауна "Место" в create-checkplan.
 */
import { REGION_FILTER_TAGS } from "@/app/components/blocks/check-plans/utils/parseFilterTags";

/** Один из семи регионов фильтра */
const [
	REGION_EUROPE,
	REGION_ASIA,
	REGION_CAUCASUS,
	REGION_RUSSIA_CIS,
	REGION_NEAR_ABROAD,
	REGION_AMERICA,
	REGION_AFRICA_OCEANIA,
] = REGION_FILTER_TAGS;

/**
 * Список локаций: { label, region }.
 * label — строка для отображения и поиска (страна или "Город, Страна").
 * region — один из REGION_FILTER_TAGS для подвязки чеклиста к направлению.
 */
export const LOCATIONS_BY_REGION = [
	// Европа
	{ label: "Италия", region: REGION_EUROPE },
	{ label: "Рим, Италия", region: REGION_EUROPE },
	{ label: "Милан, Италия", region: REGION_EUROPE },
	{ label: "Венеция, Италия", region: REGION_EUROPE },
	{ label: "Франция", region: REGION_EUROPE },
	{ label: "Париж, Франция", region: REGION_EUROPE },
	{ label: "Ницца, Франция", region: REGION_EUROPE },
	{ label: "Испания", region: REGION_EUROPE },
	{ label: "Барселона, Испания", region: REGION_EUROPE },
	{ label: "Мадрид, Испания", region: REGION_EUROPE },
	{ label: "Германия", region: REGION_EUROPE },
	{ label: "Берлин, Германия", region: REGION_EUROPE },
	{ label: "Мюнхен, Германия", region: REGION_EUROPE },
	{ label: "Греция", region: REGION_EUROPE },
	{ label: "Афины, Греция", region: REGION_EUROPE },
	{ label: "Санторини, Греция", region: REGION_EUROPE },
	{ label: "Португалия", region: REGION_EUROPE },
	{ label: "Лиссабон, Португалия", region: REGION_EUROPE },
	{ label: "Чехия", region: REGION_EUROPE },
	{ label: "Прага, Чехия", region: REGION_EUROPE },
	{ label: "Австрия", region: REGION_EUROPE },
	{ label: "Вена, Австрия", region: REGION_EUROPE },
	{ label: "Великобритания", region: REGION_EUROPE },
	{ label: "Лондон, Великобритания", region: REGION_EUROPE },
	{ label: "Нидерланды", region: REGION_EUROPE },
	{ label: "Амстердам, Нидерланды", region: REGION_EUROPE },
	{ label: "Швейцария", region: REGION_EUROPE },
	{ label: "Цюрих, Швейцария", region: REGION_EUROPE },
	// Азия
	{ label: "Китай", region: REGION_ASIA },
	{ label: "Пекин, Китай", region: REGION_ASIA },
	{ label: "Шанхай, Китай", region: REGION_ASIA },
	{ label: "Гуанчжоу, Китай", region: REGION_ASIA },
	{ label: "Япония", region: REGION_ASIA },
	{ label: "Токио, Япония", region: REGION_ASIA },
	{ label: "Киото, Япония", region: REGION_ASIA },
	{ label: "Осака, Япония", region: REGION_ASIA },
	{ label: "Таиланд", region: REGION_ASIA },
	{ label: "Бангкок, Таиланд", region: REGION_ASIA },
	{ label: "Пхукет, Таиланд", region: REGION_ASIA },
	{ label: "Вьетнам", region: REGION_ASIA },
	{ label: "Хошимин, Вьетнам", region: REGION_ASIA },
	{ label: "Ханой, Вьетнам", region: REGION_ASIA },
	{ label: "Индия", region: REGION_ASIA },
	{ label: "Дели, Индия", region: REGION_ASIA },
	{ label: "Гоа, Индия", region: REGION_ASIA },
	{ label: "Южная Корея", region: REGION_ASIA },
	{ label: "Сеул, Южная Корея", region: REGION_ASIA },
	{ label: "Сингапур", region: REGION_ASIA },
	{ label: "Индонезия", region: REGION_ASIA },
	{ label: "Бали, Индонезия", region: REGION_ASIA },
	{ label: "Малайзия", region: REGION_ASIA },
	{ label: "Куала-Лумпур, Малайзия", region: REGION_ASIA },
	// Кавказ
	{ label: "Грузия", region: REGION_CAUCASUS },
	{ label: "Тбилиси, Грузия", region: REGION_CAUCASUS },
	{ label: "Батуми, Грузия", region: REGION_CAUCASUS },
	{ label: "Армения", region: REGION_CAUCASUS },
	{ label: "Ереван, Армения", region: REGION_CAUCASUS },
	{ label: "Азербайджан", region: REGION_CAUCASUS },
	{ label: "Баку, Азербайджан", region: REGION_CAUCASUS },
	// Россия и СНГ
	{ label: "Россия", region: REGION_RUSSIA_CIS },
	{ label: "Москва, Россия", region: REGION_RUSSIA_CIS },
	{ label: "Санкт-Петербург, Россия", region: REGION_RUSSIA_CIS },
	{ label: "Казань, Россия", region: REGION_RUSSIA_CIS },
	{ label: "Сочи, Россия", region: REGION_RUSSIA_CIS },
	{ label: "Казахстан", region: REGION_RUSSIA_CIS },
	{ label: "Алматы, Казахстан", region: REGION_RUSSIA_CIS },
	{ label: "Астана, Казахстан", region: REGION_RUSSIA_CIS },
	{ label: "Узбекистан", region: REGION_RUSSIA_CIS },
	{ label: "Ташкент, Узбекистан", region: REGION_RUSSIA_CIS },
	{ label: "Самарканд, Узбекистан", region: REGION_RUSSIA_CIS },
	{ label: "Беларусь", region: REGION_RUSSIA_CIS },
	{ label: "Минск, Беларусь", region: REGION_RUSSIA_CIS },
	// Ближнее Зарубежье (Турция, Египет, ОАЭ)
	{ label: "Турция", region: REGION_NEAR_ABROAD },
	{ label: "Стамбул, Турция", region: REGION_NEAR_ABROAD },
	{ label: "Анталья, Турция", region: REGION_NEAR_ABROAD },
	{ label: "Египет", region: REGION_NEAR_ABROAD },
	{ label: "Каир, Египет", region: REGION_NEAR_ABROAD },
	{ label: "Хургада, Египет", region: REGION_NEAR_ABROAD },
	{ label: "Шарм-эль-Шейх, Египет", region: REGION_NEAR_ABROAD },
	{ label: "ОАЭ", region: REGION_NEAR_ABROAD },
	{ label: "Дубай, ОАЭ", region: REGION_NEAR_ABROAD },
	{ label: "Абу-Даби, ОАЭ", region: REGION_NEAR_ABROAD },
	// Америка
	{ label: "США", region: REGION_AMERICA },
	{ label: "Нью-Йорк, США", region: REGION_AMERICA },
	{ label: "Лос-Анджелес, США", region: REGION_AMERICA },
	{ label: "Майами, США", region: REGION_AMERICA },
	{ label: "Бразилия", region: REGION_AMERICA },
	{ label: "Рио-де-Жанейро, Бразилия", region: REGION_AMERICA },
	{ label: "Мексика", region: REGION_AMERICA },
	{ label: "Канкун, Мексика", region: REGION_AMERICA },
	{ label: "Канада", region: REGION_AMERICA },
	{ label: "Торонто, Канада", region: REGION_AMERICA },
	{ label: "Ванкувер, Канада", region: REGION_AMERICA },
	{ label: "Куба", region: REGION_AMERICA },
	{ label: "Гавана, Куба", region: REGION_AMERICA },
	{ label: "Аргентина", region: REGION_AMERICA },
	{ label: "Буэнос-Айрес, Аргентина", region: REGION_AMERICA },
	// Африка и Океания
	{ label: "Марокко", region: REGION_AFRICA_OCEANIA },
	{ label: "Марракеш, Марокко", region: REGION_AFRICA_OCEANIA },
	{ label: "ЮАР", region: REGION_AFRICA_OCEANIA },
	{ label: "Кейптаун, ЮАР", region: REGION_AFRICA_OCEANIA },
	{ label: "Кения", region: REGION_AFRICA_OCEANIA },
	{ label: "Танзания", region: REGION_AFRICA_OCEANIA },
	{ label: "Занзибар, Танзания", region: REGION_AFRICA_OCEANIA },
	{ label: "Австралия", region: REGION_AFRICA_OCEANIA },
	{ label: "Сидней, Австралия", region: REGION_AFRICA_OCEANIA },
	{ label: "Мельбурн, Австралия", region: REGION_AFRICA_OCEANIA },
	{ label: "Новая Зеландия", region: REGION_AFRICA_OCEANIA },
	{ label: "Окленд, Новая Зеландия", region: REGION_AFRICA_OCEANIA },
];

const QUERY_MIN_LENGTH = 1;
const normalizeQuery = (q) => (q || "").toLowerCase().trim();

/**
 * Фильтрует локации по введённой строке (совпадение по стране или городу).
 * @param {string} query
 * @returns {{ label: string, region: string }[]}
 */
export function filterLocations(query) {
	const nq = normalizeQuery(query);
	if (nq.length < QUERY_MIN_LENGTH) return [];
	return LOCATIONS_BY_REGION.filter((item) =>
		normalizeQuery(item.label).includes(nq)
	);
}
