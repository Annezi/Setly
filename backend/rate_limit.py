import os
from typing import Optional

from fastapi import HTTPException, Request, status
from redis.asyncio import Redis


RATE_LIMIT_WINDOW_SECONDS = int(os.getenv("RATE_LIMIT_WINDOW_SECONDS", "60"))
RATE_LIMIT_PREFIX = os.getenv("RATE_LIMIT_PREFIX", "setly:rl")
REDIS_URL = os.getenv("REDIS_URL", "redis://redis:6379/0")

_redis_client: Optional[Redis] = None


def _resolve_client_ip(request: Request) -> str:
    xff = request.headers.get("x-forwarded-for", "")
    if xff:
        first = xff.split(",")[0].strip()
        if first:
            return first
    return request.client.host if request.client and request.client.host else "unknown"


def _rate_limit_key(scope: str, request: Request) -> str:
    return f"{RATE_LIMIT_PREFIX}:{scope}:{_resolve_client_ip(request)}"


def get_redis_client() -> Redis:
    global _redis_client
    if _redis_client is None:
        _redis_client = Redis.from_url(REDIS_URL, encoding="utf-8", decode_responses=True)
    return _redis_client


async def enforce_rate_limit(request: Request, scope: str, limit: int) -> None:
    client = get_redis_client()
    key = _rate_limit_key(scope, request)
    current = await client.incr(key)
    if current == 1:
        await client.expire(key, RATE_LIMIT_WINDOW_SECONDS)
    if current > limit:
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail="Слишком много запросов. Попробуйте позже.",
        )
