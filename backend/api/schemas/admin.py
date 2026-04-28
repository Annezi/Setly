from datetime import datetime
from pydantic import BaseModel


class AdminUserItem(BaseModel):
    id: int
    email: str
    nickname: str | None = None
    is_admin: bool
    is_blocked: bool
    totp_enabled: bool

    model_config = {"from_attributes": True}


class AdminUsersResponse(BaseModel):
    items: list[AdminUserItem]
    total: int
    page: int
    limit: int


class AdminUserBlockRequest(BaseModel):
    is_blocked: bool


class AdminCheckPlanItem(BaseModel):
    id_str: str
    title: str
    author_id: int
    visibility: str
    moderation_status: str
    is_hidden_by_admin: bool
    last_update_time: datetime

    model_config = {"from_attributes": True}


class AdminCheckPlansResponse(BaseModel):
    items: list[AdminCheckPlanItem]
    total: int
    page: int
    limit: int


class AdminCheckPlanModerationRequest(BaseModel):
    moderation_status: str
    is_hidden_by_admin: bool = False


class AdminSettingItem(BaseModel):
    key: str
    value: str
    updated_at: datetime

    model_config = {"from_attributes": True}


class AdminAnalyticsResponse(BaseModel):
    total_users: int
    admin_users: int
    blocked_users: int
    total_checkplans: int
    pending_moderation: int
