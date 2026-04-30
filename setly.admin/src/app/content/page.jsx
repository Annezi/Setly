"use client";

import { useEffect, useState, useCallback } from "react";
import AdminLayout from "@/components/AdminLayout";
import ColumnResizeHandle from "@/components/ColumnResizeHandle";
import useAdminGuard from "@/lib/useAdminGuard";
import { fetchCheckPlans, moderateCheckPlan, deleteCheckPlan } from "@/lib/api";
import { absolutePublicUrl, buildCheckplanPreviewPath, buildProfilePath } from "@/lib/publicLinks";

const LIMIT = 20;
const MIN_COL_WIDTH = 80;
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

const MODERATION_OPTIONS = [
  { value: "", label: "Все" },
  { value: "pending", label: "На рассмотрении" },
  { value: "approved", label: "Одобрено" },
  { value: "rejected", label: "Отклонено" },
];

const MODERATION_LABELS = {
  pending: { label: "На рассмотрении", color: "#d69e2e", bg: "#fffff0" },
  approved: { label: "Одобрено", color: "#38a169", bg: "#f0fff4" },
  rejected: { label: "Отклонено", color: "#e53e3e", bg: "#fff5f5" },
};

const VISIBILITY_LABELS = {
  public: { label: "Публичный", color: "#38a169", bg: "#f0fff4" },
  private: { label: "Приватный", color: "#718096", bg: "#f7fafc" },
  link: { label: "По ссылке", color: "#3182ce", bg: "#ebf8ff" },
  link_only: { label: "По ссылке", color: "#3182ce", bg: "#ebf8ff" },
};

const VISIBILITY_FILTER_OPTIONS = [
  { value: "", label: "Все" },
  { value: "public", label: "Публичный" },
  { value: "link", label: "По ссылке" },
  { value: "private", label: "Приватный" },
];

function Badge({ label, color, bg }) {
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
      {label}
    </span>
  );
}

function ActionBtn({ label, color, bg, borderColor, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: "5px 12px",
        background: bg,
        color,
        border: `1px solid ${borderColor}`,
        borderRadius: "var(--radius-sm)",
        fontSize: 12,
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        whiteSpace: "nowrap",
        transition: "opacity 0.15s",
      }}
    >
      {label}
    </button>
  );
}

