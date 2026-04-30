"""Уведомления в Telegram о заявках на публикацию чек-планов и обработка решений (кнопки)."""

from __future__ import annotations

import asyncio
import os
import re
import traceback
from datetime import datetime
from html import escape as esc
from typing import Any
from urllib.parse import quote

import requests
from sqlalchemy import select
from sqlmodel.ext.asyncio.session import AsyncSession

from database.database import async_session_maker
from database.models import CheckPlan, CheckPlanData, User

from api.admin import _write_audit

TELEGRAM_TEXT_LIMIT = 4096
TELEGRAM_CAPTION_LIMIT = 1024

# callback_data: a1/r1 = шаг подтверждения, a2/r2 = исполнение, c0 = отмена; :{plan_pk}
_CB_APPROVE_1 = "a1:"  # запрос «уверены?» для одобрения
_CB_APPROVE_2 = "a2:"  # подтверждённое одобрение
_CB_REJECT_1 = "r1:"
_CB_REJECT_2 = "r2:"
_CB_CANCEL = "c0:"  # назад к двум кнопкам


def _env_token() -> str:
    return (os.getenv("TELEGRAM_BOT_TOKEN") or "").strip()


def _env_chat_id() -> str:
    return (os.getenv("TELEGRAM_MODERATION_CHAT_ID") or "").strip()


def _env_site_url() -> str:
    return (
        (os.getenv("NEXT_PUBLIC_SITE_URL") or os.getenv("SITE_URL") or "https://setly.space")
        .strip()
        .rstrip("/")
    )


def _env_api_public_url() -> str:
    return (
        (os.getenv("API_PUBLIC_URL") or os.getenv("PUBLIC_API_URL") or "https://api.setly.space")
        .strip()
        .rstrip("/")
    )


def _allowed_telegram_user_ids() -> set[int] | None:
    raw = (os.getenv("TELEGRAM_MODERATION_USER_IDS") or "").strip()
    if not raw:
        return None
    out: set[int] = set()
    for p in raw.split(","):
        p = p.strip()
        if p.isdigit():
            out.add(int(p))
    return out if out else None


def moderation_telegram_enabled() -> bool:
    return bool(_env_token() and _env_chat_id())


def resolve_image_url_for_telegram(url: str) -> str:
    """Превращает путь с фронта или API в абсолютный https-URL для sendPhoto (Telegram качает по ссылке)."""
    u = (url or "").strip()
    if not u:
        return ""
    if u.startswith(("http://", "https://")):
        return u
    site = _env_site_url()
    api = _env_api_public_url()
    if u.startswith("/img/") or u.startswith("/icons/"):
        return f"{site}{u}" if u.startswith("/") else f"{site}/{u}"
    if u.startswith("/storage/"):
        return f"{api}{u}"
    if u.startswith("/"):
        return f"{api}{u}"
    return f"{api}/storage/{u}"


def _format_list_block(title: str, rows: list[Any], fmt_row) -> list[str]:
    lines: list[str] = [f"<b>{esc(title)}</b>"]
    if not rows:
        lines.append("—")
        return lines
    for row in rows:
        text = fmt_row(row)
        if text:
            lines.append(f"• {text}")
    return lines


def _fmt_contact_row(row: dict[str, Any]) -> str:
    if not isinstance(row, dict):
        return ""
    t = esc(str(row.get("title") or "").strip())
    d = esc(str(row.get("data") or "").strip())
    link = str(row.get("link") or "").strip()
    parts = [p for p in (t, d) if p]
    if link:
        parts.append(esc(link))
    return " — ".join(parts) if parts else ""


