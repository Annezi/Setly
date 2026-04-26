import os
import re
import uuid
from typing import Annotated, Optional

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status
from sqlmodel import select

from auth import get_current_user, hash_password, verify_password, create_access_token
from database.database import get_session
from database.models import User, UserLikes, UserCheckPlan, CheckPlan
from sqlmodel.ext.asyncio.session import AsyncSession

from api.schemas.user import (
    UserCreate,
    UserLogin,
    UserResponse,
    UserUpdate,
    Token,
    UserRegisterResponse,
    LoginResponse,
    MeLikesResponse,
    MeCheckplansResponse,
    LikeCreate,
    CheckplanCreate,
)

router = APIRouter(prefix="/user", tags=["user"])

NICKNAME_MAX_LENGTH = 40
PASSWORD_MIN_LENGTH = 6
PASSWORD_ALLOWED = re.compile(r"^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{}|;':\",./<>?`~\\]*$")


def _is_safe_profile_media_url(value: Optional[str]) -> bool:
    """Разрешены только https/http к локальному API и относительные /storage/* (без javascript:/data:)."""
    if value is None:
        return True
    u = str(value).strip()
    if not u:
        return True
    if len(u) > 2048 or "\n" in u or "\r" in u or ".." in u:
        return False
    low = u.lower()
    if low.startswith("javascript:") or low.startswith("data:"):
        return False
    return low.startswith("https://") or low.startswith("http://localhost") or u.startswith("/storage/")


def _normalize_nickname(value: str) -> str:
    return " ".join((value or "").strip().split())


def _validate_password(value: str) -> bool:
    pwd = (value or "").replace(" ", "")
    return len(pwd) >= PASSWORD_MIN_LENGTH and bool(PASSWORD_ALLOWED.fullmatch(pwd))


@router.get("/check-email")
async def check_email(
    email: str,
    session: Annotated[AsyncSession, Depends(get_session)],
):
    """Проверка, занята ли почта. Ответ: { exists: true/false }."""
    result = await session.execute(select(User).where(User.email == email.strip().lower()))
    return {"exists": result.scalar_one_or_none() is not None}


@router.post("/register", response_model=UserRegisterResponse)
async def register(
    data: UserCreate,
    session: Annotated[AsyncSession, Depends(get_session)],
):
    """Регистрация нового пользователя. Возвращает пользователя и токен."""
    result = await session.execute(select(User).where(User.email == data.email))
    if result.scalar_one_or_none() is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="User with this email already exists",
        )
    user = User(
        email=data.email,
        nickname=data.nickname,
        password_hash=hash_password(data.password),
        email_is_verified=False,
        profile_photo_url="",
    )
    session.add(user)
    await session.commit()
    await session.refresh(user)
    access_token, expires_in = create_access_token(user.id)
    return UserRegisterResponse(
        user=user,
        access_token=access_token,
        expires_in=expires_in,
    )


@router.post("/login", response_model=LoginResponse)
async def login(
    data: UserLogin,
    session: Annotated[AsyncSession, Depends(get_session)],
):
    """Вход по email и паролю. Возвращает пользователя и токен (без вызова /me на клиенте)."""
    result = await session.execute(select(User).where(User.email == data.email))
    user = result.scalar_one_or_none()
    if user is None or not verify_password(data.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
        )
    access_token, expires_in = create_access_token(user.id)
    return LoginResponse(
        user=user,
        access_token=access_token,
        expires_in=expires_in,
    )


@router.get("/me", response_model=UserResponse)
async def me(
    current_user: Annotated[User, Depends(get_current_user)],
):
    """Текущий пользователь по JWT (заголовок Authorization: Bearer <token>)."""
    return current_user


