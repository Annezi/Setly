import asyncio
import hashlib
import secrets
from datetime import datetime
from typing import Annotated

from api.schemas.admin import (
    AdminAnalyticsResponse,
    AdminCheckPlanModerationRequest,
    AdminCheckPlansResponse,
    AdminSettingItem,
    AdminUserBlockRequest,
    AdminUsersResponse,
)
from auth import create_access_token, require_admin, verify_password
from database.database import get_session
from database.models import AdminAuditLog, CheckPlan, PlatformSetting, User
from emailing import send_admin_otp_email
from fastapi import APIRouter, Depends, HTTPException, Query, Request
from pydantic import BaseModel
from rate_limit import enforce_rate_limit, get_redis_client
from sqlmodel import func, select
from sqlmodel.ext.asyncio.session import AsyncSession

router = APIRouter(prefix="/admin", tags=["admin"])
RATE_LIMITS = {
    "admin_auth_sensitive": 30,
    "admin_otp_request": 10,
    "admin_otp_verify": 10,
}


class AdminOtpRequestBody(BaseModel):
    email: str
    password: str


class AdminOtpVerifyBody(BaseModel):
    user_id: int
    otp: str


async def _write_audit(
    session: AsyncSession,
    admin_user_id: int,
    action: str,
    target_type: str,
    target_id: str,
    details: dict | None = None,
) -> None:
    session.add(
        AdminAuditLog(
            admin_user_id=admin_user_id,
            action=action,
            target_type=target_type,
            target_id=target_id,
            details=details or {},
        )
    )


@router.post("/otp/request")
async def admin_otp_request(
    data: AdminOtpRequestBody,
    request: Request,
    session: Annotated[AsyncSession, Depends(get_session)],
):
    await enforce_rate_limit(
        request, "admin_otp_request", RATE_LIMITS["admin_otp_request"]
    )
    user = (
        await session.execute(select(User).where(User.email == data.email))
    ).scalar_one_or_none()
    if user is None or not verify_password(data.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Неверный email или пароль")
    if not user.is_admin:
        raise HTTPException(status_code=403, detail="Нет прав администратора")
    if user.is_blocked:
        raise HTTPException(status_code=403, detail="Пользователь заблокирован")
    otp = secrets.token_hex(3).upper()
    otp_hash = hashlib.sha256(otp.encode()).hexdigest()
    redis = get_redis_client()
    key = f"setly:admin:otp:{user.id}"
    await redis.set(key, otp_hash, ex=600)
    await asyncio.get_event_loop().run_in_executor(
        None, send_admin_otp_email, user.email, otp
    )
    return {"ok": True, "user_id": user.id}


@router.post("/otp/verify")
async def admin_otp_verify(
    data: AdminOtpVerifyBody,
    request: Request,
    session: Annotated[AsyncSession, Depends(get_session)],
):
    await enforce_rate_limit(
        request, "admin_otp_verify", RATE_LIMITS["admin_otp_verify"]
    )
    user = (
        await session.execute(select(User).where(User.id == data.user_id))
    ).scalar_one_or_none()
    if user is None:
        raise HTTPException(status_code=404, detail="Пользователь не найден")
    if not user.is_admin:
        raise HTTPException(status_code=403, detail="Нет прав администратора")
    if user.is_blocked:
        raise HTTPException(status_code=403, detail="Пользователь заблокирован")
    redis = get_redis_client()
    key = f"setly:admin:otp:{data.user_id}"
    stored_hash = await redis.get(key)
    if stored_hash is None:
        raise HTTPException(status_code=400, detail="Код не найден или истёк")
    submitted_hash = hashlib.sha256(data.otp.strip().upper().encode()).hexdigest()
    if submitted_hash != stored_hash:
        raise HTTPException(status_code=400, detail="Неверный код")
    await redis.delete(key)
    access_token, expires_in = create_access_token(user.id)
    return {
        "access_token": access_token,
        "expires_in": expires_in,
        "token_type": "bearer",
    }


@router.get("/users", response_model=AdminUsersResponse)
async def admin_users(
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=20, ge=1, le=100),
    search: str = Query(default=""),
    _: Annotated[User, Depends(require_admin)] = None,
    session: Annotated[AsyncSession, Depends(get_session)] = None,
):
    stmt = select(User)
    total_stmt = select(func.count()).select_from(User)
    if search.strip():
        like = f"%{search.strip().lower()}%"
        stmt = stmt.where(func.lower(User.email).like(like))
        total_stmt = total_stmt.where(func.lower(User.email).like(like))
    stmt = stmt.order_by(User.id.desc()).offset((page - 1) * limit).limit(limit)
    rows = (await session.execute(stmt)).scalars().all()
    total = int((await session.execute(total_stmt)).one()[0])
    return AdminUsersResponse(items=rows, total=total, page=page, limit=limit)


@router.patch("/users/{user_id}/block")
async def admin_block_user(
    user_id: int,
    data: AdminUserBlockRequest,
    request: Request,
    admin_user: Annotated[User, Depends(require_admin)],
    session: Annotated[AsyncSession, Depends(get_session)],
):
    await enforce_rate_limit(
        request, "admin_auth_sensitive", RATE_LIMITS["admin_auth_sensitive"]
    )
    target = (
        await session.execute(select(User).where(User.id == user_id))
    ).scalar_one_or_none()
    if target is None:
        raise HTTPException(status_code=404, detail="User not found")
    target.is_blocked = data.is_blocked
    session.add(target)
    await _write_audit(
        session,
        admin_user.id,
        "user.block.toggle",
        "user",
        str(user_id),
        {"is_blocked": data.is_blocked},
    )
    await session.commit()
    return {"ok": True}


