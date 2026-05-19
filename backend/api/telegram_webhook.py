"""Входящий webhook Telegram Bot API для кнопок модерации."""

import hmac
import os

from fastapi import APIRouter, HTTPException, Request

from api.telegram_moderation import process_telegram_update

router = APIRouter(tags=["telegram"])


def _verify_webhook_secret(provided: str) -> None:
    expected = (os.getenv("TELEGRAM_WEBHOOK_SECRET") or "").strip()
    if not expected or not provided or not hmac.compare_digest(provided, expected):
        raise HTTPException(status_code=404, detail="Not found")


@router.post("/telegram/webhook")
async def telegram_webhook_header(request: Request):
    """
    Предпочтительный webhook: секрет в заголовке X-Telegram-Bot-Api-Secret-Token.
    curl -X POST "https://api.telegram.org/bot<TOKEN>/setWebhook" \\
      -d "url=https://api.setly.space/api/telegram/webhook" \\
      -d "secret_token=<TELEGRAM_WEBHOOK_SECRET>"
    """
    header_secret = (request.headers.get("X-Telegram-Bot-Api-Secret-Token") or "").strip()
    _verify_webhook_secret(header_secret)
    return await _process_body(request)


@router.post("/telegram/webhook/{secret}")
async def telegram_webhook_legacy(secret: str, request: Request):
    """Legacy URL с секретом в path (оставлен для обратной совместимости)."""
    _verify_webhook_secret(secret.strip())
    return await _process_body(request)


async def _process_body(request: Request):
    try:
        body = await request.json()
    except Exception:
        raise HTTPException(status_code=400, detail="Invalid JSON")
    if os.getenv("TELEGRAM_DEBUG_WEBHOOK", "").strip() == "1":
        print(
            f"telegram webhook: update_id={body.get('update_id')} keys={list(body.keys())}",
            flush=True,
        )
    await process_telegram_update(body)
    return {"ok": True}
