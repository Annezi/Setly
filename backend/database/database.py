import os
from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlmodel import SQLModel

# Импорт моделей нужен, чтобы они зарегистрировались в SQLModel.metadata
from database.models import User, UserLikes, UserCheckPlan, CheckPlan, CheckPlanData  # noqa: F401

POSTGRES_USER = os.getenv(
    "POSTGRES_USER",
    "postgres"
)

POSTGRES_PASSWORD = os.getenv(
    "POSTGRES_PASSWORD",
    "postgres"
)

POSTGRES_DB = os.getenv(
    "POSTGRES_DB",
    "postgres"
)

POSTGRES_HOST = os.getenv(
    "POSTGRES_HOST",
    "database"  # имя сервиса в docker-compose; для локального запуска задайте localhost
)

DATABASE_URL = f"postgresql+asyncpg://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}/{POSTGRES_DB}"

engine = create_async_engine(
    DATABASE_URL,
    echo=os.getenv("SQL_ECHO", "0") == "1",
    future=True,
)

async_session_maker = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False,
)

async def get_session() -> AsyncGenerator[AsyncSession, None]:
    """ Зависимость для получения асинхронной сессии в роутах. Коммит делайте в роуте при необходимости. """
    async with async_session_maker() as session:
        try:
            yield session
        except Exception:
            await session.rollback()
            raise
        finally:
            await session.close()


async def create_tables() -> None:
    """ Создание всех таблиц в БД. """
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)


async def drop_tables() -> None:
    """ Удаление всех таблиц (для тестов или сброса). """
    async with engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.drop_all)