def format_full_checkplan_html(plan: CheckPlan, author: User, raw: dict[str, Any] | None) -> str:
    """Полное текстовое представление чек-плана для модерации (HTML)."""
    r = raw if isinstance(raw, dict) else {}
    lines: list[str] = []

    lines.append("<b>Заявка на публикацию</b>")
    lines.append(f"id_str: <code>{esc(plan.id_str)}</code>")
    lines.append(f"Автор: {esc(author.nickname or '')} (user {plan.author_id})")
    lines.append(f"Карточка: {esc(plan.title or '')}")
    lines.append(f"Описание (карточка): {esc(plan.description or '')}")
    lines.append(f"Дни: {esc(plan.days or '')} · Локация: {esc(plan.location or '')}")
    lines.append("")

    lines.append(f"<b>Данные чек-плана</b>")
    lines.append(f"Название: {esc(str(r.get('title') or ''))}")
    lines.append(f"Описание: {esc(str(r.get('description') or ''))}")
    lines.append(
        f"Даты: {esc(str(r.get('date_start') or ''))} — {esc(str(r.get('date_end') or ''))}"
    )
    lines.append(f"Место: {esc(str(r.get('place') or ''))}")
    lines.append(f"Тип поездки: {esc(str(r.get('travel_type') or ''))}")
    lines.append(f"Состав: {esc(str(r.get('group_size') or ''))}")
    lines.append(f"Доступ (данные): {esc(str(r.get('access_type') or ''))}")
    lines.append("")

    lb = r.get("luggage_hand_block")
    if isinstance(lb, list) and lb:
        lines.extend(
            _format_list_block(
                "Ручная кладь",
                lb,
                lambda x: esc(str(x.get("title", ""))) if isinstance(x, dict) else "",
            )
        )
        lines.append("")
    lb2 = r.get("luggage_block")
    if isinstance(lb2, list) and lb2:
        lines.extend(
            _format_list_block(
                "Багаж",
                lb2,
                lambda x: esc(str(x.get("title", ""))) if isinstance(x, dict) else "",
            )
        )
        lines.append("")

    pn = r.get("personal_notes_block")
    if isinstance(pn, list) and pn:
        lines.extend(
            _format_list_block(
                "Личные заметки",
                pn,
                lambda x: esc(str(x.get("title", ""))) if isinstance(x, dict) else "",
            )
        )
        lines.append("")

    wtg = r.get("what_to_go_block")
    if isinstance(wtg, dict):
        for key, label in (
            ("what_to_see", "Что посмотреть"),
            ("what_to_eat", "Где поесть"),
            ("what_to_buy", "Что купить"),
        ):
            block = wtg.get(key)
            if isinstance(block, list) and block:
                lines.extend(
                    _format_list_block(
                        label,
                        block,
                        lambda x: (
                            f"{esc(str(x.get('title', '')))} ({esc(str(x.get('link') or ''))})"
                            if isinstance(x, dict)
                            else ""
                        ),
                    )
                )
                lines.append("")

    uc = r.get("useful_contacts_block")
    if isinstance(uc, dict):
        blocks = uc.get("blocks")
        if isinstance(blocks, list):
            lines.append("<b>Полезные контакты</b>")
            for b in blocks:
                if not isinstance(b, dict):
                    continue
                ct = esc(str(b.get("contacts_type") or ""))
                lines.append(f"— {ct}")
                contacts = b.get("contacts")
                if isinstance(contacts, list):
                    for c in contacts:
                        row = _fmt_contact_row(c if isinstance(c, dict) else {})
                        if row:
                            lines.append(f"• {row}")
            lines.append("")

    bud = r.get("budget_block")
    if isinstance(bud, dict):
        lines.append(f"<b>{esc(str(bud.get('title') or 'Бюджет'))}</b>")
        table = bud.get("table")
        if isinstance(table, list):
            for row in table:
                if not isinstance(row, dict):
                    continue
                lines.append(
                    f"• {esc(str(row.get('title') or ''))}: план {row.get('plan', '')} / потрачено {row.get('spent', '')}"
                )
        lines.append("")

    blocks = r.get("blocks")
    if isinstance(blocks, list) and blocks:
        lines.append("<b>Доп. блоки</b>")
        for b in blocks:
            if not isinstance(b, dict):
                continue
            t = esc(str(b.get("title") or ""))
            d = esc(str(b.get("description") or ""))
            typ = esc(str(b.get("type") or "text"))
            lines.append(f"— [{typ}] {t}")
            if d:
                lines.append(d)
        lines.append("")

    text = "\n".join(lines).strip()
    if len(text) > 120_000:
        return text[:120_000] + "\n\n…(обрезано)"
    return text


def _split_telegram_chunks(text: str, limit: int = TELEGRAM_TEXT_LIMIT) -> list[str]:
    if len(text) <= limit:
        return [text]
    chunks: list[str] = []
    rest = text
    while rest:
        if len(rest) <= limit:
            chunks.append(rest)
            break
        cut = rest.rfind("\n", 0, limit)
        if cut < limit // 2:
            cut = limit
        chunks.append(rest[:cut])
        rest = rest[cut:].lstrip("\n")
    return chunks


