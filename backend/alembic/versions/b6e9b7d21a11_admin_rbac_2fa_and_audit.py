"""admin_rbac_2fa_and_audit

Revision ID: b6e9b7d21a11
Revises: a52f9f174bf8
Create Date: 2026-04-28
"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


revision: str = "b6e9b7d21a11"
down_revision: Union[str, Sequence[str], None] = "a52f9f174bf8"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.add_column("user", sa.Column("is_admin", sa.Boolean(), nullable=False, server_default=sa.text("false")))
    op.add_column("user", sa.Column("is_blocked", sa.Boolean(), nullable=False, server_default=sa.text("false")))
    op.add_column("user", sa.Column("totp_enabled", sa.Boolean(), nullable=False, server_default=sa.text("false")))
    op.add_column("user", sa.Column("totp_secret_encrypted", sa.String(), nullable=False, server_default=""))
    op.add_column("user", sa.Column("totp_backup_codes_hash", sa.JSON(), nullable=False, server_default=sa.text("'[]'::json")))

    op.add_column("checkplans", sa.Column("moderation_status", sa.String(), nullable=False, server_default="pending"))
    op.add_column("checkplans", sa.Column("is_hidden_by_admin", sa.Boolean(), nullable=False, server_default=sa.text("false")))

    op.create_table(
        "platformsetting",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("key", sa.String(), nullable=False),
        sa.Column("value", sa.String(), nullable=False, server_default=""),
        sa.Column("updated_at", sa.DateTime(), nullable=False, server_default=sa.text("now()")),
    )
    op.create_index("ix_platformsetting_key", "platformsetting", ["key"], unique=True)

    op.create_table(
        "adminauditlog",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("admin_user_id", sa.Integer(), nullable=False),
        sa.Column("action", sa.String(), nullable=False),
        sa.Column("target_type", sa.String(), nullable=False),
        sa.Column("target_id", sa.String(), nullable=False),
        sa.Column("details", sa.JSON(), nullable=False, server_default=sa.text("'{}'::json")),
        sa.Column("created_at", sa.DateTime(), nullable=False, server_default=sa.text("now()")),
    )
    op.create_index("ix_adminauditlog_admin_user_id", "adminauditlog", ["admin_user_id"], unique=False)


def downgrade() -> None:
    op.drop_index("ix_adminauditlog_admin_user_id", table_name="adminauditlog")
    op.drop_table("adminauditlog")

    op.drop_index("ix_platformsetting_key", table_name="platformsetting")
    op.drop_table("platformsetting")

    op.drop_column("checkplans", "is_hidden_by_admin")
    op.drop_column("checkplans", "moderation_status")

    op.drop_column("user", "totp_backup_codes_hash")
    op.drop_column("user", "totp_secret_encrypted")
    op.drop_column("user", "totp_enabled")
    op.drop_column("user", "is_blocked")
    op.drop_column("user", "is_admin")
