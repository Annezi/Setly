import os
import re
import uuid
from typing import Annotated, Optional
from datetime import datetime, timedelta

from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status, Request
from sqlmodel import select

from auth import get_current_user, hash_password, verify_password, create_access_token
from database.database import get_session
from database.models import User, UserLikes, UserCheckPlan, UserPinnedCheckPlan, CheckPlan
from sqlmodel.ext.asyncio.session import AsyncSession
from rate_limit import enforce_rate_limit

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
    PinnedCheckplansOrderUpdate,
    UserOgPreview,
    UserPublicProfileResponse,
    UserPublicCheckplansResponse,
)

router = APIRouter(prefix="/user", tags=["user"])

NICKNAME_MAX_LENGTH = 40
MAX_PINNED_CHECKPLANS = 6
RATE_LIMITS = {
    "check_email": 30,
    "register": 10,
    "login": 20,
}


def _sanitize_profile_photo_url(raw: Optional[str]) -> str:
    """Нормализует URL фото профиля для OG (абсолютный https к API/storage)."""
    if not raw or not isinstance(raw, str):
        return ""
    u = raw.strip().rstrip(",").strip()
    if not u:
        return ""
    if u.startswith(("http://", "https://")):
        return u
    api_public_url = (
        os.getenv("API_PUBLIC_URL") or os.getenv("PUBLIC_API_URL") or "https://api.setly.space"
    ).rstrip("/")
    if u.startswith("/storage/"):
        return f"{api_public_url}{u}"
    if ".." in u or "\n" in u:
        return ""
    if u.startswith("/"):
        return f"{api_public_url}{u}"
    return f"{api_public_url}/storage/{u}"
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


def _is_official_setly_user(user: User | None) -> bool:
    if user is None:
        return False
    email = (user.email or "").strip().lower()
    return email == "setly@setly.com"


def _validate_password(value: str) -> bool:
    pwd = (value or "").replace(" ", "")
    return len(pwd) >= PASSWORD_MIN_LENGTH and bool(PASSWORD_ALLOWED.fullmatch(pwd))


@router.get("/check-email")
async def check_email(
    request: Request,
    email: str,
    session: Annotated[AsyncSession, Depends(get_session)],
):
    """Унифицированный ответ для проверки email без раскрытия существования аккаунта."""
    await enforce_rate_limit(request, "check_email", RATE_LIMITS["check_email"])
    return {"ok": True}


@router.post("/register", response_model=UserRegisterResponse)
async def register(
    request: Request,
    data: UserCreate,
    session: Annotated[AsyncSession, Depends(get_session)],
):
    """Регистрация нового пользователя. Возвращает пользователя и токен."""
    await enforce_rate_limit(request, "register", RATE_LIMITS["register"])
    result = await session.execute(select(User).where(User.email == data.email))
    if result.scalar_one_or_none() is not None:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Не удалось выполнить регистрацию",
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
    request: Request,
    data: UserLogin,
    session: Annotated[AsyncSession, Depends(get_session)],
):
    """Вход по email и паролю. Возвращает пользователя и токен (без вызова /me на клиенте)."""
    await enforce_rate_limit(request, "login", RATE_LIMITS["login"])
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


@router.get("/public-profile/{user_id}", response_model=UserOgPreview)
async def public_profile_for_og(
    user_id: int,
    session: Annotated[AsyncSession, Depends(get_session)],
):
    """
    Публичный ник и фото для превью ссылок (мессенджеры / соцсети).
    Не раскрывает email и прочие приватные поля.
    """
    result = await session.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    return UserOgPreview(
        nickname=_normalize_nickname(user.nickname or ""),
        profile_photo_url=_sanitize_profile_photo_url(user.profile_photo_url),
    )


@router.get("/public-profile/{user_id}/full", response_model=UserPublicProfileResponse)
async def public_profile_full(
    user_id: int,
    session: Annotated[AsyncSession, Depends(get_session)],
):
    """Публичные данные профиля для страницы профиля (без email и приватных полей)."""
    result = await session.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()
    if user is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )
    return UserPublicProfileResponse(
        id=user.id,
        nickname=_normalize_nickname(user.nickname or ""),
        profile_photo_url=_sanitize_profile_photo_url(user.profile_photo_url),
        profile_bg_url=_sanitize_profile_photo_url(user.profile_bg_url),
        is_official_setly=_is_official_setly_user(user),
    )


