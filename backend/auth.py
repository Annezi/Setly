import os
from datetime import datetime, timezone, timedelta
from typing import Annotated

import bcrypt
import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from database.database import get_session
from database.models import User

# Один и тот же секрет для выдачи и проверки токенов. Обязательно JWT_SECRET в .env (одинаковый на всех инстансах).
_DEFAULT_JWT_SECRET = "08f1357da6d2b7b56d6c8ec215ca076f"
_SECRET_RAW = os.getenv("JWT_SECRET", _DEFAULT_JWT_SECRET)
SECRET_KEY = (_SECRET_RAW or "").strip() or _DEFAULT_JWT_SECRET
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/user/login", auto_error=True)

# bcrypt принимает не более 72 байт; длинные пароли обрезаем
BCRYPT_MAX_PASSWORD_BYTES = 72


def hash_password(password: str) -> str:
    pwd_bytes = password.encode("utf-8")[:BCRYPT_MAX_PASSWORD_BYTES]
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(pwd_bytes, salt).decode("utf-8")


def verify_password(plain: str, hashed: str) -> bool:
    pwd_bytes = plain.encode("utf-8")[:BCRYPT_MAX_PASSWORD_BYTES]
    return bcrypt.checkpw(pwd_bytes, hashed.encode("utf-8"))


def create_access_token(user_id: int) -> tuple[str, int]:
    """Возвращает (access_token, expires_in_seconds)."""
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    payload = {
        "sub": str(user_id),  # RFC 7519: sub (subject) must be string
        "exp": int(expire.timestamp()),
        "type": "access",
    }
    raw = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)
    # PyJWT 1.x возвращает bytes, 2.x — str. Всегда отдаём строку.
    access_token = raw.decode("utf-8") if isinstance(raw, bytes) else str(raw)
    return access_token, ACCESS_TOKEN_EXPIRE_MINUTES * 60


def decode_access_token(token: str) -> dict:
    if not token or not isinstance(token, str):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
        )
    token = token.strip()
    if token.lower().startswith("bearer "):
        token = token[7:].strip()
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token type",
            )
        return payload
    except jwt.ExpiredSignatureError as e:
        import sys
        print(f"JWT 401: Token expired — {e}", file=sys.stderr, flush=True)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token expired",
        )
    except jwt.InvalidSignatureError as e:
        import sys
        print(f"JWT 401: Invalid signature (token issued with different JWT_SECRET?) — {e}", file=sys.stderr, flush=True)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token signature (check JWT_SECRET is the same as when token was issued)",
        )
    except jwt.InvalidTokenError as e:
        import sys
        print(f"JWT 401: Invalid token — {e}", file=sys.stderr, flush=True)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token",
        )


async def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)],
    session: Annotated[AsyncSession, Depends(get_session)],
) -> User:
    """Зависимость: текущий пользователь по JWT."""
    payload = decode_access_token(token)
    raw_sub = payload.get("sub")
    if raw_sub is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload",
        )
    try:
        user_id = int(raw_sub)
    except (TypeError, ValueError):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload",
        )
    result = await session.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if user is None:
        import sys
        print(f"JWT 401: User not found (user_id={user_id})", file=sys.stderr, flush=True)
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User not found",
        )
    return user
