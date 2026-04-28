from sqlmodel import SQLModel, Field, Relationship
from sqlalchemy import JSON
from typing import List, Optional
from datetime import datetime

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    nickname: str = Field(default=None)
    email: str = Field(default=None, nullable=False)
    email_is_verified: bool = Field(default=False, nullable=False)
    profile_photo_url: str = Field(default="", nullable=False)
    profile_bg_url: str = Field(default="", nullable=False)
    password_hash: str = Field(default="", nullable=False)

    check_plans: List["CheckPlan"] = Relationship(back_populates="author")


class PasswordResetToken(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(nullable=False, index=True)
    token_hash: str = Field(nullable=False, unique=True, index=True)
    expires_at: datetime = Field(nullable=False)
    used_at: Optional[datetime] = Field(default=None, nullable=True)
    created_at: datetime = Field(
        default_factory=datetime.utcnow,
        nullable=False,
    )


class UserLikes(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    checklist_id: str = Field(nullable=False)  # строковый id чеклиста (например setly-japan-2025)
    user_id: int = Field(nullable=False)


class UserCheckPlan(SQLModel, table=True):
    """Связь пользователя с чек-планом (id_str из каталога)."""
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(nullable=False)
    id_str: str = Field(nullable=False)


class UserPinnedCheckPlan(SQLModel, table=True):
    """Закреплённые чек-планы пользователя (до 6, в порядке закрепления)."""
    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(nullable=False)
    id_str: str = Field(nullable=False)
    pinned_at: datetime = Field(default_factory=datetime.utcnow, nullable=False)


class CheckPlan(SQLModel, table=True):
    """Чек-план (карточка каталога): обложка, заголовок, описание, теги для фильтров."""
    __tablename__ = "checkplans"

    id: Optional[int] = Field(default=None, primary_key=True)
    id_str: str = Field(unique=True, nullable=False, index=True)
    author_id: int = Field(foreign_key="user.id", nullable=False)

    image_src: str = Field(default="", nullable=False)  # путь вида /storage/... или URL
    image_alt: str = Field(default="", nullable=False)
    days: str = Field(default="", nullable=False)  # "10 дней", "3 дня"
    days_num: int = Field(default=0, nullable=False)  # число для фильтра по длительности
    location: str = Field(default="", nullable=False)
    title: str = Field(default="", nullable=False)
    description: str = Field(default="", nullable=False)
    visibility: str = Field(default="public", nullable=False)  # public | link | private
    initial_likes: int = Field(default=0, nullable=False)
    check_plan_data_id: int = Field(default=0, nullable=False)

    # Категория блока на странице /check-plans
    filter_tag: str = Field(default="По городам", nullable=False)
    region_tag: Optional[str] = Field(default=None, nullable=True)
    traveler_tags: List[str] = Field(sa_type=JSON(), default_factory=list, nullable=False)
    season_tags: List[str] = Field(sa_type=JSON(), default_factory=list, nullable=False)

    author: Optional["User"] = Relationship(back_populates="check_plans")

    #timestaps
    creation_time: datetime = Field(default_factory=datetime.now)
    last_update_time: datetime = Field(default_factory=datetime.now)

    def update_last_update_time(self):
        self.last_update_time = datetime.now()
    
    def update_creation_time(self):
        self.creation_time = datetime.now()
    
    


from pydantic import BaseModel
class whatToGoBlockField(BaseModel):
    title: str
    link: Optional[str]

class whatToGoBlock(BaseModel):
    what_to_see: List[whatToGoBlockField]
    what_to_eat: List[whatToGoBlockField]
    what_to_buy: List[whatToGoBlockField]

class CheckFieldData(BaseModel):
    is_checked: bool
    title: str

class PersonalNotesField(BaseModel):
    title: str

class UsefulContactsBlockField(BaseModel):
    title: str
    data: str
    link: Optional[str]

class UsefulContactsBlockType(BaseModel):
    contacts_type: str
    contacts: List[UsefulContactsBlockField]

class UsefulContactsBlock(BaseModel):
    blocks: List[UsefulContactsBlockType]


class BaseBlock(BaseModel):
    # Тип блока для сохранения порядка отображения на фронтенде.
    # По умолчанию "text" — для старых записей и простых текстовых блоков.
    type: str = "text"
    title: str
    description: str

class BudgetBlockCategoryField(BaseModel):
    title: str
    plan: int
    spent: int

class BudgetBlock(BaseModel):
    title: str
    table: list[BudgetBlockCategoryField]

class CheckPlanDataStaff(BaseModel):
    title: str
    description: str
    access_type: str
    bg_url: str
    date_start: str
    date_end: str
    place: str
    travel_type: str
    group_size: str

    luggage_type: bool
    luggage_hand_block: Optional[List[CheckFieldData]] = None  # None = чистый чек-план (пустой блок «Что взять»)
    luggage_block: Optional[List[CheckFieldData]] = None

    personal_notes_block: List[PersonalNotesField]

    what_to_go_block: whatToGoBlock
    useful_contacts_block: UsefulContactsBlock
    budget_block: BudgetBlock

    blocks: List[BaseBlock]


class CheckPlanData(SQLModel, table=True):
    __tablename__ = "checkplans_data"

    id: Optional[int] = Field(default=None, primary_key=True)
    data: dict = Field(sa_type=JSON(), nullable=False)
