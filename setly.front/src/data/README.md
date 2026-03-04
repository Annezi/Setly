# Данные пользователей и чеклистов

## Структура

- **`types/`** — схемы (JSDoc) для пользователя и карточки чеклиста.
- **`users.json`** — список пользователей (для разработки; в продакшене заменить на API).
- **`users.js`** — функции доступа: `getUserById`, `getUserByEmail`, `getCreatedChecklistIds`, `getLikedChecklistIds`.

## Где хранятся изображения пользователей

Файлы лежат в **`public`**, чтобы отдаваться по URL.

| Что | Папка | Пример пути в JSON |
|-----|--------|---------------------|
| Аватар пользователя | `public/img/users/avatars/` | `avatarPath: "/img/users/avatars/test-user-avatar.png"` |
| Шапка профиля | `public/img/users/headers/` | `headerImagePath: "/img/users/headers/test-user-header.jpg"` |

В `next.config.mjs` уже разрешён паттерн `/img/**` для `next/image`.

## Первый тестовый пользователь

В `users.json` уже есть запись с `id: "user-test-1"`. Чтобы подставить свои картинки:

1. **Аватар** — положите файл в `public/img/users/avatars/`, например:
   - `public/img/users/avatars/test-user-avatar.png`
   Или переименуйте свой файл в `test-user-avatar.png` и поместите в эту папку.

2. **Шапка профиля** — положите файл в `public/img/users/headers/`, например:
   - `public/img/users/headers/test-user-header.jpg`
   Или переименуйте свой файл в `test-user-header.jpg` и поместите в эту папку.

3. При необходимости измените в `users.json` поля `avatarPath` и `headerImagePath`, чтобы они совпадали с именами ваших файлов.

Пароль в `users.json` хранится в поле `passwordHash`. Сейчас там заглушка; перед продакшеном нужно заменить на реальный хэш (например, bcrypt).

## Чеклисты: созданные и лайкнутые

- **`createdChecklistIds`** — массив id чеклистов, созданных пользователем. Пока можно оставить пустым `[]`; когда появятся пользовательские чеклисты, сюда добавляются их id.
- **`likedChecklistIds`** — массив id чеклистов, которые пользователь лайкнул. Для карточек из текущих блоков на странице чеклистов id можно формировать как `"blockId-index"` (например, `"mountains-0"`, `"city-1"`). В будущем по этому списку будет собираться страница «лайкнутых» чеклистов.

Использование в коде: `getCreatedChecklistIds(userId)`, `getLikedChecklistIds(userId)` из `@/data/users` или `@/data`.