@router.patch("/me", response_model=UserResponse)
async def me_update(
    data: UserUpdate,
    current_user: Annotated[User, Depends(get_current_user)],
    session: Annotated[AsyncSession, Depends(get_session)],
):
    """Обновить профиль текущего пользователя (фото/фон/никнейм/почта/пароль)."""
    if data.profile_photo_url is not None:
        if not _is_safe_profile_media_url(data.profile_photo_url):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Недопустимый URL фото профиля",
            )
        current_user.profile_photo_url = data.profile_photo_url
    if data.profile_bg_url is not None:
        if not _is_safe_profile_media_url(data.profile_bg_url):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Недопустимый URL фона профиля",
            )
        current_user.profile_bg_url = data.profile_bg_url

    nickname_changed = False
    email_changed = False
    password_change_requested = False

    nickname_trimmed = None
    if data.nickname is not None:
        nickname_trimmed = _normalize_nickname(str(data.nickname))
        current_nickname = _normalize_nickname(current_user.nickname or "")
        nickname_changed = nickname_trimmed != current_nickname

    email_trimmed = None
    if data.email is not None:
        email_trimmed = str(data.email).strip().lower()
        email_changed = email_trimmed != (current_user.email or "").lower()

    if data.new_password is not None:
        password_change_requested = len(str(data.new_password).replace(" ", "")) > 0

    needs_current_password = nickname_changed or email_changed or password_change_requested
    if needs_current_password:
        current_pwd = str(data.current_password or "")
        if not current_pwd or not verify_password(current_pwd, current_user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Спокойно. Пароли не совпадают",
            )

    if nickname_changed:
        if len(nickname_trimmed) > NICKNAME_MAX_LENGTH:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Спокойно! Никнейм не должен превышать 40 символов",
            )
        current_user.nickname = nickname_trimmed

    if email_changed:
        result = await session.execute(
            select(User).where(User.email == email_trimmed, User.id != current_user.id)
        )
        if result.scalar_one_or_none() is not None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Спокойно! Пользователь с данной почтой уже зарегистрирован",
            )
        current_user.email = email_trimmed

    if password_change_requested:
        next_password = str(data.new_password or "").replace(" ", "")
        if not _validate_password(next_password):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Некорректный пароль",
            )
        if verify_password(next_password, current_user.password_hash):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Новый пароль должен отличаться от текущего",
            )
        current_user.password_hash = hash_password(next_password)

    session.add(current_user)
    await session.commit()
    await session.refresh(current_user)
    return current_user


# ---------- /me/save-image/{category} ----------

# Директория storage (та же, что в main.py)
_STORAGE_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "storage")
_ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".gif", ".webp"}


@router.post("/me/save-image/{category}/")
async def me_save_image(
    category: str,
    current_user: Annotated[User, Depends(get_current_user)],
    file: Annotated[UploadFile, File(..., description="Файл изображения (поле form: file)")],
):
    """Сохранить изображение в категорию (файл сохраняется в storage/{category}/). Возвращает url сохранённого файла."""
    category = (category or "").strip()
    if not category:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="category required")
    # Безопасное имя папки: только буквы, цифры, дефис, подчёркивание
    safe_category = "".join(c if c.isalnum() or c in "-_" else "_" for c in category)
    if not safe_category:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="invalid category")

    if not file.filename:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="file required")

    ext = os.path.splitext(file.filename or "")[1].lower()
    if ext not in _ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"allowed extensions: {', '.join(_ALLOWED_EXTENSIONS)}",
        )

    category_dir = os.path.join(_STORAGE_DIR, safe_category)
    os.makedirs(category_dir, exist_ok=True)
    unique_name = f"{uuid.uuid4().hex}{ext}"
    file_path = os.path.join(category_dir, unique_name)

    content = await file.read()
    with open(file_path, "wb") as f:
        f.write(content)

    # Публичный URL API для ссылки на картинку (в проде: https://api.setly.space, в dev — свой хост)
    api_public_url = (os.getenv("API_PUBLIC_URL") or os.getenv("PUBLIC_API_URL") or "https://api.setly.space").rstrip("/")
    url = f"{api_public_url}/storage/{safe_category}/{unique_name}"
    return {"ok": True, "url": url, "path": f"/storage/{safe_category}/{unique_name}"}


