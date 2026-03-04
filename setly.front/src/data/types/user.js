/**
 * Схема личных данных пользователя сервиса.
 * Используется для личного кабинета и отображения профиля.
 *
 * @typedef {Object} UserProfile
 * @property {string} id - Уникальный идентификатор пользователя (uuid или slug)
 * @property {string} nickname - Отображаемое имя (никнейм)
 * @property {string} email - Почта (уникальная, для входа)
 * @property {string} passwordHash - Хэш пароля (никогда не отдавать на клиент в production)
 * @property {string} [avatarPath] - Путь к аватару относительно public (напр. /img/users/avatars/user1.png)
 * @property {string} [headerImagePath] - Путь к изображению шапки профиля (напр. /img/users/headers/user1.jpg)
 * @property {string[]} [createdChecklistIds] - ID чеклистов, созданных пользователем
 * @property {string[]} [likedChecklistIds] - ID чеклистов, которые пользователь лайкнул (для страницы «лайкнутых»)
 */

/** @type {UserProfile} */
export const userProfileSchema = {};
