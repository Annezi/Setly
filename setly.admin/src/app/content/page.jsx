"use client";

import { useEffect, useState, useCallback } from "react";
import AdminLayout from "@/components/AdminLayout";
import useAdminGuard from "@/lib/useAdminGuard";
import { fetchCheckPlans, moderateCheckPlan } from "@/lib/api";

const LIMIT = 20;

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
  link_only: { label: "По ссылке", color: "#3182ce", bg: "#ebf8ff" },
};

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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionLoading, setActionLoading] = useState(null);

  const loadItems = useCallback(async (pg, srch, modFilter) => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchCheckPlans(pg, LIMIT, srch, modFilter);
      setItems(data.items);
      setTotal(data.total);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!authLoading) loadItems(page, search, moderationFilter);
  }, [authLoading, page, search, moderationFilter, loadItems]);

  function handleSearch(e) {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  }

  function handleFilterChange(val) {
    setModerationFilter(val);
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

  const totalPages = Math.ceil(total / LIMIT);

  if (authLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "var(--color-text-secondary)" }}>Загрузка...</span>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div style={{ maxWidth: 1400 }}>
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

            {/* Status filter tabs */}
            <div style={{ display: "flex", gap: 4, background: "var(--color-bg)", borderRadius: "var(--radius-md)", padding: 4, border: "1px solid var(--color-border)" }}>
              {MODERATION_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => handleFilterChange(opt.value)}
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

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr style={{ background: "var(--color-bg)" }}>
                  {["ID", "Заголовок", "Автор", "Видимость", "Статус", "Скрыт", "Действия"].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: "12px 14px",
                        textAlign: "left",
                        fontWeight: 600,
                        color: "var(--color-text-secondary)",
                        fontSize: 12,
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        borderBottom: "1px solid var(--color-border)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      {Array.from({ length: 7 }).map((_, j) => (
                        <td key={j} style={{ padding: "14px", borderBottom: "1px solid var(--color-border)" }}>
                          <div style={{ height: 14, background: "var(--color-border)", borderRadius: 4, width: j === 1 ? 180 : 90 }} />
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
                        <td style={{ padding: "12px 14px", borderBottom: "1px solid var(--color-border)", color: "var(--color-text-secondary)", fontFamily: "monospace", fontSize: 12 }}>
                          {String(item.id_str).slice(0, 8)}...
                        </td>
                        <td style={{ padding: "12px 14px", borderBottom: "1px solid var(--color-border)", maxWidth: 240 }}>
                          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", display: "block", fontWeight: 500 }}>
                            {item.title || "—"}
                          </span>
                        </td>
                        <td style={{ padding: "12px 14px", borderBottom: "1px solid var(--color-border)", fontFamily: "monospace", fontSize: 12, color: "var(--color-text-secondary)" }}>
                          {String(item.author_id || "").slice(0, 8)}...
                        </td>
                        <td style={{ padding: "12px 14px", borderBottom: "1px solid var(--color-border)" }}>
                          <Badge label={visInfo.label} color={visInfo.color} bg={visInfo.bg} />
                        </td>
                        <td style={{ padding: "12px 14px", borderBottom: "1px solid var(--color-border)" }}>
                          <Badge label={modInfo.label} color={modInfo.color} bg={modInfo.bg} />
                        </td>
                        <td style={{ padding: "12px 14px", borderBottom: "1px solid var(--color-border)" }}>
                          {item.is_hidden_by_admin
                            ? <Badge label="Скрыт" color="#e53e3e" bg="#fff5f5" />
                            : <Badge label="Виден" color="#38a169" bg="#f0fff4" />
                          }
                        </td>
                        <td style={{ padding: "12px 14px", borderBottom: "1px solid var(--color-border)" }}>
                          <div style={{ display: "flex", gap: 6, flexWrap: "nowrap" }}>
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
