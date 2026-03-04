# Setly

Веб-приложение для создания и ведения чек-планов путешествий: каталог готовых планов, личные чек-листы, заметки, бюджет, полезные контакты и блоки «что посмотреть / поесть / купить».

## Стек

| Часть       | Технологии |
|------------|-------------|
| **Backend** | Python 3.12, FastAPI, SQLModel, PostgreSQL, JWT |
| **Frontend** | Next.js 16, React 19, VK UI |
| **Инфраструктура** | Docker, Docker Compose, Traefik (reverse proxy, HTTPS) |

## Структура репозитория

```
setly.backend/
├── backend/           # API (FastAPI)
│   ├── api/           # Роутеры: user, check_plans, check_plan_data
│   ├── database/      # Модели и подключение к БД
│   ├── auth.py        # JWT-аутентификация
│   ├── main.py        # Точка входа приложения
│   ├── req.txt        # Зависимости Python
│   └── Dockerfile
├── setly.front/       # Фронтенд (Next.js)
│   ├── src/app/       # Страницы и компоненты
│   ├── package.json
│   └── Dockerfile
├── db/                # Данные PostgreSQL (создаётся при первом запуске)
├── docker-compose.yml
├── .env               # Переменные окружения (не в репозитории)
└── README.md
```

## Требования

- Docker и Docker Compose
- Для локальной разработки без Docker: Node.js 20+, Python 3.12+, PostgreSQL 17

## Переменные окружения

Создайте файл `.env` в корне проекта (можно скопировать из `.env.example`, если есть).

| Переменная | Описание | Пример |
|------------|----------|--------|
| `POSTGRES_USER` | Пользователь PostgreSQL | `postgres` |
| `POSTGRES_PASSWORD` | Пароль PostgreSQL | `postgres` |
| `POSTGRES_DB` | Имя базы данных | `postgres` |
| `POSTGRES_HOST` | Хост БД (в Docker: `database`) | `database` или `localhost` |
| `CORS_ORIGINS` | Разрешённые origins для CORS (через запятую) | `https://setly.space,http://localhost:3000` |
| `JWT_SECRET` | Секрет для подписи JWT (обязательно сменить в продакшене) | — |
| `NEXT_PUBLIC_API_URL` | URL API для фронтенда (при сборке) | `https://api.setly.space` или `http://localhost:8000` |

## Запуск через Docker

1. Настройте `.env` в корне проекта.
2. Запустите все сервисы:

```bash
docker compose up -d
```

Поднимаются:

- **Traefik** — порты 80, 443 (при необходимости настройте домены в `docker-compose.yml`).
- **PostgreSQL** — порт 5435 (внутри контейнера 5432).
- **setly-api** — FastAPI с hot-reload, монтируется `./backend` в `/app`.
- **setly-front** — Next.js в production-режиме (`node server.js`).

3. Остановка:

```bash
docker compose down
```

Для локальной разработки API без Traefik можно раскомментировать в `docker-compose.yml` порты для `setly-api` (например `8999:8000`) и обращаться к `http://localhost:8999`.

## Локальная разработка (без Docker)

### База данных

Запустите PostgreSQL 17 (локально или в контейнере). В `.env` укажите:

- `POSTGRES_HOST=localhost`
- Порт по умолчанию в `docker-compose` для БД — 5435; при локальном PostgreSQL обычно 5432.

### Backend

```bash
cd backend
python -m venv env
source env/bin/activate   # Windows: env\Scripts\activate
pip install -r req.txt
# Убедитесь, что .env в корне проекта или скопируйте нужные переменные в backend/
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

API будет доступно по адресу `http://localhost:8000`. Документация: `http://localhost:8000/docs`.

### Frontend

```bash
cd setly.front
npm install
# В .env.local или при запуске задайте NEXT_PUBLIC_API_URL=http://localhost:8000
npm run dev
```

Фронтенд: `http://localhost:3000`.

## API (кратко)

- **`/api`** — префикс для всех роутов.
- **Пользователи**: регистрация, логин, `/me`, обновление профиля, загрузка изображений, лайки, привязка чек-планов.
- **Чек-планы** (`/api/check-plans`): список, получение по `id_str`, создание, обновление, удаление, копирование, создание кастомного плана.
- **Данные чек-плана** (`/api/check-plan-data`): CRUD для JSON-данных плана (блоки, бюджет, контакты и т.д.).

Статика (обложки и т.п.) отдаётся через `GET /storage/...`.

## Миграции (Alembic)

Схема БД управляется через [Alembic](https://alembic.sqlalchemy.org/). Конфигурация: `backend/alembic.ini`, скрипты миграций — `backend/alembic/versions/`. URL подключения к БД берётся из переменных окружения (`.env`): `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_HOST`, `POSTGRES_DB`.

### Локально

Команды нужно выполнять **из корня проекта**, чтобы подхватывался корневой `.env`:

```bash
# Применить все миграции
alembic -c backend/alembic.ini upgrade head

# Создать новую миграцию по изменениям в моделях (database/models.py)
alembic -c backend/alembic.ini revision --autogenerate -m "описание изменений"

# Откатить последнюю миграцию
alembic -c backend/alembic.ini downgrade -1

# Показать текущую ревизию
alembic -c backend/alembic.ini current
```

Перед командами убедитесь, что PostgreSQL запущен и в `.env` указаны правильные `POSTGRES_*` (для локальной БД обычно `POSTGRES_HOST=localhost`).

### В Docker

Миграции выполняются внутри контейнера API (переменные окружения подставляются из `env_file: .env`):

```bash
# Из корня проекта
docker compose exec setly-api alembic upgrade head
```

Создание новой ревизии с autogenerate удобнее делать локально (после изменения моделей), затем закоммитить файл из `backend/alembic/versions/` и в продакшене/контейнере выполнить только `upgrade head`.

## Лицензия и репозиторий

Проект приватный. Не коммитьте `.env` и секреты в репозиторий (см. `.gitignore`).
