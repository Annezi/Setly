"""security indexes

Revision ID: c4a8e2f91b03
Revises: b6e9b7d21a11
Create Date: 2026-05-19

"""
from typing import Sequence, Union

from alembic import op


revision: str = "c4a8e2f91b03"
down_revision: Union[str, Sequence[str], None] = "b6e9b7d21a11"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    op.create_index(
        "ix_userlikes_user_checklist",
        "userlikes",
        ["user_id", "checklist_id"],
        unique=True,
    )
    op.create_index(
        "ix_usercheckplan_user_id_str",
        "usercheckplan",
        ["user_id", "id_str"],
        unique=True,
    )
    op.create_index("ix_checkplans_author_id", "checkplans", ["author_id"], unique=False)
    op.create_index("ix_checkplans_visibility", "checkplans", ["visibility"], unique=False)
    op.create_index(
        "ix_checkplans_moderation_status",
        "checkplans",
        ["moderation_status"],
        unique=False,
    )


def downgrade() -> None:
    op.drop_index("ix_checkplans_moderation_status", table_name="checkplans")
    op.drop_index("ix_checkplans_visibility", table_name="checkplans")
    op.drop_index("ix_checkplans_author_id", table_name="checkplans")
    op.drop_index("ix_usercheckplan_user_id_str", table_name="usercheckplan")
    op.drop_index("ix_userlikes_user_checklist", table_name="userlikes")
