"""initial_tables

Revision ID: 001
Revises:
Create Date: 2025-03-04

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects.postgresql import JSON

revision: str = "001"
down_revision: Union[str, Sequence[str], None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_table(
        "user",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("nickname", sa.String(), nullable=True),
        sa.Column("email", sa.String(), nullable=False),
        sa.Column("email_is_verified", sa.Boolean(), nullable=False, server_default="false"),
        sa.Column("profile_photo_url", sa.String(), nullable=False, server_default=""),
        sa.Column("profile_bg_url", sa.String(), nullable=False, server_default=""),
        sa.Column("password_hash", sa.String(), nullable=False, server_default=""),
    )
    op.create_table(
        "userlikes",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("checklist_id", sa.String(), nullable=False),
        sa.Column("user_id", sa.Integer(), nullable=False),
    )
    op.create_table(
        "usercheckplan",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("user_id", sa.Integer(), nullable=False),
        sa.Column("id_str", sa.String(), nullable=False),
    )
    op.create_table(
        "checkplans",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("id_str", sa.String(), nullable=False),
        sa.Column("author_id", sa.Integer(), nullable=False),
        sa.Column("image_src", sa.String(), nullable=False, server_default=""),
        sa.Column("image_alt", sa.String(), nullable=False, server_default=""),
        sa.Column("days", sa.String(), nullable=False, server_default=""),
        sa.Column("days_num", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("location", sa.String(), nullable=False, server_default=""),
        sa.Column("title", sa.String(), nullable=False, server_default=""),
        sa.Column("description", sa.String(), nullable=False, server_default=""),
        sa.Column("visibility", sa.String(), nullable=False, server_default="public"),
        sa.Column("initial_likes", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("check_plan_data_id", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("filter_tag", sa.String(), nullable=False, server_default="По городам"),
        sa.Column("region_tag", sa.String(), nullable=True),
        sa.Column("traveler_tags", JSON(), nullable=False, server_default="[]"),
        sa.Column("season_tags", JSON(), nullable=False, server_default="[]"),
        sa.Column("creation_time", sa.DateTime(), nullable=False, server_default=sa.text("now()")),
        sa.Column("last_update_time", sa.DateTime(), nullable=False, server_default=sa.text("now()")),
        sa.ForeignKeyConstraint(["author_id"], ["user.id"]),
    )
    op.create_index("ix_checkplans_id_str", "checkplans", ["id_str"], unique=True)
    op.create_table(
        "checkplans_data",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("data", JSON(), nullable=False),
    )


def downgrade() -> None:
    op.drop_table("checkplans_data")
    op.drop_index("ix_checkplans_id_str", table_name="checkplans")
    op.drop_table("checkplans")
    op.drop_table("usercheckplan")
    op.drop_table("userlikes")
    op.drop_table("user")
