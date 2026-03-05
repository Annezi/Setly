"""Роуты каталога чек-планов (страница /check-plans)."""

import copy as copy_module
from collections import Counter, defaultdict
from datetime import datetime
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import func
from sqlmodel import select
from sqlmodel.ext.asyncio.session import AsyncSession

from database.database import get_session
from database.models import CheckPlan, User, UserLikes, CheckPlanData, CheckPlanDataStaff
from api.schemas.check_plan import (
    CheckPlanCard,
    CheckPlanBlock,
    CheckPlansResponse,
    CheckPlanCreate,
    CheckPlanUpdate,
    CheckPlanResponse,
    CheckPlansCustomRequest
)

import uuid

from auth import get_current_user

router = APIRouter(prefix="/check-plans", tags=["check-plans"])

# Порядок и тексты блоков по категориям (filter_tag)
BLOCK_ORDER = [
    "В горы",
    "По городам",
    "На пляж",
    "С семьёй или детьми",
    "Долго / Кочёвка",
]
BLOCK_TITLES = {
    "В горы": "Горы",
    "По городам": "Городской отдых",
    "На пляж": "На пляж",
    "С семьёй или детьми": "С семьёй или детьми",
    "Долго / Кочёвка": "Долго / Кочёвка",
}
BLOCK_DESCRIPTIONS = {
    "В горы": "Для тех, кто хочет треккинга, палаток, высоты и природы",
    "По городам": "Планы для музеев, кафе, прогулок",
    "На пляж": "Море, солнце, отели, лёгкая одежда и спокойствие",
    "С семьёй или детьми": "Поездки, где важнее всего — комфорт, безопасность и привычки",
    "Долго / Кочёвка": "10+ дней, часто с перемещениями, разными странами/климатами",
}


def _sanitize_image_url(url: str) -> str:
    """Убирает пробелы и лишние запятые из URL/пути картинки, чтобы не ломать отображение."""
    if not url or not isinstance(url, str):
        return ""
    return url.strip().rstrip(",").strip()


def _plan_to_card(
    plan: CheckPlan,
    author: User,
    likes_count: int,
    block_id: str | None = None,
) -> CheckPlanCard:
    """Собирает карточку для фронта из модели и автора."""
    avatar = _sanitize_image_url(author.profile_photo_url or "")
    if avatar and not avatar.startswith(("http", "/")):
        avatar = f"/storage/{avatar}"
    image_src = _sanitize_image_url(plan.image_src or "")
    if image_src and not image_src.startswith(("http", "/")):
        image_src = f"/storage/{image_src}"
    return CheckPlanCard(
        id=plan.id_str,
        imageSrc=image_src,
        imageAlt=plan.image_alt or plan.title,
        days=plan.days,
        location=plan.location,
        title=plan.title,
        description=plan.description,
        userName=author.nickname or "Автор",
        avatarSrc=avatar,
        initialLikes=likes_count,
        filterTag=plan.filter_tag,
        regionTag=plan.region_tag,
        daysNum=plan.days_num,
        travelerTags=plan.traveler_tags or [],
        seasonTags=plan.season_tags or [],
        creationTime=plan.creation_time,
        blockId=block_id,
    )


