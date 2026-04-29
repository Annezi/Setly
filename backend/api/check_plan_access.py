"""Единые правила чтения чек-плана (GET план + данные) для всех роутов."""

from database.models import CheckPlan, User


def can_read_check_plan(plan: CheckPlan, current_user: User | None) -> bool:
    """
    Доступ на чтение по прямой ссылке:
    - скрыто админом — только админ;
    - отклонено модерацией — автор или админ;
    - private — только автор (с любым способом входа);
    - link / public — любой (в т.ч. без авторизации).
    """
    if plan.is_hidden_by_admin:
        return current_user is not None and current_user.is_admin
    if plan.moderation_status == "rejected":
        return current_user is not None and (
            current_user.is_admin or plan.author_id == current_user.id
        )
    visibility = (plan.visibility or "public").strip().lower()
    if visibility == "private":
        return current_user is not None and plan.author_id == current_user.id
    return True
