/**
 * Схема карточки чеклиста (плана).
 * Совместима с карточками в BLOCKS в check-plans.jsx.
 * Для связи с пользователями у карточки может быть id (глобальный или blockId + index).
 *
 * @typedef {Object} ChecklistCard
 * @property {string} [id] - Уникальный id карточки (для лайков и «мои/лайкнутые»). Если нет — можно строить как `${blockId}-${index}`
 * @property {string} imageSrc - URL изображения карточки
 * @property {string} imageAlt - Alt для изображения
 * @property {string} days - Строка длительности («7 дней», «3 дня»)
 * @property {string} location - Локация
 * @property {string} [regionTag] - Тег региона для фильтров
 * @property {string[]} [seasonTags] - Сезоны
 * @property {string[]} [travelerTags] - Тип путешественников
 * @property {string} title - Заголовок
 * @property {string} description - Описание
 * @property {string} userName - Отображаемое имя автора
 * @property {string} [authorUserId] - ID пользователя-автора (если чеклист создан пользователем)
 */

/** @type {ChecklistCard} */
export const checklistCardSchema = {};
