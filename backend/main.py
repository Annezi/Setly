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
    _default = "huita"
    if (SECRET_KEY or "").strip() == _default:
        print(f"WARNING: {SECRET_KEY}")
        print("WARNING: JWT_SECRET is default! Set JWT_SECRET in .env to avoid 401.", flush=True)
    else:
        print("JWT_SECRET: set (from .env)", flush=True)
    yield


app = FastAPI(lifespan=lifespan)

# С allow_credentials=True нельзя использовать "*" — нужны явные origins, иначе браузер может не отправлять Authorization
_CORS_ORIGINS_STR = os.getenv("CORS_ORIGINS", "https://setly.space,http://localhost:3000")
CORS_ORIGINS = [o.strip() for o in _CORS_ORIGINS_STR.split(",") if o.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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
