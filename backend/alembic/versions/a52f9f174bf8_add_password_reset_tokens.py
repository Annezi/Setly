"""add_password_reset_tokens

Revision ID: a52f9f174bf8
Revises: 19f3b0d1d2a1
Create Date: 2026-04-28

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = "a52f9f174bf8"
down_revision: Union[str, Sequence[str], None] = "19f3b0d1d2a1"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "passwordresettoken",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("token_hash", sa.String(), nullable=False),
        sa.Column("expires_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("used_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.text("now()")),
        sa.ForeignKeyConstraint(["user_id"], ["user.id"], ondelete="CASCADE"),
    )
    op.create_index("ix_passwordresettoken_user_id", "passwordresettoken", ["user_id"], unique=False)
    op.create_index("ix_passwordresettoken_token_hash", "passwordresettoken", ["token_hash"], unique=True)


def downgrade() -> None:
    op.drop_index("ix_passwordresettoken_token_hash", table_name="passwordresettoken")
    op.drop_index("ix_passwordresettoken_user_id", table_name="passwordresettoken")
    op.drop_table("passwordresettoken")
