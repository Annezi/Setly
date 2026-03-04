/**
 * Чек-планы пользователей для блока «Мои чек-планы» на странице профиля.
 * Данные разнесены по userId — чеклисты одного пользователя не смешиваются с другими.
 * В будущем можно заменить на API: GET /api/users/:userId/check-plans
 */

import { getPublicUserById } from './users';

/** Имя автора чек-планов Setly из users.json (совпадает с профилем). */
const SETLY_USER_NAME = getPublicUserById('setly')?.nickname ?? 'Setly';

/**
 * Начальные чек-планы для пользователя Setly (id: "setly").
 * Карточки с полями: id, imageSrc, imageAlt, days, location, title, description, visibility, likes? (только для public).
 */
const SETLY_PERSONAL_PLANS = [
  {
    id: "setly-japan-2025",
    imageSrc: "/img/main/check-plans/city-1.png",
    imageAlt: "Япония",
    days: "10 дней",
    location: "Киото",
    title: "Япония 2025",
    description: "Список для тех, кто как я любит много ходить и искать не туристические места",
    visibility: "public",
    likes: 0,
  },
  {
    id: "setly-mountains-1",
    imageSrc: "/img/main/check-plans/mountains-1.png",
    imageAlt: "Горы",
    days: "7 дней",
    location: "Алтай",
    title: "Треккинг на Алтае",
    description: "Без гида, ночёвки в палатке. Взяла минимум вещей, не пожалела ни о чём)",
    visibility: "public",
    likes: 0,
  },
  {
    id: "setly-mountains-2",
    imageSrc: "/img/main/check-plans/mountains-2.png",
    imageAlt: "Горы",
    days: "5 дней",
    location: "Эльбрус",
    title: "Эльбрус до Приюта 11",
    description: "Для тех, кто хочет почувствовать горы, но не рисковать",
    visibility: "public",
    likes: 0,
  },
  {
    id: "setly-mountains-3",
    imageSrc: "/img/main/check-plans/mountains-3.png",
    imageAlt: "Горы",
    days: "3 дня",
    location: "Кавказ",
    title: "Покоряя горы Кавказа",
    description: "Смесь треккинга, местных гестхаусов и горячих источников",
    visibility: "public",
    likes: 0,
  },
  {
    id: "setly-city-2",
    imageSrc: "/img/main/check-plans/city-2.png",
    imageAlt: "Город",
    days: "5 дней",
    location: "Токио",
    title: "Токио без спешки",
    description: "Не пытался увидеть всё, выбрал 3 района, ходил пешком, пил кофе в тихих киосках",
    visibility: "public",
    likes: 0,
  },
  {
    id: "setly-city-3",
    imageSrc: "/img/main/check-plans/city-3.png",
    imageAlt: "Город",
    days: "7 дней",
    location: "Киото",
    title: "Южная Корея 2025",
    description: "Городской марафон без природы — музеи, уличная еда, ночные рынки и корейская косметика",
    visibility: "public",
    likes: 0,
  },
  {
    id: "setly-beach-1",
    imageSrc: "/img/main/check-plans/beach-1.png",
    imageAlt: "Пляж",
    days: "10 дней",
    location: "Паттайя",
    title: "Чилловый Тайланд",
    description: "Ходила по храмам, купалась в море и грелась на солнце без экскурсий в 7 утра",
    visibility: "public",
    likes: 0,
  },
  {
    id: "setly-beach-2",
    imageSrc: "/img/main/check-plans/beach-2.png",
    imageAlt: "Пляж",
    days: "14 дней",
    location: "Куала-Лумпур",
    title: "Малайзия",
    description: "Долгая поездка с пересадками между городом, джунглями и пляжем",
    visibility: "public",
    likes: 0,
  },
  {
    id: "setly-beach-3",
    imageSrc: "/img/main/check-plans/beach-3.png",
    imageAlt: "Пляж",
    days: "7 дней",
    location: "Афины",
    title: "Греция",
    description: "Мой самый лучший отдых и давняя мечта",
    visibility: "public",
    likes: 0,
  },
  {
    id: "setly-family-1",
    imageSrc: "/img/main/check-plans/family-1.png",
    imageAlt: "Семья",
    days: "7 дней",
    location: "Пхукет",
    title: "Пхукет с ребёнком",
    description: "Делюсь как путешествовать с детьми и не сойти с ума)",
    visibility: "public",
    likes: 0,
  },
  {
    id: "setly-family-2",
    imageSrc: "/img/main/check-plans/family-2.png",
    imageAlt: "Семья",
    days: "5 дней",
    location: "Москва",
    title: "Москва + дети",
    description: "Парки, музеи, кафе с детскими меню. Главное бронировать онлайн!",
    visibility: "public",
    likes: 0,
  },
  {
    id: "setly-family-3",
    imageSrc: "/img/main/check-plans/family-3.png",
    imageAlt: "Семья",
    days: "10 дней",
    location: "Турция",
    title: "Семейный отдых",
    description: "Как ничего не забыть с двумя маленькими детьми",
    visibility: "public",
    likes: 0,
  },
  {
    id: "setly-long-1",
    imageSrc: "/img/main/check-plans/long-1.png",
    imageAlt: "Долго",
    days: "14 дней",
    location: "Несколько стран",
    title: "Европа за месяц",
    description: "10+ городов, 4 страны, 30 дней. Как я составила модульную систему планов",
    visibility: "public",
    likes: 0,
  },
  {
    id: "setly-long-2",
    imageSrc: "/img/main/check-plans/long-2.png",
    imageAlt: "Долго",
    days: "21 день",
    location: "Несколько стран",
    title: "Юго-Восточная Азия",
    description: "Долгая поездка с пересадками между городом, джунглями и пляжем",
    visibility: "public",
    likes: 0,
  },
  {
    id: "setly-long-3",
    imageSrc: "/img/main/check-plans/long-3.png",
    imageAlt: "Долго",
    days: "10 дней",
    location: "Куала-Лумпур",
    title: "Малайзия",
    description: "Долгая поездка с пересадками между городом, джунглями и пляжем",
    visibility: "public",
    likes: 0,
  },
];

