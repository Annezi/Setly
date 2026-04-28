import asyncio
import os
from contextlib import asynccontextmanager
from pathlib import Path

# Важно: загрузить .env до импорта api.user (который тянет auth). Иначе JWT_SECRET при импорте auth будет дефолтным → 401.
from dotenv import load_dotenv
load_dotenv()
# _env_file = Path(__file__).resolve().parent.parent / ".env"
# load_dotenv(_env_file)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from database.database import create_tables
from api.user import router as user_router
from api.check_plans import router as check_plans_router
from api.check_plan_data import router as check_plan_data_router

# Директория для загружаемой статики (обложки чек-планов и т.д.)
STORAGE_DIR = os.path.join(os.path.dirname(__file__), "storage")

# Повторные попытки подключения к БД при старте (интервал с, макс. попыток)
DB_CONNECT_RETRY_INTERVAL = 2
DB_CONNECT_RETRY_ATTEMPTS = 15


@asynccontextmanager
async def lifespan(app: FastAPI):
    for attempt in range(1, DB_CONNECT_RETRY_ATTEMPTS + 1):
        try:
            await create_tables()
            break
        except OSError as e:
            if attempt == DB_CONNECT_RETRY_ATTEMPTS:
                raise
            await asyncio.sleep(DB_CONNECT_RETRY_INTERVAL)
    os.makedirs(STORAGE_DIR, exist_ok=True)
    from auth import SECRET_KEY
    print(f"JWT_SECRET: set ({len(SECRET_KEY)} chars)", flush=True)
    yield


app = FastAPI(lifespan=lifespan)

# С allow_credentials=True нельзя использовать "*" — нужны явные origins, иначе браузер может не отправлять Authorization
_CORS_ORIGINS_STR = os.getenv("CORS_ORIGINS", "https://setly.space,http://localhost:3000")
CORS_ORIGINS = [o.strip() for o in _CORS_ORIGINS_STR.split(",") if o.strip()]
_DEFAULT_CORS_ORIGIN_REGEX = (
    r"^https?://(localhost|127\.0\.0\.1)(:\d+)?$"
    r"|^https?://(?:\d{1,3}\.){3}\d{1,3}(:\d+)?$"
    r"|^https://([a-z0-9-]+\.)?setly\.space$"
)
CORS_ORIGIN_REGEX = os.getenv("CORS_ORIGIN_REGEX", _DEFAULT_CORS_ORIGIN_REGEX).strip() or _DEFAULT_CORS_ORIGIN_REGEX

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
app.mount("/storage", StaticFiles(directory=STORAGE_DIR), name="storage")


@app.get("/")
def root():
    return {"msg": "i am here"}