@router.get("", response_model=CheckPlansResponse)
async def list_check_plans(
    session: Annotated[AsyncSession, Depends(get_session)],
):
    """
    Список всех публичных чек-планов: блоки по категориям и плоский список карточек.
    Для построения страницы /check-plans (фильтры и поиск на фронте).
    """
    # Публичные планы с автором
    result = await session.execute(
        select(CheckPlan, User)
        .join(User, CheckPlan.author_id == User.id)
        .where(CheckPlan.visibility == "public")
        .order_by(CheckPlan.id)
    )
    rows = result.all()

    # Количество лайков по checklist_id (id_str плана)
    plan_ids = [r[0].id_str for r in rows]
    likes_result = await session.execute(
        select(UserLikes.checklist_id).where(UserLikes.checklist_id.in_(plan_ids))
    )
    like_counts = Counter()
    for (cid,) in likes_result.all():
        like_counts[cid] += 1

    def block_id(tag: str) -> str:
        return f"setly-{tag.replace(' / ', '-').replace(' ', '-').lower()}"

    # Карточки с лайками и blockId
    cards: list[CheckPlanCard] = []
    for plan, author in rows:
        cnt = like_counts.get(plan.id_str, plan.initial_likes)
        cards.append(_plan_to_card(plan, author, cnt, block_id=block_id(plan.filter_tag)))

    # Группировка по filter_tag для блоков
    by_tag: dict[str, list[CheckPlanCard]] = defaultdict(list)
    for c in cards:
        by_tag[c.filterTag].append(c)

    blocks_list: list[CheckPlanBlock] = []
    for tag in BLOCK_ORDER:
        if tag not in by_tag or not by_tag[tag]:
            continue
        blocks_list.append(
            CheckPlanBlock(
                id=block_id(tag),
                title=BLOCK_TITLES.get(tag, tag),
                filterTag=tag,
                description=BLOCK_DESCRIPTIONS.get(tag, ""),
                cards=by_tag[tag],
            )
        )

    return CheckPlansResponse(blocks=blocks_list, flatCards=cards)


def _plan_to_response(plan: CheckPlan) -> CheckPlanResponse:
    """Преобразует модель CheckPlan в схему ответа."""
    return CheckPlanResponse(
        id=plan.id,
        id_str=plan.id_str,
        author_id=plan.author_id,
        image_src=_sanitize_image_url(plan.image_src or ""),
        image_alt=_sanitize_image_url(plan.image_alt or "") or plan.title or "",
        days=plan.days or "",
        days_num=plan.days_num,
        location=plan.location or "",
        title=plan.title or "",
        description=plan.description or "",
        visibility=plan.visibility or "public",
        initial_likes=plan.initial_likes,
        check_plan_data_id=plan.check_plan_data_id,
        filter_tag=plan.filter_tag or "По городам",
        region_tag=plan.region_tag,
        traveler_tags=plan.traveler_tags or [],
        season_tags=plan.season_tags or [],
        creation_time=plan.creation_time,
    )


@router.get("/{id_str}", response_model=CheckPlanResponse)
async def get_check_plan(
    id_str: str,
    session: Annotated[AsyncSession, Depends(get_session)],
):
    """Один чек-план по id_str. Количество лайков считается по таблице UserLikes (как в списке планов)."""
    result = await session.execute(select(CheckPlan).where(CheckPlan.id_str == id_str))
    plan = result.scalar_one_or_none()
    if plan is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="CheckPlan not found",
        )
    likes_result = await session.execute(
        select(func.count()).select_from(UserLikes).where(UserLikes.checklist_id == id_str)
    )
    likes_count = likes_result.scalar() or 0
    base = _plan_to_response(plan)
    return CheckPlanResponse(
        id=base.id,
        id_str=base.id_str,
        author_id=base.author_id,
        image_src=base.image_src,
        image_alt=base.image_alt,
        days=base.days,
        days_num=base.days_num,
        location=base.location,
        title=base.title,
        description=base.description,
        visibility=base.visibility,
        initial_likes=likes_count,
        check_plan_data_id=base.check_plan_data_id,
        filter_tag=base.filter_tag,
        region_tag=base.region_tag,
        traveler_tags=base.traveler_tags,
        season_tags=base.season_tags,
        creation_time=base.creation_time,
    )