/** Хранилище чек-планов по userId. Для других пользователей — пустой массив или данные из API. */
const PLANS_BY_USER = {
  setly: SETLY_PERSONAL_PLANS,
};

/** По префиксу id карточки определяем категорию для фильтра на странице чек-планов. */
function getFilterTagFromPlanId(id) {
  if (!id || typeof id !== "string") return "По городам";
  if (id.startsWith("setly-mountains")) return "В горы";
  if (id.startsWith("setly-city") || id.startsWith("setly-japan")) return "По городам";
  if (id.startsWith("setly-beach")) return "На пляж";
  if (id.startsWith("setly-family")) return "С семьёй или детьми";
  if (id.startsWith("setly-long")) return "Долго / Кочёвка";
  return "По городам";
}

/** По локации определяем регион для фильтра. */
function getRegionTagFromLocation(location) {
  if (!location) return null;
  const s = String(location).toLowerCase();
  if (["алтай", "эльбрус", "москва", "санкт-петербург"].some((r) => s.includes(r))) return "Россия и СНГ";
  if (s.includes("кавказ")) return "Кавказ";
  if (["киото", "токио", "паттайя", "куала-лумпур", "пхукет", "пекин", "пакистан"].some((r) => s.includes(r))) return "Азия";
  if (s.includes("афины") || s.includes("несколько стран")) return "Европа";
  if (s.includes("турция") || s.includes("египет") || s.includes("оаэ")) return "Ближнее Зарубежье (Турция, Египет, ОАЭ)";
  return null;
}

/** Парсит строку длительности ("7 дней", "3 дня") в число. */
function parseCardDays(daysStr) {
  if (!daysStr || typeof daysStr !== "string") return 0;
  const m = daysStr.match(/^(\d+)\s*(день|дня|дней)?$/);
  return m ? parseInt(m[1], 10) : 0;
}

/**
 * Блоки чек-планов Setly для страницы /check-plans в том же формате, что и BLOCKS.
 * Каждый блок — категория (В горы, По городам и т.д.), карточки с userName и initialLikes.
 */