def _tg_post(method: str, payload: dict[str, Any]) -> dict[str, Any] | None:
    token = _env_token()
    if not token:
        return None
    url = f"https://api.telegram.org/bot{token}/{method}"
    try:
        r = requests.post(url, json=payload, timeout=90)
        data = r.json()
        if not data.get("ok"):
            # Частая причина «крутится кнопка» — answerCallbackQuery не дошёл или токен от другого бота
            err = data.get("description") or data
            print(f"Telegram API {method} not ok: {err}", flush=True)
        return data if isinstance(data, dict) else None
    except Exception as e:
        print(f"Telegram API {method} exception: {e}", flush=True)
        return None


async def _tg_post_async(method: str, payload: dict[str, Any]) -> dict[str, Any] | None:
    return await asyncio.to_thread(_tg_post, method, payload)


def _initial_keyboard(plan_pk: int) -> dict[str, Any]:
    return {
        "inline_keyboard": [
            [
                {"text": "Одобрить", "callback_data": f"{_CB_APPROVE_1}{plan_pk}"},
                {"text": "Отклонить", "callback_data": f"{_CB_REJECT_1}{plan_pk}"},
            ]
        ]
    }


def _confirm_approve_keyboard(plan_pk: int) -> dict[str, Any]:
    return {
        "inline_keyboard": [
            [
                {"text": "Да, одобрить", "callback_data": f"{_CB_APPROVE_2}{plan_pk}"},
                {"text": "Отмена", "callback_data": f"{_CB_CANCEL}{plan_pk}"},
            ]
        ]
    }


def _confirm_reject_keyboard(plan_pk: int) -> dict[str, Any]:
    return {
        "inline_keyboard": [
            [
                {"text": "Да, отклонить", "callback_data": f"{_CB_REJECT_2}{plan_pk}"},
                {"text": "Отмена", "callback_data": f"{_CB_CANCEL}{plan_pk}"},
            ]
        ]
    }


async def _send_messages_for_checkplan(
    chat_id: str,
    caption_short: str,
    photo_url: str,
    full_html: str,
    plan_pk: int,
) -> None:
    keyboard = _initial_keyboard(plan_pk)

    if photo_url:
        cap = caption_short
        if len(cap) > TELEGRAM_CAPTION_LIMIT:
            cap = cap[: TELEGRAM_CAPTION_LIMIT - 20] + "\n…(см. текст ниже)"
        res = await _tg_post_async(
            "sendPhoto",
            {
                "chat_id": chat_id,
                "photo": photo_url,
                "caption": cap,
                "parse_mode": "HTML",
                "reply_markup": keyboard,
            },
        )
        if res and res.get("ok"):
            await _send_chunked_html(chat_id, full_html, reply_markup=None)
            return
        # fallback: отправить без фото
        print("sendPhoto failed, falling back to text", flush=True)

    await _tg_post_async(
        "sendMessage",
        {
            "chat_id": chat_id,
            "text": caption_short,
            "parse_mode": "HTML",
            "reply_markup": keyboard,
        },
    )
    await _send_chunked_html(chat_id, full_html, reply_markup=None)


async def _send_chunked_html(
    chat_id: str, html_text: str, reply_markup: dict[str, Any] | None
) -> None:
    for i, chunk in enumerate(_split_telegram_chunks(html_text)):
        payload: dict[str, Any] = {
            "chat_id": chat_id,
            "text": chunk,
            "parse_mode": "HTML",
        }
        if i == 0 and reply_markup:
            payload["reply_markup"] = reply_markup
        await _tg_post_async("sendMessage", payload)


async def notify_checkplan_moderation_submitted(plan_pk: int) -> None:
    """Фоновая отправка уведомления в Telegram (новая сессия БД)."""
    if not moderation_telegram_enabled():
        return
    chat_id = _env_chat_id()
    async with async_session_maker() as session:
        plan = await session.get(CheckPlan, plan_pk)
        if plan is None:
            return
        author = (
            await session.execute(select(User).where(User.id == plan.author_id))
        ).scalar_one_or_none()
        if author is None:
            return
        raw: dict[str, Any] | None = None
        did = int(plan.check_plan_data_id or 0)
        if did > 0:
            row = await session.get(CheckPlanData, did)
            if row and isinstance(row.data, dict):
                raw = dict(row.data)

    site = _env_site_url()
    # Сегмент URL понимает GET /api/check-plans/{ref}, в т.ч. полный id_str
    preview_path = f"/preview-checkplan/{quote(plan.id_str, safe='')}"
    preview_url = f"{site}{preview_path}"

    cover = resolve_image_url_for_telegram(plan.image_src or "")
    if not cover and raw and isinstance(raw.get("bg_url"), str):
        cover = resolve_image_url_for_telegram(raw["bg_url"])

    full_html = format_full_checkplan_html(plan, author, raw)

    nick = esc(author.nickname or "")
    title_esc = esc(plan.title or "")
    caption_lines = [
        "<b>Новая публикация на модерации</b>",
        f"Чек-план: {title_esc}",
        f"Автор: {nick}",
        f"Превью: {preview_url}",
        "",
        "Ниже — полное содержимое по блокам.",
    ]
    caption_short = "\n".join(caption_lines)
    if len(caption_short) > TELEGRAM_CAPTION_LIMIT:
        caption_short = caption_short[: TELEGRAM_CAPTION_LIMIT - 40] + "…"

    await _send_messages_for_checkplan(chat_id, caption_short, cover, full_html, plan_pk)