@router.get("/public-profile/{user_id}/checkplans", response_model=UserPublicCheckplansResponse)
async def public_profile_checkplans(
    user_id: int,
    session: Annotated[AsyncSession, Depends(get_session)],
):
    """Публичные чек-планы пользователя (приватные исключаются)."""
    user_result = await session.execute(select(User.id).where(User.id == user_id))
    if user_result.scalar_one_or_none() is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found",
        )

    plans_result = await session.execute(
        select(CheckPlan.id_str)
        .where(CheckPlan.author_id == user_id, CheckPlan.visibility == "public")
        .distinct()
    )
    id_strs = [row[0] for row in plans_result.all()]
    id_set = set(id_strs)

    pinned_result = await session.execute(
        select(UserPinnedCheckPlan.id_str)
        .where(UserPinnedCheckPlan.user_id == user_id)
        .order_by(UserPinnedCheckPlan.pinned_at.asc(), UserPinnedCheckPlan.id.asc())
    )
    pinned_id_strs = [row[0] for row in pinned_result.all() if row[0] in id_set]
    return UserPublicCheckplansResponse(id_strs=id_strs, pinned_id_strs=pinned_id_strs)


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
    pinned_result = await session.execute(
        select(UserPinnedCheckPlan.id_str)
        .where(UserPinnedCheckPlan.user_id == current_user.id)
        .order_by(UserPinnedCheckPlan.pinned_at.asc(), UserPinnedCheckPlan.id.asc())
    )
    pinned_id_strs = [row[0] for row in pinned_result.all()]
    return MeCheckplansResponse(id_strs=id_strs, pinned_id_strs=pinned_id_strs)


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


@router.delete("/me/checkplans/{id_str}")
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


@router.post("/me/checkplans/{id_str}/pin", status_code=status.HTTP_201_CREATED)
async def me_checkplans_pin(
    id_str: str,
    current_user: Annotated[User, Depends(get_current_user)],
    session: Annotated[AsyncSession, Depends(get_session)],
):
    """Закрепить свой чек-план (максимум 6)."""
    sid = (id_str or "").strip()
    if not sid:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="id_str required")
    plan_result = await session.execute(select(CheckPlan).where(CheckPlan.id_str == sid))
    plan = plan_result.scalar_one_or_none()
    if plan is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="CheckPlan not found")
    if plan.author_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only the author can pin this check plan",
        )
    existing_result = await session.execute(
        select(UserPinnedCheckPlan).where(
            UserPinnedCheckPlan.user_id == current_user.id,
            UserPinnedCheckPlan.id_str == sid,
        )
    )
    existing = existing_result.scalar_one_or_none()
    if existing is not None:
        return {"ok": True, "message": "already pinned"}

    count_result = await session.execute(
        select(UserPinnedCheckPlan.id).where(UserPinnedCheckPlan.user_id == current_user.id)
    )
    pinned_count = len(count_result.all())
    if pinned_count >= MAX_PINNED_CHECKPLANS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Достигнут максимум закреплённых чек-планов: {MAX_PINNED_CHECKPLANS}",
        )
    session.add(UserPinnedCheckPlan(user_id=current_user.id, id_str=sid))
    await session.commit()
    return {"ok": True}


@router.delete("/me/checkplans/{id_str}/pin")
async def me_checkplans_unpin(
    id_str: str,
    current_user: Annotated[User, Depends(get_current_user)],
    session: Annotated[AsyncSession, Depends(get_session)],
):
    """Открепить свой чек-план."""
    sid = (id_str or "").strip()
    if not sid:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="id_str required")
    result = await session.execute(
        select(UserPinnedCheckPlan).where(
            UserPinnedCheckPlan.user_id == current_user.id,
            UserPinnedCheckPlan.id_str == sid,
        )
    )
    row = result.scalar_one_or_none()
    if row is not None:
        await session.delete(row)
        await session.commit()
    return {"ok": True}


@router.patch("/me/checkplans/pinned/order")
async def me_checkplans_pinned_order(
    data: PinnedCheckplansOrderUpdate,
    current_user: Annotated[User, Depends(get_current_user)],
    session: Annotated[AsyncSession, Depends(get_session)],
):
    """Переупорядочить закреплённые чек-планы пользователя."""
    requested = [str(x).strip() for x in (data.id_strs or []) if str(x).strip()]
    if len(requested) > MAX_PINNED_CHECKPLANS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Достигнут максимум закреплённых чек-планов: {MAX_PINNED_CHECKPLANS}",
        )
    rows_result = await session.execute(
        select(UserPinnedCheckPlan).where(UserPinnedCheckPlan.user_id == current_user.id)
    )
    rows = rows_result.scalars().all()
    existing_set = {str(r.id_str) for r in rows}
    requested_set = set(requested)
    if existing_set != requested_set:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Передан некорректный набор закреплённых чек-планов",
        )

    by_id = {str(r.id_str): r for r in rows}
    base_time = datetime.utcnow()
    for idx, id_str in enumerate(requested):
        row = by_id.get(id_str)
        if row is None:
            continue
        row.pinned_at = base_time + timedelta(milliseconds=idx)
        session.add(row)
    await session.commit()
    return {"ok": True}