export function getSetlyBlocksForCheckPlans() {
  const byFilterTag = {};
  const filterOrder = ["В горы", "По городам", "На пляж", "С семьёй или детьми", "Долго / Кочёвка"];
  const titles = {
    "В горы": "Горы",
    "По городам": "Городской отдых",
    "На пляж": "На пляж",
    "С семьёй или детьми": "С семьёй или детьми",
    "Долго / Кочёвка": "Долго / Кочёвка",
  };
  const descriptions = {
    "В горы": "Для тех, кто хочет треккинга, палаток, высоты и природы",
    "По городам": "Планы для музеев, кафе, прогулок",
    "На пляж": "Море, солнце, отели, лёгкая одежда и спокойствие",
    "С семьёй или детьми": "Поездки, где важнее всего — комфорт, безопасность и привычки",
    "Долго / Кочёвка": "10+ дней, часто с перемещениями, разными странами/климатами",
  };
  for (const tag of filterOrder) byFilterTag[tag] = [];
  for (const plan of SETLY_PERSONAL_PLANS) {
    if (plan.visibility !== "public") continue; // На /check-plans показываем только публичные чеклисты
    const filterTag = getFilterTagFromPlanId(plan.id);
    const card = {
      ...plan,
      userName: SETLY_USER_NAME,
      initialLikes: plan.likes ?? 0,
      filterTag,
      regionTag: getRegionTagFromLocation(plan.location),
      daysNum: parseCardDays(plan.days),
      travelerTags: plan.id && plan.id.startsWith("setly-family") ? ["С детьми"] : [],
      seasonTags: [],
    };
    if (byFilterTag[filterTag]) byFilterTag[filterTag].push(card);
  }
  return filterOrder
    .filter((tag) => byFilterTag[tag].length > 0)
    .map((tag, i) => ({
      id: `setly-${tag.replace(/\s*\/\s*/g, "-").replace(/\s+/g, "-").toLowerCase()}`,
      title: titles[tag],
      filterTag: tag,
      description: descriptions[tag],
      cards: byFilterTag[tag],
    }));
}

/**
 * Плоский список чек-планов Setly с полями для фильтрации (filterTag, daysNum, regionTag и т.д.).
 * Для использования в FilteredPlans на странице /check-plans.
 */
export function getSetlyFlatCardsWithFilterTags() {
  const list = [];
  const blocks = getSetlyBlocksForCheckPlans();
  for (const block of blocks) {
    for (const card of block.cards) {
      list.push({
        ...card,
        blockId: block.id,
        filterTag: block.filterTag,
        daysNum: card.daysNum ?? parseCardDays(card.days),
        regionTag: card.regionTag ?? getRegionTagFromLocation(card.location),
        travelerTags: card.travelerTags ?? [],
        seasonTags: card.seasonTags ?? [],
      });
    }
  }
  return list;
}

/** Каталог планов по id (для подстановки по id_str с бэкенда). */
const PLANS_BY_ID = Object.fromEntries(
  SETLY_PERSONAL_PLANS.map((p) => [p.id, p])
);

/**
 * Возвращает полные объекты планов по списку id_str (с бэкенда /me/checkplans).
 * Дубликаты id_str отфильтровываются — каждая карточка показывается один раз.
 * @param {string[]} idStrs
 * @returns {Array<{ id: string, imageSrc: string, ... }>}
 */
export function getPlansByIdStrs(idStrs) {
  if (!Array.isArray(idStrs)) return [];
  const seen = new Set();
  return idStrs
    .map((id) => PLANS_BY_ID[String(id).trim()])
    .filter((plan) => plan && !seen.has(plan.id) && seen.add(plan.id));
}

/**
 * Возвращает чек-планы текущего пользователя по его id.
 * Данные изолированы по userId — не смешиваются между пользователями.
 *
 * @param {string} [userId] - id пользователя (например из getAuth().user.id)
 * @returns {Array<{ id: string, imageSrc: string, imageAlt: string, days: string, location: string, title: string, description: string, visibility: 'public'|'link'|'private', likes?: number }>}
 */
export function getPersonalCheckPlans(userId) {
  if (!userId) return [];
  return PLANS_BY_USER[userId] ?? [];
}