@router.post("", response_model=CheckPlanResponse, status_code=status.HTTP_201_CREATED)
async def create_check_plan(
    data: CheckPlanCreate,
    session: Annotated[AsyncSession, Depends(get_session)],
):
    """Создать чек-план."""
    plan = CheckPlan(
        id_str=data.id_str,
        author_id=data.author_id,
        image_src=data.image_src,
        image_alt=data.image_alt,
        days=data.days,
        days_num=data.days_num,
        location=data.location,
        title=data.title,
        description=data.description,
        visibility=data.visibility,
        initial_likes=data.initial_likes,
        check_plan_data_id=data.check_plan_data_id,
        filter_tag=data.filter_tag,
        region_tag=data.region_tag,
        traveler_tags=data.traveler_tags,
        season_tags=data.season_tags,
    )
    session.add(plan)
    await session.commit()
    await session.refresh(plan)
    return _plan_to_response(plan)


@router.patch("/{id_str}", response_model=CheckPlanResponse)
async def update_check_plan(
    id_str: str,
    data: CheckPlanUpdate,
    session: Annotated[AsyncSession, Depends(get_session)],
):
    """Обновить чек-план (частично) по id_str."""
    result = await session.execute(select(CheckPlan).where(CheckPlan.id_str == id_str))
    plan = result.scalar_one_or_none()
    if plan is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="CheckPlan not found",
        )
    if data.image_src is not None:
        plan.image_src = _sanitize_image_url(data.image_src)
    if data.image_alt is not None:
        plan.image_alt = _sanitize_image_url(data.image_alt)
    if data.days is not None:
        plan.days = data.days
    if data.days_num is not None:
        plan.days_num = data.days_num
    if data.location is not None:
        plan.location = data.location
    if data.title is not None:
        plan.title = data.title
    if data.description is not None:
        plan.description = data.description
    if data.visibility is not None:
        plan.visibility = data.visibility
    if data.initial_likes is not None:
        plan.initial_likes = data.initial_likes
    if data.check_plan_data_id is not None:
        plan.check_plan_data_id = data.check_plan_data_id
    if data.filter_tag is not None:
        plan.filter_tag = data.filter_tag
    if data.region_tag is not None:
        plan.region_tag = data.region_tag
    if data.traveler_tags is not None:
        plan.traveler_tags = data.traveler_tags
    if data.season_tags is not None:
        plan.season_tags = data.season_tags
    session.add(plan)
    await session.commit()
    await session.refresh(plan)
    return _plan_to_response(plan)


@router.delete("/{id_str}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_check_plan(
    id_str: str,
    current_user: Annotated[User, Depends(get_current_user)],
    session: Annotated[AsyncSession, Depends(get_session)],
):
    """Удалить чек-план по id_str. Только автор может удалить свой чек-план."""
    result = await session.execute(select(CheckPlan).where(CheckPlan.id_str == id_str))
    plan = result.scalar_one_or_none()
    if plan is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="CheckPlan not found",
        )
    if plan.author_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only the author can delete this check plan",
        )
    await session.delete(plan)
    await session.commit()


@router.post("/{id_str}/copy", response_model=CheckPlanResponse, status_code=status.HTTP_201_CREATED)
async def copy_check_plan(
    id_str: str,
    current_user: Annotated[User, Depends(get_current_user)],
    session: Annotated[AsyncSession, Depends(get_session)],
):
    """Создать копию чек-плана с авторством текущего пользователя (приватный, 0 лайков)."""
    result = await session.execute(select(CheckPlan).where(CheckPlan.id_str == id_str))
    plan = result.scalar_one_or_none()
    if plan is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="CheckPlan not found",
        )
    new_id_str = f"copy-{uuid.uuid4().hex}"
    copy_title_suffix = " (копия)"
    new_title = (plan.title or "").strip() + copy_title_suffix
    check_plan_data_id = 0
    if plan.check_plan_data_id and plan.check_plan_data_id > 0:
        data_result = await session.execute(
            select(CheckPlanData).where(CheckPlanData.id == plan.check_plan_data_id)
        )
        data_row = data_result.scalar_one_or_none()
        if data_row is not None and data_row.data:
            new_data_dict = copy_module.deepcopy(dict(data_row.data))
            new_data_dict["title"] = (new_data_dict.get("title") or "").strip() + copy_title_suffix
            # Личные заметки не копируются — у копии пустой блок
            new_data_dict["personal_notes_block"] = []
            # Чекбоксы «Что взять» в копии сбрасываются (неактивные)
            for block_key in ("luggage_hand_block", "luggage_block"):
                block = new_data_dict.get(block_key)
                if isinstance(block, list):
                    for item in block:
                        if isinstance(item, dict):
                            item["is_checked"] = False
                            item["checked"] = False
            new_data = CheckPlanData(data=new_data_dict)
            session.add(new_data)
            await session.flush()
            check_plan_data_id = new_data.id
    new_plan = CheckPlan(
        id_str=new_id_str,
        author_id=current_user.id,
        image_src=plan.image_src or "",
        image_alt=plan.image_alt or "",
        days=plan.days or "",
        days_num=plan.days_num or 0,
        location=plan.location or "",
        title=new_title,
        description=plan.description or "",
        visibility="private",
        initial_likes=0,
        check_plan_data_id=check_plan_data_id,
        filter_tag=plan.filter_tag or "По городам",
        region_tag=plan.region_tag,
        traveler_tags=plan.traveler_tags or [],
        season_tags=plan.season_tags or [],
    )
    new_plan.creation_time = datetime.utcnow()
    session.add(new_plan)
    await session.commit()
    await session.refresh(new_plan)
    return _plan_to_response(new_plan)


