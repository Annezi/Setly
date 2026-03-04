/**
 * Слой доступа к данным пользователей.
 * Сейчас читает из локального users.json; в продакшене заменить на запросы к API.
 */

import usersData from './users.json';

/** @typedef {import('./types/user').UserProfile} UserProfile */

/** @type {UserProfile[]} */
const users = Array.isArray(usersData) ? usersData : [];

/**
 * Все пользователи (без паролей для отдачи на клиент).
 * @returns {Array<Omit<UserProfile, 'passwordHash'>>}
 */
export function getUsersPublic() {
  return users.map(({ passwordHash, ...rest }) => rest);
}

/**
 * Пользователь по id (включая passwordHash — только для серверной проверки пароля).
 * @param {string} userId
 * @returns {UserProfile | undefined}
 */
export function getUserById(userId) {
  return users.find((u) => u.id === userId);
}

/**
 * Публичные данные пользователя по id (без пароля).
 * @param {string} userId
 * @returns {Omit<UserProfile, 'passwordHash'> | undefined}
 */
export function getPublicUserById(userId) {
  const u = getUserById(userId);
  if (!u) return undefined;
  const { passwordHash, ...rest } = u;
  return rest;
}

/**
 * Пользователь по email (для входа).
 * @param {string} email
 * @returns {UserProfile | undefined}
 */
export function getUserByEmail(email) {
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

/**
 * ID чеклистов, созданных пользователем.
 * @param {string} userId
 * @returns {string[]}
 */
export function getCreatedChecklistIds(userId) {
  const u = getUserById(userId);
  return Array.isArray(u?.createdChecklistIds) ? u.createdChecklistIds : [];
}

/**
 * ID чеклистов, которые пользователь лайкнул (для будущей страницы «лайкнутых»).
 * @param {string} userId
 * @returns {string[]}
 */
export function getLikedChecklistIds(userId) {
  const u = getUserById(userId);
  return Array.isArray(u?.likedChecklistIds) ? u.likedChecklistIds : [];
}
