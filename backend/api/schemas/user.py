from pydantic import BaseModel, EmailStr, Field


class UserCreate(BaseModel):
    """Схема регистрации пользователя."""
    email: EmailStr
    password: str = Field(..., min_length=6)
    nickname: str | None = None


class UserLogin(BaseModel):
    """Схема входа."""
    email: EmailStr
    password: str


class UserResponse(BaseModel):
    """Публичные данные пользователя в ответах."""
    id: int
    email: str
    nickname: str | None
    email_is_verified: bool
    profile_photo_url: str
    profile_bg_url: str

    model_config = {"from_attributes": True}


class UserUpdate(BaseModel):
    """Обновление профиля (только перечисленные поля)."""
    profile_photo_url: str | None = None
    profile_bg_url: str | None = None
    nickname: str | None = None
    email: EmailStr | None = None
    new_password: str | None = None
    current_password: str | None = None


class Token(BaseModel):
    """Ответ с токенами."""
    access_token: str
    token_type: str = "bearer"
    expires_in: int  # секунды до истечения access_token


class TokenPayload(BaseModel):
    """Полезная нагрузка JWT (sub = user_id)."""
    sub: int
    exp: int
    type: str = "access"


class UserRegisterResponse(BaseModel):
    """Ответ регистрации: пользователь + токен."""
    user: UserResponse
    access_token: str
    token_type: str = "bearer"
    expires_in: int


class LoginResponse(BaseModel):
    """Ответ логина: пользователь + токен (как у register, чтобы не вызывать /me)."""
    user: UserResponse
    access_token: str
    token_type: str = "bearer"
    expires_in: int


class MeLikesResponse(BaseModel):
    checklist_ids: list[str]


class MeCheckplansResponse(BaseModel):
    id_strs: list[str]


class LikeCreate(BaseModel):
    checklist_id: str


class CheckplanCreate(BaseModel):
    id_str: str