_RE_CB = re.compile(r"^(a1:|a2:|r1:|r2:|c0:)(\d+)$")


async def answer_callback_query(
    callback_id: str, text: str | None = None, show_alert: bool = False
) -> bool:
    """Возвращает True, если Telegram подтвердил запрос (иначе кнопка может «крутиться»)."""
    if not callback_id:
        return False
    payload: dict[str, Any] = {"callback_query_id": callback_id}
    if text:
        payload["text"] = text[:200]
        payload["show_alert"] = show_alert
    res = await _tg_post_async("answerCallbackQuery", payload)
    return bool(res and res.get("ok"))


def _message_has_photo(message: dict[str, Any]) -> bool:
    return bool(message.get("photo"))


async def strip_inline_keyboard(chat_id: int, message_id: int) -> None:
    """Убирает inline-кнопки у сообщения (например, после решения в админке по тому же чек-плану)."""
    await _tg_post_async(
        "editMessageReplyMarkup",
        {
            "chat_id": chat_id,
            "message_id": message_id,
            "reply_markup": {"inline_keyboard": []},
        },
    )


async def _append_moderation_result_to_message(
    chat_id: int,
    message_id: int,
    message: dict[str, Any],
    footer: str,
) -> None:
    if _message_has_photo(message):
        cap = (message.get("caption") or "") + footer
        await _tg_post_async(
            "editMessageCaption",
            {
                "chat_id": chat_id,
                "message_id": message_id,
                "caption": cap,
                "parse_mode": "HTML",
                "reply_markup": {"inline_keyboard": []},
            },
        )
    else:
        text = (message.get("text") or "") + footer
        await _tg_post_async(
            "editMessageText",
            {
                "chat_id": chat_id,
                "message_id": message_id,
                "text": text,
                "parse_mode": "HTML",
                "reply_markup": {"inline_keyboard": []},
            },
        )


def _parse_callback_data(data: str | None) -> tuple[str, int] | None:
    if not data:
        return None
    m = _RE_CB.match(data.strip())
    if not m:
        return None
    return m.group(1), int(m.group(2))


async def apply_moderation_from_callback(
    session: AsyncSession,
    plan_pk: int,
    new_status: str,
    telegram_user_id: int,
) -> tuple[bool, str]:
    """Выставить статус модерации по решению из Telegram."""
    plan = await session.get(CheckPlan, plan_pk)
    if plan is None:
        return False, "Чек-план не найден"
    if new_status not in ("approved", "rejected"):
        return False, "Недопустимый статус"
    if (plan.moderation_status or "").strip().lower() != "pending":
        st = plan.moderation_status or "?"
        return False, f"Уже обработано (сейчас: {st}). Используйте админку при необходимости."

    allowed = _allowed_telegram_user_ids()
    if allowed is not None and telegram_user_id not in allowed:
        return False, "Нет прав для этого действия"

    plan.moderation_status = new_status
    plan.last_update_time = datetime.now()
    session.add(plan)

    audit_uid = int(os.getenv("TELEGRAM_AUDIT_ADMIN_USER_ID") or "0")
    await _write_audit(
        session,
        audit_uid,
        "content.moderation.update",
        "checkplan",
        plan.id_str,
        {
            "moderation_status": new_status,
            "source": "telegram",
            "telegram_user_id": telegram_user_id,
        },
    )
    await session.commit()
    return True, "ok"


