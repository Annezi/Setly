"""Схемы для CheckPlanData (CRUD). Контент карточки соответствует CheckPlanDataStaff."""

from pydantic import BaseModel

from database.models import CheckPlanDataStaff


class CheckPlanDataCreate(CheckPlanDataStaff):
    """Тело запроса создания — карточка передаётся напрямую (без обёртки data)."""


class CheckPlanDataUpdate(BaseModel):
    """Тело запроса обновления (частичное): можно передать только data."""
    data: CheckPlanDataStaff | None = None


class CheckPlanDataResponse(BaseModel):
    """Ответ: одна запись CheckPlanData (id + контент карточки)."""
    id: int
    data: CheckPlanDataStaff
