"""Схемы для чек-планов (каталог /check-plans)."""

from datetime import datetime
from pydantic import BaseModel


class CheckPlanCreate(BaseModel):
    """Тело запроса создания чек-плана."""
    id_str: str
    author_id: int
    image_src: str = ""
    image_alt: str = ""
    days: str = ""
    days_num: int = 0
    location: str = ""
    title: str = ""
    description: str = ""
    visibility: str = "public"
    initial_likes: int = 0
    check_plan_data_id: int = 0
    filter_tag: str = "По городам"
    region_tag: str | None = None
    traveler_tags: list[str] = []
    season_tags: list[str] = []


class CheckPlanUpdate(BaseModel):
    """Тело запроса частичного обновления чек-плана (все поля опциональны)."""
    image_src: str | None = None
    image_alt: str | None = None
    days: str | None = None
    days_num: int | None = None
    location: str | None = None
    title: str | None = None
    description: str | None = None
    visibility: str | None = None
    initial_likes: int | None = None
    check_plan_data_id: int | None = None
    filter_tag: str | None = None
    region_tag: str | None = None
    traveler_tags: list[str] | None = None
    season_tags: list[str] | None = None


class CheckPlanResponse(BaseModel):
    """Один чек-план для ответов GET/POST/PATCH (поля модели)."""
    id: int
    id_str: str
    author_id: int
    image_src: str
    image_alt: str
    days: str
    days_num: int
    location: str
    title: str
    description: str
    visibility: str
    initial_likes: int
    check_plan_data_id: int
    filter_tag: str
    region_tag: str | None
    traveler_tags: list[str]
    season_tags: list[str]
    creation_time: datetime


class CheckPlanCard(BaseModel):
    """Карточка чек-плана для фронта: id, обложка, дни, локация, автор, теги."""
    id: str
    imageSrc: str
    imageAlt: str
    days: str
    location: str
    title: str
    description: str
    userName: str
    avatarSrc: str
    initialLikes: int
    filterTag: str
    regionTag: str | None
    daysNum: int
    travelerTags: list[str]
    seasonTags: list[str]
    creationTime: datetime | None = None  # дата создания для фронта
    blockId: str | None = None  # для плоского списка (flatCards)


class CheckPlanBlock(BaseModel):
    """Блок категории на странице чек-планов: заголовок, описание, карточки."""
    id: str
    title: str
    filterTag: str
    description: str
    cards: list[CheckPlanCard]


class CheckPlansResponse(BaseModel):
    """Ответ GET /check-plans: блоки по категориям и плоский список карточек."""
    blocks: list[CheckPlanBlock]
    flatCards: list[CheckPlanCard]

class CheckPlansCustomRequest(BaseModel):
    travel_type: str
    checkplan_name: str
    cover_url: str
    is_pattern_needed: bool