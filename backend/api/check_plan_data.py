"""CRUD API для CheckPlanData."""

from datetime import datetime
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from auth import get_current_user, get_current_user_optional
from api.check_plan_access import can_read_check_plan
from database.database import get_session
from database.models import CheckPlan, CheckPlanData, CheckPlanDataStaff, User
from api.schemas.check_plan_data import (
    CheckPlanDataCreate,
    CheckPlanDataUpdate,
    CheckPlanDataResponse,
)

router = APIRouter(prefix="/checkplan-data", tags=["checkplan-data"])


async def _require_current_user_is_author_of_plan_data(
    session: AsyncSession,
    check_plan_data_id: int,
    user_id: int,
) -> None:
    """Все чек-планы, ссылающиеся на эту запись данных, должны принадлежать пользователю."""
    plans_result = await session.execute(
        select(CheckPlan).where(CheckPlan.check_plan_data_id == check_plan_data_id)
    )
    plans = plans_result.scalars().all()
    if not plans:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No check plan references this data",
        )
    for plan in plans:
        if plan.author_id != user_id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Only the author can update this check plan data",
            )

# Значения по умолчанию для данных из custom/create, где нет полной структуры CheckPlanDataStaff
_CHECKPLAN_DATA_DEFAULTS = {
    "date_start": "",
    "date_end": "",
    "luggage_hand_block": [],
    "luggage_block": [],
    "personal_notes_block": [],
    "what_to_go_block": {
        "what_to_see": [],
        "what_to_eat": [],
        "what_to_buy": [],
    },
    "useful_contacts_block": {"blocks": []},
    "budget_block": {"title": "", "table": []},
    "blocks": [],
}


def _normalize_payload(payload):
    """Дополняет payload недостающими полями для валидации CheckPlanDataStaff."""
    if not payload:
        payload = {}
    out = dict(payload)
    # Старые записи могут иметь "date" вместо date_start/date_end
    legacy_date = out.get("date") if out.get("date") is not None else ""
    if out.get("date_start") is None:
        out["date_start"] = legacy_date
    if out.get("date_end") is None:
        out["date_end"] = legacy_date
    for key, default in _CHECKPLAN_DATA_DEFAULTS.items():
        # Для чистого чек-плана luggage_hand_block/luggage_block хранятся как None — не подменять на []
        if key in ("luggage_hand_block", "luggage_block") and key in out and out[key] is None:
            continue
        if out.get(key) is None:
            out[key] = default
    # Шаблоны могут передавать useful_contacts_block в формате одного блока
    # {contacts_type, contacts} без обёртки "blocks"
    ucb = out.get("useful_contacts_block")
    if isinstance(ucb, dict) and "blocks" not in ucb:
        if "contacts_type" in ucb or "contacts" in ucb:
            out["useful_contacts_block"] = {"blocks": [ucb]}
        else:
            out["useful_contacts_block"] = _CHECKPLAN_DATA_DEFAULTS["useful_contacts_block"]
    return out


def _row_to_response(r):
    payload = r.data if r.data is not None else {}
    normalized = _normalize_payload(payload)
    return CheckPlanDataResponse(id=r.id, data=CheckPlanDataStaff.model_validate(normalized))


def _days_from_dates(date_start: str, date_end: str) -> tuple[int, str]:
    """По date_start и date_end возвращает (days_num, days). Если даты пустые/невалидные — (0, '')."""
    if not date_start or not date_end:
        return 0, ""
    try:
        start = datetime.strptime(date_start.strip()[:10], "%Y-%m-%d")
        end = datetime.strptime(date_end.strip()[:10], "%Y-%m-%d")
    except (ValueError, TypeError):
        return 0, ""
    if end < start:
        start, end = end, start
    delta = (end - start).days + 1
    if delta <= 0:
        return 0, ""
    if delta == 1:
        days_label = "1 день"
    elif 2 <= delta <= 4:
        days_label = f"{delta} дня"
    else:
        days_label = f"{delta} дней"
    return delta, days_label


@router.get("", response_model=list[CheckPlanDataResponse])
async def list_check_plan_data(
    current_user: Annotated[User, Depends(get_current_user)],
    session: Annotated[AsyncSession, Depends(get_session)],
):
    """Список записей CheckPlanData только текущего пользователя."""
    result = await session.execute(
        select(CheckPlanData)
        .join(CheckPlan, CheckPlan.check_plan_data_id == CheckPlanData.id)
        .where(CheckPlan.author_id == current_user.id)
        .order_by(CheckPlanData.id)
    )
    rows = result.scalars().all()
    unique_rows: dict[int, CheckPlanData] = {}
    for row in rows:
        unique_rows[row.id] = row
    return [_row_to_response(r) for r in unique_rows.values()]


