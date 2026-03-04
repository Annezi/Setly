from logging.config import fileConfig
import os
import sys
from pathlib import Path

# Добавляем корень backend в path, чтобы импортировать database
sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from sqlalchemy import engine_from_config
from sqlalchemy import pool
from alembic import context

# Загружаем .env из корня проекта (setly.backend или backend)
from dotenv import load_dotenv
# load_dotenv(Path(__file__).resolve().parent.parent.parent / ".env")
# load_dotenv(Path(__file__).resolve().parent.parent / ".env")
load_dotenv()

# Метаданные из SQLModel — нужны для autogenerate
from sqlmodel import SQLModel
from database.models import User, UserLikes, UserCheckPlan, CheckPlan, CheckPlanData  # noqa: F401

config = context.config
target_metadata = SQLModel.metadata

if config.config_file_name is not None:
    fileConfig(config.config_file_name)


def get_url() -> str:
    """URL для миграций: синхронный psycopg2 (Alembic работает в sync)."""
    user = os.getenv("POSTGRES_USER", "postgres")
    password = os.getenv("POSTGRES_PASSWORD", "postgres")
    host = os.getenv("POSTGRES_HOST", "localhost")
    db = os.getenv("POSTGRES_DB", "postgres")
    return f"postgresql+psycopg2://{user}:{password}@{host}/{db}"


def run_migrations_offline() -> None:
    url = get_url()
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )
    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    configuration = config.get_section(config.config_ini_section, {})
    configuration["sqlalchemy.url"] = get_url()
    connectable = engine_from_config(
        configuration,
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )
    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
        )
        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