export default function ContentPage() {
  const { loading: authLoading } = useAdminGuard();

  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [moderationFilter, setModerationFilter] = useState("");
  const [visibilityFilter, setVisibilityFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null);
  const [colWidths, setColWidths] = useState({
    id: DEFAULT_COL_WIDTH,
    title: DEFAULT_COL_WIDTH,
    author: DEFAULT_COL_WIDTH,
    visibility: DEFAULT_COL_WIDTH,
    moderation: DEFAULT_COL_WIDTH,
    hidden: DEFAULT_COL_WIDTH,
    actions: DEFAULT_COL_WIDTH,
  });

  const loadItems = useCallback(async (pg, srch, modFilter, visFilter) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchCheckPlans(pg, LIMIT, srch, modFilter, visFilter);
      setItems(data.items);
      setTotal(data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading) loadItems(page, search, moderationFilter, visibilityFilter);
  }, [authLoading, page, search, moderationFilter, visibilityFilter, loadItems]);

  function handleSearch(e) {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  }

  function handleModerationFilterChange(val) {
    setModerationFilter(val);
    setPage(1);
  }

  function handleVisibilityFilterChange(val) {
    setVisibilityFilter(val);
    setPage(1);
  }

  async function handleModerate(item, newStatus) {
    setActionLoading(`${item.id_str}-${newStatus}`);
    try {
      await moderateCheckPlan(item.id_str, newStatus, item.is_hidden_by_admin);
      setItems((prev) =>
        prev.map((i) =>
          i.id_str === item.id_str ? { ...i, moderation_status: newStatus } : i
        )
      );
    } catch (err) {
      alert("Ошибка: " + err.message);
    } finally {
      setActionLoading(null);
    }
  }

  async function handleToggleHide(item) {
    const newHidden = !item.is_hidden_by_admin;
    setActionLoading(`${item.id_str}-hide`);
    try {
      await moderateCheckPlan(item.id_str, item.moderation_status, newHidden);
      setItems((prev) =>
        prev.map((i) =>
          i.id_str === item.id_str ? { ...i, is_hidden_by_admin: newHidden } : i
        )
      );
    } catch (err) {
      alert("Ошибка: " + err.message);
    } finally {
      setActionLoading(null);
    }
  }

  async function handleDeleteCheckPlan(item) {
    const confirmed = window.confirm(
      `Удалить чек-план "${item.title || item.id_str}"?\n\nБудет удален сам чек-план и его содержимое без возможности восстановления.`
    );
    if (!confirmed) return;
    setActionLoading(`${item.id_str}-delete`);
    try {
      await deleteCheckPlan(item.id_str);
      setItems((prev) => prev.filter((i) => i.id_str !== item.id_str));
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
    { key: "title", label: "Заголовок" },
    { key: "author", label: "Автор" },
    { key: "visibility", label: "Видимость" },
    { key: "moderation", label: "Статус" },
    { key: "hidden", label: "Скрыт" },
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
            Контент
          </h2>
          <p style={{ color: "var(--color-text-secondary)", fontSize: 14 }}>
            {total > 0 ? `Чек-планов: ${total.toLocaleString("ru-RU")}` : "Модерация чек-планов"}
          </p>
        </div>

        {/* Filters bar */}
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
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
            {/* Search */}
            <form onSubmit={handleSearch} style={{ display: "flex", gap: 8, alignItems: "center", flex: 1, minWidth: 260 }}>
              <div style={{ position: "relative", flex: 1, maxWidth: 360 }}>
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
                  placeholder="Поиск по заголовку..."
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
                  padding: "9px 18px",
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
            </form>

            {/* Moderation status filter */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                Статус модерации
              </span>
              <div style={{ display: "flex", gap: 4, background: "var(--color-bg)", borderRadius: "var(--radius-md)", padding: 4, border: "1px solid var(--color-border)" }}>
                {MODERATION_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleModerationFilterChange(opt.value)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "var(--radius-sm)",
                      border: "none",
                      background: moderationFilter === opt.value ? "#fff" : "transparent",
                      color: moderationFilter === opt.value ? "var(--color-text)" : "var(--color-text-secondary)",
                      fontWeight: moderationFilter === opt.value ? 600 : 400,
                      fontSize: 13,
                      cursor: "pointer",
                      boxShadow: moderationFilter === opt.value ? "var(--shadow-sm)" : "none",
                      transition: "all 0.15s",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Visibility filter */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: "var(--color-text-muted)", textTransform: "uppercase", letterSpacing: "0.04em" }}>
                Видимость
              </span>
              <div style={{ display: "flex", gap: 4, background: "var(--color-bg)", borderRadius: "var(--radius-md)", padding: 4, border: "1px solid var(--color-border)" }}>
                {VISIBILITY_FILTER_OPTIONS.map((opt) => (
                  <button
                    key={opt.value === "" ? "all-vis" : opt.value}
                    type="button"
                    onClick={() => handleVisibilityFilterChange(opt.value)}
                    style={{
                      padding: "6px 14px",
                      borderRadius: "var(--radius-sm)",
                      border: "none",
                      background: visibilityFilter === opt.value ? "#fff" : "transparent",
                      color: visibilityFilter === opt.value ? "var(--color-text)" : "var(--color-text-secondary)",
                      fontWeight: visibilityFilter === opt.value ? 600 : 400,
                      fontSize: 13,
                      cursor: "pointer",
                      boxShadow: visibilityFilter === opt.value ? "var(--shadow-sm)" : "none",
                      transition: "all 0.15s",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
          </div>
        </div>

        {/* Table */}
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
                          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 24 }}>
                            <div style={{ height: 14, background: "var(--color-border)", borderRadius: 4, width: j === 1 ? 72 : 56 }} />
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))
                ) : items.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ padding: "40px", textAlign: "center", color: "var(--color-text-muted)" }}>
                      Чек-планы не найдены
                    </td>
                  </tr>
                ) : (
                  items.map((item, idx) => {
                    const modInfo = MODERATION_LABELS[item.moderation_status] || { label: item.moderation_status, color: "#718096", bg: "#f7fafc" };
                    const visInfo = VISIBILITY_LABELS[item.visibility] || { label: item.visibility, color: "#718096", bg: "#f7fafc" };
                    const isActing = actionLoading?.startsWith(item.id_str);
                    return (
                      <tr
                        key={item.id_str}
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
                          {item.id_str}
                        </td>
                        <td style={{ ...tdBase, overflow: "hidden" }}>
                          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", minWidth: 0 }}>
                          <a
                            href={absolutePublicUrl(
                              buildCheckplanPreviewPath({
                                id: item.id,
                                id_str: item.id_str,
                                title: item.title,
                              })
                            )}
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
                            title="Открыть превью чек-плана"
                          >
                            {item.title || "—"}
                          </a>
                          </div>
                        </td>
                        <td style={{ ...tdBase, fontSize: 13, overflow: "hidden" }}>
                          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", minWidth: 0 }}>
                          {(() => {
                            const href = (() => {
                              const p = buildProfilePath(item.author_id, item.author_nickname);
                              return p ? absolutePublicUrl(p) : null;
                            })();
                            const label =
                              item.author_nickname?.trim() ||
                              (item.author_id != null ? String(item.author_id) : "—");
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
                                title="Профиль автора"
                              >
                                {label}
                              </a>
                            ) : (
                              <span style={{ fontFamily: "monospace", fontSize: 12, color: "var(--color-text-secondary)" }}>
                                {label}
                              </span>
                            );
                          })()}
                          </div>
                        </td>
                        <td style={tdBase}>
                          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                          <Badge label={visInfo.label} color={visInfo.color} bg={visInfo.bg} />
                          </div>
                        </td>
                        <td style={tdBase}>
                          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                          <Badge label={modInfo.label} color={modInfo.color} bg={modInfo.bg} />
                          </div>
                        </td>
                        <td style={tdBase}>
                          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%" }}>
                          {item.is_hidden_by_admin
                            ? <Badge label="Скрыт" color="#e53e3e" bg="#fff5f5" />
                            : <Badge label="Виден" color="#38a169" bg="#f0fff4" />
                          }
                          </div>
                        </td>
                        <td style={tdBase}>
                          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
                            {item.moderation_status !== "approved" && (
                              <ActionBtn
                                label="Одобрить"
                                color="#38a169"
                                bg="#f0fff4"
                                borderColor="#c6f6d5"
                                onClick={() => handleModerate(item, "approved")}
                                disabled={isActing}
                              />
                            )}
                            {item.moderation_status !== "rejected" && (
                              <ActionBtn
                                label="Отклонить"
                                color="#e53e3e"
                                bg="#fff5f5"
                                borderColor="#fed7d7"
                                onClick={() => handleModerate(item, "rejected")}
                                disabled={isActing}
                              />
                            )}
                            <ActionBtn
                              label={item.is_hidden_by_admin ? "Показать" : "Скрыть"}
                              color={item.is_hidden_by_admin ? "#3182ce" : "#718096"}
                              bg={item.is_hidden_by_admin ? "#ebf8ff" : "#f7fafc"}
                              borderColor={item.is_hidden_by_admin ? "#bee3f8" : "#e2e8f0"}
                              onClick={() => handleToggleHide(item)}
                              disabled={isActing}
                            />
                            <ActionBtn
                              label={actionLoading === `${item.id_str}-delete` ? "Удаление..." : "Удалить"}
                              color="#e53e3e"
                              bg="#fff5f5"
                              borderColor="#fed7d7"
                              onClick={() => handleDeleteCheckPlan(item)}
                              disabled={isActing}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })
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
