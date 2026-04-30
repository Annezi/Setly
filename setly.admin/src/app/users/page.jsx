"use client";

import { useEffect, useState, useCallback } from "react";
import AdminLayout from "@/components/AdminLayout";
import ColumnResizeHandle from "@/components/ColumnResizeHandle";
import useAdminGuard from "@/lib/useAdminGuard";
import { fetchUsers, blockUser, deleteUser, updateUserRole } from "@/lib/api";
import { absolutePublicUrl, buildProfilePath } from "@/lib/publicLinks";

const LIMIT = 20;
const MIN_COL_WIDTH = 80;
/** Стартовая ширина каждого столбца — минимально возможная; расширение вручную через ручку. */
const DEFAULT_COL_WIDTH = MIN_COL_WIDTH;

const thBase = {
  position: "relative",
  padding: "10px 22px 10px 8px",
  textAlign: "center",
  verticalAlign: "middle",
  fontWeight: 600,
  color: "var(--color-text-secondary)",
  fontSize: 12,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  borderBottom: "1px solid var(--color-border)",
  whiteSpace: "nowrap",
};

const tdBase = {
  padding: "10px 6px",
  borderBottom: "1px solid var(--color-border)",
  textAlign: "center",
  verticalAlign: "middle",
};

function Badge({ children, color, bg }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "2px 10px",
        borderRadius: 100,
        fontSize: 12,
        fontWeight: 600,
        color,
        background: bg,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

export default function UsersPage() {
  const { loading: authLoading } = useAdminGuard();

  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null);
  const [colWidths, setColWidths] = useState({
    id: DEFAULT_COL_WIDTH,
    email: DEFAULT_COL_WIDTH,
    nickname: DEFAULT_COL_WIDTH,
    role: DEFAULT_COL_WIDTH,
    status: DEFAULT_COL_WIDTH,
    totp: DEFAULT_COL_WIDTH,
    actions: DEFAULT_COL_WIDTH,
  });

  const loadUsers = useCallback(
    async (pg, srch) => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchUsers(pg, LIMIT, srch);
        setUsers(data.items);
        setTotal(data.total);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    if (!authLoading) loadUsers(page, search);
  }, [authLoading, page, search, loadUsers]);

  function handleSearch(e) {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  }

  async function handleBlock(user) {
    setActionLoading(user.id);
    try {
      await blockUser(user.id, !user.is_blocked);
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, is_blocked: !u.is_blocked } : u))
      );
    } catch (err) {
      alert("Ошибка: " + err.message);
    } finally {
      setActionLoading(null);
    }
  }

  async function handleRoleChange(user, isAdmin) {
    if (user.is_admin === isAdmin) return;
    setActionLoading(`role-${user.id}`);
    try {
      await updateUserRole(user.id, isAdmin);
      setUsers((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, is_admin: isAdmin } : u))
      );
    } catch (err) {
      alert("Ошибка: " + err.message);
    } finally {
      setActionLoading(null);
    }
  }

  async function handleDelete(user) {
    const confirmed = window.confirm(
      `Удалить пользователя ${user.email}?\n\nБудут удалены аккаунт, его чек-планы и связанные данные без возможности восстановления.`
    );
    if (!confirmed) return;
    setActionLoading(`delete-${user.id}`);
    try {
      await deleteUser(user.id);
      setUsers((prev) => prev.filter((u) => u.id !== user.id));
      setTotal((prev) => Math.max(0, prev - 1));
    } catch (err) {
      alert("Ошибка: " + err.message);
    } finally {
      setActionLoading(null);
    }
  }

  const totalPages = Math.ceil(total / LIMIT);
  const columns = [
    { key: "id", label: "ID" },
    { key: "email", label: "Email" },
    { key: "nickname", label: "Никнейм" },
    { key: "role", label: "Роль" },
    { key: "status", label: "Статус" },
    { key: "totp", label: "TOTP" },
    { key: "actions", label: "Действия" },
  ];

  const handleResizeStart = useCallback((colKey, startX) => {
    const startWidth = colWidths[colKey];
    const onMouseMove = (e) => {
      const nextWidth = Math.max(MIN_COL_WIDTH, startWidth + (e.clientX - startX));
      setColWidths((prev) => ({ ...prev, [colKey]: nextWidth }));
    };
    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }, [colWidths]);

  if (authLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "var(--color-text-secondary)" }}>Загрузка...</span>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div style={{ width: "100%", maxWidth: "100%", minWidth: 0 }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--color-text)", marginBottom: 4 }}>
            Пользователи
          </h2>
          <p style={{ color: "var(--color-text-secondary)", fontSize: 14 }}>
            {total > 0 ? `Всего: ${total.toLocaleString("ru-RU")}` : "Управление пользователями"}
          </p>
        </div>

        {/* Search bar */}
        <div
          style={{
            background: "#fff",
            borderRadius: "var(--radius-lg)",
            padding: "16px 20px",
            boxShadow: "var(--shadow-sm)",
            border: "1px solid var(--color-border)",
            marginBottom: 20,
          }}
        >
          <form onSubmit={handleSearch} style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ position: "relative", flex: 1, maxWidth: 400 }}>
              <svg
                width="16" height="16"
                viewBox="0 0 24 24" fill="none" stroke="var(--color-text-muted)"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }}
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Поиск по email или никнейму..."
                style={{
                  width: "100%",
                  padding: "9px 14px 9px 38px",
                  border: "1.5px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  fontSize: 14,
                  outline: "none",
                  background: "#fff",
                  color: "var(--color-text)",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--color-primary)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
              />
            </div>
            <button
              type="submit"
              style={{
                padding: "9px 20px",
                background: "var(--color-primary)",
                color: "#fff",
                border: "none",
                borderRadius: "var(--radius-md)",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "var(--color-primary-hover)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "var(--color-primary)")}
            >
              Найти
            </button>
            {search && (
              <button
                type="button"
                onClick={() => { setSearchInput(""); setSearch(""); setPage(1); }}
                style={{
                  padding: "9px 16px",
                  background: "var(--color-bg)",
                  color: "var(--color-text-secondary)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  fontSize: 14,
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                }}
              >
                Сбросить
              </button>
            )}
          </form>
        </div>

        {/* Table card */}
        <div
          style={{
            background: "#fff",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-sm)",
            border: "1px solid var(--color-border)",
            overflow: "hidden",
          }}
        >
          {error && (
            <div style={{ padding: "16px 20px", background: "#fff5f5", color: "var(--color-danger)", borderBottom: "1px solid #fed7d7", fontSize: 14 }}>
              Ошибка: {error}
            </div>
          )}

          <div style={{ width: "100%", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, tableLayout: "fixed" }}>
              <colgroup>
                {columns.map((c) => (
                  <col key={c.key} style={{ width: colWidths[c.key] }} />
                ))}
              </colgroup>
              <thead>
                <tr style={{ background: "var(--color-bg)" }}>
                  {columns.map((c) => (
                    <th
                      key={c.key}
                      style={{
                        ...thBase,
                        width: colWidths[c.key],
                      }}
                    >
                      {c.label}
                      <ColumnResizeHandle
                        onMouseDown={(e) => handleResizeStart(c.key, e.clientX)}
                      />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      {Array.from({ length: 7 }).map((_, j) => (
                        <td key={j} style={{ ...tdBase }}>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              minHeight: 24,
                            }}
                          >
                            <div
                              style={{
                                height: 14,
                                background: "var(--color-border)",
                                borderRadius: 4,
                                width: j === 0 ? 48 : j === 1 ? 80 : j === 6 ? 56 : 64,
                                animation: "pulse 1.5s infinite",
                              }}
                            />
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: "40px", textAlign: "center", color: "var(--color-text-muted)" }}>
                      Пользователи не найдены
                    </td>
                  </tr>
                ) : (
                  users.map((user, idx) => (
                    <tr
                      key={user.id}
                      style={{
                        background: idx % 2 === 0 ? "#fff" : "#fafbfc",
                        transition: "background 0.1s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#f0f4ff")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = idx % 2 === 0 ? "#fff" : "#fafbfc")}
                    >
                      <td
                        style={{
                          ...tdBase,
                          color: "var(--color-text-secondary)",
                          fontFamily: "monospace",
                          fontSize: 12,
                          wordBreak: "break-all",
                          whiteSpace: "normal",
                        }}
                      >
                        {String(user.id)}
                      </td>
                      <td style={{ ...tdBase, overflow: "hidden" }}>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", minWidth: 0 }}>
                        {(() => {
                          const href = (() => {
                            const p = buildProfilePath(user.id, user.nickname);
                            return p ? absolutePublicUrl(p) : null;
                          })();
                          return href ? (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                maxWidth: "100%",
                                fontWeight: 500,
                                color: "var(--color-primary)",
                                textDecoration: "none",
                              }}
                            >
                              {user.email}
                            </a>
                          ) : (
                            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "100%", fontWeight: 500 }}>
                              {user.email}
                            </span>
                          );
                        })()}
                        </div>
                      </td>
                      <td style={{ ...tdBase, overflow: "hidden" }}>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", minWidth: 0 }}>
                        {(() => {
                          const href = (() => {
                            const p = buildProfilePath(user.id, user.nickname);
                            return p ? absolutePublicUrl(p) : null;
                          })();
                          if (!user.nickname) {
                            return <span style={{ color: "var(--color-text-muted)" }}>—</span>;
                          }
                          return href ? (
                            <a
                              href={href}
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{
                                color: "var(--color-primary)",
                                textDecoration: "none",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                maxWidth: "100%",
                              }}
                            >
                              {user.nickname}
                            </a>
                          ) : (
                            <span style={{ color: "var(--color-text)" }}>{user.nickname}</span>
                          );
                        })()}
                        </div>
                      </td>
                      <td style={tdBase}>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                        <select
                          value={user.is_admin ? "admin" : "user"}
                          onChange={(e) => handleRoleChange(user, e.target.value === "admin")}
                          disabled={actionLoading === `role-${user.id}` || actionLoading === user.id || actionLoading === `delete-${user.id}`}
                          style={{
                            maxWidth: "100%",
                            padding: "6px 10px",
                            borderRadius: "var(--radius-sm)",
                            border: "1px solid var(--color-border)",
                            fontSize: 13,
                            fontWeight: 600,
                            background: "#fff",
                            color: "var(--color-text)",
                            cursor: actionLoading === `role-${user.id}` ? "wait" : "pointer",
                          }}
                        >
                          <option value="user">Пользователь</option>
                          <option value="admin">Администратор</option>
                        </select>
                        </div>
                      </td>
                      <td style={tdBase}>
                        {user.is_blocked
                          ? <Badge color="#e53e3e" bg="#fff5f5">Заблокирован</Badge>
                          : <Badge color="#38a169" bg="#f0fff4">Активен</Badge>
                        }
                      </td>
                      <td style={tdBase}>
                        {user.totp_enabled
                          ? <Badge color="#38a169" bg="#f0fff4">Вкл</Badge>
                          : <Badge color="var(--color-text-muted)" bg="var(--color-bg)">Выкл</Badge>
                        }
                      </td>
                      <td style={tdBase}>
                        <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 8 }}>
                          <button
                            type="button"
                            onClick={() => handleBlock(user)}
                            disabled={actionLoading === user.id || actionLoading === `delete-${user.id}` || actionLoading?.startsWith("role-")}
                            style={{
                              padding: "6px 14px",
                              background: user.is_blocked ? "#f0fff4" : "#fff5f5",
                              color: user.is_blocked ? "#38a169" : "#e53e3e",
                              border: `1px solid ${user.is_blocked ? "#c6f6d5" : "#fed7d7"}`,
                              borderRadius: "var(--radius-sm)",
                              fontSize: 13,
                              fontWeight: 600,
                              cursor: actionLoading === user.id ? "not-allowed" : "pointer",
                              opacity: (actionLoading === user.id || actionLoading === `delete-${user.id}`) ? 0.6 : 1,
                              whiteSpace: "nowrap",
                              transition: "opacity 0.15s",
                            }}
                          >
                            {actionLoading === user.id
                              ? "..."
                              : user.is_blocked
                              ? "Разблокировать"
                              : "Заблокировать"}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(user)}
                            disabled={actionLoading === user.id || actionLoading === `delete-${user.id}` || actionLoading?.startsWith("role-")}
                            style={{
                              padding: "6px 14px",
                              background: "#fff5f5",
                              color: "#e53e3e",
                              border: "1px solid #fed7d7",
                              borderRadius: "var(--radius-sm)",
                              fontSize: 13,
                              fontWeight: 600,
                              cursor: (actionLoading === user.id || actionLoading === `delete-${user.id}`) ? "not-allowed" : "pointer",
                              opacity: (actionLoading === user.id || actionLoading === `delete-${user.id}`) ? 0.6 : 1,
                              whiteSpace: "nowrap",
                              transition: "opacity 0.15s",
                            }}
                          >
                            {actionLoading === `delete-${user.id}` ? "Удаление..." : "Удалить"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 20px",
                borderTop: "1px solid var(--color-border)",
                background: "var(--color-bg)",
              }}
            >
              <span style={{ fontSize: 13, color: "var(--color-text-secondary)" }}>
                Страница {page} из {totalPages} · {total.toLocaleString("ru-RU")} записей
              </span>
              <div style={{ display: "flex", gap: 6 }}>
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  style={paginationBtnStyle(page === 1)}
                >
                  ← Назад
                </button>
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pg = Math.max(1, Math.min(totalPages - 4, page - 2)) + i;
                  return (
                    <button
                      key={pg}
                      onClick={() => setPage(pg)}
                      style={{
                        ...paginationBtnStyle(false),
                        background: pg === page ? "var(--color-primary)" : "#fff",
                        color: pg === page ? "#fff" : "var(--color-text)",
                        borderColor: pg === page ? "var(--color-primary)" : "var(--color-border)",
                        fontWeight: pg === page ? 700 : 400,
                      }}
                    >
                      {pg}
                    </button>
                  );
                })}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  style={paginationBtnStyle(page === totalPages)}
                >
                  Вперёд →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

function paginationBtnStyle(disabled) {
  return {
    padding: "6px 12px",
    background: "#fff",
    color: disabled ? "var(--color-text-muted)" : "var(--color-text)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius-sm)",
    fontSize: 13,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
  };
}
