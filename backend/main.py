import asyncio
import os
from contextlib import asynccontextmanager
from datetime import datetime, timedelta, timezone
from pathlib import Path
from zoneinfo import ZoneInfo, ZoneInfoNotFoundError

# Важно: загрузить .env до импорта api.user (который тянет auth). Иначе JWT_SECRET при импорте auth будет дефолтным → 401.
from dotenv import load_dotenv
from sqlmodel import select

load_dotenv()
# _env_file = Path(__file__).resolve().parent.parent / ".env"
# load_dotenv(_env_file)

from api.admin import router as admin_router
from api.check_plan_data import router as check_plan_data_router
from api.check_plans import router as check_plans_router
from api.telegram_webhook import router as telegram_webhook_router
from api.user import router as user_router
from database.database import async_session_maker, create_tables
from database.models import PasswordResetToken
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

# Директория для загружаемой статики (обложки чек-планов и т.д.)
STORAGE_DIR = os.path.join(os.path.dirname(__file__), "storage")

# Повторные попытки подключения к БД при старте (интервал с, макс. попыток)
DB_CONNECT_RETRY_INTERVAL = 2
DB_CONNECT_RETRY_ATTEMPTS = 15


def _resolve_app_timezone():
    tz_name = (os.getenv("APP_TIMEZONE") or "Europe/Moscow").strip() or "Europe/Moscow"
    try:
        return ZoneInfo(tz_name)
    except ZoneInfoNotFoundError:
        return timezone.utc


APP_TIMEZONE = _resolve_app_timezone()


async def _cleanup_password_reset_tokens_once() -> None:
    now = datetime.utcnow()
    async with async_session_maker() as session:
        rows_result = await session.execute(
            select(PasswordResetToken).where(
                (PasswordResetToken.used_at.is_not(None))
                | (PasswordResetToken.expires_at <= now)
            )
        )
        rows = rows_result.scalars().all()
        for row in rows:
            await session.delete(row)
        await session.commit()


def _seconds_until_next_midnight_local() -> float:
    now_local = datetime.now(APP_TIMEZONE)
    next_midnight_local = (now_local + timedelta(days=1)).replace(
        hour=0, minute=0, second=0, microsecond=0
    )
    return max((next_midnight_local - now_local).total_seconds(), 1.0)


async def _daily_reset_tokens_cleanup_worker() -> None:
    while True:
        await asyncio.sleep(_seconds_until_next_midnight_local())
        await _cleanup_password_reset_tokens_once()


@asynccontextmanager
async def lifespan(app: FastAPI):
    cleanup_task: asyncio.Task | None = None
    for attempt in range(1, DB_CONNECT_RETRY_ATTEMPTS + 1):
        try:
            await create_tables()
            break
        except OSError as e:
            if attempt == DB_CONNECT_RETRY_ATTEMPTS:
                raise
            await asyncio.sleep(DB_CONNECT_RETRY_INTERVAL)
    os.makedirs(STORAGE_DIR, exist_ok=True)
    await _cleanup_password_reset_tokens_once()
    cleanup_task = asyncio.create_task(_daily_reset_tokens_cleanup_worker())
    from auth import SECRET_KEY

    print(f"JWT_SECRET: set ({len(SECRET_KEY)} chars)", flush=True)
    try:
        yield
    finally:
        if cleanup_task is not None:
            cleanup_task.cancel()
            try:
                await cleanup_task
            except asyncio.CancelledError:
                pass


app = FastAPI(lifespan=lifespan)

# С allow_credentials=True нельзя использовать "*" — нужны явные origins, иначе браузер может не отправлять Authorization
_CORS_ORIGINS_STR = os.getenv(
    "CORS_ORIGINS", "https://setly.space, http://localhost:3000"
)
CORS_ORIGINS = [o.strip() for o in _CORS_ORIGINS_STR.split(",") if o.strip()]
_DEFAULT_CORS_ORIGIN_REGEX = (
    r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$"
    r"|^https?://(?:\d{1,3}\.){3}\d{1,3}(:\d+)?$"
    r"|^https://([a-z0-9-]+\.)?setly\.space$"
)
CORS_ORIGIN_REGEX = (
    os.getenv("CORS_ORIGIN_REGEX", _DEFAULT_CORS_ORIGIN_REGEX).strip()
    or _DEFAULT_CORS_ORIGIN_REGEX
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_origin_regex=CORS_ORIGIN_REGEX,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router, prefix="/api")
app.include_router(check_plans_router, prefix="/api")
app.include_router(check_plan_data_router, prefix="/api")
app.include_router(admin_router, prefix="/api")
app.include_router(telegram_webhook_router, prefix="/api")
app.mount("/storage", StaticFiles(directory=STORAGE_DIR), name="storage")


@app.get("/")
def root():
    return {"msg": "i am here"}