async def handle_telegram_callback(callback_query: dict[str, Any]) -> None:
    """Обработка нажатий на inline-кнопки."""
    data_raw = callback_query.get("data") or ""
    parsed = _parse_callback_data(str(data_raw))
    cq_id = str(callback_query.get("id") or "")
    from_user = callback_query.get("from") or {}
    tg_uid = int(from_user.get("id") or 0)

    message = callback_query.get("message") or {}
    chat = message.get("chat") or {}
    chat_id = chat.get("id")
    message_id = message.get("message_id")

    if chat_id is None or message_id is None:
        await answer_callback_query(cq_id, "Некорректное сообщение")
        return

    if not moderation_telegram_enabled():
        await answer_callback_query(cq_id, "Модерация Telegram отключена")
        return

    if parsed is None:
        await answer_callback_query(cq_id, "Неизвестное действие")
        return

    prefix, plan_pk = parsed

    async with async_session_maker() as session:
        if prefix in (_CB_APPROVE_1, _CB_REJECT_1):
            plan = await session.get(CheckPlan, plan_pk)
            if plan is None:
                await answer_callback_query(cq_id, "Чек-план не найден", show_alert=True)
                return
            mod = (plan.moderation_status or "").strip().lower()
            if mod != "pending":
                await answer_callback_query(
                    cq_id,
                    f"Эта заявка уже не на рассмотрении (статус: {plan.moderation_status}).",
                    show_alert=True,
                )
                await strip_inline_keyboard(chat_id, message_id)
                return
            if prefix == _CB_APPROVE_1:
                await answer_callback_query(
                    cq_id,
                    "Вы уверены, что хотите одобрить чек-план?",
                    show_alert=True,
                )
                await _tg_post_async(
                    "editMessageReplyMarkup",
                    {
                        "chat_id": chat_id,
                        "message_id": message_id,
                        "reply_markup": _confirm_approve_keyboard(plan_pk),
                    },
                )
                return
            await answer_callback_query(
                cq_id,
                "Вы уверены, что хотите отклонить чек-план?",
                show_alert=True,
            )
            await _tg_post_async(
                "editMessageReplyMarkup",
                {
                    "chat_id": chat_id,
                    "message_id": message_id,
                    "reply_markup": _confirm_reject_keyboard(plan_pk),
                },
            )
            return

        if prefix == _CB_CANCEL:
            plan_cancel = await session.get(CheckPlan, plan_pk)
            if plan_cancel and (plan_cancel.moderation_status or "").strip().lower() != "pending":
                await answer_callback_query(
                    cq_id,
                    "Статус уже изменён (например, в админке).",
                    show_alert=True,
                )
                await strip_inline_keyboard(chat_id, message_id)
                return
            await answer_callback_query(cq_id)
            await _tg_post_async(
                "editMessageReplyMarkup",
                {
                    "chat_id": chat_id,
                    "message_id": message_id,
                    "reply_markup": _initial_keyboard(plan_pk),
                },
            )
            return

        if prefix == _CB_APPROVE_2:
            ok, err = await apply_moderation_from_callback(session, plan_pk, "approved", tg_uid)
            if ok:
                await answer_callback_query(cq_id, "Одобрено", show_alert=False)
                await _append_moderation_result_to_message(
                    chat_id,
                    message_id,
                    message,
                    "\n\n✅ <b>Одобрено</b> (модерация)",
                )
            else:
                await answer_callback_query(cq_id, err or "Ошибка", show_alert=True)
                if err and "Уже обработано" in err:
                    await strip_inline_keyboard(chat_id, message_id)
            return

        if prefix == _CB_REJECT_2:
            ok, err = await apply_moderation_from_callback(session, plan_pk, "rejected", tg_uid)
            if ok:
                await answer_callback_query(cq_id, "Отклонено", show_alert=False)
                await _append_moderation_result_to_message(
                    chat_id,
                    message_id,
                    message,
                    "\n\n❌ <b>Отклонено</b> (модерация)",
                )
            else:
                await answer_callback_query(cq_id, err or "Ошибка", show_alert=True)
                if err and "Уже обработано" in err:
                    await strip_inline_keyboard(chat_id, message_id)
            return

    await answer_callback_query(cq_id, "Неизвестное действие")


async def process_telegram_update(update: dict[str, Any]) -> None:
    cq = update.get("callback_query")
    if not cq or not isinstance(cq, dict):
        return
    cq_id = str(cq.get("id") or "")
    try:
        await handle_telegram_callback(cq)
    except Exception:
        print("telegram callback handler error:", flush=True)
        print(traceback.format_exc(), flush=True)
        if cq_id:
            await answer_callback_query(
                cq_id,
                "Ошибка на сервере при обработке. Проверьте логи API.",
                show_alert=True,
            )