@router.post("/custom/create", status_code=status.HTTP_201_CREATED)
async def create_checkplan_custom(
    session: Annotated[AsyncSession, Depends(get_session)],
    current_user: Annotated[User, Depends(get_current_user)],
    data: CheckPlansCustomRequest
):
    unic_str = f"{uuid.uuid4().hex}"
    str_id=f"{data.checkplan_name}-{unic_str}"
    cover_url = _sanitize_image_url(data.cover_url or "")

    if data.is_pattern_needed:
        checkplan_data = CheckPlanData(
            data={
                "title": data.checkplan_name,
                "description": "",
                "access_type": "private",
                "bg_url": cover_url,
                "date_start": "",
                "date_end": "",
                "place": "",
                "travel_type": data.travel_type,
                "group_size": "",
                "luggage_type": False,
                "luggage_hand_block": [],
                "luggage_block": [],
                "personal_notes_block": [],
                "what_to_go_block": {
                    "what_to_see": [],
                    "what_to_eat": [],
                    "what_to_buy": [],
                },
                "useful_contacts_block": None,
                "budget_block": {
                    "title": "Бюджет",
                    "table": [],
                },
                "blocks": [
                    {
                        "type": "text",
                        "title": "Описание",
                        "description": "",
                    }
                ],
            }
        )
        session.add(checkplan_data)
        await session.commit()
        await session.refresh(checkplan_data)
        checkplan_data_id = checkplan_data.id
    else:
        checkplan_data = CheckPlanData(
            data={
                "title": data.checkplan_name,
                "description": "",
                "access_type": "private",
                "bg_url": cover_url,
                "date_start": "",
                "date_end": "",
                "place": "",
                "travel_type": data.travel_type,
                "group_size": "",
                "luggage_type": False,
                "luggage_hand_block": None,
                "luggage_block": None,
                "personal_notes_block": None,
                "what_to_go_block": None,
                "useful_contacts_block": None,
                "budget_block": None,
                "blocks": [],
            }
        )
        session.add(checkplan_data)
        await session.commit()
        await session.refresh(checkplan_data)
        checkplan_data_id = checkplan_data.id

    plan = CheckPlan(
        id_str=str_id,
        author_id=current_user.id,
        image_src=cover_url,
        image_alt=cover_url,
        days="",
        days_num=0,
        location="",
        title=data.checkplan_name,
        description="",
        visibility="private",
        initial_likes=0,
        check_plan_data_id=checkplan_data_id,
        filter_tag=data.travel_type,
        region_tag=None,
        traveler_tags=[],
        season_tags=[]
    )
    session.add(plan)
    await session.commit()
    await session.refresh(plan)
    return _plan_to_response(plan)