@router.get("/content/checkplans", response_model=AdminCheckPlansResponse)
async def admin_checkplans(
    page: int = Query(default=1, ge=1),
    limit: int = Query(default=20, ge=1, le=100),
    search: str = Query(default=""),
    moderation_status: str | None = Query(default=None),
    _: Annotated[User, Depends(require_admin)] = None,
    session: Annotated[AsyncSession, Depends(get_session)] = None,
):
    stmt = select(CheckPlan)
    total_stmt = select(func.count()).select_from(CheckPlan)
    if search.strip():
        like = f"%{search.strip().lower()}%"
        stmt = stmt.where(func.lower(CheckPlan.title).like(like))
        total_stmt = total_stmt.where(func.lower(CheckPlan.title).like(like))
    if moderation_status:
        stmt = stmt.where(CheckPlan.moderation_status == moderation_status)
        total_stmt = total_stmt.where(CheckPlan.moderation_status == moderation_status)
    stmt = (
        stmt.order_by(CheckPlan.last_update_time.desc())
        .offset((page - 1) * limit)
        .limit(limit)
    )
    rows = (await session.execute(stmt)).scalars().all()
    total = int((await session.execute(total_stmt)).one()[0])
    return AdminCheckPlansResponse(items=rows, total=total, page=page, limit=limit)


@router.patch("/content/checkplans/{id_str}/moderation")
async def admin_moderate_checkplan(
    id_str: str,
    data: AdminCheckPlanModerationRequest,
    request: Request,
    admin_user: Annotated[User, Depends(require_admin)],
    session: Annotated[AsyncSession, Depends(get_session)],
):
    await enforce_rate_limit(
        request, "admin_auth_sensitive", RATE_LIMITS["admin_auth_sensitive"]
    )
    plan = (
        await session.execute(select(CheckPlan).where(CheckPlan.id_str == id_str))
    ).scalar_one_or_none()
    if plan is None:
        raise HTTPException(status_code=404, detail="CheckPlan not found")
    if data.moderation_status not in {"pending", "approved", "rejected"}:
        raise HTTPException(status_code=400, detail="Invalid moderation_status")
    plan.moderation_status = data.moderation_status
    plan.is_hidden_by_admin = data.is_hidden_by_admin
    plan.last_update_time = datetime.now()
    session.add(plan)
    await _write_audit(
        session,
        admin_user.id,
        "content.moderation.update",
        "checkplan",
        id_str,
        {
            "moderation_status": data.moderation_status,
            "is_hidden_by_admin": data.is_hidden_by_admin,
        },
    )
    await session.commit()
    return {"ok": True}


@router.get("/settings", response_model=list[AdminSettingItem])
async def admin_get_settings(
    _: Annotated[User, Depends(require_admin)],
    session: Annotated[AsyncSession, Depends(get_session)],
):
    rows = (
        (
            await session.execute(
                select(PlatformSetting).order_by(PlatformSetting.key.asc())
            )
        )
        .scalars()
        .all()
    )
    return rows


@router.put("/settings/{key}")
async def admin_upsert_setting(
    key: str,
    payload: dict,
    admin_user: Annotated[User, Depends(require_admin)],
    session: Annotated[AsyncSession, Depends(get_session)],
):
    value = str(payload.get("value", ""))
    row = (
        await session.execute(select(PlatformSetting).where(PlatformSetting.key == key))
    ).scalar_one_or_none()
    if row is None:
        row = PlatformSetting(key=key, value=value)
    else:
        row.value = value
        row.updated_at = datetime.utcnow()
    session.add(row)
    await _write_audit(
        session, admin_user.id, "settings.upsert", "setting", key, {"value": value}
    )
    await session.commit()
    return {"ok": True}


@router.get("/analytics", response_model=AdminAnalyticsResponse)
async def admin_analytics(
    _: Annotated[User, Depends(require_admin)],
    session: Annotated[AsyncSession, Depends(get_session)],
):
    total_users = int(
        (await session.execute(select(func.count()).select_from(User))).one()[0]
    )
    admin_users = int(
        (
            await session.execute(
                select(func.count()).select_from(User).where(User.is_admin.is_(True))
            )
        ).one()[0]
    )
    blocked_users = int(
        (
            await session.execute(
                select(func.count()).select_from(User).where(User.is_blocked.is_(True))
            )
        ).one()[0]
    )
    total_checkplans = int(
        (await session.execute(select(func.count()).select_from(CheckPlan))).one()[0]
    )
    pending_moderation = int(
        (
            await session.execute(
                select(func.count())
                .select_from(CheckPlan)
                .where(CheckPlan.moderation_status == "pending")
            )
        ).one()[0]
    )
    return AdminAnalyticsResponse(
        total_users=total_users,
        admin_users=admin_users,
        blocked_users=blocked_users,
        total_checkplans=total_checkplans,
        pending_moderation=pending_moderation,
    )