# ---------- /me/likes ----------


@router.get("/me/likes", response_model=MeLikesResponse)
async def me_likes(
    current_user: Annotated[User, Depends(get_current_user)],
    session: Annotated[AsyncSession, Depends(get_session)],
):
    """Список id чеклистов, которые пользователь лайкнул."""
    result = await session.execute(
        select(UserLikes.checklist_id).where(UserLikes.user_id == current_user.id)
    )
    ids = [row[0] for row in result.all()]
    return MeLikesResponse(checklist_ids=ids)


@router.post("/me/likes", status_code=status.HTTP_201_CREATED)
async def me_likes_add(
    data: LikeCreate,
    current_user: Annotated[User, Depends(get_current_user)],
    session: Annotated[AsyncSession, Depends(get_session)],
):
    """Добавить лайк чеклисту."""
    cid = (data.checklist_id or "").strip()
    if not cid:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="checklist_id required")
    result = await session.execute(
        select(UserLikes).where(
            UserLikes.user_id == current_user.id,
            UserLikes.checklist_id == cid,
        )
    )
    if result.scalar_one_or_none() is not None:
        return {"ok": True, "message": "already liked"}
    session.add(UserLikes(user_id=current_user.id, checklist_id=cid))
    await session.commit()
    return {"ok": True}


@router.delete("/me/likes/{checklist_id}")
async def me_likes_remove(
    checklist_id: str,
    current_user: Annotated[User, Depends(get_current_user)],
    session: Annotated[AsyncSession, Depends(get_session)],
):
    """Убрать лайк с чеклиста."""
    cid = (checklist_id or "").strip()
    if not cid:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="checklist_id required")
    result = await session.execute(
        select(UserLikes).where(
            UserLikes.user_id == current_user.id,
            UserLikes.checklist_id == cid,
        )
    )
    row = result.scalar_one_or_none()
    if row is not None:
        await session.delete(row)
        await session.commit()
    return {"ok": True}


# ---------- /me/checkplans ----------


@router.get("/me/checkplans", response_model=MeCheckplansResponse)
async def me_checkplans(
    current_user: Annotated[User, Depends(get_current_user)],
    session: Annotated[AsyncSession, Depends(get_session)],
):
    """Список id_str чек-планов пользователя (без дубликатов)."""
    result = await session.execute(
        select(CheckPlan.id_str)
        .where(CheckPlan.author_id == current_user.id)
        .distinct()
    )
    id_strs = [row[0] for row in result.all()]
    return MeCheckplansResponse(id_strs=id_strs)


@router.post("/me/checkplans", status_code=status.HTTP_201_CREATED)
async def me_checkplans_add(
    data: CheckplanCreate,
    current_user: Annotated[User, Depends(get_current_user)],
    session: Annotated[AsyncSession, Depends(get_session)],
):
    """Добавить чек-план пользователю."""
    sid = (data.id_str or "").strip()
    if not sid:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="id_str required")
    result = await session.execute(
        select(CheckPlan).where(
            CheckPlan.author_id == current_user.id,
            CheckPlan.id_str == sid,
        )
    )
    if result.scalar_one_or_none() is not None:
        return {"ok": True, "message": "already added"}
    session.add(UserCheckPlan(user_id=current_user.id, id_str=sid))
    await session.commit()
    return {"ok": True}


@router.delete("/me/checkplans/{id_str:path}")
async def me_checkplans_remove(
    id_str: str,
    current_user: Annotated[User, Depends(get_current_user)],
    session: Annotated[AsyncSession, Depends(get_session)],
):
    """Удалить чек-план у пользователя."""
    sid = (id_str or "").strip()
    if not sid:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="id_str required")
    result = await session.execute(
        select(UserCheckPlan).where(
            UserCheckPlan.user_id == current_user.id,
            UserCheckPlan.id_str == sid,
        )
    )
    row = result.scalar_one_or_none()
    if row is not None:
        await session.delete(row)
        await session.commit()
    return {"ok": True}
