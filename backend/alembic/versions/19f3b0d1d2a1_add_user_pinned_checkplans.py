"""add_user_pinned_checkplans

Revision ID: 19f3b0d1d2a1
Revises: 7d90e8b5b80e
Create Date: 2026-04-28

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "19f3b0d1d2a1"
down_revision: Union[str, Sequence[str], None] = "7d90e8b5b80e"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "userpinnedcheckplan",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("id_str", sa.String(), nullable=False),
        sa.Column("pinned_at", sa.DateTime(), nullable=False, server_default=sa.text("now()")),
    )
    op.create_index(
        "ix_userpinnedcheckplan_user_id_id_str",
        "userpinnedcheckplan",
        ["user_id", "id_str"],
        unique=True,
    )


def downgrade() -> None:
    op.drop_index("ix_userpinnedcheckplan_user_id_id_str", table_name="userpinnedcheckplan")
    op.drop_table("userpinnedcheckplan")
