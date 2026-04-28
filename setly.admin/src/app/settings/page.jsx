"use client";

import { useEffect, useState } from "react";
import AdminLayout from "@/components/AdminLayout";
import useAdminGuard from "@/lib/useAdminGuard";
import { fetchSettings, upsertSetting } from "@/lib/api";

function formatDate(str) {
  if (!str) return "—";
  try {
    return new Intl.DateTimeFormat("ru-RU", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(str));
  } catch {
    return str;
  }
}

export default function SettingsPage() {
  const { loading: authLoading } = useAdminGuard();

  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Editable values map: { [key]: string }
  const [editValues, setEditValues] = useState({});
  const [savingKey, setSavingKey] = useState(null);
  const [savedKey, setSavedKey] = useState(null);

  // New setting form
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [addLoading, setAddLoading] = useState(false);
  const [addError, setAddError] = useState("");

  useEffect(() => {
    if (!authLoading) loadSettings();
  }, [authLoading]);

  async function loadSettings() {
    setLoading(true);
    setError("");
    try {
      const data = await fetchSettings();
      setSettings(data);
      const vals = {};
      data.forEach((s) => { vals[s.key] = s.value; });
      setEditValues(vals);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(key) {
    setSavingKey(key);
    try {
      await upsertSetting(key, editValues[key]);
      setSettings((prev) =>
        prev.map((s) => s.key === key ? { ...s, value: editValues[key], updated_at: new Date().toISOString() } : s)
      );
      setSavedKey(key);
      setTimeout(() => setSavedKey(null), 2000);
    } catch (err) {
      alert("Ошибка сохранения: " + err.message);
    } finally {
      setSavingKey(null);
    }
  }

  async function handleAdd(e) {
    e.preventDefault();
    if (!newKey.trim()) return;
    setAddLoading(true);
    setAddError("");
    try {
      await upsertSetting(newKey.trim(), newValue);
      const existing = settings.find((s) => s.key === newKey.trim());
      if (existing) {
        setSettings((prev) =>
          prev.map((s) => s.key === newKey.trim() ? { ...s, value: newValue, updated_at: new Date().toISOString() } : s)
        );
        setEditValues((prev) => ({ ...prev, [newKey.trim()]: newValue }));
      } else {
        const newSetting = { key: newKey.trim(), value: newValue, updated_at: new Date().toISOString() };
        setSettings((prev) => [...prev, newSetting]);
        setEditValues((prev) => ({ ...prev, [newKey.trim()]: newValue }));
      }
      setNewKey("");
      setNewValue("");
    } catch (err) {
      setAddError(err.message);
    } finally {
      setAddLoading(false);
    }
  }

  if (authLoading) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "var(--color-text-secondary)" }}>Загрузка...</span>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div style={{ maxWidth: 900 }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "var(--color-text)", marginBottom: 4 }}>
            Настройки
          </h2>
          <p style={{ color: "var(--color-text-secondary)", fontSize: 14 }}>
            Управление настройками платформы
          </p>
        </div>

        {/* Add new setting form */}
        <div
          style={{
            background: "#fff",
            borderRadius: "var(--radius-lg)",
            padding: "24px",
            boxShadow: "var(--shadow-sm)",
            border: "1px solid var(--color-border)",
            marginBottom: 24,
          }}
        >
          <h3 style={{ fontSize: 15, fontWeight: 600, color: "var(--color-text)", marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-primary)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Добавить / обновить настройку
          </h3>
          <form onSubmit={handleAdd}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap" }}>
              <div style={{ flex: "0 0 220px" }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  Ключ
                </label>
                <input
                  type="text"
                  value={newKey}
                  onChange={(e) => setNewKey(e.target.value)}
                  placeholder="например: max_users"
                  required
                  style={{
                    width: "100%",
                    padding: "9px 12px",
                    border: "1.5px solid var(--color-border)",
                    borderRadius: "var(--radius-md)",
                    fontSize: 14,
                    fontFamily: "monospace",
                    outline: "none",
                    background: "#fff",
                    color: "var(--color-text)",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--color-primary)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--color-border)")}
                />
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--color-text-secondary)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.04em" }}>
                  Значение
                </label>
                <input
                  type="text"
                  value={newValue}
                  onChange={(e) => setNewValue(e.target.value)}
                  placeholder="значение"
                  style={{
                    width: "100%",
                    padding: "9px 12px",
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
                disabled={addLoading || !newKey.trim()}
                style={{
                  padding: "9px 20px",
                  background: addLoading || !newKey.trim() ? "#93b4e8" : "var(--color-primary)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "var(--radius-md)",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: addLoading || !newKey.trim() ? "not-allowed" : "pointer",
                  whiteSpace: "nowrap",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) => {
                  if (!addLoading && newKey.trim()) e.currentTarget.style.background = "var(--color-primary-hover)";
                }}
                onMouseLeave={(e) => {
                  if (!addLoading && newKey.trim()) e.currentTarget.style.background = "var(--color-primary)";
                }}
              >
                {addLoading ? "Сохранение..." : "Сохранить"}
              </button>
            </div>
            {addError && (
              <div style={{ marginTop: 10, padding: "8px 12px", background: "#fff5f5", border: "1px solid #fed7d7", borderRadius: "var(--radius-sm)", color: "var(--color-danger)", fontSize: 13 }}>
                {addError}
              </div>
            )}
          </form>
        </div>

        {/* Settings list */}
        <div
          style={{
            background: "#fff",
            borderRadius: "var(--radius-lg)",
            boxShadow: "var(--shadow-sm)",
            border: "1px solid var(--color-border)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              padding: "16px 24px",
              borderBottom: "1px solid var(--color-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "var(--color-bg)",
            }}
          >
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--color-text)" }}>
              Текущие настройки
              {settings.length > 0 && (
                <span style={{ marginLeft: 8, padding: "2px 8px", background: "var(--color-border)", borderRadius: 100, fontSize: 12, fontWeight: 600, color: "var(--color-text-secondary)" }}>
                  {settings.length}
                </span>
              )}
            </h3>
            <button
              onClick={loadSettings}
              style={{
                padding: "6px 14px",
                background: "#fff",
                color: "var(--color-text-secondary)",
                border: "1px solid var(--color-border)",
                borderRadius: "var(--radius-sm)",
                fontSize: 13,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--color-border)")}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 .49-3.1" />
              </svg>
              Обновить
            </button>
          </div>

          {error && (
            <div style={{ padding: "16px 24px", background: "#fff5f5", color: "var(--color-danger)", borderBottom: "1px solid #fed7d7", fontSize: 14 }}>
              Ошибка загрузки: {error}
            </div>
          )}

          {loading ? (
            <div style={{ padding: "24px" }}>
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} style={{ display: "flex", gap: 16, alignItems: "center", padding: "14px 0", borderBottom: i < 3 ? "1px solid var(--color-border)" : "none" }}>
                  <div style={{ height: 14, background: "var(--color-border)", borderRadius: 4, width: 140 }} />
                  <div style={{ flex: 1, height: 36, background: "var(--color-border)", borderRadius: "var(--radius-md)" }} />
                  <div style={{ height: 34, width: 90, background: "var(--color-border)", borderRadius: "var(--radius-md)" }} />
                </div>
              ))}
            </div>
          ) : settings.length === 0 ? (
            <div style={{ padding: "48px", textAlign: "center", color: "var(--color-text-muted)" }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 12, opacity: 0.4 }}>
                <circle cx="12" cy="12" r="3" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                <path d="M4.93 4.93a10 10 0 0 0 0 14.14" />
              </svg>
              <div style={{ fontSize: 15, fontWeight: 500 }}>Настройки отсутствуют</div>
              <div style={{ fontSize: 13, marginTop: 4 }}>Используйте форму выше, чтобы добавить первую настройку</div>
            </div>
          ) : (
            <div>
              {settings.map((setting, idx) => {
                const isSaving = savingKey === setting.key;
                const isSaved = savedKey === setting.key;
                const currentVal = editValues[setting.key] ?? setting.value;
                const isDirty = currentVal !== setting.value;
                return (
                  <div
                    key={setting.key}
                    style={{
                      padding: "18px 24px",
                      borderBottom: idx < settings.length - 1 ? "1px solid var(--color-border)" : "none",
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      flexWrap: "wrap",
                      transition: "background 0.1s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#fafbfc")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
                  >
                    {/* Key */}
                    <div style={{ flex: "0 0 200px", minWidth: 140 }}>
                      <div
                        style={{
                          fontFamily: "monospace",
                          fontSize: 13,
                          fontWeight: 600,
                          color: "var(--color-text)",
                          background: "#f0f4ff",
                          padding: "4px 10px",
                          borderRadius: "var(--radius-sm)",
                          display: "inline-block",
                          maxWidth: "100%",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {setting.key}
                      </div>
                      <div style={{ fontSize: 11, color: "var(--color-text-muted)", marginTop: 4 }}>
                        {formatDate(setting.updated_at)}
                      </div>
                    </div>

                    {/* Value input */}
                    <div style={{ flex: 1, minWidth: 200 }}>
                      <input
                        type="text"
                        value={currentVal}
                        onChange={(e) =>
                          setEditValues((prev) => ({ ...prev, [setting.key]: e.target.value }))
                        }
                        style={{
                          width: "100%",
                          padding: "8px 12px",
                          border: `1.5px solid ${isDirty ? "var(--color-primary)" : "var(--color-border)"}`,
                          borderRadius: "var(--radius-md)",
                          fontSize: 14,
                          outline: "none",
                          background: isDirty ? "#f8fbff" : "#fff",
                          color: "var(--color-text)",
                          transition: "border-color 0.15s, background 0.15s",
                        }}
                        onFocus={(e) => (e.target.style.borderColor = "var(--color-primary)")}
                        onBlur={(e) => {
                          if (!isDirty) e.target.style.borderColor = "var(--color-border)";
                        }}
                      />
                    </div>

                    {/* Save button */}
                    <button
                      onClick={() => handleSave(setting.key)}
                      disabled={isSaving || !isDirty}
                      style={{
                        padding: "8px 18px",
                        background: isSaved
                          ? "#f0fff4"
                          : isDirty
                          ? "var(--color-primary)"
                          : "var(--color-bg)",
                        color: isSaved
                          ? "#38a169"
                          : isDirty
                          ? "#fff"
                          : "var(--color-text-muted)",
                        border: `1px solid ${isSaved ? "#c6f6d5" : isDirty ? "var(--color-primary)" : "var(--color-border)"}`,
                        borderRadius: "var(--radius-md)",
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: isSaving || !isDirty ? "not-allowed" : "pointer",
                        opacity: isSaving ? 0.7 : 1,
                        whiteSpace: "nowrap",
                        minWidth: 90,
                        transition: "all 0.15s",
                        flexShrink: 0,
                      }}
                    >
                      {isSaving ? "Сохранение..." : isSaved ? "✓ Сохранено" : "Сохранить"}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
