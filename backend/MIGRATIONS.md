# Миграции БД (Alembic)

## Настройка

- Зависимости: `alembic`, `psycopg2-binary` уже добавлены в `req.txt`.
- URL берётся из переменных окружения (`.env`): `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_HOST`, `POSTGRES_DB`.
- Для запуска миграций **локально** (без Docker) задайте в `.env`: `POSTGRES_HOST=localhost`.

## Команды (выполнять из папки `backend`)

```bash
# Из корня проекта с активированным venv:
cd backend
export PYTHONPATH=$PWD   # или PYTHONPATH=/path/to/backend

# Создать новую миграцию по изменениям в database/models.py (БД должна быть доступна):
alembic revision --autogenerate -m "описание изменений"

# Применить все миграции:
alembic upgrade head

# Откатить последнюю миграцию:
alembic downgrade -1

# Текущая версия:
alembic current

# История:
alembic history
```

## Первый запуск

Если таблицы уже созданы через `create_tables()` при старте приложения, можно пометить текущее состояние как применённое без выполнения upgrade:

```bash
alembic stamp head
```

Если БД пустая — просто выполните:

```bash
alembic upgrade head
```

## Docker

В `docker-compose` можно добавить шаг миграций перед запуском приложения или отдельный сервис. Пример команды внутри контейнера backend:

```bash
alembic upgrade head
```
