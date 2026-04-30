"""Входящий webhook Telegram Bot API для кнопок модерации."""

import os

from fastapi import APIRouter, HTTPException, Request

from api.telegram_moderation import process_telegram_update

router = APIRouter(tags=["telegram"])


@router.post("/telegram/webhook/{secret}")
async def telegram_webhook(secret: str, request: Request):
    """
    Установите webhook (иначе нажатия кнопок не доходят до сервера — кнопка «крутится»):
    curl "https://api.telegram.org/bot<TOKEN>/setWebhook?url=https://api.setly.space/api/telegram/webhook/<TELEGRAM_WEBHOOK_SECRET>"
    Проверка: curl "https://api.telegram.org/bot<TOKEN>/getWebhookInfo"
    """
    expected = (os.getenv("TELEGRAM_WEBHOOK_SECRET") or "").strip()
    if not expected or secret != expected:
        raise HTTPException(status_code=404, detail="Not found")
    try:
        body = await request.json()
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid JSON")
    # Уведомления в чат идут через send*, нажатия кнопок — только сюда (webhook / long polling)
    if os.getenv("TELEGRAM_DEBUG_WEBHOOK", "").strip() == "1":
        print(
            f"telegram webhook: update_id={body.get('update_id')} keys={list(body.keys())}",
            flush=True,
        )
    await process_telegram_update(body)
    return {"ok": True}