@router.get("/{item_id}", response_model=CheckPlanDataResponse)
async def get_check_plan_data(
    item_id: int,
    session: Annotated[AsyncSession, Depends(get_session)],
    current_user: Annotated[User | None, Depends(get_current_user_optional)],
):
    """Одна запись по id."""
    result = await session.execute(select(CheckPlanData).where(CheckPlanData.id == item_id))
    row = result.scalar_one_or_none()
    if row is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="CheckPlanData not found",
        )
    plans_result = await session.execute(
        select(CheckPlan).where(CheckPlan.check_plan_data_id == item_id)
    )
    plans = plans_result.scalars().all()
    if not plans:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No check plan references this data",
        )
    can_read = any(can_read_check_plan(plan, current_user) for plan in plans)
    if not can_read:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="CheckPlanData not found",
        )
    return _row_to_response(row)


@router.post("", response_model=CheckPlanDataResponse, status_code=status.HTTP_201_CREATED)
async def create_check_plan_data(
    data: CheckPlanDataCreate,
    current_user: Annotated[User, Depends(get_current_user)],
    session: Annotated[AsyncSession, Depends(get_session)],
):
    """Создать запись CheckPlanData. Тело запроса — объект карточки (CheckPlanDataStaff) напрямую."""
    item = CheckPlanData(data=data.model_dump())
    session.add(item)
    await session.commit()
    await session.refresh(item)
    return _row_to_response(item)


@router.patch("/{item_id}", response_model=CheckPlanDataResponse)
async def update_check_plan_data(
    item_id: int,
    data: CheckPlanDataUpdate,
    session: Annotated[AsyncSession, Depends(get_session)],
    current_user: Annotated[User, Depends(get_current_user)],
    check_plan_id_str: str | None = None,
):
    """
    Обновить запись CheckPlanData (частично).
    Если записи с item_id нет в базе и у плана check_plan_data_id == 0 — создаётся новая
    CheckPlanData из тела запроса и её id присваивается в CheckPlan (нужен query check_plan_id_str).
    """
    result = await session.execute(select(CheckPlanData).where(CheckPlanData.id == item_id))
    item = result.scalar_one_or_none()

    if item is None:
        # Записи нет: создаём только если передан check_plan_id_str и у плана check_plan_data_id == 0
        if not check_plan_id_str:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="check_plan_id_str is required when CheckPlanData does not exist (to create and attach)",
            )
        if data.data is None:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="data is required when creating CheckPlanData from PATCH",
            )
        plan_result = await session.execute(
            select(CheckPlan).where(CheckPlan.id_str == check_plan_id_str)
        )
        plan = plan_result.scalar_one_or_none()
        if plan is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="CheckPlan not found",
            )
        if plan.author_id != current_user.id:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Only the author can update this check plan data",
            )
        if plan.check_plan_data_id != 0:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="CheckPlan already has check_plan_data_id; create only when check_plan_data_id is 0",
            )
        # Создаём CheckPlanData из присланных данных
        payload = _normalize_payload(data.data.model_dump())
        item = CheckPlanData(data=payload)
        session.add(item)
        await session.flush()
        plan.check_plan_data_id = item.id
        plan.update_last_update_time()
        date_start = payload.get("date_start") or ""
        date_end = payload.get("date_end") or ""
        days_num, days_label = _days_from_dates(date_start, date_end)
        plan.days_num = days_num
        plan.days = days_label
        session.add(plan)
        await session.commit()
        await session.refresh(item)
        return _row_to_response(item)
    # Запись есть — обычное обновление
    await _require_current_user_is_author_of_plan_data(session, item_id, current_user.id)
    if data.data is not None:
        item.data = data.data.model_dump()
    session.add(item)
    await session.commit()
    await session.refresh(item)

    # Обновить days и days_num в связанных CheckPlan
    payload = item.data or {}
    date_start = payload.get("date_start") or ""
    date_end = payload.get("date_end") or ""
    days_num, days_label = _days_from_dates(date_start, date_end)
    plans_result = await session.execute(
        select(CheckPlan).where(CheckPlan.check_plan_data_id == item_id)
    )
    for plan in plans_result.scalars().all():
        plan.days_num = days_num
        plan.days = days_label
        plan.update_last_update_time()
        session.add(plan)
    await session.commit()

    return _row_to_response(item)


@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_check_plan_data(
    item_id: int,
    current_user: Annotated[User, Depends(get_current_user)],
    session: Annotated[AsyncSession, Depends(get_session)],
):
    """Удалить запись CheckPlanData."""
    result = await session.execute(select(CheckPlanData).where(CheckPlanData.id == item_id))
    item = result.scalar_one_or_none()
    if item is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="CheckPlanData not found",
        )
    await _require_current_user_is_author_of_plan_data(session, item_id, current_user.id)
    await session.delete(item)
    await session.commit()
