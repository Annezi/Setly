import pytest
from fastapi import HTTPException

from auth import require_admin
from database.models import User


@pytest.mark.asyncio
async def test_require_admin_allows_admin():
    user = User(
        id=1,
        email="admin@test.dev",
        nickname="admin",
        password_hash="hash",
        is_admin=True,
    )
    result = await require_admin(user)
    assert result.is_admin is True


@pytest.mark.asyncio
async def test_require_admin_blocks_non_admin():
    user = User(
        id=2,
        email="user@test.dev",
        nickname="user",
        password_hash="hash",
        is_admin=False,
    )
    with pytest.raises(HTTPException) as exc:
        await require_admin(user)
    assert exc.value.status_code == 403
